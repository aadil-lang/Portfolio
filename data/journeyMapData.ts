export type ProvenanceType =
  | 'EMPLOYMENT ROLE'
  | 'INDEPENDENT BUILD'
  | 'COLLABORATIVE TEAM PROJECT'
  | 'SME / TESTER / VALIDATOR'
  | 'RESEARCH / EXPLORATION'
  | 'CAPABILITY ROUTE'
  | 'SELF-DIRECTED'
  | 'WORKFLOW TRANSITION'
  | 'CONTINUING FRONTIER'

export interface JourneyNode {
  id: string
  stationNumber: string
  date: string
  title: string
  organization?: string
  role?: string
  provenance: ProvenanceType
  provenanceDetails?: string
  zoneId: 'zone-01' | 'zone-02' | 'zone-03' | 'zone-04'
  zoneName: string
  x: number
  y: number
  symbolType: 'circle' | 'ring' | 'diamond' | 'dashed-ring' | 'major-node' | 'pulse-node' | 'branch-node' | 'end-node'
  significance: string
  transition: string
  details: string[]
  technologies: string[]
  journalAnchor: string
  systemSlug?: string
  routeType: 'solid' | 'branch' | 'dashed-research' | 'continuing'
}

export const JOURNEY_ZONES = [
  { id: 'all', label: 'All Zones', startX: 0, endX: 2450 },
  { id: 'zone-01', label: 'Zone 01: Math Foundations (2021–2023)', startX: 40, endX: 520 },
  { id: 'zone-02', label: 'Zone 02: Wayground Systems (2024–2025)', startX: 540, endX: 1020 },
  { id: 'zone-03', label: 'Zone 03: AI/ML Engineering (2026)', startX: 1040, endX: 1840 },
  { id: 'zone-04', label: 'Zone 04: Systems & Horizon (2026+)', startX: 1860, endX: 2410 }
]

export const JOURNEY_NODES: JourneyNode[] = [
  // ZONE 01: MATHEMATICAL & QUALITY FOUNDATIONS (2021 - 2023)
  {
    id: 'graveiens-2021',
    stationNumber: '01',
    date: 'May 2021 — Oct 2021',
    title: 'Mathematical Content Creation',
    organization: 'Graveiens Edu Services Pvt. Ltd.',
    role: 'Subject Matter Expert (Mathematics)',
    provenance: 'EMPLOYMENT ROLE',
    zoneId: 'zone-01',
    zoneName: 'ZONE 01 // MATH & QUALITY FOUNDATIONS',
    x: 100,
    y: 280,
    symbolType: 'circle',
    significance: 'Authored original US curriculum K-12 math solutions using Brainly CMS, GeoGebra, and Desmos.',
    transition: 'I learned the problem domain before I ever tried to automate it.',
    details: [
      'Authored original K–12 mathematics textbook solutions adhering to US standards',
      'Utilized Brainly CMS alongside GeoGebra, Desmos, and Mathcha.io for visual plots',
      'Developed deep domain intuition for mathematical pedagogy and learner bottlenecks'
    ],
    technologies: ['Mathematics Content', 'Brainly CMS', 'GeoGebra', 'Desmos', 'Mathcha.io'],
    journalAnchor: 'graveiens',
    routeType: 'solid'
  },
  {
    id: 'inhaltmart-2021',
    stationNumber: '02',
    date: 'Oct 2021 — Feb 2022',
    title: 'Mathematical Representation & Authoring',
    organization: 'InhaltMart Educational Services',
    role: 'Subject Matter Expert (Mathematics) → Team Lead',
    provenance: 'EMPLOYMENT ROLE',
    zoneId: 'zone-01',
    zoneName: 'ZONE 01 // MATH & QUALITY FOUNDATIONS',
    x: 220,
    y: 280,
    symbolType: 'circle',
    significance: 'Typeset complex mathematical proofs with LaTeX and MathType while performing plagiarism auditing.',
    transition: 'I learned that mathematical correctness also depends on how mathematics is represented.',
    details: [
      'Typeset complex mathematical equations and proofs using MathType and LaTeX syntax',
      'Constructed TI-83 calculator graphing solutions for algebraic and calculus models',
      'Conducted plagiarism detection and removal across content pools'
    ],
    technologies: ['LaTeX', 'MathType', 'TI-83 Graphing', 'Plagiarism Detection'],
    journalAnchor: 'inhaltmart',
    routeType: 'solid'
  },
  {
    id: 'digipplus-2022',
    stationNumber: '03',
    date: 'Jun 2022 — Sep 2022',
    title: 'Quality Control & Validation',
    organization: 'Digipplus (Coshell Digital Solution India)',
    role: 'QA/QC Specialist',
    provenance: 'EMPLOYMENT ROLE',
    zoneId: 'zone-01',
    zoneName: 'ZONE 01 // MATH & QUALITY FOUNDATIONS',
    x: 340,
    y: 280,
    symbolType: 'circle',
    significance: 'Audited K–10 math assessment items for mathematical validity, distractor quality, and copyright integrity.',
    transition: 'I moved from creating content to systematically evaluating it.',
    details: [
      'Audited K–10 mathematics items for mathematical validity, distractor quality, and formatting',
      'Conducted originality verification and copyright integrity checks across assessment pools'
    ],
    technologies: ['Quality Assurance', 'Content Auditing', 'Distractor Validation', 'K–10 Standards'],
    journalAnchor: 'digipplus',
    routeType: 'solid'
  },
  {
    id: 'learning-2022',
    stationNumber: '04',
    date: 'Sep 2022 — Dec 2023',
    title: 'Independent Quantitative Study',
    organization: 'Independent Study',
    role: 'Quantitative Foundations & Analytical Discipline',
    provenance: 'SELF-DIRECTED',
    zoneId: 'zone-01',
    zoneName: 'ZONE 01 // MATH & QUALITY FOUNDATIONS',
    x: 460,
    y: 280,
    symbolType: 'circle',
    significance: 'Rigorous preparation mastering speed, accuracy, algorithmic mental models, and deductive syllogisms.',
    transition: 'Cultivated analytical mental models and independent problem-solving discipline before entering digital product environments.',
    details: [
      'Mastered speed, accuracy, and algorithmic mental models for high-level quantitative aptitude',
      'Studied formal deductive syllogisms, pattern analysis, and quantitative problem-solving'
    ],
    technologies: ['Quantitative Aptitude', 'Deductive Logic', 'Analytical Modeling'],
    journalAnchor: 'goal-pursuit',
    routeType: 'solid'
  },

  // ZONE 02: WAYGROUND CONTENT SYSTEMS (2024 - 2025)
  {
    id: 'wayground-sme-2024',
    stationNumber: '05',
    date: 'Jan 2024 — Mar 2024',
    title: 'Wayground SME Entry & KaTeX',
    organization: 'Wayground (Quizizz)',
    role: 'Mathematics SME & Content Contributor',
    provenance: 'EMPLOYMENT ROLE',
    zoneId: 'zone-02',
    zoneName: 'ZONE 02 // WAYGROUND CONTENT SYSTEMS',
    x: 600,
    y: 280,
    symbolType: 'major-node',
    significance: 'Entered Wayground creating step-by-step KaTeX solutions maintained through Google Sheets and tested on dev server.',
    transition: 'Mathematical correctness was only one part of the problem. The mathematical representation also had to be technically correct.',
    details: [
      'Entered Wayground as a mathematics SME and content contributor',
      'Authored detailed step-by-step mathematical solutions using KaTeX',
      'Maintained questions and metadata through Google Sheets workflows',
      'Tested questions and rendering on local development server'
    ],
    technologies: ['KaTeX', 'Mathematics Content', 'Google Sheets Workflows', 'Local Dev Server'],
    journalAnchor: 'wayground',
    routeType: 'solid'
  },
  {
    id: 'voyagemath-v1-2024',
    stationNumber: '06',
    date: 'Mid-Mar 2024 — Apr 2024',
    title: 'VoyageMath Content Builder V1',
    organization: 'Wayground (Quizizz)',
    role: 'SME + User + Tester + Workflow Feedback',
    provenance: 'SME / TESTER / VALIDATOR',
    provenanceDetails: 'Built by VoyageMath Engineering; User contributed as SME tester, bug reporter, and workflow advisor',
    zoneId: 'zone-02',
    zoneName: 'ZONE 02 // WAYGROUND CONTENT SYSTEMS',
    x: 720,
    y: 280,
    symbolType: 'ring',
    significance: 'Tested V1 authoring system, reported bugs, recommended features, and provided SME workflow requirements.',
    transition: 'The VoyageMath Engineering team built the tool; I validated it from the content and user workflow perspective.',
    details: [
      'Tested the V1 tool against real content creation workflows and identified authoring bugs',
      'Recommended features and provided domain feedback to help engineering align tool design with content needs',
      'Ownership distinction: Built by VoyageMath Engineering; user contributed as SME tester and workflow advisor'
    ],
    technologies: ['VoyageMath V1 (Mathverse)', 'Workflow QA', 'Bug Reporting', 'SME Requirements'],
    journalAnchor: 'voyagemath-builder',
    routeType: 'solid'
  },
  {
    id: 'figma-visuals-2024',
    stationNumber: '07',
    date: '2024 — 2025',
    title: 'Figma Math Visual Production',
    organization: 'Wayground (Quizizz)',
    role: 'Mathematics SME / Visual Content Creator',
    provenance: 'CAPABILITY ROUTE',
    zoneId: 'zone-02',
    zoneName: 'ZONE 02 // WAYGROUND CONTENT SYSTEMS',
    x: 800,
    y: 170,
    symbolType: 'branch-node',
    significance: 'Learned Figma to produce, modify, and correct mathematical vector diagrams, coordinate figures, and step visuals.',
    transition: 'Side capability route: Contributed mathematical visual assets for questions and step solutions.',
    details: [
      'Created, modified, and corrected mathematical visuals for questions and step-by-step solutions',
      'Engineered vector diagrams directly connected to mathematical text and coordinate systems',
      'Framed strictly as Mathematical Visual Production (visual asset production, not UI/UX design)'
    ],
    technologies: ['Figma', 'Vector Geometry', 'Mathematical Visuals', 'Diagrammatic Assets'],
    journalAnchor: 'figma-visuals',
    routeType: 'branch'
  },
  {
    id: 'ai-workflow-2024',
    stationNumber: '08',
    date: 'August 2024',
    title: 'AI Enters Practical Workflow',
    organization: 'Wayground (Quizizz)',
    role: 'Mathematics SME',
    provenance: 'WORKFLOW TRANSITION',
    zoneId: 'zone-02',
    zoneName: 'ZONE 02 // WAYGROUND CONTENT SYSTEMS',
    x: 840,
    y: 280,
    symbolType: 'pulse-node',
    significance: 'AI entered daily professional workflow as a human-in-the-loop assistant to accelerate question replica creation.',
    transition: 'AI became part of the practical content creation workflow, shifting the bottleneck to human verification.',
    details: [
      'Operated within human-in-the-loop AI generation workflows for question replicas',
      'Evaluated model-generated StepGuides against mathematical rigor and instructional standards',
      'Used ChatGPT directly for question candidates and replica generation'
    ],
    technologies: ['LLM Generation', 'ChatGPT', 'StepGuide Workflows', 'Human-in-the-Loop QC'],
    journalAnchor: 'ai-workflow',
    routeType: 'solid'
  },
  {
    id: 'vm-copy-2025',
    stationNumber: '09',
    date: 'Oct — Nov 2025',
    title: 'VM Copy Question Generator',
    organization: 'Wayground (Quizizz)',
    role: 'Creator & Lead Developer',
    provenance: 'INDEPENDENT BUILD',
    zoneId: 'zone-02',
    zoneName: 'ZONE 02 // WAYGROUND CONTENT SYSTEMS',
    x: 960,
    y: 280,
    symbolType: 'circle',
    significance: 'Built full-stack Next.js + OpenAI application with in-memory deterministic evaluator enforcing CA/distractor guardrails.',
    transition: 'Generating a question was not the same as generating a good question. LLM generates candidates → deterministic evaluator checks constraints.',
    details: [
      'Decoupled stochastic candidate generation from deterministic validation outside the model',
      'Built in-memory Tier-1 Deterministic Evaluator enforcing 4 options, single CA, and duplicate rejection at 0ms cost',
      'Direct catalyst for internal transition from Content SME to AI/ML Engineering team'
    ],
    technologies: ['Next.js 16', 'TypeScript 5', 'Deterministic Validation', 'Portkey AI Gateway'],
    journalAnchor: 'vm-copy-generator',
    systemSlug: 'vm-copy',
    routeType: 'solid'
  },

  // ZONE 03: FORMAL AI/ML ENGINEERING (2026)
  {
    id: 'ai-transition-2026',
    stationNumber: '10',
    date: 'January 2026',
    title: 'Formal AI/ML Team Transition',
    organization: 'Wayground (Quizizz)',
    role: 'AI Engineer / Consultant, AI/ML Team',
    provenance: 'EMPLOYMENT ROLE',
    zoneId: 'zone-03',
    zoneName: 'ZONE 03 // FORMAL AI/ML ENGINEERING',
    x: 1100,
    y: 280,
    symbolType: 'major-node',
    significance: 'Formal organizational transition into Wayground AI/ML Engineering team, focusing on AI evaluation & generation systems.',
    transition: 'Formal transition marking the shift from content work into dedicated AI/ML systems engineering.',
    details: [
      'Formally joined Wayground AI/ML Team as AI Engineer / Consultant',
      'Engineered structured generation systems, multi-agent evaluation, and curriculum ETL pipelines'
    ],
    technologies: ['AI/ML Engineering', 'System Architecture', 'Evaluation Engineering'],
    journalAnchor: 'ai-transition',
    routeType: 'solid'
  },
  {
    id: 'ai-question-gen-2026',
    stationNumber: '11',
    date: 'Jan — Feb 2026',
    title: 'AI Question Generator',
    organization: 'Wayground (Quizizz)',
    role: 'AI Engineer',
    provenance: 'INDEPENDENT BUILD',
    zoneId: 'zone-03',
    zoneName: 'ZONE 03 // FORMAL AI/ML ENGINEERING',
    x: 1220,
    y: 280,
    symbolType: 'circle',
    significance: 'Structured generation system ensuring schema-adherent K-12 math item candidates with programmatic validation.',
    transition: 'Transformed repetitive prompt-based generation into a reliable, structured application pipeline.',
    details: [
      'Engineered structured JSON output schemas for multi-choice and numerical math items',
      'Integrated programmatic constraint checks to eliminate hallucinated answer choices'
    ],
    technologies: ['JSON Schema', 'Python', 'LLM Guardrails', 'Validation Pipelines'],
    journalAnchor: 'ai-question-generator',
    routeType: 'solid'
  },
  {
    id: 'ai-worksheets-2026',
    stationNumber: '12',
    date: 'Feb — Mar 2026',
    title: 'AI Worksheets Product POC',
    organization: 'Wayground',
    role: 'Independent Company POC Creator',
    provenance: 'INDEPENDENT BUILD',
    zoneId: 'zone-03',
    zoneName: 'ZONE 03 // FORMAL AI/ML ENGINEERING',
    x: 1340,
    y: 280,
    symbolType: 'circle',
    significance: 'Full-stack POC generating TEKS worksheets with compiled TikZ/LaTeX diagrams and 2D algorithmic maze solvers.',
    transition: 'The model did not need to control every part of the system; non-LLM tasks are solved deterministically.',
    details: [
      'React 18 / Vite 6 frontend with an asynchronous FastAPI backend',
      'Headless TeX Live (pdflatex) subprocess pool caching verified 300-DPI diagrams',
      'Algorithmic 2D crossword and hexagonal maze backtracking solvers'
    ],
    technologies: ['FastAPI', 'Python 3.12', 'React 18', 'TeX Live (pdflatex)', 'Backtracking'],
    journalAnchor: 'ai-worksheets-poc',
    systemSlug: 'ai-worksheets',
    routeType: 'solid'
  },
  {
    id: 'curriculum-phase1-2026',
    stationNumber: '13',
    date: 'Mar — Apr 2026',
    title: 'Curriculum Transformation (Phase 1)',
    organization: 'Wayground',
    role: 'Research & Exploration Lead',
    provenance: 'RESEARCH / EXPLORATION',
    zoneId: 'zone-03',
    zoneName: 'ZONE 03 // FORMAL AI/ML ENGINEERING',
    x: 1440,
    y: 180,
    symbolType: 'dashed-ring',
    significance: 'Exploratory research mapping unstructured PDF/DOCX standards into dynamic schemas.',
    transition: 'Exploratory architecture validating dynamic schema derivation before production scaling.',
    details: [
      'Exploratory research into dynamic schema derivation from multi-format standards',
      'Evaluated document parsing bottlenecks across unstructured state curriculum files'
    ],
    technologies: ['Curriculum Research', 'Schema Discovery', 'PDF/DOCX Extraction'],
    journalAnchor: 'curriculum-transformation-engine',
    routeType: 'dashed-research'
  },
  {
    id: 'us-item-bank-2026',
    stationNumber: '14',
    date: 'Apr — Jul 2026',
    title: 'US Math Item Bank Pipeline',
    organization: 'Wayground',
    role: 'AI/ML Team Member (Visual Routing & ILP Optimizers)',
    provenance: 'COLLABORATIVE TEAM PROJECT',
    provenanceDetails: 'Collaborative team project. Specific user contributions: SVG/TikZ visual routing, compile/visual verification gates, ILP & Min/Max Swap optimization, SME validation.',
    zoneId: 'zone-03',
    zoneName: 'ZONE 03 // FORMAL AI/ML ENGINEERING',
    x: 1540,
    y: 370,
    symbolType: 'diamond',
    significance: 'Team project generating state assessment items. Engineered TikZ vs SVG visual routing, ILP optimization, and compile gates.',
    transition: 'Collaborative engineering: Integrated integer linear programming and compile verification gates into a multi-member pipeline.',
    details: [
      'Engineered domain-based mathematical image generation routing (SVG vs. TikZ)',
      'Constructed two-tier compile and visual evaluation gates',
      'Formulated Integer Linear Programming (ILP) and Min/Max Swap algorithms for grade/DOK balance'
    ],
    technologies: ['TikZ / LaTeX', 'SVG Generation', 'ILP Optimization', 'Vision Evaluation', 'Grade Schemas'],
    journalAnchor: 'us-item-bank',
    systemSlug: 'math-item-bank',
    routeType: 'solid'
  },
  {
    id: 'curriculum-phase2-2026',
    stationNumber: '15',
    date: 'July 2026',
    title: 'Curriculum Transformation (Phase 2)',
    organization: 'Wayground',
    role: 'Wayground AI/ML Team Production Engine Build',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Wayground AI/ML Team production ETL engine. Architected high-throughput Claude Map-Reduce pipeline.',
    zoneId: 'zone-03',
    zoneName: 'ZONE 03 // FORMAL AI/ML ENGINEERING',
    x: 1660,
    y: 280,
    symbolType: 'circle',
    significance: 'Asynchronous Claude 3.5 Sonnet Map-Reduce ETL pipeline transforming standards into normalized datasets with Celery/Redis & Pydantic contracts.',
    transition: 'Production ETL Map-Reduce processing long documents into strict JSON tool outputs with Reviewer → Critic → CSV Audit verification gates.',
    details: [
      'Asynchronous Map-Reduce pipeline executing parallel LLM extraction workers with strict JSON tool calling',
      'Celery/Redis worker queues processing chunked long-document PDF, DOCX, and URL manifests',
      'Dynamic Pydantic schema contract synthesis for runtime validation',
      '3-Tier Integrity Gates (Reviewer → Critic → CSV Audit) validating extracted curriculum items'
    ],
    technologies: ['LLM Extraction (Claude)', 'Python', 'Map-Reduce', 'Celery / Redis', 'Pydantic Contracts', 'CSV Audit'],
    journalAnchor: 'curriculum-transformation-engine',
    systemSlug: 'curriculum-etl',
    routeType: 'solid'
  },
  {
    id: 'wayground-end-2026',
    stationNumber: '16',
    date: 'July 21, 2026',
    title: 'Wayground Engagement Concludes',
    organization: 'Wayground',
    role: 'Transition Checkpoint',
    provenance: 'EMPLOYMENT ROLE',
    zoneId: 'zone-03',
    zoneName: 'ZONE 03 // FORMAL AI/ML ENGINEERING',
    x: 1780,
    y: 280,
    symbolType: 'major-node',
    significance: 'Major career transition marking the completion of the 2.5-year engagement at Wayground across SME, content systems, and AI/ML engineering roles.',
    transition: 'The 2.5-year Wayground chapter concludes, but the engineering journey continues into unmapped territory.',
    details: [
      'Successfully completed 2.5-year Wayground transformation journey (Jan 2024 – July 2026)',
      'Pivoted fully into independent AI systems engineering, agent reliability, and governance architectures'
    ],
    technologies: ['Systems Engineering', 'Career Transition', 'Architecture Planning'],
    journalAnchor: 'wayground-conclusion',
    routeType: 'solid'
  },

  // ZONE 04: INDEPENDENT AI SYSTEMS & HORIZON (2026+)
  {
    id: 'loom-atlas-2026',
    stationNumber: '17',
    date: 'August 2026',
    title: 'Loom AI & Atlas AI',
    organization: 'Independent Hackathon Builds',
    role: 'System Architect & Author',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Independent hackathon projects built in August 2026.',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // SYSTEMS & HORIZON',
    x: 1920,
    y: 180,
    symbolType: 'circle',
    significance: 'Loom AI (LangGraph B2B procurement with HITL gates) & Atlas AI (Stateful RAG copilot across SEC EDGAR filings & market feeds with 178 pytests).',
    transition: 'Built in August 2026: Shifted into stateful agent workflows and financial retrieval architectures.',
    details: [
      'Loom AI: LangGraph B2B procurement workflow engine with human approval authorization gates',
      'Atlas AI: SEC EDGAR 10-K/10-Q parsing, MongoDB Atlas Vector Search, Finnhub market feeds, 178 pytests'
    ],
    technologies: ['Next.js 16', 'LangGraph', 'SEC EDGAR', 'MongoDB Atlas Vector Search', 'FastAPI'],
    journalAnchor: 'loom-ai',
    systemSlug: 'loom-ai',
    routeType: 'solid'
  },
  {
    id: 'eda-cad-2026',
    stationNumber: '18',
    date: 'September 2026',
    title: 'Engineering Design Automation (EDA CAD)',
    organization: 'Personal Engineering',
    role: 'System Architect & Sole Author',
    provenance: 'INDEPENDENT BUILD',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // SYSTEMS & HORIZON',
    x: 2020,
    y: 370,
    symbolType: 'circle',
    significance: 'Parametric CAD synthesis pairing natural language briefs with closed-form physics solvers and OpenCascade BRep CAD kernels (STEP/SVG export).',
    transition: 'Built in September 2026: AI interprets natural language; deterministic physics algorithms calculate and enforce invariant 3D geometry.',
    details: [
      'Hybrid AI-to-CAD synthesis with OpenCascade BRep CAD kernel generating 3D STEP geometry & SVG technical drawings',
      'Verified material provenance with ASTM/EN tables; 424 passing pytests with 0.0000% volume error'
    ],
    technologies: ['Python', 'OpenCascade CAD / BRep / STEP', 'Physics Solvers', 'SVG Technical Drawings'],
    journalAnchor: 'eda-cad',
    systemSlug: 'design-automation',
    routeType: 'solid'
  },
  {
    id: 'ai-reliability-2026',
    stationNumber: '19',
    date: 'September 2026',
    title: 'AI Application Reliability & QA Harness',
    organization: 'Personal Engineering',
    role: 'Reliability Engineer & Author',
    provenance: 'INDEPENDENT BUILD',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // SYSTEMS & HORIZON',
    x: 2120,
    y: 280,
    symbolType: 'circle',
    significance: 'Autonomous browser testing platform pairing Playwright Chromium execution grounding with local Ollama Qwen 2.5 Coder & Fisher covariance uncertainty abstention.',
    transition: 'Built in September 2026: The question evolved from "Can AI build this?" to "How do we know what the AI actually did?"',
    details: [
      'Execution grounding capturing DOM snapshots, network payloads, console logs, and Playwright screenshots',
      'Fisher Information covariance uncertainty modeling: deterministically abstains when ambiguity is high'
    ],
    technologies: ['Playwright', 'Ollama (Qwen 2.5 Coder)', 'FastAPI', 'Next.js', 'Model Context Protocol (MCP)'],
    journalAnchor: 'ai-reliability',
    systemSlug: 'ai-reliability',
    routeType: 'solid'
  },
  {
    id: 'ongoing-frontier-2026',
    stationNumber: '20',
    date: 'September 2026 — Present',
    title: 'Ask Aadil & Continuous Exploration',
    organization: 'The Engineering Horizon',
    role: 'Independent AI Engineer & Researcher',
    provenance: 'CONTINUING FRONTIER',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // SYSTEMS & HORIZON',
    x: 2260,
    y: 280,
    symbolType: 'end-node',
    significance: 'Developing Ask Aadil stateful portfolio RAG agent with deterministic tool governance, voice interface, and 334 automated assertions.',
    transition: 'THE MAP CONTINUES → Exploring the boundary between stochastic model output and deterministic verification.',
    details: [
      'Building Ask Aadil: Portfolio RAG agent with deterministic tool governance and voice interface',
      'Exploring browser automation reliability, Fisher information uncertainty modeling, and MCP integrations',
      'The engineering journey is continuously unfolding'
    ],
    technologies: ['Ask Aadil', 'RAG Governance', 'Voice Interface', 'Continuous Exploration'],
    journalAnchor: 'ask-aadil',
    routeType: 'continuing'
  }
]
