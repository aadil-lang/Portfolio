export type CubeFaceIndex = 0 | 1 | 2 | 3 | 4 | 5

export type CubeIconKey =
  | 'workflow'
  | 'database'
  | 'terminal'
  | 'shield'
  | 'binary'
  | 'layers'

export interface CubeSupportingLink {
  label: string
  href: string
}

export interface CubeRotationAngles {
  rotateX: number
  rotateY: number
}

export interface CubeCapability {
  index: CubeFaceIndex
  id: string
  code: string
  faceName: 'Front' | 'Right' | 'Back' | 'Left' | 'Top' | 'Bottom'
  title: string
  shortLabel: string
  summary: string
  icon: CubeIconKey
  primaryRoute: string
  primaryCtaLabel: string
  supportingLinks: CubeSupportingLink[]
  faceTransform: string
  targetRotation: CubeRotationAngles
}

export const CUBE_CAPABILITIES: readonly CubeCapability[] = [
  {
    index: 0,
    id: 'ai-systems-agentic',
    code: '01 // AGENTIC SYSTEMS',
    faceName: 'Front',
    title: 'AI Systems & Agentic Engineering',
    shortLabel: 'Agentic Systems',
    summary:
      'Stateful multi-agent orchestration, bounded retry budgets, and deterministic Human-in-the-Loop authorization gates.',
    icon: 'workflow',
    primaryRoute: '/projects/ask-aadil',
    primaryCtaLabel: 'Explore Ask Aadil',
    supportingLinks: [
      { label: 'Solace AI', href: '/projects/solace-ai' },
      { label: 'Atlas AI', href: '/projects/atlas-ai' }
    ],
    faceTransform: 'rotateY(0deg) translateZ(var(--cube-half))',
    targetRotation: { rotateX: 0, rotateY: 0 }
  },
  {
    index: 1,
    id: 'retrieval-knowledge-rag',
    code: '02 // RETRIEVAL & RAG',
    faceName: 'Right',
    title: 'Retrieval, Knowledge & RAG',
    shortLabel: 'Retrieval & RAG',
    summary:
      'Source-aware hybrid retrieval preserving document boundaries, primary SEC EDGAR parsing, and grounded citations.',
    icon: 'database',
    primaryRoute: '/rag-lab',
    primaryCtaLabel: 'Open RAG Lab',
    supportingLinks: [
      { label: 'Atlas AI', href: '/projects/atlas-ai' },
      { label: 'Ask Aadil', href: '/projects/ask-aadil' }
    ],
    faceTransform: 'rotateY(90deg) translateZ(var(--cube-half))',
    targetRotation: { rotateX: 0, rotateY: -90 }
  },
  {
    index: 2,
    id: 'backend-fullstack',
    code: '03 // BACKEND & FULL-STACK',
    faceName: 'Back',
    title: 'Backend & Full-Stack Engineering',
    shortLabel: 'Backend & Stack',
    summary:
      'Asynchronous FastAPI pipelines, Clean Architecture TypeScript services, Supabase RLS, and SSE streaming clients.',
    icon: 'terminal',
    primaryRoute: '/projects/loom-ai',
    primaryCtaLabel: 'Explore Loom AI',
    supportingLinks: [
      { label: 'Solace AI', href: '/projects/solace-ai' },
      { label: 'Systems', href: '/systems' }
    ],
    faceTransform: 'rotateY(180deg) translateZ(var(--cube-half))',
    targetRotation: { rotateX: 0, rotateY: -180 }
  },
  {
    index: 3,
    id: 'evaluation-reliability',
    code: '04 // EVALUATION & RELIABILITY',
    faceName: 'Left',
    title: 'Evaluation, Reliability & Testing',
    shortLabel: 'Reliability & QA',
    summary:
      'Deterministic behavioral contracts, Fisher covariance uncertainty abstention, CER/WER auditing, and SHA-256 ledgers.',
    icon: 'shield',
    primaryRoute: '/verification',
    primaryCtaLabel: 'View Verification',
    supportingLinks: [
      { label: 'AI Reliability', href: '/projects/ai-reliability' },
      { label: 'OCR Evaluator', href: '/projects/ocr-evaluator' }
    ],
    faceTransform: 'rotateY(-90deg) translateZ(var(--cube-half))',
    targetRotation: { rotateX: 0, rotateY: 90 }
  },
  {
    index: 4,
    id: 'automation-engineering-tools',
    code: '05 // AUTOMATION & SOLVERS',
    faceName: 'Top',
    title: 'Automation & Engineering Tools',
    shortLabel: 'Tools & Solvers',
    summary:
      'Closed-form Saint-Venant solvers, OpenCascade 3D BRep CAD, headless TeX Live compilers, and Map-Reduce ETL.',
    icon: 'binary',
    primaryRoute: '/projects/design-automation',
    primaryCtaLabel: 'Explore EDA CAD',
    supportingLinks: [
      { label: 'AI Worksheets', href: '/projects/ai-worksheets' },
      { label: 'Curriculum ETL', href: '/projects/curriculum-etl' }
    ],
    faceTransform: 'rotateX(90deg) translateZ(var(--cube-half))',
    targetRotation: { rotateX: -90, rotateY: 0 }
  },
  {
    index: 5,
    id: 'human-centered-ai',
    code: '06 // HUMAN-CENTERED AI',
    faceName: 'Bottom',
    title: 'Human-Centered AI & Interaction',
    shortLabel: 'Human-Centered AI',
    summary:
      'Pre-LLM crisis safety gates, consent-gated emotional memory, zero-retention voice privacy, and transparent trade-offs.',
    icon: 'layers',
    primaryRoute: '/projects/solace-ai',
    primaryCtaLabel: 'Explore Solace AI',
    supportingLinks: [{ label: 'Engineering Journal', href: '/journal' }],
    faceTransform: 'rotateX(-90deg) translateZ(var(--cube-half))',
    targetRotation: { rotateX: 90, rotateY: 0 }
  }
] as const

