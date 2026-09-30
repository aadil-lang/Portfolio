import { ProjectMetadata } from '@/types/rag'

/**
 * CANONICAL PROJECT METADATA REGISTRY
 * Authoritative registry of every system across Wayground independent builds,
 * team collaborations, and personal engineering projects.
 */
export const projectsMetadata: ProjectMetadata[] = [
  {
    slug: 'vm-copy',
    title: 'VM Copy Question Generator',
    summary:
      'Deterministic math question generator enforcing 4 unique options, single correct answer exclusivity, and distractor rationale validation without model dependencies.',
    problem:
      'Standard LLM prompts generate math questions with duplicate options, multiple correct answers, or nonsensical distractors that fail instructional quality audits.',
    dates: {
      start: '2024-04',
      end: '2024-09'
    },
    ownership: 'independent',
    role: 'Creator & Lead Developer (Wayground Independent Build)',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Deterministic Validation',
      'Client Guardrails',
      'Portkey AI Gateway',
      'Tailwind CSS'
    ],
    portfolioRefs: {
      timeline: ['exp-wayground-math-sme', 'exp-wayground-vm-copy'],
      journal: ['spread-06-chapter-06-vm-copy'],
      system: '/projects/vm-copy'
    },
    externalRefs: {
      github: 'https://github.com/aadilkhurshid/vm-copy-generator'
    },
    evidence: [
      'Production deployment at Wayground reducing variant authoring cycle time from hours to minutes.',
      'The deterministic evaluation runs locally without another model call, enforcing required option count (4), exactly one correct-answer flag, and duplicate-option detection.',
      'Direct catalyst for internal transition from Content SME to AI/ML Engineering team.'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'ai-worksheets',
    title: 'AI Worksheets Product POC',
    summary:
      'Full-stack LaTeX/TikZ worksheet generation system with backtracking puzzle solvers and multi-model LLM orchestration.',
    problem:
      'Standard generative models cannot render mathematically accurate diagrams (e.g. angle arcs, coordinate planes) or solve 2D spatial puzzle grids (crosswords, mazes) without physical compiler and graph solver integration.',
    dates: {
      start: '2026-01',
      end: '2026-04'
    },
    ownership: 'independent',
    role: 'Full-Stack Lead Engineer (Wayground Company POC)',
    technologies: [
      'FastAPI',
      'Python 3.12',
      'React 18',
      'Vite 6',
      'TeX Live (pdflatex)',
      'TikZ Subprocess Pool',
      'Docker Compose',
      'PostgreSQL',
      'Redis',
      'MinIO'
    ],
    portfolioRefs: {
      timeline: ['exp-wayground-ai-worksheets'],
      journal: ['spread-07-chapter-07-worksheets'],
      system: '/projects/ai-worksheets'
    },
    externalRefs: {
      github: 'https://github.com/aadilkhurshid/ai-worksheets-poc'
    },
    evidence: [
      'Containerized microservice stack generating TEKS-aligned printable worksheets with automated TikZ/LaTeX rendering.',
      'Algorithmic 2D backtracking and honeycomb hex graph solvers for gamified Word Searches and Maze Trails.',
      'Portkey multi-model routing (GPT-4o for math generation, Gemini 3 Flash for layout heuristics).'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'curriculum-etl',
    title: 'Curriculum Transformation Engine',
    summary:
      'Asynchronous Map-Reduce pipeline transforming unstructured state educational standards into normalized tabular datasets.',
    problem:
      'Large PDF/DOCX curriculum standards vary wildly across states, and naive LLM scrapers drop rows, hallucinate schema fields, and corrupt standard code alignments.',
    dates: {
      start: '2026-02',
      end: '2026-05'
    },
    ownership: 'independent',
    role: 'Backend Data Engineer (Wayground Independent Build)',
    technologies: [
      'Python 3.12',
      'Claude 3.5 Sonnet API',
      'JSON Tool Calling',
      'Map-Reduce Orchestration',
      'Pandas',
      'CSV Integrity Gates',
      'Asyncio'
    ],
    portfolioRefs: {
      timeline: ['exp-wayground-curriculum-etl'],
      journal: ['spread-08-chapter-08-curriculum-etl'],
      system: '/projects/curriculum-etl'
    },
    externalRefs: {
      github: 'https://github.com/aadil-lang/Curriculum-Transformation'
    },
    evidence: [
      'Asynchronous Map-Reduce pipeline chunking large PDF/DOCX/URL curriculum documents.',
      'Dynamic schema contract synthesis deriving parsing rules from sample datasets without hardcoded scrapers.',
      '3-tier integrity gates (Reviewer -> Critic -> CSV Audit) preventing malformed exports.'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'math-item-bank',
    title: 'US Mathematics Item Bank Generation Pipeline',
    summary:
      'A company team system for generating US state-aligned mathematics assessment items, where Aadil contributed mathematical artifact routing, TikZ/SVG compilation gates, and Upper Elementary stabilization.',
    problem:
      'Domain mismatch in assessment graphics where asking an LLM for images indiscriminately produces invalid geometry diagrams, uncompilable TikZ, or visually inconsistent answer options.',
    dates: {
      start: '2026-03',
      end: '2026-06'
    },
    ownership: 'team',
    role: 'Backend AI Engineer (Wayground AI/ML Team Project)',
    technologies: [
      'LangGraph',
      'Python 3.12',
      'TikZ / LaTeX',
      'SVG / XML Geometry Engine',
      'Vision LLM Verification',
      'Integer Linear Programming (ILP)'
    ],
    portfolioRefs: {
      timeline: ['exp-wayground-item-bank-pipeline'],
      journal: ['spread-09-team-item-bank'],
      system: '/projects/math-item-bank'
    },
    externalRefs: {
      github: null // Wayground internal repository
    },
    evidence: [
      'Multi-node LangGraph pipeline with planner, amplification, and question generation stages.',
      'Conditional graphic router dispatching coordinate geometry to SVG and abstract diagrams to TikZ.',
      'Integer Linear Programming (ILP) and Min/Max swap algorithms balancing DOK metrics and curriculum weightage.',
      'Personal contribution: Designed state graph nodes, graphics router, and two-tier automated compilation check.'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'design-automation',
    title: 'Engineering Design Automation (EDA)',
    summary:
      'Deterministic CAD geometry engine and closed-form physics calculation harness bridging parametric mechanical design with automated drawing generation.',
    problem:
      'Generative AI lacks physical grounding and spatial consistency required for manufacturing-grade 3D mechanical components and engineering drawings.',
    dates: {
      start: '2025-08',
      end: '2026-02'
    },
    ownership: 'independent',
    role: 'System Architect & Sole Author (Personal Engineering Build)',
    technologies: [
      'Python 3.12',
      'FastAPI',
      'OpenCascade / PythonOCC',
      'Pydantic V2',
      'Docker Compose',
      'Next.js 16',
      'Three.js'
    ],
    portfolioRefs: {
      timeline: ['exp-engineering-design-automation'],
      journal: ['spread-10-chapter-08-eda'],
      system: '/projects/design-automation'
    },
    externalRefs: {
      github: 'https://github.com/aadilkhurshid/engineering-design-automation'
    },
    evidence: [
      'Converts unstructured mechanical specifications into ISO-compliant STEP BRep solids and technical drawings.',
      'Closed-form deterministic physics solvers for torsional shear, bending moments, and nominal shaft series.',
      'Dimensional cross-validation ensuring zero discrepancy between 3D CAD geometry and 2D drawing callouts.',
      '424 automated test cases passing across 28 test suites in Dockerized test harness.'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'loom-ai',
    title: 'Loom AI — B2B Textile Marketplace Platform',
    summary:
      'Clean-architecture B2B textile procurement platform with compound text search, quote management, and multi-tenant catalog partitioning.',
    problem:
      'Fragmented textile procurement workflows lacking unified structured search across technical fiber specs, GSM densities, and compliance certifications.',
    dates: {
      start: '2025-10',
      end: '2026-01'
    },
    ownership: 'hackathon',
    role: 'System Architect & Full-Stack Author (Hackathon Project)',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Express 5',
      'MongoDB Atlas',
      'LangGraph',
      'Playwright E2E'
    ],
    portfolioRefs: {
      timeline: ['exp-loom-ai-marketplace'],
      journal: ['spread-11-parallel-builds'],
      system: '/projects/loom-ai'
    },
    externalRefs: {
      github: 'https://github.com/aadilkhurshid/loom-ai-b2b'
    },
    evidence: [
      'Clean Architecture backend with strict inward dependency rule isolating business logic from drivers.',
      'Compound MongoDB text indexes across fiber composition, GSM weights, certifications, and MOQs.',
      'LangGraph procurement workflows with Human-in-the-Loop (HITL) approval queues preventing unauthorized checkout actions.'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'atlas-ai',
    title: 'Atlas AI — Financial Copilot & SEC Filing RAG',
    summary:
      'Multi-agent financial copilot parsing SEC EDGAR 10-K/10-Q filings with deterministic retrieval boundaries and background monitoring.',
    problem:
      'Financial LLM applications hallucinate financial metrics and secondary summaries when not anchored directly to regulatory source filings.',
    dates: {
      start: '2025-11',
      end: '2026-02'
    },
    ownership: 'hackathon',
    role: 'Lead Architect & Sole Author (Hackathon Project)',
    technologies: [
      'Python 3.12',
      'FastAPI',
      'LangGraph',
      'Atlas Vector Search',
      'Gemini Embeddings',
      'SEC EDGAR API',
      'Telegram API',
      'Finnhub API'
    ],
    portfolioRefs: {
      timeline: ['exp-atlas-ai-copilot'],
      journal: ['spread-11-parallel-builds'],
      system: '/projects/atlas-ai'
    },
    externalRefs: {
      github: 'https://github.com/aadilkhurshid/atlas-ai-finance'
    },
    evidence: [
      'StateGraph agentic workflow with semantic section chunking for Form 10-K, 10-Q, and 8-K filings.',
      'Direct SEC EDGAR integration eliminating hallucinated secondary summaries.',
      'Proactive background alert worker monitoring price and volatility thresholds.',
      '178 automated pytests in complete project repository (59 tests in initial MVP phase).'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'ai-reliability',
    title: 'AI Application Reliability Harness',
    summary:
      'Autonomous web QA harness pairing dual-agent exploration with Fisher information covariance filtering to detect and diagnose frontend regressions.',
    problem:
      'Autonomous testing agents hallucinate spurious UI failures and struggle to separate visual shifts from actual behavioral regressions.',
    dates: {
      start: '2026-01',
      end: '2026-06'
    },
    ownership: 'independent',
    role: 'Reliability Engineer & Author (Personal Engineering Build)',
    technologies: [
      'Ollama (Qwen 2.5 Coder)',
      'Next.js 16',
      'FastAPI',
      'Playwright',
      'Fisher Information Covariance',
      'MCP SDK 2.2.0'
    ],
    portfolioRefs: {
      timeline: ['exp-ai-reliability-harness'],
      journal: ['spread-12-chapter-09-reliability'],
      system: '/projects/ai-reliability'
    },
    externalRefs: {
      github: 'https://github.com/aadilkhurshid/ai-application-reliability'
    },
    evidence: [
      'Dual-agent diagnostic harness pairing Playwright browser exploration with local Ollama visual diagnostics.',
      'Fisher information covariance matrix filtering out ungrounded model suggestions before DOM execution.',
      '158 backend test suites + 47 governance & E2E tests verifying tool boundaries and failure containment.'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'binance-bot',
    title: 'Binance Futures Trading Bot',
    summary:
      'Python algorithmic trading engine with asynchronous order execution, risk-bounded position sizing, and automated stop-loss management.',
    problem:
      'High-frequency market volatility requires asynchronous non-blocking order execution and strict risk-bounding safeguards.',
    dates: {
      start: '2023-01',
      end: '2023-05'
    },
    ownership: 'independent',
    role: 'Sole Author (Algorithmic Exploration)',
    technologies: [
      'Python',
      'Binance Futures API',
      'Asyncio',
      'Python Logging'
    ],
    portfolioRefs: {
      timeline: [],
      journal: [],
      system: ''
    },
    externalRefs: {
      github: 'https://github.com/aadilkhurshid/binance-futures-bot'
    },
    evidence: [
      'Testnet automation supporting BUY/SELL market and limit orders with input validation and exception recovery.'
    ],
    lastVerified: '2026-09-29'
  },
  {
    slug: 'ask-aadil',
    title: 'Ask Aadil — Stateful Retrieval, Source Authority & Controlled Actions',
    summary:
      'Stateful, source-grounded portfolio knowledge agent with deterministic state machine, source authority routing, evidence verification, and visitor-approved action execution.',
    problem:
      'Portfolio chat interfaces hallucinate facts, lack source attribution, invent capabilities, and trigger unconfirmed external actions.',
    dates: {
      start: '2026-09',
      end: '2026-09'
    },
    ownership: 'independent',
    role: 'Lead AI Systems Engineer & Author (Personal Engineering Build)',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Hybrid RAG',
      'Deterministic State Machine',
      'Playwright',
      'Human-in-the-Loop Actions'
    ],
    portfolioRefs: {
      timeline: ['exp-ai-reliability-harness'],
      journal: ['spread-14-chapter-10-still-building'],
      system: '/projects/ask-aadil'
    },
    externalRefs: {
      github: 'https://github.com/aadil-lang/portfolio'
    },
    evidence: [
      '172 automated test verifications passing at 100% across multi-turn entity preservation, temporal reasoning, and browser interactions.',
      'Bitwise draft integrity: zero LLM rewriting between visitor review and mail client execution (executionInput === editedDraft).',
      'Strict epistemic boundaries: July 2026 records are historical; absence of corporate employer is never converted to unemployment claim.',
      'Decoupled 3-state LinkedIn adapter boundary separating api_unavailable from empty profiles.'
    ],
    lastVerified: '2026-09-29'
  }
]
