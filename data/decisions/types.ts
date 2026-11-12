export type DecisionStatus = 'historically_documented' | 'retrospective_analysis'

export type DecisionCategory =
  | 'Architecture'
  | 'AI & LLM Safety'
  | 'Data & RAG'
  | 'Reliability & Testing'
  | 'Performance & Scale'
  | 'Security & Governance'
  | 'Mechanical & Mathematical'

export interface Alternative {
  name: string
  description: string
  whyRejectedOrDeferred: string
  disadvantagesIntroduced?: string
}

export interface VerificationEvidence {
  type: 'test_suite' | 'source_code' | 'benchmark' | 'documentation' | 'schema' | 'commit'
  label: string
  location?: string
  measurement?: string
  qualification?: string
}

export interface DecisionRecord {
  id: string
  title: string
  status: DecisionStatus
  category: DecisionCategory
  summary: string
  context: string
  constraints: string[]
  chosenApproach: {
    title: string
    details: string
    codeReference?: string
  }
  alternatives: Alternative[]
  consequences: {
    positive: string[]
    limitations: string[]
  }
  verification: VerificationEvidence[]
  futureRevisitTriggers: string[]
}

