# Unknowns & Investigation Gaps — VM Copy Question Generator

## 1. Unresolved Technical Questions & Missing Artifacts

1. **Benchmark Datasets & Rejection Rates**:
   - The repository implements `lib/eval-layer.ts` with scoring and deductions, but does not commit an empirical benchmark log (e.g. JSON or CSV recording historical failure rates across 1,000 live generations).
   - *Impact*: Exact statistical rejection rates (e.g. "reduced SME rejection rate by 70%") cannot be verified from repository commits alone and should be classified as SME field observations rather than automated benchmark artifacts.

2. **Absence of Offline CI/CD Test Pipeline**:
   - There are no GitHub Actions workflows (`.github/workflows`) or Jest/Vitest test configurations committed to the repository.
   - *Impact*: Testing relies on compile-time static type analysis and runtime production assertion execution.

3. **NaraRouter Upstream Provider Specifics**:
   - The repository references `https://router.bynara.id/v1` and models like `agnes-3-flash` and `space-bunny-alpha`. The underlying model infrastructure behind NaraRouter's private endpoints is not documented in public open-source repos.
