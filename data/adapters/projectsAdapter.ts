/**
 * CANONICAL PROJECTS REGISTRY ADAPTER
 *
 * Pure, deterministic projection layer mapping authoritative Phase 1 canonical records
 * to consumer-facing `Project` and `ProjectMetadata` interfaces.
 *
 * Core Governance Guarantees:
 * 1. Central Publication Restriction Enforcement:
 *    Any project with `ipOwnership === 'EMPLOYER_PROPRIETARY'`,
 *    `publicationEligibility !== 'PUBLIC_OPEN_SOURCE'`, or
 *    `repository.isPrivateOrProprietary === true` is guaranteed to project
 *    `github: null` and sanitize all `codeEvidence[].sourceUrl` to `undefined`.
 * 2. Chronological & Attribution Reconciliation:
 *    Authoritative development windows, canonical ownership categories,
 *    and required status notices (e.g. vm-copy Oct-Nov 2025 tenure development,
 *    Tier-1 <1ms evaluation caveats, and CAD software-only validation) are strictly applied.
 * 3. Determinism & Immutability:
 *    Zero mutation of underlying canonical records; fresh object projections returned.
 */

import { canonicalRegistry } from '../canonical/canonicalRegistry'
import { CanonicalProjectRecord } from '../canonical/canonicalSchema'
import {
  Project,
  CodeEvidence,
  SystemLayerItem,
  FailureModeItem,
  OwnershipClassification,
  OwnershipCategory,
  ProjectVideoDemo
} from '../../types'
import { ProjectMetadata, OwnershipType } from '@/types/rag'

// ============================================================================
// 1. CENTRAL GOVERNANCE HELPERS
// ============================================================================

/**
 * Centrally evaluates publication eligibility and returns a verified public URL
 * or strictly `null` if the project is proprietary, internal, or non-public.
 */
export function getGovernedProjectPublicUrl(canonicalProj?: CanonicalProjectRecord): string | null {
  if (!canonicalProj) return null

  if (
    canonicalProj.ipOwnership === 'EMPLOYER_PROPRIETARY' ||
    canonicalProj.publicationEligibility !== 'PUBLIC_OPEN_SOURCE' ||
    canonicalProj.repository.isPrivateOrProprietary
  ) {
    return null
  }

  return canonicalProj.repository.publicUrl || null
}

/**
 * Strips sourceUrl from code evidence when the underlying system is employer proprietary,
 * ensuring internal repository structures never leak to public surfaces.
 */
function sanitizeCodeEvidence(
  evidenceList: CodeEvidence[] | undefined,
  isProprietary: boolean
): CodeEvidence[] | undefined {
  if (!evidenceList) return undefined

  return evidenceList.map((item) => {
    if (isProprietary) {
      const { sourceUrl, ...rest } = item
      return {
        ...rest,
        sourceUrl: undefined
      }
    }
    return { ...item }
  })
}

/**
 * Resolves a canonical project record by ID or canonical slug.
 */
export function getCanonicalProjectRecord(identifier: string): CanonicalProjectRecord | undefined {
  return canonicalRegistry.projectRecords.find(
    (p) => p.projectId === identifier || p.slug === identifier
  )
}

// ============================================================================
// 2. PRESENTATION OVERLAYS FOR THE 11 PUBLIC SYSTEMS
// ============================================================================

interface ProjectPresentationOverlay {
  id: string
  slug: string
  canonicalId?: string
  title: string
  subtitle?: string
  tagline: string
  summary: string
  type: string
  demo: string | null
  publicRepoOverride?: string | null // Only used if non-proprietary
  technologies: string[]
  problem: string
  solution: string
  keyFeatures: string[]
  architecturePattern: 'atlas' | 'textile' | 'taskmanager' | 'overview' | 'reliability' | 'eda' | 'qgen' | 'worksheets' | 'etl' | 'ask-aadil' | 'solace' | 'ocr'
  systemLayers: SystemLayerItem[]
  context?: string
  criticalDecision?: string
  whatBroke?: FailureModeItem[]
  whatBecameDeterministic?: string
  evidence?: string[]
  tradeoffs?: string[]
  breakthrough?: string
  delta?: string
  codeEvidence: CodeEvidence[]
  customStatusNotice?: string
  videoDemo?: ProjectVideoDemo
  // ProjectMetadata RAG projection overrides
  ragRole?: string
  ragPortfolioRefs?: {
    timeline?: string[]
    journal?: string[]
    system?: string
  }
  ragEvidence?: string[]
}

const PROJECT_OVERLAYS: ProjectPresentationOverlay[] = [
  // -------------------------------------------------------------
  // 1. VM Copy Question Generator
  // -------------------------------------------------------------
  {
    id: 'vm-copy',
    slug: 'vm-copy',
    canonicalId: 'proj-vm-copy',
    title: 'VM Copy Question Generator',
    tagline: 'Hierarchical multi-tier prompting with Tier-1 deterministic evaluation.',
    summary:
      'Deterministic math question generator enforcing 4 unique options, single correct answer exclusivity, and distractor rationale validation without model dependencies.',
    type: 'Deterministic Guardrails • Evaluation',
    demo: null,
    technologies: ['LLM Generation', 'Next.js 16', 'TypeScript 5', 'Deterministic Validation', 'Client Guardrails'],
    problem:
      'Standard LLM prompts generate math questions with duplicate options, multiple correct answers, or nonsensical distractors that fail instructional quality audits.',
    solution:
      'I independently designed and built this application for the Wayground/VoyageMath content-team workflow, pairing multi-tier prompt templates with a pure TypeScript Tier-1 Deterministic Evaluator that audits every generated question against defined structural constraints (exact option count, single correct-answer exclusivity, and duplicate distractor rejection) prior to human pedagogical review.',
    keyFeatures: [
      'Tier-1 Deterministic Evaluator (lib/eval-layer.ts) enforcing 4 options, single CA, and duplicate rejection at <1ms and $0 API cost (client-side deterministic evaluation)',
      'Parallel micro-batching (calculateBatches) bounding generation latency to 4–8s',
      'Tier-2/3 adversarial blind-solve verifier (/api/verify)',
      'Dogfooded as live target under AI Application Reliability platform'
    ],
    architecturePattern: 'qgen',
    systemLayers: [
      { layer: 'Frontend Application', components: 'Next.js 16 / React 19 / TypeScript 5', details: 'Reactive problem configuration interface and client-side variation state' },
      { layer: 'LLM Orchestration', components: 'Multi-Provider Router (OpenAI, Gemini, NaraRouter)', details: 'Streaming question variation generation via structured prompt templates with model routing' },
      { layer: 'Deterministic Evaluator', components: 'lib/eval-layer.ts (Pure TypeScript)', details: 'Zero-cost invariant enforcement (4 options, 1 CA, duplicate distractor rejection)' },
      { layer: 'Client Guardrails', components: 'Reactive Error Handlers', details: 'Instant UI violation notification and invalid output containment' }
    ],
    customStatusNotice:
      'Built as an independent engineering initiative during tenure as Mathematics Subject Matter Expert at Wayground (development: October–mid-November 2025; Mathematics SME team adoption: November 2025). Formal deployment date is not independently established. Intellectual property belongs to Wayground Inc. Tier-1 deterministic evaluation achieves <1ms execution with zero model dependencies; Tier-2/3 LLM verification latencies remain bounded at 4–8s.',
    codeEvidence: [
      {
        id: 'vm-copy-eval-layer',
        title: 'Tier-1 Deterministic Evaluator & Distractor Guardrail',
        decision: 'DETERMINISTIC EVALUATION BEFORE PROBABILISTIC REVIEW',
        language: 'typescript',
        sourcePath: 'lib/eval-layer.ts',
        lineRange: '44-76',
        ownership: 'BUILT INDEPENDENTLY',
        code: `export function evaluateDeterministic(
  question: { question: string; options: QuestionOption[]; solution?: string },
  expectedOptionsCount: number = 4
): EvalResult {
  const issues: string[] = []
  let score = 100

  // 1. Exact option count check
  if (!question.options || question.options.length !== expectedOptionsCount) {
    issues.push(\`Expected exactly \${expectedOptionsCount} options, but found \${question.options?.length || 0}.\`)
    score -= 25
  }

  // 2. Exactly one Correct Answer (CA)
  const caOptions = question.options.filter(
    (opt) => (opt.logic || '').trim().toUpperCase() === 'CA'
  )
  if (caOptions.length === 0) {
    issues.push('No option is marked with logic: "CA" (Correct Answer).')
    score -= 35
  } else if (caOptions.length > 1) {
    issues.push(\`Multiple options (\${caOptions.length}) are marked as Correct Answer ("CA").\`)
    score -= 30
  }

  // 3. Set-based duplicate option detection
  const seenTexts = new Set<string>()
  for (const opt of question.options) {
    const rawText = (opt.text || '').trim().toLowerCase()
    if (seenTexts.has(rawText)) {
      issues.push(\`Duplicate option found: "\${opt.text}".\`)
      score -= 20
    }
    seenTexts.add(rawText)
  }

  return { passed: issues.length === 0, score: Math.max(0, score), issues }
}`,
        explanation: 'Generating a question was not the same as generating a good question. The language model could generate a plausible-looking question while still violating structural requirements. The evaluator therefore makes acceptance deterministic instead of asking the model to judge its own output.',
        principle: 'The model generates candidates; deterministic evaluation decides whether they satisfy the required constraints.',
        evidence: [
          '4 unique options',
          'Exactly 1 CA invariant',
          'Distractor logic checked',
          '<1ms local latency'
        ]
      },
      {
        id: 'vm-copy-batching',
        title: 'Latency-Bounded Micro-Batch Splitting',
        decision: 'PARALLEL PARTITIONING OVER MONOLITHIC COMPLETIONS',
        language: 'typescript',
        sourcePath: 'app/api/generate/route.ts',
        lineRange: '18-35',
        ownership: 'BUILT INDEPENDENTLY',
        code: `export function calculateBatches(numQuestions: number): number[] {
  const batches: number[] = []
  let remaining = numQuestions
  while (remaining > 0) {
    if (remaining >= 3) {
      batches.push(3)
      remaining -= 3
    } else {
      batches.push(remaining)
      remaining = 0
    }
  }
  return batches
}

// Dispatched concurrently via Promise.all to prevent serverless gateway timeouts:
const batchResults = await Promise.all(
  batches.map((batchSize) =>
    generateQuestionsWithAI({ ...params, count: batchSize })
  )
)`,
        explanation: 'Requesting batches of 5 to 10 questions in a single prompt completion causes generation latency to surge past 30 seconds, risking serverless gateway timeouts and attention degradation across later questions. Partitioning the request into parallel micro-batches of at most 2–3 questions bounds total latency to ~4-6 seconds regardless of batch size.',
        evidence: [
          'Bounded ~4-6s generation',
          'Zero serverless timeouts',
          'Concurrent worker dispatch'
        ]
      }
    ],
    ragRole: 'Creator & Lead Developer (Wayground Independent Build)',
    ragPortfolioRefs: {
      timeline: ['exp-wayground-math-sme', 'exp-wayground-vm-copy'],
      journal: ['spread-06-chapter-06-vm-copy'],
      system: '/projects/vm-copy'
    },
    ragEvidence: [
      'Internal deployment at Wayground reducing variant authoring cycle time from hours to minutes.',
      'The deterministic evaluation runs locally without another model call, enforcing required option count (4), exactly one correct-answer flag, and duplicate-option detection.',
      'Direct catalyst for internal transition from Content SME to AI/ML Engineering team.'
    ]
  },

  // -------------------------------------------------------------
  // 2. AI Worksheets Product POC
  // -------------------------------------------------------------
  {
    id: 'ai-worksheets',
    slug: 'ai-worksheets',
    canonicalId: 'proj-ai-worksheets',
    title: 'AI Worksheets Product POC',
    subtitle: 'Dual-pipeline educational platform pairing multi-model AI routing with physical compilers and game graph solvers',
    tagline: 'Curriculum-aligned worksheet generator pairing multi-model AI with TeX Live and algorithmic game builders.',
    summary:
      'A company proof of concept independently built at Wayground automating TEKS-aligned educational content across two formats: Formal Question Worksheets with TikZ/LaTeX diagrams compiled via headless TeX Live, and Gamified Activity Worksheets (Crosswords and Maze Trails) powered by deterministic 2D backtracking and honeycomb hex graph algorithms.',
    type: 'Company POC • Full-Stack AI Application',
    demo: null,
    technologies: ['FastAPI', 'Python 3.12', 'React 18', 'Vite 6', 'TeX Live (pdflatex)', 'Poppler', 'WeasyPrint', 'ReportLab', 'Portkey (GPT-4o)', 'Gemini Flash', 'GPT-5.2'],
    problem:
      'Teachers spend 3–5 hours weekly manually creating worksheets. Existing tools lack curriculum subskill targeting and cannot generate gamified formats. Furthermore, generative diffusion models hallucinate mathematical figures, while LLMs cannot directly generate collision-free 2D crossword boards or navigable maze graphs.',
    solution:
      'Independently built by me as a company proof of concept at Wayground: engineered an asynchronous FastAPI backend and React 18/Vite 6 frontend. The system pairs multi-model generation (Portkey GPT-4o, Gemini Flash, GPT-5.2) with deterministic physical compilers and graph engines: TikZ LaTeX compilation via headless pdflatex + pdftoppm (300 DPI) with MD5 caching, an algorithmic 2D crossword backtracking builder, and a honeycomb hexagonal maze engine with arithmetic mistake distractor models.',
    keyFeatures: [
      'Dual-pipeline architecture: Formal Question Worksheets with TikZ diagrams and Gamified Worksheets (Crosswords and Maze Trails)',
      'Headless TeX Live (pdflatex) and Poppler pipeline compiling TikZ markup into verified 300-DPI PNGs',
      'Algorithmic 2D crossword grid solver with deterministic backtracking collision and intersection checks',
      'Honeycomb hexagonal maze trail generator using DFS path carving and arithmetic mistake distractor models',
      'Multi-model strategy: Portkey GPT-4o for questions, Gemini Flash for TikZ diagrams, and GPT-5.2 for gamified activities',
      'Documented creation time reduction from an estimated ~2-hour teacher baseline to ~3 minutes of automated POC pipeline execution (operational comparison, not an apples-to-apples benchmark)'
    ],
    architecturePattern: 'worksheets',
    systemLayers: [
      { layer: 'Interface', components: 'React 18 / Vite 6 / Material UI 6', details: 'Teacher authoring builders & student interactive players for formal sheets, crosswords, and maze trails' },
      { layer: 'Application / Backend', components: 'FastAPI (Python 3.12) Async Gateway', details: 'Session routing, TEKS standard & subskill selection, JWT auth, and PostgreSQL/Redis storage' },
      { layer: 'AI / Orchestration', components: 'Multi-Model Gateway & Verification', details: 'Portkey GPT-4o for questions, Gemini Flash for TikZ, GPT-5.2 3-prompt generation with second-pass verification' },
      { layer: 'Tools / Data', components: 'Deterministic Compilers & Graph Solvers', details: 'TeX Live pdflatex + Poppler pdftoppm 300 DPI, 2D crossword backtracking, and honeycomb hex maze DFS engine' },
      { layer: 'Verification / Operations', components: 'Asset Caching & Multi-Format Publishing', details: 'MD5 hash visual asset caching, WeasyPrint CSS Paged Media PDF export, and ReportLab vector PDF rendering' }
    ],
    customStatusNotice:
      'Engineered as a company proof-of-concept during tenure at Wayground (January–April 2026). Intellectual property belongs to Wayground Inc. 100% puzzle validity and 98.7% compile rates are measured against internal benchmark datasets and operational baselines.',
    codeEvidence: [
      {
        id: 'ai-worksheets-tikz-compiler',
        title: 'Headless TeX Live / TikZ Render Pipeline with MD5 Caching',
        decision: 'PHYSICAL LATEX COMPILER OVER GENERATIVE DIFFUSION',
        language: 'python',
        sourcePath: 'backend/app/services/formal_worksheet/tikz_images.py',
        lineRange: '42-68',
        ownership: 'BUILT INDEPENDENTLY',
        code: `def compile_tikz_to_image(tikz_code: str, output_dir: str, dpi: int = 300) -> str:
    """
    Compiles generated TikZ code using headless pdflatex + pdftoppm.
    Caches output via MD5 hash to prevent redundant LaTeX compilation runs.
    """
    cache_key = hashlib.md5(tikz_code.encode("utf-8")).hexdigest()
    output_png = os.path.join(output_dir, f"{cache_key}.png")
    if os.path.exists(output_png):
        return output_png

    with tempfile.TemporaryDirectory() as tmpdir:
        tex_path = os.path.join(tmpdir, "document.tex")
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(TIKZ_STANDALONE_TEMPLATE.replace("%TIKZ_CODE%", tikz_code))

        # Phase 1: Compile TeX to PDF via pdflatex
        cmd = ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", tex_path]
        proc = subprocess.run(cmd, cwd=tmpdir, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=20)
        if proc.returncode != 0:
            raise CompilationError(f"pdflatex failed: {proc.stderr.decode('utf-8', errors='ignore')}")

        # Phase 2: Rasterize PDF to 300-DPI PNG using Poppler pdftoppm
        pdf_path = os.path.join(tmpdir, "document.pdf")
        subprocess.run(["pdftoppm", "-png", "-r", str(dpi), "-singlefile", pdf_path, output_png[:-4]], check=True)

    return output_png`,
        explanation: 'Diffusion models consistently hallucinate geometric angles and coordinate grids. By routing mathematical visual descriptions through headless TeX Live with deterministic exit-code validation, mathematical figures compile with exact Cartesian precision and clean 300-DPI printable rasterization. Generative models propose candidate question text, while physical compilers (pdflatex) and deterministic graph solvers (2D backtracking for crosswords, honeycomb hex DFS for mazes) handle layout and validation.',
        evidence: [
          'Headless TeX Live (pdflatex) compilation',
          '300-DPI Poppler rasterization',
          'MD5 cache deduplication'
        ]
      }
    ],
    ragRole: 'Full-Stack Lead Engineer (Wayground Company POC)',
    ragPortfolioRefs: {
      timeline: ['exp-wayground-ai-worksheets'],
      journal: ['spread-07-chapter-07-worksheets'],
      system: '/projects/ai-worksheets'
    },
    ragEvidence: [
      'Containerized microservice stack generating TEKS-aligned printable worksheets with automated TikZ/LaTeX rendering.',
      'Algorithmic 2D backtracking and honeycomb hex graph solvers for gamified Word Searches and Maze Trails.',
      'Portkey multi-model routing (GPT-4o for math generation, Gemini Flash for layout heuristics).'
    ]
  },

  // -------------------------------------------------------------
  // 3. Curriculum Transformation Engine
  // -------------------------------------------------------------
  {
    id: 'curriculum-etl',
    slug: 'curriculum-etl',
    canonicalId: 'proj-curriculum-etl',
    title: 'Curriculum Transformation Engine',
    tagline: 'Concurrent Claude Map-Reduce ETL with dynamic schema contracts.',
    summary:
      'Asynchronous distributed ETL engine chunking long unstructured curriculum documents, extracting structured records via parallel Claude tool calling, and enforcing 3-tier integrity gates without hardcoded scrapers.',
    type: 'Data Engineering • LLM ETL',
    demo: null,
    technologies: ['LLM Extraction', 'Python', 'Data Transformation', 'Validation', 'CSV Integrity'],
    problem:
      'Curriculum documents from diverse school districts arrive in incompatible, unstructured formats (PDFs, DOCX, web standards) where traditional scrapers constantly break.',
    solution:
      'Independently engineered by me as part of my professional engineering work at Wayground: built a concurrent Map-Reduce pipeline that derives schema contracts dynamically from sample inputs, executes parallel LLM extraction workers with strict JSON tool calling, and audits outputs through a 3-tier integrity gate.',
    keyFeatures: [
      'Dynamic schema derivation compiling Pydantic contracts from sample CSVs',
      'Merged evaluate-and-fix review pass cutting API calls by 50%',
      'Deterministic row guards enforcing grade buckets and reserved blank columns',
      'Adversarial source CSV audit agent (csv_audit.py)'
    ],
    architecturePattern: 'etl',
    systemLayers: [
      { layer: 'Source Ingestion', components: 'Multi-Format Pipeline', details: 'Ingestion of heterogeneous state curriculum PDFs, DOCX, and tables' },
      { layer: 'Schema Derivation', components: 'Dynamic Schema Derivation', details: 'Compiles runtime Pydantic validation contracts dynamically from sample data' },
      { layer: 'Transformation Workers', components: 'Async Parallel LLM Tool Calling', details: 'Concurrent semantic taxonomy mapping and normalization' },
      { layer: 'Integrity Pipeline', components: '3-Tier Integrity Gates', details: 'Row-level pedagogical guards, grade-bucket assertions, and structural validation' },
      { layer: 'Security Audit', components: 'Adversarial CSV Audit Agent', details: 'Formula injection prevention (=, +, -, @) and clean CSV export' }
    ],
    customStatusNotice:
      'Engineered as an enterprise batch pipeline during tenure at Wayground (February–June 2026). Intellectual property belongs to Wayground Inc. Processing throughput of 150+ pages/min and 36 automated test validations reflect internal benchmark execution.',
    codeEvidence: [
      {
        id: 'curriculum-etl-csv-gate',
        title: '3-Tier CSV Schema Integrity Audit Gate',
        decision: 'DETERMINISTIC SCHEMA AUDITING BEFORE DATABASE PERSISTENCE',
        language: 'python',
        sourcePath: 'csv_audit.py',
        lineRange: '241-285',
        ownership: 'BUILT INDEPENDENTLY',
        code: `def _programmatic_row_issues(
    raw_row: dict[str, str],
    schema_config: Any,
    *,
    row_number: int,
    duplicate_display_standard_codes: dict[str, list[int]],
) -> list[CsvAuditIssue]:
    """
    Deterministic row-level gate validating Claude extraction before export.
    Enforces required columns, non-blank values, and uniqueness of standard codes.
    """
    issues: list[CsvAuditIssue] = []
    contract = schema_config.sample_contract
    required_columns = contract.required_columns if contract else []
    display_standard_code_column = _get_display_standard_code_column(schema_config)

    for column_name in required_columns:
        if column_name not in raw_row:
            issues.append(CsvAuditIssue(
                column_name=column_name,
                issue_type="missing_required_column",
                issue_message=f"Required column '{column_name}' is not present in the audited CSV."
            ))
            continue
        if not (raw_row.get(column_name) or "").strip():
            issues.append(CsvAuditIssue(
                column_name=column_name,
                issue_type="missing_required_value",
                issue_message=f"Required column '{column_name}' is blank."
            ))

    if display_standard_code_column:
        display_code = (raw_row.get(display_standard_code_column) or "").strip()
        duplicate_rows = duplicate_display_standard_codes.get(display_code, [])
        if display_code and len(duplicate_rows) > 1:
            joined_rows = ", ".join(str(number) for number in duplicate_rows)
            issues.append(CsvAuditIssue(
                column_name=display_standard_code_column,
                issue_type="duplicate_display_standard_code",
                issue_message=f"Display standard code '{display_code}' is duplicated in CSV rows {joined_rows}."
            ))
    return issues`,
        explanation: 'Large language models parsing 100+ page curriculum PDFs frequently drop columns or hallucinate schema variations across batch chunks. Rather than trusting model outputs directly, the pipeline runs a deterministic 3-tier integrity audit (Reviewer → Critic → CSV Audit) to catch dropped standards and schema violations before downstream ingest.',
        evidence: [
          '36 verified automated tests',
          '3-tier integrity verification (Reviewer → Critic → CSV Audit)',
          'Deterministic schema & standard code uniqueness assertions'
        ]
      }
    ],
    ragRole: 'Backend Data Engineer (Wayground Independent Build)',
    ragPortfolioRefs: {
      timeline: ['exp-wayground-curriculum-etl'],
      journal: ['spread-08-chapter-08-curriculum-etl'],
      system: '/projects/curriculum-etl'
    },
    ragEvidence: [
      'Asynchronous Map-Reduce pipeline chunking large PDF/DOCX/URL curriculum documents.',
      'Dynamic schema contract synthesis deriving parsing rules from sample datasets without hardcoded scrapers.',
      '3-tier integrity gates (Reviewer -> Critic -> CSV Audit) preventing malformed exports.'
    ]
  },

  // -------------------------------------------------------------
  // 4. US Mathematics Item Bank Generation Pipeline
  // -------------------------------------------------------------
  {
    id: 'math-item-bank',
    slug: 'math-item-bank',
    canonicalId: 'proj-item-bank',
    title: 'US Mathematics Item Bank Generation Pipeline',
    subtitle: 'Domain-based mathematical image generation, TikZ/SVG compilation, and pipeline stabilization',
    tagline: 'Semantic mathematical artifact generation with domain routing, TikZ/SVG compilation, and visual evaluation.',
    summary:
      'A company team system for generating US state-aligned mathematics assessment items. My documented contribution focused on reliable mathematical image generation: domain-based routing (SVG for geometry, TikZ for graphs/number lines), two-tier compile and visual evaluation, Upper Elementary pipeline stabilization, and open-ended question types.',
    type: 'Team Project • Artifact Generation & Evaluation',
    demo: null,
    technologies: ['TikZ / LaTeX', 'SVG Generation', 'Domain Routing', 'Vision Evaluation', 'Prompt Engineering', 'Team System'],
    problem:
      'At first glance, mathematical image generation appears simple: Question → LLM → Mathematical Image. In practice, mathematical images have strict semantics: geometry diagrams, coordinate graphs, number lines, and fraction models require fundamentally different visual representations. Asking a model to simply "generate an image" causes representation failures, uncompilable code, and visual drift that contradicts the mathematical intent of assessment items.',
    solution:
      'As part of the company team, I focused on the mathematical artifact generation and evaluation pipeline: routing visuals by domain (Geometry → SVG; Graphs/Number lines → TikZ), establishing two-tier evaluation (code-level TikZ compilation + visual-level vision inspection), stabilizing the Upper Elementary generation pipeline, and implementing open-ended question types and image-based answer options across multiple US state requirements.',
    keyFeatures: [
      'Documented personal contribution: domain-based representation routing (Geometry → SVG; Graphs/Number lines → TikZ)',
      'Two-tier artifact evaluation: code-level TikZ compilation checks and visual-level vision checks before acceptance',
      'Image-based answer option generation and option-image evaluation within the assessment correctness pipeline',
      'Upper Elementary pipeline stabilization and prompt development for grade-appropriate constraints',
      'Open-ended question-type implementation for Middle School and Upper Elementary across US states',
      'Forensic status: TEAM_PROJECT / SOURCE_UNAVAILABLE (enterprise team repository; not in personal source archive)'
    ],
    architecturePattern: 'atlas',
    systemLayers: [
      { layer: 'Interface', components: 'Standardized Assessment Specifications', details: 'US state curriculum standards and question blueprints for Middle School and Upper Elementary' },
      { layer: 'Application / Backend', components: 'Domain Routing & Pipeline Engine', details: 'Domain-based routing selecting SVG for geometry and TikZ for coordinate graphs/number lines' },
      { layer: 'AI / Orchestration', components: 'Prompt Engineering & Candidate Generation', details: 'Prompts encoding mathematical concept → visual structure → code for questions and image options' },
      { layer: 'Tools / Data', components: 'TikZ Compiler & Vision Evaluator', details: 'Deterministic pdflatex compiler gates and vision-based visual inspection of rendered images' },
      { layer: 'Verification / Operations', components: 'Item Acceptance & Pipeline Stabilization', details: 'Stabilized Upper Elementary and Middle School generation with open-ended items across US states' }
    ],
    customStatusNotice:
      'This system was developed as part of a company team. The implementation repository is not part of my personal source archive, so this case study describes the engineering work and system concepts I contributed to rather than presenting the complete codebase as my individual work.',
    codeEvidence: [
      {
        id: 'math-item-bank-image-routing',
        title: 'Domain-Based Mathematical Representation Routing',
        decision: 'DOMAIN-INTENT ROUTING & TWO-TIER COMPILATION GATES',
        language: 'python',
        sourcePath: 'backend/src/services/image_renderer.py',
        lineRange: '35-58',
        ownership: 'MY CONTRIBUTION',
        code: `def route_visual_representation(domain: MathDomain, visual_spec: Dict[str, Any]) -> VisualRenderTask:
    """
    My contribution: Routes mathematical visual specifications according to
    domain intent rather than generic prompt completion.
    Geometry -> SVG; Coordinate Graphs & Number Lines -> TikZ.
    """
    if domain in (MathDomain.COORDINATE_GEOMETRY, MathDomain.NUMBER_LINES, MathDomain.STATISTICS_PLOTS):
        return VisualRenderTask(
            renderer_engine="tikz_pdflatex",
            markup_generator=generate_tikz_source(visual_spec),
            verification_tier="exit_code_plus_vision_audit"
        )
    elif domain in (MathDomain.PLANE_GEOMETRY, MathDomain.TRANSFORMATIONS):
        return VisualRenderTask(
            renderer_engine="parametric_svg",
            markup_generator=generate_svg_geometry(visual_spec),
            verification_tier="dom_path_audit"
        )
    return VisualRenderTask(renderer_engine="fallback_spec", markup_generator=None)`,
        explanation: 'My documented engineering contribution within this company team platform focused on researching mathematical visual representations and building the image rendering pipeline. Directing visuals by mathematical domain ensures figures satisfy curriculum standards while distinguishing code compilation from visual inspection.',
        principle: 'My contribution: Mathematics image generation, TikZ/SVG compilation routing, and two-tier evaluation.',
        evidence: [
          'Domain-based SVG/TikZ routing',
          'Two-tier compilation + vision evaluation',
          'Upper Elementary pipeline stabilization'
        ]
      }
    ],
    ragRole: 'Backend AI Engineer (Wayground AI/ML Team Project)',
    ragPortfolioRefs: {
      timeline: ['exp-wayground-item-bank-pipeline'],
      journal: ['spread-09-team-item-bank'],
      system: '/projects/math-item-bank'
    },
    ragEvidence: [
      'Multi-node LangGraph pipeline with planner, amplification, and question generation stages.',
      'Conditional graphic router dispatching coordinate geometry to SVG and abstract diagrams to TikZ.',
      'Integer Linear Programming (ILP) and Min/Max swap algorithms balancing DOK metrics and curriculum weightage.',
      'Personal contribution: Designed state graph nodes, graphics router, and two-tier automated compilation check.'
    ]
  },

  // -------------------------------------------------------------
  // 5. Engineering Design Automation (EDA CAD)
  // -------------------------------------------------------------
  {
    id: 'design-automation',
    slug: 'design-automation',
    canonicalId: 'proj-design-automation',
    title: 'Engineering Design Automation',
    tagline: 'Hybrid AI requirement interpretation with deterministic physical solvers.',
    summary:
      'A full-stack AI mechanical design system converting natural language engineering briefs into validated 3D STEP BRep solid geometry and SVG production drawings with CAD ↔ drawing cross-validation.',
    type: 'Hybrid AI • Deterministic Solvers',
    demo: null,
    publicRepoOverride: 'https://github.com/aadil-lang/Engineering-design-automation',
    technologies: ['AI Interpretation', 'Python', 'Deterministic Solvers', 'CAD (BRep/STEP)', 'Validation (424 Tests)'],
    problem:
      'Language models hallucinate numerical dimensions and cannot reliably compute allowable stress, torsional shear, or standard nominal diameter series for load-bearing mechanical components.',
    solution:
      'I designed and built this system independently outside professional work: engineered a hybrid architecture where LLMs parse natural language specifications, while pure deterministic Python engineering solvers execute physical formulas with explicit parameter provenance and automated CAD cross-validation.',
    keyFeatures: [
      '424 automated pytests passing across 28 test suites in Dockerized test harness',
      '0.0000% relative volume discrepancy (< 10⁻⁶) verified between OpenCascade BRep solid cylinder and closed-form calculus',
      'Closed-form Saint-Venant torsion and von Mises shear yield (Ssy = 0.57735 * Sy)',
      'Automated CAD ↔ 2D drawing dimensional cross-verification before export',
      'Software analytical validation only — does not imply physical testing, machine safety certification, or ASME approval'
    ],
    architecturePattern: 'eda',
    systemLayers: [
      { layer: 'Interface & Ingestion', components: 'Streamlit / Natural Language Interface', details: 'Natural language mechanical design specification ingestion' },
      { layer: 'AI Parameter Extraction', components: 'LLM Schema Parsing', details: 'Extracts structured engineering parameters into strict Pydantic schemas' },
      { layer: 'Deterministic Solvers', components: 'Python Mechanical Solvers', details: 'Closed-form Saint-Venant torsion, von Mises distortion-energy, Euler-Bernoulli deflection' },
      { layer: 'CAD Kernel', components: 'OpenCascade / CadQuery / PythonOCC', details: 'Parametric 3D BRep solids, ISO STEP export, 2D ASME SVG blueprints' },
      { layer: 'Verification Suite', components: 'Automated Pytest Harness', details: '424 automated pytests across 28 test suites verifying zero CAD volume deviation' }
    ],
    customStatusNotice:
      'Software analytical validation only (424 automated pytests verifying 0.0000% CAD relative volume discrepancy); does not imply physical testing, machine safety certification, or ASME approval.',
    codeEvidence: [
      {
        id: 'eda-torsion-solver',
        title: 'Closed-Form Shaft Diameter Sizing & Torsional Stress',
        decision: 'CLOSED-FORM PHYSICS OVER GENERATIVE APPROXIMATION',
        language: 'python',
        sourcePath: 'src/design_engine/shaft.py',
        lineRange: '151-178',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadilkhurshid/engineering-design-automation',
        code: `def calculate_required_diameter(
    torque_nm: float,
    allowable_shear_stress_pa: float
) -> Tuple[float, float, List[str]]:
    """
    Computes theoretical minimum circular shaft diameter required to withstand torsional shear:
    tau = 16 * T / (pi * d^3)  ==>  d_req = (16 * T / (pi * tau_allow))^(1/3)
    """
    if torque_nm <= 0:
        raise ValueError(f"Torque must be strictly positive; received {torque_nm} N*m.")
    if allowable_shear_stress_pa <= 0:
        raise ValueError(f"Allowable shear stress must be strictly positive; received {allowable_shear_stress_pa} Pa.")

    cubed_d = (16.0 * torque_nm) / (math.pi * allowable_shear_stress_pa)
    d_req_m = cubed_d ** (1.0 / 3.0)
    d_req_mm = d_req_m * 1e3

    steps = [
        f"1. Transmitted torque: T = {torque_nm:.3f} N*m",
        f"2. Allowable shear stress: tau_allow = {allowable_shear_stress_pa / 1e6:.3f} MPa",
        f"3. Sizing formula: d_req = (16 * T / (pi * tau_allow))^(1/3) = {d_req_mm:.2f} mm"
    ]
    return d_req_m, d_req_mm, steps`,
        explanation: 'Machine components operating under torsional loads must satisfy closed-form shear stress invariants where structural failure is catastrophic. The LLM extracts engineering requirements, but the diameter sizing is strictly computed via closed-form Saint-Venant equations with zero generative hallucination.',
        evidenceResult: {
          input: '7.5 kW · 1200 RPM · Required FoS 2.2 · L = 350 mm',
          result: 'Analytical result: 16 mm shaft (theoretical d_min = 15.38 mm) | Computed FoS: 2.41',
          verification: 'Geometric verification: relative volume error < 10⁻⁶ (OpenCascade BRep solid)'
        },
        evidence: [
          'Closed-form Saint-Venant solver',
          '424 automated pytests',
          'ISO-10303 STEP BRep export'
        ]
      },
      {
        id: 'eda-brep-verification',
        title: 'Exact BRep Solid Cylinder Volume & Topology Verification',
        decision: 'TOPOLOGICAL VALIDATION WITH 10⁻⁶ VOLUME ERROR BOUND',
        language: 'python',
        sourcePath: 'src/cad/brep.py',
        lineRange: '38-65',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadilkhurshid/engineering-design-automation',
        code: `class BRepSolidCylinder:
    """
    Exact boundary representation (BRep) of a solid circular cylindrical shaft.
    Models topology (1 cylindrical lateral face, 2 planar caps), exact bounding box,
    analytical volume, and deterministic 2D orthographic projections.
    """
    def __init__(self, diameter_mm: float, length_mm: float):
        if diameter_mm <= 0 or length_mm <= 0:
            raise ValueError("Shaft dimensions must be strictly positive.")

        self.diameter_mm = float(diameter_mm)
        self.radius_mm = self.diameter_mm / 2.0
        self.length_mm = float(length_mm)

        # Analytical volume formula: V = pi * r^2 * L
        self.theoretical_volume_mm3 = math.pi * (self.radius_mm ** 2) * self.length_mm

    def verify_volume(self, measured_volume_mm3: float) -> bool:
        rel_error = abs(measured_volume_mm3 - self.theoretical_volume_mm3) / self.theoretical_volume_mm3
        return rel_error < GEOMETRY_VOLUME_REL_TOLERANCE  # 1e-6`,
        explanation: 'Generating a 3D CAD model requires topological validity, not just visual polygon meshes. Every synthesized OpenCascade cylinder is checked against its theoretical volume formula to ensure the exported ISO 10303 STEP solid model is watertight and dimensionally identical to 2D engineering drawings.',
        evidence: [
          'BRep topological validation',
          'Relative error < 10⁻⁶',
          'Automated CAD <-> Drawing dimensional sync'
        ]
      }
    ],
    ragRole: 'System Architect & Sole Author (Personal Engineering Build)',
    ragPortfolioRefs: {
      timeline: ['exp-engineering-design-automation'],
      journal: ['spread-10-chapter-08-eda'],
      system: '/projects/design-automation'
    },
    ragEvidence: [
      'Converts unstructured mechanical specifications into ISO-compliant STEP BRep solids and technical drawings.',
      'Closed-form deterministic physics solvers for torsional shear, bending moments, and nominal shaft series.',
      'Dimensional cross-validation ensuring zero discrepancy between 3D CAD geometry and 2D drawing callouts.',
      '424 automated test cases passing across 28 test suites in Dockerized test harness.'
    ]
  },

  // -------------------------------------------------------------
  // 6. AI Application Reliability & Browser QA
  // -------------------------------------------------------------
  {
    id: 'ai-reliability',
    slug: 'ai-reliability',
    canonicalId: 'proj-ai-reliability',
    title: 'AI Application Reliability & Browser QA',
    tagline: 'Local-first browser testing platform with predictive calibration and MCP control plane.',
    summary:
      'Browser testing platform powered by local Ollama Qwen 2.5 Coder, Playwright headless Chromium, deterministic behavioral contracts, Fisher Information covariance uncertainty abstention, Model Context Protocol (MCP) tool integration, human governance authorization gate, and an append-only SHA-256 cryptographic provenance chain.',
    type: 'Governed Agents • Reliability',
    demo: null,
    publicRepoOverride: 'https://github.com/aadil-lang/ai-engineering-lab',
    technologies: ['AI (Ollama)', 'Full-Stack (Next.js/FastAPI)', 'Browser Automation (Playwright)', 'Evaluation', 'Governance'],
    problem:
      'Web and AI applications suffer from non-deterministic failures, layout shifts, prompt regressions, and semantic drift, while unregulated coding agents risk executing unverified code patches directly in production without human oversight.',
    solution:
      'I designed and built this system independently outside professional work: engineered a local-first platform running Playwright headless Chromium, deterministic behavioral contracts, Fisher covariance uncertainty estimation (forcing abstention when uncertain), a mandatory human governance authorization gate before remediation, and an append-only SHA-256 provenance ledger.',
    keyFeatures: [
      '205+ automated tests (158 backend test suites + 47 governance & E2E tests) across backend/tests/',
      'Direct dogfooding loop verifying Project 01 (VM Copy) on port 3000 as live target',
      'Dual-transport MCP server (STDIO & Streamable HTTP) providing an MCP tool interface',
      'Mandatory human governance gate blocking unauthorized consequential code alterations'
    ],
    architecturePattern: 'reliability',
    systemLayers: [
      { layer: 'Frontend', components: 'Next.js / React / TypeScript', details: 'Real-time telemetry dashboard & test campaign viewer' },
      { layer: 'Application & Control Plane', components: 'FastAPI / Python 3.12', details: 'Model Context Protocol (MCP) tool integration & test orchestrator' },
      { layer: 'Execution', components: 'Playwright / Headless Chromium', details: 'Automated DOM event dispatcher & network monitor' },
      { layer: 'AI Reasoning', components: 'Local Ollama (Qwen 2.5 Coder)', details: 'Multi-modal root-cause diagnostic inference' },
      { layer: 'Evidence', components: 'Multi-Modal Telemetry', details: 'Raw DOM snapshots, visual screenshots, network HAR logs, console events' },
      { layer: 'Governance', components: 'Mathematical & Cryptographic Gates', details: 'Fisher covariance uncertainty abstention, human sign-off, SHA-256 genesis ledger' }
    ],
    codeEvidence: [
      {
        id: 'reliability-governance-gate',
        title: 'Deterministic Consequential Change Authorization Gate',
        decision: 'DETERMINISTIC GOVERNANCE GATE AROUND AI DIAGNOSIS',
        language: 'python',
        sourcePath: 'backend/app/governance/authorization_service.py',
        lineRange: '160-240',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadilkhurshid/ai-application-reliability',
        code: `def can_apply(
    self,
    change_type: RecommendationType,
    subject_id: str,
    authorization_id: Optional[str],
    target_version: Optional[str] = None,
    target_commit_sha: Optional[str] = None,
    current_evidence_package_id: Optional[str] = None,
    requested_scope: str = "PROMOTE",
) -> CanApplyResult:
    """
    Deterministic gate evaluating whether a consequential change is authorized.
    Returns CanApplyResult with AUTHORIZED or BLOCKED and structured explanations.
    """
    if not authorization_id:
        return CanApplyResult(
            decision=GateDecision.BLOCKED,
            is_authorized=False,
            reasons=["No authorization ID provided. Consequential changes require an explicit ChangeAuthorization."],
            blockers=["Missing authorization ID"]
        )

    auth = self.repo.get_authorization(authorization_id)
    if not auth or auth.status != AuthorizationStatus.ISSUED:
        return CanApplyResult(
            decision=GateDecision.BLOCKED,
            is_authorized=False,
            reasons=[f"Authorization '{authorization_id}' is invalid, revoked, or expired."],
            blockers=[f"Status is {auth.status if auth else 'NOT_FOUND'}"]
        )

    return CanApplyResult(decision=GateDecision.AUTHORIZED, is_authorized=True, reasons=["Valid authorization token."])`,
        explanation: 'The model can produce a diagnosis, but it does not get to decide by itself that a change is safe or verified. Autonomous remediation agents are strictly prohibited from mutating application code or promoting builds unless a scoped ChangeAuthorization ticket bound to the target commit SHA and evidence package SHA-256 hash passes deterministic verification.',
        principle: 'Observation → Diagnosis → Governance Gate → Authorized Action',
        evidence: [
          '47 deterministic governance tests',
          '158 backend test suites',
          'The governance path blocks the tested remediation workflow unless the required authorization conditions are satisfied'
        ]
      },
      {
        id: 'reliability-grounding-validator',
        title: 'Empirical Observation Grounding Validator',
        decision: 'EVIDENCE GROUNDING CHECK BEFORE ROOT-CAUSE DIAGNOSIS',
        language: 'python',
        sourcePath: 'backend/app/diagnosis/grounding_validator.py',
        lineRange: '31-52',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadilkhurshid/ai-application-reliability',
        code: `def validate_diagnostic_grounding(
    diagnosis: AIDiagnosisPayload,
    recorded_evidence: EvidencePackage
) -> GroundingValidationResult:
    """
    Asserts that every line number, symbol, and stack frame cited in the model's
    root-cause diagnosis exists verbatim in the collected Playwright runtime logs.
    """
    unsupported_claims = []
    log_text = recorded_evidence.combined_console_and_network_text

    for claim in diagnosis.cited_evidence_spans:
        if claim.raw_text not in log_text:
            unsupported_claims.append(claim.raw_text)

    is_grounded = len(unsupported_claims) == 0
    return GroundingValidationResult(
        is_grounded=is_grounded,
        unsupported_claims=unsupported_claims,
        grounding_ratio=1.0 - (len(unsupported_claims) / max(1, len(diagnosis.cited_evidence_spans)))
    )`,
        explanation: 'Autonomous diagnosticians hallucinate stack traces and plausible-looking bugs when confronted with confusing failure logs. The Grounding Validator forces every cited token and error line to be cross-matched against actual Playwright execution transcripts before the diagnosis can be reviewed.',
        evidence: [
          'Playwright DOM & trace capture',
          'Zero-hallucination stack trace auditing',
          'Empirical log verification'
        ]
      }
    ],
    ragRole: 'Reliability Engineer & Author (Personal Engineering Build)',
    ragPortfolioRefs: {
      timeline: ['exp-ai-reliability-harness'],
      journal: ['spread-12-chapter-09-reliability'],
      system: '/projects/ai-reliability'
    },
    ragEvidence: [
      'Dual-agent diagnostic harness pairing Playwright browser exploration with local Ollama visual diagnostics.',
      'Fisher information covariance matrix filtering out ungrounded model suggestions before DOM execution.',
      '158 backend test suites + 47 governance & E2E tests verifying tool boundaries and failure containment.'
    ]
  },

  // -------------------------------------------------------------
  // 7. Loom AI — B2B Textile Marketplace Platform
  // -------------------------------------------------------------
  {
    id: 'loom-ai',
    slug: 'loom-ai',
    title: 'Loom AI — B2B Textile Marketplace Platform',
    tagline: 'Full-stack B2B marketplace platform with Clean Architecture, Next.js 16, and LangGraph procurement workflows.',
    summary:
      'A full-stack B2B textile sourcing marketplace platform engineered with Next.js 16 (React 19), Express/TypeScript Clean Architecture, MongoDB compound text indexes, and LangGraph procurement workflows with Human-in-the-Loop approval queues.',
    type: 'Full-Stack • AI Marketplaces',
    demo: null,
    publicRepoOverride: 'https://github.com/aadil-lang/loom-ai',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Node.js / Express 5', 'MongoDB / Mongoose', 'LangGraph', 'Playwright E2E'],
    problem:
      'B2B textile sourcing requires multi-attribute filtering (fabric composition, weights, certifications, width, minimum order quantities) across specialized supplier catalogs where standard keyword queries return imprecise matches.',
    solution:
      'I built this system as an independent hackathon project: implemented a Clean Architecture backend with strict downward dependency flow (Routes → Controllers → Services → Repositories → Models), compound MongoDB text indexing, Next.js 16 / React 19 Buyer and Supplier portals, and LangGraph procurement workflows integrating structured requirement extraction, in-memory vector search, and Human-in-the-Loop approval queues for AI-suggested actions.',
    keyFeatures: [
      'Clean Architecture backend enforcing downward dependency flow, DTO validation, and role-based JWT authentication',
      'Compound MongoDB text indexes covering fabricType, certifications, composition, and searchKeywords',
      'Dual Buyer & Supplier portal interface built with Next.js 16, React 19, Redux Toolkit, and TanStack Query',
      'LangGraph multi-step procurement workflow using structured output schema extraction and in-memory vector search',
      'Human-in-the-Loop (HITL) approval queue holding automated AI actions for explicit supplier/buyer authorization',
      'Playwright end-to-end browser test suite verifying supplier registration, cart checkout, error handling, and assistant flows'
    ],
    architecturePattern: 'textile',
    systemLayers: [
      { layer: 'Interface', components: 'Next.js 16 / React 19 / Redux Toolkit', details: 'Dual Buyer & Supplier portals with multi-attribute filtering, cart checkout, and supplier inventory management' },
      { layer: 'Application / Backend', components: 'Express 5 / TypeScript Clean Architecture', details: 'Layered controller-service-repository pattern, DTO validation, rate limiting, and role-based JWT auth' },
      { layer: 'AI / Orchestration', components: 'LangGraph Supervisor & Procurement Workflows', details: 'Intent routing, structured requirement extraction, Groq/HuggingFace providers, and HITL approval queue' },
      { layer: 'Tools / Data', components: 'MongoDB Mongoose & In-Memory Vector Store', details: 'Compound text search indexes over fabric specifications and cosine similarity retrieval' },
      { layer: 'Verification / Operations', components: 'Playwright E2E Suite & API Runner', details: 'Automated browser tests for critical checkout/registration flows and automated API regression runner' }
    ],
    context:
      'B2B textile sourcing requires multi-attribute filtering across complex catalog specifications (fabric composition, GSM, certifications, width, and MOQs) where keyword queries return imprecise matches.',
    criticalDecision:
      'Enforcing Clean Architecture downward dependency isolation and placing AI-suggested supplier procurement actions behind a Human-in-the-Loop (HITL) approval queue where high-stakes actions require human authorization.',
    whatBroke: [
      {
        failure: 'Imprecise Keyword Matching in Textile Catalogs',
        cause: 'Simple search strings matched partial words and returned wrong fabric blends and specifications.',
        detection: 'Supplier catalog regression tests caught incorrect GSM and composition query results.',
        response: 'Engineered compound MongoDB text indexes and an in-memory cosine vector store for attribute retrieval.'
      },
      {
        failure: 'Unconstrained Agent Procurement Actions',
        cause: 'Assistant attempted to dispatch order requests directly without explicit buyer confirmation.',
        detection: 'Integration tests flagged unapproved cart and order state mutations.',
        response: 'Introduced a mandatory Human-in-the-Loop (HITL) approval queue holding orders for explicit user confirmation.'
      }
    ],
    whatBecameDeterministic:
      'MongoDB compound text indexes for fabric attribute queries, Clean Architecture DTO validation with strict JWT RBAC, and an explicit Human-in-the-Loop approval gate for orders.',
    evidence: [
      'Playwright end-to-end browser test suite verifying supplier registration, cart checkout, error handling, and assistant flows',
      'Automated API regression runner testing Clean Architecture endpoints across all resource controllers',
      'In-memory cosine vector search paired with compound text index retrieval over fabric specifications'
    ],
    tradeoffs: [
      'Human-in-the-Loop queue adds a confirmation step for buyers and suppliers, but prevents unauthorized order dispatch.',
      'Clean Architecture requires explicit DTO and repository boilerplate, but isolates domain logic completely from external AI providers.'
    ],
    breakthrough:
      'Decoupling semantic requirement extraction from order execution: LLMs extract structured textile parameters, while transactional checkout and catalog queries remain deterministically governed.',
    delta:
      'Shift from imprecise manual supplier catalog filtering to structured schema extraction with verified HITL authorization.',
    codeEvidence: [
      {
        id: 'loom-ai-procurement-workflow',
        title: 'AgentGraph Procurement Workflow with Dynamic Clarification Edge',
        decision: 'DYNAMIC STATE GRAPH CLARIFICATION BOUNDARY',
        language: 'typescript',
        sourcePath: 'backend/src/ai/workflows/BuyerProcurementWorkflow.ts',
        lineRange: '33-58',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/loom-ai',
        code: `public build() {
  const builder = new AgentGraphBuilder<ProcurementState>(procurementStateChannels);

  builder
    .addNode('analyze_requirements', this.analyzeRequirementsNode.bind(this))
    .addNode('knowledge_retrieval', this.knowledgeRetrievalNode.bind(this))
    .addNode('search_marketplace', this.searchMarketplaceNode.bind(this))
    .addNode('generate_recommendations', this.generateRecommendationsNode.bind(this))
    .addNode('clarify_requirements', this.clarifyRequirementsNode.bind(this));

  builder.setEntryPoint('analyze_requirements');

  // Conditional Edge: Guard against underspecified procurement requests
  builder.addConditionalEdges(
    'analyze_requirements',
    (state) => {
      if (state.requirements?.category || state.requirements?.fabricType) {
        return 'knowledge_retrieval';
      }
      return 'clarify_requirements';
    }
  );

  builder.addEdge('knowledge_retrieval', 'search_marketplace');
  builder.addEdge('search_marketplace', 'generate_recommendations');
  return builder.compile();
}`,
        explanation: 'In B2B textile procurement, searching the product catalog with underspecified buyer requirements yields irrelevant supplier matches and wasted database compute. The workflow enforces a conditional branch: if critical parameters (category or fabric type) are missing, execution diverts to clarification before querying the database.',
        evidence: [
          'Clean Architecture domain separation',
          'Conditional clarification edge',
          'Compound MongoDB search'
        ]
      }
    ],
    ragRole: 'System Architect & Full-Stack Author (Hackathon Project)',
    ragPortfolioRefs: {
      timeline: ['exp-loom-ai-marketplace'],
      journal: ['spread-11-parallel-builds'],
      system: '/projects/loom-ai'
    },
    ragEvidence: [
      'Clean Architecture backend with strict inward dependency rule isolating business logic from drivers.',
      'Compound MongoDB text indexes across fiber composition, GSM weights, certifications, and MOQs.',
      'LangGraph procurement workflows with Human-in-the-Loop (HITL) approval queues preventing unauthorized checkout actions.'
    ]
  },

  // -------------------------------------------------------------
  // 8. Atlas AI — Financial Copilot & SEC Filing RAG
  // -------------------------------------------------------------
  {
    id: 'atlas-ai',
    slug: 'atlas-ai',
    title: 'Atlas AI — Financial Copilot & SEC Filing RAG',
    tagline: 'Telegram-native conversational financial copilot with LangGraph orchestration, SEC EDGAR RAG, and proactive alerts.',
    summary:
      'A conversational financial copilot built for Telegram featuring LangGraph orchestration, SEC EDGAR and Finnhub market data integration, Google Gemini Embeddings with MongoDB Atlas Vector Search, and a proactive background alert worker validated by 178 automated tests across full SEC RAG matrix (59 core tests in initial MVP).',
    type: 'Agentic Systems • Financial RAG',
    demo: null,
    publicRepoOverride: 'https://github.com/aadil-lang/Atlas-AI',
    technologies: ['LangGraph', 'Python 3.12', 'FastAPI', 'Gemini Embeddings', 'MongoDB Atlas Vector Search', 'SEC EDGAR API', 'Pytest (178 Tests)'],
    problem:
      'Retail investors and analysts lack direct conversational access to primary SEC regulatory filings (10-K, 10-Q, 8-K) and market intelligence, frequently having to manually parse multi-hundred-page disclosures or rely on delayed summaries.',
    solution:
      'I built this system as an independent hackathon project: engineered a Telegram-native conversational copilot powered by a LangGraph state machine, MongoDB Atlas Vector Search, Gemini embeddings, and direct SEC EDGAR / Finnhub API integrations with proactive background alert workers and 178 automated tests (59 in core MVP).',
    keyFeatures: [
      '178 automated tests passing across graph routing, SEC parser, market data, and alert worker modules in backend/tests/ (59 core tests in initial MVP)',
      'Stateful LangGraph orchestration coordinating context loading, intent routing, specialized research, synthesis, and memory extraction',
      'Semantic RAG over primary SEC EDGAR regulatory filings using Gemini Embeddings and MongoDB Atlas Vector Search',
      'Proactive alert worker (AlertWorker) running in FastAPI lifespan to poll watchlist volatility, new SEC filings, and news',
      'Multi-modal Telegram processing supporting text commands, voice note transcription via Whisper, and chart photo analysis via Gemini Vision',
      'Durable conversational memory extractor storing user investment preferences and watchlists across sessions'
    ],
    architecturePattern: 'overview',
    systemLayers: [
      { layer: 'Interface', components: 'Telegram Bot (python-telegram-bot)', details: 'Webhook interface handling text slash commands, Whisper voice transcription, and Gemini Vision chart analysis' },
      { layer: 'Application / Backend', components: 'FastAPI / Pydantic v2 / Async Motor', details: 'Async REST endpoints, lifespan management, structured logging, and MongoDB persistence' },
      { layer: 'AI / Orchestration', components: 'LangGraph State Machine', details: 'StateGraph routing between context loading, research nodes, synthesis, and durable memory extraction' },
      { layer: 'Tools / Data', components: 'SEC EDGAR & Finnhub APIs', details: 'Primary SEC regulatory filing retrieval (10-K, 10-Q, 8-K), real-time quotes, and MongoDB Atlas Vector Search' },
      { layer: 'Verification / Operations', components: 'Pytest Suite (178 Tests) & AlertWorker', details: '178 passing automated tests and background worker continuously monitoring watchlists for price volatility' }
    ],
    context:
      'Retail investors lack direct conversational access to primary SEC regulatory disclosures (10-K, 10-Q, 8-K) and market intelligence, having to manually parse multi-hundred-page disclosures or rely on delayed secondary summaries.',
    criticalDecision:
      'Implementing stateful LangGraph orchestration with dedicated intent routing nodes, paired with primary SEC EDGAR API ingestion, MongoDB Atlas vector embeddings, and an asynchronous background alert worker running in FastAPI lifespan.',
    whatBroke: [
      {
        failure: 'High-Volume Notification Flooding',
        cause: 'Continuous price volatility polling dispatched duplicate Telegram alerts for the same price movement.',
        detection: 'Alert worker unit tests flagged repeated notifications in test runs.',
        response: 'Implemented alert history deduplication with in-memory and database timestamp tracking.'
      },
      {
        failure: 'Context Window Overflow on SEC 10-K Tables',
        cause: 'Injecting entire multi-hundred-page regulatory filings overwhelmed model context windows.',
        detection: 'RAG retrieval evaluations showed dropped financial statement rows.',
        response: 'Engineered semantic section-aware parser chunking Item 1A, Item 7, and Item 8 disclosures with Gemini embeddings.'
      }
    ],
    whatBecameDeterministic:
      'Direct SEC EDGAR primary filing retrieval with CIK resolution, background AlertWorker polling with history deduplication, and 178 automated Pytest test assertions covering graph state transitions, parsers, and quote fetchers.',
    evidence: [
      '178 automated tests passing across routing, SEC parser, market data, and alert worker modules in backend/tests/',
      'Proactive background AlertWorker continuously monitoring watchlists in FastAPI lifespan',
      'Direct primary SEC EDGAR regulatory filing retrieval with zero intermediary hallucination'
    ],
    tradeoffs: [
      'Semantic chunking of primary SEC EDGAR filings requires higher upfront embedding overhead, but guarantees ground-truth citation from regulatory filings.',
      'Alert worker polling consumes background CPU cycles, but provides timely alerts on watchlist volatility.'
    ],
    breakthrough:
      'Grounding conversational financial reasoning in primary SEC EDGAR regulatory filings rather than web search summaries, verified by 178 unit and integration tests.',
    delta:
      'Shift from lagging secondary financial news summaries to verified primary regulatory filing RAG with proactive threshold alerts.',
    codeEvidence: [
      {
        id: 'atlas-ai-stategraph',
        title: 'LangGraph StateGraph Workflow & Conditional Intent Routing',
        decision: 'CYCLIC AGENTIC WORKFLOW WITH DETERMINISTIC INTENT DISPATCH',
        language: 'python',
        sourcePath: 'backend/app/agents/graph.py',
        lineRange: '118-142',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/Atlas-AI',
        code: `def _build_graph(self):
    builder = StateGraph(AgentState)

    # 1. Register Functional Nodes
    builder.add_node("load_context", self._load_context_node)
    builder.add_node("route_intent", self._route_intent_node)
    builder.add_node("company_research_node", self._company_research_node)
    builder.add_node("market_research_node", self._market_research_node)
    builder.add_node("document_research_node", self._document_research_node)
    builder.add_node("synthesis_node", self._synthesis_node)
    builder.add_node("extract_memory_node", self._extract_memory_node)
    builder.add_node("finalize_node", self._finalize_node)

    # 2. Wire Control Flow & Deterministic Routing
    builder.add_edge(START, "load_context")
    builder.add_edge("load_context", "route_intent")
    builder.add_conditional_edges(
        "route_intent",
        self._dispatch_intent,
        {
            IntentType.COMPANY_RESEARCH: "company_research_node",
            IntentType.MARKET_DATA: "market_research_node",
            IntentType.DOCUMENT_RESEARCH: "document_research_node",
        }
    )
    return builder.compile()`,
        explanation: 'Rather than relying on an autonomous agent with open-ended tool hallucination, Atlas AI uses a compiled LangGraph StateGraph. User inquiries are deterministically classified and routed to dedicated retrieval nodes (e.g. SEC EDGAR filing parser or Atlas Vector Search) before entering response synthesis.',
        evidence: [
          '178 pytests in complete SEC RAG suite',
          'StateGraph compiled pipeline',
          'Direct SEC EDGAR regulatory chunking'
        ]
      },
      {
        id: 'atlas-ai-alert-worker',
        title: 'Proactive Alert Worker & Market Trigger Poller',
        decision: 'BACKGROUND ASYNCHRONOUS VOLATILITY POLLER',
        language: 'python',
        sourcePath: 'backend/app/jobs/alerts.py',
        lineRange: '45-72',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/Atlas-AI',
        code: `class AlertWorker:
    """
    Background worker that periodically polls financial, SEC, and news providers
    to evaluate user alert rules without user initiation.
    """
    async def evaluate_alert(self, alert: Alert, user_id: str) -> Optional[AlertTriggerResult]:
        latest_data = await self.financial_provider.get_quote(alert.symbol)
        if not latest_data:
            return None

        # Deterministic boundary condition: threshold breach
        breached = False
        if alert.condition == "ABOVE" and latest_data.price >= alert.target_price:
            breached = True
        elif alert.condition == "BELOW" and latest_data.price <= alert.target_price:
            breached = True

        if breached:
            return AlertTriggerResult(alert=alert, current_price=latest_data.price, triggered_at=datetime.utcnow())
        return None`,
        explanation: 'Conversational copilots are typically purely reactive to user prompts. Atlas AI incorporates an asynchronous lifespan AlertWorker that continuously evaluates active price and SEC 8-K filings thresholds, dispatching real-time notifications to Telegram when bounds are breached.',
        evidence: [
          'Real-time Telegram notifications',
          'Deterministic boundary evaluation',
          'SEC 8-K volatility triggers'
        ]
      }
    ],
    ragRole: 'Lead Architect & Sole Author (Hackathon Project)',
    ragPortfolioRefs: {
      timeline: ['exp-atlas-ai-copilot'],
      journal: ['spread-11-parallel-builds'],
      system: '/projects/atlas-ai'
    },
    ragEvidence: [
      'StateGraph agentic workflow with semantic section chunking for Form 10-K, 10-Q, and 8-K filings.',
      'Direct SEC EDGAR integration eliminating hallucinated secondary summaries.',
      'Proactive background alert worker monitoring price and volatility thresholds.',
      '178 automated pytests in complete project repository (59 tests in initial MVP phase).'
    ]
  },

  // -------------------------------------------------------------
  // 9. Ask Aadil Grounded Conversational RAG
  // -------------------------------------------------------------
  {
    id: 'ask-aadil',
    slug: 'ask-aadil',
    canonicalId: 'proj-ask-aadil',
    title: 'Ask Aadil — Stateful Retrieval, Source Authority & Controlled Actions',
    tagline: 'Grounded conversational agent preserving multi-source boundaries, temporal epistemic states, and deterministic human-in-the-loop action execution.',
    summary:
      'A production grounded conversational agent providing conversational access across portfolio layers (Timeline, Journal, Systems, Resume, GitHub, LinkedIn, Profile) without merging them into an undifferentiated knowledge blob. Engineered with stateful entity tracking, epistemic temporal reasoning, editable communication drafts, and strict human authorization gates verified by 327 automated assertions across 10 evaluation suites (including 172 core agent hardening & action governance checks).',
    type: 'Grounded Conversational Agent • Stateful Hybrid RAG',
    demo: '/#ask-aadil',
    publicRepoOverride: 'https://github.com/aadil-lang/portfolio',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Hybrid Retrieval (Keyword + Semantic)',
      'Deterministic State Machine',
      'Playwright & Vitest (327 Assertions)',
      'Human-in-the-Loop Actions'
    ],
    problem:
      'A normal portfolio exposes information through separate static pages. Ask Aadil needed to provide conversational access across those layers while preserving the critical distinctions between chronology (Timeline), reasoning (Journal), technical evidence (Systems), formal professional records (Resume), code evidence (GitHub), and professional context (LinkedIn). The challenge was not building a generic chatbot, but engineering an agent that knows what it knows, knows what it does not know, knows which source is authoritative, understands whether information is current, and knows what it is actually permitted to execute.',
    solution:
      'I designed and built this system as an integrated personal engineering build: engineered a deterministic state machine, hybrid source-aware retriever, and human-in-the-loop execution pipeline. Sources are strictly kept separate with explicit authority hierarchies. The agent implements temporal epistemic boundaries (July 2026 historical records are never conflated with current status; absence of a corporate employer is never converted into an unemployment claim), a decoupled 3-state LinkedIn adapter boundary, prompt injection defense over retrieved data, and bitwise-exact draft execution without hidden LLM regeneration, validated by 327 automated assertions across 10 evaluation suites (including 172 core agent hardening and action governance checks).',
    keyFeatures: [
      '327 automated test verifications passing across 10 suites (including 172 core hardening, entity preservation, temporal reasoning, and browser interaction checks)',
      'Source-aware retrieval maintaining discrete identity and hierarchy across Timeline (When), Journal (Why), Systems (What), Resume (Record), GitHub (Code), LinkedIn (Context), and Structured Profile (App Data)',
      'Epistemic temporal reasoning distinguishing current verified facts, latest documented activity, historical records, and unknown information',
      'Decoupled 3-state LinkedIn adapter boundary: api_unavailable != no job, adapter_ready with null position, and adapter_ready with live position',
      'Bitwise draft integrity: zero LLM rewriting between visitor review and mail client execution (executionInput === editedDraft)',
      'Human-in-the-loop action gate with failure containment (emailClientOpened = false, emailSentStatus = "unknown")',
      'Strict visitor session isolation and cancelled contact state sanitization'
    ],
    architecturePattern: 'ask-aadil',
    systemLayers: [
      { layer: 'Interface & Session', components: 'Next.js 16 / React 19 / Portal Drawer', details: 'Interactive streaming chat interface with citation badge pills, natural-language draft editor, and ephemeral session isolation' },
      { layer: 'Intent & Entity Router', components: 'Deterministic Router (intentRouter.ts)', details: 'Multi-turn entity tracking, pronoun resolution (it, that one), security guardrails, and cancellation handlers' },
      { layer: 'Source-Aware Retrieval', components: 'Hybrid Retriever (hybridRetriever.ts)', details: 'Decoupled multi-source retrieval maintaining source boundaries without merging into an anonymous blob' },
      { layer: 'Grounded Answer Synthesis', components: 'Grounded Synthesis Engine (askAadilAgent.ts)', details: 'Non-speculative synthesis citing granular provenance badges ([Timeline — Chronology], [Journal — Latest activity], etc.)' },
      { layer: 'Controlled Action & Gate', components: 'Human-in-the-Loop Action Boundary', details: 'Contextual draft generation, conversational editing, and explicit user confirmation gate prior to external execution' }
    ],
    context:
      'Traditional RAG pipelines collapse disparate documents into a single flat vector database, resulting in source hallucinations, temporal conflation, and unverified actions. Ask Aadil was engineered to demonstrate disciplined AI Systems Engineering: preserving explicit epistemic boundaries and deterministic action constraints.',
    criticalDecision:
      'Refusing to merge Timeline, Journal, Systems, Resume, and LinkedIn into a single undifferentiated embedding collection, and enforcing that high-stakes actions (sending communication) strictly require explicit human confirmation with zero LLM regeneration between editing and execution.',
    whatBroke: [
      {
        failure: 'Temporal Conflation of Past Tenures',
        cause: 'Standard similarity search retrieved July 2026 Wayground conclusion chunks and presented them as current active corporate employment.',
        detection: 'Temporal reasoning test queries flagged July 2026 evidence presented as September 2026 present facts.',
        response: 'Implemented temporal epistemic classifier enforcing that past tenures are labeled historical and absence of a corporate employer is never converted to an unemployment claim.'
      },
      {
        failure: 'Subtle LLM Draft Drift Between Turns',
        cause: 'Asking an interleaved technical question while reviewing an email draft caused LLMs to re-summarize and alter previously edited draft text.',
        detection: 'Draft integrity test asserting executionInput === editedDraft failed on whitespace and phrasing differences.',
        response: 'Locked editedDraft onto conversation state immutably; intermediate informational queries fall through to retrieval while preserving exact draft subject, body, and recipient.'
      },
      {
        failure: 'Conflating API Outage with Empty Profile',
        cause: 'When live LinkedIn API integration was inactive, naive logic reported that LinkedIn had no current position or profile.',
        detection: 'LinkedIn state distinction QA caught api_unavailable interpreted as an empty record.',
        response: 'Decoupled adapter state into 3 independent branches: api_unavailable (offline API != empty profile), adapter_ready with null position, and adapter_ready with active position.'
      }
    ],
    whatBecameDeterministic:
      'Intent classification, entity resolution, draft preservation across intermediate turns, human confirmation gates before external invocation, and 327 automated test assertions across 10 evaluation suites covering prompt injection resistance, session isolation, and provenance citations.',
    evidence: [
      '327 automated assertions passing across 10 evaluation suites (including 172 core hardening and Playwright browser E2E checks)',
      'Zero draft rewriting: verified executionInput === editedDraft identity across interleaved conversational turns',
      'Prompt injection defense verified across 5 independent sources (Journal, Systems, GitHub, LinkedIn, Resume)'
    ],
    tradeoffs: [
      'Maintaining distinct source boundaries requires explicit routing logic and schema schemas rather than a single lazy vector database, but prevents cross-source contamination and hallucinations.',
      'Mandatory Human-in-the-Loop confirmation requires user affirmation before opening the mail client, but completely eliminates unauthorized external actions.'
    ],
    breakthrough:
      'Demonstrating that conversational agents can remain trustworthy by treating retrieved content strictly as passive evidence rather than executable instructions, while respecting source authority and temporal validity.',
    delta:
      'Transition from static multi-page portfolio exploration to an authoritative, source-aware conversational agent with deterministic human authorization boundaries.',
    codeEvidence: [
      {
        id: 'ask-aadil-action-gate',
        title: 'Human-in-the-Loop Action Confirmation Boundary',
        decision: 'SEPARATION OF DRAFT GENERATION FROM EXTERNAL EXECUTION',
        language: 'typescript',
        sourcePath: 'lib/rag/askAadilAgent.ts',
        lineRange: '298-326',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/portfolio',
        code: `// Human-in-the-Loop Gate: Draft was generated and awaiting explicit confirmation
if (state.confirmationState === 'awaiting_confirmation' && state.editedDraft) {
  const isExplicitConfirm =
    lowerQ === 'send it' ||
    lowerQ === 'yes, send' ||
    lowerQ === 'confirm' ||
    lowerQ === 'send the email'

  if (isExplicitConfirm) {
    state.confirmationState = 'confirmed'
    const executionInput: AgentDraft = {
      recipient: state.editedDraft.recipient || structuredProfile.email,
      subject: state.editedDraft.subject,
      body: state.editedDraft.body,
      isEdited: state.editedDraft.isEdited
    }
    state.executionResult = {
      status: 'email_client_opened',
      emailClientOpened: true,
      emailSentStatus: 'unknown',
      executionInput,
      timestamp: new Date().toISOString()
    }
  }
}`,
        explanation: 'An LLM request is not equivalent to authorization to perform an external action. The agent drafts communication and enables live user edits, but never triggers the external mailto client without explicit affirmative confirmation. Furthermore, it records emailSentStatus: "unknown" to prevent claiming delivery occurred when only a client was opened.',
        principle: 'LLM generates proposal; human confirms; client invokes.',
        evidence: [
          '25 multi-turn agentic tests passing',
          '132 hardening epistemic assertions',
          'Deterministic mailto state machine'
        ]
      }
    ],
    ragRole: 'Lead AI Systems Engineer & Author (Personal Engineering Build)',
    ragPortfolioRefs: {
      timeline: ['2026-portfolio-ask-aadil', 'future-still-building'],
      journal: ['spread-14-portfolio-ask-aadil', 'spread-16-chapter-10-open'],
      system: '/projects/ask-aadil'
    },
    ragEvidence: [
      '327 automated test assertions across 10 evaluation suites (including 172 core hardening checks passing at 100% across multi-turn entity preservation, temporal reasoning, and browser interactions).',
      'Bitwise draft integrity: zero LLM rewriting between visitor review and mail client execution (executionInput === editedDraft).',
      'Strict epistemic boundaries: July 2026 records are historical; absence of corporate employer is never converted to unemployment claim.',
      'Decoupled 3-state LinkedIn adapter boundary separating api_unavailable from empty profiles.'
    ]
  },

  // -------------------------------------------------------------
  // 10. Solace AI — Mindful Wellness Companion
  // -------------------------------------------------------------
  {
    id: 'solace-ai',
    slug: 'solace-ai',
    canonicalId: 'proj-solace-ai',
    title: 'Solace AI — Mindful Wellness Companion',
    subtitle: 'Safety-first mobile AI wellness companion with LangGraph SSE streaming, consent-based memory, and zero-retention voice privacy',
    tagline: 'React Native (Expo 58) + FastAPI/LangGraph wellness sanctuary with deterministic crisis screening, consent-driven memory, and ambiguous SSE containment.',
    summary:
      'Built for the Solace Hackathon (November 2026), Solace AI is a cross-platform Expo 58 / FastAPI emotional wellness companion featuring a synchronous deterministic crisis safety interceptor, feature-flagged LangGraph SSE streaming with safe native fallback, consent-gated emotional memory, ephemeral voice journal transcription with immediate memory purge, bilingual English/Urdu Nastaliq contemplative poetry, and Android Keystore-safe offline guest persistence.',
    type: 'Mobile AI Companion • Safety & Consent Architecture',
    demo: 'https://aadil-lang.github.io/solace-ai-gallery/',
    publicRepoOverride: 'https://github.com/aadil-lang/solace-ai',
    videoDemo: {
      source: '/videos/solace_demo.mp4',
      sourceType: 'hosted',
      title: 'Solace AI — Native Mobile Demonstration',
      eyebrow: 'MOBILE SYSTEM WALKTHROUGH // VERIFIED RUNTIME',
      description:
        'Screen recording of the production React Native / Expo mobile application connected live to the FastAPI backend and Supabase RLS database. Verification history encompasses physical Android device testing, Android emulator execution, and automated test batteries (52 backend pytests, 50 mobile Jest checks).',
      poster: '/videos/solace_demo_poster.png',
      duration: '2:58 • 4K Screen Capture',
      caption:
        'Demonstrates synchronous <2ms pre-LLM crisis screening, ephemeral zero-retention audio buffer, and Server-Sent Events (SSE) streaming.'
    },
    technologies: [
      'React Native / Expo 58',
      'TypeScript',
      'Python 3.12',
      'FastAPI',
      'LangGraph',
      'Google Gemini API',
      'Supabase Auth & PostgreSQL (RLS)',
      'SSE Streaming',
      'Zustand / TanStack Query'
    ],
    problem:
      'Mental wellness AI applications carry severe risks when built as naive chat wrappers: unguarded LLM latency delays crisis intervention, background memory extraction violates intimate user trust, storing raw voice journal audio creates privacy liability, and naive HTTP client retries on transient gateway failures (502/503/504) duplicate user messages in conversation history.',
    solution:
      'I designed and built Solace AI independently for the Solace Hackathon as an end-to-end Expo 58 mobile client and FastAPI modular monolith backed by Supabase Row Level Security (RLS). A deterministic crisis safety gate executes synchronously before any graph node or Gemini inference; LangGraph streams tokens via `astream_events` with an automated native fallback; conversational memory requires explicit per-insight user approval with strict isolation from journals and poetry; voice audio is purged in a `finally:` block immediately after transcription; and mobile SSE chat enforces a single-POST policy classifying 502/503/504 as ambiguous delivery.',
    keyFeatures: [
      '102 verified unit & mobile checks passing across backend & mobile suites (52/52 backend pytests across 8 modules + 50/50 mobile checks across 7 suites + 0 TypeScript errors; 143 total tests in complete repository matrix)',
      'Deterministic crisis safety interceptor screening English, Roman Urdu, and Urdu script while rejecting figurative idioms before any LLM call (Tele-MANAS 14416, 112, 988)',
      'Feature-flagged LangGraph StateGraph orchestration (ENABLE_LANGGRAPH_ROUTING) emitting real-time SSE tokens via adispatch_custom_event with pre-token native fallback',
      'Consent-based emotional memory with SSE memory_suggestion banners and strict domain isolation (ADR-004) separating voice journals and poetry from chat context',
      'Zero-retention Voice Journal pipeline enforcing 15 MB bounds and deterministic buffer purge (`del audio_bytes` in `finally:`) plus mandatory draft review before save',
      'Single-POST SSE delivery guard classifying 502/503/504 as ambiguous delivery to prevent duplicate turns, paired with a 55s cold-start retry budget for idempotent reads',
      'Multilingual "Words of Solace" poetry (English, Urdu Nastaliq RTL, Bilingual), "Just Let It Out" zero-advice Rant Mode, and offline-first 1500-byte SecureStore chunking'
    ],
    architecturePattern: 'solace',
    systemLayers: [
      { layer: 'Mobile Client', components: 'Expo SDK 58 / React Native 0.88 / TypeScript', details: 'Expo Router protected guards, Zustand stores, TanStack Query, procedural Reanimated Emotional Landscape, and Android EAS APK build' },
      { layer: 'Resilient Transport', components: 'ApiService (mobile/services/api.ts)', details: '55s bounded exponential backoff with jitter for idempotent reads; single-POST SSE chat classifying 502/503/504 as ambiguous without blind retry' },
      { layer: 'Backend Gateway & Auth', components: 'FastAPI (Python 3.12) / Supabase JWT', details: 'JWT claim-derived user identity verification, centralized exception handlers, and 6 Supabase PostgreSQL RLS migrations' },
      { layer: 'Safety & Orchestration', components: 'LangGraph StateGraph + Deterministic Guard', details: 'Synchronous safety_node screening crisis patterns prior to context retrieval or Gemini streaming, with pre-token native fallback' },
      { layer: 'Privacy & Wellness Domains', components: 'Voice, Poetry, Check-Ins & Emotional Memory', details: 'Ephemeral in-memory audio transcription, Rant Mode solidarity, Urdu Nastaliq poetry, and consent-only memory persistence' },
      { layer: 'Verification Suite', components: 'Pytest (52) + Node Mobile Suites (50) + TSC', details: 'Live RLS two-user cross-isolation checks, cold-start & SSE resilience tests, Hermes AOT bundling (1,725 modules), and Pixel 7 emulator QA' }
    ],
    context:
      'Built during the Solace Hackathon (November 2026) to explore how AI systems engineering principles—deterministic boundaries before LLM inference, explicit consent over hidden extraction, and failure containment over blind retries—apply to sensitive human-centered mobile products.',
    criticalDecision:
      'Placing deterministic crisis screening (`is_crisis_input`) synchronously ahead of all LangGraph and LLM calls rather than relying on model judgment, keeping LangGraph behind a rollback-safe feature flag with zero full-response buffering, and enforcing a single-POST SSE policy that treats 502/503/504 responses as ambiguous delivery instead of blindly retrying.',
    whatBroke: [
      {
        failure: 'Duplicate Conversational Turns on Gateway 502/503/504',
        cause: 'If an edge proxy dropped or timed out after the FastAPI route persisted the user message (`chat.py`), automatic client retries created duplicate user turns in conversation history.',
        detection: 'Resilience audit and `api_cold_start.test.js` analysis flagged retry amplification on non-idempotent SSE POST requests.',
        response: 'Enforced strict single-POST execution in `streamChat`, explicitly classifying socket drops and HTTP 502/503/504 as ambiguous delivery without blind retry.'
      },
      {
        failure: 'Android Keystore Key-Character & 2048-Byte Storage Limits',
        cause: 'Storage keys prefixed with `@` or containing special characters, and long reflection/journal notes exceeding 2048 bytes, failed under Android SecureStore.',
        detection: 'Native Android storage testing and `storage_adapter.test.js` caught Keystore character rejections and size truncation.',
        response: 'Built `sanitizeKey()` mapping non-alphanumeric characters to `_` on native platforms and 1500-byte note chunking in `useCheckInStore`.'
      },
      {
        failure: 'Figurative Idioms Triggering Crisis False Positives & LangGraph TTFT Tax',
        cause: 'Naive crisis keyword checks risked flagging idioms like "dying of laughter", while empirical benchmarking showed LangGraph event dispatch added ~1.08s TTFT overhead over direct Gemini streaming (330.6ms vs 1412.9ms).',
        detection: '`compare_native_vs_graph.py` benchmark and `test_conversational_personality.py` idiom evaluations surfaced both behaviors.',
        response: 'Added `FALSE_POSITIVE_PATTERNS` filtering alongside multilingual `HIGH_RISK_PATTERNS`, and wrapped LangGraph in `ENABLE_LANGGRAPH_ROUTING` with instant native fallback.'
      }
    ],
    whatBecameDeterministic:
      'Synchronous pre-LLM crisis pattern screening and figurative idiom exclusion, Android SecureStore key sanitization and 1500-byte chunking, single-POST ambiguous SSE failure containment, ephemeral audio buffer deletion in `finally:`, domain table isolation across RLS policies, and 102 verified unit & mobile checks across backend and mobile suites.',
    evidence: [
      '52 / 52 backend unit and orchestration pytests passing across 8 suites (`test_langgraph_orchestration.py`, `test_emotional_landscape.py`, `test_poetry.py`, `test_journal.py`, `test_conversational_personality.py`, `test_rant_and_voice.py`, `test_profile_auth.py`, `test_health.py`)',
      '50 / 50 mobile verification checks passing across 7 suites (`auth_and_profile`, `phase3_companion`, `poetry`, `journal`, `emotional_landscape`, `storage_adapter`, `api_cold_start`) with `tsc --noEmit` reporting 0 errors',
      'Live Supabase Row Level Security (RLS) two-user isolation verification confirming zero cross-user overlap across 6 domain tables',
      'Android EAS preview APK built and verified on Pixel 7 Android 16 (API 36) emulator alongside Hermes AOT bundle export (1,725 modules)'
    ],
    tradeoffs: [
      'Deterministic crisis regex matching guarantees <2ms interception and 0% model refusal drift, but requires explicit pattern maintenance for new slang or idioms.',
      'Ephemereal audio zero-retention (`del audio_bytes` without cloud object storage) eliminates raw audio breach liability, trading away cross-device playback of past voice recordings.',
      'Treating 502/503/504 SSE failures as ambiguous without blind auto-retry avoids duplicate conversation turns, asking users to verify thread state before resending.'
    ],
    breakthrough:
      'Demonstrating that safety-critical and privacy-sensitive consumer mobile AI requires deterministic containment at every boundary: pre-LLM safety screening, explicit user consent for memory, ephemeral audio purging, and honest ambiguous-delivery semantics over SSE.',
    delta:
      'Extended deterministic AI systems engineering from developer tools and CAD backends into a full-stack mobile React Native + FastAPI/LangGraph consumer product with strict privacy and safety guarantees.',
    codeEvidence: [
      {
        id: 'solace-langgraph-safety-topology',
        title: 'Safety-First LangGraph StateGraph Topology',
        decision: 'DETERMINISTIC SAFETY NODE BEFORE CONTEXT OR LLM GENERATION',
        language: 'python',
        sourcePath: 'backend/app/orchestration/graph.py',
        lineRange: '27-59',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/solace-ai',
        code: `def build_orchestration_graph() -> Any:
    """
    Compiles the minimal, typed LangGraph orchestration pipeline for Solace AI.
    """
    builder = StateGraph(OrchestrationState)

    # Register nodes
    builder.add_node("safety", safety_node)
    builder.add_node("context", context_node)
    builder.add_node("companion", companion_node)
    builder.add_node("crisis_terminal", crisis_terminal_node)

    # Register deterministic workflow transitions
    builder.add_edge(START, "safety")
    builder.add_conditional_edges(
        "safety",
        route_after_safety,
        {
            "crisis_terminal": "crisis_terminal",
            "context": "context",
        },
    )
    builder.add_conditional_edges(
        "context",
        route_after_context,
        {
            "companion": "companion",
        },
    )
    builder.add_edge("companion", END)
    builder.add_edge("crisis_terminal", END)

    return builder.compile()`,
        explanation: 'Every chat turn enters the compiled LangGraph StateGraph at the deterministic `safety` node before any user memories are retrieved or any Gemini inference runs. Acute distress diverts straight to `crisis_terminal`, delivering localized emergency resources without model latency or hallucination risk.',
        principle: 'Screen safety deterministically before expanding context or invoking generative models.',
        evidence: [
          '14/14 LangGraph orchestration tests passing',
          'Sub-2ms crisis routing before LLM calls',
          'Zero-buffering SSE via astream_events(v2)'
        ]
      },
      {
        id: 'solace-crisis-screen-idioms',
        title: 'Synchronous Crisis Screening with Figurative Idiom Filtering',
        decision: 'AUTHORITATIVE REGEX + FALSE-POSITIVE IDIOM EXCLUSION',
        language: 'python',
        sourcePath: 'backend/app/services/memory_service.py',
        lineRange: '97-116',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/solace-ai',
        code: `@staticmethod
def is_crisis_input(text: str) -> bool:
    """
    Determines whether user input indicates acute crisis or self-harm intent.
    Excludes figurative speech and common non-crisis idioms.
    """
    if not text or len(text.strip()) == 0:
        return False

    # If it matches an explicit false-positive idiom, do not flag as crisis
    for fp in FALSE_POSITIVE_PATTERNS:
        if fp.search(text):
            return False

    # Check high-risk crisis patterns
    for pattern in HIGH_RISK_PATTERNS:
        if pattern.search(text):
            return True

    return False`,
        explanation: 'Mental health screening cannot depend on probabilistic LLM judgment or soft refusals. Solace evaluates incoming messages synchronously across English, Roman Urdu, and Urdu script high-risk patterns while filtering benign idioms (such as \'dying of laughter\') before routing.',
        principle: 'High-stakes safety decisions belong to fast, inspectable deterministic rules.',
        evidence: [
          'Localized IN (Tele-MANAS 14416, 112), US (988), GB (116 123) & Global routing',
          'Multilingual English, Roman Urdu & Urdu script coverage',
          'Verified false-positive idiom exclusion'
        ]
      },
      {
        id: 'solace-ambiguous-sse-guard',
        title: 'Single-POST SSE Guard & Ambiguous 502/503/504 Containment',
        decision: 'SUPPRESS BLIND RETRIES WHEN DELIVERY STATE IS AMBIGUOUS',
        language: 'typescript',
        sourcePath: 'mobile/services/api.ts',
        lineRange: '748-773',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/solace-ai',
        code: `try {
  // POST is executed exactly ONCE to prevent duplicate user messages or double turns on backend
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content, session_id: sessionId, mode }),
    });
  } catch (connErr: unknown) {
    // Ambiguous connection failure: socket drop, timeout, or TCP reset could happen
    // while or after the request reached the backend.
    callbacks.onError?.(
      "We couldn't confirm whether your message was sent. Check the conversation before trying again."
    );
    return;
  }

  // Treat HTTP 502, 503, and 504 as ambiguous by default: edge proxy or gateway errors
  // where the backend might have processed lines 49-57 before connection dropped.
  if (response.status === 502 || response.status === 503 || response.status === 504) {
    callbacks.onError?.(
      "We couldn't confirm whether your message was sent. Check the conversation before trying again."
    );
    return;
  }`,
        explanation: 'While idempotent reads safely use a 55-second exponential backoff retry budget for Render cold starts, retrying a chat stream POST after a gateway timeout risks duplicating persisted user turns. The mobile client executes the POST strictly once and exposes ambiguity honestly instead of guessing.',
        principle: 'Never disguise an ambiguous side-effect outcome as a safe retry.',
        evidence: [
          '11/11 API cold-start & SSE resilience checks passing',
          'Strict single-POST execution for non-idempotent streams',
          'Explicit 502/503/504 ambiguous state reporting'
        ]
      }
    ],
    ragRole: 'System Architect & Sole Author (Solace Hackathon)',
    ragPortfolioRefs: {
      timeline: ['solace-ai-2026'],
      journal: ['spread-15-solace-ai'],
      system: '/projects/solace-ai'
    },
    ragEvidence: [
      '52 / 52 backend pytests passing across 8 suites (LangGraph orchestration, crisis screening, poetry, voice journal, emotional landscape, profile auth).',
      '50 / 50 mobile automated checks passing across 7 suites with 0 TypeScript errors (`tsc --noEmit`).',
      'Deterministic crisis screening (`is_crisis_input`) executing synchronously before LangGraph/Gemini calls with false-positive idiom filtering and localized Tele-MANAS 14416 / 112 / 988 routing.',
      'Single-POST SSE delivery guard classifying 502/503/504 as ambiguous delivery without blind retries, plus ephemeral voice buffer purge (`del audio_bytes` in `finally:`) and Supabase RLS two-user isolation.'
    ]
  },

  // -------------------------------------------------------------
  // 11. OCR Benchmark Evaluator
  // -------------------------------------------------------------
  {
    id: 'ocr-evaluator',
    slug: 'ocr-evaluator',
    canonicalId: 'proj-ocr-evaluator',
    title: 'OCR Evaluation & Robustness Testing Platform',
    subtitle: 'Multi-Tier Document Extraction Auditing & Image Degradation Stress Testing',
    tagline: 'Moving beyond single-number accuracy: CER, WER, critical-field correctness, and risk-aware validation under real-world degradation.',
    summary:
      'An engineering-focused OCR evaluation system that measures document extraction accuracy, confidence, critical-field correctness, and robustness under real-world image degradation. It answers the fundamental operational question: "Can this OCR result be trusted?" through Character Error Rate (CER), Word Error Rate (WER), field-level matching, and risk classification (PASS / REVIEW / FAIL), validated by 134 automated backend pytests across 22 test files and 20 browser UI assertions.',
    type: 'INDEPENDENT ENGINEERING PROJECT',
    demo: null,
    publicRepoOverride: 'https://github.com/aadil-lang/OCR-Evaluator',
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
    problem:
      'OCR systems are typically evaluated using a single global accuracy score. For critical documents like legal title deeds, land records, or medical invoices, this metric is dangerously misleading: an engine can boast 99% overall character accuracy while misreading a vital survey number (e.g. 128/3 becoming 128/8). A single unflagged character error in a critical field causes catastrophic downstream failure.',
    solution:
      'Built an end-to-end evaluation and robustness testing platform that decouples overall extraction from critical-field auditing. The system evaluates documents across multiple tiers (CER, WER, exact field match, critical-field accuracy, OCR confidence), assigns operational risk classifications (PASS, REVIEW, FAIL), and subjects extraction models to controlled image degradations (Gaussian blur, noise, rotation skew, contrast reduction, JPEG compression). An interactive React dashboard connects to a FastAPI backend for real-time visual inspection.',
    keyFeatures: [
      'Multi-tier accuracy metrics: Character Error Rate (CER via Levenshtein edit distance), Word Error Rate (WER), and field-level exact match',
      'Critical-field auditing: Prioritizes legal survey numbers, registration IDs, and numerical acreage over generic boilerplate text',
      'Risk classification engine: Categorizes documents into PASS, REVIEW, or FAIL based on field severity rules and OCR confidence scores',
      'Controlled image degradation suite: Measures resilience under Gaussian blur, additive noise, rotation skew, contrast loss, and JPEG artifacts',
      'FastAPI backend & React dashboard: Full-stack architecture with schema validation and error-isolated document batch processing'
    ],
    architecturePattern: 'ocr',
    systemLayers: [
      { layer: 'Interface & Dashboard', components: 'React 18 / Vite / Tailwind CSS', details: 'Interactive document evaluation dashboard, ground-truth vs extraction diffs, and degradation trend charts' },
      { layer: 'API & Orchestration', components: 'FastAPI (Python 3.12) / Pydantic v2', details: 'REST endpoints for document ingestion, evaluation batch execution, schema validation, and CORS-isolated data streaming' },
      { layer: 'Extraction Engine', components: 'Tesseract OCR / PyTesseract / PIL', details: 'Automated OCR text extraction with character-level bounding boxes and confidence score collection' },
      { layer: 'Evaluation & Metrics', components: 'NumPy / Levenshtein Distance', details: 'Multi-tier Character Error Rate (CER), Word Error Rate (WER), exact field matching, and priority risk classification' },
      { layer: 'Robustness Suite', components: 'OpenCV / PIL Image Degradation Suite', details: 'Controlled degradation across 5 axes: Gaussian blur, additive noise, rotation skew, contrast loss, and JPEG artifacts' },
      { layer: 'Verification Suite', components: 'pytest (134 Tests) & Playwright (20 UI Assertions)', details: '134 passing backend tests across 22 test files and 20 browser UI evaluation assertions with 0 frontend JavaScript errors' }
    ],
    context:
      'Legal title deeds, land records, and medical invoices carry severe operational risk when evaluated solely by global character accuracy. A 99% overall score is catastrophic if the 1% error misreads a vital legal survey number (e.g. 128/3 becoming 128/8). This platform turns OCR evaluation from passive benchmarking into an active operational risk gate.',
    criticalDecision:
      'Enforcing strict priority: a mismatch on a CRITICAL severity field (e.g. Survey Number) immediately triggers a FAIL status, regardless of how high the OCR confidence score was on surrounding text.',
    whatBroke: [
      {
        failure: 'Frontend crashed when rendering documents containing failed critical fields',
        cause: 'API schema previously returned unexpected null values for failed field confidence intervals',
        detection: '20 browser UI integration tests failing during initial frontend-to-FastAPI dogfooding',
        response: 'Hardened backend serializer to guarantee consistent field evaluation contracts across PASS, REVIEW, and FAIL scenarios, verified with 20 browser UI assertions'
      }
    ],
    whatBecameDeterministic:
      'Deterministic PASS, REVIEW, FAIL status derivation, field-level severity mapping (CRITICAL, HIGH, NORMAL), controlled image degradation across 5 axes, and 134 automated backend pytests.',
    evidence: [
      '134 automated backend pytests passing across 22 test files with 100% pass rate',
      '20 browser UI evaluation assertions passing with 0 frontend JavaScript errors',
      'Evaluated across 5 degradation axes with documented accuracy degradation curves',
      'Tested against anonymized title deed and land record ground-truth datasets'
    ],
    tradeoffs: [
      'Critical fields require domain schema definition over generic unconstrained full-text extraction',
      'Confidence score calibration varies across OCR engines; normalized thresholds are required'
    ],
    breakthrough:
      'Shifting OCR evaluation from a passive extraction benchmark into an active risk gate: if a critical identifier fails or exhibits low confidence, the pipeline flags it for human review rather than silently passing incorrect data into downstream systems.',
    delta:
      'Transition from single-number aggregate OCR accuracy to multi-tier critical-field verification and robustness stress-testing.',
    codeEvidence: [
      {
        id: 'ocr-risk-assessment-engine',
        title: 'Priority Risk Classification Engine',
        decision: 'CRITICAL FIELD MISMATCH ALWAYS OVERRIDES HIGH STATISTICAL CONFIDENCE',
        language: 'python',
        sourcePath: 'src/evaluation/risk.py',
        lineRange: '15-55',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/OCR-Evaluator',
        code: `def assess_risk(field_results: dict) -> dict:
    """Determine document risk from field-level evaluation results.

    Risk rules:
    1. A field mismatch creates a FIELD_MISMATCH risk.
    2. A CRITICAL field mismatch causes FAIL.
    3. A HIGH field mismatch causes REVIEW.
    4. A field with low OCR confidence causes REVIEW.
    5. CRITICAL field mismatch always takes priority over low-confidence warnings.
    6. Missing confidence (None) does not create a risk.
    """
    failed_fields = []
    low_confidence_fields = []

    for field, result in field_results.items():
        match = result.get("match", False)
        confidence = result.get("confidence")
        severity = FIELD_SEVERITY.get(field, "NORMAL")

        # Field mismatch
        if not match:
            failed_fields.append({
                "field": field,
                "severity": severity,
                "reason": "FIELD_MISMATCH",
            })

        # Low OCR confidence
        if confidence is not None and confidence < LOW_CONFIDENCE_THRESHOLD:
            low_confidence_fields.append({
                "field": field,
                "severity": severity,
                "confidence": confidence,
                "reason": "LOW_CONFIDENCE",
            })`,
        explanation: 'Critical fields (such as Survey Numbers or Registration IDs) must never be averaged out by high character accuracy on boilerplate text. A single mismatch on a critical field immediately forces a FAIL classification, triggering human review.',
        principle: 'Never let aggregate accuracy mask a catastrophic failure on a high-severity entity.',
        evidence: [
          'Deterministic PASS, REVIEW, FAIL status derivation',
          'Field-level severity mapping (CRITICAL, HIGH, NORMAL)',
          'Verified by 8 dedicated risk evaluation pytests'
        ]
      },
      {
        id: 'ocr-robustness-metadata',
        title: 'Controlled Image Degradation Metadata Parsing',
        decision: 'STRUCTURED DEGRADATION TYPING FOR SYSTEMATIC RESILIENCE BENCHMARKING',
        language: 'python',
        sourcePath: 'src/evaluation/robustness.py',
        lineRange: '1-38',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/OCR-Evaluator',
        code: `DEGRADATION_TYPES = {
    "blur": "Blur",
    "contrast": "Contrast",
    "jpeg": "JPEG",
    "noise": "Noise",
    "rotation": "Rotation",
}

CONTRAST_SEVERITY = {
    "low": 1.0,
    "medium": 2.0,
    "high": 3.0,
    "extreme": 4.0,
}

def parse_degradation(document_name: str) -> tuple[str, float]:
    """Parse legacy degradation metadata from a filename."""
    stem = Path(document_name).stem

    for prefix, label in DEGRADATION_TYPES.items():
        if stem.startswith(f"{prefix}_"):
            value = stem[len(prefix) + 1:]
            if prefix == "contrast":
                severity = CONTRAST_SEVERITY.get(value.lower(), 0.0)
            else:
                try:
                    severity = float(value)
                except ValueError:
                    severity = 0.0
            return label, severity

    return "Unknown", 0.0`,
        explanation: 'Evaluates OCR robustness across 5 controlled degradation axes (Gaussian blur, noise, rotation, contrast, JPEG compression). Filename and manifest metadata ensure accuracy degradation curves are deterministically reproducible.',
        principle: 'Test systems against controlled physical degradation before deploying into unpredictable production environments.',
        evidence: [
          '5 degradation axes with severity calibration',
          'Automated degradation curve plotting',
          '11 robustness suite pytests passing'
        ]
      },
      {
        id: 'ocr-api-cors-resolution',
        title: 'FastAPI CORS Resolution & Ground-Truth Evaluation Endpoint',
        decision: 'SECURE CORS ORIGIN RESOLUTION & STANDALONE GROUND-TRUTH INJECTION',
        language: 'python',
        sourcePath: 'src/api.py',
        lineRange: '20-45',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/OCR-Evaluator',
        code: `DEFAULT_CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

def resolve_cors_origins() -> list:
    """Read CORS origins from OCR_API_CORS_ORIGINS environment variable."""
    raw_value = os.environ.get("OCR_API_CORS_ORIGINS", "")
    origins = [
        origin.strip()
        for origin in raw_value.split(",")
        if origin.strip()
    ]
    return origins or DEFAULT_CORS_ORIGINS

def default_ground_truth_path() -> Path:
    """Locate sample ground-truth document used by demo API."""
    project_root = Path(__file__).resolve().parent.parent
    return project_root / "data" / "ground_truth" / "test_document.json"`,
        explanation: 'Connects the React evaluation dashboard to the FastAPI backend with clean CORS isolation and fallback ground-truth data injection, allowing offline demonstration and automated browser integration testing.',
        principle: 'Decouple API evaluation contracts from client deployment environments.',
        evidence: [
          'Strict CORS origin resolution for local & production Vite clients',
          '20 browser UI evaluation assertions passing',
          '7 API integration pytests passing'
        ]
      }
    ],
    ragRole: 'Systems & Evaluation Engineer (Independent Engineering Build)',
    ragPortfolioRefs: {
      timeline: ['ocr-evaluator-2026', 'future-still-building'],
      journal: ['spread-16-chapter-10-open', 'spread-17-systems-catalog'],
      system: '/projects/ocr-evaluator'
    },
    ragEvidence: [
      '134 automated backend tests passing across 22 test files covering metrics, normalization, risk, and robustness.',
      '20 browser UI evaluation assertions passing with 0 frontend JavaScript errors.',
      'Controlled image degradation across 5 axes: Gaussian blur, additive noise, rotation skew, contrast reduction, and JPEG compression.',
      'Risk classification engine assigning PASS / REVIEW / FAIL decisions prioritizing critical fields over statistical averages.'
    ]
  },

  // -------------------------------------------------------------
  // 12. Universal HR & IT Assistant (Archie)
  // -------------------------------------------------------------
  {
    id: 'universal-hr-assistant',
    slug: 'universal-hr-assistant',
    canonicalId: 'proj-universal-hr-assistant',
    title: 'Archie — Universal Enterprise HR & IT Assistant',
    subtitle: 'Enterprise Policy RAG & Zero-Trust FastMCP Assistant',
    tagline: 'Controlled enterprise assistant demonstration coupling dense policy RAG with FastMCP zero-trust transactional execution.',
    summary:
      'A controlled enterprise assistant demonstration built for Acme Corporation. Bridges unstructured corporate policy retrieval (ChromaDB RAG) with secure, structured transactional operations (FastMCP & PostgreSQL) under strict tenant peer-isolation and two-stage AI security guardrails.',
    type: 'Full-Stack • Enterprise RAG & MCP Demo',
    demo: null,
    publicRepoOverride: 'https://github.com/aadil-lang/universal-enterprise-assistant',
    videoDemo: {
      source: '/videos/archie_demo.mp4',
      sourceType: 'hosted',
      title: 'Archie — Enterprise HR & IT Assistant Walkthrough',
      eyebrow: 'CONTROLLED ENTERPRISE DEMONSTRATION // LIVE WORKFLOWS',
      description:
        'Full-stack demonstration of Archie coupling dense policy document RAG (ChromaDB) with secure transactional tool execution (FastMCP over PostgreSQL 16) under two-stage AI security guardrails.',
      poster: '/videos/archie_demo_poster.png',
      duration: '4:59 • 1080p 60fps',
      caption:
        'Demonstrates policy Q&A with verifiable document citations, leave reservation, IT ticketing, and caller identity isolation.'
    },
    technologies: [
      'Python 3.12',
      'FastAPI',
      'LangGraph',
      'Next.js 14',
      'TypeScript 5',
      'FastMCP',
      'ChromaDB',
      'PostgreSQL 16',
      'Docker Compose',
      'Google Gemini'
    ],
    problem:
      'Enterprise employees routinely navigate fragmented HR portals, disconnected IT systems, and scattered policy documents to resolve workplace requests. In an AI assistant, connecting language models to these environments introduces critical risks: models hallucinate policy rules when documents are ambiguous, direct database tools risk cross-employee peer data probing, and untrusted inputs can execute prompt injection. The engineering challenge was to unify policy question-answering with transactional execution in a controlled environment without granting the LLM direct database access or relying on prompt instructions for access control.',
    solution:
      'Engineered Archie as a controlled enterprise demonstration: a dual-capability architecture combining document-driven RAG over company policies in ChromaDB with zero-trust structured record access via an internal HMAC-signed FastMCP server over PostgreSQL. Governed by a LangGraph state machine with 0ms deterministic pre-flight regex guardrails, dynamic greeting-mirroring voice assistant, and live Google Gemini 3.5 Flash-lite synthesis.',
    keyFeatures: [
      'Document-driven policy Q&A: Dense semantic search over multi-format documents (PDF, DOCX, Markdown) in ChromaDB with cosine distance thresholding (1.15) and verifiable citations',
      'Zero-trust FastMCP server: Parameterized read-only tools querying PostgreSQL employee records with HMAC-SHA256 inter-service signatures and strict caller peer-isolation',
      'Two-stage AI security guardrails: Pre-flight regex inspection blocking prompt injections and SQL injection signatures at 0ms; post-flight sanitization scrubbing sensitive PII',
      'LangGraph state machine orchestration: Deterministic workflow driving input validation -> intent routing -> policy retrieval / MCP execution -> grounded response synthesis',
      'Multi-modal voice & web interface: Next.js 14 client with hands-free voice assistant featuring dynamic greeting mirroring (Hi, Hello, Hey) and live token streaming',
      'Dual-mode LLM execution: Powered by live Google Gemini (gemini-3.5-flash-lite) with zero-cost deterministic offline synthesis mode for automated CI/CD testing'
    ],
    architecturePattern: 'overview',
    systemLayers: [
      { layer: 'Frontend Layer', components: 'Next.js 14 / React 18 / Tailwind CSS', details: 'Client chat interface, Web Speech voice synthesis, dynamic greeting mirroring, and client JWT management' },
      { layer: 'API Gateway & Orchestration', components: 'FastAPI / LangGraph / Pydantic v2', details: 'Asynchronous REST gateway, JWT authentication, and LangGraph deterministic state-machine workflow' },
      { layer: 'Security Guardrails', components: 'Regex Inspector & PII Redactor', details: '0ms pre-flight prompt injection / jailbreak interception and post-flight sensitive PII sanitization' },
      { layer: 'Policy Retrieval (RAG)', components: 'ChromaDB / all-MiniLM-L6-v2', details: 'Multi-format document ingestion (pypdf, python-docx), SHA-256 deduplication, and dense vector similarity retrieval' },
      { layer: 'Structured Tools (MCP)', components: 'FastMCP / PostgreSQL 16', details: 'Internal Streamable HTTP FastMCP server with HMAC-SHA256 authentication and strict tenant peer-isolation' },
      { layer: 'Language Model', components: 'Google Gemini (gemini-3.5-flash-lite)', details: 'Live natural language synthesis bound by <untrusted_policy_reference> XML containment, plus offline mock provider' }
    ],
    context:
      'Built as a controlled enterprise demonstration for a simulated enterprise environment (Acme Corporation), Archie investigates how to unify unstructured corporate policy retrieval and authenticated transactional workflows into a single conversational interface. Rather than attempting a full enterprise-wide rollout, the project serves as a functional reference architecture exploring how LLM state-machine orchestration (LangGraph), vector-based retrieval-augmented generation (ChromaDB), and the Model Context Protocol (FastMCP) can safely interface with corporate databases without compromising security boundaries.',
    criticalDecision:
      'Decoupled unstructured corporate policy knowledge from structured transactional records: policies are dynamically retrieved from ChromaDB (never hardcoded in business logic), while employee records are accessed strictly through an internal, HMAC-signed FastMCP microservice enforcing caller authorization.',
    whatBroke: [
      {
        failure: 'Semantic Drift in General Policy Queries',
        cause: 'When an exact policy document was absent (e.g. general travel expense policy), top-k semantic search matched adjacent clauses (remote ergonomic stipend).',
        detection: 'Evaluator test Q10 flagged ergonomic stipend receipt clause returned for general expense reimbursement query.',
        response: 'Retrieved evidence accurately cited the specific ergonomic receipt provision without hallucinating general expense rules, demonstrating strict grounding.'
      },
      {
        failure: 'Peer Record Probing Vulnerability',
        cause: 'Retrieved policy documents or user prompts could attempt to query peer employee records (e.g. Bob Jones querying Alice Smith).',
        detection: 'Adversarial security test suite flagged cross-employee data access attempts.',
        response: 'Enforced caller identity authorization in FastMCP handlers, deterministically rejecting attempts to query peer records with HTTP 403 / access denied.'
      }
    ],
    whatBecameDeterministic:
      'Document-driven number extraction from ChromaDB (zero hardcoded policy numbers in business logic), HMAC-signed FastMCP tool authorization with caller identity masking, and 0ms deterministic regex pre-flight input inspection.',
    evidence: [
      '64 automated tests passing across 9 test suites covering policy extraction, auth security, adversarial AI defense, and MCP tools',
      '10-question live document evaluation benchmark achieving 100% execution rate and 0% security failure / data breach rate',
      'ChromaDB dense semantic search with cosine distance threshold (1.15) and active SHA-256 checksum deduplication'
    ],
    tradeoffs: [
      'FastMCP streamable HTTP architecture introduces microservice boundary overhead, but guarantees complete process isolation and caller identity enforcement.',
      'Strict XML evidence containment prevents model creativity on policy terms, but eliminates numerical policy hallucination.'
    ],
    breakthrough:
      'Bridging unstructured document RAG with secure transactional tool execution: the agent answers policy questions from multi-format corporate manuals and executes authenticated self-service operations through typed MCP tools with zero credential leakage.',
    delta:
      'Transition from static intranet wikis and delayed human HR/IT ticketing to an instant, voice-enabled conversational assistant with zero-trust database security.',
    codeEvidence: [
      {
        id: 'archie-mcp-peer-isolation',
        title: 'FastMCP Parameterized Tools & Peer-Isolation Boundary',
        decision: 'AUTHENTICATED MCP TOOL HANDLERS WITH CALLER TENANT MASKING',
        language: 'python',
        sourcePath: 'packages/mcp_server/app/tools/employee_tools.py',
        lineRange: '18-58',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/universal-enterprise-assistant',
        code: `def _validate_employee_number(employee_number: str) -> str:
    if not employee_number or not str(employee_number).strip():
        raise ValueError("employee_number must be a non-empty string.")
    return str(employee_number).strip()

def get_employee_profile_handler(employee_number: str) -> Dict[str, Any]:
    """Retrieves demographic and organizational profile for an employee.
    Strictly excludes authentication principals, credentials, and password hashes."""
    emp_no = _validate_employee_number(employee_number)
    authorize_employee_access(emp_no)
    db = get_db_manager()

    query = text("""
        SELECT id, employee_number, first_name, last_name, email,
               department, position, manager_name, employment_type, hire_date
        FROM employees
        WHERE employee_number = :emp_no AND is_active = true
    """)
    with db.get_connection() as conn:
        row = conn.execute(query, {"emp_no": emp_no}).mappings().first()
        if not row:
            raise ValueError(f"Employee {emp_no} not found.")
        return dict(row)`,
        explanation: 'FastMCP exposes typed employee lookup tools (profile, leave balances, assigned IT assets, tickets). authorize_employee_access verifies caller identity and HMAC signatures, deterministically blocking peer data snooping.',
        principle: 'Never expose raw database access to AI models: constrain tool execution to parameterized, permissioned microservice endpoints.',
        evidence: [
          '24 MCP tool verification pytests passing',
          'Strict caller peer-isolation enforced',
          'Zero authentication hash or credential leakage'
        ]
      },
      {
        id: 'archie-security-guardrails',
        title: 'Two-Stage Pre-Flight Input Inspection & Injection Detection',
        decision: '0MS DETERMINISTIC REGEX INTERCEPTION BEFORE MODEL DISPATCH',
        language: 'python',
        sourcePath: 'apps/api/app/services/guardrails.py',
        lineRange: '20-56',
        ownership: 'BUILT INDEPENDENTLY',
        sourceUrl: 'https://github.com/aadil-lang/universal-enterprise-assistant',
        code: `PROMPT_INJECTION_PATTERNS = [
    re.compile(r"ignore\\s+(all\\s+)?(previous|prior|above)\\s+(instructions|rules|prompts)", re.IGNORECASE),
    re.compile(r"disregard\\s+(all\\s+)?(previous|prior|above)\\s+(instructions|rules|prompts)", re.IGNORECASE),
    re.compile(r"(reveal|print|display|show|output)\\s+(the\\s+)?(system\\s+prompt|developer\\s+instructions|secret\\s+key)", re.IGNORECASE),
    re.compile(r"you\\s+are\\s+now\\s+(in\\s+)?(developer\\s+mode|dan\\s+mode|unrestricted|god\\s+mode)", re.IGNORECASE),
    re.compile(r"bypass\\s+(all\\s+)?(security|guardrails|filters|restrictions)", re.IGNORECASE),
    re.compile(r"system\\s*[:\\s]\\s*(override|reset|award|grant|delete)", re.IGNORECASE),
    re.compile(r"\\b(drop\\s+table|delete\\s+from|grant\\s+admin|insert\\s+into|update\\s+\\w+\\s+set)\\b", re.IGNORECASE),
]

class GuardrailService:
    @staticmethod
    def inspect_input(query: str, max_chars: int = 2000) -> Dict[str, Any]:
        cleaned = str(query).strip()
        for pattern in PROMPT_INJECTION_PATTERNS:
            if pattern.search(cleaned):
                return {
                    "is_valid": False,
                    "sanitized_query": cleaned,
                    "injection_detected": True,
                    "refusal_reason": "Query rejected by security policy (prompt injection signature detected)."
                }
        return {"is_valid": True, "sanitized_query": cleaned, "injection_detected": False}`,
        explanation: 'Pre-flight regex inspection catches adversarial jailbreaks, prompt overrides, and SQL injection signatures in 0ms without consuming LLM tokens or invoking external APIs.',
        principle: 'Block adversarial attacks at the perimeter with deterministic rules before they reach probabilistic language models.',
        evidence: [
          '4 adversarial AI security pytests passing',
          '0ms latency pre-flight inspection',
          'Zero successful injection breaches across 10 evaluation test cases'
        ]
      }
    ],
    ragRole: 'AI Systems Architect & Full-Stack Engineer (Independent Engineering Build)',
    ragPortfolioRefs: {
      timeline: ['future-still-building'],
      journal: ['spread-16-chapter-10-open', 'spread-17-systems-catalog'],
      system: '/projects/universal-hr-assistant'
    },
    ragEvidence: [
      '64 automated tests passing across 9 suites in Python 3.12 and Node.js.',
      'FastMCP internal tool server implementing strict caller peer-isolation and HMAC-SHA256 signatures.',
      'Two-stage security guardrails with 0ms pre-flight regex interception and post-flight PII redaction.',
      'Multi-format document ingestion pipeline (PDF, DOCX, Markdown) with SHA-256 checksum deduplication.'
    ]
  }
]

// ============================================================================
// 3. ADAPTER PROJECTION IMPLEMENTATION
// ============================================================================

/**
 * Derives the canonical ownership classification and category for a project.
 */
function resolveProjectOwnership(
  canonicalProj?: CanonicalProjectRecord,
  overlaySlug?: string
): {
  ownershipLabel: OwnershipClassification
  ownershipCategory: OwnershipCategory
  metadataOwnership: OwnershipType
  isProprietary: boolean
} {
  if (canonicalProj) {
    if (canonicalProj.ipOwnership === 'EMPLOYER_PROPRIETARY') {
      if (canonicalProj.implementationAuthorship === 'COLLABORATIVE_CONTRIBUTOR') {
        return {
          ownershipLabel: 'WAYGROUND · TEAM PROJECT',
          ownershipCategory: 'wayground-team',
          metadataOwnership: 'team',
          isProprietary: true
        }
      }
      return {
        ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
        ownershipCategory: 'wayground-independent',
        metadataOwnership: 'professional',
        isProprietary: true
      }
    }

    if (canonicalProj.requirementsOrigin === 'HACKATHON_CHALLENGE' || canonicalProj.organizationalContext === 'HACKATHON_EVENT') {
      return {
        ownershipLabel: 'INDEPENDENT · HACKATHON PROJECT',
        ownershipCategory: 'hackathon',
        metadataOwnership: 'hackathon',
        isProprietary: false
      }
    }

    return {
      ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
      ownershipCategory: 'personal-independent',
      metadataOwnership: 'independent',
      isProprietary: false
    }
  }

  // Hackathons without direct canonical registry records
  if (overlaySlug === 'loom-ai' || overlaySlug === 'atlas-ai') {
    return {
      ownershipLabel: 'INDEPENDENT · HACKATHON PROJECT',
      ownershipCategory: 'hackathon',
      metadataOwnership: 'hackathon',
      isProprietary: false
    }
  }

  return {
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'personal-independent',
    metadataOwnership: 'independent',
    isProprietary: false
  }
}

/**
 * Transforms an overlay and canonical record into a complete, governed `Project`.
 */
function projectToCanonicalConsumer(overlay: ProjectPresentationOverlay): Project {
  const canonicalProj = overlay.canonicalId
    ? getCanonicalProjectRecord(overlay.canonicalId)
    : getCanonicalProjectRecord(overlay.slug)

  const { ownershipLabel, ownershipCategory, isProprietary } = resolveProjectOwnership(
    canonicalProj,
    overlay.slug
  )

  // Enforce central publication policy:
  // If proprietary or not public open source, github MUST be null.
  const governedGithub = canonicalProj
    ? getGovernedProjectPublicUrl(canonicalProj)
    : overlay.publicRepoOverride || null

  // Sanitize code evidence
  const sanitizedCodeEvidence = sanitizeCodeEvidence(overlay.codeEvidence, isProprietary)

  const proj: Project = {
    id: overlay.id,
    slug: overlay.slug,
    title: overlay.title,
    subtitle: overlay.subtitle,
    tagline: overlay.tagline,
    summary: overlay.summary,
    type: overlay.type,
    ownershipLabel,
    ownershipCategory,
    github: governedGithub,
    demo: overlay.demo,
    technologies: [...overlay.technologies],
    problem: overlay.problem,
    solution: overlay.solution,
    keyFeatures: [...overlay.keyFeatures],
    architecturePattern: overlay.architecturePattern,
    systemLayers: overlay.systemLayers ? overlay.systemLayers.map((l) => ({ ...l })) : undefined,
    codeEvidence: sanitizedCodeEvidence,
    statusNotice: overlay.customStatusNotice,
    context: overlay.context,
    criticalDecision: overlay.criticalDecision,
    whatBroke: overlay.whatBroke ? overlay.whatBroke.map((w) => ({ ...w })) : undefined,
    whatBecameDeterministic: overlay.whatBecameDeterministic,
    evidence: overlay.evidence ? [...overlay.evidence] : undefined,
    tradeoffs: overlay.tradeoffs ? [...overlay.tradeoffs] : undefined,
    breakthrough: overlay.breakthrough,
    delta: overlay.delta,
    videoDemo: overlay.videoDemo ? { ...overlay.videoDemo } : undefined
  }

  return proj
}

/**
 * Transforms an overlay and canonical record into a reconciled `ProjectMetadata` record for RAG.
 */
function projectToCanonicalMetadata(overlay: ProjectPresentationOverlay): ProjectMetadata {
  const canonicalProj = overlay.canonicalId
    ? getCanonicalProjectRecord(overlay.canonicalId)
    : getCanonicalProjectRecord(overlay.slug)

  const { metadataOwnership } = resolveProjectOwnership(canonicalProj, overlay.slug)

  // Resolve dates strictly from canonical temporal registry if available
  let start = '2026-08'
  let end: string | undefined = '2026-08'

  if (canonicalProj?.temporalRegistry.developmentWindow) {
    const win = canonicalProj.temporalRegistry.developmentWindow
    start = win.start.dateString
    end = typeof win.end === 'object' ? win.end.dateString : win.end === 'PRESENT' ? 'PRESENT' : undefined
  } else if (overlay.slug === 'loom-ai' || overlay.slug === 'atlas-ai') {
    start = '2026-08'
    end = '2026-08'
  }

  // Central publication enforcement for externalRefs.github
  const governedGithub = canonicalProj
    ? getGovernedProjectPublicUrl(canonicalProj)
    : overlay.publicRepoOverride || null

  return {
    slug: overlay.slug,
    title: overlay.title,
    summary: overlay.summary,
    problem: overlay.problem,
    dates: {
      start,
      end
    },
    ownership: metadataOwnership,
    role: overlay.ragRole || `${overlay.title} Contributor`,
    technologies: [...overlay.technologies],
    portfolioRefs: overlay.ragPortfolioRefs || {
      timeline: [],
      journal: [],
      system: `/projects/${overlay.slug}`
    },
    externalRefs: {
      github: governedGithub
    },
    evidence: overlay.ragEvidence ? [...overlay.ragEvidence] : overlay.evidence ? [...overlay.evidence] : [],
    lastVerified: '2026-11-15'
  }
}

// ============================================================================
// 4. PUBLIC EXPORTS
// ============================================================================

/**
 * Returns all 11 public systems as fully governed, canonical `Project` models.
 */
export function getCanonicalProjects(): Project[] {
  return PROJECT_OVERLAYS.map(projectToCanonicalConsumer)
}

/**
 * Returns a specific project by slug.
 */
export function getCanonicalProjectBySlug(slug: string): Project | undefined {
  const overlay = PROJECT_OVERLAYS.find((o) => o.slug === slug || o.id === slug)
  if (!overlay) return undefined
  return projectToCanonicalConsumer(overlay)
}

/**
 * Returns all reconciled project metadata records for RAG ingestion.
 * Unsupported legacy records (e.g. unverified binance-bot) are strictly excluded.
 */
export function getCanonicalProjectsMetadata(): ProjectMetadata[] {
  return PROJECT_OVERLAYS.map(projectToCanonicalMetadata)
}

/**
 * Cached public instances for direct consumer exports.
 */
export const projects: Project[] = getCanonicalProjects()
export const projectsMetadata: ProjectMetadata[] = getCanonicalProjectsMetadata()
