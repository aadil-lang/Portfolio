/**
 * PORTFOLIO READ-ONLY TOOLS — Phase 5A
 *
 * Safe, read-only tools for portfolio knowledge search and canonical entity navigation.
 */

import { AskAadilTool, ToolResult } from '@/types/rag'
import { retrieveHybrid } from '@/lib/rag/hybridRetriever'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'

/**
 * Valid canonical entity routes mapping
 */
const CANONICAL_ROUTES: Record<string, { url: string; label: string }> = {
  // Systems / Projects
  'loom-ai': { url: '/systems/loom-ai', label: 'View Loom AI Specification' },
  'loom': { url: '/systems/loom-ai', label: 'View Loom AI Specification' },
  'atlas-ai': { url: '/systems/atlas-ai', label: 'View Atlas AI Specification' },
  'atlas': { url: '/systems/atlas-ai', label: 'View Atlas AI Specification' },
  'vm-copy': { url: '/systems/vm-copy', label: 'View VM Copy Specification' },
  'voyagemath': { url: '/systems/vm-copy', label: 'View VM Copy Specification' },
  'ai-reliability': { url: '/systems/ai-reliability', label: 'View AI Reliability Platform' },
  'reliability': { url: '/systems/ai-reliability', label: 'View AI Reliability Platform' },
  'design-automation': { url: '/systems/design-automation', label: 'View Engineering Design Automation' },
  'eda': { url: '/systems/design-automation', label: 'View Engineering Design Automation' },
  'math-item-bank': { url: '/systems/math-item-bank', label: 'View US Mathematics Item Bank' },
  'item-bank': { url: '/systems/math-item-bank', label: 'View US Mathematics Item Bank' },
  'curriculum-etl': { url: '/systems/curriculum-etl', label: 'View Curriculum ETL Pipeline' },
  'ai-worksheets': { url: '/systems/ai-worksheets', label: 'View AI Worksheets Pipeline' },
  'binance-bot': { url: '/systems/binance-bot', label: 'View Crypto Bot System' },
  'ask-aadil': { url: '/systems/ask-aadil', label: 'View Ask Aadil System Spec' },
  'solace-ai': { url: '/systems/solace-ai', label: 'View Solace AI Specification' },
  'solace': { url: '/systems/solace-ai', label: 'View Solace AI Specification' },
  'ocr-evaluator': { url: '/systems/ocr-evaluator', label: 'View OCR Evaluation Platform' },
  'ocr': { url: '/systems/ocr-evaluator', label: 'View OCR Evaluation Platform' },

  // Portfolio Pages / Sections
  'journal': { url: '/journal', label: 'Open Engineering Journal' },
  'timeline': { url: '/experience', label: 'Open Experience Timeline' },
  'experience': { url: '/experience', label: 'Open Experience Timeline' },
  'systems': { url: '/systems', label: 'Open Systems Archive' },
  'prologue': { url: '/journal', label: 'Open Engineering Journal' },
  'contact': { url: '/contact', label: 'Open Contact Page' }
}

/**
 * portfolio.search: Search canonical portfolio evidence
 */
export const portfolioSearchTool: AskAadilTool = {
  name: 'portfolio.search',
  description: 'Search authoritative portfolio sources for facts, architecture, test claims, and journal reasoning.',
  risk: 'read_only',

  async execute(input: { query: string }): Promise<ToolResult> {
    const q = input?.query || ''
    if (!q) {
      return {
        success: false,
        toolName: 'portfolio.search',
        message: 'Search query is required.',
        errorCode: 'MISSING_QUERY'
      }
    }

    const retrieval = retrieveHybrid(q)
    return {
      success: true,
      toolName: 'portfolio.search',
      title: `Portfolio Search: "${q}"`,
      message: `Retrieved ${retrieval.evidenceItems.length} grounded evidence items across ${retrieval.sourcePlan.primaryLayers?.length || 0} primary layers.`,
      data: {
        evidenceCount: retrieval.evidenceItems.length,
        items: retrieval.evidenceItems.slice(0, 5),
        sourcePlan: retrieval.sourcePlan
      }
    }
  }
}

/**
 * portfolio.open: Navigate to a known canonical portfolio entity or system
 */
export const portfolioOpenTool: AskAadilTool = {
  name: 'portfolio.open',
  description: 'Navigate to a verified canonical portfolio project, system specification, or journal section.',
  risk: 'read_only',

  async execute(input: { entity?: string; slug?: string }): Promise<ToolResult> {
    const rawEntity = (input?.entity || input?.slug || '').toLowerCase().trim()

    // Clean up entity slug
    const target = CANONICAL_ROUTES[rawEntity]

    if (!target) {
      // Check project metadata dynamically
      const proj = projectsMetadata.find(
        p => p.slug === rawEntity || p.title.toLowerCase().includes(rawEntity)
      )
      if (proj) {
        return {
          success: true,
          toolName: 'portfolio.open',
          title: `Open ${proj.title}`,
          message: `Opening system specification for **${proj.title}**.`,
          navigation: {
            url: `/systems/${proj.slug}`,
            label: `Open ${proj.title} Specification`,
            isExternal: false
          }
        }
      }

      return {
        success: false,
        toolName: 'portfolio.open',
        message: `Entity "${rawEntity}" is not a recognized canonical portfolio destination. Arbitrary paths are rejected.`,
        errorCode: 'INVALID_PORTFOLIO_ENTITY'
      }
    }

    return {
      success: true,
      toolName: 'portfolio.open',
      title: target.label,
      message: `Navigating to **${target.label}**.`,
      navigation: {
        url: target.url,
        label: target.label,
        isExternal: false
      }
    }
  }
}
