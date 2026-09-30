# Git Evolution & Forensic Commit History — Curriculum Transformation Engine

## 1. Commit Chronology & Turning Points

The Git commit history reveals an intensive engineering progression focused on scaling extraction reliability:

| Commit Hash | Date | Author | Message & Architectural Meaning |
| :--- | :--- | :--- | :--- |
| `18f6482` | 2026-07 | `Aadil <aadil@quizizz.com>` | Lowercase L3/L4/L5 columns to l3/l4/l5 (standardizing schema tokens) |
| `9872572` | 2026-07 | `Aadil <aadil@quizizz.com>` | Seed the preview with a blank template of the default columns |
| `234742f` | 2026-07 | `Aadil <aadil@quizizz.com>` | Add web index expansion, .rtf support, and program filter |
| `e36541c` | 2026-07 | `Aadil <aadil@quizizz.com>` | Harden extraction: fix truncation, parallelize, add fix-loop QC |
| `252d06f` | 2026-07 | `Aadil <aadil@quizizz.com>` | Fix hangs and provider 5xx handling; merge review+critic |
| `fd0260d` | 2026-07 | `Aadil <aadil@quizizz.com>` | Lower default review batch size 20 -> 10 to prevent model timeout |
| `f5490e8` | 2026-07 | `Aadil <aadil@quizizz.com>` | Make final CSV audit opt-in (default off) for faster throughput |
| `1c8ad37` | 2026-07 | `Aadil <aadil@quizizz.com>` | Enforce sample-blank columns stay empty in output |
| `5c4143e` | 2026-07 | `Aadil <aadil@quizizz.com>` | Add Vibe deployment: FastAPI wrapper, S3 persistence, and pure-pip path |
| `71d25a3` | 2026-07 | `Aadil <aadil@quizizz.com>` | Add coverage enforcement, external-CSV review/fix, and doc-level review slicing |
| `f88b3d3` | 2026-07 | `Aadil <aadil@quizizz.com>` | Add row guards, two-mode review, sticky sheet link, and preview grid fixes |
| `5db8b0b` | 2026-07 | `Aadil <aadil@quizizz.com>` | Update extraction review UI and schema |

## 2. Forensic Analysis of Architecture Evolution
1. **From Brittle Regex to Dynamic Schema Contracts**: Recognizing that custom parsers cannot scale to 50 states, the author introduced sample CSV contract compilation.
2. **Hardening Against LLM Drift**: Commits `1c8ad37` and `f88b3d3` added deterministic programmatic row guards because prompts alone could not prevent models from populating reserved columns.
3. **Throughput & Pipeline Optimization**: Commit `252d06f` merged review and critic passes, and commit `fd0260d` reduced review batch sizes from 20 to 10 to resolve provider 5xx hanging errors.
