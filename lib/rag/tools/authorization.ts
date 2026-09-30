/**
 * ACTION AUTHORIZATION ENGINE — Phase 6
 *
 * Provides resource-bound, time-limited explicit user authorization objects for side-effect actions.
 * Enforces strict actionType + resourceId binding, TTL expiration (default 5 minutes),
 * content immutability hashes, and state transitions.
 *
 * Security Principle:
 * - Permissions are bound to a specific action and specific draft/resource.
 * - Approving draft A does NOT authorize draft B or any other action.
 * - Modifying draft content after approval invalidates authorization.
 */

import { ActionAuthorization } from '@/types/rag'
import { recordAuditEvent } from '@/lib/rag/tools/actionAudit'

const authorizations = new Map<string, ActionAuthorization>()

/**
 * Simple deterministic string hashing for content immutability checks
 */
export function computeContentHash(content: string): string {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return `hash_${Math.abs(hash).toString(36)}`
}

/**
 * Create a new pending authorization bound to actionType + resourceId
 */
export function createAuthorization(
  actionType: string,
  resourceId: string,
  contentToHash?: string,
  ttlMs = 300000 // 5 minutes
): ActionAuthorization {
  const authorizationId = `auth_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const createdAt = new Date().toISOString()
  const expiresAt = new Date(Date.now() + ttlMs).toISOString()
  const draftContentHash = contentToHash ? computeContentHash(contentToHash) : undefined

  const auth: ActionAuthorization = {
    authorizationId,
    actionType,
    resourceId,
    status: 'pending',
    createdAt,
    expiresAt,
    draftContentHash
  }

  authorizations.set(authorizationId, auth)
  return auth
}

/**
 * Explicitly approve an authorization
 */
export function approveAuthorization(authorizationId: string): boolean {
  const auth = authorizations.get(authorizationId)
  if (!auth) return false

  // Check TTL
  if (new Date().getTime() > new Date(auth.expiresAt).getTime()) {
    auth.status = 'expired'
    recordAuditEvent({
      eventType: 'authorization_expired',
      actionType: auth.actionType,
      resourceId: auth.resourceId,
      authorizationId: auth.authorizationId,
      details: 'Attempted to approve expired authorization',
      success: false
    })
    return false
  }

  auth.status = 'approved'
  recordAuditEvent({
    eventType: 'authorization_approved',
    actionType: auth.actionType,
    resourceId: auth.resourceId,
    authorizationId: auth.authorizationId,
    details: 'User explicitly approved authorization',
    success: true
  })
  return true
}

/**
 * Explicitly cancel an authorization
 */
export function cancelAuthorization(authorizationId: string): boolean {
  const auth = authorizations.get(authorizationId)
  if (!auth) return false

  auth.status = 'cancelled'
  recordAuditEvent({
    eventType: 'action_cancelled',
    actionType: auth.actionType,
    resourceId: auth.resourceId,
    authorizationId: auth.authorizationId,
    details: 'User cancelled action authorization',
    success: false
  })
  return true
}

/**
 * Retrieve authorization object
 */
export function getAuthorization(authorizationId: string): ActionAuthorization | undefined {
  return authorizations.get(authorizationId)
}

/**
 * Deterministically validate authorization against expected action, resource, TTL, and content hash
 */
export function validateAuthorization(
  authorizationId: string,
  expectedActionType: string,
  expectedResourceId: string,
  currentContent?: string
): { valid: boolean; errorCode?: string; errorMessage?: string } {
  const auth = authorizations.get(authorizationId)
  if (!auth) {
    return {
      valid: false,
      errorCode: 'AUTHORIZATION_NOT_FOUND',
      errorMessage: `Authorization token "${authorizationId}" was not found.`
    }
  }

  // 1. Resource & Action Type Binding Check
  if (auth.actionType !== expectedActionType || auth.resourceId !== expectedResourceId) {
    return {
      valid: false,
      errorCode: 'AUTHORIZATION_MISMATCH',
      errorMessage: `Authorization "${authorizationId}" is bound to (${auth.actionType}, ${auth.resourceId}) and cannot be used for (${expectedActionType}, ${expectedResourceId}).`
    }
  }

  // 2. TTL Check
  if (new Date().getTime() > new Date(auth.expiresAt).getTime()) {
    auth.status = 'expired'
    return {
      valid: false,
      errorCode: 'AUTHORIZATION_EXPIRED',
      errorMessage: `Authorization "${authorizationId}" has expired.`
    }
  }

  // 3. Status Check
  if (auth.status !== 'approved') {
    return {
      valid: false,
      errorCode: 'AUTHORIZATION_NOT_APPROVED',
      errorMessage: `Authorization "${authorizationId}" status is "${auth.status}" (requires explicit user approval).`
    }
  }

  // 4. Content Immutability Check
  if (auth.draftContentHash && currentContent) {
    const currentHash = computeContentHash(currentContent)
    if (currentHash !== auth.draftContentHash) {
      return {
        valid: false,
        errorCode: 'AUTHORIZATION_CONTENT_MUTATED',
        errorMessage: `Draft content was modified after approval. A new confirmation is required.`
      }
    }
  }

  return { valid: true }
}

/**
 * Clear all authorizations (used in test suites)
 */
export function clearAuthorizations(): void {
  authorizations.clear()
}
