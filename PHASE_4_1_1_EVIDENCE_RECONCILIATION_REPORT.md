# Phase 4.1.1 — Evidence Reconciliation & Engineering Audit Report

**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Branch:** `main`  
**Standard Enforced:** `engineering-security-reliability` (Global Skill)  
**Date:** November 11, 2026  
**Auditor:** Principal AI Engineer, Systems Architect & Forensic Auditor  
**Status:** **RECONCILED & VERIFIED WITH DOCUMENTED QUALIFICATIONS**

---

## 1. Executive Summary

This report performs forensic evidence reconciliation across all claims made during Phase 4 and Phase 4.1 against the physical source code, execution outputs, and git state.

Every discrepancy identified in earlier drafts—including BM25 parameter variations, golden benchmark aggregations, corpus counts, cryptographic hashes, context budget policies, and runtime environments—has been investigated, verified against ground truth, and reconciled with reproducible evidence.

---

## 2. Evidence Reconciliation Findings Register

| Finding ID | Severity | Discrepancy & Conflicting Claims | Authoritative Source of Truth | Verification Method | Exact Result | Remediation Applied | Final Classification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REC-01** | Medium (Scientific Rigor) | **BM25 Parameter Inconsistency:** Narrative documents mentioned $k_1 = 1.5$ in some sections while the specification and UI declared $k_1 = 1.2, b = 0.75$. | `lib/rag-lab/bm25.ts` (`DEFAULT_BM25_CONFIG: { k1: 1.2, b: 0.75 }`) and `components/rag-lab/RagLabDashboard.tsx` (`Implemented with k1 = 1.2, b = 0.75`). | Source code AST inspection, unit test execution, and static UI string audit. | Runtime BM25 engine has consistently executed with $k_1 = 1.2, b = 0.75$. The mention of $k_1 = 1.5$ was a legacy prose draft artifact. | Corrected all documentation references to reflect the actual runtime source of truth ($k_1 = 1.2, b = 0.75$). | **REMEDIATED & VERIFIED** |
| **REC-02** | Medium (Benchmark Consistency) | **Golden Benchmark Table vs. Narrative Contradiction:** Per-query table simplified nDCG@5 to 1.0000 across all answerable queries, while the narrative reported answerable-query mean nDCG@5 = 0.9525 and all-query mean nDCG@5 = 0.7937. | Executable benchmark run via `RagLabService.runFullBenchmark()`. Raw output captured in `audit_results/rag_benchmark_raw.json`. | Direct node execution of benchmark harness over all 12 golden test queries. | The narrative numbers were mathematically exact: sum of answerable queries = 9.5247, mean (10 answerable) = 0.9525, mean (all 12) = 0.7937. The table's 1.0000 entries were oversimplified. | Replaced table with exact raw per-query calculations (`0.9468`, `1.0000`, `1.0000`, `0.9558`, `0.9828`, `1.0000`, `1.0000`, `0.9508`, `0.0000`, `0.0000`, `0.6885`, `1.0000`). | **REMEDIATED & VERIFIED** |
| **REC-03** | Medium (Data Provenance) | **Corpus Topology Discrepancy:** Phase 4 claimed 14 docs / 14 chunks; Phase 4.1 claimed 6 docs / 14 chunks. | Physical arrays in `data/rag/corpus_v1.ts`: `CORPUS_DOCUMENTS` and `CORPUS_CHUNKS`. | Programmatic array length evaluation and ID mapping. | The actual corpus contains **14 Parent Documents**, **16 Chunks**, spanning **7 Engineering Projects**. Earlier reports conflated project count with document count and omitted the second chunks of profile/timeline. | Updated manifest, documentation, and reports to document exact physical counts: 14 docs, 16 chunks, 7 projects. | **REMEDIATED & VERIFIED** |
| **REC-04** | High (Integrity Assurance) | **Corpus Fingerprint Reconciliation:** Manifest initially reported a 36-char truncated hash (`sha256-e9a7...`), followed by an unverified 64-hex string (`3ee0989...`). | Cryptographic SHA-256 calculation over canonical, sorted, field-filtered payload excluding mutable manifest attributes. | Independent canonical serialization script (`crypto.createHash('sha256')`). | True canonical digests: Chunks SHA-256 = `455b08a8196902c1f87399f0f28105d5d2c1d41be2750beda78241dcf1a18eb2`; Documents SHA-256 = `af80ce6478da0f9ab0e2f48b68a5ecf5ddf654a61c4c3450f0c2c04c1c56bb14`; Full Corpus SHA-256 = `8e8538cb2add770d2941172d42369ab8742ec11f76935ff8be53f513de9f41c9`. | Updated manifest and reports with true canonical digests. Explicitly qualified that a checksum represents deterministic digest verification, not immutable hardware storage. | **REMEDIATED & VERIFIED** |
| **REC-05** | Low (Clarity) | **Context Budget Policy Discrepancy:** Reports mentioned both a 150–600 token range and a 1,200 token ceiling. | `lib/rag-lab/contextBuilder.ts` and `components/rag-lab/RagLabDashboard.tsx`. | Code inspection of slider boundaries and architectural context window bounds. | 150–600 tokens is the interactive user slider range (default 350); 1,200 tokens is the architectural maximum context window ceiling. Both are valid at their respective layers. | Documented the distinction between user-configurable slider limits and hard architectural window caps. Tested boundary conditions. | **VERIFIED** |
| **REC-06** | Low (Environment Fidelity) | **Runtime Toolchain Discrepancy:** Reports documented Node v20.19.1, npm 10.8.2, Next.js 13.5.6, TS 5.2.2. | System environment commands (`node -v`, `npm -v`, `package.json`). | Environment inspection. | Actual environment: Node `v24.19.0`, npm `12.0.2`, Next.js `13.4.10`, React `18.2.0`, TypeScript `^5.4.2`. Earlier reports copied a generic reference profile. | Corrected environmental specifications across production reports. | **REMEDIATED & VERIFIED** |

---

## 3. Deep-Dive Investigation Details

### 3.1 BM25 Parameter Reconciliation
- **Runtime Source:** `lib/rag-lab/bm25.ts` defines `DEFAULT_BM25_CONFIG = { k1: 1.2, b: 0.75 }`.
- **UI Representation:** `components/rag-lab/RagLabDashboard.tsx` line 865 explicitly displays `"Implemented with k1 = 1.2, b = 0.75"`.
- **Retrieval Impact:** With $k_1 = 1.2$, term frequency saturation occurs faster than with $k_1 = 1.5$ or $2.0$. Given the concise technical nature of portfolio chunks (~60–220 tokens), $k_1 = 1.2$ prevents repetitive keywords from unduly dominating length-normalized scores.
- **Verification:** Unit tests (`test_rag_lab_unit.ts`) run strictly against `DEFAULT_BM25_CONFIG` ($k_1 = 1.2, b = 0.75$) with zero parameter modifications.

### 3.2 Corpus Provenance, Topology & Fingerprinting
- **Physical Document Count:** 14 documents in `CORPUS_DOCUMENTS`
  1. `doc-profile` (Profile & Positioning)
  2. `doc-timeline` (Career Progression)
  3. `doc-eda-spec` (EDA Architecture & Solvers)
  4. `doc-eda-physics` (EDA Shaft Sizing & Formulas)
  5. `doc-eda-metrics` (EDA Volume Invariant & Tests)
  6. `doc-solace-overview` (Solace AI Companion Architecture)
  7. `doc-solace-metrics` (Solace Latency & 102 Tests)
  8. `doc-ocr-overview` (OCR Evaluator 5-Axis Robustness)
  9. `doc-ocr-metrics` (OCR Evaluator 154 Tests & Gates)
  10. `doc-ai-reliability` (AI Reliability Platform Architecture)
  11. `doc-ai-reliability-metrics` (AI Reliability 205+ Tests & Target)
  12. `doc-atlas-ai` (Atlas AI LangGraph SEC Multi-Agent)
  13. `doc-atlas-metrics` (Atlas AI 59 MVP vs 178 Expanded Tests)
  14. `doc-vm-copy` (VM Copy Deterministic Guardrails)
- **Physical Chunk Count:** 16 chunks in `CORPUS_CHUNKS`
  - `chunk-profile-01`, `chunk-profile-02`
  - `chunk-timeline-01`, `chunk-timeline-02`
  - `chunk-eda-01`, `chunk-eda-02`, `chunk-eda-03`
  - `chunk-solace-01`, `chunk-solace-02`
  - `chunk-ocr-01`, `chunk-ocr-02`
  - `chunk-ai-reliability-01`, `chunk-ai-reliability-02`
  - `chunk-atlas-01`, `chunk-atlas-02`
  - `chunk-vm-copy-01`
- **Canonical Serialization Methodology:**
  To guarantee deterministic hashing across different platforms and file encodings:
  - Chunks are sorted lexicographically by `id`.
  - Only immutable content fields are serialized: `id`, `documentId`, `projectId`, `sectionTitle`, `chunkIndex`, `text` (trimmed), `sourceProvenance`, `tags` (sorted).
  - Volatile/mutable fields (such as runtime integrity hashes, manifest timestamps, or dynamic metrics) are strictly excluded from the hash preimage.
- **Verified Deterministic SHA-256 Digests (64 hex):**
  - **Canonical Chunks:** `455b08a8196902c1f87399f0f28105d5d2c1d41be2750beda78241dcf1a18eb2`
  - **Canonical Documents:** `af80ce6478da0f9ab0e2f48b68a5ecf5ddf654a61c4c3450f0c2c04c1c56bb14`
  - **Full Corpus (Documents + Chunks):** `8e8538cb2add770d2941172d42369ab8742ec11f76935ff8be53f513de9f41c9`
  *(Note: The previously published hash `sha256-e9a7...` is identified as a truncated draft identifier, and `3ee0989...` was a preliminary slice digest. The digests above represent the authoritative canonical bytes.)*

### 3.3 Context Window & Budget Enforcement
- **User Slider Range:** 150 to 600 tokens (step: 50, default: 350).
- **System Architectural Ceiling:** 1,200 tokens.
- **Boundary Test Execution:**
  - *Empty candidates:* Handled cleanly; 0 tokens packed; no exceptions.
  - *Oversized first candidate (> budget):* Excluded with `budget_exceeded`; 0 tokens packed.
  - *Duplicate candidate (Jaccard $\ge 0.8$):* First chunk included; duplicate chunk excluded with `duplicate_content`.
  - *Exact boundary ($Tokens = Budget$):* Both candidates packed; 100.0% budget utilization; `truncationApplied = false`.
  - *Oversized subsequent candidate:* Preceding candidate packed; subsequent candidate excluded with `budget_exceeded`; `truncationApplied = true`.

