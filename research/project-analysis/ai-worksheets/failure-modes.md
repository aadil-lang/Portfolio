# Failure Modes & Degradation Analysis — AI Worksheets

## 1. Observed & Documented Failure Taxonomy

| Failure Mode | Root Cause | Detection Mechanism | System Response / Recovery | Evidence in Codebase |
| :--- | :--- | :--- | :--- | :--- |
| **TikZ LaTeX Compilation Error** | LLM outputs invalid TikZ syntax or unclosed curly braces | `_run_pdflatex` checks returncode != 0 | Returns `None`, logs error, falls back to text-only question without crashing API | `tikz_images.py:126-140` |
| **TikZ Compiler Hanging / Infinite Loop** | Complex package macros or infinite TeX loops | `asyncio.wait_for` timeout in subprocess runner | Kills subprocess after timeout threshold | `tikz_images.py:_run_pdflatex` |
| **Crossword Clue Answer Leak** | LLM accidentally includes the target word inside the clue | 4-point verification prompt (`crossword_pipeline/prompts.py`) | Second LLM pass flags leak; word is rejected from candidate pool | `crossword_pipeline/prompts.py` |
| **Grid Placement Exhaustion** | Candidate words lack common letters to form required intersections | `builder.py:build_crossword` runs out of valid placements | Uses 1.4x over-generation buffer to ensure sufficient candidates; returns best valid subgrid | `crossword_pipeline/builder.py:35-70` |
| **Markdown Fences in Raw TeX** | Gemini wraps LaTeX output in ```` ```latex ... ``` ```` | `_clean_latex_output` regex scanner | Strips markdown fences, slices string between `\documentclass` and `\end{document}` | `tikz_images.py:84-93` |
| **Missing TeX Live / Poppler Binaries** | Host environment lacks `pdflatex` or `pdftoppm` | `shutil.which("pdflatex")` returns None | Falls back to well-known system paths or logs warning; skips diagram generation | `tikz_images.py:27-28` |
| **WeasyPrint PDF Font / CSS Overflow** | Excessive question text exceeding single-page boundary | CSS `@page` page-break rules in Jinja template | WeasyPrint automatically reflows to subsequent pages; page numbers updated | `pdf_export.py`, `worksheet_preview.jinja2` |

## 2. Recovery & Graceful Degradation Strategy
The system prioritizes teacher continuity: if a secondary enrichment (like a TikZ geometric figure) fails to compile, the question is rendered in plain text rather than failing the entire worksheet request.
