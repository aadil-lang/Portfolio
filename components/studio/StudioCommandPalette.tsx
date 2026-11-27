'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Search,
  Terminal,
  Layers,
  FlaskConical,
  BookOpen,
  User,
  Sparkles,
  FileText,
  Clock,
  ArrowRight,
  X,
  ShieldCheck,
  Cpu
} from 'lucide-react'
import { STUDIO_STATIONS } from '@/data/studioStations'
import { getCanonicalProjectsMetadata } from '@/data/adapters/projectsAdapter'
import { profile } from '@/data/profile'

interface PaletteItem {
  id: string
  category: 'SPACES' | 'SYSTEMS' | 'ACTIONS & TOOLS'
  title: string
  subtitle: string
  href?: string
  action?: () => void
  icon: React.ElementType
  badge?: string
}

export function StudioCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const projects = getCanonicalProjectsMetadata()

  // Build searchable index
  const items: PaletteItem[] = [
    // Spaces
    ...STUDIO_STATIONS.map((station) => ({
      id: `space-${station.id}`,
      category: 'SPACES' as const,
      title: station.title,
      subtitle: station.subtitle,
      href: station.route,
      icon:
        station.id === 'workbench'
          ? Terminal
          : station.id === 'systems-lab'
          ? Layers
          : station.id === 'experiment-lab'
          ? FlaskConical
          : station.id === 'journal'
          ? BookOpen
          : User,
      badge: station.number
    })),
    // Actions & Quick Tools
    {
      id: 'action-ask-aadil',
      category: 'ACTIONS & TOOLS' as const,
      title: 'Ask Aadil Conversational Agent',
      subtitle: 'Stateful grounded portfolio assistant with voice support',
      action: () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-ask-aadil'))
        }
      },
      icon: Sparkles,
      badge: 'Agent'
    },
    {
      id: 'action-resume',
      category: 'ACTIONS & TOOLS' as const,
      title: 'View Canonical Resume (PDF)',
      subtitle: 'Verified 2-page engineering resume',
      href: profile.resumeUrl,
      icon: FileText,
      badge: 'PDF'
    },
    {
      id: 'action-recruiter',
      category: 'ACTIONS & TOOLS' as const,
      title: 'Recruiter 30-Second Quick View',
      subtitle: 'Executive summary, core stack, and quick links',
      href: '/recruiter',
      icon: Clock,
      badge: '30s'
    },
    {
      id: 'action-rag-lab',
      category: 'ACTIONS & TOOLS' as const,
      title: 'RAG Lab & Retrieval Evaluation',
      subtitle: 'Interactive testbed for hybrid BM25 and vector retrieval',
      href: '/rag-lab',
      icon: FlaskConical,
      badge: 'Interactive'
    },
    {
      id: 'action-verification',
      category: 'ACTIONS & TOOLS' as const,
      title: 'Verification & Evidence Dashboard',
      subtitle: '33 master evidence records and 771 automated checks',
      href: '/verification',
      icon: ShieldCheck,
      badge: 'Evidence'
    },
    // Systems
    ...projects.map((proj) => ({
      id: `proj-${proj.slug}`,
      category: 'SYSTEMS' as const,
      title: proj.title,
      subtitle: proj.summary || proj.role || 'AI Engineering System',
      href: `/systems/${proj.slug}`,
      icon: Cpu,
      badge: proj.ownership ? proj.ownership.replace(/_/g, ' ') : 'SYSTEM'
    }))
  ]

  // Filter items
  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    )
  })

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    // Custom event to open palette from anywhere
    const handleOpenCustom = () => setIsOpen(true)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-studio-palette', handleOpenCustom)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-studio-palette', handleOpenCustom)
    }
  }, [isOpen])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle keyboard navigation inside palette
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = filteredItems[selectedIndex]
      if (selected) {
        executeItem(selected)
      }
    }
  }

  const executeItem = (item: PaletteItem) => {
    setIsOpen(false)
    if (item.action) {
      item.action()
    } else if (item.href) {
      if (item.href.startsWith('http') || item.href.endsWith('.pdf')) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(item.href)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-[#2B3542] bg-[#121518] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-[#F0EEE9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#242930] bg-[#161B22]/80">
          <Search className="w-5 h-5 text-[#78C29A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search spaces, systems, and evidence..."
            className="flex-1 bg-transparent text-sm text-[#F0EEE9] placeholder-[#71899A] outline-none font-sans"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#2B3542] bg-[#1E232A] text-[#9EA4AA]">
              ESC to close
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-[#71899A] hover:text-[#F0EEE9] transition-colors"
              aria-label="Close command palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-[#20252D]">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-[#71899A]">
              No matching spaces, systems, or actions found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div>
              {filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex
                const IconComponent = item.icon
                return (
                  <div
                    key={item.id}
                    onClick={() => executeItem(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#1C2621] text-white border border-[#5A9A78]/40 shadow-xs'
                        : 'text-[#C8C6BF] hover:bg-[#161B22]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#223B2D] border-[#78C29A]/50 text-[#78C29A]'
                            : 'bg-[#181C21] border-[#2A313C] text-[#9EA4AA]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold truncate text-[#F0EEE9]">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#1C2229] border border-[#2B3542] text-[#8BA0B2]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8BA0B2] truncate font-sans">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A6872] hidden sm:inline">
                        {item.category}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#78C29A]' : 'text-[#444E5D]'}`} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#20252D] bg-[#14181E] flex items-center justify-between text-[11px] font-mono text-[#71899A]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-[#1C2229] border border-[#2B3542] text-[#A2B4C2]">↑</kbd>{' '}
              <kbd className="px-1 py-0.5 rounded bg-[#1C2229] border border-[#2B3542] text-[#A2B4C2]">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#1C2229] border border-[#2B3542] text-[#A2B4C2]">↵</kbd> Select
            </span>
          </div>
          <span className="text-[#5A9A78] font-semibold">AADIL BUILDS // STUDIO COMMAND</span>
        </div>
      </div>
    </div>
  )
}
