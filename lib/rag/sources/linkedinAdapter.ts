import { structuredProfile } from '@/data/canonical/structuredProfile'

export interface LinkedInEmploymentRecord {
  title: string
  company: string
  employmentType?: string
  location?: string
  startDate: string
  endDate: string | 'Present'
  description?: string
}

export interface LinkedInAdapterState {
  status: 'adapter_ready' | 'api_unavailable'
  profileUrl: string
  lastSyncAttempt: string
  supportedFields: string[]
  reasonUnavailable?: string
  currentPosition?: LinkedInEmploymentRecord | null
  employmentHistory?: LinkedInEmploymentRecord[]
}

/**
 * LINKEDIN SOURCE ADAPTER
 * Governs professional employment context.
 * 
 * Strict rule: If direct LinkedIn API integration is unavailable, mark the status
 * as 'api_unavailable' and do NOT simulate fake scrape data or fabricate profiles.
 * Fall back safely to structuredProfile.
 */
export const linkedInAdapterState: LinkedInAdapterState = {
  status: 'api_unavailable',
  profileUrl: structuredProfile.linkedinUrl,
  lastSyncAttempt: '2026-09-29',
  supportedFields: [
    'vanity_name',
    'headline',
    'positions',
    'education',
    'skills'
  ],
  reasonUnavailable:
    'Direct LinkedIn OAuth / Member Data API integration is not active in this environment. Authoritative professional employment context is provided by verified structuredProfile and verified resumeData.'
}

let activeAdapterState: LinkedInAdapterState = { ...linkedInAdapterState }

export function getLinkedInStatus(): LinkedInAdapterState {
  return activeAdapterState
}

export function setLinkedInStatus(state: LinkedInAdapterState): void {
  activeAdapterState = state
}

export function resetLinkedInStatus(): void {
  activeAdapterState = { ...linkedInAdapterState }
}
