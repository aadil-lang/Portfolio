'use client'

import React from 'react'
import RagLabDashboard from '@/components/rag-lab/RagLabDashboard'
import { ExecutiveSummary } from '@/components/shared/ExecutiveSummary'

export default function RagLabPage() {
  return (
    <div className="min-h-screen bg-[#101316] text-[#F0EEE9] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ExecutiveSummary
          badgeLabel="RECRUITER BRIEF // RAG ENGINEERING"
          title="Why this matters"
          summary="Explore how lexical and vector-space retrieval, hybrid ranking, context budgets and evidence validation influence grounded AI responses."
          supportingMessage="Experiment with retrieval strategies, inspect ranked evidence, compare retrieval quality, and observe when the system should abstain because the available evidence is insufficient."
          accentColor="emerald"
        />
        <RagLabDashboard />
      </div>
    </div>
  )
}

