/**
 * CANONICAL JOURNAL CHAPTER GROUNDING ADAPTER
 *
 * Pure, deterministic projection and grounding layer connecting the portfolio's
 * engineering journal chapters to authoritative canonical records:
 * - Canonical career records (chronology, organization, formal designation)
 * - Canonical project records (authorship, architectural responsibility, IP ownership, publication eligibility)
 * - Canonical technical claims (governed metrics, measurement scopes, mandatory caveats)
 * - Canonical evidence records (source inventory, test definitions, execution traces)
 *
 * Architecture Standard: Phase 2.4 Consumer Migration Blueprint
 *
 * Core Guarantees:
 * 1. Narrative Preservation: Preserves all 23 historical chapters, technical problems, solutions,
 *    breakthroughs, failure modes, and what became deterministic without truncation or deletion.
 * 2. Attribution & Provenance: Inherits strict IP ownership and implementation authorship from
 *    canonical records; prevents journal narrative from being misinterpreted as claims of sole
 *    authorship or personal IP on enterprise systems (e.g. Content Builder, Item Bank, VM Copy).
 * 3. Governed Metric Disclosures: Enforces mandatory qualification caveats on all quantitative metrics
 *    (VM Copy Tier-1 <1ms vs LLM inference, EDA CAD calculus agreement vs CNC tolerance,
 *    Solace AI mobile Jest/tsc mock checks vs physical Android hardware, AI Reliability 158 test cases).
 * 4. Publication Safeguards: Prohibits exposure of internal employer repository URLs or converting
 *    private evidence into public links.
 * 5. Determinism & Immutability: Returns fresh, immutable projections with zero side-effects.
 */

import { canonicalRegistry } from '../canonical/canonicalRegistry'
import {
  CanonicalCareerRecord,
  CanonicalProjectRecord,
  CanonicalTechnicalClaimRecord,
  CanonicalEvidenceRecord,
  ImplementationAuthorship,
  ArchitecturalResponsibility,
  IntellectualPropertyOwnership,
  ProjectOrganizationalContext,
  PublicationEligibility,
  CareerPhaseId,
  CaseStudyId,
  AdrId
} from '../canonical/canonicalSchema'

// ============================================================================
// 1. TYPES & INTERFACES
// ============================================================================

export type GroundingStatus =
  | 'FULLY_GROUNDED'        // Backed by canonical records, verified claims, and documentary/code evidence
  | 'PARTIALLY_GROUNDED'    // Associated with formal career/project, but historical observation lacks independent test trace
  | 'HISTORICAL_NARRATIVE'  // Qualitative engineering journey, self-directed exploration, or pedagogical reflection

export interface JournalOwnershipClassification {
  implementationAuthorship?: ImplementationAuthorship
  architecturalResponsibility?: ArchitecturalResponsibility
  ipOwnership?: IntellectualPropertyOwnership
  organizationalContext?: ProjectOrganizationalContext
  publicationEligibility?: PublicationEligibility
  isPrivateOrProprietary: boolean
  publicUrl: string | null
}

export interface JournalGroundingMetadata {
  /** Canonical career record association, if applicable */
  careerId?: string
  careerPhaseId?: CareerPhaseId

  /** Canonical project record association, if applicable */
  projectId?: string
  connectedSystemSlug?: string

  /** Canonical technical claims supported by or referenced in this chapter */
  claimIds: string[]

  /** Canonical evidence records supporting this chapter */
  evidenceIds: string[]

  /** Grounding classification */
  groundingStatus: GroundingStatus

  /** Ownership & IP classification inherited from canonical records */
  ownershipClassification?: JournalOwnershipClassification

  /** Governed metric caveats where quantitative claims are discussed in the narrative */
  governedMetricCaveats?: string[]

  /**
   * Historical vs Verified Disclosures:
   * Explicitly flags when narrative values (e.g. historical prompt latency, manual hours)
   * are informal observations rather than formal benchmarks.
   */
  historicalDisclosures?: string[]
}

export interface JournalChapterRecord {
  id: string
  number: string
  title: string
  subtitle: string
  spread: number
  page: number | string
  period: string
  organization?: string
  role?: string
  journeyStage: string
  ownershipLabel?: string
  ownershipCategory?: 'independent' | 'team' | 'contribution' | 'professional' | 'hackathon'
  problem: string
  solution: string
  breakthrough: string
  whatBecameDeterministic: string
  accumulatedCapability: string
  technologies?: string[]
  whatBroke?: Array<{
    failure: string
    cause?: string
    detection?: string
    response?: string
  }>
  connectedSystemSlug?: string

  // Optional grounding fields for backward compatibility
  canonicalCareerIds?: string[]
  canonicalProjectIds?: string[]
  canonicalClaimIds?: string[]
  canonicalEvidenceIds?: string[]
  grounding?: JournalGroundingMetadata
}

export interface GroundedJournalChapter extends JournalChapterRecord {
  /** Canonical career record IDs (empty array if none) */
  canonicalCareerIds: string[]

  /** Canonical project record IDs (empty array if none) */
  canonicalProjectIds: string[]

  /** Canonical claim record IDs (empty array if none) */
  canonicalClaimIds: string[]

  /** Canonical evidence record IDs (empty array if none) */
  canonicalEvidenceIds: string[]

  /** Complete canonical grounding and provenance metadata */
  grounding: JournalGroundingMetadata
}

/**
 * Pure projection representing a derived case-study connection for a journal chapter.
 * Consumed by chapter deep-dive callout components.
 */
export interface DerivedChapterCaseStudyLink {
  caseStudyId: CaseStudyId
  title: string
  slug: string
  classification: 'DIRECT' | 'PARTIAL'
  targetAspect?: string
  relevantAdrIds: AdrId[]
  contentAnchor: string
  publicationEligibility: PublicationEligibility
}

// ============================================================================
// 2. RAW HISTORICAL JOURNAL CHAPTER DATA (23 CHAPTERS)
// ============================================================================

const RAW_JOURNAL_CHAPTERS: JournalChapterRecord[] = [
  {
    id: 'ch-01-problem-domain',
    number: '01',
    title: 'Learning the Problem Domain',
    subtitle: 'Understanding the Problem Domain First',
    spread: 1,
    page: 3,
    period: 'May 2021 — Oct 2021',
    organization: 'Graveiens Edu Services Pvt. Ltd.',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'EARLY MATHEMATICAL FOUNDATIONS',
    ownershipLabel: 'PROFESSIONAL EXPERIENCE',
    ownershipCategory: 'professional',
    problem: 'Manual mathematical content creation; authoring original Textbook Questions and Solutions (TBQ) for United States curriculum textbooks.',
    solution: 'Deconstructed what made a mathematical problem valid, what steps caused learners to stumble, and how visual plots in tools like GeoGebra, Desmos, and Mathcha.io clarified abstract concepts.',
    breakthrough: 'Learned the domain deeply enough to recognize what a correct mathematical problem, solution, and explanation actually looked like. Learned the problem domain before ever trying to automate it.',
    whatBecameDeterministic: 'Formal validation of problem structure, question clarity, and answer correctness.',
    accumulatedCapability: 'Foundational domain expertise in K-12 mathematics curriculum design, Common Core, and TEKS taxonomy.',
    technologies: ['GeoGebra', 'Desmos', 'Mathcha.io', 'Brainly CMS']
  },
  {
    id: 'ch-02-represent-mathematics',
    number: '02',
    title: 'Learning to Represent Mathematics',
    subtitle: 'Structure, Notation, and Representation',
    spread: 1,
    page: 4,
    period: 'Oct 2021 — Feb 2022',
    organization: 'InhaltMart Educational Services',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'EARLY MATHEMATICAL FOUNDATIONS',
    ownershipLabel: 'PROFESSIONAL EXPERIENCE',
    ownershipCategory: 'professional',
    problem: 'Mathematical correctness is not only about numerical answers; it depends on how mathematics is structured, aligned, and represented for the reader.',
    solution: 'Constructed TI-83 graphing calculator solutions, worked with MS Word, MathType, and LaTeX notation, and performed systematic plagiarism detection and removal across content pools.',
    breakthrough: 'Realized that mathematical representation is not cosmetic—it is an inseparable part of correctness. Directly bridged to KaTeX, structured schemas, and compiler pipelines later.',
    whatBecameDeterministic: 'Rigorous symbolic syntax, LaTeX math formatting, and structural alignment.',
    accumulatedCapability: 'Technical mathematical notation, LaTeX structuring, graphing calculator representation.',
    technologies: ['LaTeX', 'MathType', 'TI-83 Graphing Calculator', 'MS Word']
  },
  {
    id: 'ch-03-learning-to-validate',
    number: '03',
    title: 'Learning to Validate',
    subtitle: 'Verification, Distractors, and Error Modes',
    spread: 2,
    page: 5,
    period: 'Feb 2022 — Dec 2022',
    organization: 'Digiplus Information Technologies',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'EARLY MATHEMATICAL FOUNDATIONS',
    ownershipLabel: 'PROFESSIONAL EXPERIENCE',
    ownershipCategory: 'professional',
    problem: 'Reviewing, auditing, and validating high-volume mathematics content. Distractors in multiple choice items often collapsed or failed to represent plausible misconceptions.',
    solution: 'Analyzed why students choose wrong options; structured distractor rationales to target specific conceptual misunderstandings rather than arbitrary numbers.',
    breakthrough: 'Recognized that validation is independent of generation. Checking whether an item satisfies pedagogical invariants requires explicit criteria.',
    whatBecameDeterministic: 'Distractor rationale validation and error-mode classification.',
    accumulatedCapability: 'Auditing, quality assurance, distractor analysis, and pedagogical verification.',
    technologies: ['Curriculum Validation', 'Pedagogical Auditing', 'Distractor Taxonomy']
  },
  {
    id: 'ch-04-independent-years',
    number: '04',
    title: 'The Independent Years',
    subtitle: 'Algorithmic Discipline & Problem Solving',
    spread: 2,
    page: 6,
    period: 'Jan 2023 — Dec 2023',
    organization: 'Independent Exploration',
    role: 'Independent Problem Solver',
    journeyStage: 'INDEPENDENT DISCIPLINE',
    ownershipLabel: 'INDEPENDENT EXPLORATION',
    ownershipCategory: 'independent',
    problem: 'Bridging domain mathematics knowledge into formal algorithmic logic, computational problem solving, and Python programming.',
    solution: 'Intensive independent study in algorithmic problem solving, Python programming, numerical methods, and discrete mathematics.',
    breakthrough: 'Disciplined computational thinking: problems can be decomposed into state transitions, invariants, and deterministic boundaries.',
    whatBecameDeterministic: 'Algorithmic state transitions and programmatic logic.',
    accumulatedCapability: 'Python programming, algorithmic thinking, data structures, and computational modeling.',
    technologies: ['Python', 'Algorithmic Problem Solving', 'Numerical Methods']
  },
  {
    id: 'ch-05-product-environment',
    number: '05',
    title: 'Entering a Product Environment',
    subtitle: 'Wayground SME Entry',
    spread: 3,
    page: 7,
    period: 'Jan 2024 — Mar 2024',
    organization: 'Wayground',
    role: 'SME Intern',
    journeyStage: 'PRODUCT ENVIRONMENT',
    ownershipLabel: 'PROFESSIONAL EXPERIENCE',
    ownershipCategory: 'professional',
    problem: 'Transitioning from authoring static textbook solutions to working inside a live digital assessment product environment.',
    solution: 'Authored step-by-step mathematical solutions using KaTeX within Wayground authoring tools. Validated user-facing mathematical rendering.',
    breakthrough: 'Understood digital assessment as a software product requiring strict technical consistency across thousands of items.',
    whatBecameDeterministic: 'KaTeX rendering standards and step-by-step digital solution templates.',
    accumulatedCapability: 'Digital assessment authoring, KaTeX in web products, SME product validation.',
    technologies: ['KaTeX', 'Web-Based Assessment', 'Digital Solutions']
  },
  {
    id: 'ch-06-content-to-systems',
    number: '06',
    title: 'From Content to Content Systems',
    subtitle: 'VoyageMath V1 Adoption & Testing',
    spread: 3,
    page: 8,
    period: 'Mar 2024 — May 2024',
    organization: 'Wayground',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'PRODUCT ENVIRONMENT',
    ownershipLabel: 'WAYGROUND · TEAM SYSTEM (SME CONTRIBUTION)',
    ownershipCategory: 'team',
    problem: 'Testing and validating VoyageMath V1, an internal web application built by the Wayground engineering team.',
    solution: 'Tested the authoring platform, identified edge cases in KaTeX rendering, reported bugs to engineering, and recommended UI/workflow improvements.',
    breakthrough: 'Observed how software tools shape content quality. Learned to interact directly with engineers as a domain specialist.',
    whatBecameDeterministic: 'Edge-case identification in mathematical rendering and user workflow validation.',
    accumulatedCapability: 'SME software testing, bug reporting, feature recommendations, product feedback loop.',
    technologies: ['VoyageMath V1', 'KaTeX', 'SME Testing', 'Bug Reporting'],
    connectedSystemSlug: 'content-builder'
  },
  {
    id: 'ch-07-making-math-visual',
    number: '07',
    title: 'Making Mathematics Visual',
    subtitle: 'Figma Coordinate Geometry & SVG Asset Creation',
    spread: 4,
    page: 9,
    period: 'Jun 2024 — Aug 2024',
    organization: 'Wayground',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'VISUAL CONTENT EXPANSION',
    ownershipLabel: 'WAYGROUND PROFESSIONAL ROLE',
    ownershipCategory: 'professional',
    problem: 'Mathematics items required high-fidelity visual diagrams (coordinate geometry, angles, polygons, transformations) that could not be rendered with pure KaTeX.',
    solution: 'Created hundreds of vector mathematical diagrams using Figma, standardizing coordinate grids, labels, stroke weights, and SVG export specifications.',
    breakthrough: 'Mathematical visuals must follow precise coordinate systems; visual assets require the same precision as symbolic formulas.',
    whatBecameDeterministic: 'Figma component grids, SVG styling rules, and visual coordinate alignment.',
    accumulatedCapability: 'Figma vector design, mathematical diagrams, coordinate geometry visualization, SVG assets.',
    technologies: ['Figma', 'SVG', 'Coordinate Geometry', 'Vector Diagrams']
  },
  {
    id: 'ch-08-workflow-problem',
    number: '08',
    title: 'When Content Became a Workflow Problem',
    subtitle: 'Scaling Production Across 500+ Items',
    spread: 4,
    page: 10,
    period: 'Aug 2024 — Dec 2024',
    organization: 'Wayground',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'WORKFLOW & SCALING',
    ownershipLabel: 'WAYGROUND PROFESSIONAL ROLE',
    ownershipCategory: 'professional',
    problem: 'Manual authoring of hundreds of items with visuals created production bottlenecks. Individual authoring could not keep pace with curriculum demands.',
    solution: 'Standardized item templates, organized reusable asset libraries, and developed structured authoring guidelines to accelerate throughput.',
    breakthrough: 'Content generation is fundamentally a pipeline problem. Quality and velocity depend on workflow constraints, not individual heroics.',
    whatBecameDeterministic: 'Template modularity and asset reuse protocols.',
    accumulatedCapability: 'Workflow optimization, batch authoring, curriculum production scaling.',
    technologies: ['Workflow Optimization', 'Batch Authoring', 'Asset Libraries']
  },
  {
    id: 'ch-09-ai-in-workflow',
    number: '09',
    title: 'When AI Entered the Workflow',
    subtitle: 'Human-in-the-Loop AI Exploration',
    spread: 5,
    page: 11,
    period: 'Dec 2024 — Jan 2025',
    organization: 'Wayground',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'AI ADOPTION',
    ownershipLabel: 'WAYGROUND PROFESSIONAL ROLE',
    ownershipCategory: 'professional',
    problem: 'Using public LLMs to draft question variants produced inconsistent difficulty, dropped pedagogical standards, and hallucinated calculations.',
    solution: 'Developed structured prompts with explicit constraints, acting as a human-in-the-loop (HITL) gate to verify and correct AI drafts.',
    breakthrough: 'Language models are stochastic text predictors, not authoritative mathematicians. They require deterministic constraints to be useful.',
    whatBecameDeterministic: 'Prompt constraint schemas and manual verification rubrics.',
    accumulatedCapability: 'Prompt engineering, LLM failure analysis, human-in-the-loop validation.',
    technologies: ['LLM Prompting', 'HITL Verification', 'Constraint Schemas']
  },
  {
    id: 'ch-10-in-house-creation',
    number: '10',
    title: 'In-House Question Creation',
    subtitle: 'The Limits of Prompting Alone',
    spread: 5,
    page: 12,
    period: 'Jan 2025 — Feb 2025',
    organization: 'Wayground',
    role: 'Subject Matter Expert — Mathematics',
    journeyStage: 'AI ADOPTION',
    ownershipLabel: 'WAYGROUND PROFESSIONAL ROLE',
    ownershipCategory: 'professional',
    problem: 'Prompt engineering alone reached a ceiling: models still dropped constraints, collapsed distractor formulas, or violated option counts in 15–20% of cases.',
    solution: 'Documented systematic failure modes across hundreds of generations, proving that prompting cannot replace external code verification.',
    breakthrough: 'The boundary where prompting stops and software engineering must begin. If an invariant must be 100% reliable, it must be enforced by code outside the model.',
    whatBecameDeterministic: 'Catalog of LLM failure modes in mathematical item generation.',
    accumulatedCapability: 'Systematic failure mode cataloging, engineering requirement definition for AI tooling.',
    technologies: ['Failure Taxonomy', 'Boundary Analysis', 'Invariant Specifications']
  },
  {
    id: 'ch-11-generation-not-enough',
    number: '11',
    title: "When Generation Wasn't Enough",
    subtitle: 'VM Copy Question Generator (Part 1)',
    spread: 6,
    page: 13,
    period: 'Feb 2025',
    organization: 'Wayground',
    role: 'Independent Developer (SME)',
    journeyStage: 'INDEPENDENT TOOLING',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    ownershipCategory: 'independent',
    problem: 'Curriculum authors needed isomorphic question variants from base items without manual rewriting, but single monolithic prompts timed out or drifted in difficulty.',
    solution: 'Designed VM Copy: partitioned requests into parallel micro-batches (calculateBatches) to bound latency to ~4-6s and prevent gateway timeouts.',
    breakthrough: 'Parallel micro-batch dispatch guarantees responsiveness and prevents attention degradation across batch items.',
    whatBecameDeterministic: 'Micro-batch partitioning and API gateway protection.',
    accumulatedCapability: 'Next.js App Router, React, TypeScript, API route architecture, parallel promise handling.',
    technologies: ['Next.js App Router', 'React', 'TypeScript', 'Parallel Micro-Batches'],
    connectedSystemSlug: 'vm-copy'
  },
  {
    id: 'ch-12-generation-to-evaluation',
    number: '12',
    title: 'From Generation to Evaluation',
    subtitle: 'Tier-1 Deterministic Evaluator',
    spread: 6,
    page: 14,
    period: 'Feb 2025 — Mar 2025',
    organization: 'Wayground',
    role: 'Independent Developer',
    journeyStage: 'DETERMINISTIC EVALUATION',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    ownershipCategory: 'independent',
    problem: 'Generated items frequently broke option cardinality (3 or 5 options), had 0 or >1 correct answers, or duplicated distractors.',
    solution: 'Engineered lib/eval-layer.ts (evaluateDeterministic): in-memory TypeScript evaluator enforcing exactly 4 options, exactly 1 CA, and Set-based duplicate distractor rejection.',
    breakthrough: 'Decoupling generation from validation: structural validation must happen deterministically without calling another model.',
    whatBecameDeterministic: 'Option cardinality (exactly 4), answer key exclusivity (single CA), distractor uniqueness, step-by-step format compliance.',
    accumulatedCapability: 'Deterministic evaluation layer, TypeScript AST/string validation, invariant scoring.',
    technologies: ['TypeScript', 'In-Memory Evaluator', 'Invariant Testing'],
    connectedSystemSlug: 'vm-copy'
  },
  {
    id: 'ch-13-ai-worksheets',
    number: '13',
    title: 'When AI Became an Application',
    subtitle: 'AI Worksheets Product POC & 2D Backtracking Solvers',
    spread: 7,
    page: 15,
    period: 'Apr 2025 — May 2025',
    organization: 'Wayground',
    role: 'AI Engineer / Consultant',
    journeyStage: 'FULL-STACK AI APPLICATIONS',
    ownershipLabel: 'WAYGROUND · INDEPENDENT POC',
    ownershipCategory: 'independent',
    problem: 'Generating complete printable math worksheets required combining narrative problem generation, algorithmic 2D puzzle layouts (Kakuro/KenKen), and LaTeX compilation.',
    solution: 'Built full-stack React 18 + FastAPI application with Dockerized pdflatex compilation pool, 2D backtracking solvers, and Portkey gateway routing to Gemini Flash.',
    breakthrough: 'Hybrid architecture: language models generate the narrative text, but deterministic 2D backtracking solvers generate the puzzle logic and LaTeX compiles the PDF.',
    whatBecameDeterministic: 'Mathematical puzzle solutions via backtracking, LaTeX rendering invariants, and PDF compilation.',
    accumulatedCapability: 'FastAPI, Docker Compose, pdflatex pools, Portkey gateway, 2D backtracking solvers.',
    technologies: ['React 18', 'FastAPI', 'Docker Compose', 'Portkey', 'Gemini Flash', 'pdflatex', 'TikZ'],
    connectedSystemSlug: 'ai-worksheets'
  },
  {
    id: 'ch-14-applications-to-pipelines',
    number: '14',
    title: 'From Applications to Pipelines',
    subtitle: 'US Mathematics Item Bank Pipeline',
    spread: 8,
    page: 17,
    period: 'Jun 2025 — Aug 2025',
    organization: 'Wayground',
    role: 'AI Engineer / Consultant (Collaborative Team Build)',
    journeyStage: 'STATEFUL PIPELINES',
    ownershipLabel: 'WAYGROUND · TEAM SYSTEM (AADIL CONTRIBUTION)',
    ownershipCategory: 'team',
    problem: 'Generating tens of thousands of curriculum-aligned items required multi-agent coordination, visual routing, compilation gates, and strict weight balancing across standards.',
    solution: 'Wayground team engineered stateful LangGraph pipeline. Aadil contributed: visual domain routing (SVG for coordinate geometry vs TikZ for algebra/statistics), compile gates, and Min/Max Swap optimization for curriculum weightage.',
    breakthrough: 'Separation of concerns across multi-agent pipelines: visual routing and optimization constraints guarantee curriculum balance across thousands of items.',
    whatBecameDeterministic: 'SVG vs TikZ routing decisions, compile verification gates, and Min/Max Swap curriculum balancing.',
    accumulatedCapability: 'LangGraph stateful workflows, visual domain routing, compile gates, Min/Max Swap optimization.',
    technologies: ['LangGraph', 'Python', 'SVG', 'TikZ', 'Min/Max Swap Optimization', 'Compile Gates'],
    connectedSystemSlug: 'math-item-bank'
  },
  {
    id: 'ch-15-curriculum-etl',
    number: '15',
    title: 'When the Problem Became a Transformation Pipeline',
    subtitle: 'Curriculum Transformation Engine & 3-Tier Integrity',
    spread: 9,
    page: 19,
    period: 'Sep 2025 — Nov 2025',
    organization: 'Wayground',
    role: 'AI Engineer / Consultant',
    journeyStage: 'DISTRIBUTED ETL PIPELINES',
    ownershipLabel: 'WAYGROUND · INDEPENDENT PRODUCTION BUILD',
    ownershipCategory: 'independent',
    problem: 'Transforming legacy curriculum documents (PDF/DOCX) into standardized digital items suffered from schema drift, dropped standards, and slow sequential processing.',
    solution: 'Engineered asynchronous Map-Reduce ETL pipeline with Celery, Redis, and Claude 3.5 Sonnet, protected by 3-Tier Integrity Gates (Reviewer -> Critic -> CSV Audit) and dynamic schema contract synthesis.',
    breakthrough: 'Dynamic schema contract synthesis: deriving parsing contracts and validation rules from sample data instead of hardcoded fragile scrapers.',
    whatBecameDeterministic: '3-tier integrity checks, CSV audit logs, Celery worker task boundaries, and schema validation.',
    accumulatedCapability: 'Celery/Redis asynchronous worker architecture, Map-Reduce data transformation, 3-tier validation.',
    technologies: ['Python', 'Celery', 'Redis', 'Claude 3.5 Sonnet', 'JSON Schema', 'Map-Reduce'],
    connectedSystemSlug: 'curriculum-etl'
  },
  {
    id: 'ch-16-loom-ai',
    number: '16',
    title: 'From Using AI to Building AI Applications',
    subtitle: 'Loom AI — Autonomous Textile B2B Marketplace',
    spread: 10,
    page: 21,
    period: 'Dec 2025',
    organization: 'Independent Hackathon Build',
    role: 'Full-Stack & AI Systems Architect',
    journeyStage: 'AGENTIC ARCHITECTURES',
    ownershipLabel: 'INDEPENDENT · HACKATHON BUILD',
    ownershipCategory: 'hackathon',
    problem: 'B2B textile sourcing suffered from unstructured procurement specifications, fragmented inventory discovery, and slow negotiation cycles.',
    solution: 'Built Next.js App Router + Express + TypeScript platform featuring LangGraph StateGraph multi-agent procurement workflow with human-in-the-loop (HITL) approval gates before order placement.',
    breakthrough: 'Multi-agent orchestration requires Clean Architecture separation and explicit human approval gates before executing financial transactions.',
    whatBecameDeterministic: 'Clean Architecture service boundaries, MongoDB schema validation, and HITL authorization queue.',
    accumulatedCapability: 'Clean Architecture, LangGraph StateGraph, multi-agent negotiation, HITL authorization workflows.',
    technologies: ['Next.js App Router', 'Express', 'TypeScript', 'Clean Architecture', 'MongoDB', 'LangGraph'],
    connectedSystemSlug: 'loom-ai'
  },
  {
    id: 'ch-17-atlas-ai',
    number: '17',
    title: 'Stateful Workflows + Retrieval + Tools',
    subtitle: 'Atlas AI — Financial Copilot & SEC Filing RAG',
    spread: 11,
    page: 23,
    period: 'Jan 2026',
    organization: 'Independent Build',
    role: 'AI Systems Engineer',
    journeyStage: 'ENTERPRISE RETRIEVAL & TOOLS',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'independent',
    problem: 'Financial copilots hallucinate numerical metrics and fail to monitor market events asynchronously.',
    solution: 'Engineered SEC EDGAR RAG system pairing LangGraph multi-agent routing with MongoDB Atlas Vector Search, Finnhub real-time market data, and background AlertWorker for proactive notifications.',
    breakthrough: 'Proactive background monitoring: separating user-facing conversational RAG from autonomous background worker threads.',
    whatBecameDeterministic: '178 automated tests across graph routing, SEC parser, and alerts. Mathematical financial formulas and SEC filing chunking.',
    accumulatedCapability: 'SEC EDGAR parsing, vector search, background alert daemon, 178 pytests, financial analytics.',
    technologies: ['Python', 'LangGraph', 'MongoDB Atlas Vector Search', 'Finnhub API', 'SEC EDGAR', 'FastAPI'],
    connectedSystemSlug: 'atlas-ai'
  },
  {
    id: 'ch-18-design-automation',
    number: '18',
    title: 'AI Meets Deterministic Engineering',
    subtitle: 'Engineering Design Automation (EDA CAD) & STEP Solids',
    spread: 12,
    page: 25,
    period: 'Feb 2026 — Apr 2026',
    organization: 'Independent Build',
    role: 'AI Systems & Computational Geometry Engineer',
    journeyStage: 'PHYSICAL ENGINEERING SYSTEMS',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'independent',
    problem: 'Generative AI cannot guarantee mechanical physics, stress constraints, or watertight boundary representation (BRep) CAD models.',
    solution: 'Engineered closed-form physics kernel with OpenCascade CadQuery BRep solid modeling, generating verified STEP/SVG files with 0.0000% volume error and 424 automated tests across 28 test suites.',
    breakthrough: 'AI interprets the natural-language brief; deterministic mechanical formulas and CAD BRep kernels constrain, calculate, and verify the physical artifact.',
    whatBecameDeterministic: 'Closed-form torsional stress physics, nominal shaft sizing, AISI material database lookup, STEP CAD solids, 0.0000% volume error.',
    accumulatedCapability: 'OpenCascade, CadQuery, STEP BRep modeling, mechanical engineering calculation kernels, Dockerized testing.',
    technologies: ['Python 3.11', 'CadQuery', 'OpenCascade', 'FastAPI', 'Docker', 'STEP', 'SVG', 'Pytest (424 Tests)'],
    connectedSystemSlug: 'design-automation'
  },
  {
    id: 'ch-19-ai-reliability',
    number: '19',
    title: 'The Reliability Question',
    subtitle: 'AI Application Reliability & Browser QA Harness',
    spread: 13,
    page: 27,
    period: 'May 2026 — Jul 2026',
    organization: 'Independent Build',
    role: 'AI Systems & Reliability Engineer',
    journeyStage: 'AUTONOMOUS AGENT RELIABILITY',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'independent',
    problem: 'Autonomous agents operating in real web browsers hallucinate root causes, cause state regressions, and attempt unverified destructive modifications.',
    solution: 'Engineered Playwright Chromium diagnostic harness with local Ollama Qwen 2.5 Coder, covariance uncertainty filtering for deterministic abstention, strict human authorization gates, and an unbroken SHA-256 provenance chain.',
    breakthrough: 'Reliability through governance: agents operate under strict behavioral contracts, abstain when covariance uncertainty is high, and require human cryptographic role approval before applying patches.',
    whatBecameDeterministic: '158 backend tests and 47 governance tests across 12 pages. Deterministic behavioral contracts, Fisher covariance abstention, human authorization gate, SHA-256 ledger.',
    accumulatedCapability: 'Playwright headless browser diagnostics, Fisher covariance uncertainty filtering, MCP tool protocols, SHA-256 cryptographic provenance.',
    technologies: ['Python 3.12', 'FastAPI', 'Playwright (Chromium)', 'Ollama (Qwen 2.5)', 'MCP Integration', 'Fisher Covariance', 'SQLite', 'SHA-256 Ledger'],
    connectedSystemSlug: 'ai-reliability'
  },
  {
    id: 'ch-20-ocr-evaluator',
    number: '20',
    title: 'Controlled Degradation & Robustness',
    subtitle: 'OCR Evaluator — Multi-Tier Document Accuracy, Critical-Field Auditing & 5-Axis Perturbation',
    spread: 14,
    page: 29,
    period: 'Sep 2026',
    organization: 'Independent Engineering Build',
    role: 'Systems & Evaluation Engineer',
    journeyStage: 'DOCUMENT ACCURACY & PERTURBATION EVALUATION',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'independent',
    problem: 'Aggregate character/word error rates (CER/WER) conceal catastrophic transcription failures on critical domain entities (such as survey numbers or legal parcel IDs), and production models fail silently when exposed to physical scanner noise, skew, or optical blur.',
    solution: 'Engineered a full-stack evaluation and robustness benchmarking platform pairing Levenshtein dynamic programming alignment (CER/WER) with strict critical-field priority decision gates (PASS / REVIEW / FAIL), 5-axis synthetic image perturbation (Gaussian blur, affine skew, salt-and-pepper noise, contrast degradation, JPEG compression), and an automated ERP quarantine API.',
    breakthrough: 'Decoupling aggregate statistical accuracy from entity-level decision safety: an extraction can achieve 99.2% overall character accuracy but must fail the deployment gate if a single critical legal identifier is corrupted.',
    whatBecameDeterministic: 'Levenshtein dynamic programming distance matrices, 5-axis parameterized OpenCV degradation transforms, critical-field quarantine routing logic, and 134 backend pytests + 20 browser UI evaluation assertions.',
    accumulatedCapability: 'Document extraction benchmarking, controlled perturbation pipelines, risk-weighted evaluation gates, and integration with downstream deterministic workflows.',
    technologies: ['Python 3.12', 'FastAPI', 'Tesseract OCR', 'OpenCV', 'React', 'TypeScript', 'pytest'],
    connectedSystemSlug: 'ocr-evaluator'
  },
  {
    id: 'ch-21-ask-aadil',
    number: '21',
    title: 'Designing a Grounded Portfolio & Ask Aadil',
    subtitle: 'Source-Aware Hybrid RAG, Epistemic Boundaries & Visitor-Approved Actions',
    spread: 15,
    page: 31,
    period: 'Sep 2026',
    organization: 'Personal Engineering Build',
    role: 'Lead AI Systems Engineer & Author',
    journeyStage: 'SOURCE-AWARE PORTFOLIO AGENT',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'independent',
    problem: 'Portfolio chatbots typically merge career facts into a flat vector store, conflating July 2026 historical employment with current activity, misreporting offline APIs as empty records, and altering email drafts during multi-turn conversations.',
    solution: 'Built a three-layer portfolio (Timeline, Journal, Systems) alongside Ask Aadil: source-authority routing, temporal epistemic boundaries, a 3-state LinkedIn adapter, prompt injection defense across 5 sources, and bitwise draft preservation (executionInput === editedDraft) verified by 172 automated tests.',
    breakthrough: 'Treating the portfolio itself as a governed AI system where Timeline (When), Journal (Why), Systems (What), and Resume stay separated by explicit authority rules.',
    whatBecameDeterministic: 'Source authority routing, temporal boundary classification, 3-state LinkedIn adapter reporting, bitwise draft preservation, and 172 automated test assertions.',
    accumulatedCapability: 'Source-aware hybrid RAG, epistemic temporal governance, deterministic tool planning, voice robustness, and HITL action authorization.',
    technologies: ['Next.js', 'React', 'TypeScript 5', 'Hybrid RAG', 'Deterministic State Machine', 'Playwright', 'Web Speech API'],
    connectedSystemSlug: 'ask-aadil'
  },
  {
    id: 'ch-22-solace-ai',
    number: '22',
    title: 'Safety-First Mobile Companions',
    subtitle: 'Solace AI — Deterministic Safety, Consent Memory & Ambiguous SSE',
    spread: 16,
    page: 33,
    period: 'Nov 2026',
    organization: 'Solace Hackathon Build',
    role: 'System Architect & Sole Author',
    journeyStage: 'SAFETY-FIRST MOBILE AI SYSTEMS',
    ownershipLabel: 'INDEPENDENT · HACKATHON BUILD',
    ownershipCategory: 'hackathon',
    problem: 'Consumer wellness AI wrappers risk delayed crisis intervention, silent unconsented memory capture, persistent raw voice audio liability, and duplicate user turns on 502/503/504 gateway drops.',
    solution: 'Built an Expo 58 + FastAPI/LangGraph mobile sanctuary pairing synchronous pre-LLM crisis screening (Tele-MANAS 14416 / 112 / 988) with feature-flagged LangGraph SSE streaming, explicit memory consent banners, finally-block audio buffer deletion, and single-POST ambiguous SSE failure containment.',
    breakthrough: 'Applying epistemic and side-effect containment directly to mobile human-centered AI: screening safety deterministically before any LLM call and treating 502/503/504 stream drops as ambiguous delivery rather than retrying blindly.',
    whatBecameDeterministic: 'Pre-LLM multilingual crisis regex screening with idiom exclusion, Android SecureStore key sanitization & 1500-byte chunking, single-POST SSE ambiguity classification, ephemeral audio buffer deletion, and 102 verified backend/mobile checks.',
    accumulatedCapability: 'Cross-platform React Native / Expo 58 architecture, Supabase RLS isolation, full-duplex LangGraph SSE streaming, and ethical consent-first AI product engineering.',
    technologies: ['React Native / Expo 58', 'TypeScript', 'FastAPI', 'LangGraph', 'Google Gemini API', 'Supabase RLS', 'SSE Streaming'],
    connectedSystemSlug: 'solace-ai'
  },
  {
    id: 'ch-23-synthesis',
    number: 'SYNTHESIS',
    title: 'Still Building. Still Exploring.',
    subtitle: 'The Open Horizon — Curiosity, Continual Learning & Systems Synthesis',
    spread: 17,
    page: 35,
    period: 'Aug 2026 — Present',
    organization: 'Independent Research & Engineering',
    role: 'AI Systems Engineer',
    journeyStage: 'THE OPEN SPIRAL',
    ownershipLabel: 'INDEPENDENT · RESEARCH & EXPLORATION',
    ownershipCategory: 'independent',
    problem: 'Synthesizing diverse engineering paradigms (content precision, deterministic solvers, agentic workflows, empirical evaluation) into a coherent, production-grade AI engineering practice without claiming false completion.',
    solution: 'Maintained an active engineering cadence across 11 shipped systems, continuous evaluation harnesses, and an open-ended portfolio architecture celebrating the iterative loop: Curiosity → Learning → Contribution → Building → Discovery → Repeat.',
    breakthrough: 'Recognizing that reliability in AI engineering is not about eliminating stochasticity entirely, but establishing verifiable deterministic boundaries, empirical evaluation harnesses, and transparent provenance around it.',
    whatBecameDeterministic: 'The end-to-end engineering philosophy: deterministic boundaries for safety and invariant enforcement; generative AI for exploration, draft synthesis, and multi-modal candidate generation; formal evaluation harnesses before production deployment.',
    accumulatedCapability: 'Full-stack AI systems engineering, deterministic verification, empirical benchmark harnesses, and technical clarity.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'LangGraph', 'Tailwind CSS'],
    connectedSystemSlug: 'ask-aadil'
  }
]

// ============================================================================
// 3. CANONICAL GROUNDING REGISTRATION TABLE
// ============================================================================

interface GroundingDefinition {
  careerId?: string
  projectId?: string
  claimIds: string[]
  evidenceIds: string[]
  groundingStatus: GroundingStatus
  governedMetricCaveats?: string[]
  historicalDisclosures?: string[]
}

const GROUNDING_DEFINITIONS: Record<string, GroundingDefinition> = {
  'ch-01-problem-domain': {
    careerId: 'car-graveiens',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'PARTIALLY_GROUNDED',
    historicalDisclosures: [
      'Graveiens employment confirmed as May 2021 — October 2021; October 2021 represents a month-level interval overlap with InhaltMart at recorded precision.'
    ]
  },
  'ch-02-represent-mathematics': {
    careerId: 'car-inhaltmart',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'PARTIALLY_GROUNDED',
    historicalDisclosures: [
      'InhaltMart employment confirmed as October 2021 — February 2022; prior mention of Dec 2021 was an erratum.'
    ]
  },
  'ch-03-learning-to-validate': {
    careerId: 'car-digipplus',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'PARTIALLY_GROUNDED',
    historicalDisclosures: [
      'Narrative period "Feb 2022 — Dec 2022" reflects personal mathematics verification cadence; canonical contractual agency employment is June 2022 — September 2022.'
    ]
  },
  'ch-04-independent-years': {
    careerId: 'car-independent-quantitative',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'HISTORICAL_NARRATIVE',
    historicalDisclosures: [
      'Independent quantitative discipline spans September 2022 (transition window) to December 2023.'
    ]
  },
  'ch-05-product-environment': {
    careerId: 'car-wayground-math-sme',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'PARTIALLY_GROUNDED',
    historicalDisclosures: [
      'Documents initial product environment entry and KaTeX standards onboarding during the first quarter of Wayground SME tenure.'
    ]
  },
  'ch-06-content-to-systems': {
    careerId: 'car-wayground-math-sme',
    projectId: 'proj-content-builder',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'FULLY_GROUNDED',
    historicalDisclosures: [
      'VoyageMath Content Builder V1 was designed and engineered by the Wayground Engineering team. Aadil acted as SME tester, providing bug reports, edge-case analysis, and UI workflow feedback; not software implementation authorship.'
    ]
  },
  'ch-07-making-math-visual': {
    careerId: 'car-wayground-math-sme',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'HISTORICAL_NARRATIVE',
    historicalDisclosures: [
      'Vector diagram creation and coordinate geometry standardization in Figma carried out under Wayground SME role.'
    ]
  },
  'ch-08-workflow-problem': {
    careerId: 'car-wayground-math-sme',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'HISTORICAL_NARRATIVE',
    historicalDisclosures: [
      'Item template modularity and scaling authoring protocols under Wayground SME role across 500+ items.'
    ]
  },
  'ch-09-ai-in-workflow': {
    careerId: 'car-wayground-math-sme',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'HISTORICAL_NARRATIVE',
    historicalDisclosures: [
      'Early human-in-the-loop (HITL) prompt constraint exploration and stochastic LLM error identification.'
    ]
  },
  'ch-10-in-house-creation': {
    careerId: 'car-wayground-math-sme',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01'],
    groundingStatus: 'HISTORICAL_NARRATIVE',
    historicalDisclosures: [
      'Cataloging of language model mathematical failure modes and boundary analysis justifying external programmatic code verification.'
    ]
  },
  'ch-11-generation-not-enough': {
    careerId: 'car-wayground-math-sme',
    projectId: 'proj-vm-copy',
    claimIds: [],
    evidenceIds: ['EVID-VM-01'],
    groundingStatus: 'FULLY_GROUNDED',
    historicalDisclosures: [
      'VM Copy Question Generator was conceived and developed during October–mid-November 2025 during Wayground SME tenure. Team usage began in November 2025; formal corporate deployment date is unevidenced. Narrative text referencing "Feb 2025" reflects early conceptual problem recognition.'
    ]
  },
  'ch-12-generation-to-evaluation': {
    careerId: 'car-wayground-math-sme',
    projectId: 'proj-vm-copy',
    claimIds: ['CLAIM-VM-001'],
    evidenceIds: ['EVID-VM-01'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      'VM Copy <1ms latency and $0 marginal spend apply strictly to in-memory Tier-1 deterministic evaluation (lib/eval-layer.ts); upstream LLM generation takes ~4-8s and incurs API costs.'
    ],
    historicalDisclosures: [
      'Career transfer narrative asserting that VM Copy directly caused the transition to the AI/ML team is an asserted career narrative and is not formally evidenced by corporate documentation.'
    ]
  },
  'ch-13-ai-worksheets': {
    careerId: 'car-wayground-aiml',
    projectId: 'proj-ai-worksheets',
    claimIds: ['CLAIM-WORKSHEETS-001'],
    evidenceIds: ['EVID-WS-01'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      'Workflow runtime comparison (~2 hours estimated teacher baseline vs ~3 minutes observed POC runtime) is an informal operational comparison, not a controlled algorithmic benchmark.'
    ],
    historicalDisclosures: [
      'AI Worksheets was an employer internal product POC developed during Wayground employment; implementation authorship was Sole Implementer (React/FastAPI, 2D backtracking solvers, pdflatex pools).'
    ]
  },
  'ch-14-applications-to-pipelines': {
    careerId: 'car-wayground-aiml',
    projectId: 'proj-item-bank',
    claimIds: [],
    evidenceIds: ['EVID-SRC-PROJECTS-01'],
    groundingStatus: 'FULLY_GROUNDED',
    historicalDisclosures: [
      'US Mathematics Item Bank was a collaborative Wayground team pipeline. Aadil personally engineered visual domain routing (SVG vs TikZ), compile verification gates, and Min/Max Swap curriculum balancing; not sole pipeline authorship.'
    ]
  },
  'ch-15-curriculum-etl': {
    careerId: 'car-wayground-aiml',
    projectId: 'proj-curriculum-etl',
    claimIds: ['CLAIM-ETL-001'],
    evidenceIds: ['EVID-ETL-01'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      '3-tier integrity reflects sequential pipeline stages (Reviewer -> Critic -> CSV Audit); not an algorithmic latency benchmark.'
    ],
    historicalDisclosures: [
      'Curriculum Transformation Engine was an internal Wayground enterprise pipeline; implementation authorship was Sole Implementer (Celery/Redis Map-Reduce architecture and dynamic schema contract synthesis).'
    ]
  },
  'ch-16-loom-ai': {
    careerId: 'car-wayground-math-sme',
    projectId: 'proj-journey-map',
    claimIds: [],
    evidenceIds: ['EVID-SRC-PROJECTS-01'],
    groundingStatus: 'PARTIALLY_GROUNDED',
    historicalDisclosures: [
      'Loom AI was conceived and implemented during an independent hackathon event in December 2025 during Wayground SME tenure.'
    ]
  },
  'ch-17-atlas-ai': {
    careerId: 'car-wayground-aiml',
    projectId: 'proj-systems-archive',
    claimIds: [],
    evidenceIds: ['EVID-SRC-PROJECTS-01'],
    groundingStatus: 'PARTIALLY_GROUNDED',
    historicalDisclosures: [
      'Atlas AI is an independent engineering project developed in January 2026; 178 automated tests across graph routing, SEC parser, and alerts verified in project metadata.'
    ]
  },
  'ch-18-design-automation': {
    careerId: 'car-wayground-aiml',
    projectId: 'proj-design-automation',
    claimIds: ['CLAIM-EDA-001', 'CLAIM-EDA-002'],
    evidenceIds: ['EVID-EDA-01', 'EVID-EDA-02'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      '0.0000% volume error (<10^-6) represents analytical software calculus agreement between closed-form equations and CadQuery/OpenCascade BRep numerical integration; does NOT assert physical CNC machining or manufacturing tolerance.',
      '424 pytests collected across 28 test suites in Dockerized test environment.'
    ]
  },
  'ch-19-ai-reliability': {
    careerId: 'car-wayground-aiml',
    projectId: 'proj-ai-reliability',
    claimIds: ['CLAIM-RELIABILITY-001', 'CLAIM-RELIABILITY-002'],
    evidenceIds: ['EVID-REL-01', 'EVID-REL-02'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      '158 collected backend test cases across backend/tests/; 47 governance tests across 12 pages.'
    ]
  },
  'ch-20-ocr-evaluator': {
    careerId: 'car-independent-research',
    projectId: 'proj-ocr-evaluator',
    claimIds: ['CLAIM-OCR-001', 'CLAIM-OCR-002'],
    evidenceIds: ['EVID-OCR-01', 'EVID-OCR-02'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      '134 backend test functions collected across 22 test files; 20 Playwright browser UI assertions.'
    ]
  },
  'ch-21-ask-aadil': {
    careerId: 'car-independent-research',
    projectId: 'proj-ask-aadil',
    claimIds: ['CLAIM-ASK-001', 'CLAIM-ASK-002'],
    evidenceIds: ['EVID-ASK-01', 'EVID-ASK-02'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      '172 core hardening checks and 327 harness assertions are distinct metrics representing security/epistemic validation and overall test harness scope respectively.'
    ]
  },
  'ch-22-solace-ai': {
    careerId: 'car-independent-research',
    projectId: 'proj-solace-ai',
    claimIds: ['CLAIM-SOLACE-001', 'CLAIM-SOLACE-002'],
    evidenceIds: ['EVID-SOLACE-01', 'EVID-SOLACE-02'],
    groundingStatus: 'FULLY_GROUNDED',
    governedMetricCaveats: [
      '50 mobile checks execute under Jest/tsc static mock environment; does NOT represent execution on physical Android or iOS devices.',
      '52 backend pytests execute against FastAPI endpoints.'
    ]
  },
  'ch-23-synthesis': {
    careerId: 'car-independent-research',
    claimIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01', 'EVID-SRC-JOURNAL-01'],
    groundingStatus: 'HISTORICAL_NARRATIVE',
    historicalDisclosures: [
      'Synthesizes the iterative engineering loop of mathematics pedagogy, deterministic boundaries, and empirical evaluation across all 11 systems.'
    ]
  }
}

// ============================================================================
// 4. CANONICAL PROJECTION LOGIC
// ============================================================================

/**
 * Derives the canonical ownership classification for a project, enforcing publication safeguards.
 */
function deriveOwnershipClassification(
  canonicalProj?: CanonicalProjectRecord
): JournalOwnershipClassification | undefined {
  if (!canonicalProj) return undefined

  const isProprietaryOrInternal =
    canonicalProj.ipOwnership === 'EMPLOYER_PROPRIETARY' ||
    canonicalProj.publicationEligibility !== 'PUBLIC_OPEN_SOURCE' ||
    canonicalProj.repository.isPrivateOrProprietary

  return {
    implementationAuthorship: canonicalProj.implementationAuthorship,
    architecturalResponsibility: canonicalProj.architecturalResponsibility,
    ipOwnership: canonicalProj.ipOwnership,
    organizationalContext: canonicalProj.organizationalContext,
    publicationEligibility: canonicalProj.publicationEligibility,
    isPrivateOrProprietary: isProprietaryOrInternal,
    // Publication safeguard: employer-proprietary projects strictly project publicUrl as null
    publicUrl: isProprietaryOrInternal ? null : canonicalProj.repository.publicUrl
  }
}

/**
 * Projects a single raw journal chapter into a fully grounded canonical chapter.
 */
function projectGroundedChapter(raw: JournalChapterRecord): GroundedJournalChapter {
  const def = GROUNDING_DEFINITIONS[raw.id] || {
    claimIds: [],
    evidenceIds: [],
    groundingStatus: 'HISTORICAL_NARRATIVE' as GroundingStatus
  }

  const canonicalCareer = def.careerId
    ? canonicalRegistry.careerRecords.find(c => c.careerId === def.careerId)
    : undefined

  const canonicalProj = def.projectId
    ? canonicalRegistry.projectRecords.find(p => p.projectId === def.projectId)
    : undefined

  const ownershipClassification = deriveOwnershipClassification(canonicalProj)

  const grounding: JournalGroundingMetadata = {
    careerId: def.careerId,
    careerPhaseId: canonicalCareer?.phaseId,
    projectId: def.projectId,
    connectedSystemSlug: raw.connectedSystemSlug || canonicalProj?.slug,
    claimIds: [...def.claimIds],
    evidenceIds: [...def.evidenceIds],
    groundingStatus: def.groundingStatus,
    ownershipClassification,
    governedMetricCaveats: def.governedMetricCaveats ? [...def.governedMetricCaveats] : undefined,
    historicalDisclosures: def.historicalDisclosures ? [...def.historicalDisclosures] : undefined
  }

  return {
    ...raw,
    // Connected system slug defaults to canonical project slug if available
    connectedSystemSlug: raw.connectedSystemSlug || canonicalProj?.slug,
    canonicalCareerIds: def.careerId ? [def.careerId] : [],
    canonicalProjectIds: def.projectId ? [def.projectId] : [],
    canonicalClaimIds: [...def.claimIds],
    canonicalEvidenceIds: [...def.evidenceIds],
    grounding
  }
}

// ============================================================================
// 5. PUBLIC ADAPTER QUERY APIS
// ============================================================================

/**
 * Returns all 23 grounded journal chapters projected with canonical provenance metadata.
 * Pure, deterministic projection returning fresh objects.
 */
export function getGroundedJournalChapters(): GroundedJournalChapter[] {
  return RAW_JOURNAL_CHAPTERS.map(ch => projectGroundedChapter(ch))
}

/**
 * Retrieves a single grounded journal chapter by its ID (e.g. 'ch-11-generation-not-enough').
 */
export function getGroundedChapterById(id: string): GroundedJournalChapter | undefined {
  const found = RAW_JOURNAL_CHAPTERS.find(ch => ch.id === id)
  if (!found) return undefined
  return projectGroundedChapter(found)
}

/**
 * Retrieves a single grounded journal chapter by its chapter number (e.g. '11' or 'SYNTHESIS').
 */
export function getGroundedChapterByNumber(number: string): GroundedJournalChapter | undefined {
  const found = RAW_JOURNAL_CHAPTERS.find(ch => ch.number === number)
  if (!found) return undefined
  return projectGroundedChapter(found)
}

/**
 * Retrieves all grounded chapters associated with a given canonical project ID.
 */
export function getGroundedChaptersByProjectId(projectId: string): GroundedJournalChapter[] {
  return getGroundedJournalChapters().filter(ch =>
    ch.canonicalProjectIds.includes(projectId) || ch.grounding.projectId === projectId
  )
}

/**
 * Retrieves all grounded chapters associated with a given canonical career ID.
 */
export function getGroundedChaptersByCareerId(careerId: string): GroundedJournalChapter[] {
  return getGroundedJournalChapters().filter(ch =>
    ch.canonicalCareerIds.includes(careerId) || ch.grounding.careerId === careerId
  )
}

/**
 * Retrieves all grounded chapters referencing a given canonical technical claim ID.
 */
export function getGroundedChaptersByClaimId(claimId: string): GroundedJournalChapter[] {
  return getGroundedJournalChapters().filter(ch =>
    ch.canonicalClaimIds.includes(claimId) || ch.grounding.claimIds.includes(claimId)
  )
}

/**
 * Retrieves all grounded chapters referencing a given canonical evidence ID.
 */
export function getGroundedChaptersByEvidenceId(evidenceId: string): GroundedJournalChapter[] {
  return getGroundedJournalChapters().filter(ch =>
    ch.canonicalEvidenceIds.includes(evidenceId) || ch.grounding.evidenceIds.includes(evidenceId)
  )
}

/**
 * Reverse-lookup helper deriving case-study connections for a given journal chapter.
 *
 * Relationship ownership: `canonicalRegistry.caseStudyReferences[].mappedJournalChapters`
 * is the single source of truth for case-study-to-journal links.
 * This adapter does not maintain a duplicate hardcoded list of case studies.
 *
 * @param chapterId Journal chapter identifier (e.g. 'ch-07-making-math-visual', 'ch-21-ai-reliability-architecture')
 * @returns Array of derived case-study links (empty array if the chapter has no case-study links)
 */
export function getCaseStudiesForChapter(chapterId: string): DerivedChapterCaseStudyLink[] {
  const references = canonicalRegistry.caseStudyReferences ?? []
  const links: DerivedChapterCaseStudyLink[] = []

  for (const cs of references) {
    for (const mapping of cs.mappedJournalChapters) {
      if (mapping.chapterId === chapterId) {
        links.push({
          caseStudyId: cs.caseStudyId,
          title: cs.title,
          slug: cs.slug,
          classification: mapping.classification,
          targetAspect: mapping.classification === 'PARTIAL' ? mapping.targetAspect : undefined,
          relevantAdrIds: [...mapping.relevantAdrIds],
          contentAnchor: cs.contentAnchor,
          publicationEligibility: cs.publicationEligibility
        })
      }
    }
  }

  return links
}

// ============================================================================
// 6. VALIDATION & ADVERSARIAL INTEGRITY VERIFIER
// ============================================================================

export interface JournalGroundingValidationResult {
  valid: boolean
  errors: string[]
  chapterCount: number
  groundedClaimsCount: number
  groundedEvidenceCount: number
}

/**
 * Adversarially validates that every grounded journal chapter strictly resolves against
 * the authoritative canonical registry with zero dangling pointers, zero publication leaks,
 * and zero attribution violations.
 */
export function validateJournalGrounding(
  chapters: GroundedJournalChapter[] = getGroundedJournalChapters()
): JournalGroundingValidationResult {
  const errors: string[] = []
  const careerIds = new Set(canonicalRegistry.careerRecords.map(c => c.careerId))
  const projectIds = new Set(canonicalRegistry.projectRecords.map(p => p.projectId))
  const claimIds = new Set(canonicalRegistry.claimRecords.map(c => c.claimId))
  const evidenceIds = new Set(canonicalRegistry.evidenceRecords.map(e => e.evidenceId))

  const seenIds = new Set<string>()
  let totalClaims = 0
  let totalEvidence = 0

  if (chapters.length !== 23) {
    errors.push(`Expected exactly 23 journal chapters; found ${chapters.length}`)
  }

  for (const ch of chapters) {
    // 1. ID uniqueness and stability
    if (!ch.id || seenIds.has(ch.id)) {
      errors.push(`Duplicate or empty chapter id: ${ch.id}`)
    }
    seenIds.add(ch.id)

    // 2. Validate career reference
    if (ch.grounding.careerId) {
      if (!careerIds.has(ch.grounding.careerId)) {
        errors.push(`Chapter ${ch.id} references invalid careerId: ${ch.grounding.careerId}`)
      }
      if (!ch.canonicalCareerIds.includes(ch.grounding.careerId)) {
        errors.push(`Chapter ${ch.id} canonicalCareerIds out of sync with grounding.careerId`)
      }
    }

    // 3. Validate project reference
    if (ch.grounding.projectId) {
      if (!projectIds.has(ch.grounding.projectId)) {
        errors.push(`Chapter ${ch.id} references invalid projectId: ${ch.grounding.projectId}`)
      }
      if (!ch.canonicalProjectIds.includes(ch.grounding.projectId)) {
        errors.push(`Chapter ${ch.id} canonicalProjectIds out of sync with grounding.projectId`)
      }

      // 4. Confidentiality & publication restrictions check
      const canonicalProj = canonicalRegistry.projectRecords.find(p => p.projectId === ch.grounding.projectId)
      if (canonicalProj) {
        if (canonicalProj.ipOwnership === 'EMPLOYER_PROPRIETARY') {
          if (ch.grounding.ownershipClassification?.publicUrl !== null) {
            errors.push(
              `CONFIDENTIALITY LEAK: Employer proprietary project ${ch.grounding.projectId} in chapter ${ch.id} exposed publicUrl: ${ch.grounding.ownershipClassification?.publicUrl}`
            )
          }
          if (ch.grounding.ownershipClassification?.isPrivateOrProprietary !== true) {
            errors.push(
              `GOVERNANCE VIOLATION: Employer proprietary project ${ch.grounding.projectId} in chapter ${ch.id} must be flagged isPrivateOrProprietary: true`
            )
          }
        }
      }
    }

    // 5. Validate technical claims
    for (const claimId of ch.canonicalClaimIds) {
      if (!claimIds.has(claimId)) {
        errors.push(`Chapter ${ch.id} references invalid claimId: ${claimId}`)
      }
      totalClaims++
    }

    // 6. Validate evidence references
    for (const evId of ch.canonicalEvidenceIds) {
      if (!evidenceIds.has(evId)) {
        errors.push(`Chapter ${ch.id} references invalid evidenceId: ${evId}`)
      }
      totalEvidence++
    }

    // 7. Metric governance verification
    if (ch.canonicalClaimIds.includes('CLAIM-VM-001')) {
      const hasCaveat = ch.grounding.governedMetricCaveats?.some(c =>
        c.includes('<1ms') && c.includes('LLM')
      )
      if (!hasCaveat) {
        errors.push(`Chapter ${ch.id} references CLAIM-VM-001 without mandatory <1ms / LLM inference caveat`)
      }
    }

    if (ch.canonicalClaimIds.includes('CLAIM-EDA-001')) {
      const hasCaveat = ch.grounding.governedMetricCaveats?.some(c =>
        c.includes('CNC') && c.includes('calculus')
      )
      if (!hasCaveat) {
        errors.push(`Chapter ${ch.id} references CLAIM-EDA-001 without mandatory CNC machining caveat`)
      }
    }

    if (ch.canonicalClaimIds.includes('CLAIM-RELIABILITY-001')) {
      const hasTestCases = ch.grounding.governedMetricCaveats?.some(c =>
        c.includes('158') && c.includes('test cases')
      )
      if (!hasTestCases) {
        errors.push(`Chapter ${ch.id} references CLAIM-RELIABILITY-001 without mandatory "158 test cases" phrasing`)
      }
    }

    if (ch.canonicalClaimIds.includes('CLAIM-SOLACE-001')) {
      const hasMockCaveat = ch.grounding.governedMetricCaveats?.some(c =>
        c.includes('physical Android')
      )
      if (!hasMockCaveat) {
        errors.push(`Chapter ${ch.id} references CLAIM-SOLACE-001 without mandatory physical device caveat`)
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    chapterCount: chapters.length,
    groundedClaimsCount: totalClaims,
    groundedEvidenceCount: totalEvidence
  }
}
