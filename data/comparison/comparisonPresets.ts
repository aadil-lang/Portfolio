/**
 * Curated Comparison Presets
 * Phase 6.5 — Interactive Project Comparison
 *
 * Source-grounded pairs and trios that demonstrate clear architectural contrasts,
 * distinct engineering trade-offs, and varying evaluation paradigms.
 */

import { ComparisonPreset } from './types'

export const COMPARISON_PRESETS: ComparisonPreset[] = [
  {
    id: 'PRESET-01',
    title: 'Conversational RAG vs Regulatory Financial RAG',
    tagline: 'In-Memory BM25+Vector RRF vs Enterprise SEC EDGAR LangGraph Pipeline',
    projectSlugs: ['ask-aadil', 'atlas-ai'],
    rationale:
      'Contrasts lightweight in-memory hybrid retrieval engineered for sub-50ms latency and 100% negative abstention against an enterprise multi-agent LangGraph pipeline querying heavy SEC 10-K tables via MongoDB Vector Search.',
    keyContrastDimension: 'data-retrieval',
    focusTakeaways: [
      'Ask Aadil utilizes zero external databases, executing character subword vectors + BM25 in memory with Reciprocal Rank Fusion (k=60).',
      'Atlas AI handles multi-megabyte SEC filings with LangGraph agentic cycles and MongoDB Atlas Vector Search.',
      'Both enforce strict negative abstention when queries exceed documented evidence, but at different latencies and storage tiers.',
    ],
  },
  {
    id: 'PRESET-02',
    title: 'Grounded User Assistant vs Synthetic Diagnostic Harness',
    tagline: 'Epistemic Abstention on Incomplete Facts vs Fisher Information Uncertainty Circuit Breaker',
    projectSlugs: ['ask-aadil', 'ai-reliability'],
    rationale:
      'Highlights the difference between an AI system providing grounded answers directly to human users versus an autonomous AI platform executing synthetic browser actions to diagnose application regressions.',
    keyContrastDimension: 'failure-containment',
    focusTakeaways: [
      'Ask Aadil gates generative synthesis through pre-router regex heuristics and fallback abstention to prevent hallucinations.',
      'AI Reliability drives headless Chromium via Playwright, capturing DOM snapshots and triggering Fisher Information covariance matrix gates when diagnostic uncertainty spikes.',
      'Demonstrates human-facing safety boundaries versus autonomous multi-agent evaluation harnesses.',
    ],
  },
  {
    id: 'PRESET-03',
    title: 'Multi-Agent UI Stress vs Controlled Perturbation OCR',
    tagline: 'Generative Agent Behavioral Journeys vs 5-Axis Deterministic Mathematical Degradation',
    projectSlugs: ['ai-reliability', 'ocr-evaluator'],
    rationale:
      'Contrasts two opposing evaluation methodologies: evaluating probabilistic, multi-turn application journeys using local LLMs versus evaluating optical character extraction using controlled mathematical image perturbations.',
    keyContrastDimension: 'evaluation-verification',
    focusTakeaways: [
      'AI Reliability assesses unpredictable agent paths through synthetic user journeys with fixed pseudo-random seeds (seed 42).',
      'OCR Evaluator enforces mathematical rigor across 5 controlled physical axes (Gaussian blur, skew, noise, contrast, JPEG) with Levenshtein CER/WER scoring.',
      'Contrasts heuristic diagnostic reasoning with exact numerical degradation curves.',
    ],
  },
  {
    id: 'PRESET-04',
    title: 'Mechanical CAD Calculus vs Educational LaTeX Sandbox',
    tagline: 'Saint-Venant BRep Mass Integrals vs Headless pdflatex Compiler Watchdog',
    projectSlugs: ['design-automation', 'ai-worksheets'],
    rationale:
      'Demonstrates how mathematical rigor and execution sandboxing are maintained across mechanical solid modeling versus generative educational diagram compilation.',
    keyContrastDimension: 'ai-vs-deterministic',
    focusTakeaways: [
      'EDA restricts AI purely to parameter extraction from prompts, performing all physics and 3D modeling deterministically via Saint-Venant analytical equations and OpenCascade BRep algorithms (< 10^-6 calculus discrepancy).',
      'AI Worksheets prompts LLMs for complex TikZ code, but delegates compilation to an isolated headless pdflatex subprocess with a 15-second watchdog timeout and MD5 content-addressed caching.',
      'Both isolate generative LLMs from the actual mathematical and rendering execution cores.',
    ],
  },
  {
    id: 'PRESET-05',
    title: 'Batch Map-Reduce ETL vs Pre-Flight Guardrail',
    tagline: 'Concurrent Dynamic Pydantic Schema Compilation vs Pure TypeScript Distractor Validation',
    projectSlugs: ['curriculum-etl', 'vm-copy'],
    rationale:
      'Compares two systems built at Wayground: one executing high-throughput batch curriculum transformation with runtime schema synthesis, the other operating as an interactive pre-flight evaluator preventing malformed LLM outputs.',
    keyContrastDimension: 'orchestration-state',
    focusTakeaways: [
      'Curriculum ETL compiles dynamic Pydantic models at runtime from unstandardized CSV headers and coordinates concurrent worker batches with formula injection sanitization.',
      'VM Copy executes a pure TypeScript Tier-1 evaluator in < 1ms at $0 API cost ahead of any LLM judge, enforcing Set-based distractor uniqueness and exactly 4 options.',
      'Contrasts asynchronous batch data pipelines with sub-millisecond interactive execution guardrails.',
    ],
  },
  {
    id: 'PRESET-06',
    title: 'Clean Architecture B2B vs SEC Regulatory Multi-Agent',
    tagline: 'Static AST Downward Dependency Enforcement vs LangGraph Financial State Loops',
    projectSlugs: ['loom-ai', 'atlas-ai'],
    rationale:
      'Contrasts an enterprise operational microservice strictly enforcing Clean Architecture boundaries and cryptographic authorization with an exploratory financial research copilot executing cyclical graph workflows.',
    keyContrastDimension: 'hitl-governance',
    focusTakeaways: [
      'Loom AI enforces zero upward imports from domain entities via custom AST analysis and requires cryptographic HMAC signatures for orders exceeding $10,000.',
      'Atlas AI uses LangGraph state graphs to recursively parse SEC 10-K tables and alerts financial analysts using SHA-256 section deduplication.',
      'Demonstrates strict enterprise operational governance versus multi-turn analytical synthesis.',
    ],
  },
  {
    id: 'PRESET-07',
    title: 'Voice-First Mobile Companion vs Web-Based Grounded RAG',
    tagline: 'React Native Microsecond Crisis Circuit Breaker vs Next.js Hybrid BM25 Retrieval',
    projectSlugs: ['solace-ai', 'ask-aadil'],
    rationale:
      'Contrasts two conversational AI systems with radically different latency, privacy, and safety profiles: a real-time mobile voice companion versus a web-based portfolio assistant.',
    keyContrastDimension: 'failure-containment',
    focusTakeaways: [
      'Solace AI executes a compiled regex Tier-1 circuit breaker (< 2ms) for patient safety and deletes raw audio bytes immediately post-transcription (`del audio_bytes`).',
      'Ask Aadil runs in-browser and serverless Next.js, resolving multi-turn references and gating navigation actions through client confirmation contracts.',
      'Contrasts real-time voice streaming with zero data persistence against text-based grounded portfolio discovery.',
    ],
  },
]

