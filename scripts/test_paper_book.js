const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const fs = require('fs');
const path = require('path');

async function run() {
  const outDir = path.join(__dirname, '..', 'audit_results')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const browser = await p.chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  })
  const page = await context.newPage()

  const consoleErrors = []
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })

  console.log('Navigating to http://localhost:3002...')
  await page.goto('http://localhost:3002', { waitUntil: 'domcontentloaded', timeout: 15000 })
  await page.waitForTimeout(600)

  // Scroll to journal section
  const journalElem = await page.$('#journal')
  if (journalElem) {
    await journalElem.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
  }

  // 1. Closed Cover
  console.log('Capturing closed cover...')
  await page.screenshot({ path: path.join(outDir, 'paper_00_closed_cover.png') })

  // 2. Open Journal
  console.log('Clicking Open Journal...')
  await page.click('#open-journal-button')
  await page.waitForTimeout(800)

  // 3. Spread 00 (Prologue & TOC with dotted leaders)
  console.log('Capturing Spread 00 (Prologue & Dotted Leader TOC)...')
  await page.screenshot({ path: path.join(outDir, 'paper_01_spread00_toc.png') })

  // 4. Click Next -> Spread 01 (Chapter 01 Overview)
  console.log('Turning to Spread 01...')
  const nextBtn = page.locator('#book-next-spread-arrow')
  await nextBtn.click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: path.join(outDir, 'paper_02_spread01_ch01_overview.png') })

  // 5. Click Next -> Spread 02 (Chapter 01 Architecture Schematic)
  console.log('Turning to Spread 02...')
  await nextBtn.click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: path.join(outDir, 'paper_03_spread02_ch01_architecture.png') })

  // 6. Click Next -> Spread 03 (Chapter 02 AI Worksheets)
  console.log('Turning to Spread 03...')
  await nextBtn.click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: path.join(outDir, 'paper_04_spread03_ch02_worksheets.png') })

  // 7. Mobile Viewport Test (390x844)
  console.log('Testing Mobile Viewport at 390x844...')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(outDir, 'paper_05_mobile_spread.png') })

  console.log('Test complete. Console errors:', consoleErrors)
  await browser.close()
}

run().catch(err => {
  console.error('Test failed:', err)
  process.exit(1)
})
