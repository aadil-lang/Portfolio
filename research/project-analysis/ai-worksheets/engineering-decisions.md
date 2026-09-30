# Key Engineering Decisions — AI Worksheets

## ADR 01: Externalized LaTeX Subprocess Compilation for Diagrams
- **Context**: Standard image generation models (e.g. DALL-E, Midjourney, Stable Diffusion) fail catastrophically when tasked with rendering precise mathematical diagrams: coordinate numbers are distorted, lines fail to meet axes, and geometric angles are physically incorrect.
- **Decision**: Decouple visual diagram generation into two phases: (1) Prompt an LLM (Gemini) to write precise TikZ/PGFPlots code containing exact coordinates and mathematical equations; (2) Compile the generated LaTeX code using a local headless `pdflatex` binary, converting the result to a 300-DPI PNG via `pdftoppm`.
- **Consequences**: Diagrams achieve crisp, textbook-grade mathematical precision. However, it requires TeX Live and Poppler binaries installed in the environment or container, and necessitates subprocess timeouts to prevent LaTeX infinite compile loops.

## ADR 02: Three-Prompt Verification Pipeline for Crossword Generation
- **Context**: In gamified curriculum items like crosswords, an LLM generating both clues and answers simultaneously frequently leaks the answer inside the clue text (e.g. Clue: *"What is an acute angle?"*, Answer: `ACUTE`), invents invalid vocabulary, or drifts away from the requested TEKS subskill.
- **Decision**: Implement a sequential three-prompt separation:
  1. *Generation Prompt*: Proposes candidate words and pedagogical clues with 1.4x over-generation buffer.
  2. *Verification Prompt*: Independent LLM pass evaluating a strict 4-point checklist (correctness, answer leaks, subskill alignment, uniqueness).
  3. *Validation Layer*: Deterministic Pydantic sanitizer removing non-alphabetic characters and ensuring length fits within grid bounds.
- **Consequences**: Guarantees zero clue leakage and strict curriculum alignment before words reach the layout solver.

## ADR 03: Algorithmic Backtracking Grid Placement over AI Layout
- **Context**: LLMs cannot reliably generate 2D crossword grids. They hallucinate coordinate intersections, placing words that do not share intersecting letters or creating invalid adjacent collisions.
- **Decision**: Treat grid construction as a pure deterministic constraint problem. Implement `_can_place` and `_place` in Python (`builder.py`) with bounding-box collision checks, buffer zone validation, and intersection density scoring.
- **Consequences**: 100% physically valid crossword grids with zero intersecting letter collisions.

## ADR 04: Content-Hashed TikZ Caching
- **Context**: Repeated generation of identical or similar curriculum problems (e.g., standard right-angled triangle or coordinate grid) causes redundant TeX Live compilations, consuming CPU cycles and adding 2–4 seconds of latency per diagram.
- **Decision**: Compute an MD5 digest of the cleaned diagram description (`hashlib.md5(description.encode()).hexdigest()`) and store compiled images in a static cache directory.
- **Consequences**: Subsequent requests with identical diagram requirements return instant PNG URLs with 0ms compilation time and 0 API tokens consumed.
