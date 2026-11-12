/**
 * Vector Space Retrieval Engine
 * Strictly implements normalized vector space representations with Cosine Similarity.
 *
 * cos(u, v) = (u . v) / (||u|| * ||v||)
 *
 * Utilizes subword n-grams and term-frequency inverse-document-frequency (TF-IDF)
 * vector weighting to capture semantic relationships and morphology in-process
 * without third-party network dependencies.
 */

import { CorpusChunk, ScoredChunk } from '../../data/rag/types'
import { tokenize, extractNgrams } from './tokenizer'

export class VectorSearchEngine {
  private chunks: CorpusChunk[]
  private vocabulary: string[] = []
  private vocabIndex: Map<string, number> = new Map()
  private chunkVectors: Map<string, Float32Array> = new Map()
  private idfWeights: Float32Array = new Float32Array(0)

  constructor(chunks: CorpusChunk[]) {
    this.chunks = chunks
    this.buildVectorSpace()
  }

  private buildVectorSpace(): void {
    const vocabSet = new Set<string>()
    const docTermFreqs: Array<Map<string, number>> = []

    for (const chunk of this.chunks) {
      const fullText = `${chunk.sectionTitle} ${chunk.text} ${chunk.tags.join(' ')}`
      const tokens = tokenize(fullText)
      const bigrams = extractNgrams(tokens, 2)
      const features = [...tokens, ...bigrams]

      const tfMap = new Map<string, number>()
      for (const feat of features) {
        vocabSet.add(feat)
        tfMap.set(feat, (tfMap.get(feat) || 0) + 1)
      }
      docTermFreqs.push(tfMap)
    }

    this.vocabulary = Array.from(vocabSet)
    this.vocabulary.forEach((term, idx) => this.vocabIndex.set(term, idx))

    const N = this.chunks.length
    const dim = this.vocabulary.length
    this.idfWeights = new Float32Array(dim)

    // Compute IDF for all vocabulary features
    for (let i = 0; i < dim; i++) {
      const term = this.vocabulary[i]
      let docCount = 0
      for (const tfMap of docTermFreqs) {
        if (tfMap.has(term)) docCount++
      }
      this.idfWeights[i] = Math.log((N + 1) / (docCount + 1)) + 1.0
    }

    // Build L2-normalized vector for each chunk
    for (let d = 0; d < N; d++) {
      const chunk = this.chunks[d]
      const tfMap = docTermFreqs[d]
      const vec = new Float32Array(dim)
      let sumSquares = 0

      for (const [term, tf] of tfMap.entries()) {
        const idx = this.vocabIndex.get(term)
        if (idx !== undefined) {
          // Sublinear TF scaling
          const w = (1 + Math.log(tf)) * this.idfWeights[idx]
          vec[idx] = w
          sumSquares += w * w
        }
      }

      // L2 Normalize
      const norm = Math.sqrt(sumSquares)
      if (norm > 0) {
        for (let i = 0; i < dim; i++) {
          vec[i] /= norm
        }
      }

      this.chunkVectors.set(chunk.id, vec)
    }
  }

  public search(query: string, topK = 5, projectFilter?: string): ScoredChunk[] {
    const queryTokens = tokenize(query)
    const bigrams = extractNgrams(queryTokens, 2)
    const queryFeatures = [...queryTokens, ...bigrams]

    if (queryFeatures.length === 0) return []

    const dim = this.vocabulary.length
    const qVec = new Float32Array(dim)
    const queryTf = new Map<string, number>()
    for (const f of queryFeatures) {
      queryTf.set(f, (queryTf.get(f) || 0) + 1)
    }

    let qSumSquares = 0
    for (const [term, tf] of queryTf.entries()) {
      const idx = this.vocabIndex.get(term)
      if (idx !== undefined) {
        const w = (1 + Math.log(tf)) * this.idfWeights[idx]
        qVec[idx] = w
        qSumSquares += w * w
      }
    }

    const qNorm = Math.sqrt(qSumSquares)
    if (qNorm === 0) return []

    // Normalize query vector
    for (let i = 0; i < dim; i++) {
      qVec[i] /= qNorm
    }

    const results: Array<{ chunk: CorpusChunk; cosineSimilarity: number }> = []

    for (const chunk of this.chunks) {
      if (projectFilter && projectFilter !== 'all' && chunk.projectId !== projectFilter) {
        continue
      }

      const dVec = this.chunkVectors.get(chunk.id)
      if (!dVec) continue

      // Dot product of L2-normalized vectors is exact cosine similarity
      let dot = 0
      for (let i = 0; i < dim; i++) {
        if (qVec[i] !== 0 && dVec[i] !== 0) {
          dot += qVec[i] * dVec[i]
        }
      }

      if (dot > 0.001) {
        results.push({
          chunk,
          cosineSimilarity: dot
        })
      }
    }

    // Sort descending by cosine similarity
    results.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity)

    return results.slice(0, topK).map((item, idx) => ({
      chunk: item.chunk,
      score: Number(item.cosineSimilarity.toFixed(4)),
      rank: idx + 1,
      scoreType: 'cosine_similarity',
      explanation: `Normalized Cosine Similarity: ${(item.cosineSimilarity * 100).toFixed(2)}% in ${dim}-dim subword vector space.`
    }))
  }

  public getDimensions(): number {
    return this.vocabulary.length
  }
}
