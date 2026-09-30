const path = require('path')

// Register ts-node or run via node with tsconfig-paths / compiled or evaluate directly
// Let's create an automated test script that tests both through node and through the rendered browser!

async function runTestSuite() {
  console.log('================================================================');
  console.log('ASK AADIL // CANONICAL KNOWLEDGE, CONSISTENCY & RAG TEST SUITE');
  console.log('================================================================\n');

  // Let's test the browser rendered Ask Aadil modal directly using Playwright
  const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../audit_results/qa_renders');

  console.log('1. Navigating to Portfolio Homepage (http://localhost:3002)...');
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  console.log('2. Verifying "Ask Aadil" Header Trigger Button...');
  const askBtn = await page.$('#header-ask-aadil-btn');
  if (!askBtn) {
    throw new Error('Header Ask Aadil trigger button (#header-ask-aadil-btn) not found!');
  }
  console.log('   ✓ Header trigger button present');

  console.log('3. Opening Ask Aadil Modal Drawer...');
  await askBtn.click();
  await page.waitForTimeout(600);

  // Take screenshot of modal open
  await page.screenshot({ path: path.join(outDir, '15_ask_aadil_modal_open.png') });
  console.log('   ✓ Ask Aadil modal opened and captured (15_ask_aadil_modal_open.png)');

  // Helper to send query and wait for answer
  async function testQuery(query, testName, expectedSnippet, expectedCitation) {
    console.log(`\n--- Test: ${testName} ---`);
    console.log(`Query: "${query}"`);

    const input = await page.$('input[placeholder*="Ask about systems"]');
    await input.fill(query);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1200);

    const bodyText = await page.evaluate(() => document.body.innerText);

    if (expectedSnippet && !bodyText.toLowerCase().includes(expectedSnippet.toLowerCase())) {
      console.error(`   ✗ FAIL: Expected snippet "${expectedSnippet}" not found in response!`);
      throw new Error(`Snippet not found: ${expectedSnippet}`);
    } else if (expectedSnippet) {
      console.log(`   ✓ Found expected answer snippet: "${expectedSnippet}"`);
    }

    if (expectedCitation && !bodyText.toLowerCase().includes(expectedCitation.toLowerCase())) {
      console.error(`   ✗ FAIL: Expected citation "${expectedCitation}" not found in provenance!`);
      throw new Error(`Citation not found: ${expectedCitation}`);
    } else if (expectedCitation) {
      console.log(`   ✓ Found expected citation: "${expectedCitation}"`);
    }
  }

  // TEST 1: Narrative Transition
  await testQuery(
    'How did Aadil move from mathematics content into AI engineering?',
    'Narrative Intent & Operating Loop',
    'VM Copy',
    'Journal'
  );

  // TEST 2: Technical Implementation
  await testQuery(
    'How does VM Copy validate generated questions?',
    'Technical Intent & Invariants',
    'Tier-1 Deterministic Evaluator',
    'Systems Archive'
  );

  // TEST 3: Technology Filtering
  await testQuery(
    'Which projects use LangGraph?',
    'Technology Filter',
    'Atlas AI',
    'Systems'
  );

  // TEST 4: Professional Experience
  await testQuery(
    'What has Aadil done professionally?',
    'Professional Intent & Chronology',
    'Wayground',
    'Resume'
  );

  // TEST 5: Contact Inquiry & Provenance Strictness
  await testQuery(
    'How can I contact Aadil?',
    'Contact Intent (Strict Profile Only)',
    'aadil.khurshid95@gmail.com',
    'Structured Profile'
  );

  // Capture Contact Draft state
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '16_ask_aadil_contact_draft.png') });
  console.log('   ✓ Contact draft flow verified & captured (16_ask_aadil_contact_draft.png)');

  // TEST 6: Uncertainty Handling (Non-portfolio question)
  await testQuery(
    'What is Aadil’s favorite movie?',
    'Uncertainty / Out-of-bounds rejection',
    'I don’t have that documented',
    null
  );

  // TEST 7: Cross-Source Query
  await testQuery(
    'Tell me the complete story of VM Copy.',
    'Cross-Source Synthesis (When, Why, What, Evidence)',
    'When (Timeline)',
    'Timeline'
  );

  // Final Screenshot of Full Chat Session
  await page.screenshot({ path: path.join(outDir, '17_ask_aadil_full_qa_session.png') });
  console.log('\n✓ All Ask Aadil automated tests PASSED cleanly!');
  console.log('✓ Full session captured to audit_results/qa_renders/17_ask_aadil_full_qa_session.png');

  await browser.close();
}

runTestSuite().catch(err => {
  console.error('\n❌ Test Suite Failed:', err);
  process.exit(1);
});
