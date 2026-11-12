/**
 * RAG Laboratory Coordinator Service
 * Exposes a unified interface for executing BM25, Vector, and Hybrid RRF pipelines,
 * context construction, grounded synthesis, citation verification, and metric evaluation.
 */

import {
  CorpusChunk,
  CorpusDocument,
  RetrievalMethod,
  ScoredChunk,
  ContextBuildResult,
  GroundedAnswerResult,
  RetrievalEvaluationMetrics,
  GoldenTestCase
} from '../../data/rag/types'
import { CORPUS_CHUNKS, CORPUS_DOCUMENTS, CORPUS_MANIFEST } from '../../data/rag/corpus_v1'
import { GOLDEN_EVALUATION_DATASET } from '../../data/rag/golden_eval_dataset_v1'
import { BM25Engine } from './bm25'
import { VectorSearchEngine } from './vectorSearch'
import { HybridRRFEngine } from './hybridRrf'
import { ContextBuilder } from './contextBuilder'
import { GroundedSynthesizer } from './groundedSynthesizer'
import { CitationValidator } from './citationValidator'
import { MetricsCalculator } from './metrics'

export interface PipelineExecutionResult {
  query: string
  method: RetrievalMethod
  topK: number
  retrievedChunks: ScoredChunk[]
  bm25Comparison?: ScoredChunk[]
  vectorComparison?: ScoredChunk[]
  context: ContextBuildResult
  answerResult: GroundedAnswerResult
  metrics?: RetrievalEvaluationMetrics
  executionTimingMs: {
    retrievalMs: number
    contextBuildMs: number
    synthesisMs: number
    totalMs: number
  }
}

export class RagLabService {
  private chunks: CorpusChunk[]
  private documents: CorpusDocument[]
  private bm25: BM25Engine
  private vector: VectorSearchEngine
  private hybrid: HybridRRFEngine
  private contextBuilder: ContextBuilder
  private synthesizer: GroundedSynthesizer
  private validator: CitationValidator

  constructor() {
    this.chunks = CORPUS_CHUNKS
    this.documents = CORPUS_DOCUMENTS
    this.bm25 = new BM25Engine(this.chunks)
    this.vector = new VectorSearchEngine(this.chunks)
    this.hybrid = new HybridRRFEngine(this.chunks)
    this.contextBuilder = new ContextBuilder()
    this.synthesizer = new GroundedSynthesizer(this.chunks)
    this.validator = new CitationValidator(this.chunks)
  }

  public executePipeline(
    query: string,
    method: RetrievalMethod = 'hybrid',
    topK = 5,
    projectFilter?: string,
    contextBudget = 350
  ): PipelineExecutionResult {
    const t0 = performance.now()

    // 1. Retrieval Stage
    let retrievedChunks: ScoredChunk[] = []
    let bm25Comparison: ScoredChunk[] | undefined
    let vectorComparison: ScoredChunk[] | undefined

    if (method === 'bm25') {
      retrievedChunks = this.bm25.search(query, topK, projectFilter)
    } else if (method === 'vector') {
      retrievedChunks = this.vector.search(query, topK, projectFilter)
    } else {
      // Hybrid RRF
      const hybridRes = this.hybrid.search(query, topK, 60, projectFilter)
      retrievedChunks = hybridRes.combinedResults
      bm25Comparison = hybridRes.bm25Results.slice(0, topK)
      vectorComparison = hybridRes.vectorResults.slice(0, topK)
    }

    const t1 = performance.now()

    // 2. Context Construction Stage
    const context = this.contextBuilder.build(retrievedChunks, contextBudget)
    const t2 = performance.now()

    // 3. Grounded Synthesis & Citation Validation Stage
    const answerResult = this.synthesizer.synthesize(query, context.includedChunks)
    const t3 = performance.now()

    // 4. Metric calculation if matching golden test case exists
    const matchingTest = GOLDEN_EVALUATION_DATASET.find(
      t => t.query.toLowerCase() === query.toLowerCase().trim()
    )
    let metrics: RetrievalEvaluationMetrics | undefined
    if (matchingTest) {
      metrics = MetricsCalculator.calculateSingle(retrievedChunks, matchingTest, topK)
    }

    return {
      query,
      method,
      topK,
      retrievedChunks,
      bm25Comparison,
      vectorComparison,
      context,
      answerResult,
      metrics,
      executionTimingMs: {
        retrievalMs: Number((t1 - t0).toFixed(2)),
        contextBuildMs: Number((t2 - t1).toFixed(2)),
        synthesisMs: Number((t3 - t2).toFixed(2)),
        totalMs: Number((t3 - t0).toFixed(2))
      }
    }
  }

  public runFullBenchmark(): {
    aggregateMetrics: {
      meanPrecisionAtK: number
      meanRecallAtK: number
      meanReciprocalRank: number
      meanNdcgAtK: number
      totalEvaluated: number
    }
    caseResults: Array<{
      testId: string
      query: string
      category: string
      precisionAt5: number
      recallAt5: number
      reciprocalRank: number
      ndcgAt5: number
      abstentionCorrect: boolean
    }>
  } {
    const caseMetrics: RetrievalEvaluationMetrics[] = []
    const caseSummaries = []

    for (const testCase of GOLDEN_EVALUATION_DATASET) {
      const pipelineRes = this.executePipeline(testCase.query, 'hybrid', 5)
      const metric = MetricsCalculator.calculateSingle(pipelineRes.retrievedChunks, testCase, 5)
      caseMetrics.push(metric)

      const abstentionCorrect =
        testCase.expectedAbstention === pipelineRes.answerResult.isAbstention

      caseSummaries.push({
        testId: testCase.id,
        query: testCase.query,
        category: testCase.category,
        precisionAt5: metric.precisionAtK,
        recallAt5: metric.recallAtK,
        reciprocalRank: metric.reciprocalRank,
        ndcgAt5: metric.ndcgAtK,
        abstentionCorrect
      })
    }

    const aggregate = MetricsCalculator.calculateAggregate(caseMetrics)

    return {
      aggregateMetrics: aggregate,
      caseResults: caseSummaries
    }
  }

  public getCorpusChunks(): CorpusChunk[] {
    return this.chunks
  }

  public getCorpusDocuments(): CorpusDocument[] {
    return this.documents
  }

  public getCorpusManifest() {
    return CORPUS_MANIFEST
  }

  public getGoldenDataset(): GoldenTestCase[] {
    return GOLDEN_EVALUATION_DATASET
  }
}

// Singleton instance for in-app client and server execution
export const ragLabService = new RagLabService()
