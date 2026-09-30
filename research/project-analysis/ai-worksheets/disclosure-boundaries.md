# Disclosure Boundaries & IP Protection — AI Worksheets

## 1. Proprietary & Confidential Boundaries

| Domain / Item | Classification | Disclosure Boundary & Guidance |
| :--- | :--- | :--- |
| **Internal Project Title ("Wayground") & Company Branding** | **CONFIDENTIAL IP** | The leadership brief references "Wayground AI Worksheets" and author email `@quizizz.com`. In public portfolio chapters, refer to the platform generically as **"AI Worksheets Platform"** or an "AI-driven educational authoring system". Do not disclose internal product codenames. |
| **API Gateways & Private Credentials** | **STRICT SECRET** | NEVER expose Portkey API keys, OpenAI tokens, Google API keys, or JWT secret salts. |
| **Internal Curriculum Databases** | **PROPRIETARY DATA** | Texas Essential Knowledge and Skills (TEKS) standards are public state standards, but specific internal question mappings or proprietary customer data must not be exposed. |
| **TikZ Subprocess Compilation Architecture** | **PUBLIC ENGINEERING** | The design pattern of using Gemini for TikZ LaTeX generation combined with headless `pdflatex` and `pdftoppm` compilation with MD5 caching is public technical engineering and should be highlighted. |
| **Three-Prompt Pipeline & Grid Solver** | **PUBLIC ENGINEERING** | The algorithmic backtracking placement logic and three-prompt crossword pipeline are original engineering contributions and may be documented in full architectural detail. |
