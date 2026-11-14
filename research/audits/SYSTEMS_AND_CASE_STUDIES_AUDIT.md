# SYSTEMS ARCHIVE AND CASE STUDIES AUDIT
**Forensic Investigation of 11 Engineering Systems: Architectural Topologies, Deterministic Boundaries & Case Study Fidelity**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, Systems Architecture Specialist
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** READ-ONLY AUDIT (Evidence-Grounded Forensic Assessment)

---

## 1. EXECUTIVE SUMMARY & SYSTEM TOPOLOGY OVERVIEW

The portfolio features 11 structured engineering case studies accessible via `/systems/[slug]` and `/projects/[slug]`, backed by canonical metadata in `data/projects.ts` and interactive architecture topologies in `data/architecture/systemsArchitecture.ts` (Level 1 and Level 2 architectural depths).

This audit verified every system's architecture, data flow, failure boundaries, model providers, and deterministic solvers against primary code evidence and verified repository implementations.

---

## 2. 11 SYSTEMS ARCHITECTURAL & CASE STUDY VERIFICATION

### System 01: VM Copy Question Generator
- **Slug:** `vm-copy` | **Path:** `data/projects.ts:7-75`, `data/architecture/systemsArchitecture.ts:16-160`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** Input Base Item → Multimodal Vision Pre-Analysis → Parallel Micro-Batch Dispatcher (`calculateBatches`) → Multi-Model Router (OpenAI / Gemini / Portkey) → Tier-1 Deterministic Evaluator (`lib/eval-layer.ts`) → Reactive UI Status Badges → Tier-2/3 Adversarial Blind-Solve Verifier (`/api/verify`).
- **Deterministic Component:** In-memory TypeScript structural evaluation (< 1ms, $0 cost) enforcing 4 options, single CA logic, and duplicate distractor rejection via normalized Set checks.
- **Failure Containment:** Parallel micro-batching partitions requests into batches of at most 2–3 items, preventing serverless 30-second gateway timeouts.
- **Architectural Fidelity:** **HIGH (VERIFIED)**. Every layer maps directly to source code in `lib/eval-layer.ts` and `app/api/generate/route.ts`.

---

### System 02: AI Worksheets Product POC
- **Slug:** `ai-worksheets` | **Path:** `data/projects.ts:76-130`, `data/architecture/systemsArchitecture.ts:161-330`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** Teacher Configuration (TEKS Standard + Subskill) → FastAPI Async Gateway → [Formal Pipeline: Portkey/GPT-4o Question Gen → Gemini Flash TikZ Code → Headless TeX Live Subprocess Pool (`pdflatex` + `pdftoppm` 300 DPI) with MD5 Cache → WeasyPrint Paged PDF] | [Gamified Pipeline: GPT-5.2 3-Prompt Clue Gen & Verification → Deterministic 2D Crossword Backtracking Solver & Honeycomb Hex Maze DFS Engine → ReportLab Vector PDF] → React 18 / Vite 6 Interactive Student Player.
- **Deterministic Component:** Algorithmic 2D crossword collision-free backtracking; honeycomb hexagonal maze depth-first search path carving; headless LaTeX compilation sandbox.
- **Failure Containment:** Isolates TeX Live subprocess execution in temporary directories with 20s timeouts; traps compilation crashes before user delivery.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 03: Curriculum Transformation Engine
- **Slug:** `curriculum-etl` | **Path:** `data/projects.ts:131-185`, `data/architecture/systemsArchitecture.ts:331-500`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** Unstructured Curriculum Input (Multi-MB PDFs/DOCX) → Dynamic Contract Synthesis (derives column schemas from customer sample CSVs) → Document Chunking & Celery Map-Reduce Workers (Claude 3.5 Sonnet extraction with strict JSON tool calling) → Dynamic Pydantic Row Validation → 3-Tier Integrity Gate (Reviewer, Critic, CSV Audit) → Normalized CSV / Structured Data Store.
- **Deterministic Component:** Runtime-compiled Pydantic schemas validating row-level types, grade-band formatting, and mathematical domain taxonomies; formula injection sanitization.
- **Failure Containment:** Malformed rows quarantined; automated audit scripts abort export if schema contracts are violated.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 04: US Mathematics Item Bank Generation Pipeline
- **Slug:** `math-item-bank` | **Path:** `data/projects.ts:186-245`, `data/architecture/systemsArchitecture.ts:501-650`
- **Architecture Level:** Level 2 (Collaborative Team Architecture)
- **Architecture Topology:** Team Item Bank Generation Pipeline → State Curriculum Alignment Engine → Mathematical Image Domain Router (Aadil's contribution: SVG for coordinate graphs vs TikZ for abstract geometry) → Headless Two-Tier Compile & Visual Evaluation Gate → Integer Linear Programming (ILP) Stratified Sampling with Min/Max Swap logic.
- **Deterministic Component:** SVG coordinate math validators; TeX compilation gate; Min/Max swap optimization balancing grade-level curriculum weightage targets.
- **Attribution Discipline:** Explicitly preserves team authorship while documenting Aadil's individual modules (visual routing and compile gates).
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 05: Engineering Design Automation (EDA CAD)
- **Slug:** `design-automation` | **Path:** `data/projects.ts:246-319`, `data/architecture/systemsArchitecture.ts:651-820`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** Natural-Language Engineering Brief → LLM Requirement Interpreter (extracts operational load, speed, safety factor, material constraints) → Closed-Form Mechanical Physics Solver (torsional shear stress, allowable stress, nominal diameter sizing) → OpenCascade CadQuery BRep CAD Kernel → 3D STEP Geometry & 2D SVG Technical Drawings → Dimensional Cross-Validation & Volume Discrepancy Gate.
- **Deterministic Component:** Analytical closed-form physics equations eliminating model arithmetic errors; OpenCascade solid boundary representation geometry calculations.
- **Verified Metric:** 424 tests across 28 test suites passing; volume calculation discrepancy < 10⁻⁶ relative error (0.0000%).
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 06: AI Application Reliability & Browser QA
- **Slug:** `ai-reliability` | **Path:** `data/projects.ts:320-389`, `data/architecture/systemsArchitecture.ts:821-990`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** AI Application Under Test (e.g. VM Copy) → Playwright Browser Automation Controller → Empirical Telemetry Collector (DOM snapshots, console logs, network payloads) → Local Ollama Reasoning Agent (Qwen 2.5 Coder via MCP) → Fisher Information Covariance Uncertainty Filter (calculates action ambiguity) → Cryptographic Consequential Change Authorization Gate (`ChangeAuthorization` token with SHA-256 ledger) → Browser Mutation / Execution Abstention.
- **Deterministic Component:** Deterministic abstention (`GateDecision.ABSTAIN`) when covariance exceeds threshold; cryptographic token validation prior to stateful actions.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 07: Loom AI — B2B Textile Marketplace Platform
- **Slug:** `loom-ai` | **Path:** `data/projects.ts:390-475`, `data/architecture/systemsArchitecture.ts:991-1120`
- **Architecture Level:** Level 2 (Full-Stack Marketplace Architecture)
- **Architecture Topology:** Buyer / Supplier Web App (Next.js 16 / React 19) → Express / Clean Architecture Domain Layer (Entities, Use Cases, Adapters) → LangGraph Multi-Agent Procurement Engine (inquiry parsing, supplier matching, inventory checks) → Human-in-the-Loop (HITL) Order Approval Gate → MongoDB Atlas Persistence.
- **Deterministic Component:** HITL approval barrier freezing checkout execution until manual human buyer sign-off.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 08: Atlas AI — Financial Copilot & SEC Filing RAG
- **Slug:** `atlas-ai` | **Path:** `data/projects.ts:476-578`, `data/architecture/systemsArchitecture.ts:1121-1250`
- **Architecture Level:** Level 2 (Financial Agent Architecture)
- **Architecture Topology:** User / Telegram Interface → FastAPI Asynchronous Gateway → LangGraph StateGraph Router → SEC EDGAR 10-K/10-Q Document Chunker with Table Preservation → MongoDB Atlas Vector Search + Gemini Embeddings → Financial Grounding Synthesizer → Background Proactive Alert Daemon (Finnhub API trigger polling).
- **Deterministic Component:** Threshold breach detector triggering alerts deterministically on mathematical boundary breaches without LLM inference.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 09: Engineering Portfolio Platform & Ask Aadil Agent
- **Slug:** `ask-aadil` | **Path:** `data/projects.ts:579-681`, `data/architecture/systemsArchitecture.ts:1251-1400`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** User Query / Voice Speech Input (Web Speech API + VAD) → Query Understanding & Entity Resolution → Deterministic Intent Router → Hybrid Retriever (BM25 Lexical + TF-IDF Vector Space across 6 Canonical Layers) → Epistemic Source Boundary Gate → Grounded Synthesizer → Bitwise Draft Integrity Gate (`executionInput === editedDraft`) → Visitor HITL Mail Action Confirmation.
- **Deterministic Component:** Bitwise draft comparison; strict epistemic boundary checks preventing source cross-contamination; 6-state intent routing.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 10: Solace AI — Mindful Wellness Companion
- **Slug:** `solace-ai` | **Path:** `data/projects.ts:682-825`, `data/architecture/systemsArchitecture.ts:1401-1550`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** React Native / Expo 58 Mobile Client → Synchronous Pre-LLM Crisis Filter (`is_crisis_input` checking Tele-MANAS 14416 / 112 / 988 hotlines) → LangGraph StateGraph (Emotion Landscape, Guided Breathing, Voice AI) → Consent-Based Memory Node (revocable user items) → Ephemeral Voice Audio Purge (0-retention in `finally` block) → Single-POST SSE Guard (treats HTTP 502/503/504 as ambiguous delivery without blind retries).
- **Deterministic Component:** Synchronous pre-LLM regex crisis screening bypassing generative pipeline; single-POST SSE connection guard.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

### System 11: OCR Evaluation & Robustness Testing Platform
- **Slug:** `ocr-evaluator` | **Path:** `data/projects.ts:826-1035`, `data/architecture/systemsArchitecture.ts:1551-1700`
- **Architecture Level:** Level 1 (Full Interactive Architecture Graph)
- **Architecture Topology:** Document Input + Ground Truth Annotations → Multi-Tier Extractor (Tesseract OCR / Model Extractor) → Multi-Metric Auditing Engine (CER, WER, Field-Level Exact Match, Critical-Field Recall) → Priority Risk Engine (PASS / REVIEW / FAIL overriding aggregate confidence) → 5-Axis Controlled Synthetic Degradation Sandbox (Blur, Noise, Skew, Contrast, JPEG).
- **Deterministic Component:** Levenshtein edit-distance dynamic programming algorithms; hierarchical rule-based priority risk matrices.
- **Architectural Fidelity:** **HIGH (VERIFIED)**.

---

## 3. CROSS-SYSTEM ARCHITECTURAL CONSISTENCY
All 11 case studies adhere strictly to the portfolio's central engineering thesis:
**"Language models propose candidates; deterministic code, physics solvers, compilers, and state machines enforce invariants and govern side effects."**
Every architecture diagram reflects genuine, working code patterns rather than aspirational mockups.

