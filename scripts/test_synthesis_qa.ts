/**
 * ASK AADIL // GROUNDED SYNTHESIS, NEUTRAL FRAMING & KNOWLEDGE AUDIT QA
 * 
 * Verifies the upgraded Ask Aadil architecture:
 * 1. Identity ("Who is Aadil?", "Tell me about Aadil.", "What does Aadil do?")
 * 2. Projects Enumeration ("What projects has Aadil built?", "What systems has he worked on?")
 * 3. About ("What is Aadil's background?", "How did he get into engineering?")
 * 4. Narrative ("How did Aadil move from mathematics content into AI?")
 * 5. Technical & VM Copy Bug Fix ("Tell me about VM Copy." -> What it is != undefined; calibrated evaluator claims)
 * 6. Contributions & Ownership ("What did Aadil contribute to the Mathematics Item Bank?" -> Team system framing)
 * 7. Technology ("Which projects use LangGraph?", "Which projects use Python?")
 * 8. Temporal Reasoning ("What is Aadil currently working on?", "Does Aadil currently work at Wayground?")
 * 9. Contact ("How can I contact Aadil?")
 * 10. Unknown / Uncertainty ("What is Aadil's favorite movie?", "favorite food")
 * 11. Conversational Continuity (VM Copy -> Why did he build it?)
 */

import { askAadil } from '../lib/rag/askAadilAgent'

let passed = 0
let failed = 0

function assert(condition: any, message: string) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`)
    failed++
    throw new Error(`Assertion failed: ${message}`)
  } else {
    console.log(`  ✓ PASS: ${message}`)
    passed++
  }
}

async function runSynthesisTestSuite() {
  console.log('================================================================')
  console.log('ASK AADIL // GROUNDED LLM SYNTHESIS & KNOWLEDGE UPGRADE AUDIT')
  console.log('================================================================\n')

  // -------------------------------------------------------------------------
  // SUITE 1: IDENTITY
  // -------------------------------------------------------------------------
  console.log('----------------------------------------------------------------')
  console.log('SUITE 1: IDENTITY QUERIES')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[1.1] Query: "Who is Aadil?"')
    const res = await askAadil('Who is Aadil?')
    assert(res.intent === 'identity', 'Intent is classified as "identity"')
    assert(res.answer.includes('AI Systems Engineer'), 'Mentions AI Systems Engineer positioning')
    assert(res.answer.includes('Mechanical Engineering'), 'Mentions Mechanical Engineering background')
    assert(res.answer.includes('Mathematics Content Developer') || res.answer.includes('Subject Matter Expert'), 'Mentions Mathematics Content / SME foundations')
    assert(!res.answer.includes('undefined'), 'No undefined values in response')
    assert(!res.answer.includes('world-class') && !res.answer.includes('cutting-edge'), 'Maintains neutral framing without promotional buzzwords')
    assert(res.provenance.citations.some(c => c.includes('Journal — About')), 'Cites [Journal — About]')
    assert(res.provenance.citations.some(c => c.includes('Structured Profile')), 'Cites [Structured Profile]')
    assert(res.provenance.citations.some(c => c.includes('Timeline — Chronology')), 'Cites [Timeline — Chronology]')
    console.log('  Response preview:\n' + res.answer.slice(0, 200) + '...\n')
  }

  {
    console.log('[1.2] Query: "Tell me about Aadil."')
    const res = await askAadil('Tell me about Aadil.')
    assert(res.intent === 'identity', 'Intent is classified as "identity"')
    assert(res.answer.includes('AI Systems Engineer'), 'Identifies AI Systems Engineer')
    assert(res.provenance.sources.includes('portfolio') || res.provenance.sources.includes('structured_profile'), 'Sources include portfolio or profile')
  }

  {
    console.log('[1.3] Query: "What does Aadil do?"')
    const res = await askAadil('What does Aadil do?')
    assert(res.intent === 'overview', 'Intent is classified as "overview"')
    assert(res.answer.includes('AI Systems Engineer') || res.answer.includes('software systems around AI'), 'Describes systems engineering focus')
    assert(!res.answer.includes("I don't have that documented"), 'Does not trigger undocumented fallback')
  }

  // -------------------------------------------------------------------------
  // SUITE 2: CANONICAL PROJECTS ENUMERATION
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 2: CANONICAL PROJECTS ENUMERATION')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[2.1] Query: "What projects has Aadil built?"')
    const res = await askAadil('What projects has Aadil built?')
    assert(res.intent === 'projects', 'Intent is classified as "projects"')
    assert(res.answer.includes('VM Copy Question Generator'), 'Enumerates VM Copy')
    assert(res.answer.includes('AI Worksheets Product POC'), 'Enumerates AI Worksheets')
    assert(res.answer.includes('Curriculum Transformation Engine'), 'Enumerates Curriculum ETL')
    assert(res.answer.includes('Engineering Design Automation'), 'Enumerates EDA')
    assert(res.answer.includes('Loom AI'), 'Enumerates Loom AI')
    assert(res.answer.includes('Atlas AI'), 'Enumerates Atlas AI')
    assert(res.answer.includes('AI Application Reliability Harness'), 'Enumerates AI Reliability Harness')
    assert(res.answer.includes('Ask Aadil'), 'Enumerates Ask Aadil')
    assert(res.answer.includes('Independent Systems') || res.answer.includes('independently built'), 'Distinguishes independent systems')
    assert(res.answer.includes('Team Systems') || res.answer.includes('team system'), 'Distinguishes team systems')
    assert(res.provenance.citations.some(c => c.includes('Canonical Project Registry')), 'Cites [Canonical Project Registry]')
    console.log('  Response preview:\n' + res.answer.slice(0, 300) + '...\n')
  }

  {
    console.log('[2.2] Query: "What systems has he worked on?"')
    const res = await askAadil('What systems has he worked on?')
    assert(res.intent === 'projects', 'Intent is classified as "projects"')
    assert(res.answer.includes('VM Copy') && res.answer.includes('Atlas AI'), 'Enumerates systems from canonical registry')
  }

  // -------------------------------------------------------------------------
  // SUITE 3: ABOUT & NARRATIVE
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 3: ABOUT & NARRATIVE')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[3.1] Query: "What is Aadil\'s background?"')
    const res = await askAadil("What is Aadil's background?")
    assert(res.intent === 'about' || res.intent === 'identity', 'Intent is about/identity')
    assert(res.answer.includes('mathematics') || res.answer.includes('Mathematics'), 'Mentions mathematics background')
    assert(res.answer.includes('mechanical') || res.answer.includes('Mechanical'), 'Mentions mechanical engineering background')
  }

  {
    console.log('[3.2] Query: "How did Aadil move from mathematics content into AI?"')
    const res = await askAadil('How did Aadil move from mathematics content into AI?')
    assert(res.intent === 'narrative', 'Intent is classified as "narrative"')
    assert(res.answer.includes('VM Copy'), 'Mentions VM Copy as catalyst')
    assert(res.answer.includes('Subject Matter Expert') || res.answer.includes('SME'), 'Mentions SME role')
    assert(res.answer.includes('Wayground'), 'Mentions Wayground')
    assert(res.provenance.citations.some(c => c.includes('Journal') || c.includes('Timeline')), 'Cites Journal or Timeline')
  }

  // -------------------------------------------------------------------------
  // SUITE 4: FOUNDATIONS & PRINCIPLES
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 4: FOUNDATIONS & PRINCIPLES')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[4.1] Query: "What are Aadil\'s engineering principles?"')
    const res = await askAadil("What are Aadil's engineering principles?")
    assert(res.intent === 'foundations', 'Intent is classified as "foundations"')
    assert(res.answer.includes('Start With the Problem'), 'Contains Principle 1: Start With the Problem')
    assert(res.answer.includes('Representation Is Part of Correctness'), 'Contains Principle 2: Representation Is Part of Correctness')
    assert(res.answer.includes('Generation Is Not Verification'), 'Contains Principle 3: Generation Is Not Verification')
    assert(res.answer.includes('Make Uncertainty Explicit'), 'Contains Principle 4: Make Uncertainty Explicit')
    assert(res.answer.includes('Reasoning Is Not Authorization'), 'Contains Principle 5: Reasoning Is Not Authorization')
    assert(res.answer.includes('Preserve Evidence'), 'Contains Principle 6: Preserve Evidence')
    assert(res.answer.includes('Build From the Previous Failure'), 'Contains Principle 7: Build From the Previous Failure')
    assert(res.provenance.citations.some(c => c.includes('Journal — Foundations') || c.includes('Journal')), 'Cites Journal Foundations')
  }

  // -------------------------------------------------------------------------
  // SUITE 5: TECHNICAL IMPLEMENTATION & VM COPY BUG FIX
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 5: TECHNICAL IMPLEMENTATION & VM COPY FIX')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[5.1] Query: "Tell me about VM Copy." (Bug fix verification)')
    const res = await askAadil('Tell me about VM Copy.')
    assert(res.answer.includes('• **What it is:**') || res.answer.includes('What it is:'), 'Contains "What it is" section')
    assert(!res.answer.includes('What it is:** undefined') && !res.answer.includes('What it is: undefined'), 'CRITICAL FIX: What it is is NOT undefined!')
    assert(res.answer.includes('Deterministic math question generator') || res.answer.includes('Deterministic assessment'), 'Contains authoritative project description')
    assert(res.newState.activeProject === 'vm-copy', 'Sets active project state to vm-copy')
    console.log('  Response preview:\n' + res.answer.slice(0, 300) + '...\n')
  }

  {
    console.log('[5.2] Query: "How does VM Copy validate questions?" (Calibrated claims)')
    const res = await askAadil('How does VM Copy validate questions?')
    assert(res.intent === 'technical', 'Intent is classified as "technical"')
    assert(res.answer.includes('Tier-1 Deterministic Evaluator') || res.answer.includes('Tier-1'), 'Mentions Tier-1 Deterministic Evaluator')
    assert(res.answer.includes('4 unique') || res.answer.includes('4 options'), 'Mentions option count check (4)')
    assert(res.answer.includes('single correct') || res.answer.includes('correct answer'), 'Mentions single correct answer invariant')
    assert(res.answer.includes('duplicate') || res.answer.includes('Duplicate'), 'Mentions duplicate option detection')
    assert(!res.answer.includes('$0 marginal API spend'), 'Calibrated claim: does NOT state "$0 marginal API spend"')
    assert(res.answer.includes('without another model call') || res.answer.includes('locally'), 'States evaluator runs locally / without another model call')
  }

  {
    console.log('[5.3] Query: "How does EDA verify geometry?"')
    const res = await askAadil('How does EDA verify geometry?')
    assert(res.intent === 'technical', 'Intent is classified as "technical"')
    assert(res.answer.includes('OpenCascade') || res.answer.includes('CAD'), 'Mentions OpenCascade / CAD')
    assert(res.answer.includes('424') || res.answer.includes('tests'), 'Mentions automated test suites')
  }

  // -------------------------------------------------------------------------
  // SUITE 6: OWNERSHIP & CONTRIBUTIONS
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 6: OWNERSHIP & CONTRIBUTIONS')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[6.1] Query: "What did Aadil contribute to the Mathematics Item Bank?"')
    const res = await askAadil('What did Aadil contribute to the Mathematics Item Bank?')
    assert(res.intent === 'contribution', 'Intent is classified as "contribution"')
    assert(res.answer.includes('team system') || res.answer.includes('team project'), 'Strict ownership: Identifies system as a team system')
    assert(res.answer.includes('routing') || res.answer.includes('representation'), 'Identifies representation routing contribution')
    assert(res.answer.includes('two-tier') || res.answer.includes('compilation'), 'Identifies two-tier compilation evaluation contribution')
    assert(res.answer.includes('Upper Elementary'), 'Identifies Upper Elementary stabilization contribution')
    assert(!res.answer.includes('Aadil solely built') && !res.answer.includes('Aadil independently built the US Mathematics Item Bank'), 'Does NOT claim sole authorship of team system')
    assert(res.provenance.citations.some(c => c.includes('Canonical Project Registry') || c.includes('Systems Archive')), 'Cites provenance')
    console.log('  Response preview:\n' + res.answer.slice(0, 300) + '...\n')
  }

  // -------------------------------------------------------------------------
  // SUITE 7: TECHNOLOGY LOOKUP
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 7: TECHNOLOGY LOOKUP')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[7.1] Query: "Which projects use LangGraph?"')
    const res = await askAadil('Which projects use LangGraph?')
    assert(res.answer.includes('Atlas AI'), 'Identifies Atlas AI as using LangGraph')
    assert(res.provenance.citations.some(c => c.includes('Systems') || c.includes('Canonical Project Registry')), 'Cites Systems Archive / Registry')
  }

  {
    console.log('[7.2] Query: "Which projects use Python?"')
    const res = await askAadil('Which projects use Python?')
    assert(res.answer.includes('Engineering Design Automation') || res.answer.includes('Curriculum') || res.answer.includes('Atlas AI'), 'Lists Python projects')
  }

  // -------------------------------------------------------------------------
  // SUITE 8: TEMPORAL REASONING & CONTACT
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 8: TEMPORAL REASONING & CONTACT')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[8.1] Query: "What is Aadil currently working on?"')
    const res = await askAadil('What is Aadil currently working on?')
    assert(res.answer.includes('July 2026'), 'States Wayground engagement concluded in July 2026')
    assert(res.answer.includes('Chapter 10'), 'References Chapter 10')
    assert(res.provenance.citations.some(c => c.includes('Timeline — Chronology')), 'Cites Timeline Chronology')
  }

  {
    console.log('[8.2] Query: "Does Aadil currently work at Wayground?"')
    const res = await askAadil('Does Aadil currently work at Wayground?')
    assert(res.answer.toLowerCase().includes('no'), 'Unambiguous negative answer')
    assert(res.answer.includes('July 2026'), 'Cites July 2026 conclusion')
  }

  {
    console.log('[8.3] Query: "How can I contact Aadil?"')
    const res = await askAadil('How can I contact Aadil?')
    assert(res.answer.includes('aadil.khurshid95@gmail.com'), 'Provides primary email')
    assert(res.provenance.citations.some(c => c.includes('Structured Profile')), 'Cites Structured Profile')
  }

  // -------------------------------------------------------------------------
  // SUITE 9: UNKNOWN & UNCERTAINTY (EPISTEMIC BOUNDARIES)
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 9: UNKNOWN & UNCERTAINTY')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[9.1] Query: "What is Aadil\'s favorite movie?"')
    const res = await askAadil("What is Aadil's favorite movie?")
    assert(res.intent === 'unknown', 'Intent is classified as "unknown"')
    assert(res.answer.includes("I don't have that documented"), 'States clearly that personal preference is not documented')
    assert(!res.answer.includes('Interstellar') && !res.answer.includes('Inception'), 'Does NOT hallucinate a movie title')
  }

  {
    console.log('[9.2] Query: "What is Aadil\'s favorite food?"')
    const res = await askAadil("What is Aadil's favorite food?")
    assert(res.intent === 'unknown', 'Intent is classified as "unknown"')
    assert(res.answer.includes("I don't have that documented"), 'States clearly that personal preference is not documented')
  }

  // -------------------------------------------------------------------------
  // SUITE 10: CONVERSATIONAL CONTINUITY
  // -------------------------------------------------------------------------
  console.log('\n----------------------------------------------------------------')
  console.log('SUITE 10: CONVERSATIONAL CONTINUITY')
  console.log('----------------------------------------------------------------')

  {
    console.log('\n[10.1] Multi-turn flow:')
    console.log('Turn 1: "Tell me about VM Copy."')
    const t1 = await askAadil('Tell me about VM Copy.')
    assert(t1.newState.activeProject === 'vm-copy', 'Turn 1 activeProject === "vm-copy"')

    console.log('Turn 2: "Why was it built?"')
    const t2 = await askAadil('Why was it built?', t1.newState)
    assert(t2.intent === 'narrative', 'Turn 2 resolved to narrative intent')
    assert(t2.answer.includes('VM Copy'), 'Turn 2 references active project VM Copy')
    assert(t2.answer.includes('invariants') || t2.answer.includes('prompting alone'), 'Turn 2 explains motivation')
    assert(t2.provenance.citations.some(c => c.includes('Journal') || c.includes('Chapter 06')), 'Turn 2 cites Journal')
  }

  console.log('================================================================')
  console.log(`🎉 ALL SYNTHESIS TESTS PASSED! Passed: ${passed}, Failed: ${failed}`)
  console.log('================================================================\n')
}

runSynthesisTestSuite().catch(err => {
  console.error('Test suite failed:', err)
  process.exit(1)
})
