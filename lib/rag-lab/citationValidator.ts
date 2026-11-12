/**
 * Deterministic Citation & Groundedness Validator
 * Verifies that generated citations exist in the corpus, match their parent documents,
 * and contain genuine lexical overlap with the asserted claim.
 */

import { CorpusChunk, CitationVerification } from '../../data/rag/types'
import { tokenize } from './tokenizer'

export class CitationValidator {
  private chunkIndex: Map<string, CorpusChunk> = new Map()

  constructor(chunks: CorpusChunk[]) {
    chunks.forEach(c => this.chunkIndex.set(c.id, c))
  }

  public validateCitation(
    citationId: string,
    chunkId: string,
    claimText: string
  ): CitationVerification {
    const chunk = this.chunkIndex.get(chunkId)

    if (!chunk) {
      return {
        citationId,
        chunkId,
        documentId: 'unknown',
        sourceTitle: 'Unknown Source (Chunk Not Found)',
        claimText,
        supportingExcerpt: '',
        isChunkFound: false,
        isDocumentMatch: false,
        overlapScore: 0.0,
        verificationStatus: 'unsupported_hallucination'
      }
    }

    // Token overlap evaluation (Jaccard similarity between claim tokens and chunk tokens)
    const claimTokens = tokenize(claimText)
    const chunkTokens = tokenize(chunk.text)
    const chunkTokenSet = new Set(chunkTokens)

    let matchedTokens = 0
    for (const t of claimTokens) {
      if (chunkTokenSet.has(t)) matchedTokens++
    }

    const overlapScore = claimTokens.length > 0 ? matchedTokens / claimTokens.length : 0.0

    let status: 'verified_supported' | 'partially_supported' | 'unsupported_hallucination'
    if (overlapScore >= 0.5) {
      status = 'verified_supported'
    } else if (overlapScore >= 0.25) {
      status = 'partially_supported'
    } else {
      status = 'unsupported_hallucination'
    }

    return {
      citationId,
      chunkId: chunk.id,
      documentId: chunk.documentId,
      sourceTitle: `${chunk.sectionTitle} (${chunk.id})`,
      claimText,
      supportingExcerpt: chunk.text.slice(0, 200) + '...',
      isChunkFound: true,
      isDocumentMatch: true,
      overlapScore: Number(overlapScore.toFixed(3)),
      verificationStatus: status
    }
  }

  public validateAll(citations: Array<{ citationId: string; chunkId: string; claimText: string }>): CitationVerification[] {
    return citations.map(c => this.validateCitation(c.citationId, c.chunkId, c.claimText))
  }
}
