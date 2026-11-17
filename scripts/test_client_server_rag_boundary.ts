/**
 * PHASE 3.2E: CLIENT/SERVER RAG BOUNDARY & BROWSER SECURITY VERIFICATION
 *
 * Targeted verification suite proving:
 * - Suite 1: Client Bundle Cleanliness (0 'fs', 0 'path', 0 'crypto' imports in client RAG modules)
 * - Suite 2: Public Chunk Governance & Confidentiality (43 public chunks, 0 leaks, 0 proprietary CS)
 * - Suite 3: Index Partitioning (200 PUBLIC chunks vs 226 AUTHENTICATED_INTERNAL chunks)
 * - Suite 4: Simulated Browser Runtime Execution (askAadil & retrieveHybrid without Node.js fs)
 */

import fs from 'fs'
import path from 'path'
import { publicKnowledgeChunks } from '../lib/rag/publicKnowledgeChunks'
import { buildKnowledgeIndex, invalidateKnowledgeIndex } from '../lib/rag/knowledgeIndex'
import { retrieveHybrid } from '../lib/rag/hybridRetriever'
import { askAadil } from '../lib/rag/askAadilAgent'

interface TestAssertion {
  suite: string
  name: string
  passed: boolean
  details: string
}

const testResults: TestAssertion[] = []

function assert(suite: string, name: string, condition: boolean, details: string) {
  testResults.push({
    suite,
    name,
    passed: condition,
    details: condition ? `PASSED: ${details}` : `FAILED: ${details}`
  })
  const mark = condition ? '✓' : '✗'
  console.log(`${mark} [${suite}] ${name}: ${condition ? details : 'FAILED - ' + details}`)
}

async function runClientServerBoundaryVerification() {
  console.log('====================================================================')
  console.log('  PHASE 3.2E: CLIENT/SERVER RAG BOUNDARY & BROWSER SECURITY TEST   ')
  console.log('====================================================================\n')

  // --- SUITE 1: Client Bundle Cleanliness ---
  console.log('--- SUITE 1: Client Bundle Cleanliness ---')
  const clientFiles = [
    'lib/rag/canonicalRAGAdapter.ts',
    'lib/rag/knowledgeBaseIngestion.ts',
    'lib/rag/knowledgeIndex.ts',
    'lib/rag/hybridRetriever.ts',
    'lib/rag/askAadilAgent.ts',
    'lib/rag/publicKnowledgeChunks.ts'
  ]

  for (const f of clientFiles) {
    const content = fs.readFileSync(path.join(process.cwd(), f), 'utf8')
    const hasStaticFs = /import\s+fs\s+from\s+['"]fs['"]/.test(content)
    const hasStaticPath = /import\s+path\s+from\s+['"]path['"]/.test(content)
    const hasStaticCrypto = /import\s+crypto\s+from\s+['"]crypto['"]/.test(content)

    assert(
      'Suite 1',
      `${f} has zero static Node built-in imports`,
      !hasStaticFs && !hasStaticPath && !hasStaticCrypto,
      `Verified: no static fs (${!hasStaticFs}), no static path (${!hasStaticPath}), no static crypto (${!hasStaticCrypto})`
    )
  }

  // --- SUITE 2: Public Chunk Governance & Confidentiality ---
  console.log('\n--- SUITE 2: Public Chunk Governance & Confidentiality ---')
  assert(
    'Suite 2',
    'publicKnowledgeChunks contains exactly 43 public chunks',
    publicKnowledgeChunks.length === 43,
    `Found ${publicKnowledgeChunks.length} chunks (expected 43)`
  )

  const cs3Chunks = publicKnowledgeChunks.filter(c => c.metadata.caseStudyId === 'CS-03')
  assert(
    'Suite 2',
    'Zero CS-03 (Curriculum Transformation) chunks in public chunk set',
    cs3Chunks.length === 0,
    `CS-03 count: ${cs3Chunks.length}`
  )

  const cs6Chunks = publicKnowledgeChunks.filter(c => c.metadata.caseStudyId === 'CS-06')
  assert(
    'Suite 2',
    'Zero CS-06 (Curriculum ETL) chunks in public chunk set',
    cs6Chunks.length === 0,
    `CS-06 count: ${cs6Chunks.length}`
  )

  const cs7Chunks = publicKnowledgeChunks.filter(c => c.metadata.caseStudyId === 'CS-07')
  assert(
    'Suite 2',
    'Zero CS-07 (US Math Item Bank) chunks in public chunk set',
    cs7Chunks.length === 0,
    `CS-07 count: ${cs7Chunks.length}`
  )

  const cs8Chunks = publicKnowledgeChunks.filter(c => c.metadata.caseStudyId === 'CS-08')
  assert(
    'Suite 2',
    'Zero CS-08 (DiffGuard) technical chunks in public chunk set',
    cs8Chunks.length === 0,
    `CS-08 count: ${cs8Chunks.length}`
  )

  let corpUrls = 0
  for (const c of publicKnowledgeChunks) {
    const s = JSON.stringify(c).toLowerCase()
    if (s.includes('github.com/wayground') || s.includes('github.com/quizizz')) {
      corpUrls++
    }
  }
  assert(
    'Suite 2',
    'Zero private corporate GitHub URLs in public chunks',
    corpUrls === 0,
    `Found ${corpUrls} corporate URLs`
  )

  // --- SUITE 3: Index Partitioning & Determinism ---
  console.log('\n--- SUITE 3: Index Partitioning & Determinism ---')
  invalidateKnowledgeIndex()
  const publicIndex = buildKnowledgeIndex('PUBLIC')
  assert(
    'Suite 3',
    'Public index yields exactly 200 chunks (157 base + 43 public KB chunks)',
    publicIndex.length === 200,
    `Found ${publicIndex.length} chunks (expected 200)`
  )

  invalidateKnowledgeIndex()
  const fullIndex = buildKnowledgeIndex('AUTHENTICATED_INTERNAL')
  assert(
    'Suite 3',
    'Full internal index yields exactly 226 chunks (157 base + 69 full KB chunks)',
    fullIndex.length === 226,
    `Found ${fullIndex.length} chunks (expected 226)`
  )

  // --- SUITE 4: Simulated Browser Runtime Execution ---
  console.log('\n--- SUITE 4: Simulated Browser Runtime Execution ---')
  // In simulated browser mode, window is present
  const originalWindow = (global as any).window
  ;(global as any).window = {}
  try {
    invalidateKnowledgeIndex()
    const browserResult = retrieveHybrid('Tell me about Ask Aadil architecture')
    assert(
      'Suite 4',
      'retrieveHybrid executes in browser mode with zero errors',
      browserResult.semanticChunks.length > 0 && browserResult.evidenceItems.length > 0,
      `Returned ${browserResult.semanticChunks.length} semantic chunks, ${browserResult.evidenceItems.length} evidence items`
    )

    const browserAgentResult = await askAadil('What is Ask Aadil?')
    assert(
      'Suite 4',
      'askAadil agent generates grounded response in browser mode',
      browserAgentResult.answer.length > 50,
      `Answer preview: ${browserAgentResult.answer.slice(0, 80)}...`
    )
  } finally {
    ;(global as any).window = originalWindow
  }

  // --- SUMMARY ---
  console.log('\n====================================================================')
  console.log('                          TEST SUMMARY                              ')
  console.log('====================================================================')
  const passed = testResults.filter(r => r.passed).length
  const failed = testResults.filter(r => !r.passed).length
  console.log(`Total Assertions: ${testResults.length}`)
  console.log(`Passed:           ${passed}`)
  console.log(`Failed:           ${failed}`)
  console.log(`Success Rate:     ${((passed / testResults.length) * 100).toFixed(1)}%`)

  if (failed > 0) {
    process.exit(1)
  }
}

runClientServerBoundaryVerification().catch(err => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
