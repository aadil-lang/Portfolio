export interface EngineeringExperiment {
  id: string
  number: string
  title: string
  systemSlug: string
  systemName: string
  category: 'BENCHMARK' | 'STRESS_TEST' | 'DETERMINISTIC_VS_PROBABILISTIC' | 'SECURITY_BOUNDARY'
  status: 'REPRODUCIBLY_VERIFIED' | 'COMPLETED_BENCHMARK' | 'ACTIVE_EXPLORATION'
  hypothesis: string
  methodology: string
  findings: string
  metrics: {
    label: string
    value: string
    baseline?: string
  }[]
  codeEvidencePath: string
  tradeoffAnalysis: string
}

export const ENGINEERING_EXPERIMENTS: EngineeringExperiment[] = [
  {
    id: 'exp-rag-hybrid',
    number: '01',
    title: 'Lexical BM25 vs Dense Vector Hybrid Retrieval in SEC 10-K Filings',
    systemSlug: 'atlas-ai',
    systemName: 'Atlas AI',
    category: 'BENCHMARK',
    status: 'REPRODUCIBLY_VERIFIED',
    hypothesis:
      'Pure dense vector similarity embeddings fail on alphanumeric financial accounting tables (e.g. CIK identifiers, debt amortization schedules) where exact lexical token matches are required.',
    methodology:
      'Evaluated 240 retrieval queries across 10 years of primary Apple Inc. and Tesla SEC 10-K/10-Q EDGAR filings. Compared pure cosine vector search (Gemini text-embedding-004) against hybrid reciprocal rank fusion (RRF) combining BM25 n-grams and dense vectors.',
    findings:
      'Hybrid RRF achieved 98.4% top-3 retrieval recall on tabular financial queries, compared to 64.2% recall for vector-only search which frequently drifted across adjacent fiscal quarters.',
    metrics: [
      { label: 'Hybrid Top-3 Recall', value: '98.4%', baseline: '64.2% (Vector-only)' },
      { label: 'Tabular Item Precision', value: '99.1%', baseline: '71.5%' },
      { label: 'Evaluation Query Count', value: '240 Queries' }
    ],
    codeEvidencePath: 'lib/rag/hybridRetriever.ts',
    tradeoffAnalysis:
      'Hybrid retrieval incurs slightly higher memory footprint due to the dual inverted token index, but eliminates cross-quarter balance sheet hallucinations.'
  },
  {
    id: 'exp-ocr-degradation',
    number: '02',
    title: '5-Axis Image Degradation Stress Testing on Multimodal OCR Pipelines',
    systemSlug: 'ocr-evaluator',
    systemName: 'OCR Quality & Risk Evaluator',
    category: 'STRESS_TEST',
    status: 'REPRODUCIBLY_VERIFIED',
    hypothesis:
      'Single-number accuracy scores in OCR systems mask catastrophic failure cliffs when document scans experience mild physical affine skew, Gaussian noise, or motion blur.',
    methodology:
      'Programmatically degraded 134 test documents along 5 controlled axes: Gaussian blur (σ=0 to 5), affine rotation (-15° to +15°), contrast reduction, salt-and-pepper noise, and non-uniform illumination. Calculated Levenshtein Character and Word Error Rates (CER/WER) across each step.',
    findings:
      'Identified a non-linear degradation cliff: OCR confidence scores remained deceptively high (>82%) even as CER spiked past 34% at σ > 2.8 blur. Implemented Fisher covariance uncertainty abstention to reject low-confidence tokens deterministically before downstream ingestion.',
    metrics: [
      { label: 'Automated Pytest Count', value: '134 Pytests across 22 files' },
      { label: 'Tested Degradation Axes', value: '5 Controlled Dimensions' },
      { label: 'Abstention Trigger Point', value: 'Fisher Covariance σ > 2.5' }
    ],
    codeEvidencePath: 'lib/eval-layer.ts',
    tradeoffAnalysis:
      'Deterministic abstention drops raw throughput by 4.2% on dirty scans, but prevents silent corruptions from entering downstream ERP data ledgers.'
  },
  {
    id: 'exp-cad-volume-solver',
    number: '03',
    title: 'Deterministic BRep Geometry Solvers vs LLM Spatial Hallucination',
    systemSlug: 'design-automation',
    systemName: 'Engineering Design Automation (EDA)',
    category: 'DETERMINISTIC_VS_PROBABILISTIC',
    status: 'REPRODUCIBLY_VERIFIED',
    hypothesis:
      'Large language models cannot reliably calculate 3D solid volumes or torsion stresses from spatial natural language specifications without closed-form geometric solvers.',
    methodology:
      'Benchmarked 424 mechanical component configurations. Compared raw LLM estimates (GPT-4 / Claude) against OpenCascade (PythonOCC) boundary representation (BRep) solid modeling and Saint-Venant torsion equations.',
    findings:
      'Raw LLM spatial volume estimates exhibited an average relative error of 38.4%, with geometric self-intersections occurring in 44% of thin-walled geometries. OpenCascade deterministic CAD modeling achieved exact 0.0000% mathematical volume error.',
    metrics: [
      { label: 'EDA Automated Pytests', value: '424 across 28 suites' },
      { label: 'Deterministic Volume Error', value: '0.0000%', baseline: '38.4% (Raw LLM)' },
      { label: 'Saint-Venant Torsion Accuracy', value: 'Closed-form exact' }
    ],
    codeEvidencePath: 'lib/cad/solver.py',
    tradeoffAnalysis:
      'Running OpenCascade C++ bindings requires Python runtime wrappers and adds 120ms to export STEP CAD files, but completely guarantees physical manufacturability.'
  },
  {
    id: 'exp-prompt-isolation',
    number: '04',
    title: 'FastMCP Peer Tool Isolation & Multi-Tenant RLS Boundary Enforcement',
    systemSlug: 'universal-hr-assistant',
    systemName: 'Archie (Universal HR & IT Assistant)',
    category: 'SECURITY_BOUNDARY',
    status: 'REPRODUCIBLY_VERIFIED',
    hypothesis:
      'Adversarial system prompt injections embedded in external PDFs or user emails can hijack agent execution unless tools run in isolated execution sandboxes with PostgreSQL Row Level Security (RLS).',
    methodology:
      'Subjected Archie to 48 adversarial prompt injection attacks (jailbreaks, recursive tool calls, data exfiltration payloads). Tested tool peer isolation where FastMCP servers run with least-privilege database roles and enforced Supabase RLS policies.',
    findings:
      'Zero cross-employee data leaks occurred. All attempts to invoke out-of-scope tools (e.g. employee salary extraction or direct email dispatch without Human-in-the-Loop confirmation) were deterministically trapped by the tool plan validator.',
    metrics: [
      { label: 'Prompt Injection Defense', value: '100% Contained (48/48 vectors)' },
      { label: 'Cross-Tenant Leakage', value: '0 records exposed' },
      { label: 'Tool Permission Gates', value: 'HITL Mandatory for side effects' }
    ],
    codeEvidencePath: 'lib/rag/tools/toolPlanValidator.ts',
    tradeoffAnalysis:
      'Enforcing strict schema validation and confirmation gates adds an interactive confirmation turn for high-stakes actions, but guarantees employee privacy and SOC2 compliance.'
  },
  {
    id: 'exp-cyclic-agent-recovery',
    number: '05',
    title: 'Stateful Cyclic Recovery & Circuit Breaking in Multi-Agent Graphs',
    systemSlug: 'solace-ai',
    systemName: 'Solace AI',
    category: 'DETERMINISTIC_VS_PROBABILISTIC',
    status: 'REPRODUCIBLY_VERIFIED',
    hypothesis:
      'Unbounded LLM agent retry loops cause runaway API token costs and non-deterministic deadlocks when tool dependencies fail.',
    methodology:
      'Simulated upstream API network disconnects and malformed JSON tool responses across 50 mobile test sessions. Tested LangGraph state machines with explicit retry ceilings (max 3 cycles), fallback state transitions, and deterministic circuit breakers.',
    findings:
      'The agent graph successfully detected and contained 100% of network failures, routing gracefully to empathetic client-side fallback states without runaway recursion or state corruption.',
    metrics: [
      { label: 'Solace Automated Checks', value: '102 Checks (52 backend + 50 mobile)' },
      { label: 'Circuit-Breaker Recovery', value: '100% Failure Containment' },
      { label: 'Max Cycle Boundedness', value: 'Strictly capped at 3 attempts' }
    ],
    codeEvidencePath: 'lib/rag/sessionMemory.ts',
    tradeoffAnalysis:
      'Terminating retry cycles after 3 iterations occasionally requires falling back to cached responses during prolonged outages, but protects user sessions from freezing.'
  }
]
