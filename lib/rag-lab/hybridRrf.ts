/**
 * Reciprocal Rank Fusion (RRF) Hybrid Retrieval Engine
 * Strictly implements standard RRF formula:
 *
 * RRF(d) = sum_{m in Methods} 1 / (k + rank_m(d))
 *
 * Combines Okapi BM25 and Normalized Vector Space search with a configurable
 * smoothing constant k (standard: 60).
 */

import { CorpusChunk, ScoredChunk } from '../../data/rag/types'
import { BM25Engine } from './bm25'
import { VectorSearchEngine } from './vectorSearch'

export interface RRFConfig {
  k: number // smoothing constant (standard: 60)
  topK: number
}

export const DEFAULT_RRF_CONFIG: RRFConfig = {
  k: 60,
  topK: 5
}

export interface HybridRRFResult {
  combinedResults: ScoredChunk[]
  bm25Results: ScoredChunk[]
  vectorResults: ScoredChunk[]
  fusionConstant: number
}

export class HybridRRFEngine {
  private bm25: BM25Engine
  private vector: VectorSearchEngine

  constructor(chunks: CorpusChunk[]) {
    this.bm25 = new BM25Engine(chunks)
    this.vector = new VectorSearchEngine(chunks)
  }

  public search(
    query: string,
    topK = DEFAULT_RRF_CONFIG.topK,
    k = DEFAULT_RRF_CONFIG.k,
    projectFilter?: string
  ): HybridRRFResult {
    // 1. Execute both retrieval passes to a depth of max(topK * 2, 10)
    const retrievalDepth = Math.max(topK * 2, 10)
    const bm25Hits = this.bm25.search(query, retrievalDepth, projectFilter)
    const vectorHits = this.vector.search(query, retrievalDepth, projectFilter)

    const rrfScores = new Map<
      string,
      {
        chunk: CorpusChunk
        rrfScore: number
        bm25Rank?: number
        bm25Score?: number
        vectorRank?: number
        vectorScore?: number
      }
    >()

    // Accumulate BM25 reciprocal ranks
    for (const hit of bm25Hits) {
      const id = hit.chunk.id
      const contribution = 1 / (k + hit.rank)
      const current = rrfScores.get(id) || {
        chunk: hit.chunk,
        rrfScore: 0,
        bm25Rank: hit.rank,
        bm25Score: hit.score
      }
      current.rrfScore += contribution
      current.bm25Rank = hit.rank
      current.bm25Score = hit.score
      rrfScores.set(id, current)
    }

    // Accumulate Vector reciprocal ranks
    for (const hit of vectorHits) {
      const id = hit.chunk.id
      const contribution = 1 / (k + hit.rank)
      const current = rrfScores.get(id) || {
        chunk: hit.chunk,
        rrfScore: 0,
        vectorRank: hit.rank,
        vectorScore: hit.score
      }
      current.rrfScore += contribution
      current.vectorRank = hit.rank
      current.vectorScore = hit.score
      rrfScores.set(id, current)
    }

    // Sort by final combined RRF score
    const sorted = Array.from(rrfScores.values()).sort((a, b) => b.rrfScore - a.rrfScore)

    const combined: ScoredChunk[] = sorted.slice(0, topK).map((item, idx) => {
      const bm25Note = item.bm25Rank ? `BM25 #` + item.bm25Rank : `BM25: unranked`
      const vecNote = item.vectorRank ? `Vector #` + item.vectorRank : `Vector: unranked`
      return {
        chunk: item.chunk,
        score: Number(item.rrfScore.toFixed(6)),
        rank: idx + 1,
        scoreType: 'rrf_score',
        explanation: `RRF(k=${k}) = ${item.rrfScore.toFixed(6)} [${bm25Note}, ${vecNote}]`
      }
    })

    return {
      combinedResults: combined,
      bm25Results: bm25Hits,
      vectorResults: vectorHits,
      fusionConstant: k
    }
  }

  public getBM25Engine(): BM25Engine {
    return this.bm25
  }

  public getVectorEngine(): VectorSearchEngine {
    return this.vector
  }
}
