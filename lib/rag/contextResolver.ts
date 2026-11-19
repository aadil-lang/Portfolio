/**
 * CONTEXT RESOLVER MODULE — Phase 2.1
 *
 * Handles multi-turn conversational intelligence:
 * 1. Follow-up pronoun & reference resolution
 * 2. Multi-entity comparison tracking
 * 3. Topic switching and restoration ("Going back to...")
 * 4. Genuine ambiguity detection and pending clarification
 * 5. User correction handling & invalidation ("Actually, I meant...")
 * 6. Stale context contamination prevention
 */

import {
  PendingClarification,
  SessionMemory,
  AgentConversationState,
  TopicStackItem
} from '@/types/rag'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'
import {
  getActiveTopic,
  restoreTopic,
  updateTopicStack,
  invalidateActiveTopic,
  setComparisonEntities,
  setPendingClarification,
  clearPendingClarification,
  getProjectDisplayTitle
} from './sessionMemory'

export interface ContextResolutionResult {
  resolved: boolean
  type:
    | 'direct_match'
    | 'pronoun_followup'
    | 'topic_switch'
    | 'topic_restoration'
    | 'multi_entity_comparison'
    | 'clarification_response'
    | 'ambiguity_detected'
    | 'correction'
    | 'misunderstanding_recovery'
    | 'none'
  activeProject?: string
  comparisonProjects?: string[]
  clarificationQuestion?: string
  pendingClarification?: PendingClarification
  correctionAcknowledgment?: string
  normalizedQuery: string
  resolvedEntities: string[]
  wasCorrection?: boolean
}

// Canonical project alias map for fast lookup
const PROJECT_ALIASES: Record<string, string> = {
  'vm copy': 'vm-copy',
  'vm-copy': 'vm-copy',
  'vmcopy': 'vm-copy',
  'question generator': 'vm-copy',
  'ai worksheets': 'ai-worksheets',
  'ai worksheet': 'ai-worksheets',
  'worksheet': 'ai-worksheets',
  'worksheets': 'ai-worksheets',
  'curriculum etl': 'curriculum-etl',
  'curriculum transformation': 'curriculum-etl',
  'etl': 'curriculum-etl',
  'map-reduce': 'curriculum-etl',
  'math item bank': 'math-item-bank',
  'item bank': 'math-item-bank',
  'item-bank': 'math-item-bank',
  'design automation': 'design-automation',
  'engineering design automation': 'design-automation',
  'engineering design': 'design-automation',
  'eda': 'design-automation',
  'cad': 'design-automation',
  'loom ai': 'loom-ai',
  'loom': 'loom-ai',
  'textile marketplace': 'loom-ai',
  'atlas ai': 'atlas-ai',
  'atlas': 'atlas-ai',
  'sec edgar': 'atlas-ai',
  'edgar': 'atlas-ai',
  'ai reliability': 'ai-reliability',
  'reliability': 'ai-reliability',
  'qa harness': 'ai-reliability',
  'browser qa': 'ai-reliability',
  'binance bot': 'binance-bot',
  'binance': 'binance-bot',
  'futures bot': 'binance-bot',
  'ask aadil': 'ask-aadil',
  'ask-aadil': 'ask-aadil',
  'portfolio agent': 'ask-aadil',
  'solace ai': 'solace-ai',
  'solace': 'solace-ai',
  'wellness companion': 'solace-ai',
  'ocr evaluator': 'ocr-evaluator',
  'ocr evaluation': 'ocr-evaluator',
  'ocr platform': 'ocr-evaluator',
  'ocr robustness': 'ocr-evaluator',
  'ocr': 'ocr-evaluator'
}

/**
 * Resolves a text string to a canonical project slug.
 */
export function matchProjectSlug(text: string): string | undefined {
  const lower = text.toLowerCase().trim()
  // Direct slug match
  if (projectsMetadata.some(p => p.slug === lower)) return lower
  // Alias match
  for (const [alias, slug] of Object.entries(PROJECT_ALIASES)) {
    if (lower === alias || lower.includes(alias)) {
      return slug
    }
  }
  // Title match
  for (const p of projectsMetadata) {
    if (lower.includes(p.title.toLowerCase())) {
      return p.slug
    }
  }
  return undefined
}

/**
 * Extracts all project slugs mentioned in a text.
 */
export function extractAllProjectSlugs(text: string): string[] {
  const lower = text.toLowerCase()
  const found: string[] = []

  // Check alias mappings sorted by longest first
  const sortedAliases = Object.keys(PROJECT_ALIASES).sort((a, b) => b.length - a.length)
  for (const alias of sortedAliases) {
    const slug = PROJECT_ALIASES[alias]
    if (lower.includes(alias) && !found.includes(slug)) {
      found.push(slug)
    }
  }

  for (const p of projectsMetadata) {
    if (lower.includes(p.title.toLowerCase()) && !found.includes(p.slug)) {
      found.push(p.slug)
    }
  }

  return found
}

/**
 * Main Context Resolution Entry Point.
 */
export function resolveContextualQuery(
  query: string,
  memory?: SessionMemory,
  state?: AgentConversationState
): ContextResolutionResult {
  const cleanQ = query.trim()
  const lowerQ = cleanQ.toLowerCase()

  // -------------------------------------------------------------------------
  // 1. PENDING CLARIFICATION RESOLUTION (Scenario D follow-up)
  // -------------------------------------------------------------------------
  if (memory?.pendingClarification) {
    const pending = memory.pendingClarification
    // Check if user's query answers the pending clarification
    for (const candidate of pending.candidateEntities) {
      const slugMatch = lowerQ.includes(candidate.slug)
      const titleMatch = lowerQ.includes(candidate.title.toLowerCase())
      const isVmCopyMatch = candidate.slug === 'vm-copy' && (
        lowerQ.includes('vm copy') ||
        lowerQ.includes('question') ||
        lowerQ.includes('first') ||
        lowerQ === '1' ||
        lowerQ.includes('synthetic')
      )
      const isOcrMatch = candidate.slug === 'ocr-evaluator' && (
        lowerQ.includes('ocr') ||
        lowerQ.includes('robustness') ||
        lowerQ.includes('second') ||
        lowerQ === '2' ||
        lowerQ.includes('document')
      )

      if (slugMatch || titleMatch || isVmCopyMatch || isOcrMatch) {
        clearPendingClarification(memory)
        updateTopicStack(memory, candidate.slug, candidate.title)

        return {
          resolved: true,
          type: 'clarification_response',
          activeProject: candidate.slug,
          normalizedQuery: `${candidate.title} evaluator architecture and implementation`,
          resolvedEntities: [candidate.title]
        }
      }
    }
    // If user asked an entirely unrelated question, dismiss pending clarification and continue
    clearPendingClarification(memory)
  }

  // -------------------------------------------------------------------------
  // 2. USER CORRECTION HANDLING (Scenario E)
  // -------------------------------------------------------------------------
  // Patterns like "Actually, I meant AI Worksheets", "No, I meant...", "I was asking about..."
  const correctionMatch =
    cleanQ.match(/^(?:actually|no)[,\s]+(?:i\s+meant|i\s+was\s+talking\s+about|i\s+was\s+asking\s+about)\s+(.+)/i) ||
    cleanQ.match(/^i\s+meant\s+(.+)/i) ||
    cleanQ.match(/^no[,\s]+(?:the\s+)?(.+?)(?:\s+project|\s+system)?[.?!]?$/i)

  if (correctionMatch) {
    const targetText = correctionMatch[1].trim()
    const correctedSlug = matchProjectSlug(targetText)

    if (correctedSlug) {
      const activeTopic = getActiveTopic(memory)
      const previousSlug = activeTopic?.entitySlug || state?.activeProject
      const displayTitle = getProjectDisplayTitle(correctedSlug)

      if (memory) {
        invalidateActiveTopic(memory, correctedSlug, displayTitle)
      }

      return {
        resolved: true,
        type: 'correction',
        activeProject: correctedSlug,
        wasCorrection: true,
        correctionAcknowledgment: `Understood — switching context to **${displayTitle}**.`,
        normalizedQuery: `Tell me about ${displayTitle} (${correctedSlug})`,
        resolvedEntities: [displayTitle]
      }
    }
  }

  // Patterns like "That's not what I was asking", "That's not what I meant", "You misunderstood me"
  const isMisunderstanding =
    /^that(?:'s|\s+is)\s+not\s+what\s+i\s+(?:was\s+asking|meant)/i.test(lowerQ) ||
    /^you\s+misunderstood\s+me/i.test(lowerQ) ||
    /^not\s+what\s+i\s+asked/i.test(lowerQ)

  if (isMisunderstanding) {
    const active = getActiveTopic(memory) || (state?.activeProject ? { entitySlug: state.activeProject, displayTitle: getProjectDisplayTitle(state.activeProject) } : undefined)
    const topicPrompt = active
      ? ` regarding **${active.displayTitle}** (such as its architecture, validation layers, or Aadil's documented contributions)`
      : ''

    return {
      resolved: true,
      type: 'misunderstanding_recovery',
      activeProject: active?.entitySlug,
      clarificationQuestion: `I apologize for the misunderstanding. Could you clarify what specific topic or question you'd like to explore${topicPrompt}?`,
      normalizedQuery: cleanQ,
      resolvedEntities: active ? [active.displayTitle] : []
    }
  }

  // -------------------------------------------------------------------------
  // 3. TOPIC RESTORATION ("Going back to VM Copy...", "Returning to...", "Back to...")
  // -------------------------------------------------------------------------
  const restorationMatch =
    cleanQ.match(/(?:going\s+back\s+to|returning\s+to|back\s+to|as\s+we\s+discussed\s+earlier\s+about)\s+([^,.?!]+)/i)

  if (restorationMatch) {
    const targetName = restorationMatch[1].trim()
    const targetSlug = matchProjectSlug(targetName)

    if (targetSlug) {
      if (memory) {
        restoreTopic(memory, targetSlug)
      }
      const displayTitle = getProjectDisplayTitle(targetSlug)
      // Extract the substantive question after the restoration clause
      const restOfQuery = cleanQ
        .replace(/(?:going\s+back\s+to|returning\s+to|back\s+to|as\s+we\s+discussed\s+earlier\s+about)\s+[^,.?!]+[,;]?\s*/i, '')
        .trim()

      const normalized = restOfQuery
        ? `${displayTitle}: ${restOfQuery}`
        : `Tell me about ${displayTitle} (${targetSlug})`

      return {
        resolved: true,
        type: 'topic_restoration',
        activeProject: targetSlug,
        normalizedQuery: normalized,
        resolvedEntities: [displayTitle]
      }
    }
  }

  // -------------------------------------------------------------------------
  // 4. MULTI-ENTITY COMPARISON (Scenario C)
  // -------------------------------------------------------------------------
  const isComparisonQuery =
    lowerQ.includes('compare') ||
    lowerQ.includes('comparison') ||
    lowerQ.includes('how does it compare') ||
    lowerQ.includes('how does this compare') ||
    lowerQ.includes('which one involved') ||
    lowerQ.includes('which one was') ||
    lowerQ.includes('which project was') ||
    lowerQ.includes('which one came first') ||
    lowerQ.includes('difference between')

  const detectedSlugs = extractAllProjectSlugs(cleanQ)

  // Case A: Query mentions two explicit projects (e.g. "Compare Solace AI and Loom AI")
  if (detectedSlugs.length >= 2) {
    const primary = detectedSlugs[0]
    const comparison = detectedSlugs.slice(0, 2)
    if (memory) {
      setComparisonEntities(memory, comparison)
    }

    const titles = comparison.map(s => getProjectDisplayTitle(s))
    return {
      resolved: true,
      type: 'multi_entity_comparison',
      activeProject: primary,
      comparisonProjects: comparison,
      normalizedQuery: `Comparison between ${titles.join(' and ')}: ${cleanQ}`,
      resolvedEntities: titles
    }
  }

  // Case B: Query mentions one new project and compares with active topic
  // (e.g., Active topic = solace-ai, Query = "How does it compare with Loom AI?")
  const activeTopic = getActiveTopic(memory) || (state?.activeProject ? { entitySlug: state.activeProject, displayTitle: getProjectDisplayTitle(state.activeProject) } : undefined)

  if (isComparisonQuery && detectedSlugs.length === 1 && activeTopic) {
    const newSlug = detectedSlugs[0]
    if (newSlug !== activeTopic.entitySlug) {
      const comparison = [activeTopic.entitySlug, newSlug]
      if (memory) {
        setComparisonEntities(memory, comparison)
      }
      const titles = comparison.map(s => getProjectDisplayTitle(s))
      return {
        resolved: true,
        type: 'multi_entity_comparison',
        activeProject: activeTopic.entitySlug,
        comparisonProjects: comparison,
        normalizedQuery: `Comparison between ${titles[0]} and ${titles[1]}: ${cleanQ}`,
        resolvedEntities: titles
      }
    }
  }

  // Case C: Follow-up question about an ongoing comparison ("Which one involved more independent implementation?")
  if (isComparisonQuery && detectedSlugs.length === 0 && memory?.comparisonEntities && memory.comparisonEntities.length >= 2) {
    const comparison = memory.comparisonEntities
    const titles = comparison.map(s => getProjectDisplayTitle(s))
    return {
      resolved: true,
      type: 'multi_entity_comparison',
      activeProject: comparison[0],
      comparisonProjects: comparison,
      normalizedQuery: `Comparison between ${titles.join(' and ')}: ${cleanQ}`,
      resolvedEntities: titles
    }
  }

  // -------------------------------------------------------------------------
  // 5. GENUINE AMBIGUITY DETECTION (Scenario D)
  // -------------------------------------------------------------------------
  // Check for ambiguous "evaluator" when neither vm-copy nor ocr-evaluator is the unambiguous active context
  const hasEvaluatorTerm =
    lowerQ === 'tell me about the evaluator' ||
    lowerQ === 'tell me about the evaluator.' ||
    lowerQ === 'how does the evaluator work' ||
    lowerQ === 'how does the evaluator work?' ||
    lowerQ === 'what is the evaluator' ||
    lowerQ === 'what is the evaluator?' ||
    lowerQ === 'the evaluator' ||
    (lowerQ.includes('evaluator') && !lowerQ.includes('vm copy') && !lowerQ.includes('vm-copy') && !lowerQ.includes('ocr'))

  if (hasEvaluatorTerm) {
    // Check if immediate active topic clearly determines which evaluator
    const active = getActiveTopic(memory)
    const isVmCopyActive = active?.entitySlug === 'vm-copy' && active.salience >= 0.8
    const isOcrActive = active?.entitySlug === 'ocr-evaluator' && active.salience >= 0.8

    if (!isVmCopyActive && !isOcrActive) {
      const clarification: PendingClarification = {
        originalQuery: cleanQ,
        ambiguousTerm: 'evaluator',
        candidateEntities: [
          {
            slug: 'vm-copy',
            title: 'VM Copy Question Evaluator',
            description: 'Synthetic math question generation, schema validation & distractor checking'
          },
          {
            slug: 'ocr-evaluator',
            title: 'OCR Robustness Evaluator',
            description: 'Character/word error rate (CER/WER) evaluation & image degradation testing'
          }
        ],
        clarificationQuestion:
          'Did you mean the **VM Copy Question Evaluator** (synthetic math question generation & distractor validation) or the **OCR Robustness Evaluator** (document accuracy & image degradation platform)?',
        askedAtTurn: (memory?.turnCounter || 0) + 1
      }

      if (memory) {
        setPendingClarification(memory, clarification)
      }

      return {
        resolved: true,
        type: 'ambiguity_detected',
        clarificationQuestion: clarification.clarificationQuestion,
        pendingClarification: clarification,
        normalizedQuery: cleanQ,
        resolvedEntities: ['VM Copy', 'OCR Evaluator']
      }
    }
  }

  // -------------------------------------------------------------------------
  // 6. PRONOUN & TOPIC CONTINUITY RESOLUTION (Scenario A)
  // -------------------------------------------------------------------------
  const hasPronoun =
    /\b(it|its|this|that|the project|the system|this system|this project|that one|this one)\b/i.test(lowerQ)

  const isCrossProjectQuestion =
    lowerQ.includes('what other projects') ||
    lowerQ.includes('which other projects') ||
    lowerQ.includes('what other project') ||
    lowerQ.includes('similar approach') ||
    lowerQ.includes('other systems')

  // Case: "What other projects used a similar approach?" with active VM Copy context
  if (isCrossProjectQuestion && activeTopic) {
    return {
      resolved: true,
      type: 'topic_switch',
      activeProject: undefined, // Don't lock into single project, allow cross-project retrieval
      normalizedQuery: `Projects using a similar approach to ${activeTopic.displayTitle} (${activeTopic.entitySlug})`,
      resolvedEntities: [activeTopic.displayTitle]
    }
  }

  // Pronoun with active topic
  if (hasPronoun && activeTopic && detectedSlugs.length === 0) {
    // Guard against stale context: check if previous turn was completely unrelated
    if (memory && isContextStaleForPronouns(memory, activeTopic)) {
      return {
        resolved: false,
        type: 'none',
        normalizedQuery: cleanQ,
        resolvedEntities: []
      }
    }

    return {
      resolved: true,
      type: 'pronoun_followup',
      activeProject: activeTopic.entitySlug,
      normalizedQuery: `${activeTopic.displayTitle} (${activeTopic.entitySlug}): ${cleanQ}`,
      resolvedEntities: [activeTopic.displayTitle]
    }
  }

  // -------------------------------------------------------------------------
  // 7. DIRECT EXPLICIT PROJECT MATCH
  // -------------------------------------------------------------------------
  if (detectedSlugs.length === 1) {
    const slug = detectedSlugs[0]
    const displayTitle = getProjectDisplayTitle(slug)

    if (memory) {
      updateTopicStack(memory, slug, displayTitle)
    }

    return {
      resolved: true,
      type: 'direct_match',
      activeProject: slug,
      normalizedQuery: cleanQ,
      resolvedEntities: [displayTitle]
    }
  }

  return {
    resolved: false,
    type: 'none',
    normalizedQuery: cleanQ,
    resolvedEntities: []
  }
}

/**
 * Checks whether an active topic should be considered stale for bare pronoun resolution.
 */
function isContextStaleForPronouns(
  memory: SessionMemory,
  topic: TopicStackItem | { entitySlug: string; displayTitle: string; lastReferencedTurn?: number }
): boolean {
  if (memory.recentTurns.length === 0) return false

  const lastRef = ('lastReferencedTurn' in topic && typeof topic.lastReferencedTurn === 'number')
    ? topic.lastReferencedTurn
    : memory.turnCounter
  const turnsSinceReference = memory.turnCounter - lastRef
  if (turnsSinceReference > 3) return true

  // If the immediate last turn was completely unrelated to projects (e.g. contact, general identity)
  const lastTurn = memory.recentTurns[memory.recentTurns.length - 1]
  if (lastTurn && (lastTurn.resolvedIntent === 'contact' || lastTurn.resolvedIntent === 'identity') && !lastTurn.resolvedProject) {
    return turnsSinceReference > 1
  }

  return false
}
