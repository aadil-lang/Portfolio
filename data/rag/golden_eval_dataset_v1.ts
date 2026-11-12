import { GoldenTestCase } from './types'

export const GOLDEN_EVALUATION_DATASET: GoldenTestCase[] = [
  // 1. Sufficient Evidence - EDA Volume & Tests
  {
    id: 'eval-eda-volume-test-count',
    query: 'How many pytests does Engineering Design Automation have and what is its net volume error?',
    category: 'sufficient_evidence',
    targetProjectId: 'design-automation',
    expectedDocumentIds: ['doc-eda-metrics', 'doc-eda-spec'],
    expectedChunkIds: ['chunk-eda-03', 'chunk-eda-01'],
    relevanceGrades: {
      'chunk-eda-03': 3,
      'chunk-eda-01': 2,
      'chunk-eda-02': 1
    },
    expectedAbstention: false,
    requiredFacts: [
      '424 automated pytests',
      '28 test suites in Docker',
      '94,218.58 mm^3 net volume',
      '< 10^-6 relative calculus divergence (0.0000%)',
      'Software calculus consistency disclaimer (not CNC machining tolerance)'
    ],
    evaluationRationale:
      'Tests both quantitative retrieval and technical disclaimer preservation. The system must surface 424 pytests and 94,218.58 mm^3 without dropping the calculus disclaimer.'
  },

  // 2. Sufficient Evidence - Solace AI Latency & Checks
  {
    id: 'eval-solace-screening-latency',
    query: 'What is the crisis screening latency and test count for Solace AI?',
    category: 'sufficient_evidence',
    targetProjectId: 'solace-ai',
    expectedDocumentIds: ['doc-solace-metrics', 'doc-solace-overview'],
    expectedChunkIds: ['chunk-solace-02', 'chunk-solace-01'],
    relevanceGrades: {
      'chunk-solace-02': 3,
      'chunk-solace-01': 2
    },
    expectedAbstention: false,
    requiredFacts: [
      'sub-2ms deterministic crisis screening',
      '102 checks across 10 test suites',
      '52 backend safety/endpoint tests',
      '50 mobile React Native assertions',
      'solace_demo.mp4 is 3.84 MB with preload="none"'
    ],
    evaluationRationale:
      'Tests specific numerical extraction (sub-2ms, 102 checks) and media delivery parameter awareness.'
  },

  // 3. Sufficient Evidence - OCR Evaluator Perturbation Axes
  {
    id: 'eval-ocr-evaluator-axes',
    query: 'What synthetic perturbation axes does the OCR Evaluator test across and how many tests back it?',
    category: 'sufficient_evidence',
    targetProjectId: 'ocr-evaluator',
    expectedDocumentIds: ['doc-ocr-overview', 'doc-ocr-metrics'],
    expectedChunkIds: ['chunk-ocr-01', 'chunk-ocr-02'],
    relevanceGrades: {
      'chunk-ocr-01': 3,
      'chunk-ocr-02': 2
    },
    expectedAbstention: false,
    requiredFacts: [
      '5 distinct perturbation axes (gaussian blur, salt-and-pepper noise, geometric rotation, contrast attenuation, JPEG compression)',
      '154 automated tests (134 backend pytests + 20 frontend UI assertions)',
      'Operational decision gates: PASS (<2.0% CER), REVIEW (2.0-8.0%), FAIL (>8.0%)'
    ],
    evaluationRationale:
      'Evaluates ability to retrieve multi-axis architecture specifications and decision gate thresholds.'
  },

  // 4. Sufficient Evidence - AI Reliability Fisher Uncertainty
  {
    id: 'eval-ai-reliability-fisher',
    query: 'How does AI Application Reliability enforce agent governance and prevent rogue patches?',
    category: 'sufficient_evidence',
    targetProjectId: 'ai-reliability',
    expectedDocumentIds: ['doc-ai-reliability', 'doc-ai-reliability-metrics'],
    expectedChunkIds: ['chunk-ai-reliability-01', 'chunk-ai-reliability-02'],
    relevanceGrades: {
      'chunk-ai-reliability-01': 3,
      'chunk-ai-reliability-02': 2
    },
    expectedAbstention: false,
    requiredFacts: [
      'Fisher Information covariance uncertainty estimation (forces abstention when uncertain)',
      'Mandatory human-in-the-loop governance authorization gate',
      'Append-only SHA-256 provenance ledger',
      'Playwright headless Chromium and deterministic behavioral contracts',
      '205+ automated tests (158 backend + 47 governance/E2E)'
    ],
    evaluationRationale:
      'Verifies retrieval of reliability governance mechanisms (Fisher covariance, human gate, SHA-256 ledger).'
  },

  // 5. Conflicting / Qualified Evidence - Atlas AI Test Suite Reconciliation
  {
    id: 'eval-atlas-test-reconciliation',
    query: 'Does Atlas AI have 59 tests or 178 tests?',
    category: 'conflicting_or_qualified',
    targetProjectId: 'atlas-ai',
    expectedDocumentIds: ['doc-atlas-metrics', 'doc-atlas-ai'],
    expectedChunkIds: ['chunk-atlas-02', 'chunk-atlas-01'],
    relevanceGrades: {
      'chunk-atlas-02': 3,
      'chunk-atlas-01': 1
    },
    expectedAbstention: false,
    requiredFacts: [
      'Both counts are genuine and represent different phases of system maturity',
      '59 pytests validated the initial MVP core LangGraph router nodes',
      '178 pytests validate the expanded enterprise release (EDGAR chunkers, vector search, alert lifespan)'
    ],
    evaluationRationale:
      'Tests reconciliation capability. The system must not pick one arbitrarily or claim a contradiction; it must explain the MVP vs expanded enterprise release progression.'
  },

  // 6. Conflicting / Qualified Evidence - EDA Volume vs CNC Tolerance
  {
    id: 'eval-eda-cnc-tolerance',
    query: 'Does the EDA 0.0000% volume error prove physical CNC machining tolerance?',
    category: 'conflicting_or_qualified',
    targetProjectId: 'design-automation',
    expectedDocumentIds: ['doc-eda-metrics'],
    expectedChunkIds: ['chunk-eda-03'],
    relevanceGrades: {
      'chunk-eda-03': 3
    },
    expectedAbstention: false,
    requiredFacts: [
      'No, it does NOT represent physical CNC machining tolerance',
      'It represents mathematical calculus consistency between analytical formulas and OpenCascade BRep boundary integrals (< 10^-6 divergence)'
    ],
    evaluationRationale:
      'Tests whether the system strictly preserves the explicit negative disclaimer against physical machining claims.'
  },

  // 7. Sufficient Evidence - VM Copy Deterministic Guardrails
  {
    id: 'eval-vm-copy-guardrails',
    query: 'What deterministic guardrails does VM Copy Question Generator implement?',
    category: 'sufficient_evidence',
    targetProjectId: 'vm-copy',
    expectedDocumentIds: ['doc-vm-copy'],
    expectedChunkIds: ['chunk-vm-copy-01'],
    relevanceGrades: {
      'chunk-vm-copy-01': 3
    },
    expectedAbstention: false,
    requiredFacts: [
      'Enforces exactly 4 unique options',
      'Verifies exactly one correct-answer flag',
      'Validates distractor rationales',
      'Local execution without secondary model dependency'
    ],
    evaluationRationale:
      'Verifies retrieval of deterministic client validation rules for assessment items.'
  },

  // 8. Sufficient Evidence - Timeline Temporal Boundary
  {
    id: 'eval-timeline-current-status',
    query: 'What is Aadil currently doing since August 2026 and where did he work previously?',
    category: 'sufficient_evidence',
    targetProjectId: 'profile',
    expectedDocumentIds: ['doc-profile', 'doc-timeline'],
    expectedChunkIds: ['chunk-profile-02', 'chunk-timeline-02', 'chunk-profile-01'],
    relevanceGrades: {
      'chunk-profile-02': 3,
      'chunk-timeline-02': 2,
      'chunk-profile-01': 1
    },
    expectedAbstention: false,
    requiredFacts: [
      'Wayground employment concluded in July 2026',
      'From August 2026 to present: Independent AI Engineering & Research',
      'Not full-time corporate employment, consulting, or contract work'
    ],
    evaluationRationale:
      'Verifies accurate temporal classification and preservation of the independent research status.'
  },

  // 9. Out-of-Domain Abstention - Unrelated Corporate Metrics
  {
    id: 'eval-abstention-google-kubernetes',
    query: 'What Kubernetes cluster version does Aadil maintain at Google?',
    category: 'out_of_domain_abstention',
    expectedDocumentIds: [],
    expectedChunkIds: [],
    relevanceGrades: {},
    expectedAbstention: true,
    expectedAbstentionReason:
      'The query asks about unrecorded corporate employment at Google and internal cluster configurations not present in the canonical portfolio evidence.',
    requiredFacts: [
      'Aadil has no recorded employment at Google in canonical evidence',
      'The system must abstain from answering'
    ],
    evaluationRationale:
      'Tests strict abstention when queried on unrecorded employers or nonexistent infrastructure.'
  },

  // 10. Out-of-Domain Abstention - Personal Trivia
  {
    id: 'eval-abstention-personal-trivia',
    query: 'What is Aadil\'s favorite movie and personal hobbies outside engineering?',
    category: 'out_of_domain_abstention',
    expectedDocumentIds: [],
    expectedChunkIds: [],
    relevanceGrades: {},
    expectedAbstention: true,
    expectedAbstentionReason:
      'Personal lifestyle preferences and non-engineering hobbies are not documented in canonical engineering records.',
    requiredFacts: [
      'Not documented in connected sources',
      'System must decline speculation'
    ],
    evaluationRationale:
      'Tests refusal to hallucinate personal trivia.'
  },

  // 11. False Premise Abstention - Finite Element Analysis
  {
    id: 'eval-false-premise-fea',
    query: 'How does EDA run non-linear Finite Element Analysis (FEA) mesh convergence for shaft fatigue?',
    category: 'false_premise_abstention',
    targetProjectId: 'design-automation',
    expectedDocumentIds: ['doc-eda-spec', 'doc-eda-physics'],
    expectedChunkIds: ['chunk-eda-01', 'chunk-eda-02'],
    relevanceGrades: {
      'chunk-eda-01': 2,
      'chunk-eda-02': 1
    },
    expectedAbstention: true,
    expectedAbstentionReason:
      'False premise: EDA does NOT run non-linear FEA mesh convergence; it uses closed-form Saint-Venant analytical torsion formulas and BRep boundary modeling.',
    requiredFacts: [
      'EDA does not use non-linear FEA mesh convergence',
      'EDA uses closed-form Saint-Venant torsion equations and OpenCascade BRep geometry'
    ],
    evaluationRationale:
      'Tests defense against leading false-premise questions that falsely claim unverified features.'
  },

  // 12. Partial Evidence - Proprietary LLM Weights
  {
    id: 'eval-partial-evidence-model-weights',
    query: 'What neural network loss function was used to train the underlying weights of Ollama Qwen 2.5 Coder in AI Reliability?',
    category: 'partial_evidence',
    targetProjectId: 'ai-reliability',
    expectedDocumentIds: ['doc-ai-reliability'],
    expectedChunkIds: ['chunk-ai-reliability-01'],
    relevanceGrades: {
      'chunk-ai-reliability-01': 2
    },
    expectedAbstention: true,
    expectedAbstentionReason:
      'Partial evidence: AI Reliability utilizes local Ollama Qwen 2.5 Coder via inference APIs with Fisher uncertainty, but the base model training loss function and pretraining weights are external third-party foundation model specifications not documented in this repository.',
    requiredFacts: [
      'AI Reliability integrates Qwen 2.5 Coder as an inference tool',
      'Pretraining loss functions are not documented in repository evidence'
    ],
    evaluationRationale:
      'Tests identification of upstream model boundaries versus application-level governance.'
  }
]

