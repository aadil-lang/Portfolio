'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { COMPARISON_PRESETS } from '@/data/comparison/comparisonPresets'
import { PROJECT_COMPARISONS } from '@/data/comparison/projectComparisons'
import {
  ComparisonDimensionId,
  ComparisonPreset,
  ProjectComparisonProfile,
} from '@/data/comparison/types'
import ProjectSelectorBar from './ProjectSelectorBar'
import ComparisonMatrix from './ComparisonMatrix'
import TradeOffDeepDive from './TradeOffDeepDive'
import ComparisonEvidenceDrawer from './ComparisonEvidenceDrawer'

const DEFAULT_SLUGS = ['ask-aadil', 'atlas-ai']

export default function ComparisonWorkspace() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  // Initialize selected projects from searchParams or default
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    const pParam = searchParams.get('projects')
    if (pParam) {
      const parsed = pParam.split(',').filter((s) => PROJECT_COMPARISONS[s])
      if (parsed.length >= 2 && parsed.length <= 3) {
        return parsed
      }
    }
    return DEFAULT_SLUGS
  })

  const [activePresetId, setActivePresetId] = useState<string | null>(() => {
    const presetParam = searchParams.get('preset')
    if (presetParam && COMPARISON_PRESETS.some((p) => p.id === presetParam)) {
      return presetParam
    }
    // Check if initial matches default preset PRESET-01
    return 'PRESET-01'
  })

  const [activeDimensionFilter, setActiveDimensionFilter] = useState<ComparisonDimensionId | 'all'>('all')

  // Sync state to URL without full page reload
  const updateUrl = (slugs: string[], presetId: string | null) => {
    startTransition(() => {
      const params = new URLSearchParams()
      params.set('projects', slugs.join(','))
      if (presetId) {
        params.set('preset', presetId)
      }
      router.replace(`/compare?${params.toString()}`, { scroll: false })
    })
  }

  // Handle Project Selection
  const handleSelectProject = (slug: string) => {
    if (selectedSlugs.includes(slug)) return
    if (selectedSlugs.length >= 3) return

    const updated = [...selectedSlugs, slug]
    setSelectedSlugs(updated)
    setActivePresetId(null) // Custom selection breaks preset
    updateUrl(updated, null)
  }

  // Handle Project Removal
  const handleRemoveProject = (slug: string) => {
    if (selectedSlugs.length <= 2) return // Minimum 2 projects required
    const updated = selectedSlugs.filter((s) => s !== slug)
    setSelectedSlugs(updated)
    setActivePresetId(null)
    updateUrl(updated, null)
  }

  // Handle Preset Application
  const handleApplyPreset = (preset: ComparisonPreset) => {
    const slugs = [...preset.projectSlugs]
    setSelectedSlugs(slugs)
    setActivePresetId(preset.id)
    setActiveDimensionFilter(preset.keyContrastDimension)
    updateUrl(slugs, preset.id)
  }

  // Reset to default
  const handleReset = () => {
    setSelectedSlugs(DEFAULT_SLUGS)
    setActivePresetId('PRESET-01')
    setActiveDimensionFilter('all')
    updateUrl(DEFAULT_SLUGS, 'PRESET-01')
  }

  // Get active profile objects
  const activeProjects: ProjectComparisonProfile[] = selectedSlugs
    .map((slug) => PROJECT_COMPARISONS[slug])
    .filter(Boolean)

  const activePreset = COMPARISON_PRESETS.find((p) => p.id === activePresetId)

  return (
    <div className="space-y-10">
      {/* =====================================================================
          SECTION 1: WORKSPACE HEADER & GOVERNANCE NOTICE
          ===================================================================== */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Engineering Comparison Workspace</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32]">
              11 Case Studies
            </span>
            <span className="px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32]">
              10 Dimensions
            </span>
            <span className="px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32]">
              0 Vanity Scores
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
            Architectural Project Comparison
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-4xl mt-3 leading-relaxed">
            Side-by-side engineering evaluation across architectural paradigms, deterministic boundaries,
            retrieval topologies, and real-world failure containment strategies.
          </p>
        </div>

        {/* Governance banner */}
        <div className="p-3.5 rounded-lg bg-[#14171A] border border-[#262B32] flex items-start gap-3 text-xs text-neutral-400">
          <span className="text-emerald-400 font-mono text-sm leading-none shrink-0 mt-0.5">ℹ</span>
          <div className="leading-relaxed">
            <strong className="text-neutral-200">Engineering Judgment Standard:</strong> This comparison
            workspace avoids subjective scores (e.g. &quot;Complexity: 9/10&quot;) or podium rankings. Every contrast is
            grounded in verified repository source files, Phase 6.4 test evidence (<code className="text-neutral-300 font-mono">EVID-*</code>),
            and documented architectural decision records (<code className="text-neutral-300 font-mono">ADR-*</code>).
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 2: PROJECT SELECTOR & CURATED PRESETS
          ===================================================================== */}
      <ProjectSelectorBar
        selectedSlugs={selectedSlugs}
        onSelectProject={handleSelectProject}
        onRemoveProject={handleRemoveProject}
        onApplyPreset={handleApplyPreset}
        onReset={handleReset}
        activePresetId={activePresetId}
      />

      {/* Active Preset Focus Card (if a preset is active) */}
      {activePreset && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-[#14171A] border border-emerald-500/30 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono text-xs font-bold border border-emerald-600/40">
                {activePreset.id} Focus
              </span>
              <h2 className="text-sm font-semibold text-neutral-100">{activePreset.title}</h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Key Contrast: <span className="text-emerald-400 uppercase font-semibold">{activePreset.keyContrastDimension}</span>
            </span>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">{activePreset.rationale}</p>

          <div className="pt-2 border-t border-emerald-950/60 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {activePreset.focusTakeaways.map((takeaway, tIdx) => (
              <div key={tIdx} className="p-2 rounded bg-[#101316]/70 border border-[#262B32]/70 text-neutral-300 text-[11px] leading-snug">
                <span className="text-emerald-400 font-bold block mb-1">Key Insight {tIdx + 1}:</span>
                {takeaway}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: SIDE-BY-SIDE ARCHITECTURAL COMPARISON MATRIX
          ===================================================================== */}
      <ComparisonMatrix
        projects={activeProjects}
        activeDimensionFilter={activeDimensionFilter}
        onSelectDimensionFilter={setActiveDimensionFilter}
      />

      {/* =====================================================================
          SECTION 4: ARCHITECTURAL TRADE-OFF DEEP DIVE
          ===================================================================== */}
      <TradeOffDeepDive projects={activeProjects} />

      {/* =====================================================================
          SECTION 5: EVIDENCE PROVENANCE & GOVERNANCE DRAWER
          ===================================================================== */}
      <ComparisonEvidenceDrawer projects={activeProjects} />
    </div>
  )
}

