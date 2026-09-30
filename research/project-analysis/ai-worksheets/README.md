# Project 02: AI Worksheets — Forensic Analysis Dossier

## Repository Metadata
- **Source Repository**: `Worksheets-MS-Formal-Gamified` (`git@github.com:aadil-lang/Worksheets-MS-Formal-Gamified.git`)
- **Local Read-Only Clone Path**: `C:\AI-Portfolio-Sources\ai-worksheets`
- **Primary Author**: Aadil Khurshid (`Aadil <aadil@quizizz.com>`)
- **Internal / Working Project Title**: *Wayground AI Worksheets* (POC Leadership Brief, March 2026)
- **Technology Stack**:
  - **Frontend**: React 18, Vite 6, TypeScript, Material UI 6, Zustand, TanStack Query, KaTeX, Framer Motion.
  - **Backend**: FastAPI (Python 3.12), SQLAlchemy (Async), Alembic, Pydantic v2.
  - **Data & Caching**: PostgreSQL 16, Redis 7, MinIO (S3-compatible object storage).
  - **Generative AI & Gateways**: Portkey Gateway (GPT-4o), Google Generative AI (Gemini 2.0/3 Flash), OpenAI direct (GPT-5.2).
  - **Deterministic Rendering & Compilers**: TeX Live (`pdflatex`), Poppler (`pdftoppm`), WeasyPrint, ReportLab, algorithmic crossword grid placer.
- **Dossier Status**: Complete forensic evidence extraction.

## Executive Summary
AI Worksheets represents a major architectural progression beyond single-prompt question generation: the construction of a full-scale, multi-modal, dual-pipeline educational authoring platform. The system generates curriculum-aligned learning materials across two distinct paradigms:
1. **Formal Worksheets**: 5 question types (MCQ, MSQ, Fill-in-Blank, True/False, Short Answer) mapped to Bloom's Taxonomy, integrated with automated TikZ diagram synthesis (compiling LaTeX to PDF to high-resolution PNG) and WeasyPrint PDF layout generation.
2. **Gamified Worksheets**: Crossword puzzles, Maze Trails, and Mystery Rooms where curriculum learning objectives and vocabulary are synthesized via a three-prompt pipeline (Generate $\rightarrow$ Verify $\rightarrow$ Validate) and mapped onto a coordinate grid via a custom deterministic backtracking builder.

The project demonstrates the fusion of multi-model AI routing with deterministic physical and layout engines: using LLMs for conceptual pedagogical drafting, but delegating all diagrammatic rendering, intersection geometry, and document assembly to TeX Live, Poppler, and algorithmic placement code.

## Dossier Index
1. [Architecture & System Design](./architecture.md)
2. [Runtime Flow & Execution Lifecycle](./runtime-flow.md)
3. [Technology Inventory & Dependencies](./technology-inventory.md)
4. [Key Engineering Decisions](./engineering-decisions.md)
5. [Failure Modes & Degradation Analysis](./failure-modes.md)
6. [Validation, Testing & Guardrails](./validation-and-testing.md)
7. [Performance & Operational Profile](./performance-and-operations.md)
8. [Governance, Security & Prompt Discipline](./governance-and-security.md)
9. [Git Evolution & Forensic History](./git-evolution.md)
10. [Engineering Evolution Narrative Position](./engineering-evolution.md)
11. [Portfolio Claims vs Implementation Evidence](./portfolio-claims.md)
12. [Unknowns & Investigation Gaps](./unknowns.md)
13. [Disclosure Boundaries & IP Protection](./disclosure-boundaries.md)
