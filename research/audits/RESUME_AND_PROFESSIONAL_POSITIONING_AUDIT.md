# RESUME AND PROFESSIONAL POSITIONING AUDIT
**Forensic Investigation of Formal Career Records, Resume Artifacts & Professional Positioning Fidelity**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Resume & Career Chronology Auditor, Senior AI/ML Engineer
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** READ-ONLY AUDIT (Evidence-Grounded Forensic Assessment)

---

## 1. EXECUTIVE SUMMARY & POSITIONING DIRECTIVE

The engineer's preferred professional positioning is:
**AI Engineer | Python | LLM & Agentic Systems | Full-Stack**

This audit evaluates the formal resume implementation across `data/canonical/resumeData.ts`, `scripts/generate_resume_pdf.py`, `scripts/generate_resume_pdf.js`, and the rendered `public/resume.pdf`.

The audit specifically verifies whether the resume maintains strict boundaries between:
1. **Wayground Mathematics SME (Jan 2024 — Dec 2025)**
2. **Wayground AI Engineer, AI/ML Team (Jan 2026 — Jul 2026)**
3. **Independent AI Engineering & Research (Aug 2026 — Present)**

---

## 2. SECTION-BY-SECTION RESUME AUDIT

### 2.1 Header & Contact Block
- **Title Stated:** `AI Engineer | Python | LLM & Agentic Systems | Full-Stack`
- **Location:** `Varanasi, UP, India` (verified in `data/profile.ts:11`, `structuredProfile.ts:28`). Note: Availability badges referencing "Remote & Hyderabad" were previously removed from the home page per user instruction and are correctly excluded from the canonical resume header.
- **Contact Channels:** Email (`aadil.khurshid95@gmail.com`), Phone (`+91-7973949541`), LinkedIn, GitHub (`github.com/aadil-lang`), Portfolio URL (`portfolio-ecru-five-5vd5okcvgi.vercel.app`).
- **Verdict:** **VERIFIED & ACCURATE**.

### 2.2 Professional Summary
- **Text:**
  *"AI Engineer with around 1 year of hands-on AI engineering experience and 4 years of overall professional experience spanning AI application development, backend engineering, full-stack development, and mathematics domain expertise. Experienced in building LLM-powered applications, RAG pipelines, and agentic workflows using Python, FastAPI, LangGraph, Playwright, and modern LLM tooling. Focused on combining LLM capabilities with deterministic logic, structured workflows, validation, automated testing, and human-in-the-loop controls to build reliable AI systems from architecture through implementation and deployment."*
- **Audit Findings:**
  - Accurately balances the total professional timeline (~4 years: 2021–2022 early math SME + 2024–2025 Wayground SME + 2026 AI Engineer & Independent research) with the focused AI engineering timeline (~1 year: late 2025 VM Copy through 2026 AI/ML team and post-Wayground systems).
  - Does NOT overstate AI engineering seniority.
  - Highlights core engineering philosophy: deterministic logic, structured workflows, and human-in-the-loop controls.
- **Verdict:** **VERIFIED & ACCURATE**.

### 2.3 Technical Skills Matrix
- **Structured Categories (6 Domains):**
  1. *AI & LLM Systems:* LLMs, LangChain, LangGraph, RAG, Agentic Workflows, Tool Calling, LLM Orchestration, Prompt Engineering, Structured Outputs, Vision AI.
  2. *Backend & Python:* FastAPI, Python 3.12, Node.js, Express.js, REST APIs, Pydantic v2, Pandas, NumPy, JWT Authentication.
  3. *Frontend & Web:* React 19, Next.js 16 (App Router), TypeScript 5, Vite, Tailwind CSS, KaTeX, HTML5/CSS3.
  4. *Testing & Automation:* Playwright (E2E & Visual QA), pytest, Vitest, Automated Testing, API Verification, Git/GitHub.
  5. *Data & Infra:* MongoDB, MongoDB Atlas Vector Search, SEC EDGAR API, Docker, Docker Compose, TeX Live (pdflatex).
  6. *AI Dev Tooling:* Cursor, Claude Code, OpenAI Codex, Antigravity, Ollama, Model Context Protocol (MCP).
- **Audit Findings:** Every listed technology is backed by active usage in at least one repository system. No buzzword inflation.
- **Verdict:** **VERIFIED & ACCURATE**.

### 2.4 Professional Experience
- **Entry 1: AI Engineer — AI/ML Team | WAYGROUND Inc (Jan 2026 – Jul 2026 | Bengaluru, India)**
  - *Projects Highlighted:*
    - `Curriculum Transformation Engine`: Map-Reduce ETL pipeline, Claude 3.5 Sonnet, dynamic schema derivation, layered reviewer/critic validation.
    - `AI Worksheets Product POC`: TEKS-aligned educational content synthesis, headless TeX Live (`pdflatex/pdftoppm`), deterministic 2D crossword and maze backtracking solvers.
    - `US Mathematics Item Bank Generation`: Image-generation workstream ownership, vision evaluation workflows, Upper Elementary pipeline tuning, Integer Linear Programming (ILP) stratified sampling, and review tool UI fixes.
  - *Audit Finding:* Accurately captures formal AI/ML team tenure and preserves the collaborative nature of the Item Bank project.
- **Entry 2: Subject Matter Expert — Mathematics | WAYGROUND Inc (Jan 2024 – Dec 2025 | Bengaluru, India)**
  - *Responsibilities:* US state standards alignment, mathematical accuracy, solution quality, KaTeX formatting, Figma educational diagrams.
  - *Project Highlighted:* `VM Copy Question Generator` (built late 2025 as the catalyst leading into the AI/ML team).
  - *Audit Finding:* Cleanly separates the SME role from the software engineering role while giving proper credit to the self-initiated VM Copy build that prompted the promotion.
- **Verdict:** **VERIFIED & ACCURATE**.

### 2.5 Personal & Hackathon AI Projects
- *Ask Aadil* (Personal, Sep 2026): Hybrid retrieval, deterministic state routing, bitwise draft integrity, 172 automated test assertions.
- *Loom AI* (Humanity Founders Hackathon, Aug 2026): Clean architecture B2B textile marketplace, LangGraph procurement agent, HITL checkout approvals.
- *Atlas AI* (Humanity Founders Hackathon, Aug 2026): Telegram-first SEC EDGAR RAG copilot, vector search, background alert worker.
- *Solace AI* (Solace Hackathon, Nov 2026): Android wellness companion, pre-LLM crisis screening, consent-based memory, SSE single-POST delivery guard.
- *Audit Finding:* All four projects are correctly attributed as independent hackathon or personal builds post-Wayground.
- **Verdict:** **VERIFIED & ACCURATE**.

### 2.6 Earlier Experience & Education
- **Earlier Experience:** Digipplus (QA/QC Specialist, Jun 2022 – Sep 2022), InhaltMart (SME Math, Oct 2021 – Feb 2022), Graveiens (Advanced Math Content Developer, May 2021 – Oct 2021).
- **Education Table:**
  - B.Tech (Hons.) in Mechanical Engineering — Lovely Professional University, Punjab (2013–2017 | CGPA: 7.66/10)
  - Class XII (CBSE) — Manas Convent School, Mughalsarai (2013 | 73.2%)
  - Class X (CBSE) — Sunbeam School, Mughalsarai (2011 | CGPA: 9.40)
- **Audit Finding:** Educational credentials match canonical verification records in `data/canonical/structuredProfile.ts:32-52`.
- **Verdict:** **VERIFIED & ACCURATE**.

---

## 3. RESUME-TO-PORTFOLIO CONSISTENCY CHECK
- **Dates Alignment:** The resume maintains exact date consistency with `data/experience.ts`.
- **Attribution Alignment:** No independent project is claimed as company work; team systems (Item Bank) are properly contextualized.
- **Wording Quality:** The resume presents a disciplined, credible engineering profile that withstands rigorous technical due diligence.

