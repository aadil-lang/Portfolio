/**
 * READ-ONLY NAVIGATION TOOLS — Phase 5A
 *
 * Deterministic navigation tools for verified external links (GitHub, LinkedIn)
 * and contact routing. Enforces strict URL authorization boundaries.
 */

import { AskAadilTool, ToolResult } from '@/types/rag'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'

/**
 * github.open: Open verified GitHub repository or profile
 */
export const githubOpenTool: AskAadilTool = {
  name: 'github.open',
  description: 'Open a verified GitHub repository or Aadil\'s primary GitHub profile.',
  risk: 'external_navigation',

  async execute(input: { project?: string; slug?: string }): Promise<ToolResult> {
    const rawProject = (input?.project || input?.slug || '').toLowerCase().trim()

    let targetUrl = structuredProfile.githubUrls.primary
    let label = 'Open Primary GitHub Profile'

    if (rawProject) {
      const proj = projectsMetadata.find(
        p => p.slug === rawProject || p.title.toLowerCase().includes(rawProject)
      )

      if (proj && proj.externalRefs?.github) {
        targetUrl = proj.externalRefs.github
        label = `Open ${proj.title} GitHub Repository`
      } else if (rawProject === 'loom-ai' || rawProject === 'loom') {
        targetUrl = 'https://github.com/aadilkhurshid/loom-ai-b2b'
        label = 'Open Loom AI GitHub Repository'
      } else if (rawProject === 'atlas-ai' || rawProject === 'atlas') {
        targetUrl = 'https://github.com/aadil-khurshid/Atlas-AI'
        label = 'Open Atlas AI GitHub Repository'
      }
    }

    return {
      success: true,
      toolName: 'github.open',
      title: label,
      message: `Navigating to verified GitHub destination: [${label}](${targetUrl})`,
      navigation: {
        url: targetUrl,
        label,
        isExternal: true
      }
    }
  }
}

/**
 * linkedin.open: Open verified LinkedIn profile
 */
export const linkedinOpenTool: AskAadilTool = {
  name: 'linkedin.open',
  description: 'Open Aadil\'s verified LinkedIn professional profile.',
  risk: 'external_navigation',

  async execute(): Promise<ToolResult> {
    const targetUrl = structuredProfile.linkedinUrl
    const label = 'Open LinkedIn Profile'

    return {
      success: true,
      toolName: 'linkedin.open',
      title: label,
      message: `Navigating to Aadil's verified LinkedIn profile: [${label}](${targetUrl})`,
      navigation: {
        url: targetUrl,
        label,
        isExternal: true
      }
    }
  }
}

/**
 * contact.open: Open contact page or channel destination
 */
export const contactOpenTool: AskAadilTool = {
  name: 'contact.open',
  description: 'Open contact routing destination or verified email details.',
  risk: 'read_only',

  async execute(): Promise<ToolResult> {
    const targetUrl = '/contact'
    const label = 'Open Contact Page'

    return {
      success: true,
      toolName: 'contact.open',
      title: label,
      message: `Navigating to **${label}**. You can reach Aadil at **${structuredProfile.email}**.`,
      navigation: {
        url: targetUrl,
        label,
        isExternal: false
      }
    }
  }
}
