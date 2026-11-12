# Phase 4.1 — Remediation Register

**Project:** AI Engineering Portfolio — Interactive RAG Architecture & Retrieval Evaluation Sandbox (`/rag-lab`)  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard Enforced:** `engineering-security-reliability` (Global Skill)  
**Date:** November 11, 2026  
**Auditor:** Principal AI Engineer, Security Auditor & Reliability Architect  

---

## Remediation Log

| Finding ID | Severity | Description | Evidence | Affected Component | Remediation | Regression Tests | Final Status | Residual Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FND-4.1-01** | Medium (Compliance) | Truncated SHA-256 fingerprint in corpus manifest (36 hex characters instead of 64). | `data/rag/manifest.json` reported `sha256-e9a712f56b107acb318d45290b8f6738c831` (length 36). | `data/rag/manifest.json`, `data/rag/corpus_v1.ts` | Independently calculated canonical SHA-256 checksums over normalized chunk payloads (`3ee09897496152cb6446645b72495078a301c5523f18bcf489f70585ebae89f3`) and full documents+chunks (`f29fa65bc976cd04d309a5621df93dbf5a3ff033f6079c3d8b280d5916671119`). Added full 64-hex digests to manifest and corpus exports while preserving legacy identifier. | `scripts/test_rag_lab_unit.ts`, `scripts/test_rag_edge_cases_and_security.ts` | **REMEDIATED & VERIFIED** | None. Complete provenance registered. |
| **FND-4.1-02** | Medium (AI Safety) | Client-side synthesizer lacked proactive abstention gates for adversarial administrative probing (system overrides, credentials, SQL injection). | Adversarial strings (`SYSTEM OVERRIDE`, `DROP TABLE`) previously retrieved unrelated chunks instead of immediately triggering deterministic epistemic abstention. | `lib/rag-lab/groundedSynthesizer.ts` | Implemented proactive security regex & keyword gates in `synthesize()` detecting administrative probing (`api key`, `environment variable`, `secret token`, `system override`) and SQL/DDL injection patterns (`drop table`, `select * from`), forcing immediate epistemic abstention with 0.00 confidence. | `scripts/test_rag_edge_cases_and_security.ts` (18/18 passed) | **REMEDIATED & VERIFIED** | None. Malicious queries are safely refused. |
| **FND-4.1-03** | Low (Scientific Precision) | Potential ambiguity in describing the Vector Space Model as "vector search" without explicit disclaimer against dense neural embeddings. | Vector model is an in-memory subword n-gram TF-IDF cosine similarity model, not a dense transformer or vector DB. | `lib/rag-lab/vectorRetriever.ts`, UI displays, documentation | Explicitly classified throughout all reports and UI labels as **Normalized TF-IDF Vector Space Model (Cosine Similarity)**. Added unambiguous disclaimer that no dense neural embeddings or external vector databases are used. | Unit test execution and documentation audit | **REMEDIATED & VERIFIED** | None. Terminology is strictly qualified. |
| **FND-4.1-04** | Low (Scientific Precision) | Groundedness claim qualification: lexical Jaccard overlap vs. semantic entailment. | Jaccard index measures token set intersection; does not evaluate Natural Language Inference (NLI) or semantic entailment. | `PHASE_4_1_VERIFICATION_REPORT.md`, `lib/rag-lab/groundedSynthesizer.ts` | Formally documented that citation validation confirms chunk existence and token lexical overlap ($\ge 0.15$), but explicitly does *not* prove formal semantic entailment. Disclosed in UI and reports. | Documentation and test suite review | **REMEDIATED & VERIFIED** | None. Clear epistemological boundaries documented. |

---

## Verification Sign-Off Summary
- Total Findings Identified: 4
- Remediated & Verified: 4
- Unresolved / Open: 0
- Residual Unmitigated Risk: None

