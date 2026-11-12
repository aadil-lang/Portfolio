# PHASE 6.1 — DECISION RECORD EVIDENCE REGISTER
**Granular Source Mapping, Test Verification & Claim Provenance**

- **Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Audit Standard:** `engineering-security-reliability` (Sections 1.5, 7.1, 7.2)
- **Date:** November 2026
- **Status:** Complete & Verified

---

## 1. Master Evidence Register

This register maps every published decision record directly to its supporting source code files, automated test suites, commit hashes, or technical specifications.

| ADR ID | Decision Title | Status | Source File Reference | Test Suite / Benchmark Evidence | Qualification & Boundaries |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ADR-AA-01** | Deterministic Multi-Turn Intent Router Alongside LLM Synthesis | Historically Documented | `lib/rag/intentRouter.ts:25-110`, `lib/rag/queryUnderstanding.ts` | `scripts/test_retrieval_foundation.ts` (13/13 pass) | Evaluated on verified intent patterns; novel colloquial phrasing falls back to synthesis. |
| **ADR-AA-02** | Decoupled Multi-Source Authority Matrix over Single Unified Vector Store | Historically Documented | `data/canonical/sourceAuthority.ts:18-120`, `lib/rag/hybridRetriever.ts` | `scripts/test_grounded_conversational_evaluation.ts` (16/16 pass) | Verified on canonical profile queries; eliminates cross-source biographical hallucinations. |
| **ADR-AA-03** | Two-Phase Human-in-the-Loop Confirmation Gate for External Actions | Historically Documented | `lib/rag/tools/portfolioTools.ts:40-95`, `lib/rag/askAadilAgent.ts:180-240` | `scripts/test_controlled_actions.ts` | 100% blocks autonomous external dispatches; requires manual UI confirmation click. |
| **ADR-REL-01** | Real Headless Chromium Multi-Modal Ground Truth vs Synthetic Mocks | Historically Documented | `apps/reliability_platform/runners/browser_runner.py` | `test_dogfooding_question_generator.py` | Headless Chromium execution captures genuine DOM, PNG, HAR, and console error traces. |
| **ADR-REL-02** | Fisher Information Uncertainty Quantification & Abstention Gate | Historically Documented | `apps/reliability_platform/analysis/uncertainty.py` | `tests/test_uncertainty_quantification.py` (158 pass) | Threshold $\epsilon_{\text{abstain}}$ calibrated on synthetic noise benchmarks; forces human triage on ambiguous failure traces. |
| **ADR-REL-03** | Cryptographic SHA-256 Provenance Ledger for Forensic Auditing | Historically Documented | `apps/reliability_platform/ledger/provenance.py` | `tests/test_provenance_chain.py` (47 pass) | Provides tamper-evident proof back to genesis; detects retroactive log modifications. |
| **ADR-SOL-01** | Synchronous Deterministic Pre-LLM Crisis Screening (<2ms) | Historically Documented | `backend/app/services/safety.py:is_crisis_input` | `backend/tests/test_safety.py` (48 synthetic cases, <2ms) | Intercepts self-harm patterns synchronously; requires ongoing regex pattern maintenance for emergent slang. |
| **ADR-SOL-02** | Ephemeral In-Memory Audio Zero-Retention Policy | Historically Documented | `backend/app/api/voice.py`, `mobile/services/voice.ts` | `backend/tests/test_voice_lifecycle.py` (50 sessions) | Memory buffers zeroed in `finally:`; audio playback is permanently disabled by architectural design. |
| **ADR-SOL-03** | Single-POST Ambiguous Delivery Transport over Blind SSE Auto-Retries | Historically Documented | `mobile/services/api.ts` | `mobile/tests/api_resilience.test.ts` (50 mobile tests) | Prevents duplicate conversation turns; requires manual retry tap after severe cellular dropouts. |
| **ADR-EDA-01** | Complete Exclusion of LLMs from Mechanical Stress & Sizing Calculations | Historically Documented | `src/solvers/shaft_torsion.py` | `tests/test_shaft_torsion.py` (424 CAD tests) | Computes textbook closed-form equations; does not replace empirical fatigue testing or non-linear FEA. |
| **ADR-EDA-02** | Anti-Hallucination Material Knowledge Base with Fail-Fast Blocking | Historically Documented | `src/materials/catalog.py` | `tests/test_materials.py` (14 generic strings blocked) | Halts with `BLOCKED` status on ambiguous grades (e.g. "steel"); requires exact grade (`AISI 1045`). |
| **ADR-EDA-03** | Discrete Nominal Sizing Policy vs Continuous Dimensions | Historically Documented | `src/solvers/nominal_sizing.py` | `tests/test_nominal_sizing.py` (ISO metric tables) | Quantizes diameter to standard metric bar stock; incurs slight mass increase over theoretical minimum. |
| **ADR-OCR-01** | Critical-Field Priority Override vs Global Aggregate Accuracy | Historically Documented | `backend/app/evaluation/priority_scorer.py` | `data/evidence/ocrEvaluationData.ts` (154 tests) | Critical mismatches force overall FAIL status; lowers superficial benchmark scores to reflect legal risk. |
| **ADR-OCR-02** | 5-Axis Controlled Image Degradation Suite | Historically Documented | `backend/app/degradation/pipeline.py` | `ocrEvaluationData.ts:140-280` (5-axis sweep) | Sweeps blur, noise, skew, contrast, and JPEG compression; identifies exact breakdown thresholds. |
| **ADR-ATL-01** | LangGraph Stateful Cyclic Multi-Agent Graph over Linear Chains | Historically Documented | `backend/app/agents/graph.py`, `state.py` | `backend/tests/test_graph.py` (178 pytests in 3.19s) | Multi-node state sharing enables graceful partial synthesis when secondary financial APIs fail. |
| **ADR-ATL-02** | Telegram-First Interface with Multimodal Audio & Vision Ingestion | Historically Documented | `backend/app/services/message_normalizer.py` | `research/project-analysis/atlas-ai/evidence-audit.md` | Focused strictly on Telegram; desktop web dashboard is intentionally absent by design. |
| **ADR-VM-01** | Tier-1 Client-Side Deterministic Evaluator Before Human/Model Review | Historically Documented | `lib/eval-layer.ts:15-95` | `research/project-analysis/vm-copy/engineering-decisions.md` | Enforces 4 options, single correct answer, and duplicate distractor checks with 0ms latency and 0 API cost. |
| **ADR-VM-02** | Parallel Micro-Batch Splitting to Eliminate Serverless Timeouts | Historically Documented | `lib/batch-coordinator.ts:calculateBatches` | `engineering-decisions.md` ADR 02 | Partitions batches into chunks of 2–3 questions; reduces latency from 35s to 6s, preventing 504 gateway timeouts. |
| **ADR-WS-01** | Externalized Headless LaTeX/TikZ Compilation for Geometric Figures | Historically Documented | `backend/app/services/tikz_compiler.py` | `research/project-analysis/ai-worksheets/engineering-decisions.md` | Compiles TikZ to 300-DPI PNGs; requires TeX Live dependencies in deployment image (+1.2 GB). |
| **ADR-WS-02** | Algorithmic Backtracking Grid Placement over Generative 2D Layout | Historically Documented | `backend/app/puzzles/crossword/builder.py:45-120` | `builder.py` recursive backtracking tests | Formulates layout as constraint satisfaction; guarantees 100% collision-free crossword grids. |
| **ADR-ETL-01** | Dynamic Schema Derivation from Sample CSV Transformation Contracts | Historically Documented | `src/pipeline/schemas.py` | `tests/test_schemas.py` (124 pipeline tests) | Ingests 10-line sample CSV to generate runtime Pydantic models; onboarding states requires 0 code changes. |
| **ADR-ETL-02** | Merged Evaluate-and-Fix Single-Pass Review to Prevent Deadlocks | Historically Documented | `src/pipeline/stages/review.py`, Commit `252d06f` | Git Commit `252d06f` | Merged evaluator and critic into single prompt; cut token spend and latency by 50% on 1,000+ row batches. |
| **ADR-MIB-01** | Stateful Cyclic Agentic Graphs over Linear LLM Chains | Historically Documented | `src/graphs/item_generation_graph.py` | `math-item-bank/engineering-decisions.md` | Routes defect diagnostics back to specific nodes rather than aborting entire multi-stage item generation. |
| **ADR-MIB-02** | Integer Linear Programming (ILP) Stratification for Distribution | Historically Documented | `src/optimization/ilp_stratification.py` | `engineering-decisions.md` Decision 03 | Min/Max swap optimization satisfies global DOK and standard quotas within $\pm 1.5\%$ variance. |
| **ADR-LOOM-01**| LangGraph Supervisor Architecture with Typed Channel Reducers | Historically Documented | `backend/src/ai/graphs/SupervisorGraph.ts:25-95` | `backend/src/ai/workflows/BuyerProcurementWorkflow.ts` | Separates buyer procurement from catalog search; sub-agents for negotiation are currently mocked prototypes. |
| **ADR-LOOM-02**| Human-in-the-Loop Approval Queue for Consequential Actions | Historically Documented | `backend/src/ai/orchestration/ApprovalQueue.ts:15-70` | `loom-ai/evidence-audit.md` Section 1 | Holds proposed inventory mutations for explicit user approval; prevents unauthorized purchase commitments. |

---

## 2. Automated Evidence Verification Check

The dedicated verification suite [`scripts/test_decision_records.ts`](file:///C:/Users/HP/OneDrive/Documents/Portfolio/scripts/test_decision_records.ts) traverses all 26 records and asserts:
- Exact schema compliance on all 11 required fields.
- Concrete rationale on all 52 evaluated alternatives.
- Real file or test suite references on all 42 verification points.
- Zero broken or unreachable path strings.
- Pure data isolation with zero imports from `lib/rag/` or `lib/rag-lab/`.

