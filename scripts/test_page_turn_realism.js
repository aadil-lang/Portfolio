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
  await page.waitForTimeout(800);

  // Open Journal
  console.log('Opening Journal...');
  await page.click('#open-journal-button');
  await page.waitForTimeout(900);

  await page.evaluate(() => {
    const el = document.querySelector('.book-spread-container');
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  // Capture Spread 00 (stationary)
  console.log('Capturing Spread 00 (stationary)...');
  await page.screenshot({ path: path.join(outDir, 'flip_01_spread00_stationary.png') });

  // Initiate page turn to Spread 01 and capture MID-TURN (at ~380ms of 760ms duration)
  console.log('Initiating forward turn to Spread 01...');
  const nextBtn = page.locator('#book-next-spread-arrow');
  await nextBtn.click();
  
  // Wait ~360ms (mid-flight of 760ms duration)
  await page.waitForTimeout(360);
  console.log('Capturing MID-TURN (mid-air 3D page flip with spiral interaction)...');
  await page.screenshot({ path: path.join(outDir, 'flip_02_mid_turn_flight.png') });

  // Wait for turn to complete
  await page.waitForTimeout(500);
  console.log('Capturing Spread 01 (completed transition)...');
  await page.screenshot({ path: path.join(outDir, 'flip_03_spread01_settled.png') });

  // Initiate backward turn to Spread 00 and capture mid-turn
  console.log('Initiating backward turn to Spread 00...');
  const prevBtn = page.locator('#book-prev-spread-arrow');
  await prevBtn.click();
  await page.waitForTimeout(360);
  console.log('Capturing MID-TURN backward...');
  await page.screenshot({ path: path.join(outDir, 'flip_04_mid_turn_backward.png') });

  await page.waitForTimeout(500);
  console.log('Capturing Spread 00 (settled after backward turn)...');
  await page.screenshot({ path: path.join(outDir, 'flip_05_spread00_settled.png') });

  console.log('Realism audit completed successfully. Console errors:', consoleErrors);
  await browser.close();
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
