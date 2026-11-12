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
  category?: 'Hackathon Project' | 'Independent Engineering Project' | 'Independent Personal Project' | 'Professional Employment' | string
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
  { id: 'all', label: 'All Zones', startX: 0, endX: 2580 },
  { id: 'zone-01', label: 'Zone 01: Math Foundations (2021–2023)', startX: 40, endX: 520 },
  { id: 'zone-02', label: 'Zone 02: Wayground Systems (2024–2025)', startX: 540, endX: 1020 },
  { id: 'zone-03', label: 'Zone 03: AI/ML Engineering (2026)', startX: 1040, endX: 1840 },
  { id: 'zone-04', label: 'Zone 04: Still Building & Exploring (Aug 2026+)', startX: 1860, endX: 2560 }
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

  // ZONE 04: INDEPENDENT AI ENGINEERING & RESEARCH (AUG 2026+)
  // Career Context: Following the July 2026 conclusion of Wayground employment,
  // all work represents independent engineering, hackathons, and research.
  {
    id: 'loom-ai-2026',
    stationNumber: '17',
    date: 'August 2026',
    title: 'Loom AI — B2B Textile Marketplace Platform',
    organization: 'Humanity Founders Marketplace Hackathon',
    role: 'System Architect & Author',
    category: 'Hackathon Project',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Independent hackathon project built for Humanity Founders Marketplace Hackathon in August 2026.',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 1920,
    y: 180,
    symbolType: 'circle',
    significance: 'B2B textile marketplace architecture pairing multi-agent LangGraph procurement matching with human-in-the-loop (HITL) order approval gates.',
    transition: 'Built in August 2026: Shifted into multi-agent LangGraph architectures where sensitive procurement actions require deterministic human approval.',
    details: [
      'Multi-agent LangGraph workflow engine coordinating buyer inquiries, supplier quotation matching, and inventory verification',
      'Human-in-the-loop (HITL) approval queues guaranteeing human sign-off before purchase commitment',
      'Comprehensive Playwright end-to-end integration and API test harnesses'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Express', 'MongoDB Atlas', 'LangGraph', 'Playwright'],
    journalAnchor: 'loom-ai',
    systemSlug: 'loom-ai',
    routeType: 'solid'
  },
  {
    id: 'atlas-ai-2026',
    stationNumber: '18',
    date: 'August 2026',
    title: 'Atlas AI — Financial Copilot & SEC Filing RAG',
    organization: 'Humanity Founders Finance Hackathon',
    role: 'Backend & Systems Engineer',
    category: 'Hackathon Project',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Independent hackathon project built for Humanity Founders Finance Hackathon in August 2026.',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 1920,
    y: 370,
    symbolType: 'circle',
    significance: 'Stateful conversational RAG across SEC EDGAR 10-K/10-Q disclosures, Finnhub market feeds, and automated Telegram alert workers.',
    transition: 'Built in August 2026: Engineered temporal-aware financial RAG with background daemon alert monitoring and 59 core (expanding to 178) pytests.',
    details: [
      'Hybrid RAG parsing SEC EDGAR 10-K/10-Q disclosures with chunk-level attribution and financial table preservation',
      'Vector search retrieval layer powered by MongoDB Atlas Vector Search and Gemini embeddings',
      'Automated background alert worker daemon sending threshold notifications to Telegram',
      'Verified with 59 automated tests for core graph MVP, expanding to 178 pytests in complete test runner'
    ],
    technologies: ['Python', 'FastAPI', 'LangGraph', 'MongoDB Atlas Vector Search', 'Gemini', 'SEC EDGAR', 'Telegram'],
    journalAnchor: 'atlas-ai',
    systemSlug: 'atlas-ai',
    routeType: 'solid'
  },
  {
    id: 'ocr-evaluator-2026',
    stationNumber: '19',
    date: 'September 2026',
    title: 'OCR Evaluation & Robustness Testing Platform',
    organization: 'Independent Engineering Project',
    role: 'Systems & Evaluation Engineer',
    category: 'Independent Engineering Project',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Independent engineering system built in September 2026 to measure document extraction accuracy and degradation robustness.',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 2040,
    y: 180,
    symbolType: 'circle',
    significance: 'Evaluation platform measuring document extraction accuracy, confidence, critical-field correctness, and robustness under controlled image degradation.',
    transition: 'Built in September 2026: Answers the question "Can this OCR result be trusted?" using CER/WER, field-level matching, and risk classification.',
    details: [
      'Multi-tier evaluation: Character Error Rate (CER), Word Error Rate (WER), field-level matching, and critical-field accuracy',
      'Risk classification engine assigning PASS / REVIEW / FAIL decisions based on field severity and OCR confidence',
      'Robustness testing under 5 controlled degradations: blur, noise, rotation, contrast, and JPEG compression',
      'Verified with 134 automated backend pytests across 22 test files, 20 browser UI assertions, and 0 frontend JS errors'
    ],
    technologies: ['Python 3.12', 'FastAPI', 'Tesseract OCR', 'React', 'pytest', 'Pillow', 'OpenCV', 'NumPy'],
    journalAnchor: 'ocr-evaluator',
    systemSlug: 'ocr-evaluator',
    routeType: 'solid'
  },
  {
    id: 'eda-cad-2026',
    stationNumber: '20',
    date: 'September 2026',
    title: 'Engineering Design Automation (EDA CAD)',
    organization: 'Independent Engineering Project',
    role: 'System Architect & Sole Author',
    category: 'Independent Engineering Project',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Independent engineering system built in September 2026.',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 2040,
    y: 370,
    symbolType: 'circle',
    significance: 'Parametric CAD synthesis pairing natural language briefs with closed-form physics solvers and OpenCascade BRep CAD kernels (STEP/SVG export).',
    transition: 'Built in September 2026: AI interprets natural language; deterministic physics algorithms calculate and enforce invariant 3D geometry.',
    details: [
      'Hybrid AI-to-CAD synthesis with OpenCascade BRep CAD kernel generating 3D STEP geometry & SVG technical drawings',
      'Verified material provenance with ASTM/EN tables; 424 passing pytests with 0.0000% volume error'
    ],
    technologies: ['Python', 'FastAPI', 'OpenCascade CAD / BRep / STEP', 'Physics Solvers', 'SVG Technical Drawings'],
    journalAnchor: 'eda-cad',
    systemSlug: 'design-automation',
    routeType: 'solid'
  },
  {
    id: 'ai-reliability-2026',
    stationNumber: '21',
    date: 'September 2026',
    title: 'AI Application Reliability & QA Harness',
    organization: 'Independent Engineering Project',
    role: 'Reliability Engineer & Author',
    category: 'Independent Engineering Project',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Independent engineering system built in September 2026.',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 2160,
    y: 280,
    symbolType: 'circle',
    significance: 'Autonomous browser testing platform pairing Playwright Chromium execution grounding with local Ollama Qwen 2.5 Coder & Fisher covariance uncertainty abstention.',
    transition: 'Built in September 2026: The question evolved from "Can AI build this?" to "How do we know what the AI actually did?"',
    details: [
      'Execution grounding capturing DOM snapshots, network payloads, console logs, and Playwright screenshots',
      'Fisher Information covariance uncertainty modeling: deterministically abstains when ambiguity is high',
      '158 backend test suites, 47 governance tests; autonomously dogfooded against VM Copy'
    ],
    technologies: ['Playwright', 'FastAPI', 'Ollama (Qwen 2.5 Coder)', 'Next.js', 'Model Context Protocol (MCP)'],
    journalAnchor: 'ai-reliability',
    systemSlug: 'ai-reliability',
    routeType: 'solid'
  },
  {
    id: 'portfolio-ask-aadil-2026',
    stationNumber: '22',
    date: 'September – November 2026',
    title: 'Engineering Portfolio & Ask Aadil',
    organization: 'Independent Personal Project',
    role: 'Lead AI Systems Engineer & Author',
    category: 'Independent Personal Project',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Three-layer engineering portfolio and grounded conversational agent Ask Aadil.',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 2280,
    y: 370,
    symbolType: 'circle',
    significance: 'Built this three-layer portfolio (Timeline, Journal, Systems) and Ask Aadil: source-aware hybrid RAG with deterministic state routing, bitwise draft integrity, and voice VAD.',
    transition: 'Built in September–November 2026: Turned the portfolio into an authoritative AI system that eliminates hallucinations, separates source layers, and governs side effects.',
    details: [
      'Preserves strict epistemic boundaries across Timeline, Journal, Systems, Resume, GitHub, and 3-state LinkedIn adapter',
      'Enforces bitwise draft integrity (executionInput === editedDraft) and voice interface backed by 172 automated assertions'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Hybrid RAG', 'Deterministic State Machine', 'Playwright', 'Web Speech API'],
    journalAnchor: 'ask-aadil',
    systemSlug: 'ask-aadil',
    routeType: 'solid'
  },
  {
    id: 'solace-ai-2026',
    stationNumber: '23',
    date: 'November 2026',
    title: 'Solace AI — Mindful Wellness Companion',
    organization: 'Solace Hackathon',
    role: 'System Architect & Sole Author',
    category: 'Hackathon Project',
    provenance: 'INDEPENDENT BUILD',
    provenanceDetails: 'Built independently for the Solace Hackathon (November 2026).',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 2280,
    y: 180,
    symbolType: 'circle',
    significance: 'Expo 58 + FastAPI/LangGraph mobile wellness sanctuary with deterministic pre-LLM crisis screening, consent-based memory, ephemeral voice purge, and 102 verified checks.',
    transition: 'Built in November 2026: Extended deterministic safety gates and ambiguous-delivery boundaries into mobile human-centered AI.',
    details: [
      'Synchronous pre-LLM crisis screening (Tele-MANAS 14416 / 112 / 988) with figurative idiom filtering inside LangGraph safety_node',
      'Single-POST SSE delivery guard classifying 502/503/504 as ambiguous, ephemeral audio buffer purge, and 52 backend + 50 mobile verified checks'
    ],
    technologies: ['React Native / Expo 58', 'FastAPI', 'LangGraph', 'Google Gemini API', 'Supabase RLS', 'SSE Streaming'],
    journalAnchor: 'solace-ai',
    systemSlug: 'solace-ai',
    routeType: 'solid'
  },
  {
    id: 'ongoing-frontier-2026',
    stationNumber: '24',
    date: 'August 2026 — Present',
    title: 'Independent AI Engineering & Research',
    organization: 'Independent AI Engineering & Research',
    role: 'Independent AI Engineer & Researcher',
    category: 'Independent Engineering Project',
    provenance: 'CONTINUING FRONTIER',
    zoneId: 'zone-04',
    zoneName: 'ZONE 04 // STILL BUILDING & EXPLORING (AUG 2026+)',
    x: 2400,
    y: 280,
    symbolType: 'end-node',
    significance: 'Building, experimenting and researching intelligent applications, agentic systems and reliable AI engineering solutions. Demonstrating continuous technical growth across practical systems.',
    transition: 'AUGUST 2026 — PRESENT → Still building. Still exploring. Pushing the boundary between stochastic reasoning and deterministic verification.',
    details: [
      'Continuous independent building and exploration since August 2026 across Loom AI, Atlas AI, OCR Evaluator, AI Reliability, EDA, Ask Aadil, and Solace AI',
      'Exploring agent reliability, Fisher information uncertainty modeling, safety-first mobile AI, and MCP integrations',
      'Continuous technical growth through shipping practical systems: Curiosity → Learning → Contribution → Building → Discovery → Repeat'
    ],
    technologies: ['Autonomous Agents', 'LangGraph', 'Playwright', 'FastAPI', 'Next.js', 'Deterministic Solvers'],
    journalAnchor: 'still-building',
    routeType: 'continuing'
  }
]
