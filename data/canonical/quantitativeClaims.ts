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
      'Verified by comparing analytical cylinder/cone volume integrals against OpenCascade BRep CAD solid mass property integrals.'
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
    claim: '158 backend test suites validating tool boundaries and failure containment',
    projectSlug: 'ai-reliability',
    metricValue: 158,
    unit: 'test suites',
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
  }
]
