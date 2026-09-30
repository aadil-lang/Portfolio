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
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1000);

  // Scroll to journal
  await page.evaluate(() => {
    const el = document.getElementById('journal');
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await page.waitForTimeout(600);

  // 1. Closed Cover with Spiral Binding
  console.log('Capturing Spiral-Bound Closed Cover...');
  const coverElem = await page.$('.journal-cover-material');
  if (coverElem) {
    await coverElem.scrollIntoViewIfNeeded();
  }
  await page.screenshot({ path: path.join(outDir, 'spiral_00_cover.png') });

  // 2. Open Journal -> Spread 00 (Philosophy & TOC with Spiral Binding)
  console.log('Opening Journal...');
  await page.click('#open-journal-button');
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const el = document.querySelector('.book-spread-container');
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'spiral_01_spread00_toc.png') });

  // 3. Turn to Spread 01 (Phase I: Content Developer, SME, Design & Tooling)
  console.log('Turning to Spread 01 (Phase I)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'spiral_02_spread01_phase1.png') });

  // 4. Turn to Spread 02 (The Pivot)
  console.log('Turning to Spread 02 (The Pivot)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'spiral_03_spread02_pivot.png') });

  // 5. Turn to Spread 04 (Chapter 01 Deep Dive: Learning & Unlocked)
  console.log('Navigating to Chapter 01 Deep Dive...');
  const ch1Btn = page.locator('button:has-text("01")');
  await ch1Btn.click();
  await page.waitForTimeout(800);
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'spiral_04_ch01_spread.png') });

  console.log('Test completed successfully. Console errors:', consoleErrors);
  await browser.close();
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
