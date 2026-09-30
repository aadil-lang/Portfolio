# Unknowns & Investigation Gaps — Curriculum Transformation Engine

## 1. Unresolved Technical Questions & Missing Artifacts

1. **Standalone `claude_map_reduce.py` File**:
   - `README.md` explicitly lists `claude_map_reduce.py: high-performance Claude Map-Reduce extraction path`, but the file is not currently tracked on the `main` branch (its parallel chunking logic is currently embedded directly inside `batch_runner.py` and `pipeline.py`).
   - *Impact*: The architectural Map-Reduce concept is verified in `batch_runner.py`, but the standalone module may have been refactored or merged in earlier commit history.

2. **Total Processed Volume Benchmarks**:
   - The codebase contains the full pipeline capable of high-throughput extraction, but lacks committed production run manifests documenting the total historical volume (e.g. total number of state standards transformed across enterprise operations).
