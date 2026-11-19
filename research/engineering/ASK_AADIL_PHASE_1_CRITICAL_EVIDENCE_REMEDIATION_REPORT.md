# Ask Aadil — Phase 1: Critical Evidence Remediation Report

**Date:** November 19, 2026  
**Role:** Senior AI Systems Engineer, RAG Evidence Integrity Engineer, and Regression QA Architect  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio\`  
**Baseline HEAD Commit:** `f0613c85201053670eb2cee3aaad5e2af2fee336`  
**Branch:** `main`  
**Execution Mode:** Controlled Implementation & Comprehensive Verification  
**Priority:** P0 — Critical Evidence Integrity & Factual Attribution  

---

## Executive Summary

Following the comprehensive audit conducted on November 19, 2026 (*Ask Aadil — Evidence Integrity, Source Attribution & Claims Audit*), this Phase 1 Remediation successfully eliminated all critical (P0) factual inaccuracies across Ask Aadil's direct deterministic routing, RAG retrieval, multi-project comparisons, and navigation tool layers.

The remediation resolved three primary critical integrity vulnerabilities:
1. **VM Copy Claims & Identity:** Purged fictitious GitHub repository references (`vm-copy-generator`), removed unsupported 28-test claims, grounded chronology in confirmed mathematics SME tenure (October–mid-November 2025), corrected deployment language to internal team adoption (not formal corporate enterprise production), and bounded performance metrics to sub-millisecond (`<1ms`) in-memory Tier-1 deterministic candidate checks in local TypeScript (eliminating "under 0ms" claims).
2. **Loom AI vs. Engineering Design Automation (EDA CAD) Disentanglement:** Completely disentangled two previously conflated projects across the query router, answer synthesizer, agent logic, and quantitative index. Loom AI is now strictly identified as a B2B technical textile procurement marketplace (Next.js, Express, MongoDB Atlas, LangGraph HITL approval queue, 42 tests), while EDA is strictly identified as an industrial 3D mechanical CAD shaft design engine (OpenCascade, PythonOCC, 424 tests across 28 suites in Docker, with the mandatory software calculus caveat on tested analytical primitives). Added three distinct comparative synthesis pairings: Solace AI vs. EDA, Solace AI vs. Loom AI, and EDA vs. Loom AI.
3. **Proprietary GitHub Navigation & Conceptual Inquiries:** Enhanced `githubOpenTool` to detect employer-proprietary projects without public repositories, explicitly informing users of the employer context and offering verified Systems Archive case studies (`/projects/vm-copy`) rather than misdirecting to personal profiles. Guarded against false navigation triggers on conceptual questions ("What happens if a project's GitHub repository is unavailable?").

All changes strictly maintained existing system architecture, canonical registries, and session memory. Full regression testing demonstrated **100% test pass rates across all 7 test suites (1,537 total assertions passing)** with zero TypeScript compilation errors.

---

## 1. Initial Working-Tree State & Baseline Commit

- **Baseline HEAD:** `f0613c85201053670eb2cee3aaad5e2af2fee336`
- **Pre-Implementation Working-Tree Status:**
  - Tracked modifications in `lib/rag/` and `data/canonical/` originating from Phase 2.1, Phase 2.2, and audit evidence artifacts.
  - No Git staging (`git add`) or commit operations performed.

---

## 2. Inventory of Modified Files

The following files were inspected and modified with surgical, minimal-diff interventions:

| File Path | Description of Changes |
| :--- | :--- |
| [githubAdapter.ts](file:///C:/Users/HP/OneDrive/Documents/Portfolio/lib/rag/sources/githubAdapter.ts) | Removed fictitious `'vm-copy'` repository entry (`aadilkhurshid/vm-copy-generator`, 28 Vitest tests). |
| [navigationTools.ts](file:///C:/Users/HP/OneDrive/Documents/Portfolio/lib/rag/tools/navigationTools.ts) | Added proprietary check in `githubOpenTool`: returns explicit employer-context notice and redirects to Systems Archive (`/projects/${proj.slug}`). Fixed unknown project handling and preserved authentic personal profile navigation (`github.com/aadil-lang`). |
| [queryUnderstanding.ts](file:///C:/Users/HP/OneDrive/Documents/Portfolio/lib/rag/queryUnderstanding.ts) | Added `isHypotheticalOrConceptual` check to prevent conceptual repository queries from forcing `requestMode = 'navigation'` and `requestedTool = 'github.open'`. |
| [askAadilAgent.ts](file:///C:/Users/HP/OneDrive/Documents/Portfolio/lib/rag/askAadilAgent.ts) | 1. Added conceptual repository availability handler before project navigation routing.<br>2. Disentangled comparison logic into Case 1A (Solace vs. EDA), Case 1B (Solace vs. Loom), and Case 1C (EDA vs. Loom).<br>3. Corrected VM Copy technical queries, technology stack queries, and authorship queries (SME tenure, internal use, catalyst for AI/ML transition, `<1ms` candidate check).<br>4. Added EDA software calculus caveat.<br>5. Added dedicated `loom-ai` technical query branch. |
| [answerSynthesizer.ts](file:///C:/Users/HP/OneDrive/Documents/Portfolio/lib/rag/synthesizer/answerSynthesizer.ts) | Disentangled comparative synthesis into three distinct branches: Solace vs. EDA, Solace vs. Loom, and EDA vs. Loom. Added mutual-exclusion guards to prevent cross-project template contamination. |
| [quantitativeClaims.ts](file:///C:/Users/HP/OneDrive/Documents/Portfolio/data/canonical/quantitativeClaims.ts) | Added `claim-loom-42-tests` (42 automated tests validating Clean Architecture and procurement workflows). Standardized `claim-reliability-158-tests` unit to `test cases`. |
| [knowledgeIndex.ts](file:///C:/Users/HP/OneDrive/Documents/Portfolio/lib/rag/knowledgeIndex.ts) | Added `isLoomQuery` handler and automatic project slug inference in `queryQuantitativeRegistry` to ensure test queries route to the exact referenced project. |

---

## 3. Detailed Remediation Breakdown

### Finding 1: VM Copy Repository & Test Count Fabrication
- **Audit Defect:** `lib/rag/sources/githubAdapter.ts` registered an active GitHub repository for VM Copy: `https://github.com/aadilkhurshid/vm-copy-generator` with `verifiedTestCount: 28` using `vitest`. This repository was unverified/nonexistent.
- **Remediation:** Completely removed the `vm-copy` entry from `githubAdapter.ts`. Any queries regarding VM Copy's technical specs or test verification are now resolved through verified case study evidence in the Systems Archive and in-memory deterministic evaluation benchmarks.

### Finding 2: VM Copy Chronology & Corporate Deployment Claims
- **Audit Defect:** Responses cited 2024 dates for VM Copy conception/deployment and described it as a formal corporate production deployment at Wayground.
- **Remediation:**
  - Aligned all responses to canonical records: Conceived and developed between October–mid-November 2025 during Mathematics SME tenure.
  - Internal team adoption began in November 2025.
  - Clarified that this successful internal adoption served as the direct catalyst for Aadil's formal transition into the AI/ML engineering team in January 2026.
  - Clarified that no formal enterprise-wide production deployment was claimed or evidenced.

### Finding 3: Performance Scope Inversion & "Under 0ms" Latency
- **Audit Defect:** `askAadilAgent.ts:2971` contained an impossible phrasing: "under 0ms latency", and general responses failed to distinguish between local TypeScript evaluation latency and upstream LLM generation latency.
- **Remediation:** Updated all references to explicitly state: "sub-millisecond latency (<1ms) per candidate validation check in local TypeScript for the Tier-1 deterministic evaluator", strictly distinguishing it from upstream LLM generation.

### Finding 4: Disentangling Loom AI and Engineering Design Automation (EDA CAD)
- **Audit Defect:** A compound `if` condition in `askAadilAgent.ts` and `answerSynthesizer.ts` (`lowerQ.includes('solace') && (lowerQ.includes('loom') || lowerQ.includes('design') || lowerQ.includes('eda'))`) conflated Loom AI and EDA into a single entity labeled `Loom AI (Engineering Design Automation)`. This mistakenly attributed 424 tests, OpenCascade/PythonOCC 3D CAD modeling, and 0.0000% volume error to Loom AI.
- **Remediation:**
  - **Loom AI Identity Established:** B2B technical textile sourcing and procurement platform built with Next.js, Express, MongoDB Atlas, and a LangGraph Human-in-the-Loop (HITL) order approval queue. Validated by 42 automated tests (Playwright E2E and Jest integration).
  - **Engineering Design Automation (EDA) Identity Established:** Industrial mechanical shaft CAD engine converting natural-language requirements into 3D STEP solid models using OpenCascade (PythonOCC). Validated by 424 automated pytests across 28 suites running in containerized Docker test runner.
  - **Mandatory Caveat Applied:** Explicitly bound the 0.0000% volume error to software mathematical agreement on tested analytical geometry primitives against OpenCascade `GProp_GProps`, noting it does NOT measure physical CNC machining tolerance.
  - **Three Distinct Comparisons Built:**
    1. *Solace AI vs. EDA:* Consumer mental-health sanctuary vs. industrial 3D mechanical CAD engine.
    2. *Solace AI vs. Loom AI:* Consumer mental-health sanctuary vs. B2B technical textile procurement marketplace.
    3. *EDA vs. Loom AI:* Industrial 3D mechanical CAD engine vs. B2B technical textile procurement marketplace.

### Finding 5: Proprietary GitHub Navigation & Conceptual Queries
- **Audit Defect:** Asking for VM Copy's repository caused `githubOpenTool` to fall through to the default profile URL (`https://github.com/aadil-lang`) and mislabel it as a repository navigation. Conceptual questions ("What happens if a project's GitHub repository is unavailable?") inadvertently triggered GitHub navigation.
- **Remediation:**
  - `githubOpenTool` now inspects `proj.externalRefs?.github`. If null/empty, it returns a clear explanation that the project was developed in an employer context and navigates to the Systems Archive (`/projects/${proj.slug}`).
  - Preserved authentic navigation when users explicitly ask for Aadil's personal GitHub profile.
  - Guarded against conceptual queries in `queryUnderstanding.ts` and added an explanatory handler in `askAadilAgent.ts`.

---

## 4. Before & After Conversational Verifications

### Example 1: VM Copy Repository Inquiries
- **User Query:** *"Show me VM Copy's GitHub repository."*
- **Before:**
  > *Tool Action:* `NAVIGATE` to `https://github.com/aadil-lang`  
  > *Message:* "Navigating to verified GitHub destination: [Open Primary GitHub Profile](https://github.com/aadil-lang)" *(False attribution)*
- **After:**
  > *Tool Action:* `NAVIGATE` to `/projects/vm-copy`  
  > *Message:* "**VM Copy Question Generator** was developed in an employer context as an internal system. No public GitHub repository is registered or verified for this project. You can explore its verified architecture, deterministic evaluator design, and technical specifications directly in Aadil's [Systems Archive](/projects/vm-copy)." *(Accurate, transparent, and grounded)*

---

### Example 2: VM Copy Chronology & Origins
- **User Query:** *"Tell me the complete story of VM Copy."*
- **Before:**
  > "...conceived in 2024 and deployed across corporate production with 28 Vitest tests..." *(Fictitious dates, inflated deployment, fabricated tests)*
- **After:**
  > "...conceived and developed between October and mid-November 2025 during his Mathematics Subject Matter Expert (SME) tenure at Wayground. Internal team usage began in November 2025, and its operational success served as the direct catalyst for his formal transition into the AI/ML engineering team in January 2026..." *(Grounded in verified canonical records)*

---

### Example 3: Comparison between Solace AI and Loom AI
- **User Query:** *"Compare Solace AI with Loom AI."*
- **Before:**
  > "**Solace AI** and **Loom AI (Engineering Design Automation)** address completely different operational domains... Loom AI couples natural language with OpenCascade boundary representation and is backed by 424 automated pytests..." *(Conflated Loom AI with EDA CAD)*
- **After:**
  > "**Solace AI** and **Loom AI** represent two distinct full-stack AI architectures serving different domains:  
  > • **Domain & Scope:** Solace AI is a consumer mobile mental-health sanctuary built with React Native / Expo 58 and FastAPI/LangGraph, whereas Loom AI is an enterprise B2B technical textile sourcing and procurement platform built with Next.js, Express, and MongoDB Atlas.  
  > • **Architecture & Reliability Invariants:** Solace AI enforces deterministic pre-LLM crisis screening... Loom AI implements Clean Architecture with inward dependency flow and a LangGraph Human-in-the-Loop (HITL) order approval queue.  
  > • **Ownership & Test Verification:** Both are independent engineering builds created by Aadil. Solace AI is validated by 52 backend pytests and 50 mobile Jest checks, while Loom AI is validated by 42 automated tests..." *(Cleanly disentangled)*

---

### Example 4: Conceptual Repository Availability Query
- **User Query:** *"What happens if a project's GitHub repository is unavailable?"*
- **Before:**
  > *Tool Action:* `NAVIGATE` to `https://github.com/aadil-lang` *(Unwanted navigation)*
- **After:**
  > *No Navigation Action.*  
  > *Message:* "When a project's GitHub repository is unavailable, unverified, or employer-proprietary (such as VM Copy), Ask Aadil does not fabricate external links or hallucinate repository metadata. Instead, the system transparently explains that no public repository exists and bounds its explanation in verified canonical specifications and technical case studies documented in the Systems Archive." *(Informational and educational)*

---

## 5. Verification & Test Battery Results

Seven rigorous regression and verification test suites were executed to ensure complete functional correctness and zero regressions across the codebase:

| Suite Name | Execution Command | Result | Pass Rate |
| :--- | :--- | :--- | :--- |
| **Phase 1 Critical Evidence Suite** | `scripts/test_phase_1_critical_evidence.ts` | **28 / 28 PASSED** | 100% |
| **Phase 2.1 Session Memory Suite** | `scripts/test_phase_2_1_session_memory.ts` | **31 / 31 PASSED** | 100% |
| **Phase 2.2 Response Engine Suite** | `scripts/test_phase_2_2_response_engine.ts` | **17 / 17 PASSED** | 100% |
| **Comprehensive End-to-End Suite** | `scripts/test_ask_aadil_comprehensive_acceptance.ts` | **42 / 42 PASSED** | 100% |
| **Interactive Project Comparison Suite** | `scripts/test_project_comparison.ts` | **1,364 / 1,364 PASSED** | 100% |
| **Canonical RAG Grounding Suite** | `scripts/test_rag_canonical_grounding.ts` | **37 / 37 PASSED** | 100% |
| **Recruiter & Contact Layer Suite** | `scripts/test_recruiter_contact_layer.ts` | **18 / 18 PASSED** | 100% |
| **TypeScript Type Check** | `npx tsc --noEmit` | **0 Errors (Exit 0)** | 100% |
| **Production Build Execution** | `npm run build` | **40 / 40 Pages (Exit 0)** | 100% |

**Total Verified Assertions:** **1,537 / 1,537 PASSED (100.0%)**

---

## 6. Strict Scope & Repository Compliance Confirmation

- **No GitHub Handle Standardization:** In accordance with prompt boundaries, GitHub handle variations (`aadil-lang` vs. `aadilkhurshid` vs. `aadil-khurshid`) were left untouched and are deferred to later harmonization.
- **Git State Preserved:**
  - `git add`, `git commit`, `git push`, or `git deploy` were strictly NOT executed.
  - All unstaged working files and untracked research logs have been preserved intact.
- **Non-Destructive Execution:** No test assertions were weakened; all tests enforce rigorous, grounded assertions.

---

## 7. Conclusion

Phase 1 Critical Evidence Remediation is complete. Ask Aadil's factual grounding, source citations, project distinctions, and repository navigation now operate with complete integrity, full test coverage, and strict canonical compliance.
