import { Project } from '../types'
import { getCanonicalProjects } from './adapters/projectsAdapter'

/**
 * CANONICAL SYSTEMS CATALOG / PROJECTS (MIGRATED PROJECTION)
 * Projected strictly from the canonical registry through projectsAdapter.
 * Central governance guarantees:
 * - github === null for all employer-proprietary projects
 * - codeEvidence.sourceUrl === undefined for all employer-proprietary projects
 * - Canonical dates, ownership labels, and status notices enforced
 */
export const projects: Project[] = getCanonicalProjects()
export type { Project }
