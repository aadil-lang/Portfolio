/**
 * CANONICAL CAREER EXPERIENCE ADAPTER
 *
 * Bridges the authoritative Phase 1 Canonical Registry (data/canonical/canonicalRegistry.ts)
 * to the legacy consumer TimelineItem interface expected by data/experience.ts and downstream consumers.
 *
 * Principles:
 * 1. Single Source of Truth: All career chronologies, designations, organizations, and factual
 *    responsibilities are derived directly from canonicalRegistry.careerRecords and projectRecords.
 * 2. Chronological Semantics:
 *    - October 2021 co-occurrence between Graveiens and InhaltMart is preserved as month-level INTERVAL_OVERLAP.
 *    - September 2022 transition between DIGIPPLUS and Independent Quantitative Discipline is preserved as TRANSITION_WINDOW.
 *    - DIGIPPLUS period is corrected to June 2022 — September 2022 (correcting legacy July 2022 erratum).
 *    - Independent Preparation period is corrected to September 2022 — December 2023 (correcting legacy August 2022 erratum).
 *    - VM Copy development period is aligned with canonical temporal window (Oct 2025 — Nov 2025 during SME tenure).
 * 3. Pure & Deterministic: Functions are pure, deterministic, and return fresh objects to prevent mutations.
 * 4. Backward-Compatible: Preserves all 23 historical TimelineItem IDs, presentation metadata,
 *    and field contracts so downstream consumers (portfolioKnowledge, RAG index, UI routes) experience zero breakage.
 */

import { canonicalRegistry } from '../canonical/canonicalRegistry'
import {
  CanonicalCareerRecord,
  CanonicalDatePoint
} from '../canonical/canonicalSchema'
import { TimelineItem } from '../../types'

// Month formatting utility
const MONTH_NAMES_SHORT: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

/**
 * Formats a canonical date point (YYYY-MM or YYYY) into a clean presentation string (e.g. 'May 2021')
 */
export function formatCanonicalDatePoint(
  dp: CanonicalDatePoint | 'PRESENT' | 'ONGOING' | undefined
): string {
  if (!dp) return ''
  if (dp === 'PRESENT') return 'Present'
  if (dp === 'ONGOING') return 'Ongoing'

  const parts = dp.dateString.split('-')
  const year = parts[0]
  if (parts.length >= 2 && parts[1]) {
    const month = MONTH_NAMES_SHORT[parts[1]] || parts[1]
    return `${month} ${year}`
  }
  return year
}

/**
 * Formats a canonical time interval into a standard timeline string (e.g. 'May 2021 — Oct 2021')
 */
export function formatCanonicalTimeSpan(
  start: CanonicalDatePoint,
  end: CanonicalDatePoint | 'PRESENT' | 'ONGOING'
): string {
  const startStr = formatCanonicalDatePoint(start)
  const endStr = formatCanonicalDatePoint(end)
  return `${startStr} — ${endStr}`
}

/**
 * Retrieves a canonical career record by its stable identifier
 */
export function getCanonicalCareerRecord(
  careerId: string
): CanonicalCareerRecord | undefined {
  return canonicalRegistry.careerRecords.find(c => c.careerId === careerId)
}

/**
 * Presentation overlay metadata for TimelineItems.
 * These attributes provide narrative layer annotations, capabilities, transitions, and UI styling
 * without overriding canonical factual fields (period, organization, designation, responsibilities).
 */
interface TimelinePresentationOverlay {
  id: string
  associatedCareerId: string
  title: string
  layerAnnotation: string
  capability?: string
  transition?: string
  technologies?: string[]
  journalChapterRef?: number
  systemSlugRef?: string
  isQuieter?: boolean
  isMilestone?: boolean
  isEnd?: boolean
  milestoneNumber?: number
  isWaygroundSubMilestone?: boolean
  causalChain?: string
  category?: 'Hackathon Project' | 'Independent Engineering Project' | 'Independent Personal Project' | 'Professional Employment' | string
  overridePeriod?: string
  overrideOrganization?: string
  overrideRole?: string
  overrideSummary?: string
  overrideDetails?: string[]
}

const TIMELINE_PRESENTATION_OVERLAYS: readonly TimelinePresentationOverlay[] = [
  // -------------------------------------------------------------------------
  // 1. EARLY CAREER & INDEPENDENT QUANTITATIVE DISCIPLINE
  // -------------------------------------------------------------------------
  {
    id: 'may-2021-oct-2021-graveiens',
    associatedCareerId: 'car-graveiens',
    title: 'Mathematical Content Creation',
    layerAnnotation: 'FOUNDATION — Problem Domain',
    capability: 'Content Creation + Mathematical Visualization',
    transition: 'I learned the problem domain before I ever tried to automate it.',
    technologies: ['Mathematics Content', 'Brainly CMS', 'GeoGebra', 'Desmos', 'Mathcha.io'],
    journalChapterRef: 1
  },
  {
    id: 'oct-2021-feb-2022-inhaltmart',
    associatedCareerId: 'car-inhaltmart',
    title: 'Mathematical Representation & Structured Authoring',
    layerAnnotation: 'REPRESENTATION — Notation & Structure',
    capability: 'Mathematical Representation + Structured Authoring',
    transition: 'I learned that mathematical correctness also depends on how mathematics is represented.',
    technologies: ['LaTeX', 'MathType', 'TI-83 Graphing', 'Plagiarism Detection'],
    journalChapterRef: 1
  },
  {
    id: 'jun-2022-jul-2022-digiplus', // Preserving ID for backwards compatibility
    associatedCareerId: 'car-digipplus',
    title: 'Quality Control & Systematic Validation',
    layerAnnotation: 'QUALITY & VALIDATION — Systematic Auditing',
    capability: 'Quality Control + Validation',
    transition: 'I moved from creating content to systematically evaluating it.',
    technologies: ['Quality Assurance', 'Content Auditing', 'Distractor Validation', 'K–10 Standards'],
    journalChapterRef: 1
  },
  {
    id: 'aug-2022-dec-2023-learning', // Preserving ID for backwards compatibility
    associatedCareerId: 'car-independent-quantitative',
    title: 'Independent Problem Solving & Discipline',
    layerAnnotation: 'INDEPENDENT DISCIPLINE — Quantitative Foundations',
    capability: 'Independent Problem Solving + Discipline',
    transition: 'Cultivated analytical mental models and independent problem-solving discipline before entering digital product environments.',
    technologies: ['Quantitative Aptitude', 'Deductive Logic', 'Analytical Modeling'],
    isQuieter: true
  },

  // -------------------------------------------------------------------------
  // 2. WAYGROUND (JANUARY 2024 — DECEMBER 2025): MATHEMATICS SME MILESTONES
  // -------------------------------------------------------------------------
  {
    id: 'wayground-m01-sme-katex',
    associatedCareerId: 'car-wayground-math-sme',
    title: 'SME Entry + Technical Mathematical Representation',
    layerAnnotation: 'SME ENTRY + REPRESENTATION — Moving from writing math to rendering math',
    overridePeriod: 'Jan 2024 — Mar 2024',
    overrideRole: 'Mathematics SME & Content Development',
    capability: 'Domain Expertise + Technical Mathematical Representation',
    transition: 'Mathematical correctness was only one part of the problem. The mathematical representation also had to be technically correct.',
    overrideSummary: 'Entered Wayground as a mathematics SME and content contributor, working with KaTeX to create step-by-step mathematical solutions maintained through Google Sheets and tested on the local development server.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-math-sme',
    title: 'VoyageMath Content Builder V1',
    layerAnnotation: 'DOMAIN FEEDBACK — Contributing from the user side',
    overridePeriod: 'Mid-Mar 2024 — Apr 2024',
    overrideRole: 'SME + User + Tester + Domain Feedback',
    capability: 'Domain-to-Product Feedback + Workflow Thinking',
    transition: 'The VoyageMath Engineering team built the tool; I validated it from the content and user workflow perspective.',
    overrideSummary: 'The VoyageMath Engineering team built VoyageMath Content Builder V1 (previously Mathverse) to make content workflows scalable. My contribution was from the content/domain perspective: testing V1, identifying bugs, recommending features, and providing workflow feedback.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-math-sme',
    title: 'VoyageMath Tool Adoption',
    layerAnnotation: 'TOOL ADOPTION — Tool enters actual production',
    overridePeriod: 'Apr 2024 onward',
    overrideRole: 'Content Development / SME',
    capability: 'Tool-Assisted Content Workflow',
    transition: 'First clear example of a recurring content bottleneck becoming a software system.',
    overrideSummary: 'VoyageMath became part of the team\'s actual content production workflow, and the team expanded around the standardized authoring system.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-math-sme',
    title: 'Figma & Mathematical Visual Production',
    layerAnnotation: 'MATHEMATICAL VISUALS — Question & solution visual production',
    overridePeriod: '2024',
    overrideRole: 'Content Development / SME',
    capability: 'Mathematical Visual Production',
    transition: 'Contributed mathematical visual content; I was not a formal UI/UX or graphic designer.',
    overrideSummary: 'As mathematical questions and solutions increasingly required visuals, I learned Figma with help from a colleague and began creating, modifying and correcting mathematical visuals.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-math-sme',
    title: 'Expanded Visual Content Production',
    layerAnnotation: 'PRODUCTION SUPPORT — Support under ~10-day turnaround cycles',
    overridePeriod: '2025',
    overrideRole: 'Content SME & Visual Production',
    capability: 'Expanded Visual Content Production',
    transition: 'Scaled visual content production during rapid delivery cycles, drawing on Figma workflows learned in 2024.',
    overrideSummary: 'In 2025, visual-content contribution became more regular and formal because content needed to reach production in approximately 10 days and the design team needed support.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-math-sme',
    title: 'AI-Assisted Content Workflow',
    layerAnnotation: 'AI WORKFLOW — Human-in-the-loop productivity layer',
    overridePeriod: '2025',
    overrideRole: 'Content Development / SME',
    capability: 'AI-Assisted Workflow + Human-in-the-Loop Design',
    transition: 'AI increased throughput, but shifted the bottleneck to verification.',
    overrideSummary: 'AI entered the content workflow as a human-in-the-loop productivity layer to accelerate replica creation, generating candidate StepGuides reviewed and refined by content developers.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-math-sme',
    title: 'In-House Question Creation',
    layerAnnotation: 'CONTENT QUALITY — Generating a question vs. a good question',
    overridePeriod: '2025',
    overrideRole: 'Content Development / SME',
    capability: 'AI Generation + Content Quality Awareness',
    transition: 'A language model could generate something that looked like a question without necessarily generating a good question.',
    overrideSummary: 'Question creation moved more fully in-house after externally supplied questions sometimes failed intended topic, skill, or quality requirements. AI became part of the internal creation workflow.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-math-sme',
    title: 'VM Question Creator / VM Copy Generator',
    layerAnnotation: 'EVALUATION — Deterministic validation outside the model',
    // Canonical timeline correction: VM Copy conceived & built Oct–mid-Nov 2025 during SME tenure (not 2026)
    overridePeriod: 'Oct 2025 — Nov 2025',
    overrideRole: 'Creator & Lead Developer',
    capability: 'Evaluation Thinking + Deterministic Validation',
    transition: 'LLM generates candidates → deterministic evaluation checks constraints outside the model.',
    overrideSummary: 'The crucial transition into AI engineering: generating a question was not the same as generating a good question. Rather than expanding prompts indefinitely, built a Next.js application where the LLM generates candidates and a deterministic evaluator checks constraints.',
    overrideDetails: [
      'Decoupled stochastic candidate generation from deterministic validation',
      'Built in-memory Tier-1 Deterministic Evaluator enforcing 4 options, single CA, and duplicate rejection at <1ms and $0 cost',
      'Conceived and developed October–mid-November 2025; adopted for team use November 2025 during Mathematics SME tenure'
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
  // 3. WAYGROUND (JANUARY 2026 — JULY 2026): AI/ML ENGINEERING SYSTEMS
  // -------------------------------------------------------------------------
  {
    id: '2026-ai-worksheets',
    associatedCareerId: 'car-wayground-aiml',
    title: 'AI Worksheets Product POC',
    layerAnnotation: 'SYSTEM BOUNDARIES — Compilers & graph engines around AI',
    overridePeriod: 'March 2026',
    overrideRole: 'Independent Company POC',
    capability: 'Full-Stack AI + Backtracking & LaTeX Compilers',
    transition: 'The model did not need to control every part of the system; some problems are better solved deterministically.',
    overrideSummary: 'Full-stack company proof of concept automating TEKS-aligned educational content across two formats: formal worksheets with compiled TikZ/LaTeX diagrams and gamified mazes powered by deterministic 2D backtracking algorithms.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-aiml',
    title: 'Curriculum Transformation Engine',
    layerAnnotation: 'DISTRIBUTED ETL — Structured extraction & runtime schema validation',
    overridePeriod: 'February 2026 – July 2026',
    overrideRole: 'Independent Engineering Build',
    capability: 'Asynchronous Map-Reduce & Schema Extraction',
    transition: 'Decoupled schema contracts from parsing logic by deriving layouts from sample datasets.',
    overrideSummary: 'Asynchronous Map-Reduce pipeline transforming unstructured state educational standards (PDFs, DOCX) into normalized tabular datasets with dynamic Pydantic schema validation.',
    overrideDetails: [
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
    associatedCareerId: 'car-wayground-aiml',
    title: 'US Mathematics Item Bank Generation Pipeline',
    layerAnnotation: 'TEAM SYSTEM — Domain routing & visual compile gates',
    overridePeriod: 'April 2026 — July 2026',
    overrideRole: 'Company Team System',
    capability: 'Team System + Visual Domain Routing & Compile Gates',
    transition: 'Explicitly distinguished team collaboration from individual contributions to visual routing and evaluation gates.',
    overrideSummary: 'Company team system generating state-aligned mathematics assessment items. Contributed mathematical image domain routing (SVG vs. TikZ), two-tier compile and visual evaluation gates, and Upper Elementary schemas.',
    overrideDetails: [
      'Engineered domain-based mathematical image generation routing (SVG vs. TikZ)',
      'Constructed two-tier compile and visual evaluation gates',
      'Stabilized Upper Elementary pipeline across grade 3–5 standards'
    ],
    technologies: ['TikZ / LaTeX', 'SVG Generation', 'Domain Routing', 'Vision Evaluation', 'Prompt Engineering'],
    journalChapterRef: 9,
    systemSlugRef: 'math-item-bank'
  },

  // -------------------------------------------------------------------------
  // 4. AFTER WAYGROUND (AUGUST 2026 — PRESENT): INDEPENDENT AI ENGINEERING & RESEARCH
  // -------------------------------------------------------------------------
  {
    id: 'loom-ai-2026',
    associatedCareerId: 'car-independent-research',
    title: 'Loom AI — B2B Textile Marketplace Platform',
    layerAnnotation: 'HACKATHON BUILD — Multi-Agent Procurement & HITL Workflows',
    overridePeriod: 'August 2026',
    overrideOrganization: 'Humanity Founders Marketplace Hackathon',
    overrideRole: 'System Architect & Author',
    category: 'Hackathon Project',
    capability: 'Marketplace Architecture + Procurement Matching + HITL Approval Workflows',
    transition: 'Shifted into multi-agent LangGraph architectures where sensitive procurement actions require deterministic human authorization.',
    overrideSummary: 'An AI-enabled textile marketplace pairing multi-agent LangGraph procurement matching with human-in-the-loop (HITL) order approval gates, supplier verification, and Playwright integration tests.',
    overrideDetails: [
      'End-to-end B2B textile marketplace architecture on Next.js and Express with MongoDB Atlas',
      'LangGraph agent workflows coordinating buyer inquiries, supplier quotation matching, and inventory verification',
      'Human-in-the-loop (HITL) approval queues guaranteeing human sign-off before purchase commitment',
      'Comprehensive Playwright end-to-end integration and API test harnesses'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Express', 'MongoDB Atlas', 'LangGraph', 'Playwright'],
    journalChapterRef: 11,
    systemSlugRef: 'loom-ai',
    isMilestone: true
  },
  {
    id: 'atlas-ai-2026',
    associatedCareerId: 'car-independent-research',
    title: 'Atlas AI — Financial Copilot & SEC Filing RAG',
    layerAnnotation: 'HACKATHON BUILD — Financial RAG, SEC EDGAR & Autonomous Alerts',
    overridePeriod: 'August 2026',
    overrideOrganization: 'Humanity Founders Finance Hackathon',
    overrideRole: 'Backend & Systems Engineer',
    category: 'Hackathon Project',
    capability: 'Financial-Document RAG + SEC Filing Research + Automated Alerts + Agentic Workflows',
    transition: 'Pioneered temporal-aware RAG over structured SEC financial disclosures with background daemon alert monitoring.',
    overrideSummary: 'An AI financial copilot engineered with FastAPI, LangGraph, MongoDB Atlas Vector Search, and Gemini—performing hybrid retrieval across SEC EDGAR 10-K/10-Q filings, Finnhub market feeds, and automated Telegram alert workers.',
    overrideDetails: [
      'Hybrid RAG parsing SEC EDGAR 10-K/10-Q disclosures with chunk-level attribution and financial table preservation',
      'Vector search retrieval layer powered by MongoDB Atlas Vector Search and Gemini embeddings',
      'Automated background alert worker daemon sending threshold notifications to Telegram',
      'Verified with 59 automated tests for core graph MVP, expanding to 178 pytests in complete test runner'
    ],
    technologies: ['Python', 'FastAPI', 'LangGraph', 'MongoDB Atlas Vector Search', 'Gemini', 'SEC EDGAR', 'Telegram'],
    journalChapterRef: 11,
    systemSlugRef: 'atlas-ai',
    isMilestone: true
  },
  {
    id: 'ocr-evaluator-2026',
    associatedCareerId: 'car-independent-research',
    title: 'OCR Evaluation & Robustness Testing Platform',
    layerAnnotation: 'INDEPENDENT BUILD — Multi-Tier OCR Accuracy, Critical-Field Auditing & Degradation Testing',
    overridePeriod: 'September 2026',
    overrideOrganization: 'Independent Engineering Project',
    overrideRole: 'Systems & Evaluation Engineer',
    category: 'Independent Engineering Project',
    capability: 'OCR Accuracy Evaluation + Critical-Field Auditing + Degradation Robustness',
    transition: 'Recognized that single OCR accuracy numbers hide catastrophic failures in critical fields—built multi-level verification and risk classification.',
    overrideSummary: 'An engineering-focused evaluation platform measuring document extraction accuracy, confidence, critical-field correctness, and robustness under controlled real-world image degradation. Answers the operational question: "Can this OCR result be trusted?"',
    overrideDetails: [
      'Multi-tier evaluation: Character Error Rate (CER), Word Error Rate (WER), field-level exact match, and critical-field accuracy',
      'Risk classification engine assigning PASS / REVIEW / FAIL decisions based on field severity and OCR confidence thresholds',
      'Robustness testing under 5 controlled image degradations: Gaussian blur, additive noise, rotation skew, contrast reduction, and JPEG compression',
      'Verified with 134 automated backend pytests across 22 test files, 20 browser UI assertions, and 0 frontend JavaScript errors'
    ],
    technologies: ['Python 3.12', 'FastAPI', 'Tesseract OCR', 'React', 'pytest', 'Pillow', 'OpenCV', 'NumPy'],
    journalChapterRef: 10,
    systemSlugRef: 'ocr-evaluator',
    isMilestone: true
  },
  {
    id: '2026-design-automation',
    associatedCareerId: 'car-independent-research',
    title: 'Engineering Design Automation (EDA)',
    layerAnnotation: 'INDEPENDENT BUILD — AI Constrained by Closed-Form Physics & OpenCascade CAD',
    overridePeriod: 'September 2026',
    overrideOrganization: 'Independent Engineering Project',
    overrideRole: 'Systems Engineer & Author',
    category: 'Independent Engineering Project',
    capability: 'Natural-Language-to-CAD + Closed-Form Physics + OpenCascade Boundary Representation',
    transition: 'AI interprets the natural-language brief; deterministic physics and CAD kernels calculate and enforce invariant 3D geometry.',
    overrideSummary: 'An engineering automation system combining natural-language parameter interpretation, deterministic mechanical engineering calculations (torsion, shear, von Mises yield), and OpenCascade 3D BRep solid geometry generation (STEP/SVG outputs).',
    overrideDetails: [
      'Natural-language parameter extraction interpreting mechanical design briefs into structured dimensional constraints',
      'Deterministic torsion, shear stress, and von Mises yield safety factor solvers eliminating LLM arithmetic errors',
      'OpenCascade CadQuery BRep CAD kernel generating valid 3D STEP geometry and SVG technical drawings',
      'Verified with 424 tests across 28 suites with 0.0000% volume error between closed-form physics and CAD solids'
    ],
    technologies: ['Python', 'FastAPI', 'OpenCascade', 'CadQuery', 'NumPy', 'SVG', 'STEP 3D Geometry'],
    journalChapterRef: 10,
    systemSlugRef: 'design-automation',
    isMilestone: true
  },
  {
    id: '2026-ai-reliability',
    associatedCareerId: 'car-independent-research',
    title: 'AI Application Reliability & Browser QA',
    layerAnnotation: 'INDEPENDENT BUILD — Browser Automation, Uncertainty Abstention & Governance',
    overridePeriod: 'September 2026',
    overrideOrganization: 'Independent Engineering Project',
    overrideRole: 'Reliability Engineer & Author',
    category: 'Independent Engineering Project',
    capability: 'Browser Automation + Execution Grounding + Uncertainty Modeling + Governance',
    transition: 'The question evolved from "Can AI build this?" to "How do we know what the AI actually did?"',
    overrideSummary: 'An autonomous platform for testing and diagnosing the reliability of AI-powered applications. Pairs local Ollama (Qwen) reasoning with Playwright execution grounding, Fisher information covariance uncertainty modeling, and cryptographic authorization gates.',
    overrideDetails: [
      'Execution grounding capturing DOM snapshots, console logs, network payloads, and Playwright screenshots',
      'Fisher Information covariance uncertainty modeling: deterministically abstaining from speculative execution when telemetry is ambiguous',
      'Human governance authorization gates enforcing SHA-256 provenance ledgers for all side-effect tool calls',
      '158 backend test suites and 47 governance tests; autonomously dogfooded against VM Copy Question Generator'
    ],
    technologies: ['Python', 'FastAPI', 'Playwright', 'Chromium', 'Ollama (Qwen 2.5 Coder)', 'Model Context Protocol (MCP)', 'SQLite'],
    journalChapterRef: 12,
    systemSlugRef: 'ai-reliability',
    isMilestone: true
  },
  {
    id: '2026-portfolio-ask-aadil',
    associatedCareerId: 'car-independent-research',
    title: 'Engineering Portfolio & Ask Aadil Agent',
    layerAnnotation: 'INDEPENDENT PERSONAL BUILD — Source-Aware Hybrid RAG, Epistemic Grounding & Voice VAD',
    overridePeriod: 'September – November 2026',
    overrideOrganization: 'Independent Personal Project',
    overrideRole: 'Lead AI Systems Engineer & Author',
    category: 'Independent Personal Project',
    capability: 'Source-Aware Hybrid RAG + Epistemic Grounding + HITL Actions + Voice VAD',
    transition: 'Turned the portfolio itself into an authoritative AI system that eliminates hallucinations, separates source layers, and governs side effects.',
    overrideSummary: 'An independent personal AI engineering project: a stateful, source-grounded conversational agent and bespoke portfolio platform featuring deterministic state routing, hybrid retrieval, strict epistemic boundaries, bitwise draft integrity, and voice interaction with speech transcript reconstruction.',
    overrideDetails: [
      'Stateful conversational agent with multi-turn entity resolution, intent routing, and hybrid retrieval across 6 canonical source layers',
      'Strict epistemic boundaries preventing temporal conflation (Wayground concluded July 2026; post-July is independent research)',
      'Bitwise draft integrity (executionInput === editedDraft) and visitor confirmation before mail actions without LLM rewriting',
      'Voice interface with Voice Activity Detection (VAD), barge-in support, and speech transcript reconstruction fixing duplicate interim/final phrases',
      'Validated across 172 automated test assertions spanning temporal reasoning, prompt injection defense, and Playwright browser flows'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Hybrid Retrieval', 'Deterministic State Machine', 'Playwright', 'Web Speech API'],
    journalChapterRef: 20,
    systemSlugRef: 'ask-aadil',
    isMilestone: true
  },
  {
    id: 'solace-ai-2026',
    associatedCareerId: 'car-independent-research',
    title: 'Solace AI — Mindful Wellness Companion',
    layerAnnotation: 'HACKATHON BUILD — Safety-First Mobile AI & Consent Architecture',
    overridePeriod: 'November 2026',
    overrideOrganization: 'Solace Hackathon',
    overrideRole: 'System Architect & Sole Author',
    category: 'Hackathon Project',
    capability: 'Cross-Platform Mobile AI + Deterministic Crisis Safety + Consent Architecture',
    transition: 'Extended deterministic safety gates and ambiguous-delivery containment to mobile consumer AI with strict user privacy.',
    overrideSummary: 'An Android wellness companion application built for the Solace Hackathon. Features synchronous pre-LLM crisis screening (Tele-MANAS 14416 / 112 / 988), 6-state mood check-ins, persistent companion chat, breathing/grounding exercises, voice AI with zero-retention audio purging, and consent-based memory controls.',
    overrideDetails: [
      'Pre-LLM deterministic crisis screening (is_crisis_input) running synchronously inside LangGraph safety_node before context retrieval or Gemini streaming',
      'Mood check-ins with 6 states, home dashboard, persistent companion conversations, and Just Let It Out freeform release',
      'Discover section with animated breathing exercises, grounding routines, and voice AI with raw audio byte purging in a finally block',
      'Mobile ApiService executing SSE POST strictly once, classifying 502/503/504 as ambiguous delivery without blind retry',
      'Supabase Auth, PostgreSQL Row-Level Security across 6 tables, and Expo SecureStore chunked below Android Keystore 2048-byte limits',
      'Verified on standalone Android APK (Pixel 7 emulator, Android 16 API 36) with 52 backend pytests + 50 mobile checks passing with 0 TS errors'
    ],
    technologies: ['React Native / Expo 58', 'TypeScript', 'FastAPI', 'LangGraph', 'Google Gemini API', 'Supabase Auth & RLS', 'SSE Streaming'],
    journalChapterRef: 21,
    systemSlugRef: 'solace-ai',
    isMilestone: true
  },
  {
    id: 'future-still-building',
    associatedCareerId: 'car-independent-research',
    title: 'Independent AI Engineering & Research: Still Building. Still Exploring.',
    layerAnnotation: 'CONTINUING FRONTIER — Building, Experimenting & Researching Intelligent Applications',
    overridePeriod: 'August 2026 — Present',
    overrideOrganization: 'Independent AI Engineering & Research',
    overrideRole: 'Independent AI Systems Engineer & Researcher',
    category: 'Independent Engineering Project',
    capability: 'Autonomous Agent Reliability + Deterministic Verification + Stateful AI Architectures',
    transition: 'Curiosity → Learning → Contribution → Building → Discovery → Repeat. Continuous technical growth through shipping practical systems.',
    overrideSummary: 'Building, experimenting and researching intelligent applications, agentic systems and reliable AI engineering solutions. Following the conclusion of formal employment at Wayground in July 2026, dedicated to continuous technical growth and shipping independent systems across hackathons, engineering tools, and reliability platforms.',
    overrideDetails: [
      'Continuous technical growth through shipping practical systems: Loom AI, Atlas AI, OCR Evaluator, AI Reliability, EDA, Ask Aadil, and Solace AI',
      'Researching the boundary between stochastic model reasoning and deterministic solvers (formal CAD kernels, physics, verification wrappers)',
      'Investigating Fisher information covariance uncertainty modeling, Playwright-governed browser execution, and safety-first mobile companions',
      'Open to high-impact AI Systems Engineering and backend architecture roles globally'
    ],
    technologies: ['Autonomous Agents', 'LangGraph', 'Playwright', 'FastAPI', 'Next.js', 'Deterministic Solvers', 'Safety Architectures'],
    journalChapterRef: 22,
    isEnd: true
  }
]

/**
 * Returns the fully projected, canonical-backed timeline item array.
 * Pure, deterministic, and returns fresh objects.
 */
export function getCanonicalTimeline(): TimelineItem[] {
  return TIMELINE_PRESENTATION_OVERLAYS.map(overlay => {
    const canonical = getCanonicalCareerRecord(overlay.associatedCareerId)
    if (!canonical) {
      throw new Error(
        `Canonical career record '${overlay.associatedCareerId}' not found in canonicalRegistry for timeline item '${overlay.id}'.`
      )
    }

    // Determine period:
    // For top-level career milestones (items 0..3), format directly from canonical career record.
    // For sub-milestones, use canonical sub-milestone timing (e.g. VM copy Oct-Nov 2025).
    const period =
      overlay.overridePeriod ||
      formatCanonicalTimeSpan(
        canonical.employmentPeriod.start,
        canonical.employmentPeriod.end
      )

    // Determine organization and role:
    const organization = overlay.overrideOrganization || canonical.organization
    const role = overlay.overrideRole || canonical.formalDesignation

    // Determine summary and details:
    const summary = overlay.overrideSummary || canonical.formalScopeSummary
    const details = overlay.overrideDetails || [...canonical.verifiedResponsibilities]

    const item: TimelineItem = {
      id: overlay.id,
      period,
      title: overlay.title,
      organization,
      role,
      layerAnnotation: overlay.layerAnnotation,
      summary,
      details,
      technologies: overlay.technologies ? [...overlay.technologies] : []
    }

    if (overlay.category) item.category = overlay.category
    if (overlay.capability) item.capability = overlay.capability
    if (overlay.transition) item.transition = overlay.transition
    if (overlay.journalChapterRef !== undefined) item.journalChapterRef = overlay.journalChapterRef
    if (overlay.systemSlugRef !== undefined) item.systemSlugRef = overlay.systemSlugRef
    if (overlay.isQuieter !== undefined) item.isQuieter = overlay.isQuieter
    if (overlay.isMilestone !== undefined) item.isMilestone = overlay.isMilestone
    if (overlay.isEnd !== undefined) item.isEnd = overlay.isEnd
    if (overlay.milestoneNumber !== undefined) item.milestoneNumber = overlay.milestoneNumber
    if (overlay.isWaygroundSubMilestone !== undefined) item.isWaygroundSubMilestone = overlay.isWaygroundSubMilestone
    if (overlay.causalChain !== undefined) item.causalChain = overlay.causalChain

    return item
  })
}

/**
 * Returns canonical career records as high-level career timeline milestones (7 authoritative records).
 */
export function getCanonicalCareerMilestones(): TimelineItem[] {
  return canonicalRegistry.careerRecords.map(rec => ({
    id: rec.careerId,
    period: formatCanonicalTimeSpan(rec.employmentPeriod.start, rec.employmentPeriod.end),
    title: rec.formalDesignation,
    organization: rec.organization,
    role: rec.formalDesignation,
    layerAnnotation: rec.phaseId,
    summary: rec.formalScopeSummary,
    details: [...rec.verifiedResponsibilities],
    technologies: [],
    isMilestone: true
  }))
}
