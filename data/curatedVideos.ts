import { projects } from './projects'
import { Project, ProjectVideoDemo } from '../types'
import { isValidVideoDemo } from '../lib/videoDemo'

export interface CuratedHomepageVideo {
  projectSlug: string
  project: Project
  videoDemo?: ProjectVideoDemo
  isAvailable: boolean
}

/**
 * Curated list of projects featured in the Homepage Video Walkthroughs section.
 * Governed explicitly; does not automatically pull all projects with videos.
 */
export const HOMEPAGE_CURATED_VIDEO_SLUGS = [
  'universal-hr-assistant',
  'solace-ai'
] as const

/**
 * Retrieves curated homepage video models derived strictly from the single source of truth
 * in the project registry, avoiding duplicate URLs or fragmented metadata.
 */
export function getHomepageCuratedVideos(): CuratedHomepageVideo[] {
  const list: CuratedHomepageVideo[] = []
  for (const slug of HOMEPAGE_CURATED_VIDEO_SLUGS) {
    const project = projects.find((p) => p.slug === slug)
    if (!project) continue

    const videoDemo = project.videoDemo
    const isAvailable = isValidVideoDemo(videoDemo)

    list.push({
      projectSlug: slug,
      project,
      videoDemo,
      isAvailable
    })
  }
  return list
}
