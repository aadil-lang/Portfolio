# RECONCILED PROJECT OWNERSHIP REGISTER
**Definitive Multi-Axis Attribution, Organizational Context & IP Classification Across All 11 Projects**

- **Audit Date:** 2026-11-14
- **Working Directory:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Audit Standard:** Level 1 Forensic Evidence Verification
- **Execution Mode:** READ-ONLY RECONCILIATION (Implementation Strictly Prohibited)
- **File Location:** `research/audits/reconciliation/RECONCILED_PROJECT_OWNERSHIP_REGISTER.md`

---

## 1. RECONCILIATION TAXONOMY & COGNITIVE CORRECTION

A primary defect identified across earlier portfolio revisions and audit drafts was the conflation of **Implementation Authorship** with **Organizational Ownership**:
- The phrase *"independent build"* was frequently used as a synonym for *"personally implemented by one engineer without a co-author"*.
- When applied to projects built during employment at Wayground (such as *VM Copy*, *AI Worksheets*, and *Curriculum Transformation Engine*), this created the false and misleading impression that these were "independent personal side-projects" developed outside company employment.
- Conversely, calling a project a *"company system"* obscured whether the engineer was a minor contributor or the sole developer of the codebase.

To establish absolute legal, historical, and architectural clarity, this register disaggregates ownership across four independent orthogonal axes:

1. **Implementation Authorship:**
   - `SOLE_AUTHOR`: 100% of the codebase, architecture, and tests were written by the engineer.
   - `MODULE_AUTHOR`: Specific discrete subsystems, routers, or gates were personally designed and coded within a larger collaborative system.
   - `COLLABORATIVE_CONTRIBUTOR`: Shared authoring of prompts, schemas, or pipelines with team peers.
2. **Organizational Context:**
   - `COMPANY_EMPLOYMENT`: Developed during formal employment for employer operations or exploratory R&D.
   - `HACKATHON_EVENT`: Developed as a competitive submission for a public/semi-public hackathon event.
   - `INDEPENDENT_RESEARCH`: Developed post-employment as self-directed engineering research.
3. **Intellectual & Commissioning Provenance:**
   - `INTERNALLY_COMMISSIONED`: Assigned by company leadership / management (e.g. documented leadership POC).
   - `INTERNALLY_INITIATED`: Proactively conceived and built by the engineer to eliminate an internal operational bottleneck during daily workflow.
   - `INDEPENDENT_IP`: Fully conceived, architected, and retained by the engineer.
4. **Public Publication Eligibility:**
   - `PUBLIC_OPEN_SOURCE`: Full source code, test suites, and documentation are public on GitHub.
   - `ARCHITECTURAL_STUDY_ONLY`: Concepts, sanitized topologies, and synthetic examples may be showcased; proprietary corporate datasets, internal APIs, and private company question stores remain strictly confidential.

---

## 2. RECONCILED REGISTER OF ALL 11 PROJECTS

### Project 01: VM Copy Question Generator
- **System Identifier:** `vm-copy`
- **Canonical Title:** VM Copy Question Generator
- **Implementation Authorship:** **`SOLE_AUTHOR`**
  - Designed, architected, and coded 100% of the Next.js application, prompt routing, and pure TypeScript evaluation layer.
- **Organizational Context:** **`COMPANY_EMPLOYMENT`**
  - Developed while formally employed at Wayground Inc in Bengaluru, India.
  - **Crucial Chronological Realignment:** Developed in **October 2025 — December 2025** during the **Subject Matter Expert — Mathematics** employment tenure (NOT during the AI/ML Team tenure, and NOT in early 2025).
- **Intellectual & Commissioning Provenance:** **`INTERNALLY_INITIATED`**
  - Conceived and built proactively by Aadil as an internal productivity solution to eliminate high-friction assessment variation bottlenecks within the content team. It was not assigned from top-down engineering sprint backlogs; it was an engineer-led solution to operational failure modes.
- **Individual Contribution Scope:**
  - Designed hierarchical prompt templates preserving base-question instructional intent.
  - Authored the in-memory Tier-1 Deterministic Evaluator (`lib/eval-layer.ts`) enforcing 4 options, single CA logic, and duplicate distractor rejection (< 1 ms latency, $0 API cost).
  - Engineered parallel micro-batching (`calculateBatches`) dispatching concurrent requests in chunks of 2–3 items to prevent serverless 30s gateway timeouts.
  - Authored the Tier-2/3 adversarial blind-solve verification endpoint (`/api/verify`).
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/vm-copy-question-generator`.
  - The repository contains sanitized benchmark examples and structural algorithms. Proprietary Wayground question stores and internal APIs are strictly excluded.
- **Correction Required from Previous Audit:**
  - **Eliminate:** *"WAYGROUND · INDEPENDENT BUILD"* and *"independent project"*.
  - **Adopt:** *"Wayground Internal Tool · Personally Initiated & Implemented during SME Tenure"*.

---

### Project 02: AI Worksheets Product POC
- **System Identifier:** `ai-worksheets`
- **Canonical Title:** AI Worksheets Product POC
- **Implementation Authorship:** **`SOLE_AUTHOR`**
  - Designed, architected, and implemented the full-stack codebase across backend, compilers, and frontend.
- **Organizational Context:** **`COMPANY_EMPLOYMENT`**
  - Developed during formal employment on the **Wayground AI/ML Team** in **February 2026 — April 2026**.
- **Intellectual & Commissioning Provenance:** **`INTERNALLY_COMMISSIONED`**
  - Built as a formal company proof of concept under internal exploratory R&D, formally documented in the **March 2026 Wayground Leadership Brief** under the working title *"Wayground AI Worksheets"*.
- **Individual Contribution Scope:**
  - Engineered the dual-pipeline architecture: Formal Question Worksheets vs. Gamified Worksheets (Crosswords & Maze Trails).
  - Built headless TeX Live (`pdflatex`) subprocess pool with Poppler (`pdftoppm`) rasterization (300 DPI) and MD5 content-hashed asset caching.
  - Authored algorithmic 2D crossword generator using deterministic backtracking with letter intersection constraints.
  - Authored honeycomb hexagonal maze trail generator using depth-first search (DFS) with arithmetic mistake distractor models.
  - Integrated FastAPI async backend with React 18 / Vite 6 interactive student player.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/Worksheets-MS-Formal-Gamified`.
  - Public repository demonstrates POC architecture, algorithmic backtracking solvers, and headless compiler sandboxes. Proprietary corporate databases are excluded.
- **Correction Required from Previous Audit:**
  - **Eliminate:** Any wording suggesting this was an independent personal project.
  - **Adopt:** *"Wayground AI/ML Team · Company Proof of Concept (Personally Designed & Implemented)"*.

---

### Project 03: Curriculum Transformation Engine
- **System Identifier:** `curriculum-etl`
- **Canonical Title:** Curriculum Transformation Engine
- **Implementation Authorship:** **`SOLE_AUTHOR`**
  - Architected and coded the Map-Reduce extraction pipeline, dynamic Pydantic compilation, and 3-tier integrity gates.
- **Organizational Context:** **`COMPANY_EMPLOYMENT`**
  - Developed during formal employment on the **Wayground AI/ML Team** in **February 2026 — June 2026**.
- **Intellectual & Commissioning Provenance:** **`INTERNALLY_COMMISSIONED`**
  - Engineered to automate an urgent corporate operational bottleneck: ingesting multi-megabyte unstructured K–12 state standards (Texas TEKS, Florida B.E.S.T.) into normalized machine-readable schemas.
- **Individual Contribution Scope:**
  - Conceived and implemented dynamic schema contract derivation from customer sample CSVs, extracting column hierarchies and taxonomy rules without hardcoded parsing scripts.
  - Implemented asynchronous Map-Reduce document partitioning chunking multi-page PDFs with parallel Claude 3.5 Sonnet extraction workers using strict JSON tool calling.
  - Built 3-Tier Integrity Gate: Reviewer/Critic LLM validation, deterministic Pydantic row guards, and automated post-extraction CSV structural audits.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/Curriculum-Transformation`.
  - Open repository contains the generalized orchestration and schema-synthesis framework. Unreleased corporate curriculum data remains excluded.
- **Correction Required from Previous Audit:**
  - **Eliminate:** Mislabeled categorization as an "independent engineering build".
  - **Adopt:** *"Wayground AI/ML Team · Enterprise ETL Pipeline (Personally Designed & Implemented)"*.

---

### Project 04: US Mathematics Item Bank Generation Pipeline
- **System Identifier:** `math-item-bank`
- **Canonical Title:** US Mathematics Item Bank Generation Pipeline
- **Implementation Authorship:** **`MODULE_AUTHOR` & `COLLABORATIVE_CONTRIBUTOR`**
  - **CRITICAL DISTINCTION:** Aadil was NOT the sole author or systems architect of the entire item bank generation system. This was a collaborative, multi-engineer team system.
- **Organizational Context:** **`COMPANY_EMPLOYMENT`**
  - Developed within the Wayground AI/ML & Assessment Engineering Team in **April 2026 — July 2026**.
- **Intellectual & Commissioning Provenance:** **`INTERNALLY_COMMISSIONED`** (Core Company Production System).
- **Individual Contribution Scope (Exclusively Documented Subsystems):**
  1. *Mathematical Image Domain Router:* Engineered conditional routing logic directing geometric/coordinate questions to SVG generation scripts and abstract mathematical formulas to compiled TikZ/LaTeX.
  2. *Compile & Visual Evaluation Gates:* Built headless two-tier verification gates validating that generated visual markup compiles cleanly before database insertion.
  3. *Upper Elementary Pipeline Stabilization:* Developed and tuned prompt schemas, evaluation criteria, and curriculum constraints for Grade 3–5 standards.
  4. *Stratified Sampling Logic:* Contributed to the Integer Linear Programming (ILP) and Min/Max Swap algorithm to balance curriculum weightage targets across difficulty tiers.
  5. *Vetting UI Support:* Resolved consultant-reported UI bugs in two React/TypeScript review interfaces.
- **Intellectual Property & Publication Eligibility:** **`ARCHITECTURAL_STUDY_ONLY`**
  - Repository is **Proprietary & Private** (`github: null`).
  - No source code or proprietary item stores are published. The portfolio case study presents only architectural methodology and sanitized routing diagrams.
- **Correction Required from Previous Audit:**
  - Enforce strict attribution: Never claim authorship of the complete Item Bank system. Explicitly cite individual module authorship (Visual Routing, Compile Gates, Standard Balancing).

---

### Project 05: Engineering Design Automation (EDA CAD)
- **System Identifier:** `design-automation`
- **Canonical Title:** Engineering Design Automation (EDA CAD)
- **Implementation Authorship:** **`SOLE_AUTHOR`**
- **Organizational Context:** **`INDEPENDENT_RESEARCH`**
  - Developed post-employment in **August 2026 — September 2026**.
- **Intellectual & Commissioning Provenance:** **`INDEPENDENT_IP`**
  - Conceived and built independently to explore the intersection of language models with closed-form mechanical physics and deterministic CAD solid modeling.
- **Individual Contribution Scope:**
  - Natural-language brief parsing extracting mechanical operating parameters (torque, rpm, allowable shear, safety factors).
  - Closed-form analytical mechanical engineering physics solvers (torsional shear stress, von Mises yield criterion) eliminating LLM arithmetic hallucination.
  - OpenCascade / CadQuery boundary representation (BRep) CAD solid modeling producing valid STEP files and SVG technical drawings.
  - Automated dimensional cross-validation between 3D solids and 2D drawings.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/Engineering-design-automation`.
- **Correction Required from Previous Audit:**
  - Retain classification as Independent Engineering Project; clarify that 0.0000% volume error applies to software calculus agreement, not physical machining tolerance.

---

### Project 06: AI Application Reliability & Browser QA
- **System Identifier:** `ai-reliability`
- **Canonical Title:** AI Application Reliability & Browser QA
- **Implementation Authorship:** **`SOLE_AUTHOR`**
- **Organizational Context:** **`INDEPENDENT_RESEARCH`**
  - Developed post-employment in **August 2026 — September 2026**.
- **Intellectual & Commissioning Provenance:** **`INDEPENDENT_IP`**
  - Conceived and built independently to investigate deterministic verification, execution grounding, and cryptographic governance for autonomous browser agents.
- **Individual Contribution Scope:**
  - Playwright browser execution grounding capturing DOM snapshots, console logs, network payloads, and screenshots.
  - Local Ollama reasoning loop (Qwen 2.5 Coder via Model Context Protocol).
  - Fisher Information covariance uncertainty modeling triggering deterministic abstention (`GateDecision.ABSTAIN`) when observation telemetry is ambiguous.
  - Cryptographic change authorization gate requiring signed `ChangeAuthorization` tokens with SHA-256 ledgers before executing consequential mutations.
  - Autonomously dogfooded against VM Copy Question Generator.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/ai-engineering-lab`.
- **Correction Required from Previous Audit:**
  - Retain classification as Independent Engineering Project.

---

### Project 07: Loom AI — B2B Textile Marketplace Platform
- **System Identifier:** `loom-ai`
- **Canonical Title:** Loom AI — B2B Textile Marketplace Platform
- **Implementation Authorship:** **`SOLE_AUTHOR`**
- **Organizational Context:** **`HACKATHON_EVENT`**
  - Built in **August 2026** for the **Humanity Founders Marketplace Hackathon**.
- **Intellectual & Commissioning Provenance:** **`INDEPENDENT_IP`** (Hackathon Submission).
- **Individual Contribution Scope:**
  - Clean architecture separating domain entities, use cases, and repository adapters on Next.js 16 and Express with MongoDB Atlas.
  - LangGraph procurement agent coordinating buyer inquiries, supplier quotation matching, and inventory verification.
  - Human-in-the-loop (HITL) approval queues guaranteeing human sign-off before purchase commitment.
  - Playwright end-to-end integration and API verification test suites.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/loom-ai`.
- **Correction Required from Previous Audit:**
  - **Eliminate:** Backdated timeline entries (`Dec 2025`).
  - **Adopt:** *"Humanity Founders Hackathon (Aug 2026) · Independent Author"*.

---

### Project 08: Atlas AI — Financial Copilot & SEC Filing RAG
- **System Identifier:** `atlas-ai`
- **Canonical Title:** Atlas AI — Financial Copilot & SEC Filing RAG
- **Implementation Authorship:** **`SOLE_AUTHOR`**
- **Organizational Context:** **`HACKATHON_EVENT`**
  - Built in **August 2026** for the **Humanity Founders Finance Hackathon**.
- **Intellectual & Commissioning Provenance:** **`INDEPENDENT_IP`** (Hackathon Submission).
- **Individual Contribution Scope:**
  - Asynchronous Telegram-first financial copilot on FastAPI and Python 3.12.
  - LangGraph StateGraph routing user intents between market data, filings, and alerts.
  - SEC EDGAR 10-K/10-Q filing chunking with financial table structure preservation.
  - Vector search retrieval layer using MongoDB Atlas Vector Search and Gemini embeddings.
  - Proactive background alert worker polling market triggers and pushing Telegram alerts without user initiation.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/Atlas-AI`.
- **Correction Required from Previous Audit:**
  - **Eliminate:** Backdated timeline entries (`Jan 2026`).
  - **Adopt:** *"Humanity Founders Hackathon (Aug 2026) · Independent Author"*.

---

### Project 09: Engineering Portfolio Platform & Ask Aadil Agent
- **System Identifier:** `ask-aadil`
- **Canonical Title:** Engineering Portfolio Platform & Ask Aadil Agent
- **Implementation Authorship:** **`SOLE_AUTHOR`**
- **Organizational Context:** **`INDEPENDENT_RESEARCH`**
  - Conceived and built post-employment in **September 2026 — November 2026**.
- **Intellectual & Commissioning Provenance:** **`INDEPENDENT_IP`**.
- **Individual Contribution Scope:**
  - Bespoke Next.js 16 (App Router) / React 19 portfolio platform, 36-folio interactive Engineering Journal, and 3D Capability Cube with desktop drag and 5s auto-rotation.
  - Stateful conversational agent with multi-turn entity resolution, intent routing, and hybrid retrieval across 6 canonical knowledge layers.
  - Strict epistemic boundaries separating formal employment from post-employment independent research.
  - Bitwise draft integrity (`executionInput === editedDraft`) and visitor confirmation before mail actions without LLM rewriting.
  - Voice interface with Voice Activity Detection (VAD), barge-in handling, and speech transcript reconstruction.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/portfolio`.

---

### Project 10: Solace AI — Mindful Wellness Companion
- **System Identifier:** `solace-ai`
- **Canonical Title:** Solace AI — Mindful Wellness Companion
- **Implementation Authorship:** **`SOLE_AUTHOR`**
- **Organizational Context:** **`HACKATHON_EVENT`**
  - Built in **November 2026** for the **Solace Hackathon**.
- **Intellectual & Commissioning Provenance:** **`INDEPENDENT_IP`** (Hackathon Submission).
- **Individual Contribution Scope:**
  - Cross-platform Android mobile application (React Native / Expo 58) backed by FastAPI and LangGraph.
  - Synchronous pre-LLM deterministic crisis screening (`is_crisis_input`) checking verified crisis hotlines (Tele-MANAS 14416, 112, 988) before context retrieval or Gemini streaming.
  - Consent-based emotional memory architecture allowing users to inspect, revoke, or purge memory items.
  - Zero-retention voice privacy with raw audio byte purging in an immediate `finally` block.
  - Single-POST SSE delivery guards treating HTTP 502/503/504 as ambiguous delivery without blind retries.
  - Supabase Auth, PostgreSQL Row-Level Security, and Expo SecureStore chunked below Android Keystore 2048-byte limits.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/solace-ai`.
- **Correction Required from Previous Audit:**
  - Correct typographical date in resume (`Nov 2025` → `Nov 2026`).

---

### Project 11: OCR Evaluation & Robustness Testing Platform
- **System Identifier:** `ocr-evaluator`
- **Canonical Title:** OCR Evaluation & Robustness Testing Platform
- **Implementation Authorship:** **`SOLE_AUTHOR`**
- **Organizational Context:** **`INDEPENDENT_RESEARCH`**
  - Developed post-employment in **September 2026**.
- **Intellectual & Commissioning Provenance:** **`INDEPENDENT_IP`**.
- **Individual Contribution Scope:**
  - Multi-tier document extraction auditing: Character Error Rate (CER), Word Error Rate (WER), field-level exact match, and critical-field accuracy.
  - Priority risk classification engine assigning PASS / REVIEW / FAIL decisions based on field severity, overriding aggregate confidence scores.
  - Controlled document degradation benchmarking across 5 physical axes: Gaussian blur, additive noise, rotation skew, contrast reduction, and JPEG compression.
- **Intellectual Property & Publication Eligibility:** **`PUBLIC_OPEN_SOURCE`**
  - Hosted at: `https://github.com/aadil-lang/OCR-Evaluator`.

---

## 3. SUMMARY MATRIX OF RECONCILED ATTRIBUTION

| Slug | Canonical Title | Authorship | Organizational Context | Provenance | GitHub Visibility |
|---|---|---|---|---|---|
| `vm-copy` | VM Copy Question Generator | `SOLE_AUTHOR` | `COMPANY_EMPLOYMENT` (Wayground) | `INTERNALLY_INITIATED` (SME Tenure) | Public (`aadil-lang`) |
| `ai-worksheets` | AI Worksheets Product POC | `SOLE_AUTHOR` | `COMPANY_EMPLOYMENT` (Wayground) | `INTERNALLY_COMMISSIONED` (AI/ML POC) | Public (`aadil-lang`) |
| `curriculum-etl` | Curriculum Transformation Engine | `SOLE_AUTHOR` | `COMPANY_EMPLOYMENT` (Wayground) | `INTERNALLY_COMMISSIONED` (AI/ML ETL) | Public (`aadil-lang`) |
| `math-item-bank` | US Mathematics Item Bank Pipeline | `MODULE_AUTHOR` | `COMPANY_EMPLOYMENT` (Wayground) | `INTERNALLY_COMMISSIONED` (Team System) | **Proprietary / Private (`null`)** |
| `design-automation`| Engineering Design Automation (EDA CAD)| `SOLE_AUTHOR` | `INDEPENDENT_RESEARCH` | `INDEPENDENT_IP` | Public (`aadil-lang`) |
| `ai-reliability` | AI Application Reliability Platform | `SOLE_AUTHOR` | `INDEPENDENT_RESEARCH` | `INDEPENDENT_IP` | Public (`aadil-lang`) |
| `loom-ai` | Loom AI — B2B Textile Marketplace | `SOLE_AUTHOR` | `HACKATHON_EVENT` (Humanity Founders) | `INDEPENDENT_IP` (Hackathon Build) | Public (`aadil-lang`) |
| `atlas-ai` | Atlas AI — Financial Copilot & SEC RAG | `SOLE_AUTHOR` | `HACKATHON_EVENT` (Humanity Founders) | `INDEPENDENT_IP` (Hackathon Build) | Public (`aadil-lang`) |
| `ask-aadil` | Engineering Portfolio & Ask Aadil | `SOLE_AUTHOR` | `INDEPENDENT_RESEARCH` | `INDEPENDENT_IP` | Public (`aadil-lang`) |
| `solace-ai` | Solace AI — Mindful Wellness Companion | `SOLE_AUTHOR` | `HACKATHON_EVENT` (Solace Hackathon) | `INDEPENDENT_IP` (Hackathon Build) | Public (`aadil-lang`) |
| `ocr-evaluator` | OCR Evaluation & Robustness Platform | `SOLE_AUTHOR` | `INDEPENDENT_RESEARCH` | `INDEPENDENT_IP` | Public (`aadil-lang`) |

