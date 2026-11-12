import { KnowledgeChunk, SourceChunkMetadata, QuantitativeClaimItem } from '@/types/rag'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { resumeData } from '@/data/canonical/resumeData'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'
import { quantitativeClaims } from '@/data/canonical/quantitativeClaims'
import { journalChapters, JournalChapterRecord } from '@/data/canonical/journalChapters'
import { timelineData } from '@/data/experience'
import { prologue, epilogue } from '@/data/chapters'
import { projects as systemsCatalog } from '@/data/projects'
import { githubRepositories } from '@/lib/rag/sources/githubAdapter'

/**
 * SOURCE-AWARE KNOWLEDGE INDEX
 * Indexes chunks across all distinct sources and portfolio layers:
 * 1. Structured Profile
 * 2. Resume Record
 * 3. Timeline Spine
 * 4. 19 Engineering Journal Chapters (+ Prologue & Epilogue)
 * 5. Systems Archive Specifications
 * 6. CodeEvidence Records (first-class implementations & source files)
 * 7. Canonical Quantitative Claims
 * 8. GitHub Repositories
 */
let cachedIndex: KnowledgeChunk[] | null = null

export function invalidateKnowledgeIndex(): void {
  cachedIndex = null
}

export function buildKnowledgeIndex(): KnowledgeChunk[] {
  if (cachedIndex) return cachedIndex

  const chunks: KnowledgeChunk[] = []

  // 1. Index Structured Profile (Authority: Contact & Core Profile)
  chunks.push({
    id: 'chunk-profile-core',
    content: `Name: ${structuredProfile.name}
Role: ${structuredProfile.portfolioPositioning}
Email: ${structuredProfile.email}
Secondary Email: ${structuredProfile.secondaryEmail}
Phone: ${structuredProfile.phone}
Location: ${structuredProfile.location}
LinkedIn: ${structuredProfile.linkedinUrl}
GitHub: ${structuredProfile.githubUrls.primary} (Alternate: ${structuredProfile.githubUrls.legacyOrAlternate})
Portfolio: ${structuredProfile.portfolioUrl}
Open to Work: ${structuredProfile.openToWork ? 'Yes (Remote Globally)' : 'No'}
Languages: ${structuredProfile.languages.join(', ')}
Education: ${structuredProfile.education.map(e => `${e.degree} from ${e.institution} (${e.year})`).join('; ')}`,
    metadata: {
      source_type: 'structured_profile',
      source_id: 'profile-core',
      source_title: 'Authoritative Profile Configuration',
      source_url: '/',
      portfolio_layer: 'none',
      content_type: 'profile',
      authority_type: 'primary',
      last_verified: structuredProfile.lastVerified
    }
  })

  // 2. Index Resume (Authority: Formal Employment & Education)
  chunks.push({
    id: 'chunk-resume-summary',
    content: `RESUME SUMMARY:
${resumeData.summary}
Header Title: ${resumeData.header.title}
Location: ${resumeData.header.location}
Phone: ${resumeData.header.phone}
Email: ${resumeData.header.email}
GitHub: ${resumeData.header.github}`,
    metadata: {
      source_type: 'resume',
      source_id: 'resume-summary',
      source_title: 'Resume Professional Summary',
      source_url: '/resume.pdf',
      portfolio_layer: 'resume',
      content_type: 'profile',
      authority_type: 'primary',
      last_verified: resumeData.lastVerified
    }
  })

  // Resume Experience
  for (const exp of resumeData.experience) {
    chunks.push({
      id: `chunk-resume-exp-${exp.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${exp.start}`,
      content: `EMPLOYMENT EXPERIENCE (RESUME):
Company: ${exp.company}
Location: ${exp.location}
Role: ${exp.role}
Period: ${exp.period} (${exp.start} to ${exp.end})
${exp.projects ? `Documented Projects: ${exp.projects.join(', ')}\n` : ''}
Key Responsibilities & Achievements:
${exp.achievements.map(a => `• ${a}`).join('\n')}`,
      metadata: {
        source_type: 'resume',
        source_id: `resume-exp-${exp.start}`,
        source_title: `${exp.company} — ${exp.role} (${exp.period})`,
        source_url: '/resume.pdf',
        portfolio_layer: 'resume',
        date: exp.period,
        content_type: 'experience',
        authority_type: 'primary',
        last_verified: resumeData.lastVerified
      }
    })
  }

  // Resume Personal Projects
  for (const proj of resumeData.personalProjects) {
    chunks.push({
      id: `chunk-resume-proj-${proj.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      content: `RESUME PROJECT: ${proj.title}
Category: ${proj.category}
Technologies: ${proj.technologies.join(', ')}
${proj.testCountClaim ? `Claimed Tests: ${proj.testCountClaim}\n` : ''}
Claims & Scope:
${proj.claims.map(c => `• ${c}`).join('\n')}`,
      metadata: {
        source_type: 'resume',
        source_id: `resume-proj-${proj.title.slice(0, 15)}`,
        source_title: `Resume Project // ${proj.title}`,
        source_url: '/resume.pdf',
        portfolio_layer: 'resume',
        technologies: proj.technologies,
        content_type: 'spec',
        authority_type: 'secondary',
        last_verified: resumeData.lastVerified
      }
    })
  }

  // 3. Index Timeline (Authority: Chronology & Scope of Curiosity)
  for (const item of timelineData) {
    chunks.push({
      id: `chunk-timeline-${item.id}`,
      content: `TIMELINE CHRONOLOGY:
Period: ${item.period}
Title: ${item.title}
Organization: ${item.organization || 'Independent'}
Role: ${item.role || 'Independent Exploration'}
Curiosity Stage / Layer: ${item.layerAnnotation}
Summary: ${item.summary}
${item.details ? `Details:\n${item.details.map(d => `• ${d}`).join('\n')}` : ''}
${item.technologies ? `Technologies: ${item.technologies.join(', ')}` : ''}
${item.journalChapterRef ? `Connected Journal Chapter: Ch. 0${item.journalChapterRef}` : ''}
${item.systemSlugRef ? `Connected System: /projects/${item.systemSlugRef}` : ''}`,
      metadata: {
        source_type: 'portfolio',
        source_id: item.id,
        source_title: `Timeline // ${item.period}: ${item.title}`,
        source_url: `/experience#${item.id}`,
        portfolio_layer: 'timeline',
        date: item.period,
        technologies: item.technologies,
        project: item.systemSlugRef,
        content_type: 'experience',
        authority_type: 'primary',
        last_verified: '2026-09-30'
      }
    })
  }

  // 4. Index All 19 Journal Chapters (Authority: Reasoning, Evolution, What Broke, Invariants)
  for (const ch of journalChapters) {
    chunks.push({
      id: `chunk-journal-ch-${ch.number}`,
      content: `ENGINEERING JOURNAL // CHAPTER ${ch.number}: ${ch.title}
Subtitle: ${ch.subtitle}
Journey Stage: ${ch.journeyStage}
Period: ${ch.period}
Organization / Context: ${ch.organization || 'Independent'} (${ch.role || 'Independent'})
${ch.ownershipLabel ? `Ownership: ${ch.ownershipLabel}\n` : ''}
Spread / Page Reference: Spread ${ch.spread} (Page 0${ch.page})

Problem Encountered:
${ch.problem}

Technical Solution & Architecture:
${ch.solution}

Breakthrough / Core Realization:
${ch.breakthrough}

What Became Deterministic:
${ch.whatBecameDeterministic}

Accumulated Capability (What Aadil Learned & Built Next):
${ch.accumulatedCapability}
${ch.technologies ? `\nTechnologies: ${ch.technologies.join(', ')}` : ''}
${ch.connectedSystemSlug ? `Connected System: /projects/${ch.connectedSystemSlug}` : ''}`,
      metadata: {
        source_type: 'portfolio',
        source_id: `journal-ch-${ch.number}`,
        source_title: `Journal // Ch. ${ch.number}: ${ch.title}`,
        source_url: `/journal?spread=${ch.spread}#journal-book`,
        portfolio_layer: 'journal',
        chapter: ch.number,
        project: ch.connectedSystemSlug,
        date: ch.period,
        technologies: ch.technologies,
        content_type: 'narrative',
        authority_type: 'primary',
        last_verified: '2026-09-30',
        ownership: ch.ownershipLabel,
        ownershipClassification: ch.ownershipCategory === 'team' ? 'TEAM_OWNERSHIP' : ch.ownershipCategory === 'independent' ? 'INDEPENDENT_BUILD' : 'SYSTEM_CAPABILITY'
      }
    })
  }

  // 4b. Index Journal Prologue (Authority: Mathematical Foundations & Origins)
  chunks.push({
    id: 'chunk-journal-prologue',
    content: `JOURNAL // ${prologue.title} (${prologue.era})
Summary: ${prologue.summary}
Guiding Conviction: "${prologue.quote}"
Narrative:
${prologue.narrative.join('\n\n')}`,
    metadata: {
      source_type: 'portfolio',
      source_id: 'journal-prologue',
      source_title: `Journal // ${prologue.title}`,
      source_url: '/journal',
      portfolio_layer: 'journal',
      date: prologue.era,
      content_type: 'narrative',
      authority_type: 'primary',
      last_verified: '2026-09-30'
    }
  })

  // 4c. Index Journal Epilogue / Foundations (Authority: 7 Core Engineering Principles)
  chunks.push({
    id: 'chunk-journal-epilogue',
    content: `JOURNAL // ${epilogue.title}
Subtitle: ${epilogue.subtitle}
Core Thesis: ${epilogue.thesis}

THE 7 FOUNDATIONAL PRINCIPLES:
${epilogue.principles.map(p => `• ${p.title}:\n  ${p.description}`).join('\n\n')}

Conclusion:
${epilogue.conclusion}`,
    metadata: {
      source_type: 'portfolio',
      source_id: 'journal-epilogue',
      source_title: `Journal // ${epilogue.title}`,
      source_url: '/journal?spread=18#journal-book',
      portfolio_layer: 'journal',
      content_type: 'narrative',
      authority_type: 'primary',
      last_verified: '2026-09-30'
    }
  })

  // 5. Index Systems Archive (Authority: Deep Technical Evidence & Specs)
  for (const system of systemsCatalog) {
    let ownershipClass: 'SYSTEM_CAPABILITY' | 'AADIL_CONTRIBUTION' | 'TEAM_OWNERSHIP' | 'INDEPENDENT_BUILD' = 'INDEPENDENT_BUILD'
    if (system.ownershipCategory === 'wayground-team') {
      ownershipClass = system.slug === 'math-item-bank' ? 'AADIL_CONTRIBUTION' : 'TEAM_OWNERSHIP'
    } else if (system.ownershipCategory === 'wayground-independent') {
      ownershipClass = 'INDEPENDENT_BUILD'
    }

    chunks.push({
      id: `chunk-system-${system.slug}`,
      content: `SYSTEMS ARCHIVE // ${system.title}
Ownership: ${system.ownershipLabel} (${system.ownershipCategory})
Tagline: ${system.tagline || system.subtitle || ''}
Summary: ${system.summary}
${system.problem ? `Engineering Problem:\n${system.problem}\n` : ''}
${system.solution ? `Technical Solution:\n${system.solution}\n` : ''}
${system.criticalDecision ? `Critical Architectural Decision:\n${system.criticalDecision}\n` : ''}
${system.whatBecameDeterministic ? `What Became Deterministic:\n${system.whatBecameDeterministic}\n` : ''}
${system.whatBroke ? `Failure Modes Handled:\n${system.whatBroke.map(f => `• ${f.failure} -> ${f.response}`).join('\n')}\n` : ''}
${system.evidence ? `Technical Evidence & Verifications:\n${system.evidence.map(e => `• ${e}`).join('\n')}\n` : ''}
Technologies: ${system.technologies ? system.technologies.join(', ') : ''}
GitHub: ${system.github || 'Wayground internal enterprise repository'}`,
      metadata: {
        source_type: 'portfolio',
        source_id: `system-${system.slug}`,
        source_title: `Systems // ${system.title}`,
        source_url: `/projects/${system.slug}`,
        portfolio_layer: 'system',
        project: system.slug,
        technologies: system.technologies,
        content_type: 'spec',
        authority_type: 'primary',
        last_verified: '2026-09-30',
        ownership: system.ownershipLabel,
        ownershipClassification: ownershipClass
      }
    })
  }

  // 6. Index CodeEvidence Records (First-Class Implementation Knowledge)
  for (const system of systemsCatalog) {
    if (system.codeEvidence && system.codeEvidence.length > 0) {
      for (const ce of system.codeEvidence) {
        let ownershipClassification: 'SYSTEM_CAPABILITY' | 'AADIL_CONTRIBUTION' | 'TEAM_OWNERSHIP' | 'INDEPENDENT_BUILD' = 'INDEPENDENT_BUILD'
        if (ce.ownership === 'MY CONTRIBUTION') {
          ownershipClassification = 'AADIL_CONTRIBUTION'
        } else if (ce.ownership === 'TEAM SYSTEM') {
          ownershipClassification = 'TEAM_OWNERSHIP'
        } else if (ce.ownership === 'PROFESSIONAL SYSTEM') {
          ownershipClassification = 'SYSTEM_CAPABILITY'
        }

        chunks.push({
          id: `chunk-code-${ce.id}`,
          content: `CODE EVIDENCE // ${ce.title}
Project: ${system.title} (${system.slug})
Engineering Decision: ${ce.decision}
Ownership: ${ce.ownership}
File Path: ${ce.sourcePath || 'unspecified'}
Line Range: ${ce.lineRange || 'unspecified'}
Language: ${ce.language}
${ce.principle ? `Architectural Principle: ${ce.principle}\n` : ''}
Explanation: ${ce.explanation}
${ce.evidence ? `Verified Invariants:\n${ce.evidence.map(e => `• ${e}`).join('\n')}\n` : ''}
Source Code Snippet:
\`\`\`${ce.language}
${ce.code}
\`\`\`
Repository Link: ${ce.sourceUrl || system.github || 'Internal repository'}`,
          metadata: {
            source_type: 'code_evidence',
            source_id: `code-${ce.id}`,
            source_title: `Code Evidence // ${ce.title} (${ce.sourcePath || 'Source'})`,
            source_url: `/projects/${system.slug}#code-evidence`,
            portfolio_layer: 'system',
            project: system.slug,
            content_type: 'code_evidence',
            authority_type: 'primary',
            last_verified: '2026-09-30',
            sourcePath: ce.sourcePath,
            lineRange: ce.lineRange,
            language: ce.language,
            decision: ce.decision,
            principle: ce.principle,
            ownership: ce.ownership,
            codeSnippet: ce.code,
            ownershipClassification
          }
        })
      }
    }
  }

  // 7. Index Canonical Quantitative Claims (Authority: Numerical Truth)
  for (const qc of quantitativeClaims) {
    chunks.push({
      id: `chunk-metric-${qc.id}`,
      content: `CANONICAL QUANTITATIVE CLAIM // ${qc.claim}
Project: ${qc.projectSlug || 'General Portfolio'}
Verified Metric: ${qc.metricValue} ${qc.unit || ''}
Status: ${qc.status}
Evidence Source: ${qc.evidenceSource || 'Canonical test runner'}
Verification Details: ${qc.verificationDetails}
Documented In: ${qc.claimedIn.map(c => `${c.source} (${c.ref})`).join(', ')}`,
      metadata: {
        source_type: 'quantitative_claim',
        source_id: `metric-${qc.id}`,
        source_title: `Verified Metric // ${qc.claim}`,
        source_url: qc.projectSlug ? `/projects/${qc.projectSlug}` : '/projects',
        portfolio_layer: 'system',
        project: qc.projectSlug,
        content_type: 'quantitative_claim',
        authority_type: 'primary',
        last_verified: '2026-09-30',
        quantitativeData: {
          metricValue: qc.metricValue,
          unit: qc.unit,
          claim: qc.claim,
          evidenceSource: qc.evidenceSource,
          verificationDetails: qc.verificationDetails
        }
      }
    })
  }

  // 8. Index GitHub Repositories (Authority: External Repositories & Test Manifests)
  for (const [slug, repo] of Object.entries(githubRepositories)) {
    chunks.push({
      id: `chunk-github-${slug}`,
      content: `GITHUB REPOSITORY EVIDENCE:
Repository: ${repo.owner}/${repo.repo}
URL: ${repo.url}
Description: ${repo.description}
Primary Language: ${repo.primaryLanguage}
Technologies: ${repo.technologies.join(', ')}
Automated Tests: ${repo.hasTests ? `Yes (${repo.verifiedTestCount} tests using ${repo.testFramework})` : 'None'}
Architecture Notes:
${repo.architectureNotes}
README Excerpt:
${repo.readmeExcerpt}`,
      metadata: {
        source_type: 'github',
        source_id: `github-${slug}`,
        source_title: `GitHub // ${repo.owner}/${repo.repo}`,
        source_url: repo.url,
        portfolio_layer: 'none',
        project: slug,
        technologies: repo.technologies,
        content_type: 'code',
        authority_type: 'primary',
        last_verified: repo.lastVerified
      }
    })
  }

  cachedIndex = chunks
  return chunks
}

/**
 * DIRECT QUANTITATIVE CLAIMS QUERY REGISTRY
 * Allows exact and semantic lookup of verified metrics without relying on LLM memory.
 */
export function queryQuantitativeRegistry(query: string, projectSlug?: string): QuantitativeClaimItem[] {
  const lowerQ = query.toLowerCase()
  const results: QuantitativeClaimItem[] = []

  for (const claim of quantitativeClaims) {
    // Project filter if supplied
    if (projectSlug && claim.projectSlug && claim.projectSlug !== projectSlug) {
      continue
    }

    const claimText = claim.claim.toLowerCase()
    const metricStr = String(claim.metricValue).toLowerCase()
    const unitStr = (claim.unit || '').toLowerCase()
    const evidenceStr = (claim.evidenceSource || '').toLowerCase()
    const detailsStr = claim.verificationDetails.toLowerCase()
    const claimSlug = (claim.projectSlug || '').toLowerCase()

    let match = false

    // 1. Direct number match (e.g. 424, 178, 158, 47, 0.0000)
    if (lowerQ.includes(metricStr)) {
      match = true
    }

    // 2. Project + metric intent (e.g., "how many tests does EDA have")
    const isEdaQuery = (lowerQ.includes('eda') || lowerQ.includes('design automation') || lowerQ.includes('cad'))
    if (isEdaQuery && claimSlug === 'design-automation') {
      if (lowerQ.includes('test') || lowerQ.includes('suite') || lowerQ.includes('volume') || lowerQ.includes('error') || lowerQ.includes('how many')) {
        match = true
      }
    }

    // 3. Atlas tests query
    const isAtlasQuery = (lowerQ.includes('atlas') || lowerQ.includes('financial') || lowerQ.includes('sec'))
    if (isAtlasQuery && claimSlug === 'atlas-ai') {
      if (lowerQ.includes('test') || lowerQ.includes('pytest') || lowerQ.includes('how many')) {
        match = true
      }
    }

    // 4. Reliability tests query
    const isReliabilityQuery = (lowerQ.includes('reliability') || lowerQ.includes('browser qa') || lowerQ.includes('qa harness'))
    if (isReliabilityQuery && claimSlug === 'ai-reliability') {
      if (lowerQ.includes('test') || lowerQ.includes('suite') || lowerQ.includes('governance') || lowerQ.includes('how many')) {
        match = true
      }
    }

    // 5. Solace AI tests query
    const isSolaceQuery = (lowerQ.includes('solace') || lowerQ.includes('wellness companion'))
    if (isSolaceQuery && claimSlug === 'solace-ai') {
      if (lowerQ.includes('test') || lowerQ.includes('suite') || lowerQ.includes('pytest') || lowerQ.includes('mobile') || lowerQ.includes('how many')) {
        match = true
      }
    }

    // 5. Keyword & unit matches
    if (
      (lowerQ.includes('test') && claimText.includes('test')) ||
      (lowerQ.includes('suite') && claimText.includes('suite')) ||
      (lowerQ.includes('volume') && claimText.includes('volume')) ||
      (lowerQ.includes('latency') && claimText.includes('latency')) ||
      (lowerQ.includes('accuracy') && claimText.includes('accuracy')) ||
      (unitStr && lowerQ.includes(unitStr))
    ) {
      if (!projectSlug || claimSlug === projectSlug) {
        match = true
      }
    }

    if (match && !results.some(r => r.id === claim.id)) {
      results.push(claim)
    }
  }

  return results
}

/**
 * DIRECT CODE EVIDENCE QUERY REGISTRY
 * Retrieves real source code snippets, file paths, line ranges, and decisions.
 */
export function queryCodeEvidence(query: string, projectSlug?: string): KnowledgeChunk[] {
  const allChunks = buildKnowledgeIndex()
  const codeChunks = allChunks.filter(c => c.metadata.source_type === 'code_evidence')
  const lowerQ = query.toLowerCase()
  const results: KnowledgeChunk[] = []

  for (const chunk of codeChunks) {
    const meta = chunk.metadata
    if (projectSlug && meta.project && meta.project !== projectSlug) {
      continue
    }

    const contentLower = chunk.content.toLowerCase()
    const pathLower = (meta.sourcePath || '').toLowerCase()
    const decisionLower = (meta.decision || '').toLowerCase()
    const titleLower = meta.source_title.toLowerCase()

    let match = false

    // Direct path or function matches
    if (
      (lowerQ.includes('eval-layer') && pathLower.includes('eval-layer')) ||
      (lowerQ.includes('evaluator') && (contentLower.includes('evaluator') || pathLower.includes('eval-layer'))) ||
      (lowerQ.includes('calculatebatches') && contentLower.includes('calculatebatches')) ||
      (lowerQ.includes('batch') && (contentLower.includes('batch') || pathLower.includes('generate'))) ||
      (lowerQ.includes('opencascade') && contentLower.includes('opencascade')) ||
      (lowerQ.includes('shaft') && contentLower.includes('shaft')) ||
      (lowerQ.includes('alertworker') && contentLower.includes('alertworker')) ||
      (lowerQ.includes('stategraph') && contentLower.includes('stategraph')) ||
      (lowerQ.includes('playwright') && contentLower.includes('playwright')) ||
      (lowerQ.includes('covariance') && contentLower.includes('covariance')) ||
      (lowerQ.includes('crisis') && (contentLower.includes('is_crisis_input') || pathLower.includes('memory_service'))) ||
      (lowerQ.includes('safety_node') && contentLower.includes('safety_node')) ||
      (lowerQ.includes('streamchat') && contentLower.includes('streamchat')) ||
      (lowerQ.includes('502') && contentLower.includes('502')) ||
      (lowerQ.includes('sse') && contentLower.includes('sse'))
    ) {
      match = true
    }

    // General "show me the code" / "file" / "implementation" intent for a project
    if (
      (lowerQ.includes('code') || lowerQ.includes('file') || lowerQ.includes('path') || lowerQ.includes('where is') || lowerQ.includes('implemented') || lowerQ.includes('implementation') || lowerQ.includes('show')) &&
      projectSlug && meta.project === projectSlug
    ) {
      match = true
    }

    if (match && !results.some(r => r.id === chunk.id)) {
      results.push(chunk)
    }
  }

  return results
}
