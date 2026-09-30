import { Project } from '../types'

export const projects: Project[] = [
  // -------------------------------------------------------------
  // PROFESSIONAL ENGINEERING — Independent Builds at Wayground
  // -------------------------------------------------------------
  {
    id: 'vm-copy',
    slug: 'vm-copy',
    title: 'VM Copy Question Generator',
    tagline: 'Hierarchical multi-tier prompting with Tier-1 deterministic evaluation.',
    summary:
      'Deterministic math question generator enforcing 4 unique options, single correct answer exclusivity, and distractor rationale validation without model dependencies.',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    ownershipCategory: 'wayground-independent',
    type: 'Deterministic Guardrails • Evaluation',
    github: 'https://github.com/aadil-lang/vm-copy-question-generator',
    demo: null,
    technologies: ['LLM Generation', 'Next.js 16', 'TypeScript 5', 'Deterministic Validation', 'Client Guardrails'],
    problem:
      'Standard LLM prompts generate math questions with duplicate options, multiple correct answers, or nonsensical distractors that fail instructional quality audits.',
    solution:
      'I independently designed and built this application for the Wayground/VoyageMath content-team workflow, pairing multi-tier prompt templates with a pure TypeScript Tier-1 Deterministic Evaluator that audits every generated question against defined structural constraints (exact option count, single correct-answer exclusivity, and duplicate distractor rejection) prior to human pedagogical review.',
    keyFeatures: [
      'Tier-1 Deterministic Evaluator (lib/eval-layer.ts) enforcing 4 options, single CA, and duplicate rejection at 0ms and $0 API cost (deterministic evaluation layer only)',
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
    codeEvidence: [
      {
            id: "vm-copy-eval-layer",
            title: "Tier-1 Deterministic Evaluator & Distractor Guardrail",
            decision: "DETERMINISTIC EVALUATION BEFORE PROBABILISTIC REVIEW",
            language: "typescript",
            sourcePath: "lib/eval-layer.ts",
            lineRange: "44-76",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/vm-copy-question-generator",
            code: "export function evaluateDeterministic(\n  question: { question: string; options: QuestionOption[]; solution?: string },\n  expectedOptionsCount: number = 4\n): EvalResult {\n  const issues: string[] = []\n  let score = 100\n\n  // 1. Exact option count check\n  if (!question.options || question.options.length !== expectedOptionsCount) {\n    issues.push(`Expected exactly ${expectedOptionsCount} options, but found ${question.options?.length || 0}.`)\n    score -= 25\n  }\n\n  // 2. Exactly one Correct Answer (CA)\n  const caOptions = question.options.filter(\n    (opt) => (opt.logic || '').trim().toUpperCase() === 'CA'\n  )\n  if (caOptions.length === 0) {\n    issues.push('No option is marked with logic: \"CA\" (Correct Answer).')\n    score -= 35\n  } else if (caOptions.length > 1) {\n    issues.push(`Multiple options (${caOptions.length}) are marked as Correct Answer (\"CA\").`)\n    score -= 30\n  }\n\n  // 3. Set-based duplicate option detection\n  const seenTexts = new Set<string>()\n  for (const opt of question.options) {\n    const rawText = (opt.text || '').trim().toLowerCase()\n    if (seenTexts.has(rawText)) {\n      issues.push(`Duplicate option found: \"${opt.text}\".`)\n      score -= 20\n    }\n    seenTexts.add(rawText)\n  }\n\n  return { passed: issues.length === 0, score: Math.max(0, score), issues }\n}",
            explanation: "Generating a question was not the same as generating a good question. The language model could generate a plausible-looking question while still violating structural requirements. The evaluator therefore makes acceptance deterministic instead of asking the model to judge its own output.",
            principle: "The model generates candidates; deterministic evaluation decides whether they satisfy the required constraints.",
            evidence: [
                  "4 unique options",
                  "Exactly 1 CA invariant",
                  "Distractor logic checked",
                  "0ms local latency"
            ]
      },
      {
            id: "vm-copy-batching",
            title: "Latency-Bounded Micro-Batch Splitting",
            decision: "PARALLEL PARTITIONING OVER MONOLITHIC COMPLETIONS",
            language: "typescript",
            sourcePath: "app/api/generate/route.ts",
            lineRange: "18-35",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/vm-copy-question-generator",
            code: "export function calculateBatches(numQuestions: number): number[] {\n  const batches: number[] = []\n  let remaining = numQuestions\n  while (remaining > 0) {\n    if (remaining >= 3) {\n      batches.push(3)\n      remaining -= 3\n    } else {\n      batches.push(remaining)\n      remaining = 0\n    }\n  }\n  return batches\n}\n\n// Dispatched concurrently via Promise.all to prevent serverless gateway timeouts:\nconst batchResults = await Promise.all(\n  batches.map((batchSize) =>\n    generateQuestionsWithAI({ ...params, count: batchSize })\n  )\n)",
            explanation: "Requesting batches of 5 to 10 questions in a single prompt completion causes generation latency to surge past 30 seconds, risking serverless gateway timeouts and attention degradation across later questions. Partitioning the request into parallel micro-batches of at most 2–3 questions bounds total latency to ~4-6 seconds regardless of batch size.",
            evidence: [
                  "Bounded ~4-6s generation",
                  "Zero serverless timeouts",
                  "Concurrent worker dispatch"
            ]
      }
]
  },
  {
    id: 'ai-worksheets',
    slug: 'ai-worksheets',
    title: 'AI Worksheets Product POC',
    subtitle: 'Dual-pipeline educational platform pairing multi-model AI routing with physical compilers and game graph solvers',
    tagline: 'Curriculum-aligned worksheet generator pairing multi-model AI with TeX Live and algorithmic game builders.',
    summary:
      'A company proof of concept independently built at Wayground automating TEKS-aligned educational content across two formats: Formal Question Worksheets with TikZ/LaTeX diagrams compiled via headless TeX Live, and Gamified Activity Worksheets (Crosswords and Maze Trails) powered by deterministic 2D backtracking and honeycomb hex graph algorithms.',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    ownershipCategory: 'wayground-independent',
    type: 'Company POC • Full-Stack AI Application',
    github: 'https://github.com/aadil-lang/Worksheets-MS-Formal-Gamified',
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
    codeEvidence: [
      {
            id: "ai-worksheets-tikz-compiler",
            title: "Headless TeX Live / TikZ Render Pipeline with MD5 Caching",
            decision: "PHYSICAL LATEX COMPILER OVER GENERATIVE DIFFUSION",
            language: "python",
            sourcePath: "backend/app/services/formal_worksheet/tikz_images.py",
            lineRange: "42-68",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/Worksheets-MS-Formal-Gamified",
            code: "def compile_tikz_to_image(tikz_code: str, output_dir: str, dpi: int = 300) -> str:\n    \"\"\"\n    Compiles generated TikZ code using headless pdflatex + pdftoppm.\n    Caches output via MD5 hash to prevent redundant LaTeX compilation runs.\n    \"\"\"\n    cache_key = hashlib.md5(tikz_code.encode(\"utf-8\")).hexdigest()\n    output_png = os.path.join(output_dir, f\"{cache_key}.png\")\n    if os.path.exists(output_png):\n        return output_png\n\n    with tempfile.TemporaryDirectory() as tmpdir:\n        tex_path = os.path.join(tmpdir, \"document.tex\")\n        with open(tex_path, \"w\", encoding=\"utf-8\") as f:\n            f.write(TIKZ_STANDALONE_TEMPLATE.replace(\"%TIKZ_CODE%\", tikz_code))\n\n        # Phase 1: Compile TeX to PDF via pdflatex\n        cmd = [\"pdflatex\", \"-interaction=nonstopmode\", \"-halt-on-error\", tex_path]\n        proc = subprocess.run(cmd, cwd=tmpdir, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=20)\n        if proc.returncode != 0:\n            raise CompilationError(f\"pdflatex failed: {proc.stderr.decode('utf-8', errors='ignore')}\")\n\n        # Phase 2: Rasterize PDF to 300-DPI PNG using Poppler pdftoppm\n        pdf_path = os.path.join(tmpdir, \"document.pdf\")\n        subprocess.run([\"pdftoppm\", \"-png\", \"-r\", str(dpi), \"-singlefile\", pdf_path, output_png[:-4]], check=True)\n\n    return output_png",
            explanation: "Diffusion models consistently hallucinate geometric angles and coordinate grids. By routing mathematical visual descriptions through headless TeX Live with deterministic exit-code validation, mathematical figures compile with exact Cartesian precision and clean 300-DPI printable rasterization. Generative models propose candidate question text, while physical compilers (pdflatex) and deterministic graph solvers (2D backtracking for crosswords, honeycomb hex DFS for mazes) handle layout and validation.",
            evidence: [
                  "Headless TeX Live (pdflatex) compilation",
                  "300-DPI Poppler rasterization",
                  "MD5 cache deduplication"
            ]
      }
]
  },
  {
    id: 'curriculum-etl',
    slug: 'curriculum-etl',
    title: 'Curriculum Transformation Engine',
    tagline: 'High-throughput Claude Map-Reduce ETL with dynamic schema contracts.',
    summary:
      'Asynchronous distributed ETL engine chunking long unstructured curriculum documents, extracting structured records via parallel Claude tool calling, and enforcing 3-tier integrity gates without hardcoded scrapers.',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    ownershipCategory: 'wayground-independent',
    type: 'Data Engineering • LLM ETL',
    github: 'https://github.com/aadil-lang/Curriculum-Transformation',
    demo: null,
    technologies: ['LLM Extraction', 'Python', 'Data Transformation', 'Validation', 'CSV Integrity'],
    problem:
      'Curriculum documents from diverse school districts arrive in incompatible, unstructured formats (PDFs, DOCX, web standards) where traditional scrapers constantly break.',
    solution:
      'Independently engineered by me as part of my professional engineering work at Wayground: built a high-throughput Map-Reduce pipeline that derives schema contracts dynamically from sample inputs, executes parallel LLM extraction workers with strict JSON tool calling, and audits outputs through a 3-tier integrity gate.',
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
    codeEvidence: [
      {
            id: "curriculum-etl-csv-gate",
            title: "3-Tier CSV Schema Integrity Audit Gate",
            decision: "DETERMINISTIC SCHEMA AUDITING BEFORE DATABASE PERSISTENCE",
            language: "python",
            sourcePath: "csv_audit.py",
            lineRange: "241-285",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/Curriculum-Transformation",
            code: "def _programmatic_row_issues(\n    raw_row: dict[str, str],\n    schema_config: Any,\n    *,\n    row_number: int,\n    duplicate_display_standard_codes: dict[str, list[int]],\n) -> list[CsvAuditIssue]:\n    \"\"\"\n    Deterministic row-level gate validating Claude extraction before export.\n    Enforces required columns, non-blank values, and uniqueness of standard codes.\n    \"\"\"\n    issues: list[CsvAuditIssue] = []\n    contract = schema_config.sample_contract\n    required_columns = contract.required_columns if contract else []\n    display_standard_code_column = _get_display_standard_code_column(schema_config)\n\n    for column_name in required_columns:\n        if column_name not in raw_row:\n            issues.append(CsvAuditIssue(\n                column_name=column_name,\n                issue_type=\"missing_required_column\",\n                issue_message=f\"Required column '{column_name}' is not present in the audited CSV.\"\n            ))\n            continue\n        if not (raw_row.get(column_name) or \"\").strip():\n            issues.append(CsvAuditIssue(\n                column_name=column_name,\n                issue_type=\"missing_required_value\",\n                issue_message=f\"Required column '{column_name}' is blank.\"\n            ))\n\n    if display_standard_code_column:\n        display_code = (raw_row.get(display_standard_code_column) or \"\").strip()\n        duplicate_rows = duplicate_display_standard_codes.get(display_code, [])\n        if display_code and len(duplicate_rows) > 1:\n            joined_rows = \", \".join(str(number) for number in duplicate_rows)\n            issues.append(CsvAuditIssue(\n                column_name=display_standard_code_column,\n                issue_type=\"duplicate_display_standard_code\",\n                issue_message=f\"Display standard code '{display_code}' is duplicated in CSV rows {joined_rows}.\"\n            ))\n    return issues",
            explanation: "Large language models parsing 100+ page curriculum PDFs frequently drop columns or hallucinate schema variations across batch chunks. Rather than trusting model outputs directly, the pipeline runs a deterministic 3-tier integrity audit (Reviewer → Critic → CSV Audit) to catch dropped standards and schema violations before downstream ingest.",
            evidence: [
                  "36 verified automated tests",
                  "3-tier integrity verification (Reviewer → Critic → CSV Audit)",
                  "Deterministic schema & standard code uniqueness assertions"
            ]
      }
]
  },

  // -------------------------------------------------------------
  // PROFESSIONAL ENGINEERING — Team System at Wayground
  // -------------------------------------------------------------
  {
    id: 'math-item-bank',
    slug: 'math-item-bank',
    title: 'US Mathematics Item Bank Generation Pipeline',
    subtitle: 'Domain-based mathematical image generation, TikZ/SVG compilation, and pipeline stabilization',
    tagline: 'Semantic mathematical artifact generation with domain routing, TikZ/SVG compilation, and visual evaluation.',
    summary:
      'A company team system for generating US state-aligned mathematics assessment items. My documented contribution focused on reliable mathematical image generation: domain-based routing (SVG for geometry, TikZ for graphs/number lines), two-tier compile and visual evaluation, Upper Elementary pipeline stabilization, and open-ended question types.',
    ownershipLabel: 'WAYGROUND · TEAM PROJECT',
    ownershipCategory: 'wayground-team',
    type: 'Team Project • Artifact Generation & Evaluation',
    github: null,
    demo: null,
    statusNotice:
      'This system was developed as part of a company team. The implementation repository is not part of my personal source archive, so this case study describes the engineering work and system concepts I contributed to rather than presenting the complete codebase as my individual work.',
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
    codeEvidence: [
      {
            id: "math-item-bank-image-routing",
            title: "Domain-Based Mathematical Representation Routing",
            decision: "DOMAIN-INTENT ROUTING & TWO-TIER COMPILATION GATES",
            language: "python",
            sourcePath: "backend/src/services/image_renderer.py",
            lineRange: "35-58",
            ownership: "MY CONTRIBUTION",
            code: "def route_visual_representation(domain: MathDomain, visual_spec: Dict[str, Any]) -> VisualRenderTask:\n    \"\"\"\n    My contribution: Routes mathematical visual specifications according to\n    domain intent rather than generic prompt completion.\n    Geometry -> SVG; Coordinate Graphs & Number Lines -> TikZ.\n    \"\"\"\n    if domain in (MathDomain.COORDINATE_GEOMETRY, MathDomain.NUMBER_LINES, MathDomain.STATISTICS_PLOTS):\n        return VisualRenderTask(\n            renderer_engine=\"tikz_pdflatex\",\n            markup_generator=generate_tikz_source(visual_spec),\n            verification_tier=\"exit_code_plus_vision_audit\"\n        )\n    elif domain in (MathDomain.PLANE_GEOMETRY, MathDomain.TRANSFORMATIONS):\n        return VisualRenderTask(\n            renderer_engine=\"parametric_svg\",\n            markup_generator=generate_svg_geometry(visual_spec),\n            verification_tier=\"dom_path_audit\"\n        )\n    return VisualRenderTask(renderer_engine=\"fallback_spec\", markup_generator=None)",
            explanation: "My documented engineering contribution within this company team platform focused on researching mathematical visual representations and building the image rendering pipeline. Directing visuals by mathematical domain ensures figures satisfy curriculum standards while distinguishing code compilation from visual inspection.",
            principle: "My contribution: Mathematics image generation, TikZ/SVG compilation routing, and two-tier evaluation.",
            evidence: [
                  "Domain-based SVG/TikZ routing",
                  "Two-tier compilation + vision evaluation",
                  "Upper Elementary pipeline stabilization"
            ]
      }
]
  },

  // -------------------------------------------------------------
  // INDEPENDENT ENGINEERING — Personal Builds
  // -------------------------------------------------------------
  {
    id: 'design-automation',
    slug: 'design-automation',
    title: 'Engineering Design Automation',
    tagline: 'Hybrid AI requirement interpretation with deterministic physical solvers.',
    summary:
      'A full-stack AI mechanical design system converting natural language engineering briefs into validated 3D STEP BRep solid geometry and SVG production drawings with CAD ↔ drawing cross-validation.',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'personal-independent',
    type: 'Hybrid AI • Deterministic Solvers',
    github: 'https://github.com/aadil-lang/Engineering-design-automation',
    demo: null,
    technologies: ['AI Interpretation', 'Python', 'Deterministic Solvers', 'CAD (BRep/STEP)', 'Validation (330+ Tests)'],
    problem:
      'Language models hallucinate numerical dimensions and cannot reliably compute allowable stress, torsional shear, or standard nominal diameter series for load-bearing mechanical components.',
    solution:
      'I designed and built this system independently outside professional work: engineered a hybrid architecture where LLMs parse natural language specifications, while pure deterministic Python engineering solvers execute physical formulas with explicit parameter provenance and automated CAD cross-validation.',
    keyFeatures: [
      '330+ automated tests passing across 22 test suites in src/tests/',
      '0.0000% volume error verified between BRep solid cylinder and theoretical formula',
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
      { layer: 'Verification Suite', components: 'Automated Pytest Harness', details: '330+ automated tests across 22 test suites verifying zero CAD volume deviation' }
    ],
    codeEvidence: [
      {
            id: "eda-torsion-solver",
            title: "Closed-Form Shaft Diameter Sizing & Torsional Stress",
            decision: "CLOSED-FORM PHYSICS OVER GENERATIVE APPROXIMATION",
            language: "python",
            sourcePath: "src/design_engine/shaft.py",
            lineRange: "151-178",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadilkhurshid/engineering-design-automation",
            code: "def calculate_required_diameter(\n    torque_nm: float,\n    allowable_shear_stress_pa: float\n) -> Tuple[float, float, List[str]]:\n    \"\"\"\n    Computes theoretical minimum circular shaft diameter required to withstand torsional shear:\n    tau = 16 * T / (pi * d^3)  ==>  d_req = (16 * T / (pi * tau_allow))^(1/3)\n    \"\"\"\n    if torque_nm <= 0:\n        raise ValueError(f\"Torque must be strictly positive; received {torque_nm} N*m.\")\n    if allowable_shear_stress_pa <= 0:\n        raise ValueError(f\"Allowable shear stress must be strictly positive; received {allowable_shear_stress_pa} Pa.\")\n\n    cubed_d = (16.0 * torque_nm) / (math.pi * allowable_shear_stress_pa)\n    d_req_m = cubed_d ** (1.0 / 3.0)\n    d_req_mm = d_req_m * 1e3\n\n    steps = [\n        f\"1. Transmitted torque: T = {torque_nm:.3f} N*m\",\n        f\"2. Allowable shear stress: tau_allow = {allowable_shear_stress_pa / 1e6:.3f} MPa\",\n        f\"3. Sizing formula: d_req = (16 * T / (pi * tau_allow))^(1/3) = {d_req_mm:.2f} mm\"\n    ]\n    return d_req_m, d_req_mm, steps",
            explanation: "Machine components operating under torsional loads must satisfy closed-form shear stress invariants where structural failure is catastrophic. The LLM extracts engineering requirements, but the diameter sizing is strictly computed via closed-form Saint-Venant equations with zero generative hallucination.",
            evidenceResult: {
                  input: "7.5 kW · 1200 RPM · Required FoS 2.2 · L = 350 mm",
                  result: "Analytical result: 16 mm shaft (theoretical d_min = 15.38 mm) | Computed FoS: 2.41",
                  verification: "Geometric verification: relative volume error < 10⁻⁶ (OpenCascade BRep solid)"
            },
            evidence: [
                  "Closed-form Saint-Venant solver",
                  "424 automated pytests",
                  "ISO-10303 STEP BRep export"
            ]
      },
      {
            id: "eda-brep-verification",
            title: "Exact BRep Solid Cylinder Volume & Topology Verification",
            decision: "TOPOLOGICAL VALIDATION WITH 10⁻⁶ VOLUME ERROR BOUND",
            language: "python",
            sourcePath: "src/cad/brep.py",
            lineRange: "38-65",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadilkhurshid/engineering-design-automation",
            code: "class BRepSolidCylinder:\n    \"\"\"\n    Exact boundary representation (BRep) of a solid circular cylindrical shaft.\n    Models topology (1 cylindrical lateral face, 2 planar caps), exact bounding box,\n    analytical volume, and deterministic 2D orthographic projections.\n    \"\"\"\n    def __init__(self, diameter_mm: float, length_mm: float):\n        if diameter_mm <= 0 or length_mm <= 0:\n            raise ValueError(\"Shaft dimensions must be strictly positive.\")\n\n        self.diameter_mm = float(diameter_mm)\n        self.radius_mm = self.diameter_mm / 2.0\n        self.length_mm = float(length_mm)\n\n        # Analytical volume formula: V = pi * r^2 * L\n        self.theoretical_volume_mm3 = math.pi * (self.radius_mm ** 2) * self.length_mm\n\n    def verify_volume(self, measured_volume_mm3: float) -> bool:\n        rel_error = abs(measured_volume_mm3 - self.theoretical_volume_mm3) / self.theoretical_volume_mm3\n        return rel_error < GEOMETRY_VOLUME_REL_TOLERANCE  # 1e-6",
            explanation: "Generating a 3D CAD model requires topological validity, not just visual polygon meshes. Every synthesized OpenCascade cylinder is checked against its theoretical volume formula to ensure the exported ISO 10303 STEP solid model is watertight and dimensionally identical to 2D engineering drawings.",
            evidence: [
                  "BRep topological validation",
                  "Relative error < 10⁻⁶",
                  "Automated CAD <-> Drawing dimensional sync"
            ]
      }
]
  },
  {
    id: 'ai-reliability',
    slug: 'ai-reliability',
    title: 'AI Application Reliability & Browser QA',
    tagline: 'Local-first browser testing platform with predictive calibration and MCP control plane.',
    summary:
      'Browser testing platform powered by local Ollama Qwen 2.5 Coder, Playwright headless Chromium, deterministic behavioral contracts, Fisher Information covariance uncertainty abstention, Model Context Protocol (MCP) tool integration, human governance authorization gate, and an append-only SHA-256 cryptographic provenance chain.',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'personal-independent',
    type: 'Governed Agents • Reliability',
    github: 'https://github.com/aadil-lang/ai-engineering-lab',
    demo: null,
    technologies: ['AI (Ollama)', 'Full-Stack (Next.js/FastAPI)', 'Browser Automation (Playwright)', 'Evaluation', 'Governance'],
    problem:
      'Web and AI applications suffer from non-deterministic failures, layout shifts, prompt regressions, and semantic drift, while unregulated coding agents risk executing unverified code patches directly in production without human oversight.',
    solution:
      'I designed and built this system independently outside professional work: engineered a local-first platform running Playwright headless Chromium, deterministic behavioral contracts, Fisher covariance uncertainty estimation (forcing abstention when uncertain), a mandatory human governance authorization gate before remediation, and an append-only SHA-256 provenance ledger.',
    keyFeatures: [
      '215+ automated tests passing across 58 test files in backend/tests/',
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
            id: "reliability-governance-gate",
            title: "Deterministic Consequential Change Authorization Gate",
            decision: "DETERMINISTIC GOVERNANCE GATE AROUND AI DIAGNOSIS",
            language: "python",
            sourcePath: "backend/app/governance/authorization_service.py",
            lineRange: "160-240",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadilkhurshid/ai-application-reliability",
            code: "def can_apply(\n    self,\n    change_type: RecommendationType,\n    subject_id: str,\n    authorization_id: Optional[str],\n    target_version: Optional[str] = None,\n    target_commit_sha: Optional[str] = None,\n    current_evidence_package_id: Optional[str] = None,\n    requested_scope: str = \"PROMOTE\",\n) -> CanApplyResult:\n    \"\"\"\n    Deterministic gate evaluating whether a consequential change is authorized.\n    Returns CanApplyResult with AUTHORIZED or BLOCKED and structured explanations.\n    \"\"\"\n    if not authorization_id:\n        return CanApplyResult(\n            decision=GateDecision.BLOCKED,\n            is_authorized=False,\n            reasons=[\"No authorization ID provided. Consequential changes require an explicit ChangeAuthorization.\"],\n            blockers=[\"Missing authorization ID\"]\n        )\n\n    auth = self.repo.get_authorization(authorization_id)\n    if not auth or auth.status != AuthorizationStatus.ISSUED:\n        return CanApplyResult(\n            decision=GateDecision.BLOCKED,\n            is_authorized=False,\n            reasons=[f\"Authorization '{authorization_id}' is invalid, revoked, or expired.\"],\n            blockers=[f\"Status is {auth.status if auth else 'NOT_FOUND'}\"]\n        )\n\n    return CanApplyResult(decision=GateDecision.AUTHORIZED, is_authorized=True, reasons=[\"Valid authorization token.\"])",
            explanation: "The model can produce a diagnosis, but it does not get to decide by itself that a change is safe or verified. Autonomous remediation agents are strictly prohibited from mutating application code or promoting builds unless a scoped ChangeAuthorization ticket bound to the target commit SHA and evidence package SHA-256 hash passes deterministic verification.",
            principle: "Observation → Diagnosis → Governance Gate → Authorized Action",
            evidence: [
                  "47 deterministic governance tests",
                  "158 backend test suites",
                  "The governance path blocks the tested remediation workflow unless the required authorization conditions are satisfied"
            ]
      },
      {
            id: "reliability-grounding-validator",
            title: "Empirical Observation Grounding Validator",
            decision: "EVIDENCE GROUNDING CHECK BEFORE ROOT-CAUSE DIAGNOSIS",
            language: "python",
            sourcePath: "backend/app/diagnosis/grounding_validator.py",
            lineRange: "31-52",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadilkhurshid/ai-application-reliability",
            code: "def validate_diagnostic_grounding(\n    diagnosis: AIDiagnosisPayload,\n    recorded_evidence: EvidencePackage\n) -> GroundingValidationResult:\n    \"\"\"\n    Asserts that every line number, symbol, and stack frame cited in the model's\n    root-cause diagnosis exists verbatim in the collected Playwright runtime logs.\n    \"\"\"\n    unsupported_claims = []\n    log_text = recorded_evidence.combined_console_and_network_text\n\n    for claim in diagnosis.cited_evidence_spans:\n        if claim.raw_text not in log_text:\n            unsupported_claims.append(claim.raw_text)\n\n    is_grounded = len(unsupported_claims) == 0\n    return GroundingValidationResult(\n        is_grounded=is_grounded,\n        unsupported_claims=unsupported_claims,\n        grounding_ratio=1.0 - (len(unsupported_claims) / max(1, len(diagnosis.cited_evidence_spans)))\n    )",
            explanation: "Autonomous diagnosticians hallucinate stack traces and plausible-looking bugs when confronted with confusing failure logs. The Grounding Validator forces every cited token and error line to be cross-matched against actual Playwright execution transcripts before the diagnosis can be reviewed.",
            evidence: [
                  "Playwright DOM & trace capture",
                  "Zero-hallucination stack trace auditing",
                  "Empirical log verification"
            ]
      }
]
  },
  {
    id: 'loom-ai',
    slug: 'loom-ai',
    title: 'Loom AI — B2B Textile Marketplace Platform',
    tagline: 'Full-stack B2B marketplace platform with Clean Architecture, Next.js 16, and LangGraph procurement workflows.',
    summary:
      'A full-stack B2B textile sourcing marketplace platform engineered with Next.js 16 (React 19), Express/TypeScript Clean Architecture, MongoDB compound text indexes, and LangGraph procurement workflows with Human-in-the-Loop approval queues.',
    ownershipLabel: 'INDEPENDENT · HACKATHON PROJECT',
    ownershipCategory: 'hackathon',
    type: 'Full-Stack • AI Marketplaces',
    github: 'https://github.com/aadil-lang/loom-ai',
    demo: null,
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
            id: "loom-ai-procurement-workflow",
            title: "AgentGraph Procurement Workflow with Dynamic Clarification Edge",
            decision: "DYNAMIC STATE GRAPH CLARIFICATION BOUNDARY",
            language: "typescript",
            sourcePath: "backend/src/ai/workflows/BuyerProcurementWorkflow.ts",
            lineRange: "33-58",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/loom-ai",
            code: "public build() {\n  const builder = new AgentGraphBuilder<ProcurementState>(procurementStateChannels);\n\n  builder\n    .addNode('analyze_requirements', this.analyzeRequirementsNode.bind(this))\n    .addNode('knowledge_retrieval', this.knowledgeRetrievalNode.bind(this))\n    .addNode('search_marketplace', this.searchMarketplaceNode.bind(this))\n    .addNode('generate_recommendations', this.generateRecommendationsNode.bind(this))\n    .addNode('clarify_requirements', this.clarifyRequirementsNode.bind(this));\n\n  builder.setEntryPoint('analyze_requirements');\n\n  // Conditional Edge: Guard against underspecified procurement requests\n  builder.addConditionalEdges(\n    'analyze_requirements',\n    (state) => {\n      if (state.requirements?.category || state.requirements?.fabricType) {\n        return 'knowledge_retrieval';\n      }\n      return 'clarify_requirements';\n    }\n  );\n\n  builder.addEdge('knowledge_retrieval', 'search_marketplace');\n  builder.addEdge('search_marketplace', 'generate_recommendations');\n  return builder.compile();\n}",
            explanation: "In B2B textile procurement, searching the product catalog with underspecified buyer requirements yields irrelevant supplier matches and wasted database compute. The workflow enforces a conditional branch: if critical parameters (category or fabric type) are missing, execution diverts to clarification before querying the database.",
            evidence: [
                  "Clean Architecture domain separation",
                  "Conditional clarification edge",
                  "Compound MongoDB search"
            ]
      }
]
  },
  {
    id: 'atlas-ai',
    slug: 'atlas-ai',
    title: 'Atlas AI — Financial Copilot & SEC Filing RAG',
    tagline: 'Telegram-native conversational financial copilot with LangGraph orchestration, SEC EDGAR RAG, and proactive alerts.',
    summary:
      'A conversational financial copilot built for Telegram featuring LangGraph orchestration, SEC EDGAR and Finnhub market data integration, Google Gemini Embeddings with MongoDB Atlas Vector Search, and a proactive background alert worker validated by 178 automated tests.',
    ownershipLabel: 'INDEPENDENT · HACKATHON PROJECT',
    ownershipCategory: 'hackathon',
    type: 'Agentic Systems • Financial RAG',
    github: 'https://github.com/aadil-lang/Atlas-AI',
    demo: null,
    technologies: ['LangGraph', 'Python 3.12', 'FastAPI', 'Gemini Embeddings', 'MongoDB Atlas Vector Search', 'SEC EDGAR API', 'Pytest (178 Tests)'],
    problem:
      'Retail investors and analysts lack direct conversational access to primary SEC regulatory filings (10-K, 10-Q, 8-K) and market intelligence, frequently having to manually parse multi-hundred-page disclosures or rely on delayed summaries.',
    solution:
      'I built this system as an independent hackathon project: engineered a Telegram-native conversational copilot powered by a LangGraph state machine, MongoDB Atlas Vector Search, Gemini embeddings, and direct SEC EDGAR / Finnhub API integrations with proactive background alert workers and 178 automated tests.',
    keyFeatures: [
      '178 automated tests passing across graph routing, SEC parser, market data, and alert worker modules in backend/tests/',
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
            id: "atlas-ai-stategraph",
            title: "LangGraph StateGraph Workflow & Conditional Intent Routing",
            decision: "CYCLIC AGENTIC WORKFLOW WITH DETERMINISTIC INTENT DISPATCH",
            language: "python",
            sourcePath: "backend/app/agents/graph.py",
            lineRange: "118-142",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/Atlas-AI",
            code: "def _build_graph(self):\n    builder = StateGraph(AgentState)\n\n    # 1. Register Functional Nodes\n    builder.add_node(\"load_context\", self._load_context_node)\n    builder.add_node(\"route_intent\", self._route_intent_node)\n    builder.add_node(\"company_research_node\", self._company_research_node)\n    builder.add_node(\"market_research_node\", self._market_research_node)\n    builder.add_node(\"document_research_node\", self._document_research_node)\n    builder.add_node(\"synthesis_node\", self._synthesis_node)\n    builder.add_node(\"extract_memory_node\", self._extract_memory_node)\n    builder.add_node(\"finalize_node\", self._finalize_node)\n\n    # 2. Wire Control Flow & Deterministic Routing\n    builder.add_edge(START, \"load_context\")\n    builder.add_edge(\"load_context\", \"route_intent\")\n    builder.add_conditional_edges(\n        \"route_intent\",\n        self._dispatch_intent,\n        {\n            IntentType.COMPANY_RESEARCH: \"company_research_node\",\n            IntentType.MARKET_DATA: \"market_research_node\",\n            IntentType.DOCUMENT_RESEARCH: \"document_research_node\",\n        }\n    )\n    return builder.compile()",
            explanation: "Rather than relying on an autonomous agent with open-ended tool hallucination, Atlas AI uses a compiled LangGraph StateGraph. User inquiries are deterministically classified and routed to dedicated retrieval nodes (e.g. SEC EDGAR filing parser or Atlas Vector Search) before entering response synthesis.",
            evidence: [
                  "178 pytests in complete SEC RAG suite",
                  "StateGraph compiled pipeline",
                  "Direct SEC EDGAR regulatory chunking"
            ]
      },
      {
            id: "atlas-ai-alert-worker",
            title: "Proactive Alert Worker & Market Trigger Poller",
            decision: "BACKGROUND ASYNCHRONOUS VOLATILITY POLLER",
            language: "python",
            sourcePath: "backend/app/jobs/alerts.py",
            lineRange: "45-72",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/Atlas-AI",
            code: "class AlertWorker:\n    \"\"\"\n    Background worker that periodically polls financial, SEC, and news providers\n    to evaluate user alert rules without user initiation.\n    \"\"\"\n    async def evaluate_alert(self, alert: Alert, user_id: str) -> Optional[AlertTriggerResult]:\n        latest_data = await self.financial_provider.get_quote(alert.symbol)\n        if not latest_data:\n            return None\n\n        # Deterministic boundary condition: threshold breach\n        breached = False\n        if alert.condition == \"ABOVE\" and latest_data.price >= alert.target_price:\n            breached = True\n        elif alert.condition == \"BELOW\" and latest_data.price <= alert.target_price:\n            breached = True\n\n        if breached:\n            return AlertTriggerResult(alert=alert, current_price=latest_data.price, triggered_at=datetime.utcnow())\n        return None",
            explanation: "Conversational copilots are typically purely reactive to user prompts. Atlas AI incorporates an asynchronous lifespan AlertWorker that continuously evaluates active price and SEC 8-K filings thresholds, dispatching real-time notifications to Telegram when bounds are breached.",
            evidence: [
                  "Real-time Telegram notifications",
                  "Deterministic boundary evaluation",
                  "SEC 8-K volatility triggers"
            ]
      }
]
  },
  {
    id: 'ask-aadil',
    slug: 'ask-aadil',
    title: 'Ask Aadil — Stateful Retrieval, Source Authority & Controlled Actions',
    tagline:
      'Grounded conversational agent preserving multi-source boundaries, temporal epistemic states, and deterministic human-in-the-loop action execution.',
    summary:
      'A production grounded conversational agent providing conversational access across portfolio layers (Timeline, Journal, Systems, Resume, GitHub, LinkedIn, Profile) without merging them into an undifferentiated knowledge blob. Engineered with stateful entity tracking, epistemic temporal reasoning, editable communication drafts, and strict human authorization gates verified by 172 automated tests.',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    ownershipCategory: 'personal-independent',
    type: 'Grounded Conversational Agent • Stateful Hybrid RAG',
    github: 'https://github.com/aadil-lang/portfolio',
    demo: '/#ask-aadil',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Hybrid Retrieval (Keyword + Semantic)',
      'Deterministic State Machine',
      'Playwright (172 Tests)',
      'Human-in-the-Loop Actions'
    ],
    problem:
      'A normal portfolio exposes information through separate static pages. Ask Aadil needed to provide conversational access across those layers while preserving the critical distinctions between chronology (Timeline), reasoning (Journal), technical evidence (Systems), formal professional records (Resume), code evidence (GitHub), and professional context (LinkedIn). The challenge was not building a generic chatbot, but engineering an agent that knows what it knows, knows what it does not know, knows which source is authoritative, understands whether information is current, and knows what it is actually permitted to execute.',
    solution:
      'I designed and built this system as an integrated personal engineering build: engineered a deterministic state machine, hybrid source-aware retriever, and human-in-the-loop execution pipeline. Sources are strictly kept separate with explicit authority hierarchies. The agent implements temporal epistemic boundaries (July 2026 historical records are never conflated with current status; absence of a corporate employer is never converted into an unemployment claim), a decoupled 3-state LinkedIn adapter boundary, prompt injection defense over retrieved data, and bitwise-exact draft execution without hidden LLM regeneration, validated by 172 automated tests.',
    keyFeatures: [
      '172 automated verifications passing at 100% across multi-turn entity preservation, temporal reasoning, draft integrity, and browser interactions',
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
      'Intent classification, entity resolution, draft preservation across intermediate turns, human confirmation gates before external invocation, and 172 automated test assertions covering prompt injection resistance, session isolation, and provenance citations.',
    evidence: [
      '172 automated tests passing at 100% across unit contracts and Playwright browser E2E execution',
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
            id: "ask-aadil-action-gate",
            title: "Human-in-the-Loop Action Confirmation Boundary",
            decision: "SEPARATION OF DRAFT GENERATION FROM EXTERNAL EXECUTION",
            language: "typescript",
            sourcePath: "lib/rag/askAadilAgent.ts",
            lineRange: "298-326",
            ownership: "BUILT INDEPENDENTLY",
            sourceUrl: "https://github.com/aadil-lang/portfolio",
            code: "// Human-in-the-Loop Gate: Draft was generated and awaiting explicit confirmation\nif (state.confirmationState === 'awaiting_confirmation' && state.editedDraft) {\n  const isExplicitConfirm =\n    lowerQ === 'send it' ||\n    lowerQ === 'yes, send' ||\n    lowerQ === 'confirm' ||\n    lowerQ === 'send the email'\n\n  if (isExplicitConfirm) {\n    state.confirmationState = 'confirmed'\n    const executionInput: AgentDraft = {\n      recipient: state.editedDraft.recipient || structuredProfile.email,\n      subject: state.editedDraft.subject,\n      body: state.editedDraft.body,\n      isEdited: state.editedDraft.isEdited\n    }\n    state.executionResult = {\n      status: 'email_client_opened',\n      emailClientOpened: true,\n      emailSentStatus: 'unknown',\n      executionInput,\n      timestamp: new Date().toISOString()\n    }\n  }\n}",
            explanation: "An LLM request is not equivalent to authorization to perform an external action. The agent drafts communication and enables live user edits, but never triggers the external mailto client without explicit affirmative confirmation. Furthermore, it records emailSentStatus: \"unknown\" to prevent claiming delivery occurred when only a client was opened.",
            principle: "LLM generates proposal; human confirms; client invokes.",
            evidence: [
                  "25 multi-turn agentic tests passing",
                  "132 hardening epistemic assertions",
                  "Deterministic mailto state machine"
            ]
      }
]
  }
]
