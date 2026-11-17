import {
  StructuredResume,
  ResumeExperienceEntry,
  ResumeProjectEntry,
  getCanonicalStructuredResume
} from '../adapters/resumeAdapter'

export type { StructuredResume, ResumeExperienceEntry, ResumeProjectEntry }

/**
 * CANONICAL STRUCTURED RESUME (MIGRATED PROJECTION)
 * Projected strictly from canonical career and project records via resumeAdapter.
 * Preserves all public contracts, structural groupings, and recruiter compatibility.
 */
export const resumeData: StructuredResume = getCanonicalStructuredResume()
