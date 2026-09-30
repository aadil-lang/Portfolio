# Architecture & System Design — AI Worksheets

## 1. System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│               Frontend: React 18 + Vite 6 + Material UI 6              │
│  - Zustand State Store, TanStack Query, KaTeX math typesetting         │
│  - Interactive Crossword Game, Clue Navigator, Confetti & Timer        │
│  - Formal Worksheet Customizer (Font size, page size, answer key)      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API (JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Backend API: FastAPI (Python 3.12)                   │
│  - Async SQLAlchemy + Alembic, JWT Authentication, Rate Limiting       │
│  - Curriculum DB (TEKS standards + subskills targeting)                │
└───────────────┬────────────────────────────────────────┬───────────────┘
                │                                        │
                ▼                                        ▼
┌───────────────────────────────────┐    ┌───────────────────────────────┐
│     Formal Worksheet Pipeline     │    │  Gamification / Crossword     │
│ - Question Generator (Portkey     │    │  - Type Suggester (GPT-5.2)   │
│   Gateway -> GPT-4o)              │    │  - Candidate Gen (GPT-5.2)    │
│ - TikZ Diagram Engine (Gemini     │    │  - Verifier Pass (GPT-5.2)    │
│   2.0/3 Flash -> LaTeX)           │    │  - Schema Sanitizer           │
│ - Compilation Subprocess:         │    │  - Algorithmic Grid Placer    │
│   pdflatex -> pdftoppm -> 300 DPI │    │    (Deterministic Backtrack)  │
│ - PDF Exporter (WeasyPrint HTML)  │    │  - PDF Exporter (ReportLab)   │
└─────────────────┬─────────────────┘    └───────────────┬───────────────┘
                  │                                      │
                  ▼                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       Infrastructure Backplane                         │
│ - PostgreSQL 16 (Relational schemas, user assignments, analytics)      │
│ - Redis 7 (Session caching, LLM response caching, rate limiting)       │
│ - MinIO / Cloudflare R2 (S3 storage for rendered PDFs & diagrams)      │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Core Service Modules & Boundaries

| Module | Repository Path | Primary Responsibility | Key Interfaces | External Tools Used |
| :--- | :--- | :--- | :--- | :--- |
| **TikZ Diagram Engine** | `backend/app/services/formal_worksheet/tikz_images.py` | Converts text diagram specs to LaTeX, compiles to standalone PDF, renders high-res PNG | `generate_question_image`, `_compile_tikz_to_png` | TeX Live (`pdflatex`), Poppler (`pdftoppm`), Google Gemini |
| **Formal PDF Export** | `backend/app/services/formal_worksheet/pdf_export.py` | Renders HTML/Jinja2 template into print-ready PDF with embedded SVG/PNG figures | `export_worksheet_pdf` | WeasyPrint, Jinja2 |
| **Crossword Builder** | `backend/app/services/gamification/crossword_pipeline/builder.py` | Algorithmic 2D crossword grid solver with collision and intersection logic | `build_crossword`, `_can_place`, `_place` | Pure Python (deterministic backtracking) |
| **Crossword Verification** | `backend/app/services/gamification/crossword_pipeline/validation.py` | Multi-layer prompt enforcement, length checks, character filtering | `validate_crossword_entries` | Pydantic v2 |
| **AI Provider Abstraction** | `backend/app/ai/factory.py`, `portkey_provider.py` | Gateway routing between Portkey, OpenAI, Anthropic, and Gemini | `AIFactory.get_provider()` | Portkey SDK, OpenAI, Anthropic, Google Generative AI |
| **Database Persistence** | `backend/app/models/*`, `app/schemas/*` | Relational persistence for worksheets, assignments, questions, and student attempts | Async SQLAlchemy sessions | PostgreSQL 16, Alembic migrations |

## 3. The Dual Pipeline Design Pattern
- **Formal Pipeline**: Sequential generation $\rightarrow$ diagram extraction $\rightarrow$ subprocess compiler $\rightarrow$ WeasyPrint PDF layout. Geared toward high-throughput traditional classroom assessment.
- **Gamified Pipeline**: Candidate generation $\rightarrow$ secondary verification pass $\rightarrow$ coordinate grid layout solver $\rightarrow$ interactive canvas or ReportLab PDF. Geared toward engagement and formative retrieval practice.
