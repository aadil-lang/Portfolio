import { structuredProfile } from '../canonical/structuredProfile'
import { resumeData } from '../canonical/resumeData'
import { projectsMetadata } from '../canonical/projectsMetadata'

export interface RecruiterCapability {
  title: string
  description: string
  technologies: string[]
}

export interface RecruiterExperienceItem {
  period: string
  role: string
  organization: string
  classification: 'independent_research' | 'ai_engineering' | 'domain_expertise' | 'earlier_career'
  summary: string
  highlights: string[]
}

export interface RecruiterFeaturedProject {
  id: string
  name: string
  slug: string
  route: string
  positioning: string
  contribution: string
  technicalHighlights: string[]
  verifiedOutcome: string
  outcomeQualification: string
  technologies: string[]
}

export interface RecruiterProfile {
  name: string
  headline: string
  supportingPositioning: string
  summary: string
  location: string
  availability: string
  tenureSummary: {
    overallExperience: string
    aiEngineeringExperience: string
    waygroundTenure: string
    independentPeriod: string
  }
  contact: {
    email: string
    linkedin: string
    github: string
    contactRoute: string
    resumeUrl: string
  }
  capabilities: RecruiterCapability[]
  experience: RecruiterExperienceItem[]
  transitionNarrative: string
  featuredProjects: RecruiterFeaturedProject[]
  secondaryProjects: Array<{
    name: string
    slug: string
    route: string
    focus: string
  }>
}

export const recruiterProfile: RecruiterProfile = {
  name: structuredProfile.name,
  headline: 'AI Systems Engineer',
  supportingPositioning: 'AI Engineer | Python | LLM & Agentic Systems | Full-Stack',
  summary:
    'AI Systems Engineer specializing in building dependable production software around LLMs and multi-agent workflows. Experienced in Python/FastAPI backend architectures, LangGraph agentic orchestration, grounded RAG pipelines, concurrent ETL systems, and deterministic verification harnesses. Focuses on bridging stochastic model outputs with deterministic runtime guardrails, rigorous automated testing, and human-in-the-loop controls.',
  location: structuredProfile.location,
  availability: 'Open to AI Systems & Applied AI Roles (Remote & Hybrid / Hyderabad)',
  tenureSummary: {
    overallExperience: 'Around 4 years of professional experience (May 2021 – July 2026)',
    aiEngineeringExperience: 'Around 1 year of dedicated AI engineering experience',
    waygroundTenure: '2 years 7 months continuous tenure (January 2024 – July 2026)',
    independentPeriod: 'August 2026 – Present (Independent Technical Research & Open-Source Engineering)'
  },
  contact: {
    email: structuredProfile.email,
    linkedin: structuredProfile.linkedinUrl,
    github: structuredProfile.githubUrls.primary,
    contactRoute: '/contact',
    resumeUrl: '/resume.pdf'
  },
  capabilities: [
    {
      title: 'Agentic Systems & Orchestration',
      description:
        'Stateful cyclic multi-agent graphs, supervisor-worker hierarchies, dynamic intent routing, and role-based channel reducers with loop ceilings.',
      technologies: ['LangGraph', 'LangChain', 'Supervisor Graphs', 'State Machines', 'Tool Governance']
    },
    {
      title: 'LLM Applications & RAG',
      description:
        'Hybrid retrieval combining BM25 lexical scoring and vector similarity, Reciprocal Rank Fusion (RRF), token context-window budgeting, and citation grounding.',
      technologies: ['Hybrid RAG', 'BM25', 'Vector Search', 'RRF (k=60)', 'Structured Outputs (Pydantic/Zod)']
    },
    {
      title: 'AI Reliability & Evaluation',
      description:
        'Automated multi-modal browser testing, Fisher Information uncertainty quantification, deterministic abstention gates, and tamper-evident SHA-256 provenance chains.',
      technologies: ['Playwright', 'pytest', 'Fisher Information', 'SHA-256 Provenance', 'Adversarial Benchmarks']
    },
    {
      title: 'Python Backend Engineering',
      description:
        'High-throughput asynchronous APIs, multi-threaded document transformation pipelines, Server-Sent Events (SSE) streaming, and connection-pool resilience.',
      technologies: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'ThreadPoolExecutor', 'SSE Streaming']
    },
    {
      title: 'Full-Stack Development',
      description:
        'Responsive web portals and cross-platform mobile companions with strict type safety, state management, and database-level multi-tenant isolation.',
      technologies: ['Next.js', 'React', 'React Native (Expo)', 'TypeScript', 'Supabase (PostgreSQL & RLS)', 'Tailwind CSS']
    },
    {
      title: 'Deterministic Systems & Verification',
      description:
        'Closed-form physical and mathematical calculation solvers, headless LaTeX/TikZ subprocess compilers, and algorithmic 2D constraint backtracking.',
      technologies: ['Closed-Form Math', 'OpenCascade CAD', 'TeX Live / TikZ', 'Constraint Backtracking', 'Zero-Cost Validations']
    }
  ],
  experience: [
    {
      period: 'August 2026 – Present',
      role: 'Independent AI Engineering & Research',
      organization: 'Independent Technical Work',
      classification: 'independent_research',
      summary:
        'Focused on open-source research and engineering across grounded RAG evaluation, CAD geometry automation, and multi-modal application reliability.',
      highlights: [
        'Built the Interactive RAG Evaluation Sandbox (/rag-lab) comparing BM25, TF-IDF vector retrieval, and Hybrid RRF with context budgeting.',
        'Developed the Engineering Design Automation platform coupling closed-form physics solvers with OpenCascade STEP geometry generation.',
        'Engineered Ask Aadil, a stateful portfolio assistant with deterministic intent routing and two-phase human confirmation gates.',
        'Note: Conducted as self-directed technical research and open-source development, not salaried employment or client consulting.'
      ]
    },
    {
      period: 'January 2026 – July 2026',
      role: 'AI Engineer — AI/ML Team',
      organization: 'Wayground Inc (Bengaluru, India)',
      classification: 'ai_engineering',
      summary:
        'Full-time engineering role within the internal AI/ML team building enterprise ETL data pipelines and generative educational systems.',
      highlights: [
        'Engineered concurrent Map-Reduce curriculum transformation pipeline processing multi-megabyte PDFs into normalized state standards with dynamic Pydantic schema validation.',
        'Researched and delivered the full-stack AI Worksheets POC compiling LLM TikZ diagrams via headless TeX Live with algorithmic crossword backtracking.',
        'Contributed mathematical visual domain routing (SVG vs. TikZ) and compile-validation gates for US Mathematics Item Bank LangGraph pipelines.'
      ]
    },
    {
      period: 'January 2024 – December 2025',
      role: 'Subject Matter Expert — Mathematics',
      organization: 'Wayground Inc (Bengaluru, India)',
      classification: 'domain_expertise',
      summary:
        'Authored and validated K–12 mathematics content, technical KaTeX typesetting, and built the production VM Copy Question Generator.',
      highlights: [
        'Independently built the VM Copy Question Generator using Next.js and Portkey AI Gateway, reducing variant authoring cycle time from hours to minutes.',
        'Engineered in-memory Tier-1 deterministic evaluation layer enforcing 4 options, single correct answer, and duplicate distractor rejection at 0ms and $0 cost.',
        'Acted as the direct catalyst for internal transition from domain content specialist to the AI/ML Engineering team.'
      ]
    },
    {
      period: 'May 2021 – September 2022',
      role: 'Quality Assurance & Mathematics Content Specialist',
      organization: 'DIGIPPLUS, InhaltMart & Graveiens',
      classification: 'earlier_career',
      summary:
        'Early career roles focused on mathematical content development, quality assurance auditing, and structured typesetting across educational platforms.',
      highlights: [
        'Audited textbook questions and solutions for mathematical validity, distractor quality, and curriculum standards adherence.',
        'Constructed graphing calculator models and formatted complex notations in LaTeX and MathType.'
      ]
    }
  ],
  transitionNarrative:
    'Aadil transitioned into AI engineering from a strong foundation in mechanical engineering and technical mathematics. Recognizing that generative AI models frequently fail on structural and numerical constraints, he focused on building deterministic validation layers, evaluation pipelines, and architectural safety boundaries around LLMs.',
  featuredProjects: [
    {
      id: 'ai-reliability',
      name: 'AI Application Reliability Platform',
      slug: 'ai-reliability',
      route: '/projects/ai-reliability',
      positioning: 'AI Reliability, Observability & Governed Patching',
      contribution:
        'Engineered a dual-agent diagnostic harness pairing Playwright Chromium browser automation with Fisher Information uncertainty filtering and cryptographic provenance ledgers.',
      technicalHighlights: [
        'Captures genuine DOM snapshots, full-page screenshots, network HAR traces, and console logs under real headless Chromium sessions.',
        'Calculates parameter covariance via empirical Fisher Information, forcing an explicit ABSTAIN verdict when diagnostic uncertainty exceeds threshold.',
        'Chains diagnostic decisions, patch proposals, and human approval tokens into a tamper-evident SHA-256 event ledger.'
      ],
      verifiedOutcome: '205 automated tests passed (158 backend test suites + 47 governance and E2E tests).',
      outcomeQualification:
        'Evaluated across parameterized browser failure traces; abstention threshold calibrated on empirical test benchmarks.',
      technologies: ['Python', 'Playwright', 'Ollama', 'Fisher Covariance', 'FastMCP', 'Next.js']
    },
    {
      id: 'ask-aadil',
      name: 'Ask Aadil — Stateful Portfolio Agent',
      slug: 'ask-aadil',
      route: '/projects/ask-aadil',
      positioning: 'Stateful Conversational AI, Grounded RAG & Action Governance',
      contribution:
        'Built a production portfolio conversational assistant featuring deterministic intent routing, multi-source authority retrieval, and two-phase human confirmation gates.',
      technicalHighlights: [
        'Deterministic regex intent router and entity resolver tracks multi-turn pronouns ("it", "that project") with sub-2ms routing latency.',
        'Decoupled source authority matrix prevents cross-domain hallucinations by routing queries strictly to authoritative canonical layers.',
        'Two-phase action gate requires explicit human UI confirmation before executing external dispatches (e.g. contact email drafts).'
      ],
      verifiedOutcome: '172 automated test cases passed; 100% factual consistency across repeated multi-turn evaluations.',
      outcomeQualification:
        'Evaluated across 12 canonical test suites; epistemic abstention verified on unrecorded biographical inquiries.',
      technologies: ['Next.js App Router', 'React', 'TypeScript', 'Web Speech API', 'Hybrid Retrieval']
    },
    {
      id: 'solace-ai',
      name: 'Solace AI — Mindful Wellness Companion',
      slug: 'solace-ai',
      route: '/projects/solace-ai',
      positioning: 'Real-Time Voice, Healthcare Safety & Resilient Mobile Transport',
      contribution:
        'Developed an Expo cross-platform mobile companion and FastAPI/LangGraph backend featuring synchronous pre-LLM crisis screening and ephemeral zero-retention voice processing.',
      technicalHighlights: [
        'Synchronous compiled regex heuristics screen self-harm patterns in <2ms before invoking any LangGraph node or LLM endpoint.',
        'Voice recordings are processed strictly in RAM and deallocated in a finally block, leaving zero audio files in disk or cloud storage.',
        'Single-POST SSE delivery transport treats 5xx drops as ambiguous delivery, preventing duplicate message generation on flaky mobile networks.'
      ],
      verifiedOutcome: '102 automated tests passed (52 backend pytests + 50 mobile suites); sub-2ms crisis interception.',
      outcomeQualification:
        'Crisis detection verified against curated synthetic test lexicons; zero audio disk retention verified across test sessions.',
      technologies: ['React Native (Expo 58)', 'Python 3.12', 'FastAPI', 'LangGraph', 'Supabase RLS', 'Gemini API']
    },
    {
      id: 'curriculum-etl',
      name: 'Curriculum Transformation Engine',
      slug: 'curriculum-etl',
      route: '/projects/curriculum-etl',
      positioning: 'High-Throughput Concurrent ETL & Dynamic Schema Contracts',
      contribution:
        'Engineered an asynchronous Map-Reduce ETL pipeline transforming unstructured multi-megabyte state curriculum PDFs into normalized tabular datasets with dynamic schema derivation.',
      technicalHighlights: [
        'Inverted ETL parsing by treating approved 10-line sample CSVs as dynamic contracts, compiling runtime Pydantic validation models.',
        'Merged evaluation and repair into a unified single-pass review prompt (Commit 252d06f), cutting token expenditure and latency by 50%.',
        'Post-extraction deterministic row guards enforce grade normalization, whitespace stripping, and reserved column blanking outside the model.'
      ],
      verifiedOutcome: '124 automated pipeline tests passed; successfully processed state curriculum frameworks without custom parsers.',
      outcomeQualification:
        'Validates structural schema extraction across TEKS and CCSS standards; raw source document quality affects extraction yield.',
      technologies: ['Python 3.12', 'Claude 3.5 Sonnet', 'Pydantic v2', 'Pandas', 'ThreadPoolExecutor']
    }
  ],
  secondaryProjects: [
    {
      name: 'Engineering Design Automation (EDA)',
      slug: 'design-automation',
      route: '/projects/design-automation',
      focus: 'Closed-form mechanical physics solvers coupled with OpenCascade 3D STEP solid modeling.'
    },
    {
      name: 'RAG Evaluation Laboratory',
      slug: 'rag-lab',
      route: '/rag-lab',
      focus: 'Interactive evaluation sandbox comparing BM25, TF-IDF subword vector search, and Hybrid RRF.'
    },
    {
      name: 'OCR Evaluation Platform',
      slug: 'ocr-evaluator',
      route: '/projects/ocr-evaluator',
      focus: 'Critical-field priority error evaluation and 5-axis systematic image degradation testing.'
    },
    {
      name: 'Atlas AI — Financial Copilot',
      slug: 'atlas-ai',
      route: '/projects/atlas-ai',
      focus: 'Telegram-first LangGraph financial research copilot integrating SEC EDGAR filing RAG.'
    }
  ]
}

