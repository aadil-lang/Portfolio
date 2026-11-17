/**
 * STRUCTURED KNOWLEDGE BASE INGESTION & EVIDENCE-GOVERNED RETRIEVAL (PHASE 2.5E)
 *
 * Implements document-aware ingestion of the Engineering Experience Knowledge Base:
 * `research/engineering/ENGINEERING_EXPERIENCE_KNOWLEDGE_BASE_DRAFT.md`
 *
 * Core Guarantees:
 * 1. Structural Parsing: Preserves section boundaries (Overview, Diagnostics, ADRs, Claims, Patterns, Metrics).
 * 2. Stable Canonical Identity: Binds chunks to canonical CaseStudyId, AdrId, ProjectId, CareerId, and Journal Mappings.
 * 3. Atomic Metric-Caveat Binding: Guarantees metrics and their mandatory qualification caveats are structurally
 *    inseparable in data modeling, indexing, retrieval, and context assembly.
 * 4. Governance & Fail-Closed Publication: Filters proprietary systems (VM Copy, Curriculum ETL, Item Bank)
 *    and restricted boundaries (CS-08 DiffGuard) from public exposure.
 * 5. Deterministic Content Hashing: Generates stable, reproducible SHA-256 chunk hashes under RAG_INDEX_VERSION 2.5.0.
 */

import {
  KnowledgeChunk,
  SourceChunkMetadata,
  EngineeringKnowledgeChunkMetadata,
  EvidenceItem,
  SourceType,
  PortfolioLayer
} from '@/types/rag'
import {
  canonicalRegistry,
  canonicalCaseStudyReferences,
  getCaseStudyManifest,
  getAdrManifest
} from '@/data/canonical/canonicalRegistry'
import { CaseStudyId, AdrId } from '@/data/canonical/canonicalSchema'
import { computeContentHash, RAG_INDEX_VERSION } from '@/lib/rag/canonicalRAGAdapter'

export const KB_SOURCE_DOCUMENT = 'research/engineering/ENGINEERING_EXPERIENCE_KNOWLEDGE_BASE_DRAFT.md'
export const KB_LAST_VERIFIED = '2026-11-15'

// ============================================================================
// 1. MANDATORY METRIC CAVEATS DICTIONARY (ATOMIC BINDING SPECIFICATION)
// ============================================================================

export interface MetricCaveatDefinition {
  metricId: string
  claimId?: string
  evidenceId?: string
  projectId?: string
  headline: string
  documentedValue: string
  mandatoryCaveat: string
  detailedQualifications: string[]
  measurementScope: string
  verificationStatus:
    | 'SOURCE_VERIFIED'
    | 'TEST_VERIFIED'
    | 'REPORT_SUPPORTED'
    | 'HISTORY_SUPPORTED'
    | 'CONTEXT_SUPPORTED'
    | 'PARTIALLY_VERIFIED'
    | 'CONFLICTING'
    | 'PROPOSED'
    | 'UNVERIFIED'
  epistemicConfidence: 'HIGH' | 'MEDIUM' | 'LOW'
  executionLocality:
    | 'LOCAL_WORKSPACE_EXECUTED'
    | 'UNEXECUTED_IN_THIS_REPO'
    | 'EXTERNAL_REPOSITORY'
    | 'PROPRIETARY_CLUSTER'
}

export const MANDATORY_METRIC_CAVEATS: Record<string, MetricCaveatDefinition> = {
  'vm-latency': {
    metricId: 'vm-latency',
    claimId: 'CLAIM-VM-001',
    evidenceId: 'EVID-VM-01',
    projectId: 'proj-vm-copy',
    headline: 'VM Copy In-Memory Evaluator Latency',
    documentedValue: '< 1ms execution ($0 marginal API spend)',
    mandatoryCaveat:
      'Applies strictly to Tier-1 in-memory regex and AST deterministic evaluation gate (lib/eval-layer.ts). Upstream generative LLM inference takes ~4–8 seconds (historical observation) and incurs standard provider API costs. Does NOT describe end-to-end generation latency or imply the entire workflow is free.',
    detailedQualifications: [
      'Applies strictly to Tier-1 in-memory regex and AST structural assertion evaluation gate.',
      'Upstream LLM generation takes approximately 4–8 seconds per item batch.',
      'Upstream LLM generation incurs external commercial model API costs.',
      '$0 marginal spend applies exclusively to Tier-1 deterministic evaluation.',
      'Historical project-reported measurement; no retained automated benchmark establishes this as a reproducible performance guarantee.'
    ],
    measurementScope: 'IN_MEMORY_DETERMINISTIC_GATE',
    verificationStatus: 'PARTIALLY_VERIFIED',
    epistemicConfidence: 'MEDIUM',
    executionLocality: 'UNEXECUTED_IN_THIS_REPO'
  },
  'vm-batching': {
    metricId: 'vm-batching',
    projectId: 'proj-vm-copy',
    headline: 'VM Copy Serverless Micro-Batching Duration',
    documentedValue: '~5–6 seconds batch completion (vs >35s monolithic)',
    mandatoryCaveat:
      'Represents a historical project observation in documented internal team usage, not controlled automated production benchmark telemetry; does not establish gateway timeouts were universally eliminated across all serverless environments.',
    detailedQualifications: [
      'Partitioning generation into concurrent sub-batches of 2–3 items yielded ~5–6s total duration in internal team observations.',
      'Historical baseline for monolithic prompts exceeded 35 seconds, risking serverless HTTP gateway timeouts.',
      'Observed improvement represents internal team usage notes, not a formal production load benchmark harness.'
    ],
    measurementScope: 'HISTORICAL_TEAM_OBSERVATION',
    verificationStatus: 'HISTORY_SUPPORTED',
    epistemicConfidence: 'MEDIUM',
    executionLocality: 'UNEXECUTED_IN_THIS_REPO'
  },
  'eda-volume-error': {
    metricId: 'eda-volume-error',
    claimId: 'CLAIM-EDA-002',
    evidenceId: 'EVID-EDA-02',
    projectId: 'proj-design-automation',
    headline: 'EDA CAD Analytical vs BRep Solid Mass Volume Error',
    documentedValue: '< 10⁻⁶ relative discrepancy (0.0000% error)',
    mandatoryCaveat:
      'Measures software-calculus mathematical agreement between closed-form physics equations and OpenCascade CAD solid kernel mass integrals. Does NOT assert physical CNC machining or manufacturing tolerance.',
    detailedQualifications: [
      'Represents mathematical consistency between closed-form analytical physics equations and OpenCascade CadQuery BRep solid mass property integrals.',
      'Software calculus verification only; does NOT represent physical CNC tolerance or manufacturing accuracy.',
      'Verified across tested geometry primitives; does not generalize to arbitrary unconstrained solid geometries.'
    ],
    measurementScope: 'ANALYTICAL_PRIMITIVE_CALCULUS',
    verificationStatus: 'PARTIALLY_VERIFIED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'UNEXECUTED_IN_THIS_REPO'
  },
  'eda-cad-tests': {
    metricId: 'eda-cad-tests',
    claimId: 'CLAIM-EDA-001',
    evidenceId: 'EVID-EDA-01',
    projectId: 'proj-design-automation',
    headline: 'EDA CAD Automated Pytest Suite Count',
    documentedValue: '424 pytests across 28 suites',
    mandatoryCaveat:
      'Historical execution is documented in project validation records for the containerized Docker OpenCascade pytest runner. This Portfolio pass does not independently reproduce that execution.',
    detailedQualifications: [
      '424 automated pytests across 28 test suites in containerized Docker test environment.',
      'Historical execution documented in project validation logs.',
      'Local portfolio repository does not contain containerized OpenCascade C++ runtime to execute suite.'
    ],
    measurementScope: 'AUTOMATED_CONTAINER_TEST_SUITE',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'UNEXECUTED_IN_THIS_REPO'
  },
  'worksheets-poc-speedup': {
    metricId: 'worksheets-poc-speedup',
    projectId: 'proj-ai-worksheets',
    headline: 'AI Worksheets Authoring Duration Comparison',
    documentedValue: '~2 hours teacher baseline vs ~3 minutes prototype generation',
    mandatoryCaveat:
      'Represents an estimated baseline comparison between manual teacher worksheet creation and prototype pipeline generation, not a controlled or universally validated productivity benchmark.',
    detailedQualifications: [
      'Estimated baseline comparison; teacher authoring time varies widely across grade levels and curriculum domains.',
      'Prototype generation runtime represents automated draft output, still requiring pedagogical review and formatting.',
      'Not a controlled production time-and-motion study or universal productivity guarantee.'
    ],
    measurementScope: 'ESTIMATED_BASELINE_COMPARISON',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'MEDIUM',
    executionLocality: 'UNEXECUTED_IN_THIS_REPO'
  },
  'reliability-test-cases': {
    metricId: 'reliability-test-cases',
    claimId: 'CLAIM-RELIABILITY-001',
    evidenceId: 'EVID-REL-01',
    projectId: 'proj-ai-reliability',
    headline: 'AI Application Reliability Backend Test Cases',
    documentedValue: '158 collected backend test cases',
    mandatoryCaveat:
      'Represents collected pytest test cases and parameterized checks across backend/tests/ in external repository (aadil-lang/ai-application-reliability). Unexecuted in this local repository. Strictly individual test cases, NOT 158 distinct test suite files.',
    detailedQualifications: [
      'Count represents collected pytest test cases and parameterized assertions across backend/tests/.',
      'Hosted in external repository aadil-lang/ai-application-reliability; unexecuted in local Portfolio workspace.',
      'Governed strictly as individual test cases, NOT 158 test suite files.'
    ],
    measurementScope: 'AUTOMATED_TEST_COLLECTION',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'EXTERNAL_REPOSITORY'
  },
  'reliability-governance-checks': {
    metricId: 'reliability-governance-checks',
    claimId: 'CLAIM-RELIABILITY-002',
    evidenceId: 'EVID-REL-02',
    projectId: 'proj-ai-reliability',
    headline: 'AI Reliability Governance Verification Checks',
    documentedValue: '47 governance verification checks across 12 test pages',
    mandatoryCaveat:
      'Recorded across a mix of Playwright DOM probes, mathematical covariance bounding checks, and cryptographic token gating across 12 test pages in tests/governance/ in external repository. Not 47 pure Playwright tests. Strictly distinct from the 158 pytest figure.',
    detailedQualifications: [
      'Recorded across a heterogeneous mix of Playwright DOM layout probes, covariance bounding assertions, and token gates.',
      'Executed across 12 test pages in external repository.',
      'Strictly distinct metric from the 158 backend test cases; do not collapse into single undifferentiated total.'
    ],
    measurementScope: 'HETEROGENEOUS_GOVERNANCE_VERIFICATION',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'EXTERNAL_REPOSITORY'
  },
  'ask-aadil-hardening': {
    metricId: 'ask-aadil-hardening',
    claimId: 'CLAIM-ASK-001',
    evidenceId: 'EVID-ASK-01',
    projectId: 'proj-ask-aadil',
    headline: 'Ask Aadil Core Hardening Verification Checks',
    documentedValue: '172 core hardening checks',
    mandatoryCaveat:
      'Core hardening slice: 132 agent QA checks, 29 action governance checks, and 11 browser E2E checks. Strictly distinct from the 327 evaluation harness assertions.',
    detailedQualifications: [
      'Structured into 132 agent QA checks, 29 action governance checks, and 11 browser E2E checks.',
      'Fully reproducible locally via project test scripts.',
      'Distinct from the broader 327 evaluation harness assertions collected across all 10 scripts.'
    ],
    measurementScope: 'LOCAL_HARDENING_VERIFICATION_SLICE',
    verificationStatus: 'SOURCE_VERIFIED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'LOCAL_WORKSPACE_EXECUTED'
  },
  'ask-aadil-harness': {
    metricId: 'ask-aadil-harness',
    claimId: 'CLAIM-ASK-002',
    evidenceId: 'EVID-ASK-02',
    projectId: 'proj-ask-aadil',
    headline: 'Ask Aadil Total Harness Assertions',
    documentedValue: '327 total assertions across 10 evaluation test scripts',
    mandatoryCaveat:
      'Total assertions collected across all 10 evaluation test scripts in scripts/. Distinct counting unit from the 172 core hardening checks.',
    detailedQualifications: [
      'Collected across 10 evaluation test scripts in scripts/.',
      'Includes voice tests, grounding tests, routing tests, action tests, and regression assertions.',
      'Fully executable and verified in local workspace.'
    ],
    measurementScope: 'COMPREHENSIVE_HARNESS_ASSERTIONS',
    verificationStatus: 'SOURCE_VERIFIED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'LOCAL_WORKSPACE_EXECUTED'
  },
  'ask-aadil-voice': {
    metricId: 'ask-aadil-voice',
    projectId: 'proj-ask-aadil',
    headline: 'Ask Aadil Conversational Voice Verification Assertions',
    documentedValue: '47 automated assertions in scripts/test_conversational_voice.ts',
    mandatoryCaveat:
      'Automated assertions verifying transcript assembly, prefix removal, and single-shot latch in local test runner. Cross-browser production telemetry (e.g. Safari production logs) is not present in this workspace repository.',
    detailedQualifications: [
      'Verifies Web Speech transcript prefix removal, repetition preservation, and single-shot submission latch.',
      'Tested against simulated Chromium recognition payloads and local mock harnesses.',
      'Applies to tested harness conditions; cross-browser production telemetry not retained in this repository.'
    ],
    measurementScope: 'VOICE_TRANSCRIPT_HARNESS_TESTS',
    verificationStatus: 'SOURCE_VERIFIED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'LOCAL_WORKSPACE_EXECUTED'
  },
  'solace-mobile-jest': {
    metricId: 'solace-mobile-jest',
    claimId: 'CLAIM-SOLACE-002',
    evidenceId: 'EVID-SOLACE-02',
    projectId: 'proj-solace-ai',
    headline: 'Solace AI Mobile Jest Checks',
    documentedValue: '50 mobile Jest checks across 7 suites',
    mandatoryCaveat:
      'Recorded in React Native Jest test runners in external repository (aadil-lang/solace-ai). Unexecuted in this local repository. Does NOT represent physical Android mobile device hardware or emulator execution.',
    detailedQualifications: [
      'Recorded in React Native Jest mock environment in external repository.',
      'Unexecuted in this local workspace repository.',
      'Does NOT establish execution on physical Android or iOS device hardware.'
    ],
    measurementScope: 'MOBILE_FRAMEWORK_MOCK_TESTS',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'EXTERNAL_REPOSITORY'
  },
  'solace-mobile-tsc': {
    metricId: 'solace-mobile-tsc',
    claimId: 'CLAIM-SOLACE-002',
    evidenceId: 'EVID-SOLACE-02',
    projectId: 'proj-solace-ai',
    headline: 'Solace AI Mobile Static Analysis',
    documentedValue: '0 TypeScript compiler errors (tsc --noEmit)',
    mandatoryCaveat:
      'Recorded by tsc --noEmit in external repository. Separate static typecheck metric distinct from the 50 Jest checks. Unexecuted in this local repository.',
    detailedQualifications: [
      'Static analysis check only, confirming type consistency across mobile codebase.',
      'Distinct counting unit from dynamic Jest checks.',
      'Unexecuted in this local workspace repository.'
    ],
    measurementScope: 'STATIC_TYPECHECK_VERIFICATION',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'EXTERNAL_REPOSITORY'
  },
  'solace-backend-tests': {
    metricId: 'solace-backend-tests',
    claimId: 'CLAIM-SOLACE-001',
    evidenceId: 'EVID-SOLACE-01',
    projectId: 'proj-solace-ai',
    headline: 'Solace AI Backend Pytest Suite',
    documentedValue: '52 backend pytests across 8 suites',
    mandatoryCaveat:
      'Recorded in external repository aadil-lang/solace-ai. Unexecuted in this local repository.',
    detailedQualifications: [
      '52 automated pytests across 8 suites covering LangGraph state machines and crisis screening.',
      'Hosted in external repository aadil-lang/solace-ai.',
      'Unexecuted in this local repository.'
    ],
    measurementScope: 'BACKEND_PYTEST_COLLECTION',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'EXTERNAL_REPOSITORY'
  },
  'etl-integrity-gates': {
    metricId: 'etl-integrity-gates',
    claimId: 'CLAIM-ETL-001',
    evidenceId: 'EVID-ETL-01',
    projectId: 'proj-curriculum-etl',
    headline: 'Curriculum ETL 3-Tier Validation Architecture',
    documentedValue: '3-tier validation architecture (Reviewer, row guards, CSV Audit)',
    mandatoryCaveat:
      'Architecture enforcing structural integrity via Reviewer, deterministic row guards, and CSV Audit. No offline pytest suite is committed in the repository; earlier draft mention of 38 pytests was unevidenced.',
    detailedQualifications: [
      'Validation pipeline consists of interactive Reviewer, deterministic programmatic row guards, and CSV audit comparison.',
      'No standalone pytest suite is committed in this repository.',
      'Earlier draft mention of 38 pytests was unevidenced and removed.'
    ],
    measurementScope: 'PIPELINE_ARCHITECTURE_INSPECTION',
    verificationStatus: 'PARTIALLY_VERIFIED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'LOCAL_WORKSPACE_EXECUTED'
  },
  'ocr-evaluator-tests': {
    metricId: 'ocr-evaluator-tests',
    projectId: 'proj-ocr-evaluator',
    headline: 'OCR Evaluator Test Inventory',
    documentedValue: '134 backend test functions across 22 files and 20 Playwright assertions',
    mandatoryCaveat:
      'Represents discrete backend test functions and Playwright assertions in OCR Evaluator. Test counts retain their distinct counting units and must not be collapsed into an undifferentiated total.',
    detailedQualifications: [
      '134 backend test functions distributed across 22 test files.',
      '20 browser E2E Playwright assertions.',
      'Distinct counting units must not be aggregated into a single misleading number.'
    ],
    measurementScope: 'DISCRETE_TEST_UNIT_INVENTORY',
    verificationStatus: 'REPORT_SUPPORTED',
    epistemicConfidence: 'HIGH',
    executionLocality: 'UNEXECUTED_IN_THIS_REPO'
  }
}

// ============================================================================
// 2. ATOMIC METRIC-CAVEAT BINDING ENFORCEMENT & INTEGRITY CHECKS
// ============================================================================

/**
 * Validates that a chunk containing a quantitative metric claim structurally retains
 * its mandatory qualification caveat in its content and metadata.
 * Fails closed: throws or returns false if a metric is detected without qualification.
 */
export function validateMetricCaveatBinding(chunk: KnowledgeChunk): boolean {
  const content = chunk.content.toLowerCase()
  const meta = chunk.metadata

  // Check 1: VM Copy <1ms latency metric
  if (content.includes('<1ms') || content.includes('< 1ms') || (meta.project === 'proj-vm-copy' && content.includes('latency'))) {
    const hasTier1Caveat =
      content.includes('tier-1') ||
      content.includes('in-memory') ||
      content.includes('eval-layer') ||
      content.includes('4–8 seconds') ||
      content.includes('4-8s')
    const metaHasCaveat =
      Boolean(meta.mandatoryCaveatText?.includes('Tier-1')) ||
      Boolean(meta.governedMetricCaveats?.some(c => c.includes('Tier-1') || c.includes('in-memory')))
    if (!hasTier1Caveat || !metaHasCaveat) {
      throw new Error(`CRITICAL ATOMICITY VIOLATION: VM Copy <1ms metric in chunk "${chunk.id}" is missing mandatory Tier-1 in-memory evaluation caveat!`)
    }
  }

  // Check 2: EDA CAD volume error (< 10^-6 or 0.0000%)
  if (content.includes('10⁻⁶') || content.includes('10^-6') || content.includes('0.0000%')) {
    const hasCalculusCaveat =
      content.includes('software-calculus') ||
      content.includes('mathematical agreement') ||
      content.includes('not assert physical cnc') ||
      content.includes('manufacturing tolerance')
    const metaHasCaveat =
      Boolean(meta.mandatoryCaveatText?.includes('software-calculus') || meta.mandatoryCaveatText?.includes('manufacturing tolerance')) ||
      Boolean(meta.governedMetricCaveats?.some(c => c.includes('software-calculus') || c.includes('manufacturing tolerance')))
    if (!hasCalculusCaveat || !metaHasCaveat) {
      throw new Error(`CRITICAL ATOMICITY VIOLATION: EDA CAD volume error metric in chunk "${chunk.id}" is missing mandatory software-calculus vs CNC tolerance caveat!`)
    }
  }

  // Check 3: AI Worksheets teacher baseline (~2 hours vs ~3 minutes)
  if (content.includes('2 hours') && content.includes('3 minutes')) {
    const hasBaselineCaveat =
      content.includes('estimated baseline comparison') ||
      content.includes('not a controlled') ||
      content.includes('prototype generation')
    const metaHasCaveat =
      Boolean(meta.mandatoryCaveatText?.includes('baseline comparison')) ||
      Boolean(meta.governedMetricCaveats?.some(c => c.includes('baseline comparison')))
    if (!hasBaselineCaveat || !metaHasCaveat) {
      throw new Error(`CRITICAL ATOMICITY VIOLATION: AI Worksheets duration comparison in chunk "${chunk.id}" is missing mandatory estimated baseline caveat!`)
    }
  }

  // Check 4: AI Reliability 158 test cases
  if (
    content.includes('158 test') ||
    content.includes('158 backend') ||
    content.includes('158 collected') ||
    meta.source_id === 'metric-reliability-test-cases'
  ) {
    const hasTestCaseCaveat =
      content.includes('collected backend test cases') ||
      content.includes('not 158 distinct test suite files') ||
      content.includes('test cases, not test suites') ||
      content.includes('strictly distinct from the 158 pytest figure') ||
      content.includes('distinct from the 158')
    const metaHasCaveat =
      Boolean(meta.mandatoryCaveatText?.includes('test cases') || meta.mandatoryCaveatText?.includes('external repository') || meta.mandatoryCaveatText?.includes('158')) ||
      Boolean(meta.governedMetricCaveats?.some(c => c.includes('test cases') || c.includes('external repository') || c.includes('158')))
    if (!hasTestCaseCaveat || !metaHasCaveat) {
      throw new Error(`CRITICAL ATOMICITY VIOLATION: AI Reliability 158 metric in chunk "${chunk.id}" must be qualified strictly as collected test cases (not suites)!`)
    }
  }

  // Check 5: Solace AI mobile tests
  if (
    content.includes('50 mobile jest') ||
    (content.includes('50 mobile') && content.includes('jest')) ||
    meta.source_id === 'metric-solace-mobile-jest'
  ) {
    const hasMobileCaveat =
      content.includes('does not represent physical android') ||
      content.includes('react native jest') ||
      content.includes('mock environment') ||
      content.includes('distinct from the 50 jest checks')
    const metaHasCaveat =
      Boolean(meta.mandatoryCaveatText?.includes('physical Android') || meta.mandatoryCaveatText?.includes('static typecheck')) ||
      Boolean(meta.governedMetricCaveats?.some(c => c.includes('physical Android') || c.includes('static typecheck')))
    if (!hasMobileCaveat || !metaHasCaveat) {
      throw new Error(`CRITICAL ATOMICITY VIOLATION: Solace AI 50 mobile Jest metric in chunk "${chunk.id}" is missing mandatory physical hardware execution caveat!`)
    }
  }

  // Check 6: Ask Aadil test distinction
  if (content.includes('172 core hardening') || content.includes('327 total assertions')) {
    const hasDistinction =
      content.includes('distinct') ||
      content.includes('core hardening slice') ||
      content.includes('evaluation harness assertions')
    if (!hasDistinction) {
      throw new Error(`CRITICAL ATOMICITY VIOLATION: Ask Aadil test metric in chunk "${chunk.id}" must preserve distinction between 172 core hardening checks and 327 harness assertions!`)
    }
  }

  return true
}

// ============================================================================
// 3. GOVERNANCE & PUBLICATION FILTERING
// ============================================================================

export type AccessLevel = 'PUBLIC' | 'AUTHENTICATED_INTERNAL'

/**
 * Enforces the fail-closed publication and governance boundary on Knowledge Base chunks:
 * 1. Authoritative Parent Policy: Derives authorization from the canonical Case Study Manifest
 *    in canonicalRegistry.ts, not merely the child chunk's mutable visibility field.
 * 2. Proprietary case studies (CS-03, CS-06, CS-07) have publicationEligibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY'
 *    and strictly fail closed for PUBLIC access level across all child chunks (Overview, Root Cause, ADRs, Matrix).
 * 3. Restricted boundaries (CS-08 DiffGuard) have publicationEligibility === 'RESTRICTED_OR_INTERNAL_ONLY'
 *    and are strictly excluded from public chunk retrieval regardless of child visibility or metadata manipulation.
 * 4. Case studies CS-01, CS-02, CS-04, and CS-05 are eligible for PUBLIC retrieval when their manifest permits it
 *    AND their chunk-level governance is valid.
 * 5. Unknown case-study IDs fail closed.
 * 6. Missing or malformed parent governance fails closed.
 * 7. Missing, empty, malformed, or unknown chunk-level visibility strictly fails closed.
 * 8. Chunk-level restrictions may make content more restrictive (e.g. 'RESTRICTED' child chunk),
 *    but can NEVER make a proprietary or restricted parent more permissive.
 * 9. Missing or unknown case-study identity fails closed where the source category requires one
 *    (CASE_STUDY_OVERVIEW, ROOT_CAUSE, ADR, VERIFICATION_MATRIX).
 * 10. Chunks containing unverified or missing metric caveats fail closed.
 * 11. Chunks containing proprietary repository URLs fail closed.
 */
export function isChunkEligibleForPublicRetrieval(
  chunk: KnowledgeChunk,
  accessLevel: AccessLevel = 'PUBLIC'
): boolean {
  if (!chunk || !chunk.metadata) {
    return false
  }

  const meta = chunk.metadata

  // 1. Missing, empty, malformed, or unknown chunk-level visibility must fail closed
  const validVisibilities = new Set(['PUBLIC', 'PROPRIETARY', 'RESTRICTED'])
  if (!meta.visibility || typeof meta.visibility !== 'string' || !validVisibilities.has(meta.visibility)) {
    return false
  }

  // 2. Missing or unknown case-study identity fails closed where the source category requires one
  const caseStudyCategories = new Set([
    'CASE_STUDY_OVERVIEW',
    'ROOT_CAUSE',
    'ADR',
    'VERIFICATION_MATRIX'
  ])
  if (meta.knowledgeCategory && caseStudyCategories.has(meta.knowledgeCategory)) {
    if (!meta.caseStudyId || typeof meta.caseStudyId !== 'string') {
      return false
    }
  }

  // 3. Parent-level governance enforcement via authoritative canonical manifest
  if (meta.caseStudyId) {
    const parentManifest = getCaseStudyManifest(meta.caseStudyId as CaseStudyId)
    // Unknown case study ID fails closed
    if (!parentManifest) {
      return false
    }

    const parentEligibility = parentManifest.publicationEligibility
    // Missing or malformed parent governance fails closed
    if (!parentEligibility) {
      return false
    }

    // CS-08 or any RESTRICTED_OR_INTERNAL_ONLY parent is strictly excluded from public retrieval
    if (parentEligibility === 'RESTRICTED_OR_INTERNAL_ONLY') {
      return false
    }

    // CS-03, CS-06, CS-07 or any EMPLOYER_PROPRIETARY_CASE_STUDY parent is strictly excluded from public retrieval
    if (parentEligibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY') {
      if (accessLevel === 'PUBLIC') {
        return false
      }
    } else if (
      parentEligibility !== 'PUBLIC_PORTFOLIO_INTERFACE' &&
      parentEligibility !== 'PUBLIC_OPEN_SOURCE'
    ) {
      // Unknown or unapproved parent publication eligibility fails closed
      return false
    }
  }

  // 4. Source ID check for CS-08 boundary
  if (meta.source_id && meta.source_id.toLowerCase().includes('cs-08')) {
    if (accessLevel === 'PUBLIC') {
      return false
    }
  }

  // 5. Chunk-level restrictions: can make content MORE restrictive, never MORE permissive
  if (meta.visibility === 'RESTRICTED') {
    return false
  }
  if (meta.visibility === 'PROPRIETARY' && accessLevel === 'PUBLIC') {
    return false
  }

  // 6. Metric atomicity verification: fails closed if mandatory caveats are missing or stripped
  try {
    validateMetricCaveatBinding(chunk)
  } catch {
    return false
  }

  // 7. Confidentiality: No proprietary repository URLs in public chunks
  if (
    chunk.content.includes('github.com/wayground') ||
    chunk.content.includes('github.com/quizizz') ||
    (meta.source_url && (meta.source_url.includes('github.com/wayground') || meta.source_url.includes('github.com/quizizz')))
  ) {
    return false
  }

  return true
}

/**
 * Validates that an evidence item is authorized for public retrieval.
 * Proprietary and restricted case studies cannot emit evidence items into public responses.
 */
export function isEvidenceItemEligibleForPublicRetrieval(
  item: EvidenceItem,
  accessLevel: AccessLevel = 'PUBLIC'
): boolean {
  if (accessLevel === 'AUTHENTICATED_INTERNAL') {
    return true
  }

  // Confidentiality: No proprietary corporate URLs in public evidence
  if (
    item.content.includes('github.com/wayground') ||
    item.content.includes('github.com/quizizz') ||
    (item.deepLink && (item.deepLink.includes('github.com/wayground') || item.deepLink.includes('github.com/quizizz')))
  ) {
    return false
  }

  if (item.caseStudyId) {
    const manifest = getCaseStudyManifest(item.caseStudyId as CaseStudyId)
    if (!manifest) {
      // Unknown case study ID fails closed
      return false
    }
    if (manifest.publicationEligibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY') {
      return false
    }
    if (manifest.publicationEligibility === 'RESTRICTED_OR_INTERNAL_ONLY') {
      // For CS-08, only the explicit external boundary directive is permitted; technical chunks are blocked
      if (manifest.caseStudyId === 'CS-08' && item.id === 'evidence-kb-cs-08-boundary') {
        return true
      }
      return false
    }
    if (
      manifest.publicationEligibility !== 'PUBLIC_PORTFOLIO_INTERFACE' &&
      manifest.publicationEligibility !== 'PUBLIC_OPEN_SOURCE'
    ) {
      return false
    }
  }

  return true
}

// ============================================================================
// 4. KNOWLEDGE BASE DOCUMENT LOADER & PARSER
// ============================================================================

export function readKnowledgeBaseRawMarkdown(): string {
  if (typeof window !== 'undefined') {
    throw new Error('readKnowledgeBaseRawMarkdown is an offline/build operation not available in the browser runtime.')
  }

  try {
    const fs = (eval('require'))('fs')
    const path = (eval('require'))('path')
    const possiblePaths = [
      path.join(process.cwd(), KB_SOURCE_DOCUMENT),
      path.join(process.cwd(), 'research', 'engineering', 'ENGINEERING_EXPERIENCE_KNOWLEDGE_BASE_DRAFT.md')
    ]

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        return fs.readFileSync(p, 'utf8')
      }
    }

    throw new Error(`Knowledge Base Markdown document not found at: ${possiblePaths.join(' or ')}`)
  } catch (err: any) {
    throw new Error(`Failed to read Knowledge Base Markdown: ${err?.message || String(err)}`)
  }
}

/**
 * Builds all typed, content-hashed KnowledgeChunk records from the authoritative
 * Engineering Experience Knowledge Base document.
 */
export function buildKnowledgeBaseChunks(): KnowledgeChunk[] {
  const rawText = readKnowledgeBaseRawMarkdown()
  const chunks: KnowledgeChunk[] = []

  // ---------------------------------------------------------------------------
  // A. SECTION 4: TIMELINE SPINE
  // ---------------------------------------------------------------------------
  const s4Match = rawText.match(/## 4\. Engineering Experience Timeline[\s\S]*?(?=\n---|\n## 5)/)
  if (s4Match) {
    const s4Content = `ENGINEERING KNOWLEDGE BASE // TIMELINE SPINE (SECTION 4)
Source: ${KB_SOURCE_DOCUMENT}#timeline-spine
Classification: Primary Chronological Reference

${s4Match[0].trim()}`

    const hash = computeContentHash(s4Content)
    chunks.push({
      id: 'chunk-kb-timeline-spine',
      content: s4Content,
      metadata: {
        source_type: 'knowledge_base',
        source_id: 'timeline-spine',
        source_title: 'Engineering Knowledge Base // Timeline Spine',
        source_url: `/${KB_SOURCE_DOCUMENT}#timeline-spine`,
        portfolio_layer: 'canonical',
        content_type: 'experience',
        authority_type: 'primary',
        last_verified: KB_LAST_VERIFIED,
        knowledgeCategory: 'TIMELINE_SPINE',
        evidenceStatus: 'SOURCE_VERIFIED',
        epistemicConfidence: 'HIGH',
        executionLocality: 'LOCAL_WORKSPACE_EXECUTED',
        visibility: 'PUBLIC',
        contentAnchor: 'timeline-spine',
        contentHash: hash,
        indexVersion: RAG_INDEX_VERSION
      }
    })
  }

  // ---------------------------------------------------------------------------
  // B. SECTION 6: INDIVIDUAL CASE STUDIES (CS-01 TO CS-08)
  // ---------------------------------------------------------------------------
  const csRegex = /<a id="(cs-0[1-8])"><\/a>\s*\n### Case Study (CS-0[1-8]): ([^\n]+)/g
  const caseStudies: Array<{ anchor: string; id: CaseStudyId; title: string; index: number }> = []
  let csMatch: RegExpExecArray | null

  while ((csMatch = csRegex.exec(rawText)) !== null) {
    caseStudies.push({
      anchor: csMatch[1],
      id: csMatch[2] as CaseStudyId,
      title: csMatch[3].trim(),
      index: csMatch.index
    })
  }

  for (let i = 0; i < caseStudies.length; i++) {
    const cs = caseStudies[i]
    const nextCs = caseStudies[i + 1]
    const csEndIndex = nextCs
      ? nextCs.index
      : rawText.indexOf('## 7. Cross-Project Engineering Patterns')
    const csSectionText = rawText.slice(cs.index, csEndIndex).trim()

    const manifest = getCaseStudyManifest(cs.id)
    if (!manifest) {
      throw new Error(`Invariant failure: Manifest for case study ${cs.id} not found in canonical registry!`)
    }

    const visibility: 'PUBLIC' | 'PROPRIETARY' | 'RESTRICTED' =
      manifest.publicationEligibility === 'PUBLIC_PORTFOLIO_INTERFACE' ||
      manifest.publicationEligibility === 'PUBLIC_OPEN_SOURCE'
        ? 'PUBLIC'
        : manifest.publicationEligibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY'
        ? 'PROPRIETARY'
        : 'RESTRICTED'

    const mappedChapters = manifest.mappedJournalChapters.map(m => m.chapterId)

    // Handle CS-08 Boundary Case Study
    if (cs.id === 'CS-08') {
      const boundaryContent = `CASE STUDY CS-08 // DIFFGUARD: EXTERNAL REPOSITORY & EVIDENCE BOUNDARY
Case Study ID: CS-08
Anchor: #${cs.anchor}
Governance Status: SEPARATE_REPOSITORY — TECHNICAL CASE STUDY DEFERRED
Publication Eligibility: RESTRICTED_OR_INTERNAL_ONLY
Boundary Directive: DiffGuard is a separate external repository, not authored, hosted, or inspected in this Portfolio workspace.

${csSectionText}`

      const boundaryHash = computeContentHash(boundaryContent)
      chunks.push({
        id: 'chunk-kb-cs-08-boundary',
        content: boundaryContent,
        metadata: {
          source_type: 'knowledge_base',
          source_id: 'cs-08-boundary',
          source_title: `Case Study CS-08 // DiffGuard Boundary`,
          source_url: `/${KB_SOURCE_DOCUMENT}#${cs.anchor}`,
          portfolio_layer: 'canonical',
          caseStudyId: 'CS-08',
          content_type: 'architecture',
          authority_type: 'primary',
          last_verified: KB_LAST_VERIFIED,
          knowledgeCategory: 'CASE_STUDY_OVERVIEW',
          evidenceStatus: 'UNVERIFIED',
          epistemicConfidence: 'HIGH',
          executionLocality: 'EXTERNAL_REPOSITORY',
          canonicalProjectIds: [],
          canonicalCareerIds: [],
          canonicalClaimIds: manifest.canonicalClaimIds,
          canonicalEvidenceIds: manifest.canonicalEvidenceIds,
          visibility: 'RESTRICTED',
          contentAnchor: cs.anchor,
          mappedJournalChapters: [],
          contentHash: boundaryHash,
          indexVersion: RAG_INDEX_VERSION
        }
      })
      continue
    }

    // Extract subsections for CS-01 through CS-07
    // Subsections: Context (1), Problem (2), Symptoms (3), Investigation (4), Root Cause (5), ADRs (6), Implementation (7), Verification (8), Outcome (9), Lessons (10), Claims (11)

    // 1. Overview Chunk: Context, Problem, Symptoms, Investigation
    const overviewMatch = csSectionText.match(/#### 1\. Context[\s\S]*?(?=#### 5\. Root Cause)/)
    if (overviewMatch) {
      const overviewText = `CASE STUDY ${cs.id} OVERVIEW // ${cs.title}
Case Study ID: ${cs.id} (Project: ${manifest.slug})
Anchor: #${cs.anchor}
Publication Eligibility: ${manifest.publicationEligibility}
Associated Career: ${manifest.associatedCareerId || 'Independent'}
Mapped Journal Chapters: ${mappedChapters.join(', ') || 'None'}

${overviewMatch[0].trim()}`

      const overviewHash = computeContentHash(overviewText)
      chunks.push({
        id: `chunk-kb-${cs.anchor}-overview`,
        content: overviewText,
        metadata: {
          source_type: 'knowledge_base',
          source_id: `${cs.anchor}-overview`,
          source_title: `Case Study ${cs.id} Overview // ${manifest.slug}`,
          source_url: `/${KB_SOURCE_DOCUMENT}#${cs.anchor}`,
          portfolio_layer: 'canonical',
          project: manifest.slug,
          caseStudyId: cs.id,
          content_type: 'architecture',
          authority_type: 'primary',
          last_verified: KB_LAST_VERIFIED,
          knowledgeCategory: 'CASE_STUDY_OVERVIEW',
          evidenceStatus: 'SOURCE_VERIFIED',
          epistemicConfidence: 'HIGH',
          executionLocality: cs.id === 'CS-01' ? 'LOCAL_WORKSPACE_EXECUTED' : 'UNEXECUTED_IN_THIS_REPO',
          canonicalProjectIds: manifest.projectId ? [manifest.projectId] : [],
          canonicalCareerIds: manifest.associatedCareerId ? [manifest.associatedCareerId] : [],
          canonicalClaimIds: [...manifest.canonicalClaimIds],
          canonicalEvidenceIds: [...manifest.canonicalEvidenceIds],
          visibility,
          contentAnchor: cs.anchor,
          mappedJournalChapters: mappedChapters,
          contentHash: overviewHash,
          indexVersion: RAG_INDEX_VERSION
        }
      })
    }

    // 2. Diagnostic Root Cause & Incident Reconstruction Chunk
    const rootCauseMatch = csSectionText.match(/#### 5\. Root Cause[\s\S]*?(?=#### 6\. Engineering Decisions)/)
    const symptomsMatch = csSectionText.match(/#### 3\. Observable Symptoms[\s\S]*?(?=#### 4\. Investigation)/)
    const outcomeMatch = csSectionText.match(/#### 9\. Outcome[\s\S]*?(?=#### 10|#### 11|---|$)/)

    if (rootCauseMatch) {
      const diagText = `CASE STUDY ${cs.id} DIAGNOSTIC INCIDENT & ROOT CAUSE // ${manifest.slug}
Case Study ID: ${cs.id}
Anchor: #${cs.anchor}
Publication Eligibility: ${manifest.publicationEligibility}

${symptomsMatch ? symptomsMatch[0].trim() + '\n\n' : ''}${rootCauseMatch[0].trim()}${outcomeMatch ? '\n\n' + outcomeMatch[0].trim() : ''}`

      const diagHash = computeContentHash(diagText)
      chunks.push({
        id: `chunk-kb-${cs.anchor}-root-cause`,
        content: diagText,
        metadata: {
          source_type: 'knowledge_base',
          source_id: `${cs.anchor}-root-cause`,
          source_title: `Case Study ${cs.id} Root Cause // ${manifest.slug}`,
          source_url: `/${KB_SOURCE_DOCUMENT}#${cs.anchor}`,
          portfolio_layer: 'canonical',
          project: manifest.slug,
          caseStudyId: cs.id,
          content_type: 'narrative',
          authority_type: 'primary',
          last_verified: KB_LAST_VERIFIED,
          knowledgeCategory: 'ROOT_CAUSE',
          evidenceStatus: 'SOURCE_VERIFIED',
          epistemicConfidence: 'HIGH',
          executionLocality: cs.id === 'CS-01' ? 'LOCAL_WORKSPACE_EXECUTED' : 'UNEXECUTED_IN_THIS_REPO',
          canonicalProjectIds: manifest.projectId ? [manifest.projectId] : [],
          canonicalCareerIds: manifest.associatedCareerId ? [manifest.associatedCareerId] : [],
          canonicalClaimIds: [...manifest.canonicalClaimIds],
          canonicalEvidenceIds: [...manifest.canonicalEvidenceIds],
          visibility,
          contentAnchor: cs.anchor,
          mappedJournalChapters: mappedChapters,
          contentHash: diagHash,
          indexVersion: RAG_INDEX_VERSION
        }
      })
    }

    // 3. ADR Chunks (One chunk per Architectural Decision Record)
    for (const adrRef of manifest.adrReferences) {
      const adrRegexLocal = new RegExp(
        `<a id="${adrRef.contentAnchor}"><\\/a>\\s*\\*\\*${adrRef.adrId}[^:]*:\\*\\*([\\s\\S]*?)(?=- <a id="adr-|#### 7\\.|#### 8\\.|---)`,
        'm'
      )
      const adrMatch = csSectionText.match(adrRegexLocal)
      const adrBody = adrMatch ? adrMatch[1].trim() : ''

      // Extract bound mandatory caveats
      const boundCaveats: string[] = []
      let mandatoryCaveatText: string | undefined

      if (adrRef.adrId === 'ADR-VM-01') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['vm-latency'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (adrRef.adrId === 'ADR-VM-02') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['vm-batching'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (adrRef.adrId === 'ADR-EDA-01' || adrRef.adrId === 'ADR-EDA-02') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['eda-volume-error'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (adrRef.adrId === 'ADR-REL-01') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['reliability-test-cases'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (adrRef.adrId === 'ADR-REL-02') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['reliability-governance-checks'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (adrRef.adrId === 'ADR-SOLACE-01' || adrRef.adrId === 'ADR-SOLACE-02') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['solace-mobile-jest'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (adrRef.adrId === 'ADR-ETL-01' || adrRef.adrId === 'ADR-ETL-03') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['etl-integrity-gates'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (adrRef.adrId === 'ADR-IB-03') {
        mandatoryCaveatText =
          'Min/Max Swap stratified sampling heuristic is a documented optimization; measured distribution variance reduction is unverified locally.'
        boundCaveats.push(mandatoryCaveatText)
      }

      const adrContent = `ARCHITECTURAL DECISION RECORD // ${adrRef.adrId}: ${adrRef.title}
Case Study: ${cs.id} (${manifest.title})
Project ID: ${manifest.projectId || 'None'} (Slug: ${manifest.slug})
Status: ${adrRef.status}
Anchor: #${adrRef.contentAnchor}
Publication Eligibility: ${manifest.publicationEligibility}

Decision & Technical Details:
${adrBody}
${boundCaveats.length > 0 ? `\nMANDATORY GOVERNANCE CAVEATS:\n${boundCaveats.map(c => `• ${c}`).join('\n')}` : ''}`

      const adrHash = computeContentHash(adrContent)
      const chunk: KnowledgeChunk = {
        id: `chunk-kb-${adrRef.contentAnchor}`,
        content: adrContent,
        metadata: {
          source_type: 'knowledge_base',
          source_id: adrRef.contentAnchor,
          source_title: `ADR // ${adrRef.adrId}: ${adrRef.title}`,
          source_url: `/${KB_SOURCE_DOCUMENT}#${adrRef.contentAnchor}`,
          portfolio_layer: 'canonical',
          project: manifest.slug,
          caseStudyId: cs.id,
          adrId: adrRef.adrId,
          content_type: 'architecture',
          authority_type: 'primary',
          last_verified: KB_LAST_VERIFIED,
          knowledgeCategory: 'ADR',
          evidenceStatus: 'SOURCE_VERIFIED',
          epistemicConfidence: 'HIGH',
          executionLocality: cs.id === 'CS-01' ? 'LOCAL_WORKSPACE_EXECUTED' : 'UNEXECUTED_IN_THIS_REPO',
          canonicalProjectIds: manifest.projectId ? [manifest.projectId] : [],
          canonicalCareerIds: manifest.associatedCareerId ? [manifest.associatedCareerId] : [],
          canonicalClaimIds: [...manifest.canonicalClaimIds],
          canonicalEvidenceIds: [...manifest.canonicalEvidenceIds],
          governedMetricCaveats: boundCaveats.length > 0 ? boundCaveats : undefined,
          mandatoryCaveatText,
          visibility,
          contentAnchor: adrRef.contentAnchor,
          mappedJournalChapters: mappedChapters,
          contentHash: adrHash,
          indexVersion: RAG_INDEX_VERSION
        }
      }

      validateMetricCaveatBinding(chunk)
      chunks.push(chunk)
    }

    // 4. Claim & Verification Matrix Chunk
    const claimMatrixMatch = csSectionText.match(/#### \d+\.\s*Claim-to-Evidence Matrix[\s\S]*$/m)
    if (claimMatrixMatch) {
      const matrixContent = `CLAIM-TO-EVIDENCE VERIFICATION MATRIX // CASE STUDY ${cs.id} (${manifest.slug})
Case Study ID: ${cs.id}
Anchor: #${cs.anchor}
Publication Eligibility: ${manifest.publicationEligibility}

${claimMatrixMatch[0].trim()}`

      const matrixHash = computeContentHash(matrixContent)
      chunks.push({
        id: `chunk-kb-${cs.anchor}-claims`,
        content: matrixContent,
        metadata: {
          source_type: 'knowledge_base',
          source_id: `${cs.anchor}-claims`,
          source_title: `Case Study ${cs.id} Claims Matrix // ${manifest.slug}`,
          source_url: `/${KB_SOURCE_DOCUMENT}#${cs.anchor}`,
          portfolio_layer: 'canonical',
          project: manifest.slug,
          caseStudyId: cs.id,
          content_type: 'spec',
          authority_type: 'primary',
          last_verified: KB_LAST_VERIFIED,
          knowledgeCategory: 'VERIFICATION_MATRIX',
          evidenceStatus: 'SOURCE_VERIFIED',
          epistemicConfidence: 'HIGH',
          executionLocality: cs.id === 'CS-01' ? 'LOCAL_WORKSPACE_EXECUTED' : 'UNEXECUTED_IN_THIS_REPO',
          canonicalProjectIds: manifest.projectId ? [manifest.projectId] : [],
          canonicalCareerIds: manifest.associatedCareerId ? [manifest.associatedCareerId] : [],
          canonicalClaimIds: [...manifest.canonicalClaimIds],
          canonicalEvidenceIds: [...manifest.canonicalEvidenceIds],
          visibility,
          contentAnchor: cs.anchor,
          mappedJournalChapters: mappedChapters,
          contentHash: matrixHash,
          indexVersion: RAG_INDEX_VERSION
        }
      })
    }
  }

  // ---------------------------------------------------------------------------
  // C. SECTION 7: CROSS-PROJECT ENGINEERING PATTERNS (PATTERNS 1 TO 8)
  // ---------------------------------------------------------------------------
  const s7Match = rawText.match(/## 7\. Cross-Project Engineering Patterns[\s\S]*?(?=\n---|\n## 8)/)
  if (s7Match) {
    const s7Text = s7Match[0]
    const patternRegex = /\n([1-8])\.\s+\*\*([^*]+)\:\*\*\s+([\s\S]*?)(?=\n[1-8]\.\s+\*\*|\n---|\n##|$)/g
    let pMatch: RegExpExecArray | null

    while ((pMatch = patternRegex.exec(s7Text)) !== null) {
      const num = pMatch[1]
      const title = pMatch[2].trim()
      const desc = pMatch[3].trim()

      const boundCaveats: string[] = []
      let mandatoryCaveatText: string | undefined

      if (num === '1') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['vm-latency'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (num === '7') {
        mandatoryCaveatText = MANDATORY_METRIC_CAVEATS['vm-batching'].mandatoryCaveat
        boundCaveats.push(mandatoryCaveatText)
      } else if (num === '3') {
        mandatoryCaveatText =
          'Safe abstention parameter bounds (e.g. Fisher covariance in AI Reliability) represent a documented mathematical design, not a locally verified runtime execution in this workspace.'
        boundCaveats.push(mandatoryCaveatText)
      }

      const pContent = `CROSS-PROJECT ENGINEERING PATTERN 0${num} // ${title}
Pattern ID: PATTERN-0${num}
Category: Recurring Architectural Principle
Source: ${KB_SOURCE_DOCUMENT}#cross-project-patterns

Description & Engineering Implementations:
${desc}
${boundCaveats.length > 0 ? `\nMANDATORY GOVERNANCE CAVEATS:\n${boundCaveats.map(c => `• ${c}`).join('\n')}` : ''}`

      const pHash = computeContentHash(pContent)
      const chunk: KnowledgeChunk = {
        id: `chunk-kb-pattern-0${num}`,
        content: pContent,
        metadata: {
          source_type: 'knowledge_base',
          source_id: `pattern-0${num}`,
          source_title: `Engineering Pattern 0${num} // ${title}`,
          source_url: `/${KB_SOURCE_DOCUMENT}#cross-project-patterns`,
          portfolio_layer: 'canonical',
          content_type: 'principle',
          authority_type: 'primary',
          last_verified: KB_LAST_VERIFIED,
          knowledgeCategory: 'CROSS_PROJECT_PATTERN',
          evidenceStatus: 'SOURCE_VERIFIED',
          epistemicConfidence: 'HIGH',
          executionLocality: 'LOCAL_WORKSPACE_EXECUTED',
          governedMetricCaveats: boundCaveats.length > 0 ? boundCaveats : undefined,
          mandatoryCaveatText,
          visibility: 'PUBLIC',
          contentAnchor: 'cross-project-patterns',
          contentHash: pHash,
          indexVersion: RAG_INDEX_VERSION
        }
      }

      validateMetricCaveatBinding(chunk)
      chunks.push(chunk)
    }
  }

  // ---------------------------------------------------------------------------
  // D. SECTION 8: ATOMIC DOCUMENTED METRICS CHUNKS
  // ---------------------------------------------------------------------------
  for (const [key, metricDef] of Object.entries(MANDATORY_METRIC_CAVEATS)) {
    const metricContent = `DOCUMENTED QUANTITATIVE METRIC // ${metricDef.headline}
Metric ID: ${metricDef.metricId}
Documented Value: ${metricDef.documentedValue}
Project ID: ${metricDef.projectId || 'General Portfolio'}
Claim Reference: ${metricDef.claimId || 'N/A'}
Evidence Reference: ${metricDef.evidenceId || 'N/A'}
Measurement Scope: ${metricDef.measurementScope}
Verification Status: ${metricDef.verificationStatus}
Epistemic Confidence: ${metricDef.epistemicConfidence}
Execution Locality: ${metricDef.executionLocality}

MANDATORY QUALIFICATION CAVEAT:
${metricDef.mandatoryCaveat}

Detailed Qualifications & Disclosed Limitations:
${metricDef.detailedQualifications.map(q => `• ${q}`).join('\n')}`

    const metricHash = computeContentHash(metricContent)
    const isProprietaryProject =
      metricDef.projectId === 'proj-vm-copy' ||
      metricDef.projectId === 'proj-ai-worksheets' ||
      metricDef.projectId === 'proj-curriculum-etl'

    const chunk: KnowledgeChunk = {
      id: `chunk-kb-metric-${key}`,
      content: metricContent,
      metadata: {
        source_type: 'knowledge_base',
        source_id: `metric-${key}`,
        source_title: `Verified Metric // ${metricDef.headline}`,
        source_url: `/${KB_SOURCE_DOCUMENT}#documented-metrics`,
        portfolio_layer: 'canonical',
        project: metricDef.projectId?.replace('proj-', ''),
        content_type: 'quantitative_claim',
        authority_type: 'primary',
        last_verified: KB_LAST_VERIFIED,
        knowledgeCategory: 'DOCUMENTED_METRIC',
        evidenceStatus: metricDef.verificationStatus,
        epistemicConfidence: metricDef.epistemicConfidence,
        executionLocality: metricDef.executionLocality,
        canonicalProjectIds: metricDef.projectId ? [metricDef.projectId] : [],
        canonicalClaimIds: metricDef.claimId ? [metricDef.claimId] : [],
        canonicalEvidenceIds: metricDef.evidenceId ? [metricDef.evidenceId] : [],
        governedMetricCaveats: [metricDef.mandatoryCaveat, ...metricDef.detailedQualifications],
        mandatoryCaveatText: metricDef.mandatoryCaveat,
        visibility: isProprietaryProject ? 'PROPRIETARY' : 'PUBLIC',
        contentAnchor: 'documented-metrics',
        quantitativeData: {
          metricValue: metricDef.documentedValue,
          claim: metricDef.headline,
          evidenceSource: metricDef.evidenceId,
          verificationDetails: metricDef.mandatoryCaveat
        },
        contentHash: metricHash,
        indexVersion: RAG_INDEX_VERSION
      }
    }

    validateMetricCaveatBinding(chunk)
    chunks.push(chunk)
  }

  return chunks
}

// ============================================================================
// 5. STRUCTURED KNOWLEDGE BASE RETRIEVAL ENGINE (PURE DETERMINISTIC)
// ============================================================================

export interface KnowledgeBaseStructuredResult {
  matched: boolean
  topic: string
  exactAnswer?: string
  evidence: EvidenceItem[]
}

/**
 * Pure deterministic resolver for Case Studies, ADRs, Incident Diagnostics, and
 * Atomic Governed Metrics.
 * Enforces fail-closed caveat binding: no metric is ever emitted without its qualification.
 */
export function queryKnowledgeBaseStructured(
  query: string,
  projectSlug?: string,
  accessLevel: AccessLevel = 'PUBLIC'
): KnowledgeBaseStructuredResult {
  const lowerQ = query.toLowerCase().trim()
  const evidence: EvidenceItem[] = []

  // 1. Exact Case Study ID Queries (e.g. CS-01, CS-03, CS-08)
  const csMatch = lowerQ.match(/\b(cs-0[1-8])\b/i) || lowerQ.match(/\bcase\s+study\s+(0?[1-8]|cs-0[1-8])\b/i)
  if (csMatch) {
    let normalizedId = csMatch[1].toUpperCase()
    if (!normalizedId.startsWith('CS-')) {
      const num = normalizedId.replace(/^0/, '')
      normalizedId = `CS-0${num}`
    }

    const manifest = getCaseStudyManifest(normalizedId as CaseStudyId)
    if (manifest) {
      // Parent publication governance: Employer-proprietary case studies must never emit exact answers or evidence to public queries
      if (manifest.publicationEligibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY' && accessLevel === 'PUBLIC') {
        return {
          matched: false,
          topic: 'unmatched',
          evidence: []
        }
      }

      if (manifest.caseStudyId === 'CS-08') {
        evidence.push({
          id: 'evidence-kb-cs-08-boundary',
          source: 'Knowledge Base // CS-08 DiffGuard Boundary',
          sourceType: 'knowledge_base',
          authority: 'primary',
          layer: 'canonical',
          entity: 'DiffGuard Boundary',
          caseStudyId: 'CS-08',
          contentAnchor: 'cs-08',
          content: `CASE STUDY CS-08 // DIFFGUARD:
• Governance Status: SEPARATE_REPOSITORY — TECHNICAL CASE STUDY DEFERRED.
• Repository Boundary: DiffGuard is a separate external repository, not authored, hosted, or inspected in this Portfolio workspace.
• Zero incidents, symptoms, root causes, or test suites have been fabricated from Portfolio references.
• Any technical deep-dive requires independent access to DiffGuard's dedicated source repository.`,
          deepLink: `/${KB_SOURCE_DOCUMENT}#cs-08`,
          provenanceBadge: '[KB // CS-08 External Boundary]'
        })

        return {
          matched: true,
          topic: 'cs_08_external_boundary',
          exactAnswer:
            'DiffGuard is governed strictly as an external repository boundary (SEPARATE_REPOSITORY — TECHNICAL CASE STUDY DEFERRED). It is a separate project with its own external repository and is not hosted or inspected within this Portfolio workspace. Technical incident reconstructions are deferred to an independent assessment of DiffGuard’s own repository to prevent fabricating unevidenced details.',
          evidence
        }
      }

      if (
        manifest.publicationEligibility === 'PUBLIC_PORTFOLIO_INTERFACE' ||
        manifest.publicationEligibility === 'PUBLIC_OPEN_SOURCE' ||
        accessLevel === 'AUTHENTICATED_INTERNAL'
      ) {
        evidence.push({
          id: `evidence-kb-${manifest.contentAnchor}`,
          source: `Knowledge Base // ${manifest.caseStudyId}: ${manifest.title}`,
          sourceType: 'knowledge_base',
          authority: 'primary',
          layer: 'canonical',
          entity: manifest.slug,
          caseStudyId: manifest.caseStudyId,
          contentAnchor: manifest.contentAnchor,
          content: `CASE STUDY ${manifest.caseStudyId} // ${manifest.title}
• Project Slug: ${manifest.slug} (ID: ${manifest.projectId || 'N/A'})
• Associated Career: ${manifest.associatedCareerId || 'Independent'}
• Publication Eligibility: ${manifest.publicationEligibility}
• ADRs: ${manifest.adrReferences.map(a => `${a.adrId} (${a.title})`).join(', ')}
• Canonical Claims: ${manifest.canonicalClaimIds.join(', ')}
• Canonical Evidence: ${manifest.canonicalEvidenceIds.join(', ')}`,
          deepLink: `/${KB_SOURCE_DOCUMENT}#${manifest.contentAnchor}`,
          provenanceBadge: `[KB // ${manifest.caseStudyId}]`
        })

        return {
          matched: true,
          topic: `case_study_${manifest.caseStudyId.toLowerCase()}`,
          exactAnswer: `Case Study ${manifest.caseStudyId} covers ${manifest.title}. It encompasses ${manifest.adrReferences.length} architectural decisions (${manifest.adrReferences.map(a => a.adrId).join(', ')}) under publication governance ${manifest.publicationEligibility}.`,
          evidence
        }
      }

      return {
        matched: false,
        topic: 'unmatched',
        evidence: []
      }
    }
  }

  // 2. Exact ADR ID Queries (e.g. ADR-VOICE-01, ADR-VM-01, ADR-EDA-02)
  const adrMatch = lowerQ.match(/\b(adr-[a-z]+-0[1-4])\b/i)
  if (adrMatch) {
    const adrId = adrMatch[1].toUpperCase() as AdrId
    const adrManifest = getAdrManifest(adrId)
    if (adrManifest) {
      const parentCs = canonicalCaseStudyReferences.find(cs =>
        cs.adrReferences.some(a => a.adrId === adrId)
      )

      // Parent publication governance: ADRs belonging to proprietary or restricted case studies must never be emitted to public queries
      if (
        parentCs &&
        (parentCs.publicationEligibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY' ||
          parentCs.publicationEligibility === 'RESTRICTED_OR_INTERNAL_ONLY') &&
        accessLevel === 'PUBLIC'
      ) {
        return {
          matched: false,
          topic: 'unmatched',
          evidence: []
        }
      }

      if (
        !parentCs ||
        (parentCs.publicationEligibility !== 'PUBLIC_PORTFOLIO_INTERFACE' &&
          parentCs.publicationEligibility !== 'PUBLIC_OPEN_SOURCE' &&
          accessLevel === 'PUBLIC')
      ) {
        return {
          matched: false,
          topic: 'unmatched',
          evidence: []
        }
      }

      let caveatText: string | undefined
      if (adrId === 'ADR-VM-01') caveatText = MANDATORY_METRIC_CAVEATS['vm-latency'].mandatoryCaveat
      if (adrId === 'ADR-VM-02') caveatText = MANDATORY_METRIC_CAVEATS['vm-batching'].mandatoryCaveat
      if (adrId === 'ADR-EDA-01' || adrId === 'ADR-EDA-02') caveatText = MANDATORY_METRIC_CAVEATS['eda-volume-error'].mandatoryCaveat

      evidence.push({
        id: `evidence-kb-adr-${adrManifest.contentAnchor}`,
        source: `Knowledge Base // ${adrManifest.adrId}: ${adrManifest.title}`,
        sourceType: 'knowledge_base',
        authority: 'primary',
        layer: 'canonical',
        entity: parentCs?.slug || 'ADR',
        caseStudyId: parentCs?.caseStudyId,
        adrId: adrManifest.adrId,
        contentAnchor: adrManifest.contentAnchor,
        mandatoryCaveatText: caveatText,
        governedMetricCaveats: caveatText ? [caveatText] : undefined,
        content: `ARCHITECTURAL DECISION RECORD // ${adrManifest.adrId}: ${adrManifest.title}
• Case Study: ${parentCs?.caseStudyId} (${parentCs?.title})
• Status: ${adrManifest.status}
• Content Anchor: #${adrManifest.contentAnchor}
${caveatText ? `• Mandatory Caveat: ${caveatText}\n` : ''}`,
        deepLink: `/${KB_SOURCE_DOCUMENT}#${adrManifest.contentAnchor}`,
        provenanceBadge: `[KB // ${adrManifest.adrId}]`
      })

      return {
        matched: true,
        topic: `adr_${adrId.toLowerCase()}`,
        exactAnswer: `${adrManifest.adrId} (${adrManifest.title}) is an accepted architectural decision in ${parentCs?.caseStudyId} (${parentCs?.slug}).${caveatText ? ` Note: ${caveatText}` : ''}`,
        evidence
      }
    }
  }

  // 3. Governed Metric: VM Copy Latency & Spend
  if (
    lowerQ.includes('vm copy') &&
    (lowerQ.includes('latency') || lowerQ.includes('<1ms') || lowerQ.includes('1ms') || lowerQ.includes('spend') || lowerQ.includes('$0') || lowerQ.includes('cost'))
  ) {
    const def = MANDATORY_METRIC_CAVEATS['vm-latency']
    evidence.push({
      id: 'evidence-kb-vm-latency',
      source: 'Knowledge Base // Section 8 Metrics',
      sourceType: 'knowledge_base',
      authority: 'primary',
      layer: 'canonical',
      entity: 'vm-copy',
      mandatoryCaveatText: def.mandatoryCaveat,
      governedMetricCaveats: [def.mandatoryCaveat, ...def.detailedQualifications],
      content: `DOCUMENTED METRIC // ${def.headline}:
• Value: ${def.documentedValue}
• Mandatory Caveat: ${def.mandatoryCaveat}
• Scope: ${def.measurementScope} (${def.verificationStatus})`,
      deepLink: `/${KB_SOURCE_DOCUMENT}#documented-metrics`,
      provenanceBadge: '[KB Metric // VM Copy Latency]'
    })

    return {
      matched: true,
      topic: 'vm_copy_latency_metric',
      exactAnswer: `VM Copy’s reported <1ms execution time and $0 marginal API spend apply strictly to its Tier-1 in-memory regex and AST deterministic evaluation gate (lib/eval-layer.ts). Upstream generative LLM inference takes ~4–8 seconds (historical observation) and incurs external model API costs. The <1ms figure does not describe end-to-end generation latency.`,
      evidence
    }
  }

  // 4. Governed Metric: EDA CAD Volume Error
  if (
    (lowerQ.includes('eda') || lowerQ.includes('cad')) &&
    (lowerQ.includes('volume') || lowerQ.includes('0.0000') || lowerQ.includes('10^-6') || lowerQ.includes('10⁻⁶') || lowerQ.includes('error'))
  ) {
    const def = MANDATORY_METRIC_CAVEATS['eda-volume-error']
    evidence.push({
      id: 'evidence-kb-eda-volume',
      source: 'Knowledge Base // Section 8 Metrics',
      sourceType: 'knowledge_base',
      authority: 'primary',
      layer: 'canonical',
      entity: 'design-automation',
      caseStudyId: 'CS-02',
      adrId: 'ADR-EDA-01',
      mandatoryCaveatText: def.mandatoryCaveat,
      governedMetricCaveats: [def.mandatoryCaveat, ...def.detailedQualifications],
      content: `DOCUMENTED METRIC // ${def.headline}:
• Value: ${def.documentedValue}
• Mandatory Caveat: ${def.mandatoryCaveat}
• Scope: ${def.measurementScope} (${def.verificationStatus})`,
      deepLink: `/${KB_SOURCE_DOCUMENT}#documented-metrics`,
      provenanceBadge: '[KB Metric // EDA CAD Volume Error]'
    })

    return {
      matched: true,
      topic: 'eda_cad_volume_metric',
      exactAnswer: `The EDA CAD 0.0000% volume calculation error (< 10⁻⁶ relative discrepancy) represents mathematical software-calculus consistency between closed-form analytical physics equations and OpenCascade CadQuery BRep solid mass property integrals. It measures mathematical software consistency and does NOT assert physical CNC machining or manufacturing tolerance.`,
      evidence
    }
  }

  // 5. Governed Metric: AI Worksheets Authoring Duration
  if (
    lowerQ.includes('worksheets') &&
    (lowerQ.includes('hours') || lowerQ.includes('minutes') || lowerQ.includes('speed') || lowerQ.includes('duration') || lowerQ.includes('time') || lowerQ.includes('baseline'))
  ) {
    const def = MANDATORY_METRIC_CAVEATS['worksheets-poc-speedup']
    evidence.push({
      id: 'evidence-kb-worksheets-speedup',
      source: 'Knowledge Base // Section 8 Metrics',
      sourceType: 'knowledge_base',
      authority: 'primary',
      layer: 'canonical',
      entity: 'ai-worksheets',
      mandatoryCaveatText: def.mandatoryCaveat,
      governedMetricCaveats: [def.mandatoryCaveat, ...def.detailedQualifications],
      content: `DOCUMENTED METRIC // ${def.headline}:
• Value: ${def.documentedValue}
• Mandatory Caveat: ${def.mandatoryCaveat}
• Scope: ${def.measurementScope} (${def.verificationStatus})`,
      deepLink: `/${KB_SOURCE_DOCUMENT}#documented-metrics`,
      provenanceBadge: '[KB Metric // AI Worksheets Duration]'
    })

    return {
      matched: true,
      topic: 'worksheets_poc_duration_metric',
      exactAnswer: `In the AI Worksheets product exploration, the ~2-hour teacher authoring baseline versus ~3-minute prototype generation represents an estimated baseline comparison between manual worksheet creation and early prototype generation, not a controlled or universally validated productivity benchmark.`,
      evidence
    }
  }

  // 6. Governed Metric: Ask Aadil Test Invariant (172 checks vs 327 assertions)
  if (
    lowerQ.includes('ask aadil') &&
    (lowerQ.includes('172') || lowerQ.includes('327') || lowerQ.includes('how many tests') || lowerQ.includes('hardening checks'))
  ) {
    const hDef = MANDATORY_METRIC_CAVEATS['ask-aadil-hardening']
    const aDef = MANDATORY_METRIC_CAVEATS['ask-aadil-harness']

    evidence.push({
      id: 'evidence-kb-ask-aadil-tests',
      source: 'Knowledge Base // Section 8 Metrics',
      sourceType: 'knowledge_base',
      authority: 'primary',
      layer: 'canonical',
      entity: 'ask-aadil',
      caseStudyId: 'CS-01',
      mandatoryCaveatText: hDef.mandatoryCaveat,
      governedMetricCaveats: [hDef.mandatoryCaveat, aDef.mandatoryCaveat],
      content: `DOCUMENTED METRIC // Ask Aadil Test Inventory:
• Core Hardening Checks: ${hDef.documentedValue} (${hDef.mandatoryCaveat})
• Harness Assertions: ${aDef.documentedValue} (${aDef.mandatoryCaveat})`,
      deepLink: `/${KB_SOURCE_DOCUMENT}#documented-metrics`,
      provenanceBadge: '[KB Metric // Ask Aadil Test Invariants]'
    })

    return {
      matched: true,
      topic: 'ask_aadil_test_counts',
      exactAnswer: `Ask Aadil has two distinct verified test metrics that must not be conflated: 172 core hardening checks (132 agent QA checks, 29 action governance checks, and 11 browser E2E checks) and 327 total assertions collected across all 10 evaluation test scripts in scripts/. Both are reproducible in the local workspace.`,
      evidence
    }
  }

  return {
    matched: false,
    topic: 'unmatched',
    evidence: []
  }
}
