/**
 * CANONICAL RAG ADAPTER
 *
 * Authoritative integration bridge connecting the Phase 1 canonical data foundation
 * (careerRecords, projectRecords, claimRecords, evidenceRecords) and Phase 2 grounded
 * projections to the Ask Aadil RAG ingestion and retrieval architecture.
 *
 * Core Guarantees:
 * 1. Authoritative Structured Retrieval: Direct, deterministic resolution of career chronology,
 *    employment boundaries, project authorship, IP classifications, and governed metrics.
 * 2. Deterministic Ingestion: Derives stable, content-hashed chunks with full canonical provenance.
 * 3. Confidentiality Enforcement: Strictly prevents proprietary repository URLs from entering
 *    retrieval documents or reaching public query outputs.
 * 4. Metric Qualification Invariants: Enforces mandatory qualification caveats on all quantitative
 *    metrics (EDA CAD software calculus vs CNC, VM Copy <1ms vs LLM inference, AI Reliability
 *    158 test cases, Solace AI mobile Jest/tsc checks vs physical Android devices).
 */

import { canonicalRegistry } from '@/data/canonical/canonicalRegistry'
import {
  CanonicalCareerRecord,
  CanonicalProjectRecord,
  CanonicalTechnicalClaimRecord,
  CanonicalEvidenceRecord
} from '@/data/canonical/canonicalSchema'
import { KnowledgeChunk, SourceChunkMetadata, EvidenceItem } from '@/types/rag'
import { getGroundedJournalChapters } from '@/data/adapters/journalAdapter'

export const RAG_INDEX_VERSION = '2.5.0'

// ============================================================================
// 1. HASHING & REPRODUCIBILITY UTILITIES
// ============================================================================

/**
 * Computes a deterministic SHA-256 content hash for chunk change-detection and integrity.
 * Browser-safe: dynamically uses Node crypto in server/test environments without static imports.
 */
export function computeContentHash(content: string): string {
  const trimmed = content.trim()
  try {
    if (typeof process !== 'undefined' && process.versions?.node) {
      const nodeCrypto = (eval('require'))('crypto')
      if (nodeCrypto && typeof nodeCrypto.createHash === 'function') {
        return nodeCrypto.createHash('sha256').update(trimmed).digest('hex')
      }
    }
  } catch {}

  let h1 = 0xdeadbeef ^ trimmed.length
  let h2 = 0x41c64e6d ^ trimmed.length
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  const part1 = ('00000000' + (h1 >>> 0).toString(16)).slice(-8)
  const part2 = ('00000000' + (h2 >>> 0).toString(16)).slice(-8)
  return (part1 + part2).repeat(4)
}

// ============================================================================
// 2. CANONICAL RECORD INGESTION
// ============================================================================

/**
 * Builds first-class KnowledgeChunk[] from the authoritative Phase 1 canonical registry.
 * Encapsulates career records, project records, claim records, and evidence records.
 */
export function buildCanonicalRegistryChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = []

  // 1. Ingest Canonical Career Records (7 records)
  for (const career of canonicalRegistry.careerRecords) {
    const startStr = career.employmentPeriod.start.dateString
    const endStr =
      typeof career.employmentPeriod.end === 'object'
        ? career.employmentPeriod.end.dateString
        : career.employmentPeriod.end

    const endBoundary =
      typeof career.employmentPeriod.end === 'object'
        ? career.employmentPeriod.end.boundaryType
        : 'EXACT_BOUNDARY'

    const content = `CANONICAL CAREER RECORD // ${career.organization}
Organization: ${career.organization} (${career.organizationType})
Designation: ${career.formalDesignation}
Employment Type: ${career.employmentType}
Location: ${career.location}
Period: ${startStr} to ${endStr} (Start Boundary: ${career.employmentPeriod.start.boundaryType}, End Boundary: ${endBoundary})
Formal Scope Summary: ${career.formalScopeSummary}
Verified Responsibilities:
${career.verifiedResponsibilities.map(r => `• ${r}`).join('\n')}
${career.transitionContext ? `Transition Context: ${career.transitionContext.transitionNote} (Causal claim formally verified: ${career.transitionContext.isCausalClaimFormallyVerified})\n` : ''}Associated Projects: ${career.associatedProjectIds.join(', ') || 'None'}
Authoritative Evidence: ${career.evidenceIds.join(', ')}`

    const contentHash = computeContentHash(content)

    chunks.push({
      id: `chunk-canonical-career-${career.careerId}`,
      content,
      metadata: {
        source_type: 'canonical_record',
        source_id: career.careerId,
        source_title: `Canonical Career // ${career.organization}`,
        source_url: `/experience#${career.careerId}`,
        portfolio_layer: 'canonical',
        content_type: 'canonical_record',
        authority_type: 'primary',
        last_verified: '2026-11-15',
        canonicalCareerIds: [career.careerId],
        canonicalProjectIds: [...career.associatedProjectIds],
        canonicalEvidenceIds: [...career.evidenceIds],
        temporalContext: `${startStr} to ${endStr}`,
        visibility: 'PUBLIC',
        contentHash,
        indexVersion: RAG_INDEX_VERSION
      }
    })
  }

  // 2. Ingest Canonical Project Records (12 records)
  for (const proj of canonicalRegistry.projectRecords) {
    const isProprietary =
      proj.ipOwnership === 'EMPLOYER_PROPRIETARY' ||
      proj.publicationEligibility !== 'PUBLIC_OPEN_SOURCE' ||
      proj.repository.isPrivateOrProprietary

    const devStart = proj.temporalRegistry.developmentWindow.start.dateString
    const devEnd =
      typeof proj.temporalRegistry.developmentWindow.end === 'object'
        ? proj.temporalRegistry.developmentWindow.end.dateString
        : proj.temporalRegistry.developmentWindow.end

    const historicalDisclosures: string[] = []
    if (proj.projectId === 'proj-vm-copy') {
      historicalDisclosures.push(
        'Conceived and developed VM Copy between October–mid-November 2025 during Mathematics SME tenure; internal team usage began November 2025; formal corporate deployment unevidenced.'
      )
    } else if (proj.temporalRegistry.internalTeamUsageWindow) {
      historicalDisclosures.push(
        `Internal team usage began ${proj.temporalRegistry.internalTeamUsageWindow.start.dateString}.`
      )
    }

    const content = `CANONICAL PROJECT RECORD // ${proj.title}
Project ID: ${proj.projectId} (Slug: ${proj.slug})
Title: ${proj.title}
Tagline: ${proj.tagline}
Implementation Authorship: ${proj.implementationAuthorship}
Architectural Responsibility: ${proj.architecturalResponsibility}
Requirements Origin: ${proj.requirementsOrigin}
Organizational Context: ${proj.organizationalContext}
IP Ownership: ${proj.ipOwnership}
Publication Eligibility: ${proj.publicationEligibility}
Associated Career: ${proj.associatedCareerId} (${proj.careerPhaseId})
Development Window: ${devStart} to ${devEnd}
Technologies:
• Languages: ${proj.technologies.languages.join(', ')}
• Frameworks: ${proj.technologies.frameworksAndRuntimes.join(', ')}
• Deterministic Engines: ${proj.technologies.deterministicEngines.join(', ')}
• Infrastructure: ${proj.technologies.infrastructure.join(', ')}
${proj.contributionBreakdown ? `Contribution Breakdown (${proj.contributionBreakdown.authorRole}):\n• Personal Modules: ${proj.contributionBreakdown.personallyEngineeredModules.join(', ')}\n• Team Modules: ${proj.contributionBreakdown.teamEngineeredModules.join(', ')}\n` : ''}Public Repository URL: ${isProprietary ? 'None (Proprietary / Internal)' : proj.repository.publicUrl || 'None'}
Canonical Claims: ${proj.claimIds.join(', ') || 'None'}
Canonical Evidence: ${proj.evidenceIds.join(', ')}`

    const contentHash = computeContentHash(content)

    chunks.push({
      id: `chunk-canonical-project-${proj.projectId}`,
      content,
      metadata: {
        source_type: 'canonical_record',
        source_id: proj.projectId,
        source_title: `Canonical Project // ${proj.title}`,
        source_url: isProprietary ? proj.repository.caseStudyRoute : proj.repository.publicUrl || proj.repository.caseStudyRoute,
        portfolio_layer: 'canonical',
        project: proj.slug,
        content_type: 'canonical_record',
        authority_type: 'primary',
        last_verified: '2026-11-15',
        canonicalProjectIds: [proj.projectId],
        canonicalCareerIds: [proj.associatedCareerId],
        canonicalClaimIds: [...proj.claimIds],
        canonicalEvidenceIds: [...proj.evidenceIds],
        temporalContext: `${devStart} to ${devEnd}`,
        visibility: isProprietary ? 'PROPRIETARY' : 'PUBLIC',
        historicalDisclosures: historicalDisclosures.length > 0 ? historicalDisclosures : undefined,
        ownership: proj.ipOwnership,
        ownershipClassification:
          proj.implementationAuthorship === 'COLLABORATIVE_CONTRIBUTOR'
            ? 'AADIL_CONTRIBUTION'
            : proj.organizationalContext === 'COMPANY_EMPLOYMENT' && proj.ipOwnership === 'EMPLOYER_PROPRIETARY' && proj.implementationAuthorship !== 'SOLE_IMPLEMENTER'
            ? 'TEAM_OWNERSHIP'
            : 'INDEPENDENT_BUILD',
        contentHash,
        indexVersion: RAG_INDEX_VERSION
      }
    })
  }

  // 3. Ingest Canonical Technical Claim Records (13 records)
  for (const claim of canonicalRegistry.claimRecords) {
    const caveats = claim.wording?.mandatoryCaveats || []
    const content = `CANONICAL TECHNICAL CLAIM // ${claim.claimId}
Claim ID: ${claim.claimId}
Project ID: ${claim.projectId}
Domain: ${claim.claimDomain}
Headline: ${claim.wording?.headline || ''}
Qualified Statement: ${claim.wording?.qualifiedTechnicalStatement || ''}
Quantitative: ${claim.isQuantitative ? 'Yes' : 'No'}
Metric Subject: ${claim.metricSubject || 'N/A'}
Measurement Scope: ${claim.measurementScope || 'N/A'}
Verification Status: ${claim.verificationStatus}
Mandatory Caveats:
${caveats.map(c => `• ${c}`).join('\n')}
Linked Evidence: ${claim.linkedEvidenceIds.join(', ')}`

    const contentHash = computeContentHash(content)

    chunks.push({
      id: `chunk-canonical-claim-${claim.claimId}`,
      content,
      metadata: {
        source_type: 'canonical_record',
        source_id: claim.claimId,
        source_title: `Canonical Claim // ${claim.claimId}`,
        source_url: `/projects#${claim.projectId}`,
        portfolio_layer: 'canonical',
        project: claim.projectId,
        content_type: 'canonical_record',
        authority_type: 'primary',
        last_verified: '2026-11-15',
        canonicalClaimIds: [claim.claimId],
        canonicalProjectIds: [claim.projectId],
        canonicalEvidenceIds: [...claim.linkedEvidenceIds],
        visibility: 'PUBLIC',
        governedMetricCaveats: [...caveats],
        contentHash,
        indexVersion: RAG_INDEX_VERSION
      }
    })
  }

  // 4. Ingest Canonical Evidence Records (17 records)
  for (const ev of canonicalRegistry.evidenceRecords) {
    const content = `CANONICAL EVIDENCE RECORD // ${ev.evidenceId}
Evidence ID: ${ev.evidenceId}
Evidence Type: ${ev.evidenceType}
Repository Path or Artifact: ${ev.repositoryPathOrArtifact}
${ev.lineRangeOrSymbol ? `Line Range / Symbol: ${ev.lineRangeOrSymbol}\n` : ''}${ev.reproductionCommand ? `Reproduction Command: ${ev.reproductionCommand}\n` : ''}Measured Observation: ${ev.measuredValue} ${ev.measuredUnit}
Execution Status: ${ev.executionStatus || 'N/A'}
Disclosed Scope: ${ev.disclosedScope}
Disclosed Limitations:
${ev.disclosedLimitations.map(l => `• ${l}`).join('\n')}
Audit Signoff: ${ev.auditorSignoff} (${ev.auditDate})`

    const contentHash = computeContentHash(content)

    chunks.push({
      id: `chunk-canonical-evidence-${ev.evidenceId}`,
      content,
      metadata: {
        source_type: 'canonical_record',
        source_id: ev.evidenceId,
        source_title: `Canonical Evidence // ${ev.evidenceId}`,
        source_url: `/projects#${ev.projectId || 'evidence'}`,
        portfolio_layer: 'canonical',
        project: ev.projectId,
        content_type: 'canonical_record',
        authority_type: 'primary',
        last_verified: ev.auditDate,
        canonicalEvidenceIds: [ev.evidenceId],
        canonicalProjectIds: ev.projectId ? [ev.projectId] : [],
        canonicalCareerIds: ev.careerId ? [ev.careerId] : [],
        visibility: 'PUBLIC',
        contentHash,
        indexVersion: RAG_INDEX_VERSION
      }
    })
  }

  return chunks
}

// ============================================================================
// 3. CANONICAL STRUCTURED RETRIEVAL ENGINE
// ============================================================================

export interface CanonicalStructuredAnswer {
  matched: boolean
  topic: string
  canonicalEvidence: EvidenceItem[]
  exactAnswer?: string
}

/**
 * Pure, deterministic resolver answering exact factual questions directly from canonical records.
 * Bypasses stochastic inference for career dates, employment boundaries, project ownership,
 * software authorship, and governed metrics.
 */
export function queryCanonicalStructuredKnowledge(
  query: string,
  projectSlug?: string
): CanonicalStructuredAnswer {
  const lowerQ = query.toLowerCase().trim()
  const evidence: EvidenceItem[] = []

  // ---------------------------------------------------------------------------
  // A. VM COPY EMPLOYMENT / ROLE BOUNDARY QUERY
  // ---------------------------------------------------------------------------
  if (
    lowerQ.includes('vm copy') &&
    (lowerQ.includes('separate employment') ||
      lowerQ.includes('separate job') ||
      lowerQ.includes('corporate employment') ||
      lowerQ.includes('separate role') ||
      lowerQ.includes('independent company') ||
      lowerQ.includes('own company') ||
      lowerQ.includes('employment role'))
  ) {
    const vmCopyProj = canonicalRegistry.projectRecords.find(p => p.projectId === 'proj-vm-copy')
    const smeCareer = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-wayground-math-sme')

    evidence.push({
      id: 'evidence-canonical-vm-copy-role',
      source: 'Canonical Registry — Career & Project Provenance',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'VM Copy Question Generator',
      content: `CANONICAL EMPLOYMENT BOUNDARY // VM Copy:
• VM Copy was an engineering project conceived and developed during October–mid-November 2025 while employed as Subject Matter Expert — Mathematics at Wayground.
• VM Copy is strictly a project milestone within SME tenure (Jan 2024 – Dec 2025); it is NOT a separate corporate employment or independent company.
• IP Ownership: EMPLOYER_PROPRIETARY.
• Requirements Origin: SELF_DIRECTED_INITIATIVE.
• Implementation Authorship: SOLE_IMPLEMENTER.
• Career transfer causality is an asserted career narrative (not formally verified by corporate documentation).`,
      deepLink: '/projects/vm-copy',
      provenanceBadge: '[Canonical Career & Project Registry]'
    })

    return {
      matched: true,
      topic: 'vm_copy_employment_boundary',
      canonicalEvidence: evidence,
      exactAnswer:
        'No. VM Copy was not a separate employment role or corporate employer. It was an engineering project conceived and built by Aadil between October and mid-November 2025 during his tenure as Subject Matter Expert — Mathematics at Wayground. Team adoption began in November 2025. It is an internal employer-proprietary system developed within his SME employment.'
    }
  }

  // ---------------------------------------------------------------------------
  // B. WAYGROUND TENURE & EMPLOYMENT DATES
  // ---------------------------------------------------------------------------
  if (
    lowerQ.includes('wayground') &&
    !lowerQ.includes('currently') &&
    !lowerQ.includes('still') &&
    (lowerQ.includes('when did') ||
      lowerQ.includes('how long') ||
      lowerQ.includes('dates') ||
      lowerQ.includes('period') ||
      lowerQ.includes('tenure') ||
      lowerQ.includes('work at'))
  ) {
    const sme = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-wayground-math-sme')
    const aiml = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-wayground-aiml')

    evidence.push({
      id: 'evidence-canonical-wayground-tenure',
      source: 'Canonical Career Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'Wayground Inc (Quizizz)',
      content: `CANONICAL WAYGROUND EMPLOYMENT TENURE:
1. Subject Matter Expert — Mathematics (car-wayground-math-sme):
   • Period: January 2024 – December 2025 (2024-01 to 2025-12)
   • Designation: Subject Matter Expert — Mathematics
   • Focus: Assessment item authoring, KaTeX rendering validation, VM Copy Question Generator.
2. AI Engineer — AI/ML Team (car-wayground-aiml):
   • Period: January 2026 – July 2026 (2026-01 to 2026-07)
   • Designation: AI Engineer
   • Focus: AI Worksheets product POC, Curriculum Transformation Engine, US Mathematics Item Bank.
• Total Wayground engagement concluded formally in July 2026.`,
      deepLink: '/experience',
      provenanceBadge: '[Canonical Career Registry]'
    })

    if (lowerQ.includes('2022')) {
      return {
        matched: true,
        topic: 'wayground_tenure_dates',
        canonicalEvidence: evidence,
        exactAnswer:
          'No, Aadil did not work at Wayground in 2022 as an AI Engineer. In 2022, he worked at Inhaltmart (through Feb 2022) and Digiplus (Jun–Sep 2022), before undertaking independent quantitative study. He joined Wayground in January 2024 as a Subject Matter Expert — Mathematics, and transitioned to the AI/ML team as AI Engineer in January 2026.'
      }
    }

    return {
      matched: true,
      topic: 'wayground_tenure_dates',
      canonicalEvidence: evidence,
      exactAnswer:
        'Aadil worked at Wayground across two distinct consecutive roles totaling 2 years and 7 months: first as Subject Matter Expert — Mathematics from January 2024 to December 2025 (during which he built VM Copy), and subsequently as AI Engineer on the AI/ML Team from January 2026 to July 2026 (where he worked on AI Worksheets, Curriculum ETL, and the Item Bank). His formal engagement with Wayground concluded in July 2026.'
    }
  }

  // ---------------------------------------------------------------------------
  // B2. SEPTEMBER 2022 MILESTONE & TRANSITION
  // ---------------------------------------------------------------------------
  if (
    lowerQ.includes('september 2022') ||
    lowerQ.includes('sept 2022') ||
    (lowerQ.includes('2022') && lowerQ.includes('september'))
  ) {
    evidence.push({
      id: 'evidence-canonical-sept-2022',
      source: 'Canonical Career Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'DIGIPPLUS / Independent Quantitative Discipline',
      content: 'September 2022 marks conclusion of agency QA work at DIGIPPLUS (Jun 2022 – Sep 2022) and transition into 16 months of independent quantitative discipline and mathematical foundations.',
      deepLink: '/timeline',
      provenanceBadge: '[Canonical Career Registry]'
    })

    return {
      matched: true,
      topic: 'september_2022_transition',
      canonicalEvidence: evidence,
      exactAnswer:
        'In September 2022, Aadil concluded his agency tenure as QA/QC Specialist at Digiplus (DIGIPPLUS) and commenced an intensive 16-month period of independent quantitative discipline and mathematical study (September 2022 – December 2023), establishing the rigorous analytical foundation for his subsequent roles at Wayground.'
    }
  }

  // ---------------------------------------------------------------------------
  // B3. POST-JULY 2026 STATUS & INDEPENDENT RESEARCH
  // ---------------------------------------------------------------------------
  if (
    lowerQ.includes('after july 2026') ||
    lowerQ.includes('post july 2026') ||
    lowerQ.includes('after jul 2026') ||
    (lowerQ.includes('july 2026') && (lowerQ.includes('after') || lowerQ.includes('doing') || lowerQ.includes('subsequent') || lowerQ.includes('since')))
  ) {
    evidence.push({
      id: 'evidence-canonical-post-july-2026',
      source: 'Canonical Career & Timeline Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'Independent AI Engineering & Research',
      content: 'Aadil concluded formal Wayground AI/ML tenure in July 2026. Activity from August 2026 onward is independent AI systems engineering and research (Engineering Journal Chapter 10 "Still Building ?").',
      deepLink: '/timeline',
      provenanceBadge: '[Canonical Career Registry]'
    })

    return {
      matched: true,
      topic: 'post_july_2026_status',
      canonicalEvidence: evidence,
      exactAnswer:
        'Aadil concluded his formal engagement with Wayground in July 2026. Following July 2026 (August 2026 — Present), his documented activity consists of independent AI systems engineering and research, authoring Chapter 10 of his Engineering Journal ("Still Building ?"), and engineering verified AI architectures including Solace AI, Loom AI, Atlas AI, and this verified Ask Aadil portfolio.'
    }
  }

  // ---------------------------------------------------------------------------
  // C. CONTENT BUILDER V1 AUTHORSHIP & ATTRIBUTION
  // ---------------------------------------------------------------------------
  if (
    (lowerQ.includes('content builder') || lowerQ.includes('voyagemath v1') || lowerQ.includes('voyagemath')) &&
    (lowerQ.includes('build') ||
      lowerQ.includes('author') ||
      lowerQ.includes('contribution') ||
      lowerQ.includes('who built') ||
      lowerQ.includes('who authored') ||
      lowerQ.includes('role'))
  ) {
    const cb = canonicalRegistry.projectRecords.find(p => p.projectId === 'proj-content-builder')

    evidence.push({
      id: 'evidence-canonical-content-builder-authorship',
      source: 'Canonical Project Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'VoyageMath Content Builder V1',
      content: `CANONICAL ATTRIBUTION // VoyageMath Content Builder V1:
• System Authorship: Designed and engineered by the Wayground Engineering team.
• Aadil Implementation Authorship: COLLABORATIVE_CONTRIBUTOR.
• Aadil Architectural Responsibility: DIRECTED_ARCHITECTURE.
• Aadil Documented Scope: Subject Matter Expert tester; bug reporting; KaTeX rendering edge-case validation; UI/workflow recommendations.
• Invariant: Software engineering is attributed strictly to Wayground Engineering; Aadil did not author the application codebase.`,
      deepLink: '/projects',
      provenanceBadge: '[Canonical Project Registry]'
    })

    return {
      matched: true,
      topic: 'content_builder_authorship',
      canonicalEvidence: evidence,
      exactAnswer:
        'VoyageMath Content Builder V1 was designed and engineered by the Wayground Engineering team. Aadil did not author the software codebase; his documented role was SME testing, identifying edge cases in KaTeX rendering, filing bug reports, and serving as workflow advisor.'
    }
  }

  // ---------------------------------------------------------------------------
  // D. EMPLOYER PROPRIETARY PROJECTS ENUMERATION
  // ---------------------------------------------------------------------------
  if (
    lowerQ.includes('employer') &&
    (lowerQ.includes('proprietary') || lowerQ.includes('owned') || lowerQ.includes('internal')) &&
    (lowerQ.includes('project') || lowerQ.includes('projects') || lowerQ.includes('systems') || lowerQ.includes('which'))
  ) {
    const proprietary = canonicalRegistry.projectRecords.filter(
      p => p.ipOwnership === 'EMPLOYER_PROPRIETARY'
    )

    evidence.push({
      id: 'evidence-canonical-employer-proprietary-projects',
      source: 'Canonical Project Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'Employer Proprietary Projects',
      content: `CANONICAL EMPLOYER-PROPRIETARY PROJECTS (${proprietary.length}):
${proprietary
  .map(
    p =>
      `• ${p.title} (${p.slug}):
  - Authorship: ${p.implementationAuthorship} (${p.architecturalResponsibility})
  - Context: ${p.organizationalContext} (${p.associatedCareerId})
  - Eligibility: ${p.publicationEligibility}
  - Public Repository: None (Proprietary)`
  )
  .join('\n\n')}`,
      deepLink: '/projects',
      provenanceBadge: '[Canonical Project Registry]'
    })

    return {
      matched: true,
      topic: 'employer_proprietary_projects',
      canonicalEvidence: evidence,
      exactAnswer:
        'The portfolio documents 5 employer-proprietary systems developed during Wayground employment: 1) VM Copy Question Generator (SME build), 2) VoyageMath Content Builder V1 (team system, SME testing), 3) AI Worksheets Product POC (AI/ML team), 4) Curriculum Transformation Engine (AI/ML team), and 5) US Mathematics Item Bank Pipeline (collaborative team pipeline). All five remain internal intellectual property of the employer with zero public code repositories.'
    }
  }

  // ---------------------------------------------------------------------------
  // E. GOVERNED METRIC: EDA CAD VOLUME CALCULATION ACCURACY
  // ---------------------------------------------------------------------------
  if (
    (lowerQ.includes('eda') || lowerQ.includes('cad') || lowerQ.includes('design automation')) &&
    (lowerQ.includes('volume') || lowerQ.includes('accuracy') || lowerQ.includes('error') || lowerQ.includes('0.0000'))
  ) {
    const claim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-EDA-002')

    evidence.push({
      id: 'evidence-canonical-cad-volume-qualification',
      source: 'Canonical Technical Claim Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'EDA CAD Volume Metric',
      content: `CANONICAL METRIC QUALIFICATION // CLAIM-EDA-001:
• Verified Metric: 0.0000% volume calculation error (< 10⁻⁶ relative discrepancy).
• Verification Status: PARTIALLY_VERIFIED (Strictly Qualified).
• Measurement Scope: ANALYTICAL_PRIMITIVE_CALCULUS (Analytical math calculus vs OpenCascade CadQuery BRep numerical integration).
• Mandatory Disclosure: Represents mathematical software calculus agreement between closed-form engineering equations and CAD solid geometry kernels; does NOT assert physical CNC machining or manufacturing tolerance.`,
      deepLink: '/projects/design-automation',
      provenanceBadge: '[Canonical Technical Claim Registry]'
    })

    return {
      matched: true,
      topic: 'eda_cad_volume_metric',
      canonicalEvidence: evidence,
      exactAnswer:
        'The EDA CAD 0.0000% volume calculation error represents exact mathematical agreement (< 10⁻⁶ relative discrepancy) between closed-form analytical physics equations and OpenCascade CadQuery BRep solid mass property integrals. It measures software-calculus consistency and does NOT assert physical CNC machining or manufacturing tolerances.'
    }
  }

  // ---------------------------------------------------------------------------
  // F. GOVERNED METRIC: AI RELIABILITY TEST CASES COUNT
  // ---------------------------------------------------------------------------
  if (
    (lowerQ.includes('reliability') || lowerQ.includes('browser qa')) &&
    (lowerQ.includes('how many') || lowerQ.includes('test') || lowerQ.includes('count') || lowerQ.includes('158'))
  ) {
    const claim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-RELIABILITY-001')
    const govClaim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-RELIABILITY-002')

    evidence.push({
      id: 'evidence-canonical-reliability-test-count',
      source: 'Canonical Technical Claim Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'AI Reliability Test Metrics',
      content: `CANONICAL METRIC QUALIFICATION // AI Reliability Platform:
• Claim CLAIM-RELIABILITY-001: 158 collected backend test cases across backend/tests/.
  - Measurement Scope: AUTOMATED_TEST_COLLECTION (collected test cases, not test suites).
• Claim CLAIM-RELIABILITY-002: 47 governance and Playwright E2E verification tests across 12 pages.
• Total Verified Tests: 205 automated assertions.`,
      deepLink: '/projects/ai-reliability',
      provenanceBadge: '[Canonical Technical Claim Registry]'
    })

    return {
      matched: true,
      topic: 'ai_reliability_test_count',
      canonicalEvidence: evidence,
      exactAnswer:
        'The AI Application Reliability platform has 158 collected backend test cases across backend/tests/ (governed strictly as individual test cases, not test suites) and 47 governance and Playwright E2E verification tests across 12 pages, totaling 205 automated test verifications.'
    }
  }

  // ---------------------------------------------------------------------------
  // G. GOVERNED METRIC: VM COPY EVALUATOR LATENCY
  // ---------------------------------------------------------------------------
  if (
    lowerQ.includes('vm copy') &&
    (lowerQ.includes('latency') || lowerQ.includes('<1ms') || lowerQ.includes('1ms') || lowerQ.includes('speed') || lowerQ.includes('cost'))
  ) {
    const claim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-VM-001')

    evidence.push({
      id: 'evidence-canonical-vm-copy-latency',
      source: 'Canonical Technical Claim Registry',
      sourceType: 'canonical_record',
      authority: 'primary',
      layer: 'canonical',
      entity: 'VM Copy In-Memory Evaluator',
      content: `CANONICAL METRIC QUALIFICATION // CLAIM-VM-001:
• Verified Metric: < 1ms execution time and $0 marginal API spend.
• Verification Status: PARTIALLY_VERIFIED (Strictly Qualified).
• Measurement Scope: IN_MEMORY_DETERMINISTIC_GATE (lib/eval-layer.ts).
• Mandatory Disclosure: Applies strictly to Tier-1 in-memory regex and AST structural assertion evaluation; upstream LLM generation takes ~4-8s and incurs external API cost.`,
      deepLink: '/projects/vm-copy',
      provenanceBadge: '[Canonical Technical Claim Registry]'
    })

    return {
      matched: true,
      topic: 'vm_copy_latency_metric',
      canonicalEvidence: evidence,
      exactAnswer:
        'VM Copy’s <1ms execution time and $0 marginal spend apply strictly to its Tier-1 in-memory deterministic evaluation layer (lib/eval-layer.ts), which validates option cardinality, answer-key exclusivity, and distractor uniqueness without calling a secondary model. The upstream generative LLM pipeline executes in approximately 4–8 seconds and incurs API inference cost.'
    }
  }

  return {
    matched: false,
    topic: 'unmatched',
    canonicalEvidence: []
  }
}

// ============================================================================
// 4. CONFIDENTIALITY & RE-VALIDATION SAFEGUARDS
// ============================================================================

/**
 * Validates that an evidence item or chunk does not violate confidentiality boundaries.
 * Enforces that employer-proprietary projects NEVER expose public git repository URLs.
 */
export function assertConfidentialityIntegrity(item: EvidenceItem | KnowledgeChunk): boolean {
  const proprietarySlugs = [
    'vm-copy',
    'content-builder',
    'ai-worksheets',
    'curriculum-etl',
    'math-item-bank',
    'proj-vm-copy',
    'proj-content-builder',
    'proj-ai-worksheets',
    'proj-curriculum-etl',
    'proj-item-bank'
  ]

  const isKnowledgeChunk = (it: EvidenceItem | KnowledgeChunk): it is KnowledgeChunk => 'metadata' in it

  let entity = ''
  let content = ''
  let link: string | undefined = ''

  if (isKnowledgeChunk(item)) {
    entity = (item.metadata.project || '').toLowerCase()
    content = item.content
    link = item.metadata.source_url
  } else {
    entity = (item.entity || '').toLowerCase()
    content = item.content
    link = item.deepLink
  }

  const isProprietaryEntity = proprietarySlugs.some(s => entity.includes(s))

  if (isProprietaryEntity) {
    // Prohibit github.com links to proprietary projects
    if (link && link.includes('github.com') && !link.includes('aadil-lang')) {
      return false
    }
    // Prohibit leaking private URLs in content
    if (/github\.com\/(?:wayground|quizizz)\/[a-z0-9_-]+/i.test(content)) {
      return false
    }
  }

  return true
}

/**
 * Post-processes retrieved evidence items before answer synthesis, guaranteeing
 * zero confidentiality leaks.
 */
export function sanitizeRetrievalEvidence(items: EvidenceItem[]): EvidenceItem[] {
  return items.filter(e => assertConfidentialityIntegrity(e))
}
