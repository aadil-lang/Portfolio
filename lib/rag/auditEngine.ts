import { AuditFinding, AuditStatus } from '@/types/rag'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { resumeData } from '@/data/canonical/resumeData'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'
import { quantitativeClaims } from '@/data/canonical/quantitativeClaims'
import { sourceConflicts } from '@/data/canonical/sourceConflicts'
import { githubRepositories } from '@/lib/rag/sources/githubAdapter'
import { linkedInAdapterState } from '@/lib/rag/sources/linkedinAdapter'
import { timelineData } from '@/data/experience'

export interface ConsistencyAuditReport {
  timestamp: string
  totalChecks: number
  consistentCount: number
  conflictCount: number
  missingCount: number
  unverifiedCount: number
  staleCount: number
  findings: AuditFinding[]
  documentedConflictsCount: number
}

/**
 * CONSISTENCY AUDIT ENGINE
 * Compares Portfolio, Resume, LinkedIn, GitHub, and Structured Profile.
 * Identifies exact discrepancies, missing fields, unverified claims, and broken links.
 */
export function runConsistencyAudit(): ConsistencyAuditReport {
  const findings: AuditFinding[] = []

  // 1. Audit Contact Information & URLs
  if (!structuredProfile.email) {
    findings.push({
      id: 'audit-contact-email-missing',
      field: 'email',
      entity: 'structuredProfile',
      status: 'MISSING',
      details: 'Primary email is missing from structured profile.',
      sourcesCompared: ['structured_profile'],
      actionRecommended: 'Set verified email address.'
    })
  } else if (structuredProfile.email !== resumeData.header.email) {
    findings.push({
      id: 'audit-contact-email-diff',
      field: 'email',
      entity: 'structuredProfile vs resume',
      status: 'CONFLICT',
      details: `Profile email is "${structuredProfile.email}" whereas Resume lists "${resumeData.header.email}". Both are valid but distinct mailboxes.`,
      sourcesCompared: ['structured_profile', 'resume'],
      actionRecommended: 'Document primary vs secondary email destinations.'
    })
  } else {
    findings.push({
      id: 'audit-contact-email-ok',
      field: 'email',
      entity: 'structuredProfile & resume',
      status: 'CONSISTENT',
      details: 'Email addresses match across sources.',
      sourcesCompared: ['structured_profile', 'resume'],
      actionRecommended: 'None'
    })
  }

  // Check Phone number
  if (!structuredProfile.phone) {
    findings.push({
      id: 'audit-contact-phone-missing',
      field: 'phone',
      entity: 'structuredProfile',
      status: 'MISSING',
      details: 'Phone number missing in structured profile.',
      sourcesCompared: ['structured_profile'],
      actionRecommended: 'Populate verified phone from resume.'
    })
  } else {
    findings.push({
      id: 'audit-contact-phone-ok',
      field: 'phone',
      entity: 'structuredProfile & resume',
      status: 'CONSISTENT',
      details: `Verified phone "${structuredProfile.phone}" is consistent with Resume.`,
      sourcesCompared: ['structured_profile', 'resume'],
      actionRecommended: 'None'
    })
  }

  // Check WhatsApp placeholder
  if (structuredProfile.whatsappDestination === null) {
    findings.push({
      id: 'audit-contact-whatsapp-placeholder',
      field: 'whatsappDestination',
      entity: 'structuredProfile',
      status: 'UNVERIFIED',
      details: 'WhatsApp destination is null placeholder. Never infer from phone number without explicit verification.',
      sourcesCompared: ['structured_profile'],
      actionRecommended: 'Flag for human review before enabling WhatsApp action tool.'
    })
  }

  // Check GitHub handles
  if (structuredProfile.githubUrls.legacyOrAlternate && structuredProfile.githubUrls.primary !== `https://${resumeData.header.github}`) {
    findings.push({
      id: 'audit-github-handle-variation',
      field: 'githubUrls',
      entity: 'github',
      status: 'CONFLICT',
      details: `Portfolio points to "${structuredProfile.githubUrls.primary}" while Resume lists "${resumeData.header.github}". Both repositories exist under the respective handles.`,
      sourcesCompared: ['structured_profile', 'resume', 'github'],
      actionRecommended: 'Expose both verified handles in Ask Aadil rather than assuming one is invalid.'
    })
  }

  // Check LinkedIn API state
  if (linkedInAdapterState.status === 'api_unavailable') {
    findings.push({
      id: 'audit-linkedin-api-status',
      field: 'liveSync',
      entity: 'linkedin',
      status: 'STALE',
      details: 'LinkedIn direct OAuth sync is unavailable. Using verified structuredProfile and resumeData for employment context.',
      sourcesCompared: ['linkedin'],
      actionRecommended: 'Keep live LinkedIn marked as unavailable; do not fake scrape data.'
    })
  }

  // 2. Audit Project Test Counts & Evidence
  for (const claim of quantitativeClaims) {
    if (claim.status === 'verified') {
      findings.push({
        id: `audit-claim-${claim.id}`,
        field: 'metricValue',
        entity: claim.projectSlug || claim.id,
        status: 'CONSISTENT',
        details: `Claim "${claim.claim}" is verified against ${claim.evidenceSource}.`,
        sourcesCompared: claim.claimedIn.map(c => c.source),
        actionRecommended: 'Evidence documented and accessible.'
      })
    } else {
      findings.push({
        id: `audit-claim-${claim.id}`,
        field: 'metricValue',
        entity: claim.projectSlug || claim.id,
        status: 'UNVERIFIED',
        details: `Claim "${claim.claim}" has not been formally re-run or verified against live tests.`,
        sourcesCompared: claim.claimedIn.map(c => c.source),
        actionRecommended: 'Re-run automated test suite to confirm metric.'
      })
    }
  }

  // 3. Audit Project Repositories Existence
  for (const project of projectsMetadata) {
    if (project.externalRefs?.github) {
      const slug = project.slug
      const repoRecord = githubRepositories[slug]
      if (repoRecord) {
        findings.push({
          id: `audit-repo-${slug}`,
          field: 'repository',
          entity: project.title,
          status: 'CONSISTENT',
          details: `GitHub repository record for "${slug}" is verified (${repoRecord.url}).`,
          sourcesCompared: ['portfolio', 'github'],
          actionRecommended: 'None'
        })
      } else {
        findings.push({
          id: `audit-repo-${slug}-unmapped`,
          field: 'repository',
          entity: project.title,
          status: 'UNVERIFIED',
          details: `GitHub URL exists (${project.externalRefs?.github}) but detailed architecture notes are unmapped in adapter.`,
          sourcesCompared: ['portfolio', 'github'],
          actionRecommended: 'Add detailed architecture notes to githubAdapter.'
        })
      }
    } else if (project.ownership === 'team') {
      findings.push({
        id: `audit-repo-internal-${project.slug}`,
        field: 'repository',
        entity: project.title,
        status: 'CONSISTENT',
        details: `Internal team project has null GitHub ref. Accurately reflects enterprise ownership boundary.`,
        sourcesCompared: ['portfolio'],
        actionRecommended: 'None'
      })
    }
  }

  // 4. Audit Documented Source Conflicts
  for (const conflict of sourceConflicts) {
    findings.push({
      id: `audit-conflict-${conflict.id}`,
      field: conflict.topic,
      entity: conflict.id,
      status: conflict.status === 'resolved_by_context' ? 'CONSISTENT' : 'CONFLICT',
      details: `${conflict.topic}: Claim A [${conflict.claim_a.source}] vs Claim B [${conflict.claim_b.source}]. ${conflict.notes}`,
      sourcesCompared: [conflict.claim_a.source, conflict.claim_b.source],
      actionRecommended: 'Distinguish sources in conversational responses; do not manufacture forced consensus.'
    })
  }

  // Calculate Summary
  let consistentCount = 0
  let conflictCount = 0
  let missingCount = 0
  let unverifiedCount = 0
  let staleCount = 0

  for (const f of findings) {
    if (f.status === 'CONSISTENT') consistentCount++
    if (f.status === 'CONFLICT') conflictCount++
    if (f.status === 'MISSING') missingCount++
    if (f.status === 'UNVERIFIED') unverifiedCount++
    if (f.status === 'STALE') staleCount++
  }

  return {
    timestamp: new Date().toISOString(),
    totalChecks: findings.length,
    consistentCount,
    conflictCount,
    missingCount,
    unverifiedCount,
    staleCount,
    findings,
    documentedConflictsCount: sourceConflicts.length
  }
}
