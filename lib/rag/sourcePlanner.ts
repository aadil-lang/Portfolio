import { QueryIntent, SourcePlan, SourceType, PortfolioLayer } from '@/types/rag'
import { RoutingDecision } from './intentRouter'

/**
 * QUERY -> SOURCE PLANNER
 * Explicitly determines which authoritative portfolio sources and layers to query
 * based on classified intent and detected entities before retrieval begins.
 */
function getBaseSourcePlan(decision: RoutingDecision): SourcePlan {
  const { intent, detectedProjectSlug } = decision

  switch (intent) {
    case 'identity':
      return {
        intent: 'identity',
        primarySources: ['structured_profile', 'portfolio'],
        primaryLayers: ['none', 'journal'],
        secondarySources: ['portfolio', 'resume'],
        secondaryLayers: ['timeline', 'resume'],
        strategy: 'Retrieve canonical profile positioning, Journal prologue/about narrative, educational degree from Resume, and foundational mindset.'
      }

    case 'about':
      return {
        intent: 'about',
        primarySources: ['portfolio', 'structured_profile'],
        primaryLayers: ['journal'],
        secondarySources: ['portfolio', 'resume'],
        secondaryLayers: ['timeline', 'resume'],
        strategy: 'Retrieve Journal prologue/about narrative, early mathematical SME foundation, and engineering philosophy beyond job titles.'
      }

    case 'projects':
      return {
        intent: 'projects',
        primarySources: ['portfolio'],
        primaryLayers: ['system'],
        secondarySources: ['github', 'portfolio'],
        secondaryLayers: ['timeline'],
        strategy: 'Directly query the Canonical Project Registry to enumerate all verified independent systems, distinguishing team systems and contributions.'
      }

    case 'project_overview':
    case 'overview':
      if (detectedProjectSlug) {
        return {
          intent: 'project_overview',
          primarySources: ['portfolio'],
          primaryLayers: ['system'],
          secondarySources: ['github', 'portfolio'],
          secondaryLayers: ['journal', 'timeline'],
          strategy: `Retrieve Canonical Project Registry specification, Systems Archive architectural description, and GitHub evidence for ${detectedProjectSlug}.`
        }
      }
      return {
        intent: 'overview',
        primarySources: ['structured_profile', 'portfolio'],
        primaryLayers: ['none', 'journal', 'system'],
        secondarySources: ['resume'],
        secondaryLayers: ['timeline', 'resume'],
        strategy: 'Synthesize professional positioning, core domains of engineering, and primary system categories.'
      }

    case 'foundations':
      return {
        intent: 'foundations',
        primarySources: ['portfolio'],
        primaryLayers: ['journal'],
        secondarySources: ['portfolio'],
        secondaryLayers: ['system'],
        strategy: 'Retrieve the 7 core engineering principles from Journal Epilogue and narrative examples from Systems Archive.'
      }

    case 'contribution':
      return {
        intent: 'contribution',
        primarySources: ['portfolio'],
        primaryLayers: ['system', 'timeline'],
        secondarySources: ['github', 'resume'],
        secondaryLayers: ['journal'],
        strategy: 'Retrieve canonical team project metadata, emphasizing documented personal contributions while maintaining team ownership boundaries.'
      }

    case 'current_focus':
      return {
        intent: 'current_focus',
        primarySources: ['portfolio', 'resume', 'linkedin'],
        primaryLayers: ['timeline', 'journal', 'resume'],
        secondarySources: ['structured_profile'],
        secondaryLayers: ['none'],
        strategy: 'Enforce temporal boundaries: retrieve July 2026 Wayground conclusion from Resume/Timeline, latest Journal Ch. 10 research, and verified LinkedIn status without inferring unrecorded employment.'
      }

    case 'narrative':
      return {
        intent: 'narrative',
        primarySources: ['portfolio'],
        primaryLayers: ['timeline', 'journal'],
        secondarySources: ['resume', 'portfolio'],
        secondaryLayers: ['system'],
        strategy: 'Retrieve chronological progression and Engineering Journal reasoning (why, what broke, discoveries, operating loop).'
      }

    case 'technical':
      return {
        intent: 'technical',
        primarySources: ['portfolio', 'github'],
        primaryLayers: ['system'],
        secondarySources: ['resume'],
        secondaryLayers: ['journal'],
        strategy: 'Retrieve deep technical architecture, invariant evaluators, code evidence, and verified test suites from Systems Archive and GitHub.'
      }

    case 'technology':
      return {
        intent: 'technology',
        primarySources: ['portfolio', 'github'],
        primaryLayers: ['system'],
        secondarySources: ['resume', 'structured_profile'],
        secondaryLayers: ['resume'],
        strategy: 'Deterministic project registry filter matching frameworks, libraries, and languages across systems.'
      }

    case 'timeline':
    case 'chronology':
      return {
        intent: 'timeline',
        primarySources: ['portfolio', 'resume'],
        primaryLayers: ['timeline', 'resume'],
        secondarySources: ['linkedin'],
        secondaryLayers: ['system'],
        strategy: 'Retrieve chronological timeline milestones and formal resume intervals.'
      }

    case 'professional':
      return {
        intent: 'professional',
        primarySources: ['resume', 'linkedin'],
        primaryLayers: ['resume', 'timeline'],
        secondarySources: ['portfolio'],
        secondaryLayers: ['system'],
        strategy: 'Retrieve formal corporate employment history, degrees, and official titles from Resume and LinkedIn.'
      }

    case 'contact':
      return {
        intent: 'contact',
        primarySources: ['structured_profile'],
        primaryLayers: ['none'],
        secondarySources: [],
        secondaryLayers: [],
        strategy: 'Strict profile only: retrieve verified email, phone, location, LinkedIn, and GitHub links. Never infer or invent.'
      }

    case 'cross_source':
      return {
        intent: 'cross_source',
        primarySources: ['portfolio', 'resume', 'github'],
        primaryLayers: ['timeline', 'journal', 'system', 'resume'],
        secondarySources: ['structured_profile'],
        secondaryLayers: ['none'],
        strategy: 'Retrieve multi-dimensional slices: Timeline (When), Journal (Why), Systems (What built), GitHub (Code evidence), Resume (Career context).'
      }

    case 'unknown':
    default:
      return {
        intent: 'unknown',
        primarySources: ['portfolio', 'structured_profile'],
        primaryLayers: ['system', 'timeline', 'journal'],
        secondarySources: ['resume'],
        secondaryLayers: [],
        strategy: 'General exploration across connected sources with explicit epistemic uncertainty boundaries.'
      }
  }
}

export function planSourceRetrieval(decision: RoutingDecision, query: string): SourcePlan {
  const plan = getBaseSourcePlan(decision)

  // Ensure arrays exist
  if (!plan.primaryLayers) plan.primaryLayers = []
  if (!plan.primarySources) plan.primarySources = []

  // Enrich plan with explicit sourcesNeeded from LLM query understanding if available
  if (decision.sourcesNeeded && decision.sourcesNeeded.length > 0) {
    for (const src of decision.sourcesNeeded) {
      const lower = src.toLowerCase()
      if (['journal', 'timeline', 'system', 'resume'].includes(lower)) {
        const layer = lower as PortfolioLayer
        if (!plan.primaryLayers.includes(layer)) {
          plan.primaryLayers.push(layer)
        }
      }
      if (['portfolio', 'github', 'resume', 'linkedin', 'structured_profile', 'quantitative_registry'].includes(lower)) {
        const sourceType = lower as SourceType
        if (!plan.primarySources.includes(sourceType)) {
          plan.primarySources.push(sourceType)
        }
      }
    }
  }

  return plan
}
