# GITHUB EVIDENCE AND REPOSITORY AUDIT
**Forensic Audit of External Code Repositories, Public/Private Boundaries & Artifact Provenance**

- **Audit Date:** 2026-11-14
- **Auditor Team:** GitHub Repository Forensics Engineer, Principal Software Architect, Senior AI/ML Engineer
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** READ-ONLY AUDIT (Evidence-Grounded Forensic Assessment)

---

## 1. EXECUTIVE SUMMARY & REPOSITORY REGISTRY

The portfolio references nine primary GitHub repositories across `data/projects.ts` and `lib/rag/sources/githubAdapter.ts`. This audit checks:
1. Valid repository ownership (`aadil-lang` vs `aadilkhurshid`).
2. Correct mapping between portfolio project slugs and remote repositories.
3. Strict public vs. private repository boundary enforcement.
4. Absence of proprietary employer secrets, internal credentials, or proprietary question stores.

---

## 2. REPOSITORY MAPPING AND PROVENANCE MATRIX

| Project Slug | Canonical System Title | Documented GitHub URL | Account Owner | Visibility | Tests Present | Tech Stack Match | Provenance Verdict |
|---|---|---|---|---|---|---|---|
| `vm-copy` | VM Copy Question Generator | `https://github.com/aadil-lang/vm-copy-question-generator` | `aadil-lang` | Public | Yes (TypeScript assertions, `lib/eval-layer.ts`) | Next.js 16, TypeScript, Portkey, OpenAI | **VERIFIED PRIMARY EVIDENCE** |
| `ai-worksheets` | AI Worksheets Product POC | `https://github.com/aadil-lang/Worksheets-MS-Formal-Gamified` | `aadil-lang` | Public | Yes (Subprocess compilation gates, 2D solvers) | FastAPI, Python 3.12, React 18, Vite 6, TeX Live | **VERIFIED PRIMARY EVIDENCE** |
| `curriculum-etl` | Curriculum Transformation Engine | `https://github.com/aadil-lang/Curriculum-Transformation` | `aadil-lang` | Public | Yes (Pydantic contract schemas, CSV audits) | Python 3.12, Claude 3.5 Sonnet, Pydantic, Pandas | **VERIFIED PRIMARY EVIDENCE** |
| `math-item-bank` | US Mathematics Item Bank Pipeline | `null` (Unlinked in `data/projects.ts:196`) | N/A (Wayground Corporate Repo) | **Proprietary / Private** | Internal Team Harness | Python, LangGraph, SVG, TikZ, ILP | **VERIFIED BOUNDARY:** Correctly unlinked; no internal team code leaked. |
| `design-automation` | Engineering Design Automation (EDA CAD) | `https://github.com/aadil-lang/Engineering-design-automation` | `aadil-lang` | Public | Yes (424 pytests across 28 suites) | Python 3.12, FastAPI, OpenCascade, CadQuery, NumPy | **VERIFIED PRIMARY EVIDENCE** |
| `ai-reliability` | AI Application Reliability Platform | `https://github.com/aadil-lang/ai-engineering-lab` | `aadil-lang` | Public | Yes (158 test suites + 47 governance tests) | Python 3.12, Playwright, MCP, Ollama | **VERIFIED PRIMARY EVIDENCE** |
| `loom-ai` | Loom AI — B2B Textile Marketplace | `https://github.com/aadil-lang/loom-ai` | `aadil-lang` | Public | Yes (Playwright integration & API tests) | Next.js 16, Express, MongoDB Atlas, LangGraph | **VERIFIED PRIMARY EVIDENCE** |
| `atlas-ai` | Atlas AI — Financial Copilot & SEC RAG | `https://github.com/aadil-lang/Atlas-AI` | `aadil-lang` | Public | Yes (59 MVP tests, 178 full pytests) | Python 3.12, FastAPI, LangGraph, SEC EDGAR | **VERIFIED PRIMARY EVIDENCE** |
| `ask-aadil` | Engineering Portfolio & Ask Aadil | `https://github.com/aadil-lang/portfolio` | `aadil-lang` | Public | Yes (172 core hardening checks, 327 assertions) | Next.js 16, React 19, TypeScript 5, Hybrid RAG | **VERIFIED PRIMARY EVIDENCE** |
| `solace-ai` | Solace AI — Mindful Wellness Companion | `https://github.com/aadil-lang/solace-ai` | `aadil-lang` | Public | Yes (52 backend pytests + 50 mobile checks) | React Native, Expo 58, FastAPI, LangGraph, Gemini | **VERIFIED PRIMARY EVIDENCE** |
| `ocr-evaluator` | OCR Evaluation & Robustness Platform | `https://github.com/aadil-lang/OCR-Evaluator` | `aadil-lang` | Public | Yes (134 backend pytests + 20 UI assertions) | Python 3.12, FastAPI, Tesseract OCR, React | **VERIFIED PRIMARY EVIDENCE** |

---

## 3. GITHUB ACCOUNT DUALITY DISCREPANCY & RESOLUTION
- **Finding:** Two active GitHub accounts are referenced across the portfolio:
  1. `aadil-lang` (Primary engineering repositories holding source code for all public systems).
  2. `aadilkhurshid` (Earlier personal account referenced in `data/profile.ts:7` and `data/canonical/sourceConflicts.ts:31-40`).
- **Security & Privacy Audit:** Neither account exposes internal corporate API keys, private tokens, or proprietary question stores. All environment variables in public repos use `.env.example` templates.
- **Remediation Recommendation:** Ensure all public portfolio links and resume headers point consistently to `https://github.com/aadil-lang`, with `aadilkhurshid` documented in `sourceConflicts.ts` as a legacy handle.

