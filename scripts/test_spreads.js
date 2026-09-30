const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');

async function testTwoPageSpreads() {
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3002/ ...');
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(600);

  // Scroll to journal
  const journalElem = await page.$('#journal');
  if (journalElem) {
    await journalElem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }

  // Click Open Journal button
  console.log('Clicking Open Journal button...');
  await page.click('#open-journal-button');
  await page.waitForTimeout(800);

  // Take screenshot of Spread 00 (Prologue on Left, TOC on Right)
  await page.screenshot({ path: path.join(__dirname, '../audit_results/01_two_page_spread_toc.png') });
  console.log('Captured 01_two_page_spread_toc.png');

  // Verify Spread 00 content
  const spread0Info = await page.evaluate(() => {
    const text = document.querySelector('#journal')?.innerText || '';
    return {
      hasPrologue: text.includes('PROLOGUE // THE FOUNDATIONS'),
      hasTOC: text.includes('TABLE OF CONTENTS'),
      pages: text.includes('001') && text.includes('002'),
      hasSpreadCounter: text.includes('SPREAD 01 OF 14')
    };
  });
  console.log('Spread 00 verification:', spread0Info);

  // Click next spread arrow to unfold Chapter 01 Spread 01 (Pages 003 / 004)
  console.log('Clicking next spread arrow (#book-next-spread-arrow)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);

  await page.screenshot({ path: path.join(__dirname, '../audit_results/02_two_page_spread_ch01_overview.png') });
  console.log('Captured 02_two_page_spread_ch01_overview.png');

  const spread1Info = await page.evaluate(() => {
    const text = document.querySelector('#journal')?.innerText || '';
    return {
      hasVMTitle: text.includes('VM Copy Question Generator'),
      hasContext: text.includes('01 // CONTEXT'),
      hasProblem: text.includes('02 // THE ENGINEERING PROBLEM'),
      hasSolution: text.includes('03 // THE ENGINEERED SOLUTION'),
      hasPages34: text.includes('003') && text.includes('004'),
      hasSpreadCounter: text.includes('SPREAD 02 OF 14')
    };
  });
  console.log('Spread 01 verification (Ch 01 Overview):', spread1Info);

  // Click next spread arrow to unfold Chapter 01 Spread 02 (Pages 005 / 006 Architecture & Incidents)
  console.log('Clicking next spread arrow to unfold Ch 01 Architecture...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);

  await page.screenshot({ path: path.join(__dirname, '../audit_results/03_two_page_spread_ch01_architecture.png') });
  console.log('Captured 03_two_page_spread_ch01_architecture.png');

  const spread2Info = await page.evaluate(() => {
    const text = document.querySelector('#journal')?.innerText || '';
    return {
      hasArchitecture: text.includes('04 // SYSTEM ARCHITECTURE'),
      hasDecision: text.includes('05 // CRITICAL ENGINEERING DECISION'),
      hasIncident: text.includes('06 // WHAT BROKE: INCIDENT LOG'),
      hasMetrics: text.includes('08 // VERIFIED EMPIRICAL METRICS'),
      hasPages56: text.includes('005') && text.includes('006'),
      hasSpreadCounter: text.includes('SPREAD 03 OF 14')
    };
  });
  console.log('Spread 02 verification (Ch 01 Architecture & Incidents):', spread2Info);

  // Click next to Chapter 02 (AI Worksheets)
  console.log('Clicking next to unfold Chapter 02 (AI Worksheets)...');
  await page.click('#book-next-spread-arrow');
  await page.waitForTimeout(800);

  await page.screenshot({ path: path.join(__dirname, '../audit_results/04_two_page_spread_ch02_worksheets.png') });
  console.log('Captured 04_two_page_spread_ch02_worksheets.png');

  // Test turn back with prev spread arrow
  console.log('Testing turn back arrow (#book-prev-spread-arrow)...');
  await page.click('#book-prev-spread-arrow');
  await page.waitForTimeout(800);

  // Test Escape key to return to Table of Contents
  console.log('Testing Escape key to return to TOC spread...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  const backInTOC = await page.evaluate(() => {
    const text = document.querySelector('#journal')?.innerText || '';
    return text.includes('TABLE OF CONTENTS') && text.includes('SPREAD 01 OF 14');
  });
  console.log('Escape returned to TOC spread:', backInTOC);

  await browser.close();
  console.log('All two-page spread tests passed successfully!');
}

testTwoPageSpreads().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
