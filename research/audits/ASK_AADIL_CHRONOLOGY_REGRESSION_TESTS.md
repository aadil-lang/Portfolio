# ASK AADIL CHRONOLOGY REGRESSION TEST SUITE
**Definitive Acceptance Criteria, Grounded Answers & Invariant Specifications for Conversational Hardening**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, QA & Evidence Verification Engineer
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** SPECIFICATION ONLY (Read-Only Audit Phase — Do Not Modify Chatbot)

---

## 1. PURPOSE AND GROUNDING SPECIFICATION

This document establishes the 12 canonical regression tests designed to lock Ask Aadil's conversational retrieval engine into strict factual alignment. For each query, it specifies the required factual statements, required sources, required dates, forbidden hallucinations/claims, and expected abstention boundaries.

---

## 2. THE 12 CANONICAL REGRESSION TESTS

### Test 01: "How did Aadil move from mathematics to AI?"
- **Expected Answer:**
  Aadil began his professional career (2021–2022) authoring K–12 mathematics solutions, formatting coordinate geometry, and validating distractors at Graveiens, InhaltMart, and DIGIPPLUS. During his tenure as a Mathematics Subject Matter Expert at Wayground (Jan 2024 – Dec 2025), he validated VoyageMath KaTeX rendering and supported rapid 10-day content releases. In 2025, as language models were introduced to assist in question generation, he identified that LLMs repeatedly violated structural constraints (duplicate distractors, multiple correct answers, broken keys). Rather than relying on prompt expansion, he independently engineered the **VM Copy Question Generator (Oct–Dec 2025)**, placing a zero-cost deterministic TypeScript evaluator (`lib/eval-layer.ts`) outside the model. The production success of VM Copy served as the direct catalyst for his internal promotion into the **Wayground AI/ML Team in January 2026**, where he engineered distributed curriculum ETL pipelines, AI Worksheets, and visual evaluation gates. Following the conclusion of formal employment in July 2026, he continued building independent agentic systems, CAD automation, and reliability harnesses.
- **Required Sources:** `Resume · Professional Experience`, `Timeline · Milestones 01–08`, `Systems Archive · VM Copy`.
- **Required Dates:** 2021–2022 (Early Content), Jan 2024 – Dec 2025 (Wayground SME), Oct–Dec 2025 (VM Copy Build), Jan 2026 – Jul 2026 (AI/ML Team), Aug 2026 – Present (Independent Systems).
- **Claims That Must NOT Be Made:**
  - MUST NOT state VM Copy was built in "Early 2025".
  - MUST NOT place AI Worksheets, Item Bank, or Curriculum ETL in 2025.
  - MUST NOT state Aadil was an AI Engineer in 2024 or 2025.
- **Expected Citations:** Specific record badges, not generic labels.

---

### Test 02: "When did Aadil work as a Mathematics SME?"
- **Expected Answer:**
  Aadil formally worked as a **Subject Matter Expert — Mathematics** at **Wayground Inc from January 2024 through December 2025** (2 full years) based in Bengaluru, India. Earlier in his career, he also held mathematics content and SME roles at Graveiens Edu Services (May 2021 – Oct 2021), InhaltMart Educational Services (Oct 2021 – Feb 2022), and DIGIPPLUS (Jun 2022 – Sep 2022).
- **Required Sources:** `Resume · Professional Experience`, `Timeline · Zone 01 & Zone 02`.
- **Required Dates:** Jan 2024 – Dec 2025 (Wayground); May 2021 – Sep 2022 (Early foundations).
- **Claims That Must NOT Be Made:**
  - MUST NOT claim he was a software engineer or AI engineer during 2024.
  - MUST NOT claim he designed or built VoyageMath software architecture.

---

### Test 03: "When did Aadil formally become an AI Engineer?"
- **Expected Answer:**
  Aadil formally became an **AI Engineer in January 2026**, when he transitioned internally into the **Wayground AI/ML Team** as *AI Engineer — AI/ML Team* (January 2026 – July 2026). Prior to January 2026, his formal employment title was Subject Matter Expert — Mathematics. His independent development of VM Copy in late 2025 served as the technical catalyst for this internal transfer.
- **Required Sources:** `Resume · Professional Experience`, `Timeline · Zone 03`.
- **Required Dates:** January 2026.
- **Claims That Must NOT Be Made:**
  - MUST NOT backdate AI Engineer employment to 2024 or 2025.
  - MUST NOT extend Wayground employment beyond July 2026.

---

### Test 04: "Was VM Copy developed in 2025 or 2026?"
- **Expected Answer:**
  **VM Copy Question Generator was developed in late 2025 (October — December 2025)** by Aadil as an independent initiative during his tenure as a Mathematics SME at Wayground. It was subsequently deployed internally and dogfooded in early 2026, serving as the technical catalyst for his formal promotion into the AI/ML Team in January 2026.
- **Required Sources:** `Timeline · Milestone 08`, `Resume · VM Copy`, `Canonical Source Conflicts`.
- **Required Dates:** Oct–Dec 2025 (Development); Early 2026 (Internal deployment/catalyst).
- **Claims That Must NOT Be Made:**
  - MUST NOT claim it was built in "Early 2025" or "Feb 2025".
  - MUST NOT claim it was built under client or agency contract.

---

### Test 05: "Which projects were developed during the AI/ML Team period?"
- **Expected Answer:**
  During his formal tenure on the **Wayground AI/ML Team (January 2026 – July 2026)**, Aadil engineered:
  1. **Curriculum Transformation Engine:** An asynchronous Map-Reduce ETL pipeline transforming unstructured K–12 state standards into structured schemas with dynamic Pydantic contracts and 3-tier integrity gates.
  2. **AI Worksheets Product POC:** A company proof of concept pairing multi-model AI generation with headless TeX Live (`pdflatex`) TikZ compilation and deterministic 2D crossword and hexagonal maze backtracking solvers.
  3. **US Mathematics Item Bank Generation Pipeline:** A collaborative team system where Aadil engineered the mathematical image domain router (SVG vs TikZ), compile/visual evaluation gates, and standard balancing.
- **Required Sources:** `Resume · Wayground AI/ML Team`, `Timeline · Zone 03`, `Systems Archive`.
- **Required Dates:** January 2026 – July 2026.
- **Claims That Must NOT Be Made:**
  - MUST NOT attribute Loom AI, Atlas AI, EDA, or Solace AI to Wayground.

---

### Test 06: "Which projects are independent?"
- **Expected Answer:**
  The independent projects developed after formal employment at Wayground concluded in July 2026 are:
  1. **Loom AI** (August 2026): B2B textile marketplace with LangGraph procurement and HITL order approvals (Humanity Founders Hackathon).
  2. **Atlas AI** (August 2026): Asynchronous Telegram-first SEC EDGAR RAG copilot and proactive alert daemon (Humanity Founders Hackathon).
  3. **OCR Evaluation Platform** (September 2026): Multi-tier CER/WER evaluation, priority risk engine, and 5-axis image degradation testing.
  4. **Engineering Design Automation (EDA CAD)** (September 2026): Closed-form physics solvers and OpenCascade BRep solid modeling (424 pytests, 0.0000% volume calculation error).
  5. **AI Application Reliability Platform** (September 2026): Browser QA harness with Fisher covariance uncertainty filtering and cryptographic change authorization gates.
  6. **Engineering Portfolio & Ask Aadil** (September–November 2026): Source-grounded RAG portfolio platform.
  7. **Solace AI** (November 2026): Android wellness companion with pre-LLM crisis screening and consent-based memory (Solace Hackathon).
- **Required Sources:** `Timeline · Zone 04`, `Resume · Personal & Hackathon Projects`.
- **Required Dates:** August 2026 — Present.
- **Claims That Must NOT Be Made:**
  - MUST NOT describe any of these 7 projects as Wayground work or client employment.

---

### Test 07: "What did Aadil personally implement in the US Mathematics Item Bank?"
- **Expected Answer:**
  The US Mathematics Item Bank was a **collaborative company team system**. Aadil did not build the entire system alone. His specific documented contributions were:
  1. **Domain-Based Visual Routing:** Directed geometric/coordinate problems to SVG generators and abstract formulas to compiled TikZ/LaTeX.
  2. **Compile & Visual Evaluation Gates:** Built headless two-tier verification gates validating visual output before question ingestion.
  3. **Upper Elementary Pipeline Support:** Tuned prompts and validation for Grade 3–5 standards.
  4. **Stratified Sampling:** Contributed to the Integer Linear Programming (ILP) and Min/Max Swap logic for curriculum weightage balancing.
  5. **Vetting UI Bug Fixes:** Resolved consultant-reported UI bugs in two React/TypeScript review tools.
- **Required Sources:** `data/experience.ts:330-348`, `data/projects.ts:186-245`, `data/verification/evidenceRegistry.ts:EVID-MIB-01`.
- **Claims That Must NOT Be Made:**
  - MUST NOT claim Aadil was the sole creator of the Item Bank.
  - MUST NOT claim ownership of the underlying assessment database.

---

### Test 08: "What was the architecture of AI Worksheets?"
- **Expected Answer:**
  AI Worksheets was an independent full-stack company POC featuring a **dual-pipeline architecture**:
  1. **Formal Question Worksheets:** Portkey/GPT-4o generates questions, Gemini Flash generates standalone LaTeX/TikZ code, which is compiled into verified 300-DPI PNGs via a headless TeX Live (`pdflatex` + `pdftoppm`) subprocess pool with MD5 content-hashed caching, exported via WeasyPrint.
  2. **Gamified Worksheets:** GPT-5.2 candidate prompting feeds custom deterministic algorithms: an algorithmic 2D crossword backtracking solver with intersection checks and a honeycomb hexagonal maze engine using depth-first search (DFS) with arithmetic mistake distractor models, exported via ReportLab.
- **Required Sources:** `data/projects.ts:76-130`, `data/architecture/systemsArchitecture.ts:comp-wks-*`.
- **Claims That Must NOT Be Made:**
  - MUST NOT claim LLMs generated the 2D crossword grid or maze paths (they were generated by deterministic backtracking algorithms).

---

### Test 09: "What evidence supports the EDA test count?"
- **Expected Answer:**
  Engineering Design Automation is supported by **424 automated pytests passing across 28 test suites** executed inside a containerized Linux Docker harness (`tests/docker-compose.test.yml`) with OpenCascade 7.6.0 and Python OCC bindings. The suite verifies closed-form torsional physics, nominal shaft sizing, STEP BRep solid generation, and 2D drawing cross-validation. Furthermore, software volume calculation agreement between Saint-Venant analytical formulas and OpenCascade CAD mass property integrals is verified at **0.0000% error** (< 10⁻⁶ relative numerical tolerance). This represents software calculus agreement, not physical CNC manufacturing tolerance.
- **Required Sources:** `data/verification/evidenceRegistry.ts:EVID-EDA-01,EVID-EDA-02`, `data/canonical/quantitativeClaims.ts:claim-eda-424-tests`.
- **Claims That Must NOT Be Made:**
  - MUST NOT claim 0.0000% error represents physical CNC machining tolerances.

---

### Test 10: "What does the OCR evaluation system actually measure?"
- **Expected Answer:**
  The OCR Evaluation Platform measures **Character Error Rate (CER), Word Error Rate (WER), field-level exact match, and critical-field accuracy**. It incorporates a **priority risk classification engine (PASS / REVIEW / FAIL)** that evaluates field severity and confidence thresholds, overriding aggregate confidence scores to prevent silent errors in critical fields. It also benchmarks robustness across **5 controlled physical degradation axes**: Gaussian blur, additive noise, rotation skew, contrast reduction, and JPEG compression. Verified with **134 backend pytests** and **20 browser UI assertions**.
- **Required Sources:** `data/projects.ts:826-1035`, `data/verification/evidenceRegistry.ts:EVID-OCR-01,EVID-OCR-02`.
- **Claims That Must NOT Be Made:**
  - MUST NOT describe it as a standard OCR wrapper (it is an evaluation and risk auditing platform).

---

### Test 11: "What is the difference between Ask Aadil and the RAG Lab?"
- **Expected Answer:**
  **Ask Aadil** and the **RAG Lab** are two separate portfolio systems with distinct architectural responsibilities:
  1. **Ask Aadil (`/ask-aadil`):** A stateful conversational agent that answers visitor queries about Aadil's background, using hybrid retrieval across 6 canonical portfolio knowledge layers, deterministic intent routing, epistemic boundaries, bitwise draft integrity, and voice controls.
  2. **RAG Evaluation Lab (`/rag-lab`):** An interactive educational benchmarking workspace where visitors experiment with retrieval strategies (Okapi BM25 vs Character n-gram TF-IDF Vector Space vs Hybrid Reciprocal Rank Fusion), inspect ranked evidence chunks, observe token context budget clipping, and evaluate when a grounded system must abstain.
- **Required Sources:** `data/projects.ts:579-681`, `lib/rag-lab/ragLabService.ts`, `data/rag/corpus_v1.ts`.
- **Claims That Must NOT Be Made:**
  - MUST NOT claim they are the same tool or share the same conversational state machine.
  - MUST NOT claim RAG Lab uses dense neural embeddings (it uses character n-gram TF-IDF).

---

### Test 12: "Which claims cannot currently be verified?"
- **Expected Answer:**
  Under the portfolio's strict epistemic standards, the following areas carry explicit verification boundaries:
  1. **WhatsApp Contact Channel:** Set to `null` in canonical structured profile (`structuredProfile.ts:24`); unverified.
  2. **Upstream Corporate Production Item Stores:** Proprietary Wayground item stores and live internal question databases are private corporate assets and are not replicated in public repositories.
  3. **VoyageMath Architecture Ownership:** Aadil verified and tested V1 workflows as an SME; claims of software architecture ownership for VoyageMath are explicitly unverified and rejected.
  4. **Physical Machining Tolerances for EDA:** The 0.0000% volume error represents software calculus integration consistency, not CNC machining manufacturing tolerance.
- **Expected Behavior:** System must explicitly declare these limitations and abstain from asserting false certainty.

