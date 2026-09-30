/**
 * ASK AADIL PAGE CONTEXT UTILITY
 *
 * Deterministically maps current portfolio route pathnames to canonical entity
 * metadata, contextual greetings, and page-specific prompt suggestions.
 *
 * Principles:
 * - Deterministic, pure function (no LLM, no async network calls).
 * - Maps to canonical project slugs from projectsMetadata.
 * - Provides context-aware greeting hints and UI prompt suggestions.
 * - Context is a HINT for Ask Aadil, never a hard restriction.
 */

import { projectsMetadata } from '@/data/canonical/projectsMetadata'

export interface AskAadilPageContext {
  pathname: string
  pageType: 'homepage' | 'project' | 'system' | 'journal' | 'timeline' | 'contact' | 'ai-engineering' | 'about' | 'general'
  projectSlug?: string
  chapterSlug?: string
  title?: string
  contextGreeting?: string
  suggestedPrompts: string[]
}

/**
 * Normalizes project route slug to canonical projectsMetadata slug
 */
export function resolveCanonicalProjectSlug(rawSlug: string): string {
  const clean = (rawSlug || '').toLowerCase().trim()
  if (clean === 'loom' || clean === 'loom-b2b') return 'loom-ai'
  if (clean === 'atlas' || clean === 'atlas-copilot') return 'atlas-ai'
  if (clean === 'engineering-design-automation' || clean === 'eda') return 'design-automation'
  if (clean === 'ai-application-reliability' || clean === 'qa-harness') return 'ai-reliability'
  if (clean === 'worksheets') return 'ai-worksheets'
  if (clean === 'curriculum') return 'curriculum-etl'
  if (clean === 'item-bank') return 'math-item-bank'
  return clean
}

/**
 * Derives canonical AskAadilPageContext from pathname
 */
export function getAskAadilPageContext(pathname: string): AskAadilPageContext {
  const cleanPath = (pathname || '/').toLowerCase().split('?')[0].split('#')[0]

  // 1. Homepage
  if (cleanPath === '/' || cleanPath === '') {
    return {
      pathname: cleanPath,
      pageType: 'homepage',
      title: 'Portfolio Overview',
      suggestedPrompts: [
        'Who is Aadil?',
        'How did he move from mathematics to AI?',
        'What systems has he built?',
        'Show me Aadil\'s GitHub.'
      ]
    }
  }

  // 2. Project / System Detail Pages
  if (cleanPath.startsWith('/projects/') || cleanPath.startsWith('/systems/')) {
    const rawSlug = cleanPath.replace(/^\/(projects|systems)\//, '')
    const canonicalSlug = resolveCanonicalProjectSlug(rawSlug)
    const proj = projectsMetadata.find(p => p.slug === canonicalSlug || p.slug === rawSlug)

    if (proj) {
      if (proj.slug === 'loom-ai') {
        return {
          pathname: cleanPath,
          pageType: 'project',
          projectSlug: 'loom-ai',
          title: proj.title,
          contextGreeting: "You're viewing Loom AI.",
          suggestedPrompts: [
            'Why LangGraph for Loom?',
            'What problem does Loom solve?',
            'Show me the Loom architecture.',
            'Show me Loom\'s GitHub repository.'
          ]
        }
      }

      if (proj.slug === 'design-automation') {
        return {
          pathname: cleanPath,
          pageType: 'project',
          projectSlug: 'design-automation',
          title: proj.title,
          contextGreeting: "You're viewing Engineering Design Automation.",
          suggestedPrompts: [
            'How does the engineering pipeline work?',
            'Why use deterministic calculations?',
            'Show me the verification evidence.',
            'Show me EDA\'s GitHub repository.'
          ]
        }
      }

      if (proj.slug === 'atlas-ai') {
        return {
          pathname: cleanPath,
          pageType: 'project',
          projectSlug: 'atlas-ai',
          title: proj.title,
          contextGreeting: "You're viewing Atlas AI.",
          suggestedPrompts: [
            'How does Atlas parse SEC filings?',
            'What problem does Atlas solve?',
            'How many tests verify Atlas?',
            'Show me Atlas\'s GitHub repository.'
          ]
        }
      }

      if (proj.slug === 'vm-copy') {
        return {
          pathname: cleanPath,
          pageType: 'project',
          projectSlug: 'vm-copy',
          title: proj.title,
          contextGreeting: "You're viewing VM Copy Question Generator.",
          suggestedPrompts: [
            'How does the VM Copy evaluator work?',
            'Why are distractor rationales validated?',
            'Show me the VM Copy system entry.',
            'Show me VM Copy\'s GitHub repository.'
          ]
        }
      }

      if (proj.slug === 'ai-reliability') {
        return {
          pathname: cleanPath,
          pageType: 'project',
          projectSlug: 'ai-reliability',
          title: proj.title,
          contextGreeting: "You're viewing AI Application Reliability.",
          suggestedPrompts: [
            'How does Fisher Information covariance work?',
            'What browser testing agent does this use?',
            'Show me the AI reliability test suite.',
            'Show me AI Reliability\'s GitHub repository.'
          ]
        }
      }

      return {
        pathname: cleanPath,
        pageType: 'project',
        projectSlug: proj.slug,
        title: proj.title,
        contextGreeting: `You're viewing ${proj.title}.`,
        suggestedPrompts: [
          `Tell me about ${proj.title}.`,
          `What problem does ${proj.title} solve?`,
          `Show me ${proj.title}'s GitHub repository.`
        ]
      }
    }
  }

  // 3. Systems Archive Index
  if (cleanPath === '/systems' || cleanPath === '/projects') {
    return {
      pathname: cleanPath,
      pageType: 'system',
      title: 'Systems Archive',
      contextGreeting: "You're viewing the Systems Archive.",
      suggestedPrompts: [
        'What systems has Aadil built?',
        'Compare Loom AI and Atlas AI.',
        'Which project has the most tests?',
        'Show me the complete systems list.'
      ]
    }
  }

  // 4. Engineering Journal
  if (cleanPath.startsWith('/journal')) {
    const rawChapter = cleanPath.replace('/journal', '').replace(/^\//, '')
    return {
      pathname: cleanPath,
      pageType: 'journal',
      chapterSlug: rawChapter || 'overview',
      title: 'Engineering Journal',
      contextGreeting: "You're viewing the Engineering Journal.",
      suggestedPrompts: [
        'What did this experience teach Aadil?',
        'How did this connect to AI?',
        'What changed in his engineering approach?',
        'Show me the journal spreads.'
      ]
    }
  }

  // 5. Timeline & Experience
  if (cleanPath.startsWith('/experience') || cleanPath.startsWith('/timeline')) {
    return {
      pathname: cleanPath,
      pageType: 'timeline',
      title: 'Timeline & Experience',
      contextGreeting: "You're viewing Aadil's Timeline & Career Trajectory.",
      suggestedPrompts: [
        'Tell me about Aadil\'s career trajectory.',
        'How did Aadil transition from math to AI?',
        'What was Aadil\'s role at Wayground?'
      ]
    }
  }

  // 6. Contact
  if (cleanPath.startsWith('/contact')) {
    return {
      pathname: cleanPath,
      pageType: 'contact',
      title: 'Contact',
      contextGreeting: "You're viewing the Contact page.",
      suggestedPrompts: [
        'How can I contact Aadil?',
        'Draft an email to recruiter@example.com about AI reliability.',
        'Where is Aadil located?'
      ]
    }
  }

  // 7. AI Engineering Focus
  if (cleanPath.startsWith('/ai-engineering')) {
    return {
      pathname: cleanPath,
      pageType: 'ai-engineering',
      title: 'AI Engineering Focus',
      contextGreeting: "You're viewing AI Engineering Focus.",
      suggestedPrompts: [
        'What are Aadil\'s core AI engineering principles?',
        'How does Aadil handle prompt injection defense?',
        'What tool planning architecture does Aadil use?'
      ]
    }
  }

  // 8. General Fallback
  return {
    pathname: cleanPath,
    pageType: 'general',
    title: 'Portfolio',
    suggestedPrompts: [
      'Who is Aadil?',
      'Tell me about Loom AI.',
      'Show me Aadil\'s GitHub.'
    ]
  }
}
