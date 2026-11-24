import { Chapter, Epilogue } from '../types'

export const prologue = {
  title: 'Prologue: The Foundations in Mathematics',
  era: '2021 — 2024',
  summary:
    'Before engineering agentic systems, I spent years immersed in the exact logic of mathematics curriculum design, proof structures, and educational taxonomy.',
  quote:
    'In mathematics, a step is either valid or invalid; there is no plausible middle ground. That same intolerance for unverified assumptions became the cornerstone of how I build AI systems.',
  narrative: [
    'My journey began not with prompting language models, but with rigorous mathematical precision. Beginning as a Mathematics Content Developer and Subject Matter Expert, with a Mechanical Engineering background (B.Tech), I authored and curated high-volume K-12 mathematics curricula aligned with Common Core and Texas Essential Knowledge and Skills (TEKS) standards.',
    'I spent thousands of hours deconstructing how concepts are formed, why students make specific calculation errors, and how distractor options must reflect real conceptual misconceptions rather than random numbers.',
    'When large language models emerged, I immediately noticed a fundamental flaw in how the industry approached them: treating stochastic text predictors as authoritative experts. When an LLM generates a math explanation, it mimics the appearance of logic without guaranteeing formal validity.',
    'I realized that true automated intelligence requires combining the generative breadth of language models with the deterministic certainty of mathematical solvers, structured state machines, and continuous verification loops. That conviction began the engineering journey.'
  ]
}

export const chapters: Chapter[] = [
  {
    id: 'vm-copy',
    number: '01',
    title: 'VM Copy Question Generator',
    subtitle: 'From stochastic completion to deterministic verification rules',
    layer: 'Generation',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    timeline: '2025 — 2026',
    context:
      'In high-volume digital assessment publishing, curriculum authors require isomorphic variant questions ("copy questions") based on existing vetted base items. The system was designed to take a base mathematical problem, subject-matter expert (SME) pedagogical guidelines, difficulty level, and optional diagram context, and generate multiple distinct question variants that preserve the exact tested mathematical skill while varying narrative context and numerical parameters.',
    problem:
      'Standard language model completions cannot guarantee structural invariants or mathematical ground truth. In assessment workflows, models frequently output 3 or 5 options instead of exactly 4, mark multiple options or zero options as the correct answer, generate duplicate distractor values under different option labels, or omit the educational rationale explaining why an incorrect choice represents a typical student misconception.',
    solution:
      'Engineered a Next.js (App Router) and React application pairing multi-provider model routing with an in-memory Tier-1 Deterministic Evaluator (`lib/eval-layer.ts`) and parallel micro-batch generation (`calculateBatches`). Every generated question passes through programmatic structural assertions before reaching the frontend, where interactive status badges and an adversarial blind-solve verification loop (`/api/verify`) allow rapid inspection and automated repair.',
    architectureDescription:
      'Input Base Item & SME Notes → Multimodal Vision Pre-Analysis (Single extraction of coordinates and HTML tables) → Parallel Micro-Batch Dispatch (Batches of 2–3 items via Promise.all) → Multi-Model Router (OpenAI, Gemini, NaraRouter) → Tier-1 Deterministic Evaluator (0ms latency, zero API cost) → React UI with Score Badges → Tier-2/3 Adversarial Blind-Solve Verifier (/api/verify).',
    breakthrough:
      'Decoupling generation from validation: rather than prompting the language model to inspect its own work, the system places a zero-cost deterministic TypeScript evaluator outside the model to enforce structural and mathematical invariants.',
    criticalDecision:
      'Implementing Tier-1 structural evaluation as pure in-memory deterministic code rather than invoking an LLM critic. Programmatic checks execute in under 1 millisecond at zero API cost, catching option count mismatches, answer-key corruptions, and duplicate distractors before any human reviewer or secondary model is invoked.',
    whatBroke: [
      {
        failure: 'Duplicate Distractor Options',
        cause: 'Stochastic numerical variation collapsed two distinct distractor formulas into identical numerical values.',
        detection: 'Tier-1 evaluator normalized option strings with trim() and toLowerCase() inside a Set accumulator.',
        response: 'Flagged duplicate text explicitly, deducted 20 points from quality score, and prompted SME correction.'
      },
      {
        failure: 'Answer Key Invariant Violation',
        cause: 'Model failed to tag any option with logic "CA", or tagged multiple options as correct answers simultaneously.',
        detection: 'Evaluator filtered options by logic === "CA" and asserted an exact cardinality of 1.',
        response: 'Deducted 30–35 points, alerted reviewer that answer key was broken, and prevented automatic publishing.'
      },
      {
        failure: 'Serverless Gateway Timeouts',
        cause: 'Generating 8–10 questions sequentially in a single completion exceeded serverless execution limits (30 seconds).',
        detection: 'Vercel / Next.js API route timeout aborts during multi-item batch creation.',
        response: 'Implemented calculateBatches() to partition generation into parallel micro-batches of at most 2–3 questions via Promise.all().'
      }
    ],
    whatBecameDeterministic:
      'Option cardinality (asserting exactly 4 options), Correct Answer exclusivity (asserting exactly one option has logic "CA"), duplicate option detection via case-insensitive Set checks, non-empty distractor rationale validation, step-by-step solution formatting checks ("Step 1"), and regex compliance for SME formatting rules (e.g. mixed numbers regex /^\\d+\\s+\\d+\\/\\d+$/).',
    evidenceAndMetrics: [
      'Verified implementation in lib/eval-layer.ts, app/api/generate/route.ts, and app/api/verify/route.ts',
      '0ms execution latency and $0 marginal API spend for Tier-1 structural evaluation (lib/eval-layer.ts; applies strictly to deterministic evaluation, not model generation)',
      'Parallel micro-batching bounding batch generation latency to 4–8 seconds regardless of item count',
      'Upgraded Next.js to 16.0.7 in commit 6354610 to patch security vulnerability CVE-2025-66478',
      'Quality enforced via static TypeScript 5 typechecks, ESLint 9, and runtime assertion guardrails (pure deterministic code; no offline Jest/Vitest test runner)'
    ],
    tradeoffs: [
      'Strict deterministic scoring flags edge cases that might be pedagogically acceptable, requiring human-in-the-loop overrides in the UI.',
      'Parallel micro-batch generation increases short-burst API concurrency against provider rate limits in exchange for eliminating gateway timeouts.',
      'Heuristic regex rules enforce formatting (e.g. mixed numbers) cleanly, but do not replace a full computer algebra system (CAS).'
    ],
    failuresAndTradeoffs: [
      'Early prompts attempted to let the LLM check its own math in a single pass; this failed repeatedly because the model hallucinates consistent explanations for incorrect values.',
      'Decoupled generation from validation: all structural properties are checked by pure code functions, rejecting defective questions instantly.',
      'Parallel batching partitions generation into concurrent chunks of 2–3 questions, preventing serverless gateway timeouts.'
    ],
    accumulatedCapability:
      'Discovered that generative models cannot be trusted with structural or mathematical invariants. Established the core pattern of placing deterministic code boundaries between probabilistic outputs and downstream users.',
    technologies: ['Next.js App Router', 'React', 'TypeScript 5', 'Tailwind CSS', 'OpenAI SDK', 'Google Generative AI', 'DOMPurify'],
    slug: 'vm-copy'
  },
  {
    id: 'ai-worksheets',
    number: '02',
    title: 'AI Worksheets Product POC',
    subtitle: 'Dual-pipeline educational platform pairing multi-model AI routing with physical compilers and game graph solvers',
    layer: 'Applications & Physical Compilers',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    timeline: 'Early 2026',
    context:
      'Teachers spend 3–5 hours per week manually creating worksheets and practice materials. Existing generation tools suffer from three critical flaws: generic questions that lack specific curriculum alignment (e.g. TEKS subskills), an absence of gamified formats (creating crosswords or mazes requires manual graphic design), and fragmented tooling. Developed as a company proof of concept under the working title Wayground AI Worksheets (documented in the March 2026 Leadership Brief), this project explored whether generative AI could automate curriculum-aligned worksheet production across two distinct paradigms: Formal Question Worksheets with technical diagrams, and Gamified Activity Worksheets (Crosswords and Maze Trails). The POC observed a reduction in worksheet creation time from an estimated ~2-hour manual teacher baseline to ~3 minutes of automated end-to-end pipeline execution.',
    problem:
      'Generating a usable mathematical worksheet is not merely an LLM text-generation problem. First, commercial diffusion models cannot render mathematically valid visuals: coordinate axes lack scale precision, geometric angles are hallucinated, and labels are illegible. Second, language models cannot directly construct valid 2D crossword grids or maze graphs: they hallucinate character intersections, generate words that physically collide, and create maze paths with disconnected dead ends. Third, raw model generation frequently leaks answer words into clues. Producing classroom-ready materials required solving both physical document rendering and 2D spatial puzzle layout.',
    solution:
      'I independently built a full-stack dual-pipeline architecture: a React 18 / Vite 6 frontend with real-time KaTeX preview, backed by an asynchronous FastAPI backend (Python 3.12) coordinating multi-model routing (Portkey GPT-4o for questions, Google Gemini Flash for TikZ, and GPT-5.2 for gamified activities). For Formal Worksheets, Gemini generates standalone LaTeX/TikZ code compiled via headless TeX Live (pdflatex) and Poppler (pdftoppm at 300 DPI) with MD5 content-hashed caching. For Gamified Worksheets, a 3-prompt pipeline (Generate → Verify → Validate) feeds custom deterministic algorithms: an algorithmic 2D crossword backtracking solver with 1.4x candidate over-generation, and a honeycomb hexagonal maze engine using DFS path carving with arithmetic mistake distractor models. Both pipelines export to printable PDFs (via WeasyPrint and ReportLab) and interactive student web apps.',
    architectureDescription:
      'Dual-Pipeline Architecture: Teacher Config (TEKS Standard + Subskill) → FastAPI Async Gateway → [1. Formal Pipeline: Portkey/GPT-4o Question Gen → Gemini Flash TikZ Code → Headless TeX Live Subprocess Pool (pdflatex + pdftoppm 300 DPI) with MD5 Cache → WeasyPrint Paged PDF] | [2. Gamified Pipeline: GPT-5.2 3-Prompt Clue Gen & Verification → Deterministic 2D Crossword Backtracking Solver & Honeycomb Hex Maze DFS Engine → ReportLab Vector PDF] → React 18 / Vite 6 Interactive Student Player.',
    breakthrough:
      'Treating diagrammatic and game layout not as prompting challenges, but as compiler and graph-theory problems. The language model is restricted to proposing candidate text, formulas, and structural markup; physical diagram rendering is delegated to TeX Live (pdflatex), 2D word intersection is solved via deterministic backtracking, and maze navigability is guaranteed via depth-first search.',
    criticalDecision:
      'Establishing a strict boundary between semantic generation and physical artifact construction. The LLM is never trusted to arrange pixels or calculate 2D spatial coordinates. By routing diagrams through LaTeX/TikZ compilation and puzzles through deterministic Python layout solvers, visual hallucinations and unsolvable puzzle boards were mathematically eliminated from the output.',
    whatBroke: [
      {
        failure: 'TikZ Subprocess Compilation Aborts',
        cause: 'Language model wrapped LaTeX in markdown code fences or emitted unsupported CTAN package calls, causing pdflatex to exit with non-zero syntax errors.',
        detection: '_run_pdflatex checked subprocess returncode != 0 and verified image.pdf existence.',
        response: 'Implemented _clean_latex_output to extract text strictly between \\documentclass and \\end{document}, combined with a 30s timeout and graceful fallback to text-only questions.'
      },
      {
        failure: 'Crossword Grid Placement Deadlocks',
        cause: 'Candidate word pools lacked sufficient shared intersecting letters for dense 13x13 or 15x15 grids, causing backtracking to exhaust candidate slots.',
        detection: 'Grid builder failed to place minimum target word threshold within candidate iterations.',
        response: 'Implemented a 1.4x intelligent over-generation multiplier, scored candidate placements by center proximity and intersection count, and added randomized restart attempts.'
      },
      {
        failure: 'Maze Outer-Edge Disconnection',
        cause: 'Unconstrained random walks on the honeycomb hex grid frequently terminated in internal hexagons, leaving the START or FINISH cell surrounded by untraversable hexagons.',
        detection: 'Graph perimeter assertion failed (_is_edge check).',
        response: 'Enforced DFS backtracking path carving requiring the terminal node to anchor strictly on outer grid perimeter cells.'
      },
      {
        failure: 'Pedagogical Clue Answer Leaks',
        cause: 'Single-prompt generation occasionally included the solution word within the question clue prose (e.g. "What is an acute angle?").',
        detection: 'Secondary LLM verifier executed an adversarial 4-point pedagogical checklist checking for root and stem matches.',
        response: 'Added an automated verification prompt pass that discards leaked clues before grid ingestion.'
      }
    ],
    whatBecameDeterministic:
      'Visual diagram rendering (executed by headless pdflatex and Poppler), 2D crossword coordinate placement and collision rules (_can_place in builder.py), honeycomb hexagonal maze graph carving (DFS with edge termination), arithmetic distractor generation (_mistake_distractors modeling real student errors), content-hashed asset caching via MD5 digests, and PDF document layout compilation.',
    evidenceAndMetrics: [
      'Documented creation time reduction in AI_Worksheets_POC_Leadership_Brief.md (March 2026): manual teacher preparation baseline of ~2 hours vs ~3-minute automated POC pipeline execution (operational comparison, not an apples-to-apples benchmark)',
      'Dual-pipeline implementation verified in backend/app/services/formal_worksheet/tikz_images.py and gamification/ (crossword_pipeline & maze_trail)',
      'Headless TeX Live and Poppler compilation producing 300-DPI high-resolution mathematical figures',
      'MD5 content-hashed caching yielding 0ms compilation latency on repeated diagram contexts',
      'Dual export engines: WeasyPrint for CSS Paged Media formal sheets and ReportLab for crossword puzzles',
      'Deterministic honeycomb hex maze engine with mistake-based distractor generation in maze_trail/builder.py',
      'Quality enforced via Pydantic v2 schemas and compiler exit codes (verification is runtime/algorithmic; no committed offline pytest/vitest suites)'
    ],
    tradeoffs: [
      'Hosting TeX Live and Poppler system binaries increases container image size (~1.2 GB) in exchange for textbook-grade mathematical geometry.',
      '1.4x candidate over-generation in crossword pipelines incurs extra initial LLM token expenditure to guarantee algorithmic grid placement success.',
      'DFS maze path generation with mistake distractors requires multiple graph validation passes, trading milliseconds of CPU time for guaranteed puzzle solvability.',
      'Headless WeasyPrint PDF compilation takes 1.5–3 seconds per document, which is managed via asynchronous export routes.'
    ],
    failuresAndTradeoffs: [
      'Direct image generation from diffusion models produced distorted coordinate grids and illegible mathematical figures.',
      'Replacing image models with Gemini TikZ generation and headless pdflatex compilation eliminated visual hallucinations.',
      'Requiring TeX Live and Poppler system binaries in Docker images increased deployment footprint in exchange for guaranteed diagram precision.'
    ],
    accumulatedCapability:
      'Expanded from pure text generation into physical artifact compilation and algorithmic layout engines. Established the core pattern of pairing generative candidate drafting with deterministic system compilers (TeX Live) and graph solvers (backtracking crosswords and DFS mazes), proving that reliable AI products require deterministic software boundaries.',
    technologies: ['FastAPI', 'Python 3.12', 'React 18', 'Vite 6', 'TeX Live (pdflatex)', 'Poppler', 'WeasyPrint', 'ReportLab', 'Portkey', 'PostgreSQL 16', 'Redis 7'],
    slug: 'ai-worksheets'
  },
  {
    id: 'math-item-bank',
    number: '03',
    title: 'US Mathematics Item Bank Generation Pipeline',
    subtitle: 'Domain-based mathematical image generation, TikZ/SVG compilation, and pipeline stabilization',
    layer: 'Mathematical Artifact Generation',
    ownershipLabel: 'WAYGROUND · TEAM PROJECT',
    timeline: 'Parallel with AI Worksheets',
    statusNotice:
      'This system was developed as part of a company team. The implementation repository is not part of my personal source archive, so this chapter describes the engineering work and system concepts I contributed to rather than presenting the complete codebase as my individual work.',
    context:
      'The US Mathematics Item Bank was a larger company system for generating mathematics assessment items aligned to the requirements of different US states, grade levels, and mathematical skills. My work within the system focused heavily on a problem that became increasingly important as AI-generated questions became more visually complex: How do you reliably generate mathematical images that actually represent the mathematical intent of an assessment item? This work happened in parallel with the AI Worksheets project, exposing the same underlying question from a different angle: If AI generates a mathematical artifact, how do we decide what representation to use and whether the resulting artifact is actually usable?',
    problem:
      'At first glance, the problem appears simple: Question → LLM → Mathematical Image. In practice, that abstraction breaks down because a mathematical image has semantics. Geometry diagrams, coordinate graphs, number lines, and fraction models require fundamentally different visual structures and rendering pipelines. Asking a model to simply "generate an image" causes representation failures, uncompilable code, and visual drift where the diagram contradicts the mathematical intent of the assessment item.',
    solution:
      'I shifted the engineering approach from generic image generation to domain-aware mathematical artifact generation: Mathematical Intent → Visual Domain Identification → Representation Selection (Geometry → SVG; Graphs/Number Lines → TikZ) → Generated Artifact → Two-Tier Evaluation (Code-level TikZ compilation check + visual-level vision evaluation) → Acceptance. I expanded this across image-based answer options, stabilized the Upper Elementary generation pipeline, and implemented new open-ended question formats across Middle School and Upper Elementary for different US states.',
    architectureDescription:
      'Item Generation → Mathematical Intent → Prompt Engineering → Domain Identification [Geometry → SVG | Graphs & Number Lines → TikZ] → Generated Artifact → Two-Tier Evaluation [Code-Level TikZ Compile Check + Visual-Level Vision Check] → Accepted Assessment Artifact (or Rejection / Iteration).',
    breakthrough:
      'Separating code validation from visual validation: realizing that valid code is not necessarily a valid mathematical artifact. A TikZ script may compile cleanly yet produce a geometrically inaccurate diagram. Implementing both deterministic compilation checks and visual vision checks ensured mathematical correctness before an image could become an item visual or answer option.',
    criticalDecision:
      'The central decision was to stop treating mathematical image generation as a single generic AI task. Instead, mathematical intent should determine representation, and generated representations should be evaluated before becoming assessment artifacts. This established three explicit boundaries: Domain (what mathematical object is this?), Representation (is SVG or TikZ appropriate?), and Artifact (did the compilation and rendering produce an accurate, usable mathematical visual?).',
    whatBroke: [
      {
        failure: 'Representation Failure',
        cause: 'The model generated technically valid code but used an inappropriate representation for the mathematical concept (e.g. attempting coordinate geometry with unsuitable raster primitives).',
        detection: 'Domain mismatch during schema ingestion.',
        response: 'Engineered domain-based routing directing geometry to SVG and coordinate graphs/number lines to TikZ.'
      },
      {
        failure: 'TikZ Compilation Failure',
        cause: 'Generated TikZ code contained syntax errors, missing packages, or unparseable coordinate macros that caused compiler aborts.',
        detection: 'Automated pdflatex compiler non-zero exit code.',
        response: 'Introduced code-level compilation evaluation gates; uncompilable code is rejected before visual rendering.'
      },
      {
        failure: 'Visual-Semantic Failure',
        cause: 'Even when code compiled cleanly, the resulting image failed to communicate the intended mathematics (e.g., number line ticks did not correspond to problem fractions).',
        detection: 'Rendered visual-level vision evaluation against mathematical prompt specifications.',
        response: 'Enforced two-tier evaluation requiring rendered images to pass visual inspection before acceptance as question or option artifacts.'
      },
      {
        failure: 'Upper Elementary Pipeline Instability',
        cause: 'Prompts designed for general mathematics caused inappropriate complexity or format divergence when applied to younger grades.',
        detection: 'Format rejection and age-appropriateness drift in pipeline batches.',
        response: 'Stabilized Upper Elementary pipeline with specialized prompt blueprints and constrained generation boundaries.'
      }
    ],
    whatBecameDeterministic:
      'Domain routing rules (Geometry → SVG; Graphs/Number lines → TikZ), TikZ compilation evaluation gates, code syntax validation, and acceptance/rejection criteria. While LLMs generated candidate code and descriptions, the representation routing, compiler verification, and visual evaluation gates were governed by deterministic engineering mechanisms.',
    evidenceAndMetrics: [
      'Documented engineering contribution record within an enterprise team-authored US assessment item generation system',
      'My documented contribution: domain-based representation routing (SVG vs TikZ), prompt engineering, TikZ compile evaluation, vision-based image evaluation, and Upper Elementary pipeline stabilization',
      'Open-ended question-type implementation for Middle School and Upper Elementary across multiple US-state standards',
      'Image-based answer option generation and option-image correctness evaluation pipeline',
      'Forensic status: TEAM_PROJECT / SOURCE_UNAVAILABLE (enterprise team repository maintained within company environment; not in personal source archive)'
    ],
    tradeoffs: [
      'LLM flexibility vs deterministic constraints: Unconstrained models provide creative variety, but deterministic domain routing and compiler gates were required to ensure reproducible assessment validity.',
      'SVG vs TikZ: Rather than forcing a single graphical representation onto all visuals, domain-based routing selected the optimal rendering engine for geometry versus coordinate graphs.',
      'Code validation vs visual validation: Compilation verifies that an image can physically render; visual evaluation verifies that the rendering faithfully depicts the intended mathematical semantics.',
      'Prompt complexity vs generality: Specialized prompts for Upper Elementary and Middle School improved control, requiring iterative prompt engineering over one universal generator.'
    ],
    failuresAndTradeoffs: [
      'Generated code could not be treated as a finished artifact; compilation failure required automated compile-level filtering.',
      'Valid compilation did not guarantee semantic correctness, requiring visual inspection before images could serve as answer options.',
      'Balancing prompt specialization across Upper Elementary and Middle School required dedicated prompt engineering and pipeline stabilization.'
    ],
    accumulatedCapability:
      'Marked the realization that AI generation is only one stage of a complete systems problem. Established the core pattern of pairing generative candidate production with domain routing, compiler validation, and multi-tier artifact evaluation—a methodology directly refined in AI Worksheets and later independent projects.',
    technologies: ['TikZ / LaTeX', 'SVG Generation', 'Domain Routing', 'Vision Evaluation', 'Prompt Engineering', 'Compile-Level Validation'],
    slug: 'math-item-bank'
  },
  {
    id: 'curriculum-etl',
    number: '04',
    title: 'Curriculum Transformation Engine',
    subtitle: 'High-throughput Map-Reduce ETL with dynamic schema contracts',
    layer: 'Scale',
    ownershipLabel: 'WAYGROUND · INDEPENDENT BUILD',
    timeline: 'Mid 2026',
    context:
      'Enterprise education platforms must ingest, normalize, and audit educational standards across dozens of distinct state frameworks (e.g. Texas TEKS, California, Common Core) and international curricula. Source documents arrive in heterogeneous, unstructured formats: multi-column PDF standards, nested DOCX tables, RTF syllabi, and state department of education web pages.',
    problem:
      'Traditional ETL systems rely on brittle, hand-crafted regex scrapers and layout-specific parsers. Because every state and country formats its curriculum taxonomy differently (varying hierarchy depths from L1 to L5, differing grade band naming, and inconsistent standard codes), maintaining custom scrapers across 50 states was an unmaintainable operational dead end.',
    solution:
      'Engineered a scalable, document-to-CSV transformation agent (`Curriculum-Transformation`) utilizing **Dynamic Schema Derivation**: an approved sample CSV is ingested as a programmatic contract, dynamically compiling target Pydantic models at runtime. The engine parses documents using PDF parsers and Playwright-backed headless scraping (`Crawl4AI`), extracts content concurrently via `ThreadPoolExecutor`, processes rows through a merged evaluate-and-fix review pass, enforces deterministic programmatic row guards, and concludes with an adversarial post-extraction CSV audit (`csv_audit.py`).',
    architectureDescription:
      'Heterogeneous Source Ingestion (PDF, DOCX, Web via Crawl4AI/Playwright) → Dynamic Contract Engine (Sample CSV derived schema & column rules) → Concurrent Chunk Extractor (ThreadPoolExecutor + Claude 3.5 Sonnet / Gemini Flash) → Transformation Reviewer (Merged evaluate-and-fix LLM pass) → Programmatic Row Guards (Grade bucket normalization & blank column enforcement) → Adversarial Source CSV Audit Agent (csv_audit.py) → S3 Persistence.',
    breakthrough:
      'Dynamic Schema Derivation: eliminating layout-specific scrapers by using an approved sample CSV as a dynamic transformation contract that compiles validation schemas and formatting invariants on the fly.',
    criticalDecision:
      'Merging the transformation evaluation and critic passes into a single evaluate-and-fix LLM call (`EvaluateAndFixResult`). In early revisions, separate evaluator and critic passes doubled latency and token spend while causing provider 5xx deadlocks. Merging them cut verification API calls by 50% while preserving strict defect detection.',
    whatBroke: [
      {
        failure: 'Provider 5xx Hanging & Rate Limit Deadlocks',
        cause: 'Running separate reviewer and critic LLM passes across concurrent chunk batches saturated API quotas.',
        detection: 'Batch runner logged provider 504 gateway timeouts and worker stalls.',
        response: 'Commit 252d06f merged reviewer and critic into a single evaluate-and-fix pass, cutting API calls in half.'
      },
      {
        failure: 'Model Saturation During Batch Review',
        cause: 'Default review batch sizes of 20 rows exceeded context processing efficiency during multi-level hierarchy evaluations.',
        detection: 'Incomplete review verdicts and intermittent timeouts.',
        response: 'Commit fd0260d reduced default review batch size from 20 to 10 rows.'
      },
      {
        failure: 'Over-Extraction into Reserved Blank Columns',
        cause: 'Language model hallucinated standard codes into optional columns (e.g. czi_standard_code) that state export specs mandated must remain strictly empty.',
        detection: 'Sample contract verification detected non-empty values in draft columns.',
        response: 'Commit 1c8ad37 and f88b3d3 implemented deterministic row guards (apply_row_guards) programmatically wiping reserved columns.'
      },
      {
        failure: 'Cloudflare Anti-Bot Blocking on Web Ingestion',
        cause: 'State department of education websites intercepted standard Python HTTP requests with JavaScript challenges.',
        detection: 'HTTP 403 Forbidden challenge responses during curriculum crawling.',
        response: 'Integrated Crawl4AI backed by headless Playwright Chromium, executing JavaScript challenges before extracting DOM text.'
      }
    ],
    whatBecameDeterministic:
      'Runtime Pydantic schema compilation from sample CSV headers, canonical 3-bucket grade level normalization (Elementary School, Middle School, High School), enforced blanking of reserved tracking columns (DRAFT_ALWAYS_BLANK_COLUMNS), and programmatic post-extraction CSV defect audits against source text slices.',
    evidenceAndMetrics: [
      'Verified implementation in batch_runner.py, pipeline.py, schemas.py, and csv_audit.py',
      'Dynamic schema derivation successfully verified across diverse standards (Texas, California, Australia)',
      'Git commit history across July 2026 (Aadil <aadil@quizizz.com>) documenting 12+ architectural hardening milestones',
      'Resolution of truncated portfolio phrase "dynamic schema derivation wit" to "dynamic schema derivation with 3-tier integrity gates"',
      'Quality enforced via runtime Pydantic validation, deterministic row guards, and adversarial CSV auditing (no offline test suites)'
    ],
    tradeoffs: [
      'Dynamic schema contracts trade specialized manual layout tuning for universal adaptability across multi-state formats.',
      'Merging the reviewer and critic stages saved 50% on API costs but required more complex prompt logic to maintain critical evaluation standards.',
      'Running full adversarial CSV audits across thousands of rows adds post-processing latency, making the final audit step an opt-in flag.'
    ],
    failuresAndTradeoffs: [
      'Running separate reviewer and critic stages doubled API latency and caused provider rate limit stalls.',
      'Merged review and critic into a single evaluate-and-fix pass, cutting API spend by 50% while resolving worker deadlocks.',
      'Programmatic row guards were required outside the model because prompt instructions alone could not prevent models from populating reserved blank columns.'
    ],
    accumulatedCapability:
      'Mastered high-throughput data engineering at scale. Moved from generating individual educational items to building industrial ETL pipelines governed by dynamic schema contracts and adversarial auditing.',
    technologies: ['Python 3.12', 'FastAPI', 'Claude 3.5 Sonnet', 'Crawl4AI', 'Playwright', 'ThreadPoolExecutor', 'Pydantic v2', 'S3 / MinIO'],
    slug: 'curriculum-etl'
  },
  {
    id: 'design-automation',
    number: '05',
    title: 'Engineering Design Automation',
    subtitle: 'Hybrid AI requirement interpretation with deterministic physical solvers',
    layer: 'Deterministic Engineering',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    timeline: 'Late 2026',
    context:
      'Grounded directly in my formal academic qualification (B.Tech in Mechanical Engineering), this system addresses the application of AI to safety-critical physical engineering. The system automates the preliminary sizing, material resolution, parametric CAD modeling, and manufacturing drawing derivation of power transmission shafts.',
    problem:
      'Language models cannot perform physical calculations, stress tensor evaluations, or geometric modeling. A language model tasked with sizing a mechanical shaft will round numbers unpredictably, hallucinate material yield strengths, and emit unphysical dimensions. In mechanical engineering, an undersized shaft or an inaccurate safety factor causes fatigue failure, machinery breakdown, and life-safety hazards.',
    solution:
      'Engineered an architectural separation where the language model is restricted strictly to interpreting natural-language design briefs and extracting engineering parameters with character-span provenance. All physical and geometric computation is delegated to deterministic engineering software: a closed-form Saint-Venant shaft torsion solver, von Mises distortion-energy shear yield calculations ($S_{sy} = 0.57735 \\cdot S_y$), an authoritative Material Knowledge Base (EN 10025-2, ASTM), an ISO metric nominal diameter quantization policy, an OpenCascade BRep CAD kernel, and an automated CAD-to-drawing dimensional cross-validation matrix.',
    architectureDescription:
      'Natural Language Brief → Semantic Requirement Extractor (character-span provenance) → Material Knowledge Base (deterministic EN/ASTM tables; blocks generic steel) → Closed-Form Mechanical Torsion Solver (Torque, von Mises, d_min) → Nominal Metric Diameter Sizing Policy (standard series quantization) → OpenCascade BRep CAD Kernel (ISO-10303-21 STEP) → Orthographic 2D SVG Drawing Engine → Automated Dimensional Cross-Validation Matrix (100% agreement audit).',
    breakthrough:
      'CAD ↔ Technical Drawing Dimensional Cross-Validation: the system programmatically interrogates both the 3D OpenCascade BRep solid model and the 2D orthographic SVG drawing dimensions, asserting a 100% agreement matrix before releasing the engineering handoff package.',
    criticalDecision:
      'Excluding language models entirely from engineering arithmetic, stress analysis, and geometric synthesis. The model acts purely as a semantic interpreter; physical formulas and OpenCascade BRep geometry are executed by deterministic Python classes verified by 330+ automated test cases.',
    whatBroke: [
      {
        failure: 'Generic Material Designation Hallucination',
        cause: 'Prompts specifying "steel" or "aluminum" without an exact grade caused models to assume unverified yield strengths.',
        detection: 'MaterialKnowledgeBase lookup rejected generic designations without exact alloy specifications.',
        response: 'Status transitioned strictly to BLOCKED, halting execution until the user supplied an exact grade (e.g. AISI 1045) or explicit override.'
      },
      {
        failure: 'Continuous Theoretical Sizing vs Stock Manufacturability',
        cause: 'Closed-form mechanical equations calculate exact continuous diameters (e.g. 15.52 mm) that are non-standard and costly to machine.',
        detection: 'Design specification validator evaluated diameter against standard industrial stock.',
        response: 'Engineered NominalDiameterPolicy to quantize diameters to standard ISO metric bar stock ([10, 12, 14, 16, 18, 20...]), verifying FoS >= target.'
      },
      {
        failure: 'CAD-Drawing Parity Discrepancies',
        cause: 'Drawing dimension callouts drifting from underlying 3D solid model dimensions during parametric updates.',
        detection: 'Automated dimensional cross-validation matrix compared drawing annotations against BRep bounding-box geometry.',
        response: 'Asserted 0 discrepancies (100% parity); halted handoff export if any dimensional mismatch was detected.'
      }
    ],
    whatBecameDeterministic:
      'Mechanical torque and stress equations ($T = P/\\omega$, $S_{sy} = 0.57735 \\cdot S_y$), metallurgical property resolution (EN 10025-2, ASTM A29), standard metric diameter series quantization, 3D OpenCascade BRep solid cylinder synthesis ($0.0000\\%$ volume error against theoretical $V = \\pi r^2 L$), and 2D drawing projection math.',
    evidenceAndMetrics: [
      '330+ passing automated tests across 22 test suites in src/tests/',
      'Author formal qualification verified: B.Tech in Mechanical Engineering (commits c031bfd, 4945aa9)',
      '0.0000% relative error verified between BRep solid volume and analytical formula in test_cad.py',
      '100% agreement verified in CAD ↔ 2D drawing dimensional cross-validation matrix',
      'Sub-500ms end-to-end execution latency for requirement parsing, closed-form solving, STEP generation, and SVG drafting',
      'Software analytical validation only; does not imply physical prototyping, machine safety certification, ASME code compliance, or production engineering approval'
    ],
    tradeoffs: [
      'Closed-form analytical equations provide instant, verified sizing for shaft torsion and bending, but do not replace full continuous-domain Finite Element Analysis (FEA) or physical testing.',
      'Fail-fast blocking on generic material designations halts execution when information is ambiguous, prioritizing engineering safety over conversational convenience.',
      'Focusing on single transmission shaft components and bolted joints establishes a robust vertical slice, with multi-body gear train assemblies reserved for future roadmap.'
    ],
    failuresAndTradeoffs: [
      'Allowing models to infer material properties caused dangerous yield-strength hallucinations.',
      'Enforced fail-fast blocking: if material properties are unresolved, execution strictly blocks and demands validated catalog entries.',
      'Sizing continuous theoretical diameters created unmanufacturable components, resolved by standard metric series quantization.'
    ],
    accumulatedCapability:
      'Reconnected formal mechanical engineering training with AI systems engineering. Proved that in safety-critical physical domains, AI must be strictly subordinated to deterministic mathematical and geometric software.',
    technologies: ['Python 3.12', 'FastAPI', 'OpenCascade / CadQuery', 'BRep Geometry', 'ISO-10303-21 STEP', 'SVG Engine', 'Pydantic v2', 'Pytest (330+ Tests)'],
    slug: 'design-automation'
  },
  {
    id: 'ai-reliability',
    number: '06',
    title: 'AI Application Reliability & Browser QA',
    subtitle: 'Local-first browser agents, predictive uncertainty calibration, and the MCP control plane',
    layer: 'Reliability',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    timeline: 'Culmination',
    context:
      'As AI systems take on complex operational responsibilities, verifying their runtime behavior becomes paramount. The AI Engineering Lab was built as a local-first engineering reliability platform that explores, tests, and diagnoses web applications using real browser automation, deterministic behavioral contracts, local reasoning models, and cryptographic provenance.',
    problem:
      'Modern web and AI applications suffer from non-deterministic failures, layout shifts, prompt regressions, and semantic drift. Traditional end-to-end test scripts break on minor CSS changes and lack diagnostic intelligence, while unregulated AI coding agents hallucinate root causes, execute unverified code patches directly in production, and operate without auditable provenance.',
    solution:
      'Engineered a closed-loop reliability platform powered by local reasoning models (Ollama Qwen 2.5 Coder) and Playwright headless Chromium. The system drives real browser sessions, captures multi-modal evidence on disk (DOM snapshots, PNG screenshots, network HAR traces, console logs), evaluates deterministic behavioral contracts, derives diagnostic hypotheses, quantifies uncertainty using Fisher Information covariance lower bounds (forcing abstention when uncertainty is high), enforces a mandatory human governance authorization gate before any remediation, and seals all events in an append-only SHA-256 cryptographic provenance chain.',
    architectureDescription:
      'Target Application (Live Next.js VM Copy on port 3000) → Playwright Runner Engine (Headless Chromium DOM, PNG, HAR, logs) → Deterministic Contract Evaluators (4 options, single CA) → AI Root Cause Diagnosis Engine (Local Qwen 2.5 via Ollama + SQLite Engineering Memory) → Fisher Covariance Uncertainty Engine (high uncertainty → ABSTAIN) → Mandatory Human Governance Gate (4 risk tiers; agents barred from unilaterally applying changes) → Independent Retest → SHA-256 Cryptographic Provenance Chain.',
    breakthrough:
      'Mathematical Uncertainty Quantification & Mandatory Human Governance: The system calculates empirical Fisher Information parameter covariance. When diagnostic uncertainty exceeds safe thresholds, the agent returns an explicit ABSTAIN verdict instead of guessing. Consequential code alterations require mandatory human authorization; autonomous agents are barred from unilaterally modifying source code or approving pull requests.',
    criticalDecision:
      'Dogfooding Project 01 (VM Copy Question Generator) as a live production test target. The reliability platform binds directly to the running Next.js application on port 3000 (`test_dogfooding_question_generator.py`), driving its UI, evaluating its 4-option and single-CA contracts, and verifying human authorization boundaries, bringing the entire portfolio narrative full circle.',
    whatBroke: [
      {
        failure: 'Flaky Browser Interception & Hydration Delays',
        cause: 'Rapid automated Playwright clicks failed during React 19 hydration cycles.',
        detection: 'Playwright locator timeout exceptions and click-intercepted errors.',
        response: 'Implemented dynamic wait-for-selector timeouts and element stability checks before dispatching interaction events.'
      },
      {
        failure: 'Diagnostic Hallucination on Ambiguous Logs',
        cause: 'Reasoning model proposed speculative code patches when presented with noisy stack traces lacking direct error lines.',
        detection: 'Fisher information covariance matrix exceeded uncertainty threshold.',
        response: 'Triggered automated abstention (Decision: ABSTAIN), halting automated remediation and flagging the trace for human investigation.'
      },
      {
        failure: 'Attempted Autonomous Privilege Escalation',
        cause: 'Agent tools attempting to apply patches or update codebases without human approval.',
        detection: 'ChangeAuthorizationService asserted cryptographic human approval token existence.',
        response: 'Deterministically rejected invocation with HTTP 403 Forbidden; enforced that only human roles can authorize changes.'
      },
      {
        failure: 'Cryptographic Provenance Chain Tampering',
        cause: 'Corrupted or reordered intermediate event records during test run crash.',
        detection: 'verify_provenance_chain recomputed SHA-256 event hashes back to genesis.',
        response: 'Flagged chain verification failure and invalidated campaign run integrity.'
      }
    ],
    whatBecameDeterministic:
      'Playwright browser interaction facts (real DOM and screenshots), behavioral contract assertions (4 options, single CA), Fisher uncertainty threshold calculation, the human governance approval gate, and the SHA-256 cryptographic event ledger.',
    evidenceAndMetrics: [
      '215+ passing automated tests across 58 test files in backend/tests/',
      'Direct dogfooding integration verified in backend/tests/test_dogfooding_question_generator.py',
      'Model Context Protocol (MCP) tool integration verified across test_mcp_architecture.py and test_mcp_tools.py',
      'Mathematical uncertainty quantification verified via Fisher information covariance matrix lower bounds in test_uncertainty_evaluation.py',
      'Cryptographic SHA-256 event provenance chain verified back to genesis in test_slice_8l_engineering_provenance.py',
      '100% local-first privacy: runs completely offline using local Playwright and local Ollama inference'
    ],
    tradeoffs: [
      'Local-first execution (local Ollama and SQLite) ensures complete data privacy and zero API spend, but requires sufficient local hardware resources.',
      'Mandatory human governance gates prevent runaway autonomous code modifications, trading raw speed for operational safety.',
      'Strict Fisher covariance abstention prevents destructive hallucinations, prioritizing correctness over speculative self-healing.'
    ],
    failuresAndTradeoffs: [
      'Language models presented with noisy telemetry hallucinated speculative root-cause diagnoses.',
      'Introduced Fisher Information covariance uncertainty modeling: if parameter uncertainty exceeds threshold, the system strictly abstains from action.',
      'Prevented AI autonomous privilege escalation: AI agents are deterministically barred from approving change authorizations.'
    ],
    accumulatedCapability:
      'The culmination of the engineering journey: moving from an educational SME wrestling with ungrounded models in Project 01 to building the mathematically governed reliability platform that tests, evaluates, and governs AI systems themselves.',
    technologies: ['Python 3.12', 'FastAPI', 'Playwright (Chromium)', 'Ollama (Qwen 2.5)', 'MCP Integration', 'Fisher Covariance', 'SQLite', 'SHA-256 Ledger', 'Pytest (215+ Tests)'],
    slug: 'ai-reliability'
  },
  {
    id: 'ask-aadil',
    number: '07',
    title: 'Engineering Portfolio & Ask Aadil',
    subtitle: 'Three-layer epistemic architecture and a source-grounded conversational agent with visitor-approved actions',
    layer: 'Source-Aware RAG & Governance',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    timeline: 'September 2026',
    context:
      'Rather than publishing a static portfolio or wrapping all career notes inside a flat vector store, this portfolio was designed as three distinct layers—Timeline (When), Journal (Why), and Systems (What)—with Ask Aadil providing grounded conversational access across those boundaries.',
    problem:
      'Generic portfolio chatbots flatten diverse evidence into an undifferentiated vector blob, conflate past employment (July 2026 Wayground conclusion) with present status, confuse unavailable APIs with empty profiles, and mutate draft communications between user review and execution.',
    solution:
      'Built a Next.js / TypeScript three-layer portfolio alongside Ask Aadil: a deterministic state machine, source-aware hybrid retriever, 3-state LinkedIn adapter boundary (`api_unavailable`, `adapter_ready` with null position, `adapter_ready` with active position), prompt injection defense over retrieved content, and human-in-the-loop mail execution enforcing bitwise draft integrity (`executionInput === editedDraft`).',
    architectureDescription:
      'Visitor Session (Text + Voice Activity Controls) → Intent & Entity Router (`intentRouter.ts`, `projectResolver.ts`) → Source Authority Matrix (`sourceAuthority.ts`) → Hybrid Source-Aware Retriever (`knowledgeIndex.ts`) → Grounded Synthesis & Provenance Badges → Editable Draft + Explicit Human Confirmation Gate.',
    breakthrough:
      'Keeping Timeline, Journal, Systems, Resume, GitHub, and LinkedIn separated by explicit source authority rules while treating retrieved text strictly as passive evidence.',
    criticalDecision:
      'Refusing to collapse all portfolio layers into one vector index and locking `editedDraft` immutably across interleaved conversational turns so `executionInput === editedDraft` holds bitwise.',
    whatBroke: [
      {
        failure: 'Temporal Conflation of Past Wayground Tenure',
        cause: 'Similarity retrieval surfaced July 2026 Wayground chunks as present employment.',
        detection: 'Temporal reasoning QA checks flagged July 2026 evidence presented as current corporate employment.',
        response: 'Added deterministic temporal epistemic classification separating July 2026 historical records from August 2026–Present independent building.'
      },
      {
        failure: 'Draft Drift Across Interleaved Questions',
        cause: 'Asking a technical question while an email draft awaited confirmation caused regeneration drift.',
        detection: 'Draft integrity test asserting `executionInput === editedDraft` caught formatting and phrasing changes.',
        response: 'Locked `editedDraft` onto conversation state immutably across intermediate retrieval turns.'
      }
    ],
    whatBecameDeterministic:
      'Source authority routing, temporal boundary classification, 3-state LinkedIn adapter reporting, bitwise draft preservation (`executionInput === editedDraft`), and 172 automated verification checks.',
    evidenceAndMetrics: [
      '172 automated test verifications passing across temporal reasoning, LinkedIn state distinction, draft integrity, prompt injection, and Playwright E2E suites',
      '132 hardening epistemic assertions verified via `scripts/test_hardening_agent_qa.ts`',
      'Zero LLM rewriting between visitor draft edits and execution payload'
    ],
    tradeoffs: [
      'Maintaining explicit source authority rules requires structured metadata schemas instead of a single flat embedding collection, eliminating cross-source hallucinations.',
      'Mandatory explicit confirmation before opening the mail client adds one turn, preventing unconsented external actions.'
    ],
    failuresAndTradeoffs: [
      'Flat vector retrieval erased source provenance and temporal boundaries.',
      'Solved via separate canonical registries and explicit provenance badges per source layer.'
    ],
    accumulatedCapability:
      'Turned the portfolio itself into a live demonstration of governed AI systems engineering: transparent provenance, temporal honesty, and controlled actions.',
    technologies: ['Next.js 13', 'React 18', 'TypeScript 5', 'Hybrid Retrieval', 'Deterministic State Machine', 'Web Speech API', 'Playwright'],
    slug: 'ask-aadil'
  },
  {
    id: 'solace-ai',
    number: '08',
    title: 'Solace AI — Mindful Wellness Companion',
    subtitle: 'Safety-first mobile companion with deterministic crisis screening, consent-based memory, and ambiguous SSE containment',
    layer: 'Safety & Consent-First Mobile AI',
    ownershipLabel: 'INDEPENDENT · HACKATHON PROJECT',
    timeline: 'November 2026',
    context:
      'Built during the Solace Hackathon (November 2026), Solace AI investigates how deterministic systems engineering principles—pre-LLM guardrails, explicit user consent, zero-retention privacy, and honest ambiguous-delivery semantics—translate into a human-centered mobile emotional wellness companion.',
    problem:
      'Mental health chatbots built as thin LLM wrappers fail users in four critical ways: generative latency delays urgent crisis support, hidden memory extraction erodes privacy trust, cloud-stored voice notes create breach liability, and blind mobile client retries on 502/503/504 gateway drops duplicate user messages in conversation threads.',
    solution:
      'Engineered an Expo SDK 58 / React Native client paired with a FastAPI modular monolith and Supabase PostgreSQL Row Level Security (RLS). Every chat turn passes through a synchronous crisis screening gate (`is_crisis_input`) prior to LangGraph context lookup or Gemini inference, streams tokens over SSE via `astream_events(v2)` with pre-token native fallback, proposes emotional memories strictly via explicit consent banners isolated from voice journals and poetry (ADR-004), deletes raw voice audio in a `finally:` block, and enforces single-POST ambiguous delivery classification on mobile SSE chat.',
    architectureDescription:
      'Expo 58 Mobile Client (Zustand, SecureStore 1500-byte Chunking, Reanimated Landscape) → Single-POST SSE Client (55s Cold-Start Backoff for Reads; 502/503/504 Ambiguity Guard for Chat) → FastAPI JWT Auth → LangGraph StateGraph (Synchronous Crisis Safety Node → Consent-Aware Context Node → Gemini Streaming Companion Node) → Supabase PostgreSQL RLS (6 Isolated Tables).',
    breakthrough:
      'Treating safety screening, emotional consent, audio retention, and uncertain network states as deterministic system invariants rather than conversational prompt instructions.',
    criticalDecision:
      'Running deterministic crisis regex screening synchronously before LangGraph or Gemini inference while isolating voice journals, poetry, and landscape reflections from emotional memory ingestion, and suppressing blind auto-retries on ambiguous SSE stream failures.',
    whatBroke: [
      {
        failure: 'Ambiguous 502/503/504 SSE Drops Risking Duplicate Chat Turns',
        cause: 'When a gateway timed out after FastAPI persisted the incoming user message, blind client retries risked duplicating conversation turns.',
        detection: 'Resilience audit and `api_cold_start.test.js` SSE single-event assertions.',
        response: 'Enforced strict single-POST execution in `streamChat` and surfaced honest ambiguous delivery messaging without a blind Retry action.'
      },
      {
        failure: 'Android Keystore Character & 2048-Byte Value Limits',
        cause: 'Keys starting with `@` or long offline notes triggered Keystore rejections and truncation on native Android.',
        detection: '`storage_adapter.test.js` and `journal.test.js` Android Keystore constraint tests.',
        response: 'Implemented `sanitizeKey()` mapping non-alphanumeric characters to `_` and 1500-byte chunked storage in `useCheckInStore`.'
      },
      {
        failure: 'Figurative Idioms vs. Crisis Detection & LangGraph TTFT Tax',
        cause: 'Idioms such as "dying of laughter" risked false crisis triggers, while empirical benchmarking (`compare_native_vs_graph.py`) measured ~1.08s TTFT overhead for LangGraph event dispatch.',
        detection: 'Benchmark comparison and conversational personality safety tests.',
        response: 'Added `FALSE_POSITIVE_PATTERNS` filtering alongside multilingual `HIGH_RISK_PATTERNS`, and wrapped LangGraph behind `ENABLE_LANGGRAPH_ROUTING` with pre-token native fallback.'
      }
    ],
    whatBecameDeterministic:
      'Pre-LLM multilingual crisis screening and figurative idiom exclusion, Android SecureStore key sanitization and 1500-byte chunking, single-POST ambiguous SSE delivery classification, `finally:` block raw audio buffer deletion (`del audio_bytes`), RLS user-isolation boundaries, and 102 directly verified automated checks.',
    evidenceAndMetrics: [
      '52 / 52 backend pytests passing across 8 suites (`test_langgraph_orchestration.py`, `test_emotional_landscape.py`, `test_poetry.py`, `test_journal.py`, `test_conversational_personality.py`, `test_rant_and_voice.py`, `test_profile_auth.py`, `test_health.py`)',
      '50 / 50 mobile verification checks passing across 7 suites (`npm test`) with `tsc --noEmit` exiting with 0 TypeScript errors',
      'Live Supabase Row Level Security (RLS) two-user isolation check confirming zero cross-user data leakage across 6 domain tables',
      'Hermes AOT Android bundle export (1,725 modules) and Pixel 7 Android 16 (API 36) emulator verification'
    ],
    tradeoffs: [
      'Zero-retention audio purging (`del audio_bytes` without cloud storage) guarantees voice privacy at the cost of cross-device audio replay.',
      'Deterministic crisis regex matching eliminates model refusal drift and latency (<2ms), requiring ongoing maintenance of idiomatic patterns.',
      'Suppressing automatic SSE retries on 502/503/504 prevents duplicate database turns while asking the user to inspect thread history before resending.'
    ],
    failuresAndTradeoffs: [
      'Blind retries on non-idempotent SSE chat streams risk duplicate persisted user messages when gateway drops occur mid-flight.',
      'Resolved by executing streamChat POST strictly once and classifying 502/503/504 as ambiguous delivery.',
      'Domain tables for Voice Journal and Words of Solace remain strictly isolated from Companion memory unless explicit consent is granted.'
    ],
    accumulatedCapability:
      'Extended deterministic AI engineering from backend/developer tools into a full-stack React Native (Expo 58) + FastAPI/LangGraph mobile product grounded in safety, consent, and honest failure semantics.',
    technologies: ['React Native / Expo 58', 'TypeScript', 'Python 3.12', 'FastAPI', 'LangGraph', 'Google Gemini API', 'Supabase RLS', 'SSE Streaming'],
    slug: 'solace-ai'
  },
  {
    id: 'universal-hr-assistant',
    number: '09',
    title: 'Archie — Universal Enterprise HR & IT Assistant',
    subtitle: 'Controlled enterprise assistant demonstration coupling dense policy RAG with FastMCP zero-trust transactional execution',
    layer: 'Enterprise RAG & Zero-Trust FastMCP Tools',
    ownershipLabel: 'INDEPENDENT · PERSONAL BUILD',
    timeline: 'November 2026',
    context:
      'Built in November 2026 as a controlled enterprise demonstration for a simulated corporate environment (Acme Corporation), Archie investigates how to decouple unstructured policy knowledge retrieval (ChromaDB) from authenticated transactional execution (FastMCP & PostgreSQL) without granting language models direct database access or relying on prompts for access control.',
    problem:
      'Enterprise employees routinely navigate fragmented HR portals, disconnected IT systems, and scattered policy documents. Connecting LLMs directly introduces critical risks: models hallucinate policy rules, direct DB tools risk peer employee data probing, and untrusted inputs can execute prompt injection.',
    solution:
      'Engineered a dual-capability architecture combining dense semantic retrieval over ChromaDB with an internal HMAC-signed FastMCP microservice over PostgreSQL 16, governed by LangGraph state machines and 0ms deterministic pre-flight regex guardrails.',
    architectureDescription:
      'Next.js 14 Client (Web Speech API Voice Assistant, Greeting Mirroring) → FastAPI Async Gateway → 0ms Pre-Flight Regex Guardrail → LangGraph StateGraph (Input Validation → Intent Routing → ChromaDB Retrieval / FastMCP Execution → Gemini 3.5 Synthesis) → Post-Flight PII Redactor.',
    breakthrough:
      'Decoupling unstructured policy retrieval from structured transactional tool execution via an internal HMAC-signed FastMCP server with strict caller peer-isolation.',
    criticalDecision:
      'Strict caller authorization in FastMCP handlers deterministically rejecting cross-employee record probing, combined with 0ms pre-flight regex inspection before LLM dispatch.',
    whatBroke: [
      {
        failure: 'Semantic Drift on Absent Policy Documents',
        cause: 'Top-k search returned remote stipend clauses for general expense queries when general expense documents were missing.',
        detection: 'Evaluator benchmark flagged ergonomic stipend citation for general reimbursement query.',
        response: 'Retrieved evidence strictly cited the ergonomic stipend receipt clause without hallucinating general expense rules.'
      },
      {
        failure: 'Peer Record Probing Vulnerability',
        cause: 'Retrieved policy documents or user prompts could attempt to query peer employee records.',
        detection: 'Adversarial security test suite flagged cross-employee data access attempts.',
        response: 'Enforced caller identity authorization in FastMCP handlers, deterministically rejecting attempts to query peer records with HTTP 403.'
      }
    ],
    whatBecameDeterministic:
      'Document-driven number extraction from ChromaDB (zero hardcoded policy numbers in business logic), HMAC-signed FastMCP tool authorization with caller identity masking, and 0ms deterministic regex pre-flight input inspection.',
    evidenceAndMetrics: [
      '64 automated tests passing across 9 test suites covering policy extraction, auth security, adversarial AI defense, and MCP tools',
      '10-question live document evaluation benchmark achieving 100% execution rate and 0% security failure / data breach rate'
    ],
    tradeoffs: [
      'FastMCP internal tool server introduces an extra network boundary compared to direct SQL queries, but guarantees tenant isolation and eliminates LLM SQL injection risks.'
    ],
    failuresAndTradeoffs: [
      'Direct DB queries risked cross-employee probing; resolved by enforcing caller identity in FastMCP.',
      'Ambiguous policy queries risked hallucinated general rules; resolved by strict citation thresholding.'
    ],
    accumulatedCapability:
      'Enterprise Policy RAG • FastMCP Zero-Trust Execution • 0ms Pre-Flight Injection Defense • Multi-Modal Voice Interaction',
    technologies: ['Python 3.12', 'FastAPI', 'LangGraph', 'FastMCP', 'ChromaDB', 'PostgreSQL 16', 'Next.js 14', 'TypeScript 5', 'Google Gemini'],
    slug: 'universal-hr-assistant'
  }
]

export const epilogue: Epilogue = {
  title: 'Foundational Principles // What Building Taught Me',
  subtitle: 'From Mathematics Content to Governed AI Systems',
  thesis: 'Every system I build is also a system that teaches me. True systems engineering is not prompt crafting; it is placing deterministic software boundaries around stochastic models so they respect physical laws, structural invariants, and human authority.',
  principles: [
    {
      title: '01. Start With the Problem',
      description:
        'I did not begin by deciding that I needed an AI system. The tools I built emerged from concrete friction in daily workflows—curriculum bottlenecks, dropped standards, and authoring latency. I learned to understand the specific failure mode first rather than choosing technology beforehand.'
    },
    {
      title: '02. Representation Is Part of Correctness',
      description:
        'My early mathematics and content work taught me that a sound concept becomes an incorrect artifact when its technical representation fails. Whether in KaTeX, TikZ, coordinate geometry, or 3D STEP BRep solids, representation is not cosmetic—it is an inseparable part of correctness.'
    },
    {
      title: '03. Generation Is Not Verification',
      description:
        'When building VM Copy, I realized that generating a candidate question is not the same as generating a good question. A language model can produce plausible-looking output while violating basic constraints. The system must separate candidate generation from independent, deterministic evaluation.'
    },
    {
      title: '04. Make Uncertainty Explicit',
      description:
        'I started noticing that an AI system becomes untrustworthy when it disguises uncertainty. In Ask Aadil and the reliability harness, I made boundaries strict: an offline API is an adapter state, not an empty record; historical evidence is not current employment; and unknown information must be stated as unknown.'
    },
    {
      title: '05. Reasoning Is Not Authorization',
      description:
        'Being able to diagnose a defect or draft a message does not mean an agent should execute it. Across the reliability platform and Ask Aadil, I separated reasoning from execution: models propose actions, but consequential changes require deterministic authorization gates and explicit human confirmation.'
    },
    {
      title: '06. Preserve Evidence',
      description:
        'I learned that systems become easier to trust when their decisions remain directly inspectable. Whether verifying CAD solid cylinder volumes within 10⁻⁶ relative error, logging Playwright DOM transcripts, or attaching exact provenance badges in Ask Aadil, visible evidence anchors probabilistic reasoning to ground truth.'
    },
    {
      title: '07. Build From the Previous Failure',
      description:
        'Every system I build is also a system that teaches me. The next project consistently emerged because the previous one revealed a new limitation: content authoring exposed representation issues, generation bottlenecks exposed evaluation needs, and ungrounded agent reasoning exposed the need for reliability harnesses. You build, observe failure, understand the boundary, change the system, and build again.'
    }
  ],
  conclusion:
    'Across every system in this archive—from educational item generation and dynamic ETL pipelines to mechanical CAD synthesis and governed browser reliability—the central lesson has remained consistent: language models provide flexible translation and reasoning, but engineering integrity requires deterministic verification. Still building. Still learning.'
}
