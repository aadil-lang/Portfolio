/**
 * CONTROLLED SIDE-EFFECT EMAIL TOOLS — Phase 6
 *
 * Implements email.draft (read_only) and email.send (side_effect).
 * Enforces strict two-phase authorization, draft lifecycle transitions, and idempotency protection.
 */

import { AskAadilTool, ToolResult } from '@/types/rag'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { mockEmailProvider } from '@/lib/rag/tools/mockEmailProvider'
import { createAuthorization } from '@/lib/rag/tools/authorization'
import { recordAuditEvent } from '@/lib/rag/tools/actionAudit'

/**
 * email.draft: Prepare email draft and request explicit user confirmation
 */
export const emailDraftTool: AskAadilTool = {
  name: 'email.draft',
  description: 'Create a candidate email draft and generate a pending authorization token for user confirmation.',
  risk: 'read_only',

  async execute(input: {
    recipient?: string
    subject?: string
    body?: string
    project?: string
  }): Promise<ToolResult> {
    const recipient = (input?.recipient || structuredProfile.email).trim()
    const subject = (input?.subject || (input?.project ? `Inquiry regarding ${input.project}` : 'Inquiry regarding AI Systems Engineering')).trim()
    const body = (input?.body || `Hi Aadil,\n\nI was reviewing your portfolio and would like to connect regarding your AI Systems Engineering work.\n\nBest,\nVisitor`).trim()

    // 1. Create draft in provider
    const draft = await mockEmailProvider.draft({ recipient, subject, body })

    // 2. Set draft status to awaiting_confirmation
    draft.status = 'awaiting_confirmation'

    // 3. Create resource-bound authorization token (5 min TTL)
    const draftContentHashStr = `${draft.recipient}|${draft.subject}|${draft.body}`
    const auth = createAuthorization('email.send', draft.draftId, draftContentHashStr, 300000)

    draft.authorizationId = auth.authorizationId

    recordAuditEvent({
      eventType: 'confirmation_requested',
      actionType: 'email.send',
      resourceId: draft.draftId,
      authorizationId: auth.authorizationId,
      details: `Generated authorization ${auth.authorizationId} for draft ${draft.draftId} awaiting confirmation`,
      success: true
    })

    return {
      success: true,
      toolName: 'email.draft',
      title: 'Draft Prepared — Confirmation Required',
      message: `I have prepared an email draft to **${draft.recipient}**:\n\n---\n**Subject:** ${draft.subject}\n\n${draft.body}\n---\n\nWould you like me to send this email? Say **"Send it"** or click **"Confirm & Send Email"** to authorize sending.`,
      data: {
        draftId: draft.draftId,
        authorizationId: auth.authorizationId,
        recipient: draft.recipient,
        subject: draft.subject,
        body: draft.body,
        status: draft.status
      }
    }
  }
}

/**
 * email.send: Execute authorized email delivery with idempotency protection
 */
export const emailSendTool: AskAadilTool = {
  name: 'email.send',
  description: 'Execute authorized email sending after explicit user confirmation.',
  risk: 'side_effect',

  async execute(input: {
    draftId?: string
    authorizationId?: string
    idempotencyKey?: string
    recipient?: string
    subject?: string
    body?: string
  }): Promise<ToolResult> {
    const draftId = input?.draftId
    const authorizationId = input?.authorizationId

    // Prohibit direct send attempt without draftId and authorizationId
    if (!draftId || !authorizationId) {
      return {
        success: false,
        toolName: 'email.send',
        errorCode: 'INVALID_SEND_INPUT',
        message: 'Direct email sending without a pre-existing draft and explicit authorization is prohibited. A draft must be created first.'
      }
    }

    const idempotencyKey = input.idempotencyKey || `key_${draftId}_${authorizationId}`

    // Call provider send
    const sendResult = await mockEmailProvider.send({
      draftId,
      authorizationId,
      idempotencyKey
    })

    if (!sendResult.success) {
      const isUnapproved = sendResult.errorCode === 'AUTHORIZATION_NOT_APPROVED' || sendResult.errorCode === 'ACTION_REQUIRES_CONFIRMATION'
      return {
        success: false,
        toolName: 'email.send',
        errorCode: isUnapproved ? 'ACTION_REQUIRES_CONFIRMATION' : (sendResult.errorCode || 'EMAIL_SEND_FAILED'),
        message: sendResult.message
      }
    }

    return {
      success: true,
      toolName: 'email.send',
      title: 'Email Delivered Successfully',
      message: sendResult.message,
      data: {
        draftId,
        authorizationId,
        providerMessageId: sendResult.providerMessageId,
        sentAt: sendResult.sentAt
      }
    }
  }
}
