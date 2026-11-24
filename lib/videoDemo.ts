import { ProjectVideoDemo } from '../types'

/**
 * Checks whether a ProjectVideoDemo configuration has an active, valid video source.
 * Safe for use in both Server Components and Client Components.
 */
export function isValidVideoDemo(demo?: ProjectVideoDemo): boolean {
  if (!demo) return false
  if (typeof demo.source !== 'string') return false
  const trimmed = demo.source.trim()
  if (!trimmed) return false

  if (demo.sourceType === 'hosted') {
    return trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')
  }

  // Embed providers must have an identifier or valid URL string
  return trimmed.length > 0
}
