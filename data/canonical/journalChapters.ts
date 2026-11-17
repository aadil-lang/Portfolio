/**
 * CANONICAL JOURNAL CHAPTERS (MIGRATED PROJECTION)
 *
 * Phase 2.4 Grounded Projection Module.
 * Authoritative single source of truth: canonicalRegistry + journalAdapter.
 *
 * Enforces:
 * - All 23 historical journal chapters preserved with full narrative text.
 * - Formal canonical grounding linking chapters to career records, project records,
 *   technical claims, and evidence artifacts.
 * - Publication safeguards prohibiting proprietary code repository leakage.
 * - Governed metric qualifications and historical disclosures.
 */

import {
  getGroundedJournalChapters,
  JournalChapterRecord,
  GroundedJournalChapter,
  JournalGroundingMetadata,
  JournalOwnershipClassification,
  GroundingStatus
} from '../adapters/journalAdapter'

export type {
  JournalChapterRecord,
  GroundedJournalChapter,
  JournalGroundingMetadata,
  JournalOwnershipClassification,
  GroundingStatus
}

/**
 * Authoritative projected journal chapters with canonical grounding.
 * Retains all legacy fields (number, title, problem, solution, etc.) for 100% backward compatibility
 * while providing canonicalCareerIds, canonicalProjectIds, canonicalClaimIds, canonicalEvidenceIds,
 * and grounding metadata.
 */
export const journalChapters: GroundedJournalChapter[] = getGroundedJournalChapters()
