import { structuredProfile } from '@/data/canonical/structuredProfile'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'

export type ActionType = 'navigate' | 'external' | 'focus' | 'contact_form'

export interface ApprovedAction {
  name: string
  type: ActionType
  target: string
  label: string
  focusId?: string
  requiresConfirmation: boolean
  description: string
}

/**
 * DETERMINISTIC ACTION REGISTRY
 * Maps recruiter intents and entity targets exclusively to verified canonical portfolio routes
 * or approved external profile links. The LLM cannot inject arbitrary URLs or unapproved actions.
 */
export const ACTION_REGISTRY: Record<string, ApprovedAction> = {
  OPEN_TIMELINE: {
    name: 'OPEN_TIMELINE',
    type: 'navigate',
    target: '/timeline',
    label: 'Career Timeline',
    requiresConfirmation: false,
    description: 'Navigate to Aadil\'s interactive career timeline.'
  },
  OPEN_JOURNAL: {
    name: 'OPEN_JOURNAL',
    type: 'navigate',
    target: '/journal',
    label: 'Engineering Journal',
    requiresConfirmation: false,
    description: 'Navigate to Aadil\'s 10-chapter Engineering Journal.'
  },
  OPEN_SYSTEM_ARCHIVE: {
    name: 'OPEN_SYSTEM_ARCHIVE',
    type: 'navigate',
    target: '/systems',
    label: 'Systems Archive',
    requiresConfirmation: false,
    description: 'Navigate to the full AI Systems Archive.'
  },
  OPEN_CONTACT: {
    name: 'OPEN_CONTACT',
    type: 'navigate',
    target: '/contact',
    label: 'Contact Aadil',
    focusId: 'contact-form',
    requiresConfirmation: false,
    description: 'Navigate to the recruiter-facing contact page.'
  },
  SCROLL_TO_CONTACT_FORM: {
    name: 'SCROLL_TO_CONTACT_FORM',
    type: 'focus',
    target: '/contact#contact-form',
    label: 'Focus Contact Form',
    focusId: 'contact-form',
    requiresConfirmation: false,
    description: 'Focus the contact form inputs on the contact page.'
  },
  OPEN_RESUME: {
    name: 'OPEN_RESUME',
    type: 'external',
    target: '/resume.pdf',
    label: 'Aadil\'s Resume',
    requiresConfirmation: false,
    description: 'Open Aadil\'s official verified resume PDF.'
  },
  OPEN_LINKEDIN: {
    name: 'OPEN_LINKEDIN',
    type: 'external',
    target: structuredProfile.linkedinUrl,
    label: 'LinkedIn Profile',
    requiresConfirmation: false,
    description: 'Open Aadil\'s official LinkedIn profile.'
  },
  OPEN_GITHUB: {
    name: 'OPEN_GITHUB',
    type: 'external',
    target: structuredProfile.githubUrls.primary,
    label: 'GitHub Profile',
    requiresConfirmation: false,
    description: 'Open Aadil\'s primary GitHub repositories.'
  }
}

/**
 * Dynamically resolves an OPEN_PROJECT action for a given canonical project slug.
 */
export function getProjectAction(projectSlug: string): ApprovedAction | null {
  const project = projectsMetadata.find(p => p.slug === projectSlug)
  if (!project) return null

  return {
    name: `OPEN_PROJECT_${projectSlug.toUpperCase().replace(/-/g, '_')}`,
    type: 'navigate',
    target: `/systems/${project.slug}`,
    label: project.title,
    requiresConfirmation: false,
    description: `Navigate to ${project.title} detailed system page.`
  }
}

/**
 * Dynamically resolves a FOCUS_JOURNAL_SECTION action for a given chapter index.
 */
export function getJournalSectionAction(chapterNum: number): ApprovedAction | null {
  if (chapterNum < 1 || chapterNum > 10) return null
  return {
    name: `FOCUS_JOURNAL_CHAPTER_${chapterNum}`,
    type: 'navigate',
    target: `/journal#spread-${chapterNum}`,
    label: `Engineering Journal — Chapter ${chapterNum}`,
    requiresConfirmation: false,
    description: `Focus chapter ${chapterNum} of the Engineering Journal.`
  }
}

/**
 * CENTRAL DETERMINISTIC ACTION RESOLVER
 * Converts intent + entity parameters into an approved action contract.
 * Returns null if the request cannot be deterministically resolved to an approved action.
 */
export function resolveDeterministicAction(
  actionName: string,
  params?: { projectSlug?: string; journalChapter?: number }
): ApprovedAction | null {
  // 1. Direct registry match
  if (ACTION_REGISTRY[actionName]) {
    const action = ACTION_REGISTRY[actionName]
    logActionDiagnostics(actionName, action.target, 'RESOLVED')
    return action
  }

  // 2. Project slug match
  if (actionName === 'OPEN_PROJECT' && params?.projectSlug) {
    const projectAction = getProjectAction(params.projectSlug)
    if (projectAction) {
      logActionDiagnostics(`OPEN_PROJECT_${params.projectSlug}`, projectAction.target, 'RESOLVED')
      return projectAction
    }
  }

  // 3. Journal section match
  if (actionName === 'FOCUS_JOURNAL_SECTION' && params?.journalChapter) {
    const journalAction = getJournalSectionAction(params.journalChapter)
    if (journalAction) {
      logActionDiagnostics(`FOCUS_JOURNAL_${params.journalChapter}`, journalAction.target, 'RESOLVED')
      return journalAction
    }
  }

  // 4. Unregistered / Unapproved action safeguard
  logActionDiagnostics(actionName, 'NONE', 'REJECTED_UNREGISTERED')
  return null
}

function logActionDiagnostics(action: string, target: string, status: string) {
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ENABLE_RAG_LOGS === 'true') {
    console.log(`[ACTION_REGISTRY] action=${action} target=${target} status=${status}`)
  }
}
