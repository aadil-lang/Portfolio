export type ExplorationLevel = 'level-1-full' | 'level-2-focused' | 'level-3-case-study'

export type ArchitectureCategory =
  | 'agentic-orchestration'
  | 'retrieval-grounding'
  | 'reliability-verification'
  | 'data-transformation'
  | 'deterministic-computation'

export type NodeClassification = 'deterministic' | 'probabilistic' | 'external' | 'human_gate'

export interface ArchitectureNode {
  id: string
  label: string
  layer: string
  classification: NodeClassification
  responsibility: string
  sourceLocation: string
  inputs: string[]
  outputs: string[]
  dependencies: string[]
  validationRule?: string
  verificationEvidence: {
    type: 'test_suite' | 'source_code' | 'benchmark' | 'decision'
    label: string
    measurement: string
    location?: string
  }
}

export interface ArchitectureEdge {
  from: string
  to: string
  label: string
  type: 'sync' | 'async' | 'event_stream' | 'short_circuit' | 'fallback'
  isFailurePath?: boolean
}

export interface ExecutionStep {
  stepNumber: number
  title: string
  description: string
  activeNodeId: string
  activeEdgeIds?: string[]
  dataPayloadSummary: string
  nature: 'deterministic' | 'probabilistic' | 'gate'
}

export interface FailureBoundary {
  id: string
  name: string
  triggerCondition: string
  containmentAction: string
  sourceFile: string
  verifiedTest: string
}

export interface SystemArchitecture {
  id: string
  slug: string
  name: string
  tagline: string
  category: ArchitectureCategory
  explorationLevel: ExplorationLevel
  technologies: string[]
  distinctiveEngineeringContribution: string
  ownership: 'independent' | 'hackathon' | 'wayground-independent' | 'wayground-team'
  nodes: ArchitectureNode[]
  edges: ArchitectureEdge[]
  executionFlow: ExecutionStep[]
  failureBoundaries: FailureBoundary[]
  decisionReferences?: string[]
  externalRoute: string
}

