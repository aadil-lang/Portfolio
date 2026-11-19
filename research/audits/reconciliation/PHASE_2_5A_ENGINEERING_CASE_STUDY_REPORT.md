# Portfolio — Phase 2.5A: Engineering Case Study Collection
## Technical Incident Reconstruction, Engineering Decision Records & Canonical Provenance Report

**Author:** Principal Software Architect, Senior AI Engineer, Engineering Investigator, Technical Documentation Architect, and Evidence Governance Reviewer  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio\`  
**Branch:** `main`  
**Phase:** 2.5A — Engineering Case Study Collection  
**Authorization:** Phase 2.4 accepted. Phase 2.5A implementation authorized.  
**Report Date:** 2026-11-15  
**Verdict:** `PASS — PHASE 2.5A ENGINEERING CASE STUDIES ACCEPTED`

---

## 1. Executive Summary

Phase 2.5A establishes a dedicated, evidence-grounded **Engineering Case Study Collection** for the engineering portfolio. 

The user's existing 23-chapter engineering journal captures their professional evolution, career beginnings, pedagogical roots, expanding responsibilities, and gradual transition into AI engineering. In accordance with architectural principles, the career journal has been **strictly preserved without rewriting or converting into a debugging log**.

To complement the narrative journal, this phase introduces a separate, typed technical knowledge layer:
1. **Schema & Types:** `types/caseStudy.ts` — rigorous TypeScript contracts defining technical context, symptoms, reproduction conditions, investigation logs, hypotheses, root causes, resolutions, architectural decision records (ADRs), verification scopes, limitations, lessons, and honest documentation completeness classifications.
2. **Canonical Case Study Registry:** `data/canonical/engineeringCaseStudies.ts` — 8 initial technical case studies grounded in actual codebases, automated test suites, and contemporaneous design records across `Ask Aadil`, `EDA CAD`, `VM Copy`, `AI Application Reliability`, `Solace AI`, `Curriculum Transformation Engine`, `US Mathematics Item Bank`, and an explicit documentation gap record for `DiffGuard`.
3. **Dedicated Projection Adapter:** `data/adapters/engineeringCaseStudyAdapter.ts` — pure functional query and resolution layer linking case studies to canonical projects, career tenures, journal chapters, technical claims, and evidence records with zero dangling references and automatic confidentiality enforcement.
4. **Comprehensive Test Harness:** `scripts/test_engineering_case_studies.ts` — 35 adversarial assertions across 7 suites validating schema compliance, reference resolution, incident authenticity, metric caveats, ownership integrity, and confidentiality boundaries.
5. **Non-Regression Verification:** Full execution of all 7 historical test suites (615 assertions) plus TypeScript static compilation (`npx tsc --noEmit`) passing with 100% success and zero errors.

### Strict Governance Commitments
- **Zero Fictionalization:** No incident, symptom, hypothesis, root cause, or fix has been fabricated. Where documentation is partial or absent, it is explicitly classified as `PARTIALLY_DOCUMENTED` or `INSUFFICIENT_EVIDENCE`.
- **Architectural Separation:** The 3-layer knowledge architecture (Career Journal narrative, Engineering Case Studies, Canonical Evidence) is maintained through stable foreign key references rather than document amalgamation.
- **Strict Confidentiality:** Employer-proprietary systems (`proj-vm-copy`, `proj-curriculum-etl`, `proj-item-bank`) are marked `PROPRIETARY_RESTRICTED` with zero leakage of private repository URLs, internal prompts, or company infrastructure.

---

## 2. Architectural Separation Model

The portfolio architecture strictly separates three complementary knowledge tiers:

```
+----------------------------------------------------------------------------------------------------+
|                                    LAYER A: CAREER JOURNAL                                         |
|  23 Grounded Chapters (data/canonical/journalChapters.ts via data/adapters/journalAdapter.ts)     |
|  • Chronological career journey, mathematical foundations, pedagogy, workflow bottlenecks,        |
|    transitions into AI engineering, and retrospective personal reflections.                       |
+----------------------------------------------------------------------------------------------------+
                                      |                       ^
                 Linked via Chapter IDs (e.g. 'ch-11', 'ch-18')|
                                      v                       |
+----------------------------------------------------------------------------------------------------+
|                                LAYER B: ENGINEERING CASE STUDIES                                   |
|  Dedicated Case Study Collection (data/canonical/engineeringCaseStudies.ts)                        |
|  • Technical incidents, unexpected runtime behaviors, debugging workflows, hypotheses testing,    |
|    root causes, code-level resolutions, ADRs, verification suites, limitations, and lessons.       |
+----------------------------------------------------------------------------------------------------+
                                      |
       Linked via Project, Career, Claim, and Evidence IDs (e.g. 'proj-vm-copy', 'CLAIM-EDA-001')
                                      v
+----------------------------------------------------------------------------------------------------+
|                                   LAYER C: CANONICAL EVIDENCE                                      |
|  Accepted Phase 1 Data Foundation (data/canonical/canonicalRegistry.ts)                            |
|  • Canonical career records (7), project records (12), technical claims (13), evidence records (17)|
|  • Authoritative source of career dates, IP ownership, publication eligibility, and metrics.       |
+----------------------------------------------------------------------------------------------------+
```

### Invariants Maintained
1. **Narrative Integrity:** The career journal remains a readable chronological story.
2. **Technical Substance:** Engineering depth, failure modes, and debugging rigor live inside the dedicated case studies collection.
3. **Factual Authority:** Neither the journal nor the case studies can contradict canonical career chronology, project ownership, or governed metrics.

---

## 3. Forensic Discovery & Source Evidence Audit

Before authoring, a forensic audit was conducted across repository artifacts, project analyses, and test harnesses:

| Project Candidate | Inspected Sources | Verifiable Forensic Evidence | Selected Classification |
|---|---|---|---|
| **Ask Aadil (Voice)** | `lib/rag/voice/speechToTextProvider.ts`<br>`scripts/test_conversational_voice.ts` | Complete code for `assembleSpeechTranscript`; W3C `SpeechRecognitionResultList` analysis; 47 automated tests for prefix reconciliation and VAD single-turn submission. | `FULLY_DOCUMENTED` |
| **EDA CAD** | `research/project-analysis/engineering-design-automation/`<br>`data/canonical/canonicalRegistry.ts` | 424 pytests across 28 suites; ADRs 01–04; `ShaftTorsionSolver` closed-form equations; `MaterialKnowledgeBase` fail-fast gate; $0.0000\%$ volume calculation error. | `FULLY_DOCUMENTED` |
| **VM Copy** | `research/project-analysis/vm-copy/`<br>`lib/eval-layer.ts`<br>`app/api/generate/route.ts` | Real code for `evaluateDeterministic` and `calculateBatches`; failure mode taxonomy for serverless timeouts and distractor collisions; Tier-1 in-memory regex/AST gate. | `FULLY_DOCUMENTED`<br>*(Proprietary)* |
| **AI Reliability** | `research/project-analysis/ai-application-reliability/`<br>`data/canonical/canonicalRegistry.ts` | 158 collected pytests + 47 Playwright tests; ADRs 01–05; Fisher Information covariance matrix uncertainty gate; `ChangeAuthorizationService` cryptographic tokens. | `FULLY_DOCUMENTED` |
| **Solace AI** | `data/canonical/canonicalRegistry.ts`<br>`research/project-analysis/` | 52 backend pytests + 50 mobile Jest checks; external repo `aadil-lang/solace-ai`; ephemeral audio buffer purging. No physical Android hardware execution traces. | `PARTIALLY_DOCUMENTED` |
| **Curriculum ETL** | `research/project-analysis/curriculum-etl/` | Contemporaneous commits (`1c8ad37`, `e36541c`); `apply_row_guards` enforcing `DRAFT_ALWAYS_BLANK_COLUMNS`; `TransformationReviewer` hierarchy depth recovery. | `FULLY_DOCUMENTED`<br>*(Proprietary)* |
| **US Math Item Bank** | `research/project-analysis/math-item-bank/`<br>`data/canonical/canonicalRegistry.ts` | Delineated personal contribution (SVG vs TikZ visual domain routing, compile gates, Min/Max Swap); collaborative team system; unexecuted in local workspace. | `PARTIALLY_DOCUMENTED`<br>*(Proprietary)* |
| **DiffGuard** | `data/canonical/canonicalValidator.ts:13` | Citing "DiffGuard-grade Evidence Provenance" in comments; zero runnable code, repositories, or commits found in workspace. | `INSUFFICIENT_EVIDENCE`<br>*(Documentation Gap)* |

---

## 4. Case Study Schema & Data Model Specification

The schema is defined in `types/caseStudy.ts`:

```typescript
export type CaseStudyCategory =
  | 'STREAMING_VOICE_PIPELINE'
  | 'DETERMINISTIC_EVALUATION'
  | 'PHYSICS_CAD_SOLVER'
  | 'AGENT_GOVERNANCE_SAFETY'
  | 'CROSS_PLATFORM_MOBILE'
  | 'ETL_DATA_PIPELINE'
  | 'DOCUMENTATION_GAP'

export type DocumentationCompleteness =
  | 'FULLY_DOCUMENTED'       // Backed by accessible code, test suites, and contemporaneous design records
  | 'PARTIALLY_DOCUMENTED'   // Core decisions and test definitions verified, but full code/logs external
  | 'HISTORICAL_SUMMARY_ONLY'// Summary narrative preserved; granular debugging trace unevidenced
  | 'INSUFFICIENT_EVIDENCE'  // Missing or prospective entity; explicitly flagged as a documentation gap

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
```

---

## 5. Case Study Inventory & Technical Reconstruction

### Case Study 1: Ask Aadil — Web Speech API Streaming Transcript Duplication & Cumulative Stream Reconciliation
- **ID:** `case-study-ask-aadil-speech-transcript`
- **Project:** `proj-ask-aadil` | **Career:** `car-independent-research` | **Chapters:** `ch-21-ask-aadil`, `ch-23-synthesis`
- **Completeness:** `FULLY_DOCUMENTED` | **Visibility:** `PUBLIC`
- **Technical Problem:** In Chromium browsers, the Web Speech API (`SpeechRecognition`) dispatches cumulative provisional streaming results where `isFinal === false` callbacks prepend previously finalized words to trailing active speech. Naive string concatenation caused severe stuttering and token duplication (e.g. "Who" followed by "Who is Aadil" concatenated into "Who Who is Aadil?"). Furthermore, natural cognitive pauses during technical queries triggered premature VAD cutoffs and duplicate submissions.
- **Investigation & Hypotheses:** Analyzed `SpeechRecognitionResultList` events in Chrome DevTools. Disproved the hypothesis that `event.resultIndex` alone isolates delta tokens (Chromium re-emits cumulative phrases across indices during acoustic re-evaluation). Confirmed the hypothesis that interim results contain cumulative finalized prefixes that must be dynamically sliced off.
- **Resolution:** Implemented `assembleSpeechTranscript(eventOrResults, optResultIndex)` in `lib/rag/voice/speechToTextProvider.ts`. The algorithm segregates `finalParts` and `interimParts`, checks if `rawInterim` starts with `finalTranscript`, and slices off the duplicate prefix to isolate genuine trailing provisional speech. Added a single-turn `hasSubmitted` latch and increased VAD silence threshold to 1200ms.
- **Verification:** 47 automated assertions in `scripts/test_conversational_voice.ts` (specifically Tests 40–47 covering prefix reconciliation, legitimate repetition preservation such as "very very good", session isolation, and single-shot VAD submission).

---

### Case Study 2: EDA CAD — Deterministic Calculus vs OpenCascade BRep CAD Solid Mass Properties & Anti-Hallucination Materials Policy
- **ID:** `case-study-eda-cad-volume-materials`
- **Project:** `proj-design-automation` | **Career:** `car-independent-research` | **Chapters:** `ch-18-design-automation`
- **Claims:** `CLAIM-EDA-001`, `CLAIM-EDA-002` | **Evidence:** `EVID-EDA-01`, `EVID-EDA-02`
- **Completeness:** `FULLY_DOCUMENTED` | **Visibility:** `PUBLIC`
- **Technical Problem:** 1) LLM mechanical assistants hallucinate yield strengths when users submit ambiguous prompts ("design a steel shaft"), inventing arbitrary values between 250 MPa and 450 MPa that would cause catastrophic equipment failure; 2) Theoretical continuous sizing yields non-manufacturable diameters (e.g. 15.523 mm); 3) Potential divergence between closed-form integral calculus and OpenCascade boundary representation (BRep) solid mass property integrals.
- **Resolution:** 
  - ADR-EDA-01: Complete exclusion of LLMs from physics and math; all calculations executed by deterministic `ShaftTorsionSolver` using textbook closed-form equations.
  - ADR-EDA-02: Anti-hallucination `MaterialKnowledgeBase` enforcing fail-fast blocking (`STATUS = BLOCKED`) when generic terms like "steel" or "aluminum" lack exact alloy grades (`AISI 1045`, `S355J2`).
  - ADR-EDA-03: Discrete nominal sizing policy quantizing theoretical diameters to standard ISO metric bar stock.
  - ADR-EDA-04: Cross-validation agreement matrix asserting 100% concordance between 3D solid geometry and 2D SVG drawings.
- **Verification & Limitations:** 424 automated pytests passing across 28 test suites in containerized Docker test runner. Relative volume discrepancy check $|V_{\text{cad}} - V_{\text{theo}}| / V_{\text{theo}} \le 10^{-6}$ achieved $0.0000\%$ volume calculation error. **Mandatory Caveat:** Verified strictly as software-level mathematical agreement between analytical formulas and CAD solid mass properties; does NOT assert physical CNC machining or manufacturing tolerances.

---

### Case Study 3: VM Copy — Tier-1 Deterministic Evaluator Gate & Serverless Gateway Timeout Mitigation
- **ID:** `case-study-vm-copy-eval-layer`
- **Project:** `proj-vm-copy` | **Career:** `car-wayground-math-sme` | **Chapters:** `ch-11-generation-not-enough`, `ch-12-generation-to-evaluation`
- **Claims:** `CLAIM-VM-001` | **Evidence:** `EVID-VM-01`
- **Completeness:** `FULLY_DOCUMENTED` | **Visibility:** `EMPLOYER_PROPRIETARY_CASE_STUDY` (`PROPRIETARY_RESTRICTED`)
- **Technical Problem:** Generative LLMs frequently violated assessment invariants (outputting 3 or 5 options instead of 4, failing to designate a single Correct Answer "CA", or generating duplicate distractors). Furthermore, generating batches of 5–10 items in a single completion took >30–40 seconds, triggering Next.js and Vercel serverless gateway timeouts (15s/30s limits).
- **Resolution:**
  - ADR-VM-01: Pure TypeScript Tier-1 in-memory deterministic structural evaluator (`lib/eval-layer.ts:38-98`) executing hard structural assertions (`options.length === 4`, `|CA| === 1`, Set duplicate checks, distractor rationale validation) in under 1ms locally with $0 marginal API spend.
  - ADR-VM-02: Parallel micro-batching via `calculateBatches(numQuestions)` partitioning generation into concurrent sub-batches of 2–3 questions dispatched via `Promise.all`, dropping total latency from >35s to ~5–6s.
  - Regex un-fencing stripping ` ```json ` markdown wrappers and locating outermost braces `{}`.
- **Confidentiality & Limitations:** Project is employer-proprietary (developed during Wayground Mathematics SME employment). Internal company prompts, private repository URLs, and student data remain strictly confidential. The <1ms latency metric applies strictly to the Tier-1 in-memory regex and AST gate; upstream generative LLM inference takes ~4–8 seconds and incurs standard provider API costs.

---

### Case Study 4: AI Application Reliability — Fisher Information Covariance-Based Abstention & Cryptographic Human Authorization
- **ID:** `case-study-ai-reliability-governance`
- **Project:** `proj-ai-reliability` | **Career:** `car-independent-research` | **Chapters:** `ch-19-ai-reliability`
- **Claims:** `CLAIM-RELIABILITY-001`, `CLAIM-RELIABILITY-002` | **Evidence:** `EVID-REL-01`, `EVID-REL-02`
- **Completeness:** `FULLY_DOCUMENTED` | **Visibility:** `PUBLIC`
- **Technical Problem:** Autonomous AI coding agents exhibit dangerous overconfidence on novel or noisy stack traces, hallucinating plausible-sounding but erroneous root causes and proposing destructive code modifications. Furthermore, unconstrained agents could execute code modifications or merge pull requests autonomously without verified human review.
- **Resolution:**
  - ADR-REL-01: Real headless Chromium browser execution via Playwright capturing empirical ground truth (DOM snapshots, full-page PNGs, HAR traces).
  - ADR-REL-02: Mathematical uncertainty quantification using the empirical Fisher Information Matrix; when covariance uncertainty exceeds threshold $\epsilon_{\text{abstain}}$, the agent forces an explicit `ABSTAIN` verdict rather than speculating.
  - ADR-REL-03: Human Governance as an architectural invariant; agents have zero authority to modify code or merge PRs; all alterations require explicit role-based human approval.
  - ADR-REL-04: Cryptographic append-only provenance chain linking every tool call, diagnosis, and approval with SHA-256 hashes (`verify_provenance_chain`).
- **Verification & Limitations:** 158 collected backend test cases across `backend/tests/` (governed strictly as individual test cases, NOT 158 distinct test suite files) and 47 governance Playwright assertions across 12 pages.

---

### Case Study 5: Solace AI — Cross-Platform Real-Time Voice Streaming & Ephemeral Audio Purging
- **ID:** `case-study-solace-ai-streaming`
- **Project:** `proj-solace-ai` | **Career:** `car-independent-research` | **Chapters:** `ch-22-solace-ai`
- **Claims:** `CLAIM-SOLACE-001`, `CLAIM-SOLACE-002` | **Evidence:** `EVID-SOLACE-01`, `EVID-SOLACE-02`
- **Completeness:** `PARTIALLY_DOCUMENTED` | **Visibility:** `PUBLIC`
- **Technical Problem:** Handling bidirectional streaming audio and emotional support dialogue in a mobile voice companion required low-latency audio transmission while preventing audio retention or privacy leaks on sensitive personal wellness conversations.
- **Resolution:** Ephemeral audio streaming pipeline processing raw audio purely in-memory and purging audio bytes immediately upon turn completion. Implemented deterministic crisis intervention routing that bypasses generative LLMs when acute self-harm risk keywords are detected.
- **Verification & Limitations:** 52 backend pytests across 8 suites and 50 mobile verification checks across 7 React Native Jest suites with 0 TypeScript compiler errors. **Mandatory Caveat:** Mobile checks were verified strictly in React Native Jest test runners and static compiler (`tsc --noEmit`); they do NOT represent automated execution on physical Android device hardware or emulators.

---

### Case Study 6: Curriculum ETL — Multi-Tier Extraction Integrity Gates & Column Over-Extraction Guarding
- **ID:** `case-study-curriculum-etl-guards`
- **Project:** `proj-curriculum-etl` | **Career:** `car-wayground-aiml` | **Chapters:** `ch-15-curriculum-etl`
- **Claims:** `CLAIM-ETL-001` | **Evidence:** `EVID-ETL-01`
- **Completeness:** `FULLY_DOCUMENTED` | **Visibility:** `EMPLOYER_PROPRIETARY_CASE_STUDY` (`PROPRIETARY_RESTRICTED`)
- **Technical Problem:** In LLM-assisted curriculum document parsing, models exhibited chronic over-extraction into reserved blank schema columns (e.g. hallucinating legacy codes into `czi_standard_code` meant to remain blank in initial drafts) and hierarchy depth truncation where nested standards were collapsed into flat unstructured text.
- **Resolution:** Implemented `apply_row_guards` in `schemas.py` enforcing `DRAFT_ALWAYS_BLANK_COLUMNS` by programmatically zeroing out reserved columns post-extraction; implemented `TransformationReviewer` in `validation/reviewer.py` to reconstruct parent-child hierarchy continuity; added a dead-letter review queue (`manual_review.json`) capturing unresolvable discrepancies without corrupting production CSV exports.
- **Confidentiality:** Employer-proprietary system. Internal datasets, private repository URLs, and proprietary taxonomy mappings remain strictly confidential.

---

### Case Study 7: US Mathematics Item Bank — Visual Domain Routing & Curriculum Balancing
- **ID:** `case-study-item-bank-domain-routing`
- **Project:** `proj-item-bank` | **Career:** `car-wayground-aiml` | **Chapters:** `ch-14-applications-to-pipelines`
- **Evidence:** `EVID-SRC-PROJECTS-01`
- **Completeness:** `PARTIALLY_DOCUMENTED` | **Visibility:** `EMPLOYER_PROPRIETARY_CASE_STUDY` (`PROPRIETARY_RESTRICTED`)
- **Technical Problem:** In collaborative assessment authoring across 10,000+ items, using a single rendering engine produced severe visual distortions (TikZ struggled with interactive web SVG scaling, while SVG struggled with exact statistical plots). Furthermore, generative pipelines skewed towards common curriculum standards, producing severe imbalances across state grade standards.
- **Resolution & Contribution Scope:** Candidate contributed visual domain routing logic directing coordinate geometry to SVG and algebra/calculus to TikZ with compile validation gates, and applied Min/Max Swap optimization across candidate pools to restore balanced standard distributions.
- **Attribution & Limitations:** Collaborative team engineering system within Wayground. The candidate contributed specific modules; the underlying core platform was built by the Wayground engineering team. Full codebase is enterprise-internal and unexecutable in this portfolio repository.

---

### Case Study 8: Documentation Gap Record — DiffGuard Governance Standard
- **ID:** `case-study-gap-diffguard`
- **Project:** `null` | **Career:** `[]` | **Chapters:** `[]` | **Claims:** `[]` | **Evidence:** `[]`
- **Category:** `DOCUMENTATION_GAP` | **Completeness:** `INSUFFICIENT_EVIDENCE` | **Visibility:** `INTERNAL_AUDIT`
- **Technical Problem:** DiffGuard was cited in auditing rubrics and validator comments (`"Standard: DiffGuard-grade Evidence Provenance & Canonical Schema Invariants"` in `data/canonical/canonicalValidator.ts:13`) as a potential candidate for investigation.
- **Investigation Finding:** Forensic search across all repository files, git commit trees, and package references revealed that DiffGuard does NOT exist as an independent runnable project, local repository, or registered canonical project record within this workspace.
- **Resolution & Epistemic Honesty:** Recorded strictly as an explicit documentation gap with `documentationCompleteness = INSUFFICIENT_EVIDENCE`. In accordance with Phase 2.5A governance rules, missing technical details remain explicitly unknown and unevidenced. Zero incidents, symptoms, root causes, or tests were fabricated.

---

## 6. Canonical Grounding & Entity Linkage Matrix

Every non-gap case study links to accepted Phase 1 canonical records and grounded journal chapters:

| Case Study ID | Project ID | Career IDs | Journal Chapter IDs | Claim IDs | Evidence IDs | Completeness |
|---|---|---|---|---|---|---|
| `case-study-ask-aadil-speech-transcript` | `proj-ask-aadil` | `car-independent-research` | `ch-21-ask-aadil`<br>`ch-23-synthesis` | `CLAIM-ASK-001`<br>`CLAIM-ASK-002` | `EVID-ASK-01` | `FULLY_DOCUMENTED` |
| `case-study-eda-cad-volume-materials` | `proj-design-automation` | `car-independent-research` | `ch-18-design-automation` | `CLAIM-EDA-001`<br>`CLAIM-EDA-002` | `EVID-EDA-01`<br>`EVID-EDA-02` | `FULLY_DOCUMENTED` |
| `case-study-vm-copy-eval-layer` | `proj-vm-copy` | `car-wayground-math-sme` | `ch-11-generation-not-enough`<br>`ch-12-generation-to-evaluation` | `CLAIM-VM-001` | `EVID-VM-01` | `FULLY_DOCUMENTED` |
| `case-study-ai-reliability-governance` | `proj-ai-reliability` | `car-independent-research` | `ch-19-ai-reliability` | `CLAIM-RELIABILITY-001`<br>`CLAIM-RELIABILITY-002` | `EVID-REL-01`<br>`EVID-REL-02` | `FULLY_DOCUMENTED` |
| `case-study-solace-ai-streaming` | `proj-solace-ai` | `car-independent-research` | `ch-22-solace-ai` | `CLAIM-SOLACE-001`<br>`CLAIM-SOLACE-002` | `EVID-SOLACE-01`<br>`EVID-SOLACE-02` | `PARTIALLY_DOCUMENTED` |
| `case-study-curriculum-etl-guards` | `proj-curriculum-etl` | `car-wayground-aiml` | `ch-15-curriculum-etl` | `CLAIM-ETL-001` | `EVID-ETL-01` | `FULLY_DOCUMENTED` |
| `case-study-item-bank-domain-routing` | `proj-item-bank` | `car-wayground-aiml` | `ch-14-applications-to-pipelines` | *(None)* | `EVID-SRC-PROJECTS-01` | `PARTIALLY_DOCUMENTED` |
| `case-study-gap-diffguard` | `null` | *(None)* | *(None)* | *(None)* | *(None)* | `INSUFFICIENT_EVIDENCE` |

### Integrity Verification
- **Project IDs:** 100% resolve in `canonicalRegistry.projectRecords` (or `null` for gap record).
- **Career IDs:** 100% resolve in `canonicalRegistry.careerRecords`.
- **Journal Chapter IDs:** 100% resolve in `canonicalJournalChapters`.
- **Claim IDs:** 100% resolve in `canonicalRegistry.claimRecords`.
- **Evidence IDs:** 100% resolve in `canonicalRegistry.evidenceRecords`.
- **Dangling IDs:** Exactly 0.

---

## 7. Confidentiality & Publication Governance

The adapter (`data/adapters/engineeringCaseStudyAdapter.ts`) and registry enforce strict confidentiality safeguards:

1. **Employer-Proprietary Projects:**
   - `proj-vm-copy`, `proj-curriculum-etl`, and `proj-item-bank` are strictly classified as `EMPLOYER_PROPRIETARY_CASE_STUDY` with `publicationStatus = PROPRIETARY_RESTRICTED`.
   - The adapter's `getPublicCaseStudies()` automatically excludes proprietary entries, ensuring they cannot be returned in public endpoints without appropriate redaction.
2. **Zero Proprietary URL Leakage:**
   - Automated regex scanning across all case study content confirms **0 private corporate GitHub repository URLs** (e.g. `github.com/wayground/...` or `github.com/quizizz/...`).
   - Private repository links are replaced with canonical case study routes (e.g. `/projects/vm-copy`, `/projects/us-mathematics-item-bank`).
3. **Fail-Closed Default:**
   - Any case study with ambiguous publication eligibility defaults to `PROPRIETARY_RESTRICTED`.

---

## 8. Dedicated Case Study Test Suite Breakdown

The dedicated test suite (`scripts/test_engineering_case_studies.ts`) executed 35 assertions across 7 suites with 100% pass rate:

```
====================================================================
  PHASE 2.5A: ENGINEERING CASE STUDY REGRESSION & AUDIT SUITE       
====================================================================

--- SUITE 1: Schema Integrity, Completeness Classification & ID Uniqueness ---
✓ [Suite 1] Collection contains populated case studies: Found 8 entries
✓ [Suite 1] All case study IDs are unique: 8 IDs, 8 unique
✓ [Suite 1] Every case study possesses all required schema fields
✓ [Suite 1] Documentation completeness levels reflect authentic source availability: FULL=5, PARTIAL=2, INSUFFICIENT=1

--- SUITE 2: Canonical Reference Resolution ---
✓ [Suite 2] validateAllCaseStudies reports valid with 0 canonical errors
✓ [Suite 2] All non-null projectIds resolve in canonicalRegistry.projectRecords (7/7)
✓ [Suite 2] All careerIds resolve in canonicalRegistry.careerRecords (7/7)
✓ [Suite 2] All journalChapterIds resolve in canonicalJournalChapters (9/9)
✓ [Suite 2] All claimIds resolve in canonicalRegistry.claimRecords (10/10)
✓ [Suite 2] All evidenceIds resolve in canonicalRegistry.evidenceRecords (10/10)

--- SUITE 3: Technical Authenticity, Incident Grounding & Zero Fabrication ---
✓ [Suite 3] Ask Aadil speech documents real assembleSpeechTranscript in speechToTextProvider.ts
✓ [Suite 3] Ask Aadil speech cites exact W3C resultIndex / cumulative stream investigation
✓ [Suite 3] EDA CAD documents real ShaftTorsionSolver and MaterialKnowledgeBase
✓ [Suite 3] EDA CAD documents fail-fast blocking on generic material terms (STATUS = BLOCKED)
✓ [Suite 3] VM Copy documents real lib/eval-layer.ts and calculateBatches
✓ [Suite 3] VM Copy documents serverless timeout root cause and micro-batching fix
✓ [Suite 4] AI Reliability documents real Fisher Information covariance abstention
✓ [Suite 3] DiffGuard is explicitly recorded as an unevidenced documentation gap (INSUFFICIENT_EVIDENCE)
✓ [Suite 3] DiffGuard gap record strictly abstains from inventing fake incidents or code

--- SUITE 4: Metric Qualification, Scope Disclosures & Governance Invariants ---
✓ [Suite 4] EDA CAD explicitly caveats volume error vs physical CNC machining
✓ [Suite 4] VM Copy qualifies <1ms metric strictly to Tier-1 in-memory regex/AST gate
✓ [Suite 4] AI Reliability specifies 158 as collected test cases, not test suites
✓ [Suite 4] Solace AI caveats mobile checks vs physical Android device hardware

--- SUITE 5: Attribution, Ownership & Collaborative Integrity ---
✓ [Suite 5] VM Copy preserves EMPLOYER_PROPRIETARY IP ownership
✓ [Suite 5] VM Copy links strictly to car-wayground-math-sme career ID
✓ [Suite 5] Curriculum ETL preserves EMPLOYER_PROPRIETARY and car-wayground-aiml association
✓ [Suite 5] Item Bank preserves collaborative team attribution and specific personal scope

--- SUITE 6: Confidentiality & Publication Boundary Enforcement ---
✓ [Suite 6] Proprietary case studies enforce PROPRIETARY_RESTRICTED publication status
✓ [Suite 6] Zero private corporate GitHub repository URLs across all case studies

--- SUITE 7: Adapter API & Resolution Projection Functions ---
✓ [Suite 7] getAllCaseStudies returns complete collection (8 entries)
✓ [Suite 7] getCaseStudiesByProject returns EDA CAD case study
✓ [Suite 7] getCaseStudiesByCareer returns VM Copy case study
✓ [Suite 7] getCaseStudiesByJournalChapter returns Ask Aadil speech case study
✓ [Suite 7] getPublicCaseStudies excludes proprietary restricted case studies (4 public, 0 proprietary leaks)
✓ [Suite 7] getResolvedCaseStudy resolves canonical project, career, claim, and evidence records

====================================================================
TOTAL ASSERTIONS: 35 | PASSED: 35 | FAILED: 0 | SUCCESS: 100.0%
====================================================================
```

---

## 9. Full System Regression Verification Matrix

To ensure that introducing the engineering case study collection caused zero regressions across earlier migrations, the entire suite of automated regression tests was executed:

| Test Harness Script | Phase Target | Assertions | Result | Notes |
|---|---|---|---|---|
| `scripts/test_engineering_case_studies.ts` | Phase 2.5A | 35 / 35 | **PASS** | Case study schema, canonical resolution, zero fabrication, confidentiality. |
| `scripts/test_journal_grounding.ts` | Phase 2.4 | 105 / 105 | **PASS** | 23 career journal chapters remain 100% intact, grounded, and verified. |
| `scripts/test_journal_remediation.ts` | Remediation | 74 / 74 | **PASS** | Spreads, accessibility, deep links, and OCR inclusion verified. |
| `scripts/test_resume_migration.ts` | Phase 2.3 | 91 / 91 | **PASS** | Resume projections, dates, PDF synchronization intact. |
| `scripts/test_projects_migration.ts` | Phase 2.2 | 156 / 156 | **PASS** | Projects adapter, public contracts, ownership, metadata intact. |
| `scripts/test_experience_migration.ts` | Phase 2.1 | 51 / 51 | **PASS** | Career timeline, role dates, employment types intact. |
| `scripts/test_canonical_registry.ts` | Phase 1.0–1.4 | 96 / 96 | **PASS** | Schema validators, Gregorian dates, IP restrictions intact. |
| `scripts/test_recruiter_quick_view.ts` | Recruiter View | 42 / 42 | **PASS** | Recruiter summary, flagship systems, privacy intact. |
| `npx tsc --noEmit` | Type Check | 0 errors | **PASS** | Clean static compilation across entire TypeScript codebase. |
| **TOTAL** | | **650 / 650** | **PASS (100%)** | **Zero failures across all test suites.** |

---

## 10. Documentation Gaps & Limitations Analysis

In accordance with Section 11 of the governing prompt, all technical limitations and documentation gaps are formally disclosed:

1. **DiffGuard (Documentation Gap):**
   - DiffGuard is referenced as an audit standard in validator comments (`data/canonical/canonicalValidator.ts:13`), but no independent source repository, commit history, or deployment artifact exists in this workspace.
   - It is cataloged explicitly as `INSUFFICIENT_EVIDENCE` with zero fabricated code, symptoms, or tests.
2. **Solace AI (Physical Hardware Execution Boundary):**
   - Verified via 52 backend pytests and 50 mobile Jest component checks with 0 TypeScript compiler errors.
   - Automated tests were executed inside Jest test runners and Node runtimes; they do NOT assert execution on physical Android mobile devices or hardware emulators.
3. **Item Bank & Curriculum ETL (Enterprise Pipeline Boundaries):**
   - Both systems were developed within Wayground enterprise environments.
   - Case studies document candidate-authored modules and high-level architecture; core company repositories remain internal and unexecutable in this public portfolio repository.
4. **EDA CAD Volume Discrepancy Scope:**
   - The 0.0000% volume error represents software-level mathematical agreement between analytical closed-form equations and OpenCascade CAD solid kernel mass integrals.
   - It does NOT assert physical CNC machining or manufacturing tolerances.
5. **VM Copy <1ms Latency Scope:**
   - Applies strictly to the Tier-1 in-memory regex and AST gate (`lib/eval-layer.ts`); upstream generative LLM inference takes ~4–8 seconds and incurs standard provider API costs.

---

## 11. Migration Artifacts Inventory

### Authorized Files Created
1. `types/caseStudy.ts` — TypeScript definitions for engineering case study schema, categories, completeness levels, evidence statuses, and visibility.
2. `data/canonical/engineeringCaseStudies.ts` — Authoritative registry containing 8 verified engineering case studies and documentation gap records.
3. `data/adapters/engineeringCaseStudyAdapter.ts` — Pure functional adapter providing entity resolution, filtering, and canonical validation helpers.
4. `scripts/test_engineering_case_studies.ts` — Dedicated 35-assertion adversarial test harness.
5. `research/audits/reconciliation/PHASE_2_5A_ENGINEERING_CASE_STUDY_REPORT.md` — This comprehensive implementation and verification report.

### Untouched Protected Files
- `data/canonical/journalChapters.ts` — **100% UNTOUCHED** (all 23 career journal chapters remain in their accepted Phase 2.4 state).
- `data/canonical/canonicalRegistry.ts` — **100% UNTOUCHED** (canonical career, project, claim, and evidence records remain frozen).
- `data/canonical/canonicalSchema.ts` — **100% UNTOUCHED**.
- `data/canonical/canonicalValidator.ts` — **100% UNTOUCHED**.
- `data/adapters/experienceAdapter.ts` — **100% UNTOUCHED**.
- `data/adapters/projectsAdapter.ts` — **100% UNTOUCHED**.
- `data/adapters/resumeAdapter.ts` — **100% UNTOUCHED**.
- `data/adapters/journalAdapter.ts` — **100% UNTOUCHED**.
- `lib/rag/` — **100% UNTOUCHED** during this phase.

---

## 12. Non-Regression Invariant Declarations

I formally certify:
1. **Career Narrative Preservation:** The 23 historical journal chapters remain completely unchanged. No career narratives have been converted into debugging logs or incident reports.
2. **Canonical Data Integrity:** No canonical career, project, claim, or evidence records were altered, mutated, or deleted.
3. **No Fictionalization:** All documented incidents, symptoms, investigations, and fixes correspond directly to authentic codebase artifacts, commit records, or test definitions.
4. **Git State Policy:** No Git commits, pushes, resets, cleans, stashes, or branch changes were performed.

---

## 13. Phase Gate Status Declarations

In strict adherence to Section 11 of the Phase 2.5A authorization instructions:

- [x] **Phase 2.4 remains accepted and unchanged.**
- [x] **Phase 2.5 RAG migration has not started.**
- [x] **Phase 2.6 has not started.**

---

## 14. Final Verdict

# `PASS — PHASE 2.5A ENGINEERING CASE STUDIES ACCEPTED`

The engineering case study collection is established, fully grounded, cleanly separated from the chronological career journal, verified across 35 dedicated assertions and 615 regression checks, and ready for future technical deep dives and RAG ingestion.
