/**
 * Deterministic Retrieval Evaluation Metrics Calculator
 * Implements mathematically verified formulas for:
 * - Precision@K
 * - Recall@K
 * - Reciprocal Rank (RR) & Mean Reciprocal Rank (MRR)
 * - Normalized Discounted Cumulative Gain (nDCG@K)
 */

import { ScoredChunk, RetrievalEvaluationMetrics, GoldenTestCase } from '../../data/rag/types'

export class MetricsCalculator {
  public static calculateSingle(
    retrieved: ScoredChunk[],
    testCase: GoldenTestCase,
    k = 5
  ): RetrievalEvaluationMetrics {
    const topK = retrieved.slice(0, k)
    const expectedIds = new Set(testCase.expectedChunkIds)
    const totalRelevantAvailable = expectedIds.size

    // If expected relevance is 0 (out of domain abstention), handle edge cases
    if (totalRelevantAvailable === 0) {
      return {
        precisionAtK: retrieved.length === 0 ? 1.0 : 0.0,
        recallAtK: 1.0,
        reciprocalRank: 0.0,
        mrr: 0.0,
        ndcgAtK: retrieved.length === 0 ? 1.0 : 0.0,
        k,
        relevantRetrievedCount: 0,
        totalRelevantAvailable: 0,
        groundTruthRelevantChunkIds: []
      }
    }

    let relevantRetrievedCount = 0
    let firstRelevantRank = 0

    topK.forEach((item, idx) => {
      if (expectedIds.has(item.chunk.id)) {
        relevantRetrievedCount++
        if (firstRelevantRank === 0) {
          firstRelevantRank = idx + 1
        }
      }
    })

    const precisionAtK = Number((relevantRetrievedCount / k).toFixed(4))
    const recallAtK = Number((relevantRetrievedCount / totalRelevantAvailable).toFixed(4))
    const reciprocalRank = firstRelevantRank > 0 ? Number((1 / firstRelevantRank).toFixed(4)) : 0.0

    // Compute nDCG@K using graded relevance (0 to 3)
    let dcg = 0
    topK.forEach((item, idx) => {
      const rel = testCase.relevanceGrades[item.chunk.id] || 0
      dcg += (Math.pow(2, rel) - 1) / Math.log2(idx + 2)
    })

    // Compute Ideal DCG (IDCG@K)
    const idealGrades = (Object.values(testCase.relevanceGrades) as number[])
      .sort((a, b) => b - a)
      .slice(0, k)
    let idcg = 0
    idealGrades.forEach((rel, idx) => {
      idcg += (Math.pow(2, rel) - 1) / Math.log2(idx + 2)
    })

    const ndcgAtK = idcg > 0 ? Number((dcg / idcg).toFixed(4)) : 0.0

    return {
      precisionAtK,
      recallAtK,
      reciprocalRank,
      mrr: reciprocalRank,
      ndcgAtK,
      k,
      relevantRetrievedCount,
      totalRelevantAvailable,
      groundTruthRelevantChunkIds: testCase.expectedChunkIds
    }
  }

  public static calculateAggregate(
    results: RetrievalEvaluationMetrics[]
  ): {
    meanPrecisionAtK: number
    meanRecallAtK: number
    meanReciprocalRank: number
    meanNdcgAtK: number
    totalEvaluated: number
  } {
    if (results.length === 0) {
      return {
        meanPrecisionAtK: 0,
        meanRecallAtK: 0,
        meanReciprocalRank: 0,
        meanNdcgAtK: 0,
        totalEvaluated: 0
      }
    }

    const n = results.length
    const sumP = results.reduce((acc, r) => acc + r.precisionAtK, 0)
    const sumR = results.reduce((acc, r) => acc + r.recallAtK, 0)
    const sumRR = results.reduce((acc, r) => acc + r.reciprocalRank, 0)
    const sumNdcg = results.reduce((acc, r) => acc + r.ndcgAtK, 0)

    return {
      meanPrecisionAtK: Number((sumP / n).toFixed(4)),
      meanRecallAtK: Number((sumR / n).toFixed(4)),
      meanReciprocalRank: Number((sumRR / n).toFixed(4)),
      meanNdcgAtK: Number((sumNdcg / n).toFixed(4)),
      totalEvaluated: n
    }
  }
}
