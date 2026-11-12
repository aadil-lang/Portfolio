/**
 * Deterministic Tokenizer & Text Normalizer for RAG Laboratory
 */

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'what', 'which', 'who', 'how',
  'many', 'does', 'do', 'did', 'having'
])

export function tokenize(text: string, removeStopwords = true): string[] {
  if (!text) return []

  const tokens = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/[\s_]+/)
    .map(t => t.trim())
    .filter(t => t.length > 1)

  if (!removeStopwords) return tokens
  return tokens.filter(t => !STOPWORDS.has(t))
}

export function extractNgrams(tokens: string[], n = 2): string[] {
  const ngrams: string[] = []
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join('_'))
  }
  return ngrams
}

