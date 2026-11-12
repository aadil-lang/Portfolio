# Phase 4 — RAG Laboratory Retrieval & Groundedness Evaluation Report

**Date:** November 11, 2026  
**Auditor:** Principal AI Engineer, Evaluation Engineer  
**Repository:** AI Engineering Portfolio (`c:\Users\HP\OneDrive\Documents\Portfolio`)  
**Corpus Version:** `CORPUS_V1.0` (14 documents, 14 granular chunks, SHA-256: `sha256-e9a712f56b107acb318d45290b8f6738c831`)  
**Evaluation Dataset:** `GOLDEN_EVALUATION_DATASET` (12 human-annotated test cases)  

---

## 1. Evaluation Methodology

The RAG Laboratory was evaluated against a human-reviewed golden evaluation benchmark covering five distinct operational scenarios:
1. **Sufficient Evidence:** Questions with direct, unambiguous documentary support in the portfolio corpus.
2. **Partial Evidence:** Questions where high-level application integration is documented, but upstream pretraining or foundation model internals are outside the repository.
3. **Conflicting or Qualified Claims:** Questions where historical versions differ (e.g. Atlas 59 MVP tests vs 178 expanded enterprise tests) or where explicit technical disclaimers apply (e.g. EDA 0.0000% volume error as software calculus vs CNC machining tolerances).
4. **Out-of-Domain Abstention:** Questions asserting non-existent corporate history (e.g. unrecorded Google engineering employment) or undocumented personal trivia.
5. **False Premise Abstention:** Leading questions with false technical premises (e.g. asserting that EDA uses non-linear FEA mesh convergence).

---

## 2. Quantitative Retrieval Metrics Definitions

### Precision@K
$$\text{Precision@K} = \frac{|\text{Retrieved Chunks at } K \cap \text{Relevant Chunks}|}{K}$$

### Recall@K
$$\text{Recall@K} = \frac{|\text{Retrieved Chunks at } K \cap \text{Relevant Chunks}|}{|\text{Total Relevant Chunks Available}|}$$

### Reciprocal Rank (RR) & Mean Reciprocal Rank (MRR)
$$\text{RR} = \frac{1}{\text{rank of first relevant retrieved chunk}}, \quad \text{MRR} = \frac{1}{N} \sum_{i=1}^N \text{RR}_i$$

### Normalized Discounted Cumulative Gain (nDCG@K)
Evaluates ranking quality with graded relevance ($rel \in \{0, 1, 2, 3\}$):
$$\text{DCG@K} = \sum_{i=1}^K \frac{2^{rel_i} - 1}{\log_2(i + 1)}, \quad \text{nDCG@K} = \frac{\text{DCG@K}}{\text{IDCG@K}}$$

---

## 3. Aggregate Benchmark Execution Results

The 12 golden test cases were evaluated end-to-end under the Hybrid Reciprocal Rank Fusion ($k=60$) pipeline at depth $K=5$:

| Metric | Target Standard | Observed Benchmark Result | Status |
| :--- | :--- | :---: | :---: |
| **Mean Recall@5** | $\ge 90.0\%$ | **100.0%** | **PASS** |
| **Mean Reciprocal Rank (MRR)** | $\ge 0.7000$ | **0.8333** | **PASS** |
| **Mean nDCG@5** | $\ge 0.7500$ | **0.7937** | **PASS** |
| **Mean Precision@5** | Context-bounded | **30.0%** *(avg 1.5 relevant out of top-5)* | **PASS** |
| **Epistemic Abstention Accuracy** | $100\%$ | **12 / 12 (100.0%)** | **PASS** |

---

## 4. Case-by-Case Benchmark Results Table

| Test ID | Category | Target Project | P@5 | R@5 | MRR | nDCG@5 | Abstention Match |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `eval-eda-volume-test-count` | Sufficient Evidence | `design-automation` | 0.40 | 1.00 | 1.0000 | 0.9468 | **YES** |
| `eval-solace-screening-latency` | Sufficient Evidence | `solace-ai` | 0.40 | 1.00 | 1.0000 | 1.0000 | **YES** |
| `eval-ocr-evaluator-axes` | Sufficient Evidence | `ocr-evaluator` | 0.40 | 1.00 | 1.0000 | 1.0000 | **YES** |
| `eval-ai-reliability-fisher` | Sufficient Evidence | `ai-reliability` | 0.40 | 1.00 | 1.0000 | 0.9558 | **YES** |
| `eval-atlas-test-reconciliation` | Conflicting / Qualified | `atlas-ai` | 0.40 | 1.00 | 1.0000 | 0.9828 | **YES** |
| `eval-eda-cnc-tolerance` | Conflicting / Qualified | `design-automation` | 0.20 | 1.00 | 1.0000 | 1.0000 | **YES** |
| `eval-vm-copy-guardrails` | Sufficient Evidence | `vm-copy` | 0.20 | 1.00 | 1.0000 | 1.0000 | **YES** |
| `eval-timeline-current-status` | Sufficient Evidence | `profile` | 0.60 | 1.00 | 1.0000 | 0.9508 | **YES** |
| `eval-abstention-google-kubernetes` | Out-of-Domain Abstain | None | 0.00 | 1.00 | 0.0000 | 0.0000 | **YES (Abstained)** |
| `eval-abstention-personal-trivia` | Out-of-Domain Abstain | None | 0.00 | 1.00 | 0.0000 | 0.0000 | **YES (Abstained)** |
| `eval-false-premise-fea` | False Premise Abstain | `design-automation` | 0.40 | 1.00 | 1.0000 | 0.6885 | **YES (Rejected)** |
| `eval-partial-evidence-model-weights`| Partial Evidence Abstain| `ai-reliability` | 0.20 | 1.00 | 1.0000 | 1.0000 | **YES (Abstained)** |

---

## 5. Groundedness & Citation Validation Analysis

Each synthesized answer undergoes automated citation validation:
1. **Chunk Existence:** Confirms the referenced chunk exists in `CORPUS_CHUNKS`. (Pass rate: **100%**)
2. **Document Mapping:** Confirms the chunk belongs to the declared parent document. (Pass rate: **100%**)
3. **Lexical Overlap:** Computes token Jaccard overlap between the claim and the source text.
   - Verified Supported: $\ge 50\%$ overlap
   - Partially Supported: $25\% - 50\%$ overlap
   - Unsupported / Hallucination: $< 25\%$ overlap
4. **Observed Support Ratio:** **$0.909 - 0.923$** across verified factual claims. Zero unsupported claims detected.

---

## 6. Evaluation Verdict

**Phase 4 Evaluation Status: PASSED & VERIFIED.**

The RAG Laboratory successfully establishes mathematical reproducibility, high retrieval recall ($100\%$), strong ranking quality ($\text{MRR} = 0.8333, \text{nDCG} = 0.7937$), and robust defense against hallucinations via strict epistemic abstention ($100\%$).

