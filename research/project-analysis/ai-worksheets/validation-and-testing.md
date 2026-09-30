# Validation, Testing & Guardrails — AI Worksheets

## 1. Automated Test Suite Status
- **Test Discovery**: `backend/tests/` contains only `__init__.py`. No automated pytest or vitest test suites are committed in the repository.
- **Static Schema Validation**:
  - Pydantic v2 models validate all inbound payloads and LLM JSON outputs across `app/schemas/*` and `crossword_pipeline/schemas.py`.
  - TypeScript strict typing across React frontend components and state models.

## 2. Multi-Layer Guardrails & Compilers

### Layer 1: System Prompt Invariants
Enforces three inviolable boundaries:
1. Strict alignment to the named TEKS standard.
2. Inviolable subskill targeting: no drifting into adjacent concepts.
3. No answer leakage in clues.

### Layer 2: Independent LLM Verification Pass
Crossword candidates generated in Step 1 are piped into a secondary LLM verifier executing an adversarial 4-point checklist:
1. Is the clue mathematically and pedagogically correct?
2. Does the clue contain the answer word (or stems of the word)?
3. Does the clue match the specific subskill tag?
4. Are any terms duplicate or near-duplicate?

### Layer 3: Deterministic Grid Boundary Invariants (`builder.py`)
- In-bounds check: Ensures no word exceeds grid boundary `[0, size)`.
- Word buffer rule: Asserts that empty cells precede the start and follow the end of each word so words do not touch head-to-tail.
- Side-touching prohibition: Asserts that parallel adjacent cells are empty to prevent accidental anagram formation.
- Mutual intersection validation: Asserts that whenever two words cross, the overlapping character is identical.

### Layer 4: TeX Live Subprocess Compiler Validation
TikZ code is compiled inside an isolated temporary directory via `pdflatex`. If compilation fails (exit code $\ne 0$), the artifact is rejected immediately and never served to the user.
