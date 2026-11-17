/**
 * CANONICAL KNOWLEDGE SCHEMA
 *
 * Formal, normalized TypeScript type definitions governing:
 * 1. Career chronology and formal employment periods
 * 2. Project ownership, implementation authorship, and architectural responsibility
 * 3. Requirements provenance and organizational context
 * 4. Intellectual property and 5-tier publication classification
 * 5. Multi-track temporal registries with uncertainty and boundary semantics
 * 6. Evidence provenance, measurement scopes, and repository anchors
 * 7. Programmatic claim governance, caveats, and prohibited interpretations
 *
 * Architecture Standard: Phase 0 & Phase 1 Canonical Data Foundation
 */

// ============================================================================
// 1. TEMPORAL & UNCERTAINTY TYPES
// ============================================================================

export type TemporalPrecision = 'day' | 'month' | 'quarter' | 'year'

export type ConfirmationStatus =
  | 'USER_CONFIRMED'            // Authoritatively confirmed by the candidate/engineer
  | 'INDEPENDENTLY_VERIFIED'     // Formally verified via documentary or commit evidence
  | 'ESTIMATED'                 // Approximated boundary; exact day/month unevidenced

export type BoundaryType =
  | 'EXACT_BOUNDARY'            // Fixed calendar boundary known to specified precision
  | 'TRANSITION_WINDOW'         // Known overlap or handover window across roles
  | 'OVERLAPPING_ACTIVITY'      // Concurrent engagements or ongoing parallel discipline supported by primary evidence
  | 'INTERVAL_OVERLAP'          // Recorded date intervals overlap at represented precision only without establishing simultaneous real-world activity
  | 'UNRESOLVED_BOUNDARY'       // Insufficient primary evidence to establish exact boundary

export interface CanonicalDatePoint {
  /** ISO string: 'YYYY-MM-DD', 'YYYY-MM', or 'YYYY' */
  dateString: string
  precision: TemporalPrecision
  confirmationStatus: ConfirmationStatus
  boundaryType: BoundaryType
  annotation?: string           // Explanatory note for transition or boundary context
}

export interface CanonicalTimeSpan {
  start: CanonicalDatePoint
  end: CanonicalDatePoint | 'ONGOING' | 'PRESENT'
}

// ============================================================================
// 2. CAREER & EMPLOYMENT TYPES
// ============================================================================

export type EmploymentType =
  | 'FULL_TIME_SALARIED'
  | 'CONTRACT_FREELANCE'
  | 'CONTRACT_AGENCY'
  | 'INDEPENDENT_RESEARCH'

export type CareerPhaseId =
  | 'PHASE_1_MATHEMATICS_CONTENT_FOUNDATIONS'
  | 'PHASE_2_INDEPENDENT_QUANTITATIVE_DISCIPLINE'
  | 'PHASE_3_WAYGROUND_MATHEMATICS_SME'
  | 'PHASE_4_WAYGROUND_AI_ENGINEER'
  | 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH'

export interface CanonicalCareerRecord {
  careerId: string                          // e.g. 'car-wayground-math-sme'
  phaseId: CareerPhaseId
  organization: string                      // 'Wayground Inc (Quizizz)'
  organizationType: 'ENTERPRISE' | 'STARTUP' | 'AGENCY' | 'SELF_DIRECTED'
  formalDesignation: string                 // 'Subject Matter Expert — Mathematics'
  employmentType: EmploymentType
  location: string                          // 'Bengaluru, India (Remote)'

  /** Contractual or active employment window */
  employmentPeriod: CanonicalTimeSpan

  /** Scope and verified responsibilities */
  formalScopeSummary: string
  verifiedResponsibilities: string[]

  /** Transition and overlap documentation */
  transitionContext?: {
    priorCareerId?: string
    boundaryType: BoundaryType
    transitionNote: string
    isCausalClaimFormallyVerified: boolean  // false for VM Copy transfer narrative
  }

  associatedProjectIds: string[]
  evidenceIds: string[]
}

// ============================================================================
// 3. PROJECT PROVENANCE & OWNERSHIP TYPES
// ============================================================================

/**
 * 1. Implementation Authorship: Who wrote the code?
 */
export type ImplementationAuthorship =
  | 'SOLE_IMPLEMENTER'            // Personally wrote 100% of the codebase
  | 'PRIMARY_MODULE_AUTHOR'       // Personally engineered specific discrete modules
  | 'COLLABORATIVE_CONTRIBUTOR'   // Contributed code as part of an integrated team

/**
 * 2. Architectural Responsibility: Who designed the system?
 */
export type ArchitecturalResponsibility =
  | 'PRIMARY_ARCHITECT'           // Conceived and designed the complete architecture
  | 'CO_ARCHITECT'                // Designed architecture in collaboration with staff/peers
  | 'DIRECTED_ARCHITECTURE'       // Implemented architecture directed by engineering lead

/**
 * 3. Requirements Origin: How did the project originate?
 */
export type RequirementsOrigin =
  | 'SELF_DIRECTED_INITIATIVE'    // Initiated to solve observed operational bottlenecks
  | 'INTERNAL_COMMISSION'         // Formal engineering roadmap ticket or management directive
  | 'HACKATHON_CHALLENGE'         // Conceived to address competitive hackathon brief
  | 'INDEPENDENT_RESEARCH_SPEC'   // Independent personal research agenda

/**
 * 4. Organizational Context: Where was the work hosted?
 */
export type ProjectOrganizationalContext =
  | 'COMPANY_EMPLOYMENT'          // Developed during employment tenure
  | 'HACKATHON_EVENT'             // Developed during a competitive time-bound event
  | 'INDEPENDENT_RESEARCH'        // Developed as independent personal engineering

/**
 * 5. Intellectual Property Ownership
 */
export type IntellectualPropertyOwnership =
  | 'EMPLOYER_PROPRIETARY'        // Proprietary intellectual property of employer
  | 'OPEN_SOURCE_MIT'             // MIT Licensed open source
  | 'OPEN_SOURCE_APACHE2'         // Apache 2.0 Licensed open source
  | 'PERSONAL_PROPRIETARY'        // Personally owned closed source

/**
 * 6. Publication Eligibility & Surface Restrictions (5-Tier)
 */
export type PublicationEligibility =
  | 'PUBLIC_OPEN_SOURCE'                // Code is fully public in an open repository
  | 'PUBLIC_PORTFOLIO_INTERFACE'        // Public UI/UX with proprietary backend/implementation
  | 'EMPLOYER_PROPRIETARY_CASE_STUDY'   // Employer code; public architectural case study only
  | 'PERSONAL_PROPRIETARY'              // Personally owned closed-source tool
  | 'RESTRICTED_OR_INTERNAL_ONLY'       // Non-publishable or strictly internal

export interface ModuleContributionBreakdown {
  authorRole: string
  personallyEngineeredModules: string[]
  teamEngineeredModules: string[]
  stakeholderOrTeamNotes?: string
}

export interface CanonicalProjectRecord {
  projectId: string                         // e.g. 'proj-vm-copy'
  slug: string                              // 'vm-copy'
  title: string                             // 'VM Copy Question Generator'
  tagline: string

  /** Decoupled Ownership & Provenance Axes */
  implementationAuthorship: ImplementationAuthorship
  architecturalResponsibility: ArchitecturalResponsibility
  requirementsOrigin: RequirementsOrigin
  organizationalContext: ProjectOrganizationalContext
  ipOwnership: IntellectualPropertyOwnership
  publicationEligibility: PublicationEligibility

  /** Mandatory if implementationAuthorship != 'SOLE_IMPLEMENTER' */
  contributionBreakdown?: ModuleContributionBreakdown

  /** Career Association */
  associatedCareerId: string                // e.g. 'car-wayground-math-sme'
  careerPhaseId: CareerPhaseId

  /** Multi-Track Temporal Windows */
  temporalRegistry: {
    developmentWindow: CanonicalTimeSpan        // Active engineering window
    internalTeamUsageWindow?: CanonicalTimeSpan // Team adoption window
    formalDeploymentDate?: CanonicalDatePoint   // Formal corporate release (null if unevidenced)
    publicReleaseDate?: CanonicalDatePoint      // Public launch / open-source release date
    activeMaintenanceWindow?: CanonicalTimeSpan // Ongoing maintenance
  }

  /** Tech Stack */
  technologies: {
    languages: string[]
    frameworksAndRuntimes: string[]
    deterministicEngines: string[]
    modelsAndOrchestrators?: string[]
    infrastructure: string[]
  }

  /** Access & Links */
  repository: {
    publicUrl: string | null                // MUST be null if publicationEligibility != 'PUBLIC_OPEN_SOURCE'
    isPrivateOrProprietary: boolean
    caseStudyRoute: string
    liveDemoUrl?: string | null
  }

  claimIds: string[]
  evidenceIds: string[]
}

// ============================================================================
// 4. EVIDENCE & MEASUREMENT TYPES
// ============================================================================

export type EvidenceArtifactType =
  | 'SOURCE_INVENTORY'              // Code modules and files exist in repository
  | 'TEST_DEFINITION'               // Test functions/cases declared in test files
  | 'TEST_EXECUTION'                // Verified live test execution with exit code 0
  | 'BENCHMARK_MEASUREMENT'         // Measured latency, memory, or throughput benchmark
  | 'MATHEMATICAL_CALCULUS_PROOF'   // Closed-form analytical vs numerical integration
  | 'EMPLOYMENT_DOCUMENTATION'      // Authoritative PDF resume or formal credential
  | 'USER_CONFIRMED_FACT'           // Direct, authoritative clarification from the engineer

export interface CanonicalEvidenceRecord {
  evidenceId: string                        // e.g. 'EVID-CAD-01'
  projectId?: string
  careerId?: string
  evidenceType: EvidenceArtifactType

  /** Concrete Provenance Anchors */
  repositoryPathOrArtifact: string          // 'tests/test_cad_engine.py' or resume PDF URI
  lineRangeOrSymbol?: string
  reproductionCommand?: string              // 'pytest tests/test_cad_engine.py -v'

  /** Measured Observations */
  measuredValue: string | number            // 424
  measuredUnit: string                      // 'pytests collected'
  executionStatus?: 'PASS' | 'FAIL' | 'UNEXECUTED_IN_THIS_REPO'

  /** Mandatory Disclosures */
  disclosedScope: string                    // 'Closed-form physics and CAD BRep kernel integration'
  disclosedLimitations: string[]           // ['Measures software calculus; does not assert CNC machining tolerance']

  auditDate: string                         // '2026-11-14'
  auditorSignoff: string
}

// ============================================================================
// 5. CLAIM GOVERNANCE TYPES
// ============================================================================

export type StrictVerificationStatus =
  | 'SOURCE_VERIFIED'          // Test code/files verified in source inventory
  | 'REPRODUCIBLY_VERIFIED'     // Test suite executed live in harness with 100% pass rate
  | 'PARTIALLY_VERIFIED'       // Authentic metric requiring mandatory qualifying caveats
  | 'UNVERIFIED'               // Insufficient evidence; marked unverified
  | 'DO_NOT_PUBLISH'           // Factually inaccurate, refuted, or unsupportable

export type PublicationSurface =
  | 'HOMEPAGE_CARD'
  | 'PROJECTS_ARCHIVE_CARD'
  | 'SYSTEMS_CASE_STUDY'
  | 'RESUME_DOCUMENT'
  | 'ASK_AADIL_KNOWLEDGE'

export type MetricSubject =
  | 'CAD_GEOMETRY_VOLUME_ACCURACY'       // EDA CAD volume calculation vs CNC machining
  | 'CAD_TEST_SUITE_COUNT'               // EDA CAD 424 pytests
  | 'OCR_PARSER_ACCURACY'                // OCR UI assertions
  | 'OCR_TEST_SUITE_COUNT'               // OCR 134 backend pytests
  | 'DETERMINISTIC_EVALUATION_LATENCY'   // VM Copy <1ms local eval vs LLM generation
  | 'MOBILE_COMPONENT_TEST_EXECUTION'    // Solace AI 50 mobile Jest/tsc checks
  | 'VOICE_AGENT_TEST_COUNT'             // Solace AI 52 backend pytests
  | 'RELIABILITY_TEST_CASE_COUNT'        // AI Reliability 158 test cases
  | 'GOVERNANCE_TEST_COUNT'              // AI Reliability 47 governance tests
  | 'AGENT_CORE_HARDENING_CHECKS'        // Ask Aadil 172 core hardening checks
  | 'HARNESS_TOTAL_ASSERTIONS'           // Ask Aadil 327 total assertions
  | 'ETL_INTEGRITY_STAGES'               // Curriculum ETL 3-tier gates
  | 'WORKFLOW_RUNTIME_COMPARISON'        // AI Worksheets 2h manual vs 3m automated POC
  | 'GENERAL_METRIC'                     // Generic/other metrics

export type MeasurementScope =
  | 'ANALYTICAL_PRIMITIVE_CALCULUS'      // Math formula vs solid geometry BRep
  | 'IN_MEMORY_DETERMINISTIC_GATE'       // Local regex/AST validation gate
  | 'LLM_GENERATIVE_PIPELINE'            // Full remote model API call
  | 'MOBILE_JEST_TYPESCRIPT_STATIC'      // Jest/tsc mobile harness
  | 'MOBILE_PHYSICAL_DEVICE_RUNTIME'     // Physical Android/iOS hardware
  | 'AUTOMATED_TEST_COLLECTION'          // Collected test functions/cases
  | 'AUTOMATED_SUITE_FILES'              // Distinct test files/suites
  | 'OPERATIONAL_BASELINE_COMPARISON'    // Informal manual vs automated comparison
  | 'CONTROLLED_ALGORITHMIC_BENCHMARK'   // Apples-to-apples algorithmic benchmark
  | 'CORE_SECURITY_HARDENING'            // Agent security/robustness check slice
  | 'FULL_EVALUATION_HARNESS'            // End-to-end evaluation harness assertions

export interface CanonicalTechnicalClaimRecord {
  claimId: string                           // e.g. 'CLAIM-CAD-001'
  projectId: string
  claimDomain: 'ACCURACY' | 'LATENCY' | 'TEST_COUNT' | 'COST' | 'SECURITY'
  isQuantitative?: boolean                  // Explicitly classifies quantitative vs qualitative claims
  metricSubject?: MetricSubject             // Mandatory for quantitative claims
  measurementScope?: MeasurementScope       // Mandatory for quantitative claims

  verificationStatus: StrictVerificationStatus
  linkedEvidenceIds: string[]

  /** Governed Wordings */
  wording: {
    headline: string                        // '424 Automated Pytests Across 28 Suites'
    qualifiedTechnicalStatement: string     // '0.0000% volume calculation error (< 10⁻⁶ relative discrepancy)...'
    mandatoryCaveats: string[]              // Must be rendered if status === 'PARTIALLY_VERIFIED'
    prohibitedInterpretations: string[]     // Phrases strictly blocked by linter
  }

  permittedSurfaces: PublicationSurface[]
}

// ============================================================================
// 6. ENGINEERING CASE STUDY & ARCHITECTURAL DECISION TYPES (PHASE 2.5C)
// ============================================================================

/**
 * Stable Case Study Identifiers matching Knowledge Base draft (CS-01 through CS-08).
 */
export type CaseStudyId =
  | 'CS-01' // Ask Aadil: Speech Recognition Streaming & Transcript Reconciliation
  | 'CS-02' // EDA CAD: Automated Geometry Verification & Material Hallucination Prevention
  | 'CS-03' // VM Copy: Deterministic Evaluation Layer & Batch Generation Hardening
  | 'CS-04' // AI Application Reliability: Formal Evaluation Harness & Regression Testing
  | 'CS-05' // Solace AI: Mobile Voice Agent Latency & Ephemeral Memory Management
  | 'CS-06' // Curriculum ETL: High-Volume Hierarchical Data Ingestion & Deterministic Row Guards
  | 'CS-07' // US Math Item Bank: Algorithmic Balance & Visual Domain Routing
  | 'CS-08' // DiffGuard: Multi-Platform Agent Review Engine (External Repository Boundary)

export const ALL_CASE_STUDY_IDS = [
  'CS-01',
  'CS-02',
  'CS-03',
  'CS-04',
  'CS-05',
  'CS-06',
  'CS-07',
  'CS-08'
] as const satisfies readonly CaseStudyId[]

/**
 * Complete string-literal union covering all 23 ADRs documented in the Knowledge Base:
 * - CS-01: VOICE (3)
 * - CS-02: EDA (4)
 * - CS-03: VM (3)
 * - CS-04: REL (4)
 * - CS-05: SOLACE (3)
 * - CS-06: ETL (3)
 * - CS-07: IB (3)
 */
export type AdrId =
  | 'ADR-VOICE-01' | 'ADR-VOICE-02' | 'ADR-VOICE-03'
  | 'ADR-EDA-01'   | 'ADR-EDA-02'   | 'ADR-EDA-03'   | 'ADR-EDA-04'
  | 'ADR-VM-01'    | 'ADR-VM-02'    | 'ADR-VM-03'
  | 'ADR-REL-01'   | 'ADR-REL-02'   | 'ADR-REL-03'   | 'ADR-REL-04'
  | 'ADR-SOLACE-01'| 'ADR-SOLACE-02'| 'ADR-SOLACE-03'
  | 'ADR-ETL-01'   | 'ADR-ETL-02'   | 'ADR-ETL-03'
  | 'ADR-IB-01'    | 'ADR-IB-02'    | 'ADR-IB-03'

export const ALL_ADR_IDS = [
  'ADR-VOICE-01', 'ADR-VOICE-02', 'ADR-VOICE-03',
  'ADR-EDA-01',   'ADR-EDA-02',   'ADR-EDA-03',   'ADR-EDA-04',
  'ADR-VM-01',    'ADR-VM-02',    'ADR-VM-03',
  'ADR-REL-01',   'ADR-REL-02',   'ADR-REL-03',   'ADR-REL-04',
  'ADR-SOLACE-01', 'ADR-SOLACE-02', 'ADR-SOLACE-03',
  'ADR-ETL-01',   'ADR-ETL-02',   'ADR-ETL-03',
  'ADR-IB-01',    'ADR-IB-02',    'ADR-IB-03'
] as const satisfies readonly AdrId[]

// Compile-time completeness assertions (fails compilation if union and array drift)
type AssertEqual<T, U> = [T] extends [U] ? ([U] extends [T] ? true : never) : never
export type _CheckCaseStudyCompleteness = AssertEqual<CaseStudyId, typeof ALL_CASE_STUDY_IDS[number]>
export type _CheckAdrCompleteness = AssertEqual<AdrId, typeof ALL_ADR_IDS[number]>

/**
 * Journal Chapter Identifier Type (Plain string reference).
 * Architectural Invariant: Canonical schema layer remains independent of adapter modules.
 */
export type JournalChapterId = string

/** Record Governance Status vs Publication Eligibility */
export type ManifestGovernanceStatus = 'ACCEPTED' | 'SEPARATE_REPOSITORY_DEFERRED'

/**
 * Discriminated Union for Journal Relationships:
 * - DIRECT: primary domain of chapter; targetAspect forbidden (enforced at compile-time via `never`).
 * - PARTIAL: subsidiary aspect; targetAspect required string.
 */
export type CaseStudyJournalMapping =
  | {
      chapterId: JournalChapterId
      classification: 'DIRECT'
      targetAspect?: never
      relevantAdrIds: AdrId[]
    }
  | {
      chapterId: JournalChapterId
      classification: 'PARTIAL'
      targetAspect: string // Mandatory; runtime validator asserts trim().length > 0
      relevantAdrIds: AdrId[]
    }

/** Typed Architectural Decision Record (Ownership defined strictly by containment) */
export interface CanonicalAdrReference {
  adrId: AdrId
  title: string
  status: 'ACCEPTED' | 'SUPERSEDED' | 'EXTERNAL_SPEC'
  contentAnchor: string                  // Immutable anchor convention, e.g. 'adr-voice-01'
}

/** External Evidence Reference for Separate Repositories (CS-08) */
export interface ExternalEvidenceReference {
  externalRepository: string             // e.g. 'aadil-lang/diffguard'
  externalReferenceId: string            // e.g. 'EXT-DIFF-CLAIM-001', 'EXT-DIFF-EVID-01'
  referenceType: 'EXTERNAL_CLAIM' | 'EXTERNAL_EVIDENCE' | 'GOVERNANCE_DIRECTIVE'
  description: string                    // Narrative scope statement or prerequisite checklist
  verificationLocality: 'EXTERNAL_REPOSITORY'
}

/** Lightweight Manifest Record (Identity & Relational Pointers ONLY - Zero Narrative Prose) */
export interface CanonicalCaseStudyReference {
  caseStudyId: CaseStudyId
  title: string
  slug: string

  /** Project Association: null for CS-08 (enforced as runtime validator invariant) */
  projectId: CanonicalProjectRecord['projectId'] | null

  /** Career Association: must match project.associatedCareerId; null for CS-08 (enforced as runtime validator invariant) */
  associatedCareerId: CanonicalCareerRecord['careerId'] | null

  /** Publication & Governance Separation */
  manifestGovernanceStatus: ManifestGovernanceStatus
  publicationEligibility: PublicationEligibility

  /** Authoritative Ownership of Relationships */
  mappedJournalChapters: CaseStudyJournalMapping[]
  adrReferences: CanonicalAdrReference[]

  /** References to ALREADY-EXISTING Canonical Records Only */
  canonicalClaimIds: string[]
  canonicalEvidenceIds: string[]

  /** Unresolved References documented for future reconciliation */
  unresolvedClaimPrerequisites?: string[]
  unresolvedEvidencePrerequisites?: string[]

  /** External References: strictly for separate repositories (CS-08) */
  externalEvidenceReferences?: ExternalEvidenceReference[]

  /** Immutable Content Anchor */
  contentAnchor: string                  // e.g. 'cs-01'
}

// ============================================================================
// 7. ROOT REGISTRY CONTAINER
// ============================================================================

export interface CanonicalRegistry {
  schemaVersion: string
  lastAudited: string
  careerRecords: CanonicalCareerRecord[]
  projectRecords: CanonicalProjectRecord[]
  evidenceRecords: CanonicalEvidenceRecord[]
  claimRecords: CanonicalTechnicalClaimRecord[]
  caseStudyReferences?: CanonicalCaseStudyReference[] // Optional for backward compatibility
}
