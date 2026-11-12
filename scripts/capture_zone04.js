const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

async function waitUrl(url, timeoutMs = 25000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch (e) {}
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error(`Timeout waiting for ${url}`)
}

async function main() {
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32' ? ['/c', 'npx', 'next', 'start', '-p', '3006'] : ['next', 'start', '-p', '3006']

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3006', NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'ignore'
  })

  try {
    await waitUrl('http://localhost:3006/experience')
    const browser = await p.chromium.launch({ headless: true })
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } })
    const page = await ctx.newPage()
    await page.goto('http://localhost:3006/experience', { waitUntil: 'networkidle' })

    // Close inspector if open
    const closeBtn = await page.$('button[aria-label="Close Inspector"]')
    if (closeBtn) await closeBtn.click().catch(() => {})
    await page.waitForTimeout(300)

    // Scroll down to Zone 04 milestone cards
    await page.evaluate(() => window.scrollTo(0, 2400))
    await page.waitForTimeout(600)
    await page.screenshot({ path: path.join(__dirname, '../audit_results/timeline_screenshots/03b_desktop_zone04_cards.png') })
    console.log('Captured 03b_desktop_zone04_cards.png')

    // Click Zone 04 button on map
    await page.evaluate(() => window.scrollTo(0, 420))
    await page.waitForTimeout(400)
    const zone04Btn = await page.$('button:has-text("Zone 04")')
    if (zone04Btn) {
      await zone04Btn.click().catch(() => {})
      await page.waitForTimeout(800)
    }
    await page.screenshot({ path: path.join(__dirname, '../audit_results/timeline_screenshots/02b_desktop_zone04_canvas.png') })
    console.log('Captured 02b_desktop_zone04_canvas.png')

    await browser.close()
  } finally {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', server.pid.toString(), '/f', '/t'])
    } else {
      server.kill()
    }
  }
}

main().catch(console.error)
