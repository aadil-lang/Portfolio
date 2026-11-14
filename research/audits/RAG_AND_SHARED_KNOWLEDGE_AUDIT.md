# RAG AND SHARED KNOWLEDGE AUDIT
**Forensic Investigation of Retrieval Pipelines, Corpus Partitioning, Evidence Identifiers & Technical Grounding**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, RAG & Knowledge Architecture Specialist
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** READ-ONLY AUDIT (Evidence-Grounded Forensic Assessment)

---

## 1. EXECUTIVE SUMMARY & ARCHITECTURAL DUALITY

The portfolio contains two distinct retrieval systems that serve completely different architectural functions:
1. **Ask Aadil Retrieval Engine (`lib/rag/`):** A conversational knowledge retrieval pipeline powering `/ask-aadil`, querying structured profile data, 6-source canonical layers, and repository adapters.
2. **RAG Evaluation Lab (`lib/rag-lab/` & `/rag-lab`):** An interactive retrieval and evaluation workbench powered by `data/rag/corpus_v1.ts` and `data/rag/golden_eval_dataset_v1.ts`, allowing visitors to compare retrieval models, observe Reciprocal Rank Fusion, inspect context token budgets, and test abstention.

---

## 2. INGESTION AND CORPUS COMPARISON

| Dimension | Ask Aadil (`lib/rag/`) | RAG Evaluation Lab (`lib/rag-lab/`) | Forensic Finding |
|---|---|---|---|
| **Primary Ingestion Source** | Ingests `structuredProfile.ts`, `resumeData.ts`, `timelineData`, `projectsMetadata.ts`, `projects.ts`, `journalChapters.ts`, `githubAdapter.ts` | Ingests standalone dedicated corpus `data/rag/corpus_v1.ts` (14 partitions, 45 chunk records) | **Separated Ingestion:** The two systems do NOT share a single runtime corpus. RAG Lab uses a curated benchmark corpus; Ask Aadil dynamically indexes canonical files. |
| **Retrieval Strategy** | Multi-Source Intent Routing + Hybrid Search (BM25 + TF-IDF) + Hardcoded Stage Overrides | Configurable: Okapi BM25 alone, Character n-gram TF-IDF alone, or Hybrid Reciprocal Rank Fusion (RRF) | RAG Lab accurately models configurable IR strategies; Ask Aadil relies on custom stage injections. |
| **Vector Space Implementation** | Character n-gram TF-IDF vectorizer | Character 3-gram to 5-gram TF-IDF vector space with cosine similarity | **Accurate Representation:** Neither engine claims dense neural embeddings. Both correctly use TF-IDF vector space retrieval. |
| **Evidence Chunk Identifiers** | Variable IDs (`evidence-progression-stage-*`, `chunk-*`) | Stable canonical IDs (`chunk-vmc-01`, `chunk-eda-01`, `chunk-sol-01`, etc.) | **Discrepancy:** RAG Lab has strictly formatted, immutable chunk IDs. Ask Aadil dynamically fabricates evidence IDs in `hybridRetriever.ts`. |
| **Citation Resolution** | Resolves to deep links (`/journal`, `/experience`, `/projects/[slug]`) | Resolves to chunk-level evidence cards with source file and line offsets | RAG Lab provides granular claim-level provenance; Ask Aadil often returns generic labels. |
| **Abstention Logic** | Triggers when intent router classifies out-of-scope or unverified contact | Evaluates context sufficiency score; abstains if top evidence score < threshold | Both implement deterministic abstention. |

---

## 3. DATA DUPLICATION AND CONSISTENCY AUDIT

### 3.1 Corpus Synchronization Findings
- `data/rag/corpus_v1.ts` contains 45 chunk records. Inspection of chunk dates in `corpus_v1.ts` reveals that **RAG Lab's corpus is chronologically accurate**:
  - `chunk-vmc-01`: Date recorded as `2025-10` / `2025-12` (October–December 2025).
  - `chunk-etl-01`: Date recorded as `2026-02` / `2026-06` (2026).
  - `chunk-eda-01`: Date recorded as `2026-09` (September 2026).
  - `chunk-sol-01`: Date recorded as `2026-11` (November 2026).
- **Critical Finding:** While `corpus_v1.ts` preserved the true dates, `data/canonical/journalChapters.ts` was corrupted with backdated years. Because Ask Aadil ingests `journalChapters.ts` rather than `corpus_v1.ts`, Ask Aadil picked up the corrupted dates while RAG Lab remained factually sound.

### 3.2 Evaluation Benchmark Integrity
- `data/rag/golden_eval_dataset_v1.ts` contains 15 curated benchmark queries with explicit ground-truth relevant chunk IDs, expected abstention flags, and minimal context budgets.
- Verified passing across 19 unit test assertions in `scripts/test_rag_lab_unit.ts`.
- The evaluation metrics (Mean Reciprocal Rank, Precision@K, Recall@K, Context Budget Utilization) execute deterministically without external API dependencies.

---

## 4. ARCHITECTURAL RECOMMENDATIONS (FOR NEXT PHASE)
1. **Preserve Conceptual Separation:** Keep Ask Aadil as the user-facing conversational assistant and RAG Lab as the technical benchmark explorer.
2. **Harmonize Ingestion Metadata:** In Phase 2/3, allow Ask Aadil's knowledge index to pull directly from the verified metadata records used by `corpus_v1.ts` to ensure consistent chunk IDs and dates.

