# Project 04: Curriculum Transformation Engine — Forensic Analysis Dossier

## Repository Metadata
- **Source Repository**: `Curriculum-Transformation` (`git@github.com:aadil-lang/Curriculum-Transformation.git`)
- **Local Read-Only Clone Path**: `C:\AI-Portfolio-Sources\curriculum-etl`
- **Primary Author**: Aadil Khurshid (`Aadil <aadil@quizizz.com>`)
- **Development Timeline**: July 2026
- **Technology Stack**:
  - Python 3.12+, FastAPI, Pydantic v2, Crawl4AI (Playwright headless Chromium scraping), ThreadPoolExecutor parallel workers.
  - Multi-LLM provider abstraction: Portkey Gateway routing to Claude 3.5 Sonnet (`claude-3-5-sonnet-20240620`) and Google Gemini.
  - Storage & Deployment: S3 / MinIO persistence, Docker containerization.
- **Dossier Status**: Complete forensic evidence extraction.

## Executive Summary
Curriculum Transformation Engine is an enterprise-scale document-to-CSV extraction and transformation system engineered to ingest heterogeneous curriculum source documents (PDFs, multi-page DOCX files, complex web indices, RTF files) and convert them into strictly validated, canonical state and district standards CSVs.

Rather than maintaining brittle, layout-specific regex scrapers for every state or school district curriculum format, the engine pioneers **dynamic schema derivation**: an approved sample CSV is ingested as a programmatic transformation contract, deriving target fields, hierarchy depths (L1 to L5), and formatting constraints on the fly. Ingestion runs via high-throughput concurrent chunk extraction, passes through a two-stage LLM evaluation gate (Reviewer and Critic), enforces deterministic row guards, and concludes with an adversarial automated CSV audit against source documents (`csv_audit.py`).

## Dossier Index
1. [Architecture & System Design](./architecture.md)
2. [Runtime Flow & Execution Lifecycle](./runtime-flow.md)
3. [Technology Inventory & Dependencies](./technology-inventory.md)
4. [Key Engineering Decisions](./engineering-decisions.md)
5. [Failure Modes & Degradation Analysis](./failure-modes.md)
6. [Validation, Testing & Guardrails](./validation-and-testing.md)
7. [Performance & Operational Profile](./performance-and-operations.md)
8. [Governance, Security & Prompt Discipline](./governance-and-security.md)
9. [Git Evolution & Forensic History](./git-evolution.md)
10. [Engineering Evolution Narrative Position](./engineering-evolution.md)
11. [Portfolio Claims vs Implementation Evidence](./portfolio-claims.md)
12. [Unknowns & Investigation Gaps](./unknowns.md)
13. [Disclosure Boundaries & IP Protection](./disclosure-boundaries.md)
