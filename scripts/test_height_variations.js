const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');

async function testHeights() {
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Click open journal
  const openBtn = page.locator('#open-journal-button');
  if (await openBtn.count() > 0) {
    await openBtn.click();
    await page.waitForTimeout(1000);
  }

  // Find the journal desk container (.book-desk-shadow)
  const heights = [];
  const nextBtn = page.locator('#book-next-spread-arrow');

  for (let spread = 0; spread <= 15; spread++) {
    const box = await page.locator('.book-desk-shadow').boundingBox();
    const folioBoxes = await page.evaluate(() => {
      const left = document.querySelectorAll('.book-desk-shadow .grid > div')[0];
      const right = document.querySelectorAll('.book-desk-shadow .grid > div')[1];
      return {
        leftHeight: left ? left.getBoundingClientRect().height : null,
        rightHeight: right ? right.getBoundingClientRect().height : null,
        deskHeight: document.querySelector('.book-desk-shadow').getBoundingClientRect().height
      };
    });

    console.log(`Spread ${spread}: deskHeight = ${folioBoxes.deskHeight}px, left = ${folioBoxes.leftHeight}px, right = ${folioBoxes.rightHeight}px`);
    heights.push(folioBoxes.deskHeight);

    if (spread < 15 && await nextBtn.count() > 0) {
      await nextBtn.click();
      // Check mid-flip height
      await page.waitForTimeout(350);
      const midFlipBox = await page.evaluate(() => {
        return document.querySelector('.book-desk-shadow').getBoundingClientRect().height;
      });
      if (midFlipBox !== folioBoxes.deskHeight) {
        console.warn(`  --> MID-FLIP HEIGHT DIFFERENCE: ${midFlipBox} vs ${folioBoxes.deskHeight}`);
      }
      await page.waitForTimeout(500);
    }
  }

  const minH = Math.min(...heights);
  const maxH = Math.max(...heights);
  console.log(`SUMMARY: minHeight = ${minH}, maxHeight = ${maxH}, diff = ${maxH - minH}`);

  await browser.close();
}

testHeights().catch(console.error);
