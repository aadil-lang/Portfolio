# Architecture & System Design — Curriculum Transformation Engine

## 1. System Topology Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Heterogeneous Ingestion Sources                 │
│  - PDF standards documents (pdf_parser.py)                             │
│  - Multi-page DOCX files & RTF syllabi                                 │
│  - Live State / District Webpages (Crawl4AI + Playwright headless)     │
│  - Approved Sample CSV Contract (default_sample_schema.csv)            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Schema Derivation & Extraction Orchestrator               │
│  - batch_runner.py: ChatBatchSpec parsing, parallel chunking           │
│  - schemas.py: SampleTransformationContract derivation                 │
│  - ThreadPoolExecutor concurrent workers                               │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌───────────────────────────────────────┐ ┌──────────────────────────────┐
│       Parallel Extraction Stage       │ │    Multi-Provider Gateway    │
│  - extractor.py: Chunk planning & map │ │ - Portkey Client             │
│  - Pre-extraction document slicing    │ │ - Claude 3.5 Sonnet          │
│  - Strict JSON schema extraction      │ │ - Google Gemini Flash        │
└───────────────────┬───────────────────┘ └──────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  3-Tier Integrity & Review Gate                        │
│                                                                        │
│   ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│   │ Tier 1: TransformationReviewer │  │ Tier 2: ExtractionCritic   │  │
│   │ (Evaluates & fixes rows;       │  │ (Semantic gate checking    │  │
│   │  replaces separate passes)     │  │  source contradictions)    │  │
│   └───────────────┬────────────────┘  └─────────────┬──────────────┘  │
│                   │                                 │                 │
│                   ▼                                 ▼                 │
│   ┌────────────────────────────────────────────────────────────────┐  │
│   │ Tier 3: Deterministic Row Guards (schemas.py:apply_row_guards) │  │
│   │ - 3-bucket grade_level check (Elementary, Middle, High)        │  │
│   │ - Enforce blank columns (l4/l5/standard_code)                  │  │
│   │ - Whitespace normalization & unique display code enforcement   │  │
│   └────────────────────────────────┬───────────────────────────────┘  │
└────────────────────────────────────┼───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Post-Processing & Audit Architecture                 │
│  - csv_audit.py: Concrete defect detection against source texts        │
│  - coverage.py: Document extraction completeness verification          │
│  - csv_finalization.py: S3 / local persistence of finalized CSVs       │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Core Service Modules & Boundaries

| Component | Path | Responsibility | Inputs | Outputs | Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Batch Runner** | `batch_runner.py` | Orchestrates multi-file extraction batches, maps sample contracts to target models | `ChatBatchSpec`, manifest URLs, input paths | `ChatBatchExecutionResult` | `concurrent.futures`, `pipeline`, `schemas` |
| **Schema Contract Engine** | `schemas.py` | Dynamically parses sample CSV into Pydantic models; applies deterministic row guards | Sample CSV file, raw extracted dictionaries | `TargetSchemaConfig`, validated row dicts | Pydantic v2 |
| **Extraction Engine** | `extractor.py` | Plans document slicing; dispatches chunk prompts to LLM; strips code fences | Parsed document text slices | Raw extracted item rows | `portkey_client` |
| **Transformation Reviewer** | `validation/reviewer.py` | Merged evaluate-and-fix pass: repairs minor defects and flags unresolvable errors | Extracted row, source document slice | `EvaluateAndFixResult` (repaired row, issues, fixes) | Pydantic v2 |
| **Extraction Critic** | `validation/critic.py` | Secondary gate validating factual fidelity and rejecting hallucinations | Repaired row, source slice | Pass/Reject verdict with citations | Portkey / LLM client |
| **CSV Auditor** | `csv_audit.py` | Adversarial post-extraction audit scanning for concrete defects and row contamination | Finalized CSV, original parsed documents | `CsvAuditResult` (audit CSV + JSON defect log) | `schemas`, `parsers` |
| **Web Scraper** | `web_scraper.py` | Bypasses anti-bot barriers to fetch dynamic curriculum web pages | Web URL | Markdown / Cleaned text | Crawl4AI, Playwright Chromium |
