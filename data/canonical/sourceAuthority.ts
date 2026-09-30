import { QueryIntent, SourceType, PortfolioLayer } from '@/types/rag'

export interface AuthorityRule {
  intent: QueryIntent
  description: string
  preferredSources: SourceType[]
  preferredLayers?: PortfolioLayer[]
  fallbackSources: SourceType[]
  forbiddenSources?: SourceType[]
  strictRule?: string
}

/**
 * SOURCE AUTHORITY MATRIX
 * Maps visitor inquiry intents to authoritative sources.
 * Prevents throwing all sources blindly into an indiscriminate vector store.
 */
export const sourceAuthorityRules: Record<QueryIntent, AuthorityRule> = {
  identity: {
    intent: 'identity',
    description: 'Inquiries about who Aadil is, his core identity, professional positioning, and background',
    preferredSources: ['structured_profile', 'portfolio'],
    preferredLayers: ['none', 'journal', 'timeline'],
    fallbackSources: ['resume'],
    strictRule:
      'Identity must be synthesized from verified profile positioning, mechanical engineering credentials, and documented progression. Do not invent biography.'
  },
  overview: {
    intent: 'overview',
    description: 'Broad questions on what Aadil does, what kind of engineer he is, or his general focus',
    preferredSources: ['structured_profile', 'portfolio', 'resume'],
    preferredLayers: ['journal', 'timeline', 'system'],
    fallbackSources: ['github'],
    strictRule:
      'Synthesize from professional positioning, verified roles, and portfolio systems without promotional hyperbole.'
  },
  about: {
    narrativeSource: true,
    intent: 'about',
    description: 'Personal and narrative questions about Aadil beyond job titles (philosophy, mindset, origins)',
    preferredSources: ['portfolio', 'structured_profile'],
    preferredLayers: ['journal', 'timeline'],
    fallbackSources: ['resume'],
    strictRule:
      'Draw from Journal Prologue, Epilogue, and verified educational credentials. Preserve original source framing.'
  } as AuthorityRule,
  projects: {
    intent: 'projects',
    description: 'Enumeration or overview of all systems and projects built or contributed to',
    preferredSources: ['portfolio'],
    preferredLayers: ['system', 'timeline'],
    fallbackSources: ['github', 'resume'],
    strictRule:
      'Query the canonical project registry directly. Enumerate verified independent systems and explicitly distinguish team systems and contributions.'
  },
  project_overview: {
    intent: 'project_overview',
    description: 'Detailed overview of a specific named project (e.g. "Tell me about VM Copy")',
    preferredSources: ['portfolio', 'code_evidence', 'quantitative_claim', 'github'],
    preferredLayers: ['system', 'journal'],
    fallbackSources: ['resume'],
    strictRule:
      'Synthesize project problem, architecture, technologies, ownership, and evidence directly from canonical project metadata and systems catalog.'
  },
  foundations: {
    intent: 'foundations',
    description: 'Engineering principles, core beliefs, and operational philosophy',
    preferredSources: ['portfolio'],
    preferredLayers: ['journal'],
    fallbackSources: [],
    strictRule:
      'The 7 Foundational Principles from the Journal Epilogue are the sole authoritative source for engineering philosophy.'
  },
  contribution: {
    intent: 'contribution',
    description: 'Questions about Aadil’s specific contribution to team systems (e.g. US Math Item Bank)',
    preferredSources: ['portfolio'],
    preferredLayers: ['system', 'timeline'],
    fallbackSources: ['resume'],
    strictRule:
      'Preserve team ownership boundaries. Never state that Aadil built a team project solely; state what Aadil contributed to the team system.'
  },
  current_focus: {
    intent: 'current_focus',
    description: 'Inquiries about current employment, active projects, and latest documented explorations',
    preferredSources: ['portfolio', 'resume', 'linkedin'],
    preferredLayers: ['timeline', 'journal'],
    fallbackSources: ['structured_profile'],
    strictRule:
      'Enforce temporal boundaries: Wayground engagement concluded in July 2026. Do not infer unverified subsequent corporate employment. Current activity is independent systems research and agent reliability tooling.'
  },
  timeline: {
    intent: 'timeline',
    description: 'Chronological milestones, periods, dates, and historical progression',
    preferredSources: ['portfolio', 'resume'],
    preferredLayers: ['timeline', 'system'],
    fallbackSources: ['linkedin'],
    strictRule:
      'Timeline layer governs chronology of expanding scope; Resume confirms formal employment date intervals.'
  },
  contact: {
    intent: 'contact',
    description: 'Inquiries about email, phone, location, social links, or contacting Aadil',
    preferredSources: ['structured_profile'],
    preferredLayers: ['none'],
    fallbackSources: [],
    forbiddenSources: ['portfolio', 'github', 'linkedin', 'resume'],
    strictRule:
      'CRITICAL: Contact details must ONLY be retrieved from structured_profile. NEVER infer email, phone, or links from prose or arbitrary markdown.'
  },
  professional: {
    intent: 'professional',
    description: 'Employment history, formal titles, tenures, educational degrees, and high-level summaries',
    preferredSources: ['resume', 'linkedin'],
    preferredLayers: ['timeline', 'resume'],
    fallbackSources: ['portfolio'],
    strictRule:
      'Distinguish official employment titles from portfolio positioning. Do not manufacture unified titles where sources differ.'
  },
  technical: {
    intent: 'technical',
    description: 'Architecture, algorithms, validation gates, test counts, solvers, and code implementation',
    preferredSources: ['code_evidence', 'quantitative_claim', 'github', 'portfolio'],
    preferredLayers: ['system', 'journal'],
    fallbackSources: ['resume'],
    strictRule:
      'Technical implementation truth resides in Systems Archive and GitHub repositories. Do not cite LinkedIn as technical proof.'
  },
  narrative: {
    intent: 'narrative',
    description: 'Reasoning, motivations, what broke, discoveries, philosophy, and evolution of curiosity',
    preferredSources: ['portfolio'],
    preferredLayers: ['journal', 'timeline'],
    fallbackSources: ['resume'],
    strictRule:
      'The Engineering Journal is the authoritative source for "why", what failed, and what was learned.'
  },
  chronology: {
    intent: 'chronology',
    description: 'When systems were built, career milestones, timeline of curiosity, and dates',
    preferredSources: ['portfolio', 'resume'],
    preferredLayers: ['timeline', 'system'],
    fallbackSources: ['linkedin'],
    strictRule:
      'Timeline layer governs chronology of expanding scope; Resume confirms formal employment date intervals.'
  },
  technology: {
    intent: 'technology',
    description: 'Which tools, frameworks, libraries, or languages were used in specific systems',
    preferredSources: ['portfolio', 'github', 'resume'],
    preferredLayers: ['system', 'resume'],
    fallbackSources: ['structured_profile'],
    strictRule:
      'Use structured project metadata and system specifications for deterministic tool lookups.'
  },
  cross_source: {
    intent: 'cross_source',
    description: 'Comprehensive multi-dimensional questions (e.g. "Tell me the complete story of VM Copy")',
    preferredSources: ['portfolio', 'github', 'resume'],
    preferredLayers: ['timeline', 'journal', 'system', 'resume'],
    fallbackSources: ['structured_profile'],
    strictRule:
      'Retrieve distinct slices: Timeline for WHEN, Journal for WHY/WHAT BROKE, Systems for WHAT WAS BUILT, GitHub for REPO EVIDENCE, Resume for FORMAL CONTEXT.'
  },
  unknown: {
    intent: 'unknown',
    description: 'General or ambiguous queries',
    preferredSources: ['portfolio', 'structured_profile'],
    preferredLayers: ['system', 'timeline', 'journal'],
    fallbackSources: ['resume']
  }
}
