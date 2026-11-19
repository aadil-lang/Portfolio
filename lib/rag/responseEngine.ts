/**
 * ASK AADIL — CONVERSATIONAL RESPONSE ENGINE (Phase 2.2)
 *
 * Implements conversational response strategies, direct-answer-first formulation,
 * anti-reintroduction on follow-ups, adaptive depth control, comparative synthesis,
 * and recovery handling while maintaining strict source grounding.
 */

import {
  ResponseDepth,
  ResponseMode,
  ResponseStrategy,
  QueryIntent,
  EvidenceItem,
  SourceConflict,
  SessionMemory,
  DialogueTurn
} from '@/types/rag'
import { ConversationContext, QueryUnderstanding } from './queryUnderstanding'
import { HybridRetrievalResult } from './hybridRetriever'

export type { ResponseDepth, ResponseMode, ResponseStrategy }

export interface StrategyDeterminationInput {
  query: string
  intent: QueryIntent
  activeProject?: string
  context?: ConversationContext
  sessionMemory?: SessionMemory
  retrieval?: HybridRetrievalResult
  understanding?: QueryUnderstanding
  isCorrection?: boolean
  isComparison?: boolean
  isFollowUp?: boolean
}

/**
 * Determines the optimal response strategy (mode, depth, anti-reintroduction,
 * comparative targets) for the current conversation turn.
 */
export function determineResponseStrategy(input: StrategyDeterminationInput): ResponseStrategy {
  const {
    query,
    intent,
    activeProject,
    context,
    sessionMemory,
    retrieval,
    understanding,
    isCorrection,
    isComparison,
    isFollowUp
  } = input

  const lowerQ = query.toLowerCase().trim()

  // 1. DEPTH DETERMINATION
  let depth: ResponseDepth = 2

  // Explicit brevity request -> Depth 1
  if (
    /(in one sentence|briefly|short answer|quick summary|one line|in a sentence|concise|tldr|tl;dr|high level)/i.test(lowerQ)
  ) {
    depth = 1
  }
  // Explicit depth request -> Depth 3
  else if (
    /(in detail|deep dive|comprehensive|detailed|in-depth|technical breakdown|architectural details|invariants|trade-offs|tradeoffs|failure modes|failure mode|how does it actually work)/i.test(lowerQ)
  ) {
    depth = 3
  }
  // Specific fact / metric queries -> Depth 1
  else if (
    /(how fast|latency|how many tests|test count|volume error|what year|who built|is it open source|license|github link|repository)/i.test(lowerQ)
  ) {
    depth = 1
  }

  // 2. CHECK IF THIS IS AN ESTABLISHED TOPIC IN RECENT CONVERSATION
  const currentProject = activeProject || understanding?.project || context?.activeProject
  let projectAlreadyDiscussed = false

  if (currentProject && sessionMemory?.recentTurns && sessionMemory.recentTurns.length > 0) {
    projectAlreadyDiscussed = sessionMemory.recentTurns.some(
      (turn: DialogueTurn) => turn.resolvedProject === currentProject || turn.resolvedEntities?.includes(currentProject)
    )
  }

  // 3. COMPARISON DETECTION
  const comparisonKeywords = /(compare|comparison|versus|\bvs\b|difference between|how do .+ and .+ compare|tradeoffs between|which one|which project)/i
  const hasComparisonIntent =
    Boolean(isComparison) ||
    intent === 'comparison' ||
    understanding?.intent === 'comparison' ||
    comparisonKeywords.test(lowerQ)

  let comparisonSubjects: string[] | undefined = undefined
  if (hasComparisonIntent) {
    if (understanding?.comparisonProjects && understanding.comparisonProjects.length >= 2) {
      comparisonSubjects = understanding.comparisonProjects
    } else {
      const extracted = extractComparisonSubjects(lowerQ)
      if (extracted.length >= 2) {
        comparisonSubjects = extracted
      } else if (understanding?.entities && understanding.entities.length >= 2) {
        const uniqueEntities = Array.from(new Set(understanding.entities))
        if (uniqueEntities.length >= 2) {
          comparisonSubjects = uniqueEntities
        }
      }
    }
  }

  // Comparison mode strictly requires comparison intent AND at least two comparison subjects
  const detectedComparison = hasComparisonIntent && Boolean(comparisonSubjects && comparisonSubjects.length >= 2)

  // 4. CORRECTION DETECTION
  const correctionKeywords = /(that's not what i|not what i asked|i meant|no, not|actually, i meant|wrong answer|you misunderstood|that is not what i meant)/i
  const detectedCorrection = Boolean(isCorrection) || correctionKeywords.test(lowerQ)

  // 5. MODE DETERMINATION
  let mode: ResponseMode = 'direct_answer'
  let suppressIntro = false

  if (understanding?.needsClarification) {
    mode = 'clarification_prompt'
    depth = 1
    suppressIntro = true
  } else if (detectedCorrection) {
    mode = 'correction_acknowledgment'
    suppressIntro = true
  } else if (detectedComparison) {
    mode = 'comparison'
    suppressIntro = false
  } else if (
    (!retrieval || !retrieval.evidenceItems || retrieval.evidenceItems.length === 0) &&
    (intent === 'unknown' || understanding?.intent === 'unknown')
  ) {
    mode = 'abstention_insufficient_evidence'
    depth = 1
    suppressIntro = true
  } else if (
    /(how fast|latency|sub-millisecond|how many tests|test suite|volume error|0\.0000%|exact count)/i.test(lowerQ)
  ) {
    mode = 'specific_fact'
    depth = 1
    suppressIntro = true
  } else if (
    isFollowUp ||
    projectAlreadyDiscussed ||
    (context?.recentQuestion && (
      lowerQ.startsWith('how did') ||
      lowerQ.startsWith('why did') ||
      lowerQ.startsWith('why is') ||
      lowerQ.startsWith('what about') ||
      lowerQ.includes('evaluator') ||
      lowerQ.includes('distractor') ||
      lowerQ.includes('it') ||
      lowerQ.includes('its')
    ))
  ) {
    mode = 'follow_up'
    suppressIntro = true
  } else if (
    /(how does .+ work|architecture|pipeline breakdown|internal mechanism|verification harness|system design)/i.test(lowerQ)
  ) {
    mode = 'technical_explanation'
    suppressIntro = projectAlreadyDiscussed
  } else if (
    /(tell me about|what is|overview of|introduce|describe|what does .+ do)/i.test(lowerQ)
  ) {
    mode = projectAlreadyDiscussed ? 'follow_up' : 'new_topic'
    suppressIntro = projectAlreadyDiscussed
  }

  // 6. DIRECT ANSWER FOCUS
  const directAnswerFocus = extractDirectAnswerFocus(lowerQ, currentProject, mode)

  return {
    mode,
    depth,
    directAnswerFocus,
    suppressIntro,
    comparisonSubjects,
    targetProject: currentProject
  }
}

/**
 * Extracts comparison entities from free-form query when entity detector missed them
 */
function extractComparisonSubjects(query: string): string[] {
  const candidates: [RegExp, string][] = [
    [/vm[ -]?copy/i, 'vm-copy'],
    [/solace[ -]?ai|solace/i, 'solace-ai'],
    [/loom[ -]?ai|loom/i, 'loom-ai'],
    [/design[ -]?automation|eda/i, 'design-automation'],
    [/math[ -]?item[ -]?bank|item[ -]?bank/i, 'math-item-bank'],
    [/atlas[ -]?ai|atlas/i, 'atlas-ai'],
    [/ocr[ -]?evaluator|ocr/i, 'ocr-evaluator'],
    [/curriculum[ -]?etl|curriculum/i, 'curriculum-etl'],
    [/ai[ -]?worksheets|worksheets/i, 'ai-worksheets'],
    [/ai[ -]?reliability|reliability/i, 'ai-reliability'],
    [/ask[ -]?aadil/i, 'ask-aadil']
  ]

  const matches: { slug: string; index: number }[] = []
  for (const [regex, slug] of candidates) {
    const m = query.match(regex)
    if (m && m.index !== undefined && !matches.some(existing => existing.slug === slug)) {
      matches.push({ slug, index: m.index })
    }
  }

  matches.sort((a, b) => a.index - b.index)
  return matches.map(m => m.slug)
}

/**
 * Derives the key focus token or phrase for the direct-answer sentence
 */
function extractDirectAnswerFocus(query: string, project?: string, mode?: ResponseMode): string {
  if (query.includes('how fast') || query.includes('latency')) return 'latency and execution performance'
  if (query.includes('evaluator') || query.includes('evaluation')) return 'evaluator architecture and validation mechanics'
  if (query.includes('distractor')) return 'distractor generation and uniqueness validation'
  if (query.includes('deterministic') || query.includes('why deterministic')) return 'rationale for deterministic validation over pure prompting'
  if (query.includes('tests') || query.includes('test count')) return 'test suite coverage and quantitative validation counts'
  if (mode === 'comparison') return 'architectural and functional comparison'
  if (project) return `${project} core mechanics`
  return 'direct answer'
}
