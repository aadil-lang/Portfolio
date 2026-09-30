# Performance & Operations — Engineering Design Automation

## 1. Verified Execution Latency & Benchmarks

Measured via `test_benchmark.py` and analytical solver profiles:

| Operation | Latency / Execution Time | Resource Utilization |
| :--- | :--- | :--- |
| **Natural Language Extraction** | ~150–400 ms | Lightweight regex / local LLM inference |
| **Material Resolution** | < 0.5 ms | In-memory hash dictionary lookup |
| **Closed-Form Torsion Solving** | < 1 ms | Pure Python floating point arithmetic |
| **Nominal Sizing Quantization** | < 0.1 ms | Array search through standard metric series |
| **Parametric 3D BRep CAD Synthesis** | ~15–35 ms | OpenCascade BRep cylinder primitive construction |
| **2D Vector SVG Drawing Derivation** | ~8–15 ms | Mathematical projection and SVG XML assembly |
| **Dimensional Cross-Validation** | < 2 ms | Comparative bounding-box floating point check |
| **Total End-to-End Pipeline Latency** | **< 500 ms** (sub-second) | Instantaneous interactive engineering response |

## 2. Artifact Footprint & Deployment
- **STEP File Size**: ~2.5 KB to 5 KB per solid model.
- **SVG Drawing Size**: ~8 KB to 14 KB per technical drawing.
- **JSON Certificate Size**: ~3 KB containing full derivation steps and equations.
- **Deployment Footprint**: Dockerized container deployable to Railway or bare metal, bundling Python 3.12 and OpenCascade CAD dependencies.
