# Phase 6.5 — Interactive Project Comparison
## Comparison Evidence & Content Provenance Report

**Role:** Senior QA Architect, AI Evaluation Engineer, Technical Documentation Lead  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` (Level 1 Implementation Standard)  
**Date:** November 2026  
**Status:** Certified & Grounded  

---

## 1. Evidence Grounding Standard

In accordance with Level 1 of `engineering-security-reliability`, every architectural distinction, trade-off, and failure containment mechanism presented in `/compare` is cross-referenced against three established canonical registries:
1. **Phase 6.4 Master Evidence IDs (`EVID-*`)**: Grounded in `data/verification/evidenceRegistry.ts`.
2. **Phase 6.3 Architecture Component IDs (`comp-*`)**: Grounded in `data/architecture/systemsArchitecture.ts`.
3. **Phase 6.1 Architectural Decision IDs (`ADR-*`)**: Grounded in `data/decisions/projectDecisions.ts`.

---

## 2. Granular Evidence Mapping Table

The following register documents the authoritative evidence cross-references supporting the comparison data model:

| Project Slug | Dimension | Authoritative Claim & Mechanism | Evidence ID | Architecture Node ID | Decision Record ID | Source File Provenance | Status |
|:---|:---|:---|:---:|:---:|:---:|:---|:---:|
| `ask-aadil` | `data-retrieval` | In-memory hybrid BM25 + subword character n-gram vectors with RRF ($k=60$) | `EVID-AA-01` | `aa-hybrid-retriever` | `ADR-AA-01` | `lib/rag/hybridRetriever.ts:45-130` | `VERIFIED` |
| `ask-aadil` | `failure-containment` | Deterministic negative abstention on unrecorded facts or false premises | `EVID-AA-02` | `aa-synthesizer` | `ADR-AA-02` | `lib/rag/synthesizer/answerSynthesizer.ts:85-120` | `VERIFIED` |
| `ask-aadil` | `individual-contribution` | Explicit distinction between Wayground team ownership and Aadil contribution | `EVID-AA-03` | `aa-entity-resolver` | `ADR-AA-03` | `lib/rag/projectResolver.ts:120-165` | `VERIFIED` |
| `ai-reliability` | `evaluation-verification` | Automated Playwright browser harness verifying 205+ pytests and governance flows | `EVID-REL-01` | `rel-playwright` | `ADR-REL-01` | `tests/backend/test_orchestrator.py:30-180` | `VERIFIED` |
| `ai-reliability` | `orchestration-state` | 1,000 multi-turn synthetic user journey stress evaluations with fixed seed (42) | `EVID-REL-02` | `rel-telemetry-collector` | `ADR-REL-02` | `evaluation/synthetic_journeys.py:45-180` | `VERIFIED` |
| `ai-reliability` | `failure-containment` | Fisher Information covariance matrix uncertainty determinant circuit breaker | `EVID-REL-03` | `rel-fisher-gate` | `ADR-REL-03` | `src/governance/uncertainty.py:112-165` | `VERIFIED` |
| `solace-ai` | `evaluation-verification` | Full-stack regression suite across mobile and backend WebSocket (102 tests) | `EVID-SOL-01` | `sol-fastapi-gateway` | `ADR-SOL-01` | `backend/tests/test_pipeline.py:25-140` | `VERIFIED` |
| `solace-ai` | `failure-containment` | Microsecond compiled regex crisis circuit breaker (< 2ms) on 24 critical triggers | `EVID-SOL-02` | `sol-crisis-gate` | `ADR-SOL-02` | `backend/services/crisis_detector.py:34-78` | `QUALIFIED` |
| `solace-ai` | `orchestration-state` | Single-POST idempotent transport containing 502/503/504 timeouts | `EVID-SOL-03` | `sol-transport` | `ADR-SOL-01` | `mobile/src/network/transport.ts:65-110` | `VERIFIED` |
| `solace-ai` | `data-retrieval` | Ephemeral in-memory audio zero-retention (`del audio_bytes` in `finally:`) | `EVID-SOL-04` | `sol-voice-privacy` | `ADR-SOL-03` | `backend/api/audio.py:82-105` | `VERIFIED` |
| `design-automation` | `evaluation-verification` | Containerized CAD mass property integration suite (424 pytests in Docker) | `EVID-EDA-01` | `eda-solvers` | `ADR-EDA-01` | `tests/test_cad_engine.py:45-210` | `VERIFIED` |
| `design-automation` | `core-trade-offs` | Saint-Venant analytical torsional physics vs OpenCascade BRep mass integrals | `EVID-EDA-02` | `eda-cad-kernel` | `ADR-EDA-02` | `src/cad/analysis/mass_properties.py:88-124` | `QUALIFIED` |
| `ocr-evaluator` | `evaluation-verification` | Automated OCR test battery across 154 tests (134 backend + 20 UI) | `EVID-OCR-01` | `ocr-metrics` | `ADR-OCR-01` | `tests/test_evaluation_pipeline.py:40-195` | `VERIFIED` |
| `ocr-evaluator` | `orchestration-state` | 5-axis controlled synthetic image perturbation matrix (blur, skew, noise, contrast, JPEG) | `EVID-OCR-02` | `ocr-degradation` | `ADR-OCR-01` | `src/perturbation/axes.py:50-210` | `VERIFIED` |
| `ocr-evaluator` | `failure-containment` | Critical-field priority decision gate (PASS / REVIEW / FAIL) routing monetary fields | `EVID-OCR-03` | `ocr-risk-gate` | `ADR-OCR-02` | `src/evaluation/risk_gate.py:40-95` | `VERIFIED` |
| `curriculum-etl` | `orchestration-state` | Dynamic Pydantic schema derivation from sample CSV headers via `create_model` | `EVID-ETL-01` | `etl-contract` | `ADR-ETL-01` | `tests/test_schema_compiler.py:20-110` | `VERIFIED` |
| `curriculum-etl` | `evaluation-verification` | 3-tier curriculum integrity pipeline (Reviewer $\to$ Critic $\to$ Audit) | `EVID-ETL-02` | `etl-review-fix` | `ADR-ETL-02` | `src/pipeline/integrity.py:30-115` | `VERIFIED` |
| `curriculum-etl` | `failure-containment` | CSV formula injection sanitization escaping leading `=`, `+`, `-`, `@` | `EVID-ETL-03` | `etl-csv-gate` | `ADR-ETL-02` | `src/sanitization/csv_shield.py:15-45` | `VERIFIED` |
| `atlas-ai` | `orchestration-state` | SEC EDGAR RAG ingestion and LangGraph state loops (178 pytests in suite) | `EVID-ATL-01` | `atl-langgraph` | `ADR-ATL-01` | `tests/test_sec_ingest.py:35-180` | `QUALIFIED` |
| `atlas-ai` | `evaluation-verification` | Core MVP single-agent retrieval and financial summary loops (59 tests) | `EVID-ATL-02` | `atl-sec-rag` | `ADR-ATL-01` | `tests/mvp/test_core_graph.py:20-95` | `VERIFIED` |
| `atlas-ai` | `failure-containment` | Cryptographic SHA-256 section hash alert deduplication preventing duplicate alerts | `EVID-ATL-03` | `atl-alert-worker` | `ADR-ATL-02` | `src/alerts/dedup.py:22-60` | `VERIFIED` |
| `loom-ai` | `architectural-pattern` | Clean Architecture downward dependency enforcement (0 upward imports) | `EVID-LOM-01` | `lom-clean-backend` | `ADR-LOOM-01` | `src/architecture/dependency_checker.py:15-70` | `VERIFIED` |
| `loom-ai` | `hitl-governance` | Procurement HITL cryptographic HMAC authorization gate ($> \$10,000$) | `EVID-LOM-02` | `lom-hitl-queue` | `ADR-LOOM-02` | `src/procurement/hitl_queue.py:45-110` | `VERIFIED` |
| `vm-copy` | `ai-vs-deterministic` | Pure TypeScript Tier-1 Deterministic Evaluator (< 1ms, $0 cost) with Set math | `EVID-VMC-01` | `vmc-tier1-evaluator` | `ADR-VM-01` | `lib/eval-layer.ts:44-76` | `VERIFIED` |
| `vm-copy` | `orchestration-state` | Parallel micro-batching bounding latency to 4–6s (3x reduction over sequential 18s) | `EVID-VMC-02` | `vmc-batch-dispatcher` | `ADR-VM-02` | `app/api/generate/route.ts:55-120` | `VERIFIED` |
| `ai-worksheets` | `failure-containment` | Headless TikZ pdflatex compiler sandbox with 15s watchdog timeout kill switch | `EVID-WKS-01` | `ws-tikz-compiler` | `ADR-WS-01` | `scripts/latex_renderer.py:35-90` | `VERIFIED` |
| `ai-worksheets` | `data-retrieval` | Content-addressed MD5 source hash caching (< 10ms response on cache hits) | `EVID-WKS-02` | `ws-tikz-compiler` | `ADR-WS-02` | `src/cache/asset_cache.py:20-55` | `VERIFIED` |
| `math-item-bank` | `ai-vs-deterministic` | Mathematical domain router (SVG vs TikZ) based on token complexity | `EVID-MIB-01` | `mib-domain-router` | `ADR-MIB-01` | `src/router/domain_router.py:40-105` | `QUALIFIED` |

---

## 3. Explicit Claim Qualification Notes

Under Level 1 anti-inflation rules, the following sensitive engineering claims carry mandatory qualification disclosures directly within the UI:

1. **Engineering Design Automation (EDA)**:
   - *Qualification*: The reported $< 10^{-6}$ volume discrepancy ($0.0000\%$ error) is a software numerical calculus convergence agreement between closed-form Saint-Venant beam theory and OpenCascade BRep topological mass integrals. It does **not** assert physical CNC machining or tooling tolerance ($\pm 0.05\text{ mm}$).
2. **Solace AI**:
   - *Qualification*: The 100% crisis detection rate strictly applies to the 24 explicit critical regex triggers configured in `backend/services/crisis_detector.py` (`is_crisis_input`). It is a bounded algorithmic circuit breaker, not a universal guarantee of clinical diagnostic safety.
3. **Atlas AI**:
   - *Qualification*: 178 pytests validate SEC EDGAR parsing against frozen local XML/HTML filing fixtures in CI. It does not test unconstrained live SEC EDGAR website scraping or dynamic rate limits.
4. **US Math Item Bank & Curriculum ETL**:
   - *Qualification*: Both platforms were developed at Wayground by the Wayground Engineering Team. Individual engineering contributions are rigorously bounded to Aadil's personal implementation scope (e.g. dynamic Pydantic schema compilation, CSV formula injection shield, mathematical domain router, and pure TypeScript Tier-1 evaluator).

---

## 4. Anti-Inflation Audit & Validation

Automated test suite `scripts/test_project_comparison.ts` asserts:
- Zero occurrences of subjective score formulas (e.g. `X/10`, `complexity score`, `rank #1`).
- Zero unverified performance superlatives.
- 100% of referenced Evidence IDs, Architecture Component IDs, and Decision Record IDs resolve to canonical files.

