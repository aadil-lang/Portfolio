const path = require('path')

async function runHardeningBrowserQA() {
  console.log('================================================================');
  console.log('ASK AADIL // BROWSER END-TO-END HARDENING INTERACTION QA');
  console.log('================================================================\n');

  const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../audit_results/qa_renders');

  console.log('1. Navigating to Portfolio Homepage (http://localhost:3002)...');
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  console.log('2. Opening Ask Aadil Modal Drawer...');
  const askBtn = await page.$('#header-ask-aadil-btn');
  if (!askBtn) throw new Error('#header-ask-aadil-btn not found!');
  await askBtn.click();
  await page.waitForTimeout(600);

  async function sendTurn(query, description, options = {}) {
    console.log(`\n▶ [Turn] ${description}`);
    console.log(`  User: "${query}"`);

    const prevCount = await page.evaluate(() => document.querySelectorAll('.chat-bubble-agent').length);

    const input = await page.$('input[placeholder*="Ask about systems"]');
    await input.fill(query);
    await page.keyboard.press('Enter');

    // Wait for the new agent bubble to appear
    await page.waitForFunction(
      (expected) => document.querySelectorAll('.chat-bubble-agent').length > expected,
      prevCount,
      { timeout: 8000 }
    );
    await page.waitForTimeout(400);

    const text = await page.evaluate(() => {
      const bubbles = document.querySelectorAll('.chat-bubble-agent');
      return bubbles.length > 0 ? bubbles[bubbles.length - 1].innerText : document.body.innerText;
    });

    const norm = (s) => s.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\*\*/g, '');
    const normText = norm(text);

    if (options.mustInclude) {
      for (const snippet of options.mustInclude) {
        if (!normText.includes(norm(snippet))) {
          console.error(`  ✗ FAIL: Missing required snippet: "${snippet}"`);
          console.error(`  Actual message text:\n${text}`);
          throw new Error(`Snippet missing: ${snippet}`);
        }
      }
      console.log(`  ✓ Verified required snippets: ${options.mustInclude.map(s => `"${s}"`).join(', ')}`);
    }

    if (options.mustNotInclude) {
      for (const forbidden of options.mustNotInclude) {
        if (normText.includes(norm(forbidden))) {
          console.error(`  ✗ FAIL: Leaked forbidden text: "${forbidden}"`);
          throw new Error(`Forbidden text leaked: ${forbidden}`);
        }
      }
      console.log(`  ✓ Verified exclusion of: ${options.mustNotInclude.map(s => `"${s}"`).join(', ')}`);
    }

    if (options.mustCite) {
      for (const cite of options.mustCite) {
        if (!normText.includes(norm(cite))) {
          console.error(`  ✗ FAIL: Missing required citation: "${cite}"`);
          throw new Error(`Citation missing: ${cite}`);
        }
      }
      console.log(`  ✓ Verified provenance citations: ${options.mustCite.map(s => `"${s}"`).join(', ')}`);
    }

    return text;
  }

  // ===========================================================================
  // SUITE 1: TEMPORAL REASONING IN RENDERED BROWSER UI
  // ===========================================================================
  console.log('\n================================================================');
  console.log('BROWSER SUITE 1: TEMPORAL REASONING');
  console.log('================================================================');

  await sendTurn('Where does Aadil currently work?', 'B1: Where does Aadil currently work?', {
    mustInclude: ['July 2026', 'Wayground', 'independent AI systems research'],
    mustCite: ['Timeline — Chronology', 'Resume — Professional Record']
  });

  await sendTurn('Does Aadil currently work at Wayground?', 'B2: Does Aadil currently work at Wayground?', {
    mustInclude: ['No, Aadil does not currently work at Wayground', 'July 2026', 'historical'],
    mustCite: ['Resume — Professional Record', 'Timeline — Chronology']
  });

  await sendTurn('Is Aadil unemployed?', 'B3: Is Aadil unemployed?', {
    mustInclude: ['do not establish that Aadil is unemployed', 'Absence of a current corporate employer must never be converted into an unemployment claim', 'Chapter 10'],
    mustCite: ['Timeline — Chronology', 'Journal — Latest documented activity']
  });

  await sendTurn('What was Aadil\'s most recent job?', 'B4: What was Aadil\'s most recent job?', {
    mustInclude: ['AI Engineer / Consultant, AI/ML Team', 'Wayground', 'January 2026 – July 2026'],
    mustCite: ['Resume — Professional Record', 'Timeline — Chronology']
  });

  await page.screenshot({ path: path.join(outDir, '20_hardening_temporal_qa.png') });
  console.log('✓ Captured screenshot: 20_hardening_temporal_qa.png');

  // ===========================================================================
  // BROWSER SUITE 2: CANCELLED CONTACT STATE & ZERO LEAKAGE
  // ===========================================================================
  console.log('\n================================================================');
  console.log('BROWSER SUITE 2: CANCELLED CONTACT & SWITCH TO ATLAS AI');
  console.log('================================================================');

  await sendTurn('Tell me about VM Copy.', 'B5: Activate VM Copy', {
    mustInclude: ['VM Copy Question Generator']
  });

  await sendTurn('I’d like to discuss this project with Aadil.', 'B6: Initiate discussion', {
    mustInclude: ['What should I call you?']
  });

  await sendTurn('Rahul.', 'B7: Provide name', {
    mustInclude: ['Thanks, **Rahul**!', 'what email address should Aadil use to reply?']
  });

  await sendTurn('Cancel contact.', 'B8: Cancel contact request', {
    mustInclude: ['Contact request cancelled', 'cleared your draft and visitor information']
  });

  await sendTurn('Tell me about Atlas AI.', 'B9: Switch to Atlas AI after cancellation', {
    mustInclude: ['Atlas AI', 'Financial Copilot', 'SEC EDGAR'],
    mustNotInclude: ['Rahul', 'rahul@example.com', 'Tier-1 Deterministic Evaluator']
  });

  await page.screenshot({ path: path.join(outDir, '21_hardening_cancelled_state_qa.png') });
  console.log('✓ Captured screenshot: 21_hardening_cancelled_state_qa.png');

  // ===========================================================================
  // BROWSER SUITE 3: DRAFT INTEGRITY WITH INTERLEAVED QUESTION
  // ===========================================================================
  console.log('\n================================================================');
  console.log('BROWSER SUITE 3: DRAFT INTEGRITY WITH INTERLEAVED QUESTION');
  console.log('================================================================');

  await sendTurn('I’d like to discuss this project with Aadil.', 'B10: Contact for Atlas AI', {
    mustInclude: ['What should I call you?']
  });

  await sendTurn('Sarah.', 'B11: Name Sarah', {
    mustInclude: ['Thanks, **Sarah**!']
  });

  await sendTurn('sarah@venture.com', 'B12: Provide email', {
    mustInclude: ['Subject: Discussion about Atlas AI', 'Sarah', 'Send it']
  });

  await sendTurn('Make it shorter.', 'B13: Natural edit', {
    mustInclude: ['Hi Aadil,', 'Sarah', 'Would you like to send this now?']
  });

  await sendTurn('What database does Atlas AI use?', 'B14: Interleaved question during draft review', {
    mustInclude: ['Atlas Vector Search']
  });

  await sendTurn('Send it.', 'B15: Confirm after interleaved question', {
    mustInclude: ['opened your default mail client', 'aadil.khurshid95@gmail.com'],
    mustCite: ['Action Layer · mailto execution']
  });

  await page.screenshot({ path: path.join(outDir, '22_hardening_draft_integrity_qa.png') });
  console.log('✓ Captured screenshot: 22_hardening_draft_integrity_qa.png');

  console.log('\n================================================================');
  console.log('🎉 ALL BROWSER HARDENING INTERACTION TESTS PASSED!');
  console.log('================================================================');

  await browser.close();
}

runHardeningBrowserQA().catch((err) => {
  console.error('\n❌ Browser Hardening QA Failed:', err);
  process.exit(1);
});
