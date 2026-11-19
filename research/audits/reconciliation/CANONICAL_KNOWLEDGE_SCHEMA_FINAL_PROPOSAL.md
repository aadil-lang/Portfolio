# CANONICAL KNOWLEDGE SCHEMA FINAL PROPOSAL (REFINED)
**Definitive Architecture Specification for Normalized Portfolio Knowledge Governance**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, Data Integrity & Provenance Specialist
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Output Path:** `research/audits/reconciliation/CANONICAL_KNOWLEDGE_SCHEMA_FINAL_PROPOSAL.md`
- **Execution Mode:** READ-ONLY DESIGN SPECIFICATION (Implementation Strictly Prohibited)

---

## 1. REFINED ARCHITECTURAL PRINCIPLES

Following the final discrepancy audit, the canonical schema has been refined to eliminate brittle assumptions and enforce strict real-world engineering semantics:

1. **Decoupled Authorship Semantics:**  
   `SOLE_IMPLEMENTER` designates who wrote the code. It does NOT assert that the individual conceived every product requirement, managed external stakeholders, or conducted company-wide deployment single-handedly. Architectural responsibility, product requirements origin, and implementation authorship are strictly decoupled.
2. **5-Tier Publication & Intellectual Property Model:**  
   Replaces the coarse binary open/closed model with five precise legal and publication classifications, preventing the mistaken inference of publication eligibility from repository visibility.
3. **Multi-Track Temporal Windows & Invariant Decoupling:**  
   Separates employment tenure, development window, internal team usage, public release, and post-employment maintenance. The schema accommodates legitimate engineering workflows (e.g., maintaining an open-source project after leaving a role) without triggering false validation rejections.
4. **Epistemic Temporal Uncertainty:**  
   Decouples date precision (`day`, `month`, `year`) from confirmation status (`USER_CONFIRMED`, `INDEPENDENTLY_VERIFIED`, `ESTIMATED`) and boundary classification (`EXACT_BOUNDARY`, `TRANSITION_WINDOW`, `OVERLAPPING_ACTIVITY`, `UNRESOLVED_BOUNDARY`).
5. **Strict Evidence Hierarchy:**  
   Distinguishes file existence (`SOURCE_INVENTORY`) and test code presence (`TEST_DEFINITION`) from live test execution (`TEST_EXECUTION`) and empirical operational comparisons (`BENCHMARK_MEASUREMENT`).
6. **Programmatic Claim Governance:**  
   Every technical claim defines explicit headline copy, qualified technical wording, required caveats, and prohibited interpretations. Partially verified claims are programmatically blocked from rendering without their mandatory caveats.

---

## 2. REFINED TYPESCRIPT INTERFACES

### 2.1 Temporal Primitives & Uncertainty Model

```typescript
export type TemporalPrecision = 'day' | 'month' | 'quarter' | 'year'

export type ConfirmationStatus = 
  | 'USER_CONFIRMED'            // Authoritatively confirmed by the candidate/engineer
  | 'INDEPENDENTLY_VERIFIED'     // Verified via dated documentary or commit evidence
  | 'ESTIMATED'                 // Approximated boundary; day/month not established

export type BoundaryType = 
  | 'EXACT_BOUNDARY'            // Fixed calendar boundary known to exact precision
  | 'TRANSITION_WINDOW'         // Known overlap or handover window across roles
  | 'OVERLAPPING_ACTIVITY'      // Concurrent engagements or ongoing parallel discipline
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
```

---

### 2.2 Career & Employment Records

```typescript
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
  careerId: string                          // e.g. 'car-wayground-sme'
  phaseId: CareerPhaseId
  organization: string                      // 'Wayground Inc (Quizizz)'
  formalDesignation: string                 // 'Subject Matter Expert — Mathematics'
  employmentType: EmploymentType
  location: string                          // 'Bengaluru, India (Remote)'
  
  /** Contractual Employment Window */
  employmentPeriod: CanonicalTimeSpan

  /** Core Scope & Evidence */
  formalScopeSummary: string
  verifiedResponsibilities: string[]
  
  /** Transition & Overlap Documentation */
  transitionContext?: {
    priorCareerId?: string
    boundaryType: BoundaryType
    transitionNote: string
    isCausalClaimFormallyVerified: boolean  // false for VM Copy transfer narrative
  }

  associatedProjectIds: string[]
  evidenceIds: string[]
}
```

---

### 2.3 Project Authorship, Provenance & Publication Schema

```typescript
/**
 * Implementation Authorship: Who wrote the actual source code?
 */
export type ImplementationAuthorship = 
  | 'SOLE_IMPLEMENTER'            // Personally wrote 100% of the codebase
  | 'PRIMARY_MODULE_AUTHOR'       // Personally engineered specific discrete modules
  | 'COLLABORATIVE_CONTRIBUTOR'   // Contributed code as part of an integrated team

/**
 * Architectural Responsibility: Who designed the system structure?
 */
export type ArchitecturalResponsibility = 
  | 'PRIMARY_ARCHITECT'           // Conceived and designed the complete architecture
  | 'CO_ARCHITECT'                // Designed architecture in collaboration with staff/peers
  | 'DIRECTED_ARCHITECTURE'       // Implemented architecture directed by engineering lead

/**
 * Product Requirements Origin: How did the project requirements originate?
 */
export type ProductRequirementsOrigin = 
  | 'SELF_DIRECTED_INITIATIVE'    // Initiated to solve observed operational bottlenecks
  | 'INTERNAL_COMMISSION'         // Formal engineering roadmap ticket or management directive
  | 'HACKATHON_CHALLENGE'         // Conceived to address competitive hackathon brief
  | 'INDEPENDENT_RESEARCH_SPEC'   // Independent personal research agenda

/**
 * Organizational Context: What organizational environment hosted the project?
 */
export type ProjectOrganizationalContext = 
  | 'COMPANY_EMPLOYMENT'          // Developed during employment tenure
  | 'HACKATHON_EVENT'             // Developed during a competitive time-bound event
  | 'INDEPENDENT_RESEARCH'        // Developed as independent personal engineering

/**
 * Intellectual Property & Legal Ownership
 */
export type IntellectualPropertyOwnership = 
  | 'EMPLOYER_PROPRIETARY'        // Proprietary intellectual property of employer
  | 'OPEN_SOURCE_MIT'             // MIT Licensed open source
  | 'OPEN_SOURCE_APACHE2'         // Apache 2.0 Licensed open source
  | 'PERSONAL_PROPRIETARY'        // Personally owned closed source

/**
 * Publication Eligibility & Surface Restrictions (5-Tier)
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
  title: string                             // 'VM Copy (Deterministic Transformation Engine)'
  tagline: string
  
  /** Decoupled Authorship & Provenance */
  implementationAuthorship: ImplementationAuthorship
  architecturalResponsibility: ArchitecturalResponsibility
  requirementsOrigin: ProductRequirementsOrigin
  organizationalContext: ProjectOrganizationalContext
  ipOwnership: IntellectualPropertyOwnership
  publicationEligibility: PublicationEligibility

  /** Mandatory if authorship != 'SOLE_IMPLEMENTER' */
  contributionBreakdown?: ModuleContributionBreakdown

  /** Career Association */
  associatedCareerId: string                // e.g. 'car-wayground-sme'
  careerPhaseId: CareerPhaseId

  /** Multi-Track Temporal Windows */
  temporalRegistry: {
    developmentWindow: CanonicalTimeSpan        // Engineering span (e.g. Oct 2025 – mid-Nov 2025)
    internalTeamUsageWindow?: CanonicalTimeSpan // Team adoption (e.g. Nov 2025 onward)
    formalDeploymentDate?: CanonicalDatePoint   // null / not independently established for VM Copy
    publicReleaseDate?: CanonicalDatePoint      // Public launch / open-source release date
    activeMaintenanceWindow?: CanonicalTimeSpan // Legitimate ongoing maintenance
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
    publicUrl: string | null                // null if not PUBLIC_OPEN_SOURCE
    isPrivateOrProprietary: boolean
    caseStudyRoute: string
    liveDemoUrl?: string | null
  }

  claimIds: string[]
  evidenceIds: string[]
}
```

---

### 2.4 Evidence & Measurement Semantics

```typescript
/**
 * Concrete Evidence Artifact Types
 */
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
  
  /** Location & Reproduction */
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
```

---

### 2.5 Technical Claim & Programmatic Governance Schema

```typescript
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

export interface CanonicalTechnicalClaimRecord {
  claimId: string                           // e.g. 'CLAIM-CAD-001'
  projectId: string
  claimDomain: 'ACCURACY' | 'LATENCY' | 'TEST_COUNT' | 'COST' | 'SECURITY'
  
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
```

---

## 3. REFINED VALIDATION INVARIANTS

The schema validator (`npm run validate:canonical`) enforces these non-negotiable rules:

1. **Authorship & Proprietary Alignment:**  
   If `organizationalContext === 'COMPANY_EMPLOYMENT'`, `ipOwnership` must be `'EMPLOYER_PROPRIETARY'`. If `implementationAuthorship === 'SOLE_IMPLEMENTER'`, the project must explicitly declare `requirementsOrigin` (`SELF_DIRECTED_INITIATIVE` or `INTERNAL_COMMISSION`).
2. **Repository Visibility & IP Invariant:**  
   If `publicationEligibility !== 'PUBLIC_OPEN_SOURCE'`, `repository.publicUrl` MUST be `null`. No inactive GitHub placeholders are permitted.
3. **Decoupled Temporal Invariant:**  
   `developmentWindow.start` cannot be earlier than `associatedCareerRecord.employmentPeriod.start` for projects developed under `COMPANY_EMPLOYMENT`. However, `activeMaintenanceWindow` or `publicReleaseDate` MAY legitimately occur after `employmentPeriod.end` (e.g. post-employment open-sourcing or continued open-source library maintenance).
4. **Mandatory Caveat Rendering Invariant:**  
   If `verificationStatus === 'PARTIALLY_VERIFIED'`, any UI component or export script attempting to render `wording.headline` or `wording.qualifiedTechnicalStatement` without simultaneously rendering `wording.mandatoryCaveats` will fail build-time static validation.
5. **Causality Narrative Invariant:**  
   Any career record where `transitionContext.isCausalClaimFormallyVerified === false` is prohibited from using causal verbs ("caused", "resulted in", "commissioned because") and must use chronological connective phrasing ("preceding the transition into", "served as a technical catalyst prior to").

---

## 4. CANONICAL REGISTRY CONSUMERS & DATA CONTRACTS

```
                                  ┌────────────────────────────────┐
                                  │   Canonical Knowledge Registry │
                                  │   (TypeScript Single Source)   │
                                  └───────────────┬────────────────┘
                                                  │
                  ┌───────────────────────────────┼───────────────────────────────┐
                  ▼                               ▼                               ▼
       ┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
       │   Frontend React    │         │     Ask Aadil /     │         │   Resume & Export   │
       │     Components      │         │     RAG Lab         │         │      Engines        │
       └─────────────────────┘         └─────────────────────┘         └─────────────────────┘
```

1. **Frontend Components (`components/ExperienceCard.tsx`, `components/ProjectCard.tsx`):**  
   Read directly from the canonical registry. Replaces unnormalized static objects in `data/projects.ts` and `data/experience.ts`.
2. **Ask Aadil & RAG Lab (`lib/rag/hybridRetriever.ts`, `lib/rag/askAadilAgent.ts`):**  
   Ingest canonical chunks dynamically. Deprecates the static fallback strings in `hybridRetriever.ts:228-261` and synchronizes Ask Aadil's system prompt with canonical career phases.
3. **Resume Export Engine (`scripts/generate_resume_pdf.py`, `data/canonical/resumeData.ts`):**  
   Generates resume data directly from canonical records, eliminating date drifts and typography discrepancies permanently.

---

## 5. MIGRATION DEPENDENCY MATRIX (PRE-IMPLEMENTATION)

| Migration Step | Target File | Source Contract | Prerequisite |
|---|---|---|---|
| **M-01** | `data/canonical/canonicalSchema.ts` | Final Schema Specification | User Authorization |
| **M-02** | `data/canonical/canonicalRegistry.ts` | Populated Records for 5 Phases & 11 Projects | M-01 |
| **M-03** | `data/canonical/projectsMetadata.ts` | Deprecate in favor of M-02 | M-02 |
| **M-04** | `data/canonical/journalChapters.ts` | Synchronize 2026 dates from M-02 | M-02 |
| **M-05** | `data/canonical/sourceConflicts.ts` | Strike Content Builder falsehood | M-02 |
| **M-06** | `data/experience.ts` | Re-export from M-02 (Fix Digipplus typo) | M-02 |
| **M-07** | `lib/rag/hybridRetriever.ts` | Ingest stages dynamically from M-02 | M-02 |
| **M-08** | `scripts/validate_canonical.ts` | Enforce invariants in CI build | M-01, M-02 |

*Implementation status: DESIGN SPECIFICATION ONLY. No files modified.*
