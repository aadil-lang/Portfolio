const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');
const fs = require('fs');

async function runRenderedQA() {
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../audit_results/qa_renders');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('1. Capturing Homepage Hero & Top Fold...');
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '01_home_hero.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  console.log('2. Capturing Closed Journal on Desk...');
  const journalElem = await page.$('#journal');
  if (journalElem) {
    await journalElem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, '02_journal_closed.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  }

  console.log('3. Opening Journal...');
  await page.click('#open-journal-button');
  await page.waitForTimeout(1800); // Wait for 3D flip
  await page.screenshot({ path: path.join(outDir, '03_journal_spread_00_toc.png') });

  // Capture several key spreads
  console.log('4. Capturing Spread 01 (Ch. 01 Learning the Problem)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(850);
  await page.screenshot({ path: path.join(outDir, '04_journal_spread_01_ch01.png') });

  console.log('5. Capturing Spread 02 (Ch. 02 KaTeX)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(850);
  await page.screenshot({ path: path.join(outDir, '05_journal_spread_02_ch02.png') });

  console.log('6. Capturing Spread 06 (Ch. 06 VM Copy Snapshot)...');
  // Jump to spread 6
  for (let i = 2; i < 6; i++) {
    await page.click('#book-next-spread-arrow');
    await page.waitForTimeout(850);
  }
  await page.screenshot({ path: path.join(outDir, '06_journal_spread_06_vmcopy.png') });

  console.log('7. Capturing Spread 09 (Team System)...');
  for (let i = 6; i < 9; i++) {
    await page.click('#book-next-spread-arrow');
    await page.waitForTimeout(850);
  }
  await page.screenshot({ path: path.join(outDir, '07_journal_spread_09_teamsystem.png') });

  console.log('8. Capturing Spread 10 (Ch. 08 Engineering Design Automation)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(850);
  await page.screenshot({ path: path.join(outDir, '08_journal_spread_10_eda.png') });

  console.log('9. Capturing Spread 13 (Synthesis Principle Matrix)...');
  for (let i = 10; i < 13; i++) {
    await page.click('#book-next-spread-arrow');
    await page.waitForTimeout(850);
  }
  await page.screenshot({ path: path.join(outDir, '09_journal_spread_13_synthesis.png') });

  console.log('10. Capturing Spread 14 (Ch. 10 Still Building ?)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(850);
  await page.screenshot({ path: path.join(outDir, '10_journal_spread_14_stillbuilding.png') });

  console.log('11. Capturing Timeline Page (/experience)...');
  await page.goto('http://localhost:3002/experience', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '11_timeline_top.png'), clip: { x: 0, y: 0, width: 1440, height: 960 } });

  console.log('12. Capturing Systems Catalog Page (/projects)...');
  await page.goto('http://localhost:3002/projects', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '12_systems_catalog.png'), clip: { x: 0, y: 0, width: 1440, height: 960 } });

  console.log('13. Capturing Systems Spec Detail Page (/projects/vm-copy)...');
  await page.goto('http://localhost:3002/projects/vm-copy', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '13_project_vm_copy.png'), clip: { x: 0, y: 0, width: 1440, height: 960 } });

  console.log('14. Capturing Systems Spec Detail Page (/projects/design-automation)...');
  await page.goto('http://localhost:3002/projects/design-automation', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '14_project_eda.png'), clip: { x: 0, y: 0, width: 1440, height: 960 } });

  await browser.close();
  console.log('Render QA captures complete! Files saved to audit_results/qa_renders/');
}

runRenderedQA().catch(err => {
  console.error('Render QA failed:', err);
  process.exit(1);
});
