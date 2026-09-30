# Key Engineering Decisions — Curriculum Transformation Engine

## ADR 01: Dynamic Schema Derivation from Sample CSVs
- **Context**: State and international curriculum frameworks possess radically distinct taxonomies: Texas TEKS uses Knowledge & Skill Statements with Student Expectations; California uses Domains, Clusters, and Standards; Australia uses Strands, Sub-strands, and Content Descriptions. Writing custom parsers for all 50 US states and international systems would create an unmaintainable codebase of brittle regex scripts.
- **Decision**: Invert the architecture: treat an approved sample CSV as a dynamic transformation contract (`schemas.py`). The engine parses the sample's columns, hierarchy levels (`l1` through `l5`), and sample values, generating dynamic Pydantic models at runtime to validate inbound document transformations.
- **Consequences**: Adding support for a new state or country curriculum requires zero Python code changes—only providing a 10-line approved sample CSV.

## ADR 02: Merged Evaluate-and-Fix Pass
- **Context**: In early pipeline revisions, the review stage was split into two sequential LLM passes: an evaluator that detected problems and a separate critic that decided whether to accept or reject the row. This doubled LLM latency and API spend, while frequently hanging on provider rate limits.
- **Decision** (Commit `252d06f`): *"Fix hangs and provider 5xx handling; merge review+critic"*. Combine evaluation, repairing, and verdict into a single prompt producing `EvaluateAndFixResult`.
- **Consequences**: Cut verification latency and token expenditure by 50% while resolving inter-model deadlock.

## ADR 03: Deterministic Row Guards Outside the Model
- **Context**: LLMs occasionally exhibit minor stochastic drift on categorical fields, such as emitting `Elementary` instead of `Elementary School`, or populating values into optional tracking columns that must remain strictly empty in final state exports.
- **Decision**: Introduce deterministic programmatic row guards (`apply_row_guards()` in `schemas.py`) that execute immediately after LLM review:
  - Canonical 3-bucket grade normalization (`Elementary School`, `Middle School`, `High School`)
  - Enforced blanking of reserved columns (`l4`, `l5`, `standard code`, `czi_standard_code`)
  - Whitespace stripping and duplicate display code detection
- **Consequences**: Absolute structural conformity without burning additional LLM tokens.

## ADR 04: Adversarial Post-Extraction CSV Audit (`csv_audit.py`)
- **Context**: Even with row guards, large batches (1,000+ rows) may contain subtle semantic hallucinations where an LLM invents a standard description not present in the original PDF.
- **Decision**: Implement an automated, opt-in audit agent (`csv_audit.py`) that cross-examines the finalized CSV rows directly against raw source document slices, flagging only demonstrable contradictions.
- **Consequences**: Provides provable factual provenance before curriculum data is imported into production databases.
