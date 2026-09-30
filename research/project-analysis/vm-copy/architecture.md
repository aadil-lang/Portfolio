# Architecture & System Design — VM Copy Question Generator

## 1. System Topology Overview
VM Copy Question Generator is structured as a full-stack Next.js application operating under Next.js 16 (App Router) with React 19 server-side execution and client hydration.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js Client (React 19)                       │
│  - app/generate/page.tsx (Interactive Generator Form)                  │
│  - components/QuestionDisplay.tsx (Eval Badges & Auto-Fix Trigger)    │
│  - Recharts / SVG / HTML Table Visualizations                          │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │ POST JSON (Base question, SME notes, images)
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Next.js App Router API Layer                         │
│  - app/api/generate/route.ts (Batching, Parallel Dispatch, Orchestrator)│
│  - app/api/verify/route.ts (Adversarial Auditor & Auto-Fix)            │
│  - app/api/base-generate/route.ts (Base item synthesis)                │
└──────────────┬───────────────────────────────┬─────────────────────────┘
               │                               │
       Parallel Prompts               Programmatic Validation
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌───────────────────────────────────────┐
│     Multi-Provider LLM       │ │       Deterministic Eval Layer        │
│   Router (lib/ai-client.ts)  │ │          (lib/eval-layer.ts)          │
│ - OpenAI (GPT-4o, etc.)      │ │ - Exactly 1 Correct Answer (CA)       │
│ - Google Gemini (1.5/3 Pro)  │ │ - Duplicate option rejection          │
│ - NaraRouter (Agnes-3-Flash) │ │ - Option count strictness             │
│ - Vision Pre-Analysis        │ │ - Step-by-step solution format        │
└──────────────────────────────┘ │ - SME regex formatting rules          │
                                 └───────────────────────────────────────┘
```

## 2. Component Inventory & Responsibility Matrix

| Component | Repository Path | Primary Symbols / Functions | Input | Output | Dependencies | Failure Mode / Handling |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Batch Orchestrator** | `app/api/generate/route.ts` | `POST`, `calculateBatches`, `generateQuestionsWithGPT` | Base question, SME notes, options count, image attachments | Array of verified question objects with `evalStatus` | `lib/ai-client`, `lib/eval-layer` | Returns HTTP 400 for missing fields; 500 on unhandled upstream errors |
| **Deterministic Evaluator** | `lib/eval-layer.ts` | `evaluateDeterministic`, `EvalResult` | Single question object, expected option count, SME notes string | `EvalResult` (passed: boolean, score: 0-100, issues: string[]) | Pure TypeScript (zero dependencies) | Fails gracefully, deducts score per violation |
| **Semantic Auditor** | `lib/eval-layer.ts` | `evaluateWithLLM` | Single question object, base question, SME notes | `EvalResult` with `calculatedAnswer`, `markedCaIsCorrect` | `lib/ai-client` | Strips markdown, falls back to deterministic if JSON parsing fails |
| **Interactive Verifier** | `app/api/verify/route.ts` | `POST` | Question payload, user feedback/edits | `{ verified: boolean, result: ParsedAudit }` | `lib/ai-client` | Model fallback if primary model unavailable; clamps option count |
| **AI Abstraction Layer** | `lib/ai-client.ts` | `generateWithAI`, `analyzeImageForQuestion`, `getAIProvider` | Prompts, model identifier, images, hyperparams | Raw LLM string output | `openai`, `@google/generative-ai`, `lib/nararouter` | Throws descriptive error on empty content; provider routing |
| **Model Router** | `lib/nararouter.ts` | `getNaraRouterClient`, `isNaraRouterModel` | Model string | Configured OpenAI client pointing to NaraRouter gateway | `openai` | Validates API key presence, defaults to base gateway |
| **Interactive UI** | `components/QuestionDisplay.tsx` | `QuestionDisplay` | Question state, eval results | Interactive card with score badge, issues list, auto-fix button | `lucide-react`, React 19 state | Renders badge colors based on score (>85 green, >60 yellow, <60 red) |

## 3. Execution Pipeline Architecture
1. **Request Ingestion**: User submits base question, curriculum domain, desired count $N$, and optional SME guidelines.
2. **Parallel Batch Partitioning**: In `calculateBatches(numQuestions)`, the system breaks large generation requests into concurrent sub-batches of 2–3 questions (e.g. 5 questions $\rightarrow$ [3, 2]; 8 questions $\rightarrow$ [3, 3, 2]) to minimize generation latency and prevent token context degradation.
3. **Vision Pre-Analysis Cache**: If images are attached, `analyzeImageForQuestion` runs once across all images before batch dispatch, synthesizing textual descriptions, coordinate maps, and HTML table representations to reuse across all parallel workers.
4. **Post-Generation Eval Layer Execution**: Immediately upon collecting batch responses, `evaluateDeterministic` runs synchronously over each question without network roundtrips.
5. **UI Badging**: Every question arrives at the frontend pre-tagged with `evalStatus`, allowing SME reviewers to instantly identify flawed distractors or malformed keys.
