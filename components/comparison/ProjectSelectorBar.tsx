'use client'

import React from 'react'
import { COMPARISON_PRESETS } from '@/data/comparison/comparisonPresets'
import { PROJECT_COMPARISONS } from '@/data/comparison/projectComparisons'
import { ComparisonPreset } from '@/data/comparison/types'

interface ProjectSelectorBarProps {
  selectedSlugs: string[]
  onSelectProject: (slug: string) => void
  onRemoveProject: (slug: string) => void
  onApplyPreset: (preset: ComparisonPreset) => void
  onReset: () => void
  activePresetId: string | null
}

const ALL_PROJECT_KEYS = Object.keys(PROJECT_COMPARISONS)

export default function ProjectSelectorBar({
  selectedSlugs,
  onSelectProject,
  onRemoveProject,
  onApplyPreset,
  onReset,
  activePresetId,
}: ProjectSelectorBarProps) {
  const isMaxSelected = selectedSlugs.length >= 3

  return (
    <section aria-labelledby="comparison-selector-heading" className="space-y-6">
      {/* Curated Presets Bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-semibold">
              Curated Presets
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              (High-contrast architectural pairs & trios)
            </span>
          </div>
          <button
            onClick={onReset}
            className="text-xs text-neutral-400 hover:text-neutral-200 underline font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1.5 py-0.5"
            title="Reset to default comparison"
          >
            Reset Default
          </button>
        </div>

        <div
          role="group"
          aria-label="Curated architectural comparison presets"
          className="flex flex-wrap gap-2"
        >
          {COMPARISON_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id
            return (
              <button
                key={preset.id}
                onClick={() => onApplyPreset(preset)}
                aria-pressed={isActive}
                className={`text-xs px-3 py-1.5 rounded border transition-all text-left flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-medium shadow-sm shadow-emerald-900/30 ring-1 ring-emerald-500/50'
                    : 'bg-[#14171A] border-[#262B32] text-neutral-300 hover:border-neutral-500 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] text-emerald-400 font-bold">{preset.id}</span>
                <span>{preset.title.split(' vs ')[0]} <span className="text-neutral-400">vs</span> {preset.title.split(' vs ')[1]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Project Multi-Select Matrix */}
      <div className="p-4 rounded-lg bg-[#14171A] border border-[#262B32]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h2 id="comparison-selector-heading" className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
              Select Projects to Compare
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-emerald-400">
                {selectedSlugs.length} of 3 selected
              </span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Choose 2 or 3 projects to evaluate side-by-side across all 10 architectural dimensions.
            </p>
          </div>
          {isMaxSelected && (
            <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded">
              Maximum 3 projects reached (remove one to add another)
            </span>
          )}
        </div>

        {/* Project Selection Pills */}
        <div
          role="group"
          aria-label="Portfolio projects available for comparison"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2"
        >
          {ALL_PROJECT_KEYS.map((slug) => {
            const project = PROJECT_COMPARISONS[slug]
            const isSelected = selectedSlugs.includes(slug)
            const canSelect = isSelected || !isMaxSelected

            return (
              <button
                key={slug}
                onClick={() => {
                  if (isSelected) {
                    if (selectedSlugs.length > 2) {
                      onRemoveProject(slug)
                    }
                  } else if (canSelect) {
                    onSelectProject(slug)
                  }
                }}
                disabled={!isSelected && isMaxSelected}
                aria-pressed={isSelected}
                className={`p-2 rounded text-left text-xs transition-all border flex flex-col justify-between min-h-[64px] ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/70 text-white ring-1 ring-emerald-500/40 shadow-sm'
                    : canSelect
                    ? 'bg-[#181C21] border-[#262B32] text-neutral-300 hover:border-neutral-500 hover:text-white'
                    : 'bg-[#181C21]/40 border-[#262B32]/40 text-neutral-500 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="font-semibold leading-tight line-clamp-1">{project.name}</span>
                  {isSelected && (
                    <span
                      aria-label="Selected"
                      className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-black text-[9px] font-bold shrink-0"
                    >
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-neutral-400 line-clamp-1 font-mono mt-1">
                  {project.category}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Selection Chips */}
        <div className="mt-4 pt-3 border-t border-[#262B32]/60 flex flex-wrap items-center gap-2">
          <span className="text-xs text-neutral-400 font-mono">Active Set:</span>
          {selectedSlugs.map((slug) => {
            const project = PROJECT_COMPARISONS[slug]
            const canRemove = selectedSlugs.length > 2
            return (
              <span
                key={slug}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181C21] border border-emerald-600/40 text-xs text-neutral-200"
              >
                <span className="font-medium">{project.name}</span>
                {canRemove ? (
                  <button
                    onClick={() => onRemoveProject(slug)}
                    aria-label={`Remove ${project.name} from comparison`}
                    className="text-neutral-400 hover:text-rose-400 ml-0.5 rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    ×
                  </button>
                ) : (
                  <span className="text-[10px] text-neutral-500 font-mono ml-0.5" title="Minimum 2 projects required">
                    (min)
                  </span>
                )}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}

