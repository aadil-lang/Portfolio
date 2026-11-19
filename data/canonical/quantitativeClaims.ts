import { QuantitativeClaimItem } from '@/types/rag'

/**
 * QUANTITATIVE CLAIMS REGISTRY
 * Authoritative record of all numerical and benchmark claims made
 * across the Portfolio, Resume, Systems Archive, and GitHub.
 * 
 * Strict rule: If a claim cannot be verified against repository code,
 * test outputs, or documented artifacts, its status MUST remain 'unverified'
 * or 'needs_review'. Never fabricate verification evidence.
 */
export const quantitativeClaims: QuantitativeClaimItem[] = [
  {
    id: 'claim-eda-424-tests',
    claim: '424 automated tests passing across 28 test suites',
    projectSlug: 'design-automation',
    metricValue: 424,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/design-automation' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 10 // Folio 021' },
      { source: 'resume', ref: 'Personal Projects Item 1' }
    ],
    status: 'verified',
    evidenceSource: 'Dockerized FastAPI pytest suite and OpenCascade test runner',
    verificationDetails:
      'Verified against 28 test suites covering closed-form torsional physics, nominal shaft series selection, STEP BRep geometry generation, and SVG drawing callout cross-checks.'
  },
  {
    id: 'claim-eda-0-volume-error',
    claim: '0.0000% volume calculation error between closed-form physics and CAD boundary representation',
    projectSlug: 'design-automation',
    metricValue: 0.0,
    unit: 'percent error',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/design-automation' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 10 // Folio 022' }
    ],
    status: 'verified',
    evidenceSource: 'Analytical geometry verification solver vs OpenCascade GProp_GProps evaluation',
    verificationDetails:
      'Verified by comparing analytical stepped cylinder volume integrals against OpenCascade BRep CAD solid mass property integrals (< 10⁻⁶ relative discrepancy). Note: Represents software calculus consistency between closed-form physics equations and CAD solid kernel mass integrals; does not represent physical machining or CNC manufacturing tolerances.'
  },
  {
    id: 'claim-atlas-tests-spec',
    claim: '178 automated pytests validating LangGraph SEC filings and tool execution',
    projectSlug: 'atlas-ai',
    metricValue: 178,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/atlas-ai' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 11 // Folio 024' }
    ],
    status: 'verified',
    evidenceSource: 'Atlas AI complete test suite runner',
    verificationDetails:
      'Verified in complete repository test matrix covering StateGraph router nodes, SEC EDGAR chunkers, vector search retrievers, and background alert worker lifespan.'
  },
  {
    id: 'claim-atlas-tests-resume',
    claim: '59 automated tests validating core graph functionality',
    projectSlug: 'atlas-ai',
    metricValue: 59,
    unit: 'tests',
    claimedIn: [
      { source: 'resume', ref: 'Personal Projects Item 2 (Atlas AI)' }
    ],
    status: 'verified',
    evidenceSource: 'Atlas AI initial MVP test harness',
    verificationDetails:
      'Verified as the test count milestone of the initial Telegram MVP build; subsequent multi-agent RAG expansion grew coverage to 178 tests.'
  },
  {
    id: 'claim-reliability-158-tests',
    claim: '158 collected backend test cases across backend/tests/',
    projectSlug: 'ai-reliability',
    metricValue: 158,
    unit: 'test cases',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/ai-reliability' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 12 // Folio 026' }
    ],
    status: 'verified',
    evidenceSource: 'AI Application Reliability backend test suite',
    verificationDetails:
      'Verified against FastAPI and MCP SDK diagnostic test suites simulating headless Chromium disconnects and model drift.'
  },
  {
    id: 'claim-loom-42-tests',
    claim: '42 automated tests validating Clean Architecture and procurement workflows',
    projectSlug: 'loom-ai',
    metricValue: 42,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/loom-ai' }
    ],
    status: 'verified',
    evidenceSource: 'Loom AI Playwright E2E and Jest integration suites',
    verificationDetails:
      'Verified across 42 automated tests covering Clean Architecture dependency rules, compound MongoDB text search, and LangGraph procurement approval state machines.'
  },
  {
    id: 'claim-reliability-47-governance-tests',
    claim: '47 governance and Playwright E2E verification tests',
    projectSlug: 'ai-reliability',
    metricValue: 47,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/ai-reliability' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 12 // Folio 026' }
    ],
    status: 'verified',
    evidenceSource: 'Playwright test runner and Fisher covariance governance assertions',
    verificationDetails:
      'Verified against Playwright DOM probe simulations and mathematical covariance bounds checking.'
  },
  {
    id: 'claim-etl-3-tier-integrity',
    claim: '3-tier integrity gates (Reviewer -> Critic -> CSV Audit)',
    projectSlug: 'curriculum-etl',
    metricValue: 3,
    unit: 'stages',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/curriculum-etl' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 08 // Folio 017' },
      { source: 'resume', ref: 'Professional Experience — Curriculum-Transformation Engine' }
    ],
    status: 'verified',
    evidenceSource: 'Curriculum-Transformation Map-Reduce codebase pipeline architecture',
    verificationDetails:
      'Verified in code architecture: Reviewer node validates schema, Critic tests semantic alignment, and CSV Audit evaluates row delimiters and null thresholds.'
  },
  {
    id: 'claim-ask-aadil-327-assertions',
    claim: '327 automated assertions passing across 10 Ask Aadil evaluation and verification suites',
    projectSlug: 'ask-aadil',
    metricValue: 327,
    unit: 'assertions',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/ask-aadil' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 14 // Folio 030' }
    ],
    status: 'verified',
    evidenceSource: 'Ask Aadil 10 evaluation test scripts in scripts/ directory',
    verificationDetails:
      'Verified across 10 evaluation test files: test_retrieval_foundation (13), test_query_understanding (38), test_hardening_agent_qa (132), test_ui_context_integration (13), test_tool_registry (19), test_tool_planning (20), test_controlled_actions (29), test_recruiter_contact_layer (18), test_nlu_conversational_robustness (29), test_grounded_conversational_evaluation (16).'
  },
  {
    id: 'claim-ask-aadil-172-tests',
    claim: '172 automated core hardening verifications passing across agent QA, action governance, and Playwright suites',
    projectSlug: 'ask-aadil',
    metricValue: 172,
    unit: 'verifications',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/ask-aadil' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 14 // Folio 030' },
      { source: 'resume', ref: 'Personal & Hackathon AI Projects — Ask Aadil' }
    ],
    status: 'verified',
    evidenceSource: 'Ask Aadil hardening QA, tool governance, and Playwright browser test slice',
    verificationDetails:
      'Verified across temporal reasoning boundaries, 3-state LinkedIn adapter distinction, bitwise draft preservation, prompt injection resistance across 5 sources, and Playwright interactions (132 agent QA + 29 controlled actions + 11 browser E2E).'
  },
  {
    id: 'claim-solace-52-backend-tests',
    claim: '52 automated backend pytests passing across 8 unit and LangGraph orchestration suites',
    projectSlug: 'solace-ai',
    metricValue: 52,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/solace-ai' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 15 // Folio 032' },
      { source: 'resume', ref: 'Personal & Hackathon AI Projects — Solace AI' }
    ],
    status: 'verified',
    evidenceSource: 'Solace AI backend pytest suite (python -m pytest -o asyncio_mode=auto)',
    verificationDetails:
      'Verified 52/52 passing tests across test_conversational_personality.py, test_emotional_landscape.py, test_health.py, test_journal.py, test_langgraph_orchestration.py, test_poetry.py, test_profile_auth.py, and test_rant_and_voice.py.'
  },
  {
    id: 'claim-solace-50-mobile-checks',
    claim: '50 automated mobile verification checks passing across 7 suites with 0 TypeScript errors',
    projectSlug: 'solace-ai',
    metricValue: 50,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/solace-ai' },
      { source: 'portfolio', layer: 'journal', ref: 'Spread 15 // Folio 032' },
      { source: 'resume', ref: 'Personal & Hackathon AI Projects — Solace AI' }
    ],
    status: 'verified',
    evidenceSource: 'Solace AI mobile test runner (npm test) and TypeScript compiler (tsc --noEmit)',
    verificationDetails:
      'Verified 50/50 checks passing across auth_and_profile, phase3_companion, poetry, journal, emotional_landscape, storage_adapter, and api_cold_start suites, with 0 TypeScript errors.'
  },
  {
    id: 'claim-ocr-134-backend-tests',
    claim: '134 automated backend pytests passing across 22 test files',
    projectSlug: 'ocr-evaluator',
    metricValue: 134,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/ocr-evaluator' },
      { source: 'portfolio', layer: 'timeline', ref: 'ocr-evaluator-2026' }
    ],
    status: 'verified',
    evidenceSource: 'OCR Evaluation Pipeline backend pytest runner',
    verificationDetails:
      'Verified 134/134 passing tests across test_adversarial_evaluation, test_batch_error_isolation, test_confidence, test_critical_fields, test_evaluator, test_extractor, test_faithfulness, test_metrics, test_normalization, test_risk, test_robustness, and test_api.'
  },
  {
    id: 'claim-ocr-20-ui-assertions',
    claim: '20 browser UI evaluation assertions passing with 0 frontend JavaScript errors',
    projectSlug: 'ocr-evaluator',
    metricValue: 20,
    unit: 'tests',
    claimedIn: [
      { source: 'portfolio', layer: 'system', ref: '/projects/ocr-evaluator' },
      { source: 'portfolio', layer: 'timeline', ref: 'ocr-evaluator-2026' }
    ],
    status: 'verified',
    evidenceSource: 'OCR Evaluation Pipeline browser UI verification runner',
    verificationDetails:
      'Verified 20/20 UI assertions passing across file uploads, ground-truth diff rendering, critical-field highlighting, and error recovery with 0 console errors.'
  }
]
