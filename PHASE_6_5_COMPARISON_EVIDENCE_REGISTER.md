# Phase 6.5 — Interactive Project Comparison
## Comparison Evidence Provenance Register

**Role:** Senior QA Architect, AI Systems Engineer, Technical Documentation Lead  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `engineering-security-reliability` (Level 1 Implementation Standard)  
**Date:** November 2026  
**Status:** Canonical Provenance Catalog (Stage 1)  

---

## 1. Evidence Cross-Referencing Standard

To ensure that no comparison statement is unverified or speculative, every entry in the Comparison Framework is cross-referenced against three established canonical registries:
1. **Phase 6.4 Master Evidence IDs (`EVID-*`)**: Verified in `data/verification/evidenceRegistry.ts`.
2. **Phase 6.3 Architecture Component IDs (`comp-*`)**: Verified in `data/architecture/systemsArchitecture.ts`.
3. **Phase 6.1 Architectural Decision IDs (`dec-*`)**: Verified in `data/decisions/projectDecisions.ts`.

---

## 2. Project-by-Project Evidence Cross-Reference Table

| Project Slug | Comparison Dimension & Claim | Phase 6.4 Evidence ID | Phase 6.3 Component ID | Phase 6.1 Decision ID | Source File Provenance | Status | Authoritative Engineering Boundary |
|:---|:---|:---:|:---:|:---:|:---|:---:|:---|
| **ask-aadil** | Hybrid BM25 + subword vector search with RRF ($k=60$) | `EVID-AA-01` | `comp-aa-retriever` | `dec-aa-01` | `lib/rag/hybridRetriever.ts:45-130`, `scripts/test_retrieval_foundation.ts` | `VERIFIED` | In-memory execution; zero external database or cloud API dependency in CI. |
| **ask-aadil** | Deterministic abstention on unrecorded entities and false premises | `EVID-AA-02` | `comp-aa-grounding-gate` | `dec-aa-02` | `lib/rag/synthesizer/answerSynthesizer.ts:85-120`, `scripts/test_grounded_conversational_evaluation.ts` | `VERIFIED` | Abstains deterministically when factual chunks are missing from canonical memory. |
| **ask-aadil** | Wayground team ownership vs individual contribution boundary | `EVID-AA-03` | `comp-aa-resolver` | `dec-aa-03` | `lib/rag/projectResolver.ts:120-165` | `VERIFIED` | VoyageMath V1 classified as `TEAM_OWNERSHIP`; Item Bank classified as `AADIL_CONTRIBUTION`. |
| **ai-reliability** | Playwright headless browser test suite across 205+ tests | `EVID-REL-01` | `comp-rel-eval-engine` | `dec-rel-01` | `tests/backend/test_orchestrator.py:30-180`, `tests/e2e/governance.spec.ts` | `VERIFIED` | 158 backend pytests + 47 governance and Playwright E2E tests passing. |
| **ai-reliability** | 1,000 multi-turn synthetic user journey stress evaluations | `EVID-REL-02` | `comp-rel-synthetic-gen` | `dec-rel-02` | `evaluation/synthetic_journeys.py:45-180` | `VERIFIED` | Synthetic user branching stress test with fixed pseudo-random seed (42). |
| **ai-reliability** | Fisher Information covariance matrix uncertainty circuit breaker | `EVID-REL-03` | `comp-rel-uncertainty-gate` | `dec-rel-03` | `src/governance/uncertainty.py:112-165` | `VERIFIED` | Covariance determinant threshold triggers fallback to `Decision: ABSTAIN`. |
| **solace-ai** | Full-stack regression suite across mobile and backend WebSocket | `EVID-SOL-01` | `comp-sol-orchestrator` | `dec-sol-01` | `backend/tests/test_pipeline.py:25-140`, `mobile/__tests__/` | `VERIFIED` | 102 verified checks across mobile and backend modules. |
| **solace-ai** | Microsecond compiled regex crisis circuit breaker (< 2ms) | `EVID-SOL-02` | `comp-sol-crisis-detector` | `dec-sol-02` | `backend/services/crisis_detector.py:34-78` | `QUALIFIED` | 100% detection rate strictly applies to the 24 explicit critical regex patterns in `is_crisis_input`. |
| **solace-ai** | Single-POST idempotent transport containing 502/503/504 timeouts | `EVID-SOL-03` | `comp-sol-transport` | `dec-sol-03` | `mobile/src/network/transport.ts:65-110` | `VERIFIED` | Idempotent transaction keys prevent duplicate voice dispatches on network drops. |
| **solace-ai** | Ephemeral in-memory audio zero-retention (`del audio_bytes`) | `EVID-SOL-04` | `comp-sol-audio-ingest` | `dec-sol-04` | `backend/api/audio.py:82-105` | `VERIFIED` | In-memory audio deallocated post-STT in `finally:` block; zero bytes persisted to disk. |
| **design-automation** | Containerized CAD mass property integration suite (424 pytests) | `EVID-EDA-01` | `comp-eda-geometry` | `dec-eda-01` | `tests/test_cad_engine.py:45-210`, `tests/docker-compose.test.yml` | `VERIFIED` | 424 automated pytests passing across 28 test suites in Docker container. |
| **design-automation** | Saint-Venant analytical physics vs OpenCascade BRep CAD integrals | `EVID-EDA-02` | `comp-eda-physics` | `dec-eda-02` | `src/cad/analysis/mass_properties.py:88-124` | `QUALIFIED` | Software numerical calculus agreement ($< 10^{-6}$ error); does NOT assert physical CNC machining tolerance ($\pm 0.05\text{ mm}$). |
| **ocr-evaluator** | Automated OCR test battery across 154 tests (134 backend + 20 UI) | `EVID-OCR-01` | `comp-ocr-evaluator` | `dec-ocr-01` | `tests/test_evaluation_pipeline.py:40-195`, `tests/ui/` | `VERIFIED` | Validates document extractors, normalizers, and CER/WER scoring algorithms. |
| **ocr-evaluator** | 5-axis controlled synthetic image perturbation matrix | `EVID-OCR-02` | `comp-ocr-perturbation` | `dec-ocr-02` | `src/perturbation/axes.py:50-210` | `VERIFIED` | Gaussian blur, skew, noise, contrast, and JPEG degradation matrices. |
| **ocr-evaluator** | Critical-field priority decision gate (PASS / REVIEW / FAIL) | `EVID-OCR-03` | `comp-ocr-risk-gate` | `dec-ocr-03` | `src/evaluation/risk_gate.py:40-95` | `VERIFIED` | Deterministic routing preventing low-confidence invoice totals from entering ERPs. |
| **curriculum-etl** | Dynamic Pydantic schema derivation from sample CSV headers | `EVID-ETL-01` | `comp-etl-schema-compiler` | `dec-etl-01` | `tests/test_schema_compiler.py:20-110` | `VERIFIED` | 36 automated pytests verifying runtime dynamic Pydantic model synthesis. |
| **curriculum-etl** | 3-tier curriculum integrity pipeline (Reviewer $\to$ Critic $\to$ Audit) | `EVID-ETL-02` | `comp-etl-integrity-pipeline` | `dec-etl-02` | `src/pipeline/integrity.py:30-115` | `VERIFIED` | Multi-agent sequential verification loop ensuring taxonomy alignment. |
| **curriculum-etl** | CSV formula injection sanitization escaping `=`, `+`, `-`, `@` | `EVID-ETL-03` | `comp-etl-sanitizer` | `dec-etl-03` | `src/sanitization/csv_shield.py:15-45` | `VERIFIED` | Neutralizes DDE attacks in Microsoft Excel by escaping leading characters. |
| **atlas-ai** | SEC EDGAR RAG ingestion and LangGraph state loops (178 pytests) | `EVID-ATL-01` | `comp-atl-langgraph` | `dec-atl-01` | `tests/test_sec_ingest.py:35-180` | `QUALIFIED` | Fixture-validated in CI test suite; does not test unconstrained live SEC EDGAR scraping. |
| **atlas-ai** | Core MVP single-agent retrieval and financial summary loops | `EVID-ATL-02` | `comp-atl-mvp-graph` | `dec-atl-02` | `tests/mvp/test_core_graph.py:20-95` | `VERIFIED` | 59 automated tests covering core financial document graph execution. |
| **atlas-ai** | Cryptographic SHA-256 section hash alert deduplication | `EVID-ATL-03` | `comp-atl-dedup` | `dec-atl-03` | `src/alerts/dedup.py:22-60` | `VERIFIED` | Eliminates repeated alert dispatches across periodic regulatory updates. |
| **loom-ai** | Clean Architecture downward dependency enforcement (0 upward imports) | `EVID-LOM-01` | `comp-lom-clean-arch` | `dec-lom-01` | `src/architecture/dependency_checker.py:15-70` | `VERIFIED` | Static AST inspection proving domain entities have zero external framework imports. |
| **loom-ai** | Procurement HITL cryptographic HMAC authorization gate ($>\$10,000$) | `EVID-LOM-02` | `comp-lom-hitl-gate` | `dec-lom-02` | `src/procurement/hitl_queue.py:45-110` | `VERIFIED` | High-value procurement orders require authorized cryptographic signature. |
| **vm-copy** | Pure TypeScript Tier-1 Deterministic Evaluator (< 1ms, $0 cost) | `EVID-VMC-01` | `comp-vmc-eval-layer` | `dec-vmc-01` | `lib/eval-layer.ts:44-76` | `VERIFIED` | Pre-flight structural validation of 4 options, 1 CA, and duplicate distractors. |
| **vm-copy** | Parallel micro-batching bounding latency to 4–6s | `EVID-VMC-02` | `comp-vmc-micro-batch` | `dec-vmc-02` | `app/api/generate/route.ts:55-120` | `VERIFIED` | 3x latency reduction over sequential 18s generation loops. |
| **ai-worksheets** | Headless TikZ pdflatex compiler sandbox with 15s watchdog timeout | `EVID-WKS-01` | `comp-wks-latex-sandbox` | `dec-wks-01` | `scripts/latex_renderer.py:35-90` | `VERIFIED` | Subprocess compilation sandbox preventing hangs from runaway LaTeX macros. |
| **ai-worksheets** | Content-addressed MD5 source hash caching (< 10ms cache hit) | `EVID-WKS-02` | `comp-wks-cache` | `dec-wks-02` | `src/cache/asset_cache.py:20-55` | `VERIFIED` | MD5 hashing of raw TikZ source code eliminating redundant pdflatex calls. |
| **math-item-bank** | Mathematical domain router (SVG vs TikZ) based on token complexity | `EVID-MIB-01` | `comp-mib-domain-router` | `dec-mib-01` | `src/router/domain_router.py:40-105` | `QUALIFIED` | Individual contribution: domain router and compiler syntax gates. System owned by Wayground. |

---

## 3. Register Verification Certification

- **Total Claims Mapped**: 28 Granular Architectural Claims
- **Phase 6.4 Evidence Mappings**: 28 / 28 verified
- **Phase 6.3 Architecture Component Mappings**: 28 / 28 verified
- **Phase 6.1 Decision Record Mappings**: 28 / 28 verified
- **Unverified or Fabricated Assertions**: 0

