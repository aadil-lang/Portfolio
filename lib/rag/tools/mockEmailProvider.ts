/**
 * MOCK EMAIL PROVIDER — Phase 6
 *
 * Deterministic mock email provider implementing draft management, state transition validation,
 * idempotency key caching, authorization verification, and structured provider audit telemetry.
 */

import { EmailDraft, EmailActionStatus } from '@/types/rag'
import { validateAuthorization, createAuthorization } from '@/lib/rag/tools/authorization'
import { recordAuditEvent } from '@/lib/rag/tools/actionAudit'

export interface EmailDraftInput {
  recipient: string
  subject: string
  body: string
}

export interface EmailSendInput {
  draftId: string
  authorizationId: string
  idempotencyKey: string
}

export interface EmailSendResult {
  success: boolean
  providerMessageId?: string
  sentAt?: string
  errorCode?: string
  message: string
}

export interface EmailProvider {
  draft(input: EmailDraftInput): Promise<EmailDraft>
  getDraft(draftId: string): EmailDraft | undefined
  updateDraft(draftId: string, updates: Partial<EmailDraftInput>): EmailDraft | null
  send(input: EmailSendInput): Promise<EmailSendResult>
}

class MockEmailProviderImpl implements EmailProvider {
  private drafts = new Map<string, EmailDraft>()
  private sentIdempotencyKeys = new Map<string, EmailSendResult>()

  /**
   * Create an email draft in the provider
   */
  async draft(input: EmailDraftInput): Promise<EmailDraft> {
    const draftId = `draft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const now = new Date().toISOString()

    const draft: EmailDraft = {
      draftId,
      recipient: input.recipient || '',
      subject: input.subject || '',
      body: input.body || '',
      status: 'draft',
      createdAt: now,
      updatedAt: now
    }

    this.drafts.set(draftId, draft)

    recordAuditEvent({
      eventType: 'draft_created',
      actionType: 'email.draft',
      resourceId: draftId,
      details: `Created draft for ${draft.recipient} with subject "${draft.subject}"`,
      success: true
    })

    return draft
  }

  /**
   * Retrieve an email draft by draftId
   */
  getDraft(draftId: string): EmailDraft | undefined {
    return this.drafts.get(draftId)
  }

  /**
   * Update draft content before sending
   */
  updateDraft(draftId: string, updates: Partial<EmailDraftInput>): EmailDraft | null {
    const draft = this.drafts.get(draftId)
    if (!draft) return null

    if (updates.recipient !== undefined) draft.recipient = updates.recipient
    if (updates.subject !== undefined) draft.subject = updates.subject
    if (updates.body !== undefined) draft.body = updates.body
    draft.updatedAt = new Date().toISOString()

    return draft
  }

  /**
   * Send an authorized email with idempotency protection
   */
  async send(input: EmailSendInput): Promise<EmailSendResult> {
    const { draftId, authorizationId, idempotencyKey } = input

    // 1. Idempotency Check
    if (idempotencyKey && this.sentIdempotencyKeys.has(idempotencyKey)) {
      return this.sentIdempotencyKeys.get(idempotencyKey)!
    }

    const draft = this.drafts.get(draftId)
    if (!draft) {
      const errRes: EmailSendResult = {
        success: false,
        errorCode: 'DRAFT_NOT_FOUND',
        message: `Email draft "${draftId}" was not found.`
      }
      return errRes
    }

    // 2. Validate state transition: cannot send directly from 'draft' without explicit lifecycle transition
    if (draft.status === 'sent') {
      return {
        success: false,
        errorCode: 'DRAFT_ALREADY_SENT',
        message: `Draft "${draftId}" has already been sent.`
      }
    }

    // 3. Authorization Verification
    const draftContent = `${draft.recipient}|${draft.subject}|${draft.body}`
    const authVal = validateAuthorization(authorizationId, 'email.send', draftId, draftContent)

    if (!authVal.valid) {
      draft.status = 'failed'
      const failRes: EmailSendResult = {
        success: false,
        errorCode: authVal.errorCode || 'UNAUTHORIZED_SEND_ATTEMPT',
        message: `Authorization failed: ${authVal.errorMessage}`
      }

      recordAuditEvent({
        eventType: 'action_failed',
        actionType: 'email.send',
        resourceId: draftId,
        authorizationId,
        details: failRes.message,
        success: false
      })

      return failRes
    }

    // 4. State Transition: confirmed -> sending -> sent
    draft.status = 'sending'
    const sentAt = new Date().toISOString()
    const providerMessageId = `msg_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

    draft.status = 'sent'
    draft.updatedAt = sentAt

    const successResult: EmailSendResult = {
      success: true,
      providerMessageId,
      sentAt,
      message: `Email successfully delivered to ${draft.recipient} (Message ID: ${providerMessageId}).`
    }

    // Cache idempotency result
    if (idempotencyKey) {
      this.sentIdempotencyKeys.set(idempotencyKey, successResult)
    }

    recordAuditEvent({
      eventType: 'action_executed',
      actionType: 'email.send',
      resourceId: draftId,
      authorizationId,
      details: `Sent email via mock provider to ${draft.recipient}. Message ID: ${providerMessageId}`,
      success: true
    })

    return successResult
  }

  /**
   * Reset mock provider state (used in test suites)
   */
  clear(): void {
    this.drafts.clear()
    this.sentIdempotencyKeys.clear()
  }
}

export const mockEmailProvider = new MockEmailProviderImpl()
