# Phase 4 — RAG Architecture & Retrieval Evaluation Sandbox Audit

**Date:** November 11, 2026  
**Auditor:** Principal AI Engineer, RAG Architect, Evaluation Engineer  
**Repository:** AI Engineering Portfolio (`c:\Users\HP\OneDrive\Documents\Portfolio`)  
**Commit Baseline:** `615daf9586a2450e8a0cb91c6eaff532509a8431`  
**Next.js Installed Version:** `13.4.10` (verified via `package.json` and `package-lock.json`)  
**Status:** Architecture Audit Complete — Ready for Stage 1 Implementation  

---

## 1. Executive Summary

Phase 4 mandates building an interactive, evidence-driven RAG Evaluation Sandbox (`/rag-lab`). Rather than creating another conversational interface, the objective is to expose the inner mechanics of a defensible retrieval-augmented system:
- How documents are chunked and normalized with provenance.
- How lexical (BM25), vector space, and hybrid (RRF) retrieval methods compare on identical queries.
- How context budgets are allocated and excluded chunks are triaged.
- How citations are structurally validated against source chunk text.
- Why and when the system must explicitly abstain.
- How retrieval performance is quantitatively evaluated (Precision@K, Recall@K, MRR, nDCG@K) using a golden dataset.

---

## 2. Existing Ask Aadil RAG Architecture Audit

We conducted a thorough inspection of `lib/rag/`, `data/canonical/`, `types/rag.ts`, and test scripts.

### 2.1 Component Inventory
| File / Component | Purpose | Current Implementation Status |
| :--- | :--- | :--- |
| `lib/rag/knowledgeIndex.ts` | Source-aware chunk indexer | Indexes Profile, Resume, Timeline, Journal, Systems, CodeEvidence, and Claims into `KnowledgeChunk[]`. |
| `lib/rag/intentRouter.ts` | Query intent classifier | Regex & keyword matching routing into 7 intent classes (`identity`, `project_inquiry`, `quantitative_claim`, `code_evidence`, `career_evolution`, `ownership`, `unknown`). |
| `lib/rag/sourcePlanner.ts` | Source targeting | Maps intent to targeted source types (`code_evidence`, `quantitative_claim`, `portfolio`, `resume`). |
| `lib/rag/hybridRetriever.ts` | Retrieval dispatcher | Uses heuristic additive scoring (`+5` for term matches, `+25` for code intent, `+30` for quant, `+20` for project slug). |
| `lib/rag/synthesizer/answerSynthesizer.ts` | Deterministic fallback synthesizer | Template-driven natural language answers grounded in `EvidenceItem[]`. |
| `lib/rag/synthesizer/llmAnswerSynthesizer.ts` | LLM-based grounded synthesizer | Schema-validated generation with strict system prompts and grounding validation. |
| `lib/rag/askAadilAgent.ts` | Core agent coordinator | Coordinates routing, retrieval, synthesis, and voice I/O. |
| `data/canonical/*.ts` | Single sources of truth | `projectsMetadata.ts`, `quantitativeClaims.ts`, `structuredProfile.ts`, `resumeData.ts`, `journalChapters.ts`. |
| `data/evidence/askAadilEvaluationData.ts` | Test suite registry | Documents 10 test suites and 172 test assertions for Ask Aadil. |

---

## 3. Key Findings & Critical Gaps

1. **Absence of True Okapi BM25:**
   - `lib/rag/hybridRetriever.ts` currently scores chunks via arbitrary heuristic points (`score += 5`, `score += 25`).
   - It lacks term frequency saturation ($TF / (TF + k_1(1 - b + b \cdot |D|/\text{avgdl}))$), inverse document frequency ($IDF$), and document length normalization.
   - *Fix in Phase 4:* Implement genuine Okapi BM25 with configurable $k_1$ (default $1.2$) and $b$ (default $0.75$), exposed term frequencies, and document length distributions.

2. **Absence of True Vector Cosine Retrieval:**
   - Previous references to "vector retrieval" were conceptual or external (case studies for Atlas AI and Loom AI).
   - No vector embedding model or cosine similarity function exists in the portfolio codebase.
   - *Fix in Phase 4:* Implement a genuine Vector Space Model (TF-IDF subword vector space or deterministic semantic embedding model) that computes normalized vector dot products ($\cos(\vec{u}, \vec{v}) \in [0, 1]$) in-process without requiring paid external API keys.

3. **Absence of Reciprocal Rank Fusion (RRF):**
   - No RRF formula was implemented; candidate chunks were merely filtered and sorted by additive integer points.
   - *Fix in Phase 4:* Implement standard RRF:
     $$RRF(d) = \sum_{m \in \{\text{BM25}, \text{Vector}\}} \frac{1}{k + \text{rank}_m(d)} \quad (k = 60)$$
     Exposing individual ranks, individual scores, and fusion results.

4. **Absence of Context Window & Budget Inspector:**
   - Chunks were sliced (`.slice(0, 6)`) without exposing token budgets, character limits, or explicit reasons for exclusion.
   - *Fix in Phase 4:* Implement an explicit `ContextBuilder` that tracks token budgets, shows inclusion/exclusion reasons (`exceeded_budget`, `duplicate_content`, `low_relevance_rank`), and reports exact token counts.

5. **Absence of Deterministic Citation Grounding Verification:**
   - Citations were formatted as visual strings without verification that the cited chunk exists or that the answer text matches the source evidence.
   - *Fix in Phase 4:* Implement automated citation validation verifying chunk ID existence, source document mapping, and text overlap support ratio ($0.0 - 1.0$).

6. **Absence of Quantitative Retrieval Metrics (Precision, Recall, MRR, nDCG):**
   - No automated calculator currently computes $P@K, R@K, MRR$, or $nDCG@K$.
   - *Fix in Phase 4:* Implement mathematically verified metric calculators against a human-reviewed golden evaluation dataset.

---

## 4. Proposed Implementation Architecture for Phase 4

```
Portfolio Architecture (Next.js 13.4.10 / React 18 / Tailwind)
│
├── data/rag/
│   ├── corpus_v1.ts               <-- Versioned canonical document corpus & chunks
│   ├── manifest.json              <-- Corpus metadata, SHA-256 hashes, source provenance
│   └── golden_eval_dataset_v1.ts  <-- 12 human-reviewed benchmark test queries with relevance grades
│
├── lib/rag-lab/
│   ├── tokenizer.ts               <-- Deterministic tokenization, stemming, stopword removal
│   ├── bm25.ts                    <-- Okapi BM25 engine with IDF caching & length normalization
│   ├── vectorSearch.ts            <-- Vector space model with cosine similarity
│   ├── hybridRrf.ts               <-- Reciprocal Rank Fusion (RRF) combiner
│   ├── contextBuilder.ts          <-- Token budget manager & inclusion/exclusion triage
│   ├── groundedSynthesizer.ts     <-- Evidence-only synthesizer with abstention rules
│   ├── citationValidator.ts       <-- Citation existence & substring overlap validator
│   └── metrics.ts                 <-- Precision@K, Recall@K, MRR, nDCG@K calculators
│
├── components/rag-lab/
│   ├── RagLabWorkspace.tsx        <-- Main interactive dashboard
│   ├── QueryWorkspacePanel.tsx    <-- Query inputs, presets, strategy toggles, filters
│   ├── PipelineVisualizer.tsx     <-- Step-by-step pipeline execution trace
│   ├── EvidenceExplorer.tsx       <-- Inspectable chunks, scores, source badges
│   ├── AnswerCitationPanel.tsx    <-- Synthesized answer, citation validation, abstention
│   ├── EvaluationMetricsPanel.tsx <-- P@K, R@K, MRR, nDCG@K live metric cards & confusion matrix
│   ├── StrategyComparisonView.tsx <-- Side-by-side BM25 vs Vector vs Hybrid RRF comparison
│   └── ArchitectureDeepDive.tsx   <-- Engineering decisions, trade-offs, and formulas
│
├── app/rag-lab/page.tsx           <-- Dedicated interactive page route (/rag-lab)
│
└── scripts/
    ├── test_rag_lab_unit.ts       <-- Complete unit & mathematical verification suite
    └── smoke_test_all_routes.js   <-- Production regression verification across all 19 routes
```

---

## 5. Architectural Boundaries & Defensible Integrity Rules

1. **Zero Fake Metrics:** All scores, IDF weights, cosine similarities, and evaluation metrics are computed live from genuine data using mathematically published formulas.
2. **Deterministic No-Key Fallback:** The full retrieval pipeline, RRF comparison, context builder, citation validation, and metric evaluation run 100% in-browser / in-process without requiring any third-party API key.
3. **Explicit Abstention:** Queries outside the corpus, queries with conflicting claims, or false premise queries explicitly trigger abstention states with documented reasons.
4. **Preservation of Design Language:** The `/rag-lab` route adopts the existing cartographic dark theme (`#14171A`, `#181C21`, `#262B32`, `#5A9A78`).

