import { QueryIntent, AgentConversationState } from '@/types/rag'
import { sourceAuthorityRules, AuthorityRule } from '@/data/canonical/sourceAuthority'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'

export interface RoutingDecision {
  intent: QueryIntent
  rule: AuthorityRule
  detectedProjectSlug?: string
  detectedTechnologies?: string[]
  detectedYearOrPeriod?: string
  sourcesNeeded?: string[]
  confidence: number
}

/**
 * INTENT CLASSIFIER & ROUTER
 * Determines question intent and maps query to authoritative sources
 * before any retrieval occurs, taking into account previous conversation state.
 */
export function classifyAndRoute(query: string, prevState?: AgentConversationState): RoutingDecision {
  const q = query.toLowerCase().trim()

  // 0. Detect Unsupported Personal Queries (favorite food, movie, weekend, next month, etc.)
  const isUnsupportedPersonal =
    q.includes('favorite') ||
    q.includes('favourite') ||
    q.includes('last weekend') ||
    q.includes('next month') ||
    q.includes('personal life') ||
    q.includes('hobbies') ||
    q.includes('hobby') ||
    q.includes('birthday') ||
    q.includes('movie') ||
    q.includes('food') ||
    q.includes('actor') ||
    q.includes('song') ||
    q.includes('music') ||
    q.includes('pet') ||
    q.includes('salary') ||
    q.includes('marital')

  if (isUnsupportedPersonal) {
    return {
      intent: 'unknown',
      rule: sourceAuthorityRules.unknown,
      detectedProjectSlug: undefined,
      detectedTechnologies: [],
      confidence: 0.99
    }
  }

  // 1. Detect Explicit Projects or Contextual Switching
  let detectedProjectSlug: string | undefined

  // Check for "go back to <project>"
  if (q.includes('go back to')) {
    for (const p of projectsMetadata) {
      if (q.includes(p.slug) || q.includes(p.title.toLowerCase()) || (p.slug === 'vm-copy' && q.includes('vm copy'))) {
        detectedProjectSlug = p.slug
        break
      }
    }
  }

  // Check explicit project mentions
  if (!detectedProjectSlug) {
    for (const p of projectsMetadata) {
      const slugMatch = q.includes(p.slug)
      const titleMatch = q.includes(p.title.toLowerCase())
      const aliasMatch =
        (p.slug === 'vm-copy' && (q.includes('vm copy') || q.includes('question generator') || q.includes('vm-copy'))) ||
        (p.slug === 'ai-worksheets' && (q.includes('worksheet') || q.includes('worksheets'))) ||
        (p.slug === 'curriculum-etl' && (q.includes('etl') || q.includes('curriculum transformation') || q.includes('map-reduce'))) ||
        (p.slug === 'math-item-bank' && (q.includes('item bank') || q.includes('item-bank') || q.includes('team system'))) ||
        (p.slug === 'design-automation' && (q.includes('eda') || q.includes('cad') || q.includes('design automation') || q.includes('shaft') || q.includes('opencascade'))) ||
        (p.slug === 'loom-ai' && (q.includes('loom') || q.includes('textile') || q.includes('marketplace'))) ||
        (p.slug === 'atlas-ai' && (q.includes('atlas') || q.includes('financial') || q.includes('sec') || q.includes('edgar'))) ||
        (p.slug === 'ai-reliability' && (q.includes('reliability') || q.includes('qa harness') || q.includes('fisher') || q.includes('browser qa'))) ||
        (p.slug === 'binance-bot' && (q.includes('binance') || q.includes('futures bot') || q.includes('trading bot'))) ||
        (p.slug === 'ask-aadil' && (q.includes('ask aadil') || q.includes('ask-aadil') || q.includes('portfolio agent')))

      if (slugMatch || titleMatch || aliasMatch) {
        detectedProjectSlug = p.slug
        break
      }
    }
  }

  // Contact Confirmation / Draft Edit check
  const isConfirmOrEdit =
    q.startsWith('send it') ||
    q === 'send' ||
    q.startsWith('yes, send') ||
    q.startsWith('yes send') ||
    q === 'confirm' ||
    q.includes('looks good') ||
    q.startsWith('make it') ||
    (prevState?.confirmationState === 'awaiting_confirmation' && (q.includes('send') || q.includes('confirm') || q.includes('good') || q.includes('short') || q.includes('validation')))

  if (isConfirmOrEdit) {
    return {
      intent: 'contact',
      rule: sourceAuthorityRules.contact,
      detectedProjectSlug: prevState?.activeProject,
      detectedTechnologies: [],
      confidence: 0.99
    }
  }

  // Contextual pronoun resolution ("it", "that", "this", "that one", "the system", "the project")
  if (!detectedProjectSlug && prevState?.activeProject) {
    const hasPronounOrFollowup =
      q.includes(' it') ||
      q.startsWith('it ') ||
      q.includes('that one') ||
      q.includes('this one') ||
      q.includes('this project') ||
      q.includes('that project') ||
      q.includes('the system') ||
      q.includes('the validation') ||
      q.includes('why did i build') ||
      q.includes('why was it built') ||
      q.includes('how does it validate') ||
      q.includes('how does it work') ||
      q.includes('what technologies does it use') ||
      q.includes('discuss this')

    if (hasPronounOrFollowup) {
      detectedProjectSlug = prevState.activeProject
    }
  }

  // 2. Detect Technologies
  const techKeywords = [
    'langgraph',
    'fastapi',
    'python',
    'next.js',
    'react',
    'docker',
    'mongodb',
    'opencascade',
    'playwright',
    'katex',
    'tikz',
    'latex',
    'claude',
    'gemini',
    'portkey',
    'pydantic'
  ]
  const detectedTechnologies: string[] = []
  for (const tech of techKeywords) {
    if (q.includes(tech)) {
      detectedTechnologies.push(tech)
    }
  }

  // 3. Detect Foundations & Engineering Principles
  const isFoundations =
    q.includes('principle') ||
    q.includes('principles') ||
    q.includes('foundational') ||
    q.includes('believe about') ||
    q.includes('operating philosophy') ||
    (q.includes('philosophy') && !q.includes('phd'))

  if (isFoundations) {
    return {
      intent: 'foundations',
      rule: sourceAuthorityRules.foundations,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.96
    }
  }

  // 4. Detect Specific Contribution to Team Systems
  const isContribution =
    q.includes('contribute') ||
    q.includes('contribution') ||
    (detectedProjectSlug === 'math-item-bank' && (q.includes('what did') || q.includes('role') || q.includes('part') || q.includes('work on')))

  if (isContribution) {
    return {
      intent: 'contribution',
      rule: sourceAuthorityRules.contribution,
      detectedProjectSlug: detectedProjectSlug || 'math-item-bank',
      detectedTechnologies,
      confidence: 0.95
    }
  }

  // 5. Detect Current Focus & Temporal Queries
  const isCurrentFocus =
    q.includes('currently') ||
    q.includes('working on now') ||
    q.includes('currently exploring') ||
    q.includes('current work') ||
    q.includes('current focus') ||
    q.includes('currently work') ||
    q.includes('currently work at') ||
    q.includes('work at wayground') ||
    q.includes('unemployed') ||
    q.includes('most recent job')

  if (isCurrentFocus) {
    return {
      intent: 'current_focus',
      rule: sourceAuthorityRules.current_focus,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.97
    }
  }

  // 6. Detect Enumeration / Broad Projects Query
  const isProjectsEnumeration =
    !detectedProjectSlug && (
      q.includes('what projects') ||
      q.includes('which projects') ||
      q.includes('projects has') ||
      q.includes('projects have') ||
      q.includes('what systems') ||
      q.includes('systems has') ||
      q.includes('what has aadil built') ||
      q.includes('what did aadil build') ||
      q.includes('what has he built') ||
      q.includes('what has aadil created') ||
      q.includes('list his projects') ||
      q.includes('list projects') ||
      q.includes('show projects') ||
      q.includes('all projects') ||
      q.includes('portfolio systems')
    )

  if (isProjectsEnumeration && detectedTechnologies.length === 0) {
    return {
      intent: 'projects',
      rule: sourceAuthorityRules.projects,
      detectedProjectSlug: undefined,
      detectedTechnologies: [],
      confidence: 0.97
    }
  }

  // Clean speech fillers & punctuation for conversational robustness
  const cleanQ = q
    .replace(/^(uh|um|er|ah|like|so|mean|i mean|well|you know|basically|actually|honestly)[,\s]+/gi, '')
    .replace(/[,\s]+(uh|um|er|ah|like|so|you know)[,\s]+/gi, ' ')
    .replace(/[?.!;,]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  // 7. Detect Identity Query ("Who is Aadil?", "Who Aadil?", "Who is Adil?", etc.)
  const isIdentity =
    !detectedProjectSlug && (
      cleanQ === 'who is aadil' ||
      cleanQ === 'who aadil' ||
      cleanQ === 'tell me aadil' ||
      cleanQ === 'aadil who is' ||
      cleanQ === 'who is mohemmed aadil' ||
      cleanQ.includes('who is aadil') ||
      cleanQ.includes('who aadil is') ||
      cleanQ.includes('who aadil') ||
      cleanQ.includes('who is mohemmed') ||
      cleanQ.includes('tell me about aadil') ||
      cleanQ.includes('tell me something about aadil') ||
      cleanQ.includes('know about aadil') ||
      cleanQ.includes('who exactly is aadil') ||
      cleanQ.includes('who is this portfolio about') ||
      cleanQ.includes('who is the author') ||
      // Minor STT spelling variations (Adil, Aadill)
      cleanQ === 'who is adil' ||
      cleanQ === 'who is aadill' ||
      cleanQ === 'tell me about adil' ||
      cleanQ.includes('who is adil') ||
      cleanQ.includes('tell me about adil') ||
      cleanQ.includes('who is aadill')
    )

  if (isIdentity) {
    return {
      intent: 'identity',
      rule: sourceAuthorityRules.identity,
      detectedProjectSlug: undefined,
      detectedTechnologies: [],
      confidence: 0.98
    }
  }

  // 8. Detect Overview Query ("What does Aadil do?", "What Aadil do?")
  const isOverview =
    !detectedProjectSlug && (
      cleanQ === 'what aadil do' ||
      cleanQ.includes('what does aadil do') ||
      cleanQ.includes('what aadil do') ||
      cleanQ.includes('what kind of engineer is aadil') ||
      cleanQ.includes('what does aadil work on') ||
      cleanQ.includes('what is aadil\'s work') ||
      cleanQ.includes('what is his focus') ||
      cleanQ.includes('what kind of work')
    )

  if (isOverview) {
    return {
      intent: 'overview',
      rule: sourceAuthorityRules.overview,
      detectedProjectSlug: undefined,
      detectedTechnologies: [],
      confidence: 0.95
    }
  }

  // 9. Detect About / Personal Background Query
  const isAbout =
    !detectedProjectSlug && (
      q.includes('aadil\'s background') ||
      q.includes('aadil background') ||
      q.includes('his background') ||
      q.includes('how did he get into engineering') ||
      q.includes('beyond the job titles') ||
      q.includes('tell me his story') ||
      q.includes('tell me about his background')
    )

  if (isAbout) {
    return {
      intent: 'about',
      rule: sourceAuthorityRules.about,
      detectedProjectSlug: undefined,
      detectedTechnologies: [],
      confidence: 0.94
    }
  }

  // 10. Detect Contact Intent (Strict Rule: NEVER infer, ONLY use structured profile)
  const isContact =
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('reach') ||
    q.includes('message') ||
    q.includes('whatsapp') ||
    q.includes('hire') ||
    q.includes('talk to') ||
    q.includes('get in touch') ||
    q.includes('location') ||
    (q.includes('where is aadil') && !q.includes('currently work'))

  if (isContact) {
    return {
      intent: 'contact',
      rule: sourceAuthorityRules.contact,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.98
    }
  }

  // 11. Detect Cross-Source Intent
  if (
    q.includes('complete story') ||
    q.includes('tell me everything') ||
    q.includes('full picture') ||
    (q.includes('story') && detectedProjectSlug)
  ) {
    return {
      intent: 'cross_source',
      rule: sourceAuthorityRules.cross_source,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.95
    }
  }

  // 12. Detect Technology Query
  if (
    q.includes('technolog') ||
    q.includes('tech stack') ||
    q.includes('what stack') ||
    q.includes('what tools') ||
    ((q.includes('which project') || q.includes('what projects') || q.includes('projects use') || q.includes('who uses')) &&
      detectedTechnologies.length > 0)
  ) {
    return {
      intent: 'technology',
      rule: sourceAuthorityRules.technology,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.96
    }
  }

  // 13. Detect Narrative & Reasoning ("Why", "Curiosity", "What broke", "Transition")
  if (
    q.includes('how did aadil move') ||
    q.includes('move from mathematics') ||
    q.includes('move from content') ||
    q.includes('get into ai') ||
    q.includes('start building ai') ||
    q.includes('how did') ||
    q.includes('why did') ||
    q.includes('curiosity') ||
    q.includes('transition') ||
    q.includes('move from') ||
    q.includes('what broke') ||
    q.includes('what did i discover') ||
    q.includes('what did aadil discover') ||
    q.includes('learned') ||
    q.includes('learning') ||
    q.includes('operating loop')
  ) {
    return {
      intent: 'narrative',
      rule: sourceAuthorityRules.narrative,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.92
    }
  }

  // 14. Detect Technical Implementation & Architecture ("How does it work", "Validate", "Tests")
  if (
    q.includes('how does') ||
    q.includes('validate') ||
    q.includes('guardrail') ||
    q.includes('architecture') ||
    q.includes('how it works') ||
    q.includes('test') ||
    q.includes('tests') ||
    q.includes('solver') ||
    q.includes('algorithm') ||
    q.includes('spec') ||
    q.includes('implementation')
  ) {
    return {
      intent: 'technical',
      rule: sourceAuthorityRules.technical,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.93
    }
  }

  // 15. Detect Chronology ("When", "Dates", "Timeline", "Years")
  if (
    q.includes('when was') ||
    q.includes('when did') ||
    q.includes('timeline') ||
    q.includes('chronology') ||
    q.includes('what year') ||
    q.includes('dates')
  ) {
    return {
      intent: 'timeline',
      rule: sourceAuthorityRules.timeline,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.91
    }
  }

  // 16. Detect Professional & Career ("What has Aadil done", "Experience", "Career", "Roles")
  if (
    q.includes('professionally') ||
    q.includes('career') ||
    q.includes('employment') ||
    q.includes('experience') ||
    q.includes('background') ||
    q.includes('resume') ||
    q.includes('education') ||
    q.includes('degree') ||
    q.includes('wayground') ||
    q.includes('role')
  ) {
    return {
      intent: 'professional',
      rule: sourceAuthorityRules.professional,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.9
    }
  }

  // 17. Default to Project Overview if project is detected
  if (detectedProjectSlug) {
    return {
      intent: 'project_overview',
      rule: sourceAuthorityRules.project_overview,
      detectedProjectSlug,
      detectedTechnologies,
      confidence: 0.9
    }
  }

  return {
    intent: 'unknown',
    rule: sourceAuthorityRules.unknown,
    detectedProjectSlug,
    detectedTechnologies,
    confidence: 0.5
  }
}
