# Performance & Operations — Curriculum Transformation Engine

## 1. Concurrency & Throughput Profile

| Dimension | Implementation Evidence | Operational Value |
| :--- | :--- | :--- |
| **Concurrent Extraction Workers** | `ThreadPoolExecutor` in `batch_runner.py` and `pipeline.py` | Distributes document chunk extraction across parallel threads |
| **Review Batch Size Tuning** | Commit `fd0260d`: *"Lower default review batch size 20 -> 10"* | Lowered batch size from 20 to 10 rows to prevent LLM context saturation and API timeouts |
| **Review Call Consolidation** | Commit `252d06f`: *"Merge review+critic"* | Cut total API calls by 50% across every processed curriculum batch |
| **Document Slicing Strategy** | `build_review_doc_slice()` in `extractor.py` | Extracts localized slices (500–1500 tokens) surrounding each candidate item rather than injecting the entire 100-page PDF into prompt context |

## 2. Deployment Architecture
- **Dockerized Container**: Bakes Python 3.12, system libraries, and headless Chromium via Playwright into a single self-contained image.
- **S3 Object Persistence**: Raw inputs and processed CSV artifacts are synchronized to S3/MinIO storage buckets via `s3_persistence.py`.
