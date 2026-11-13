import type { Metadata } from 'next'
import VerificationDashboard from '@/components/verification/VerificationDashboard'
import { ExecutiveSummary } from '@/components/shared/ExecutiveSummary'

export const metadata: Metadata = {
  title: 'Verification & Evidence Dashboard — Mohemmed Aadil Khurshid | AI Systems Engineer',
  description:
    'Source-grounded audit of all engineering claims, 758 automated assertions, 1,650+ upstream tests, CAD calculus proofs, and golden retrieval benchmarks across the portfolio.'
}

export default function VerificationPage() {
  return (
    <div className="space-y-6">
      <div className="container mx-auto px-4 max-w-7xl pt-2">
        <ExecutiveSummary
          badgeLabel="EVIDENCE & RIGOR // VERIFICATION"
          title="Why this matters"
          summary="Inspect the portfolio's evidence registry, quantitative claims, reproduction instructions and verification results."
          supportingMessage="Trace engineering claims to supporting evidence, review known limitations, compare reported metrics, and verify exactly 33 master evidence records, 15 system verification summaries, 771 dedicated verification checks, and 758 assertions in earlier regression baseline across dedicated dashboard checks, regression baselines, and upstream project suites."
          accentColor="purple"
        />
      </div>
      <VerificationDashboard />
    </div>
  )
}

