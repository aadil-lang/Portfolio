# CANONICAL KNOWLEDGE ARCHITECTURE PROPOSAL
**Design Specification for a Unified, Normalized Canonical Knowledge Layer (Read-Only Proposal)**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, Data Integrity & Provenance Specialist
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** DESIGN PROPOSAL ONLY (Implementation Strictly Prohibited During Audit Phase)

---

## 1. ARCHITECTURAL PROBLEM STATEMENT

The forensic audit revealed that the portfolio's factual discrepancies do NOT stem from a lack of technical depth or missing implementations. Rather, they stem from **unnormalized data redundancy**:
- Career dates are independently authored across `data/experience.ts`, `data/canonical/structuredProfile.ts`, `data/canonical/resumeData.ts`, and `data/canonical/journalChapters.ts`.
- Project dates and descriptions are independently declared in `data/projects.ts`, `data/chapters.ts`, `data/canonical/projectsMetadata.ts`, and `data/rag/corpus_v1.ts`.
- Ask Aadil's retriever ingests a mixture of canonical metadata and hardcoded strings, causing drift when one file is updated and another is overlooked.

To eliminate this vulnerability permanently without adding heavy databases or external dependencies, we propose normalizing portfolio facts into a **Single Canonical Knowledge Schema** stored directly in TypeScript under `data/canonical/`.

---

## 2. PROPOSED NORMALIZED SCHEMA DESIGN

### 2.1 Canonical Career Record Schema (`CareerRecord`)
```typescript
export interface CanonicalCareerRecord {
  careerId: string                 // e.g. 'car-wayground-sme'
  organization: string             // e.g. 'Wayground Inc (Quizizz)'
  formalTitle: string              // e.g. 'Subject Matter Expert — Mathematics'
  employmentType: 'full-time' | 'contract' | 'remote' | 'independent' | 'break'
  location: string                 // e.g. 'Bengaluru, India'
  startDate: string                // ISO-8601 YYYY-MM: '2024-01'
  endDate: string                  // ISO-8601 YYYY-MM: '2025-12'
  isFormalEmployment: boolean      // true
  scopeSummary: string             // Official responsibilities
  keyResponsibilities: string[]    // Discrete verified duties
  associatedProjectIds: string[]   // ['proj-vm-copy']
  evidenceSourceIds: string[]      // ['evid-rec-01', 'evid-res-01']
  evidenceStatus: 'VERIFIED' | 'SUPPORTED' | 'QUALIFIED'
}
```

### 2.2 Canonical Project Record Schema (`ProjectRecord`)
```typescript
export interface CanonicalProjectRecord {
  projectId: string                // e.g. 'proj-curriculum-etl'
  slug: string                     // e.g. 'curriculum-etl'
  title: string                    // 'Curriculum Transformation Engine'
  projectType: 'enterprise-etl' | 'evaluation-platform' | 'hackathon-agent' | 'cad-compiler'
  organizationContext: string      // 'Wayground Inc (AI/ML Team)' or 'Independent'
  ownershipClassification: 
    | 'PERSONALLY_DESIGNED_AND_IMPLEMENTED'
    | 'PERSONALLY_IMPLEMENTED_MODULE'
    | 'TEAM_DEVELOPED_WITH_CONTRIBUTION'
    | 'POC_EXPERIMENTAL'
    | 'INDEPENDENT_RESEARCH'
  individualContributions?: string[] // Explicitly defined if team system
  developmentStart: string         // '2026-02'
  developmentEnd: string           // '2026-06'
  deploymentDate?: string          // '2026-03'
  associatedCareerId?: string      // 'car-wayground-aiml'
  technologies: string[]           // ['Python 3.12', 'Claude 3.5 Sonnet', 'Pydantic v2', 'Celery']
  repositoryUrl: string | null     // Public GitHub URL or null if proprietary
  implementationStatus: 'PRODUCTION_VERIFIED' | 'POC_VERIFIED' | 'BENCHMARK_VERIFIED'
  primaryClaimIds: string[]        // ['claim-etl-3-tier', 'claim-etl-map-reduce']
  evidenceStatus: 'VERIFIED'
}
```

### 2.3 Canonical Evidence Record Schema (`EvidenceRecord`)
```typescript
export interface CanonicalEvidenceRecord {
  evidenceId: string               // e.g. 'EVID-EDA-01'
  projectId: string                // 'proj-design-automation'
  evidenceType: 'automated-suite' | 'mathematical-proof' | 'runtime-guardrail' | 'operational-comparison'
  sourceFilePath: string           // 'tests/test_cad_engine.py'
  sourceLineRange: string          // '45-210'
  executionCommand: string         // 'docker-compose -f tests/docker-compose.test.yml up'
  verificationDate: string         // '2026-11'
  metricValue: string | number     // 424
  metricUnit: string               // 'tests passing'
  scopeDescription: string         // 'Solid geometry reconstruction, BRep mass properties'
  limitations: string              // 'Does not assert physical CNC machining tolerances'
  evidenceStatus: 'VERIFIED' | 'QUALIFIED'
}
```

### 2.4 Canonical Technical Claim Schema (`TechnicalClaimRecord`)
```typescript
export interface CanonicalTechnicalClaimRecord {
  claimId: string                  // e.g. 'claim-eda-0-volume-error'
  claimText: string                // Exact approved public wording
  projectId: string                // 'proj-design-automation'
  claimCategory: 'accuracy' | 'latency' | 'test-count' | 'cost' | 'security'
  numericalValue?: number          // 0.0
  numericalUnit?: string           // '% error'
  evidenceIds: string[]            // ['EVID-EDA-02']
  verificationStatus: 'VERIFIED' | 'QUALIFIED'
  publicationApproved: boolean     // true
  approvedWordingVariant: {
    heroPill: string               // '0.0000% Software Volume Error'
    detailedReport: string         // 'Discrepancy < 10⁻⁶ between closed-form physics and CAD mass properties'
    caveat: string                 // 'Software calculus agreement only; not CNC tolerance'
  }
}
```

---

## 3. SEPARATION OF TEMPORAL METADATA AXES
To prevent future chronology conflation, the schema explicitly separates distinct temporal events:
1. **Event / Real-World Date:** When the underlying engineering problem was originally encountered.
2. **Development Start / End:** When the actual software was architected and written.
3. **Formal Employment Window:** The HR employment dates of the associated role.
4. **Verification Date:** When automated test harnesses verified the assertions.
5. **Documentation / Publication Date:** When the case study or folio was written.

---

## 4. IMPLEMENTATION STRATEGY (PHASED EXECUTION)
- **Zero New Dependencies:** Implemented as strict TypeScript interfaces and frozen object literals (`as const`) in `data/canonical/knowledgeRegistry.ts`.
- **Derived Consumption:**
  - `data/experience.ts` imports from `knowledgeRegistry.ts`.
  - `data/projects.ts` imports from `knowledgeRegistry.ts`.
  - Ask Aadil's `knowledgeIndex.ts` generates chunk vectors dynamically from `knowledgeRegistry.ts`.
  - RAG Lab references the same verified records.
- **Result:** Updating a date, test count, or project attribute in `knowledgeRegistry.ts` automatically propagates across the Timeline, Systems Archive, Case Studies, Resume generator, and Ask Aadil without drift.

