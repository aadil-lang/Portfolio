/**
 * ACTION AUDIT TRAIL — Phase 6
 *
 * Provides append-only operational audit logging for all side-effect lifecycle events,
 * authorization state changes, and provider execution results.
 */

import { ActionAuditEvent } from '@/types/rag'

const auditLog: ActionAuditEvent[] = []

/**
 * Record a side-effect lifecycle audit event
 */
export function recordAuditEvent(
  event: Omit<ActionAuditEvent, 'id' | 'timestamp'>
): ActionAuditEvent {
  const fullEvent: ActionAuditEvent = {
    ...event,
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString()
  }

  auditLog.push(fullEvent)
  return fullEvent
}

/**
 * Retrieve audit log entries, optionally filtered by resourceId (e.g. draftId)
 */
export function getAuditLog(resourceId?: string): ActionAuditEvent[] {
  if (resourceId) {
    return auditLog.filter(e => e.resourceId === resourceId)
  }
  return [...auditLog]
}

/**
 * Clear audit log (used in test suites)
 */
export function clearAuditLog(): void {
  auditLog.length = 0
}
