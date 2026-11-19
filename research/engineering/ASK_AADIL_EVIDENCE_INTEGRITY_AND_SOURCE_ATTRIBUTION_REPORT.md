# Ask Aadil — Evidence Integrity, Source Attribution & Claims Audit Report

**Audit Mode:** Evidence-Driven Read-Only Investigation  
**Date:** November 19, 2026  
**Auditor Roles:** Principal RAG Auditor, AI Reliability Engineer, Evidence Provenance Specialist, Application QA Architect  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio\`  
**Target Architecture:** Ask Aadil RAG Agent, Canonical Registry, Source Adapters, Tool Dispatchers, Synthesizers  
**Baseline HEAD:** `f0613c85201053670eb2cee3aaad5e2af2fee336`  

---

## 1. Executive Summary

This investigation conducted a systematic, end-to-end audit of Ask Aadil’s factual claims, evidence provenance, repository references, quantitative metrics, and source-attribution mechanisms across the codebase and runtime execution paths.

### Primary Audit Verdict: CRITICAL REMEDIATION REQUIRED (P0/P1 Defects Identified)
While Ask Aadil possesses sophisticated canonical schema adapters and multi-source guardrails, the audit discovered several high-severity failure modes where the agent actively misleads visitors, cites non-existent repositories, conflates distinct engineering systems, and emits conflicting career chronologies:

1. **Non-Existent & Proprietary Repository Citations (P0):**
   - The agent hardcodes and presents public GitHub URLs for employer-proprietary projects where public source code is strictly prohibited by canonical governance.
   - For `vm-copy` (an internal Wayground system with `publicUrl: null`), `askAadilAgent.ts` cites and emits `https://github.com/aadilkhurshid/vm-copy-generator` alongside claims of 28 Vitest tests, and `githubAdapter.ts` registers this fictitious public repo.
   - In navigational tool queries (`What is the GitHub URL for VM Copy?`), the tool silently falls back to emitting Aadil's primary profile URL (`https://github.com/aadil-lang`) under the misleading label *"Navigating to verified GitHub destination"*.
2. **Project Conflation: Loom AI vs. Engineering Design Automation (P0):**
   - In both `askAadilAgent.ts` (L2750–2754) and `answerSynthesizer.ts` (L112–116), **Loom AI** (a B2B textile marketplace platform built with Next.js/MongoDB/Express) is explicitly conflated with **Engineering Design Automation (EDA CAD)** (an industrial 3D mechanical shaft design engine).
   - The system outputs: `**Solace AI** and **Loom AI (Engineering Design Automation)**` and claims Loom AI enforces FreeCAD execution sandboxes and has `424 tests across 28 test suites`.
3. **Chronological & Deployment Contradiction in VM Copy (P1):**
   - While `data/canonical/canonicalRegistry.ts` and recent remediation establish that VM Copy was conceived in October–November 2025 during the Mathematics SME role with unevidenced corporate deployment, `askAadilAgent.ts` (L3386, L3406, L3410) hardcodes:
     - `Timeline: Conceived and deployed at Wayground in 2024`
     - `Built between April and September 2024`
     - `Deployed into production, reducing question authoring time from hours to minutes`
4. **Triple GitHub Handle Divergence & Repository Naming Inconsistencies (P1):**
   - Three distinct usernames appear across production and adapter code: `aadil-lang`, `aadilkhurshid`, and `aadil-khurshid`.
   - `projectsMetadata.ts` and `canonicalRegistry.ts` point to `aadil-lang`, whereas `githubAdapter.ts` points 5 out of 9 repos to `aadilkhurshid`, and `navigationTools.ts` hardcodes `aadil-khurshid/Atlas-AI`.
   - Repository slugs disagree: `OCR-benchmark-evaluator` (Canonical) vs. `OCR-Evaluator` (Adapter), `Atlas-AI` vs. `atlas-ai-finance`, `loom-ai` vs. `loom-ai-b2b`.
5. **Metric Inflation & Scope Misrepresentation (P1/P2):**
   - `quantitativeClaims.ts` and `projectsAdapter.ts` repeatedly describe AI Reliability as having **"158 backend test suites"**, when the underlying canonical evidence records (`EVID-REL-01`) explicitly limit this to **158 test cases across 8 suites** (a 20x terminology inflation).
   - `askAadilAgent.ts` (L2971) asserts that VM Copy executes in **"under 0ms latency"** (a physical impossibility / syntax artifact).
   - Solace AI mobile verification is claimed in `experienceAdapter.ts` to be verified on an Android APK on Pixel 7 emulator, directly contradicting canonical registry record `EVID-SOLACE-02` which discloses it was run in Jest on Node.js and *"Does NOT represent physical Android device or hardware emulator execution"*.

---

## 2. Files and Modules Inspected

The following modules, registries, and data stores were audited:

| Module / File Path | Role in Architecture |
| :--- | :--- |
| `lib/rag/askAadilAgent.ts` | Primary state machine, intent dispatcher, and direct response synthesis |
| `lib/rag/sources/githubAdapter.ts` | Technical implementation evidence, test counts, and GitHub repo metadata |
| `lib/rag/sources/linkedinAdapter.ts` | 3-state live API integration and career status provider |
| `lib/rag/canonicalRAGAdapter.ts` | Canonical registry chunk projection, hash computation, and confidentiality sanitizer |
| `lib/rag/synthesizer/answerSynthesizer.ts` | Fallback template synthesizer and multi-project comparative answer generator |
| `lib/rag/synthesizer/llmAnswerSynthesizer.ts` | Generative LLM prompt assembler and grounded response verifier |
| `lib/rag/intentRouter.ts` | Deterministic intent classification and source authority mapping |
| `lib/rag/tools/navigationTools.ts` | External URL navigation tool (`github.open`, `linkedin.open`) |
| `lib/rag/tools/portfolioTools.ts` | Portfolio layer navigation tools |
| `data/canonical/canonicalRegistry.ts` | Central source of truth (12 projects, 7 careers, 13 claims, 17 evidence records) |
| `data/canonical/sourceAuthority.ts` | Intent-to-source priority matrix and strict epistemological rules |
| `data/canonical/quantitativeClaims.ts` | Fast-path quantitative claim registry (13 metrics) |
| `data/canonical/projectsMetadata.ts` | Project metadata, technologies, and external reference registry |
| `data/canonical/sourceConflicts.ts` | Documented historical source discrepancies |
| `data/adapters/projectsAdapter.ts` | Systems catalog projection adapter |
| `data/adapters/experienceAdapter.ts` | Timeline chronology projection adapter |
| `data/verification/evidenceRegistry.ts` | Secondary evidence and verification mapping |
| `data/comparison/projectComparisons.ts` | Side-by-side architectural comparison specifications |

---

## 3. Complete Claims Registry Inventory

### 3.1 Inventory of `claims.push()` in `lib/rag/askAadilAgent.ts`
A total of **58 `claims.push()` invocations** exist across `lib/rag/askAadilAgent.ts`. Breakdown by `sourceType`:
- `portfolio`: 32 claims
- `resume`: 11 claims
- `github`: 6 claims
- `linkedin`: 3 claims
- `structured_profile`: 3 claims
- `code_evidence`: 1 claim
- `quantitative_claim`: 1 claim
- `dynamic / unknown`: 1 claim

#### Full Claims Itemization & Integrity Analysis

| # | Line | `sourceType` | Claim Text | Reference / URL | Verification & Integrity Analysis |
|:---|:---|:---|:---|:---|:---|
| 1 | 1213 | `linkedin` | Live LinkedIn API integration is marked api_unavailable; does not mean no current job | `lib/rag/sources/linkedinAdapter.ts` | **Valid.** Accurately reflects 3-state adapter behavior. |
| 2 | 1250 | `linkedin` | Live LinkedIn adapter reports no active current position (current_position: null) | `lib/rag/sources/linkedinAdapter.ts` | **Valid.** Grounded in adapter state. |
| 3 | 1289 | `linkedin` | Live LinkedIn adapter confirms current position: ${pos.title} at ${pos.company} | `lib/rag/sources/linkedinAdapter.ts` | **Valid.** Dynamic variable injection based on live state. |
| 4 | 1436 | `resume` | Aadil does not currently work at Wayground; formal tenure concluded in July 2026 | `data/canonical/resumeData.ts` | **Valid.** Matches canonical departure date. |
| 5 | 1476 | `portfolio` | Absence of a current corporate employer must never be converted into an unemployment claim | `Journal Chapter 10` | **Valid.** Core epistemic safety rule. |
| 6 | 1521 | `resume` | No current corporate employer is verified after July 2026; latest corporate tenure was Wayground (Jan–Jul 2026) | `data/canonical/resumeData.ts` | **Valid.** Grounded in resume chronology. |
| 7 | 1563 | `resume` | Aadil's most recent role was AI Engineer / Consultant at Wayground (Jan 2026 – Jul 2026) | `data/canonical/resumeData.ts` | **Valid.** Canonical title and date. |
| 8 | 1608 | `portfolio` | Concluded formal Wayground AI/ML tenure in July 2026; ongoing research into verification boundaries | `Journal Chapter 10` | **Valid.** Grounded in Journal Ch. 10. |
| 9 | 1726 | `resume` | Aadil was in the Subject Matter Expert — Mathematics role for exactly 2 years (24 months, January 2024 – December 2025) | `data/canonical/resumeData.ts` | **Valid.** Canonical SME duration. |
| 10 | 1764 | `resume` | September 2022 marks conclusion of Digiplus tenure and transition to independent quantitative discipline | `data/canonical/canonicalRegistry.ts` | **Valid.** Corrects legacy August 2022 erratum. |
| 11 | 1799 | `portfolio` | Formal Wayground tenure concluded July 2026; subsequent activity is independent AI systems research and engineering | `Journal Chapter 10` | **Valid.** Grounded in Journal Ch. 10. |
| 12 | 1838 | `resume` | Aadil did not work at Wayground in 2022; joined in January 2024 as Mathematics SME and transitioned to AI/ML team in January 2026 | `data/canonical/resumeData.ts` | **Valid.** Grounded in canonical tenure intervals. |
| 13 | 1908 | `portfolio` | Formal corporate deployment of VM Copy is unevidenced; internal team usage began November 2025 during SME tenure | `data/canonical/canonicalRegistry.ts` | **Valid.** Enforces corporate deployment boundary. |
| 14 | 1949 | `resume` | Aadil did not lead a team of 50 engineers; worked as individual contributor SME and AI Engineer/Consultant | `data/canonical/resumeData.ts` | **Valid.** Anti-inflation boundary. |
| 15 | 2030 | `code_evidence` | Verified source code implementation in ${codeEvidenceItem.sourcePath} (${codeEvidenceItem.lineRange}) | `${codeEvidenceItem.sourcePath}` | **Conditionally Valid.** Depends on underlying evidence record. |
| 16 | 2090 | `quantitative_claim` | Dynamic metric from `c.claim` | `Canonical Test Runner` | **Conditionally Valid.** Ingests from quantitative claims. |
| 17 | 2138 | `portfolio` | Progression from manual mathematics content authoring (2021) through KaTeX, VM Copy deterministic evaluation, and distributed pipelines to autonomous reliability harnesses (2026) | `Timeline & 19 Journal Chapters` | **Valid.** High-level narrative progression. |
| 18 | 2187 | `portfolio` | VoyageMath was built by the Wayground engineering team; Aadil contributed SME testing, bug reports, and KaTeX rendering validation | `Canonical Project Registry (VoyageMath)` | **Valid.** Preserves team boundary. |
| 19 | 2226 | `portfolio` | US Mathematics Item Bank was built by the Wayground engineering team; Aadil contributed mathematical domain routing and two-tier evaluation gates | `Canonical Project Registry (Item Bank)` | **Valid.** Preserves team boundary. |
| 20 | 2265 | `portfolio` | Content Builder V1 was built by the Wayground engineering team; Aadil contributed SME workflow advisory and QA | `Canonical Project Registry (Content Builder)` | **Valid.** Preserves team boundary. |
| 21 | 2311 | `portfolio` | AI Worksheets was built as an internal Product POC during Aadil's AI Engineering tenure at Wayground | `Canonical Project Registry (AI Worksheets)` | **Valid.** Matches AI Engineering 2026 role. |
| 22 | 2361 | `portfolio` | Curriculum Transformation was developed as a batch processing pipeline during Aadil's AI Engineering tenure at Wayground | `Canonical Project Registry (Curriculum ETL)` | **Valid.** Internal batch ETL pipeline. |
| 23 | 2398 | `portfolio` | Solace AI was built as an independent hackathon project for the Solace Hackathon (Nov 2026) | `Canonical Project Registry (Solace AI)` | **Valid.** Confirms independent hackathon context. |
| 24 | 2438 | `portfolio` | Engineering Design Automation was developed as an independent research project in mechanical systems AI | `Canonical Project Registry (EDA)` | **Valid.** Confirms independent research. |
| 25 | 2478 | `portfolio` | OCR Evaluator was built as an independent evaluation and benchmarking platform for document extraction | `Canonical Project Registry (OCR Evaluator)` | **Valid.** Confirms independent research. |
| 26 | 2523 | `portfolio` | AI Application Reliability was built as an independent research framework for agent reliability and Playwright QA | `Canonical Project Registry (AI Reliability)` | **Valid.** Confirms independent research. |
| 27 | 2564 | `portfolio` | Ask Aadil was built as a bespoke personal portfolio RAG agent with stateful conversation and deterministic safety | `Canonical Project Registry (Ask Aadil)` | **Valid.** Confirms personal portfolio build. |
| 28 | 2601 | `portfolio` | Cartographic Journey Map was designed as an interactive SVG engineering atlas for the portfolio | `Canonical Project Registry (Journey Map)` | **Valid.** Confirms personal build. |
| 29 | 2640 | `portfolio` | Systems Archive Platform was developed as the canonical systems catalogue and case study browser | `Canonical Project Registry (Systems Archive)` | **Valid.** Confirms personal build. |
| 30 | 2692 | `portfolio` | 6 independent projects, 3 employer-proprietary systems, 3 team collaborations | `Canonical Project Registry` | **Valid.** Exact breakdown of 12 projects. |
| 31 | 2744 | `portfolio` | Solace AI is a mobile wellness companion; Loom AI / EDA is an industrial 3D CAD engine | `Systems Archive Comparative Analysis` | **DEFECT (P0).** Conflates Loom AI with EDA CAD! |
| 32 | 2784 | `portfolio` | VM Copy is a single-question evaluation engine; AI Worksheets is a full-document worksheet generator | `Systems Archive Comparative Analysis` | **Valid.** Accurate contrast. |
| 33 | 2818 | `portfolio` | Ask Aadil is a portfolio RAG agent; Atlas AI is an SEC EDGAR financial research copilot | `Systems Archive Comparative Analysis` | **Valid.** Accurate contrast. |
| 34 | 2893 | `portfolio` | Generic comparative analysis across specified projects | `data/comparison/projectComparisons.ts` | **Valid.** Generic comparison fallback. |
| 35 | 2915 | `portfolio` | Verified architectural specification for ${detectedProjectSlug} | `Systems Archive` | **Valid.** Dynamic systems reference. |
| 36 | 2935 | `portfolio` | Tier-1 deterministic TypeScript evaluator checks 4 unique options and single correct answer | `VM Copy Question Generator Architecture` | **Valid.** Accurate technical description. |
| 37 | 2942 | `github` | The deterministic evaluation runs locally without another model call | `aadilkhurshid/vm-copy-generator` (`https://github.com/aadilkhurshid/vm-copy-generator`) | **DEFECT (P0).** Cites non-existent GitHub repo for a proprietary system! |
| 38 | 2976 | `portfolio` | Deterministic closed-form physics solvers for torque, shear, and diameter sizing | `Engineering Design Automation Specification` | **Valid.** Accurate technical description. |
| 39 | 2983 | `github` | 424 automated test cases passing across 28 test suites | `aadilkhurshid/engineering-design-automation` | **DEFECT (P1).** Wrong owner (`aadilkhurshid` vs `aadil-lang`); external test suite unexecuted in this repo. |
| 40 | 2996 | `portfolio` | StateGraph LangGraph workflow with primary SEC EDGAR 10-K/10-Q/8-K parsing | `Atlas AI Specification` | **Valid.** Accurate technical description. |
| 41 | 3011 | `portfolio` | Synchronous pre-LLM crisis screening (is_crisis_input) and feature-flagged LangGraph SSE orchestration | `Solace AI Specification` | **Valid.** Accurate technical description. |
| 42 | 3018 | `github` | 52 backend pytests and 50 mobile verification checks passing with 0 TypeScript errors | `aadil-lang/solace-ai` (`https://github.com/aadil-lang/solace-ai`) | **Valid URL.** Test suite unexecuted in this repo (external). |
| 43 | 3032 | `portfolio` | Multi-tier OCR evaluation (CER/WER) with priority risk classification and image degradation testing | `OCR Evaluator Specification` | **Valid.** Accurate technical description. |
| 44 | 3039 | `github` | 134 automated backend pytests and 20 browser UI assertions passing with 0 JavaScript errors | `aadil-lang/OCR-Evaluator` | **DEFECT (P2).** Canonical repo is named `OCR-benchmark-evaluator`. |
| 45 | 3099 | `portfolio` | Frontend and evaluation engine built with Next.js 16 and TypeScript 5 | `VM Copy Systems Specification` | **Valid.** Technical stack. |
| 46 | 3106 | `github` | Portkey AI Gateway used for resilient model routing and telemetry | `aadilkhurshid/vm-copy-generator` | **DEFECT (P0).** Cites non-existent GitHub repo for a proprietary system! |
| 47 | 3140 | `portfolio` | Technology stack for ${project.title}: ${project.technologies.join(', ')} | `${project.title}` | **Valid.** Dynamic stack extraction. |
| 48 | 3221 | `portfolio` | Prompting was insufficient to guarantee assessment invariants; led to deterministic wrapper pattern | `Journal Chapter 06` | **Valid.** Grounded in Journal Ch. 06. |
| 49 | 3262 | `portfolio` | Journey began with K-12 math content creation and visual diagramming in 2021 | `Timeline 2021 // Content Developer` | **Valid.** Chronology origin. |
| 50 | 3269 | `portfolio` | Curiosity expanded: Content -> SME -> Representation -> Visuals -> Tooling -> AI -> Agents -> Reliability | `Journal TOC // The Operating Loop` | **Valid.** Narrative spine. |
| 51 | 3276 | `portfolio` | Building VM Copy at Wayground led directly to internal transition into AI/ML team in Jan 2026 | `Journal Chapter 06` | **Valid.** Causal attribution. |
| 52 | 3323 | `resume` | 4 years professional experience spanning AI engineering, backend pipelines, and math SME | `public/resume.pdf — Summary` | **Valid.** Resume summary. |
| 53 | 3328 | `resume` | AI Engineer / Consultant at Wayground (Jan 2026 – Jul 2026) | `public/resume.pdf — Wayground AI/ML Team` | **Valid.** Resume title and dates. |
| 54 | 3333 | `resume` | B.Tech (Hons.) in Mechanical Engineering from Lovely Professional University (2017) | `public/resume.pdf — Education` | **Valid.** Resume education. |
| 55 | 3385 | `portfolio` | Timeline: Conceived and deployed at Wayground in 2024 | `Timeline 2024` | **DEFECT (P0).** Direct false claim! Conceived in late 2025; corporate deployment unevidenced. |
| 56 | 3391 | `portfolio` | Journal: Prompting was insufficient to guarantee assessment invariants | `Journal Chapter 06` | **Valid.** Grounded in Journal Ch. 06. |
| 57 | 3397 | `portfolio` | Systems: In-memory TypeScript evaluator with 4 unique options and rationale check | `/projects/vm-copy` | **Valid.** Grounded in systems case study. |
| 58 | 3436 | `unknown` | Excerpt from ${chunk.metadata.source_title} | `${chunk.metadata.source_id}` | **Valid.** Dynamic retrieval fallback. |

---

## 4. Repository and URL Integrity Audit

### 4.1 Cross-Module Repository Discrepancy Matrix

| Project Slug | Canonical Registry (`data/canonical/canonicalRegistry.ts`) | Projects Adapter (`data/adapters/projectsAdapter.ts`) | GitHub Adapter (`lib/rag/sources/githubAdapter.ts`) | Navigation Tool (`lib/rag/tools/navigationTools.ts`) | Agent Hardcoded Claims (`askAadilAgent.ts`) | Status / Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`vm-copy`** | `publicUrl: null`<br>(Proprietary) | `github: null` | `owner: aadilkhurshid`<br>`repo: vm-copy-generator`<br>`url: https://github.com/aadilkhurshid/vm-copy-generator` | Falls back to `aadil-lang` profile with misleading "verified GitHub destination" message | Cites `aadilkhurshid/vm-copy-generator` on L2946, L3110, L3113, L3409 | **CRITICAL DEFECT (P0):** Fabricates public repository for proprietary system. |
| **`design-automation`** | `https://github.com/aadil-lang/Engineering-design-automation` | `github: https://github.com/aadil-lang/Engineering-design-automation`<br>`codeEvidence: https://github.com/aadilkhurshid/engineering-design-automation` | `owner: aadilkhurshid`<br>`repo: engineering-design-automation`<br>*(Key is `engineering-design-automation`, slug is `design-automation`)* | Resolves via `projectsMetadata` to `aadil-lang` | Cites `aadilkhurshid/engineering-design-automation` (L2986) | **HIGH DEFECT (P1):** Discrepancy between `aadil-lang` and `aadilkhurshid`. Adapter key mismatch causes `getGitHubRepoEvidence('design-automation')` to return `null`! |
| **`atlas-ai`** | **Missing from Canonical Registry** (Exists only as overlay) | `github: https://github.com/aadil-lang/Atlas-AI` | `owner: aadilkhurshid`<br>`repo: atlas-ai-finance`<br>`url: https://github.com/aadilkhurshid/atlas-ai-finance` | `https://github.com/aadil-khurshid/Atlas-AI`<br>*(Uses 3rd username: `aadil-khurshid`)* | L3000 cites `Atlas AI Specification` | **HIGH DEFECT (P1):** Triple username collision (`aadil-lang` vs `aadilkhurshid` vs `aadil-khurshid`) and repo name mismatch (`Atlas-AI` vs `atlas-ai-finance`). |
| **`loom-ai`** | **Missing from Canonical Registry** (Exists only as overlay) | `github: https://github.com/aadil-lang/loom-ai` | `owner: aadilkhurshid`<br>`repo: loom-ai-b2b`<br>`url: https://github.com/aadilkhurshid/loom-ai-b2b` | `https://github.com/aadilkhurshid/loom-ai-b2b` | Conflated with EDA CAD on L2750! | **HIGH DEFECT (P1):** Handle divergence and repo slug divergence (`loom-ai` vs `loom-ai-b2b`). |
| **`ai-reliability`** | `https://github.com/aadil-lang/ai-application-reliability` | `github: https://github.com/aadil-lang/ai-application-reliability`<br>`codeEvidence: https://github.com/aadilkhurshid/ai-application-reliability` | `owner: aadilkhurshid`<br>`repo: ai-application-reliability` | Resolves via `projectsMetadata` to `aadil-lang` | Dynamic | **MEDIUM DEFECT (P2):** Username divergence between `aadil-lang` (profile) and `aadilkhurshid` (codeEvidence / adapter). |
| **`ocr-evaluator`** | `https://github.com/aadil-lang/OCR-benchmark-evaluator` | `github: https://github.com/aadil-lang/OCR-benchmark-evaluator`<br>`codeEvidence: https://github.com/aadil-lang/OCR-Evaluator` | `owner: aadil-lang`<br>`repo: OCR-Evaluator` | `https://github.com/aadil-lang/OCR-Evaluator` | Cites `aadil-lang/OCR-Evaluator` (L3039) | **MEDIUM DEFECT (P2):** Repo name divergence: `OCR-benchmark-evaluator` vs `OCR-Evaluator`. |
| **`solace-ai`** | `https://github.com/aadil-lang/solace-ai` | `github: https://github.com/aadil-lang/solace-ai` | `owner: aadil-lang`<br>`repo: solace-ai` | `https://github.com/aadil-lang/solace-ai` | Cites `aadil-lang/solace-ai` | **CLEAN.** Consistent across all modules. |
| **`curriculum-etl`** | `publicUrl: null`<br>(Proprietary) | `github: null` | `owner: aadil-lang`<br>`repo: Curriculum-Transformation`<br>`url: https://github.com/aadil-lang/Curriculum-Transformation` | Resolves to null (proprietary) | Dynamic | **MEDIUM DEFECT (P2):** Exposes public repo in `githubAdapter.ts` for proprietary system. |
| **`ask-aadil`** | `publicUrl: null`<br>(Personal Proprietary) | `github: null`<br>`codeEvidence: https://github.com/aadil-lang/portfolio` | `owner: aadil-lang`<br>`repo: portfolio` | Resolves to null (proprietary) | Dynamic | **LOW DEFECT (P3):** Cites `portfolio` repo in adapter despite `github: null` designation. |

### 4.2 Legacy Handle Conflict in `sourceConflicts.ts`
File `data/canonical/sourceConflicts.ts` (lines 30–46) explicitly records this divergence as an unresolved conflict:
```typescript
{
  id: 'conflict-github-handle',
  topic: 'GitHub Account Identifier',
  claim_a: {
    claim: 'Profile links to "github.com/aadil-lang"',
    source: 'resume',
    reference: 'public/resume.pdf — Header & Curriculum-Transformation ref'
  },
  claim_b: {
    claim: 'Profile links to "github.com/aadilkhurshid"',
    source: 'portfolio',
    layer: 'system',
    reference: 'data/profile.ts & Navigation links'
  },
  status: 'needs_review',
  notes: 'Two active GitHub handles exist: "aadil-lang" holds the Curriculum-Transformation repository; "aadilkhurshid" is the primary engineering portfolio account. Both belong to Mohemmed Aadil Khurshid.'
}
```
**Audit Finding:** While `data/profile.ts` was updated to `https://github.com/aadil-lang`, `lib/rag/sources/githubAdapter.ts`, `data/adapters/projectsAdapter.ts`, `lib/rag/tools/navigationTools.ts`, and `lib/rag/askAadilAgent.ts` were never reconciled. They continue to emit `aadilkhurshid` and `aadil-khurshid` URLs, creating a split-brain citation layer.

---

## 5. Metric and Achievement Verification

### 5.1 Comprehensive Quantitative Metric Matrix

| Metric Claim | Value | Source in Codebase | Scope of Measurement | Status & Verification Assessment |
| :--- | :--- | :--- | :--- | :--- |
| **EDA Test Count** | `424 tests` across `28 suites` | `CLAIM-EDA-001`, `githubAdapter.ts:37` | Containerized OpenCascade pytest runner in external repo | **UNEXECUTED IN THIS REPO.** Exists in external test manifest. Ask Aadil misleadingly claims *"Verified directly against repository test runners"*. |
| **EDA Volume Error** | `0.0000% error` (< $10^{-6}$) | `CLAIM-EDA-002`, `askAadilAgent.ts:2994` | Analytical stepped cylinder mass integrals vs OpenCascade GProp_GProps | **PARTIALLY VERIFIED.** Valid software consistency check, but `askAadilAgent.ts` omits mandatory caveat that this is NOT physical CNC machining tolerance. |
| **Atlas AI Complete Tests** | `178 pytests` | `CLAIM-ATL-01`, `githubAdapter.ts:54` | Full LangGraph StateGraph & SEC EDGAR test matrix in external repo | **UNEXECUTED IN THIS REPO.** Legitimate external test count; requires explicit scoping as external. |
| **Atlas AI Core MVP Tests** | `59 tests` | `CLAIM-ATL-02`, `quantitativeClaims.ts:59` | Initial Telegram bot MVP test suite | **UNEXECUTED IN THIS REPO.** Accurately distinguished from 178 complete pytests. |
| **AI Reliability Test Count** | `158 test cases` + `47 governance tests` | `CLAIM-RELIABILITY-001`, `EVID-REL-01` | FastAPI failure simulation test cases and Playwright DOM checks | **METRIC INFLATION DEFECT (P1).** `quantitativeClaims.ts:74` and `projectsAdapter.ts:706` claim **"158 backend test suites"** instead of **"158 test cases across 8 suites"** (20x terminology inflation). |
| **VM Copy Evaluator Latency** | `< 1ms` (sub-millisecond) | `EVID-VM-01`, `askAadilAgent.ts:2951` | Pure in-memory TypeScript AST / Set uniqueness check | **VERIFIED WITH DEFECT (P2).** Sub-millisecond latency is legitimate for local in-memory gate, but `askAadilAgent.ts:2971` asserts **"under 0ms latency"** (physically impossible). |
| **VM Copy Vitest Count** | `28 Vitest tests` | `githubAdapter.ts:122`, `askAadilAgent.ts:3118` | In-repo test count asserted for `vm-copy-generator` | **UNSUPPORTED / FABRICATED (P0).** Cites non-existent external repo `aadilkhurshid/vm-copy-generator`. |
| **Solace AI Backend Tests** | `52 pytests` across `8 suites` | `CLAIM-SOLACE-001`, `githubAdapter.ts:165` | FastAPI LangGraph test suite in external repository | **UNEXECUTED IN THIS REPO.** Valid external test suite manifest. |
| **Solace AI Mobile Checks** | `50 Jest checks` across `7 suites` | `CLAIM-SOLACE-002`, `githubAdapter.ts:165` | React Native Jest suite + TypeScript static analysis | **CONTRADICTION DEFECT (P1).** `canonicalRegistry.ts:1315` explicitly notes: *"Does NOT represent physical Android device or hardware emulator execution"*, but `experienceAdapter.ts:563` claims *"Verified on standalone Android APK (Pixel 7 emulator, Android 16 API 36)"*. |
| **OCR Evaluator Tests** | `134 pytests` + `20 UI assertions` | `CLAIM-OCR-001`, `CLAIM-OCR-002` | Pytest backend files + Playwright headless UI assertions | **UNEXECUTED IN THIS REPO.** Valid external test suite manifest. |
| **Ask Aadil Core Hardening** | `172 checks` | `CLAIM-ASK-001`, `githubAdapter.ts:139` | 132 agent QA + 29 action governance + 11 browser E2E | **REPRODUCIBLY VERIFIED.** Executed in-repo with exit code 0. |
| **Ask Aadil Eval Assertions** | `327 assertions` across `10 scripts` | `CLAIM-ASK-002`, `quantitativeClaims.ts:114` | 10 historical evaluation scripts in `scripts/` directory | **REPRODUCIBLY VERIFIED.** Executed in-repo with exit code 0. |
| **Modern Phase 2 Assertions** | `1,509 passing assertions` | Phase 2.1 / 2.2 / Comprehensive test battery | 6 modern test scripts executed in current workspace | **REPRODUCIBLY VERIFIED.** 1,509 / 1,509 passing across all modern suites. |

---

## 6. Source Authority and Provenance Findings

### 6.1 Lifecycle Trace: Claim Registration $\rightarrow$ Synthesis $\rightarrow$ User Output
Tracing queries through the RAG pipeline reveals three structural architectural gaps:

1. **Hardcoded Bypasses of the Retrieval & Provenance Pipeline:**
   - In `lib/rag/askAadilAgent.ts`, high-frequency queries (such as technical overviews, story queries, and career questions) hit hardcoded if-else branches (e.g. L2740–2760, L2934–2974, L3100–3130, L3385–3420).
   - These branches construct custom `claims` arrays and `answer` strings on the fly, completely bypassing the retrieved canonical knowledge chunks and their associated governance metadata (caveats, visibility, authority).
   - As a result, the carefully curated constraints in `canonicalClaimRecords` (such as `prohibitedInterpretations` and `mandatoryCaveats`) are never consulted or applied during synthesis on these branches.

2. **Proprietary URL Leakage via Adapter Fallthrough:**
   - In `lib/rag/canonicalRAGAdapter.ts` (L706), the confidentiality filter checks:
     ```typescript
     if (link && link.includes('github.com') && !link.includes('aadil-lang')) {
       return false
     }
     ```
   - This regex filter was intended to block proprietary leaks, but because it only blocks links that DO NOT contain `aadil-lang`, any URL under `aadil-lang` for a proprietary project (e.g. `https://github.com/aadil-lang/Curriculum-Transformation`) passes right through.
   - Furthermore, because hardcoded branches in `askAadilAgent.ts` assemble URLs directly into markdown text (e.g. L3409), `sanitizeRetrievalEvidence()` is never called on that content.

3. **Weak / Inconsistent Evidence Selection in `githubAdapter.ts`:**
   - `lib/rag/sources/githubAdapter.ts` was written with mock repository records that assert test counts (`verifiedTestCount`), branch names, and star counts that were manually transcribed rather than dynamically ingested.
   - When the agent responds, it treats these static mock records as primary `code_evidence`, citing them as "Verified against repository test runners".

---

## 7. Citation and Response-Generation Findings

### 7.1 Detailed Analysis of Confirmed Conflations & Fabrications

#### Defect A: Conflation of Loom AI and Engineering Design Automation (P0)
- **Files & Lines:** `lib/rag/askAadilAgent.ts:2750–2754` and `lib/rag/synthesizer/answerSynthesizer.ts:112–116`.
- **Exact Generated Output:**
  > `"**Solace AI** and **Loom AI (Engineering Design Automation)** address distinct operational domains with specialized safety boundaries: ... whereas Loom AI / Design Automation is an industrial 3D CAD automation engine coupling natural language requirements with deterministic physics solvers and OpenCascade boundary representation. ... Loom AI with **424 tests across 28 test suites**."`
- **Root Cause:** A regex filter in `responseEngine.ts` (L214) and copy-pasted synthesis blocks mapped both `loom` and `design/eda` to the same template, erroneously merging the two systems into one hybrid entity.
- **Impact:** Misinforms visitors that Loom AI is a CAD system with 424 tests, completely erasing its true identity as a B2B textile procurement marketplace platform.

#### Defect B: Fictitious GitHub Repository for VM Copy (P0)
- **Files & Lines:** `lib/rag/askAadilAgent.ts:2946, 3110, 3113, 3409` and `lib/rag/sources/githubAdapter.ts:113–128`.
- **Exact Generated Output:**
  > `"**VM Copy Question Generator** is built using the following verified technologies based on its **Systems Archive** specification and **GitHub repository** (\`aadilkhurshid/vm-copy-generator\`): ... • **Test Suite:** **Vitest** with 28 automated unit tests verifying deterministic schema bounds and distractor rationales."`
  > `"• **Technical Evidence (GitHub):** Repository [aadilkhurshid/vm-copy-generator](https://github.com/aadilkhurshid/vm-copy-generator) implements the zero-cost client evaluation assertions with automated Vitest suites."`
- **Root Cause:** VM Copy was an internal proprietary tool conceived at Wayground with `publicUrl: null`. A placeholder repository was manually typed into `githubAdapter.ts` and referenced as authoritative proof in `askAadilAgent.ts`.
- **Impact:** Exposes a broken, non-existent GitHub link to recruiters and visitors while contradicting the canonical `EMPLOYER_PROPRIETARY` designation.

#### Defect C: False Chronology & Deployment Claim for VM Copy (P0)
- **Files & Lines:** `lib/rag/askAadilAgent.ts:3386, 3406, 3410`.
- **Exact Generated Output:**
  > `"• **When (Timeline):** Built between April and September 2024 during Aadil’s tenure as a Mathematics Subject Matter Expert at Wayground."`
  > `"• **Career Impact (Resume):** Deployed into production, reducing question authoring time from hours to minutes, and directly motivating Aadil’s internal transfer into the Wayground AI/ML team."`
  > `claims.push({ claim: 'Timeline: Conceived and deployed at Wayground in 2024', sourceType: 'portfolio', layer: 'timeline', reference: 'Timeline 2024' })`
- **Root Cause:** Stale legacy draft text from an early portfolio iteration was preserved inside the `cross_source` intent handler in `askAadilAgent.ts`.
- **Impact:** Directly contradicts the canonical career record (`data/canonical/canonicalRegistry.ts` L360) and Phase 2.2 remediation, claiming the system was conceived and deployed in 2024 when Aadil was purely performing math SME authoring/review.

#### Defect D: Misleading Navigation Fallback for Proprietary Projects (P1)
- **File & Lines:** `lib/rag/tools/navigationTools.ts:23–58`.
- **Behavior:** When asked for the GitHub repo of a proprietary project (e.g. `What is the GitHub URL for VM Copy?`), the tool cannot find an `externalRefs.github` URL, but instead of returning an error or explanation, it falls back to `structuredProfile.githubUrls.primary` and outputs:
  > `"Navigating to verified GitHub destination: [Open Primary GitHub Profile](https://github.com/aadil-lang)"`
- **Impact:** Misleads the user into believing Aadil's personal profile is the repository for VM Copy.

---

## 8. Adversarial Test Results

The adversarial test battery was executed against the live `askAadil` pipeline (recorded in `research/adversarial_audit_results.json`). Below are the verbatim runtime results:

```
================================================================
QUERY 1: "Show me the GitHub repository for Engineering Design Automation."
INTENT: contact
ANSWER:
Navigating to verified GitHub destination: [Open Engineering Design Automation GitHub Repository](https://github.com/aadil-lang/Engineering-design-automation)
CITATIONS: [ '[Tool: github.open]' ]
CLAIMS: None
VERDICT: PASS (Correctly routed to canonical aadil-lang repo).
================================================================

================================================================
QUERY 2: "How many automated tests does this project have?"
INTENT: technical
ANSWER:
Based on verified canonical repository test benchmarks and quantitative assertions:
• 424 automated tests passing across 28 test suites (Dockerized FastAPI pytest suite)
• 178 automated pytests validating LangGraph SEC filings (Atlas AI)
• 59 automated tests validating core graph functionality (Atlas AI MVP)
• 158 collected backend test cases across backend/tests/ (AI Reliability)
• 47 governance and Playwright E2E verification tests (AI Reliability)
• 52 automated backend pytests passing across 8 unit and LangGraph suites (Solace AI)
• 50 automated mobile verification checks passing across 7 suites (Solace AI)
• 134 automated backend pytests passing across 22 test files (OCR Evaluator)
• 20 browser UI evaluation assertions passing with 0 frontend JavaScript errors (OCR Evaluator)
CITATIONS: 5 Canonical Metric citations
CLAIMS: 1 dynamic claim
VERDICT: PARTIAL FAIL. Agent failed to resolve "this project" to Engineering Design Automation from the previous turn and dumped the entire metric registry.
================================================================

================================================================
QUERY 3: "Can you verify that all 424 tests are passing?"
INTENT: technical
ANSWER:
Verified against 28 test suites covering closed-form torsional physics, nominal shaft series selection, STEP BRep geometry generation, and SVG drawing callout cross-checks.
Documented In: portfolio (/projects/design-automation), portfolio (Spread 10 // Folio 021), resume (Personal Projects Item 1)...
*(Refer to [Verified Metric // 424 automated tests passing across 28 test suites](/projects/design-automation) for full technical details).*
CITATIONS: [ 'Canonical Metric // design-automation' ]
CLAIMS: 1 quantitative claim
VERDICT: PASS WITH QUALIFICATION. Confirms metric but fails to disclose that tests reside in an external repository unexecuted in the portfolio build.
================================================================

================================================================
QUERY 4: "Show me the source supporting this metric."
INTENT: unknown
ANSWER:
I don't have that information in Aadil's portfolio (I don't have that documented).
My knowledge is strictly grounded in Aadil's Timeline, Engineering Journal, Systems Archive, verified Resume, and GitHub repositories...
CITATIONS: [ 'Grounded Portfolio Boundary' ]
CLAIMS: None
VERDICT: FAIL (Under-answering). Agent failed to resolve "this metric" to the 424 tests from the previous turn and abstained rather than citing tests/test_cad_engine.py.
================================================================

================================================================
QUERY 5: "Did Aadil independently build this project?"
INTENT: unknown
ANSWER:
I don't have that information in Aadil's portfolio (I don't have that documented).
CITATIONS: [ 'Grounded Portfolio Boundary' ]
CLAIMS: None
VERDICT: FAIL (Under-answering). Failed to resolve "this project" and failed to state that Engineering Design Automation is an INDEPENDENT_BUILD with SOLE_IMPLEMENTER authorship.
================================================================

================================================================
QUERY 6: "Is this repository actually owned by Aadil?"
INTENT: unknown
ANSWER:
I don't have that information in Aadil's portfolio (I don't have that documented).
CITATIONS: [ 'Grounded Portfolio Boundary' ]
CLAIMS: None
VERDICT: FAIL (Under-answering). Failed to confirm repository ownership from profile and canonical records.
================================================================

================================================================
QUERY 7: "What happens if the GitHub repository is unavailable?"
INTENT: contact
ANSWER:
Navigating to verified GitHub destination: [Open Primary GitHub Profile](https://github.com/aadil-lang)
CITATIONS: [ '[Tool: github.open]' ]
CLAIMS: None
VERDICT: FAIL (Misrouting). Agent saw "GitHub repository" and triggered navigation tool instead of answering the conceptual question about offline/fallback handling.
================================================================

================================================================
QUERY 8: "Can you distinguish between a manually registered claim and independently verified evidence?"
INTENT: unknown
ANSWER:
I don't have that information in Aadil's portfolio (I don't have that documented).
CITATIONS: [ 'Grounded Portfolio Boundary' ]
CLAIMS: None
VERDICT: ACCEPTABLE ABSTENTION. Epistemic boundary preserved for self-referential prompt.
================================================================

================================================================
QUERY 9: "What is the GitHub URL for VM Copy?"
INTENT: contact
ANSWER:
Navigating to verified GitHub destination: [Open Primary GitHub Profile](https://github.com/aadil-lang)
CITATIONS: [ '[Tool: github.open]' ]
CLAIMS: None
VERDICT: FAIL (Misleading navigation). Silently fell back to primary profile with a message indicating it was navigating to the project's destination.
================================================================

================================================================
QUERY 10: "Tell me the complete story of VM Copy."
INTENT: cross_source
ANSWER:
Here is the complete cross-source story of **VM Copy Question Generator**:
• **When (Timeline):** Built between April and September 2024 during Aadil’s tenure as a Mathematics Subject Matter Expert at Wayground.
• **Technical Evidence (GitHub):** Repository [aadilkhurshid/vm-copy-generator](https://github.com/aadilkhurshid/vm-copy-generator) implements the zero-cost client evaluation assertions with automated Vitest suites.
• **Career Impact (Resume):** Deployed into production, reducing question authoring time from hours to minutes...
CLAIMS: [
  { claim: 'Timeline: Conceived and deployed at Wayground in 2024', sourceType: 'portfolio', layer: 'timeline', reference: 'Timeline 2024' }
]
VERDICT: CRITICAL FAIL (P0). Emits fabricated repository URL, false 2024 dates, and unevidenced production deployment claim.
================================================================
```

---

## 9. Severity-Ranked Issue Register

| ID | Severity | File & Line | Problematic Code / Claim | Root Cause & Evidence Discovered | User-Facing Impact | Recommended Correction | Scope of Fix |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **EVID-01** | **P0 — Critical** | `lib/rag/askAadilAgent.ts:3404–3410, 3386` | `Timeline: Conceived and deployed at Wayground in 2024`<br>`Built between April and September 2024`<br>`Deployed into production...` | Legacy draft text in `cross_source` handler contradicts canonical registry (`devWindow: 2025-10 to 2025-11`, internal use Nov 2025, corporate deployment unevidenced). | Informs recruiters/visitors that VM Copy was built in 2024 and formally deployed, contradicting verified career chronology. | Rewrite `cross_source` handler to align with October–November 2025 math SME genesis, internal team adoption, and Jan 2026 AI transition. | Code |
| **EVID-02** | **P0 — Critical** | `lib/rag/askAadilAgent.ts:2946, 3110, 3113, 3409`<br>`lib/rag/sources/githubAdapter.ts:113–128` | `url: 'https://github.com/aadilkhurshid/vm-copy-generator'`<br>`repository aadilkhurshid/vm-copy-generator`<br>`28 automated unit tests in Vitest` | Placeholder repository created for proprietary project where `publicUrl: null`. Repo does not exist on GitHub. | Emits dead link to a fictitious GitHub repo; violates confidentiality boundaries of employer-proprietary IP. | Remove `vm-copy-generator` repo from `githubAdapter.ts`. Replace references in `askAadilAgent.ts` with explicit notice that VM Copy is proprietary with internal evaluation architecture. | Code & Data |
| **EVID-03** | **P0 — Critical** | `lib/rag/askAadilAgent.ts:2750–2754`<br>`lib/rag/synthesizer/answerSynthesizer.ts:112–116` | `**Solace AI** and **Loom AI (Engineering Design Automation)**` ... `Loom AI with 424 tests across 28 test suites` | Copy-pasted synthesis logic conflated Loom AI (B2B marketplace) with Engineering Design Automation (CAD/physics). | Hallucinates that Loom AI is a CAD tool with 424 tests; erases real marketplace architecture. | Split comparative handlers: contrast Solace AI with Engineering Design Automation (CAD), and Solace AI with Loom AI (Textile Marketplace, 42 tests). | Code |
| **EVID-04** | **P1 — High** | `lib/rag/tools/navigationTools.ts:23–58` | Fallback to `structuredProfile.githubUrls.primary` inside `githubOpenTool` when `externalRefs.github` is null. | Tool assumes all `rawProject` queries should navigate to GitHub, even when project has no public repo. | Visitor asking for VM Copy's GitHub is told "Navigating to verified GitHub destination" while being dumped on the root profile page. | Check if project is proprietary or has `github === null`. If so, return descriptive message: *"This project is employer-proprietary and has no public GitHub repository."* | Code |
| **EVID-05** | **P1 — High** | `lib/rag/sources/githubAdapter.ts:26–189`<br>`data/adapters/projectsAdapter.ts`<br>`lib/rag/tools/navigationTools.ts:35–45` | Mixed usage of `aadilkhurshid`, `aadil-lang`, and `aadil-khurshid` across repos. `design-automation` slug mismatch in `githubAdapter.ts`. | Legacy account handle divergence never reconciled across adapters. `githubAdapter` uses key `engineering-design-automation` while project slug is `design-automation`. | Causes `getGitHubRepoEvidence('design-automation')` to fail silently (`null`), while other repos emit disparate handles. | Standardize all public repositories on `aadil-lang` (per `data/profile.ts`). Fix slug key to `design-automation`. | Code & Data |
| **EVID-06** | **P1 — High** | `data/canonical/quantitativeClaims.ts:74`<br>`data/adapters/projectsAdapter.ts:706, 766, 817` | `158 backend test suites validating tool boundaries...` | Accidental inflation in claim title: canonical evidence `EVID-REL-01` states it is `158 collected test cases across 8 suites`, not 158 suites. | Exaggerates test suite architecture by ~20x. | Update wording to *"158 backend test cases across 8 suites"*. | Data |
| **EVID-07** | **P1 — High** | `data/adapters/experienceAdapter.ts:563` | `Verified on standalone Android APK (Pixel 7 emulator, Android 16 API 36)` | Direct clash with canonical evidence `EVID-SOLACE-02` (`canonicalRegistry.ts:1315`), which states mobile checks were in Jest/Node and do NOT represent physical or emulator execution. | Misrepresents simulated headless Jest testing as full Android APK OS emulator verification. | Align description with canonical evidence: *"Verified via Jest mobile test runner and TypeScript compiler with Hermes bundling."* | Data |
| **EVID-08** | **P2 — Medium** | `lib/rag/askAadilAgent.ts:2971` | `The Tier-1 evaluator executes in under **0ms latency**` | Formatting/syntax artifact where `< 1ms` or `sub-millisecond` was written as `under 0ms`. | Physically impossible claim (negative latency). | Change to *"executes with sub-millisecond latency (< 1ms)"*. | Code |
| **EVID-09** | **P2 — Medium** | `data/canonical/canonicalRegistry.ts:633`<br>`lib/rag/sources/githubAdapter.ts:174`<br>`data/adapters/projectsAdapter.ts:1497` | Divergent repo names: `OCR-benchmark-evaluator` vs `OCR-Evaluator`. | Historical repository renaming was not synchronized across all adapter files. | Inconsistent citations depending on whether canonical registry or githubAdapter is queried. | Standardize repo name across all registries to `OCR-benchmark-evaluator` (or match actual GitHub repo). | Data |
| **EVID-10** | **P2 — Medium** | `lib/rag/sources/githubAdapter.ts:61–77` | Exposes public GitHub repo `Curriculum-Transformation` for `curriculum-etl`, which canonical registry marks as `EMPLOYER_PROPRIETARY`. | Inconsistent IP classification between legacy adapter and canonical registry. | Exposes code repository for a system classified as employer-proprietary. | Reconcile IP classification or remove public URL from adapter if proprietary. | Data |
| **EVID-11** | **P3 — Low** | `lib/rag/canonicalRAGAdapter.ts:706` | `if (link && link.includes('github.com') && !link.includes('aadil-lang')) return false` | Overly loose filter allows any `aadil-lang` link to pass even if the project is marked proprietary. | Potential future leakage if proprietary projects are assigned `aadil-lang` GitHub URLs. | Update filter to check `isProprietaryEntity && link && link.includes('github.com')` without handle exception. | Code |

---

## 10. Recommended Remediation Sequence

To ensure regression safety and preserve all 1,509 passing test assertions, remediation should proceed in the following controlled, staged sequence:

### Stage 1: Clean Fictitious & Proprietary GitHub References (Fixes EVID-02, EVID-04, EVID-10)
1. **Remove `vm-copy-generator`:**
   - In `lib/rag/sources/githubAdapter.ts`, remove the mock `vm-copy` record or set `url: null`, `isPrivate: true`.
   - In `lib/rag/askAadilAgent.ts` (L2945, L3106, L3113, L3409), eliminate all references to `aadilkhurshid/vm-copy-generator` and the 28 Vitest tests.
   - Replace with accurate canonical statements: *"VM Copy was developed as an internal tool; its Tier-1 deterministic evaluation engine is documented in the Systems Archive."*
2. **Fix Navigation Tool Proprietary Fallback:**
   - In `lib/rag/tools/navigationTools.ts`, add an explicit guard for proprietary projects: if `proj.externalRefs?.github` is null or project is in proprietary list, return:
     `"VM Copy Question Generator is an employer-proprietary internal system and does not have a public GitHub repository. You can explore its full architecture in the Systems Archive (/projects/vm-copy)."`

### Stage 2: Correct Project Conflation (Fixes EVID-03)
1. **Disentangle Loom AI and Engineering Design Automation:**
   - In `lib/rag/askAadilAgent.ts` (L2735–2755) and `lib/rag/synthesizer/answerSynthesizer.ts` (L103–121):
     - Separate `solace-ai` vs `design-automation` (Mental Health vs Mechanical CAD Automation, 424 tests).
     - Provide a distinct comparison for `solace-ai` vs `loom-ai` (Mental Health vs B2B Textile Procurement Marketplace, 42 tests).
   - In `lib/rag/responseEngine.ts` (L214), remove `loom` from matching `design-automation`.

### Stage 3: Chronological & Metric Alignment (Fixes EVID-01, EVID-06, EVID-07, EVID-08)
1. **Harmonize VM Copy Chronology:**
   - In `lib/rag/askAadilAgent.ts` (L3386, L3406, L3410), update the `cross_source` handler to reflect the true canonical timeline: conceived in October–November 2025 during the Mathematics SME role; adopted internally in November 2025; causal catalyst for the January 2026 AI Engineering transition. Remove unevidenced corporate deployment assertions.
2. **Correct Metric Terminology:**
   - In `data/canonical/quantitativeClaims.ts` (L74) and `data/adapters/projectsAdapter.ts` (L706), replace `"158 backend test suites"` with `"158 backend test cases across 8 suites"`.
   - In `lib/rag/askAadilAgent.ts` (L2971), fix `"under 0ms latency"` to `"sub-millisecond latency (< 1ms)"`.
   - In `data/adapters/experienceAdapter.ts` (L563), align Solace AI mobile verification with `canonicalRegistry.ts` (`EVID-SOLACE-02`).

### Stage 4: Unify GitHub Usernames & Repo Slugs (Fixes EVID-05, EVID-09)
1. **Standardize on `aadil-lang`:**
   - Align `lib/rag/sources/githubAdapter.ts` and `lib/rag/tools/navigationTools.ts` to use `https://github.com/aadil-lang/` for all public repositories (`Engineering-design-automation`, `Atlas-AI`, `loom-ai`, `ai-application-reliability`, `OCR-benchmark-evaluator`, `solace-ai`).
   - Fix `githubAdapter.ts` key from `engineering-design-automation` to `design-automation`.
   - Harmonize OCR Evaluator repo slug to `OCR-benchmark-evaluator`.

### Stage 5: Regression Battery & Final Verification
1. Run `test_phase_2_1_session_memory.ts`, `test_phase_2_2_response_engine.ts`, `test_ask_aadil_comprehensive_acceptance.ts`, `test_project_comparison.ts`, `test_rag_canonical_grounding.ts`, and `test_recruiter_contact_layer.ts`.
2. Run `npx tsc --noEmit` and `npm run build` to confirm zero type errors and clean route generation.

---

*Report prepared and validated under strict read-only execution constraints.*
