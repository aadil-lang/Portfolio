const path = require('path')
const fs = require('fs')

async function runInteractiveBrowserAudit() {
  console.log('================================================================');
  console.log('COMPREHENSIVE BROWSER INTERACTIVE SESSION & USER JOURNEY TEST');
  console.log('================================================================\n');

  const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../audit_results/browser_user_journey');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Visit Homepage
  console.log('Step 1: Navigating to Homepage (http://localhost:3002/)...');
  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '01_homepage_hero.png') });
  console.log('  ✓ Captured: 01_homepage_hero.png');

  // 2. Scroll through Journey and Timeline preview
  console.log('\nStep 2: Scrolling through Homepage sections...');
  await page.evaluate(() => window.scrollBy({ top: 1200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '02_homepage_journey_scroll.png') });
  console.log('  ✓ Captured: 02_homepage_journey_scroll.png');

  // 3. Scroll to Journal section
  console.log('\nStep 3: Navigating to Engineering Journal notebook...');
  const journalEl = await page.$('#journal, [data-section="journal"]');
  if (journalEl) {
    await journalEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '03_journal_notebook_view.png') });
    console.log('  ✓ Captured: 03_journal_notebook_view.png');

    // Test page flipping
    const nextBtn = await page.$('button[aria-label*="Next spread"], button:has-text("Next"), #journal-next-btn, button[title*="Next"]');
    if (nextBtn) {
      console.log('  Turning Journal page to next spread...');
      await nextBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(outDir, '04_journal_spread_turned.png') });
      console.log('  ✓ Captured: 04_journal_spread_turned.png');
    }
  }

  // 4. Open Ask Aadil Modal Drawer
  console.log('\nStep 4: Opening Ask Aadil Agent Drawer from Header...');
  const askBtn = await page.$('#header-ask-aadil-btn');
  if (!askBtn) throw new Error('#header-ask-aadil-btn not found in header!');
  await askBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '05_ask_aadil_drawer_opened.png') });
  console.log('  ✓ Captured: 05_ask_aadil_drawer_opened.png');

  // 5. Send an exploratory query
  console.log('\nStep 5: Submitting query to Ask Aadil...');
  const chatInput = await page.$('input[placeholder*="Ask about systems"]');
  if (!chatInput) throw new Error('Chat input not found in drawer!');
  await chatInput.fill('What is your core engineering methodology and what did you build at Wayground?');
  await page.keyboard.press('Enter');

  console.log('  Waiting for agent grounded synthesis...');
  await page.waitForFunction(() => document.querySelectorAll('.chat-bubble-agent').length > 0, { timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '06_ask_aadil_answer_received.png') });
  console.log('  ✓ Captured: 06_ask_aadil_answer_received.png');

  // Verify provenance pills
  const citations = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.chat-bubble-agent span'))
      .map(el => el.innerText.trim())
      .filter(t => t.length > 0);
  });
  console.log(`  Rendered Citations in bubble: ${citations.slice(0, 5).join(' | ')}`);

  // 6. Test Reset Conversation
  console.log('\nStep 6: Testing Reset button in Ask Aadil Drawer...');
  const resetBtn = await page.$('#ask-aadil-reset-btn');
  if (resetBtn) {
    await resetBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '07_ask_aadil_reset_state.png') });
    console.log('  ✓ Captured: 07_ask_aadil_reset_state.png');
  }

  // 7. Close Ask Aadil Modal
  console.log('\nStep 7: Closing Ask Aadil Drawer...');
  const closeBtn = await page.$('button[aria-label="Close Ask Aadil"]');
  if (closeBtn) {
    await closeBtn.click();
    await page.waitForTimeout(600);
  }

  // 8. Navigate to Systems Index (/projects)
  console.log('\nStep 8: Navigating to Systems Catalog (/projects)...');
  await page.goto('http://localhost:3002/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '08_systems_index.png') });
  console.log('  ✓ Captured: 08_systems_index.png');

  // 9. Click on Ask Aadil case study card
  console.log('\nStep 9: Opening Ask Aadil Case Study (/projects/ask-aadil)...');
  const askAadilCard = await page.$('a[href*="/projects/ask-aadil"]');
  if (askAadilCard) {
    await askAadilCard.click();
  } else {
    await page.goto('http://localhost:3002/projects/ask-aadil', { waitUntil: 'networkidle' });
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '09_ask_aadil_case_study.png') });
  console.log('  ✓ Captured: 09_ask_aadil_case_study.png');

  // Scroll through case study to inspect architecture and failure modes
  console.log('\nStep 10: Inspecting Architecture Diagram & Failure Modes...');
  await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '10_ask_aadil_case_study_architecture.png') });
  console.log('  ✓ Captured: 10_ask_aadil_case_study_architecture.png');

  // 10. Navigate to Timeline (/experience)
  console.log('\nStep 11: Navigating to Timeline (/experience)...');
  await page.goto('http://localhost:3002/experience', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '11_timeline_experience.png') });
  console.log('  ✓ Captured: 11_timeline_experience.png');

  // 11. Navigate to Contact (/contact)
  console.log('\nStep 12: Navigating to Contact page (/contact)...');
  await page.goto('http://localhost:3002/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '12_contact_page.png') });
  console.log('  ✓ Captured: 12_contact_page.png');

  // 12. Return Home
  console.log('\nStep 13: Returning to Homepage...');
  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '13_returned_home.png') });
  console.log('  ✓ Captured: 13_returned_home.png');

  console.log('\n================================================================');
  console.log('🎉 FULL BROWSER INTERACTIVE SESSION SUCCESSFULLY COMPLETED!');
  console.log('================================================================');

  await browser.close();
}

runInteractiveBrowserAudit().catch(err => {
  console.error('\n❌ Browser test failed:', err);
  process.exit(1);
});
