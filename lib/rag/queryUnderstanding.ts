/**
 * QUERY UNDERSTANDING MODULE — Phase 3
 *
 * LLM-powered semantic query understanding with structured JSON output.
 * Produces a validated QueryUnderstanding object that feeds directly into
 * the existing Phase 2 retrieval pipeline.
 *
 * Architecture:
 *   User Question → LLM Query Understanding → Validated Structured Result
 *     ↓ (valid)                                    ↓ (invalid/timeout/unavailable)
 *   Phase 2 Retrieval                          Deterministic IntentRouter fallback
 *
 * The LLM classifies the user's information need, extracts entities,
 * resolves follow-up references from conversation context, and generates
 * a normalized retrieval query — but NEVER determines factual content.
 */

import { QueryIntent, AgentConversationState, RequestMode, SessionMemory } from '@/types/rag'
import { ToolPlan, createSingleStepPlan } from '@/lib/rag/tools/toolPlanner'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'
import { classifyAndRoute, RoutingDecision } from '@/lib/rag/intentRouter'
import { sourceAuthorityRules } from '@/data/canonical/sourceAuthority'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { resolveContextualQuery } from '@/lib/rag/contextResolver'
import { getActiveTopic, formatSessionContextForPrompt } from '@/lib/rag/sessionMemory'

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface FollowUpReference {
  type: 'project' | 'person' | 'system' | 'topic' | 'technology' | 'previous_answer'
  value: string
}

export interface QueryUnderstanding {
  /** Classified intent matching existing QueryIntent union */
  intent: QueryIntent
  /** Natural-language description of what the user wants to know */
  informationNeed: string
  /** Extracted entities: project names, technologies, concepts, employers */
  entities: string[]
  /** Resolved project slug from canonical registry */
  project?: string
  /** Phase 2.1: Multi-entity comparison project slugs */
  comparisonProjects?: string[]
  /** Detected technologies */
  technologies?: string[]
  /** Source layers to prioritize */
  sourcesNeeded?: string[]
  /** Temporal scope (e.g., "2024", "early 2025", "current") */
  timeScope?: string
  /** Ownership/contribution scope */
  contributionScope?: 'independent' | 'team' | 'contribution' | 'any'
  /** Follow-up reference resolved from context */
  followUpReference?: FollowUpReference
  /** Normalized retrieval query for the hybrid retriever */
  normalizedRetrievalQuery: string
  /** Confidence in the understanding (0-1) */
  confidence: number
  /** Whether this came from LLM or deterministic fallback */
  source: 'llm' | 'deterministic_fallback'
  /** If clarification is needed */
  needsClarification?: boolean
  /** Clarification question to ask the user */
  clarificationQuestion?: string
  /** Phase 5A: Request mode (information, navigation, action, clarification) */
  requestMode?: RequestMode
  /** Phase 5A: Deterministic tool requested (e.g. portfolio.open, github.open) */
  requestedTool?: string
  /** Phase 5A: Deterministic tool input arguments */
  toolArgs?: Record<string, any>
  /** Phase 5B: Multi-step tool plan */
  toolPlan?: ToolPlan
}

export type QueryUnderstandingFailureType =
  | 'QUERY_UNDERSTANDING_SUCCESS'
  | 'QUERY_UNDERSTANDING_FAILURE'
  | 'RETRIEVAL_FAILURE'
  | 'EVIDENCE_AUTHORITY_FAILURE'
  | 'SYNTHESIS_FAILURE'
  | 'CONTEXT_RESOLUTION_FAILURE'

export interface ConversationContext {
  activeProject?: string
  comparisonProjects?: string[]
  activeEntities?: string[]
  activeTopic?: string
  previousInformationNeed?: string
  previousEvidenceSummary?: string
  recentQuestion?: string
  recentAnswerSummary?: string
  turnCount: number
  sessionMemory?: SessionMemory
}

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

/** Canonical project aliases for entity extraction */
const PROJECT_ALIASES: Record<string, string> = {}

// Build alias map from canonical projectsMetadata
for (const p of projectsMetadata) {
  // Slug itself
  PROJECT_ALIASES[p.slug] = p.slug
  // Title lowercase
  PROJECT_ALIASES[p.title.toLowerCase()] = p.slug
  // Common aliases
  if (p.slug === 'vm-copy') {
    PROJECT_ALIASES['vm copy'] = p.slug
    PROJECT_ALIASES['question generator'] = p.slug
    PROJECT_ALIASES['vm-copy'] = p.slug
    PROJECT_ALIASES['vmcopy'] = p.slug
  }
  if (p.slug === 'ai-worksheets') {
    PROJECT_ALIASES['worksheet'] = p.slug
    PROJECT_ALIASES['worksheets'] = p.slug
    PROJECT_ALIASES['ai worksheets'] = p.slug
  }
  if (p.slug === 'curriculum-etl') {
    PROJECT_ALIASES['etl'] = p.slug
    PROJECT_ALIASES['curriculum transformation'] = p.slug
    PROJECT_ALIASES['map-reduce'] = p.slug
    PROJECT_ALIASES['curriculum engine'] = p.slug
  }
  if (p.slug === 'math-item-bank') {
    PROJECT_ALIASES['item bank'] = p.slug
    PROJECT_ALIASES['item-bank'] = p.slug
    PROJECT_ALIASES['math item bank'] = p.slug
  }
  if (p.slug === 'design-automation') {
    PROJECT_ALIASES['eda'] = p.slug
    PROJECT_ALIASES['cad'] = p.slug
    PROJECT_ALIASES['design automation'] = p.slug
    PROJECT_ALIASES['engineering design'] = p.slug
    PROJECT_ALIASES['engineering design automation'] = p.slug
    PROJECT_ALIASES['engineering design system'] = p.slug
    PROJECT_ALIASES['shaft'] = p.slug
    PROJECT_ALIASES['opencascade'] = p.slug
  }
  if (p.slug === 'loom-ai') {
    PROJECT_ALIASES['loom'] = p.slug
    PROJECT_ALIASES['textile'] = p.slug
    PROJECT_ALIASES['marketplace'] = p.slug
  }
  if (p.slug === 'atlas-ai') {
    PROJECT_ALIASES['atlas'] = p.slug
    PROJECT_ALIASES['financial'] = p.slug
    PROJECT_ALIASES['sec'] = p.slug
    PROJECT_ALIASES['sec edgar'] = p.slug
  }
  if (p.slug === 'ai-reliability') {
    PROJECT_ALIASES['reliability'] = p.slug
    PROJECT_ALIASES['qa harness'] = p.slug
    PROJECT_ALIASES['browser qa'] = p.slug
    PROJECT_ALIASES['reliability harness'] = p.slug
    PROJECT_ALIASES['qa system'] = p.slug
  }
  if (p.slug === 'binance-bot') {
    PROJECT_ALIASES['binance'] = p.slug
    PROJECT_ALIASES['futures bot'] = p.slug
    PROJECT_ALIASES['trading bot'] = p.slug
  }
  if (p.slug === 'ask-aadil') {
    PROJECT_ALIASES['ask aadil'] = p.slug
    PROJECT_ALIASES['portfolio agent'] = p.slug
  }
  if (p.slug === 'solace-ai') {
    PROJECT_ALIASES['solace'] = p.slug
    PROJECT_ALIASES['solace ai'] = p.slug
    PROJECT_ALIASES['solace hackathon'] = p.slug
    PROJECT_ALIASES['wellness companion'] = p.slug
  }
  if (p.slug === 'ocr-evaluator') {
    PROJECT_ALIASES['ocr evaluator'] = p.slug
    PROJECT_ALIASES['ocr evaluation'] = p.slug
    PROJECT_ALIASES['ocr platform'] = p.slug
    PROJECT_ALIASES['ocr robustness'] = p.slug
    PROJECT_ALIASES['ocr'] = p.slug
    PROJECT_ALIASES['tesseract'] = p.slug
  }
}

const TECHNOLOGY_KEYWORDS = [
  'langgraph', 'fastapi', 'python', 'next.js', 'nextjs', 'react', 'react native', 'expo', 'docker',
  'mongodb', 'supabase', 'opencascade', 'playwright', 'katex', 'tikz', 'latex',
  'claude', 'gemini', 'portkey', 'pydantic', 'typescript', 'vitest',
  'pytest', 'celery', 'redis', 'tailwind', 'openai', 'cadquery', 'svg', 'sse',
  'tesseract', 'opencv', 'pillow'
]

// ---------------------------------------------------------------------------
// CONTEXT EXTRACTION (from previous conversation state)
// ---------------------------------------------------------------------------

export function extractConversationContext(state?: AgentConversationState): ConversationContext {
  if (!state) {
    return { turnCount: 1 }
  }

  const memory = state.sessionMemory
  const activeTopic = getActiveTopic(memory)
  const activeProject = activeTopic?.entitySlug || state.activeProject

  // Build a compact context from the existing state and session memory
  const ctx: ConversationContext = {
    activeProject,
    comparisonProjects: memory?.comparisonEntities,
    activeEntities: activeTopic ? [activeTopic.displayTitle] : [],
    activeTopic: activeTopic?.displayTitle,
    turnCount: state.turnCount || 1,
    recentQuestion: state.recentQuestion,
    recentAnswerSummary: state.recentAnswerSummary,
    sessionMemory: memory
  }

  if (state.activeEntity && !ctx.activeEntities?.includes(state.activeEntity)) {
    ctx.activeEntities = [...(ctx.activeEntities || []), state.activeEntity]
  }

  if (state.currentIntent && state.currentIntent !== 'unknown') {
    ctx.previousInformationNeed = state.currentIntent
  }

  // Extract evidence summary from last retrieval
  if (state.evidenceContext && state.evidenceContext.length > 0) {
    const topEvidence = state.evidenceContext.slice(0, 3)
    ctx.previousEvidenceSummary = topEvidence.map(e =>
      `[${e.sourceType}] ${e.entity || e.source}: ${e.content.slice(0, 80)}...`
    ).join('\n')
  }

  return ctx
}

// ---------------------------------------------------------------------------
// DETERMINISTIC ENTITY EXTRACTION (always runs, supplements LLM)
// ---------------------------------------------------------------------------

export function extractEntitiesDeterministic(query: string): {
  project?: string
  technologies: string[]
  entities: string[]
} {
  const lowerQ = query.toLowerCase()
  let project: string | undefined

  // Check project aliases (longest match first for precision)
  const sortedAliases = Object.keys(PROJECT_ALIASES).sort((a, b) => b.length - a.length)
  for (const alias of sortedAliases) {
    if (lowerQ.includes(alias)) {
      project = PROJECT_ALIASES[alias]
      break
    }
  }

  // Extract technologies
  const technologies: string[] = []
  for (const tech of TECHNOLOGY_KEYWORDS) {
    if (lowerQ.includes(tech)) {
      technologies.push(tech)
    }
  }

  // Extract named entities
  const entities: string[] = []
  if (project) {
    const pm = projectsMetadata.find(p => p.slug === project)
    if (pm) entities.push(pm.title)
  }
  if (lowerQ.includes('wayground') || lowerQ.includes('quizizz')) {
    entities.push('Wayground')
  }
  if (lowerQ.includes('aadil') || lowerQ.includes('mohemmed')) {
    entities.push('Aadil')
  }
  if (lowerQ.includes('voyagemath') || lowerQ.includes('voyage math')) {
    entities.push('VoyageMath')
    if (!project) project = 'vm-copy' // VoyageMath discussions relate to Wayground context
  }

  return { project, technologies, entities }
}

// ---------------------------------------------------------------------------
// FOLLOW-UP RESOLUTION (deterministic pronoun/reference resolution)
// ---------------------------------------------------------------------------

export function resolveFollowUp(
  query: string,
  context: ConversationContext
): { resolved: boolean; project?: string; followUp?: FollowUpReference } {
  const lowerQ = query.toLowerCase()

  // Pronouns and contextual references
  const hasPronouns =
    /\b(it|its|this|that|the project|the system|this system|this project|that one|this one)\b/.test(lowerQ)
  const hasFollowUp =
    lowerQ.includes('what about') ||
    lowerQ.includes('how about') ||
    lowerQ.includes('and what') ||
    lowerQ.includes('what happened after') ||
    lowerQ.includes('after that') ||
    lowerQ.includes('then what') ||
    lowerQ.includes('and then') ||
    lowerQ.includes('why was') ||
    lowerQ.includes('why did') ||
    lowerQ.includes('how does') ||
    lowerQ.includes('how many') ||
    lowerQ.includes('what does') ||
    lowerQ.includes('where is') ||
    lowerQ.includes('show me')

  // If we have pronouns and an active project, resolve to that project
  if (hasPronouns && context.activeProject) {
    return {
      resolved: true,
      project: context.activeProject,
      followUp: {
        type: 'project',
        value: context.activeProject
      }
    }
  }

  // "What about X?" where X is a new project
  if (lowerQ.startsWith('what about ') || lowerQ.startsWith('how about ')) {
    const rest = lowerQ.replace(/^(what|how) about /, '').replace(/[?.!]$/, '').trim()
    const entities = extractEntitiesDeterministic(rest)
    if (entities.project) {
      return {
        resolved: true,
        project: entities.project,
        followUp: {
          type: 'project',
          value: entities.project
        }
      }
    }
  }

  // Technology follow-ups with active project context ("Why LangGraph?", "Why TikZ?")
  if (hasFollowUp && !extractEntitiesDeterministic(query).project && context.activeProject) {
    return {
      resolved: true,
      project: context.activeProject,
      followUp: {
        type: 'project',
        value: context.activeProject
      }
    }
  }

  // Short questions with a technology keyword but no project ("Why LangGraph?", "Why Docker?")
  // When there's an active project in context, resolve to that project
  const detectedTechsInQuery = TECHNOLOGY_KEYWORDS.filter(t => lowerQ.includes(t))
  const isShortQuestion = query.trim().split(/\s+/).length <= 5
  if (
    isShortQuestion &&
    detectedTechsInQuery.length > 0 &&
    !extractEntitiesDeterministic(query).project &&
    context.activeProject
  ) {
    return {
      resolved: true,
      project: context.activeProject,
      followUp: {
        type: 'technology',
        value: detectedTechsInQuery[0]
      }
    }
  }

  return { resolved: false }
}

// ---------------------------------------------------------------------------
// LLM QUERY UNDERSTANDING PROMPT
// ---------------------------------------------------------------------------

const QUERY_UNDERSTANDING_SYSTEM_PROMPT = `You are a query-understanding module for a portfolio knowledge agent about Mohemmed Aadil Khurshid, an AI Systems Engineer.

Your ONLY job is to classify the user's information need and extract entities. You do NOT answer questions.

Available intent categories:
- identity: "Who is Aadil?", "What does he do?"
- about: Personal background, story, how he got into engineering
- overview: General overview of work/focus (no specific project)
- projects: Enumerate/list all projects
- project_overview: Overview of a specific project
- technical: How something works, architecture, implementation details
- technology: Technology stack, what tools/frameworks are used
- narrative: Why something was built, reasoning, what broke, career transitions
- contribution: What did Aadil contribute to a team system, ownership questions
- foundations: Engineering principles, philosophy
- professional: Career history, resume, formal roles, employment
- timeline: Chronological dates, when things happened
- current_focus: What is Aadil currently working on
- contact: How to reach Aadil, email, phone
- cross_source: Complete multi-perspective story of a project/topic
- unknown: Cannot determine or not portfolio-related

Available project slugs: vm-copy, ai-worksheets, curriculum-etl, math-item-bank, design-automation, loom-ai, atlas-ai, ai-reliability, binance-bot, ask-aadil, solace-ai

Respond ONLY with valid JSON matching this schema:
{
  "intent": "<intent category>",
  "informationNeed": "<1-sentence description of what the user wants to know>",
  "requestMode": "<information|navigation|action|clarification>",
  "requestedTool": "<portfolio.search|portfolio.open|github.open|linkedin.open|contact.open|null>",
  "toolArgs": {"entity": "<slug or null>", "project": "<slug or null>"},
  "toolPlan": {
    "goal": "<goal description>",
    "steps": [
      {
        "id": "step-1",
        "toolName": "<portfolio.search|portfolio.open|github.open|linkedin.open|contact.open>",
        "arguments": {"query": "<search text>", "entity": "<slug>", "project": "<slug>", "target": "<slug>"},
        "dependsOn": ["<step id>"]
      }
    ]
  },
  "entities": ["<extracted entity names>"],
  "project": "<project slug or null>",
  "technologies": ["<detected technologies>"],
  "sourcesNeeded": ["<journal|timeline|system|resume|github|structured_profile>"],
  "timeScope": "<temporal scope or null>",
  "contributionScope": "<independent|team|contribution|any or null>",
  "normalizedRetrievalQuery": "<expanded query for retrieval>",
  "confidence": <0.0-1.0>,
  "needsClarification": <true|false>,
  "clarificationQuestion": "<question to ask if ambiguous, or null>"
}

Rules:
1. Do NOT determine factual ownership. Only classify intent.
2. Do NOT generate quantitative facts. Only identify the metric being asked about.
3. "contribution" intent applies when asking about someone's role/part in a team system.
4. Expand abbreviations in normalizedRetrievalQuery: "EDA" → "Engineering Design Automation EDA CAD".
5. If context says activeProject=X and user says "it"/"this", resolve to project X.
6. For career/evolution questions, set sourcesNeeded to ["journal","timeline","system"].
7. If genuinely ambiguous with no context, set needsClarification=true.
8. For multi-step requests requiring both information & navigation (e.g. "Tell me about Loom and open its GitHub"), set requestMode to "navigation" and include a toolPlan with step-1 (portfolio.search) and step-2 (github.open, dependsOn: ["step-1"]).
9. For pure information requests ("Who is Aadil?", "Why LangGraph?"), set requestMode to "information" and toolPlan to null.
10. NEVER propose side-effect tools (email.send, calendar.create, phone.call).`

function buildQueryUnderstandingPrompt(
  query: string,
  context: ConversationContext
): string {
  let prompt = `USER QUESTION: "${query}"\n`

  if (context.activeProject) {
    const pm = projectsMetadata.find(p => p.slug === context.activeProject)
    prompt += `ACTIVE PROJECT CONTEXT: ${context.activeProject} (${pm?.title || context.activeProject})\n`
  }
  if (context.activeEntities && context.activeEntities.length > 0) {
    prompt += `ACTIVE ENTITIES: ${context.activeEntities.join(', ')}\n`
  }
  if (context.previousInformationNeed) {
    prompt += `PREVIOUS INTENT: ${context.previousInformationNeed}\n`
  }
  if (context.recentQuestion) {
    prompt += `PREVIOUS QUESTION: "${context.recentQuestion}"\n`
  }
  if (context.recentAnswerSummary) {
    prompt += `PREVIOUS ANSWER SUMMARY: ${context.recentAnswerSummary}\n`
  }
  if (context.sessionMemory) {
    const sessionSummary = formatSessionContextForPrompt(context.sessionMemory)
    if (sessionSummary) {
      prompt += `SESSION MEMORY CONTEXT:\n${sessionSummary}\n`
    }
  }

  prompt += `\nClassify this query. Output ONLY valid JSON.`
  return prompt
}

// ---------------------------------------------------------------------------
// LLM CALL WITH VALIDATION
// ---------------------------------------------------------------------------

interface RawLlmUnderstanding {
  intent?: string
  informationNeed?: string
  entities?: string[]
  project?: string | null
  technologies?: string[]
  sourcesNeeded?: string[]
  timeScope?: string | null
  contributionScope?: string | null
  normalizedRetrievalQuery?: string
  confidence?: number
  needsClarification?: boolean
  clarificationQuestion?: string | null
  requestMode?: RequestMode
  requestedTool?: string | null
  toolArgs?: Record<string, any> | null
  toolPlan?: ToolPlan | null
}

const VALID_INTENTS: QueryIntent[] = [
  'identity', 'overview', 'about', 'projects', 'project_overview',
  'technology', 'timeline', 'narrative', 'technical', 'contribution',
  'current_focus', 'foundations', 'contact', 'cross_source', 'unknown',
  'professional', 'chronology'
]

function validateLlmResult(raw: RawLlmUnderstanding): boolean {
  if (!raw || typeof raw !== 'object') return false
  if (!raw.intent || !VALID_INTENTS.includes(raw.intent as QueryIntent)) return false
  if (!raw.informationNeed || typeof raw.informationNeed !== 'string') return false
  if (!Array.isArray(raw.entities)) return false
  if (typeof raw.confidence !== 'number' || raw.confidence < 0 || raw.confidence > 1) return false
  if (raw.project && typeof raw.project !== 'string') return false
  return true
}

function resolveProjectSlug(rawProject: string | null | undefined): string | undefined {
  if (!rawProject) return undefined
  const lower = rawProject.toLowerCase()
  // Direct slug match
  if (projectsMetadata.some(p => p.slug === lower)) return lower
  // Alias match
  if (PROJECT_ALIASES[lower]) return PROJECT_ALIASES[lower]
  return undefined
}

async function callLlmForUnderstanding(
  query: string,
  context: ConversationContext
): Promise<QueryUnderstanding | null> {
  const geminiKey = process.env.GEMINI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY
  const ollamaHost = process.env.OLLAMA_HOST || process.env.OLLAMA_BASE_URL

  if (!geminiKey && !openaiKey && !ollamaHost) {
    return null // No LLM available
  }

  const userPrompt = buildQueryUnderstandingPrompt(query, context)

  try {
    let rawText: string | null = null

    // A. Gemini Provider
    if (geminiKey) {
      const configuredModel = process.env.GEMINI_MODEL
      const geminiModels = configuredModel
        ? [configuredModel, 'gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-3.5-flash']
        : ['gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-3.5-flash']
      for (const model of geminiModels) {
        if (rawText) break
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 12000)

        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal,
              body: JSON.stringify({
                contents: [{
                  role: 'user',
                  parts: [{ text: `${QUERY_UNDERSTANDING_SYSTEM_PROMPT}\n\n${userPrompt}` }]
                }],
                generationConfig: {
                  temperature: 0.05,
                  maxOutputTokens: 1024,
                  responseMimeType: 'application/json'
                }
              })
            }
          )
          clearTimeout(timeout)

          if (response.ok) {
            const data = await response.json()
            rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || null
          }
        } catch (e: any) {
          clearTimeout(timeout)
          if (e.name === 'AbortError') {
            console.warn(`[QueryUnderstanding] Gemini (${model}) request timed out (12s)`)
          } else {
            console.warn(`[QueryUnderstanding] Gemini (${model}) request failed:`, e.message)
          }
        }
      }
    }

    // B. OpenAI Provider
    if (!rawText && openaiKey) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiKey}`
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: QUERY_UNDERSTANDING_SYSTEM_PROMPT },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.05,
            max_tokens: 400,
            response_format: { type: 'json_object' }
          })
        })
        clearTimeout(timeout)

        if (response.ok) {
          const data = await response.json()
          rawText = data?.choices?.[0]?.message?.content || null
        }
      } catch (e: any) {
        clearTimeout(timeout)
        console.warn('[QueryUnderstanding] OpenAI request failed:', e.message)
      }
    }

    // C. Ollama Provider
    if (!rawText && ollamaHost) {
      const host = ollamaHost.replace(/\/$/, '')
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      try {
        const response = await fetch(`${host}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            model: 'qwen2.5-coder',
            messages: [
              { role: 'system', content: QUERY_UNDERSTANDING_SYSTEM_PROMPT },
              { role: 'user', content: userPrompt }
            ],
            format: 'json',
            stream: false
          })
        })
        clearTimeout(timeout)

        if (response.ok) {
          const data = await response.json()
          rawText = data?.message?.content || null
        }
      } catch (e: any) {
        clearTimeout(timeout)
        console.warn('[QueryUnderstanding] Ollama request failed:', e.message)
      }
    }

    if (!rawText) return null

    // Parse JSON safely from LLM output
    let cleaned = rawText.trim()
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleaned = jsonMatch[0]
    }

    const parsed: RawLlmUnderstanding = JSON.parse(cleaned)

    if (!validateLlmResult(parsed)) {
      console.warn('[QueryUnderstanding] LLM returned invalid schema:', parsed)
      return null
    }

    // Build validated QueryUnderstanding
    const resolvedProject = resolveProjectSlug(parsed.project)

    return {
      intent: parsed.intent as QueryIntent,
      informationNeed: parsed.informationNeed!,
      entities: parsed.entities || [],
      project: resolvedProject,
      technologies: parsed.technologies || [],
      sourcesNeeded: parsed.sourcesNeeded || [],
      timeScope: parsed.timeScope || undefined,
      contributionScope: (parsed.contributionScope as any) || undefined,
      followUpReference: undefined,
      normalizedRetrievalQuery: parsed.normalizedRetrievalQuery || query,
      confidence: parsed.confidence!,
      source: 'llm',
      needsClarification: parsed.needsClarification || false,
      clarificationQuestion: parsed.clarificationQuestion || undefined,
      requestMode: parsed.requestMode || 'information',
      requestedTool: parsed.requestedTool || undefined,
      toolArgs: parsed.toolArgs || undefined,
      toolPlan: parsed.toolPlan || undefined
    }
  } catch (err) {
    console.warn('[QueryUnderstanding] LLM understanding failed:', err)
    return null
  }
}

// ---------------------------------------------------------------------------
// DETERMINISTIC FALLBACK (uses existing IntentRouter)
// ---------------------------------------------------------------------------

function buildDeterministicUnderstanding(
  query: string,
  context: ConversationContext,
  state?: AgentConversationState
): QueryUnderstanding {
  const decision = classifyAndRoute(query, state)
  const detEntities = extractEntitiesDeterministic(query)

  // Check for follow-up resolution
  const followUp = resolveFollowUp(query, context)

  const project = decision.detectedProjectSlug || followUp.project || detEntities.project

  let requestMode: RequestMode = 'information'
  let requestedTool: string | undefined = undefined
  let toolArgs: Record<string, any> | undefined = undefined

  const lowerQ = query.toLowerCase()

  const isHypotheticalOrConceptual =
    lowerQ.includes('what happens if') ||
    lowerQ.includes('what if') ||
    lowerQ.includes('how does it handle') ||
    lowerQ.includes('unavailable') ||
    lowerQ.includes('offline') ||
    lowerQ.includes('fallback')

  if ((lowerQ.includes('github') || lowerQ.includes('repo')) && !isHypotheticalOrConceptual) {
    requestMode = 'navigation'
    requestedTool = 'github.open'
    if (project) toolArgs = { project }
  } else if (lowerQ.includes('linkedin') && (lowerQ.includes('open') || lowerQ.includes('go to') || lowerQ.includes('link') || lowerQ.includes('url'))) {
    requestMode = 'navigation'
    requestedTool = 'linkedin.open'
  } else if (lowerQ.includes('draft email') || lowerQ.includes('draft an email') || lowerQ.includes('write an email') || lowerQ.includes('compose email')) {
    const emailMatch = query.match(/[\w.-]+@[\w.-]+\.\w+/)
    requestMode = 'action'
    requestedTool = 'email.draft'
    toolArgs = {
      recipient: emailMatch ? emailMatch[0] : structuredProfile.email,
      project: project || undefined
    }
  } else if (lowerQ.includes('send email') || lowerQ.includes('send an email') || lowerQ.includes('schedule a meeting') || lowerQ.includes('schedule meeting')) {
    const emailMatch = query.match(/[\w.-]+@[\w.-]+\.\w+/)
    requestMode = 'action'
    requestedTool = 'email.send'
    toolArgs = { recipient: emailMatch ? emailMatch[0] : 'aadil@example.com' }
  } else if (lowerQ.includes('open') || lowerQ.includes('view') || lowerQ.includes('go to') || lowerQ.includes('show me')) {
    if (project || lowerQ.includes('journal') || lowerQ.includes('timeline') || lowerQ.includes('experience') || lowerQ.includes('systems') || lowerQ.includes('contact')) {
      requestMode = 'navigation'
      requestedTool = 'portfolio.open'
      const targetEntity = project || (lowerQ.includes('journal') ? 'journal' : lowerQ.includes('timeline') ? 'timeline' : lowerQ.includes('systems') ? 'systems' : lowerQ.includes('contact') ? 'contact' : undefined)
      if (targetEntity) toolArgs = { entity: targetEntity }
    }
  }

  let toolPlan: ToolPlan | undefined = undefined

  const isMultiStep = (lowerQ.includes('and then') || lowerQ.includes('and open') || lowerQ.includes('and show') || (lowerQ.includes('tell me') && lowerQ.includes('github'))) && requestedTool

  if (isMultiStep && requestedTool) {
    const searchTarget = project || query
    toolPlan = {
      planId: `plan_det_${Date.now()}`,
      goal: `Search portfolio for ${searchTarget} and then execute ${requestedTool}`,
      steps: [
        {
          id: 'step-1',
          toolName: 'portfolio.search',
          arguments: { query: searchTarget }
        },
        {
          id: 'step-2',
          toolName: requestedTool,
          arguments: toolArgs || { project },
          dependsOn: ['step-1']
        }
      ]
    }
  } else if (requestedTool) {
    toolPlan = createSingleStepPlan(requestedTool, toolArgs || {})
  }

  return {
    intent: decision.intent,
    informationNeed: `${decision.intent} query`,
    entities: detEntities.entities,
    project,
    technologies: decision.detectedTechnologies || detEntities.technologies,
    sourcesNeeded: [],
    timeScope: decision.detectedYearOrPeriod,
    contributionScope: undefined,
    followUpReference: followUp.followUp,
    normalizedRetrievalQuery: query,
    confidence: decision.confidence,
    source: 'deterministic_fallback',
    needsClarification: false,
    requestMode,
    requestedTool,
    toolArgs,
    toolPlan
  }
}

// ---------------------------------------------------------------------------
// MAIN ENTRY POINT
// ---------------------------------------------------------------------------

export interface QueryUnderstandingTrace {
  originalQuestion: string
  resolvedContext: ConversationContext
  queryUnderstanding: QueryUnderstanding
  normalizedRetrievalQuery: string
  failureType: QueryUnderstandingFailureType
  /** Duration of LLM call in ms, or 0 if deterministic */
  llmLatencyMs: number
}

/**
 * Understand a user's question using LLM with deterministic fallback.
 *
 * Flow:
 * 1. Extract conversation context from previous state
 * 2. Try LLM-powered query understanding
 * 3. If LLM fails/unavailable → use deterministic IntentRouter
 * 4. Apply follow-up resolution from context
 * 5. Validate and merge with deterministic entity extraction
 * 6. Return structured QueryUnderstanding + observability trace
 */
export async function understandQuery(
  query: string,
  prevState?: AgentConversationState
): Promise<{ understanding: QueryUnderstanding; trace: QueryUnderstandingTrace }> {
  const context = extractConversationContext(prevState)
  const startTime = Date.now()

  // Phase 2.1: Run contextual resolution engine
  const contextRes = resolveContextualQuery(query, prevState?.sessionMemory, prevState)

  // 1. Ambiguity detection interception (Scenario D)
  if (contextRes.type === 'ambiguity_detected' && contextRes.clarificationQuestion) {
    const understanding: QueryUnderstanding = {
      intent: 'technical',
      informationNeed: 'Ambiguous entity reference requires clarification',
      entities: contextRes.resolvedEntities,
      normalizedRetrievalQuery: query,
      confidence: 0.95,
      source: 'deterministic_fallback',
      needsClarification: true,
      clarificationQuestion: contextRes.clarificationQuestion,
      requestMode: 'clarification'
    }
    const trace: QueryUnderstandingTrace = {
      originalQuestion: query,
      resolvedContext: context,
      queryUnderstanding: understanding,
      normalizedRetrievalQuery: query,
      failureType: 'QUERY_UNDERSTANDING_SUCCESS',
      llmLatencyMs: 0
    }
    return { understanding, trace }
  }

  // 2. Misunderstanding recovery interception (Scenario E)
  if (contextRes.type === 'misunderstanding_recovery' && contextRes.clarificationQuestion) {
    const understanding: QueryUnderstanding = {
      intent: 'unknown',
      informationNeed: 'User reported misunderstanding; clarifying information need',
      entities: contextRes.resolvedEntities,
      project: contextRes.activeProject,
      normalizedRetrievalQuery: query,
      confidence: 0.95,
      source: 'deterministic_fallback',
      needsClarification: true,
      clarificationQuestion: contextRes.clarificationQuestion,
      requestMode: 'clarification'
    }
    const trace: QueryUnderstandingTrace = {
      originalQuestion: query,
      resolvedContext: context,
      queryUnderstanding: understanding,
      normalizedRetrievalQuery: query,
      failureType: 'QUERY_UNDERSTANDING_SUCCESS',
      llmLatencyMs: 0
    }
    return { understanding, trace }
  }

  // 3. Try LLM understanding
  let understanding = await callLlmForUnderstanding(query, context)
  const llmLatencyMs = Date.now() - startTime

  let failureType: QueryUnderstandingFailureType = 'QUERY_UNDERSTANDING_SUCCESS'

  if (!understanding) {
    // 4. Fallback to deterministic router
    understanding = buildDeterministicUnderstanding(query, context, prevState)
    failureType = understanding.intent === 'unknown'
      ? 'QUERY_UNDERSTANDING_FAILURE'
      : 'QUERY_UNDERSTANDING_SUCCESS'
  }

  // 5. Apply contextual resolution results (corrections, multi-entity, topic restoration, pronouns)
  if (contextRes.resolved) {
    if (contextRes.activeProject) {
      understanding.project = contextRes.activeProject
    }
    if (contextRes.comparisonProjects && contextRes.comparisonProjects.length > 0) {
      understanding.comparisonProjects = contextRes.comparisonProjects
    }
    if (contextRes.normalizedQuery && contextRes.type !== 'direct_match') {
      understanding.normalizedRetrievalQuery = contextRes.normalizedQuery
    }
    if (contextRes.type === 'correction') {
      understanding.intent = 'project_overview'
    }
    if (contextRes.resolvedEntities.length > 0) {
      for (const ent of contextRes.resolvedEntities) {
        if (!understanding.entities.includes(ent)) {
          understanding.entities.push(ent)
        }
      }
    }
  }

  // 6. Always merge with deterministic entity extraction for safety
  const detEntities = extractEntitiesDeterministic(query)

  // If LLM didn't detect a project but deterministic did, use deterministic
  if (!understanding.project && detEntities.project) {
    understanding.project = detEntities.project
  }

  // If LLM didn't detect technologies but deterministic did, merge
  if ((!understanding.technologies || understanding.technologies.length === 0) && detEntities.technologies.length > 0) {
    understanding.technologies = detEntities.technologies
  }

  // 7. Apply follow-up resolution from conversation context
  const followUp = resolveFollowUp(query, context)
  if (followUp.resolved && !understanding.project) {
    understanding.project = followUp.project
    understanding.followUpReference = followUp.followUp
  }
  // If LLM result already has a project, but follow-up says different project and no explicit project in query
  if (followUp.resolved && followUp.project && !detEntities.project && understanding.source === 'llm') {
    // The LLM might have inferred a project from context — keep it
    // But if the LLM said null and context says active project, use context
    if (!understanding.project) {
      understanding.project = followUp.project
      understanding.followUpReference = followUp.followUp
    }
  }

  // 8. Build the trace
  const trace: QueryUnderstandingTrace = {
    originalQuestion: query,
    resolvedContext: context,
    queryUnderstanding: understanding,
    normalizedRetrievalQuery: understanding.normalizedRetrievalQuery,
    failureType,
    llmLatencyMs: understanding.source === 'llm' ? llmLatencyMs : 0
  }

  return { understanding, trace }
}

// ---------------------------------------------------------------------------
// CONVERT QueryUnderstanding → RoutingDecision (for Phase 2 retrieval)
// ---------------------------------------------------------------------------

/**
 * Convert a QueryUnderstanding into a RoutingDecision compatible with
 * the existing retrieveHybrid() function, preserving full Phase 2 compatibility.
 */
export function toRoutingDecision(understanding: QueryUnderstanding): RoutingDecision {
  const rule = sourceAuthorityRules[understanding.intent] || sourceAuthorityRules.unknown

  return {
    intent: understanding.intent,
    rule,
    detectedProjectSlug: understanding.project,
    comparisonProjectSlugs: understanding.comparisonProjects,
    detectedTechnologies: understanding.technologies,
    detectedYearOrPeriod: understanding.timeScope,
    sourcesNeeded: understanding.sourcesNeeded,
    confidence: understanding.confidence
  }
}
