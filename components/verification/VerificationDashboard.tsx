"use client"

import React, { useState } from 'react'
import VerificationCommandDeck from './VerificationCommandDeck'
import SystemVerificationMatrix from './SystemVerificationMatrix'
import EvidenceExplorer from './EvidenceExplorer'
import QuantitativeClaimsComparison from './QuantitativeClaimsComparison'
import DocumentedLimitationsDrawer from './DocumentedLimitationsDrawer'
import ReproductionCenter from './ReproductionCenter'
import { ShieldCheck, Layers, Database, AlertTriangle, Terminal, Cpu } from 'lucide-react'

export default function VerificationDashboard() {
  const [filterProject, setFilterProject] = useState<string | undefined>(undefined)

  const handleSelectProjectFromMatrix = (slug: string) => {
    setFilterProject(slug)
    const explorerEl = document.getElementById('evidence-explorer-section')
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#101316] text-[#E5E7EB] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Navigation Quick Bar */}
        <nav
          aria-label="Verification Dashboard Sections"
          className="sticky top-16 z-30 bg-[#121518]/95 backdrop-blur-md border border-[#242930] rounded-lg p-2 flex items-center justify-between overflow-x-auto gap-2 font-mono text-xs shadow-md"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <a
              href="#command-deck-heading"
              className="px-3 py-1.5 rounded hover:bg-[#1E232A] text-[#9CA3AF] hover:text-[#F0EEE9] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-[#5A9A78]" />
              <span>Overview</span>
            </a>
            <a
              href="#matrix-heading"
              className="px-3 py-1.5 rounded hover:bg-[#1E232A] text-[#9CA3AF] hover:text-[#F0EEE9] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>System Matrix</span>
            </a>
            <a
              href="#explorer-heading"
              className="px-3 py-1.5 rounded hover:bg-[#1E232A] text-[#9CA3AF] hover:text-[#F0EEE9] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-[#A371F7]" />
              <span>Evidence Explorer</span>
            </a>
            <a
              href="#claims-heading"
              className="px-3 py-1.5 rounded hover:bg-[#1E232A] text-[#9CA3AF] hover:text-[#F0EEE9] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#78C29A]" />
              <span>Quantitative Claims</span>
            </a>
            <a
              href="#limitations-heading"
              className="px-3 py-1.5 rounded hover:bg-[#1E232A] text-[#9CA3AF] hover:text-[#F0EEE9] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#D99B26]" />
              <span>Limitations & Gaps</span>
            </a>
            <a
              href="#reproduction-heading"
              className="px-3 py-1.5 rounded hover:bg-[#1E232A] text-[#9CA3AF] hover:text-[#F0EEE9] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-[#5A9A78]" />
              <span>Reproduction Center</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#6B7280] pr-2">
            <span>758 In-Repo Checks</span>
            <span>•</span>
            <span>1,650+ Upstream Tests</span>
          </div>
        </nav>

        {/* Section 1: Verification Command Deck */}
        <VerificationCommandDeck />

        {/* Section 2: System Verification Matrix */}
        <SystemVerificationMatrix onSelectProject={handleSelectProjectFromMatrix} />

        {/* Section 3: Interactive Evidence Explorer */}
        <div id="evidence-explorer-section">
          <EvidenceExplorer initialProjectSlug={filterProject} />
        </div>

        {/* Section 4: Quantitative Claims & Nuances */}
        <QuantitativeClaimsComparison />

        {/* Section 5: Documented Limitations & Gaps */}
        <DocumentedLimitationsDrawer />

        {/* Section 6: Reproduction Center */}
        <ReproductionCenter />
      </div>
    </div>
  )
}

