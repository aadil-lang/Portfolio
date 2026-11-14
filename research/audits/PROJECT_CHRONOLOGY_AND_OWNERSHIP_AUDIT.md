# PROJECT CHRONOLOGY AND OWNERSHIP AUDIT
**Canonical Project Register, Attribution Boundaries & Individual Contribution Forensics**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, GitHub Forensics Engineer, Data Integrity Specialist
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** READ-ONLY AUDIT (Evidence-Grounded Forensic Assessment)

---

## 1. PROJECT REGISTER SUMMARY & OWNERSHIP FRAMEWORK

The portfolio documents eleven primary engineering systems and applications. This audit classifies each project according to the authoritative six-tier ownership taxonomy:

1. **Personally Designed & Implemented:** End-to-end individual authorship from architecture through implementation and testing.
2. **Personally Implemented Within a Team System:** Discrete subsystems or gates built individually inside an organizational codebase.
3. **Team-Developed with Identifiable Individual Contributions:** Collaborative team deliverable where specific modules, gates, or routers were contributed.
4. **POC / Experimental Implementation:** Company-commissioned or independent proof of concept exploring feasibility.
5. **Independent Research / Exploration:** Self-directed technical investigation post-employment.
6. **Planned / Proposed (Not Implemented):** Architectural proposals without running executable artifacts.

---

## 2. CANONICAL PROJECT REGISTER (11 SYSTEMS)

### Project 01: VM Copy Question Generator
- **System Identifier:** `vm-copy`
- **Canonical Title:** VM Copy Question Generator
- **Development Window:** October 2025 — December 2025 (Deployed internally early 2026)
- **Organizational Context:** Wayground Inc (Initiated during Mathematics SME tenure as an internal productivity solution)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1)**
- **Attribution Boundary:** Independently built by Aadil to resolve high-friction assessment variation bottlenecks. Decoupled candidate question generation from deterministic validation.
- **Technologies Used:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS, Portkey AI Gateway, OpenAI SDK, KaTeX, Recharts, Vitest / Node assertion harness.
- **Implemented Capabilities:**
  - In-memory Tier-1 Deterministic Evaluator (`lib/eval-layer.ts`) asserting 4 options, single CA invariant, and duplicate option detection (< 1 ms latency, $0 API cost).
  - Parallel micro-batching (`calculateBatches`) dispatching concurrent generation in batches of 2–3 items to prevent serverless timeouts (4–8s total response).
  - Tier-2/3 adversarial blind-solve verification interface (`/api/verify`).
- **Testing & Verification Status:** Static TypeScript 5 typechecks, runtime structural assertions in `lib/eval-layer.ts`. Later dogfooded as a live test target under the AI Application Reliability platform.
- **Repository Reference:** `https://github.com/aadil-lang/vm-copy-question-generator` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION** (No proprietary company secrets or proprietary question banks leaked).

---

### Project 02: AI Worksheets Product POC
- **System Identifier:** `ai-worksheets`
- **Canonical Title:** AI Worksheets Product POC
- **Development Window:** February 2026 — April 2026 (Documented in March 2026 Wayground Leadership Brief)
- **Organizational Context:** Wayground Inc (Company Proof of Concept, AI/ML Team)
- **Ownership Classification:** **POC / Experimental Implementation (Category 4 / Independent Build)**
- **Attribution Boundary:** Independently designed and built by Aadil as a full-stack company POC under internal exploration.
- **Technologies Used:** FastAPI (Python 3.12), React 18, Vite 6, TeX Live (`pdflatex`), Poppler (`pdftoppm`), WeasyPrint, ReportLab, Portkey (GPT-4o), Gemini Flash, GPT-5.2 candidate prompting.
- **Implemented Capabilities:**
  - Dual-pipeline architecture: Formal Question Worksheets with technical diagrams vs. Gamified Worksheets (Crosswords & Maze Trails).
  - Headless TeX Live / Poppler pipeline compiling TikZ code into verified 300-DPI rasterized PNGs with MD5 content-hashed caching.
  - Algorithmic 2D crossword solver using deterministic backtracking with intersection checks.
  - Honeycomb hexagonal maze generator using DFS path carving and arithmetic distractor models.
- **Testing & Verification Status:** Subprocess execution verification, temporary directory isolation, verified PDF and interactive web export.
- **Repository Reference:** `https://github.com/aadil-lang/Worksheets-MS-Formal-Gamified` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION** (POC architecture and code; proprietary corporate curriculum databases excluded).

---

### Project 03: Curriculum Transformation Engine
- **System Identifier:** `curriculum-etl`
- **Canonical Title:** Curriculum Transformation Engine
- **Development Window:** February 2026 — June 2026 (Phased: V1 Feb 2026, V2 Map-Reduce Apr 2026, V3 3-Tier Gate Jun 2026)
- **Organizational Context:** Wayground Inc (AI/ML Team)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1)**
- **Attribution Boundary:** Independently engineered ETL pipeline to automate the ingestion of multi-megabyte unstructured state standard PDFs (e.g. Texas TEKS, Florida B.E.S.T.) into normalized machine-readable CSV/JSON schemas.
- **Technologies Used:** Python 3.12, Claude 3.5 Sonnet, Pydantic v2, Pandas, Celery, Redis, `ThreadPoolExecutor`, `pdfplumber`.
- **Implemented Capabilities:**
  - Dynamic schema derivation extracting column hierarchies, field types, and taxonomy rules from customer sample CSV contracts without hardcoded scripts.
  - Asynchronous Map-Reduce document partitioning chunking multi-page PDFs with parallel worker extraction.
  - Three-tier integrity validation gate: Reviewer/Critic LLM validation, deterministic Pydantic row guards, and automated post-extraction CSV audit.
- **Testing & Verification Status:** Verified against multi-state curriculum documents; CSV structural auditing scripts and integrity assertions passing.
- **Repository Reference:** `https://github.com/aadil-lang/Curriculum-Transformation` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

### Project 04: US Mathematics Item Bank Generation Pipeline
- **System Identifier:** `math-item-bank`
- **Canonical Title:** US Mathematics Item Bank Generation Pipeline
- **Development Window:** April 2026 — July 2026
- **Organizational Context:** Wayground Inc (Collaborative AI/ML & Assessment Team System)
- **Ownership Classification:** **Team-Developed with Identifiable Individual Contributions (Category 3)**
- **Attribution Boundary:** **CRITICAL ATTRIBUTION BOUNDARY.** This was a collaborative company team system. Aadil did NOT design or build the entire item bank architecture. His specific, documented, verified contributions were:
  1. *Domain-Based Visual Routing:* Engineered conditional routing directing geometric/coordinate questions to SVG generators and abstract formulas to compiled TikZ/LaTeX.
  2. *Compile & Visual Evaluation Gates:* Constructed two-tier headless verification gates assessing visual correctness.
  3. *Upper Elementary Pipeline Stabilization:* Maintained and tuned prompt schemas for grade 3–5 standards.
  4. *Stratified Sampling Logic:* Contributed to the Integer Linear Programming (ILP) and Min/Max Swap algorithm to balance curriculum weightages.
  5. *Review Tool Frontend Support:* Fixed consultant-reported UI bugs in two React/TypeScript vetting interfaces.
- **Technologies Used:** Python, LangGraph, Pydantic, React, TypeScript, LLMs, Vision Models, SVG, TikZ, Integer Linear Programming (ILP).
- **Testing & Verification Status:** Validated within team production releases.
- **Repository Reference:** `github: null` (Proprietary corporate team repository; correctly kept private / unlinked in `data/projects.ts:196`).
- **Publication Eligibility:** **ELIGIBLE FOR CONCEPTUAL & ARCHITECTURAL CASE STUDY** (Strictly preserving team attribution and excluding proprietary internal item stores).

---

### Project 05: Engineering Design Automation (EDA CAD)
- **System Identifier:** `design-automation`
- **Canonical Title:** Engineering Design Automation (EDA CAD)
- **Development Window:** August 2026 — September 2026
- **Organizational Context:** Independent Engineering Project (Post-Wayground)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1)**
- **Attribution Boundary:** Sole author and systems architect. Integrates natural-language requirement parsing with deterministic mechanical engineering closed-form physics solvers and CAD boundary representation kernels.
- **Technologies Used:** Python 3.12, FastAPI, OpenCascade, CadQuery, NumPy, SVG, STEP 3D format, pytest, Docker.
- **Implemented Capabilities:**
  - Closed-form analytical torsional stress, allowable shear, and von Mises yield safety factor solvers eliminating LLM calculation errors.
  - Programmatic nominal shaft series selection from standard mechanical engineering diameter tables.
  - OpenCascade CadQuery BRep CAD kernel generating valid 3D STEP geometry and 2D SVG drawings.
  - Automated dimensional cross-validation between CAD solid models and technical drawing dimensions.
- **Testing & Verification Status:** **424 automated tests across 28 test suites** passing in Dockerized pytest runner; volume calculation discrepancy between analytical calculus integrals and OpenCascade CAD mass properties verified at **0.0000% error** (< 10⁻⁶ relative numerical tolerance).
- **Repository Reference:** `https://github.com/aadil-lang/Engineering-design-automation` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

### Project 06: AI Application Reliability & Browser QA
- **System Identifier:** `ai-reliability`
- **Canonical Title:** AI Application Reliability & Browser QA
- **Development Window:** August 2026 — September 2026
- **Organizational Context:** Independent Engineering Project (Post-Wayground)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1)**
- **Attribution Boundary:** Sole author. Explores deterministic verification, execution grounding, and cryptographic authorization gates for AI-driven applications.
- **Technologies Used:** Python 3.12, FastAPI, Playwright, Chromium, Ollama (Qwen 2.5 Coder), Model Context Protocol (MCP), SQLite, pytest.
- **Implemented Capabilities:**
  - Empirical observation grounding: captures DOM snapshots, console logs, network requests, and screenshot artifacts.
  - Uncertainty modeling and deterministic abstention: evaluates action ambiguity before executing stateful side-effects.
  - Cryptographic change authorization gate: requires explicit `ChangeAuthorization` token with SHA-256 provenance tracking before approving mutations.
  - Autonomously dogfooded against VM Copy Question Generator as a live evaluation target.
- **Testing & Verification Status:** **158 backend test suites** and **47 governance/Playwright tests** passing.
- **Repository Reference:** `https://github.com/aadil-lang/ai-engineering-lab` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

### Project 07: Loom AI — B2B Textile Marketplace Platform
- **System Identifier:** `loom-ai`
- **Canonical Title:** Loom AI — B2B Textile Marketplace Platform
- **Development Window:** August 2026
- **Organizational Context:** Humanity Founders Marketplace Hackathon (Independent Project)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1 / Hackathon Build)**
- **Attribution Boundary:** Sole author and systems engineer.
- **Technologies Used:** Next.js 16, React 19, TypeScript 5, Express, MongoDB Atlas, LangGraph, Playwright.
- **Implemented Capabilities:**
  - Full-stack clean architecture separating domain entities, use cases, and repository adapters.
  - LangGraph procurement agent for semantic matching of buyer inquiries against supplier catalogs.
  - Human-in-the-loop (HITL) approval gates for restocking orders and checkout execution prior to database state persistence.
- **Testing & Verification Status:** Playwright end-to-end integration flows and API verification tests passing.
- **Repository Reference:** `https://github.com/aadil-lang/loom-ai` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

### Project 08: Atlas AI — Financial Copilot & SEC Filing RAG
- **System Identifier:** `atlas-ai`
- **Canonical Title:** Atlas AI — Financial Copilot & SEC Filing RAG
- **Development Window:** August 2026
- **Organizational Context:** Humanity Founders Finance Hackathon (Independent Project)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1 / Hackathon Build)**
- **Attribution Boundary:** Backend and systems engineer.
- **Technologies Used:** Python 3.12, FastAPI, LangGraph, MongoDB Atlas Vector Search, Gemini, SEC EDGAR API, Telegram Bot API, pytest.
- **Implemented Capabilities:**
  - Asynchronous Telegram-first financial copilot parsing SEC EDGAR 10-K/10-Q disclosures with chunk-level attribution.
  - Vector search retrieval layer powered by MongoDB Atlas Vector Search and Gemini embeddings.
  - Proactive background alert worker daemon polling market feeds and triggering threshold alerts without user prompting.
- **Testing & Verification Status:** Initial MVP verified with **59 automated tests**; expanded test runner contains **178 pytests**.
- **Repository Reference:** `https://github.com/aadil-lang/Atlas-AI` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

### Project 09: Engineering Portfolio Platform & Ask Aadil Agent
- **System Identifier:** `ask-aadil`
- **Canonical Title:** Engineering Portfolio Platform & Ask Aadil Agent
- **Development Window:** September 2026 — November 2026
- **Organizational Context:** Independent Personal Project
- **Ownership Classification:** **Personally Designed & Implemented (Category 1)**
- **Attribution Boundary:** Sole author and systems architect.
- **Technologies Used:** Next.js 16, React 19, TypeScript 5, Tailwind CSS, Hybrid RAG (BM25 + TF-IDF Vector), Web Speech API, Playwright.
- **Implemented Capabilities:**
  - Stateful conversational agent with multi-turn entity tracking and deterministic intent routing across 6 canonical knowledge layers.
  - Strict epistemic boundaries separating formal employment from post-employment independent research.
  - Bitwise draft integrity (`executionInput === editedDraft`) and visitor confirmation before mail actions without LLM rewriting.
  - Voice interface with Voice Activity Detection (VAD), barge-in handling, and speech transcript reconstruction.
  - 36-folio interactive Engineering Journal and 3D Capability Cube with desktop drag and 5s auto-rotation.
- **Testing & Verification Status:** **172 automated core hardening verifications** passing across agent QA, tool governance, and Playwright browser suites (327 assertions total across 10 evaluation test files).
- **Repository Reference:** `https://github.com/aadil-lang/portfolio` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

### Project 10: Solace AI — Mindful Wellness Companion
- **System Identifier:** `solace-ai`
- **Canonical Title:** Solace AI — Mindful Wellness Companion
- **Development Window:** November 2026
- **Organizational Context:** Solace Hackathon (Independent Project)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1 / Hackathon Build)**
- **Attribution Boundary:** System architect and sole author.
- **Technologies Used:** React Native / Expo 58, TypeScript 5, FastAPI, Python 3.12, LangGraph, Google Gemini API, Supabase Auth & PostgreSQL RLS, SSE Streaming, pytest, Jest.
- **Implemented Capabilities:**
  - Synchronous pre-LLM deterministic crisis screening (`is_crisis_input`) running inside LangGraph safety node before retrieval or Gemini generation (hotlines: Tele-MANAS 14416, 112, 988).
  - Consent-based emotional memory architecture allowing users to inspect, revoke, or purge memory items.
  - Zero-retention voice privacy with raw audio bytes purged in an immediate `finally` block.
  - Single-POST SSE delivery guards treating HTTP 502/503/504 as ambiguous delivery without blind retries.
- **Testing & Verification Status:** Verified on standalone Android APK (Pixel 7 emulator, Android 16 API 36) with **52 backend pytests** and **50 mobile checks** passing (0 TypeScript errors).
- **Repository Reference:** `https://github.com/aadil-lang/solace-ai` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

### Project 11: OCR Evaluation & Robustness Testing Platform
- **System Identifier:** `ocr-evaluator`
- **Canonical Title:** OCR Evaluation & Robustness Testing Platform
- **Development Window:** September 2026
- **Organizational Context:** Independent Engineering Project (Post-Wayground)
- **Ownership Classification:** **Personally Designed & Implemented (Category 1)**
- **Attribution Boundary:** Sole author and evaluation engineer.
- **Technologies Used:** Python 3.12, FastAPI, Tesseract OCR, React, pytest, Pillow, OpenCV, NumPy.
- **Implemented Capabilities:**
  - Multi-tier document extraction auditing: Character Error Rate (CER), Word Error Rate (WER), field-level exact match, and critical-field accuracy.
  - Priority risk classification engine assigning PASS / REVIEW / FAIL decisions based on field severity, overriding aggregate confidence scores.
  - Controlled document degradation benchmarking across 5 physical axes: Gaussian blur, additive noise, rotation skew, contrast reduction, and JPEG compression.
- **Testing & Verification Status:** **134 automated backend pytests** across 22 test files and **20 browser UI assertions** passing with 0 console errors.
- **Repository Reference:** `https://github.com/aadil-lang/OCR-Evaluator` (Public / Validated)
- **Publication Eligibility:** **ELIGIBLE FOR PUBLIC PRESENTATION**.

---

## 3. ATTRIBUTION VIOLATIONS & REMEDIATION DIRECTIVES

| Discrepancy ID | Location | Erroneous Presentation | Factual Ground Truth | Remediation Action |
|---|---|---|---|---|
| **ATTRIB-01** | `data/canonical/sourceConflicts.ts:75` | "Authored production Next.js tools (Content Builder, VM Copy) during SME tenure" | Aadil did NOT author Content Builder; VoyageMath Engineering built Content Builder. Aadil contributed SME testing, bug reports, and requirements. He authored **VM Copy**. | Edit `sourceConflicts.ts` to state: "Authored VM Copy Question Generator; contributed SME testing and bug reports to VoyageMath Content Builder". |
| **ATTRIB-02** | `data/canonical/journalChapters.ts:271` | Chapter 14 title: "From Applications to Pipelines" describes Item Bank as if Aadil authored the entire pipeline | Item Bank was a collaborative team pipeline; Aadil's contributions were visual routing, compile gates, and standard balancing. | Ensure chapter subtitle and metadata explicitly state "Team Pipeline · Visual Domain Routing & Compile Gates Contribution". |
| **ATTRIB-03** | `data/projects.ts:186` | `math-item-bank` github field was temporarily listed with an EDA repository URL in early test build scripts | GitHub URL must remain `null` as it is a proprietary company team codebase. | Confirmed `github: null` in current `data/projects.ts:196`. |

---

## 4. CONCLUSION
All 11 systems have clean, defensible ownership boundaries. Ten are personally designed and implemented (either as independent builds, POCs, or hackathon deliverables), while exactly one (`math-item-bank`) is a collaborative company team system with specific, verified individual module contributions.
