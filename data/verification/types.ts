/**
 * Phase 6.4 — Portfolio-Wide Verification & Evidence Dashboard
 * Canonical Types & Data Invariants
 *
 * Strict implementation under Level 1 of engineering-security-reliability.
 */

export type VerificationModality =
  | 'automated-suite'
  | 'mathematical-verification'
  | 'golden-benchmark'
  | 'deterministic-boundary'
  | 'security-containment'
  | 'performance-cache'
  | 'architectural-invariant'

export type VerificationStatus =
  | 'VERIFIED'
  | 'REPORTED'
  | 'PARTIALLY VERIFIED'
  | 'HISTORICAL'
  | 'UNVERIFIED'
  | 'QUALIFIED'
  | 'SUPERSEDED'

export type ReproducibilityLevel =
  | 'IN_REPO_AUTOMATED'
  | 'UPSTREAM_HARNESS'
  | 'DETERMINISTIC_PROOF'
  | 'BENCHMARK_SUITE'
  | 'MANUAL_INSPECTION'

export type HistoricalClassification = 'CURRENT' | 'HISTORICAL'

export interface VerificationEvidence {
  id: string
  title: string
  projectSlug: string
  projectName: string
  category: VerificationModality
  status: VerificationStatus
  verificationMethod: string
  sourceFile: string
  lineRange?: string
  executionCommand: string
  verificationDate?: string
  metricValue?: string
  metricUnit?: string
  metricContext?: string
  scope: string
  conditions: string
  limitations: string
  reproducibility: ReproducibilityLevel
  historicalClassification: HistoricalClassification
  relatedArchitectureComponent?: string
  relatedDecisionRecord?: string
  summary: string
}

export interface ProjectVerificationSummary {
  slug: string
  name: string
  category: string
  totalEvidenceCount: number
  inRepoAssertions: number
  upstreamTests: number
  status: VerificationStatus
  primaryModality: VerificationModality
  evidenceIds: string[]
  keyOutcome: string
  limitations: string
  caseStudyRoute: string
}

export interface VerificationMetricsDeck {
  totalRegisteredEvidence: number
  inRepoAssertions: number
  upstreamTests: number
  goldenBenchmarkCases: number
  zeroRegressions: boolean
  meanPAt5: number
  meanRAt5: number
  meanMRR: number
  meanNDCGAt5: number
  statusCounts: Record<VerificationStatus, number>
  categoryCounts: Record<VerificationModality, number>
}

