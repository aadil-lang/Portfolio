# Runtime Flow & Execution Lifecycle — Curriculum Transformation Engine

## 1. End-to-End Extraction Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Curriculum Engineer
    participant Batch as batch_runner.py
    participant Parser as Parsers Router (PDF/DOCX/Web)
    participant Schema as schemas.py (Contract Builder)
    participant LLM_Map as Claude / Gemini Extractor
    participant Reviewer as validation/reviewer.py
    participant Guard as Deterministic Row Guards
    participant Auditor as csv_audit.py
    participant Sink as Final CSV & S3 Storage

    Admin->>Batch: Submit Batch Spec (Input Docs + Sample CSV)
    Batch->>Schema: Derive SampleTransformationContract(sample_csv)
    Schema-->>Batch: TargetSchemaConfig (fields, required blanks, regex rules)

    par Parse Input Documents
        Batch->>Parser: parse_input(PDF / DOCX / URL)
        Parser-->>Batch: ParsedDocument (text slices, headings, tables)
    end

    rect rgb(240, 245, 255)
        note over Batch,LLM_Map: Parallel Extraction Stage
        Batch->>Batch: Chunk document into logical structural segments
        loop For each chunk in parallel (ThreadPoolExecutor)
            Batch->>LLM_Map: Extract rows matching dynamic schema contract
            LLM_Map-->>Batch: Raw Extracted JSON Rows
        end
    end

    rect rgb(255, 245, 240)
        note over Batch,Guard: 3-Tier Validation & Integrity Stage
        loop For each extracted row
            Batch->>Reviewer: review_and_fix(row, parsed_document_slice)
            Reviewer->>Reviewer: Detect schema mismatches / missing parent codes
            Reviewer-->>Batch: EvaluateAndFixResult (repaired row + applied fixes)
            
            Batch->>Guard: apply_row_guards(repaired_row)
            Guard->>Guard: Validate grade_level in {Elementary, Middle, High}
            Guard->>Guard: Enforce sample-blank columns stay blank
            Guard->>Guard: Clean whitespace & deduplicate display codes
            Guard-->>Batch: Guarded Canonical Row
        end
    end

    Batch->>Sink: Append rows to output CSV
    
    rect rgb(245, 255, 240)
        note over Batch,Auditor: Post-Transformation Audit Stage
        opt Audit Enabled
            Batch->>Auditor: audit_csv(output_csv, original_source_docs)
            Auditor->>Auditor: Check concrete defects (source contradiction, contamination)
            Auditor-->>Batch: CsvAuditResult (defect log + pass rate)
        end
    end

    Batch-->>Admin: Finalized Clean CSV + Audit Report
```

## 2. Dynamic Schema Derivation Workflow
1. **Sample Ingestion**: The system reads `default_sample_schema.csv` (or a custom approved sample CSV).
2. **Contract Synthesis**: `load_schema_config()` extracts:
   - Header column order
   - Hierarchy definitions (e.g. `l1` Domain, `l2` Cluster, `l3` Standard, `l4` Sub-indicator)
   - Forced blank columns (`DRAFT_ALWAYS_BLANK_COLUMNS`)
   - Grade level mapping dictionaries (`GRADE_LEVEL_NAMING_RULE`).
3. **Dynamic Pydantic Generation**: Schema structures are compiled into dynamic Pydantic models at runtime via `create_model()`, enforcing field types without hardcoding a Python class for each new state format.
