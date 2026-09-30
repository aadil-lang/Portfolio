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
  await page.waitForTimeout(600);

  // Scroll to journal section
  await page.evaluate(() => {
    const el = document.querySelector('#journal');
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  // 1. Capture stationary closed thick hardcover
  console.log('Capturing stationary closed thick hardcover...');
  await page.screenshot({ path: path.join(outDir, 'cover_01_closed_thick.png') });

  // 2. Click "OPEN JOURNAL" and capture MID-TURN (at ~440ms of 880ms duration)
  console.log('Clicking Open Journal and capturing mid-turn 3D cover flip...');
  const openBtn = page.locator('#open-journal-button');
  await openBtn.click();

  // Wait ~420ms for mid-flight (around 90 degrees vertical)
  await page.waitForTimeout(420);
  console.log('Capturing MID-TURN of thick front cover...');
  await page.screenshot({ path: path.join(outDir, 'cover_02_mid_turn_flight.png') });

  // Wait for opening turn to complete
  await page.waitForTimeout(600);
  console.log('Capturing opened two-page spread...');
  await page.screenshot({ path: path.join(outDir, 'cover_03_opened_spread.png') });

  // 3. Click "[ Close Book Cover ]" and capture mid-turn closing
  console.log('Clicking Close Book Cover and capturing mid-turn closing...');
  const closeBtn = page.locator('button:has-text("[ Close Book Cover ]")');
  await closeBtn.click();

  await page.waitForTimeout(420);
  console.log('Capturing MID-TURN closing of thick front cover...');
  await page.screenshot({ path: path.join(outDir, 'cover_04_mid_turn_closing.png') });

  // Wait for closing to complete
  await page.waitForTimeout(600);
  console.log('Capturing settled closed cover after closing...');
  await page.screenshot({ path: path.join(outDir, 'cover_05_settled_closed.png') });

  console.log('Cover turn audit completed successfully. Console errors:', consoleErrors);
  await browser.close();
}

run().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
