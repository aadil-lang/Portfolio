# Engineering Evolution Narrative Position — VM Copy Question Generator

## 1. Role in the Portfolio Narrative Arc

```
MATHEMATICS / SME
        ↓
[01 — VM Copy Question Generator]  <-- The First AI Engineering Milestone
        ↓
02 — AI Worksheets
        ↓
03 — US Mathematics Item Bank
        ↓
04 — Curriculum Transformation Engine
        ↓
05 — Engineering Design Automation
        ↓
06 — AI Application Reliability
        ↓
AI ENGINEERING
```

## 2. Core Narrative Transition: From SME Prompter to Systems Architect
- **Starting Point**: A Mathematics Subject Matter Expert attempting to scale curriculum authoring using commercial LLM interfaces.
- **The Core Problem Encountered**:
  - LLMs frequently hallucinate: they provide multiple correct answers or zero correct answers.
  - Distractor options repeat the same numerical value under different labels.
  - Formats fail basic curriculum rubrics (e.g., improper fractions generated when mixed numbers were required).
  - Prompts saying *"Be 100% mathematically correct and provide exactly 4 options"* fail with non-zero probability.
- **The Engineering Breakthrough**:
  - **Do not rely on the LLM to inspect itself probabilistically.**
  - Decouple generation from verification.
  - Build a deterministic guardrail layer (`lib/eval-layer.ts`) that executes hard structural assertions in zero milliseconds at zero marginal cost.
  - Build an adversarial verification loop (`/api/verify`) with blind-solving to cross-verify semantic correctness before human SME sign-off.
- **Cumulative Engineering Insight Carried Forward**:
  - **Deterministic Authority**: AI generates hypotheses; deterministic code enforces constraints. This core design pattern directly informs the LaTeX compilation engines in *AI Worksheets*, the ILP solver in *US Mathematics Item Bank*, the CadQuery BREP kernels in *Engineering Design Automation*, and the Fisher information covariance filters in *AI Application Reliability*.
