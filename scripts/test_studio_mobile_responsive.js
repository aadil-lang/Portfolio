const fs = require('fs')
const path = require('path')
const assert = require('assert')

console.log('='.repeat(70))
console.log('TEST SUITE: AADIL BUILDS // MOBILE TOUCH-FIRST & RESPONSIVE VALIDATION')
console.log('='.repeat(70))

// 1. Mobile Bottom Navigation
const navPath = path.join(process.cwd(), 'components/navigation/MobileBottomNav.tsx')
assert(fs.existsSync(navPath), 'MobileBottomNav.tsx exists')
const navContent = fs.readFileSync(navPath, 'utf8')

assert(navContent.includes('Home'), 'Mobile nav contains Home tab')
assert(navContent.includes('Work'), 'Mobile nav contains Work tab')
assert(navContent.includes('Systems'), 'Mobile nav contains Systems tab')
assert(navContent.includes('Journal'), 'Mobile nav contains Journal tab')
assert(navContent.includes('About'), 'Mobile nav contains About tab')
assert(navContent.includes('safe-area-inset-bottom'), 'Mobile nav handles iOS safe-area insets')
assert(navContent.includes('min-h-[46px]'), 'Mobile nav enforces >=44px touch targets')
console.log('  ✓ PASS: MobileBottomNav implements 5 required tabs with touch-target & safe-area compliance')

// 2. Launcher Safe Offset
const launcherPath = path.join(process.cwd(), 'components/AskAadil/AskAadilLauncher.tsx')
const launcherContent = fs.readFileSync(launcherPath, 'utf8')
assert(launcherContent.includes('bottom-20'), 'AskAadilLauncher floats safely above mobile bottom dock')
console.log('  ✓ PASS: AskAadilLauncher avoids viewport occlusion with mobile dock')

// 3. Layout Safe-Area Inset
const layoutPath = path.join(process.cwd(), 'app/layout.tsx')
const layoutContent = fs.readFileSync(layoutPath, 'utf8')
assert(layoutContent.includes('pb-24'), 'Main content has safe-area bottom offset on mobile')
assert(layoutContent.includes('StudioCommandPalette'), 'Layout mounts StudioCommandPalette')
assert(layoutContent.includes('MobileBottomNav'), 'Layout mounts MobileBottomNav')
console.log('  ✓ PASS: Root layout mounts mobile dock and command palette with bottom clearance')

// 4. Studio Command Palette
const palettePath = path.join(process.cwd(), 'components/studio/StudioCommandPalette.tsx')
assert(fs.existsSync(palettePath), 'StudioCommandPalette.tsx exists')
const paletteContent = fs.readFileSync(palettePath, 'utf8')
assert(paletteContent.includes("e.key.toLowerCase() === 'k'"), 'Command palette binds Cmd+K / Ctrl+K')
assert(paletteContent.includes('role="dialog"'), 'Command palette enforces accessible dialog role')
console.log('  ✓ PASS: StudioCommandPalette implements accessible Cmd+K keyboard interface')

// 5. Studio Stations Integrity
const stationsPath = path.join(process.cwd(), 'data/studioStations.ts')
assert(fs.existsSync(stationsPath), 'data/studioStations.ts exists')
const stationsContent = fs.readFileSync(stationsPath, 'utf8')
assert(stationsContent.includes("'workbench'"), 'Station 1: Workbench defined')
assert(stationsContent.includes("'systems-lab'"), 'Station 2: Systems Lab defined')
assert(stationsContent.includes("'experiment-lab'"), 'Station 3: Experiment Lab defined')
assert(stationsContent.includes("'journal'"), 'Station 4: Journal defined')
assert(stationsContent.includes("'about'"), 'Station 5: About defined')
console.log('  ✓ PASS: Studio stations data model contains all 5 spaces')

console.log('\n' + '='.repeat(70))
console.log('🎉 ALL MOBILE TOUCH-FIRST & RESPONSIVE CHECKS PASSED!')
console.log('='.repeat(70))
