# Disclosure Boundaries & IP Protection — Curriculum Transformation Engine

## 1. Proprietary & Confidential Boundaries

| Domain / Item | Classification | Public Disclosure Guidance |
| :--- | :--- | :--- |
| **Client / Employer Identity** | **CONFIDENTIAL IP** | Maintain generic attribution ("a large-scale educational publishing platform" or "multi-district standards ingestion"). |
| **API Gateways & Private Credentials** | **STRICT SECRET** | NEVER expose Portkey tokens, Anthropic API keys, or AWS S3 credentials. Mask all config examples. |
| **Internal District Formats & Files** | **CONFIDENTIAL DATA** | Do not publish proprietary raw district curriculum PDFs or customer-specific schemas. Use standard public state standards (e.g. California, Texas, Australia) for case illustrations. |
| **Dynamic Schema Derivation Architecture** | **PUBLIC ENGINEERING** | The design pattern of compiling sample CSVs into dynamic Pydantic models at runtime is original engineering architecture and may be presented in full technical depth. |
| **3-Tier Integrity Gate Logic** | **PUBLIC ENGINEERING** | The combination of LLM review, deterministic row guards, and post-extraction CSV audit is public technical methodology and should be highlighted. |
