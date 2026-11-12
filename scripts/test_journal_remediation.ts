import assert from 'assert'
import fs from 'fs'
import path from 'path'
import { journalChapters, JournalChapterRecord } from '../data/canonical/journalChapters'
import { journalSpreads } from '../data/journalSpreads'

async function runJournalRemediationTests() {
  console.log('========================================================================')
  console.log('PHASE J.1 — ENGINEERING JOURNAL TARGETED REMEDIATION TEST SUITE')
  console.log('========================================================================\n')

  let passedAssertions = 0

  // -------------------------------------------------------------------------
  // WORKSTREAM J1: Citation Deep-Links & Zero Legacy URLs
  // -------------------------------------------------------------------------
  console.log('>>> [J1] Testing Citation Deep-Links & URL Resolution...')

  // Check knowledgeIndex source URLs
  const knowledgeIndexPath = path.resolve(process.cwd(), 'lib/rag/knowledgeIndex.ts')
  const knowledgeIndexContent = fs.readFileSync(knowledgeIndexPath, 'utf8')
  assert(
    knowledgeIndexContent.includes("source_url: `/journal?spread=${ch.spread}#journal-book`"),
    'Knowledge index journal chapters must use /journal?spread=N#journal-book'
  )
  passedAssertions++

  assert(
    knowledgeIndexContent.includes("source_url: '/journal?spread=18#journal-book'"),
    'Knowledge index epilogue must use /journal?spread=18#journal-book'
  )
  passedAssertions++

  // Check askAadilAgent and hybridRetriever for zero legacy URLs
  const askAadilPath = path.resolve(process.cwd(), 'lib/rag/askAadilAgent.ts')
  const askAadilContent = fs.readFileSync(askAadilPath, 'utf8')
  assert(!askAadilContent.includes('/?spread='), 'Zero /?spread= in askAadilAgent')
  assert(!askAadilContent.includes('/#journal'), 'Zero /#journal in askAadilAgent')
  assert(!askAadilContent.includes('/#epilogue'), 'Zero /#epilogue in askAadilAgent')
  passedAssertions += 3

  const retrieverPath = path.resolve(process.cwd(), 'lib/rag/hybridRetriever.ts')
  const retrieverContent = fs.readFileSync(retrieverPath, 'utf8')
  assert(!retrieverContent.includes('/?spread='), 'Zero /?spread= in hybridRetriever')
  assert(!retrieverContent.includes('/#journal'), 'Zero /#journal in hybridRetriever')
  assert(!retrieverContent.includes('/#epilogue'), 'Zero /#epilogue in hybridRetriever')
  passedAssertions += 3
  console.log(`  ✓ Passed 8 assertions for J1 (Citation Deep-Links & Zero Legacy URLs)`)

  // -------------------------------------------------------------------------
  // WORKSTREAM J2: Keyboard Accessibility (WCAG 2.1.1)
  // -------------------------------------------------------------------------
  console.log('>>> [J2] Testing Keyboard Accessibility (WCAG 2.1.1)...')
  const spreadViewPath = path.resolve(process.cwd(), 'components/Journal/JournalSpreadView.tsx')
  const spreadViewContent = fs.readFileSync(spreadViewPath, 'utf8')

  assert(spreadViewContent.includes('tabIndex={0}'), 'FolioPage scroll container must have tabIndex={0}')
  assert(spreadViewContent.includes('role="region"'), 'FolioPage scroll container must have role="region"')
  assert(
    spreadViewContent.includes('aria-label={`${page.header} folio content`}'),
    'FolioPage scroll container must have dynamic aria-label'
  )
  assert(
    spreadViewContent.includes('focus:outline-none focus:ring-1 focus:ring-[#5A9A78]'),
    'FolioPage scroll container must have visible focus ring'
  )
  passedAssertions += 4
  console.log(`  ✓ Passed 4 assertions for J2 (Keyboard Accessibility WCAG 2.1.1)`)

  // -------------------------------------------------------------------------
  // WORKSTREAM J3: Responsive Mobile Layout & Single-Folio View
  // -------------------------------------------------------------------------
  console.log('>>> [J3] Testing Responsive Mobile Ergonomics & Single-Folio View...')
  assert(spreadViewContent.includes('mobilePageSide'), 'SpreadView must track mobilePageSide state')
  assert(spreadViewContent.includes('role="tab"'), 'Mobile folio selector buttons must have role="tab"')
  assert(spreadViewContent.includes('role="tabpanel"'), 'Mobile folio container must have role="tabpanel"')
  assert(spreadViewContent.includes('hidden lg:grid lg:grid-cols-2'), 'Dual-folio view must be desktop-only (lg:)')
  assert(spreadViewContent.includes('lg:hidden'), 'Mobile single-folio view must be active on <1024px screens')
  passedAssertions += 5
  console.log(`  ✓ Passed 5 assertions for J3 (Responsive Mobile Layout)`)

  // -------------------------------------------------------------------------
  // WORKSTREAM J4: OCR Evaluation Platform Inclusion
  // -------------------------------------------------------------------------
  console.log('>>> [J4] Testing OCR Evaluation Platform Inclusion...')
  // Spread 14 in journalSpreads
  const ocrSpread = journalSpreads.find(s => s.id === 'spread-14-ocr-evaluator')
  assert(ocrSpread !== undefined, 'OCR Evaluator spread must exist in journalSpreads')
  assert.strictEqual(ocrSpread.spreadIndex, 14, 'OCR Evaluator must be at spread index 14')
  assert.strictEqual(ocrSpread.chapterNumber, '20', 'OCR Evaluator must be Chapter 20')
  assert.strictEqual(ocrSpread.leftPage.pageNumber, 29, 'OCR Evaluator left page must be 29')
  assert.strictEqual(ocrSpread.rightPage.pageNumber, 30, 'OCR Evaluator right page must be 30')
  passedAssertions += 5

  // Canonical journal chapter for OCR
  const ocrCanonical = journalChapters.find((c: JournalChapterRecord) => c.connectedSystemSlug === 'ocr-evaluator')
  assert(ocrCanonical !== undefined, 'OCR Evaluator must exist in canonical journalChapters')
  assert.strictEqual(ocrCanonical.number, '20', 'Canonical OCR Evaluator chapter number must be 20')
  assert.strictEqual(ocrCanonical.spread, 14, 'Canonical OCR Evaluator spread must be 14')
  assert.strictEqual(ocrCanonical.page, 29, 'Canonical OCR Evaluator page must be 29')
  passedAssertions += 4

  // Systems catalog check (Spread 18)
  const catalogSpread = journalSpreads.find(s => s.id === 'spread-18-systems-catalog')
  assert(catalogSpread !== undefined, 'Spread 18 Systems Catalog must exist')
  const catalogFileContent = fs.readFileSync(path.resolve(process.cwd(), 'data/journalSpreads.tsx'), 'utf8')
  assert(
    catalogFileContent.includes('/projects/ocr-evaluator'),
    'Systems Catalog must link to /projects/ocr-evaluator'
  )
  assert(
    catalogFileContent.includes('OCR Robustness Platform:') && catalogFileContent.includes('134 pytests passing'),
    'Systems Catalog evidence registry must include OCR Robustness Platform (134 pytests)'
  )
  passedAssertions += 3
  console.log(`  ✓ Passed 12 assertions for J4 (OCR Evaluation Platform Inclusion)`)

  // -------------------------------------------------------------------------
  // WORKSTREAM J5: Chapter Numbering Reconciliation & Total Spreads
  // -------------------------------------------------------------------------
  console.log('>>> [J5] Testing Chapter Numbering Reconciliation...')
  assert.strictEqual(journalSpreads.length, 19, 'Total journal spreads must be exactly 19 (0 to 18)')
  passedAssertions++

  // Confirm spread indices are contiguous 0..18
  journalSpreads.forEach((s, idx) => {
    assert.strictEqual(s.spreadIndex, idx, `Spread index must match array index ${idx}`)
  })
  passedAssertions++

  // Confirm Synthesis is spread 17 and has chapterNumber 'SYNTHESIS'
  const synthesisSpread = journalSpreads[17]
  assert.strictEqual(synthesisSpread.chapterNumber, 'SYNTHESIS', 'Spread 17 must have chapterNumber SYNTHESIS')
  assert.strictEqual(synthesisSpread.leftPage.pageNumber, 35, 'Synthesis left page must be 35')
  assert.strictEqual(synthesisSpread.rightPage.pageNumber, 36, 'Synthesis right page must be 36')
  passedAssertions += 3

  // Confirm no relic '10 [?]' remains in chapter numbering after Ch. 21
  const chapterNumbers = journalSpreads.map(s => s.chapterNumber)
  assert(!chapterNumbers.slice(14).includes('10'), 'No relic chapterNumber 10 after spread 14')
  passedAssertions++
  console.log(`  ✓ Passed 6 assertions for J5 (Chapter Numbering Reconciliation)`)

  // -------------------------------------------------------------------------
  // WORKSTREAM J6: Typography & Contrast (WCAG 1.4.3)
  // -------------------------------------------------------------------------
  console.log('>>> [J6] Testing Typography & Contrast (WCAG 1.4.3)...')
  const journalSpreadsRaw = fs.readFileSync(path.resolve(process.cwd(), 'data/journalSpreads.tsx'), 'utf8')
  const spreadViewRaw = fs.readFileSync(path.resolve(process.cwd(), 'components/Journal/JournalSpreadView.tsx'), 'utf8')

  assert(!journalSpreadsRaw.includes('text-[#6E747C]'), 'Zero text-[#6E747C] in data/journalSpreads.tsx')
  assert(!spreadViewRaw.includes('text-[#6E747C]'), 'Zero text-[#6E747C] in components/Journal/JournalSpreadView.tsx')
  passedAssertions += 2

  // Confirm sub-9px text elimination
  const sub9Matches = journalSpreadsRaw.match(/text-\[8(\.\d+)?px\]/g) || []
  assert.strictEqual(sub9Matches.length, 0, 'Zero sub-9px text in data/journalSpreads.tsx')
  passedAssertions++
  console.log(`  ✓ Passed 3 assertions for J6 (Typography & Contrast WCAG 1.4.3)`)

  // -------------------------------------------------------------------------
  // WORKSTREAM J7: Technical Claims Reconciliation
  // -------------------------------------------------------------------------
  console.log('>>> [J7] Testing Technical Claims Reconciliation...')
  const canonicalChaptersRaw = fs.readFileSync(path.resolve(process.cwd(), 'data/canonical/journalChapters.ts'), 'utf8')
  const chaptersRaw = fs.readFileSync(path.resolve(process.cwd(), 'data/chapters.ts'), 'utf8')

  assert(!journalSpreadsRaw.includes('Next.js 16'), 'Zero Next.js 16 in data/journalSpreads.tsx')
  assert(!canonicalChaptersRaw.includes('Next.js 16'), 'Zero Next.js 16 in data/canonical/journalChapters.ts')
  assert(!chaptersRaw.includes("technologies: ['Next.js 16'"), 'Zero Next.js 16 in technologies in data/chapters.ts')
  passedAssertions += 3
  console.log(`  ✓ Passed 3 assertions for J7 (Technical Claims Reconciliation)`)

  // -------------------------------------------------------------------------
  // WORKSTREAM J8: Contextual Cross-Links Across Systems
  // -------------------------------------------------------------------------
  console.log('>>> [J8] Testing Contextual Cross-Links Across Systems...')
  const expectedCrossLinkSlugs = [
    'vm-copy',
    'ai-worksheets',
    'math-item-bank',
    'curriculum-etl',
    'loom-ai',
    'atlas-ai',
    'design-automation',
    'ai-reliability',
    'ocr-evaluator',
    'ask-aadil',
    'solace-ai'
  ]

  for (const slug of expectedCrossLinkSlugs) {
    assert(
      journalSpreadsRaw.includes(`/architecture?system=${slug}`),
      `Journal spreads must link to /architecture?system=${slug}`
    )
    assert(
      journalSpreadsRaw.includes(`/projects/${slug}#decisions`),
      `Journal spreads must link to /projects/${slug}#decisions`
    )
    assert(
      journalSpreadsRaw.includes(`/projects/${slug}`),
      `Journal spreads must link to /projects/${slug}`
    )
    passedAssertions += 3
  }
  console.log(`  ✓ Passed ${expectedCrossLinkSlugs.length * 3} assertions for J8 (Contextual Cross-Links Across Systems)`)

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log('\n========================================================================')
  console.log(`ALL PHASE J.1 TESTS PASSED: ${passedAssertions} assertions verified.`)
  console.log('========================================================================')
}

runJournalRemediationTests().catch(err => {
  console.error('\n❌ TEST FAILED:', err)
  process.exit(1)
})
