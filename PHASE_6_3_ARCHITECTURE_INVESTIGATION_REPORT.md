# Phase 6.3 — Architecture Investigation Report
**Role:** Principal Software Architect, Senior AI Systems Engineer, Full-Stack Technical Lead, Reliability Engineer, and Technical Documentation Auditor  
**Date:** November 2026  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Branch:** `main`  
**Feature:** Phase 6.3 — Interactive Architecture Explorer  
**Stage:** Stage 1 — Read-Only Architecture Investigation & Design Specification  
**Implementation Status:** NOT AUTHORIZED (Read-Only Investigation Mode)  
**Standard:** `engineering-security-reliability` (Level 1 Implementation Standard)

---

## 1. Executive Summary

This investigation analyzes five candidate engineering systems across the repository to establish the foundational architecture, execution flows, component boundaries, deterministic controls, and verification mechanisms required to build an evidence-backed **Interactive Architecture Explorer**.

Rather than presenting decorative or abstracted block diagrams, the Interactive Architecture Explorer must expose the authentic software engineering behind each system. Each explored node, edge, and transition must map directly to source code, executable tests, or documented engineering decisions.

### Systems Investigated:
1. **Candidate A — Ask Aadil** (`/projects/ask-aadil`): Stateful conversational RAG agent with deterministic intent routing, multi-turn entity resolution, hybrid BM25 + Vector retrieval, token-budgeted synthesis, human-in-the-loop action gates, and Web Speech API / VAD integration.
2. **Candidate B — AI Application Reliability Platform** (`/projects/ai-reliability`): Local-first browser testing platform with headless Playwright Chromium execution, multi-modal evidence capture, local Ollama Qwen 2.5 diagnostic reasoning, Fisher Information uncertainty quantification, deterministic ChangeAuthorization gates, and an append-only SHA-256 provenance ledger.
3. **Candidate C — Solace AI** (`/projects/solace-ai`): Cross-platform Expo 58 / FastAPI mental wellness companion with synchronous deterministic pre-LLM crisis screening (<2ms), feature-flagged LangGraph StateGraph SSE streaming with native fallback, consent-gated memory isolation, single-POST transport resilience (ambiguous 502/503/504 containment), and ephemeral in-memory voice privacy.
4. **Candidate D — Engineering Design Automation** (`/projects/design-automation`): Hybrid mechanical engineering system pairing natural-language specification extraction with pure deterministic closed-form physics solvers (torsion, shear, deflection), a fail-fast anti-hallucination material catalog, OpenCascade 3D BRep CAD solid kernel, and automated CAD ↔ drawing cross-validation verified across 424 automated pytests.
5. **Candidate E — RAG Lab** (`/rag-lab`): Sandboxed retrieval evaluation harness comparing Okapi BM25, character n-gram / subword vector similarity, and Reciprocal Rank Fusion (k=60), with token budget truncation, rule-based citation validation, deterministic abstention, and formal ranking metrics (P@K, R@K, MRR, nDCG@K).

---

## 2. Candidate A: Ask Aadil Architecture

### 2.1 System Purpose & Architectural Scope
Ask Aadil is a grounded, stateful conversational agent that answers visitor inquiries regarding the candidate's engineering background, case studies, verified metrics, and career trajectory. It combines deterministic query routing with hybrid retrieval, strict citation grounding, and an authorization-gated communication pipeline.

### 2.2 Entry Points & Component Hierarchy
- **UI Shell**: `components/AskAadil/AskAadilModal.tsx`, `components/AskAadil/AskAadilLauncher.tsx`, `components/AskAadil/AskAadilFloatingButton.tsx`.
- **Agent Coordinator**: `lib/rag/askAadilAgent.ts` (`askAadil(query, prevState)`).
- **Page Context Bridge**: `lib/rag/askAadilPageContext.ts` (extracts active route, project slug, and selected text).
- **Intent Router & Query Understanding**: `lib/rag/intentRouter.ts`, `lib/rag/queryUnderstanding.ts`, `lib/rag/projectResolver.ts`.
- **Hybrid Retrieval Layer**: `lib/rag/hybridRetriever.ts`, `lib/rag/knowledgeIndex.ts`.
- **Source Authority Rules**: `data/canonical/sourceAuthority.ts`, `data/canonical/sourceConflicts.ts`.
- **Answer Synthesizer**: `lib/rag/synthesizer/answerSynthesizer.ts` (rule-based fallback), `lib/rag/synthesizer/llmAnswerSynthesizer.ts` (LLM-assisted synthesis).
- **Tool Governance & Action Pipeline**: `lib/rag/tools/actionAudit.ts`, `lib/rag/tools/authorization.ts`, `lib/rag/tools/emailTools.ts`, `lib/rag/tools/toolPlanner.ts`, `lib/rag/tools/toolPlanValidator.ts`, `lib/rag/tools/toolPlanExecutor.ts`.
- **Voice / Speech Engine**: `lib/rag/voice/speechToTextProvider.ts`, `lib/rag/voice/mockVoiceProvider.ts`, `lib/rag/voice/textToSpeechProvider.ts`.

### 2.3 End-to-End Execution Flow (Standard Conversational Turn)
```
[User Input (Text or Voice STT)]
       │
       ▼
[Reset / Restart Check] ──(Matched)──> [Return Initial State & Welcome Greeting]
       │ (Not Reset)
       ▼
[Query Understanding & Intent Classification]
       │ ── Deterministic pattern matching (`intentRouter.ts`)
       │ ── Entity tracking & pronoun resolution (`projectResolver.ts`)
       ▼
[Route Branching]
   ├── Direct Navigation / Contact Intent ──> [Instant Deterministic Client Action (0ms LLM)]
   └── Synthesis / Explanatory Intent
            │
            ▼
   [Hybrid Retrieval (`retrieveHybrid`)]
       ├── Lexical BM25 Scoring over `knowledgeIndex`
       ├── Vector Cosine Similarity over subword chunks
       └── Reciprocal Rank Fusion (k=60) + Source Authority Filtering
            │
            ▼
   [Evidence Packaging & Context Budget Allocation]
            │
            ▼
   [Grounded Answer Synthesis (`llmAnswerSynthesizer` or `defaultSynthesizer`)]
       ├── Hallucination Check & Abstention Gate (e.g. Google employment -> ABSTAIN)
       ├── Verbatim Granular Citation Badging (e.g. `[cite-1]`, layer tags)
       └── Draft Generation for Outbound Inquiries (`emailDraftTool`)
            │
            ▼
   [Human Authorization Gate (`approveAuthorization`)] ──(Pending)──> [Await User Confirmation]
            │ (Confirmed)
            ▼
   [Execution / Client Dispatch (`executeToolPlan`)]
```

### 2.4 Deterministic vs Probabilistic Boundary
- **Strictly Deterministic**:
  - Intent classification for navigation, contact, and system deep-dives (`classifyAndRoute`).
  - Pronoun and project slug resolution (`resolveProjectEntity`).
  - Lexical tokenization and BM25 index lookups.
  - Reciprocal Rank Fusion formula ($1 / (k + \text{rank})$).
  - Source layer access control (`sourceAuthorityRules`).
  - Action authorization gating (rejects unapproved email client opening).
  - Explicit abstention scenarios (e.g., questions regarding salary, unverified corporate employment, or private telephone numbers).
- **Probabilistic / Model-Dependent**:
  - Semantic similarity scoring in dense vector retrieval.
  - Natural-language prose generation in `llmAnswerSynthesizer`.
  - Speech-to-text acoustic token transcription.

### 2.5 Failure & Containment Boundaries
- **Ungrounded Facts / Out-of-Scope Queries**: Deterministic abstention triggered ("I don't have that documented in Aadil's connected sources...").
- **Pronoun Ambiguity**: When multi-turn context lacks an antecedent, the system asks for clarification rather than hallucinating an arbitrary project.
- **Action Gate**: Automated code execution or message sending is physically impossible without an explicit client-side authorization event (`open-email-client`).

---

## 3. Candidate B: AI Application Reliability Platform Architecture

### 3.1 System Purpose & Architectural Scope
An enterprise-grade autonomous browser testing and diagnostic platform built independently to solve the non-deterministic failure modes of modern web applications (React hydration errors, DOM layout shifts, and race conditions). It combines headless browser automation with local LLM reasoning, mathematical uncertainty quantification, and cryptographic auditability.

### 3.2 Entry Points & Component Hierarchy
- **Test Orchestration & Control Plane**: `apps/reliability_platform/runners/browser_runner.py`, `backend/app/main.py`.
- **Browser Execution Kernel**: Playwright Headless Chromium (`playwright.async_api`).
- **Telemetry & Artifact Collector**: Captures 4 empirical ground-truth artifacts (DOM snapshot, full-page PNG, network HAR trace, console exception stream).
- **Diagnostic Reasoner**: Local Ollama Qwen 2.5 Coder (`backend/app/diagnosis/analyzer.py`).
- **Grounding Validator**: `backend/app/diagnosis/grounding_validator.py` (verifies cited stack frames exist in collected logs).
- **Uncertainty Quantification**: `apps/reliability_platform/analysis/uncertainty.py` (calculates parameter variance via empirical Fisher Information Matrix).
- **Governance Gate**: `backend/app/governance/authorization_service.py` (`can_apply`, `ChangeAuthorization`).
- **Provenance Ledger**: `apps/reliability_platform/governance/provenance.py` (chained SHA-256 genesis block ledger).

### 3.3 End-to-End Execution Flow (Diagnostic & Remediation Loop)
```
[Target Web Application (e.g. Next.js on port 3000)]
       │
       ▼
[Playwright Headless Chromium Runner]
       │ ── Dispatches synthetic user journeys (1,000 journeys)
       │ ── Monitors console events, network requests, and DOM mutations
       ▼
[Failure Detection (DOM Assertion or Exception)]
       │
       ▼
[Multi-Modal Ground Truth Capture]
   ├── 1. Raw DOM Snapshot
   ├── 2. Full-Page PNG Screenshot
   ├── 3. Network HAR Log
   └── 4. Console Exception Stream
       │
       ▼
[Local Ollama Qwen 2.5 Diagnostic Inference]
       │
       ▼
[Grounding Validator (`grounding_validator.py`)]
       ├── Crosse-checks cited stack frames and symbols against raw logs
       └── Rejects ungrounded / hallucinated root causes
       │
       ▼
[Fisher Information Uncertainty Gate (`uncertainty.py`)]
       ├── Estimates parameter covariance matrix over failure hypotheses
       └── If variance > ε_abstain ──> [Emit `Decision: ABSTAIN` & Escalate to Human]
       │ (Variance ≤ ε_abstain)
       ▼
[Deterministic ChangeAuthorization Gate (`authorization_service.py`)]
       ├── Blocks autonomous code mutation without cryptographic token
       └── Evaluates subject_id, target_commit_sha, and evidence package hash
       │ (Authorized)
       ▼
[Append to SHA-256 Provenance Chain] ──> [Issue Patch Proposal & Retest]
```

### 3.4 Deterministic vs Probabilistic Boundary
- **Strictly Deterministic**:
  - Playwright DOM selectors and event dispatch.
  - Multi-modal artifact file serialization.
  - Grounding validator substring matching.
  - Fisher Information Matrix inversion and threshold comparison ($>\epsilon_{\text{abstain}}$).
  - ChangeAuthorization token verification.
  - SHA-256 block hashing and chain traversal.
- **Probabilistic / Model-Dependent**:
  - Ollama Qwen 2.5 natural-language root-cause hypothesis generation.
  - Multi-modal vision analysis of screenshot bounding boxes.

### 3.5 Failure & Containment Boundaries
- **Noisy / Poisoned Failure Traces**: Fisher Information gate forces an immediate `ABSTAIN` verdict, completely preventing speculative code patches.
- **Consequential Mutations**: Hard gate blocks autonomous file writes unless an explicit, valid `ChangeAuthorization` token is verified.
- **Forensic Tampering**: Any silent modification of logs or diffs breaks the SHA-256 chain verification.

---

## 4. Candidate C: Solace AI Architecture

### 4.1 System Purpose & Architectural Scope
Built for the Solace Hackathon (November 2026), Solace AI is a safety-first mobile emotional wellness companion (React Native / Expo 58 + FastAPI) backed by Supabase PostgreSQL Row Level Security. It prioritizes sub-2ms deterministic crisis intervention, consent-driven emotional memory, ephemeral voice privacy, and resilient client-server transport.

### 4.2 Entry Points & Component Hierarchy
- **Mobile Client**: Expo SDK 58 / React Native 0.88 (`mobile/app/`, `mobile/services/api.ts`, `mobile/stores/useCheckInStore.ts`).
- **Backend API Gateway**: FastAPI (`backend/app/main.py`, `backend/app/api/chat.py`, `backend/app/api/voice.py`).
- **Deterministic Crisis Safety Interceptor**: `backend/app/services/safety.py` (`is_crisis_input`).
- **Orchestration & State Machine**: LangGraph StateGraph (`backend/app/services/agent_graph.py`), wrapped in feature flag `ENABLE_LANGGRAPH_ROUTING`.
- **Streaming Pipeline**: Server-Sent Events (SSE) via `astream_events` / `adispatch_custom_event`.
- **Database & Identity**: Supabase PostgreSQL with 6 RLS migrations (`backend/supabase/migrations/`).
- **Voice Privacy Engine**: In-memory Whisper transcription with immediate buffer purge (`del audio_bytes` in `finally:`).

### 4.3 End-to-End Execution Flow (Conversational & Safety Lifecycle)
```
[User Message via Mobile Client (Expo 58)]
       │
       ▼
[Resilient Transport Layer (`api.ts`)]
       ├── Single-POST policy (no blind retries on 502/503/504)
       └── 55s bounded exponential backoff with jitter for idempotent reads
       │
       ▼
[FastAPI Gateway (`chat.py`) & Supabase JWT Auth]
       │ ── Extracts auth.uid() directly from cryptographically signed claims
       ▼
[SYNCHRONOUS DETERMINISTIC CRISIS SCREENING (`is_crisis_input`)]
       │ ── Evaluates multilingual patterns (English, Roman Urdu, Urdu script)
       │ ── Filters false-positive figurative idioms ("dying of laughter")
       ├── Matched (Crisis Detected in <2ms) ──> [IMMEDIATE SHORT-CIRCUIT]
       │                                         └── Return Tele-MANAS 14416 / 112 / 988
       │                                         └── Zero LLM inference or token spend
       ▼ (Safe Input)
[Feature Flag Check: `ENABLE_LANGGRAPH_ROUTING`]
       ├── Flag Enabled ──> [LangGraph StateGraph Token Streaming (`astream_events`)]
       └── Flag Disabled / Graph Error ──> [Immediate Native Gemini Streaming Fallback]
       │
       ▼
[Consent-Gated Memory Suggestion Banner (`memory_suggestion` SSE Event)]
       ├── Isolated from voice journals and private poetry
       └── Requires explicit user tap to persist into Supabase RLS store
```

### 4.4 Deterministic vs Probabilistic Boundary
- **Strictly Deterministic**:
  - Regex-based crisis pattern evaluation (<2ms latency).
  - False-positive idiom rejection table.
  - JWT claim validation and Supabase PostgreSQL RLS policies (`auth.uid() = user_id`).
  - Audio buffer deletion (`del audio_bytes`) in Python `finally:` block.
  - Transport single-POST execution preventing duplicate database turns.
  - Android SecureStore key sanitization (`sanitizeKey`) and 1500-byte note chunking.
- **Probabilistic / Model-Dependent**:
  - Gemini LLM conversational response streaming.
  - Ambient mood reflection extraction.
  - Whisper speech-to-text acoustic token mapping.

### 4.5 Failure & Containment Boundaries
- **Acute Self-Harm / Crisis**: Deterministic short-circuit bypasses LLM completely, eliminating model latency and prompt injection vulnerabilities.
- **Gateway Timeouts (502/503/504)**: Classified as ambiguous delivery without retry, preventing message duplication in chat history.
- **Biometric Voice Privacy**: Audio is never written to disk or object storage (S3/GCS); memory purge occurs immediately after transcription.

---

## 5. Candidate D: Engineering Design Automation (EDA) Architecture

### 5.1 System Purpose & Architectural Scope
A hybrid mechanical engineering automation system that converts natural-language design briefs into validated 3D STEP BRep solid geometry and 2D ASME manufacturing blueprints. It enforces a strict boundary excluding LLMs from arithmetic and physics, delegating all mechanical calculations to closed-form Python solvers.

### 5.2 Entry Points & Component Hierarchy
- **Specification Ingestion**: Natural-language interface (`src/interface/streamlit_app.py`).
- **AI Spec Extractor**: Pydantic schema extractor with character-level span provenance (`src/extractor/spec_extractor.py`).
- **Material Knowledge Base**: Anti-hallucination material catalog (`src/materials/catalog.py`).
- **Closed-Form Physics Solvers**: `src/solvers/shaft_torsion.py` (Saint-Venant equations, von Mises shear yield $S_{sy} = 0.57735 \cdot S_y$, Euler-Bernoulli deflection).
- **Nominal Quantizer**: ISO metric series quantization (`src/solvers/nominal_series.py`).
- **CAD Kernel**: OpenCascade / CadQuery / PythonOCC solid geometry generator (`src/cad/brep.py`).
- **Validation Engine**: Automated CAD ↔ 2D drawing cross-verifier and Dockerized pytest harness (424 pytests).

### 5.3 End-to-End Execution Flow (CAD Solid Synthesis)
```
[Natural Language Engineering Brief]
       │ (e.g. "7.5 kW motor at 1200 RPM, 40mm length, FoS 2.2, AISI 1045 steel")
       ▼
[LLM Specification Extractor]
       ├── Extracts power, RPM, safety factor, and material string
       └── Records character span provenance for every extracted parameter
       │
       ▼
[Anti-Hallucination Material Catalog (`catalog.py`)]
       ├── Halts with status BLOCKED on ambiguous generic terms ("steel", "aluminum")
       └── Loads verified ASTM/EN yield strength (Sy) and shear modulus (G)
       │
       ▼
[CLOSED-FORM DETERMINISTIC PHYSICS SOLVERS (Zero LLM Math)]
       ├── Transmitted Torque: T = P / ω
       ├── Allowable Shear Stress: τ_allow = (0.57735 · Sy) / FoS
       └── Minimum Theoretical Diameter: d_min = (16·T / (π·τ_allow))^(1/3)
       │
       ▼
[Nominal ISO Quantization] ──> Snaps d_min to standard metric bar stock (e.g. 16.0 mm)
       │
       ▼
[OpenCascade BRep CAD Solid Synthesis]
       ├── Generates exact boundary representation (1 lateral cylinder face + 2 caps)
       └── Computes exact topological bounding box and analytical volume
       │
       ▼
[Automated Verification Gate]
       ├── Verifies relative volume error < 10⁻⁶ (0.0000% discrepancy)
       ├── Cross-checks 3D solid dimensions against 2D ASME SVG blueprint
       └── Export ISO 10303 STEP solid file and dimensional audit report
```

### 5.4 Deterministic vs Probabilistic Boundary
- **Strictly Deterministic**:
  - Material grade lookup and fail-fast blocking rules.
  - Closed-form Saint-Venant torsional shear equations.
  - von Mises distortion-energy criterion.
  - ISO nominal standard series quantization.
  - OpenCascade BRep topological geometry computation.
  - 424 automated pytests verifying volume tolerance $< 10^{-6}$.
- **Probabilistic / Model-Dependent**:
  - LLM parsing of unstructured natural language into structured Pydantic parameters.

### 5.5 Failure & Containment Boundaries
- **Vague Materials**: Generic input `"steel"` immediately halts execution (`status: BLOCKED`), preventing dangerous under-engineering.
- **Negative / Zero Inputs**: Strict physical validation rejects torque $\le 0$ or safety factor $< 1.0$.
- **Geometric Inconsistency**: If OpenCascade solid volume deviates from calculus by $> 10^{-6}$, export is aborted.

---

## 6. Candidate E: RAG Lab Architecture

### 6.1 System Purpose & Architectural Scope
An interactive retrieval evaluation sandbox live in the portfolio at `/rag-lab`. It provides an isolated environment for benchmarking Okapi BM25 lexical search, character n-gram / subword vector space similarity, and Reciprocal Rank Fusion against a 12-case golden evaluation dataset.

### 6.2 Entry Points & Component Hierarchy
- **Route & UI**: `app/rag-lab/page.tsx`, `components/rag-lab/RagLabDashboard.tsx`.
- **Coordinator Service**: `lib/rag-lab/ragLabService.ts` (`RagLabService`).
- **Retrieval Engines**:
  - `lib/rag-lab/bm25.ts` (Okapi BM25 with $k_1=1.5, b=0.75$).
  - `lib/rag-lab/vectorSearch.ts` (Subword n-gram vector cosine similarity).
  - `lib/rag-lab/hybridRrf.ts` (Reciprocal Rank Fusion with $k=60$).
- **Context Builder**: `lib/rag-lab/contextBuilder.ts` (token budget thresholding).
- **Citation Validator**: `lib/rag-lab/citationValidator.ts` (n-gram overlap verification).
- **Grounded Synthesizer**: `lib/rag-lab/groundedSynthesizer.ts` (rule-based synthesis).
- **Metrics Calculator**: `lib/rag-lab/metrics.ts` (Precision@K, Recall@K, MRR, nDCG@K).
- **Evaluation Dataset**: `data/rag/golden_eval_dataset_v1.ts` (12 formal test cases).

### 6.3 End-to-End Execution Flow (Retrieval & Benchmark Evaluation)
```
[User Query or Golden Benchmark Case]
       │
       ▼
[Tokenizer & Stopword Filter (`tokenizer.ts`)]
       │
       ▼
[Retrieval Pipeline Selection]
   ├── Mode A: Okapi BM25 Lexical Ranking
   ├── Mode B: Subword / Character N-Gram Cosine Vector Similarity
   └── Mode C: Hybrid Reciprocal Rank Fusion (k=60)
       │
       ▼
[Context Window Budget Allocation (`contextBuilder.ts`)]
       │ ── Truncates candidates when cumulative tokens exceed budget
       ▼
[Grounded Answer Generation (`groundedSynthesizer.ts`)]
       │ ── Checks for ungrounded entity claims (e.g. Google employment -> ABSTAIN)
       ▼
[Citation Overlap Validator (`citationValidator.ts`)]
       │ ── Calculates n-gram overlap between answer and cited chunk
       │ ── Assigns status: verified_supported, unverified, or refuted
       ▼
[Formal Metrics Calculator (`metrics.ts`)]
       └── Calculates Precision@K, Recall@K, MRR, and nDCG@K against golden ground truth
```

### 6.4 Deterministic vs Probabilistic Boundary
- **Strictly Deterministic**:
  - Entire RAG Lab pipeline: BM25 score calculation, vector dot products, RRF formula, budget truncation, citation overlap calculation, metric evaluation, and abstention matching.
- **Probabilistic / Model-Dependent**:
  - Zero external LLM calls (intentionally runs in-browser deterministically to ensure zero API costs and instant reproducibility).

### 6.5 Failure & Containment Boundaries
- **Corpus Fingerprint**: Validated against static SHA-256 corpus hash (`data/rag/corpus_v1.ts`).
- **Isolation from Ask Aadil**: RAG Lab maintains completely independent code, models, and types from `lib/rag/`.

---

## 7. Comparative Architectural Matrix

| Dimension | Candidate A: Ask Aadil | Candidate B: AI Reliability | Candidate C: Solace AI | Candidate D: EDA | Candidate E: RAG Lab |
|:---|:---|:---|:---|:---|:---|
| **Primary Domain** | Conversational RAG & Actions | Autonomous Browser QA | Mental Wellness Mobile | Mechanical CAD & Physics | Retrieval Benchmarking |
| **Architectural Depth** | Very High (7 layers) | Very High (6 layers) | Very High (6 layers) | High (5 layers) | Moderate (4 layers) |
| **Live Implementation** | Live in this repo | Documented in `ai-engineering-lab` | Documented in `solace-ai` | Documented in `design-automation` | Live in this repo (`/rag-lab`) |
| **Deterministic Gates** | Intent router, action authorization, abstention | Grounding validator, Fisher uncertainty, ChangeAuthorization | Pre-LLM crisis screening (<2ms), buffer purge | Material catalog block, closed-form physics | Full pipeline deterministic |
| **AI / Model Layer** | Grounded LLM synthesis | Local Ollama Qwen 2.5 | Gemini API via LangGraph SSE | LLM parameter extractor | Deterministic mock synthesizer |
| **Persistence Boundary** | Ephemeral session state | Disk artifacts + SHA-256 chain | Supabase PostgreSQL (RLS) | STEP solid + SVG blueprint | In-memory static corpus |
| **Verified Test Base** | 29 automated tests | 205 automated tests | 102 verified checks | 424 automated pytests | 19 unit checks + 12 benchmarks |

---

## 8. Investigation Conclusions

All five candidate systems possess authentic, evidence-backed architectures with verified boundaries. The findings confirm that the candidate systems do not rely on naive single-prompt architectures, but rather embed AI models within rigorous deterministic guardrails, mathematical uncertainty quantification, and strict verification harnesses.

