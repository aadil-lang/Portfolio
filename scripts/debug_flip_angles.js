const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const fs = require('fs');
const path = require('path');

async function run() {
  const outDir = path.join(__dirname, '..', 'audit_results');
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.click('#open-journal-button');
  await page.waitForTimeout(600);

  // Take a series of high-frequency frames during the turn
  const nextBtn = page.locator('#book-next-spread-arrow');
  await nextBtn.click();

  // Capture at 100ms, 200ms, 300ms, 400ms, 500ms, 650ms
  const delays = [100, 200, 300, 400, 500, 650];
  let elapsed = 0;
  for (let i = 0; i < delays.length; i++) {
    const wait = delays[i] - elapsed;
    await page.waitForTimeout(wait);
    elapsed = delays[i];
    await page.screenshot({ path: path.join(outDir, `frame_${delays[i]}ms.png`) });
  }

  await browser.close();
  console.log('Capture done');
}

run().catch(console.error);
