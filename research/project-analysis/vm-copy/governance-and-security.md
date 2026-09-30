# Governance, Security & Prompt Discipline — VM Copy Question Generator

## 1. Security Vulnerabilities Fixed in History
- **CVE-2025-66478 Remediation**:
  - Commit `6354610`: *"Security fix: Update Next.js to 16.0.7 to resolve CVE-2025-66478 vulnerability"*.
  - Upgraded core Next.js packages to eliminate remote code execution and prototype pollution vectors in server actions/routing.

## 2. Input Sanitization & XSS Protection
- **DOMPurify Integration**: `dompurify` (`^3.3.0`) is utilized to sanitize dynamic HTML markup generated from table structures, dot plots, and mathematical expressions before rendering into the client DOM via React, protecting against injection attacks embedded in LLM completions or uploaded text.

## 3. Credential Protection & Secret Boundaries
- **Server-Side API Key Isolation**: All API key reads (`process.env.OPENAI_API_KEY`, `process.env.GEMINI_API_KEY`, `process.env.NARAROUTER_API_KEY`) occur strictly inside server-side route handlers (`app/api/*`) or backend utility libraries (`lib/*`). No API keys are prefixed with `NEXT_PUBLIC_` or exposed to browser clients.

## 4. Prompt Architecture & Pedagogical Governance
The repository contains comprehensive prompt documentation (`PROMPTS_DOCUMENTATION.md`) establishing hierarchical boundaries:
1. **Tier 1 (Universal Requirements)**: Strict format preservation, mathematical correctness verification, single CA verification, option count conformity, distractor generation rules (incorporating standard student misconceptions).
2. **Tier 2 (Domain-Specific Prompts)**: Mathematical algebraic questions, real-world context word problems, coordinate/geometric image-based problems.
3. **Tier 3 (Verification & Blind Solving)**: Adversarial persona instructed to solve problems blindly from scratch, isolate discrepancies, and reject hallucinated answers.
