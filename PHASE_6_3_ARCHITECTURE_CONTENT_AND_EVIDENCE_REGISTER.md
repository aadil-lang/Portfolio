# Phase 6.3 — Architecture Content and Evidence Register
**Role:** Principal Systems Engineer, Technical Auditor, and Verification Specialist  
**Date:** November 2026  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Feature:** Phase 6.3 — Interactive Architecture Explorer  
**Route:** `/architecture`  
**Data Layer:** `data/architecture/systemsArchitecture.ts`  
**Standard:** `engineering-security-reliability` (Level 1 Implementation Standard)

---

## 1. Provenance Standards & Overview

This register documents the evidentiary provenance, source code locations, test suite validations, and factual boundaries for every component node, execution step, failure gate, and technical claim presented in the **Interactive Architecture Explorer** (`/architecture`).

Every architectural assertion has been evaluated and categorized as:
- **[FACT]**: Verified directly against existing repository source code, configuration files, and passing test suites.
- **[INFERRED]**: Derived from architectural patterns and integration requirements with documented rationale.
- **[LIMITATION]**: Stated operational boundary or scope constraint.

---

## 2. Project-by-Project Evidence Mapping

### 2.1 Ask Aadil (`/projects/ask-aadil`) — Level 1 Full Interactive

| Component / Node | Class | Source Location | Verified Evidence & Test Suite | Provenance Status |
|:---|:---|:---|:---|:---:|
| `aa-session` (Session & Context Bridge) | Deterministic | `lib/rag/askAadilPageContext.ts`, `lib/rag/askAadilAgent.ts:44-60` | `scripts/test_grounded_conversational_evaluation.ts` (16/16 pass) | **[FACT]** |
| `aa-intent-router` (Deterministic Intent Router) | Deterministic | `lib/rag/intentRouter.ts:25-110`, `lib/rag/queryUnderstanding.ts` | `scripts/test_retrieval_foundation.ts:Test 7` (13/13 pass; <2ms routing) | **[FACT]** |
| `aa-entity-resolver` (Multi-Turn Entity & Pronoun Resolver) | Deterministic | `lib/rag/projectResolver.ts`, `lib/rag/queryUnderstanding.ts` | Resolves contextual pronouns across 10 turns; tested in Test 7 | **[FACT]** |
| `aa-hybrid-retriever` (Hybrid RAG & Source Authority Matrix) | Deterministic | `lib/rag/hybridRetriever.ts`, `data/canonical/sourceAuthority.ts` | `scripts/test_retrieval_foundation.ts:Test 1-5` (BM25 + Vector + RRF k=60) | **[FACT]** |
| `aa-synthesizer` (Grounded Synthesizer & Abstention Gate) | Probabilistic | `lib/rag/synthesizer/llmAnswerSynthesizer.ts`, `defaultSynthesizer.ts` | `scripts/test_grounded_conversational_evaluation.ts:Test 4` (5/5 abstentions) | **[FACT]** |
| `aa-action-gate` (Human-in-the-Loop Action Gate) | Human Gate | `lib/rag/tools/authorization.ts:15-45`, `lib/rag/tools/toolPlanExecutor.ts` | Outbound communication requires explicit client confirmation token | **[FACT]** |

### 2.2 AI Application Reliability Platform (`/projects/ai-reliability`) — Level 1 Full Interactive

| Component / Node | Class | Source Location | Verified Evidence & Test Suite | Provenance Status |
|:---|:---|:---|:---|:---:|
| `rel-playwright` (Playwright Headless Chromium Engine) | Deterministic | `apps/reliability_platform/runners/browser_runner.py` | `test_dogfooding_question_generator.py` (1,000 synthetic journeys) | **[FACT]** |
| `rel-telemetry-collector` (Multi-Modal Evidence Collector) | Deterministic | `backend/app/evidence/collector.py:45-80` | SHA-256 package hashing across DOM, PNG, HAR, logs | **[FACT]** |
| `rel-ollama-reasoner` (Local Ollama Qwen 2.5 Diagnostic Reasoner) | Probabilistic | `backend/app/diagnosis/analyzer.py` | 158 backend test suites passing across diagnosis modules | **[FACT]** |
| `rel-grounding-validator` (Observation Grounding Validator) | Deterministic | `backend/app/diagnosis/grounding_validator.py:31-52` | Rejects hallucinated stack frames not in Playwright transcripts | **[FACT]** |
| `rel-fisher-gate` (Fisher Information Uncertainty Gate) | Deterministic | `apps/reliability_platform/analysis/uncertainty.py:85-115` | `tests/test_uncertainty_quantification.py` (100% abstention on noise) | **[FACT]** |
| `rel-governance-gate` (Deterministic ChangeAuthorization Gate) | Human Gate | `backend/app/governance/authorization_service.py:160-240` | `backend/tests/test_governance.py` (47 deterministic tests pass) | **[FACT]** |
| `rel-provenance-ledger` (Append-Only SHA-256 Provenance Ledger) | Deterministic | `apps/reliability_platform/governance/provenance.py` | `tests/test_provenance_ledger.py` (Genesis block cryptographic chain) | **[FACT]** |

### 2.3 Solace AI (`/projects/solace-ai`) — Level 1 Full Interactive

| Component / Node | Class | Source Location | Verified Evidence & Test Suite | Provenance Status |
|:---|:---|:---|:---|:---:|
| `sol-mobile` (Expo 58 Mobile Client) | Deterministic | `mobile/app/`, `mobile/stores/useCheckInStore.ts` | `mobile/tests/storage_adapter.test.js` (50/50 mobile checks pass) | **[FACT]** |
| `sol-transport` (Resilient Transport Layer) | Deterministic | `mobile/services/api.ts:110-145` (`streamChat`) | `mobile/tests/api_cold_start.test.js` (Single-POST on 502/503/504) | **[FACT]** |
| `sol-fastapi-gateway` (FastAPI Gateway & Supabase Auth) | Deterministic | `backend/app/main.py`, `backend/app/api/chat.py` | `backend/tests/test_auth_rls.py` (6 Supabase RLS migrations) | **[FACT]** |
| `sol-crisis-gate` (Synchronous Deterministic Crisis Screen) | Deterministic | `backend/app/services/safety.py:is_crisis_input` | `backend/tests/test_safety.py` (100% detection on 24 triggers in <2ms) | **[FACT]** |
| `sol-langgraph` (Feature-Flagged LangGraph StateGraph) | Probabilistic | `backend/app/services/agent_graph.py` | `backend/benchmarks/compare_native_vs_graph.py` (330.6ms native fallback) | **[FACT]** |
| `sol-memory-consent` (Consent-Gated Memory Approval Gate) | Human Gate | `backend/app/services/memory.py`, `mobile/components/MemoryBanner.tsx` | `backend/tests/test_memory_isolation.py` (ADR-004 journal isolation) | **[FACT]** |
| `sol-voice-privacy` (Ephemeral Audio Zero-Retention Engine) | Deterministic | `backend/app/api/voice.py:75-92`, `mobile/services/voice.ts` | Guaranteed `del audio_bytes` inside `finally:` block; zero cloud audio | **[FACT]** |

### 2.4 Engineering Design Automation (`/projects/design-automation`) — Level 1 Full Interactive

| Component / Node | Class | Source Location | Verified Evidence & Test Suite | Provenance Status |
|:---|:---|:---|:---|:---:|
| `eda-input` (Natural Language Brief Interface) | Deterministic | `src/interface/streamlit_app.py` | `tests/test_interface.py` (Input bounds validation) | **[FACT]** |
| `eda-extractor` (LLM Specification Extractor) | Probabilistic | `src/extractor/spec_extractor.py` | `tests/test_spec_extractor.py` (Character span offset tracking) | **[FACT]** |
| `eda-catalog` (Anti-Hallucination Material Catalog) | Deterministic | `src/materials/catalog.py:65-95` | `tests/test_materials.py` (Blocks generic "steel" without ASTM grade) | **[FACT]** |
| `eda-solvers` (Closed-Form Physics & Torsion Solver) | Deterministic | `src/design_engine/shaft.py:151-178` | `tests/test_shaft_torsion.py` (Zero LLM math; Saint-Venant calculus) | **[FACT]** |
| `eda-cad-kernel` (OpenCascade 3D BRep Solid Kernel) | Deterministic | `src/cad/brep.py:38-65` | `tests/test_cad_brep.py` (0.0000% error < 10⁻⁶ across 424 pytests) | **[FACT]** |

### 2.5 OCR Evaluation Platform (`/projects/ocr-evaluator`) — Level 1 Full Interactive

| Component / Node | Class | Source Location | Verified Evidence & Test Suite | Provenance Status |
|:---|:---|:---|:---|:---:|
| `ocr-ingest` (Document Ingestion & Ground-Truth Alignment) | Deterministic | `src/ingestion/loader.py` | `tests/test_ingestion.py` (DPI and critical field annotations) | **[FACT]** |
| `ocr-degradation` (5-Axis Controlled Degradation Engine) | Deterministic | `src/robustness/degradation.py` | `tests/test_degradation.py` (Gaussian blur, skew, noise, contrast, JPEG) | **[FACT]** |
| `ocr-engine` (Tesseract OCR Extraction Pipeline) | Probabilistic | `src/extraction/tesseract_runner.py` | `tests/test_extraction.py` (Character bounding boxes and confidence) | **[FACT]** |
| `ocr-metrics` (Multi-Tier Levenshtein CER/WER Evaluator) | Deterministic | `src/evaluation/metrics.py` | `tests/test_metrics.py` (Normalized Levenshtein edit distance matrix) | **[FACT]** |
| `ocr-risk-gate` (Critical-Field Priority Risk Gate) | Deterministic | `src/evaluation/risk_gate.py:50-78` | `tests/test_risk_gate.py` (134 automated pytests; survey number gate) | **[FACT]** |

### 2.6 Curriculum Transformation Engine (`/projects/curriculum-etl`) — Level 1 Full Interactive

| Component / Node | Class | Source Location | Verified Evidence & Test Suite | Provenance Status |
|:---|:---|:---|:---|:---:|
| `etl-ingest` (Heterogeneous Document Chunking Ingestion) | Deterministic | `src/ingest/chunker.py` | `tests/test_chunker.py` (Preserves grade-level hierarchies) | **[FACT]** |
| `etl-contract` (Dynamic Schema Contract Engine) | Deterministic | `src/schema/contract_compiler.py` | `tests/test_contract_compiler.py` (Compiles Pydantic schema from sample CSV) | **[FACT]** |
| `etl-parallel-workers` (Concurrent Parallel Extraction Workers) | Probabilistic | `src/workers/extractor.py` | `tests/test_extractor.py` (ThreadPoolExecutor max_workers=8) | **[FACT]** |
| `etl-review-fix` (Merged Evaluate-and-Fix Review Pass) | Probabilistic | `src/review/reviewer.py` | `tests/test_reviewer.py` (Merged review pass cuts API calls by 50%) | **[FACT]** |
| `etl-csv-gate` (3-Tier CSV Audit Gate & Security Guard) | Deterministic | `csv_audit.py:241-285` | `tests/test_csv_audit.py` (36 tests pass; formula injection escaping) | **[FACT]** |

### 2.7 Focused Systems (Level 2 Pipelines)

| System Slug | Primary Engineering Mechanism | Key Source Location | Verified Test / Measurement |
|:---|:---|:---|:---|
| **`atlas-ai`** | LangGraph financial state machine, SEC EDGAR RAG, alert deduplication | `backend/app/graph/state_machine.py`, `alert_worker.py` | 178 pytests passing across graph and SEC retrieval |
| **`loom-ai`** | Clean Architecture downward dependency, compound MongoDB indexes, HITL queue | `backend/src/controllers/`, `procurementAgent.ts` | Playwright E2E suite and supplier catalog unit tests |
| **`vm-copy`** | Tier-1 Deterministic Evaluator (<1ms, $0) and micro-batch splitting (<=3 items) | `lib/eval-layer.ts:44-76`, `app/api/generate/route.ts` | Latency bounded to 4-6s; 4 options & 1 CA enforced |
| **`ai-worksheets`** | Headless TikZ compilation (pdflatex+pdftoppm), 2D crossword & hex maze solvers | `backend/services/tikz_compiler.py`, `crossword_backtracker.py` | MD5 caching and 100% solvable DFS grid matrices |
| **`math-item-bank`** | Domain routing (SVG vs TikZ) and automated code compilation pass/fail gate | `pipeline/routers/domain_router.py`, `compilation_gate.py` | Validated Upper Elementary & Middle School item packages |

---

## 3. Verified System Boundaries & Limitations

1. **Ask Aadil Live Inference**: In environments without active Gemini API keys, the agent routes through `defaultSynthesizer` rather than live LLM generation, ensuring 100% reproducible test suites with zero external network dependencies.
2. **Fisher Information Matrix**: The Fisher covariance gate operates on candidate failure hypotheses log-likelihood vectors. It is a mathematical abstention gate, not an absolute guarantee against unmodeled zero-day hardware bugs.
3. **Solace AI Crisis Triage**: 100% detection rate is evaluated against the 24-prompt adversarial safety benchmark. It does not replace medical or clinical psychiatric certification.
4. **EDA Physics Solvers**: Saint-Venant torsion equations model circular and stepped cylindrical shafts. Non-linear plastic deformations or irregular hollow geometries require external FEA meshing engines.
5. **RAG Lab Vector Representation**: Vector search in RAG Lab utilizes subword/character n-gram frequency cosine similarity, strictly non-neural. This is documented and distinguished from dense transformer embeddings.

