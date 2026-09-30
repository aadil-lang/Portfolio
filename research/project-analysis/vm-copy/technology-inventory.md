# Technology Inventory & Dependencies — VM Copy Question Generator

## 1. Production Runtime Dependencies

| Package | Version in Lockfile / package.json | Purpose | Architectural Justification |
| :--- | :--- | :--- | :--- |
| `next` | `^16.0.7` | Web Framework (App Router) | High-performance server-side rendering, streaming API endpoints, upgraded to 16.0.7 to fix CVE-2025-66478 |
| `react` | `19.2.0` | Frontend UI Engine | Modern declarative UI, Concurrent features, Action hooks |
| `react-dom` | `19.2.0` | DOM Renderer | React 19 web rendering |
| `openai` | `^4.20.0` | OpenAI & NaraRouter SDK | Official client for standard OpenAI endpoints and custom OpenAI-compatible base URLs (`router.bynara.id`) |
| `@google/generative-ai` | `^0.21.0` | Google Gemini SDK | Direct API connectivity to Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 3 |
| `dompurify` | `^3.3.0` | HTML Sanitization | Sanitizes dynamic HTML table structures and mathematical notations against XSS attacks |
| `recharts` | `^3.5.1` | Charting & Visual Data | Interactive rendering of numerical charts, dot plots, and bar graphs generated from tabular problem contexts |

## 2. Development & Tooling Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `typescript` | `^5` | Strict static type safety across schemas, eval interfaces, and API routes |
| `tailwindcss` | `^4` | Utility-first styling engine with native post-CSS pipeline |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin for Tailwind v4 integration |
| `eslint` | `^9` | Code quality and linting |
| `eslint-config-next` | `^16.0.7` | Next.js-recommended ESLint rules |
| `@types/node` | `^20` | Node.js type definitions |
| `@types/react` | `^19` | React 19 type definitions |
| `@types/dompurify` | `^3.2.0` | DOMPurify type definitions |

## 3. External API Gateways & Protocols

- **OpenAI Official Gateway**: `https://api.openai.com/v1` (GPT-4o, GPT-4o-mini).
- **Google Generative AI**: Gemini API (v1beta) for multi-modal image analysis.
- **NaraRouter API Gateway**: `https://router.bynara.id/v1` (High-speed multi-model gateway supporting Agnes-3-Flash, Space-Bunny, Nemotron, Qwen, DeepSeek).
