# Phase 6.5 — Interactive Project Comparison
## Stage 1: Source-Level Investigation, Architectural Analysis & Project Reconnaissance Report

**Role:** Principal Software Architect, Senior AI Systems Engineer, Technical Product Architect, UX Architect, Engineering Evaluation Specialist  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `engineering-security-reliability` (Level 1 Implementation Standard)  
**Proposed Route:** `/compare`  
**Stage:** Stage 1 — Investigation, Comparison Framework & UX Specification ONLY (Read-Only)  
**Date:** November 2026  

---

## 1. Executive Summary

This report establishes the source-level architectural and evidentiary foundation for **Phase 6.5: Portfolio-Wide Interactive Project Comparison** (`/compare`). 

In modern technical hiring, evaluators—including technical recruiters, engineering managers, and principal architects—need to discern an engineer's judgment:
- **Where is AI used, and where is deterministic software engineering preferred?**
- **How do orchestration, state management, and failure containment models differ across problems?**
- **What architectural trade-offs were made, and why?**
- **What was the engineer's exact individual contribution in collaborative team projects?**

Rather than relying on superficial technology lists, vanity complexity scores (e.g. "AI Maturity 9/10"), or generic side-by-side feature checkmarks, this investigation conducts a deep source-grounded audit across all **11 case studies** in the portfolio. 

Every architectural pattern, data flow, failure boundary, and trade-off documented in this report is anchored in verifiable source code, Phase 6.4 master evidence records (`EVID-*`), Phase 6.3 architecture component nodes (`comp-*`), and Phase 6.1 architectural decision records (`dec-*`).

---

## 2. Source-Level Investigation of the 11 Case Studies

### 2.1 Independent and Hackathon Systems

---

#### 1. Ask Aadil Conversational RAG Assistant (`/projects/ask-aadil`)
- **Primary Problem**: Enable technical recruiters and engineers to converse directly with an authoritative, grounded portfolio assistant that resists hallucinations, strictly enforces factual epistemic boundaries, and navigates portfolio artifacts without inventing unrecorded experiences.
- **Architectural Pattern**: Stateful Conversational RAG Agent with Deterministic Action Governance.
- **AI (Probabilistic) Responsibilities**:
  - Semantic query expansion and candidate ranking via hybrid scoring.
  - Conversational answer synthesis from retrieved canonical context chunks (`lib/rag/synthesizer/answerSynthesizer.ts`).
  - Speech-to-text transcript normalization from audio buffers (`lib/rag/voice/speechToTextProvider.ts`).
- **Deterministic Software Responsibilities**:
  - Intent classification routing (`lib/rag/intentRouter.ts:40-110`) mapping queries to `technical`, `professional`, `project_overview`, or `narrative`.
  - Multi-turn entity resolution (`lib/rag/projectResolver.ts`) mapping user queries to canonical project slugs.
  - Token budget context window allocation (`lib/rag/contextBuilder.ts`) preventing context overflow.
  - Citation grounding overlap calculation requiring $>80\%$ n-gram token overlap between synthesized text and retrieved chunks.
  - Action registry (`lib/rag/actionRegistry.ts`) gating client-side route navigation; untrusted LLMs cannot inject arbitrary URLs or unauthorized commands.
  - Strict epistemic abstention gates: queries regarding unrecorded employers (e.g. Google) or false technical premises trigger immediate deterministic abstention (`lib/rag/synthesizer/answerSynthesizer.ts:85-120`).
- **Data & Retrieval**: In-memory canonical knowledge index (`data/canonical/portfolioKnowledge.ts`), hybrid Okapi BM25 keyword search, and subword character n-gram cosine frequency similarity combined via Reciprocal Rank Fusion ($k=60$).
- **Failure Containment**: Token budget truncation, deterministic fallback to canonical resume facts, and client-side error boundary isolation.
- **Verification Evidence**: `EVID-AA-01` (13/13 hybrid retrieval tests), `EVID-AA-02` (16/16 grounded conversational tests, 40 voice assertions, 5/5 negative abstentions), `EVID-AA-03` (team ownership boundary gate).
- **Individual Contribution**: Sole author and architect.

---

#### 2. AI Application Reliability Platform (`/projects/ai-reliability`)
- **Primary Problem**: Web applications driven by LLM agents frequently fail silently through subtle DOM drift, non-deterministic action loops, and policy hallucinations that standard unit tests cannot detect.
- **Architectural Pattern**: Synthetic Browser Execution Harness & Multi-Agent Diagnostic Pipeline.
- **AI (Probabilistic) Responsibilities**:
  - Multi-turn synthetic user persona simulation generating realistic conversational branching (`evaluation/synthetic_journeys.py:45-180`).
  - Local diagnostic reasoning via Ollama classifying UI degradation patterns from captured DOM snapshots and HAR logs.
- **Deterministic Software Responsibilities**:
  - Playwright and Chromium headless browser automation executing multi-step user workflows (`tests/e2e/governance.spec.ts`).
  - Complete execution telemetry capture: DOM trees, screenshots, network HAR files, and console logs.
  - Fisher Information uncertainty circuit breaker (`src/governance/uncertainty.py:112-165`): computes token log-likelihood covariance determinants; halts execution with `Decision: ABSTAIN` when epistemic uncertainty exceeds empirical safety thresholds.
  - Append-only cryptographic ledger chaining audit logs via SHA-256 hashes (`src/ledger/provenance.py`).
- **Data & Retrieval**: Structured JSON test artifacts, SQLite local execution store, and SHA-256 genesis block provenance ledger.
- **Failure Containment**: Hard process timeouts (30s per browser turn), Fisher covariance circuit breakers, and sandboxed browser subprocess isolation.
- **Verification Evidence**: `EVID-REL-01` (205+ tests passing across 158 backend + 47 governance/Playwright), `EVID-REL-02` (1,000 synthetic journeys stress test), `EVID-REL-03` (Fisher covariance abstention gate).
- **Individual Contribution**: Sole author and architect.

---

#### 3. Solace AI (`/projects/solace-ai`)
- **Primary Problem**: Providing empathetic, voice-first mental health support on mobile devices while maintaining zero-latency emergency crisis routing, total patient audio privacy, and fault resilience over unstable cellular networks.
- **Architectural Pattern**: Mobile-to-Cloud Voice Companion with Dual-Tier Crisis Circuit Breakers.
- **AI (Probabilistic) Responsibilities**:
  - Multi-turn empathetic conversation and cognitive reframing via Gemini LLM streaming.
  - Speech-to-text audio transcription via Whisper STT.
  - Natural prosody speech synthesis via ElevenLabs TTS.
- **Deterministic Software Responsibilities**:
  - Microsecond Tier-1 Crisis Screening (`backend/services/crisis_detector.py:34-78`, `is_crisis_input`): compiled regex AST scanning input in $<2\text{ ms}$; achieves $100\%$ detection across 24 critical self-harm and emergency patterns, bypassing LLMs to route directly to human crisis hotlines.
  - Single-POST transport resilience (`mobile/src/network/transport.ts:65-110`): idempotent transaction identifiers contain ambiguous 502/503/504 gateway timeout drops, preventing duplicate voice dispatches.
  - Ephemeral in-memory audio zero-retention (`backend/api/audio.py:82-105`): raw audio buffers held strictly in process memory and deallocated via `del audio_bytes` in a `finally:` block; zero audio bytes written to disk.
- **Data & Retrieval**: Supabase PostgreSQL with Row-Level Security (RLS), encrypted local SQLite queue on client, and ephemeral in-memory audio buffers.
- **Failure Containment**: Upstream timeout circuit breaker, offline fallback state on React Native client, and deterministic emergency bypass.
- **Verification Evidence**: `EVID-SOL-01` (102 verified checks across backend and mobile), `EVID-SOL-02` (100% detection on 24 critical triggers in <2ms), `EVID-SOL-03` (single-POST transport resilience), `EVID-SOL-04` (ephemeral audio zero-retention).
- **Individual Contribution**: Full-stack architect and mobile/backend lead.

---

#### 4. Engineering Design Automation (`/projects/design-automation`)
- **Primary Problem**: Translating informal, unstructured mechanical engineering requirements (e.g. torque specifications, material grades, geometric constraints) into valid, topologically consistent 3D CAD models without human drafting bottlenecks.
- **Architectural Pattern**: Deterministic Engineering Calculus & Parametric CAD Pipeline with NLP Specification Extraction.
- **AI (Probabilistic) Responsibilities**:
  - Natural-language specification parsing extracting dimensional parameters and loading conditions from informal engineering briefs.
  - Fuzzy matching against standard mechanical engineering material catalogs (e.g. AISI 4140, 6061-T6 aluminum).
- **Deterministic Software Responsibilities**:
  - Strict Pydantic schema validation (`src/models/specification.py`) enforcing non-negative dimensions and physical admissibility.
  - Closed-form Saint-Venant analytical torsional and shear stress calculus (`src/physics/torsion.py:30-85`) calculating minimum polar moment of inertia and required shaft diameters.
  - OpenCascade BRep (Boundary Representation) solid modeling kernel integration (`src/cad/engine.py:50-180`) constructing parametric 3D geometry and exporting ISO-standard STEP files.
  - Mathematical volume cross-validation (`src/cad/analysis/mass_properties.py:88-124`): verifies analytical Saint-Venant volume against discrete OpenCascade CAD surface mass integrals ($< 10^{-6}$ relative discrepancy, verified as $0.0000\%$ error).
- **Data & Retrieval**: In-memory parametric geometric definitions, Pydantic type models, and STEP CAD export files.
- **Failure Containment**: Hard physical parameter boundaries (rejection of zero/negative dimensions, yield stress checks), OpenCascade topology validation, and Dockerized test sandbox.
- **Verification Evidence**: `EVID-EDA-01` (424 automated pytests passing across 28 test suites in Docker), `EVID-EDA-02` (0.0000% volume calculation discrepancy between physics and CAD BRep).
- **Individual Contribution**: Sole author and architect.

---

#### 5. OCR Evaluation & Robustness Platform (`/projects/ocr-evaluator`)
- **Primary Problem**: Assessing OCR extraction reliability across real-world physical document degradation (blur, skew, noise, compression) and preventing corrupt invoices from entering corporate ERP systems.
- **Architectural Pattern**: Controlled Perturbation Benchmarking & Risk-Gated Ingestion Platform.
- **AI (Probabilistic) Responsibilities**:
  - Multi-engine OCR text extraction (Tesseract OCR, PaddleOCR).
  - Spatial bounding box token alignment and fuzzy string matching.
- **Deterministic Software Responsibilities**:
  - 5-axis controlled synthetic image perturbation matrix (`src/perturbation/axes.py:50-210`): Gaussian blur ($\sigma \in [0.5, 3.0]$), rotational skew ($\theta \in [-15^\circ, +15^\circ]$), noise, contrast reduction, and JPEG quality degradation ($Q \in [10, 80]$).
  - Standardized Character Error Rate (CER) and Word Error Rate (WER) Levenshtein distance computations.
  - Critical-Field Priority Decision Gate (`src/evaluation/risk_gate.py:40-95`): deterministic PASS / REVIEW / FAIL routing based on weighted field thresholds (financial totals weighted 3x over descriptive line items).
- **Data & Retrieval**: Synthetic invoice datasets, Ground Truth JSON schemas, and OpenCV image transformation buffers.
- **Failure Containment**: Critical-field confidence thresholding; automatic escalation to human review queue when totals drop below 98% confidence.
- **Verification Evidence**: `EVID-OCR-01` (154 total tests: 134 backend + 20 UI), `EVID-OCR-02` (5-axis controlled image perturbation matrix), `EVID-OCR-03` (critical-field risk gating engine).
- **Individual Contribution**: Sole author and architect.

---

#### 6. Atlas AI (`/projects/atlas-ai`)
- **Primary Problem**: Conducting complex corporate financial research across multi-hundred-page SEC regulatory filings (10-K, 10-Q) without losing structural footnote context or hallucinating financial metrics.
- **Architectural Pattern**: Regulatory Multi-Agent RAG Pipeline with Stateful LangGraph Orchestration.
- **AI (Probabilistic) Responsibilities**:
  - Dense semantic retrieval via Gemini embedding vectors.
  - Financial narrative summarization and MD&A section analysis.
  - Multi-agent collaborative reasoning loops via LangGraph nodes.
- **Deterministic Software Responsibilities**:
  - SEC EDGAR automated filing parser extracting structured financial tables, balance sheets, and footnotes without HTML table flattening.
  - Telegram bot interface formatting and command dispatch.
  - SHA-256 section hash alert deduplication (`src/alerts/dedup.py:22-60`): eliminates redundant alerts for unchanged regulatory sections across periodic filings.
- **Data & Retrieval**: MongoDB Atlas Vector Search, SEC EDGAR XBRL/HTML filings, and LangGraph persistent state checkpoints.
- **Failure Containment**: Table layout preservation, fixture-backed CI test harnesses, and idempotent alert dispatching.
- **Verification Evidence**: `EVID-ATL-01` (178 automated pytests validating SEC filings and tool execution), `EVID-ATL-02` (59 tests in core MVP release), `EVID-ATL-03` (SHA-256 section alert deduplication).
- **Individual Contribution**: System architect and core backend engineer.

---

#### 7. Loom AI (`/projects/loom-ai`)
- **Primary Problem**: Streamlining enterprise B2B procurement and RFQ (Request for Quote) supplier matching while preventing unauthorized autonomous purchase orders.
- **Architectural Pattern**: Clean Architecture Enterprise Microservice with Human-in-the-Loop Procurement Gateways.
- **AI (Probabilistic) Responsibilities**:
  - Natural language RFQ extraction from unstructured enterprise emails and PDF attachments.
  - Semantic supplier catalog capability matching.
- **Deterministic Software Responsibilities**:
  - Clean Architecture downward dependency enforcement (`src/architecture/dependency_checker.py`): static AST analyzer verifies 0 upward imports from domain entities to external frameworks or databases.
  - Compound MongoDB text indexes optimizing catalog search.
  - Procurement HITL Cryptographic Approval Gate (`src/procurement/hitl_queue.py:45-110`): orders exceeding $10,000 are blocked from state transition to `APPROVED` without an authorized procurement officer HMAC cryptographic signature.
- **Data & Retrieval**: MongoDB Atlas document store with compound text indexes, Next.js application frontend, and Redis session queue.
- **Failure Containment**: Clean Architecture domain isolation, state machine transition guards, and cryptographic signature verification.
- **Verification Evidence**: `EVID-LOM-01` (Clean Architecture downward dependency check), `EVID-LOM-02` (procurement HITL approval gate).
- **Individual Contribution**: Full-stack architect and lead engineer.

---

### 2.2 Collaborative & Wayground Systems

---

#### 8. Curriculum Transformation Engine (`/projects/curriculum-etl`)
- **Primary Problem**: Ingesting legacy curriculum data from heterogeneous, unstructured CSV exports and transforming them into modern structured educational taxonomies at enterprise scale.
- **Architectural Pattern**: Concurrent Dynamic Pydantic Extraction & 3-Tier Integrity Pipeline.
- **AI (Probabilistic) Responsibilities**:
  - Map-Reduce curriculum re-categorization using Claude workers.
  - Pedagogical review agent assessing learning objective alignment with Bloom’s taxonomy.
- **Deterministic Software Responsibilities**:
  - Dynamic Pydantic schema derivation (`src/models/schema_compiler.py`): compiles runtime Python validation models dynamically from sample CSV headers.
  - Local concurrency via Python `ThreadPoolExecutor` bounding memory utilization during batch CSV processing.
  - CSV formula injection sanitization (`src/sanitization/csv_shield.py:15-45`): strips leading `=`, `+`, `-`, `@`, `\t`, `\r` characters to prevent Dynamic Data Exchange (DDE) formula execution in Microsoft Excel.
  - 3-tier sequential integrity pipeline (`src/pipeline/integrity.py:30-115`): Reviewer $\to$ Critic $\to$ CSV Audit gates.
- **Data & Retrieval**: Dynamic Pydantic models, tabular CSV buffers, and structured JSON export records.
- **Failure Containment**: Formula injection sanitization, dynamic schema validation rejecting malformed columns, and batch transaction rollback.
- **Verification Evidence**: `EVID-ETL-01` (36 automated pytests on schema compiler), `EVID-ETL-02` (3-tier integrity pipeline), `EVID-ETL-03` (CSV formula injection defense).
- **Individual Contribution vs Team Ownership**: Developed at Wayground. Individual contribution: dynamic Pydantic schema synthesis compiler, CSV formula sanitization shield, and 3-tier integrity verification pipeline.

---

#### 9. VM Copy Question Generator (`/projects/vm-copy`)
- **Primary Problem**: Generating high-quality, pedagogically sound multiple-choice questions (MCQs) while guaranteeing strict structural compliance (exactly 4 options, exactly 1 correct answer, unique distractors) without wasting expensive LLM judge API calls on invalid outputs.
- **Architectural Pattern**: Pre-Flight Deterministic Evaluation Layer & Parallel Micro-Batching Engine.
- **AI (Probabilistic) Responsibilities**:
  - Hierarchical prompt-based question generation parameterized by subject, grade level, and difficulty.
  - Pedagogical explanation synthesis.
- **Deterministic Software Responsibilities**:
  - Tier-1 Pure TypeScript Deterministic Evaluator (`lib/eval-layer.ts:44-76`): executes in $<1\text{ ms}$ at $\$0$ LLM API cost ahead of any LLM judge; validates exactly 4 options, exactly 1 correct answer, rejects duplicate distractors, and enforces non-empty prompt fields.
  - Parallel micro-batching (`app/api/generate/route.ts:55-120`): bounds end-to-end question set generation latency to 4–6s (a 3x speedup over sequential 18s generation).
- **Data & Retrieval**: In-memory TypeScript data structures, Portkey gateway proxy configs, and structured JSON schemas.
- **Failure Containment**: Pre-flight regex and Set validation rejecting structurally malformed MCQs before downstream billing.
- **Verification Evidence**: `EVID-VMC-01` (pure TypeScript evaluator in <1ms at $0 API cost), `EVID-VMC-02` (parallel micro-batching bounding latency to 4–6s).
- **Individual Contribution vs Team Ownership**: Developed at Wayground. Individual contribution: designed and implemented the Tier-1 TypeScript deterministic evaluator and parallel micro-batching queue.

---

#### 10. AI Worksheets (`/projects/ai-worksheets`)
- **Primary Problem**: Generating printable, classroom-ready mathematical worksheets featuring complex vector geometry and backtracking puzzles without compilation crashes.
- **Architectural Pattern**: Dual Formal/Gamified Generation Engine with Sandboxed TikZ Compilation.
- **AI (Probabilistic) Responsibilities**:
  - Math word problem narrative generation.
  - Raw TikZ LaTeX geometric graphic markup generation.
- **Deterministic Software Responsibilities**:
  - Headless TikZ pdflatex compiler sandbox (`scripts/latex_renderer.py:35-90`): executes pdflatex in an isolated subprocess with strict 15s watchdog timeout, rasterizing output to 300 DPI PNG graphics.
  - MD5 source hash caching (`src/cache/asset_cache.py:20-55`): hashes raw TikZ source code to bypass pdflatex recompilation on cache hits ($<10\text{ms}$ latency).
  - Graph backtracking puzzle solvers: pure algorithmic DFS solvers generating provably solvable 2D crosswords and hexagonal mazes.
- **Data & Retrieval**: Pre-rendered PNG asset store, MD5 content-addressed cache, and LaTeX template schemas.
- **Failure Containment**: 15-second subprocess execution ceiling preventing infinite compilation loops from recursive LaTeX macros.
- **Verification Evidence**: `EVID-WKS-01` (headless TikZ compiler sandbox with 15s timeout), `EVID-WKS-02` (MD5 source hash caching eliminating redundant compilation).
- **Individual Contribution vs Team Ownership**: Developed at Wayground. Individual contribution: headless LaTeX subprocess compiler sandbox, MD5 caching engine, and DFS graph backtracking puzzle solvers.

---

#### 11. US Mathematics Item Bank (`/projects/math-item-bank`)
- **Primary Problem**: Scaling enterprise assessment item generation across state-specific curriculum standards while ensuring correct visual rendering of geometric and algebraic expressions.
- **Architectural Pattern**: Assessment Item Generation Pipeline with Mathematical Domain Routing.
- **AI (Probabilistic) Responsibilities**:
  - Standard-aligned assessment blueprint generation.
  - Distractor rationale generation based on common student misconceptions.
- **Deterministic Software Responsibilities**:
  - Mathematical Domain Router (`src/router/domain_router.py:40-105`): parses mathematical expression ASTs to determine token complexity; routes 2D planar geometry to client-rendered SVG and complex algebraic curves to server-compiled TikZ.
  - Compilation syntax pass/fail gates validating LaTeX math syntax before database ingestion.
- **Data & Retrieval**: Curriculum item database, state standard taxonomies, and vector asset renderers.
- **Failure Containment**: Syntax compilation gate preventing malformed math markup from entering assessment repositories.
- **Verification Evidence**: `EVID-MIB-01` (mathematical domain routing engine).
- **Individual Contribution vs Team Ownership**: Developed at Wayground as a team-wide initiative. System is owned by the Wayground Engineering Team. Individual contribution: mathematical domain router (SVG vs TikZ) and automated compiler syntax pass/fail gates.

---

## 3. High-Level Comparison Summary Table

| Project Slug | Architectural Pattern | Primary AI Role | Primary Deterministic Role | Key Failure Containment | Verification Evidence |
|:---|:---|:---|:---|:---|:---:|
| `ask-aadil` | Stateful Conversational RAG | Conversational synthesis & expansion | Intent routing & action governance | Grounding overlap & negative abstention | `EVID-AA-01..03` |
| `ai-reliability` | Synthetic Browser Diagnostic | Diagnostic error classification | Playwright runner & telemetry capture | Fisher Information uncertainty gate | `EVID-REL-01..03` |
| `solace-ai` | Mobile Companion & Streaming | Empathetic conversation & STT | Regex crisis circuit breaker (<2ms) | Single-POST idempotent transport | `EVID-SOL-01..04` |
| `design-automation`| Deterministic CAD Calculus | NLP specification extraction | Saint-Venant physics & OpenCascade | Numerical calculus discrepancy gate | `EVID-EDA-01..02` |
| `ocr-evaluator` | Controlled Perturbation Eval | OCR text extraction | 5-axis image degradation & CER/WER | Critical-field priority risk gate | `EVID-OCR-01..03` |
| `curriculum-etl` | Concurrent Data Transformation| Map-Reduce categorization | Dynamic Pydantic schema synthesis | CSV formula injection sanitizer | `EVID-ETL-01..03` |
| `atlas-ai` | Regulatory Financial RAG | SEC filing narrative analysis | SEC table parser & alert worker | SHA-256 section alert deduplication | `EVID-ATL-01..03` |
| `loom-ai` | Clean Architecture Enterprise | RFQ requirement extraction | Downward Clean Architecture checks | Procurement HITL cryptographic gate | `EVID-LOM-01..02` |
| `vm-copy` | Pre-Flight Evaluator & Batching| MCQ content generation | Pure TS structural evaluation (<1ms) | Set-based duplicate distractor rejection| `EVID-VMC-01..02` |
| `ai-worksheets` | Subprocess Rendering & Solvers | Math problem narrative | Headless TikZ pdflatex compiler | 15s subprocess compilation ceiling | `EVID-WKS-01..02` |
| `math-item-bank` | Domain Routing Pipeline | Item blueprint generation | Mathematical domain router (SVG/TikZ)| Compiler syntax pass/fail gate | `EVID-MIB-01` |

