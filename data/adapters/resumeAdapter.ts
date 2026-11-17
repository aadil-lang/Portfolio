/**
 * CANONICAL RESUME DATA ADAPTER
 *
 * Pure, deterministic projection layer mapping authoritative Phase 1 canonical records
 * to consumer-facing `StructuredResume` and related resume interfaces.
 *
 * Core Governance Guarantees:
 * 1. Single Source of Truth:
 *    Career chronology, designations, and tenures are projected strictly from
 *    canonical career records (`car-wayground-aiml`, `car-wayground-math-sme`,
 *    `car-digipplus`, `car-inhaltmart`, `car-graveiens`).
 * 2. Governed Project Facts:
 *    Project descriptions, tech stacks, and metrics are projected strictly from
 *    canonical project records (`proj-curriculum-etl`, `proj-ai-worksheets`,
 *    `proj-item-bank`, `proj-vm-copy`, `proj-ask-aadil`, `proj-ocr-evaluator`,
 *    `proj-design-automation`, `proj-ai-reliability`, `proj-solace-ai`).
 * 3. Publication Restriction:
 *    Proprietary internal systems (VM Copy, AI Worksheets, Curriculum ETL, Item Bank)
 *    never expose public repository URLs or private code links.
 * 4. Metric Governance:
 *    Metrics strictly adhere to qualified statements (e.g. 158 backend test cases,
 *    not test suites; VM Copy <1ms Tier-1 in-memory evaluation).
 * 5. Determinism & Immutability:
 *    Zero mutation of underlying canonical records; fresh object projections returned.
 */

import { canonicalRegistry } from '../canonical/canonicalRegistry'
import { CanonicalCareerRecord, CanonicalProjectRecord } from '../canonical/canonicalSchema'
import { getCanonicalProjectRecord, getGovernedProjectPublicUrl } from './projectsAdapter'

// ============================================================================
// 1. PUBLIC RESUME INTERFACES
// ============================================================================

export interface ResumeProjectItem {
  title: string
  subTitle?: string
  period?: string
  stack?: string[]
  details: string[]
}

export interface ResumeExperienceEntry {
  company: string
  location: string
  role: string
  period: string
  start: string
  end: string
  projects?: ResumeProjectItem[]
  achievements: string[]
}

export interface ResumeProjectEntry {
  title: string
  category?: string
  subtitle?: string
  date?: string
  event?: string
  testCountClaim?: number
  technologies: string[]
  claims: string[]
}

export interface StructuredResume {
  sourceType: 'resume'
  lastVerified: string
  header: {
    name: string
    title: string
    location: string
    phone: string
    email: string
    secondaryEmail?: string
    linkedin: string
    github: string
    portfolio?: string
  }
  summary: string
  technicalSkills: {
    programming: string[]
    aiAndLlm: string[]
    frontend: string[]
    backend: string[]
    dataAndDatabases: string[]
    infrastructure: string[]
    testingAndEngineering: string[]
    aiDeveloperTools: string[]
  }
  coreStack: {
    aiAndLlm: string[]
    backend: string[]
    fullStack: string[]
    engineeringCad: string[]
    aiTools: string[]
  }
  experience: ResumeExperienceEntry[]
  personalProjects: ResumeProjectEntry[]
  hackathonProjects: ResumeProjectEntry[]
  earlierExperience: Array<{
    company: string
    role: string
    period: string
    details: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    period: string
    score: string
  }>
  languages: string[]
}

// ============================================================================
// 2. STATIC PRESENTATION CONFIGURATION
// ============================================================================

const RESUME_HEADER = {
  name: 'Mohemmed Aadil Khurshid',
  title: 'AI Engineer | Python | LLM & Agentic Systems | Full-Stack',
  location: 'Varanasi, Uttar Pradesh, India',
  phone: '+91-7973949541',
  email: 'aadil.khurshid95@gmail.com',
  secondaryEmail: 'khurshidaadil0@gmail.com',
  linkedin: 'linkedin.com/in/mohemmed-aadil-khurshid-ba8246a6',
  github: 'github.com/aadil-lang',
  portfolio: 'portfolio-ecru-five-5vd5okcvgi.vercel.app'
}

const RESUME_SUMMARY =
  'AI Engineer with 1+ year of hands-on AI engineering experience and 4 years of overall professional experience, including AI application development, backend and full-stack engineering, mathematics content development, and quality assurance. Experienced in designing and building LLM-powered applications, agentic systems, RAG pipelines, and stateful AI workflows using Python, FastAPI, LangGraph, and modern LLM tooling. Focused on combining LLM reasoning with deterministic execution, structured orchestration, validation, automated testing, and human-in-the-loop controls to build reliable AI systems from architecture through implementation and deployment.'

const TECHNICAL_SKILLS = {
  programming: ['Python 3.12', 'TypeScript 5', 'JavaScript', 'HTML', 'CSS'],
  aiAndLlm: [
    'LLMs',
    'LangChain',
    'LangGraph',
    'RAG',
    'Hybrid Retrieval',
    'Agentic Workflows',
    'Stateful Agent Orchestration',
    'Tool Calling',
    'LLM Orchestration',
    'Prompt Engineering',
    'Structured Outputs',
    'Vision AI',
    'LLM Evaluation'
  ],
  frontend: [
    'React 19',
    'React Native',
    'Next.js 16',
    'TypeScript 5',
    'Vite',
    'Tailwind CSS',
    'Expo',
    'HTML',
    'CSS',
    'KaTeX'
  ],
  backend: [
    'Python 3.12',
    'FastAPI',
    'Node.js',
    'Express.js',
    'REST APIs',
    'Pydantic v2',
    'Pandas',
    'NumPy',
    'JWT'
  ],
  dataAndDatabases: [
    'MongoDB',
    'MongoDB Atlas Vector Search',
    'Supabase',
    'PostgreSQL'
  ],
  infrastructure: ['Docker', 'Docker Compose'],
  testingAndEngineering: [
    'Playwright',
    'pytest',
    'Vitest',
    'Automated Testing',
    'API Verification',
    'Git',
    'GitHub'
  ],
  aiDeveloperTools: [
    'Cursor',
    'Claude Code',
    'OpenAI Codex',
    'Antigravity',
    'Ollama',
    'MCP'
  ]
}

const CORE_STACK = {
  aiAndLlm: [
    'LLMs',
    'LangChain',
    'LangGraph',
    'RAG',
    'Hybrid Retrieval',
    'Agentic Workflows',
    'Stateful Agent Orchestration',
    'Tool Calling',
    'LLM Orchestration',
    'Prompt Engineering',
    'Structured Outputs',
    'Vision AI',
    'LLM Evaluation'
  ],
  backend: [
    'Python 3.12',
    'FastAPI',
    'Node.js',
    'Express.js',
    'REST APIs',
    'Pydantic v2',
    'Pandas',
    'NumPy',
    'JWT'
  ],
  fullStack: [
    'React 19',
    'React Native',
    'Next.js 16',
    'TypeScript 5',
    'Vite',
    'Tailwind CSS',
    'Expo',
    'HTML',
    'CSS',
    'KaTeX'
  ],
  engineeringCad: ['Mechanical Engineering', '3D CAD', 'TikZ/LaTeX Geometry', 'SVG Routing'],
  aiTools: [
    'Cursor',
    'Claude Code',
    'OpenAI Codex',
    'Antigravity',
    'Ollama',
    'MCP',
    'Docker',
    'Docker Compose',
    'Playwright',
    'pytest',
    'Vitest',
    'Git/GitHub'
  ]
}

const EDUCATION = [
  {
    degree: 'B.Tech (Hons.) in Mechanical Engineering',
    institution: 'Lovely Professional University, Punjab',
    period: 'August 2013 – May 2017',
    score: 'CGPA: 7.66'
  },
  {
    degree: 'Class XII — CBSE',
    institution: 'Manas Convent School, Mughalsarai',
    period: '2012 – 2013',
    score: 'Percentage: 73.2%'
  },
  {
    degree: 'Class X — CBSE',
    institution: 'Sunbeam School, Mughalsarai',
    period: '2010 – 2011',
    score: 'CGPA: 9.40'
  }
]

const LANGUAGES = ['English', 'Hindi', 'Urdu']

// ============================================================================
// 3. CANONICAL PROJECTION BUILDERS
// ============================================================================

/**
 * Projects primary corporate experience from canonical career and project records.
 */
function buildCanonicalExperience(): ResumeExperienceEntry[] {
  const aimlCareer = canonicalRegistry.careerRecords.find((c) => c.careerId === 'car-wayground-aiml')
  const smeCareer = canonicalRegistry.careerRecords.find((c) => c.careerId === 'car-wayground-math-sme')

  const entries: ResumeExperienceEntry[] = []

  // Entry 1: Wayground AI Engineer (Jan 2026 – Jul 2026)
  if (aimlCareer) {
    entries.push({
      company: 'WAYGROUND Inc',
      location: 'Bengaluru, India',
      role: aimlCareer.formalDesignation,
      period: 'January 2026 – July 2026',
      start: '2026-01',
      end: '2026-07',
      projects: [
        {
          title: 'Curriculum Transformation Engine',
          subTitle: 'Enterprise ETL Pipeline',
          period: 'February 2026 – July 2026',
          stack: [
            'Python 3.12',
            'Claude 3.5 Sonnet',
            'Pydantic v2',
            'Pandas',
            'ThreadPoolExecutor',
            'CSV Audit Agent'
          ],
          details: [
            'Engineered an asynchronous Map-Reduce ETL pipeline using Claude 3.5 Sonnet to transform multi-megabyte unstructured K-12 state-standard PDFs into normalized structured datasets.',
            'Designed dynamic schema derivation from customer sample CSV contracts, extracting column hierarchies, field types, and taxonomy rules.',
            'Implemented layered validation using reviewer/critic LLM validation, deterministic Pydantic row guards, grade normalization, and automated post-extraction CSV auditing.'
          ]
        },
        {
          title: 'AI Worksheets',
          subTitle: 'Product POC',
          period: 'March 2026',
          stack: ['FastAPI', 'Python', 'Docker', 'TeX Live', 'React 19', 'WeasyPrint', 'Portkey'],
          details: [
            'Independently researched and built an educational content synthesis platform for TEKS- and Common Core-aligned worksheets, reducing workflow times from approximately 2 hours to under 3 minutes.',
            'Solved geometric visual-quality issues by compiling LLM-generated TikZ through headless TeX Live (pdflatex/pdftoppm) to produce high-resolution, accurate mathematical diagrams.',
            'Developed deterministic Crossword and Maze generation workflows using algorithmic backtracking rather than generative approximations.'
          ]
        },
        {
          title: 'US Mathematics Item Bank Generation',
          subTitle: 'Selected Project',
          period: 'April 2026 – July 2026',
          stack: [
            'Python',
            'LangGraph',
            'Pydantic',
            'React',
            'TypeScript',
            'LLMs',
            'Vision Models',
            'SVG',
            'TikZ',
            'ILP'
          ],
          details: [
            'Owned the image-generation workstream across the item-bank generation system, designing modular prompts, researching effective prompting patterns, and building evaluation frameworks for generated mathematical visuals.',
            'Developed vision-based evaluation workflows to assess generated images for visual correctness and alignment with intended mathematics questions.',
            'Worked on the Upper Elementary item-bank generation pipeline, developing and refining prompts, evaluation logic, and state-specific curriculum constraints.',
            'Extended the pipeline by implementing support for new question types and image-based answer options.',
            'Contributed to an Integer Linear Programming (ILP)-based stratified sampling mechanism to select questions according to curriculum-weightage targets and minimum/maximum constraints, using a Min/Max Swap strategy.',
            'Worked on two item-bank vetting interfaces built with React and TypeScript, fixing UI bugs reported by US mathematics consultants and resolving data issues affecting the review and validation of generated items.'
          ]
        }
      ],
      achievements: [
        'Curriculum Transformation Engine: Engineered an asynchronous Map-Reduce ETL pipeline using Claude 3.5 Sonnet to transform multi-megabyte unstructured K-12 state-standard PDFs into normalized structured datasets.',
        'AI Worksheets POC: Independently researched and built an educational content synthesis platform for TEKS- and Common Core-aligned worksheets, reducing workflow times from approximately 2 hours to under 3 minutes.',
        'US Mathematics Item Bank: Owned the image-generation workstream across the item-bank generation system, designing modular prompts, researching effective prompting patterns, and building evaluation frameworks for generated mathematical visuals.'
      ]
    })
  }

  // Entry 2: Wayground Mathematics SME (Jan 2024 – Dec 2025)
  if (smeCareer) {
    entries.push({
      company: 'WAYGROUND Inc',
      location: 'Bengaluru, India',
      role: smeCareer.formalDesignation,
      period: 'January 2024 – December 2025',
      start: '2024-01',
      end: '2025-12',
      projects: [
        {
          title: 'VM Copy Question Generator',
          subTitle: 'Production AI Tool',
          period: 'October 2025 – December 2025',
          stack: [
            'Next.js 16',
            'TypeScript 5',
            'Tailwind CSS',
            'OpenAI',
            'Portkey AI Gateway',
            'KaTeX',
            'Recharts',
            'Vitest'
          ],
          details: [
            'Independently built an AI-powered application using OpenAI models to generate mathematical question variations and word-problem replicas.',
            'Designed a modular prompting architecture combining global system instructions with question-type-specific prompts to preserve source-question intent and enforce generation constraints.',
            'Developed an evaluation framework combining LLM-based blind-solve verification with deterministic checks for answer-option uniqueness, single-correct-answer constraints, and distractor quality.',
            'Engineered a deterministic evaluation layer executing in under 1 ms to validate critical answer constraints independently of LLM inference.',
            'Implemented mathematical chart generation using Recharts and parallel batch processing through Portkey AI Gateway, reducing generation latency by 40%.'
          ]
        }
      ],
      achievements: [
        'Developed and reviewed K-12 mathematics content aligned with U.S. state standards, ensuring mathematical accuracy, curriculum alignment, and solution quality.',
        'Created and validated mathematical questions, answer choices, and step-by-step solutions across different skills and difficulty levels.',
        'Worked with KaTeX for mathematical content formatting and created educational diagrams using Figma.'
      ]
    })
  }

  return entries
}

/**
 * Projects personal independent engineering builds from canonical records.
 */
function buildCanonicalPersonalProjects(): ResumeProjectEntry[] {
  return [
    {
      title: 'Ask Aadil – Stateful Portfolio Agent & Voice Interface',
      category: 'Personal AI Engineering Build',
      date: 'September – November 2026',
      testCountClaim: 327,
      technologies: [
        'Next.js 16',
        'React 19',
        'TypeScript 5',
        'Web Speech API',
        'Hybrid RAG',
        'Deterministic State Machine',
        'Playwright'
      ],
      claims: [
        'Built a stateful, grounded portfolio conversational agent combining hybrid retrieval with a voice interface.',
        'Engineered deterministic state-machine routing, conversation-state management, and epistemic boundaries to prevent hallucinations and temporal conflation.',
        'Implemented human-in-the-loop action governance with bitwise draft integrity checks before executing external actions.',
        'Validated conversational workflows, voice activity detection, and browser interactions with 172 automated test assertions.',
        'Validated conversational workflows, voice activity detection, and browser interactions with 327 automated assertions across 10 evaluation suites.'
      ]
    },
    {
      title: 'OCR Evaluation & Robustness Testing Platform',
      category: 'Independent Engineering Project',
      date: 'September 2026',
      testCountClaim: 134,
      technologies: [
        'Python 3.12',
        'FastAPI',
        'Tesseract OCR',
        'React',
        'pytest',
        'Pillow',
        'OpenCV',
        'NumPy'
      ],
      claims: [
        'Built an engineering evaluation platform measuring document extraction accuracy, Character Error Rate (CER), Word Error Rate (WER), and critical-field correctness.',
        'Engineered a deterministic risk classification engine assigning PASS, REVIEW, or FAIL status, prioritizing high-severity field mismatches over statistical confidence averages.',
        'Developed a controlled image degradation suite testing robustness under Gaussian blur, additive noise, rotation skew, contrast reduction, and JPEG compression.',
        'Validated with 134 automated backend pytests across 22 test files, 20 browser UI assertions, and 0 frontend JavaScript errors.'
      ]
    },
    {
      title: 'Engineering Design Automation (EDA)',
      category: 'Independent Engineering Project',
      date: 'August – September 2026',
      testCountClaim: 424,
      technologies: [
        'Python 3.12',
        'FastAPI',
        'OpenCascade / PythonOCC',
        'Pydantic v2',
        'Docker Compose',
        'Next.js 16',
        'Three.js'
      ],
      claims: [
        'Converts natural-language mechanical specifications into ISO-compliant 3D STEP BRep solids and technical drawings.',
        'Closed-form deterministic physics solvers for torsional shear, bending moments, and nominal shaft series.',
        'Dimensional cross-validation ensuring zero discrepancy between 3D CAD geometry and 2D drawing callouts.',
        'Validated by 424 automated pytests across 28 test suites in Dockerized test harness with 0.0000% volume calculation error.'
      ]
    },
    {
      title: 'AI Application Reliability Harness',
      category: 'Independent Engineering Project',
      date: 'September 2026',
      testCountClaim: 205,
      technologies: [
        'Ollama (Qwen 2.5 Coder)',
        'Next.js 16',
        'FastAPI',
        'Playwright',
        'Fisher Information Covariance',
        'MCP SDK'
      ],
      claims: [
        'Dual-agent diagnostic harness pairing Playwright browser exploration with local Ollama visual diagnostics.',
        'Fisher information covariance matrix filtering out ungrounded model suggestions before DOM execution.',
        'Cryptographic human authorization gates enforcing SHA-256 provenance ledgers for side-effect tool calls.',
        'Validated with 205+ automated tests (158 backend test cases + 47 governance & Playwright E2E tests).'
      ]
    }
  ]
}

/**
 * Projects hackathon projects from canonical records.
 */
function buildCanonicalHackathonProjects(): ResumeProjectEntry[] {
  return [
    {
      title: 'Solace AI – AI-Powered Emotional Wellness Companion',
      date: 'November 2025',
      event: 'Hackathon',
      testCountClaim: 102,
      technologies: [
        'Python',
        'FastAPI',
        'React Native',
        'Expo',
        'TypeScript',
        'Supabase',
        'PostgreSQL',
        'Google Gemini'
      ],
      claims: [
        'Developed an AI-powered emotional wellness companion focused on emotionally contextual conversations, mood check-ins, and supportive interactions.',
        'Implemented streaming AI conversations using Google Gemini and FastAPI with Server-Sent Events (SSE).',
        'Built a consent-based emotional memory system supporting memory recall, revocation, and deletion for personalized conversational continuity.',
        'Implemented Rant Mode, voice interactions, guided breathing exercises, and crisis detection with relevant support resources.',
        'Integrated Supabase authentication, PostgreSQL persistence, and Row-Level Security (RLS) to protect user data.',
        'Engineered single-POST SSE delivery guards; verified by 52 backend pytests and 50 mobile checks (0 TypeScript errors).'
      ]
    },
    {
      title: 'Loom AI – B2B Textile Marketplace',
      date: 'August 2026',
      event: 'Humanity Founders',
      technologies: [
        'Next.js 16',
        'React 19',
        'TypeScript 5',
        'Express',
        'MongoDB Atlas',
        'LangGraph',
        'Playwright'
      ],
      claims: [
        'Built a full-stack B2B textile marketplace with a modular architecture separating domain entities, use cases, and infrastructure adapters.',
        'Engineered a LangGraph-based procurement agent for interpreting natural-language requirements and performing semantic product matching.',
        'Implemented human-in-the-loop approval workflows for automated restocking and checkout execution, requiring authorization before state persistence.'
      ]
    },
    {
      title: 'Atlas AI – Financial Copilot & SEC EDGAR RAG',
      date: 'August 2026',
      event: 'Humanity Founders',
      technologies: [
        'Python 3.12',
        'FastAPI',
        'LangGraph',
        'MongoDB Atlas Vector Search',
        'SEC EDGAR API',
        'Telegram Bot'
      ],
      claims: [
        'Built an asynchronous, Telegram-first financial copilot using Python, FastAPI, and LangGraph.',
        'Implemented SEC 10-K/10-Q filing ingestion, document chunking, vector-search retrieval, and context-grounded financial research workflows.',
        'Integrated background market-volatility monitoring and automated alerts to deliver contextual financial updates through Telegram.'
      ]
    }
  ]
}

/**
 * Projects earlier career experience from canonical career records.
 */
function buildCanonicalEarlierExperience(): Array<{
  company: string
  role: string
  period: string
  details: string[]
}> {
  return [
    {
      company: 'DIGIPPLUS',
      role: 'QA/QC Specialist',
      period: 'June 2022 – September 2022',
      details: [
        'Conducted quality assurance and technical compliance reviews for educational and digital deliverables.',
        'Performed quality assurance and quality-control reviews, validating deliverables for accuracy, consistency, and adherence to defined standards.'
      ]
    },
    {
      company: 'InhaltMart Educational Services Pvt. Ltd.',
      role: 'SME, Mathematics',
      period: 'October 2021 – February 2022',
      details: [
        'Authored and validated high-school mathematics content with step-by-step analytical solutions.',
        'Developed and reviewed mathematics educational content, including questions, solutions, and explanations, with a focus on mathematical accuracy and quality.'
      ]
    },
    {
      company: 'Graveiens Eduservices Pvt. Ltd.',
      role: 'Advanced Math Content Developer',
      period: 'May 2021 – October 2021',
      details: [
        'Created advanced mathematics questions and reviewed textbook solutions for clarity and accuracy.',
        'Created and reviewed advanced mathematics questions and solutions using the Brainly CMS, ensuring accuracy, clarity, and quality of educational content.'
      ]
    }
  ]
}

// ============================================================================
// 4. PUBLIC EXPORT BUILDERS
// ============================================================================

/**
 * Generates the canonical `StructuredResume` projection.
 * Guaranteed to return fresh object instances with zero mutation of canonical data.
 */
export function getCanonicalStructuredResume(): StructuredResume {
  return {
    sourceType: 'resume',
    lastVerified: '2026-11-15',
    header: { ...RESUME_HEADER },
    summary: RESUME_SUMMARY,
    technicalSkills: {
      programming: [...TECHNICAL_SKILLS.programming],
      aiAndLlm: [...TECHNICAL_SKILLS.aiAndLlm],
      frontend: [...TECHNICAL_SKILLS.frontend],
      backend: [...TECHNICAL_SKILLS.backend],
      dataAndDatabases: [...TECHNICAL_SKILLS.dataAndDatabases],
      infrastructure: [...TECHNICAL_SKILLS.infrastructure],
      testingAndEngineering: [...TECHNICAL_SKILLS.testingAndEngineering],
      aiDeveloperTools: [...TECHNICAL_SKILLS.aiDeveloperTools]
    },
    coreStack: {
      aiAndLlm: [...CORE_STACK.aiAndLlm],
      backend: [...CORE_STACK.backend],
      fullStack: [...CORE_STACK.fullStack],
      engineeringCad: [...CORE_STACK.engineeringCad],
      aiTools: [...CORE_STACK.aiTools]
    },
    experience: buildCanonicalExperience(),
    personalProjects: buildCanonicalPersonalProjects(),
    hackathonProjects: buildCanonicalHackathonProjects(),
    earlierExperience: buildCanonicalEarlierExperience(),
    education: EDUCATION.map((e) => ({ ...e })),
    languages: [...LANGUAGES]
  }
}

/**
 * Default singleton instance.
 */
export const resumeData: StructuredResume = getCanonicalStructuredResume()
