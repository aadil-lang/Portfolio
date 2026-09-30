# Performance & Operations — AI Application Reliability

## 1. Quantitative Performance & Benchmarks

| Metric / Dimension | Implementation Evidence | Operational Profile |
| :--- | :--- | :--- |
| **Playwright Browser Run Duration** | Multi-step interactive UI exploration | ~2.5s to 6.5s per comprehensive web scenario |
| **Deterministic Evaluator Latency** | `evaluate_behavioral_contract` in memory | < 5 ms execution time |
| **Local LLM Diagnosis Latency** | Ollama Qwen 2.5 local inference | ~3.0s to 7.0s per diagnostic summary |
| **Fisher Uncertainty Calculation** | NumPy covariance matrix computation | < 12 ms |
| **Provenance Chain Append & Hash** | SHA-256 computation in SQLite | < 1 ms per event |
| **Total Closed-Loop Campaign Latency** | Full exploration + evaluation + diagnosis | ~8s to 15s end-to-end |

## 2. Operational Footprint & Storage Architecture
- **Artifacts on Disk**: Stored under `data/artifacts/{run_id}/` (DOM snapshots in JSON, PNG screenshots, network HAR logs).
- **SQLite Database**: Ephemeral / local persistence for engineering memory, test cases, and governance records.
- **Local-First Privacy**: Runs completely offline using local Playwright and local Ollama inference; zero external cloud data transfer.
