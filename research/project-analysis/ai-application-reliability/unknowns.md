# Unknowns & Investigation Gaps — AI Application Reliability

## 1. Technical Unknowns & Investigation Gaps

1. **Multi-Tenant Cloud Deployment**:
   - The current repository is optimized for local-first execution (local Ollama inference, local SQLite memory, local Playwright). A distributed multi-tenant Kubernetes deployment architecture is referenced in future slice roadmap.
   - *Impact*: Document clearly as an authentic local-first reliability platform designed for local developer and CI/CD agent workflows.

2. **Longitudinal Flakiness Telemetry Across Third-Party Apps**:
   - High-coverage experimental results exist for the primary dogfooded target (VM Copy Question Generator). Empirical test telemetry across dozens of third-party public web applications is actively expanding.
