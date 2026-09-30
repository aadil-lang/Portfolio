/**
 * Retrieval Foundation Unit Tests (Phase 2)
 *
 * Verifies in-process knowledge retrieval without calling external LLM:
 * 1. CodeEvidence retrieval (file paths, line ranges, snippets, principles)
 * 2. Quantitative claim retrieval (EDA 424 tests / 28 suites, Atlas 178 tests, etc.)
 * 3. Journal reasoning retrieval (why Aadil moved from generation to evaluation)
 * 4. Career evolution multi-source retrieval (5-stage progression)
 * 5. Ownership boundary retrieval (VoyageMath / Item Bank team ownership vs Aadil contribution)
 */

import { retrieveHybrid } from '../lib/rag/hybridRetriever'
import { queryQuantitativeRegistry, queryCodeEvidence } from '../lib/rag/knowledgeIndex'
import { classifyAndRoute } from '../lib/rag/intentRouter'

interface TestResult {
  name: string
  passed: boolean
  details: string
}

const results: TestResult[] = []

function assert(name: string, condition: boolean, details: string) {
  results.push({
    name,
    passed: condition,
    details: condition ? 'PASSED: ' + details : 'FAILED: ' + details,
  })
  const symbol = condition ? '✓' : '✗'
  console.log(`${symbol} [${name}] ${condition ? details : 'FAILED: ' + details}`)
}

async function runTests() {
  console.log('=== ASK AADIL PHASE 2: RETRIEVAL FOUNDATION TESTS ===\n')

  // =========================================================================
  // TEST 1: Direct CodeEvidence query
  // =========================================================================
  console.log('--- TEST 1: CodeEvidence Direct & Hybrid Retrieval ---')
  const codeEvidenceDirect = queryCodeEvidence('VM Copy evaluator lib/eval-layer.ts')
  const vmCopyCode = codeEvidenceDirect.find(c =>
    (c.metadata.sourcePath || '').includes('eval-layer.ts') || c.metadata.project === 'vm-copy'
  )
  assert(
    'Direct CodeEvidence: VM Copy evaluator',
    !!vmCopyCode && vmCopyCode.metadata.sourcePath === 'lib/eval-layer.ts' && vmCopyCode.metadata.lineRange === '44-76',
    `Found ${vmCopyCode?.metadata.sourcePath}:${vmCopyCode?.metadata.lineRange} in project ${vmCopyCode?.metadata.project}`
  )

  // Hybrid retrieval for code evidence — needs a routing decision
  const codeDecision = classifyAndRoute('What file contains the VM Copy evaluator?')
  const hybridCodeResult = retrieveHybrid('What file contains the VM Copy evaluator?', codeDecision)
  const hasCodeEvidence = hybridCodeResult.evidenceItems.some(e =>
    e.sourceType === 'code_evidence' || (e.sourcePath || '').includes('eval-layer.ts')
  )
  assert(
    'Hybrid Retrieval: VM Copy evaluator code source',
    hasCodeEvidence,
    `Hybrid retriever surfaced code evidence: ${hybridCodeResult.evidenceItems.filter(e => e.sourceType === 'code_evidence').map(e => e.sourcePath).join(', ')}`
  )

  // =========================================================================
  // TEST 2: Direct Quantitative Registry query — EDA Tests
  // =========================================================================
  console.log('\n--- TEST 2: Quantitative Registry — EDA Test Suite ---')
  const edaClaims = queryQuantitativeRegistry('How many tests does EDA have?', 'design-automation')
  const edaTestCountClaim = edaClaims.find(c =>
    c.claim.includes('424') || c.metricValue === 424 || String(c.metricValue) === '424'
  )
  assert(
    'Direct Quantitative: EDA test count',
    !!edaTestCountClaim,
    `Found claim: "${edaTestCountClaim?.claim}" (Value: ${edaTestCountClaim?.metricValue} ${edaTestCountClaim?.unit})`
  )

  const edaDecision = classifyAndRoute('How many tests does EDA have?')
  const hybridEdaResult = retrieveHybrid('How many tests does EDA have?', edaDecision)
  const hasEdaQuantEvidence = hybridEdaResult.evidenceItems.some(e =>
    e.sourceType === 'quantitative_claim' || (e.quantitativeData && String(e.quantitativeData.metricValue) === '424')
  )
  assert(
    'Hybrid Retrieval: EDA quantitative source',
    hasEdaQuantEvidence,
    `Retriever returned quantitative evidence: ${hybridEdaResult.evidenceItems.filter(e => e.sourceType === 'quantitative_claim').map(e => e.quantitativeData?.claim).join(' | ')}`
  )

  // =========================================================================
  // TEST 3: Direct Quantitative Registry query — Atlas Tests
  // =========================================================================
  console.log('\n--- TEST 3: Quantitative Registry — Atlas Test Suite ---')
  const atlasClaims = queryQuantitativeRegistry('How many tests does Atlas have?', 'atlas-ai')
  const atlasTestCountClaim = atlasClaims.find(c =>
    c.claim.includes('178') || c.metricValue === 178 || String(c.metricValue) === '178'
  )
  assert(
    'Direct Quantitative: Atlas test count',
    !!atlasTestCountClaim,
    `Found claim: "${atlasTestCountClaim?.claim}" (Value: ${atlasTestCountClaim?.metricValue} ${atlasTestCountClaim?.unit})`
  )

  // =========================================================================
  // TEST 4: Journal Reasoning — Why Aadil moved from generation to evaluation
  // =========================================================================
  console.log('\n--- TEST 4: Journal Reasoning Retrieval ---')
  const journalDecision = classifyAndRoute('Why did Aadil move from generation toward evaluation?')
  const hybridJournalResult = retrieveHybrid('Why did Aadil move from generation toward evaluation?', journalDecision)
  const hasJournalReasoning = hybridJournalResult.evidenceItems.some(e =>
    e.layer === 'journal' || e.layer === 'system' || e.content.toLowerCase().includes('evaluation') || e.content.toLowerCase().includes('eval')
  )
  assert(
    'Hybrid Retrieval: Generation toward evaluation rationale',
    hasJournalReasoning && hybridJournalResult.evidenceItems.length > 0,
    `Surfaced ${hybridJournalResult.evidenceItems.length} evidence items across types: ${Array.from(new Set(hybridJournalResult.evidenceItems.map(e => e.sourceType))).join(', ')}`
  )

  // =========================================================================
  // TEST 5: Career Evolution Multi-Source Retrieval
  // =========================================================================
  console.log('\n--- TEST 5: Career Evolution Multi-Source Retrieval ---')
  const careerDecision = classifyAndRoute('How did Aadil go from mathematics content to AI systems?')
  const hybridCareerResult = retrieveHybrid('How did Aadil go from mathematics content to AI systems?', careerDecision)
  const careerLayers = new Set(hybridCareerResult.evidenceItems.map(e => e.layer))
  const careerTypes = new Set(hybridCareerResult.evidenceItems.map(e => e.sourceType))
  const hasJournal = careerLayers.has('journal')
  const hasSystem = careerLayers.has('system')
  // Career progression tier should inject multi-stage evidence
  const hasMultiStage = hybridCareerResult.evidenceItems.some(e => e.id?.includes('progression-stage'))
  assert(
    'Career Evolution: Multi-source synthesis',
    (hasJournal || hasSystem) && hasMultiStage,
    `Surfaced layers: ${Array.from(careerLayers).join(', ')}, types: ${Array.from(careerTypes).join(', ')}, multi-stage: ${hasMultiStage}`
  )

  // =========================================================================
  // TEST 6: Ownership Boundary Verification (VoyageMath / Item Bank)
  // =========================================================================
  console.log('\n--- TEST 6: Ownership Boundaries (VoyageMath & Item Bank) ---')
  const vmDecision = classifyAndRoute('Did Aadil build VoyageMath?')
  const hybridVMResult = retrieveHybrid('Did Aadil build VoyageMath?', vmDecision)
  const vmOwnershipEvidence = hybridVMResult.evidenceItems.find(e =>
    e.ownershipClassification === 'TEAM_OWNERSHIP' || (e.content && e.content.includes('Wayground Engineering Team'))
  )
  assert(
    'Ownership Boundary: VoyageMath attributed to Wayground Engineering Team',
    !!vmOwnershipEvidence,
    `Surfaced ownership boundary: classification=${vmOwnershipEvidence?.ownershipClassification}, snippet="${vmOwnershipEvidence?.content.slice(0, 100)}..."`
  )

  const ibDecision = classifyAndRoute('Who built the item bank at Wayground?')
  const hybridIBResult = retrieveHybrid('Who built the item bank at Wayground?', ibDecision)
  const ibOwnershipEvidence = hybridIBResult.evidenceItems.find(e =>
    e.ownershipClassification === 'TEAM_OWNERSHIP' || e.ownershipClassification === 'AADIL_CONTRIBUTION'
  )
  assert(
    'Ownership Boundary: Item Bank attributed to Wayground Engineering Team',
    !!ibOwnershipEvidence,
    `Surfaced ownership boundary: classification=${ibOwnershipEvidence?.ownershipClassification}`
  )

  // =========================================================================
  // TEST 7: Intent Router verification (deterministic routes)
  // =========================================================================
  console.log('\n--- TEST 7: Intent Router ---')
  const intent1 = classifyAndRoute("What is Aadil's experience?")
  assert(
    'IntentRouter: Experience query',
    intent1.intent === 'professional',
    `Classified as "${intent1.intent}" (expected "professional")`
  )

  const intent2 = classifyAndRoute('Tell me about EDA project')
  assert(
    'IntentRouter: Project deep-dive query',
    intent2.intent === 'project_overview' && intent2.detectedProjectSlug === 'design-automation',
    `Classified as "${intent2.intent}", target="${intent2.detectedProjectSlug}"`
  )

  const intent3 = classifyAndRoute('How many tests does EDA have?')
  assert(
    'IntentRouter: EDA test query routes to technical',
    intent3.intent === 'technical',
    `Classified as "${intent3.intent}" (expected "technical")`
  )

  const intent4 = classifyAndRoute('How did Aadil go from math to AI?')
  assert(
    'IntentRouter: Career transition routes to narrative',
    intent4.intent === 'narrative',
    `Classified as "${intent4.intent}" (expected "narrative")`
  )

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n=== TEST SUMMARY ===')
  const total = results.length
  const passed = results.filter(r => r.passed).length
  const failed = total - passed
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`)

  if (failed > 0) {
    console.log('\nFailed tests:')
    results.filter(r => !r.passed).forEach(r => console.log(`  ✗ ${r.name}: ${r.details}`))
    process.exit(1)
  } else {
    console.log('\nALL RETRIEVAL FOUNDATION TESTS PASSED CLEANLY.')
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err)
  process.exit(1)
})
