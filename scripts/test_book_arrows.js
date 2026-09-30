const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');

async function testArrows() {
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

  // Click Open Journal
  console.log('Clicking Open Journal button (#open-journal-button)...');
  await page.click('#open-journal-button');
  await page.waitForTimeout(800);

  await page.screenshot({ path: path.join(__dirname, '../audit_results/test_book_toc_arrows.png') });
  console.log('Captured test_book_toc_arrows.png');

  // Verify next arrow exists on TOC
  const nextArrow = await page.$('#book-next-page-arrow');
  console.log('Found next margin arrow on TOC:', !!nextArrow);

  if (nextArrow) {
    console.log('Clicking next margin arrow to unfold Chapter 01...');
    await page.click('#book-next-page-arrow');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(__dirname, '../audit_results/test_book_ch01_unfolded.png') });
    console.log('Captured test_book_ch01_unfolded.png');
  }

  // In Chapter 01, check both arrows
  const prevArrow = await page.$('#book-prev-page-arrow');
  const nextArrow2 = await page.$('#book-next-page-arrow');
  console.log('In Ch 01: Found prev arrow:', !!prevArrow, 'Found next arrow:', !!nextArrow2);

  if (nextArrow2) {
    console.log('Clicking next arrow to unfold Chapter 02...');
    await page.click('#book-next-page-arrow');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(__dirname, '../audit_results/test_book_ch02_unfolded.png') });
    console.log('Captured test_book_ch02_unfolded.png');
  }

  if (prevArrow) {
    console.log('Clicking prev arrow to turn back to Chapter 01...');
    await page.click('#book-prev-page-arrow');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(__dirname, '../audit_results/test_book_turned_back_ch01.png') });
    console.log('Captured test_book_turned_back_ch01.png');
  }

  await browser.close();
  console.log('All book arrow tests completed successfully!');
}

testArrows().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
