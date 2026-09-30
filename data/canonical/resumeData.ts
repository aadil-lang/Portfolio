/**
 * STRUCTURED RESUME SOURCE
 * Extracted directly from public/resume.pdf.
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
  projects?: string[]
  achievements: string[]
}

export interface ResumeProjectEntry {
  title: string
  category: string
  claims: string[]
  testCountClaim?: number
  technologies: string[]
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
    github: string
  }
  summary: string
  coreStack: {
    aiAndLlm: string[]
    backend: string[]
    fullStack: string[]
    engineeringCad: string[]
    aiTools: string[]
  }
  experience: ResumeExperienceEntry[]
  personalProjects: ResumeProjectEntry[]
  education: Array<{
    degree: string
    institution: string
    graduatedYear: number
    score: string
  }>
  languages: string[]
}

export const resumeData: StructuredResume = {
  sourceType: 'resume',
  lastVerified: '2026-09-29',
  header: {
    name: 'Mohemmed Aadil Khurshid',
    title: 'AI Engineer / Python Backend Developer',
    location: 'Varanasi, Uttar Pradesh',
    phone: '+91-7973949541',
    email: 'aadil.khurshid95@gmail.com',
    github: 'github.com/aadil-lang'
  },
  summary:
    'AI Engineer and Python Backend Developer with 4 years of professional experience, focused on building AI pipelines, agentic workflows, backend systems, and full-stack AI applications. Experienced in LangGraph-based orchestration, multi-model LLM routing, automated validation, high-throughput ETL, FastAPI, and production-oriented system design.',
  coreStack: {
    aiAndLlm: [
      'Gemini',
      'Claude',
      'LangChain',
      'LangGraph',
      'Agentic Workflows',
      'LLM Orchestration',
      'Tool Calling',
      'Dynamic Routing',
      'Prompt Engineering',
      'Multimodal/Vision AI Evaluation'
    ],
    backend: [
      'Python',
      'FastAPI',
      'Pandas',
      'NumPy',
      'Asynchronous/State-Driven Processing',
      'JWT Authentication',
      'Portkey API',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'AWS S3'
    ],
    fullStack: [
      'JavaScript/TypeScript',
      'Next.js',
      'React',
      'Vite',
      'Streamlit',
      'HTML5',
      'CSS3',
      'Tailwind CSS'
    ],
    engineeringCad: [
      'Creo Parametric',
      '3D Parametric Solid Modeling',
      'Engineering Drawing',
      'Mechanical Design'
    ],
    aiTools: [
      'VS Code',
      'Cursor',
      'Claude Code',
      'OpenAI Codex',
      'Antigravity',
      'Git/GitHub',
      'Docker'
    ]
  },
  experience: [
    {
      company: 'WAYGROUND (QUIZIZZ)',
      location: 'Bangalore, India (Onsite)',
      role: 'AI Engineer / Consultant, AI/ML Team',
      period: 'Jan 2026 – Jul 2026',
      start: '2026-01',
      end: '2026-07',
      projects: [
        'AI Worksheets — Full-Stack POC for US Market',
        'US Mathematics Item Bank Generation Pipeline — Backend',
        'Curriculum-Transformation Engine — Backend ETL',
        'AI Question Generator — Unified Full-Stack Python Application'
      ],
      achievements: [
        'Architected and built a React/Vite frontend and FastAPI backend for US educator workflows, reducing worksheet creation from hours to minutes.',
        'Engineered production-oriented UI with interactive gameplay matrices, real-time KaTeX rendering, and clue navigation; structured the frontend as a blueprint for core-site integration.',
        'Implemented multi-model routing through Portkey, mapping question tasks to GPT-4o and graphic generation to Gemini 3 Flash.',
        'Built the graphics backend using headless TikZ/LaTeX subprocess pools and containerized the stack with Docker Compose, PostgreSQL, Redis, and MinIO.',
        'Built a stateful LangGraph generation pipeline with planner, amplification, and question-generation nodes for multi-stage question-bank creation.',
        'Developed layered automated validation combining schema checks, Vision LLM image verification, and final logical evaluation before upload.',
        'Designed conditional graphics routing to direct geometry and real-world image requests to SVG/XML processing and abstract mathematical layouts to TikZ.',
        'Engineered data stratification using Integer Linear Programming and Min/Max Swap logic to match curriculum weightages, DOK metrics, and grade-level targets.',
        'Built a high-throughput Claude Map-Reduce pipeline that chunks long documents, executes parallel LLM mappings with strict JSON tool calling, and merges outputs from PDFs, DOCX, URLs, and manifests.',
        'Decoupled schema contracts from parsing logic by deriving layouts and column rules from sample datasets, eliminating hardcoded document scripts.',
        'Implemented a three-tier integrity gate using Reviewer, Critic, and CSV Audit stages to validate extracted rows before export.',
        'Built a portable FastAPI/Streamlit application with local curriculum standards lookup and a GPT-4o verification loop for generated content alignment.'
      ]
    },
    {
      company: 'WAYGROUND (QUIZIZZ)',
      location: 'Bangalore, India (Onsite)',
      role: 'Subject Matter Expert — Mathematics',
      period: 'Jan 2024 – Dec 2025',
      start: '2024-01',
      end: '2025-12',
      achievements: [
        'Authored and curated high-volume K-12 mathematics content aligned with Common Core and TEKS standards.',
        'Independently architected and deployed a full-stack Next.js application using OpenAI models to automate math variations and word-problem replicas.',
        'Shipped the application successfully, leading directly to the internal transition into the AI/ML team.'
      ]
    },
    {
      company: 'PERSONAL GOAL PURSUIT',
      location: 'Self-Directed',
      role: 'Career Break / Competitive Exam Preparation',
      period: 'Sep 2022 – Dec 2023',
      start: '2022-09',
      end: '2023-12',
      achievements: [
        'Structured self-development in quantitative aptitude, logical reasoning, and English while preparing for competitive examinations.'
      ]
    },
    {
      company: 'DIGIPPLUS',
      location: 'Remote, India',
      role: 'QA/QC Specialist',
      period: 'Jun 2022 – Sep 2022',
      start: '2022-06',
      end: '2022-09',
      achievements: [
        'Reviewed K-10 mathematics content, structured objective questions, and performed originality and quality audits.'
      ]
    },
    {
      company: 'INHALTMART EDUCATIONAL SERVICES PVT. LTD.',
      location: 'Remote, India',
      role: 'Subject Matter Expert — Mathematics',
      period: 'Oct 2021 – Feb 2022',
      start: '2021-10',
      end: '2022-02',
      achievements: [
        'Created K-12 mathematics solutions and formatted complex mathematical notation using MS Word and MathType.'
      ]
    },
    {
      company: 'GRAVEIENS EDUSERVICES PVT. LTD.',
      location: 'Remote, India',
      role: 'Advanced Math Content Developer',
      period: 'May 2021 – Oct 2021',
      start: '2021-05',
      end: '2021-10',
      achievements: [
        'Developed mathematics solutions and visual explanations and maintained structured mathematical content in CMS workflows.'
      ]
    }
  ],
  personalProjects: [
    {
      title: 'Engineering Design Automation — AI + Deterministic Engineering Systems',
      category: 'Full-Stack Engineering Design System',
      testCountClaim: 424,
      technologies: [
        'Python',
        'FastAPI',
        'OpenCascade / PythonOCC',
        'Pydantic',
        'Docker',
        'Next.js',
        'Three.js'
      ],
      claims: [
        'Converts natural-language mechanical requirements into structured specifications.',
        'Deterministic shaft-design calculations with closed-form engineering solvers for torque, allowable stress, diameter sizing, and nominal series selection.',
        'Generates validated STEP BRep and SVG technical-drawing artifacts from design specification.',
        'CAD <-> drawing dimensional cross-validation and blocked-state handling for missing physical properties.',
        '424 tests passing across 28 test suites, deployed as Dockerized FastAPI full-stack service.'
      ]
    },
    {
      title: 'Atlas AI',
      category: 'Personal / Hackathon Project',
      testCountClaim: 59,
      technologies: [
        'Python 3.12',
        'FastAPI',
        'LangGraph',
        'MongoDB Atlas',
        'Gemini Embeddings',
        'Telegram API'
      ],
      claims: [
        'AI-powered financial assistant as a Telegram bot supporting conversational financial workflows.',
        'Stateful graph with LangGraph for routing, planning, reasoning, and task execution.',
        'Tool execution for market research, conversational memory extraction, and Gemini integrations.',
        'Validated core graph functionality with 59 automated tests on resume.'
      ]
    },
    {
      title: 'Curriculum-Transformation ETL Pipeline',
      category: 'Data Engineering ETL Pipeline',
      technologies: ['Python', 'Claude API', 'JSON Tool Calling', 'Pandas', 'Asyncio'],
      claims: [
        'Asynchronous Map-Reduce orchestration layer for long-form parsing across unstructured curriculum files.',
        'Derives, parses, transforms, and aligns inputs into standardized machine-readable schemas without hardcoded parsing scripts.',
        'Includes assessment scripts, quality tracking nodes, critics, and CSV structure audits with 3-tier integrity gates.'
      ]
    },
    {
      title: 'B2B Textile Marketplace (Loom AI)',
      category: 'Hackathon Project / Personal Build',
      technologies: ['Next.js', 'React', 'Express.js', 'MongoDB', 'LangGraph'],
      claims: [
        'Responsive buyer-supplier marketplace using Next.js/React with Clean Architecture backend.',
        'Explored semantic product understanding, textile product discovery, and automated buyer-supplier matching with LangGraph HITL queue.'
      ]
    },
    {
      title: 'Binance Futures Trading Bot',
      category: 'Testnet Automation',
      technologies: ['Python', 'Binance Futures API', 'Asyncio', 'Logging'],
      claims: [
        'Developed Python bot supporting BUY/SELL market and limit orders on Binance Futures Testnet with validation and structured exception handling.'
      ]
    }
  ],
  education: [
    {
      degree: 'B.Tech (Hons.) in Mechanical Engineering',
      institution: 'Lovely Professional University',
      graduatedYear: 2017,
      score: 'CGPA 7.66 / 10'
    },
    {
      degree: 'Senior Secondary (XII), CBSE',
      institution: 'Manas Convent School',
      graduatedYear: 2013,
      score: '73.20%'
    },
    {
      degree: 'Secondary (X), CBSE',
      institution: 'Sunbeam School, Mughalsarai',
      graduatedYear: 2011,
      score: 'CGPA 9.40 / 10'
    }
  ],
  languages: ['English', 'Hindi', 'Urdu']
}
