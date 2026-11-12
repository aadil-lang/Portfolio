const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outputDir = path.join(__dirname, '../audit_results/phase6_2_screenshots')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const PORT = 3014

async function capture() {
  console.log('=== PHASE 6.2: CAPTURING RECRUITER QUICK VIEW SCREENSHOTS ===')
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32'
    ? ['/c', 'npx', 'next', 'start', '-p', String(PORT)]
    : ['next', 'start', '-p', String(PORT)]

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore'
  })

  // wait for server
  console.log(`Waiting for Next.js production server on port ${PORT}...`)
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/recruiter`)
      if (res.ok) {
        console.log(`Server is ready on port ${PORT}`)
        break
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 500))
  }

  const browser = await p.chromium.launch()

  // 1. Desktop Viewport (1280x800) - Full Header & Identity
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto(`http://localhost:${PORT}/recruiter`, { waitUntil: 'networkidle' })
  await desktopPage.screenshot({ path: path.join(outputDir, 'recruiter_identity_desktop.png') })
  console.log('[SAVED] recruiter_identity_desktop.png')

  // 2. Desktop Capabilities & Flagship Projects
  await desktopPage.locator('#recruiter-capabilities-heading').scrollIntoViewIfNeeded()
  await desktopPage.screenshot({ path: path.join(outputDir, 'recruiter_capabilities_desktop.png') })
  console.log('[SAVED] recruiter_capabilities_desktop.png')

  // 3. Desktop Projects & Outcomes
  await desktopPage.locator('#recruiter-projects-heading').scrollIntoViewIfNeeded()
  await desktopPage.screenshot({ path: path.join(outputDir, 'recruiter_projects_desktop.png') })
  console.log('[SAVED] recruiter_projects_desktop.png')

  // 4. Tablet Viewport (768x1024)
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
  const tabletPage = await tabletContext.newPage()
  await tabletPage.goto(`http://localhost:${PORT}/recruiter`, { waitUntil: 'networkidle' })
  await tabletPage.screenshot({ path: path.join(outputDir, 'recruiter_quick_view_tablet.png') })
  console.log('[SAVED] recruiter_quick_view_tablet.png')

  // 5. Mobile Viewport (375x667)
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto(`http://localhost:${PORT}/recruiter`, { waitUntil: 'networkidle' })
  await mobilePage.screenshot({ path: path.join(outputDir, 'recruiter_quick_view_mobile.png') })
  console.log('[SAVED] recruiter_quick_view_mobile.png')

  // 6. Homepage Hero CTA Verification
  await desktopPage.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  await desktopPage.screenshot({ path: path.join(outputDir, 'homepage_hero_cta_desktop.png') })
  console.log('[SAVED] homepage_hero_cta_desktop.png')

  await browser.close()
  server.kill()
  console.log('Screenshots captured and server terminated successfully.')
}

capture().catch(err => {
  console.error('Capture failed:', err)
  process.exit(1)
})

