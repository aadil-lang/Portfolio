import { TimelineItem } from '../types'

/**
 * THE TIMELINE // CHRONOLOGICAL SPINE
 * Authoritative factual map of engineering evolution.
 * 
 * Flow:
 * TIMELINE (What happened → what I learned → how that enabled the next chapter)
 *   ↓
 * JOURNAL (Why / what was difficult / discoveries / reflections)
 *   ↓
 * SYSTEM (What was built / evidence / benchmarks)
 */
export const experience: TimelineItem[] = [
  // -------------------------------------------------------------------------
  // 1. EARLY CAREER — MATHEMATICAL CONTENT CREATION
  // -------------------------------------------------------------------------
  {
    id: 'may-2021-oct-2021-graveiens',
    period: 'May 2021 — Oct 2021',
    organization: 'Graveiens Edu Services Pvt. Ltd.',
    role: 'Subject Matter Expert (Mathematics)',
    title: 'Mathematical Content Creation',
    layerAnnotation: 'FOUNDATION — Problem Domain',
    summary:
      'First professional chapter in mathematical content creation. Created original Textbook Questions & Solutions (TBQ) manually for US curriculum textbooks, working through Brainly\'s CMS and discovering mathematical visualization tools such as GeoGebra, Desmos, and Mathcha.io.',
    capability: 'Content Creation + Mathematical Visualization',
    transition: 'I learned the problem domain before I ever tried to automate it.',
    details: [
      'Authored original K–12 mathematics textbook solutions adhering to US standards',
      'Utilized Brainly CMS alongside GeoGebra, Desmos, and Mathcha.io for visual plots',
      'Developed deep domain intuition for mathematical pedagogy and learner bottlenecks'
    ],
    technologies: ['Mathematics Content', 'Brainly CMS', 'GeoGebra', 'Desmos', 'Mathcha.io'],
    journalChapterRef: 1
  },
  {
    id: 'oct-2021-feb-2022-inhaltmart',
    period: 'Oct 2021 — Feb 2022',
    organization: 'InhaltMart Educational Services',
    role: 'Subject Matter Expert (Mathematics)',
    title: 'Mathematical Representation & Structured Authoring',
    layerAnnotation: 'REPRESENTATION — Notation & Structure',
    summary:
      'Continued creating Textbook Questions & Solutions while working with MS Word, MathType and LaTeX, using the TI-83 graphing calculator and performing plagiarism detection and removal.',
    capability: 'Mathematical Representation + Structured Authoring',
    transition: 'I learned that mathematical correctness also depends on how mathematics is represented.',
    details: [
      'Typeset complex mathematical equations and proofs using MathType and LaTeX syntax',
      'Constructed TI-83 calculator graphing solutions for algebraic and calculus models',
      'Conducted plagiarism detection and removal across content pools'
    ],
    technologies: ['LaTeX', 'MathType', 'TI-83 Graphing', 'Plagiarism Detection'],
    journalChapterRef: 1
  },
  {
    id: 'jun-2022-jul-2022-digiplus',
    period: 'Jun 2022 — Jul 2022',
    organization: 'Digiplus',
    role: 'QC K–10 Subject Matter Expert',
    title: 'Quality Control & Systematic Validation',
    layerAnnotation: 'QUALITY & VALIDATION — Systematic Auditing',
    summary:
      'Moved into mathematics content quality control, reviewing correctness, originality, formatting, answer choices and distractors.',
    capability: 'Quality Control + Validation',
    transition: 'I moved from creating content to systematically evaluating it.',
    details: [
      'Audited K–10 mathematics items for mathematical validity, distractor quality, and formatting',
      'Conducted originality verification and copyright integrity checks across assessment pools'
    ],
    technologies: ['Quality Assurance', 'Content Auditing', 'Distractor Validation', 'K–10 Standards'],
    journalChapterRef: 1
  },
  {
    id: 'aug-2022-dec-2023-learning',
    period: 'Aug 2022 — Dec 2023',
    organization: 'Independent Study',
    role: 'Competitive Examination Preparation',
    title: 'Independent Problem Solving & Discipline',
    layerAnnotation: 'INDEPENDENT DISCIPLINE — Quantitative Foundations',
    summary:
      'Dedicated to rigorous independent quantitative and analytical preparation, developing speed, accuracy, algorithmic mental models, and deductive problem-solving discipline.',
    capability: 'Independent Problem Solving + Discipline',
    transition: 'Cultivated analytical mental models and independent problem-solving discipline before entering digital product environments.',
    details: [
      'Mastered speed, accuracy, and algorithmic mental models for high-level quantitative aptitude',
      'Studied formal deductive syllogisms, pattern analysis, and quantitative problem-solving'
    ],
    technologies: ['Quantitative Aptitude', 'Deductive Logic', 'Analytical Modeling'],
    isQuieter: true
  },

  // -------------------------------------------------------------------------
  // 2. WAYGROUND (JANUARY 2024 — JULY 2026): ONE CONTINUOUS PROFESSIONAL CHAPTER
  // Sequence: SME Entry + KaTeX → VoyageMath V1 → VoyageMath Adoption →
  //           Figma Visuals → Expanded Visuals → AI Workflow → In-House Creation → VM Copy
  // -------------------------------------------------------------------------
  {
    id: 'wayground-m01-sme-katex',
    period: 'Jan 2024 — Mar 2024',
    organization: 'Wayground (Quizizz)',
    role: 'Mathematics SME & Content Development',
    title: 'SME Entry + Technical Mathematical Representation',
    layerAnnotation: 'SME ENTRY + REPRESENTATION — Moving from writing math to rendering math',
    summary:
      'Entered Wayground as a mathematics SME and content contributor, working with KaTeX to create step-by-step mathematical solutions maintained through Google Sheets and tested on the local development server.',
    capability: 'Domain Expertise + Technical Mathematical Representation',
    transition: 'Mathematical correctness was only one part of the problem. The mathematical representation also had to be technically correct.',
    details: [
      'Entered Wayground as a mathematics SME and content contributor',
      'Authored detailed step-by-step mathematical solutions using KaTeX',
      'Maintained questions and metadata through Google Sheets workflows',
      'Tested questions and rendering on the local development server'
    ],
    technologies: ['KaTeX', 'Mathematics Content', 'Google Sheets Workflows', 'Local Dev Server'],
    journalChapterRef: 2,
    milestoneNumber: 1,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'SME Entry + KaTeX'
  },
  {
    id: 'wayground-m02-content-builder-v1',
    period: 'Mid-Mar 2024 — Apr 2024',
    organization: 'Wayground (Quizizz)',
    role: 'SME + User + Tester + Domain Feedback',
    title: 'VoyageMath Content Builder V1',
    layerAnnotation: 'DOMAIN FEEDBACK — Contributing from the user side',
    summary:
      'The VoyageMath Engineering team built VoyageMath Content Builder V1 (previously Mathverse) to make content workflows scalable. My contribution was from the content/domain perspective: testing V1, identifying bugs, recommending features, and providing workflow feedback.',
    capability: 'Domain-to-Product Feedback + Workflow Thinking',
    transition: 'The VoyageMath Engineering team built the tool; I validated it from the content and user workflow perspective.',
    details: [
      'Tested the V1 tool against real content creation workflows and identified authoring bugs',
      'Recommended features and provided domain feedback to help engineering align tool design with content needs',
      'Ownership distinction: The VoyageMath Engineering team built VoyageMath; I contributed as SME tester and workflow advisor'
    ],
    technologies: ['VoyageMath V1 (Mathverse)', 'Workflow QA', 'Bug Reporting', 'SME Requirements'],
    journalChapterRef: 4,
    milestoneNumber: 2,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'VoyageMath V1'
  },
  {
    id: 'wayground-m03-voyagemath-adoption',
    period: 'Apr 2024 onward',
    organization: 'Wayground (Quizizz)',
    role: 'Content Development / SME',
    title: 'VoyageMath Tool Adoption',
    layerAnnotation: 'TOOL ADOPTION — Tool enters actual production',
    summary:
      'VoyageMath became part of the team\'s actual content production workflow, and the team expanded around the standardized authoring system.',
    capability: 'Tool-Assisted Content Workflow',
    transition: 'First clear example of a recurring content bottleneck becoming a software system.',
    details: [
      'Adopted VoyageMath as the primary authoring system across daily content production',
      'Observed how manual authoring friction is systematically eliminated by software systems'
    ],
    technologies: ['VoyageMath Production', 'Workflow Standardization', 'Team Scaling'],
    journalChapterRef: 4,
    milestoneNumber: 3,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'Tool Adoption'
  },
  {
    id: 'wayground-m04-figma-visual-content',
    period: '2024',
    organization: 'Wayground (Quizizz)',
    role: 'Content Development / SME',
    title: 'Figma & Mathematical Visual Production',
    layerAnnotation: 'MATHEMATICAL VISUALS — Question & solution visual production',
    summary:
      'As mathematical questions and solutions increasingly required visuals, I learned Figma with help from a colleague and began creating, modifying and correcting mathematical visuals.',
    capability: 'Mathematical Visual Production',
    transition: 'Contributed mathematical visual content; I was not a formal UI/UX or graphic designer.',
    details: [
      'Created, modified, and corrected mathematical visuals for questions and step-by-step solutions',
      'Engineered vector diagrams directly connected to mathematical text and coordinate systems',
      'Framed strictly as Mathematical Visual Production, not UI/UX or product design'
    ],
    technologies: ['Figma', 'Vector Geometry', 'Mathematical Visuals', 'Diagrammatic Representation'],
    journalChapterRef: 3,
    milestoneNumber: 4,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'Figma Visuals'
  },
  {
    id: 'wayground-m05-expanded-visual-contribution',
    period: '2025',
    organization: 'Wayground (Quizizz)',
    role: 'Content SME & Visual Production',
    title: 'Expanded Visual Content Production',
    layerAnnotation: 'PRODUCTION SUPPORT — Support under ~10-day turnaround cycles',
    summary:
      'In 2025, visual-content contribution became more regular and formal because content needed to reach production in approximately 10 days and the design team needed support.',
    capability: 'Expanded Visual Content Production',
    transition: 'Scaled visual content production during rapid delivery cycles, drawing on Figma workflows learned in 2024.',
    details: [
      'Supported rapid ~10-day production timelines for live curriculum releases',
      'Created, modified, and corrected mathematical visual assets to support production delivery',
      'Figma learned in 2024; visual-content contribution became more formal in 2025 under ~10-day cycles'
    ],
    technologies: ['Figma', 'Production Visuals', 'Rapid Turnaround', 'Mathematical Assets'],
    journalChapterRef: 3,
    milestoneNumber: 5,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'Expanded Visuals'
  },
  {
    id: 'wayground-m06-ai-assisted-workflow',
    period: '2025',
    organization: 'Wayground (Quizizz)',
    role: 'Content Development / SME',
    title: 'AI-Assisted Content Workflow',
    layerAnnotation: 'AI WORKFLOW — Human-in-the-loop productivity layer',
    summary:
      'AI entered the content workflow as a human-in-the-loop productivity layer to accelerate replica creation, generating candidate StepGuides reviewed and refined by content developers.',
    capability: 'AI-Assisted Workflow + Human-in-the-Loop Design',
    transition: 'AI increased throughput, but shifted the bottleneck to verification.',
    details: [
      'Operated within human-in-the-loop AI generation workflows for question replicas',
      'Evaluated model-generated StepGuides against mathematical rigor and instructional standards',
      'Recognized that generating an answer is entirely different from generating an educationally sound explanation'
    ],
    technologies: ['LLM Generation', 'StepGuide Workflows', 'Human-in-the-Loop', 'Quality Control'],
    journalChapterRef: 5,
    milestoneNumber: 6,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'AI Workflow'
  },
  {
    id: 'wayground-m07-in-house-question-creation',
    period: '2025',
    organization: 'Wayground (Quizizz)',
    role: 'Content Development / SME',
    title: 'In-House Question Creation',
    layerAnnotation: 'CONTENT QUALITY — Generating a question vs. a good question',
    summary:
      'Question creation moved more fully in-house after externally supplied questions sometimes failed intended topic, skill, or quality requirements. AI became part of the internal creation workflow.',
    capability: 'AI Generation + Content Quality Awareness',
    transition: 'A language model could generate something that looked like a question without necessarily generating a good question.',
    details: [
      'Transitioned away from inconsistent external agency sources toward internal question generation',
      'Used ChatGPT as an authoring assistant to create internal question candidates and variations',
      'Recognized that prompt expansion alone could not evaluate whether candidate questions met required constraints'
    ],
    technologies: ['ChatGPT Authoring', 'Candidate Generation', 'Quality Analysis', 'Prompt Boundaries'],
    journalChapterRef: 5,
    milestoneNumber: 7,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'In-House Creation'
  },
  {
    id: 'wayground-m08-vm-copy-generator',
    period: '2026',
    organization: 'Wayground (Quizizz)',
    role: 'Creator & Lead Developer',
    title: 'VM Question Creator / VM Copy Generator',
    layerAnnotation: 'EVALUATION — Deterministic validation outside the model',
    summary:
      'The crucial transition into AI engineering: generating a question was not the same as generating a good question. Rather than expanding prompts indefinitely, built a Next.js application where the LLM generates candidates and a deterministic evaluator checks constraints.',
    capability: 'Evaluation Thinking + Deterministic Validation',
    transition: 'LLM generates candidates → deterministic evaluation checks constraints outside the model.',
    details: [
      'Decoupled stochastic candidate generation from deterministic validation',
      'Built in-memory Tier-1 Deterministic Evaluator enforcing 4 options, single CA, and duplicate rejection at 0ms and $0 cost',
      'Direct catalyst for internal transition from Content SME to AI/ML Engineering team'
    ],
    technologies: ['Next.js 16', 'TypeScript 5', 'Deterministic Validation', 'Client Guardrails', 'Portkey AI Gateway'],
    journalChapterRef: 6,
    systemSlugRef: 'vm-copy',
    milestoneNumber: 8,
    isMilestone: true,
    isWaygroundSubMilestone: true,
    causalChain: 'VM Copy (Evaluation)'
  },

  // -------------------------------------------------------------------------
  // 3. WAYGROUND AI/ML ENGINEERING SYSTEMS (JANUARY 2026 — JULY 2026)
  // -------------------------------------------------------------------------
  {
    id: '2026-ai-worksheets',
    period: '2026',
    organization: 'Wayground',
    role: 'Independent Company POC',
    title: 'AI Worksheets Product POC',
    layerAnnotation: 'SYSTEM BOUNDARIES — Compilers & graph engines around AI',
    summary:
      'Full-stack company proof of concept automating TEKS-aligned educational content across two formats: formal worksheets with compiled TikZ/LaTeX diagrams and gamified mazes powered by deterministic 2D backtracking algorithms.',
    capability: 'Full-Stack AI + Backtracking & LaTeX Compilers',
    transition: 'The model did not need to control every part of the system; some problems are better solved deterministically.',
    details: [
      'React 18 / Vite 6 frontend with an asynchronous FastAPI backend',
      'Headless TeX Live (pdflatex) subprocess pool caching verified 300-DPI diagrams',
      'Algorithmic 2D crossword and hexagonal maze backtracking solvers'
    ],
    technologies: ['FastAPI', 'Python 3.12', 'React 18', 'Vite 6', 'TeX Live (pdflatex)', 'Poppler', 'Backtracking'],
    journalChapterRef: 7,
    systemSlugRef: 'ai-worksheets',
    isMilestone: true
  },
  {
    id: '2026-curriculum-etl',
    period: '2026',
    organization: 'Wayground',
    role: 'Independent Engineering Build',
    title: 'Curriculum Transformation Engine',
    layerAnnotation: 'DISTRIBUTED ETL — Structured extraction & runtime schema validation',
    summary:
      'Asynchronous Map-Reduce pipeline transforming unstructured state educational standards (PDFs, DOCX) into normalized tabular datasets with dynamic Pydantic schema validation.',
    capability: 'Asynchronous Map-Reduce & Schema Extraction',
    transition: 'Decoupled schema contracts from parsing logic by deriving layouts from sample datasets.',
    details: [
      'Dynamic schema derivation compiling runtime Pydantic validation contracts',
      'Asynchronous Map-Reduce pipeline executing parallel LLM extraction workers with strict JSON tool calling',
      'Three-tier integrity gate validating extracted rows before export'
    ],
    technologies: ['LLM Extraction (Claude)', 'Python', 'Data Transformation', 'Dynamic Pydantic Contracts', 'CSV Integrity'],
    journalChapterRef: 8,
    systemSlugRef: 'curriculum-etl',
    isMilestone: true
  },
  {
    id: '2026-math-item-bank',
    period: '2026',
    organization: 'Wayground',
    role: 'Company Team System',
    title: 'US Mathematics Item Bank Generation Pipeline',
    layerAnnotation: 'TEAM SYSTEM — Domain routing & visual compile gates',
    summary:
      'Company team system generating state-aligned mathematics assessment items. Contributed mathematical image domain routing (SVG vs. TikZ), two-tier compile and visual evaluation gates, and Upper Elementary schemas.',
    capability: 'Team System + Visual Domain Routing & Compile Gates',
    transition: 'Explicitly distinguished team collaboration from individual contributions to visual routing and evaluation gates.',
    details: [
      'Engineered domain-based mathematical image generation routing (SVG vs. TikZ)',
      'Constructed two-tier compile and visual evaluation gates',
      'Stabilized Upper Elementary pipeline across grade 3–5 standards'
    ],
    technologies: ['TikZ / LaTeX', 'SVG Generation', 'Domain Routing', 'Vision Evaluation', 'Prompt Engineering'],
    journalChapterRef: 9,
    systemSlugRef: 'math-item-bank'
  },

  // -------------------------------------------------------------------------
  // 4. AFTER WAYGROUND — INDEPENDENT AI BUILDS (2026 — PRESENT)
  // Transition: From Using AI → Building AI Systems
  // -------------------------------------------------------------------------
  {
    id: 'parallel-builds-loom-atlas',
    period: '2025 — 2026',
    organization: 'Independent AI Builds',
    role: 'Systems Engineer',
    title: 'Loom AI & Atlas AI',
    layerAnnotation: 'INDEPENDENT SYSTEMS — Stateful workflows & retrieval architectures',
    summary:
      'Independent AI builds: Loom AI developed end-to-end application architecture with LangGraph workflows; Atlas AI engineered stateful conversational RAG across SEC EDGAR filings and financial market tools.',
    capability: 'End-to-End AI Application Architecture & Stateful Workflows',
    transition: 'Shifted from internal workflows into building independent full-stack and stateful agentic systems.',
    details: [
      'Loom AI: End-to-End AI Application Architecture with LangGraph procurement workflows and human approval gates',
      'Atlas AI: Stateful Workflows + Retrieval + Tools with SEC EDGAR filings, Finnhub market feeds, and 178 passing tests',
      'Independent AI builds executed after Wayground (not Wayground projects)'
    ],
    technologies: ['Next.js 16', 'React 19', 'LangGraph', 'MongoDB Atlas Vector Search', 'SEC EDGAR', 'FastAPI'],
    journalChapterRef: 11,
    systemSlugRef: 'loom-ai',
    isMilestone: true
  },
  {
    id: '2026-design-automation',
    period: '2026',
    organization: 'Personal Engineering',
    role: 'Systems Engineer',
    title: 'Engineering Design Automation (EDA)',
    layerAnnotation: 'PHYSICAL CONSTRAINTS — AI constrained by engineering laws',
    summary:
      'Mechanical design synthesis where AI interprets natural language design briefs while deterministic physics solvers and OpenCascade CAD kernels calculate and enforce invariant 3D geometry and SVG drawings.',
    capability: 'AI + Deterministic Systems + Verification',
    transition: 'AI interprets. Deterministic systems constrain and verify.',
    details: [
      'Hybrid AI-to-CAD synthesis: LLMs parameterize; deterministic physics algorithms calculate and enforce invariants',
      'OpenCascade BRep CAD kernel generating valid 3D STEP geometry and SVG technical drawings',
      'Strict material provenance with verified ASTM/EN tables (no inferred or hallucinated steel grades)',
      'Verified with 424/424 passing tests in main repository state'
    ],
    technologies: ['AI Interpretation', 'Python', 'Deterministic Solvers', 'OpenCascade CAD / BRep / STEP', 'SVG Validation'],
    journalChapterRef: 10,
    systemSlugRef: 'design-automation',
    isMilestone: true
  },
  {
    id: '2026-ai-reliability',
    period: '2026',
    organization: 'Personal Engineering',
    role: 'Systems Engineer',
    title: 'AI Application Reliability & Browser QA',
    layerAnnotation: 'RELIABILITY — Grounding, governance & uncertainty modeling',
    summary:
      'Autonomous browser testing platform pairing local Ollama reasoning with Playwright execution grounding, Fisher information covariance uncertainty abstention, and human governance authorization.',
    capability: 'Agentic Systems + Reliability + Governance',
    transition: 'The question evolved from "Can AI build this?" to "How do we know what the AI actually did?"',
    details: [
      'Execution grounding: captures real DOM snapshots, network payloads, console logs, and screenshots',
      'Fisher Information covariance uncertainty modeling: deterministically abstains when telemetry ambiguity is high',
      '158 backend tests, 47 governance tests, 12 Next.js pages; dogfooded autonomously against VM Copy'
    ],
    technologies: ['Ollama (Qwen 2.5 Coder)', 'Playwright', 'FastAPI', 'Next.js', 'Model Context Protocol (MCP)', 'Governance'],
    journalChapterRef: 12,
    systemSlugRef: 'ai-reliability',
    isMilestone: true
  },
  {
    id: 'future-still-building',
    period: 'September 2026 — Present',
    organization: 'The Engineering Horizon',
    role: 'Continuous Exploration',
    title: 'Still Building. Still Learning.',
    layerAnnotation: '? — An expanding spiral of curiosity and verification',
    summary:
      'Continuing to build, experiment, learn, and explore reliable AI systems. An expanding spiral: Curiosity → Learning → Contribution → Building → Discovery → Repeat. Every system built teaches what to explore next.',
    capability: 'AI Systems Engineering',
    transition: 'The engineering mindset emerged through the work. The next page is yet to be written.',
    details: [
      'Continuing to explore the boundary between stochastic reasoning and deterministic verification',
      'Investigating autonomous agent reliability, formal verification, and execution grounding',
      'Still building. Still learning.'
    ],
    technologies: ['Continuous Learning', 'System Design', 'Reliability Engineering'],
    journalChapterRef: 14,
    isEnd: true
  }
]

export const timelineData = experience
