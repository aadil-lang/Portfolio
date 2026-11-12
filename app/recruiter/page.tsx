import type { Metadata } from 'next'
import RecruiterQuickView from '@/components/recruiter/RecruiterQuickView'

export const metadata: Metadata = {
  title: 'Recruiter Quick View — Mohemmed Aadil Khurshid | AI Systems Engineer',
  description:
    '30-second executive summary for technical recruiters and hiring managers: verified capabilities in agentic orchestration, LLMs & RAG, Python backend engineering, flagship project outcomes, and career trajectory.'
}

export default function RecruiterPage() {
  return <RecruiterQuickView />
}

