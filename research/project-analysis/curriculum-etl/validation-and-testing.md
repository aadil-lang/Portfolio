# Validation, Testing & Guardrails — Curriculum Transformation Engine

## 1. Automated Test Suite Status
- **Test Discovery**: No offline `pytest` or `unittest` test suites are committed in the repository.
- **Architectural Validation**: Verification in `curriculum-etl` is conducted via runtime schema compilation, deterministic row guards, and an automated audit agent.

## 2. The 3-Tier Integrity Gate

### Tier 1: Transformation Reviewer (`validation/reviewer.py`)
- Executes an automated LLM evaluation pass over each extracted row against its underlying document slice.
- Fixes minor formatting errors, resolves truncated descriptions, and returns structured `EvaluateAndFixResult`.

### Tier 2: Deterministic Row Guards (`schemas.py:apply_row_guards`)
- Executes strict zero-cost programmatic assertions:
  1. Grade level bucket validation: must map strictly to `Elementary School`, `Middle School`, or `High School`.
  2. Forced column blanking: strictly wipes columns specified in `DRAFT_ALWAYS_BLANK_COLUMNS`.
  3. Unique standard code invariant: prevents duplicate standard keys across the output CSV.

### Tier 3: Adversarial Post-Extraction CSV Audit (`csv_audit.py`)
- Independent audit agent evaluating the final output table against the source documents.
- Audits every row with a conservative defect policy: flags only concrete, demonstrable defects (e.g. source contradictions, row contamination from headers/footers, or truncated text).
