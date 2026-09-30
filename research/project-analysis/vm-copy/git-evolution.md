# Git Evolution & Forensic Commit History — VM Copy Question Generator

## 1. Commit Chronology & Architectural Turning Points

The Git commit history reveals a clean chronological arc: from a simple prototype to an image-capable generator, then to performance batching, and finally to deterministic evaluation:

| Commit Hash | Date | Author | Commit Message | Architectural Meaning & Turning Point |
| :--- | :--- | :--- | :--- | :--- |
| `dacb64b` | 2025 | `Aadil <aadil@quizizz.com>` | Update package name from base-question-generator to vm-copy-question-generator | Repository rebranded from general question generator to specialized isomorphic copy item generator. |
| `961de1f` | 2025 | `Aadil <aadil@quizizz.com>` | Fix solution step formatting and image description mathematical accuracy | Early detection of math errors in step-by-step reasoning and image interpretations. |
| `c0db49c` | 2025 | `Aadil <aadil@quizizz.com>` | Add image analysis feature and strengthen SME notes compliance | Introduced multi-modal analysis to handle diagram-based math items. |
| `842b5da` | 2025 | `Aadil <aadil@quizizz.com>` | Add Gemini 3 Pro support and enhance base question solutions | Multi-provider expansion to leverage larger context windows and visual reasoning. |
| `3cbbe23` | 2025 | `Aadil <aadil@quizizz.com>` | Fix JSON parsing errors and add tabular format support for image descriptions | Replaced unstructured image text with structured HTML tables to prevent markdown parsing crashes. |
| `544a85a` | 2025 | `Aadil <aadil@quizizz.com>` | Add HTML table support and table builder for image-based questions | Robust structured data extraction for statistical plots (dot plots, histograms). |
| `bdc9bef` | 2025 | `Aadil <aadil@quizizz.com>` | Add geometric shape builder with improved triangle rendering and validation | Explicit geometric coordinate validation to prevent distorted figures. |
| `6354610` | 2025-12-06 | `Aadil <aadil@quizizz.com>` | Security fix: Update Next.js to 16.0.7 to resolve CVE-2025-66478 vulnerability | Vulnerability patching in production Next.js dependencies. |
| `0f33b08` | 2026-09-26 | `aadil-lang <aadil.khurshid95@gmail.com>` | Add NaraRouter integration with Agnes and other models | Flexible gateway integration for low-latency specialized model inference. |
| `197ab7a` | 2026-09-26 | `aadil-lang <aadil.khurshid95@gmail.com>` | Implement parallel question generation for faster batch creation | Replaced sequential monolithic prompts with concurrent micro-batches via `calculateBatches`. |
| `57c3417` | 2026-09-26 | `aadil-lang <aadil.khurshid95@gmail.com>` | Implement automated Eval Layer with deterministic validation and UI badging | **Foundational Architectural Milestone**: Introduced programmatic Tier-1 validation (`lib/eval-layer.ts`) and interactive UI badging. |

## 2. Forensic Analysis of Architectural Evolution
- **Phase 1: Basic Prompting**: Generating questions using raw OpenAI completions. Rapidly ran into malformed JSON and subtle mathematical errors.
- **Phase 2: Vision & Multimodal Extraction**: Handling diagrams by pre-converting them into HTML tables and coordinate geometry rather than trusting end-to-end visual generation.
- **Phase 3: Operational Optimization**: Mitigated latency timeouts through parallel micro-batch partitioning (`Promise.all`).
- **Phase 4: The Deterministic Discovery**: Realizing that prompt engineering cannot reliably guarantee structural invariants (4 options, 1 CA, no duplicates). Implemented the zero-cost TypeScript deterministic eval layer as an uncompromising gateway.
