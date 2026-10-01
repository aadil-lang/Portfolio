import { POST } from '../app/api/contact/route'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

// Read .env.local natively
try {
  const envLocalPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf8')
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        const key = match[1]
        let value = match[2] || ''
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
        process.env[key] = value.trim()
      }
    })
  }
} catch (e) {
  // Ignore
}

async function testLiveEmailDelivery() {
  console.log('Testing live contact form submission with Resend API key...')
  console.log('RESEND_API_KEY present:', Boolean(process.env.RESEND_API_KEY))

  const mockReq = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '127.0.0.1'
    },
    body: JSON.stringify({
      name: 'Verification Recruiter Test',
      company: 'Antigravity Verification Suite',
      email: 'recruiter.test@example.com',
      roleOpportunity: 'AI Engineer Verification Test',
      message: 'This is an automated verification test confirming live Resend API delivery for Aadil Khurshid portfolio concierge.'
    })
  })

  const res = await POST(mockReq)
  const data = await res.json()

  console.log('Status code:', res.status)
  console.log('Response body:', data)

  if (res.ok && data.success) {
    console.log('✓ LIVE CONTACT EMAIL TEST PASSED! Resend delivery confirmed.')
  } else {
    console.error('✗ CONTACT EMAIL TEST FAILED:', data.error)
    process.exit(1)
  }
}

testLiveEmailDelivery().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
