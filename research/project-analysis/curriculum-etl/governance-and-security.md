# Governance, Security & Prompt Discipline — Curriculum Transformation Engine

## 1. Provenance & Auditability
- **Traceable Source Slices**: Every row carries an internal provenance reference to the exact page, section heading, or URL slice from which it was extracted.
- **Audit Trails**: `csv_audit.py` generates structured JSON reports detailing every flagged defect with direct citations to offending text.

## 2. Web Scraping Compliance
- Web crawling uses `crawl4ai` with controlled request rate limiting to respect state educational server capacities.
- Only public educational standards indices are targeted.

## 3. Secret Protection
- Credentials for Portkey, Anthropic, and S3 are managed through environment variables (`Settings` in `config.py`) and isolated from client payloads.
