# Failure Modes & Degradation Analysis — VM Copy Question Generator

## 1. Observed & Documented Failure Taxonomy

| Failure Mode | Root Cause | Detection Mechanism | System Response / Recovery | Evidence in Codebase |
| :--- | :--- | :--- | :--- | :--- |
| **Option Count Inconsistency** | Model outputs 3 or 5 options instead of requested 4 | `evaluateDeterministic` checks `question.options.length !== expectedOptionsCount` | Flags issue, deducts 25 points, displays warning badge in UI. In `/api/verify`, trims or pads array in-place. | `lib/eval-layer.ts:38-41`, `app/api/verify/route.ts:133-157` |
| **Missing / Multiple Correct Answers (CA)** | Model fails to mark logic as `CA` or marks two options as `CA` | `opt.logic.toUpperCase() === 'CA'` filter length check | Deducts 30–35 points; alerts SME that answer key is broken. | `lib/eval-layer.ts:44-53` |
| **Duplicate Distractor Options** | Arithmetic variation collapses two distinct choices into identical values | `seenTexts.has(rawText)` case-insensitive Set check | Deducts 20 points, names duplicate text specifically. | `lib/eval-layer.ts:60-64` |
| **Missing Distractor Misconception Logic** | Model provides options without educational rationale | Check `(!isCa && opt.logic.trim().length === 0)` | Deducts 5 points per empty distractor. | `lib/eval-layer.ts:70-74` |
| **SME Formatting Disobedience** | Model emits improper fraction (e.g. `7/3`) instead of mixed number (`2 1/3`) | Regex heuristic `^\d+\s+\d+\/\d+$` evaluated against SME notes | Deducts 20 points, flags formatting non-compliance. | `lib/eval-layer.ts:90-98` |
| **Markdown Fencing in JSON Output** | Model outputs ```` ```json ... ``` ```` wrapper | Regex / substring cleanup in parser | Strips markdown fences: `cleaned.replace(/```json\s*/g, '')` and locates outermost braces `{}`. | `lib/eval-layer.ts:145-149`, `app/api/verify/route.ts:110-120` |
| **Serverless Gateway Timeout** | Single-prompt generation of 10 items exceeding 30s | Parallel batch partitioning | Requests partitioned into max 2–3 questions per sub-batch executed via `Promise.all`. | `app/api/generate/route.ts:68-80` |
| **Upstream Model Unavailable / Quota Exhaustion** | NaraRouter or specific model API downtime | Catch block in `/api/verify` checking error code | Automated model fallback from `model` to `agnes-3-flash` or `gpt-4o`. | `app/api/verify/route.ts:162-171` |
| **Vision Analysis Crash on Large Images** | High-res image payload failure | `try / catch` in pre-analysis block | Degrades gracefully: sets `preAnalyzedImageContent = "[Image analysis failed...]"` and proceeds with text generation. | `app/api/generate/route.ts:60-65` |

## 2. Recovery & Abstention Patterns
- **Non-Destructive Degradation**: If an image analysis fails or an individual question fails deterministic validation, the system does not crash or abort the request. It returns the generated questions accompanied by explicit failure annotations and calculated scores.
- **Human-in-the-Loop Interactivity**: Flawed items are marked in amber/red on the frontend, giving curriculum reviewers the choice to either manually edit the question or trigger the single-click adversarial `/api/verify` repair loop.
