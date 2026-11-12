/**
 * Phase 4 RAG Laboratory Types
 * Authoritative types for versioned documents, chunks, retrieval results,
 * evaluation metrics, and golden datasets.
 */

export type DocumentType =
  | 'profile'
  | 'specification'
  | 'architecture'
  | 'evaluation'
  | 'metric_registry'
  | 'case_study'

export interface CorpusDocument {
  id: string
  projectId: string
  title: string
  documentType: DocumentType
  sourceReference: string
  category: string
  sourceVersion: string
  verificationStatus: 'verified' | 'qualified' | 'provisional'
  content: string
}

export interface CorpusChunk {
  id: string
  documentId: string
  projectId: string
  sectionTitle: string
  chunkIndex: number
  text: string
  tokenCount: number
  charCount: number
  sourceProvenance: string
  tags: string[]
  verificationStatus: 'verified' | 'qualified' | 'provisional'
}

export interface CorpusManifest {
  version: string
  releaseDate: string
  documentCount: number
  chunkCount: number
  totalTokenCount: number
  integrityHash: string
  sourceProvenanceList: string[]
}

export type RetrievalMethod = 'bm25' | 'vector' | 'hybrid'

export interface ScoredChunk {
  chunk: CorpusChunk
  score: number
  rank: number
  scoreType: 'bm25' | 'cosine_similarity' | 'rrf_score'
  termMatches?: string[]
  explanation: string
}

export interface ContextChunkInclusion {
  chunk: CorpusChunk
  status: 'included' | 'excluded'
  rank: number
  score: number
  scoreType: string
  tokenCount: number
  cumulativeTokens: number
  exclusionReason?: 'budget_exceeded' | 'low_relevance' | 'duplicate_content'
}

export interface ContextBuildResult {
  includedChunks: CorpusChunk[]
  allCandidates: ContextChunkInclusion[]
  totalContextTokens: number
  budgetTokens: number
  budgetUtilizationPct: number
  truncationApplied: boolean
}

export interface CitationVerification {
  citationId: string
  chunkId: string
  documentId: string
  sourceTitle: string
  claimText: string
  supportingExcerpt: string
  isChunkFound: boolean
  isDocumentMatch: boolean
  overlapScore: number // 0.0 to 1.0 token Jaccard / substring match
  verificationStatus: 'verified_supported' | 'partially_supported' | 'unsupported_hallucination'
}

export interface GroundedAnswerResult {
  query: string
  answer: string
  citations: CitationVerification[]
  isAbstention: boolean
  abstentionReason?: string
  confidenceScore: number // based strictly on retrieved relevance and citation support
  evidenceSupportRatio: number
}

export interface RetrievalEvaluationMetrics {
  precisionAtK: number
  recallAtK: number
  reciprocalRank: number // 1 / rank of first relevant chunk
  mrr: number
  ndcgAtK: number
  k: number
  relevantRetrievedCount: number
  totalRelevantAvailable: number
  groundTruthRelevantChunkIds: string[]
}

export interface GoldenTestCase {
  id: string
  query: string
  category:
    | 'sufficient_evidence'
    | 'partial_evidence'
    | 'conflicting_or_qualified'
    | 'out_of_domain_abstention'
    | 'false_premise_abstention'
  targetProjectId?: string
  expectedDocumentIds: string[]
  expectedChunkIds: string[]
  relevanceGrades: Record<string, number> // chunkId -> grade (0 to 3)
  expectedAbstention: boolean
  expectedAbstentionReason?: string
  requiredFacts: string[]
  evaluationRationale: string
}

