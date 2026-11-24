import { StructuredProfileData } from '@/types/rag'

/**
 * AUTHORITATIVE STRUCTURED PROFILE
 * This configuration serves as the canonical ground truth for profile,
 * contact destinations, verified URLs, and professional positioning.
 * 
 * Strict rule: NEVER invent contact details. Missing destinations are
 * explicitly set to null and flagged for human confirmation.
 */
export const structuredProfile: StructuredProfileData = {
  name: 'Mohemmed Aadil Khurshid',
  legalOrFormalName: 'Mohemmed Aadil Khurshid',
  verifiedRoles: [
    'AI Systems Engineer (Portfolio Positioning)',
    'AI Engineer / Python Backend Developer (Resume Header)',
    'AI Engineer / Consultant, AI/ML Team (Wayground 2026)',
    'Subject Matter Expert — Mathematics (Wayground 2024–2025)'
  ],
  portfolioPositioning:
    'AI Systems Engineer building reliable software systems around AI: LangGraph agentic workflows, deterministic verification harnesses, high-throughput ETL pipelines, and CAD/physics synthesis.',
  
  // Contact Channels
  email: 'aadil.khurshid95@gmail.com',
  secondaryEmail: 'aadilkhurshid.ai@gmail.com',
  phone: '+91-7973949541', // Extracted from verified resume
  whatsappDestination: null, // PLACEHOLDER: Unverified. Flagged for human completion. NEVER invent phone/wa link.
  
  // External Profiles
  linkedinUrl: 'https://www.linkedin.com/in/mohemmed-aadil-khurshid/',
  githubUrls: {
    primary: 'https://github.com/aadil-lang',
    legacyOrAlternate: 'https://github.com/aadilkhurshid'
  },
  portfolioUrl: 'https://portfolio-ecru-five-5vd5okcvgi.vercel.app/',
  
  location: 'Varanasi, Uttar Pradesh, India',
  openToWork: true,
  
  // Verified Educational Credentials from Resume
  education: [
    {
      degree: 'B.Tech (Hons.) in Mechanical Engineering',
      institution: 'Lovely Professional University',
      year: 2017,
      grade: 'CGPA 7.66 / 10',
      verified: true
    },
    {
      degree: 'Senior Secondary (Class XII), CBSE',
      institution: 'Manas Convent School',
      year: 2013,
      grade: '73.20%',
      verified: true
    },
    {
      degree: 'Secondary (Class X), CBSE',
      institution: 'Sunbeam School, Mughalsarai',
      year: 2011,
      grade: 'CGPA 9.40 / 10',
      verified: true
    }
  ],
  
  languages: ['English (Professional)', 'Hindi (Native)', 'Urdu (Proficient)'],
  lastVerified: '2026-09-29'
}
