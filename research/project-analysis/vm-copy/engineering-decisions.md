# Key Engineering Decisions — VM Copy Question Generator

## ADR 01: Tier-1 Deterministic Evaluator Before Human or Second-Model Review
- **Context**: LLM output parsing frequently suffers from subtle structural corruptions: hallucinating 3 or 5 options instead of 4, failing to mark any option as the Correct Answer ("CA"), generating duplicate distractors, or omitting distractor rationales. Running another LLM call to catch these errors is expensive, slow (~2-4 seconds per question), and itself prone to probabilistic hallucination.
- **Decision**: Introduce a pure TypeScript zero-cost, zero-latency validation layer (`lib/eval-layer.ts`) that runs immediately after parsing. It executes hard structural assertions:
  - Exact option count check
  - CA cardinality invariant ($|CA| = 1$)
  - Set-based duplicate text detection
  - Non-empty rationale check for all distractors
  - Regex compliance for SME format constraints (e.g. mixed number fractions)
- **Consequences**: Flawed generations are instantly flagged with specific actionable error messages before reaching human eyes. Zero extra API spend or latency added.

## ADR 02: Parallel Batch Splitting over Monolithic Prompts
- **Context**: When curriculum authors request batches of 5 to 10 copy questions, asking an LLM to generate all 10 in a single completion causes response latency to surge beyond 30-40 seconds, often triggering Next.js or Vercel serverless gateway timeouts (15s/30s limits). Furthermore, model attention degrades across later questions, leading to repetitive distractors.
- **Decision**: Partition the requested count into parallel micro-batches of at most 2–3 questions (`calculateBatches(numQuestions)`), dispatched via `Promise.all` to concurrent API completions.
- **Consequences**: Generation latency is bounded by the duration of generating ~2 questions (~4-6 seconds total) regardless of whether 3, 6, or 9 questions are requested. Redundancy between questions is eliminated.

## ADR 03: Unified Multi-Provider Abstraction (OpenAI, Gemini, NaraRouter)
- **Context**: Different models excel at different mathematical sub-tasks. Gemini 1.5 Pro and 3 Pro offer superior multi-modal image reasoning for diagrams, while Agnes-3-Flash / GPT-4o offer fast, structured JSON adherence. Relying on a single provider creates vendor lock-in and vulnerability to rate limits or outages.
- **Decision**: Implement `lib/ai-client.ts` with transparent routing based on model identifier, standardizing all responses into uniform text and JSON structures across OpenAI, Google Gemini, and NaraRouter endpoints.
- **Consequences**: The application can seamlessly switch between cost-effective flash models and advanced vision models without touching frontend or generation logic.

## ADR 04: One-Time Pre-Analysis of Attached Diagrams
- **Context**: When generating 5 copy questions from an image-based base question (e.g., a triangle geometry problem or a dot plot), sending the raw high-resolution base64 image across every parallel batch request wastes substantial ingress bandwidth and duplicate vision tokens.
- **Decision**: Extract diagram structure once during Phase 1 (`analyzeImageForQuestion`), converting visual data into structured textual coordinates, measurements, and HTML tables, then feed this synthesized representation to downstream text generators.
- **Consequences**: Multi-modal token cost is cut by 60–80% for batch generation; text models can reason directly over explicit table/coordinate figures without multi-modal hallucination.
