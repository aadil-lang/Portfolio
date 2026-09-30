# Technology Inventory & Dependencies — AI Worksheets

## 1. Backend Runtime Dependencies (Python 3.12)

| Package | Purpose | Architectural Rationale |
| :--- | :--- | :--- |
| `fastapi` | REST API Web Framework | High-performance asynchronous API routing and dependency injection |
| `uvicorn` | ASGI Web Server | Production async event loop runner |
| `pydantic` (v2) | Schema Validation & Serialization | Strict parsing of LLM JSON completions and request/response contracts |
| `sqlalchemy` (async) | ORM & Relational Layer | Async DB interactions with PostgreSQL 16 connection pooling |
| `asyncpg` | Async PostgreSQL Driver | Low-latency binary PostgreSQL driver |
| `alembic` | Database Migrations | Version-controlled database schema evolution |
| `redis` | Caching & Rate Limiting | Caches compiled TikZ hashes and throttles teacher generation endpoints |
| `portkey-ai` | Multi-LLM Gateway | Unified interface for routing requests, fallback handling, and telemetry |
| `google-generativeai` | Gemini SDK | Low-latency synthesis of raw LaTeX/TikZ code |
| `weasyprint` | HTML-to-PDF Engine | High-fidelity print layout rendering via CSS Paged Media standards |
| `reportlab` | Programmatic PDF Builder | Direct vector-level crossword puzzle and answer key layout generator |
| `jinja2` | Template Engine | Dynamic server-side compilation of worksheet preview HTML |
| `python-jose` / `passlib` | Auth & Security | JWT token generation and bcrypt password hashing |

## 2. Frontend Runtime Dependencies (React 18 / Vite 6)

| Package | Purpose | Architectural Rationale |
| :--- | :--- | :--- |
| `react`, `react-dom` | UI Engine | Declarative component hierarchy |
| `vite` (v6) | Build Tool & Bundler | Ultra-fast HMR and optimized production asset bundling |
| `@mui/material` (v6) | UI Component Library | Polished design system for educational dashboards and controls |
| `@tanstack/react-query` | Server State Management | Caching, deduplication, and background refetching of worksheet jobs |
| `zustand` | Client State Management | Minimalist reactive state for crossword gameplay, timer, and hints |
| `katex` | Mathematical Typography | Instant LaTeX formula rendering in client browser without heavy MathJax overhead |
| `framer-motion` | Micro-animations | Smooth card transitions, clue reveal effects, and completion celebratory confetti |

## 3. System Binaries & Container Infrastructure

| Binary / Service | Container Image | Purpose |
| :--- | :--- | :--- |
| `pdflatex` | TeX Live 2024+ | Compiles standalone `.tex` files containing TikZ, pgfplots, booktabs |
| `pdftoppm` | Poppler Utils | Converts vector `.pdf` output from `pdflatex` to 300-DPI `.png` files |
| `postgres:16-alpine` | Docker Hub | Relational data store for curriculum, worksheets, and student tracking |
| `redis:7-alpine` | Docker Hub | Fast key-value cache and job queue broker |
| `minio/minio` | Docker Hub | Local S3-compatible object store (swappable for Cloudflare R2) |
