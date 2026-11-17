/**
 * ENGINEERING CASE STUDY SCHEMA TYPES
 * Phase 2.5A — Technical Incident Reconstruction, Engineering Decision Records & Canonical Provenance
 *
 * Establishes typed contracts for the portfolio's dedicated technical case study collection,
 * recording real technical failures, debugging investigations, root causes, architectural decisions,
 * implementation corrections, and verification evidence without modifying the career journal.
 */

export type CaseStudyCategory =
  | 'STREAMING_VOICE_PIPELINE'
  | 'DETERMINISTIC_EVALUATION'
  | 'PHYSICS_CAD_SOLVER'
  | 'AGENT_GOVERNANCE_SAFETY'
  | 'CROSS_PLATFORM_MOBILE'
  | 'ETL_DATA_PIPELINE'
  | 'DOCUMENTATION_GAP'

export type DocumentationCompleteness =
  | 'FULLY_DOCUMENTED'
  | 'PARTIALLY_DOCUMENTED'
  | 'HISTORICAL_SUMMARY_ONLY'
  | 'INSUFFICIENT_EVIDENCE'

export type EvidenceStatus =
  | 'DIRECT_CODE_EVIDENCE'
  | 'TEST_VERIFIED'
  | 'CONTEMPORANEOUS_DOC'
  | 'RETROSPECTIVE_SUMMARY'
  | 'DOCUMENTATION_GAP'

export type CaseStudyVisibility =
  | 'PUBLIC'
  | 'EMPLOYER_PROPRIETARY_CASE_STUDY'
  | 'INTERNAL_AUDIT'

export type CaseStudyPublicationStatus =
  | 'PUBLIC_APPROVED'
  | 'PROPRIETARY_RESTRICTED'

export interface CaseStudyHypothesis {
  hypothesis: string
  confirmed: boolean
  notes: string
}

export interface CaseStudyImplementationDetails {
  filesModifiedOrAuthored: string[]
  keyFunctionsOrClasses: string[]
  architecturalDecisions: string[]
  beforeBehavior: string
  afterBehavior: string
}

export interface CaseStudyVerification {
  testCommand?: string
  assertionCount?: number
  verifiedScope: string
  evidenceStatus: EvidenceStatus
  regressionEvidence: string
}

export interface EngineeringCaseStudy {
  id: string
  title: string
  projectId: string | null
  careerIds: string[]
  journalChapterIds: string[]
  claimIds: string[]
  evidenceIds: string[]
  category: CaseStudyCategory
  technicalContext: string
  problem: string
  symptoms: string[]
  reproductionConditions: string
  investigation: string
  hypotheses: CaseStudyHypothesis[]
  rootCause: string
  resolution: string
  implementationDetails: CaseStudyImplementationDetails
  verification: CaseStudyVerification
  outcome: string
  limitations: string[]
  lessons: string[]
  visibility: CaseStudyVisibility
  publicationStatus: CaseStudyPublicationStatus
  documentationCompleteness: DocumentationCompleteness
  createdAt?: string
  sourceReferences: string[]
}
