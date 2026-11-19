import {
  KnowledgeChunk,
  ProjectMetadata,
  QuantitativeClaimItem,
  SourceConflict,
  StructuredProfileData,
  EvidenceItem,
  SourcePlan,
  SourceType,
  PortfolioLayer
} from '@/types/rag'
import { RoutingDecision, classifyAndRoute } from '@/lib/rag/intentRouter'
import { planSourceRetrieval } from '@/lib/rag/sourcePlanner'
import {
  buildKnowledgeIndex,
  queryQuantitativeRegistry,
  queryCodeEvidence
} from '@/lib/rag/knowledgeIndex'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { resumeData } from '@/data/canonical/resumeData'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'
import { quantitativeClaims } from '@/data/canonical/quantitativeClaims'
import { sourceConflicts } from '@/data/canonical/sourceConflicts'
import { canonicalKnowledge } from '@/data/canonical/portfolioKnowledge'
import { journalChapters } from '@/data/canonical/journalChapters'
import { prologue, epilogue } from '@/data/chapters'
import { timelineData } from '@/data/experience'
import { getGitHubRepoEvidence, GitHubRepoRecord } from '@/lib/rag/sources/githubAdapter'
import {
  queryCanonicalStructuredKnowledge,
  sanitizeRetrievalEvidence
} from '@/lib/rag/canonicalRAGAdapter'
import {
  queryKnowledgeBaseStructured,
  isChunkEligibleForPublicRetrieval,
  isEvidenceItemEligibleForPublicRetrieval,
  AccessLevel
} from '@/lib/rag/knowledgeBaseIngestion'

export interface StructuredRetrievalResult {
  profile?: StructuredProfileData
  matchedProjects?: ProjectMetadata[]
  matchingClaims?: QuantitativeClaimItem[]
  relevantConflicts?: SourceConflict[]
  exactAnswer?: string
}

export interface HybridRetrievalResult {
  decision: RoutingDecision
  sourcePlan: SourcePlan
  structured: StructuredRetrievalResult
  semanticChunks: KnowledgeChunk[]
  evidenceItems: EvidenceItem[]
  githubEvidence?: GitHubRepoRecord | null
  debug?: {
    query: string
    retrievalPath: string[]
    selectedSources: SourceType[]
    selectedChunksCount: number
    quantitativeMatches: string[]
    codeEvidenceMatches: string[]
    scores: Array<{ id: string; score: number; reason: string }>
  }
}

/**
 * HYBRID RETRIEVER
 * Dispatches query across Structured, Semantic, CodeEvidence, and Quantitative tiers
 * using source authority boundaries and explicit source planning.
 */
export function retrieveHybrid(
  query: string,
  inputDecision?: RoutingDecision,
  accessLevel: AccessLevel = 'PUBLIC'
): HybridRetrievalResult {
  const decision = inputDecision || classifyAndRoute(query)
  const sourcePlan = planSourceRetrieval(decision, query)
  const structuredResult: StructuredRetrievalResult = {}
  const evidenceItems: EvidenceItem[] = []
  const allChunks = buildKnowledgeIndex(accessLevel)
  const retrievalPaths: string[] = []
  const lowerQ = query.toLowerCase()

  // Phase 2.1: Target project slugs (including multi-entity comparison projects)
  const targetProjectSlugs = [
    ...(decision.detectedProjectSlug ? [decision.detectedProjectSlug] : []),
    ...(decision.comparisonProjectSlugs || [])
  ]
  const uniqueTargetSlugs = [...new Set(targetProjectSlugs)]

  // ---------------------------------------------------------------------------
  // 0. CANONICAL STRUCTURED REGISTRY TIER (Phase 2.5 & Phase 2.1 Multi-Entity)
  // ---------------------------------------------------------------------------
  for (const slug of (uniqueTargetSlugs.length > 0 ? uniqueTargetSlugs : [decision.detectedProjectSlug])) {
    const canonicalStructured = queryCanonicalStructuredKnowledge(query, slug)
    if (canonicalStructured.matched) {
      if (!retrievalPaths.includes('canonical_structured_registry')) {
        retrievalPaths.push('canonical_structured_registry')
      }
      if (!structuredResult.exactAnswer && canonicalStructured.exactAnswer) {
        structuredResult.exactAnswer = canonicalStructured.exactAnswer
      }
      for (const ce of canonicalStructured.canonicalEvidence) {
        if (!evidenceItems.some(e => e.id === ce.id)) {
          evidenceItems.push(ce)
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 0b. STRUCTURED KNOWLEDGE BASE & ADR TIER (Phase 2.5E & Phase 2.1 Multi-Entity)
  // ---------------------------------------------------------------------------
  for (const slug of (uniqueTargetSlugs.length > 0 ? uniqueTargetSlugs : [decision.detectedProjectSlug])) {
    const kbStructured = queryKnowledgeBaseStructured(query, slug, accessLevel)
    if (kbStructured.matched) {
      const eligibleEvidence = kbStructured.evidence.filter(e =>
        isEvidenceItemEligibleForPublicRetrieval(e, accessLevel)
      )
      if (eligibleEvidence.length > 0 || kbStructured.exactAnswer) {
        if (!retrievalPaths.includes('structured_knowledge_base')) {
          retrievalPaths.push('structured_knowledge_base')
        }
        if (!structuredResult.exactAnswer && kbStructured.exactAnswer) {
          structuredResult.exactAnswer = kbStructured.exactAnswer
        }
        for (const ke of eligibleEvidence) {
          if (!evidenceItems.some(e => e.id === ke.id)) {
            evidenceItems.push(ke)
          }
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 1. STRUCTURED QUANTITATIVE CLAIMS TIER
  // ---------------------------------------------------------------------------
  const isQuantitativeIntent =
    lowerQ.includes('how many') ||
    lowerQ.includes('test') ||
    lowerQ.includes('tests') ||
    lowerQ.includes('suite') ||
    lowerQ.includes('suites') ||
    lowerQ.includes('volume') ||
    lowerQ.includes('error') ||
    lowerQ.includes('424') ||
    lowerQ.includes('178') ||
    lowerQ.includes('158') ||
    lowerQ.includes('47') ||
    lowerQ.includes('metric')

  const quantMatches = queryQuantitativeRegistry(query, decision.detectedProjectSlug)
  if (quantMatches.length > 0 && (isQuantitativeIntent || decision.detectedProjectSlug)) {
    retrievalPaths.push('structured_quantitative_registry')
    structuredResult.matchingClaims = quantMatches

    for (const qm of quantMatches) {
      evidenceItems.push({
        id: `evidence-metric-${qm.id}`,
        source: `Canonical Claim // ${qm.claim}`,
        sourceType: 'quantitative_claim',
        authority: 'primary',
        layer: 'system',
        entity: qm.projectSlug || 'Quantitative Registry',
        content: `VERIFIED QUANTITATIVE CLAIM:
• Claim: ${qm.claim}
• Project: ${qm.projectSlug || 'General'}
• Verified Metric: ${qm.metricValue} ${qm.unit || ''}
• Verification Status: ${qm.status}
• Evidence Source: ${qm.evidenceSource || 'Canonical verification runner'}
• Verification Details: ${qm.verificationDetails}`,
        deepLink: qm.projectSlug ? `/projects/${qm.projectSlug}` : '/projects',
        provenanceBadge: `[Verified Metric // ${qm.metricValue} ${qm.unit || 'tests'}]`,
        quantitativeData: {
          metricValue: qm.metricValue,
          unit: qm.unit,
          claim: qm.claim,
          evidenceSource: qm.evidenceSource,
          verificationDetails: qm.verificationDetails
        }
      })
    }
  }

  // ---------------------------------------------------------------------------
  // 2. DIRECT CODE EVIDENCE TIER
  // ---------------------------------------------------------------------------
  const isCodeIntent =
    lowerQ.includes('code') ||
    lowerQ.includes('implementation') ||
    lowerQ.includes('implemented') ||
    lowerQ.includes('file') ||
    lowerQ.includes('path') ||
    lowerQ.includes('source') ||
    lowerQ.includes('line') ||
    lowerQ.includes('function') ||
    lowerQ.includes('eval-layer') ||
    lowerQ.includes('evaluator') ||
    lowerQ.includes('batch') ||
    lowerQ.includes('calculatebatches') ||
    lowerQ.includes('snippet') ||
    lowerQ.includes('where is') ||
    lowerQ.includes('show me')

  const codeMatches = queryCodeEvidence(query, decision.detectedProjectSlug)
  if (codeMatches.length > 0 && isCodeIntent) {
    retrievalPaths.push('direct_code_evidence')
    for (const cm of codeMatches) {
      const meta = cm.metadata
      evidenceItems.push({
        id: cm.id,
        source: meta.source_title,
        sourceType: 'code_evidence',
        authority: 'primary',
        layer: 'system',
        entity: meta.project || 'Code Evidence',
        content: cm.content,
        deepLink: meta.source_url,
        provenanceBadge: `[Code // ${meta.sourcePath || 'Implementation'}]`,
        sourcePath: meta.sourcePath,
        lineRange: meta.lineRange,
        language: meta.language,
        decision: meta.decision,
        principle: meta.principle,
        codeSnippet: meta.codeSnippet,
        ownership: meta.ownership,
        ownershipClassification: meta.ownershipClassification
      })
    }
  }

  // ---------------------------------------------------------------------------
  // 3. MULTI-SOURCE CAREER PROGRESSION & REASONING TIER
  // ---------------------------------------------------------------------------
  const isCareerProgressionIntent =
    lowerQ.includes('how did aadil go from') ||
    lowerQ.includes('how did he go from') ||
    lowerQ.includes('from math to ai') ||
    lowerQ.includes('transition into ai') ||
    lowerQ.includes('transition to ai') ||
    lowerQ.includes('move from mathematics') ||
    lowerQ.includes('math questions to building ai') ||
    lowerQ.includes('content to content systems') ||
    lowerQ.includes('career evolution') ||
    lowerQ.includes('how did he get into ai') ||
    (lowerQ.includes('why') && lowerQ.includes('deterministic') && lowerQ.includes('evaluation'))

  if (isCareerProgressionIntent) {
    retrievalPaths.push('multi_source_career_progression')

    // Stage 1: Mathematical Foundations & Representation (Timeline + Ch 01-03)
    evidenceItems.push({
      id: 'evidence-progression-stage-1-foundations',
      source: 'Timeline & Journal Ch. 01–03',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'journal',
      entity: 'Stage 1: Mathematical Foundations & Representation',
      content: `CAREER EVOLUTION — STAGE 1: MATHEMATICAL FOUNDATIONS (2021 — 2022)
• Role: Mathematics Content Developer & SME (Graveiens, InhaltMart, Digiplus).
• Focus: Authoring K-12 textbook solutions, graphing calculator plots (TI-83), and LaTeX/MathType notation.
• Key Discovery: Mathematical correctness is not just the final numerical answer; it depends on formal representation. Representation is not cosmetic—it is an inseparable part of correctness.
• Validation Principle: Learned to validate why student distractors fail before ever attempting automation.`,
      deepLink: '/journal',
      provenanceBadge: '[Journal // Ch. 01–03]'
    })

    // Stage 2: Product Environment & Tool Adoption (Wayground SME + VoyageMath, Ch 05–08)
    evidenceItems.push({
      id: 'evidence-progression-stage-2-product',
      source: 'Journal Ch. 05–08 & Timeline',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'journal',
      entity: 'Stage 2: Product Environment & Visual Scaling',
      content: `CAREER EVOLUTION — STAGE 2: PRODUCT ENVIRONMENT & SCALING (2024)
• Role: Subject Matter Expert — Mathematics at Wayground.
• VoyageMath V1 Adoption: SME testing, bug reporting, and KaTeX rendering edge-case validation for the internal authoring tool.
• Visual Content: Created hundreds of coordinate geometry diagrams in Figma, standardizing SVG exports.
• Workflow Shift: Content authoring became a pipeline bottleneck; recognized that production quality depends on workflow constraints rather than individual authoring speed.`,
      deepLink: '/experience',
      provenanceBadge: '[Journal // Ch. 05–08]'
    })

    // Stage 3: AI Failures & Deterministic Evaluation (VM Copy, Ch 09–12)
    evidenceItems.push({
      id: 'evidence-progression-stage-3-evaluation',
      source: 'Journal Ch. 11–12 & Systems Archive',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'system',
      entity: 'Stage 3: AI Generation to Deterministic Evaluation',
      content: `CAREER EVOLUTION — STAGE 3: FROM GENERATION TO EVALUATION (Early 2025)
• The Problem: Using LLMs for question generation resulted in broken invariants (3 or 5 options, multiple correct answers, duplicate distractors). Prompting reached an reliability ceiling.
• VM Copy Generator: Built in-house Next.js App Router tool with parallel micro-batching (calculateBatches) to prevent serverless timeouts.
• The Breakthrough (lib/eval-layer.ts): Placed an in-memory Tier-1 Deterministic Evaluator outside the model. The model generates candidates, but deterministic code validates option cardinality, single CA, and distractor uniqueness.`,
      deepLink: '/projects/vm-copy',
      provenanceBadge: '[Systems // VM Copy]',
      ownershipClassification: 'INDEPENDENT_BUILD'
    })

    // Stage 4: Applications to Distributed Pipelines (AI Worksheets, Item Bank, Curriculum ETL, Ch 13–15)
    evidenceItems.push({
      id: 'evidence-progression-stage-4-pipelines',
      source: 'Journal Ch. 13–15 & Systems Archive',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'system',
      entity: 'Stage 4: Applications to Distributed Pipelines',
      content: `CAREER EVOLUTION — STAGE 4: DISTRIBUTED PIPELINES & OPTIMIZATION (Mid 2025)
• AI Worksheets POC: Full-stack FastAPI + React app combining Gemini Flash text generation with deterministic 2D backtracking puzzle solvers and Dockerized pdflatex pools.
• US Math Item Bank: Wayground team pipeline; Aadil contributed visual domain routing (SVG vs TikZ), compile gates, and Min/Max Swap optimization for state standard balancing.
• Curriculum Transformation Engine: Asynchronous Map-Reduce ETL pipeline with Celery, Redis, and Claude 3.5 Sonnet, guarded by 3-Tier Integrity Gates and dynamic schema contract synthesis.`,
      deepLink: '/projects',
      provenanceBadge: '[Systems // Item Bank & ETL]'
    })

    // Stage 5: Autonomous Systems & Governed Reliability (Loom, Atlas, EDA, Reliability, Ch 16–19)
    evidenceItems.push({
      id: 'evidence-progression-stage-5-reliability',
      source: 'Journal Ch. 16–19 & Systems Archive',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'system',
      entity: 'Stage 5: Autonomous Systems & Governed Reliability',
      content: `CAREER EVOLUTION — STAGE 5: DETERMINISTIC ENGINEERING & RELIABILITY (Late 2025 — 2026 / August 2026 — Present: Still Building. Still Exploring.)
• Loom AI & Atlas AI: Multi-agent LangGraph architectures pairing vector retrieval with proactive alert daemons and human-in-the-loop (HITL) approval queues.
• Engineering Design Automation (EDA CAD): AI interprets the brief; closed-form physics and OpenCascade CadQuery BRep solid modeling guarantee STEP geometry with 0.0000% volume error (424 tests across 28 suites).
• OCR Evaluation & Robustness Testing Platform (Sep 2026): Multi-tier document accuracy evaluation (CER, WER, critical-field matching, OCR confidence) with risk classification (PASS/REVIEW/FAIL) and degradation testing across blur, noise, rotation, contrast, and JPEG compression (134 backend pytests + 20 UI assertions).
• AI Application Reliability: Full-circle closed loop. Built a Playwright browser QA harness that tests AI applications (like VM Copy) using covariance uncertainty filtering to deterministically abstain from speculative actions and enforcing cryptographic human authorization.
• Engineering Portfolio & Ask Aadil (Sep 2026): Built this bespoke portfolio platform, 36-folio Engineering Journal, Cartographic Journey Map, and Ask Aadil—a strict zero-fabrication hybrid RAG agent with temporal reasoning and UI tool dispatch (172/172 verified checks across test suites).
• Solace AI (Solace Hackathon, Nov 2026): Cross-platform Expo 58 + FastAPI/LangGraph wellness companion extending deterministic safety screening, consent-based memory, ephemeral audio purging, and ambiguous SSE containment to mobile consumer AI (52 backend pytests + 50 mobile suite checks).`,
      deepLink: '/systems',
      provenanceBadge: '[Systems // EDA & Reliability]',
      ownershipClassification: 'INDEPENDENT_BUILD'
    })
  }

  // ---------------------------------------------------------------------------
  // 4. OWNERSHIP & CONTRIBUTION BOUNDARIES TIER
  // ---------------------------------------------------------------------------
  const isVoyageMathQuery =
    lowerQ.includes('voyagemath') ||
    lowerQ.includes('voyage math') ||
    (lowerQ.includes('did aadil build') && lowerQ.includes('voyage'))

  if (isVoyageMathQuery) {
    retrievalPaths.push('ownership_voyagemath_boundary')
    evidenceItems.push({
      id: 'evidence-ownership-voyagemath',
      source: 'Canonical Project Registry',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'system',
      entity: 'VoyageMath V1',
      content: `SYSTEM OWNERSHIP BOUNDARY // VoyageMath V1:
• System: Internal mathematical content authoring and rendering platform.
• Built By: Wayground Engineering Team (Collaborative Enterprise System).
• Aadil's Documented Role: Subject Matter Expert — Mathematics (Jan 2024 – Dec 2025).
• Aadil's Personal Contribution: SME testing, KaTeX rendering validation, bug identification and reporting, feature recommendations, pedagogical validation.
• Strict Invariant: Aadil did NOT build VoyageMath solely; the system was engineered by the Wayground engineering team.`,
      deepLink: '/projects/vm-copy',
      provenanceBadge: '[Canonical Project Registry — Team System]',
      ownership: 'WAYGROUND · TEAM SYSTEM (SME CONTRIBUTION)',
      ownershipClassification: 'TEAM_OWNERSHIP'
    })
  }

  const isItemBankOwnershipQuery =
    (lowerQ.includes('item bank') || lowerQ.includes('item-bank')) &&
    (lowerQ.includes('build') || lowerQ.includes('contribute') || lowerQ.includes('role') || lowerQ.includes('ownership'))

  if (isItemBankOwnershipQuery) {
    retrievalPaths.push('ownership_item_bank_boundary')
    evidenceItems.push({
      id: 'evidence-ownership-item-bank',
      source: 'Canonical Project Registry',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'system',
      entity: 'US Mathematics Item Bank',
      content: `SYSTEM OWNERSHIP & CONTRIBUTION BOUNDARY // US Mathematics Item Bank Pipeline:
• System: Multi-agent LangGraph item generation pipeline for 10,000+ curriculum items across mathematical content domains.
• System Ownership: Wayground AI & Engineering Team.
• Aadil's Documented Personal Contribution:
  - Mathematical visual domain routing (SVG for coordinate geometry vs TikZ for algebra/statistics)
  - Compile gates enforcing visual and LaTeX rendering correctness
  - Curriculum balancing through Min/Max Swap optimization across state standards.
• Invariant: Aadil contributed core mathematical routing, compile gates, and optimization constraints, but did not build the entire multi-agent pipeline alone.`,
      deepLink: '/projects/math-item-bank',
      provenanceBadge: '[Canonical Project Registry — Personal Contribution]',
      ownership: 'WAYGROUND · TEAM SYSTEM (AADIL CONTRIBUTION)',
      ownershipClassification: 'AADIL_CONTRIBUTION'
    })
  }

  // ---------------------------------------------------------------------------
  // 5. STRUCTURED PROFILE & INTENT TIERS
  // ---------------------------------------------------------------------------
  // Contact Queries -> Structured Profile ONLY
  if (decision.intent === 'contact') {
    retrievalPaths.push('structured_contact_profile')
    structuredResult.profile = structuredProfile
    evidenceItems.push({
      id: 'evidence-contact-profile',
      source: 'Structured Profile',
      sourceType: 'structured_profile',
      authority: 'primary',
      layer: 'none',
      entity: structuredProfile.name,
      content: `Authoritative Contact & Location:
• Email: ${structuredProfile.email} (Secondary: ${structuredProfile.secondaryEmail})
• Phone: ${structuredProfile.phone}
• Location: ${structuredProfile.location}
• LinkedIn: ${structuredProfile.linkedinUrl}
• GitHub: ${structuredProfile.githubUrls.primary} (Alternate: ${structuredProfile.githubUrls.legacyOrAlternate})
• Portfolio: ${structuredProfile.portfolioUrl}
• Open to Work: ${structuredProfile.openToWork ? 'Yes (Remote Globally)' : 'No'}`,
      deepLink: '/contact',
      provenanceBadge: '[Structured Profile]'
    })

    return {
      decision,
      sourcePlan,
      structured: structuredResult,
      semanticChunks: allChunks.filter(c => c.metadata.source_type === 'structured_profile'),
      evidenceItems,
      debug: {
        query,
        retrievalPath: retrievalPaths,
        selectedSources: Array.from(new Set(evidenceItems.map(e => e.sourceType))),
        selectedChunksCount: evidenceItems.length,
        quantitativeMatches: quantMatches.map(q => q.id),
        codeEvidenceMatches: codeMatches.map(c => c.id),
        scores: []
      }
    }
  }

  // Identity Queries
  if (decision.intent === 'identity') {
    retrievalPaths.push('structured_identity')
    structuredResult.profile = structuredProfile
    structuredResult.matchedProjects = projectsMetadata

    evidenceItems.push({
      id: 'evidence-identity-profile',
      source: 'Structured Profile',
      sourceType: 'structured_profile',
      authority: 'primary',
      layer: 'none',
      entity: structuredProfile.name,
      content: `Name: ${structuredProfile.name}
Role / Positioning: ${structuredProfile.portfolioPositioning}
Educational Background: ${structuredProfile.education.map(e => `${e.degree} (${e.institution}, ${e.year})`).join('; ')}
Languages: ${structuredProfile.languages.join(', ')}`,
      deepLink: '/',
      provenanceBadge: '[Structured Profile]'
    })

    evidenceItems.push({
      id: 'evidence-identity-journal',
      source: 'Journal',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'journal',
      entity: 'Prologue & Foundations',
      content: `Journal About / Origins:
${prologue.narrative[0]}
${prologue.narrative[1]}
${prologue.narrative[2]}
${prologue.narrative[3]}`,
      deepLink: '/journal',
      provenanceBadge: '[Journal — About]'
    })

    evidenceItems.push({
      id: 'evidence-identity-timeline',
      source: 'Timeline',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'timeline',
      entity: 'Chronological Spine',
      content: `Progression:
1. 2021 — 2022: Mathematics Content Developer & SME (Digituala, Inhaltmart, Digiplus)
2. 2024 — 2025: Subject Matter Expert — Mathematics at Wayground (built VM Copy)
3. 2026: AI Engineer / Consultant at Wayground (AI Worksheets, Curriculum ETL, Math Item Bank)
4. Present: Independent AI Systems Engineering and Autonomous Agent Reliability Harnesses`,
      deepLink: '/experience',
      provenanceBadge: '[Timeline — Chronology]'
    })

    evidenceItems.push({
      id: 'evidence-identity-resume',
      source: 'Resume',
      sourceType: 'resume',
      authority: 'primary',
      layer: 'resume',
      entity: 'Professional Record',
      content: `Formal Resume Title: ${resumeData.header.title}
Education: B.Tech (Hons.) in Mechanical Engineering, Lovely Professional University (2017)
Career Summary: ${resumeData.summary}`,
      deepLink: '/resume.pdf',
      provenanceBadge: '[Resume — Professional Record]'
    })
  }

  // Foundations & Principles
  if (decision.intent === 'foundations') {
    retrievalPaths.push('foundations_epilogue')
    evidenceItems.push({
      id: 'evidence-foundations-epilogue',
      source: 'Journal',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'journal',
      entity: 'Epilogue — Foundational Principles',
      content: `THE 7 FOUNDATIONAL ENGINEERING PRINCIPLES:
Core Thesis: ${epilogue.thesis}

1. Start With the Problem:
   ${epilogue.principles[0].description}

2. Representation Is Part of Correctness:
   ${epilogue.principles[1].description}

3. Generation Is Not Verification:
   ${epilogue.principles[2].description}

4. Make Uncertainty Explicit:
   ${epilogue.principles[3].description}

5. Reasoning Is Not Authorization:
   ${epilogue.principles[4].description}

6. Preserve Evidence:
   ${epilogue.principles[5].description}

7. Build From the Previous Failure:
   ${epilogue.principles[6].description}`,
      deepLink: '/journal?spread=18#journal-book',
      provenanceBadge: '[Journal — Foundations]'
    })
  }

  // Projects Enumeration
  if (decision.intent === 'projects') {
    retrievalPaths.push('canonical_project_registry')
    structuredResult.matchedProjects = projectsMetadata
    const independent = projectsMetadata.filter(p => p.ownership === 'independent')
    const team = projectsMetadata.filter(p => p.ownership === 'team' || p.ownership === 'contribution')

    evidenceItems.push({
      id: 'evidence-canonical-projects-registry',
      source: 'Canonical Project Registry',
      sourceType: 'portfolio',
      authority: 'primary',
      layer: 'system',
      entity: 'Project Inventory',
      content: `CANONICAL PROJECT REGISTRY INVENTORY:
Total Documented Systems: ${projectsMetadata.length}

INDEPENDENT BUILDS (${independent.length}):
${independent.map(p => `• ${p.title} (${p.slug}):
  - Summary: ${p.summary}
  - Role: ${p.role}
  - Dates: ${p.dates?.start || ''} to ${p.dates?.end || ''}
  - Technologies: ${p.technologies.join(', ')}
  - Status: ${p.evidence?.[0] || 'Documented system'}`).join('\n\n')}

TEAM SYSTEMS & CONTRIBUTIONS (${team.length}):
${team.map(p => `• ${p.title} (${p.slug}):
  - Summary: ${p.summary}
  - Ownership: Team System (${p.role})
  - Documented Contribution: ${p.evidence?.find(e => e.includes('contribution')) || p.evidence?.[0] || 'Team engineering system'}
  - Technologies: ${p.technologies.join(', ')}`).join('\n\n')}`,
      deepLink: '/projects',
      provenanceBadge: '[Canonical Project Registry]'
    })
  }

  // Project-Specific & Multi-Entity Comparison Matches
  if (uniqueTargetSlugs.length > 0) {
    const matched: ProjectMetadata[] = []
    for (const slug of uniqueTargetSlugs) {
      retrievalPaths.push(`project_metadata_${slug}`)
      const proj = projectsMetadata.find(p => p.slug === slug)
      if (proj && !evidenceItems.some(e => e.id === `evidence-project-${proj.slug}`)) {
        matched.push(proj)
        let ownershipClass: 'SYSTEM_CAPABILITY' | 'AADIL_CONTRIBUTION' | 'TEAM_OWNERSHIP' | 'INDEPENDENT_BUILD' = 'INDEPENDENT_BUILD'
        if (proj.ownership === 'team') {
          ownershipClass = proj.slug === 'math-item-bank' ? 'AADIL_CONTRIBUTION' : 'TEAM_OWNERSHIP'
        } else if (proj.ownership === 'independent') {
          ownershipClass = 'INDEPENDENT_BUILD'
        }

        evidenceItems.push({
          id: `evidence-project-${proj.slug}`,
          source: 'Canonical Project Registry',
          sourceType: 'portfolio',
          authority: 'primary',
          layer: 'system',
          entity: proj.title,
          content: `CANONICAL SPECIFICATION // ${proj.title}
Slug: ${proj.slug}
Ownership: ${proj.ownership} (${proj.role})
Dates: ${proj.dates?.start} to ${proj.dates?.end}
Summary: ${proj.summary}
Problem: ${proj.problem}
Technologies: ${proj.technologies.join(', ')}
Evidence:
${proj.evidence?.map(e => `• ${e}`).join('\n')}`,
          deepLink: proj.portfolioRefs?.system || `/projects/${proj.slug}`,
          provenanceBadge: `[Systems Archive — ${proj.title}]`,
          ownership: proj.ownership,
          ownershipClassification: ownershipClass
        })
      }
    }
    if (matched.length > 0) {
      structuredResult.matchedProjects = matched
    }
  }

  // ---------------------------------------------------------------------------
  // 6. EXTERNAL GITHUB REPOSITORY EVIDENCE TIER
  // ---------------------------------------------------------------------------
  let githubEvidence: GitHubRepoRecord | null = null
  for (const slug of uniqueTargetSlugs) {
    const gh = getGitHubRepoEvidence(slug)
    if (gh && !evidenceItems.some(e => e.id === `evidence-github-${slug}`)) {
      if (!githubEvidence) githubEvidence = gh
      evidenceItems.push({
        id: `evidence-github-${slug}`,
        source: 'GitHub',
        sourceType: 'github',
        authority: 'primary',
        layer: 'none',
        entity: `${gh.owner}/${gh.repo}`,
        content: `GITHUB CODE EVIDENCE:
Repository: ${gh.owner}/${gh.repo} (${gh.url})
Description: ${gh.description}
Primary Language: ${gh.primaryLanguage}
Automated Tests: ${gh.hasTests ? `${gh.verifiedTestCount} tests (${gh.testFramework})` : 'None'}
Architecture Notes:
${gh.architectureNotes}`,
        deepLink: gh.url,
        provenanceBadge: `[GitHub — ${gh.owner}/${gh.repo}]`
      })
    }
  }

  // ---------------------------------------------------------------------------
  // 7. SEMANTIC CHUNK SEARCH TIER
  // ---------------------------------------------------------------------------
  retrievalPaths.push('semantic_chunk_search')
  const STOP_WORDS = new Set([
    'what', 'which', 'who', 'when', 'where', 'why', 'how', 'is', 'are', 'was', 'were',
    'did', 'does', 'do', 'the', 'and', 'for', 'with', 'from', 'into', 'in', 'on', 'at',
    'about', 'aadil', 'aadils', 'mohemmed', 'khurshid', 'his', 'tell', 'me', 'you', 'your'
  ])

  const queryTokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2)

  const meaningfulTokens = queryTokens.filter(t => !STOP_WORDS.has(t))

  // Allow chunks: filter out forbidden sources and ineligible chunks
  const candidateChunks = allChunks.filter(chunk => {
    // Governance enforcement: Exclude any chunk ineligible for the requested access level
    if (!isChunkEligibleForPublicRetrieval(chunk, accessLevel)) {
      return false
    }

    if (decision.rule.forbiddenSources && decision.rule.forbiddenSources.includes(chunk.metadata.source_type)) {
      return false
    }
    // Allow CodeEvidence and QuantitativeClaim chunks if queried
    if (isCodeIntent && chunk.metadata.source_type === 'code_evidence') return true
    if (isQuantitativeIntent && chunk.metadata.source_type === 'quantitative_claim') return true
    if (chunk.metadata.source_type === 'canonical_record') return true
    if (chunk.metadata.source_type === 'knowledge_base') return true

    const sourceMatch = decision.rule.preferredSources.includes(chunk.metadata.source_type)
    const layerMatch =
      !decision.rule.preferredLayers ||
      decision.rule.preferredLayers.includes(chunk.metadata.portfolio_layer)
    return sourceMatch || layerMatch
  })

  // Score candidate chunks
  const scoredChunks = candidateChunks.map(chunk => {
    let score = 0
    let tokenMatches = 0
    const lowerContent = chunk.content.toLowerCase()

    for (const token of meaningfulTokens) {
      const regex = new RegExp(`\\b${token}\\b`, 'i')
      if (regex.test(lowerContent)) {
        score += 5
        tokenMatches++
      }
    }

    // Boost CodeEvidence when query looks for code/implementation
    if (isCodeIntent && chunk.metadata.source_type === 'code_evidence') {
      score += 25
    }

    // Boost Quantitative claims when query looks for tests/metrics
    if (isQuantitativeIntent && chunk.metadata.source_type === 'quantitative_claim') {
      score += 30
    }

    // Boost canonical and knowledge base records for authoritative primary grounding
    if (chunk.metadata.source_type === 'canonical_record' || chunk.metadata.source_type === 'knowledge_base') {
      score += 15
    }

    // Boost exact Case Study or ADR matches
    if (chunk.metadata.caseStudyId && lowerQ.includes(chunk.metadata.caseStudyId.toLowerCase())) {
      score += 35
    }
    if (chunk.metadata.adrId && lowerQ.includes(chunk.metadata.adrId.toLowerCase())) {
      score += 40
    }
    if (chunk.metadata.knowledgeCategory === 'ADR' && lowerQ.includes('adr')) {
      score += 20
    }
    if (chunk.metadata.knowledgeCategory === 'CROSS_PROJECT_PATTERN' && (lowerQ.includes('pattern') || lowerQ.includes('principle'))) {
      score += 20
    }

    // Boost project match (including comparison projects)
    if (chunk.metadata.project && uniqueTargetSlugs.includes(chunk.metadata.project)) {
      score += 20
    }

    // Boost technology match
    if (decision.detectedTechnologies && chunk.metadata.technologies) {
      for (const tech of decision.detectedTechnologies) {
        if (chunk.metadata.technologies.some(t => t.toLowerCase().includes(tech))) {
          score += 10
        }
      }
    }

    // Boost primary authority
    if ((tokenMatches > 0 || decision.detectedProjectSlug) && chunk.metadata.authority_type === 'primary') {
      score += 2
    }

    return { chunk, score }
  })

  scoredChunks.sort((a, b) => b.score - a.score)
  const topChunks = scoredChunks.filter(s => s.score >= 5).slice(0, 6).map(s => s.chunk)

  // Append top semantic chunks as evidence items if not already covered
  topChunks.forEach(c => {
    if (!evidenceItems.some(e => e.id === c.id)) {
      evidenceItems.push({
        id: c.id,
        source: c.metadata.source_title,
        sourceType: c.metadata.source_type,
        authority: c.metadata.authority_type,
        layer: c.metadata.portfolio_layer,
        entity: c.metadata.project || c.metadata.source_id,
        date: c.metadata.date,
        content: c.content,
        deepLink: c.metadata.source_url,
        provenanceBadge: `[${c.metadata.source_title}]`,
        sourcePath: c.metadata.sourcePath,
        lineRange: c.metadata.lineRange,
        language: c.metadata.language,
        decision: c.metadata.decision,
        principle: c.metadata.principle,
        codeSnippet: c.metadata.codeSnippet,
        ownership: c.metadata.ownership,
        ownershipClassification: c.metadata.ownershipClassification,
        quantitativeData: c.metadata.quantitativeData,
        caseStudyId: c.metadata.caseStudyId,
        adrId: c.metadata.adrId,
        contentAnchor: c.metadata.contentAnchor,
        governedMetricCaveats: c.metadata.governedMetricCaveats,
        mandatoryCaveatText: c.metadata.mandatoryCaveatText,
        epistemicConfidence: c.metadata.epistemicConfidence,
        evidenceStatus: c.metadata.evidenceStatus,
        executionLocality: c.metadata.executionLocality
      })
    }
  })

  // Sanitize evidence items to enforce confidentiality boundary & publication governance
  const baseSanitizedEvidence = sanitizeRetrievalEvidence(evidenceItems)
  const sanitizedEvidence = baseSanitizedEvidence.filter(e =>
    isEvidenceItemEligibleForPublicRetrieval(e, accessLevel)
  )

  return {
    decision,
    sourcePlan,
    structured: structuredResult,
    semanticChunks: topChunks,
    evidenceItems: sanitizedEvidence,
    githubEvidence,
    debug: {
      query,
      retrievalPath: retrievalPaths,
      selectedSources: Array.from(new Set(sanitizedEvidence.map(e => e.sourceType))),
      selectedChunksCount: sanitizedEvidence.length,
      quantitativeMatches: quantMatches.map(q => q.id),
      codeEvidenceMatches: codeMatches.map(c => c.id),
      scores: scoredChunks.slice(0, 5).map(s => ({
        id: s.chunk.id,
        score: s.score,
        reason: s.chunk.metadata.source_title
      }))
    }
  }
}
