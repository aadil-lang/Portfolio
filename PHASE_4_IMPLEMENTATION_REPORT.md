# Phase 4 — RAG Laboratory Implementation Report

**Date:** November 11, 2026  
**Author / Role:** Principal AI Engineer, RAG Architect, Full-Stack Engineer  
**Repository:** AI Engineering Portfolio (`c:\Users\HP\OneDrive\Documents\Portfolio`)  
**Route:** `/rag-lab`  
**Status:** **IMPLEMENTED, TESTED & PRODUCTION VERIFIED**  

---

## 1. Executive Summary

Phase 4 designed, engineered, and delivered an interactive **RAG Architecture & Retrieval Evaluation Sandbox** at `/rag-lab`. Unlike superficial conversational demos, this laboratory exposes the inner mechanics of a production-grade grounded retrieval system:
1. **Deterministic Versioned Corpus (`CORPUS_V1.0`):** 14 canonical documents and 14 granular chunks traceable directly to approved portfolio evidence.
2. **Multi-Strategy Retrieval Engines:**
   - **Okapi BM25:** Lexical term frequency saturation ($k_1=1.2$, $b=0.75$) with inverse document frequency ($IDF$) and document length normalization.
   - **Vector Space Model:** Normalized TF-IDF subword vector representations with exact cosine similarity ($\cos(\vec{u}, \vec{v}) \in [0, 1]$) running in-process with zero external API dependencies.
   - **Hybrid Reciprocal Rank Fusion (RRF):** Fuses ordinal rankings using Cormack & Clarke's formula: $RRF(d) = \sum \frac{1}{60 + rank_m(d)}$.
3. **Context Construction & Budget Allocator:** Manages sliding token budgets (150–600 tokens), applies Jaccard deduplication, and provides explicit inclusion/exclusion diagnostics.
4. **Grounded Answer Synthesis & Epistemic Abstention:** Employs an evidence-only synthesis engine that validates citation integrity, detects false premises (e.g. EDA non-linear FEA), and enforces explicit abstention on out-of-domain queries (e.g. unrecorded Google corporate history, personal trivia).
5. **Deterministic Evaluation Framework:** Computes Precision@K, Recall@K, Reciprocal Rank (RR/MRR), and nDCG@K against a human-reviewed 12-case golden benchmark dataset.

---

## 2. Inventory of Created and Modified Files

### Created Files
| File | Size / Lines | Purpose |
| :--- | :--- | :--- |
| `data/rag/types.ts` | 134 lines | Authoritative TypeScript interfaces for documents, chunks, manifests, metrics, citations, and golden test cases. |
| `data/rag/corpus_v1.ts` | 275 lines | Versioned canonical document corpus (`CORPUS_DOCUMENTS`) and chunks (`CORPUS_CHUNKS`) with source provenance links. |
| `data/rag/manifest.json` | 15 lines | Corpus manifest containing version (`CORPUS_V1.0`), SHA-256 integrity hash, chunk count, and provenance list. |
| `data/rag/golden_eval_dataset_v1.ts` | 240 lines | 12 human-reviewed benchmark test cases across 5 categories with graded relevance (0–3). |
| `lib/rag-lab/tokenizer.ts` | 32 lines | Normalization, token extraction, English stopword filtering, and n-gram extraction. |
| `lib/rag-lab/bm25.ts` | 145 lines | Standard Okapi BM25 engine with IDF caching and document length normalization. |
| `lib/rag-lab/vectorSearch.ts` | 152 lines | Normalized vector space search engine computing exact cosine similarity in-process. |
| `lib/rag-lab/hybridRrf.ts` | 115 lines | Reciprocal Rank Fusion ($k=60$) combiner exposing individual ranks, individual scores, and fusion weights. |
| `lib/rag-lab/contextBuilder.ts` | 108 lines | Token budget allocator with Jaccard deduplication and inclusion/exclusion diagnostics. |
| `lib/rag-lab/citationValidator.ts` | 82 lines | Deterministic citation validator checking chunk existence and claim-to-chunk text overlap ratio. |
| `lib/rag-lab/groundedSynthesizer.ts` | 155 lines | Grounded synthesis engine enforcing strict abstention policies and conflict disclosures. |
| `lib/rag-lab/metrics.ts` | 115 lines | Evaluation metric calculator for Precision@K, Recall@K, MRR, and graded nDCG@K. |
| `lib/rag-lab/ragLabService.ts` | 185 lines | Unified facade service coordinating pipelines, context building, and golden benchmarks. |
| `components/rag-lab/RagLabDashboard.tsx` | 550 lines | Interactive UI dashboard covering all 6 functional panels and dark theme styling. |
| `app/rag-lab/page.tsx` | 15 lines | Dedicated Next.js 13 App Router route for `/rag-lab`. |
| `scripts/test_rag_lab_unit.ts` | 125 lines | Comprehensive automated unit and benchmark test suite. |
| `scripts/capture_rag_lab_screenshots.js` | 85 lines | Headless Playwright script capturing responsive desktop, tablet, and mobile screenshots. |
| `audit_results/phase4_screenshots/*` | 3 images | Screenshots across Desktop (1440x900), Tablet (768x1024), and Mobile (375x812). |

### Modified Files
| File | Modifications |
| :--- | :--- |
| `components/Header.tsx` | Added `RAG Lab` navigation link to desktop and mobile navigation bars. |
| `components/Footer.tsx` | Added `RAG Lab` link to footer directory. |
| `scripts/smoke_test_all_routes.js` | Extended route smoke test array from 18 to 19 routes to verify `/rag-lab` in production mode. |

---

## 3. Implemented vs Unimplemented Retrieval Methods

| Method | Implemented? | Technical Execution Justification |
| :--- | :---: | :--- |
| **Okapi BM25** | **YES** | Implemented in `lib/rag-lab/bm25.ts`. Fully computes term frequencies, document frequencies, Robertson-Spärck Jones IDF, and document length normalization ($k_1=1.2, b=0.75$). |
| **Vector Space (Cosine)** | **YES** | Implemented in `lib/rag-lab/vectorSearch.ts`. Generates subword and n-gram TF-IDF normalized vector spaces and computes exact cosine similarity ($\cos(\vec{u}, \vec{v})$). Operates deterministically in-process with 0 external API dependencies. |
| **Hybrid RRF** | **YES** | Implemented in `lib/rag-lab/hybridRrf.ts`. Executes parallel BM25 and Vector passes to depth $2K$, computing Cormack & Clarke Reciprocal Rank Fusion ($k=60$). |
| **Neural Cross-Encoder Reranker** | **NO** | Transparently omitted. A neural cross-encoder (e.g. `bge-reranker-large` or `cohere-rerank`) requires heavy ONNX/PyTorch model weights or external API credentials. In accordance with Rule 4 ("Do not invent benchmark results or static mocks"), reranking is documented as an architectural extension rather than simulated with fake numbers. |

---

## 4. Architectural Dataflow

```
User Query Input
      │
      ├───► [Query Normalizer & Tokenizer]
      │
      ├───► [Parallel Retrieval Stage]
      │         ├── Okapi BM25 (k1=1.2, b=0.75) ─────► Lexical Ranked List
      │         └── Vector Space Cosine Similarity ───► Vector Ranked List
      │
      ├───► [Reciprocal Rank Fusion (RRF k=60)]
      │         └── Combines Ordinal Ranks: Σ 1 / (60 + rank_m)
      │
      ├───► [Context Window Allocator & Budget Manager]
      │         ├── Sliding Token Budget (e.g. 350 tokens)
      │         └── Jaccard Deduplication & Exclusion Triage
      │
      ├───► [Grounded Synthesis & Epistemic Gate]
      │         ├── Checks for Empty Context ──► Insufficient Evidence Abstain
      │         ├── Checks for Out-of-Domain ──► Out-of-Domain Abstain
      │         ├── Checks for False Premise ──► False Premise Rejection
      │         └── Synthesizes Answer from Survived Chunks
      │
      ├───► [Deterministic Citation Validator]
      │         ├── Verifies Chunk ID Existence
      │         └── Measures Token Overlap Ratio (0.0 to 1.0)
      │
      └───► [Evaluation Metrics Calculator]
                └── Precision@K, Recall@K, MRR, nDCG@K vs Golden Dataset
```

---

## 5. Verification & Regression Status

- `npx tsc --noEmit`: **0 errors**
- `npm run build`: **Exit Code 0** (36 static and SSG routes generated)
- `scripts/test_rag_lab_unit.ts`: **100% Passed (8 / 8 suites)**
- `scripts/smoke_test_all_routes.js`: **19 / 19 routes passed HTTP 200 OK**
- Browser Runtime Errors: **0**
- Browser Console Errors: **0**
- Failed First-Party Requests: **0**

