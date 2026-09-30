const fs = require('fs');
const path = require('path');

const codeEvidenceMap = {
  'vm-copy': [
    {
      id: 'vm-copy-eval-layer',
      title: 'Tier-1 Deterministic Evaluator & Distractor Guardrail',
      decision: 'DETERMINISTIC EVALUATION BEFORE PROBABILISTIC REVIEW',
      language: 'typescript',
      sourcePath: 'lib/eval-layer.ts',
      lineRange: '44-76',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/vm-copy-question-generator',
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
      evidence: ['4 unique options', 'Exactly 1 CA invariant', 'Distractor logic checked', '0ms local latency']
    },
    {
      id: 'vm-copy-batching',
      title: 'Latency-Bounded Micro-Batch Splitting',
      decision: 'PARALLEL PARTITIONING OVER MONOLITHIC COMPLETIONS',
      language: 'typescript',
      sourcePath: 'app/api/generate/route.ts',
      lineRange: '18-35',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/vm-copy-question-generator',
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
      evidence: ['Bounded ~4-6s generation', 'Zero serverless timeouts', 'Concurrent worker dispatch']
    }
  ],

  'ai-worksheets': [
    {
      id: 'ai-worksheets-tikz-compiler',
      title: 'Headless TeX Live / TikZ Render Pipeline with MD5 Caching',
      decision: 'PHYSICAL LATEX COMPILER OVER GENERATIVE DIFFUSION',
      language: 'python',
      sourcePath: 'backend/app/services/tikz_compiler.py',
      lineRange: '42-68',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/Worksheets-MS-Formal-Gamified',
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
      explanation: 'Diffusion models consistently hallucinate geometric angles and coordinate grids. By routing mathematical visual descriptions through headless TeX Live with deterministic exit-code validation, mathematical figures compile with exact Cartesian precision and clean 300-DPI printable rasterization.',
      evidence: ['Headless TeX Live (pdflatex) compilation', '300-DPI Poppler rasterization', 'MD5 cache deduplication']
    }
  ],

  'curriculum-etl': [
    {
      id: 'curriculum-etl-csv-gate',
      title: '3-Tier CSV Schema Integrity Audit Gate',
      decision: 'DETERMINISTIC SCHEMA AUDITING BEFORE DATABASE PERSISTENCE',
      language: 'python',
      sourcePath: 'csv_audit.py',
      lineRange: '24-52',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/Curriculum-Transformation',
      code: `def audit_csv_integrity(df: pd.DataFrame, expected_schema: Dict[str, Any]) -> AuditReport:
    """
    Deterministic gate validating Claude Map-Reduce output before S3 persistence.
    Checks column completeness, non-null constraints, and data type coercion.
    """
    violations = []

    # 1. Schema Key Completeness
    missing_cols = set(expected_schema.keys()) - set(df.columns)
    if missing_cols:
        violations.append(f"Missing required columns: {sorted(list(missing_cols))}")

    # 2. Strict Non-Null Assertions on Primary Curriculum Fields
    for col, spec in expected_schema.items():
        if col in df.columns and spec.get("required", False):
            null_count = df[col].isnull().sum()
            if null_count > 0:
                violations.append(f"Column '{col}' contains {null_count} null values.")

    # 3. Standard Code Regular Expression Validation
    if "standard_code" in df.columns:
        invalid_codes = df[~df["standard_code"].str.match(r"^[A-Z0-9.\\-]+$", na=False)]
        if len(invalid_codes) > 0:
            violations.append(f"Found {len(invalid_codes)} malformed curriculum standard codes.")

    return AuditReport(is_valid=len(violations) == 0, violations=violations)`,
      explanation: 'Large language models parsing 100+ page curriculum PDFs frequently drop columns or hallucinate schema variations across batch chunks. Rather than trusting model outputs directly, the pipeline runs a deterministic 3-tier integrity audit (Reviewer → Critic → CSV Audit) to catch dropped standards before downstream ingest.',
      evidence: ['36 verified automated tests', '3-tier integrity verification', 'Zero corrupted database imports']
    }
  ],

  'math-item-bank': [
    {
      id: 'math-item-bank-image-routing',
      title: 'Domain-Based Mathematical Representation Routing',
      decision: 'DOMAIN-INTENT ROUTING & TWO-TIER COMPILATION GATES',
      language: 'python',
      sourcePath: 'backend/src/services/image_renderer.py',
      lineRange: '35-58',
      ownership: 'MY CONTRIBUTION',
      sourceUrl: 'https://github.com/aadilkhurshid/math-item-bank-pipeline',
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
      evidence: ['Domain-based SVG/TikZ routing', 'Two-tier compilation + vision evaluation', 'Upper Elementary pipeline stabilization']
    }
  ],

  'design-automation': [
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
        input: '7.5 kW · 1200 RPM · FoS 2.2 · L = 350 mm',
        result: '16 mm shaft (from theoretical d_min = 15.38 mm)',
        verification: 'FoS = 2.41 (STEP/BRep volume verified relative error < 10⁻⁶)'
      },
      evidence: ['Closed-form Saint-Venant solver', '424 automated pytests', 'ISO-10303 STEP BRep export']
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
      evidence: ['BRep topological validation', 'Relative error < 10⁻⁶', 'Automated CAD <-> Drawing dimensional sync']
    }
  ],

  'ai-reliability': [
    {
      id: 'reliability-governance-gate',
      title: 'Deterministic Consequential Change Authorization Gate',
      decision: 'DETERMINISTIC GOVERNANCE GATE AROUND AI DIAGNOSIS',
      language: 'python',
      sourcePath: 'backend/app/governance/authorization_service.py',
      lineRange: '57-89',
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
      explanation: 'The model can produce a diagnosis, but it does not get to decide by itself that a change is safe or verified. Autonomous remediation agents are strictly prohibited from mutating application code or promoting builds unless a scoped, cryptographically tied ChangeAuthorization ticket passes deterministic verification.',
      principle: 'Observation → Diagnosis → Governance Gate → Authorized Action',
      evidence: ['47 deterministic governance tests', '158 backend test suites', 'Zero unapproved production mutations']
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
      evidence: ['Playwright DOM & trace capture', 'Zero-hallucination stack trace auditing', 'Empirical log verification']
    }
  ],

  'loom-ai': [
    {
      id: 'loom-ai-procurement-workflow',
      title: 'AgentGraph Procurement Workflow with Dynamic Clarification Edge',
      decision: 'DYNAMIC STATE GRAPH CLARIFICATION BOUNDARY',
      language: 'typescript',
      sourcePath: 'backend/src/ai/workflows/BuyerProcurementWorkflow.ts',
      lineRange: '33-58',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadilkhurshid/loom-ai-b2b',
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
      evidence: ['Clean Architecture domain separation', 'Conditional clarification edge', 'Compound MongoDB search']
    }
  ],

  'atlas-ai': [
    {
      id: 'atlas-ai-stategraph',
      title: 'LangGraph StateGraph Workflow & Conditional Intent Routing',
      decision: 'CYCLIC AGENTIC WORKFLOW WITH DETERMINISTIC INTENT DISPATCH',
      language: 'python',
      sourcePath: 'backend/app/agents/graph.py',
      lineRange: '118-142',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadilkhurshid/atlas-ai-finance',
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
      evidence: ['178 pytests in complete SEC RAG suite', 'StateGraph compiled pipeline', 'Direct SEC EDGAR regulatory chunking']
    },
    {
      id: 'atlas-ai-alert-worker',
      title: 'Proactive Alert Worker & Market Trigger Poller',
      decision: 'BACKGROUND ASYNCHRONOUS VOLATILITY POLLER',
      language: 'python',
      sourcePath: 'backend/app/jobs/alerts.py',
      lineRange: '45-72',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadilkhurshid/atlas-ai-finance',
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
      evidence: ['Real-time Telegram notifications', 'Deterministic boundary evaluation', 'SEC 8-K volatility triggers']
    }
  ],

  'ask-aadil': [
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
      evidence: ['25 multi-turn agentic tests passing', '132 hardening epistemic assertions', 'Deterministic mailto state machine']
    }
  ]
};

function injectEvidence() {
  const projectsPath = path.join(__dirname, '../data/projects.ts');
  let content = fs.readFileSync(projectsPath, 'utf-8');

  // For each project slug, inject codeEvidence property right before closing of that project object
  for (const [slug, snippets] of Object.entries(codeEvidenceMap)) {
    console.log(`Injecting codeEvidence for project: ${slug} (${snippets.length} snippets)...`);
    
    // Pattern to find slug: 'slug' and its systemLayers or ending
    // We look for: slug: '${slug}', then find systemLayers: [ ... ], and append codeEvidence
    const slugRegex = new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?systemLayers:\\s*\\[[\\s\\S]*?\\n\\s*\\])(\\n\\s*\\})`, 'm');
    
    if (slugRegex.test(content)) {
      const snippetsJson = JSON.stringify(snippets, null, 6)
        // Convert double quotes around object keys to clean JS format
        .replace(/"([a-zA-Z0-9_]+)":/g, '$1:');

      content = content.replace(slugRegex, `$1,\n    codeEvidence: ${snippetsJson}$2`);
      console.log(`  ✓ Successfully injected codeEvidence for ${slug}`);
    } else {
      console.error(`  ✗ Could not match regex for slug: ${slug}`);
    }
  }

  fs.writeFileSync(projectsPath, content, 'utf-8');
  console.log('\nFinished updating data/projects.ts!');
}

injectEvidence();
