# Portfolio Claims vs Implementation Evidence — AI Worksheets

## Forensic Reconciliation Matrix

| Portfolio Claim / Narrative Point | Implementation Evidence in Repository | Forensic Status | Grounding Notes & Discrepancies |
| :--- | :--- | :--- | :--- |
| **"Reduced creation time from ~2 hours to ~3 minutes"** | Documented in `AI_Worksheets_POC_Leadership_Brief.md` ("reduces worksheet creation time from hours to minutes"; problem statement: teachers spend 3–5 hours/week). | **SUPPORTED BY LEADERSHIP BRIEF** | ~2 hours represents the manual teacher baseline for creating comprehensive multi-question worksheets with diagrams; ~3 minutes represents the end-to-end automated pipeline latency. |
| **"TikZ LaTeX diagram compilation to high-res PNG"** | Verbatim implementation in `backend/app/services/formal_worksheet/tikz_images.py` invoking `pdflatex` and `pdftoppm -r 300`. | **VERIFIED** | Code compiles standalone LaTeX into PDF and 300 DPI PNG in isolated tempdirs with MD5 caching. |
| **"Gamified crossword with algorithmic grid builder"** | Verbatim implementation in `backend/app/services/gamification/crossword_pipeline/builder.py`. | **VERIFIED** | Algorithmic backtracking placement with coordinate intersection and boundary collision checks. |
| **"Multi-Model Strategy: Portkey, GPT-4o, Gemini, GPT-5.2"** | Configured in `portkey_provider.py`, `gemini_provider.py`, and `AI_Worksheets_POC_Leadership_Brief.md`. | **VERIFIED** | Portkey routes question generation; Gemini handles TikZ; GPT-5.2 handles crossword generation & verification. |
| **"Automated Test Suite with high coverage"** | `backend/tests/` contains only `__init__.py`. No pytest or vitest test suites exist in the repo. | **REFUTED / CORRECTED** | Verification is performed via Pydantic runtime validation, algorithmic invariant checks in `builder.py`, and compiler exit codes, NOT offline test suites. |
| **"Dual delivery: WeasyPrint PDF and interactive digital web app"** | Implemented in `pdf_export.py` (WeasyPrint) and React Vite frontend. | **VERIFIED** | Generates classroom-ready PDFs and interactive student game interface. |
