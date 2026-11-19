import { SourceChunkMetadata } from '@/types/rag'

export interface GitHubRepoRecord {
  owner: string
  repo: string
  url: string
  description: string
  primaryLanguage: string
  technologies: string[]
  hasTests: boolean
  testFramework?: string
  verifiedTestCount?: number
  architectureNotes: string
  readmeExcerpt: string
  lastVerified: string
}

/**
 * GITHUB SOURCE ADAPTER
 * Governs technical implementation evidence, repository architectures,
 * test suites, and source code provenance.
 * 
 * Strict rule: Never claim a feature exists merely because a README mentions it.
 * Only verified architectures and test manifests are ingested as truth.
 */
export const githubRepositories: Record<string, GitHubRepoRecord> = {
  'engineering-design-automation': {
    owner: 'aadilkhurshid',
    repo: 'engineering-design-automation',
    url: 'https://github.com/aadilkhurshid/engineering-design-automation',
    description:
      'AI-assisted deterministic mechanical design system converting natural-language requirements to ISO STEP BRep CAD models and SVG drawings.',
    primaryLanguage: 'Python',
    technologies: ['Python 3.12', 'FastAPI', 'OpenCascade', 'PythonOCC', 'Pydantic V2', 'Docker', 'Next.js 16', 'Three.js'],
    hasTests: true,
    testFramework: 'pytest',
    verifiedTestCount: 424,
    architectureNotes:
      'Strict separation between LLM requirement parser and deterministic engineering solvers. Closed-form physics executes torque, allowable shear, and nominal series selection without generative hallucination. CAD solid BRep volume evaluated with OpenCascade GProp_GProps.',
    readmeExcerpt:
      'Dual-tier pipeline: Stage 1 converts prompt to EngineeringSpecification Pydantic schema; Stage 2 solves shaft geometry and exports valid ISO 10303 STEP solid models and 2D technical drawings. 424 tests passing across 28 test suites.',
    lastVerified: '2026-09-29'
  },
  'atlas-ai': {
    owner: 'aadilkhurshid',
    repo: 'atlas-ai-finance',
    url: 'https://github.com/aadilkhurshid/atlas-ai-finance',
    description:
      'Conversational financial copilot on Telegram with direct SEC EDGAR 10-K/10-Q/8-K RAG and proactive alert worker.',
    primaryLanguage: 'Python',
    technologies: ['Python 3.12', 'FastAPI', 'LangGraph', 'Atlas Vector Search', 'Gemini Embeddings', 'SEC EDGAR API', 'Telegram API'],
    hasTests: true,
    testFramework: 'pytest',
    verifiedTestCount: 178,
    architectureNotes:
      'StateGraph LangGraph workflow with deterministic SEC section parser. Direct EDGAR API eliminates secondary news summary hallucinations. Background AlertWorker runs inside lifespan monitoring volatility.',
    readmeExcerpt:
      'Telegram bot financial copilot utilizing LangGraph StateGraph, Atlas Vector Search with Gemini embeddings, and primary SEC EDGAR regulatory chunking. 178 pytests covering router, retriever, and alerts.',
    lastVerified: '2026-09-29'
  },
  'curriculum-etl': {
    owner: 'aadil-lang',
    repo: 'Curriculum-Transformation',
    url: 'https://github.com/aadil-lang/Curriculum-Transformation',
    description:
      'Asynchronous Map-Reduce curriculum document transformation engine with dynamic schema inference and 3-tier integrity gates.',
    primaryLanguage: 'Python',
    technologies: ['Python 3.12', 'Claude 3.5 Sonnet API', 'JSON Tool Calling', 'Pandas', 'Asyncio'],
    hasTests: true,
    testFramework: 'pytest',
    verifiedTestCount: 36,
    architectureNotes:
      'Long-document chunker with parallel Claude tool-calling workers. Dynamic schema derivation eliminates hardcoded scrapers. Three-tier integrity gates: Reviewer -> Critic -> CSV Audit.',
    readmeExcerpt:
      'Transform unstructured PDF, DOCX, and web curriculum manifests into validated structured databases using Claude Map-Reduce and automated CSV integrity validation.',
    lastVerified: '2026-09-29'
  },
  'ai-reliability': {
    owner: 'aadilkhurshid',
    repo: 'ai-application-reliability',
    url: 'https://github.com/aadilkhurshid/ai-application-reliability',
    description:
      'Browser QA exploration and failure diagnostics harness pairing Playwright with local Ollama visual models and Fisher covariance governance.',
    primaryLanguage: 'TypeScript',
    technologies: ['TypeScript 5', 'FastAPI', 'Next.js 16', 'Ollama (Qwen 2.5 Coder)', 'Playwright', 'Fisher Covariance', 'MCP SDK'],
    hasTests: true,
    testFramework: 'pytest + Playwright',
    verifiedTestCount: 205, // 158 backend + 47 governance
    architectureNotes:
      'Dual-agent diagnostic loop: Agent A traverses DOM with Playwright; Agent B diagnoses runtime logs and screenshot snapshots via local Ollama. Fisher covariance matrix verifies parameter sensitivity before executing mutating browser actions.',
    readmeExcerpt:
      'Autonomous reliability harness for web applications with deterministic tool boundaries, local model diagnostics, and failure containment verification.',
    lastVerified: '2026-09-29'
  },
  'loom-ai': {
    owner: 'aadilkhurshid',
    repo: 'loom-ai-b2b',
    url: 'https://github.com/aadilkhurshid/loom-ai-b2b',
    description:
      'B2B Textile Marketplace Platform with Clean Architecture backend, compound text indexing, and LangGraph procurement workflows.',
    primaryLanguage: 'TypeScript',
    technologies: ['Next.js 16', 'React 19', 'TypeScript 5', 'Express 5', 'MongoDB Atlas', 'LangGraph', 'Playwright'],
    hasTests: true,
    testFramework: 'Playwright E2E + Jest',
    verifiedTestCount: 42,
    architectureNotes:
      'Clean Architecture with inward dependency flow: Domain Entities -> Use Cases -> Interface Adapters -> Frameworks. LangGraph Human-in-the-Loop (HITL) approval queue prevents automated cart checkout without buyer confirmation.',
    readmeExcerpt:
      'Next.js and Express platform for technical textile sourcing with multi-attribute filtering and agentic procurement workflows.',
    lastVerified: '2026-09-29'
  },
  'ask-aadil': {
    owner: 'aadil-lang',
    repo: 'portfolio',
    url: 'https://github.com/aadil-lang/portfolio',
    description:
      'Three-layer engineering portfolio (Timeline, Journal, Systems) and Ask Aadil: a stateful, source-aware conversational agent with deterministic tool governance and bitwise draft integrity.',
    primaryLanguage: 'TypeScript',
    technologies: ['Next.js', 'React', 'TypeScript 5', 'Hybrid RAG', 'Deterministic State Machine', 'Playwright', 'Web Speech API'],
    hasTests: true,
    testFramework: 'Node Evaluation Suites + Playwright E2E',
    verifiedTestCount: 172,
    architectureNotes:
      'Maintains discrete source boundaries across Timeline, Journal, Systems, Resume, GitHub, and 3-state LinkedIn adapter. Enforces temporal epistemic boundaries, prompt injection resistance across 5 sources, and human-in-the-loop mail confirmation with zero LLM rewriting (executionInput === editedDraft).',
    readmeExcerpt:
      'Interactive three-layer engineering portfolio and grounded conversational agent Ask Aadil verified across epistemic, tool planning, voice robustness, and Playwright browser suites.',
    lastVerified: '2026-11-10'
  },
  'solace-ai': {
    owner: 'aadil-lang',
    repo: 'solace-ai',
    url: 'https://github.com/aadil-lang/solace-ai',
    description:
      'Cross-platform Expo 58 / React Native and FastAPI/LangGraph emotional wellness companion with deterministic crisis screening, consent-based memory, and zero-retention voice privacy.',
    primaryLanguage: 'TypeScript / Python',
    technologies: [
      'React Native / Expo 58',
      'TypeScript',
      'Python 3.12',
      'FastAPI',
      'LangGraph',
      'Google Gemini API',
      'Supabase Auth & PostgreSQL (RLS)',
      'SSE Streaming'
    ],
    hasTests: true,
    testFramework: 'pytest + Node test runner',
    verifiedTestCount: 102, // 52 backend pytests + 50 mobile suite checks
    architectureNotes:
      'Synchronous pre-LLM deterministic crisis screening (is_crisis_input) inside LangGraph safety_node before context retrieval or Gemini streaming. Mobile ApiService executes SSE POST strictly once, classifying 502/503/504 as ambiguous delivery without blind retry; voice endpoint purges raw audio bytes in a finally block; Supabase RLS isolates 6 tables.',
    readmeExcerpt:
      'A little space to feel understood — Expo 58 mobile sanctuary and FastAPI/LangGraph backend featuring consent-based emotional memory, Rant Mode, bilingual English/Urdu Nastaliq poetry, ephemeral voice journaling, and Tele-MANAS / 112 / 988 crisis guardrails.',
    lastVerified: '2026-11-10'
  },
  'ocr-evaluator': {
    owner: 'aadil-lang',
    repo: 'OCR-Evaluator',
    url: 'https://github.com/aadil-lang/OCR-Evaluator',
    description:
      'Engineering-focused OCR evaluation and robustness platform measuring document accuracy, CER/WER, critical-field correctness, and degradation resilience.',
    primaryLanguage: 'Python / JavaScript',
    technologies: ['Python 3.12', 'FastAPI', 'Tesseract OCR', 'React', 'pytest', 'Pillow', 'OpenCV', 'NumPy'],
    hasTests: true,
    testFramework: 'pytest',
    verifiedTestCount: 134,
    architectureNotes:
      'Multi-tier evaluation calculating Character Error Rate (CER), Word Error Rate (WER), field-level matching, and critical-field accuracy. Risk classification engine assigns PASS / REVIEW / FAIL decisions based on field severity. Robustness suite tests 5 degradation axes (blur, noise, rotation, contrast, JPEG compression).',
    readmeExcerpt:
      'An engineering-focused OCR evaluation system for measuring document extraction accuracy, confidence, critical-field correctness, and robustness under real-world image degradation. 134 automated backend tests passing.',
    lastVerified: '2026-09-01'
  }
}

export function getGitHubRepoEvidence(projectSlug: string): GitHubRepoRecord | null {
  return githubRepositories[projectSlug] || null
}
