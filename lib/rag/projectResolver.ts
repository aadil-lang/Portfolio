import { projectsMetadata } from '@/data/canonical/projectsMetadata'

export interface ProjectResolution {
  resolvedSlug?: string
  projectTitle?: string
  confidence: number
  isAmbiguous: boolean
  candidateSlugs?: string[]
}

/**
 * DETERMINISTIC PROJECT ENTITY RESOLVER
 * Maps natural language queries into verified canonical project slugs.
 * Distinguishes exact/alias matches from vague ambiguous requests.
 */
export function resolveProjectEntity(query: string): ProjectResolution {
  const q = query.toLowerCase().trim()

  // Exact & Alias Mappings
  const aliasMappings: { slug: string; keywords: string[] }[] = [
    {
      slug: 'vm-copy',
      keywords: ['vm copy', 'vm-copy', 'ai question generator', 'question generator', 'math question generator', 'vm copy question generator']
    },
    {
      slug: 'ai-worksheets',
      keywords: ['ai worksheet', 'ai worksheets', 'worksheet project', 'worksheet generator', 'math worksheets', 'worksheet']
    },
    {
      slug: 'curriculum-etl',
      keywords: ['curriculum etl', 'curriculum transformation', 'curriculum transformation phase 1', 'curriculum transformation phase 2', 'map-reduce', 'etl']
    },
    {
      slug: 'math-item-bank',
      keywords: ['us mathematics item bank', 'math item bank', 'item bank', 'item-bank']
    },
    {
      slug: 'design-automation',
      keywords: ['engineering design automation', 'eda', 'shaft design', 'opencascade', 'cad automation', 'design automation']
    },
    {
      slug: 'ai-reliability',
      keywords: ['ai application reliability', 'predictive qa', 'qa platform', 'browser qa', 'reliability', 'reliability harness']
    },
    {
      slug: 'loom-ai',
      keywords: ['loom ai', 'loom', 'textile marketplace', 'b2b textile']
    },
    {
      slug: 'atlas-ai',
      keywords: ['atlas ai', 'atlas', 'financial sec edgar', 'sec edgar', 'edgar bot']
    },
    {
      slug: 'binance-bot',
      keywords: ['binance bot', 'binance futures bot', 'futures bot', 'trading bot']
    },
    {
      slug: 'ask-aadil',
      keywords: ['ask aadil', 'ask-aadil', 'portfolio agent', 'portfolio rag']
    }
  ]

  // 1. Direct Keyword / Alias Match
  for (const mapping of aliasMappings) {
    for (const kw of mapping.keywords) {
      if (q.includes(kw)) {
        const proj = projectsMetadata.find(p => p.slug === mapping.slug)
        return {
          resolvedSlug: mapping.slug,
          projectTitle: proj?.title || mapping.slug,
          confidence: 0.98,
          isAmbiguous: false
        }
      }
    }
  }

  // 2. Direct Slug or Title match
  for (const p of projectsMetadata) {
    if (q.includes(p.slug) || q.includes(p.title.toLowerCase())) {
      return {
        resolvedSlug: p.slug,
        projectTitle: p.title,
        confidence: 0.95,
        isAmbiguous: false
      }
    }
  }

  // 3. Detect Ambiguous Generic Queries ("show me his AI project", "open AI project")
  const isGenericAiProject =
    q.includes('ai project') ||
    q.includes('his project') ||
    q.includes('the project') ||
    q.includes('show a project')

  if (isGenericAiProject) {
    return {
      resolvedSlug: undefined,
      confidence: 0.5,
      isAmbiguous: true,
      candidateSlugs: ['vm-copy', 'ai-worksheets', 'curriculum-etl', 'ai-reliability', 'loom-ai', 'atlas-ai']
    }
  }

  return {
    resolvedSlug: undefined,
    confidence: 0,
    isAmbiguous: false
  }
}
