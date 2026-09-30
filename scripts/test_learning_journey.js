const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const fs = require('fs');
const path = require('path');

async function run() {
  const outDir = path.join(__dirname, '..', 'audit_results');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('Navigating to http://localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(600);

  // Scroll to journal
  const journalElem = await page.$('#journal');
  if (journalElem) {
    await journalElem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }

  // 1. Cover
  console.log('Capturing updated cover...');
  await page.screenshot({ path: path.join(outDir, 'learn_00_cover.png') });

  // 2. Open Journal -> Spread 00 (Philosophy & Dotted Leader TOC)
  console.log('Opening Journal...');
  await page.click('#open-journal-button');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'learn_01_spread00_philosophy_toc.png') });

  // 3. Turn to Spread 01 (Phase I: Content Developer, SME, Design & Tooling)
  console.log('Turning to Spread 01 (Phase I)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'learn_02_spread01_phase1_foundations.png') });

  // 4. Turn to Spread 02 (The Pivot: From Using to Building)
  console.log('Turning to Spread 02 (The Pivot)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'learn_03_spread02_the_pivot.png') });

  // 5. Turn to Spread 03 (Chapter 01 Overview)
  console.log('Turning to Spread 03 (Ch 01 Overview)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'learn_04_spread03_ch01_overview.png') });

  // 6. Turn to Spread 04 (Chapter 01 Architecture, What I Learned, What It Unlocked)
  console.log('Turning to Spread 04 (Ch 01 Learning & Unlocked)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'learn_05_spread04_ch01_learning_unlocked.png') });

  // 7. Jump directly to Epilogue (Spread 15: What Comes Next (?))
  console.log('Jumping to Epilogue (Next (?))...');
  const nextQBtn = page.locator('button:has-text("Next (?)")');
  await nextQBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'learn_06_spread15_epilogue_horizon.png') });

  console.log('Test completed successfully. Console errors:', consoleErrors);
  await browser.close();
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
