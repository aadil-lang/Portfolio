/**
 * STRUCTURED RESUME SOURCE
 * Extracted directly from uploaded 2-page Resume.
 * Treated as a first-class distinct source for professional context,
 * concise employment chronology, formal titles, and stated projects.
 */
export interface ResumeExperienceEntry {
  company: string
  location: string
  role: string
  period: string
  start: string
  end: string
  projects?: Array<{
    title: string
    subTitle?: string
    period?: string
    stack?: string[]
    details: string[]
  }>
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

export const resumeData: StructuredResume = {
  sourceType: 'resume',
  lastVerified: '2026-11-10',
  header: {
    name: 'Mohemmed Aadil Khurshid',
    title: 'AI Engineer | Python | LLM & Agentic Systems | Full-Stack',
    location: 'Varanasi, Uttar Pradesh, India',
    phone: '+91-7973949541',
    email: 'aadil.khurshid95@gmail.com',
    secondaryEmail: 'khurshidaadil0@gmail.com',
    linkedin: 'linkedin.com/in/mohemmed-aadil-khurshid-ba8246a6',
    github: 'github.com/aadil-lang',
    portfolio: 'portfolio-ecru-five-5vd5okcvgi.vercel.app'
  },
  summary:
    'AI Engineer with around 1 year of hands-on AI engineering experience and 4 years of overall professional experience spanning AI application development, backend engineering, full-stack development, and mathematics domain expertise. Experienced in building LLM-powered applications, RAG pipelines, and agentic workflows using Python, FastAPI, LangGraph, Playwright, and modern LLM tooling. Focused on combining LLM capabilities with deterministic logic, structured workflows, validation, automated testing, and human-in-the-loop controls to build reliable AI systems from architecture through implementation and deployment.',
  technicalSkills: {
    programming: ['Python', 'TypeScript', 'JavaScript'],
    aiAndLlm: [
      'LLMs',
      'LangChain',
      'LangGraph',
      'RAG',
      'Agentic Workflows',
      'Tool Calling',
      'LLM Orchestration',
      'Prompt Engineering',
      'Structured Outputs',
      'Vision AI'
    ],
    frontend: ['React.js', 'Next.js', 'React Native', 'Expo', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'KaTeX'],
    backend: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'SSE Streaming', 'JWT Authentication'],
    dataAndDatabases: ['Supabase (PostgreSQL & RLS)', 'MongoDB', 'MongoDB Atlas', 'MongoDB Atlas Vector Search', 'Pandas', 'NumPy'],
    infrastructure: ['Docker', 'Docker Compose'],
    testingAndEngineering: [
      'Playwright',
      'pytest',
      'Automated Testing',
      'API Testing',
      'End-to-End Testing',
      'Git',
      'GitHub'
    ],
    aiDeveloperTools: [
      'Cursor',
      'Claude Code',
      'OpenAI Codex',
      'Antigravity',
      'Ollama',
      'Model Context Protocol (MCP)'
    ]
  },
  coreStack: {
    aiAndLlm: [
      'LLMs',
      'LangChain',
      'LangGraph',
      'RAG',
      'Agentic Workflows',
      'Tool Calling',
      'LLM Orchestration',
      'Prompt Engineering',
      'Structured Outputs',
      'Vision AI'
    ],
    backend: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'SSE Streaming', 'JWT Authentication', 'Pandas', 'NumPy'],
    fullStack: ['Python', 'TypeScript', 'JavaScript', 'React.js', 'Next.js', 'React Native', 'Expo', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'KaTeX'],
    engineeringCad: ['Mechanical Engineering', '3D CAD', 'TikZ/LaTeX Geometry', 'SVG Routing'],
    aiTools: ['Cursor', 'Claude Code', 'OpenAI Codex', 'Antigravity', 'Ollama', 'Model Context Protocol (MCP)', 'Docker', 'Git/GitHub']
  },
  experience: [
    {
      company: 'WAYGROUND Inc',
      location: 'Bengaluru, India',
      role: 'AI Engineer — AI/ML Team',
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
            'Engineered an asynchronous/concurrent Map-Reduce ETL pipeline using Claude 3.5 Sonnet to transform multi-megabyte, unstructured K–12 state-standard PDFs into normalized structured datasets.',
            'Designed dynamic schema derivation from customer-provided sample CSV contracts, extracting target column hierarchies, field types, and taxonomy rules for transformation.',
            'Implemented layered integrity validation using reviewer/critic LLM validation, deterministic Pydantic row guards, grade normalization, null-column handling, and automated post-extraction CSV auditing.',
            'Used ThreadPoolExecutor concurrency across document chunks to improve processing throughput across large curriculum datasets.'
          ]
        },
        {
          title: 'AI Worksheets',
          subTitle: 'Product POC',
          period: 'March 2026',
          stack: ['FastAPI', 'Python', 'Docker', 'TeX Live', 'React 19', 'WeasyPrint', 'Portkey'],
          details: [
            'Independently researched and built an end-to-end educational content synthesis platform for TEKS- and Common Core-aligned mathematics worksheets, reducing generation workflows from approximately 2 hours to under 3 minutes.',
            'Solved geometric visual-quality issues by compiling LLM-generated TikZ through headless TeX Live (pdflatex/pdftoppm) to produce high-resolution, mathematically accurate diagrams with caching.',
            'Developed deterministic Crossword and Maze generation workflows using algorithmic approaches rather than generative approximations, including backtracking-based crossword construction.',
            'Delivered Dockerized services supporting print-ready PDF generation and an interactive student-facing web application.'
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
            'Integer Linear Programming (ILP)'
          ],
          details: [
            'Owned the image-generation workstream across the entire item-bank generation system, designing modular prompts, researching effective prompting patterns, and building evaluation frameworks for generated mathematical visuals.',
            'Developed vision-based evaluation workflows to assess generated images for visual correctness and alignment with the intended mathematics questions.',
            'Worked on the Upper Elementary item-bank generation pipeline, developing and refining prompts, evaluation logic, and state-specific curriculum constraints.',
            'Extended the pipeline by implementing support for new question types and image-based answer options.',
            'Contributed to an Integer Linear Programming (ILP)-based stratified sampling mechanism to select questions from the generated bank according to curriculum-weightage targets and minimum/maximum constraints, using a Min/Max Swap strategy.',
            'Worked on two item-bank vetting interfaces built with React and TypeScript, fixing UI bugs reported by US mathematics consultants and resolving data issues affecting the review and validation of generated items.'
          ]
        }
      ],
      achievements: [
        'Engineered an asynchronous/concurrent Map-Reduce ETL pipeline using Claude 3.5 Sonnet to transform multi-megabyte unstructured PDFs into normalized datasets.',
        'Independently built an educational content synthesis platform for TEKS- and Common Core-aligned worksheets, reducing workflow times from 2 hours to under 3 minutes.',
        'Contributed to a stateful, cyclic LangGraph pipeline for mathematics item generation across 12 U.S. state-specific item banks.'
      ]
    },
    {
      company: 'WAYGROUND Inc',
      location: 'Bengaluru, India',
      role: 'Subject Matter Expert — Mathematics',
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
        'Developed and reviewed K–12 mathematics content aligned with U.S. state standards, ensuring mathematical accuracy, curriculum alignment, and solution quality.',
        'Created and validated mathematical questions, answer choices, and step-by-step solutions across different skills and difficulty levels.',
        'Worked with KaTeX for mathematical content formatting and created educational diagrams using Figma.'
      ]
    }
  ],
  personalProjects: [
    {
      title: 'Ask Aadil — Stateful Portfolio Agent & Voice Interface',
      category: 'Personal AI Engineering Build',
      date: 'September – November 2026',
      testCountClaim: 327,
      technologies: [
        'Next.js 16',
        'React 19',
        'TypeScript 5',
        'Web Speech API',
        'Hybrid Retrieval',
        'Deterministic State Machine',
        'Playwright'
      ],
      claims: [
        'Built a stateful, grounded portfolio conversational agent with hybrid multi-source retrieval and voice interface.',
        'Engineered deterministic state machine routing and epistemic boundaries preventing hallucinations and temporal conflation.',
        'Implemented human-in-the-loop action governance with bitwise draft integrity before executing external actions.',
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
        'Validated with 205+ automated tests (158 backend test suites + 47 governance & Playwright E2E tests).'
      ]
    }
  ],
  hackathonProjects: [
    {
      title: 'Solace AI — Mindful Wellness Companion',
      date: 'November 2026',
      event: 'Solace Hackathon',
      testCountClaim: 102,
      technologies: [
        'React Native (Expo 58)',
        'TypeScript',
        'Python 3.12',
        'FastAPI',
        'LangGraph',
        'Google Gemini API',
        'Supabase Auth & PostgreSQL (RLS)',
        'SSE Streaming'
      ],
      claims: [
        'Built an Expo 58 mobile wellness companion and FastAPI/LangGraph backend featuring synchronous pre-LLM crisis screening (Tele-MANAS 14416 / 112 / 988) with figurative idiom filtering.',
        'Implemented consent-based emotional memory with domain isolation from voice journals and bilingual English/Urdu Nastaliq poetry under Supabase RLS, purging raw voice buffers in a finally block.',
        'Engineered single-POST SSE delivery guards classifying 502/503/504 gateway drops as ambiguous without blind retries; verified by 52 backend pytests and 50 mobile checks (0 TypeScript errors).'
      ]
    },
    {
      title: 'Loom AI — B2B Textile Marketplace',
      date: 'August 2026',
      event: 'Humanity Founders — Marketplace Hackathon',
      technologies: [
        'Next.js 16',
        'React 19',
        'TypeScript 5',
        'Express 5',
        'MongoDB Atlas',
        'LangGraph',
        'Tailwind CSS',
        'Playwright'
      ],
      claims: [
        'Built a full-stack B2B textile marketplace connecting verified buyers and mills using a layered architecture separating domain entities, use cases, adapters, and frameworks.',
        'Developed an agentic procurement workflow using LangGraph to extract structured textile requirements and perform semantic matching against available products.',
        'Implemented Human-in-the-Loop approval for high-risk automated actions such as restocking and checkout execution, requiring explicit buyer confirmation before state persistence.'
      ]
    },
    {
      title: 'Atlas AI — Financial Copilot & SEC EDGAR RAG',
      date: 'August 2026',
      event: 'Humanity Founders — Finance Hackathon',
      technologies: [
        'Python 3.12',
        'FastAPI',
        'LangGraph',
        'MongoDB Atlas Vector Search',
        'Gemini',
        'SEC EDGAR API',
        'python-telegram-bot',
        'pytest'
      ],
      claims: [
        'Built an asynchronous Telegram-first financial copilot using LangGraph for research routing, market-data retrieval, and multimodal chart analysis.',
        'Integrated SEC EDGAR APIs with automatic CIK resolution to retrieve and chunk 10-K, 10-Q, and 8-K filings, generating embeddings for retrieval through MongoDB Atlas Vector Search.',
        'Implemented background monitoring for market prices and SEC filings using asynchronous workers, enabling proactive Telegram alerts.'
      ]
    }
  ],
  earlierExperience: [
    {
      company: 'DIGIPPLUS',
      role: 'QA/QC Specialist',
      period: 'June 2022 – September 2022',
      details: [
        'Performed quality assurance and quality-control reviews, validating deliverables for accuracy, consistency, and adherence to defined standards.'
      ]
    },
    {
      company: 'InhaltMart Educational Services Pvt. Ltd.',
      role: 'SME, Mathematics',
      period: 'October 2021 – February 2022',
      details: [
        'Developed and reviewed mathematics educational content, including questions, solutions, and explanations, with a focus on mathematical accuracy and quality.'
      ]
    },
    {
      company: 'Graveiens Eduservices Pvt. Ltd.',
      role: 'Advanced Math Content Developer',
      period: 'May 2021 – October 2021',
      details: [
        'Created and reviewed advanced mathematics questions and solutions using the Brainly CMS, ensuring accuracy, clarity, and quality of educational content.'
      ]
    }
  ],
  education: [
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
  ],
  languages: ['English', 'Hindi', 'Urdu']
}
