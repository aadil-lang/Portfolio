# Governance, Security & Prompt Discipline — AI Worksheets

## 1. Authentication & Tenant Authorization
- **JWT Protection**: Protected routes require valid JSON Web Tokens issued by `/api/v1/auth/login`.
- **Student Privacy & FERPA/COPPA Compliance**: Student tracking and assignment records store pseudonymized identifiers; no sensitive student PII is transmitted to external LLM providers.

## 2. Subprocess Security & Sandboxing
- **Headless LaTeX Compilation Risks**: Running LaTeX via subprocess can pose arbitrary file read/execution risks if untrusted packages are invoked (`\write18`).
- **Mitigation in Code**:
  - `TIKZ_SYSTEM_PROMPT` forbids external image files or custom macros: *"Output ONLY the LaTeX code... Do NOT use any external image files or packages that require special installation."*
  - Strict regex boundary slicing (`_clean_latex_output`) extracts only text between `\documentclass` and `\end{document}`.
  - Isolated ephemeral directories created via `tempfile.TemporaryDirectory()`.

## 3. Secret Boundaries & Gateway Governance
- All LLM access passes through unified provider adapters (`app/ai/*`) or the Portkey Gateway, enabling central rate limiting, budget caps, and audit logging.
- API keys (`OPENAI_API_KEY`, `GOOGLE_API_KEY`, `PORTKEY_API_KEY`) are managed strictly on the backend.
