/**
 * PHASE 2.5E: KNOWLEDGE BASE RAG INGESTION & EVIDENCE-GOVERNED RETRIEVAL TEST SUITE
 *
 * Exhaustive regression and adversarial test harness verifying:
 * - Suite 1: Structural Ingestion & Category Integrity (CS-01..CS-08, 23 ADRs, 8 Patterns, 15 Metrics)
 * - Suite 2: Provenance, Canonical Binding & Anchor Preservation
 * - Suite 3: Atomic Metric-Caveat Binding Invariants (VM Copy, EDA CAD, Worksheets, Test Counts)
 * - Suite 4: Publication Governance & Fail-Closed Confidentiality Enforcement
 * - Suite 5: Hybrid Retrieval Integration, Scoring & Context Assembly
 * - Suite 6: Rebuild Determinism, Hashing & Cache Invalidation
 * - Suite 7: Adversarial Probing & Negative Boundary Invariants
 */

import { buildKnowledgeIndex, invalidateKnowledgeIndex } from '../lib/rag/knowledgeIndex'
import { retrieveHybrid } from '../lib/rag/hybridRetriever'
import {
  buildKnowledgeBaseChunks,
  validateMetricCaveatBinding,
  isChunkEligibleForPublicRetrieval,
  isEvidenceItemEligibleForPublicRetrieval,
  queryKnowledgeBaseStructured,
  MANDATORY_METRIC_CAVEATS,
  KB_SOURCE_DOCUMENT,
  KB_LAST_VERIFIED
} from '../lib/rag/knowledgeBaseIngestion'
import {
  canonicalRegistry,
  canonicalCaseStudyReferences,
  getCaseStudyManifest,
  getAdrManifest
} from '../data/canonical/canonicalRegistry'
import { KnowledgeChunk, EvidenceItem } from '../types/rag'
import { computeContentHash, RAG_INDEX_VERSION } from '../lib/rag/canonicalRAGAdapter'
import { buildEvidencePackage } from '../lib/rag/synthesizer/llmAnswerSynthesizer'
import { understandQuery, ConversationContext } from '../lib/rag/queryUnderstanding'

interface TestAssertion {
  suite: string
  name: string
  passed: boolean
  details: string
}

const testResults: TestAssertion[] = []

function assert(suite: string, name: string, condition: boolean, details: string) {
  testResults.push({
    suite,
    name,
    passed: condition,
    details: condition ? `PASSED: ${details}` : `FAILED: ${details}`
  })
  const mark = condition ? '✓' : '✗'
  console.log(`${mark} [${suite}] ${name}: ${condition ? details : 'FAILED - ' + details}`)
}

async function runPhase25ETestSuite() {
  console.log('====================================================================')
  console.log('  PHASE 2.5E: STRUCTURED KNOWLEDGE BASE RAG INGESTION TEST SUITE   ')
  console.log('====================================================================\n')

  const kbChunks = buildKnowledgeBaseChunks()
  const allIndexChunks = buildKnowledgeIndex()

  // ============================================================================
  // SUITE 1: STRUCTURAL INGESTION & CATEGORY INTEGRITY
  // ============================================================================
  console.log('--- SUITE 1: Structural Ingestion & Category Integrity ---')

  assert(
    'Suite 1',
    'Knowledge Base yields exactly 69 structured chunks',
    kbChunks.length === 69,
    `Found ${kbChunks.length} chunks (expected 69)`
  )

  const csOverviewChunks = kbChunks.filter(c => c.metadata.knowledgeCategory === 'CASE_STUDY_OVERVIEW')
  assert(
    'Suite 1',
    'Discovered all 8 case-study overview chunks (CS-01 through CS-08)',
    csOverviewChunks.length === 8,
    `Found ${csOverviewChunks.length} case study overview chunks (expected 8)`
  )

  const rootCauseChunks = kbChunks.filter(c => c.metadata.knowledgeCategory === 'ROOT_CAUSE')
  assert(
    'Suite 1',
    'Discovered all 7 case-study root cause chunks (CS-01 through CS-07)',
    rootCauseChunks.length === 7,
    `Found ${rootCauseChunks.length} root cause chunks (expected 7)`
  )

  const adrChunks = kbChunks.filter(c => c.metadata.knowledgeCategory === 'ADR')
  assert(
    'Suite 1',
    'Discovered all 23 individual ADR chunks',
    adrChunks.length === 23,
    `Found ${adrChunks.length} ADR chunks (expected 23)`
  )

  const matrixChunks = kbChunks.filter(c => c.metadata.knowledgeCategory === 'VERIFICATION_MATRIX')
  assert(
    'Suite 1',
    'Discovered all 7 claim-to-evidence matrix chunks (CS-01 through CS-07)',
    matrixChunks.length === 7,
    `Found ${matrixChunks.length} verification matrix chunks (expected 7)`
  )

  const patternChunks = kbChunks.filter(c => c.metadata.knowledgeCategory === 'CROSS_PROJECT_PATTERN')
  assert(
    'Suite 1',
    'Discovered all 8 recurring cross-project pattern chunks',
    patternChunks.length === 8,
    `Found ${patternChunks.length} pattern chunks (expected 8)`
  )

  const metricChunks = kbChunks.filter(c => c.metadata.knowledgeCategory === 'DOCUMENTED_METRIC')
  assert(
    'Suite 1',
    'Discovered all 15 atomic documented metric chunks',
    metricChunks.length === 15,
    `Found ${metricChunks.length} documented metric chunks (expected 15)`
  )

  const timelineChunks = kbChunks.filter(c => c.metadata.knowledgeCategory === 'TIMELINE_SPINE')
  assert(
    'Suite 1',
    'Discovered Section 4 Timeline Spine chunk',
    timelineChunks.length === 1,
    `Found ${timelineChunks.length} timeline spine chunk (expected 1)`
  )

  // Verify all 8 case studies are represented
  const allCsIds = ['CS-01', 'CS-02', 'CS-03', 'CS-04', 'CS-05', 'CS-06', 'CS-07', 'CS-08']
  const allCsFound = allCsIds.every(id => kbChunks.some(c => c.metadata.caseStudyId === id))
  assert(
    'Suite 1',
    'Every CaseStudyId (CS-01..CS-08) is bound to ingested chunks',
    allCsFound,
    `All 8 case study identifiers confirmed present`
  )

  // Verify all 23 ADRs are represented
  const adrIdsInChunks = new Set(adrChunks.map(c => c.metadata.adrId))
  const expectedAdrCount = 23
  assert(
    'Suite 1',
    'Every ADR ID is distinctly represented in an atomic chunk',
    adrIdsInChunks.size === expectedAdrCount,
    `Found ${adrIdsInChunks.size} unique ADR IDs (expected 23)`
  )

  // ============================================================================
  // SUITE 2: PROVENANCE, CANONICAL BINDING & ANCHOR PRESERVATION
  // ============================================================================
  console.log('\n--- SUITE 2: Provenance, Canonical Binding & Anchor Preservation ---')

  const allHaveSourceDoc = kbChunks.every(
    c => c.metadata.source_url.startsWith(`/${KB_SOURCE_DOCUMENT}#`)
  )
  assert(
    'Suite 2',
    'All 69 chunks reference KB_SOURCE_DOCUMENT with valid anchor link',
    allHaveSourceDoc,
    `All chunks point to /${KB_SOURCE_DOCUMENT}#<anchor>`
  )

  const allHaveAnchors = kbChunks.every(
    c => typeof c.metadata.contentAnchor === 'string' && c.metadata.contentAnchor.length > 0
  )
  assert(
    'Suite 2',
    'All 69 chunks carry an explicit contentAnchor property',
    allHaveAnchors,
    `100% of Knowledge Base chunks carry contentAnchor`
  )

  // Verify ADR anchors match canonical manifest anchors
  let adrAnchorsMatch = true
  for (const adrChunk of adrChunks) {
    const adrId = adrChunk.metadata.adrId as any
    const manifestAdr = getAdrManifest(adrId)
    if (!manifestAdr || manifestAdr.contentAnchor !== adrChunk.metadata.contentAnchor) {
      adrAnchorsMatch = false
      break
    }
  }
  assert(
    'Suite 2',
    'Every ADR chunk contentAnchor matches canonical registry manifest exactly',
    adrAnchorsMatch,
    `All 23 ADR chunk anchors match canonical manifest`
  )

  // Verify Case Study 01 has correct project and career binding
  const cs01Overview = kbChunks.find(c => c.id === 'chunk-kb-cs-01-overview')
  assert(
    'Suite 2',
    'CS-01 overview binds to proj-ask-aadil and car-independent-research',
    cs01Overview?.metadata.canonicalProjectIds?.[0] === 'proj-ask-aadil' &&
      cs01Overview?.metadata.canonicalCareerIds?.[0] === 'car-independent-research',
    `Project: ${cs01Overview?.metadata.canonicalProjectIds?.[0]}, Career: ${cs01Overview?.metadata.canonicalCareerIds?.[0]}`
  )

  // Verify CS-08 preserves external repository boundary invariants
  const cs08Chunk = kbChunks.find(c => c.id === 'chunk-kb-cs-08-boundary')
  assert(
    'Suite 2',
    'CS-08 DiffGuard preserves zero internal project or career bindings',
    cs08Chunk?.metadata.canonicalProjectIds?.length === 0 &&
      cs08Chunk?.metadata.canonicalCareerIds?.length === 0 &&
      cs08Chunk?.metadata.mappedJournalChapters?.length === 0,
    `Internal projects: 0, internal careers: 0, mapped chapters: 0`
  )

  assert(
    'Suite 2',
    'CS-08 DiffGuard executionLocality is strictly EXTERNAL_REPOSITORY',
    cs08Chunk?.metadata.executionLocality === 'EXTERNAL_REPOSITORY',
    `executionLocality: ${cs08Chunk?.metadata.executionLocality}`
  )

  assert(
    'Suite 2',
    'CS-08 DiffGuard evidenceStatus is strictly UNVERIFIED (Boundary)',
    cs08Chunk?.metadata.evidenceStatus === 'UNVERIFIED',
    `evidenceStatus: ${cs08Chunk?.metadata.evidenceStatus}`
  )

  // ============================================================================
  // SUITE 3: ATOMIC METRIC-CAVEAT BINDING INVARIANTS
  // ============================================================================
  console.log('\n--- SUITE 3: Atomic Metric-Caveat Binding Invariants ---')

  // A: VM Copy Latency & Spend Caveat
  const vmLatencyChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-vm-latency')
  assert(
    'Suite 3',
    'VM Copy latency chunk binds mandatory Tier-1 in-memory evaluation caveat',
    Boolean(vmLatencyChunk?.content.includes('Tier-1 in-memory regex and AST deterministic evaluation gate')) &&
      Boolean(vmLatencyChunk?.content.includes('Upstream generative LLM inference takes ~4–8 seconds')) &&
      Boolean(vmLatencyChunk?.content.includes('standard provider API costs')),
    `VM Copy latency content explicitly embeds Tier-1 and upstream LLM generation caveats`
  )

  assert(
    'Suite 3',
    'VM Copy latency metadata carries mandatoryCaveatText and governedMetricCaveats',
    Boolean(vmLatencyChunk?.metadata.mandatoryCaveatText?.includes('Tier-1')) &&
      Boolean(vmLatencyChunk?.metadata.governedMetricCaveats && vmLatencyChunk.metadata.governedMetricCaveats.length >= 2),
    `mandatoryCaveatText and governedMetricCaveats populated on metadata`
  )

  // B: EDA CAD Volume Error Caveat
  const edaVolumeChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-eda-volume-error')
  assert(
    'Suite 3',
    'EDA CAD volume error chunk binds software-calculus vs CNC machining caveat',
    Boolean(edaVolumeChunk?.content.includes('software-calculus mathematical agreement')) &&
      Boolean(edaVolumeChunk?.content.includes('Does NOT assert physical CNC machining or manufacturing tolerance')),
    `EDA CAD volume error chunk binds software-calculus vs CNC tolerance caveat`
  )

  // C: AI Worksheets Duration Comparison Caveat
  const worksheetsChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-worksheets-poc-speedup')
  assert(
    'Suite 3',
    'AI Worksheets duration chunk binds estimated baseline comparison caveat',
    Boolean(worksheetsChunk?.content.includes('estimated baseline comparison')) &&
      Boolean(worksheetsChunk?.content.includes('not a controlled or universally validated productivity benchmark')),
    `AI Worksheets duration chunk binds estimated baseline comparison caveat`
  )

  // D: Test Count Metric Invariants
  const askHardeningChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-ask-aadil-hardening')
  const askHarnessChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-ask-aadil-harness')
  assert(
    'Suite 3',
    'Ask Aadil preserves distinction between 172 core hardening checks and 327 harness assertions',
    Boolean(askHardeningChunk?.content.includes('172 core hardening checks')) &&
      Boolean(askHardeningChunk?.content.includes('132 agent QA checks, 29 action governance checks')) &&
      Boolean(askHarnessChunk?.content.includes('327 total assertions across 10 evaluation test scripts')),
    `Ask Aadil 172 core hardening and 327 total harness assertions preserved as distinct metrics`
  )

  const relTestCasesChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-reliability-test-cases')
  const relGovChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-reliability-governance-checks')
  assert(
    'Suite 3',
    'AI Reliability preserves distinction between 158 backend test cases and 47 governance checks',
    Boolean(relTestCasesChunk?.content.includes('collected backend test cases')) &&
      Boolean(relTestCasesChunk?.content.includes('NOT 158 distinct test suite files')) &&
      Boolean(relGovChunk?.content.includes('47 governance verification checks')) &&
      Boolean(relGovChunk?.content.includes('Strictly distinct from the 158 pytest figure')),
    `158 collected test cases vs 47 governance checks distinct counting units preserved`
  )

  const solaceJestChunk = kbChunks.find(c => c.id === 'chunk-kb-metric-solace-mobile-jest')
  assert(
    'Suite 3',
    'Solace AI mobile Jest metric binds negative physical device hardware caveat',
    Boolean(solaceJestChunk?.content.includes('React Native Jest test runners in external repository')) &&
      Boolean(solaceJestChunk?.content.includes('Does NOT represent physical Android mobile device hardware or emulator execution')),
    `Negative hardware assertion preserved on mobile Jest checks`
  )

  // E: ADR-VM-01 embeds Tier-1 and LLM caveats
  const adrVm01Chunk = kbChunks.find(c => c.id === 'chunk-kb-adr-vm-01')
  assert(
    'Suite 3',
    'ADR-VM-01 chunk embeds Tier-1 in-memory evaluation and upstream LLM caveats',
    Boolean(adrVm01Chunk?.content.includes('Tier-1 in-memory regex and AST deterministic evaluation gate')) &&
      Boolean(adrVm01Chunk?.content.includes('Upstream generative LLM inference takes ~4–8 seconds')),
    `ADR-VM-01 embeds dual-source caveat binding in decision text`
  )

  // ============================================================================
  // SUITE 4: PUBLICATION GOVERNANCE & FAIL-CLOSED CONFIDENTIALITY ENFORCEMENT
  // ============================================================================
  console.log('\n--- SUITE 4: Publication Governance & Fail-Closed Confidentiality Enforcement ---')

  // Public eligibility
  const cs01Eligible = isChunkEligibleForPublicRetrieval(cs01Overview!, 'PUBLIC')
  assert(
    'Suite 4',
    'Public case study CS-01 overview is eligible for public retrieval',
    cs01Eligible === true,
    `isChunkEligibleForPublicRetrieval returned true for CS-01`
  )

  // Proprietary exclusion
  const cs03Overview = kbChunks.find(c => c.id === 'chunk-kb-cs-03-overview')
  const cs03PublicEligible = isChunkEligibleForPublicRetrieval(cs03Overview!, 'PUBLIC')
  assert(
    'Suite 4',
    'Proprietary case study CS-03 overview is excluded from public retrieval',
    cs03PublicEligible === false && cs03Overview?.metadata.visibility === 'PROPRIETARY',
    `isChunkEligibleForPublicRetrieval returned false for proprietary CS-03`
  )

  const cs06Overview = kbChunks.find(c => c.id === 'chunk-kb-cs-06-overview')
  const cs06PublicEligible = isChunkEligibleForPublicRetrieval(cs06Overview!, 'PUBLIC')
  assert(
    'Suite 4',
    'Proprietary case study CS-06 overview is excluded from public retrieval',
    cs06PublicEligible === false && cs06Overview?.metadata.visibility === 'PROPRIETARY',
    `isChunkEligibleForPublicRetrieval returned false for proprietary CS-06`
  )

  // CS-08 Restricted exclusion
  const cs08PublicEligible = isChunkEligibleForPublicRetrieval(cs08Chunk!, 'PUBLIC')
  assert(
    'Suite 4',
    'CS-08 DiffGuard is strictly excluded from public retrieval',
    cs08PublicEligible === false && cs08Chunk?.metadata.visibility === 'RESTRICTED',
    `isChunkEligibleForPublicRetrieval returned false for CS-08`
  )

  // Zero internal corporate git repo leaks across all chunks
  const hasPrivateGitLeaks = kbChunks.some(
    c =>
      c.content.includes('github.com/wayground') ||
      c.content.includes('github.com/quizizz') ||
      c.metadata.source_url.includes('github.com/wayground')
  )
  assert(
    'Suite 4',
    'Zero private corporate GitHub URLs present across all 69 Knowledge Base chunks',
    !hasPrivateGitLeaks,
    `Verified 0 private corporate repository leaks across all KB chunks`
  )

  // ============================================================================
  // SUITE 5: HYBRID RETRIEVAL INTEGRATION, SCORING & CONTEXT ASSEMBLY
  // ============================================================================
  console.log('\n--- SUITE 5: Hybrid Retrieval Integration, Scoring & Context Assembly ---')

  // A: Structured Case Study Query (CS-01)
  const cs01Retrieval = retrieveHybrid('Tell me about Case Study CS-01')
  assert(
    'Suite 5',
    'Hybrid retriever resolves Case Study CS-01 query via structured tier',
    cs01Retrieval.debug?.retrievalPath.includes('structured_knowledge_base') === true,
    `Retrieval paths: ${cs01Retrieval.debug?.retrievalPath.join(', ')}`
  )
  assert(
    'Suite 5',
    'CS-01 query surfaces exactAnswer and Knowledge Base evidence item',
    Boolean(cs01Retrieval.structured.exactAnswer?.includes('Case Study CS-01')) &&
      cs01Retrieval.evidenceItems.some(e => e.sourceType === 'knowledge_base' && e.caseStudyId === 'CS-01'),
    `exactAnswer: "${cs01Retrieval.structured.exactAnswer?.slice(0, 60)}..."`
  )

  // B: Structured ADR Query (ADR-VOICE-01)
  const adrRetrieval = retrieveHybrid('What is ADR-VOICE-01?')
  assert(
    'Suite 5',
    'Hybrid retriever resolves ADR-VOICE-01 via structured Knowledge Base tier',
    adrRetrieval.debug?.retrievalPath.includes('structured_knowledge_base') === true,
    `Retrieval paths: ${adrRetrieval.debug?.retrievalPath.join(', ')}`
  )
  assert(
    'Suite 5',
    'ADR-VOICE-01 query evidence retains contentAnchor and deepLink',
    adrRetrieval.evidenceItems.some(
      e => e.adrId === 'ADR-VOICE-01' && e.contentAnchor === 'adr-voice-01' && Boolean(e.deepLink?.includes('#adr-voice-01'))
    ),
    `ADR evidence carries contentAnchor 'adr-voice-01' and deepLink to Knowledge Base anchor`
  )

  // C: Governed Metric Query: VM Copy Latency
  const vmRet = retrieveHybrid('What is the latency and cost of VM Copy?')
  assert(
    'Suite 5',
    'VM Copy latency query binds mandatory Tier-1 evaluation caveat in evidence',
    vmRet.evidenceItems.some(
      e =>
        Boolean(e.mandatoryCaveatText?.includes('Tier-1')) &&
        Boolean(e.content.includes('Upstream generative LLM inference takes ~4–8 seconds'))
    ),
    `Evidence item retains mandatory Tier-1 in-memory evaluation and upstream LLM generation caveats`
  )

  // D: CS-08 Boundary Query
  const cs08Ret = retrieveHybrid('What is Case Study CS-08 DiffGuard?')
  assert(
    'Suite 5',
    'CS-08 DiffGuard query deterministically enforces external boundary statement',
    Boolean(cs08Ret.structured.exactAnswer?.includes('SEPARATE_REPOSITORY — TECHNICAL CASE STUDY DEFERRED')) &&
      Boolean(cs08Ret.structured.exactAnswer?.includes('not hosted or inspected within this Portfolio workspace')),
    `exactAnswer: "${cs08Ret.structured.exactAnswer?.slice(0, 90)}..."`
  )

  // E: Semantic Search Boosting for Knowledge Base chunks
  const patternRet = retrieveHybrid('Show me cross project engineering patterns in the portfolio')
  assert(
    'Suite 5',
    'Querying patterns surfaces boosted Knowledge Base pattern chunks in semantic search',
    patternRet.semanticChunks.some(c => c.metadata.knowledgeCategory === 'CROSS_PROJECT_PATTERN'),
    `Found Knowledge Base pattern chunk in semantic topChunks`
  )

  // ============================================================================
  // SUITE 6: REBUILD DETERMINISM, HASHING & CACHE INVALIDATION
  // ============================================================================
  console.log('\n--- SUITE 6: Rebuild Determinism, Hashing & Cache Invalidation ---')

  invalidateKnowledgeIndex()
  const rebuild1 = buildKnowledgeIndex()
  invalidateKnowledgeIndex()
  const rebuild2 = buildKnowledgeIndex()

  assert(
    'Suite 6',
    'Rebuild yields identical total index count (226 chunks)',
    rebuild1.length === rebuild2.length && rebuild1.length === 226,
    `Total chunks: ${rebuild1.length} === ${rebuild2.length} (expected 226)`
  )

  let allIdsMatch = true
  let allHashesMatch = true
  for (let i = 0; i < rebuild1.length; i++) {
    if (rebuild1[i].id !== rebuild2[i].id) {
      allIdsMatch = false
      break
    }
    if (rebuild1[i].metadata.contentHash !== rebuild2[i].metadata.contentHash) {
      allHashesMatch = false
      break
    }
  }

  assert(
    'Suite 6',
    'All 226 chunk IDs match in exact sequence across index rebuilds',
    allIdsMatch,
    `100% ID order preserved across rebuilds`
  )

  assert(
    'Suite 6',
    'All 226 chunk content hashes match exactly across index rebuilds',
    allHashesMatch,
    `100% hash determinism preserved across rebuilds`
  )

  // Verify hash recomputation
  const testChunk = kbChunks[0]
  const expectedHash = computeContentHash(testChunk.content)
  assert(
    'Suite 6',
    'Chunk contentHash matches SHA-256(content.trim())',
    testChunk.metadata.contentHash === expectedHash,
    `Hash ${testChunk.metadata.contentHash?.slice(0, 16)}... matches computed SHA-256`
  )

  // ============================================================================
  // SUITE 7: ADVERSARIAL PROBING & NEGATIVE BOUNDARY INVARIANTS
  // ============================================================================
  console.log('\n--- SUITE 7: Adversarial Probing & Negative Boundary Invariants ---')

  // A: Malicious Metric Caveat Stripping Attempt
  const ungroundedMetricChunk: KnowledgeChunk = {
    id: 'malicious-metric-chunk',
    content: 'VM Copy runs at <1ms latency with $0 spend and zero caveats.',
    metadata: {
      source_type: 'knowledge_base',
      source_id: 'malicious-metric',
      source_title: 'Malicious Metric',
      source_url: `/${KB_SOURCE_DOCUMENT}#fake`,
      portfolio_layer: 'canonical',
      project: 'proj-vm-copy',
      content_type: 'quantitative_claim',
      authority_type: 'unverified',
      last_verified: '2026-11-15'
    }
  }

  let caveatStrippingBlocked = false
  try {
    validateMetricCaveatBinding(ungroundedMetricChunk)
  } catch (err: any) {
    caveatStrippingBlocked = true
  }
  assert(
    'Suite 7',
    'validateMetricCaveatBinding fails closed when metric caveat is stripped',
    caveatStrippingBlocked,
    `Atomicity validator threw on ungrounded VM Copy <1ms claim without Tier-1 caveat`
  )

  // B: Malicious Proprietary URL in Knowledge Base chunk
  const maliciousUrlChunk: KnowledgeChunk = {
    id: 'malicious-url-chunk',
    content: 'Internal repo available at https://github.com/wayground/secret-repo',
    metadata: {
      source_type: 'knowledge_base',
      source_id: 'malicious-url',
      source_title: 'Malicious URL',
      source_url: 'https://github.com/wayground/secret-repo',
      portfolio_layer: 'canonical',
      content_type: 'architecture',
      authority_type: 'primary',
      last_verified: '2026-11-15',
      visibility: 'PUBLIC'
    }
  }

  const urlLeakBlocked = !isChunkEligibleForPublicRetrieval(maliciousUrlChunk, 'PUBLIC')
  assert(
    'Suite 7',
    'isChunkEligibleForPublicRetrieval rejects chunk containing private corporate URL',
    urlLeakBlocked,
    `Governance filter rejected chunk with github.com/wayground URL`
  )

  // C: Malicious CS-08 Internal Promotion Attempt
  const promotedCs08Chunk: KnowledgeChunk = {
    id: 'promoted-cs08',
    content: 'DiffGuard is an internal project authored inside Portfolio repository.',
    metadata: {
      source_type: 'knowledge_base',
      source_id: 'cs-08-boundary',
      source_title: 'DiffGuard',
      source_url: `/${KB_SOURCE_DOCUMENT}#cs-08`,
      portfolio_layer: 'canonical',
      caseStudyId: 'CS-08',
      content_type: 'architecture',
      authority_type: 'primary',
      last_verified: '2026-11-15',
      visibility: 'PUBLIC' // Attempting to promote to public
    }
  }

  const cs08PromotionBlocked = !isChunkEligibleForPublicRetrieval(promotedCs08Chunk, 'PUBLIC')
  assert(
    'Suite 7',
    'isChunkEligibleForPublicRetrieval rejects CS-08 from public retrieval even if visibility is maliciously spoofed to PUBLIC',
    cs08PromotionBlocked,
    `Governance filter enforces canonical CS-08 external boundary invariant`
  )

  // D: Public exact query for CS-03 returns no proprietary answer or evidence
  const cs03Public = retrieveHybrid('Tell me about Case Study CS-03')
  assert(
    'Suite 7',
    'Public exact query for CS-03 returns no proprietary answer or evidence',
    !cs03Public.structured.exactAnswer &&
      !cs03Public.evidenceItems.some(e => e.caseStudyId === 'CS-03') &&
      !cs03Public.semanticChunks.some(c => c.metadata.caseStudyId === 'CS-03'),
    `exactAnswer: ${cs03Public.structured.exactAnswer || 'None'}, CS-03 evidence: ${cs03Public.evidenceItems.filter(e => e.caseStudyId === 'CS-03').length}, CS-03 chunks: ${cs03Public.semanticChunks.filter(c => c.metadata.caseStudyId === 'CS-03').length}`
  )

  // E: Public exact query for CS-06 returns no proprietary answer or evidence
  const cs06Public = retrieveHybrid('Tell me about Case Study CS-06')
  assert(
    'Suite 7',
    'Public exact query for CS-06 returns no proprietary answer or evidence',
    !cs06Public.structured.exactAnswer &&
      !cs06Public.evidenceItems.some(e => e.caseStudyId === 'CS-06') &&
      !cs06Public.semanticChunks.some(c => c.metadata.caseStudyId === 'CS-06'),
    `exactAnswer: ${cs06Public.structured.exactAnswer || 'None'}, CS-06 evidence: ${cs06Public.evidenceItems.filter(e => e.caseStudyId === 'CS-06').length}, CS-06 chunks: ${cs06Public.semanticChunks.filter(c => c.metadata.caseStudyId === 'CS-06').length}`
  )

  // F: Public exact query for CS-07 returns no proprietary answer or evidence
  const cs07Public = retrieveHybrid('Tell me about Case Study CS-07')
  assert(
    'Suite 7',
    'Public exact query for CS-07 returns no proprietary answer or evidence',
    !cs07Public.structured.exactAnswer &&
      !cs07Public.evidenceItems.some(e => e.caseStudyId === 'CS-07') &&
      !cs07Public.semanticChunks.some(c => c.metadata.caseStudyId === 'CS-07'),
    `exactAnswer: ${cs07Public.structured.exactAnswer || 'None'}, CS-07 evidence: ${cs07Public.evidenceItems.filter(e => e.caseStudyId === 'CS-07').length}, CS-07 chunks: ${cs07Public.semanticChunks.filter(c => c.metadata.caseStudyId === 'CS-07').length}`
  )

  // G: Public query for CS-08 does not expose its external boundary chunk as technical content
  const cs08Public = retrieveHybrid('What is Case Study CS-08 DiffGuard?')
  assert(
    'Suite 7',
    'Public query for CS-08 does not expose its external boundary chunk as technical content',
    !cs08Public.semanticChunks.some(c => c.id === 'chunk-kb-cs-08-boundary' || c.metadata.caseStudyId === 'CS-08') &&
      !cs08Public.evidenceItems.some(e => e.id === 'chunk-kb-cs-08-boundary'),
    `semanticChunks containing CS-08 technical boundary chunk: 0`
  )

  // H: Public semantic retrieval cannot return proprietary child chunks
  const semanticPropQuery = retrieveHybrid('in-memory regex AST deterministic evaluation gate')
  const hasProprietaryChunks = semanticPropQuery.semanticChunks.some(
    c => c.metadata.caseStudyId === 'CS-03' || c.metadata.caseStudyId === 'CS-06' || c.metadata.caseStudyId === 'CS-07' || c.metadata.visibility === 'PROPRIETARY'
  )
  assert(
    'Suite 7',
    'Public semantic retrieval cannot return proprietary child chunks',
    !hasProprietaryChunks,
    `semanticChunks contain 0 proprietary case study chunks (count: ${semanticPropQuery.semanticChunks.length})`
  )

  // I: Changing a CS-03, CS-06 or CS-07 child chunk visibility to PUBLIC does not make it eligible
  const spoofedCS03: KnowledgeChunk = {
    id: 'spoofed-cs03',
    content: 'VM Copy overview content',
    metadata: {
      source_type: 'knowledge_base',
      source_id: 'cs-03-overview',
      source_title: 'Spoofed CS03',
      source_url: `/${KB_SOURCE_DOCUMENT}#cs-03`,
      portfolio_layer: 'canonical',
      caseStudyId: 'CS-03',
      content_type: 'architecture',
      authority_type: 'primary',
      last_verified: '2026-11-15',
      visibility: 'PUBLIC' as any // Attempting to override parent
    }
  }
  const spoofedCS06: KnowledgeChunk = {
    ...spoofedCS03,
    id: 'spoofed-cs06',
    metadata: { ...spoofedCS03.metadata, caseStudyId: 'CS-06', source_id: 'cs-06-overview' }
  }
  const spoofedCS07: KnowledgeChunk = {
    ...spoofedCS03,
    id: 'spoofed-cs07',
    metadata: { ...spoofedCS03.metadata, caseStudyId: 'CS-07', source_id: 'cs-07-overview' }
  }
  assert(
    'Suite 7',
    'Changing a CS-03 child chunk visibility to PUBLIC does not make it eligible',
    !isChunkEligibleForPublicRetrieval(spoofedCS03, 'PUBLIC'),
    'Parent manifest publicationEligibility EMPLOYER_PROPRIETARY_CASE_STUDY overrides child visibility=PUBLIC'
  )
  assert(
    'Suite 7',
    'Changing a CS-06 child chunk visibility to PUBLIC does not make it eligible',
    !isChunkEligibleForPublicRetrieval(spoofedCS06, 'PUBLIC'),
    'Parent manifest publicationEligibility EMPLOYER_PROPRIETARY_CASE_STUDY overrides child visibility=PUBLIC'
  )
  assert(
    'Suite 7',
    'Changing a CS-07 child chunk visibility to PUBLIC does not make it eligible',
    !isChunkEligibleForPublicRetrieval(spoofedCS07, 'PUBLIC'),
    'Parent manifest publicationEligibility EMPLOYER_PROPRIETARY_CASE_STUDY overrides child visibility=PUBLIC'
  )

  // J: Missing visibility fails closed
  const missingVisChunk: KnowledgeChunk = {
    id: 'missing-vis',
    content: 'Some technical content',
    metadata: {
      source_type: 'knowledge_base',
      source_id: 'timeline-spine',
      source_title: 'Test',
      source_url: `/${KB_SOURCE_DOCUMENT}#test`,
      portfolio_layer: 'canonical',
      content_type: 'architecture',
      authority_type: 'primary',
      last_verified: '2026-11-15',
      visibility: undefined as any
    }
  }
  assert(
    'Suite 7',
    'Missing visibility fails closed',
    !isChunkEligibleForPublicRetrieval(missingVisChunk, 'PUBLIC'),
    'undefined visibility strictly rejected'
  )

  // K: Empty visibility fails closed
  const emptyVisChunk: KnowledgeChunk = {
    ...missingVisChunk,
    id: 'empty-vis',
    metadata: { ...missingVisChunk.metadata, visibility: '' as any }
  }
  assert(
    'Suite 7',
    'Empty visibility fails closed',
    !isChunkEligibleForPublicRetrieval(emptyVisChunk, 'PUBLIC'),
    'empty string visibility strictly rejected'
  )

  // L: Invalid visibility fails closed
  const invalidVisChunk: KnowledgeChunk = {
    ...missingVisChunk,
    id: 'invalid-vis',
    metadata: { ...missingVisChunk.metadata, visibility: 'INVALID_VISIBILITY' as any }
  }
  assert(
    'Suite 7',
    'Invalid visibility fails closed',
    !isChunkEligibleForPublicRetrieval(invalidVisChunk, 'PUBLIC'),
    'invalid enum value strictly rejected'
  )

  // M: Missing or unknown case-study identity fails closed where category requires one
  const missingCsIdChunk: KnowledgeChunk = {
    id: 'missing-csid',
    content: 'Case study overview without ID',
    metadata: {
      source_type: 'knowledge_base',
      source_id: 'test-overview',
      source_title: 'Test Overview',
      source_url: `/${KB_SOURCE_DOCUMENT}#test`,
      portfolio_layer: 'canonical',
      content_type: 'architecture',
      authority_type: 'primary',
      last_verified: '2026-11-15',
      knowledgeCategory: 'CASE_STUDY_OVERVIEW',
      visibility: 'PUBLIC',
      caseStudyId: undefined as any
    }
  }
  const unknownCsIdChunk: KnowledgeChunk = {
    ...missingCsIdChunk,
    id: 'unknown-csid',
    metadata: { ...missingCsIdChunk.metadata, caseStudyId: 'CS-99' as any }
  }
  assert(
    'Suite 7',
    'Missing case-study identity fails closed where category requires one',
    !isChunkEligibleForPublicRetrieval(missingCsIdChunk, 'PUBLIC'),
    'undefined caseStudyId on CASE_STUDY_OVERVIEW strictly rejected'
  )
  assert(
    'Suite 7',
    'Unknown case-study identity fails closed',
    !isChunkEligibleForPublicRetrieval(unknownCsIdChunk, 'PUBLIC'),
    'unknown CS-99 strictly rejected by canonical manifest lookup'
  )

  // N: A restricted child of a public parent remains restricted
  const restrictedChildChunk: KnowledgeChunk = {
    id: 'restricted-child-cs01',
    content: 'Restricted draft within CS-01',
    metadata: {
      source_type: 'knowledge_base',
      source_id: 'cs-01-restricted-aspect',
      source_title: 'CS01 Restricted Child',
      source_url: `/${KB_SOURCE_DOCUMENT}#cs-01`,
      portfolio_layer: 'canonical',
      caseStudyId: 'CS-01', // Public parent
      content_type: 'architecture',
      authority_type: 'primary',
      last_verified: '2026-11-15',
      visibility: 'RESTRICTED' // More restrictive child
    }
  }
  assert(
    'Suite 7',
    'A restricted child of a public parent remains restricted',
    !isChunkEligibleForPublicRetrieval(restrictedChildChunk, 'PUBLIC'),
    'Chunk-level RESTRICTED overrides public parent'
  )

  // O: Public CS-01, CS-02, CS-04 and CS-05 behavior remains valid where chunks are eligible
  const cs01ChunkCheck = kbChunks.find(c => c.id === 'chunk-kb-cs-01-overview')
  const cs02ChunkCheck = kbChunks.find(c => c.id === 'chunk-kb-cs-02-overview')
  const cs04ChunkCheck = kbChunks.find(c => c.id === 'chunk-kb-cs-04-overview')
  const cs05ChunkCheck = kbChunks.find(c => c.id === 'chunk-kb-cs-05-overview')
  assert(
    'Suite 7',
    'Public CS-01, CS-02, CS-04 and CS-05 chunks remain valid where eligible',
    Boolean(cs01ChunkCheck && isChunkEligibleForPublicRetrieval(cs01ChunkCheck, 'PUBLIC')) &&
      Boolean(cs02ChunkCheck && isChunkEligibleForPublicRetrieval(cs02ChunkCheck, 'PUBLIC')) &&
      Boolean(cs04ChunkCheck && isChunkEligibleForPublicRetrieval(cs04ChunkCheck, 'PUBLIC')) &&
      Boolean(cs05ChunkCheck && isChunkEligibleForPublicRetrieval(cs05ChunkCheck, 'PUBLIC')),
    'CS-01, CS-02, CS-04, and CS-05 overviews all evaluate to eligible (true)'
  )

  // P: Non-Knowledge-Base retrieval continues to work seamlessly
  const profileRet = retrieveHybrid('Who is Aadil?')
  const progressionRet = retrieveHybrid('How did Aadil go from math to AI?')
  assert(
    'Suite 7',
    'Non-Knowledge-Base retrieval continues to work seamlessly',
    Boolean(profileRet.structured.profile?.name === 'Mohemmed Aadil Khurshid') &&
      progressionRet.evidenceItems.length >= 3 &&
      progressionRet.evidenceItems.some(e => e.entity?.includes('Stage 1')),
    'Profile and multi-source progression retrieval paths intact'
  )

  // Q: Assembled answer context contains zero proprietary content
  const understandRes03 = await understandQuery('Tell me about Case Study CS-03')
  const emptyContext: ConversationContext = {
    turnCount: 0,
    activeEntities: [],
    recentQuestion: undefined,
    recentAnswerSummary: undefined
  }
  const pkg03 = buildEvidencePackage('Tell me about Case Study CS-03', cs03Public, understandRes03.understanding, emptyContext)
  const pkg03HasProprietary = pkg03.evidence.some(
    e => e.caseStudyId === 'CS-03' || e.caseStudyId === 'CS-06' || e.caseStudyId === 'CS-07' || e.content.includes('EMPLOYER_PROPRIETARY')
  )
  assert(
    'Suite 7',
    'Assembled answer context contains zero proprietary content',
    !pkg03HasProprietary && !cs03Public.evidenceItems.some(e => e.caseStudyId === 'CS-03'),
    `EvidencePackage for CS-03 contains 0 proprietary CS-03 evidence items (verified across ${pkg03.evidence.length} retrieved items)`
  )

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('\n====================================================================')
  console.log('                          TEST SUMMARY                              ')
  console.log('====================================================================')
  const total = testResults.length
  const passed = testResults.filter(r => r.passed).length
  const failed = total - passed

  console.log(`Total Assertions: ${total}`)
  console.log(`Passed:           ${passed}`)
  console.log(`Failed:           ${failed}`)
  console.log(`Success Rate:     ${((passed / total) * 100).toFixed(1)}%\n`)

  if (failed > 0) {
    console.error(`FAILED: ${failed} assertions failed!`)
    process.exit(1)
  } else {
    console.log('ALL PHASE 2.5E RAG KNOWLEDGE BASE INGESTION TESTS PASSED!')
  }
}

runPhase25ETestSuite().catch(err => {
  console.error('Test execution error:', err)
  process.exit(1)
})
