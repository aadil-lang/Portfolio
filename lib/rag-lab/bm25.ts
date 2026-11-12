/**
 * Okapi BM25 Retrieval Engine
 * Strictly implements standard Okapi BM25 formula with term saturation
 * and document length normalization.
 *
 * BM25(D, Q) = sum_{q in Q} IDF(q) * (f(q, D) * (k1 + 1)) / (f(q, D) + k1 * (1 - b + b * (|D| / avgdl)))
 * where IDF(q) = ln((N - n(q) + 0.5) / (n(q) + 0.5) + 1.0)
 */

import { CorpusChunk, ScoredChunk } from '../../data/rag/types'
import { tokenize } from './tokenizer'

export interface BM25Config {
  k1: number // term frequency saturation parameter (standard: 1.2 to 2.0)
  b: number  // document length normalization parameter (standard: 0.75)
}

export const DEFAULT_BM25_CONFIG: BM25Config = {
  k1: 1.2,
  b: 0.75
}

export class BM25Engine {
  private chunks: CorpusChunk[]
  private config: BM25Config
  private docTokens: Map<string, string[]> = new Map()
  private docFrequencies: Map<string, number> = new Map() // n(q)
  private totalDocs = 0
  private avgDocLength = 0
  private idfCache: Map<string, number> = new Map()

  constructor(chunks: CorpusChunk[], config: BM25Config = DEFAULT_BM25_CONFIG) {
    this.chunks = chunks
    this.config = config
    this.buildIndex()
  }

  private buildIndex(): void {
    this.totalDocs = this.chunks.length
    let totalLength = 0

    // 1. Tokenize all chunks and compute term document frequencies
    for (const chunk of this.chunks) {
      // Include chunk text + tags + section title for complete lexical indexing
      const fullText = `${chunk.sectionTitle} ${chunk.text} ${chunk.tags.join(' ')}`
      const tokens = tokenize(fullText)
      this.docTokens.set(chunk.id, tokens)
      totalLength += tokens.length

      const uniqueTerms = new Set(tokens)
      for (const term of uniqueTerms) {
        this.docFrequencies.set(term, (this.docFrequencies.get(term) || 0) + 1)
      }
    }

    this.avgDocLength = this.totalDocs > 0 ? totalLength / this.totalDocs : 1

    // 2. Pre-cache standard IDF values for all observed terms
    for (const [term, n_q] of this.docFrequencies.entries()) {
      const idf = Math.log(((this.totalDocs - n_q + 0.5) / (n_q + 0.5)) + 1.0)
      this.idfCache.set(term, Math.max(0.01, idf)) // floor small positive epsilon
    }
  }

  public getIDF(term: string): number {
    if (this.idfCache.has(term)) {
      return this.idfCache.get(term)!
    }
    // For unseen terms in corpus: IDF with n_q = 0
    return Math.log(((this.totalDocs + 0.5) / 0.5) + 1.0)
  }

  public search(query: string, topK = 5, projectFilter?: string): ScoredChunk[] {
    const queryTokens = tokenize(query)
    if (queryTokens.length === 0) return []

    const results: Array<{ chunk: CorpusChunk; score: number; termMatches: string[] }> = []

    for (const chunk of this.chunks) {
      if (projectFilter && projectFilter !== 'all' && chunk.projectId !== projectFilter) {
        continue
      }

      const dTokens = this.docTokens.get(chunk.id) || []
      const docLength = dTokens.length
      if (docLength === 0) continue

      // Compute Term Frequencies in this doc
      const tfMap: Map<string, number> = new Map()
      for (const t of dTokens) {
        tfMap.set(t, (tfMap.get(t) || 0) + 1)
      }

      let bm25Score = 0
      const matchedTerms: string[] = []

      for (const q of queryTokens) {
        const tf = tfMap.get(q) || 0
        if (tf > 0) {
          matchedTerms.push(q)
          const idf = this.getIDF(q)
          const numerator = tf * (this.config.k1 + 1)
          const denominator =
            tf + this.config.k1 * (1 - this.config.b + this.config.b * (docLength / this.avgDocLength))
          bm25Score += idf * (numerator / denominator)
        }
      }

      if (bm25Score > 0) {
        results.push({
          chunk,
          score: bm25Score,
          termMatches: matchedTerms
        })
      }
    }

    // Sort descending by score
    results.sort((a, b) => b.score - a.score)

    return results.slice(0, topK).map((item, idx) => ({
      chunk: item.chunk,
      score: Number(item.score.toFixed(4)),
      rank: idx + 1,
      scoreType: 'bm25',
      termMatches: item.termMatches,
      explanation: `BM25 match on ${item.termMatches.length} term(s) [${item.termMatches.join(', ')}]. Length norm: ${(this.docTokens.get(item.chunk.id)?.length || 0)} tokens vs avgdl ${this.avgDocLength.toFixed(1)}.`
    }))
  }

  public getStats() {
    return {
      totalDocs: this.totalDocs,
      avgDocLength: Number(this.avgDocLength.toFixed(2)),
      vocabularySize: this.docFrequencies.size,
      k1: this.config.k1,
      b: this.config.b
    }
  }
}
