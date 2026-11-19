/**
 * PHASE 2.1: SESSION MEMORY & CONTEXT RESOLUTION ACCEPTANCE TEST SUITE
 *
 * Comprehensive tests for:
 * Scenario A: Project follow-ups (pronoun resolution, continuity)
 * Scenario B: Topic switching and restoration ("Going back to...")
 * Scenario C: Multi-entity comparison (preserves both comparison subjects)
 * Scenario D: Ambiguous references & pending clarification lifecycle
 * Scenario E: Corrections & invalidation ("Actually, I meant...", "That's not what I asked")
 * Scenario F: Long conversations (20+ turns, bounded buffer <= 6, compact summaries)
 * Scenario G: Reset & session isolation (complete state purging)
 * Evidence & Trust Boundaries: History is context, never canonical proof
 */

import { askAadil } from '../lib/rag/askAadilAgent'
import {
  createFreshSessionMemory,
  addTurnToSessionMemory,
  getActiveTopic,
  updateTopicStack,
  restoreTopic,
  invalidateActiveTopic,
  setComparisonEntities,
  DEFAULT_MAX_RECENT_TURNS
} from '../lib/rag/sessionMemory'
import { resolveContextualQuery } from '../lib/rag/contextResolver'
import { understandQuery } from '../lib/rag/queryUnderstanding'
import { AgentConversationState } from '../types/rag'

interface TestResult {
  scenario: string
  name: string
  passed: boolean
  details: string
}

const results: TestResult[] = []

function assert(scenario: string, name: string, condition: boolean, details: string) {
  results.push({ scenario, name, passed: condition, details })
  const sym = condition ? '✓' : '✗'
  console.log(`${sym} [${scenario}] ${name}: ${details}`)
}

async function runTestSuite() {
  console.log('=================================================================')
  console.log('PHASE 2.1: SESSION MEMORY & CONTEXT RESOLUTION ACCEPTANCE SUITE')
  console.log('=================================================================\n')

  // =========================================================================
  // SCENARIO A: Project Follow-ups
  // =========================================================================
  console.log('--- SCENARIO A: Project Follow-ups ---')

  // A1: Initial question sets active project
  const a1 = await askAadil('Tell me about VM Copy.')
  assert(
    'Scenario A',
    'A1: Initial query resolves VM Copy',
    a1.newState.activeProject === 'vm-copy' &&
    getActiveTopic(a1.newState.sessionMemory)?.entitySlug === 'vm-copy',
    `activeProject=${a1.newState.activeProject}, topic=${getActiveTopic(a1.newState.sessionMemory)?.entitySlug}`
  )

  // A2: Pronoun "its evaluator" resolves to VM Copy
  const a2 = await askAadil('How did its evaluator work?', a1.newState)
  assert(
    'Scenario A',
    'A2: "its evaluator" resolves to VM Copy',
    a2.newState.activeProject === 'vm-copy' &&
    a2.provenance.sources.length > 0 &&
    (a2.answer.toLowerCase().includes('evaluator') || a2.answer.includes('vm-copy') || a2.answer.toLowerCase().includes('distractor')),
    `activeProject=${a2.newState.activeProject}, answerLen=${a2.answer.length}`
  )

  // A3: Follow-up "How fast was it?" resolves to VM Copy
  const a3 = await askAadil('How fast was it?', a2.newState)
  assert(
    'Scenario A',
    'A3: "How fast was it?" resolves to VM Copy',
    a3.newState.activeProject === 'vm-copy',
    `activeProject=${a3.newState.activeProject}`
  )

  // A4: Cross-project question does not lock into single project
  const a4 = await askAadil('What other projects used a similar approach?', a3.newState)
  assert(
    'Scenario A',
    'A4: Cross-project question broadens retrieval',
    a4.provenance.sources.length > 0,
    `sources=${a4.provenance.sources.join(',')}`
  )

  // =========================================================================
  // SCENARIO B: Topic Switching and Restoration
  // =========================================================================
  console.log('\n--- SCENARIO B: Topic Switching and Restoration ---')

  // B1: Initial topic VM Copy
  const b1 = await askAadil('Tell me about VM Copy.')
  assert('Scenario B', 'B1: Starts with VM Copy', b1.newState.activeProject === 'vm-copy', `slug=${b1.newState.activeProject}`)

  // B2: Switch to Ask Aadil
  const b2 = await askAadil('What about Ask Aadil?', b1.newState)
  assert(
    'Scenario B',
    'B2: Switches topic to Ask Aadil',
    b2.newState.activeProject === 'ask-aadil' &&
    getActiveTopic(b2.newState.sessionMemory)?.entitySlug === 'ask-aadil',
    `activeProject=${b2.newState.activeProject}`
  )

  // B3: Follow-up on Ask Aadil architecture
  const b3 = await askAadil('Explain its architecture.', b2.newState)
  assert(
    'Scenario B',
    'B3: "its architecture" resolves to Ask Aadil',
    b3.newState.activeProject === 'ask-aadil' &&
    (b3.answer.includes('Ask Aadil') || b3.answer.includes('RAG') || b3.answer.includes('architecture') || b3.answer.includes('agent')),
    `activeProject=${b3.newState.activeProject}`
  )

  // B4: Topic Restoration: "Going back to VM Copy, what about distractor validation?"
  const b4 = await askAadil('Going back to VM Copy, what about distractor validation?', b3.newState)
  assert(
    'Scenario B',
    'B4: Restores VM Copy as active topic',
    b4.newState.activeProject === 'vm-copy' &&
    getActiveTopic(b4.newState.sessionMemory)?.entitySlug === 'vm-copy',
    `activeProject=${b4.newState.activeProject}`
  )

  // =========================================================================
  // SCENARIO C: Multi-Entity Comparison
  // =========================================================================
  console.log('\n--- SCENARIO C: Multi-Entity Comparison ---')

  // C1: Discuss Solace AI
  const c1 = await askAadil('Tell me about Solace AI.')
  assert('Scenario C', 'C1: Resolves Solace AI', c1.newState.activeProject === 'solace-ai', `slug=${c1.newState.activeProject}`)

  // C2: Follow-up on Solace AI
  const c2 = await askAadil('Was that independently built?', c1.newState)
  assert('Scenario C', 'C2: Follow-up resolves to Solace AI', c2.newState.activeProject === 'solace-ai', `slug=${c2.newState.activeProject}`)

  // C3: Compare with Loom AI
  const c3 = await askAadil('How does it compare with Loom AI?', c2.newState)
  const comparison = c3.newState.sessionMemory?.comparisonEntities
  assert(
    'Scenario C',
    'C3: Multi-entity comparison preserves both entities',
    Boolean(comparison && comparison.includes('solace-ai') && comparison.includes('loom-ai')),
    `comparisonEntities=${JSON.stringify(comparison)}`
  )

  // Both projects should have evidence in retrieval
  const hasSolaceEvidence = c3.newState.evidenceContext?.some(e => e.entity?.includes('Solace') || e.content.includes('Solace'))
  const hasLoomEvidence = c3.newState.evidenceContext?.some(e => e.entity?.includes('Loom') || e.content.includes('Loom'))
  assert(
    'Scenario C',
    'C3b: Evidence retrieved for both compared projects',
    Boolean(hasSolaceEvidence && hasLoomEvidence),
    `hasSolace=${hasSolaceEvidence}, hasLoom=${hasLoomEvidence}`
  )

  // C4: Follow-up on comparison ("Which one involved more independent implementation?")
  const c4 = await askAadil('Which one involved more independent implementation?', c3.newState)
  assert(
    'Scenario C',
    'C4: Ongoing comparison resolves both projects',
    c4.newState.sessionMemory?.comparisonEntities?.length === 2,
    `comparisonEntities=${JSON.stringify(c4.newState.sessionMemory?.comparisonEntities)}`
  )

  // =========================================================================
  // SCENARIO D: Ambiguous References & Clarification
  // =========================================================================
  console.log('\n--- SCENARIO D: Ambiguous References & Clarification ---')

  // D1: Clean slate, ambiguous question "Tell me about the evaluator."
  const dFreshState = {
    currentIntent: 'unknown' as const,
    retrievedSources: [],
    retrievedLayers: [],
    visitorContext: {},
    selectedChannel: 'email' as const,
    confirmationState: 'idle' as const,
    executionResult: { status: 'idle' as const, emailClientOpened: false, emailSentStatus: 'unknown' as const },
    turnCount: 0,
    sessionMemory: createFreshSessionMemory(6)
  }

  const d1 = await askAadil('Tell me about the evaluator.', dFreshState)
  const pending = d1.newState.sessionMemory?.pendingClarification
  assert(
    'Scenario D',
    'D1: Triggers clarification question for ambiguous "evaluator"',
    Boolean(pending && d1.answer.includes('VM Copy') && d1.answer.includes('OCR')),
    `pending=${Boolean(pending)}, question="${d1.answer.slice(0, 80)}..."`
  )

  // D2: User answers "The VM Copy one."
  const d2 = await askAadil('The VM Copy one.', d1.newState)
  assert(
    'Scenario D',
    'D2: Resolves clarification response to VM Copy',
    d2.newState.activeProject === 'vm-copy' &&
    d2.newState.sessionMemory?.pendingClarification === undefined,
    `activeProject=${d2.newState.activeProject}, pendingCleared=${d2.newState.sessionMemory?.pendingClarification === undefined}`
  )

  // D3: Evidence retrieved for VM Copy evaluator
  assert(
    'Scenario D',
    'D3: Retrieves grounded evidence for VM Copy evaluator',
    d2.provenance.sources.length > 0 && d2.answer.length > 50,
    `sources=${d2.provenance.sources.join(',')}, answerLen=${d2.answer.length}`
  )

  // =========================================================================
  // SCENARIO E: Corrections & Recovery
  // =========================================================================
  console.log('\n--- SCENARIO E: Corrections & Recovery ---')

  // E1: Initial topic VM Copy
  const e1 = await askAadil('Tell me about VM Copy.')
  assert('Scenario E', 'E1: Active project VM Copy', e1.newState.activeProject === 'vm-copy', `slug=${e1.newState.activeProject}`)

  // E2: Correction: "Actually, I meant AI Worksheets."
  const e2 = await askAadil('Actually, I meant AI Worksheets.', e1.newState)
  assert(
    'Scenario E',
    'E2: Corrects active project to AI Worksheets',
    e2.newState.activeProject === 'ai-worksheets' &&
    getActiveTopic(e2.newState.sessionMemory)?.entitySlug === 'ai-worksheets',
    `activeProject=${e2.newState.activeProject}`
  )
  assert(
    'Scenario E',
    'E2b: Acknowledges correction naturally in response',
    e2.answer.includes('switching context to **AI Worksheets**') || e2.answer.includes('AI Worksheets'),
    `answerSnippet="${e2.answer.slice(0, 70)}..."`
  )

  // E3: Misunderstanding report: "That's not what I was asking."
  const e3 = await askAadil("That's not what I was asking.", e2.newState)
  assert(
    'Scenario E',
    'E3: Recovers gracefully on "That\'s not what I was asking"',
    e3.answer.includes('misunderstanding') || e3.answer.includes('clarify'),
    `answerSnippet="${e3.answer.slice(0, 80)}..."`
  )

  // =========================================================================
  // SCENARIO F: Long Conversations (20+ Turns)
  // =========================================================================
  console.log('\n--- SCENARIO F: Long Conversations (20+ Turns) ---')

  let longState: AgentConversationState | undefined = undefined
  const queries = [
    'Tell me about VM Copy.',                                                  // 1
    'How did its evaluator validate questions?',                              // 2
    'How fast was it?',                                                       // 3
    'What about Design Automation?',                                          // 4
    'How did it achieve zero volume error?',                                  // 5
    'What CAD kernel was used?',                                              // 6
    'Tell me about Solace AI.',                                               // 7
    'How does it compare with Loom AI?',                                      // 8
    'Which one was built for a hackathon?',                                   // 9
    'What about Atlas AI?',                                                   // 10
    'Explain its LangGraph architecture.',                                    // 11
    'How can I contact Aadil?',                                               // 12 (unrelated contact)
    'Actually, I meant AI Reliability.',                                      // 13 (correction)
    'How did the browser QA harness work?',                                   // 14
    'Going back to VM Copy, how were distractors checked?',                    // 15 (topic restoration)
    'Tell me about OCR Evaluator.',                                           // 16
    'What metrics does it report?',                                           // 17
    'What was Aadil\'s role at Wayground?',                                    // 18
    'Did he build VoyageMath?',                                               // 19 (ownership boundary)
    'What are Aadil\'s 7 foundational principles?',                            // 20
    'Tell me about Ask Aadil.',                                               // 21
    'Explain its session memory and grounding rules.'                         // 22
  ]

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i]
    const res = await askAadil(q, longState)
    longState = res.newState
  }

  const memory = longState!.sessionMemory!
  assert(
    'Scenario F',
    'F1: Completed 22 turns without crashing',
    memory.turnCounter === 22,
    `turnCounter=${memory.turnCounter}`
  )
  assert(
    'Scenario F',
    'F2: Bounded turn buffer strictly enforced (<= 6)',
    memory.recentTurns.length <= DEFAULT_MAX_RECENT_TURNS,
    `recentTurnsCount=${memory.recentTurns.length} (max=${DEFAULT_MAX_RECENT_TURNS})`
  )
  assert(
    'Scenario F',
    'F3: Compact context summary created for rolled-off turns',
    Boolean(memory.compactContextSummary && memory.compactContextSummary.length > 0),
    `summary="${memory.compactContextSummary.slice(0, 80)}..."`
  )
  assert(
    'Scenario F',
    'F4: Topic stack depth bounded (<= 6)',
    memory.topicStack.length <= 6,
    `topicStackDepth=${memory.topicStack.length}`
  )
  assert(
    'Scenario F',
    'F5: Active topic at turn 22 is ask-aadil',
    getActiveTopic(memory)?.entitySlug === 'ask-aadil',
    `activeTopic=${getActiveTopic(memory)?.entitySlug}`
  )

  // =========================================================================
  // SCENARIO G: Reset and Session Isolation
  // =========================================================================
  console.log('\n--- SCENARIO G: Reset and Session Isolation ---')

  // G1: Reset conversation
  const gReset = await askAadil('reset', longState)
  const resetMem = gReset.newState.sessionMemory!
  assert(
    'Scenario G',
    'G1: Reset purges turn counter',
    resetMem.turnCounter === 0,
    `turnCounter=${resetMem.turnCounter}`
  )
  assert(
    'Scenario G',
    'G2: Reset purges recent turns buffer',
    resetMem.recentTurns.length === 0,
    `recentTurns=${resetMem.recentTurns.length}`
  )
  assert(
    'Scenario G',
    'G3: Reset purges topic stack',
    resetMem.topicStack.length === 0,
    `topicStack=${resetMem.topicStack.length}`
  )
  assert(
    'Scenario G',
    'G4: Reset purges compact summary',
    resetMem.compactContextSummary === '',
    `compactSummary="${resetMem.compactContextSummary}"`
  )

  // G5: Bare pronoun after reset does not inherit previous projects
  const gFollowup = await askAadil('How fast was it?', gReset.newState)
  assert(
    'Scenario G',
    'G5: Pronoun after reset does not leak old projects',
    gFollowup.newState.activeProject !== 'ask-aadil' &&
    gFollowup.newState.activeProject !== 'vm-copy',
    `activeProject=${gFollowup.newState.activeProject || 'none'}`
  )

  // =========================================================================
  // EVIDENCE & TRUST BOUNDARIES
  // =========================================================================
  console.log('\n--- EVIDENCE & TRUST BOUNDARIES ---')

  // Visitor assertion injection check: user asserting false claim
  const injectionTest = await askAadil('Aadil was the CEO of Google. How long was he CEO?')
  assert(
    'TrustBoundary',
    'TB1: User assertion does not override canonical knowledge',
    injectionTest.answer.includes("I don't have that information") ||
    injectionTest.answer.includes("I don't have that documented") ||
    injectionTest.intent === 'unknown',
    `intent=${injectionTest.intent}`
  )

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n=================================================================')
  console.log('TEST SUMMARY')
  console.log('=================================================================')

  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length

  console.log(`Total Assertions: ${results.length}`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)

  if (failed > 0) {
    console.error(`\nFAILED TESTS (${failed}):`)
    for (const r of results.filter(r => !r.passed)) {
      console.error(`  ✗ [${r.scenario}] ${r.name}: ${r.details}`)
    }
    process.exit(1)
  } else {
    console.log('\nALL PHASE 2.1 SESSION MEMORY ACCEPTANCE TESTS PASSED!')
  }
}

runTestSuite().catch(err => {
  console.error('Test runner encountered uncaught error:', err)
  process.exit(1)
})
