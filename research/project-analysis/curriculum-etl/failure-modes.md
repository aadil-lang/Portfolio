# Failure Modes & Degradation Analysis — Curriculum Transformation Engine

## 1. Observed & Documented Failure Taxonomy

| Failure Mode | Root Cause | Detection Mechanism | System Response / Recovery | Evidence in Codebase |
| :--- | :--- | :--- | :--- | :--- |
| **Hierarchy Depth Truncation** | Multi-level standards (e.g. `l1` down to `l4`) collapsed into single field | `TransformationReviewer` checks hierarchy continuity | Reconstructs parent-child relationship from preceding chunk context | `validation/reviewer.py`, Commit `e36541c` |
| **Row Contamination / Noise Ingestion** | PDF headers, footers, or page numbers extracted as standards rows | `csv_audit.py` checks for document noise patterns | Discards row; marks as invalid artifact in audit log | `csv_audit.py:48-52` |
| **Provider 5xx / Rate Limit Deadlock** | Concurrent batch calls overwhelming Anthropic/Portkey quotas | Exception handler in `portkey_client.py` | Exponential backoff with jitter; merged review pass reduces call volume | Commit `252d06f` |
| **Grade Level Categorical Drift** | Model outputs `Grade 5` instead of required canonical `Elementary School` | `schemas.py:normalize_grade_level` lookup table | Deterministically maps string to one of 3 canonical buckets | `schemas.py:normalize_grade_level` |
| **Over-Extraction into Blank Columns** | Model hallucinates codes into reserved blank columns (`czi_standard_code`) | `apply_row_guards` checks against `DRAFT_ALWAYS_BLANK_COLUMNS` | Programmatically overwrites column with empty string | `schemas.py:apply_row_guards`, Commit `1c8ad37` |
| **Cloudflare Anti-Bot Blocking on Web Ingestion** | State education websites intercepting headless scrapers | HTTP 403 / challenge response | `crawl4ai` launches Playwright headless Chromium with real JS evaluation | `web_scraper.py`, `README.md:Setup` |

## 2. Recovery & Dead-Letter Handling
When an extracted row cannot be reconciled against the source document by `TransformationReviewer`, it is written to `manual_review.json` with an explicit diagnostic note rather than corrupted into the final CSV.
