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
  lastVerified: '2026-10-01',
  header: {
    name: 'Mohemmed Aadil Khurshid',
    title: 'AI Engineer | Python | LLM & Agentic Systems | Full-Stack',
    location: 'Varanasi, Uttar Pradesh, India',
    phone: '+91-7973949541',
    email: 'aadil.khurshid95@gmail.com',
    secondaryEmail: 'khurshidaadil0@gmail.com',
    linkedin: 'linkedin.com/in/mohemmed-aadil-khurshid-ba8246a6',
    github: 'github.com/aadil-lang'
  },
  summary:
    'AI Engineer with 4+ years of professional experience spanning AI application development, LLM and agentic systems, backend engineering, full-stack applications, and mathematics domain expertise. Experienced in building production-oriented AI workflows and independent engineering systems using Python, FastAPI, LangGraph, RAG, Playwright, and modern LLM tooling. Strong focus on combining LLM capabilities with deterministic logic, structured workflows, validation, testing, and human-in-the-loop controls to build reliable AI systems from concept and architecture through implementation and deployment.',
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
    frontend: ['React.js', 'Next.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'KaTeX'],
    backend: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
    dataAndDatabases: ['MongoDB', 'MongoDB Atlas', 'MongoDB Atlas Vector Search', 'Pandas', 'NumPy'],
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
    backend: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Pandas', 'NumPy'],
    fullStack: ['Python', 'TypeScript', 'JavaScript', 'React.js', 'Next.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'KaTeX'],
    engineeringCad: ['Mechanical Engineering', '3D CAD', 'TikZ/LaTeX Geometry', 'SVG Routing'],
    aiTools: ['Cursor', 'Claude Code', 'OpenAI Codex', 'Antigravity', 'Ollama', 'Model Context Protocol (MCP)', 'Docker', 'Git/GitHub']
  },
  experience: [
    {
      company: 'WAYGROUND',
      location: 'Bangalore, India',
      role: 'AI Engineer — AI/ML Team',
      period: 'January 2026 – July 2026',
      start: '2026-01',
      end: '2026-07',
      projects: [
        {
          title: 'AI Question Generator',
          subTitle: 'Full-Stack AI Application',
          period: 'January 2026 – February 2026',
          stack: ['FastAPI', 'Python', 'Streamlit', 'LLM APIs'],
          details: [
            'Built an AI-assisted mathematics question-generation application with curriculum standards lookup and interactive generation workflows.',
            'Implemented an LLM verification loop to validate generated assessment content before delivery.'
          ]
        },
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
          title: 'US Mathematics Item Bank',
          subTitle: 'AI/ML Team Project',
          period: 'April 2026 – July 2026',
          stack: ['Python', 'LangGraph', 'Pydantic', 'LLMs', 'SVG', 'TikZ', 'Vision Models'],
          details: [
            'Contributed to a stateful, cyclic LangGraph pipeline for mathematics item generation across 12 U.S. state-specific item banks, covering Middle School and Upper Elementary content.',
            'Designed and refined question-generation prompts and workflow logic, including support for Open-ended question types and image-based question options.',
            'Researched mathematical-image generation patterns and implemented domain-based routing between SVG and TikZ generation, including SVG-based geometry and TikZ-based graphs, number lines, and other mathematical visuals.',
            'Conducted cross-model image-quality research and evaluation, including TikZ compilation and vision-based verification, and developed prompts and stabilization strategies for Upper Elementary content.'
          ]
        }
      ],
      achievements: [
        'Built an AI-assisted mathematics question-generation application with curriculum standards lookup and interactive generation workflows.',
        'Engineered an asynchronous/concurrent Map-Reduce ETL pipeline using Claude 3.5 Sonnet to transform multi-megabyte unstructured PDFs into normalized datasets.',
        'Independently built an educational content synthesis platform for TEKS- and Common Core-aligned worksheets, reducing workflow times from 2 hours to under 3 minutes.',
        'Contributed to a stateful, cyclic LangGraph pipeline for mathematics item generation across 12 U.S. state-specific item banks.'
      ]
    },
    {
      company: 'WAYGROUND',
      location: 'Bangalore, India',
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
            'Portkey AI Gateway',
            'KaTeX',
            'Vitest'
          ],
          details: [
            'Independently built a Next.js/TypeScript mathematics question-generation application using OpenAI models to automate question variations and word-problem replicas.',
            'Engineered a zero-cost deterministic evaluation layer executing in under 1 ms, validating four unique options, single-correct-answer invariants, and pedagogical distractor rationales, with automated correction of rule violations outside the LLM.',
            'Implemented an independent blind-solve verification stage, using an LLM persona to evaluate generated questions for single-answer solvability before human SME review.',
            'Optimized generation through parallel batch partitioning with Portkey AI Gateway, reducing generation latency by approximately 40% while maintaining strict KaTeX mathematical formatting.'
          ]
        }
      ],
      achievements: [
        'Developed and reviewed K–12 mathematics content for multiple U.S. states, aligning questions, solutions, and explanations with state-specific curriculum standards.',
        'Created detailed, step-by-step mathematical solutions and explanations across different grade levels.',
        'Produced mathematics content using LaTeX and KaTeX, ensuring accurate rendering across educational materials.',
        'Created mathematical illustrations and visual learning assets in Figma.',
        'Independently built the VM Copy Question Generator production AI tool with a 0ms deterministic evaluation layer.'
      ]
    }
  ],
  personalProjects: [
    {
      title: 'Loom AI — B2B Textile Marketplace',
      category: 'Hackathon Project',
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
      category: 'Hackathon Project',
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
  hackathonProjects: [
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
