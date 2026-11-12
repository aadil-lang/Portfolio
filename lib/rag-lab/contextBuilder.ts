/**
 * Context Window Constructor & Token Budget Allocator
 * Manages context budget, deduplication, and exposes explicit inclusion / exclusion
 * diagnostics for every candidate chunk.
 */

import { CorpusChunk, ScoredChunk, ContextBuildResult, ContextChunkInclusion } from '../../data/rag/types'

export interface ContextConfig {
  maxContextTokens: number
  similarityDeduplicationThreshold?: number // Jaccard similarity threshold to drop redundant content
}

export const DEFAULT_CONTEXT_CONFIG: ContextConfig = {
  maxContextTokens: 350,
  similarityDeduplicationThreshold: 0.8
}

function calculateJaccard(tokensA: string[], tokensB: string[]): number {
  const setA = new Set(tokensA)
  const setB = new Set(tokensB)
  let intersection = 0
  for (const t of setA) {
    if (setB.has(t)) intersection++
  }
  const union = setA.size + setB.size - intersection
  return union > 0 ? intersection / union : 0
}

export class ContextBuilder {
  private config: ContextConfig

  constructor(config: ContextConfig = DEFAULT_CONTEXT_CONFIG) {
    this.config = config
  }

  public build(candidates: ScoredChunk[], budgetOverride?: number): ContextBuildResult {
    const budget = budgetOverride || this.config.maxContextTokens
    const included: CorpusChunk[] = []
    const diagnostics: ContextChunkInclusion[] = []

    let currentTokens = 0
    let truncationApplied = false
    const includedTokenSets: string[][] = []

    for (const item of candidates) {
      const chunkTokens = item.chunk.tokenCount
      const words = item.chunk.text.toLowerCase().split(/\s+/)

      // 1. Check for near-duplicate content
      let isDuplicate = false
      for (const priorTokens of includedTokenSets) {
        if (calculateJaccard(words, priorTokens) >= (this.config.similarityDeduplicationThreshold || 0.8)) {
          isDuplicate = true
          break
        }
      }

      if (isDuplicate) {
        diagnostics.push({
          chunk: item.chunk,
          status: 'excluded',
          rank: item.rank,
          score: item.score,
          scoreType: item.scoreType,
          tokenCount: chunkTokens,
          cumulativeTokens: currentTokens,
          exclusionReason: 'duplicate_content'
        })
        continue
      }

      // 2. Check token budget constraint
      if (currentTokens + chunkTokens <= budget) {
        currentTokens += chunkTokens
        included.push(item.chunk)
        includedTokenSets.push(words)

        diagnostics.push({
          chunk: item.chunk,
          status: 'included',
          rank: item.rank,
          score: item.score,
          scoreType: item.scoreType,
          tokenCount: chunkTokens,
          cumulativeTokens: currentTokens
        })
      } else {
        truncationApplied = true
        diagnostics.push({
          chunk: item.chunk,
          status: 'excluded',
          rank: item.rank,
          score: item.score,
          scoreType: item.scoreType,
          tokenCount: chunkTokens,
          cumulativeTokens: currentTokens,
          exclusionReason: 'budget_exceeded'
        })
      }
    }

    return {
      includedChunks: included,
      allCandidates: diagnostics,
      totalContextTokens: currentTokens,
      budgetTokens: budget,
      budgetUtilizationPct: Number(((currentTokens / budget) * 100).toFixed(1)),
      truncationApplied
    }
  }
}
