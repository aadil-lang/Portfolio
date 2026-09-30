import { SourceConflict } from '@/types/rag'

/**
 * SOURCE CONFLICTS & DISCREPANCY REGISTRY
 * Explicitly records discrepancies between Portfolio, Resume, LinkedIn, and GitHub.
 * 
 * Strict rule: NEVER silently overwrite or manufacture a false consensus.
 * Ask Aadil retrieves both claims and explains the source distinction to visitors.
 */
export const sourceConflicts: SourceConflict[] = [
  {
    id: 'conflict-early-employer',
    topic: 'First Content Role Employer (May 2021 – Oct 2021)',
    claim_a: {
      claim: 'Employer listed as "GRAVEIENS EDUSERVICES PVT. LTD." (Advanced Math Content Developer)',
      source: 'resume',
      reference: 'public/resume.pdf — Page 1, Earlier Experience'
    },
    claim_b: {
      claim: 'Organization listed as "Digituala" (Freelance SME — Mathematics Content)',
      source: 'portfolio',
      layer: 'timeline',
      reference: 'app/experience/page.tsx — May 2021 – Oct 2021'
    },
    status: 'needs_review',
    notes:
      'Graveiens Eduservices Pvt. Ltd. was the registered corporate entity, while Digituala was the educational publishing client/brand. Both refer to the same period of K-12 math content solutions.'
  },
  {
    id: 'conflict-github-handle',
    topic: 'GitHub Account Identifier',
    claim_a: {
      claim: 'Profile links to "github.com/aadil-lang"',
      source: 'resume',
      reference: 'public/resume.pdf — Header & Curriculum-Transformation ref'
    },
    claim_b: {
      claim: 'Profile links to "github.com/aadilkhurshid"',
      source: 'portfolio',
      layer: 'system',
      reference: 'data/profile.ts & Navigation links'
    },
    status: 'needs_review',
    notes:
      'Two active GitHub handles exist: "aadil-lang" holds the Curriculum-Transformation repository; "aadilkhurshid" is the primary engineering portfolio account. Both belong to Mohemmed Aadil Khurshid.'
  },
  {
    id: 'conflict-role-title',
    topic: 'Professional Title and Engineering Positioning',
    claim_a: {
      claim: 'Title stated as "AI Engineer / Python Backend Developer"',
      source: 'resume',
      reference: 'public/resume.pdf — Header'
    },
    claim_b: {
      claim: 'Title stated as "AI Systems Engineer"',
      source: 'portfolio',
      layer: 'timeline',
      reference: 'data/profile.ts & Homepage Hero'
    },
    status: 'resolved_by_context',
    notes:
      'Not a factual contradiction: The resume emphasizes Python backend and applied AI engineering for corporate applicant tracking; the portfolio highlights the full systems spectrum including OpenCascade CAD geometry solvers, Next.js/React rendering, and reliability harnesses.'
  },
  {
    id: 'conflict-atlas-test-count',
    topic: 'Atlas AI Automated Test Suite Count',
    claim_a: {
      claim: 'Test count claimed as "59 automated tests"',
      source: 'resume',
      reference: 'public/resume.pdf — Page 2, Personal Projects'
    },
    claim_b: {
      claim: 'Test count claimed as "178 automated pytests"',
      source: 'portfolio',
      layer: 'system',
      reference: 'app/projects/atlas-ai/page.tsx & Spread 11'
    },
    status: 'resolved_by_context',
    notes:
      'Documented project evolution: The initial Telegram bot MVP was verified with 59 automated tests; the subsequent expanded multi-agent SEC EDGAR RAG system and alert worker reached 178 pytests.'
  },
  {
    id: 'conflict-wayground-dual-role',
    topic: 'Wayground 2024–2025 Title vs Technical Systems Authorship',
    claim_a: {
      claim: 'Formal employment role was "Subject Matter Expert — Mathematics" (Jan 2024 – Dec 2025)',
      source: 'resume',
      reference: 'public/resume.pdf — Professional Experience'
    },
    claim_b: {
      claim: 'Authored production Next.js tools (Content Builder, VM Copy) during SME tenure that initiated transition to AI/ML team',
      source: 'portfolio',
      layer: 'journal',
      reference: 'Engineering Journal — Chapters 04, 05, and 06'
    },
    status: 'resolved_by_context',
    notes:
      'Crucial distinction: Formal HR employment title remained Subject Matter Expert during 2024–2025, but personal initiative in building software tools and VM Copy directly catalyzed the internal promotion into the AI/ML Engineering team in January 2026.'
  }
]
