import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import ComparisonWorkspace from '@/components/comparison/ComparisonWorkspace'

export const metadata: Metadata = {
  title: 'Interactive Project Comparison — Mohemmed Aadil Khurshid | AI Systems Engineer',
  description:
    'Side-by-side engineering evaluation across 11 case studies comparing architectural paradigms, AI vs deterministic boundaries, retrieval models, failure containment, and real-world trade-offs.',
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-[#101316] text-neutral-100 selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-neutral-400">Loading Comparison Workspace...</span>
              </div>
            </div>
          }
        >
          <ComparisonWorkspace />
        </Suspense>
      </div>
    </main>
  )
}

