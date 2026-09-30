# Engineering Evolution Narrative Position — AI Worksheets

## 1. Role in the Portfolio Narrative Arc

```
MATHEMATICS / SME
        ↓
01 — VM Copy Question Generator
        ↓
[02 — AI Worksheets]  <-- The Leap to Multi-Modal Systems & Physical Compilers
        ↓
03 — US Mathematics Item Bank
        ↓
04 — Curriculum Transformation Engine
        ↓
05 — Engineering Design Automation
        ↓
06 — AI Application Reliability
        ↓
AI ENGINEERING
```

## 2. Narrative Progression & Accumulated Engineering Insights
1. **Expanding the Boundary of Output**:
   In *VM Copy*, the output was pure JSON text (questions, options, and solution strings). In *AI Worksheets*, the system must produce **classroom-ready physical artifacts**: high-resolution vector diagrams, multi-page print-ready PDFs with pagination, and interactive 2D crossword puzzle boards.

2. **The Inadequacy of Pure Generative AI for Visual Precision**:
   AI image models cannot produce accurate mathematical geometry or readable coordinate numbers. Aadil Khurshid resolved this by treating visual generation as **programmatic compilation**: AI generates TikZ markup; deterministic TeX Live compilers (`pdflatex`) produce the visual geometry.

3. **Hybrid Generative-Algorithmic Architecture**:
   Crosswords cannot be laid out by language models. The system delegates lexical and pedagogical creativity to the LLM (generating clues and answers), but delegates spatial layout and intersection math to a deterministic backtracking algorithm.

4. **Multi-Model Orchestration**:
   Transitioning from single-model dependency to best-of-breed model selection:
   - GPT-4o via Portkey Gateway for structured pedagogical questions.
   - Gemini 2.0/3 Flash for raw LaTeX/TikZ syntax synthesis.
   - GPT-5.2 for nuanced crossword clues and adversarial verifier passes.
