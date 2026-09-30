# Architecture & System Design — US Mathematics Item Bank

## 1. Claimed System Topology (From Portfolio Specifications)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Curriculum Blueprint / Spec                     │
│  - Target standards, DOK distribution (DOK 1-3), standard weightages   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     LangGraph Stateful Cyclic Machine                  │
│                                                                        │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐          │
│   │ Planner Node │────▶│ Amplification│────▶│Generator Node│          │
│   │ (Spec Split) │     │    Node      │     │ (Draft Item) │          │
│   └──────────────┘     └──────────────┘     └──────┬───────┘          │
│                                                    │                  │
│                                                    ▼                  │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐          │
│   │ Human SME    │◀────│ Review /     │◀────│ Vision LLM   │          │
│   │ Review Gate  │(Fail│ Schema Node  │(Fail│ Auditor Node │          │
│   └──────────────┘     └──────┬───────┘     └──────────────┘          │
│                               │ Passed                                │
└───────────────────────────────┼────────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│          Integer Linear Programming (ILP) Stratification Engine        │
│  - Min/Max Swap Optimization                                           │
│  - Standard weightage balancing within ±1.5% target                     │
│  - DOK 1, 2, 3 distribution constraints                                │
└───────────────────────────────┬────────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 Verified Item Bank Database (MongoDB)                  │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Component Role Breakdown (Claimed vs Available Code)

| Component | Claimed Role | Forensic Implementation Status |
| :--- | :--- | :--- |
| **Planner Node** | Deconstructs high-level curriculum standards into targeted subskill blueprints | **UNVERIFIED**: Source code not found in current Git remotes. |
| **Amplification Node** | Expands base mathematical concepts into diverse situational and numerical contexts | **UNVERIFIED**: Concept exists in `vm-copy` prompt templates, but not in a LangGraph node. |
| **Generator Node** | Generates question stem, 4 options, step-by-step solution, and TikZ/SVG diagram specs | **SUPPORTED CONCEPTUALLY**: Implemented in `vm-copy` and `ai-worksheets`, but not in this specific repo. |
| **Vision LLM Auditor** | Multimodal verification inspecting generated geometry/charts for visual inconsistencies | **SUPPORTED**: Multimodal analysis exists in `vm-copy:analyzeImageForQuestion` and `Atlas-AI:chart_analysis`. |
| **Cyclic Self-Healing Loop** | Routed feedback loop with node retry budgets (max 3 retries) before escalation | **SUPPORTED CONCEPTUALLY**: Present in `QMS` LangGraph pipeline (`human_review` node and retry state), but math domain implementation missing. |
| **ILP Stratifier (Min/Max Swap)** | Mathematical solver balancing multi-dimensional curriculum distributions | **UNVERIFIED**: No PuLP/SciPy/OR-Tools formulation found in reachable codebases. |
| **MongoDB State Checkpoint** | Preserves LangGraph checkpoint state across large batch generation runs | **SUPPORTED**: Present in `Atlas-AI` (`AsyncMongoClient`), but missing for math item bank. |
