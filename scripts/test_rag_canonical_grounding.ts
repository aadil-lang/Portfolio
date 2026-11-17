/**
 * CANONICAL-GROUNDED RAG INGESTION REGRESSION & ADVERSARIAL TEST HARNESS (Phase 2.5)
 *
 * Verifies that the Portfolio RAG system is grounded in the accepted Phase 1 canonical
 * data foundation and Phase 2 adapters:
 *
 * 1. Suite 1: Canonical Record Ingestion & Schema Compliance
 * 2. Suite 2: Pure Deterministic Canonical Structured Retrieval
 * 3. Suite 3: Hybrid Lexical & In-Memory Retrieval with Canonical Boosting
 * 4. Suite 4: Provenance, Disclosures & Metric Qualification Invariants
 * 5. Suite 5: Strict Publication & Confidentiality Boundary Enforcement
 * 6. Suite 6: Rebuild Determinism & Content-Hash Invariance
 * 7. Suite 7: Adversarial Probing & Negative Grounding Rejection
 */

import { buildKnowledgeIndex } from '../lib/rag/knowledgeIndex'
import { retrieveHybrid } from '../lib/rag/hybridRetriever'
import { classifyAndRoute } from '../lib/rag/intentRouter'
import {
  queryCanonicalStructuredKnowledge,
  assertConfidentialityIntegrity,
  sanitizeRetrievalEvidence,
  computeContentHash,
  RAG_INDEX_VERSION
} from '../lib/rag/canonicalRAGAdapter'
import { canonicalRegistry } from '../data/canonical/canonicalRegistry'
import { KnowledgeChunk, EvidenceItem } from '../types/rag'

interface TestResult {
  suite: string
  name: string
  passed: boolean
  details: string
}

const results: TestResult[] = []

function assert(suite: string, name: string, condition: boolean, details: string) {
  results.push({
    suite,
    name,
    passed: condition,
    details: condition ? `PASSED: ${details}` : `FAILED: ${details}`
  })
  const mark = condition ? '✓' : '✗'
  console.log(`${mark} [${suite}] ${name}: ${condition ? details : 'FAILED - ' + details}`)
}

async function runRAGCanonicalGroundingTests() {
  console.log('====================================================================')
  console.log('   PHASE 2.5: CANONICAL-GROUNDED RAG REGRESSION & ADVERSARIAL SUITE   ')
  console.log('====================================================================\n')

  const chunks = buildKnowledgeIndex()

  // ============================================================================
  // SUITE 1: CANONICAL RECORD INGESTION & SCHEMA COMPLIANCE
  // ============================================================================
  console.log('--- SUITE 1: Canonical Record Ingestion & Schema Compliance ---')

  const canonicalChunks = chunks.filter(c => c.metadata.source_type === 'canonical_record')
  assert(
    'Suite 1',
    'Total canonical chunks match exact registry size (7+12+13+17 = 49)',
    canonicalChunks.length === 49,
    `Found ${canonicalChunks.length} canonical chunks (expected 49)`
  )

  const careerChunks = canonicalChunks.filter(c => c.id.startsWith('chunk-canonical-career-'))
  assert(
    'Suite 1',
    'Career records ingested as canonical chunks',
    careerChunks.length === 7,
    `Found ${careerChunks.length} career chunks (expected 7)`
  )

  const projectChunks = canonicalChunks.filter(c => c.id.startsWith('chunk-canonical-project-'))
  assert(
    'Suite 1',
    'Project records ingested as canonical chunks',
    projectChunks.length === 12,
    `Found ${projectChunks.length} project chunks (expected 12)`
  )

  const claimChunks = canonicalChunks.filter(c => c.id.startsWith('chunk-canonical-claim-'))
  assert(
    'Suite 1',
    'Claim records ingested as canonical chunks',
    claimChunks.length === 13,
    `Found ${claimChunks.length} claim chunks (expected 13)`
  )

  const evidenceChunks = canonicalChunks.filter(c => c.id.startsWith('chunk-canonical-evidence-'))
  assert(
    'Suite 1',
    'Evidence records ingested as canonical chunks',
    evidenceChunks.length === 17,
    `Found ${evidenceChunks.length} evidence chunks (expected 17)`
  )

  const allChunksHaveVersion = chunks.every(c => c.metadata.indexVersion === '2.5.0')
  assert(
    'Suite 1',
    'All index chunks carry indexVersion 2.5.0',
    allChunksHaveVersion,
    `All ${chunks.length} chunks carry indexVersion '2.5.0'`
  )

  const allChunksHaveSha256 = chunks.every(
    c => typeof c.metadata.contentHash === 'string' && /^[a-f0-9]{64}$/.test(c.metadata.contentHash)
  )
  assert(
    'Suite 1',
    'All index chunks carry valid SHA-256 content hashes',
    allChunksHaveSha256,
    `All ${chunks.length} chunks carry 64-char hex SHA-256 hashes`
  )

  const canonicalLayerMatch = canonicalChunks.every(c => c.metadata.portfolio_layer === 'canonical')
  assert(
    'Suite 1',
    'Canonical chunks strictly assigned to canonical portfolio layer',
    canonicalLayerMatch,
    `All 49 canonical chunks have portfolio_layer === 'canonical'`
  )

  // ============================================================================
  // SUITE 2: PURE DETERMINISTIC CANONICAL STRUCTURED RETRIEVAL
  // ============================================================================
  console.log('\n--- SUITE 2: Pure Deterministic Canonical Structured Retrieval ---')

  // A: VM Copy Role Boundary
  const vmRoleAns = queryCanonicalStructuredKnowledge('Was VM Copy a separate employment role or company?')
  assert(
    'Suite 2',
    'VM Copy employment boundary deterministically resolved',
    vmRoleAns.matched &&
      Boolean(vmRoleAns.exactAnswer?.includes('No. VM Copy was not a separate employment role')) &&
      Boolean(vmRoleAns.exactAnswer?.includes('October and mid-November 2025')) &&
      Boolean(vmRoleAns.exactAnswer?.includes('Subject Matter Expert — Mathematics at Wayground')),
    `Answer: "${vmRoleAns.exactAnswer?.slice(0, 90)}..."`
  )

  // B: Wayground Tenure
  const waygroundTenureAns = queryCanonicalStructuredKnowledge('When did Aadil work at Wayground and what were his dates?')
  assert(
    'Suite 2',
    'Wayground employment tenure deterministically resolved',
    waygroundTenureAns.matched &&
      Boolean(waygroundTenureAns.exactAnswer?.includes('January 2024 to December 2025')) &&
      Boolean(waygroundTenureAns.exactAnswer?.includes('January 2026 to July 2026')) &&
      Boolean(waygroundTenureAns.exactAnswer?.includes('July 2026')),
    `Answer: "${waygroundTenureAns.exactAnswer?.slice(0, 90)}..."`
  )

  // C: Content Builder Authorship
  const cbAns = queryCanonicalStructuredKnowledge('Who built VoyageMath Content Builder V1?')
  assert(
    'Suite 2',
    'Content Builder V1 authorship deterministically resolved',
    cbAns.matched &&
      Boolean(cbAns.exactAnswer?.includes('Wayground Engineering team')) &&
      Boolean(cbAns.exactAnswer?.includes('Aadil did not author the software codebase')) &&
      Boolean(cbAns.exactAnswer?.includes('SME testing')),
    `Answer: "${cbAns.exactAnswer?.slice(0, 90)}..."`
  )

  // D: Employer Proprietary Projects
  const propAns = queryCanonicalStructuredKnowledge('Which projects are employer proprietary?')
  assert(
    'Suite 2',
    'Employer-proprietary projects deterministically enumerated',
    propAns.matched &&
      Boolean(propAns.exactAnswer?.includes('5 employer-proprietary systems')) &&
      Boolean(propAns.exactAnswer?.includes('VM Copy')) &&
      Boolean(propAns.exactAnswer?.includes('Content Builder')) &&
      Boolean(propAns.exactAnswer?.includes('AI Worksheets')) &&
      Boolean(propAns.exactAnswer?.includes('Curriculum Transformation Engine')) &&
      Boolean(propAns.exactAnswer?.includes('Item Bank')),
    `Answer: "${propAns.exactAnswer?.slice(0, 90)}..."`
  )

  // E: EDA CAD Volume Accuracy Caveat
  const edaAns = queryCanonicalStructuredKnowledge('What is the volume accuracy error of EDA CAD?')
  assert(
    'Suite 2',
    'EDA CAD volume calculation metric caveat deterministically enforced',
    edaAns.matched &&
      Boolean(edaAns.exactAnswer?.includes('0.0000%')) &&
      Boolean(edaAns.exactAnswer?.includes('software-calculus consistency')) &&
      Boolean(edaAns.exactAnswer?.includes('does NOT assert physical CNC machining')),
    `Answer: "${edaAns.exactAnswer?.slice(0, 90)}..."`
  )

  // F: AI Reliability Test Cases Count
  const relAns = queryCanonicalStructuredKnowledge('How many tests does AI Reliability have?')
  assert(
    'Suite 2',
    'AI Reliability test count governed strictly as test cases (not suites)',
    relAns.matched &&
      Boolean(relAns.exactAnswer?.includes('158 collected backend test cases')) &&
      Boolean(relAns.exactAnswer?.includes('not test suites')) &&
      Boolean(relAns.exactAnswer?.includes('47 governance')),
    `Answer: "${relAns.exactAnswer?.slice(0, 90)}..."`
  )

  // G: VM Copy Latency Metric
  const vmLatAns = queryCanonicalStructuredKnowledge('What is the latency of VM Copy evaluator?')
  assert(
    'Suite 2',
    'VM Copy latency metric qualified to in-memory gate (not LLM generation)',
    vmLatAns.matched &&
      Boolean(vmLatAns.exactAnswer?.includes('< 1ms') || vmLatAns.exactAnswer?.includes('<1ms')) &&
      Boolean(vmLatAns.exactAnswer?.includes('Tier-1 in-memory deterministic evaluation layer')) &&
      Boolean(vmLatAns.exactAnswer?.includes('4–8 seconds')),
    `Answer: "${vmLatAns.exactAnswer?.slice(0, 90)}..."`
  )

  // ============================================================================
  // SUITE 3: HYBRID RETRIEVAL WITH CANONICAL BOOSTING
  // ============================================================================
  console.log('\n--- SUITE 3: Hybrid Retrieval with Canonical Boosting ---')

  const hybridVmRole = retrieveHybrid('Was VM Copy a separate employment role?')
  assert(
    'Suite 3',
    'Hybrid retriever surfaces canonical structured tier',
    hybridVmRole.debug?.retrievalPath.includes('canonical_structured_registry') === true,
    `Retrieval paths: ${hybridVmRole.debug?.retrievalPath.join(', ')}`
  )

  assert(
    'Suite 3',
    'Hybrid retriever passes exactAnswer into structuredResult',
    Boolean(hybridVmRole.structured.exactAnswer?.includes('No. VM Copy was not a separate employment role')),
    `exactAnswer: "${hybridVmRole.structured.exactAnswer?.slice(0, 60)}..."`
  )

  const hybridWayground = retrieveHybrid('Tell me about Wayground employment tenure')
  const hasCanonicalCareerEvidence = hybridWayground.evidenceItems.some(
    e => e.sourceType === 'canonical_record' || e.source.includes('Canonical Career')
  )
  assert(
    'Suite 3',
    'Hybrid retriever includes canonical career evidence in evidenceItems',
    hasCanonicalCareerEvidence,
    `Found canonical evidence in ${hybridWayground.evidenceItems.length} items`
  )

  // ============================================================================
  // SUITE 4: PROVENANCE, DISCLOSURES & METRIC QUALIFICATION INVARIANTS
  // ============================================================================
  console.log('\n--- SUITE 4: Provenance, Disclosures & Metric Qualification Invariants ---')

  const vmCopyChunk = canonicalChunks.find(c => c.id === 'chunk-canonical-project-proj-vm-copy')
  assert(
    'Suite 4',
    'VM Copy chunk embeds canonical IDs and historical disclosure',
    Boolean(vmCopyChunk?.metadata.canonicalProjectIds?.includes('proj-vm-copy')) &&
      Boolean(vmCopyChunk?.metadata.historicalDisclosures?.some(d => d.includes('October–mid-November 2025'))),
    `VM Copy historical disclosures: ${vmCopyChunk?.metadata.historicalDisclosures?.join('; ')}`
  )

  const edaClaimChunk = canonicalChunks.find(c => c.id === 'chunk-canonical-claim-CLAIM-EDA-002')
  assert(
    'Suite 4',
    'EDA volume claim chunk embeds mandatory caveats',
    Boolean(edaClaimChunk?.metadata.governedMetricCaveats?.some(c => c.includes('software-level mathematical consistency'))),
    `Caveats: ${edaClaimChunk?.metadata.governedMetricCaveats?.join('; ')}`
  )

  const relClaimChunk = canonicalChunks.find(c => c.id === 'chunk-canonical-claim-CLAIM-RELIABILITY-001')
  assert(
    'Suite 4',
    'AI Reliability claim chunk enforces collected test cases language',
    Boolean(relClaimChunk?.content.includes('158 Backend Test Cases')) &&
      Boolean(relClaimChunk?.content.includes('NOT 158 distinct test suite files')),
    `Content headline and caveat verified`
  )

  // ============================================================================
  // SUITE 5: STRICT PUBLICATION & CONFIDENTIALITY BOUNDARY ENFORCEMENT
  // ============================================================================
  console.log('\n--- SUITE 5: Strict Publication & Confidentiality Boundary Enforcement ---')

  const proprietaryProjectIds = [
    'proj-vm-copy',
    'proj-content-builder',
    'proj-ai-worksheets',
    'proj-curriculum-etl',
    'proj-item-bank'
  ]

  for (const pid of proprietaryProjectIds) {
    const chunk = canonicalChunks.find(c => c.id === `chunk-canonical-project-${pid}`)
    assert(
      'Suite 5',
      `Proprietary project ${pid} does not expose external git URL in chunk`,
      Boolean(chunk && !chunk.metadata.source_url.includes('github.com')),
      `source_url = ${chunk?.metadata.source_url}`
    )
  }

  // Adversarial injection of proprietary git link into evidence item
  const maliciousItem: EvidenceItem = {
    id: 'adversarial-leak-attempt',
    source: 'Malicious Injected Source',
    sourceType: 'portfolio',
    authority: 'primary',
    layer: 'system',
    entity: 'vm-copy',
    content: 'Internal leak: https://github.com/wayground/vm-copy-private',
    deepLink: 'https://github.com/wayground/vm-copy-private',
    provenanceBadge: '[Leak]'
  }

  const integrityCheck = assertConfidentialityIntegrity(maliciousItem)
  assert(
    'Suite 5',
    'assertConfidentialityIntegrity rejects proprietary repo URL',
    integrityCheck === false,
    `Malicious item integrity check returned false (rejected)`
  )

  const sanitized = sanitizeRetrievalEvidence([maliciousItem])
  assert(
    'Suite 5',
    'sanitizeRetrievalEvidence purges malicious item from retrieval output',
    sanitized.length === 0,
    `Sanitized count: ${sanitized.length} (expected 0)`
  )

  // Verify zero private URLs across all canonical chunks
  const hasPrivateGitUrl = canonicalChunks.some(c =>
    /github\.com\/(?:wayground|quizizz)/i.test(c.content) ||
    /github\.com\/(?:wayground|quizizz)/i.test(c.metadata.source_url)
  )
  assert(
    'Suite 5',
    'Zero private corporate GitHub URLs across all canonical chunks',
    !hasPrivateGitUrl,
    'Verified 0 private corporate repository leaks'
  )

  // ============================================================================
  // SUITE 6: REBUILD DETERMINISM & CONTENT-HASH INVARIANCE
  // ============================================================================
  console.log('\n--- SUITE 6: Rebuild Determinism & Content-Hash Invariance ---')

  const chunksRebuild1 = buildKnowledgeIndex()
  const chunksRebuild2 = buildKnowledgeIndex()

  assert(
    'Suite 6',
    'Rebuild yields identical chunk count',
    chunksRebuild1.length === chunksRebuild2.length,
    `Counts: ${chunksRebuild1.length} === ${chunksRebuild2.length}`
  )

  let hashesIdentical = true
  let idsIdentical = true
  for (let i = 0; i < chunksRebuild1.length; i++) {
    if (chunksRebuild1[i].id !== chunksRebuild2[i].id) {
      idsIdentical = false
      break
    }
    if (chunksRebuild1[i].metadata.contentHash !== chunksRebuild2[i].metadata.contentHash) {
      hashesIdentical = false
      break
    }
  }

  assert(
    'Suite 6',
    'Chunk IDs are 100% identical in order across rebuilds',
    idsIdentical,
    `All ${chunksRebuild1.length} chunk IDs preserved in exact sequence`
  )

  assert(
    'Suite 6',
    'Content hashes are 100% deterministic across rebuilds',
    hashesIdentical,
    `All ${chunksRebuild1.length} content hashes match exactly`
  )

  // Verify content hash matches recomputation
  const sampleChunk = chunksRebuild1[0]
  const recomputedHash = computeContentHash(sampleChunk.content)
  assert(
    'Suite 6',
    'Chunk contentHash matches SHA-256(content.trim())',
    typeof sampleChunk.metadata.contentHash === 'string' && sampleChunk.metadata.contentHash === recomputedHash,
    `Hash ${sampleChunk.metadata.contentHash?.slice(0, 16)}... matches computed`
  )

  // ============================================================================
  // SUITE 7: ADVERSARIAL PROBING & NEGATIVE GROUNDING REJECTION
  // ============================================================================
  console.log('\n--- SUITE 7: Adversarial Probing & Negative Grounding Rejection ---')

  // A: Fabricated Career Role Query
  const fakeRoleAns = queryCanonicalStructuredKnowledge('Did Aadil work as VP of AI Infrastructure at Google?')
  assert(
    'Suite 7',
    'Fabricated role query does not trigger canonical structured match',
    fakeRoleAns.matched === false && fakeRoleAns.canonicalEvidence.length === 0,
    `Result: matched=${fakeRoleAns.matched}, evidenceCount=${fakeRoleAns.canonicalEvidence.length}`
  )

  // B: Fabricated Project Metric
  const fakeMetricAns = queryCanonicalStructuredKnowledge('What is the 100% test coverage of Solace AI?')
  assert(
    'Suite 7',
    'Fabricated metric query does not produce ungrounded canonical exactAnswer',
    fakeMetricAns.matched === false,
    `Result: matched=${fakeMetricAns.matched}`
  )

  // C: Unverified Causal Claim Check
  const smeCareer = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-wayground-math-sme')
  assert(
    'Suite 7',
    'Canonical career record marks causal promotion claim as unverified',
    smeCareer?.transitionContext?.isCausalClaimFormallyVerified === false,
    `isCausalClaimFormallyVerified: ${smeCareer?.transitionContext?.isCausalClaimFormallyVerified}`
  )

  // D: Content Builder Code Ownership Protection
  const cbProject = canonicalRegistry.projectRecords.find(p => p.projectId === 'proj-content-builder')
  assert(
    'Suite 7',
    'Content Builder implementation authorship is strictly COLLABORATIVE_CONTRIBUTOR',
    cbProject?.implementationAuthorship === 'COLLABORATIVE_CONTRIBUTOR' &&
      cbProject?.architecturalResponsibility === 'DIRECTED_ARCHITECTURE',
    `implementationAuthorship: ${cbProject?.implementationAuthorship}, architecturalResponsibility: ${cbProject?.architecturalResponsibility}`
  )

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('\n====================================================================')
  console.log('                          TEST SUMMARY                              ')
  console.log('====================================================================')
  const total = results.length
  const passed = results.filter(r => r.passed).length
  const failed = total - passed

  console.log(`Total Assertions: ${total}`)
  console.log(`Passed:           ${passed}`)
  console.log(`Failed:           ${failed}`)
  console.log(`Success Rate:     ${((passed / total) * 100).toFixed(1)}%\n`)

  if (failed > 0) {
    console.error(`FAILED: ${failed} assertions failed!`)
    process.exit(1)
  } else {
    console.log('ALL PHASE 2.5 RAG CANONICAL GROUNDING TESTS PASSED!')
  }
}

runRAGCanonicalGroundingTests().catch(err => {
  console.error('Test execution error:', err)
  process.exit(1)
})
