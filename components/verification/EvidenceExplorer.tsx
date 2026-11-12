"use client"

import React, { useState, useMemo } from 'react'
import { evidenceRegistry } from '../../data/verification/evidenceRegistry'
import { VerificationModality, VerificationStatus } from '../../data/verification/types'
import EvidenceCard from './EvidenceCard'
import { Search, Filter, X, SlidersHorizontal, Database } from 'lucide-react'

interface EvidenceExplorerProps {
  initialProjectSlug?: string
}

const MODALITIES: { label: string; value: VerificationModality | 'ALL' }[] = [
  { label: 'All Modalities', value: 'ALL' },
  { label: 'Automated Test Suites', value: 'automated-suite' },
  { label: 'Math Calculus', value: 'mathematical-verification' },
  { label: 'Golden IR Benchmarks', value: 'golden-benchmark' },
  { label: 'Deterministic Gates', value: 'deterministic-boundary' },
  { label: 'Security & Containment', value: 'security-containment' },
  { label: 'Performance & Cache', value: 'performance-cache' },
  { label: 'Architectural Invariants', value: 'architectural-invariant' }
]

const STATUSES: { label: string; value: VerificationStatus | 'ALL' }[] = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Verified', value: 'VERIFIED' },
  { label: 'Qualified', value: 'QUALIFIED' }
]

export default function EvidenceExplorer({ initialProjectSlug }: EvidenceExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedModality, setSelectedModality] = useState<VerificationModality | 'ALL'>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<VerificationStatus | 'ALL'>('ALL')
  const [selectedProject, setSelectedProject] = useState<string>(initialProjectSlug || 'ALL')

  // Extract unique projects for dropdown
  const projectsList = useMemo(() => {
    const map = new Map<string, string>()
    for (const ev of evidenceRegistry) {
      if (!map.has(ev.projectSlug)) {
        map.set(ev.projectSlug, ev.projectName)
      }
    }
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }))
  }, [])

  // Filter evidence
  const filteredEvidence = useMemo(() => {
    return evidenceRegistry.filter((ev) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesQuery =
          ev.id.toLowerCase().includes(query) ||
          ev.title.toLowerCase().includes(query) ||
          ev.summary.toLowerCase().includes(query) ||
          ev.projectName.toLowerCase().includes(query) ||
          ev.sourceFile.toLowerCase().includes(query) ||
          ev.verificationMethod.toLowerCase().includes(query)
        if (!matchesQuery) return false
      }

      // Modality filter
      if (selectedModality !== 'ALL' && ev.category !== selectedModality) {
        return false
      }

      // Status filter
      if (selectedStatus !== 'ALL' && ev.status !== selectedStatus) {
        return false
      }

      // Project filter
      if (selectedProject !== 'ALL' && ev.projectSlug !== selectedProject) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedModality, selectedStatus, selectedProject])

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedModality !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    selectedProject !== 'ALL'

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedModality('ALL')
    setSelectedStatus('ALL')
    setSelectedProject('ALL')
  }

  return (
    <section aria-labelledby="explorer-heading" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262B32] pb-4">
        <div>
          <h2 id="explorer-heading" className="text-xl font-serif font-bold text-[#F0EEE9] tracking-tight">
            Interactive Evidence Explorer
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Filter and inspect all 33 master evidence records by verification modality, status, or system.
          </p>
        </div>

        {/* Results Counter & Clear */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs text-[#9CA3AF] bg-[#161A1F] px-3 py-1 rounded border border-[#262B32]"
            aria-live="polite"
          >
            Showing <strong className="text-[#F0EEE9]">{filteredEvidence.length}</strong> of {evidenceRegistry.length} records
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs font-mono text-[#D99B26] hover:text-[#F0B84D] px-2.5 py-1 rounded bg-[#261E14] border border-[#D99B26]/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Search Input & Project Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-[#858A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, keyword, file path (e.g. EVID-EDA-01, pytest, Saint-Venant)..."
            className="w-full pl-10 pr-4 py-2 bg-[#14171A] border border-[#262B32] focus:border-[#5A9A78] rounded-md text-xs text-[#F0EEE9] placeholder-[#6B7280] outline-none font-mono transition-colors"
            aria-label="Search evidence records"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858A90] hover:text-[#F0EEE9]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Project Selector */}
        <div className="relative">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full px-3 py-2 bg-[#14171A] border border-[#262B32] focus:border-[#5A9A78] rounded-md text-xs text-[#E5E7EB] font-mono outline-none appearance-none cursor-pointer transition-colors"
            aria-label="Filter by project"
          >
            <option value="ALL">All Systems & Projects ({projectsList.length})</option>
            {projectsList.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#858A90] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Filter Pills: Modalities & Status */}
      <div className="space-y-3 pt-1">
        {/* Modality Filter */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="font-mono text-[11px] text-[#6B7280] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>MODALITY:</span>
          </span>
          {MODALITIES.map((mod) => {
            const isSelected = selectedModality === mod.value
            return (
              <button
                key={mod.value}
                type="button"
                onClick={() => setSelectedModality(mod.value)}
                aria-pressed={isSelected}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors border ${
                  isSelected
                    ? 'bg-[#1C2820] border-[#5A9A78] text-[#A3E5C2] font-semibold'
                    : 'bg-[#14171A] border-[#262B32] text-[#858A90] hover:text-[#E5E7EB] hover:bg-[#181C21]'
                }`}
              >
                {mod.label}
              </button>
            )
          })}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="font-mono text-[11px] text-[#6B7280] mr-1 flex items-center gap-1">
            <span>STATUS:</span>
          </span>
          {STATUSES.map((st) => {
            const isSelected = selectedStatus === st.value
            return (
              <button
                key={st.value}
                type="button"
                onClick={() => setSelectedStatus(st.value)}
                aria-pressed={isSelected}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors border ${
                  isSelected
                    ? 'bg-[#1C2820] border-[#5A9A78] text-[#A3E5C2] font-semibold'
                    : 'bg-[#14171A] border-[#262B32] text-[#858A90] hover:text-[#E5E7EB] hover:bg-[#181C21]'
                }`}
              >
                {st.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Evidence Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEvidence.map((ev) => (
          <EvidenceCard key={ev.id} evidence={ev} />
        ))}
      </div>

      {/* Empty State */}
      {filteredEvidence.length === 0 && (
        <div className="text-center py-12 px-4 rounded-lg border border-dashed border-[#262B32] bg-[#14171A]/50">
          <Database className="w-8 h-8 text-[#6B7280] mx-auto mb-3" />
          <h3 className="font-serif font-bold text-base text-[#E5E7EB]">No Evidence Records Found</h3>
          <p className="text-xs text-[#9CA3AF] mt-1 max-w-md mx-auto">
            No registered evidence records matched your current query or filter selections. Try relaxing the filters or resetting.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 px-3.5 py-1.5 rounded bg-[#1C2128] hover:bg-[#252B34] text-xs font-mono text-[#F0EEE9] border border-[#2B313A] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  )
}

