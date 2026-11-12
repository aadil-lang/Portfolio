/**
 * Comparison Workspace Data Models & TypeScript Contracts
 * Phase 6.5 — Interactive Project Comparison
 *
 * Enforces Level 1 standard of engineering-security-reliability.
 * All dimensions are qualitative, architectural, and source-grounded.
 * Zero vanity scores, difficulty ratings, or unearned leaderboards.
 */

export type ComparisonDimensionId =
  | 'problem-objective'
  | 'architectural-pattern'
  | 'ai-vs-deterministic'
  | 'data-retrieval'
  | 'orchestration-state'
  | 'failure-containment'
  | 'evaluation-verification'
  | 'hitl-governance'
  | 'core-trade-offs'
  | 'individual-contribution'

export interface DimensionMetadata {
  id: ComparisonDimensionId
  label: string
  shortLabel: string
  description: string
  focusArea: string
}

export interface DimensionDetail {
  dimensionId: ComparisonDimensionId
  title: string
  summary: string
  keyMechanisms: string[]
  evidenceIds?: string[]
  componentIds?: string[]
  decisionIds?: string[]
  qualificationNote?: string
}

export interface ComparisonTradeOff {
  title: string
  chosenApproach: string
  alternativeRejected: string
  technicalRationale: string
  acceptedCompromise: string
  evidenceId?: string
  decisionId?: string
}

export interface ProjectComparisonProfile {
  slug: string
  name: string
  tagline: string
  category: string
  systemRole: string
  dimensions: Record<ComparisonDimensionId, DimensionDetail>
  tradeOffs: ComparisonTradeOff[]
  caseStudyRoute: string
  architectureRoute: string
  verificationRoute: string
  decisionRecordsRoute: string
}

export interface ComparisonPreset {
  id: string
  title: string
  tagline: string
  projectSlugs: [string, string] | [string, string, string]
  rationale: string
  keyContrastDimension: ComparisonDimensionId
  focusTakeaways: string[]
}

export const COMPARISON_DIMENSIONS: DimensionMetadata[] = [
  {
    id: 'problem-objective',
    label: 'Problem & Objective',
    shortLabel: 'Problem',
    description: 'Core engineering challenge, operational scope, and target user workflow',
    focusArea: 'Domain requirements and primary functional goals',
  },
  {
    id: 'architectural-pattern',
    label: 'Architectural Pattern',
    shortLabel: 'Architecture',
    description: 'High-level architectural topology, structural tiers, and execution boundaries',
    focusArea: 'System topology, paradigm, and tier separation',
  },
  {
    id: 'ai-vs-deterministic',
    label: 'AI vs Deterministic Boundary',
    shortLabel: 'AI vs Deterministic',
    description: 'Probabilistic generation boundaries vs deterministic validation and calculation gates',
    focusArea: 'Model responsibilities vs deterministic code enforcement',
  },
  {
    id: 'data-retrieval',
    label: 'Data & Retrieval Model',
    shortLabel: 'Data & Retrieval',
    description: 'Storage engine, vector indexing, retrieval scoring, and schema representations',
    focusArea: 'Persistence layers, vector databases, and indexing algorithms',
  },
  {
    id: 'orchestration-state',
    label: 'Orchestration & State Management',
    shortLabel: 'State & Flow',
    description: 'Execution control flow, state graphs, async worker queues, and event dispatching',
    focusArea: 'Control flow, state machines, and concurrency paradigms',
  },
  {
    id: 'failure-containment',
    label: 'Failure Handling & Circuit Breakers',
    shortLabel: 'Fault Handling',
    description: 'Circuit breakers, watchdog timeouts, epistemic abstentions, and fallback mechanisms',
    focusArea: 'Graceful degradation, blast radius containment, and timeouts',
  },
  {
    id: 'evaluation-verification',
    label: 'Evaluation & Verification Modality',
    shortLabel: 'Verification',
    description: 'Test suites, golden benchmarks, mathematical proofs, and perturbation matrices',
    focusArea: 'Empirical verification, test automation, and benchmark grounding',
  },
  {
    id: 'hitl-governance',
    label: 'Human-in-the-Loop & Governance',
    shortLabel: 'Governance',
    description: 'Human authorization gates, cryptographic signatures, and audit provenance ledgers',
    focusArea: 'Safety contracts, HITL approval queues, and tamper-evident audit trails',
  },
  {
    id: 'core-trade-offs',
    label: 'Deliberate Architectural Trade-offs',
    shortLabel: 'Trade-offs',
    description: 'Explicit compromises accepted (e.g. latency vs cost, determinism vs flexibility)',
    focusArea: 'Conscious engineering sacrifices and technical trade-offs',
  },
  {
    id: 'individual-contribution',
    label: 'Attribution & Individual Contribution',
    shortLabel: 'Attribution',
    description: 'Personal engineering ownership vs collaborative platform architecture',
    focusArea: 'Sole authorship vs team contribution boundaries',
  },
]

