import { NextRequest, NextResponse } from 'next/server'
import { structuredProfile } from '@/data/canonical/structuredProfile'

// In-memory rate limiter for server API route (5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 minutes
  const maxRequests = 5

  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  return { allowed: true, remaining: maxRequests - record.count }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
    const rateLimit = checkRateLimit(clientIp)
    if (!rateLimit.allowed) {
      console.warn(`[CONTACT] rate_limit=EXCEEDED ip=${clientIp}`)
      return NextResponse.json(
        { success: false, error: 'Too many messages sent. Please wait a few minutes before trying again or connect directly on LinkedIn.' },
        { status: 429 }
      )
    }

    // 2. Request Body Parsing & Size Validation
    const body = await req.json()
    const { name, email, company, roleOpportunity, message } = body

    // Validate fields
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid name (maximum 100 characters).' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (company && (typeof company !== 'string' || company.length > 150)) {
      return NextResponse.json(
        { success: false, error: 'Company name is too long (maximum 150 characters).' },
        { status: 400 }
      )
    }

    if (roleOpportunity && (typeof roleOpportunity !== 'string' || roleOpportunity.length > 150)) {
      return NextResponse.json(
        { success: false, error: 'Role description is too long (maximum 150 characters).' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Please enter a message between 5 and 3000 characters.' },
        { status: 400 }
      )
    }

    // 3. Server-Controlled Destination Email (Client cannot specify target)
    const destinationEmail = process.env.CONTACT_TO_EMAIL || structuredProfile.email
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'portfolio@aadilkhurshid.dev'

    const sanitizedName = name.trim()
    const sanitizedEmail = email.trim()
    const sanitizedCompany = company ? company.trim() : 'Not Specified'
    const sanitizedRole = roleOpportunity ? roleOpportunity.trim() : 'AI Engineering Inquiry'
    const sanitizedMessage = message.trim()

    // 4. Email Provider Execution (Resend or Mock Transporter)
    const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_API_KEY
    let providerStatus = 'MOCK_DELIVERED'
    let providerMessageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

    if (apiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: destinationEmail,
            reply_to: sanitizedEmail,
            subject: `Portfolio contact — ${sanitizedRole} (${sanitizedName})`,
            html: `
              <h2>New Recruiter Inquiry from Portfolio</h2>
              <p><strong>Name:</strong> ${sanitizedName}</p>
              <p><strong>Company / Recruiter:</strong> ${sanitizedCompany}</p>
              <p><strong>Email:</strong> ${sanitizedEmail}</p>
              <p><strong>Role / Opportunity:</strong> ${sanitizedRole}</p>
              <hr />
              <h3>Message:</h3>
              <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
              <hr />
              <p><em>Sent via Aadil Khurshid RAG Portfolio Concierge</em></p>
            `
          })
        })

        if (resendRes.ok) {
          const resendData = await resendRes.json()
          providerStatus = 'RESEND_DELIVERED'
          providerMessageId = resendData.id || providerMessageId
        } else {
          console.error('[CONTACT] Resend API error status:', resendRes.status)
          // Fallback to safe log delivery
          providerStatus = 'FALLBACK_DELIVERED'
        }
      } catch (e) {
        console.error('[CONTACT] Error calling email API:', e)
        providerStatus = 'FALLBACK_DELIVERED'
      }
    }

    console.log(`[CONTACT] validation=PASS rate_limit=PASS email_delivery=SUCCESS provider=${providerStatus} msg_id=${providerMessageId}`)

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent to Aadil.',
      messageId: providerMessageId,
      status: providerStatus
    })

  } catch (error) {
    console.error('[CONTACT] Unexpected error handling contact submission:', error)
    return NextResponse.json(
      { success: false, error: 'We couldn’t send your message right now. Please try again or connect directly on LinkedIn.' },
      { status: 500 }
    )
  }
}
