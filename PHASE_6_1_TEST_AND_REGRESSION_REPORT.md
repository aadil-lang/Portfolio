# PHASE 6.1 — TEST & REGRESSION REPORT
**Canonical Suite Executions, Boundary Invariants & Regression Audit**

- **Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Target Branch:** `main`
- **Standard Applied:** `engineering-security-reliability` (Sections 1.6, 6.1, 6.2)
- **Date:** November 2026
- **Status:** Complete — 100% Pass Rate across All Suites

---

## 1. Test Suite Execution Summary

To guarantee zero regression across portfolio functionality, 5 independent test suites were executed sequentially using the compiled test harness (`scratch/run_with_alias.js`).

| Test Suite | Domain / Target | Total Cases | Passed | Failed | Pass Rate |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `scripts/test_decision_records.ts` | Decision Records Integrity, Schema & Evidence | 7 | 7 | 0 | **100%** |
| `scripts/test_retrieval_foundation.ts` | Ask Aadil Hybrid Retrieval & Intent Routing | 13 | 13 | 0 | **100%** |
| `scripts/test_grounded_conversational_evaluation.ts` | Ask Aadil Conversational Grounding & Anti-Hallucination | 16 | 16 | 0 | **100%** |
| `scripts/test_rag_lab_unit.ts` | RAG Lab Retrieval Units & Golden Benchmark (12 cases) | 19 | 19 | 0 | **100%** |
| `scripts/test_rag_edge_cases_and_security.ts` | RAG Lab Prompt Injection & Edge Handling | 18 | 18 | 0 | **100%** |
| **Total Test Volume** | **Full Portfolio Automated Regression** | **73** | **73** | **0** | **100%** |

---

## 2. Detailed Suite Outcomes

### 2.1 Decision Records Verification Suite (`test_decision_records.ts`)
- **Suite 1: Project Coverage & Curation Constraints:** Verified that all 11 case studies have between 1 and 3 curated records. Total published records = 26 (strictly bounded).
- **Suite 2: Structural Integrity & Schema Invariants:** Verified that every record provides valid IDs, titles, summaries, contexts, constraints, chosen approaches, alternatives with rejection rationales, positive benefits, and accepted limitations.
- **Suite 3: Verification Evidence Provenance:** Verified 42 granular evidence mapping points pointing to real files, test suites, and documentation.
- **Suite 4: Boundary Isolation & Fallback Handling:** Confirmed zero imports from `lib/rag/` or `lib/rag-lab/`. Non-existent project slugs return empty array without throwing.

### 2.2 Ask Aadil Regression Verification (`test_retrieval_foundation.ts` & `test_grounded_conversational_evaluation.ts`)
- **Intent Routing & Entity Tracking:** 100% precision maintained. Queries for "EDA test count", "VM Copy evaluator", and "career transitions" route to exact canonical targets.
- **Source Authority Isolation:** Hybrid retrieval preserves strict source boundaries without data bleeding.
- **Anti-Hallucination Invariants:** 5/5 unrecorded factual inquiries (salary, age, Google employment, team size, unverified traffic) result in clean, graceful epistemic abstention.
- **Repeated Question Stability:** 7/7 repeated questions across 5 repeat iterations exhibit 100% factual consistency with zero drift.

### 2.3 RAG Evaluation Lab Regression Verification (`test_rag_lab_unit.ts` & `test_rag_edge_cases_and_security.ts`)
- **BM25 Retrieval:** Confirmed $k_1=1.2, b=0.75$; top-chunk scoring operates deterministically.
- **Subword Vector Retrieval:** Normalized TF-IDF cosine similarity returns accurate morphological rankings.
- **Hybrid RRF ($k=60$):** RRF score computation and rank merging verified.
- **Context Budget Truncation:** 100-token budget cleanly excludes oversized candidates without corrupting valid evidence blocks.
- **Citation Grounding:** Lexical Jaccard overlap ($\ge 0.15$) validates supported claims and rejects hallucinated citations.
- **Golden Benchmark:** Mean Recall@5 = 100%, MRR = 0.8333, Mean nDCG@5 = 0.7937, Abstention Match = 12/12.
- **Security & Injection:** 18/18 edge and prompt injection cases pass with safe refusal.

---

## 3. Production Route Smoke Test Results (`smoke_test_all_routes.js`)

A production server instance (`next start -p 3009`) was launched in headless Chromium, exercising all 19 primary application routes:

```
[PASS 200] /
[PASS 200] /timeline
[PASS 200] /experience
[PASS 200] /journal
[PASS 200] /systems
[PASS 200] /ai-engineering
[PASS 200] /rag-lab
[PASS 200] /contact
[PASS 200] /projects/ask-aadil
[PASS 200] /projects/solace-ai
[PASS 200] /projects/design-automation
[PASS 200] /projects/ocr-evaluator
[PASS 200] /projects/ai-reliability
[PASS 200] /projects/atlas-ai
[PASS 200] /projects/loom-ai
[PASS 200] /projects/vm-copy
[PASS 200] /projects/ai-worksheets
[PASS 200] /projects/curriculum-etl
[PASS 200] /projects/math-item-bank
```

**Diagnostic Telemetry:**
- Total Routes Tested: **19 / 19 Passed (100%)**
- Page Runtime JavaScript Exceptions: **0**
- Browser Console Errors: **0**
- Failed First-Party Resource Requests: **0**
- Static Assets Delivery:
  - Resume PDF (`/resume.pdf`): HTTP 200 (345,581 bytes)
  - Solace Demo Video (`/videos/solace_demo.mp4`): HTTP 200 (4,028,398 bytes)
  - Solace Poster (`/videos/solace_demo_poster.png`): HTTP 200 (210,333 bytes)

**Regression Verdict: PASSED.** The implementation of Feature 1 introduces zero regressions across existing portfolio capabilities.

