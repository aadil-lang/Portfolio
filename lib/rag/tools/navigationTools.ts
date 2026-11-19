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
      // Check if user is asking for the general profile using synonyms
      const isExplicitProfileRequest =
        rawProject === 'profile' ||
        rawProject === 'user' ||
        rawProject === 'account' ||
        rawProject === 'aadil' ||
        rawProject === 'aadil-lang' ||
        rawProject === 'aadilkhurshid'

      if (isExplicitProfileRequest) {
        return {
          success: true,
          toolName: 'github.open',
          title: 'Open Primary GitHub Profile',
          message: `Navigating to verified GitHub destination: [Open Primary GitHub Profile](${structuredProfile.githubUrls.primary})`,
          navigation: {
            url: structuredProfile.githubUrls.primary,
            label: 'Open Primary GitHub Profile',
            isExternal: true
          }
        }
      }

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
      } else if (rawProject === 'solace-ai' || rawProject === 'solace') {
        targetUrl = 'https://github.com/aadil-lang/solace-ai'
        label = 'Open Solace AI GitHub Repository'
      } else if (rawProject === 'ocr-evaluator' || rawProject === 'ocr') {
        targetUrl = 'https://github.com/aadil-lang/OCR-Evaluator'
        label = 'Open OCR Evaluator GitHub Repository'
      } else if (proj && (!proj.externalRefs?.github || proj.externalRefs.github === null)) {
        // PROPRIETARY OR PRIVATE SYSTEM: NO PUBLIC GITHUB REPOSITORY
        const caseStudyRoute = proj.portfolioRefs?.system || `/projects/${proj.slug}`
        return {
          success: true,
          toolName: 'github.open',
          title: `No Public Repository — ${proj.title}`,
          message: `**${proj.title}** was developed in an employer context as an internal system and has no public GitHub repository. You can inspect its verified architectural specification, evaluation invariants, and technical case study in the Systems Archive: [${proj.title} Case Study](${caseStudyRoute}).`,
          navigation: {
            url: caseStudyRoute,
            label: `Open ${proj.title} Architecture in Systems Archive`,
            isExternal: false
          }
        }
      } else {
        // Project specified but no verified repository or project found
        return {
          success: true,
          toolName: 'github.open',
          title: 'No Verified Repository',
          message: `No public GitHub repository is registered or verified for "${rawProject}". Proprietary systems and internal team tools do not expose public source code. You can explore verified open-source architectures in the Systems Archive or visit Aadil's primary profile at [github.com/aadil-lang](${structuredProfile.githubUrls.primary}).`,
          navigation: {
            url: structuredProfile.githubUrls.primary,
            label: 'Open Primary GitHub Profile',
            isExternal: true
          }
        }
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
