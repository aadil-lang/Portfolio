import { ProjectMetadata } from '@/types/rag'
import { getCanonicalProjectsMetadata } from '../adapters/projectsAdapter'

/**
 * CANONICAL PROJECT METADATA REGISTRY (MIGRATED PROJECTION)
 * Reconciled against canonical registry through projectsAdapter.
 * Eliminates legacy errata (dates, ownership, github URLs) and unsupported records (binance-bot).
 */
export const projectsMetadata: ProjectMetadata[] = getCanonicalProjectsMetadata()
export type { ProjectMetadata }
