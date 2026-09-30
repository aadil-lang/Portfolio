# Failure Modes & Degradation Analysis — US Mathematics Item Bank

## 1. Documented & Hypothesized Failure Taxonomy

| Failure Mode | Root Cause | Detection Mechanism | System Response / Mitigation | Forensic Evidence Status |
| :--- | :--- | :--- | :--- | :--- |
| **Cyclic Infinite Feedback Loop** | Mutually contradictory item prompt constraints | Graph state retry counter | Aborts loop after 3 failed attempts; pushes state to dead-letter escalation queue | Documented in `chapters.ts:failuresAndTradeoffs`; code unverified |
| **DOK Cognitive Level Drift** | LLM claims an item is DOK-3 (strategic thinking) when it is merely multi-step arithmetic (DOK-2) | Reviewer node rubrics | Deducts DOK classification; triggers re-amplification node | Documented in portfolio narrative |
| **Visual Distortion in Math Charts** | Geometry coordinate mismatch or unreadable axis ticks | Multimodal Vision LLM Auditor | Flags visual discrepancy; requests regeneration with explicit bounding box constraints | Multimodal vision pattern verified in author's other repos (`vm-copy`, `Atlas-AI`) |
| **Curriculum Standard Skew** | LLM generation favors certain standards over others | ILP solver infeasibility or high objective loss | Min/Max Swap algorithm swaps items across candidate pools to restore balanced weightages | Mathematical formulation claimed; code unverified |
| **Pipeline Worker Crash During Batch Runs** | Serverless timeout or memory spike | LangGraph state checkpointing (MongoDB) | Resumes graph execution from the last persisted checkpoint node without restarting batch | Pattern verified in `Atlas-AI`; math pipeline unverified |
