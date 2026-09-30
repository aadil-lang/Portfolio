# Portfolio Claims vs Implementation Evidence — Curriculum Transformation Engine

## Forensic Reconciliation Matrix

| Portfolio Claim / Narrative Point | Implementation Evidence in Repository | Forensic Status | Grounding Notes & Discrepancies |
| :--- | :--- | :--- | :--- |
| **"Dynamic schema derivation eliminating layout-specific scrapers"** | Implemented verbatim in `batch_runner.py` and `schemas.py:SampleTransformationContract`. | **VERIFIED** | Dynamically derives schema, column order, and hierarchy rules from approved sample CSV without code edits. |
| **"Verification of phrase: `dynamic schema derivation wit`"** | Original portfolio draft text truncated from "dynamic schema derivation with 3-tier integrity gates" (found in `data/experience.ts`). | **RESOLVED & VERIFIED** | Truncation in earlier text identified; full phrase and underlying implementation confirmed. |
| **"High-throughput Map-Reduce ETL pipeline"** | `ThreadPoolExecutor` concurrent chunk processing in `batch_runner.py` and `pipeline.py`; `README.md` references Claude Map-Reduce path. | **VERIFIED** | Parallel document chunk extraction with deterministic row merge and CSV append. |
| **"3-tier integrity gate (Reviewer, Critic, CSV Structure Audit)"** | Implemented in `validation/reviewer.py`, `validation/critic.py`, `schemas.py:apply_row_guards`, and `csv_audit.py`. | **VERIFIED** | Merged Reviewer/Critic pass, programmatic row guards, and post-extraction CSV audit agent. |
| **"Automated Test Suite with high coverage"** | No unit test files (`test_*.py`) found in repository. | **REFUTED / CORRECTED** | Quality assurance is achieved via runtime Pydantic schema validation, deterministic row guards, and `csv_audit.py`, NOT an offline test suite. |
