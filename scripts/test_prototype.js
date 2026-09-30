const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const fs = require('fs');
const path = require('path');

// We will test the visual animation of the 3D cover flip
async function testCoverFlip() {
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Create an HTML file to test the pure 3D book mechanics
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0B0D0F;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: monospace;
    color: #fff;
    overflow: hidden;
  }
  .stage {
    perspective: 2600px;
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .book-container {
    position: relative;
    height: 700px;
    transform-style: preserve-3d;
    transition: width 0.85s cubic-bezier(0.25, 0.1, 0.25, 1.0);
  }
  .book-container.closed {
    width: 540px;
  }
  .book-container.open {
    width: 1024px;
  }
  .tray {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: #21252A;
    border: 1px solid #363B43;
    box-shadow: 0 30px 65px -10px rgba(0,0,0,0.95);
    overflow: hidden;
  }
  .pages-grid {
    position: absolute;
    inset: 10px;
    display: flex;
  }
  .page-left {
    flex: 1;
    background: #181B20;
    border-radius: 8px 0 0 8px;
    border: 1px dashed #2B3037;
  }
  .page-right {
    flex: 1;
    background: #F7F5EE;
    color: #1E2124;
    border-radius: 0 8px 8px 0;
    padding: 30px;
    border: 1px solid #E5E0D5;
  }
  .cover-leaf {
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 10px;
    width: calc(50% - 10px);
    transform-style: preserve-3d;
    transform-origin: left center;
    transition: transform 0.85s cubic-bezier(0.25, 0.1, 0.25, 1.0);
    z-index: 35;
  }
  .book-container.closed .cover-leaf {
    width: calc(100% - 20px);
    right: 10px;
    transform: rotateY(0deg);
  }
  .book-container.open .cover-leaf {
    transform: rotateY(-180deg);
  }
  .cover-front {
    position: absolute;
    inset: 0;
    background: #1E2328;
    border: 1px solid #3A404A;
    border-radius: 0 12px 12px 0;
    backface-visibility: hidden;
    padding: 40px;
    color: #E6E4DF;
    box-shadow: -18px 28px 55px rgba(0,0,0,0.75);
  }
  .cover-back {
    position: absolute;
    inset: 0;
    background: #F7F5EE;
    border: 1px solid #E5E0D5;
    border-radius: 12px 0 0 12px;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    padding: 30px;
    color: #1E2124;
    box-shadow: 18px 28px 55px rgba(0,0,0,0.75);
  }
  .spiral {
    position: absolute;
    top: 10px;
    bottom: 10px;
    width: 48px;
    transform: translateX(-50%);
    pointer-events: none;
    z-index: 50;
    background: repeating-linear-gradient(to bottom, #7A8494 0px, #7A8494 4px, transparent 4px, transparent 20px);
    transition: left 0.85s cubic-bezier(0.25, 0.1, 0.25, 1.0);
  }
  .book-container.closed .spiral {
    left: 10px;
  }
  .book-container.open .spiral {
    left: 50%;
  }
</style>
</head>
<body>
  <div class="stage">
    <div id="book" class="book-container closed">
      <div class="tray">
        <div class="pages-grid">
          <div class="page-left"></div>
          <div class="page-right">
            <h2>PAGE 002: TABLE OF CONTENTS</h2>
            <p>Underneath the cover</p>
          </div>
        </div>
      </div>
      <div class="spiral"></div>
      <div class="cover-leaf">
        <div class="cover-front">
          <h2>THE ENGINEERING EVOLUTION</h2>
          <p>Front Cover Face</p>
          <button id="open-btn" style="margin-top:20px; padding:10px 20px; background:#3A424D; color:#fff; border:none; cursor:pointer;">OPEN JOURNAL</button>
        </div>
        <div class="cover-back">
          <h2>PAGE 001: PROLOGUE</h2>
          <p>Inside of Front Cover</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const tmpHtml = path.join(__dirname, 'test_prototype.html');
  fs.writeFileSync(tmpHtml, htmlContent);

  await page.goto('file:///' + tmpHtml.replace(/\\/g, '/'));
  await page.waitForTimeout(200);

  // Take screenshot 1: closed
  const outDir = path.join(__dirname, '..', 'audit_results');
  await page.screenshot({ path: path.join(outDir, 'proto_01_closed.png') });

  // Open book
  await page.evaluate(() => {
    const b = document.getElementById('book');
    b.classList.remove('closed');
    b.classList.add('open');
  });

  // Capture frames at 200ms, 425ms, 850ms
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(outDir, 'proto_02_opening_early.png') });

  await page.waitForTimeout(225);
  await page.screenshot({ path: path.join(outDir, 'proto_03_opening_mid.png') });

  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'proto_04_opened_final.png') });

  console.log('Prototype test completed.');
  await browser.close();
}

testCoverFlip().catch(console.error);
