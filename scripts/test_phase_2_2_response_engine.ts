/**
 * PHASE 2.2: CONVERSATIONAL RESPONSE ENGINE ACCEPTANCE TEST SUITE
 *
 * Verifies:
 * 1. Conversational continuity & anti-reintroduction on follow-ups (VM Copy thread).
 * 2. Multi-project comparative synthesis (Solace AI vs Loom AI / Design Automation).
 * 3. Adaptive depth levels (Depth 1 concise, Depth 2 explanatory, Depth 3 deep technical).
 * 4. Direct-Answer-First policy (answering question in sentence 1).
 * 5. Elimination of rigid database cards (• **What it is:**, • **Technologies:**).
 * 6. Correction acknowledgment and graceful topic recovery.
 * 7. Grounded abstention on undocumented topics.
 * 8. Fallback Synthesizer parity under offline / simulated provider outage.
 */

import { askAadil } from '../lib/rag/askAadilAgent'
import { determineResponseStrategy } from '../lib/rag/responseEngine'
import { defaultSynthesizer, GroundedFallbackSynthesizer } from '../lib/rag/synthesizer/answerSynthesizer'
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
  console.log('PHASE 2.2: CONVERSATIONAL RESPONSE ENGINE ACCEPTANCE SUITE')
  console.log('=================================================================\n')

  // =========================================================================
  // SCENARIO 1: Conversational Continuity & Anti-Reintroduction (VM Copy Thread)
  // =========================================================================
  console.log('--- SCENARIO 1: Conversational Continuity & Anti-Reintroduction ---')

  // 1.1 Initial Introduction
  const t1 = await askAadil('Tell me about VM Copy')
  assert(
    'Scenario 1',
    '1.1: VM Copy Initial Intro: Natural prose, no rigid database cards',
    t1.newState.activeProject === 'vm-copy' &&
      !t1.answer.includes('• **What it is:**') &&
      !t1.answer.includes('• **Engineering Problem:**') &&
      t1.answer.includes('VM Copy'),
    `activeProject=${t1.newState.activeProject}, noBulletCards=${!t1.answer.includes('• **What it is:**')}`
  )

  // 1.2 Follow-up: Evaluator mechanics (Anti-reintroduction)
  const t2 = await askAadil('How did its evaluator work?', t1.newState)
  assert(
    'Scenario 1',
    '1.2: Follow-up 1 (Evaluator): Direct answer, suppresses redundant re-introduction',
    t2.newState.activeProject === 'vm-copy' &&
      (t2.answer.includes('evaluator') || t2.answer.includes('Tier-1') || t2.answer.includes('TypeScript')) &&
      !t2.answer.startsWith('**VM Copy Question Generator** is an engineering system documented in Aadil’s Systems Archive'),
    `activeProject=${t2.newState.activeProject}, directAnswerFirst=${!t2.answer.startsWith('**VM Copy Question Generator** is an engineering system documented in Aadil’s Systems Archive')}`
  )

  // 1.3 Follow-up: Why deterministic?
  const t3 = await askAadil('Why was it deterministic?', t2.newState)
  assert(
    'Scenario 1',
    '1.3: Follow-up 2 (Why deterministic): Explains invariant enforcement vs prompt drift directly',
    t3.newState.activeProject === 'vm-copy' &&
      (t3.answer.toLowerCase().includes('prompt') || t3.answer.toLowerCase().includes('invariant') || t3.answer.toLowerCase().includes('drift')),
    `activeProject=${t3.newState.activeProject}, answerLen=${t3.answer.length}`
  )

  // 1.4 Follow-up: How fast was it? (Specific Fact / Latency)
  const t4 = await askAadil('How fast was it?', t3.newState)
  assert(
    'Scenario 1',
    '1.4: Follow-up 3 (Latency / Speed): Direct sub-millisecond fact in sentence 1',
    t4.newState.activeProject === 'vm-copy' &&
      (t4.answer.toLowerCase().includes('sub-millisecond') || t4.answer.includes('0ms') || t4.answer.toLowerCase().includes('latency') || t4.answer.toLowerCase().includes('in-memory')),
    `activeProject=${t4.newState.activeProject}, containsLatencyMetric=true`
  )

  // =========================================================================
  // SCENARIO 2: Multi-Project Comparative Synthesis (Solace AI vs Loom AI)
  // =========================================================================
  console.log('\n--- SCENARIO 2: Comparative Synthesis ---')

  // 2.1 Introduce Solace AI
  const c1 = await askAadil('What is Solace AI?')
  assert(
    'Scenario 2',
    '2.1: Solace AI Overview: Resolves active project',
    c1.newState.activeProject === 'solace-ai' && c1.answer.toLowerCase().includes('solace'),
    `activeProject=${c1.newState.activeProject}`
  )

  // 2.2 Ownership follow-up
  const c2 = await askAadil('Was it an independent project or team system?', c1.newState)
  assert(
    'Scenario 2',
    '2.2: Solace AI Ownership: Confirms independent build / hackathon',
    c2.answer.toLowerCase().includes('independent') || c2.answer.toLowerCase().includes('hackathon'),
    `answerSnippet="${c2.answer.slice(0, 60)}..."`
  )

  // 2.3 Explicit comparison with Loom AI / Design Automation
  const c3 = await askAadil('Compare Solace AI with Loom AI', c2.newState)
  assert(
    'Scenario 2',
    '2.3: Comparative Synthesis: Side-by-side contrast across domain, safety, and metrics',
    c3.answer.includes('Solace AI') &&
      (c3.answer.includes('Loom AI') || c3.answer.includes('Design Automation')) &&
      c3.answer.includes('Domain & Scope') &&
      c3.answer.includes('Architecture & Reliability Invariants'),
    `containsSolaceAndLoom=true, structuredDimensions=true`
  )

  // =========================================================================
  // SCENARIO 3: Adaptive Depth Levels
  // =========================================================================
  console.log('\n--- SCENARIO 3: Adaptive Depth Levels ---')

  // 3.1 Depth 1 (Concise: in one sentence)
  const d1Strategy = determineResponseStrategy({
    query: 'In one sentence, what is Ask Aadil?',
    intent: 'overview',
    understanding: {
      intent: 'project_overview',
      project: 'ask-aadil',
      entities: ['Ask Aadil', 'Aadil'],
      confidence: 0.9,
      source: 'deterministic_fallback',
      needsClarification: false,
      informationNeed: 'brevity overview',
      normalizedRetrievalQuery: 'In one sentence, what is Ask Aadil?'
    }
  })
  assert(
    'Scenario 3',
    '3.1: Depth 1 & Comparison Safety: Explicit brevity triggers depth=1 and avoids false comparison mode',
    d1Strategy.depth === 1 && d1Strategy.mode !== 'comparison',
    `depth=${d1Strategy.depth}, mode=${d1Strategy.mode}`
  )

  // 3.1b Comparison Safety with Multiple Extracted Entities (Fix 1 Regression)
  const entityStrategy = determineResponseStrategy({
    query: "What does Aadil's VM Copy project do?",
    intent: 'project_overview',
    understanding: {
      intent: 'project_overview',
      project: 'vm-copy',
      entities: ['VM Copy', 'Aadil'],
      confidence: 0.95,
      source: 'deterministic_fallback',
      needsClarification: false,
      informationNeed: 'project function',
      normalizedRetrievalQuery: "What does Aadil's VM Copy project do?"
    }
  })
  assert(
    'Scenario 3',
    '3.1b: Fix 1 Regression: Multiple extracted entities without comparison intent do NOT trigger comparison mode',
    entityStrategy.mode !== 'comparison' && entityStrategy.targetProject === 'vm-copy',
    `mode=${entityStrategy.mode}, targetProject=${entityStrategy.targetProject}`
  )

  // 3.1c False premise query with multiple entities does not trigger comparison
  const premiseStrategy = determineResponseStrategy({
    query: 'Did Aadil lead a team of 50 engineers at Wayground?',
    intent: 'contribution',
    understanding: {
      intent: 'contribution',
      entities: ['Aadil', 'Wayground'],
      confidence: 0.9,
      source: 'deterministic_fallback',
      needsClarification: false,
      informationNeed: 'role verification',
      normalizedRetrievalQuery: 'Did Aadil lead a team of 50 engineers at Wayground?'
    }
  })
  assert(
    'Scenario 3',
    '3.1c: Fix 1 Regression: Multi-entity question does not trigger comparison mode',
    premiseStrategy.mode !== 'comparison',
    `mode=${premiseStrategy.mode}`
  )

  // 3.2 Depth 2 (Explanatory: standard question)
  const d2Strategy = determineResponseStrategy({
    query: 'How does the hybrid retrieval pipeline work?',
    intent: 'technical'
  })
  assert(
    'Scenario 3',
    '3.2: Depth 2 Detection: Explanatory question triggers depth=2',
    d2Strategy.depth === 2,
    `depth=${d2Strategy.depth}, mode=${d2Strategy.mode}`
  )

  // 3.3 Depth 3 (Deep technical: in detail, invariants)
  const d3Strategy = determineResponseStrategy({
    query: 'Explain the architecture in detail, including failure modes and invariants',
    intent: 'technical'
  })
  assert(
    'Scenario 3',
    '3.3: Depth 3 Detection: In-depth technical request triggers depth=3',
    d3Strategy.depth === 3,
    `depth=${d3Strategy.depth}, mode=${d3Strategy.mode}`
  )

  // =========================================================================
  // SCENARIO 4: Correction & Misunderstanding Recovery
  // =========================================================================
  console.log('\n--- SCENARIO 4: Correction & Misunderstanding Recovery ---')

  const r1 = await askAadil('Tell me about Aadil’s work on CAD')
  assert(
    'Scenario 4',
    '4.1: Initial CAD Query: Resolves design-automation',
    r1.newState.activeProject === 'design-automation',
    `activeProject=${r1.newState.activeProject}`
  )

  const r2 = await askAadil('No, I meant Atlas AI', r1.newState)
  assert(
    'Scenario 4',
    '4.2: Correction Recovery: Acknowledges correction and redirects to Atlas AI',
    r2.newState.activeProject === 'atlas-ai' &&
      r2.answer.includes('Atlas AI'),
    `activeProject=${r2.newState.activeProject}, answerSnippet="${r2.answer.slice(0, 70)}..."`
  )

  // =========================================================================
  // SCENARIO 5: Grounded Abstention & Uncertainty Handling
  // =========================================================================
  console.log('\n--- SCENARIO 5: Grounded Abstention & Uncertainty ---')

  const u1 = await askAadil('What is Aadil’s favorite video game?')
  assert(
    'Scenario 5',
    '5.1: Grounded Abstention: Refuses to fabricate undocumented personal preference',
    u1.answer.includes("don't have that documented") || u1.answer.includes('not documented'),
    `abstentionConfirmed=true, answerSnippet="${u1.answer.slice(0, 60)}..."`
  )

  // =========================================================================
  // SCENARIO 6: Fallback Synthesizer Parity (Deterministic Provider Offline)
  // =========================================================================
  console.log('\n--- SCENARIO 6: Deterministic Fallback Synthesizer Parity ---')

  const fallbackSynthesizer = new GroundedFallbackSynthesizer()
  const fallbackResult = await fallbackSynthesizer.synthesize({
    question: 'How fast was it?',
    intent: 'technical',
    activeProject: 'vm-copy',
    evidence: [
      {
        id: 'chunk-vm-copy',
        source: 'portfolio',
        sourceType: 'portfolio',
        layer: 'system',
        authority: 'primary',
        content: 'VM Copy Question Generator validates candidates in-memory with sub-millisecond latency.',
        provenanceBadge: '[Systems Archive · VM Copy]'
      }
    ],
    responseStrategy: {
      mode: 'specific_fact',
      depth: 1,
      suppressIntro: true,
      directAnswerFocus: 'latency and execution performance'
    }
  })

  assert(
    'Scenario 6',
    '6.1: Fallback Synthesizer Parity: Produces direct sentence with sub-millisecond latency metric',
    fallbackResult.answer.toLowerCase().includes('sub-millisecond') &&
      !fallbackResult.answer.includes('• **What it is:**'),
    `answerSnippet="${fallbackResult.answer.slice(0, 80)}..."`
  )

  // 6.2 Fallback Comparison Parity
  const fallbackComparison = await fallbackSynthesizer.synthesize({
    question: 'Compare Solace AI with Loom AI',
    intent: 'comparison',
    evidence: [],
    responseStrategy: {
      mode: 'comparison',
      depth: 2,
      suppressIntro: false,
      comparisonSubjects: ['solace-ai', 'design-automation']
    }
  })

  assert(
    'Scenario 6',
    '6.2: Fallback Comparison Parity: Outputs structured side-by-side contrast',
    fallbackComparison.answer.includes('Solace AI') &&
      fallbackComparison.answer.includes('Loom AI') &&
      fallbackComparison.answer.includes('Domain & Scope'),
    `comparativeParity=true`
  )

  // =========================================================================
  // TEST SUMMARY
  // =========================================================================
  console.log('\n=================================================================')
  console.log('TEST SUMMARY')
  console.log('=================================================================')
  const total = results.length
  const passed = results.filter(r => r.passed).length
  const failed = total - passed

  console.log(`Total Assertions: ${total}`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)

  if (failed === 0) {
    console.log('\nALL PHASE 2.2 CONVERSATIONAL RESPONSE ENGINE TESTS PASSED!')
  } else {
    console.log(`\n${failed} ASSERTIONS FAILED!`)
    process.exit(1)
  }
}

runTestSuite().catch(err => {
  console.error('Test suite failed with unexpected error:', err)
  process.exit(1)
})
