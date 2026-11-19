/**
 * SESSION MEMORY & BOUNDED CONTEXT MODULE — Phase 2.1
 *
 * Ephemeral, bounded in-memory session management for Ask Aadil.
 *
 * Key Invariants:
 * 1. Strictly in-memory and scoped to the active browser session.
 * 2. Zero persistence: no localStorage, sessionStorage, IndexedDB, cookies, or remote DB.
 * 3. Bounded buffer: keeps a sliding window of recent dialogue turns (default 6).
 * 4. Contextual continuity: manages an active topic stack with salience decay,
 *    multi-entity comparison tracking, and compact historical summarization.
 * 5. Trust boundary: conversation history is conversational CONTEXT, not canonical evidence.
 */

import {
  DialogueTurn,
  TopicStackItem,
  PendingClarification,
  SessionMemory
} from '@/types/rag'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'

export const DEFAULT_MAX_RECENT_TURNS = 6
export const MAX_TOPIC_STACK_DEPTH = 6

/**
 * Creates a brand new, clean session memory.
 */
export function createFreshSessionMemory(maxRecentTurns: number = DEFAULT_MAX_RECENT_TURNS): SessionMemory {
  return {
    sessionId: `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    sessionStartTime: new Date().toISOString(),
    turnCounter: 0,
    recentTurns: [],
    topicStack: [],
    compactContextSummary: '',
    maxRecentTurns
  }
}

/**
 * Resolves a display title for a canonical project slug.
 */
export function getProjectDisplayTitle(slug: string): string {
  const proj = projectsMetadata.find(p => p.slug === slug)
  if (proj) return proj.title
  // Capitalize hyphenated words as fallback
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

/**
 * Updates the topic stack with an entity reference.
 * Bumps the entity to the top, refreshes its salience to 1.0, decays older topics,
 * and caps stack depth to prevent unbounded memory growth.
 */
export function updateTopicStack(
  memory: SessionMemory,
  entitySlug: string,
  displayTitle?: string,
  turnIndex: number = memory.turnCounter,
  role: 'primary' | 'comparison_subject' | 'secondary' = 'primary'
): void {
  const title = displayTitle || getProjectDisplayTitle(entitySlug)
  const existingIdx = memory.topicStack.findIndex(item => item.entitySlug === entitySlug)

  let item: TopicStackItem

  if (existingIdx >= 0) {
    // Remove from existing position
    const [existing] = memory.topicStack.splice(existingIdx, 1)
    item = {
      ...existing,
      displayTitle: title,
      lastReferencedTurn: turnIndex,
      salience: 1.0,
      roleInTurn: role
    }
  } else {
    // Determine topic type
    const isProject = projectsMetadata.some(p => p.slug === entitySlug)
    item = {
      topicType: isProject ? 'project' : 'concept',
      entitySlug,
      displayTitle: title,
      introducedTurn: turnIndex,
      lastReferencedTurn: turnIndex,
      salience: 1.0,
      roleInTurn: role
    }
  }

  // Decay older topics in stack
  for (const older of memory.topicStack) {
    older.salience = Math.max(0.1, Number((older.salience * 0.75).toFixed(2)))
  }

  // Prepend to top of stack
  memory.topicStack.unshift(item)

  // Cap depth
  if (memory.topicStack.length > MAX_TOPIC_STACK_DEPTH) {
    memory.topicStack = memory.topicStack.slice(0, MAX_TOPIC_STACK_DEPTH)
  }
}

/**
 * Returns the currently active topic if available and sufficiently salient.
 */
export function getActiveTopic(memory?: SessionMemory): TopicStackItem | undefined {
  if (!memory || memory.topicStack.length === 0) return undefined
  const top = memory.topicStack[0]
  if (top.salience >= 0.25) return top
  return undefined
}

/**
 * Restores an earlier topic to the top of the stack with full salience.
 * Returns true if restored, false if not found.
 */
export function restoreTopic(
  memory: SessionMemory,
  entitySlug: string,
  turnIndex: number = memory.turnCounter
): boolean {
  const existingIdx = memory.topicStack.findIndex(item => item.entitySlug === entitySlug)
  if (existingIdx >= 0) {
    const [item] = memory.topicStack.splice(existingIdx, 1)
    item.lastReferencedTurn = turnIndex
    item.salience = 1.0
    item.roleInTurn = 'primary'

    // Decay others
    for (const older of memory.topicStack) {
      older.salience = Math.max(0.1, Number((older.salience * 0.75).toFixed(2)))
    }
    memory.topicStack.unshift(item)
    return true
  }

  // If not previously in stack but is a valid canonical project, add it
  const proj = projectsMetadata.find(p => p.slug === entitySlug)
  if (proj) {
    updateTopicStack(memory, entitySlug, proj.title, turnIndex, 'primary')
    return true
  }

  return false
}

/**
 * Invalidates the active topic (used during user corrections).
 * Can optionally replace it immediately with the corrected entity.
 */
export function invalidateActiveTopic(
  memory: SessionMemory,
  replacementSlug?: string,
  replacementTitle?: string,
  turnIndex: number = memory.turnCounter
): void {
  if (memory.topicStack.length > 0) {
    memory.topicStack.shift() // Drop the invalidated topic
  }

  // Clear comparison entities if they included the invalidated topic
  memory.comparisonEntities = undefined

  if (replacementSlug) {
    updateTopicStack(
      memory,
      replacementSlug,
      replacementTitle || getProjectDisplayTitle(replacementSlug),
      turnIndex,
      'primary'
    )
  }
}

/**
 * Sets comparison entities for multi-entity questions.
 */
export function setComparisonEntities(
  memory: SessionMemory,
  slugs: string[],
  turnIndex: number = memory.turnCounter
): void {
  memory.comparisonEntities = [...new Set(slugs)]
  // Add each comparison entity to the topic stack as comparison_subject
  for (const slug of slugs) {
    updateTopicStack(memory, slug, getProjectDisplayTitle(slug), turnIndex, 'comparison_subject')
  }
}

/**
 * Clears comparison entities.
 */
export function clearComparisonEntities(memory: SessionMemory): void {
  memory.comparisonEntities = undefined
}

/**
 * Registers a pending clarification question awaiting user input.
 */
export function setPendingClarification(
  memory: SessionMemory,
  clarification: PendingClarification
): void {
  memory.pendingClarification = clarification
}

/**
 * Clears pending clarification.
 */
export function clearPendingClarification(memory: SessionMemory): void {
  memory.pendingClarification = undefined
}

/**
 * Adds a completed dialogue turn to session memory.
 * Enforces the bounded turn window and updates compact summary when turns roll off.
 */
export function addTurnToSessionMemory(
  memory: SessionMemory,
  turnData: Omit<DialogueTurn, 'turnId' | 'turnIndex' | 'timestamp'>
): SessionMemory {
  const newTurnIndex = memory.turnCounter + 1
  memory.turnCounter = newTurnIndex

  const turn: DialogueTurn = {
    ...turnData,
    turnId: `turn_${newTurnIndex}_${Date.now()}`,
    turnIndex: newTurnIndex,
    timestamp: new Date().toISOString()
  }

  // Append new turn
  memory.recentTurns.push(turn)

  // Update topic stack based on turn results
  if (turn.resolvedProject) {
    const isComparison = memory.comparisonEntities && memory.comparisonEntities.includes(turn.resolvedProject)
    updateTopicStack(
      memory,
      turn.resolvedProject,
      getProjectDisplayTitle(turn.resolvedProject),
      newTurnIndex,
      isComparison ? 'comparison_subject' : 'primary'
    )
  }

  // If bounds exceeded, roll oldest turn off into compactContextSummary
  if (memory.recentTurns.length > memory.maxRecentTurns) {
    const rolledOff = memory.recentTurns.shift()
    if (rolledOff) {
      appendTurnToSummary(memory, rolledOff)
    }
  }

  return memory
}

/**
 * Compactly appends a rolled-off turn to the historical summary.
 * Keeps running context without unbounded text accumulation.
 */
function appendTurnToSummary(memory: SessionMemory, turn: DialogueTurn): void {
  const entityDesc = turn.resolvedProject
    ? getProjectDisplayTitle(turn.resolvedProject)
    : (turn.resolvedEntities[0] || turn.resolvedIntent)

  const summaryItem = `T${turn.turnIndex} (${entityDesc}: "${turn.originalQuery.slice(0, 45)}")`

  if (!memory.compactContextSummary) {
    memory.compactContextSummary = `Earlier context: ${summaryItem}`
  } else {
    // Keep summary bounded to ~300 chars
    const items = memory.compactContextSummary.replace(/^Earlier context:\s*/, '').split('; ')
    items.push(summaryItem)
    if (items.length > 5) {
      items.shift() // Drop oldest summary snippet
    }
    memory.compactContextSummary = `Earlier context: ${items.join('; ')}`
  }
}

/**
 * Checks if an active topic is stale relative to current conversation.
 * A topic is stale if:
 * 1. It was last referenced > 3 turns ago AND
 * 2. An unrelated intent or different topic was discussed in between.
 */
export function isTopicStale(memory: SessionMemory, topic: TopicStackItem): boolean {
  const turnsSinceReference = memory.turnCounter - topic.lastReferencedTurn
  if (turnsSinceReference <= 1) return false
  if (turnsSinceReference > 3) return true

  // Check if intervening turns switched to another entity or unrelated questions
  if (memory.recentTurns.length >= 2) {
    const lastTurn = memory.recentTurns[memory.recentTurns.length - 1]
    if (lastTurn && lastTurn.resolvedProject && lastTurn.resolvedProject !== topic.entitySlug) {
      return true
    }
  }

  return false
}

/**
 * Builds a compact summary string for query understanding and synthesizer context.
 */
export function formatSessionContextForPrompt(memory?: SessionMemory): string {
  if (!memory || memory.turnCounter === 0) return ''

  const lines: string[] = []
  const active = getActiveTopic(memory)

  if (active) {
    lines.push(`ACTIVE TOPIC: ${active.displayTitle} (${active.entitySlug}) [Salience: ${active.salience}]`)
  }

  if (memory.comparisonEntities && memory.comparisonEntities.length > 1) {
    const titles = memory.comparisonEntities.map(s => getProjectDisplayTitle(s))
    lines.push(`COMPARISON SUBJECTS: ${titles.join(' vs ')} (${memory.comparisonEntities.join(', ')})`)
  }

  if (memory.topicStack.length > 1) {
    const recentOther = memory.topicStack
      .slice(1, 4)
      .map(t => `${t.displayTitle} (T${t.lastReferencedTurn})`)
    lines.push(`PREVIOUS TOPICS IN STACK: ${recentOther.join(', ')}`)
  }

  if (memory.compactContextSummary) {
    lines.push(memory.compactContextSummary)
  }

  return lines.join('\n')
}
