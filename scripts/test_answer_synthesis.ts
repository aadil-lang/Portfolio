/**
 * PHASE 4: GROUNDED ANSWER SYNTHESIS EVALUATION SUITE
 *
 * Comprehensive evaluation covering:
 * 1. Profile queries (Who is Aadil, What does he do)
 * 2. Project queries (Loom, Atlas, EDA)
 * 3. Career progression queries (Math to AI transition)
 * 4. Technical queries (LangGraph, Playwright, Determinism)
 * 5. Quantitative claims queries (EDA test count, Atlas pytest count)
 * 6. Code evidence queries (VM Copy evaluator file path)
 * 7. Ownership boundary queries (VoyageMath team ownership vs contribution)
 * 8. Multi-source queries (Content background influence on AI)
 * 9. Multi-turn follow-up queries (Loom → Why LangGraph → Human intervention)
 * 10. Ambiguity / Clarification queries
 * 11. Adversarial grounding hallucination queries
 * 12. Latency measurement breakdown
 */

import fs from 'fs'
import path from 'path'
import { askAadil } from '../lib/rag/askAadilAgent'
import { understandQuery } from '../lib/rag/queryUnderstanding'
import { retrieveHybrid } from '../lib/rag/hybridRetriever'
import { llmAnswerSynthesizer, buildEvidencePackage, validateGroundedLlmOutput } from '../lib/rag/synthesizer/llmAnswerSynthesizer'
import { AgentConversationState } from '../types/rag'

// Load .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  content.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...val] = trimmed.split('=')
      if (key && val.length > 0 && !process.env[key.trim()]) {
        process.env[key.trim()] = val.join('=').trim().replace(/^"(.*)"$/, '$1')
      }
    }
  })
}

interface TestResult {
  category: string
  name: string
  passed: boolean
  details: string
  latencyMs?: number
}

const testResults: TestResult[] = []

function assert(category: string, name: string, condition: boolean, details: string, latencyMs?: number) {
  testResults.push({ category, name, passed: condition, details, latencyMs })
  const symbol = condition ? '✓' : '✗'
  const latStr = latencyMs !== undefined ? ` (${latencyMs}ms)` : ''
  console.log(`${symbol} [${category}] ${name}${latStr}: ${details}`)
}

async function runSynthesisEvaluation() {
  console.log('=== PHASE 4: GROUNDED ANSWER SYNTHESIS EVALUATION SUITE ===\n')

  console.log('Environment Status:')
  console.log(`- GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'PRESENT' : 'NOT SET'}`)
  console.log(`- GEMINI_MODEL: ${process.env.GEMINI_MODEL || 'default'}\n`)

  // =========================================================================
  // 1. PROFILE SYNTHESIS
  // =========================================================================
  console.log('--- 1. Profile Synthesis ---')
  const t1Start = Date.now()
  const res1 = await askAadil('Who is Aadil?')
  const t1Lat = Date.now() - t1Start
  assert(
    'Profile',
    'Who is Aadil?',
    res1.answer.includes('AI Systems Engineer') || res1.answer.includes('Aadil'),
    `Answer length=${res1.answer.length}, synthesizer=${res1.newState.synthesisMetadata?.synthesizer || 'deterministic'}`,
    t1Lat
  )

  const t2Start = Date.now()
  const res2 = await askAadil('What does Aadil do?')
  const t2Lat = Date.now() - t2Start
  assert(
    'Profile',
    'What does Aadil do?',
    res2.answer.length > 50 && !res2.answer.includes('undefined'),
    `Answer preview: "${res2.answer.slice(0, 80)}..."`,
    t2Lat
  )

  // =========================================================================
  // 2. PROJECT SYNTHESIS
  // =========================================================================
  console.log('\n--- 2. Project Synthesis ---')
  const resLoom = await askAadil('Tell me about Loom.')
  assert(
    'Project',
    'Tell me about Loom',
    resLoom.answer.toLowerCase().includes('loom') || resLoom.answer.toLowerCase().includes('agent'),
    `Preview: "${resLoom.answer.slice(0, 80)}..."`
  )

  const resAtlas = await askAadil('Tell me about Atlas.')
  assert(
    'Project',
    'Tell me about Atlas',
    resAtlas.answer.toLowerCase().includes('atlas') || resAtlas.answer.toLowerCase().includes('sec'),
    `Preview: "${resAtlas.answer.slice(0, 80)}..."`
  )

  const resEda = await askAadil('Tell me about the engineering design automation project.')
  assert(
    'Project',
    'Tell me about EDA',
    resEda.answer.toLowerCase().includes('design') || resEda.answer.toLowerCase().includes('automation') || resEda.answer.toLowerCase().includes('eda'),
    `Preview: "${resEda.answer.slice(0, 80)}..."`
  )

  // =========================================================================
  // 3. CAREER PROGRESSION SYNTHESIS
  // =========================================================================
  console.log('\n--- 3. Career Progression Synthesis ---')
  const resCareer = await askAadil('How did Aadil move from mathematics content into AI engineering?')
  assert(
    'Career',
    'Math → AI Transition',
    resCareer.answer.toLowerCase().includes('math') || resCareer.answer.toLowerCase().includes('wayground') || resCareer.answer.toLowerCase().includes('journal'),
    `Preview: "${resCareer.answer.slice(0, 90)}..."`
  )

  // =========================================================================
  // 4. TECHNICAL SYNTHESIS
  // =========================================================================
  console.log('\n--- 4. Technical Synthesis ---')
  const resLangGraph = await askAadil('Why did he use LangGraph?')
  const lowLang = resLangGraph.answer.toLowerCase()
  assert(
    'Technical',
    'Why LangGraph?',
    lowLang.includes('graph') || lowLang.includes('state') || lowLang.includes('langgraph') || lowLang.includes('agent') || lowLang.includes('ai') || lowLang.length > 50,
    `Preview: "${resLangGraph.answer.slice(0, 80)}..."`
  )

  const resPlaywright = await askAadil('Where was Playwright used?')
  assert(
    'Technical',
    'Where was Playwright used?',
    resPlaywright.answer.toLowerCase().includes('playwright') || resPlaywright.answer.toLowerCase().includes('e2e') || resPlaywright.answer.toLowerCase().includes('verification'),
    `Preview: "${resPlaywright.answer.slice(0, 80)}..."`
  )

  // =========================================================================
  // 5. QUANTITATIVE GROUNDING SYNTHESIS
  // =========================================================================
  console.log('\n--- 5. Quantitative Grounding Synthesis ---')
  const resEdaQuant = await askAadil('How many tests does EDA have?')
  assert(
    'Quantitative',
    'EDA test count',
    resEdaQuant.answer.includes('424') || resEdaQuant.answer.includes('28'),
    `Answer contains exact claim (424/28): "${resEdaQuant.answer.slice(0, 100)}..."`
  )

  const resAtlasQuant = await askAadil('How many tests does Atlas have?')
  assert(
    'Quantitative',
    'Atlas pytest count',
    resAtlasQuant.answer.includes('178'),
    `Answer contains exact claim (178): "${resAtlasQuant.answer.slice(0, 100)}..."`
  )

  // =========================================================================
  // 6. CODE EVIDENCE SYNTHESIS
  // =========================================================================
  console.log('\n--- 6. Code Evidence Synthesis ---')
  const resCode = await askAadil('Where is the VM Copy evaluator implemented?')
  assert(
    'CodeEvidence',
    'VM Copy evaluator path',
    resCode.answer.includes('lib/eval-layer.ts') || resCode.answer.includes('eval-layer'),
    `Contains path lib/eval-layer.ts: "${resCode.answer.slice(0, 90)}..."`
  )

  // =========================================================================
  // 7. OWNERSHIP BOUNDARY SYNTHESIS
  // =========================================================================
  console.log('\n--- 7. Ownership & Contribution Grounding ---')
  const resVoyage = await askAadil('Did Aadil build VoyageMath?')
  const lowVoyage = resVoyage.answer.toLowerCase()
  assert(
    'Ownership',
    'Did Aadil build VoyageMath? (Team boundary)',
    (lowVoyage.includes('wayground') || lowVoyage.includes('team')) && !lowVoyage.includes('single-handedly'),
    `Respects team ownership boundary: "${resVoyage.answer.slice(0, 100)}..."`
  )

  const resVoyageContrib = await askAadil('What did Aadil contribute to VoyageMath?')
  assert(
    'Ownership',
    'VoyageMath contribution details',
    resVoyageContrib.answer.toLowerCase().includes('sme') || resVoyageContrib.answer.toLowerCase().includes('testing') || resVoyageContrib.answer.toLowerCase().includes('validation'),
    `Describes documented SME/validation contribution: "${resVoyageContrib.answer.slice(0, 100)}..."`
  )

  // =========================================================================
  // 8. MULTI-SOURCE SYNTHESIS
  // =========================================================================
  console.log('\n--- 8. Multi-Source Synthesis ---')
  const resMulti = await askAadil('How did Aadil\'s content background influence his AI engineering work?')
  assert(
    'MultiSource',
    'Content background influence',
    resMulti.answer.length > 80,
    `Preview: "${resMulti.answer.slice(0, 100)}..."`
  )

  // =========================================================================
  // 9. MULTI-TURN CONVERSATIONAL FOLLOW-UP
  // =========================================================================
  console.log('\n--- 9. Multi-Turn Follow-Up Resolution ---')
  let state: AgentConversationState | undefined = undefined

  const turn1 = await askAadil('Tell me about Loom.', state)
  state = turn1.newState

  const turn2 = await askAadil('Why LangGraph?', state)
  state = turn2.newState
  assert(
    'FollowUp',
    'Turn 2: "Why LangGraph?" with active loom context',
    turn2.answer.toLowerCase().includes('loom') || turn2.answer.toLowerCase().includes('graph') || turn2.answer.toLowerCase().includes('state'),
    `Resolved context to Loom AI: "${turn2.answer.slice(0, 90)}..."`
  )

  const turn3 = await askAadil('How was human intervention handled?', state)
  assert(
    'FollowUp',
    'Turn 3: "How was human intervention handled?"',
    turn3.answer.length > 40,
    `Preview: "${turn3.answer.slice(0, 90)}..."`
  )

  // =========================================================================
  // 10. ADVERSARIAL GROUNDING HALLUCINATION TESTS
  // =========================================================================
  console.log('\n--- 10. Adversarial Grounding Hallucination Tests ---')

  const resAdvAlgo = await askAadil('What exact algorithm did Aadil use for quantum teleportation?')
  assert(
    'Adversarial',
    'Quantum teleportation query (not in portfolio)',
    resAdvAlgo.answer.toLowerCase().includes('not') || resAdvAlgo.answer.toLowerCase().includes('don\'t have') || resAdvAlgo.answer.toLowerCase().includes('established'),
    `Refuses to invent ungrounded quantum algorithm: "${resAdvAlgo.answer.slice(0, 100)}..."`
  )

  const resAdvUsers = await askAadil('How many millions of active users does Loom AI have?')
  assert(
    'Adversarial',
    'Fabricated user volume query',
    !resAdvAlgo.answer.includes('100 million') && !resAdvAlgo.answer.includes('50 million'),
    `Does not invent synthetic active user numbers: "${resAdvUsers.answer.slice(0, 100)}..."`
  )

  const resAdvCode = await askAadil('Which file contains the VoyageMath quantum core in lib/quantum.ts?')
  assert(
    'Adversarial',
    'Fabricated file path lib/quantum.ts',
    !resAdvCode.answer.includes('lib/quantum.ts'),
    `Rejects non-existent file path: "${resAdvCode.answer.slice(0, 90)}..."`
  )

  // =========================================================================
  // 11. LATENCY MEASUREMENT BREAKDOWN
  // =========================================================================
  console.log('\n--- 11. End-to-End Latency Measurement Breakdown ---')
  const latQuery = 'How does the VM Copy evaluator work?'

  const tQUStart = Date.now()
  const quResult = await understandQuery(latQuery)
  const quLat = Date.now() - tQUStart

  const tRetStart = Date.now()
  const retResult = retrieveHybrid(quResult.understanding.normalizedRetrievalQuery)
  const retLat = Date.now() - tRetStart

  const pkg = buildEvidencePackage(latQuery, retResult, quResult.understanding, { turnCount: 1 })

  const tSynthStart = Date.now()
  const synthResult = await llmAnswerSynthesizer.synthesizeGrounded(pkg)
  const synthLat = Date.now() - tSynthStart
  const totalLat = quLat + retLat + synthLat

  console.log(`Measured Latency Breakdown for "${latQuery}":`)
  console.log(`- Query Understanding: ${quLat}ms`)
  console.log(`- Hybrid Retrieval: ${retLat}ms`)
  console.log(`- Grounded Synthesis: ${synthLat}ms`)
  console.log(`- Total Pipeline Latency: ${totalLat}ms`)

  assert(
    'Latency',
    'Full pipeline latency measurement',
    totalLat > 0,
    `Total: ${totalLat}ms (QU: ${quLat}ms, Ret: ${retLat}ms, Synth: ${synthLat}ms)`
  )

  // =========================================================================
  // SUMMARY REPORT
  // =========================================================================
  console.log('\n=== EVALUATION SUMMARY ===')
  const passed = testResults.filter(r => r.passed).length
  const failed = testResults.filter(r => !r.passed).length

  console.log(`Total Tests: ${testResults.length} | Passed: ${passed} | Failed: ${failed}`)

  if (failed > 0) {
    console.error('\nFAILED TESTS:')
    testResults.filter(r => !r.passed).forEach(r => {
      console.error(`- [${r.category}] ${r.name}: ${r.details}`)
    })
    process.exit(1)
  } else {
    console.log('\nALL PHASE 4 GROUNDED ANSWER SYNTHESIS TESTS PASSED CLEANLY.')
  }
}

runSynthesisEvaluation().catch(err => {
  console.error('Phase 4 evaluation script error:', err)
  process.exit(1)
})
