const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const fs = require('fs');
const path = require('path');

async function runAudit() {
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
  await page.waitForTimeout(600);

  // Scroll to journal section
  await page.evaluate(() => {
    const el = document.querySelector('#journal');
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  // 1. Capture stationary closed notebook
  console.log('1. Capturing stationary closed notebook...');
  const closedHeight = await page.evaluate(() => {
    const el = document.querySelector('.book-desk-shadow');
    return el ? el.getBoundingClientRect().height : null;
  });
  console.log(`Closed book desk height: ${closedHeight}px`);
  await page.screenshot({ path: path.join(outDir, 'v2_01_closed_notebook.png') });

  // 2. Click "OPEN JOURNAL" and capture mid-flight 3D cover turn
  console.log('2. Clicking OPEN JOURNAL and capturing mid-flight 3D cover turn...');
  const openBtn = page.locator('#open-journal-button');
  await openBtn.click();

  // Wait 400ms for mid-flight (around 90 degrees vertical)
  await page.waitForTimeout(400);
  const midTurnHeight = await page.evaluate(() => {
    const el = document.querySelector('.book-desk-shadow');
    return el ? el.getBoundingClientRect().height : null;
  });
  console.log(`Mid-turn book desk height: ${midTurnHeight}px`);
  await page.screenshot({ path: path.join(outDir, 'v2_02_cover_mid_turn.png') });

  // Wait for open state to settle
  await page.waitForTimeout(600);

  // 3. Capture fully opened two-page spread view
  console.log('3. Capturing opened two-page spread...');
  const openHeight = await page.evaluate(() => {
    const el = document.querySelector('.book-desk-shadow');
    return el ? el.getBoundingClientRect().height : null;
  });
  console.log(`Opened spread desk height: ${openHeight}px`);
  await page.screenshot({ path: path.join(outDir, 'v2_03_opened_spread.png') });

  // 4. Test page turning: turn from spread 0 to spread 1, then spread 2
  console.log('4. Testing page turns and measuring leaf heights...');
  const nextBtn = page.locator('#book-next-spread-arrow');
  const spreadHeights = [{ spread: 0, height: openHeight }];

  for (let s = 1; s <= 4; s++) {
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      // Mid-flip measurement (at ~360ms of 720ms)
      await page.waitForTimeout(360);
      const midFlipH = await page.evaluate(() => {
        const desk = document.querySelector('.book-desk-shadow');
        return desk ? desk.getBoundingClientRect().height : null;
      });
      console.log(`Spread ${s} mid-flip height: ${midFlipH}px`);

      // Wait for turn to finish
      await page.waitForTimeout(450);
      const settledH = await page.evaluate(() => {
        const desk = document.querySelector('.book-desk-shadow');
        return desk ? desk.getBoundingClientRect().height : null;
      });
      console.log(`Spread ${s} settled height: ${settledH}px`);
      spreadHeights.push({ spread: s, height: settledH });

      if (s === 1) {
        await page.screenshot({ path: path.join(outDir, 'v2_04_spread_01_turned.png') });
      }
    }
  }

  // 5. Navigate back to Index (Spread 0) and close book
  console.log('5. Navigating to Index and closing book...');
  const indexBtn = page.locator('button:has-text("Index")');
  await indexBtn.click();
  await page.waitForTimeout(800);

  const closeBtn = page.locator('#close-journal-button');
  if (await closeBtn.count() > 0) {
    await closeBtn.click();
    // Wait ~400ms for mid-closing turn
    await page.waitForTimeout(400);
    console.log('Capturing mid-closing flight...');
    await page.screenshot({ path: path.join(outDir, 'v2_05_mid_closing.png') });

    // Wait for closed state
    await page.waitForTimeout(600);
    console.log('Capturing settled closed notebook after closing...');
    await page.screenshot({ path: path.join(outDir, 'v2_06_settled_closed.png') });
  }

  console.log('====================================');
  console.log('HEIGHT INTEGRITY SUMMARY:');
  console.log(`Closed: ${closedHeight}px`);
  console.log(`Mid-Turn: ${midTurnHeight}px`);
  console.log(`Open: ${openHeight}px`);
  spreadHeights.forEach(sh => console.log(`Spread ${sh.spread}: ${sh.height}px`));
  console.log('Console Errors:', consoleErrors);
  console.log('====================================');

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
