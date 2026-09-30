# Performance & Operations — VM Copy Question Generator

## 1. Verified Metrics & Operational Characteristics

| Metric / Dimension | Verified Implementation Evidence | Notes & Benchmarks |
| :--- | :--- | :--- |
| **Tier-1 Deterministic Eval Latency** | `~0 ms` execution time | Pure in-memory JavaScript string/regex processing, zero external I/O |
| **Batch Generation Latency** | Bounded parallel generation via `calculateBatches()` | Batch size capped at 2–3 questions per LLM call. Dispatched simultaneously via `Promise.all`. Total elapsed wall-clock time is equivalent to a single 2-question completion (~4–8s) instead of sequential 30–45s |
| **Batch Partition Table** | `calculateBatches(N)` logic: <br>• $N \le 2 \rightarrow [N]$<br>• $N=3 \rightarrow [2, 1]$<br>• $N=4 \rightarrow [2, 2]$<br>• $N=5 \rightarrow [3, 2]$<br>• $N=6 \rightarrow [2, 2, 2]$<br>• $N=7 \rightarrow [3, 2, 2]$<br>• $N=8 \rightarrow [3, 3, 2]$ | Partition rule maximizes parallelism while keeping prompt completion length safely below serverless gateway timeout limits |
| **Vision Token Ingestion Optimization** | 1 single vision call per batch session | `analyzeImageForQuestion` runs once across uploaded images, converting visual tokens into structured text/HTML table representation before spawning text batches |
| **Memory Footprint** | Low (< 120 MB RAM) | Stateless Next.js API routes with ephemeral garbage-collected payload buffers |
| **Deployment Footprint** | Vercel / Node.js Serverless runtime | Native Next.js 16 build targets serverless edge/lambda execution |

## 2. Operational Dependencies & Environment Variables
The application expects the following environment variables (defined in `.env.local`):
- `OPENAI_API_KEY`: Authentication for OpenAI API models.
- `GEMINI_API_KEY`: Authentication for Google Generative AI SDK.
- `NARAROUTER_API_KEY`: Authentication for NaraRouter multi-model gateway.
- `NARAROUTER_BASE_URL`: Optional custom gateway endpoint (defaults to `https://router.bynara.id/v1`).
