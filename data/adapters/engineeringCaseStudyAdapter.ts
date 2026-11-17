/**
 * CANONICAL ENGINEERING CASE STUDY ADAPTER
 * Phase 2.5A — Technical Incident Reconstruction, Engineering Decision Records & Canonical Provenance
 *
 * Dedicated projection and resolution adapter connecting the engineering case study
 * collection to the accepted Phase 1 canonical data foundation:
 * - Resolves canonical project, career, claim, and evidence entities.
 * - Resolves cross-links to grounded career journal chapters.
 * - Validates reference integrity (zero dangling IDs).
 * - Enforces confidentiality and publication boundaries.
 */

import { engineeringCaseStudies } from '@/data/canonical/engineeringCaseStudies'
import {
  EngineeringCaseStudy,
  CaseStudyCategory,
  DocumentationCompleteness,
  CaseStudyVisibility
} from '@/types/caseStudy'
import { canonicalRegistry } from '@/data/canonical/canonicalRegistry'
import { journalChapters as canonicalJournalChapters } from '@/data/canonical/journalChapters'
import {
  CanonicalCareerRecord,
  CanonicalProjectRecord,
  CanonicalTechnicalClaimRecord,
  CanonicalEvidenceRecord
} from '@/data/canonical/canonicalSchema'

export interface ResolvedCaseStudy extends EngineeringCaseStudy {
  project?: CanonicalProjectRecord
  careers: CanonicalCareerRecord[]
  claims: CanonicalTechnicalClaimRecord[]
  evidence: CanonicalEvidenceRecord[]
  journalChapters: Array<{ id: string; title: string }>
}

/**
 * Returns all engineering case studies in the collection.
 */
export function getAllCaseStudies(): EngineeringCaseStudy[] {
  return [...engineeringCaseStudies]
}

/**
 * Returns a specific case study by its unique ID.
 */
export function getCaseStudyById(id: string): EngineeringCaseStudy | undefined {
  return engineeringCaseStudies.find(cs => cs.id === id)
}

/**
 * Returns all case studies associated with a specific canonical project ID.
 */
export function getCaseStudiesByProject(projectId: string): EngineeringCaseStudy[] {
  return engineeringCaseStudies.filter(cs => cs.projectId === projectId)
}

/**
 * Returns all case studies associated with a specific canonical career ID.
 */
export function getCaseStudiesByCareer(careerId: string): EngineeringCaseStudy[] {
  return engineeringCaseStudies.filter(cs => cs.careerIds.includes(careerId))
}

/**
 * Returns all case studies associated with a specific journal chapter ID.
 */
export function getCaseStudiesByJournalChapter(chapterId: string): EngineeringCaseStudy[] {
  return engineeringCaseStudies.filter(cs => cs.journalChapterIds.includes(chapterId))
}

/**
 * Returns all case studies filtered by documentation completeness.
 */
export function getCaseStudiesByCompleteness(
  completeness: DocumentationCompleteness
): EngineeringCaseStudy[] {
  return engineeringCaseStudies.filter(cs => cs.documentationCompleteness === completeness)
}

/**
 * Returns all case studies approved for public display.
 */
export function getPublicCaseStudies(): EngineeringCaseStudy[] {
  return engineeringCaseStudies.filter(
    cs => cs.visibility === 'PUBLIC' && cs.publicationStatus === 'PUBLIC_APPROVED'
  )
}

/**
 * Validates canonical reference integrity for a case study.
 * Returns a list of structured validation errors, or empty array if valid.
 */
export function validateCaseStudyCanonicalReferences(caseStudy: EngineeringCaseStudy): string[] {
  const errors: string[] = []

  // 1. Validate Project ID
  if (caseStudy.projectId !== null) {
    const projectExists = canonicalRegistry.projectRecords.some(
      p => p.projectId === caseStudy.projectId
    )
    if (!projectExists) {
      errors.push(
        `Case study "${caseStudy.id}" references non-existent projectId: "${caseStudy.projectId}"`
      )
    }
  }

  // 2. Validate Career IDs
  for (const cid of caseStudy.careerIds) {
    const careerExists = canonicalRegistry.careerRecords.some(c => c.careerId === cid)
    if (!careerExists) {
      errors.push(
        `Case study "${caseStudy.id}" references non-existent careerId: "${cid}"`
      )
    }
  }

  // 3. Validate Journal Chapter IDs
  for (const jid of caseStudy.journalChapterIds) {
    const chapterExists = canonicalJournalChapters.some(j => j.id === jid)
    if (!chapterExists) {
      errors.push(
        `Case study "${caseStudy.id}" references non-existent journalChapterId: "${jid}"`
      )
    }
  }

  // 4. Validate Claim IDs
  for (const clid of caseStudy.claimIds) {
    const claimExists = canonicalRegistry.claimRecords.some(c => c.claimId === clid)
    if (!claimExists) {
      errors.push(
        `Case study "${caseStudy.id}" references non-existent claimId: "${clid}"`
      )
    }
  }

  // 5. Validate Evidence IDs
  for (const eid of caseStudy.evidenceIds) {
    const evidenceExists = canonicalRegistry.evidenceRecords.some(e => e.evidenceId === eid)
    if (!evidenceExists) {
      errors.push(
        `Case study "${caseStudy.id}" references non-existent evidenceId: "${eid}"`
      )
    }
  }

  // 6. Validate Confidentiality Boundaries
  if (caseStudy.projectId) {
    const proj = canonicalRegistry.projectRecords.find(p => p.projectId === caseStudy.projectId)
    if (proj && proj.ipOwnership === 'EMPLOYER_PROPRIETARY') {
      if (caseStudy.publicationStatus === 'PUBLIC_APPROVED' && caseStudy.visibility === 'PUBLIC') {
        errors.push(
          `Case study "${caseStudy.id}" for proprietary project "${caseStudy.projectId}" cannot be PUBLIC without proprietary restrictions.`
        )
      }
      // Prohibit leaking private URLs
      const fullText = JSON.stringify(caseStudy).toLowerCase()
      if (fullText.includes('github.com/wayground') || fullText.includes('github.com/quizizz')) {
        errors.push(
          `Case study "${caseStudy.id}" leaks private corporate repository URL.`
        )
      }
    }
  }

  return errors
}

/**
 * Validates the entire case study collection and returns an audit summary.
 */
export function validateAllCaseStudies(): { valid: boolean; errors: string[] } {
  const allErrors: string[] = []

  const seenIds = new Set<string>()
  for (const cs of engineeringCaseStudies) {
    // Check ID uniqueness
    if (seenIds.has(cs.id)) {
      allErrors.push(`Duplicate case study ID detected: "${cs.id}"`)
    }
    seenIds.add(cs.id)

    // Check canonical references
    const errors = validateCaseStudyCanonicalReferences(cs)
    allErrors.push(...errors)
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors
  }
}

/**
 * Returns a case study fully resolved with its canonical entities.
 */
export function getResolvedCaseStudy(id: string): ResolvedCaseStudy | undefined {
  const cs = getCaseStudyById(id)
  if (!cs) return undefined

  const project = cs.projectId
    ? canonicalRegistry.projectRecords.find(p => p.projectId === cs.projectId)
    : undefined

  const careers = canonicalRegistry.careerRecords.filter(c => cs.careerIds.includes(c.careerId))
  const claims = canonicalRegistry.claimRecords.filter(c => cs.claimIds.includes(c.claimId))
  const evidence = canonicalRegistry.evidenceRecords.filter(e => cs.evidenceIds.includes(e.evidenceId))
  const journalChapters = canonicalJournalChapters
    .filter(j => cs.journalChapterIds.includes(j.id))
    .map(j => ({ id: j.id, title: j.title }))

  return {
    ...cs,
    project,
    careers,
    claims,
    evidence,
    journalChapters
  }
}
