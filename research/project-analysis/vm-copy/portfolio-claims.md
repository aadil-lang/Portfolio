# Portfolio Claims vs Implementation Evidence — VM Copy Question Generator

## Forensic Reconciliation Matrix

| Portfolio Claim / Narrative Point | Implementation Evidence in Repository | Forensic Classification | Discrepancy & Grounding Notes |
| :--- | :--- | :--- | :--- |
| **"System generates isomorphic variant questions from base items"** | Confirmed in `app/api/generate/route.ts` and `app/copy-generate/page.tsx`. | **VERIFIED** | Direct implementation accepting base question and emitting $N$ copies. |
| **"Tier-1 Deterministic Evaluator audits 4 options, 1 CA, duplicate distractors"** | Confirmed verbatim in `lib/eval-layer.ts:evaluateDeterministic()`. | **VERIFIED** | Code explicitly tests option length, checks `opt.logic === 'CA'`, checks duplicates via Set, checks distractor logic. |
| **"Zero-latency, zero-cost evaluation before human review"** | In-memory synchronous TypeScript function called inside Next.js route before response return. | **VERIFIED** | Zero API calls in Tier 1; execution takes < 1 ms. |
| **"Adversarial Blind-Solve Verification"** | Implemented in `/api/verify/route.ts` and `evaluateWithLLM()`. | **VERIFIED** | Prompts adversarial persona to independently solve problem from scratch and compare against marked CA. |
| **"Parallel batch execution cuts latency"** | `calculateBatches()` partitions requests into chunks of 2-3 executed via `Promise.all()`. | **VERIFIED** | Commit `197ab7a` explicitly implemented parallel question generation. |
| **"Automated Test Suite with 100% unit test coverage"** | No unit test files (`*.test.ts`, `*.spec.ts`) exist in the repository. | **REFUTED / CORRECTED** | Testing is performed via static TypeScript compilation, runtime deterministic guardrails, and manual UI verification, NOT an offline Jest/Vitest suite. The portfolio must accurately state this rather than claiming offline test suites. |
| **"Full curriculum database integration"** | `lib/curriculum.ts` and `lib/subskills.ts` provide static curriculum metadata mappings. | **SUPPORTED** | Static lookup tables and local JSON files; not a dynamic multi-tenant SQL curriculum database. |
