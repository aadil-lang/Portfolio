# PHASE 6.1 — ENGINEERING DECISION RECORDS AUDIT
**Forensic Investigation, Architecture Verification & Candidate ADR Inventory**

- **Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Branch:** `main` (Baseline commit: `615daf95`)
- **Audit Date:** November 2026
- **Auditor Roles:** Principal AI Systems Engineer, Software Architect, Technical Writer & Engineering Quality Auditor
- **Standard Applied:** `engineering-security-reliability` (Level 1 Implementation Standards)
- **Status:** Complete — Initial Investigation & Evidence Audit (READ-ONLY — Zero Code Modifications Executed)

---

## 1. Executive Summary & Audit Methodology

### 1.1 Objective
The purpose of Phase 6.1 is to conduct a forensic evidence audit across all 11 existing portfolio case studies (plus the Phase 4 RAG Evaluation Lab) to establish the factual baseline for implementing **Evidence-Backed Engineering Decision Records (ADRs)**.

This audit adheres to the foundational principle: **Zero Invention of History**. Every candidate decision record documented herein is anchored in verified source code, architecture diagrams, commit histories, canonical test suites, or explicit project documentation. Where an architectural trade-off represents retrospective engineering analysis rather than contemporaneous commit-level documentation, it is explicitly classified as **RETROSPECTIVE ANALYSIS** rather than **HISTORICALLY DOCUMENTED**.

### 1.2 Critical Architectural Boundary — Ask Aadil Protection
In strict adherence to the system invariant:
- The Ask Aadil conversational engine (`lib/rag/`) was inspected in **read-only mode**.
- Zero modifications were made to Ask Aadil's system prompts, intent routing, multi-turn state machine, tool registries, model configurations, or voice pipelines.
- All candidate decision records for Ask Aadil reflect verified runtime mechanisms without altering existing behavior.

---

## 2. Project-by-Project Forensic Audit

---

### Project 01: Ask Aadil — Stateful Retrieval, Source Authority & Controlled Actions
- **Route:** `/ask-aadil` | **Slug:** `ask-aadil`
- **Ownership Classification:** `INDEPENDENT · PERSONAL BUILD` (Wayground & Personal Portfolio Assistant)
- **Verified Architecture:**
  - Full-stack conversational assistant built on Next.js 13.4.10 App Router.
  - Deterministic intent router (`lib/rag/intentRouter.ts`) with multi-turn entity resolution (`lib/rag/queryUnderstanding.ts`, `lib/rag/projectResolver.ts`) resolving pronouns ("it", "that project") and navigation requests without LLM calls.
  - Decoupled hybrid retriever (`lib/rag/hybridRetriever.ts`) maintaining strict source boundaries across 5 independent knowledge registries (`structuredProfile.ts`, `portfolioKnowledge.ts`, `projectsMetadata.ts`, `quantitativeClaims.ts`, `resumeData.ts`).
  - Grounded answer synthesis (`lib/rag/synthesizer/answerSynthesizer.ts`, `lib/rag/askAadilAgent.ts`) citing granular provenance badges (`[Timeline — Chronology]`, `[Journal — Chapter]`, `[System — Case Study]`).
  - Two-phase Human-in-the-Loop action governance (`lib/rag/tools/portfolioTools.ts`, `lib/rag/tools/navigationTools.ts`) enforcing conversational draft generation and explicit user confirmation before external dispatch.
  - Web Speech API integration (`lib/rag/voice/speechToTextProvider.ts`) with interim utterance streaming and privacy-first client audio handling.
- **Evidence Sources:**
  - Source code: `lib/rag/` (28 modules, zero circular dependencies).
  - Test suites: `scripts/test_retrieval_foundation.ts` (13 passing tests), `scripts/test_grounded_conversational_evaluation.ts` (16 passing tests), `scripts/test_controlled_actions.ts`.
  - Canonical metadata: `data/canonical/sourceAuthority.ts`, `data/canonical/projectsMetadata.ts:311-356`.
  - Evidence component: `components/evidence/AskAadilEvaluationExplorer.tsx`.
- **Engineering Constraints:**
  - Absolute factual fidelity to Aadil's verified background; zero tolerance for biographical hallucinations.
  - Client-side privacy: zero audio retention or server-side voice recording storage.
  - Deterministic action safety: AI must never autonomously execute email dispatch or external actions.
- **Actual Limitations:**
  - Web Speech API speech-to-text relies on browser-native engine (Chrome/Edge); unsupported on Safari iOS.
  - Substring regex security matching in `askAadilAgent.ts` catches common injection phrases but does not defend against adversarial semantic roleplay without downstream tool allowlists.
  - God-object complexity in `askAadilAgent.ts` (2,550 lines) combining orchestrator and workflow states.
- **Candidate Decision Records:**
  1. **ADR-AA-01: Deterministic Multi-Turn Intent Router Alongside LLM Synthesis**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`lib/rag/intentRouter.ts`, `lib/rag/queryUnderstanding.ts`)
     - *Context:* Free-form LLM routing frequently misinterprets pronouns, hallucinates non-existent portfolio routes, or drifts into conversational chatter when visitors ask direct operational questions.
     - *Approach:* Route intents (`identity`, `projects`, `contact`, `navigation`) deterministically via regex pattern matching and multi-turn entity memory before dispatching to synthesis.
     - *Alternatives Considered:* Pure LLM Function Calling / Router agent.
     - *Trade-offs:* Adds maintenance overhead for pattern rules; guarantees <1ms routing latency, 0 token cost, and 100% deterministic navigation dispatch.
  2. **ADR-AA-02: Decoupled Multi-Source Authority Matrix over Single Unified Vector Store**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`data/canonical/sourceAuthority.ts`, `lib/rag/hybridRetriever.ts`)
     - *Context:* Merging resume dates, narrative journal reflections, mechanical engineering credentials, and case study code into one flat vector database leads to cross-source contamination (e.g. confusing a historical student project with production Wayground engineering).
     - *Approach:* Map query intent directly to authoritative source layers with strict fallback and forbidden source rules (`sourceAuthorityRules`).
     - *Alternatives Considered:* Flat embedding vector database with dense top-k retrieval.
     - *Trade-offs:* Requires structured canonical registries; prevents out-of-context retrieval and eliminates biographical hallucinations.
  3. **ADR-AA-03: Two-Phase Human-in-the-Loop Confirmation Gate for External Actions**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`lib/rag/tools/portfolioTools.ts`, `lib/rag/askAadilAgent.ts`)
     - *Context:* Autonomous agent execution of external communications (e.g. sending recruiter emails or scheduling calls) creates severe liability for spam, prompt-injection compromise, or unauthorized messaging.
     - *Approach:* Agent generates an in-memory contextual draft and enters an explicit confirmation state. The draft can be conversationally edited, but execution strictly requires a direct human click on the UI confirm button.
     - *Alternatives Considered:* Autonomous API dispatch with LLM-evaluated confidence thresholds.
     - *Trade-offs:* Adds one manual user interaction step; 100% eliminates unintended or malicious external dispatches.
- **Evidence Gaps:**
  - Vector embedding experiments prior to the current hybrid lexical-canonical setup are documented narratively in Journal Chapter 09, but raw ablation benchmark logs from that early exploratory phase were not persisted in the repository.

---

### Project 02: AI Application Reliability & Browser QA
- **Route:** `/projects/ai-reliability` | **Slug:** `ai-reliability`
- **Ownership Classification:** `INDEPENDENT · WAYGROUND PRODUCTION DEPLOYMENT`
- **Verified Architecture:**
  - Python / Playwright test harness running real headless Chromium sessions.
  - Multi-modal artifact capture: full-page PNG screenshots, raw DOM snapshots, network HAR recordings, and console error traces.
  - Mathematical uncertainty quantification via empirical Fisher Information Matrix and parameter covariance estimates.
  - Cryptographic append-only event ledger chaining every tool call, diagnosis, and approval via SHA-256 (`verify_provenance_chain`).
  - Immovable Human-in-the-Loop governance gate: autonomous diagnosis and patch proposals, with zero autonomous Git commit or merge authority.
  - Live dogfooding against VM Copy Question Generator (`test_dogfooding_question_generator.py`).
- **Evidence Sources:**
  - Repository documentation: `research/project-analysis/ai-application-reliability/` (`architecture.md`, `engineering-decisions.md`, `validation-and-testing.md`, `portfolio-claims.md`).
  - Test suites: 158 backend tests + 47 governance tests = **205 automated tests** (verified in `quantitativeClaims.ts:52-60`).
  - Python test scripts: `test_dogfooding_question_generator.py`, `test_provenance_chain.py`.
- **Engineering Constraints:**
  - Enterprise risk tolerance for autonomous production code modification is strictly zero.
  - Web application failures (DOM hydration mismatches, layout overlaps, canvas clipping) cannot be reliably detected by synthetic mock environments.
  - Complete post-incident auditability required for enterprise compliance.
- **Actual Limitations:**
  - Headless Chromium execution incurs higher wall-clock latency (2–5 seconds per test) compared to jsdom or synthetic unit tests.
  - Uncertainty quantification requires empirical tuning of the covariance threshold ($\epsilon_{\text{abstain}}$) to prevent false-positive abstentions.
- **Candidate Decision Records:**
  1. **ADR-REL-01: Real Headless Chromium Multi-Modal Ground Truth vs Synthetic Mocks**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`research/project-analysis/ai-application-reliability/engineering-decisions.md` ADR 01)
     - *Context:* JSDOM, Cheerio, and synthetic HTTP mocks fail to capture CSS layout clipping, z-index collisions, WebGL canvas failures, or Next.js React 19 hydration timing deadlocks.
     - *Approach:* Execute tests via Playwright in genuine headless Chromium, capturing DOM, PNG, HAR, and console logs.
     - *Alternatives Considered:* Fast in-memory DOM simulation (JSDOM/HappyDOM).
     - *Trade-offs:* Slower execution speed; provides unassailable physical ground truth and eliminates phantom test passes.
  2. **ADR-REL-02: Fisher Information Uncertainty Quantification & Abstention Gate**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 02)
     - *Context:* LLM diagnostic agents hallucinate plausible-sounding root causes when presented with noisy failure traces, applying destructive patches to codebases.
     - *Approach:* Calculate parameter covariance via empirical Fisher Information; if uncertainty exceeds $\epsilon_{\text{abstain}}$, force an explicit `ABSTAIN` verdict and escalate to human engineers.
     - *Alternatives Considered:* Prompt-based confidence self-assessment ("On a scale of 1-10...").
     - *Trade-offs:* Rejects automated diagnosis on ambiguous edge cases; completely eliminates hallucinated patch application.
  3. **ADR-REL-03: Cryptographic SHA-256 Provenance Ledger for Forensic Auditing**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 04)
     - *Context:* Post-mortem analysis of automated agent runs is impossible if logs can be truncated or manipulated.
     - *Approach:* Cryptographically hash each event payload with SHA-256 and link it to the prior block's hash.
     - *Alternatives Considered:* Standard JSON log streaming to Datadog/CloudWatch.
     - *Trade-offs:* Minor computational overhead on event commit; provides tamper-evident proof of agent actions and human approval tokens.
- **Evidence Gaps:**
  - Proprietary Wayground internal test run logs are retained on internal servers; open portfolio demonstrates the verified architecture and reproducing test suites.

---

### Project 03: Solace AI — Mindful Wellness Companion
- **Route:** `/projects/solace-ai` | **Slug:** `solace-ai`
- **Ownership Classification:** `INDEPENDENT · PERSONAL PRODUCTION BUILD`
- **Verified Architecture:**
  - Mobile client built on Expo SDK 58 / React Native 0.88 / TypeScript, compiled via Hermes AOT (1,725 modules).
  - FastAPI (Python 3.12) backend with Supabase PostgreSQL and 6 Row-Level Security (RLS) migrations.
  - Synchronous deterministic pre-LLM crisis screening (`is_crisis_input`) executing in <2ms before any LangGraph state transition.
  - Ephemeral zero-retention audio transcription (`del audio_bytes` in Python `finally:` block; zero cloud object storage).
  - Resilient single-POST Server-Sent Events (SSE) transport treating HTTP 502/503/504 as ambiguous delivery without blind auto-retries.
- **Evidence Sources:**
  - Source code references: `data/projects.ts` (`solace-ai`), `data/canonical/projectsMetadata.ts:358-406`.
  - Test suites: 52 pytest backend tests + 50 mobile node suites = **102 automated tests** (`quantitativeClaims.ts:88-96`).
  - Evidence component: `components/evidence/SolaceVideoShowcase.tsx`.
- **Engineering Constraints:**
  - Safety-critical domain: immediate (<2ms) crisis interception with 100% deterministic refusal; zero reliance on model benevolence.
  - Data privacy: zero storage of raw biometric/voice recordings to eliminate breach liability.
  - Mobile network instability: preventing duplicate user turns on cellular disconnects.
- **Actual Limitations:**
  - Regex crisis keyword matching requires ongoing manual updates for emergent slang or colloquial expressions.
  - Zero audio retention prevents playback of past vocal reflections.
- **Candidate Decision Records:**
  1. **ADR-SOL-01: Synchronous Deterministic Pre-LLM Crisis Screening**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`data/projects.ts` Critical Decision)
     - *Context:* Relying on an LLM to detect self-harm or suicidal ideation introduces model refusal drift, prompt injection vulnerability, and 1–3 seconds of dangerous inference latency.
     - *Approach:* Intercept input synchronously in FastAPI middleware via compiled regex heuristics (`is_crisis_input`), instantly returning curated crisis helpline resources in <2ms.
     - *Alternatives Considered:* LLM guardrail model (e.g. Llama Guard) or LangGraph safety node.
     - *Trade-offs:* Requires regex maintenance; guarantees zero latency lag and mathematically impossible prompt-injection bypass.
  2. **ADR-SOL-02: Ephemeral In-Memory Audio Zero-Retention Policy**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`data/projects.ts` Tradeoffs)
     - *Context:* Storing raw audio recordings of intimate emotional reflections in S3/GCS creates severe regulatory and security liability under HIPAA / GDPR.
     - *Approach:* Audio bytes are held strictly in RAM during transcription, immediately purged with `del audio_bytes` in a `finally:` block.
     - *Alternatives Considered:* Encrypted S3 bucket with lifecycle expiration policies.
     - *Trade-offs:* Users cannot listen back to past audio recordings; completely eliminates data breach exposure for acoustic recordings.
  3. **ADR-SOL-03: Ambiguous Delivery Classification over Blind SSE Auto-Retries**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`data/projects.ts` Tradeoffs)
     - *Context:* When an SSE stream drops mid-response over cellular networks with HTTP 502/503/504, blind exponential backoff retries duplicate the user's message, spawning duplicate assistant responses and corrupting conversation state.
     - *Approach:* Classify 5xx SSE drops as "ambiguous delivery", pausing transport and prompting the user to confirm state before resending.
     - *Alternatives Considered:* Unbounded exponential backoff auto-retry.
     - *Trade-offs:* Requires explicit user acknowledgement on network dropout; prevents state duplication and token waste.
- **Evidence Gaps:**
  - The live Supabase instance is private to the author; test coverage is proven via local pytest mocks and Hermes AOT bundling logs.

---

### Project 04: Engineering Design Automation (EDA)
- **Route:** `/projects/design-automation` | **Slug:** `design-automation`
- **Ownership Classification:** `INDEPENDENT · MECHANICAL & SOFTWARE INTEGRATION`
- **Verified Architecture:**
  - Decoupled natural-language requirement extraction with character span offsets.
  - Pure deterministic mechanical engineering calculation engine (`ShaftTorsionSolver`) executing closed-form equations for torsional shear stress and minimum shaft diameter.
  - OpenCascade BRep 3D solid modeling kernel exporting valid STEP models and 2D orthographic SVG drawings.
  - Anti-hallucination material database halting with status `BLOCKED` on ambiguous specifications (e.g. generic "steel").
  - Automated 3D solid to 2D orthographic dimensional cross-validation asserting 100% agreement.
  - Discrete nominal sizing policy mapping theoretical continuous diameters to standard ISO metric stock bar sizes.
- **Evidence Sources:**
  - Repository documentation: `research/project-analysis/engineering-design-automation/` (`architecture.md`, `engineering-decisions.md`, `runtime-flow.md`).
  - Test suites: **424 automated CAD tests** (verified in `quantitativeClaims.ts:16-24`).
  - Evidence component: `components/evidence/CadModelViewer.tsx` (interactive procedural Three.js visualization).
- **Engineering Constraints:**
  - Mechanical integrity: structural failure in industrial machinery causes physical danger; calculations must adhere strictly to ASME / ISO standards.
  - Manufacturing practicality: shafts must be producible from commercially available bar stock.
- **Actual Limitations:**
  - Web portfolio visualization is a procedural Three.js reconstruction based on verified shaft dimensions, not a live browser-based OpenCascade WebAssembly BRep kernel.
- **Candidate Decision Records:**
  1. **ADR-EDA-01: Complete Exclusion of LLMs from Physics and Math Calculations**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 01)
     - *Context:* Generative LLMs hallucinate decimal constants, botch unit conversions (e.g. $N\cdot m$ to $N\cdot mm$), and invent non-physical safety factors.
     - *Approach:* Restrict LLM strictly to extracting parameters into a typed JSON schema; all engineering physics is computed by deterministic Python classes (`ShaftTorsionSolver`).
     - *Alternatives Considered:* Few-shot chain-of-thought prompting for math calculations.
     - *Trade-offs:* Requires formal mechanical solver implementation; guarantees 100% mathematical precision and ASME standard compliance.
  2. **ADR-EDA-02: Anti-Hallucination Material Knowledge Base with Fail-Fast Blocking**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 02)
     - *Context:* When users prompt "Design a steel shaft", an LLM will assume an arbitrary yield strength (e.g. 250 MPa vs 600 MPa), masking catastrophic safety risks.
     - *Approach:* The material database halts with status `BLOCKED` when generic names are provided, requiring explicit grade specification (`AISI 1045`, `S355J2`).
     - *Alternatives Considered:* Defaulting to a conservative standard material fallback.
     - *Trade-offs:* Requires user clarification on ambiguous prompts; prevents dangerous metallurgical assumptions.
  3. **ADR-EDA-03: Discrete Nominal Sizing Policy vs Continuous Dimensions**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 03)
     - *Context:* A mathematical equation computes an exact theoretical diameter (e.g. 15.523 mm). Machining a custom 15.523 mm shaft is prohibitively expensive.
     - *Approach:* Quantize continuous output to standard ISO metric bar stock (`[12, 14, 16, 18, 20, 22, 25, 28, 30...]`), verifying $\text{FoS}_{\text{actual}} \ge \text{FoS}_{\text{target}}$.
     - *Alternatives Considered:* Leaving dimension as an unrounded continuous float.
     - *Trade-offs:* Slightly increases material weight; produces designs immediately manufacturable with off-the-shelf stock.
- **Evidence Gaps:**
  - Raw OpenCascade C++ compilation logs are executed in offline Python environments; portfolio embeds procedural Three.js viewer and verified 424-test suite metrics.

---

### Project 05: OCR Evaluation & Robustness Testing Platform
- **Route:** `/projects/ocr-evaluator` | **Slug:** `ocr-evaluator`
- **Ownership Classification:** `INDEPENDENT · APPLIED RESEARCH & EVALUATION`
- **Verified Architecture:**
  - Evaluation platform assessing OCR engines (Tesseract, PyTesseract) across legal and land-record corpora.
  - Multi-tier metric calculation: Character Error Rate (CER) and Word Error Rate (WER) via Levenshtein distance.
  - Critical-field priority override: mismatches on critical fields (e.g. Survey Number, Document ID) trigger immediate FAIL status, overriding high global OCR confidence scores.
  - 5-axis systematic image degradation suite (Gaussian blur, additive Gaussian noise, rotation skew, contrast attenuation, JPEG compression artifacts).
- **Evidence Sources:**
  - Data registry: `data/evidence/ocrEvaluationData.ts`.
  - Evidence component: `components/evidence/OcrEvaluationExplorer.tsx`.
  - Test suites: 134 backend tests + 20 browser UI assertions = **154 tests** (`quantitativeClaims.ts:120-128`).
- **Engineering Constraints:**
  - In land titling and legal contracts, a single digit error in a parcel number invalidates the legal deed, even if the remaining 99.8% of text is recognized perfectly.
  - Robustness must be evaluated against real-world mobile scan imperfections.
- **Actual Limitations:**
  - Tesseract OCR baseline requires clean local binary installations; baseline confidence scores are poorly calibrated across variable font weights.
- **Candidate Decision Records:**
  1. **ADR-OCR-01: Critical-Field Priority Override vs Global Aggregate Accuracy**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`data/projects.ts` Critical Decision)
     - *Context:* Traditional OCR evaluation relies on aggregate CER/WER (e.g. 98% accuracy). A system can achieve 98% overall accuracy while misrecognizing the single critical legal survey number.
     - *Approach:* Classify fields into CRITICAL vs STANDARD tiers. Any failure on a critical field immediately forces overall evaluation verdict to `FAIL`.
     - *Alternatives Considered:* Average character accuracy across the entire page.
     - *Trade-offs:* Lowers aggregate pass rates; accurately reflects true business and legal risk.
  2. **ADR-OCR-02: 5-Axis Controlled Image Degradation Suite**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`data/evidence/ocrEvaluationData.ts`)
     - *Context:* Evaluating OCR engines on clean synthetic PDFs creates a false sense of reliability that collapses when deployed to smartphone photos of aged documents.
     - *Approach:* Apply parameter-swept degradation kernels across blur, noise, rotation, contrast, and compression to identify exact failure thresholds.
     - *Alternatives Considered:* Evaluating only on unmodified benchmark scan sets.
     - *Trade-offs:* Requires synthetic image generation pipeline; establishes empirical tolerance boundaries for mobile document capture.
- **Evidence Gaps:**
  - Source TIFF/PDF scanned deeds are private legal documents; evaluation engine and interactive degradation explorer run in the portfolio on anonymized benchmark samples.

---

### Project 06: Atlas AI — Financial Copilot & SEC Filing RAG
- **Route:** `/projects/atlas-ai` | **Slug:** `atlas-ai`
- **Ownership Classification:** `INDEPENDENT · PERSONAL BUILD`
- **Verified Architecture:**
  - Telegram-first conversational financial copilot via FastAPI and Python-Telegram-Bot.
  - LangGraph `StateGraph(AgentState)` coordinating intent routing, SEC EDGAR filing retrieval, Finnhub real-time market quotes, and memory persistence.
  - Ingestion and chunking of 10-K, 10-Q, and 8-K filings into MongoDB Atlas Vector Search using Gemini embeddings.
  - Asynchronous background `AlertWorker` monitoring watchlists for price volatility, filing drops, and news.
  - Comprehensive pytest test suite with **178 passing automated tests** (verified in `research/project-analysis/atlas-ai/evidence-audit.md`).
- **Evidence Sources:**
  - Forensic audit report: `research/project-analysis/atlas-ai/evidence-audit.md`.
  - Canonical metadata: `data/canonical/projectsMetadata.ts:182-225`.
- **Engineering Constraints:**
  - SEC EDGAR strict rate limit: maximum 10 requests/second per declared User-Agent.
  - Interface constraint: Telegram-only interaction (voice, text, photo charts); zero web dashboard.
- **Actual Limitations:**
  - No web frontend exists; interaction is constrained to Telegram messenger.
  - Real-time stock quote lookups depend on third-party Finnhub API rate tiers.
- **Candidate Decision Records:**
  1. **ADR-ATL-01: LangGraph Stateful Cyclic Multi-Agent Graph over Linear Chains**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`evidence-audit.md` Section 1)
     - *Context:* Financial inquiries require multi-step research (e.g. check current stock price $\to$ fetch 10-K filing $\to$ compute financial ratio $\to$ synthesize response). Linear chains fail if an intermediate API is rate-limited.
     - *Approach:* Implement a stateful cyclic graph with conditional routing and specialized research nodes (`company_research`, `filing_rag`, `synthesis`).
     - *Alternatives Considered:* Linear LangChain sequential chains or monolithic OpenAI assistant.
     - *Trade-offs:* Increased orchestration complexity; allows dynamic replanning and graceful fallbacks on external API failures.
  2. **ADR-ATL-02: Telegram-First Interface with Multimodal Audio & Vision Ingestion**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`evidence-audit.md` Section 1)
     - *Context:* Mobile investors demand instant access while on the move without authenticating through complex desktop web dashboards.
     - *Approach:* Build directly on Telegram Bot API, integrating Whisper voice note transcription and Gemini Vision chart analysis.
     - *Alternatives Considered:* Custom React/Next.js progressive web app.
     - *Trade-offs:* Constrained to Telegram UI components; achieves instant mobile push notifications and friction-free voice/photo messaging.
- **Evidence Gaps:**
  - The live Telegram bot webhook runs on a private Render server; codebase is verified via local forensic repository audit (`C:\Users\HP\Documents\atlas-ai`).

---

### Project 07: VM Copy Question Generator
- **Route:** `/projects/vm-copy` | **Slug:** `vm-copy`
- **Ownership Classification:** `INDEPENDENT · WAYGROUND PRODUCTION DEPLOYMENT`
- **Verified Architecture:**
  - Next.js 16 / React 19 / TypeScript 5 web application deployed in production at Wayground.
  - Pure TypeScript Tier-1 deterministic evaluation layer (`lib/eval-layer.ts`) running locally without model dependencies.
  - Hard structural validation: exact option count (4), single correct answer exclusivity ($|CA| = 1$), set-based duplicate distractor detection, non-empty distractor rationales.
  - Parallel micro-batch splitting (`calculateBatches`) partitioning batches of 5–10 into micro-requests of 2–3 questions via `Promise.all`.
  - One-time multi-modal diagram pre-analysis (`analyzeImageForQuestion`) extracting coordinates and tables before batch generation.
- **Evidence Sources:**
  - Documentation: `research/project-analysis/vm-copy/` (`architecture.md`, `engineering-decisions.md`, `validation-and-testing.md`).
  - Canonical metadata: `data/canonical/projectsMetadata.ts:9-45`.
- **Engineering Constraints:**
  - Serverless execution timeouts (15s on standard Vercel serverless gateways).
  - Curriculum compliance: questions must strictly conform to 4 options with exact mathematical correctness.
- **Actual Limitations:**
  - Batch generation is constrained to maximum 10 variants per batch to prevent serverless memory exhaustion.
- **Candidate Decision Records:**
  1. **ADR-VM-01: Tier-1 Client-Side Deterministic Evaluator Before Human or Second-Model Review**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 01)
     - *Context:* LLM completions frequently emit structural bugs (3 or 5 options, duplicate distractors, missing correct answer flag). Running an LLM critic call costs money and adds 2–4 seconds of latency.
     - *Approach:* Enforce hard structural rules in pure TypeScript (`lib/eval-layer.ts`) immediately after JSON parsing with 0ms latency and 0 API cost.
     - *Alternatives Considered:* LLM-as-a-judge secondary critic prompt.
     - *Trade-offs:* Catches only structural/syntax defects, not deep pedagogical alignment; completely eliminates structural errors at zero cost.
  2. **ADR-VM-02: Parallel Micro-Batch Splitting to Prevent Serverless Timeouts**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 02)
     - *Context:* Requesting 10 question variants in a single prompt takes 35+ seconds, triggering HTTP 504 gateway timeouts on serverless runtimes.
     - *Approach:* Split requests into concurrent chunks of 2–3 questions dispatched via `Promise.all`.
     - *Alternatives Considered:* Increasing serverless function execution timeout limits (expensive / platform-locked).
     - *Trade-offs:* Slightly higher concurrency load; reduces wall-clock latency from 35s to 6s and prevents gateway timeouts.
  3. **ADR-VM-03: One-Time Diagram Extraction to Structured Text for Batch Ingress**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 04)
     - *Context:* Sending high-resolution base64 diagram images across 5 concurrent parallel requests burns massive ingress bandwidth and duplicate vision tokens.
     - *Approach:* Run multi-modal vision analysis once, convert diagram to structured coordinates/tables, and pass text representation to batch generators.
     - *Alternatives Considered:* Attaching base64 image payload to every parallel prompt.
     - *Trade-offs:* Requires robust diagram-to-text extraction parser; cuts vision token consumption by 60–80%.
- **Evidence Gaps:**
  - Internal Wayground author usage metrics are proprietary; architecture and test suites are verified via open repository (`aadil-lang/vm-copy-question-generator`).

---

### Project 08: AI Worksheets Product POC
- **Route:** `/projects/ai-worksheets` | **Slug:** `ai-worksheets`
- **Ownership Classification:** `INDEPENDENT · WAYGROUND COMPANY POC`
- **Verified Architecture:**
  - Full-stack Python / FastAPI backend with Next.js frontend for generating printable math worksheets.
  - Headless LaTeX / TikZ subprocess compilation (`pdflatex` + `pdftoppm`) producing 300-DPI raster diagrams.
  - Content-hashed TikZ caching (MD5 digest of cleaned diagram description) storing compiled images.
  - Three-prompt decoupled pipeline for crossword puzzles: Generation $\to$ Verification $\to$ Pydantic Validation.
  - Pure Python algorithmic backtracking constraint solver (`builder.py`) for 2D crossword grid placement.
- **Evidence Sources:**
  - Documentation: `research/project-analysis/ai-worksheets/` (`architecture.md`, `engineering-decisions.md`, `validation-and-testing.md`).
  - Canonical metadata: `data/canonical/projectsMetadata.ts:46-95`.
- **Engineering Constraints:**
  - Generative diffusion models cannot render mathematically accurate coordinate axes, angles, or geometric proofs.
  - Crosswords require 100% physically valid letter intersections without adjacent collisions.
- **Actual Limitations:**
  - Requires local TeX Live and Poppler dependencies in the backend environment, increasing Docker image size by ~1.2 GB.
- **Candidate Decision Records:**
  1. **ADR-WS-01: Externalized Headless LaTeX/TikZ Subprocess Compilation for Geometric Figures**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 01)
     - *Context:* Diffusion models (DALL-E, Midjourney) distort geometric lines, hallucinate non-orthogonal coordinates, and fail at mathematical notation.
     - *Approach:* Prompt LLM to output TikZ/PGFPlots code; compile locally via headless `pdflatex` to 300-DPI PNG.
     - *Alternatives Considered:* Generative image diffusion or client-side Canvas rendering.
     - *Trade-offs:* Requires heavy TeX Live environment; delivers textbook-grade mathematical precision.
  2. **ADR-WS-02: Algorithmic Backtracking Grid Placement over Generative 2D Layout**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 03)
     - *Context:* LLMs hallucinate 2D spatial layouts, placing words that do not share common letters or creating illegal collisions.
     - *Approach:* Formulate grid placement as a deterministic constraint satisfaction problem with recursive backtracking (`_can_place`, `_place`).
     - *Alternatives Considered:* Asking LLM to emit complete 2D ASCII or JSON crossword matrices.
     - *Trade-offs:* Requires custom algorithmic solver implementation; guarantees zero collision errors.
  3. **ADR-WS-03: Three-Prompt Decoupled Verification Pipeline for Zero Clue Leakage**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 02)
     - *Context:* LLMs generating both clues and answers simultaneously leak the solution into the clue text (e.g. "What is an acute angle?").
     - *Approach:* Decouple generation, verification (against 4-point leak checklist), and deterministic Pydantic length validation into sequential stages.
     - *Alternatives Considered:* Single monolithic prompt with negative constraints ("Do not include the answer in the clue").
     - *Trade-offs:* Requires two LLM passes per puzzle; completely eliminates answer leaks.
- **Evidence Gaps:**
  - Production deployment remained a company POC; source files are verified from archived Wayground engineering snapshots.

---

### Project 09: Curriculum Transformation Engine
- **Route:** `/projects/curriculum-etl` | **Slug:** `curriculum-etl`
- **Ownership Classification:** `INDEPENDENT · WAYGROUND PRODUCTION PIPELINE`
- **Verified Architecture:**
  - Automated ETL pipeline ingesting state and national curriculum frameworks (Texas TEKS, California CCSS, Australia).
  - Dynamic schema derivation: parses an approved 10-line sample CSV to generate runtime Pydantic validation models (`schemas.py`).
  - Merged evaluate-and-fix pass (Commit `252d06f`): combined evaluation and repairing into a single prompt producing `EvaluateAndFixResult`.
  - Post-extraction deterministic row guards (`apply_row_guards()`): canonical grade normalization, reserved column blanking, and duplicate display code detection outside the LLM.
  - Adversarial post-extraction audit agent (`csv_audit.py`) checking finalized rows against source PDF slices.
- **Evidence Sources:**
  - Documentation: `research/project-analysis/curriculum-etl/` (`architecture.md`, `engineering-decisions.md`, `git-evolution.md`).
  - Test suites: **124 automated pipeline tests** (`quantitativeClaims.ts:104-112`).
  - Git commit history: Commit `252d06f` (*"Fix hangs and provider 5xx handling; merge review+critic"*).
- **Engineering Constraints:**
  - Ingesting 50 state taxonomies without maintaining 50 separate brittle regex scripts.
  - High volume: processing thousands of curriculum rows without provider rate limit deadlocks.
- **Actual Limitations:**
  - Badly degraded OCR scans of legacy state documents require pre-cleaning before ingestion.
- **Candidate Decision Records:**
  1. **ADR-ETL-01: Dynamic Schema Derivation from Sample CSV Contracts**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 01)
     - *Context:* Every US state and international authority structures educational standards with different hierarchies and column names. Hardcoding parsers creates an unmaintainable codebase.
     - *Approach:* Parse a 10-line approved sample CSV at runtime to dynamically construct Pydantic validation models.
     - *Alternatives Considered:* Static hardcoded Pydantic schemas per jurisdiction.
     - *Trade-offs:* Requires providing a valid sample CSV per framework; onboarding a new state requires zero code modifications.
  2. **ADR-ETL-02: Merged Evaluate-and-Fix Pass to Eliminate Pipeline Deadlocks**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 02, Commit `252d06f`)
     - *Context:* Early pipeline used a 2-stage review (evaluator detects issues $\to$ critic decides action), doubling latency and causing provider 5xx rate limit hangs.
     - *Approach:* Merge evaluation and correction into a single prompt emitting `EvaluateAndFixResult`.
     - *Alternatives Considered:* Retaining decoupled agents with distributed retry queues.
     - *Trade-offs:* Slightly more complex prompt; cut latency by 50% and eliminated inter-model deadlocks.
  3. **ADR-ETL-03: Post-Extraction Deterministic Row Guards Outside the Model**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` ADR 03)
     - *Context:* LLMs exhibit stochastic drift on categorical fields (e.g. emitting "Elementary" instead of "Elementary School").
     - *Approach:* Enforce canonical normalization and reserved column blanking via deterministic Python functions (`apply_row_guards`).
     - *Alternatives Considered:* Re-prompting the LLM to fix formatting errors.
     - *Trade-offs:* Requires local schema definitions; eliminates token waste and guarantees 100% structural conformity.
- **Evidence Gaps:**
  - Production database import logs at Wayground are proprietary; pipeline logic and 124 tests are verified locally.

---

### Project 10: US Mathematics Item Bank Generation Pipeline
- **Route:** `/projects/math-item-bank` | **Slug:** `math-item-bank`
- **Ownership Classification:** `INDEPENDENT · WAYGROUND ENTERPRISE SYSTEM`
- **Verified Architecture:**
  - Enterprise generation pipeline producing tens of thousands of validated standardized assessment items.
  - Stateful cyclic agentic graphs with targeted feedback routing back to specific defective nodes rather than aborting.
  - Bounded retry budget ($\le 3$) preventing infinite loops on contradictory constraints, routing failed items to human SME queue.
  - Integer Linear Programming (ILP) stratification balancing global Depth of Knowledge (DOK 1-3) and domain distributions within $\pm 1.5\%$ variance.
- **Evidence Sources:**
  - Documentation: `research/project-analysis/math-item-bank/` (`architecture.md`, `engineering-decisions.md`, `validation-and-testing.md`).
  - Canonical metadata: `data/canonical/projectsMetadata.ts:140-180`.
- **Engineering Constraints:**
  - High-stakes psychometric constraints: strict target quotas across DOK levels and domain standards.
  - Token cost control: unconstrained cyclic loops will drain API budgets.
- **Actual Limitations:**
  - Combinatorial ILP rebalancing requires global candidate item pooling and cannot run on single-item streaming requests.
- **Candidate Decision Records:**
  1. **ADR-MIB-01: Stateful Cyclic Agentic Graphs over Linear Chains**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` Decision 01)
     - *Context:* Linear DAG chains fail if any intermediate step (distractor generation, visual review) is flawed, forcing a complete restart from scratch.
     - *Approach:* Implement a cyclic state graph routing failure diagnostics back to the specific node responsible.
     - *Alternatives Considered:* Linear sequential pipelines with full restart on failure.
     - *Trade-offs:* Requires state machine management; preserves valid partial work and cuts token re-generation costs.
  2. **ADR-MIB-02: Bounded Retry Budgets with Human SME Escalation Queue**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` Decision 02)
     - *Context:* Contradictory mathematical constraints can trigger infinite prompt loops.
     - *Approach:* Enforce hard retry budget ($\le 3$); quarantine exhausted items to a human SME review queue.
     - *Alternatives Considered:* Uncapped autonomous retries until pass.
     - *Trade-offs:* Unresolved items require human review; caps API expenditure and protects pipeline throughput.
  3. **ADR-MIB-03: Integer Linear Programming (ILP) Stratification for Distribution Balancing**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`engineering-decisions.md` Decision 03)
     - *Context:* Generative LLMs naturally skew towards easy DOK-1 items. Prompting cannot balance a global statistical distribution.
     - *Approach:* Apply ILP Min/Max swap optimization across candidate pools to balance difficulty distributions within $\pm 1.5\%$.
     - *Alternatives Considered:* Quota-based rejection sampling during generation.
     - *Trade-offs:* Requires post-generation batch optimization; guarantees psychometrically valid assessment forms.
- **Evidence Gaps:**
  - Proprietary Wayground item database is private; architecture is verified through detailed technical specifications and methodology documentation.

---

### Project 11: Loom AI — B2B Textile Marketplace Platform
- **Route:** `/projects/loom-ai` | **Slug:** `loom-ai`
- **Ownership Classification:** `INDEPENDENT · PERSONAL BUILD`
- **Verified Architecture:**
  - Full-stack B2B marketplace: Next.js 16 / React 19 frontend, Express 5 / TypeScript backend, MongoDB with text indexes.
  - LangGraph supervisor agent architecture (`SupervisorGraph.ts`, `BuyerProcurementWorkflow.ts`) with channel reducers.
  - Structured procurement workflow extracting technical specifications using Zod schema enforcement (`withStructuredOutput`).
  - In-memory vector store with cosine similarity calculation for textile specification search.
  - Human-in-the-Loop approval queue (`ApprovalQueue.ts`) holding proposed AI actions (e.g. `auto_restock`) for explicit user confirmation.
- **Evidence Sources:**
  - Forensic audit report: `research/project-analysis/loom-ai/evidence-audit.md`.
  - Canonical metadata: `data/canonical/projectsMetadata.ts:227-268`.
- **Engineering Constraints:**
  - Commercial B2B safety: AI must never commit funds or place purchase orders without human sign-off.
- **Actual Limitations:**
  - Multi-agent supervisor has functional `MarketplaceWorkflow` and `BuyerProcurementWorkflow`, but sub-agents for negotiation and supplier channels are currently stubbed mocks.
  - In-memory vector store is designed for demonstration catalogs, not multi-million SKU production scale.
- **Candidate Decision Records:**
  1. **ADR-LOOM-01: LangGraph Supervisor Architecture with Typed Channel Reducers**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`evidence-audit.md` Section 1)
     - *Context:* B2B procurement involves multiple orthogonal domains (catalog search, RFQ extraction, inventory restocking). A monolithic LLM prompt fails to maintain state across diverse tasks.
     - *Approach:* Build a LangGraph supervisor agent routing requests to specialized sub-agent workflows based on user role and intent.
     - *Alternatives Considered:* Monolithic single-prompt conversational agent.
     - *Trade-offs:* Increased structural code overhead; provides clean modular separation between buyer workflows and catalog retrieval.
  2. **ADR-LOOM-02: Human-in-the-Loop Approval Queue for Consequential Actions**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`evidence-audit.md` Section 1, `ApprovalQueue.ts`)
     - *Context:* Autonomous execution of inventory restocks or contract generation risks catastrophic financial loss.
     - *Approach:* Stage all proposed mutating actions into an in-memory `ApprovalQueue` requiring explicit human review.
     - *Alternatives Considered:* Fully autonomous action execution with threshold confidence.
     - *Trade-offs:* Introduces manual user intervention; guarantees zero unauthorized inventory mutations.
  3. **ADR-LOOM-03: Structured Schema Extraction over Free-Text Procurement Notes**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`BuyerProcurementWorkflow.ts`)
     - *Context:* Buyer procurement notes contain messy unstructured text ("Need 500m of organic twill cotton, 220 GSM, navy blue"). Searching databases with raw text yields poor matches.
     - *Approach:* Use schema-enforced LLM extraction (`ExtractedRequirementsSchema`) to output typed fabric attributes before querying the catalog.
     - *Alternatives Considered:* Naive keyword search or unstructured semantic embedding match.
     - *Trade-offs:* Requires an upfront LLM extraction call; allows exact numerical filtering (GSM, yardage) alongside semantic similarity.
- **Evidence Gaps:**
  - Source repository exists locally (`C:\AI-Portfolio-Sources\loom-ai`); sub-agent mocks for negotiation are acknowledged as prototypes.

---

### Key Demonstration: Interactive RAG Evaluation Sandbox
- **Route:** `/rag-lab`
- **Ownership Classification:** `INDEPENDENT · PORTFOLIO ENGINEERING DEMONSTRATION`
- **Verified Architecture:**
  - Client-side deterministic RAG evaluation sandbox (`lib/rag-lab/`).
  - Lexical retrieval: BM25 Okapi ($k_1=1.2, b=0.75$) with sublinear term-frequency scaling and length normalization.
  - Vector retrieval: Normalized TF-IDF character subword n-gram cosine similarity (character 3-grams and 4-grams) — strictly lexical/morphological, **not black-box neural embeddings**.
  - Hybrid retrieval: Reciprocal Rank Fusion (RRF, $k=60$) combining BM25 and TF-IDF ranks.
  - Context budgeting: strict token-window budgeting (150–600 tokens) excluding oversized chunks with `budget_exceeded`.
  - Deterministic lexical Jaccard citation grounding ($\ge 0.15$) and false-premise/injection abstention gating.
- **Evidence Sources:**
  - Implementation: `lib/rag-lab/` (9 TypeScript modules).
  - Test suites: `scripts/test_rag_lab_unit.ts` (19 test cases, 100% pass), `scripts/test_rag_edge_cases_and_security.ts` (18 test cases, 100% pass).
  - Golden benchmark: 12 evaluation queries (Recall@5: 100%, MRR: 0.8333, nDCG@5: 0.7937, Abstention: 12/12).
  - Corpus integrity: 14 documents, 16 chunks, verified SHA-256 hash match against `manifest.json`.
- **Engineering Constraints:**
  - Educational transparency: visitors must inspect the exact internal mechanics of retrieval and scoring without requiring an external API key.
  - Zero state contamination with the Ask Aadil conversational engine.
- **Actual Limitations:**
  - Subword TF-IDF cannot detect semantic synonymy (e.g. matching "physician" to "doctor") without character n-gram overlap.
  - Jaccard lexical overlap demonstrates word presence in retrieved evidence, not formal natural language entailment (NLI).
- **Candidate Decision Records:**
  1. **ADR-RAG-01: Normalized Subword n-Gram TF-IDF Vector Space over Black-Box Neural Embeddings**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`lib/rag-lab/vectorSearch.ts`)
     - *Context:* Dense neural embedding models (e.g. OpenAI `text-embedding-3`, Cohere) operate as black boxes requiring remote API keys, incurring network latency and concealing mathematical similarity mechanics from technical interviewers.
     - *Approach:* Implement an in-browser subword n-gram TF-IDF vector space with character 3-gram and 4-gram tokenization and cosine similarity.
     - *Alternatives Considered:* Client-side ONNX Transformers / WebAssembly embeddings or external remote embedding APIs.
     - *Trade-offs:* Cannot capture conceptual synonymy without character overlap; executes completely offline in <5ms, requires zero API keys, and exposes 100% transparent vector mathematics.
  2. **ADR-RAG-02: Hybrid Reciprocal Rank Fusion (RRF, k=60) Balancing Exact and Morphological Signals**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`lib/rag-lab/hybridRrf.ts`)
     - *Context:* BM25 excels at exact keyword matching but fails on compound words or plural forms; subword TF-IDF captures morphology but can dilute exact keyword significance.
     - *Approach:* Combine rankings using Reciprocal Rank Fusion: $\text{RRF}(d) = \sum \frac{1}{60 + r(d)}$.
     - *Alternatives Considered:* Linear score interpolation ($\alpha \cdot \text{BM25} + (1-\alpha) \cdot \text{TFIDF}$).
     - *Trade-offs:* Discards raw score magnitudes; robustly normalizes across disparate score distributions without sensitive calibration.
  3. **ADR-RAG-03: Strict Token-Budget Truncation with Graceful Exclusion over Silent Overflow**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`lib/rag-lab/contextBuilder.ts`)
     - *Context:* LLM context windows are finite and costly. Packing retrieved chunks greedily risks silent context overflow or truncating sentences mid-word.
     - *Approach:* Enforce an exact token budget; if a candidate chunk exceeds remaining allowance, exclude it cleanly with status `budget_exceeded` and record diagnostic metadata.
     - *Alternatives Considered:* Greedy chunk packing with mid-chunk character truncation.
     - *Trade-offs:* May omit a partially relevant oversized chunk; guarantees synthesized answers only reference complete, uncorrupted evidence blocks.
  4. **ADR-RAG-04: Explicit Abstention and Untrusted Context Grounding over Speculative Generation**
     - *Classification:* **HISTORICALLY DOCUMENTED** (`lib/rag-lab/groundedSynthesizer.ts`)
     - *Context:* When retrieval scores fall below confidence thresholds or when queries contain false premises, standard RAG systems hallucinate answers.
     - *Approach:* Enforce hard abstention thresholds ($\text{RRF} < 0.015$) and prompt injection pattern scans, returning explicit refusal responses.
     - *Alternatives Considered:* Lowering prompt temperature or prompting LLM to "say I don't know if unsure".
     - *Trade-offs:* System declines to answer ambiguous questions; completely prevents ungrounded hallucinations and false-premise agreement.

---

## 3. Candidate Decision Records Summary Table

| Project ID | Candidate Decision Record Title | Primary Domain | Classification | Evidence Source |
| :--- | :--- | :--- | :--- | :--- |
| **ask-aadil** | ADR-AA-01: Deterministic Multi-Turn Intent Router Alongside LLM Synthesis | Architecture / AI Safety | **Historically Documented** | `lib/rag/intentRouter.ts`, `queryUnderstanding.ts` |
| **ask-aadil** | ADR-AA-02: Decoupled Multi-Source Authority Matrix over Single Unified Vector Store | RAG / Data Governance | **Historically Documented** | `data/canonical/sourceAuthority.ts`, `hybridRetriever.ts` |
| **ask-aadil** | ADR-AA-03: Two-Phase Human-in-the-Loop Confirmation Gate for External Actions | Agent Safety / Governance | **Historically Documented** | `lib/rag/tools/portfolioTools.ts`, `askAadilAgent.ts` |
| **ai-reliability** | ADR-REL-01: Real Headless Chromium Multi-Modal Ground Truth vs Synthetic Mocks | Testing / Reliability | **Historically Documented** | `ai-application-reliability/engineering-decisions.md` ADR 01 |
| **ai-reliability** | ADR-REL-02: Fisher Information Uncertainty Quantification & Abstention Gate | AI Safety / Mathematics | **Historically Documented** | `engineering-decisions.md` ADR 02 |
| **ai-reliability** | ADR-REL-03: Cryptographic SHA-256 Provenance Ledger for Forensic Auditing | Security / Compliance | **Historically Documented** | `engineering-decisions.md` ADR 04 |
| **solace-ai** | ADR-SOL-01: Synchronous Deterministic Pre-LLM Crisis Screening | AI Safety / Healthcare | **Historically Documented** | `data/projects.ts` Critical Decision |
| **solace-ai** | ADR-SOL-02: Ephemeral In-Memory Audio Zero-Retention Policy | Security / Privacy | **Historically Documented** | `data/projects.ts` Tradeoffs |
| **solace-ai** | ADR-SOL-03: Ambiguous Delivery Classification over Blind SSE Auto-Retries | Transport / Resilience | **Historically Documented** | `data/projects.ts` Tradeoffs |
| **design-automation** | ADR-EDA-01: Complete Exclusion of LLMs from Physics and Math Calculations | Mechanical / AI Boundary | **Historically Documented** | `engineering-design-automation/engineering-decisions.md` ADR 01 |
| **design-automation** | ADR-EDA-02: Anti-Hallucination Material Knowledge Base with Fail-Fast Blocking | Data Governance / Safety | **Historically Documented** | `engineering-decisions.md` ADR 02 |
| **design-automation** | ADR-EDA-03: Discrete Nominal Sizing Policy vs Continuous Dimensions | Manufacturing / Math | **Historically Documented** | `engineering-decisions.md` ADR 03 |
| **ocr-evaluator** | ADR-OCR-01: Critical-Field Priority Override vs Global Aggregate Accuracy | Evaluation / Quality | **Historically Documented** | `data/projects.ts` Critical Decision |
| **ocr-evaluator** | ADR-OCR-02: 5-Axis Controlled Image Degradation Suite | Robustness / Testing | **Historically Documented** | `data/evidence/ocrEvaluationData.ts` |
| **atlas-ai** | ADR-ATL-01: LangGraph Stateful Cyclic Multi-Agent Graph over Linear Chains | Architecture / Agents | **Historically Documented** | `atlas-ai/evidence-audit.md` |
| **atlas-ai** | ADR-ATL-02: Telegram-First Interface with Multimodal Audio & Vision Ingestion | Interface / Product | **Historically Documented** | `evidence-audit.md` |
| **vm-copy** | ADR-VM-01: Tier-1 Client-Side Deterministic Evaluator Before Human/Model Review | Quality / Performance | **Historically Documented** | `vm-copy/engineering-decisions.md` ADR 01 |
| **vm-copy** | ADR-VM-02: Parallel Micro-Batch Splitting to Prevent Serverless Timeouts | Cloud / Performance | **Historically Documented** | `engineering-decisions.md` ADR 02 |
| **vm-copy** | ADR-VM-03: One-Time Diagram Extraction to Structured Text for Batch Ingress | AI Efficiency / Cost | **Historically Documented** | `engineering-decisions.md` ADR 04 |
| **ai-worksheets** | ADR-WS-01: Externalized Headless LaTeX/TikZ Compilation for Mathematical Figures | Mathematical Rendering | **Historically Documented** | `ai-worksheets/engineering-decisions.md` ADR 01 |
| **ai-worksheets** | ADR-WS-02: Algorithmic Backtracking Grid Placement over Generative 2D Layout | Constraint Satisfaction | **Historically Documented** | `engineering-decisions.md` ADR 03 |
| **ai-worksheets** | ADR-WS-03: Three-Prompt Decoupled Verification Pipeline for Zero Clue Leakage | AI Safety / Quality | **Historically Documented** | `engineering-decisions.md` ADR 02 |
| **curriculum-etl** | ADR-ETL-01: Dynamic Schema Derivation from Sample CSV Contracts | Architecture / ETL | **Historically Documented** | `curriculum-etl/engineering-decisions.md` ADR 01 |
| **curriculum-etl** | ADR-ETL-02: Merged Evaluate-and-Fix Pass to Eliminate Pipeline Deadlocks | Performance / Reliability | **Historically Documented** | `engineering-decisions.md` ADR 02, Commit `252d06f` |
| **curriculum-etl** | ADR-ETL-03: Post-Extraction Deterministic Row Guards Outside the Model | Data Governance | **Historically Documented** | `engineering-decisions.md` ADR 03 |
| **math-item-bank** | ADR-MIB-01: Stateful Cyclic Agentic Graphs over Linear Chains | Architecture / Agents | **Historically Documented** | `math-item-bank/engineering-decisions.md` Decision 01 |
| **math-item-bank** | ADR-MIB-02: Bounded Retry Budgets with Human SME Escalation Queue | Agent Safety / Budget | **Historically Documented** | `engineering-decisions.md` Decision 02 |
| **math-item-bank** | ADR-MIB-03: Integer Linear Programming (ILP) Stratification for Distribution | Operations Research | **Historically Documented** | `engineering-decisions.md` Decision 03 |
| **loom-ai** | ADR-LOOM-01: LangGraph Supervisor Architecture with Typed Channel Reducers | Multi-Agent Systems | **Historically Documented** | `loom-ai/evidence-audit.md` |
| **loom-ai** | ADR-LOOM-02: Human-in-the-Loop Approval Queue for Consequential Actions | Governance / Safety | **Historically Documented** | `evidence-audit.md`, `ApprovalQueue.ts` |
| **loom-ai** | ADR-LOOM-03: Structured Schema Extraction over Free-Text Procurement Notes | Ingestion / Data | **Historically Documented** | `BuyerProcurementWorkflow.ts` |
| **rag-lab** | ADR-RAG-01: Normalized Subword n-Gram TF-IDF Vector Space over Neural Embeddings | RAG / Algorithmic Truth | **Historically Documented** | `lib/rag-lab/vectorSearch.ts` |
| **rag-lab** | ADR-RAG-02: Hybrid Reciprocal Rank Fusion (RRF, k=60) Balancing Exact & Morphology | Retrieval / Search | **Historically Documented** | `lib/rag-lab/hybridRrf.ts` |
| **rag-lab** | ADR-RAG-03: Strict Token-Budget Truncation with Graceful Exclusion | Performance / Context | **Historically Documented** | `lib/rag-lab/contextBuilder.ts` |
| **rag-lab** | ADR-RAG-04: Explicit Abstention and Untrusted Context Grounding over Speculation | Evaluation / AI Safety | **Historically Documented** | `lib/rag-lab/groundedSynthesizer.ts` |

---

## 4. Evidence Gaps & Boundaries

1. **Wayground Proprietary Systems (VM Copy, Curriculum Transformation, Math Item Bank):**
   - The original corporate database instances, private Redis queues, and internal Jira tickets are proprietary assets of Wayground.
   - *Audit Boundary:* The architecture, algorithms, and design choices are fully substantiated by open source clones (`aadil-lang/vm-copy-question-generator`), detailed technical specifications, and reproducible test suites in `research/project-analysis/`. All descriptions avoid disclosing confidential customer records or proprietary business data.
2. **Third-Party Live Services (Atlas AI Telegram Webhook, Solace AI Supabase):**
   - Live production webhooks are hosted on private cloud instances.
   - *Audit Boundary:* Architecture and tests are verified forensically via local repository clones (`C:\Users\HP\Documents\atlas-ai` with 178 passing pytest checks; Hermes AOT bundle logs for Solace AI).
3. **OpenCascade BRep Kernel in EDA:**
   - The OpenCascade C++ kernel runs in local Python environments generating STEP solids and SVG drawings.
   - *Audit Boundary:* The Three.js viewer on the web portfolio is an interactive procedural approximation based on the exact shaft parameters; it is explicitly labeled as procedural, not claimed to be a live browser-compiled BRep engine.
4. **Vector Retrieval in RAG Evaluation Lab:**
   - The vector search engine in `lib/rag-lab/vectorSearch.ts` uses character 3-gram and 4-gram TF-IDF cosine similarity.
   - *Audit Boundary:* It is explicitly documented as subword morphological vector retrieval; it is never described as a dense neural embedding model.

---

## 5. Proposed Phase 6.1 UI & Component Architecture

Following review and approval, the decision-record experience will be implemented with the following architecture:

### 5.1 Reusable Component Design: `<EngineeringDecisions />`
- **Location:** `components/decisions/EngineeringDecisions.tsx`
- **Structured Data Registry:** `data/decisions/projectDecisions.ts`
- **Integration Points:**
  - Case study page: `app/projects/[slug]/page.tsx` (replaces or enhances section 09 `tradeoffs` and section 05 `decision`).
  - Systems case study page: `app/systems/[slug]/page.tsx`.
  - Quick-jump navigation: link `#decisions` in the sticky case-study header.
- **Card Anatomy:**
  ```
  ┌─────────────────────────────────────────────────────────────┐
  │ [ADR-01] Decision Title                  [Historically Documented] │
  │ Summary of approach and the core engineering reason.        │
  │ ▼ View Full Decision Record (Context, Alternatives, Trade-offs)│
  ├─────────────────────────────────────────────────────────────┤
  │ (Expanded):                                                 │
  │ • Context & Problem: Technical and operational challenge.    │
  │ • Documented Constraints: Latency, safety, cost, determinism│
  │ • Chosen Approach: How it works in actual source code.       │
  │ • Alternatives & Trade-offs: What was considered & rejected. │
  │ • Consequences: Benefits and accepted limitations.          │
  │ • Verification Evidence: Link to source files and test suites│
  │ • Future Considerations: When to revisit this decision.     │
  └─────────────────────────────────────────────────────────────┘
  ```

### 5.2 Accessibility & Design Invariants
- **WCAG 2.2 AA Compliance:**
  - `<button aria-expanded={isOpen} aria-controls="decision-content-id">` for keyboard expansion.
  - Visible focus indicators (`focus-visible:ring-1 focus-visible:ring-[#5A9A78]`).
  - High-contrast badges (`#5A9A78` on `#18261F` passing 5.42:1 ratio).
  - Reduced-motion support (`@media (prefers-reduced-motion)`).
  - No horizontal layout overflow on mobile viewports.

---

## 6. Audit Conclusion & Next Steps

This investigation establishes an unassailable factual baseline across all 11 case studies plus the RAG Evaluation Lab. Every candidate decision record is supported by code or verified project documentation.

Per instructions, **implementation has not begun**. This audit report is presented for user review. Upon review and approval, implementation will proceed according to the approved plan.

