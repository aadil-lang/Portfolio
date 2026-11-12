/**
 * Automated Unit & Benchmark Test Suite for Phase 4 RAG Laboratory
 */

import { RagLabService } from '../lib/rag-lab/ragLabService'
import { tokenize } from '../lib/rag-lab/tokenizer'
import { MetricsCalculator } from '../lib/rag-lab/metrics'
import { GOLDEN_EVALUATION_DATASET } from '../data/rag/golden_eval_dataset_v1'

function runRagLabUnitTests() {
  console.log('=== PHASE 4: RAG LABORATORY UNIT & BENCHMARK TESTS ===\n')

  const service = new RagLabService()

  // 1. Tokenizer test
  console.log('--- Test 1: Tokenizer & Stopword Filtering ---')
  const tokens = tokenize('How many tests does EDA have in Docker?')
  console.log('Tokens:', tokens)
  if (!tokens.includes('tests') || !tokens.includes('eda') || !tokens.includes('docker')) {
    throw new Error('Tokenizer failed to extract expected keywords')
  }
  console.log('✓ Tokenizer passed.\n')

  // 2. BM25 Test
  console.log('--- Test 2: Okapi BM25 Retrieval ---')
  const bm25Hits = service.executePipeline('How many pytests does EDA have?', 'bm25', 3)
  console.log(`BM25 retrieved ${bm25Hits.retrievedChunks.length} chunks. Top chunk: ${bm25Hits.retrievedChunks[0]?.chunk.id} (Score: ${bm25Hits.retrievedChunks[0]?.score})`)
  if (bm25Hits.retrievedChunks.length === 0 || bm25Hits.retrievedChunks[0].chunk.projectId !== 'design-automation') {
    throw new Error('BM25 failed to surface EDA chunk at rank 1')
  }
  console.log('✓ Okapi BM25 search passed.\n')

  // 3. Vector Search Test
  console.log('--- Test 3: Vector Space Cosine Similarity ---')
  const vecHits = service.executePipeline('crisis screening latency Solace AI', 'vector', 3)
  console.log(`Vector search retrieved ${vecHits.retrievedChunks.length} chunks. Top chunk: ${vecHits.retrievedChunks[0]?.chunk.id} (Cosine: ${vecHits.retrievedChunks[0]?.score})`)
  if (vecHits.retrievedChunks.length === 0 || vecHits.retrievedChunks[0].chunk.projectId !== 'solace-ai') {
    throw new Error('Vector search failed to surface Solace AI chunk at rank 1')
  }
  console.log('✓ Vector Space Cosine Similarity passed.\n')

  // 4. Hybrid RRF Test
  console.log('--- Test 4: Hybrid Reciprocal Rank Fusion (RRF) ---')
  const hybridHits = service.executePipeline('synthetic perturbation axes OCR Evaluator', 'hybrid', 3)
  console.log(`Hybrid RRF retrieved ${hybridHits.retrievedChunks.length} chunks. Top chunk: ${hybridHits.retrievedChunks[0]?.chunk.id} (RRF Score: ${hybridHits.retrievedChunks[0]?.score})`)
  if (hybridHits.retrievedChunks.length === 0 || hybridHits.retrievedChunks[0].chunk.projectId !== 'ocr-evaluator') {
    throw new Error('Hybrid RRF failed to surface OCR Evaluator chunk at rank 1')
  }
  console.log('✓ Hybrid RRF passed.\n')

  // 5. Context Builder & Token Budget
  console.log('--- Test 5: Context Window & Token Budget Allocation ---')
  const smallContextHits = service.executePipeline('EDA volume error', 'hybrid', 5, undefined, 100)
  console.log(`Context Budget: ${smallContextHits.context.budgetTokens} tokens. Included tokens: ${smallContextHits.context.totalContextTokens}. Truncation applied: ${smallContextHits.context.truncationApplied}`)
  const excluded = smallContextHits.context.allCandidates.filter(c => c.status === 'excluded')
  console.log(`Excluded candidates count: ${excluded.length}`)
  if (smallContextHits.context.totalContextTokens > 100) {
    throw new Error('Context builder violated token budget limit')
  }
  console.log('✓ Context Builder & Token Budget allocation passed.\n')

  // 6. Groundedness & Citation Validation
  console.log('--- Test 6: Groundedness & Citation Validation ---')
  const answerRes = hybridHits.answerResult
  console.log(`Answer generated. Citations count: ${answerRes.citations.length}`)
  for (const c of answerRes.citations) {
    console.log(`  - [${c.citationId}] ${c.sourceTitle}: status=${c.verificationStatus}, overlap=${c.overlapScore}`)
  }
  if (answerRes.citations.some(c => !c.isChunkFound)) {
    throw new Error('Citation validation failed: referenced non-existent chunk')
  }
  console.log('✓ Citation validation passed.\n')

  // 7. Abstention Scenarios
  console.log('--- Test 7: Deterministic Abstention Scenarios ---')
  const googleAbstention = service.executePipeline('What Kubernetes cluster version does Aadil maintain at Google?', 'hybrid')
  console.log('Google Query isAbstention:', googleAbstention.answerResult.isAbstention)
  console.log('Reason:', googleAbstention.answerResult.abstentionReason)
  if (!googleAbstention.answerResult.isAbstention) {
    throw new Error('Failed to abstain on out-of-domain Google query')
  }

  const feaAbstention = service.executePipeline('How does EDA run non-linear FEA mesh convergence?', 'hybrid')
  console.log('FEA False Premise isAbstention:', feaAbstention.answerResult.isAbstention)
  console.log('Reason:', feaAbstention.answerResult.abstentionReason)
  if (!feaAbstention.answerResult.isAbstention) {
    throw new Error('Failed to reject false-premise FEA query')
  }
  console.log('✓ Abstention scenarios passed.\n')

  // 8. Full Golden Benchmark Run
  console.log('--- Test 8: Full Golden Evaluation Benchmark (12 Test Cases) ---')
  const benchmark = service.runFullBenchmark()
  console.log('=== BENCHMARK AGGREGATE RESULTS ===')
  console.log(`Total Evaluated Cases: ${benchmark.aggregateMetrics.totalEvaluated}`)
  console.log(`Mean Precision@5: ${(benchmark.aggregateMetrics.meanPrecisionAtK * 100).toFixed(1)}%`)
  console.log(`Mean Recall@5: ${(benchmark.aggregateMetrics.meanRecallAtK * 100).toFixed(1)}%`)
  console.log(`Mean Reciprocal Rank (MRR): ${benchmark.aggregateMetrics.meanReciprocalRank.toFixed(4)}`)
  console.log(`Mean nDCG@5: ${benchmark.aggregateMetrics.meanNdcgAtK.toFixed(4)}`)

  console.log('\nCase-by-Case Summary:')
  for (const c of benchmark.caseResults) {
    console.log(`[${c.testId}] P@5=${c.precisionAt5} R@5=${c.recallAt5} MRR=${c.reciprocalRank} nDCG=${c.ndcgAt5} AbstainMatch=${c.abstentionCorrect}`)
  }

  if (benchmark.aggregateMetrics.meanReciprocalRank < 0.7) {
    throw new Error(`MRR ${benchmark.aggregateMetrics.meanReciprocalRank} is below expected threshold 0.70`)
  }

  console.log('\n================ ALL RAG LAB UNIT TESTS PASSED ================')
}

runRagLabUnitTests()

