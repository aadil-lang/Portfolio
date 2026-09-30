const path = require('path')

async function verifyAskAadilSystemPage() {
  console.log('================================================================');
  console.log('VERIFYING ASK AADIL SYSTEMS ARCHIVE PAGE');
  console.log('================================================================\n');

  const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../audit_results/qa_renders');

  console.log('1. Navigating to /projects/ask-aadil...');
  await page.goto('http://localhost:3002/projects/ask-aadil', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const title = await page.$eval('h1', el => el.innerText);
  console.log(`  Title: "${title}"`);
  if (!title.includes('Ask Aadil')) throw new Error('Title does not contain Ask Aadil');

  const text = await page.evaluate(() => document.body.innerText);

  const requiredSections = [
    'Stateful Retrieval, Source Authority & Controlled Actions',
    'INDEPENDENT · PERSONAL BUILD',
    'Interactive streaming chat interface',
    'Deterministic Router',
    'Hybrid Retriever',
    'Grounded Synthesis Engine',
    'Human-in-the-Loop Action Boundary',
    '172 automated tests passing at 100%'
  ];

  for (const snippet of requiredSections) {
    if (!text.includes(snippet)) {
      throw new Error(`Missing expected snippet in /projects/ask-aadil: "${snippet}"`);
    }
    console.log(`  ✓ Verified: "${snippet}"`);
  }

  await page.screenshot({ path: path.join(outDir, '23_systems_archive_ask_aadil.png'), fullPage: true });
  console.log('✓ Captured full-page screenshot: 23_systems_archive_ask_aadil.png');

  console.log('2. Navigating to /projects index...');
  await page.goto('http://localhost:3002/projects', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  const catalogText = await page.evaluate(() => document.body.innerText);
  if (!catalogText.includes('Ask Aadil')) {
    throw new Error('Ask Aadil not listed in Systems Index');
  }
  console.log('  ✓ Verified Ask Aadil present in Systems Index');

  await page.screenshot({ path: path.join(outDir, '24_systems_index_with_ask_aadil.png') });
  console.log('✓ Captured screenshot: 24_systems_index_with_ask_aadil.png');

  console.log('\n================================================================');
  console.log('🎉 SYSTEMS ARCHIVE ENTRY FOR ASK AADIL VERIFIED!');
  console.log('================================================================');

  await browser.close();
}

verifyAskAadilSystemPage().catch(err => {
  console.error('\n❌ Systems Archive verification failed:', err);
  process.exit(1);
});
