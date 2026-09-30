# Architecture & System Design — AI Application Reliability

## 1. System Architecture & Authority Boundaries

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Developer / Antigravity Agent                   │
│  - Triggers test campaign via REST API or 10-Tool MCP Server Interface │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Application Context Service & Planner                │
│  - Binds target (e.g. Next.js VM Copy app on port 3000)                │
│  - Change Impact Analysis (Slice 8K): blast radius across code/prompts │
│  - Adaptive Regression Planner: deep coverage on affected modules      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Autonomous Playwright Execution                    │
│  - Drives real headless Chromium browser sessions                      │
│  - Captures multi-modal ground truth on disk:                          │
│    • DOM Snapshots • PNG Screenshots • Network HAR Traces • Logs       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Deterministic Behavioral Evaluators                  │
│  - Evaluates behavioral contracts against observed facts               │
│  - Sole authority for pass/fail verdicts (4 options, single CA)        │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │ Failure Detected               │ Passed
                    ▼                                ▼
┌───────────────────────────────────────┐   ┌────────────────────────────┐
│      AI Root Cause Diagnosis Engine   │   │  Log Success to Provenance │
│  - Local Qwen 2.5 LLM via Ollama      │   └────────────────────────────┘
│  - Surfaces historical context via    │
│    Local Hybrid RAG & SQLite Memory   │
│  - Uncertainty Engine (Fisher Info):  │
│    Calculates Covariance Matrix       │
│    (High Uncertainty -> ABSTAIN)      │
└───────────────────┬───────────────────┘
                    │ Low Uncertainty Diagnosis
                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Mandatory Human Governance Gate                      │
│  - Evidence Package Compilation (DOM + Screenshot + Root Cause)        │
│  - Risk Level Assessment (Low / Medium / High / Critical)              │
│  - Autonomous agent is STRICTLY FORBIDDEN from merging or applying fix │
│  - Requires human cryptographic role approval                          │
└───────────────────┬────────────────────────────────────────────────────┘
                    │ Approved by Human
                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 Independent Retest & Provenance Seal                   │
│  - Playwright re-runs verification campaign                            │
│  - SHA-256 hash appended to immutable chronological audit chain        │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Non-Overlapping Subsystem Authority Matrix

| Subsystem | Sole Authority & Invariant | Inviolable Constraint (What It May NOT Do) |
| :--- | :--- | :--- |
| **Playwright Engine** | Sole authority for executing runtime browser interactions | May NOT evaluate domain correctness or make semantic inferences |
| **Deterministic Evaluators** | Sole authority for enforcing behavioral contracts | May NOT invent or extrapolate unstated application rules |
| **Evidence Collector** | Sole authority for recording observed runtime facts on disk | May NOT synthesize speculative facts or extrapolate unobserved states |
| **Local LLM / Reasoner** | Proposes diagnoses and remediation patches | May NOT authorize changes, deploy code, or override deterministic evaluations |
| **Uncertainty Engine** | Evaluates diagnostic confidence via Fisher covariance matrix | High uncertainty strictly forces abstention from automated proposals |
| **Human Governance Gate** | Sole authority for authorizing consequential changes | Autonomous agents cannot bypass this gate under any condition |
| **Provenance Layer** | Immutable cryptographic audit ledger (SHA-256 hash chain) | Does not implement business logic; purely records chronological causality |
