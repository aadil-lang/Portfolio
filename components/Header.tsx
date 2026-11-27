"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '../data/profile'
import {
  Menu,
  X,
  FileText,
  Github,
  Linkedin,
  Sparkles,
  Zap,
  Compass,
  Cpu,
  Layers,
  BookOpen,
  Database,
  ShieldCheck,
  GitCompare,
  Mail,
  FlaskConical,
  Search,
  User,
  Terminal
} from 'lucide-react'

// 5 Studio Spaces Navigation Hubs (Preserving canonical Phase 7.4 contracts)
const primaryNavLinks = [
  { name: 'Systems', href: '/systems', note: 'Technical Archive & Systems Catalog', studioLabel: 'Workbench' },
  { name: 'Architecture', href: '/architecture', note: 'Interactive Execution & Component Explorer', studioLabel: 'Systems Lab' },
  { name: 'Experiments', href: '/experiments', note: 'Empirical Evals & Benchmarks', studioLabel: 'Experiment Lab' },
  { name: 'Journal', href: '/journal', note: 'Engineering Logbook & Decision Records', studioLabel: 'Journal' },
  { name: 'Experience', href: '/experience', note: 'Chronological Trajectory & Journey', studioLabel: 'About' }
]

// Secondary Tool & Connection Groups for Mobile Drawer & Full Navigation Map
const mobileDrawerGroups = {
  explore: [
    { name: 'Workbench', href: '/systems', icon: Terminal, note: 'Engineering Projects (12)' },
    { name: 'Systems Lab', href: '/architecture', icon: Layers, note: 'Interactive Component Explorer' },
    { name: 'Experiment Lab', href: '/experiments', icon: FlaskConical, note: 'Empirical Evals & Stress Tests' },
    { name: 'Journal', href: '/journal', icon: BookOpen, note: '8 Chapters & 18 ADRs' },
    { name: 'About', href: '/about', icon: User, note: 'Professional Background & Wayground' },
    { name: 'Experience', href: '/experience', icon: Compass, note: 'Full Chronological Trajectory' }
  ],
  tools: [
    { name: 'RAG Lab', href: '/rag-lab', icon: Database, note: 'Interactive Retrieval Evaluation' },
    { name: 'Verification', href: '/verification', icon: ShieldCheck, note: 'Portfolio Evidence Register (33 records)' },
    { name: 'Compare', href: '/compare', icon: GitCompare, note: 'Architectural Trade-Off Matrix' }
  ]
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const drawerRef = useRef<HTMLDivElement | null>(null)

  // Handle ESC key to close mobile drawer and return focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleOpenAskAadil = () => {
    setMobileMenuOpen(false)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-ask-aadil'))
    }
  }

  const handleOpenPalette = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-studio-palette'))
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#101316]/95 backdrop-blur-md border-b border-[#242930] transition-all">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Studio Identity */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg border border-[#3E4652] bg-[#161B21] flex items-center justify-center text-[#78C29A] font-mono font-bold text-xs group-hover:border-[#78C29A] transition-colors shadow-xs">
            AB
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-[#F0EEE9] tracking-tight text-base group-hover:text-white transition-colors">
                AADIL BUILDS
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#78C29A] animate-pulse" title="Studio Online • Open to Work" />
            </div>
            <span className="text-[9.5px] font-mono text-[#78C29A] tracking-wider uppercase font-semibold">
              AI Engineering Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation — 5 Studio Spaces + Command Search + Action Pills */}
        <nav className="hidden lg:flex gap-3 xl:gap-4 items-center text-xs font-mono" aria-label="Primary Navigation">
          {/* Studio Spaces Links */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#14181D] border border-[#262C34]">
            {primaryNavLinks.map((link) => {
              const isActive = Boolean(
                pathname &&
                  (pathname === link.href ||
                    (link.href === '/systems' && pathname.startsWith('/projects')) ||
                    (link.href === '/about' && (pathname.startsWith('/experience') || pathname.startsWith('/timeline'))) ||
                    (link.href !== '/' && pathname.startsWith(link.href)))
              )
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1 rounded transition-all text-xs font-semibold whitespace-nowrap ${
                    isActive
                      ? 'bg-[#222B36] text-[#F0EEE9] shadow-sm border border-[#3E4856]'
                      : 'text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#1A2027]'
                  }`}
                  title={link.note}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Studio Command Palette Quick Trigger */}
          <button
            type="button"
            onClick={handleOpenPalette}
            className="px-2.5 py-1 rounded bg-[#161B21] hover:bg-[#1E242C] border border-[#2B333D] hover:border-[#3E4A58] text-[#9EA4AA] hover:text-[#F0EEE9] text-[11px] font-mono flex items-center gap-2 transition-all cursor-pointer"
            aria-label="Open Studio Command Palette (Cmd+K)"
            title="Search Spaces, Systems, and Evidence (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#78C29A]" />
            <span className="hidden xl:inline text-[#8BA0B2]">Command</span>
            <kbd className="text-[10px] px-1 py-0.2 rounded bg-[#1F2630] border border-[#303B47] text-[#78C29A] font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Action Pills & Socials */}
          <div className="flex items-center gap-2 ml-1 pl-3 border-l border-[#242A32]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#71899A] hover:text-[#F0EEE9] hover:bg-[#1A2027] transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#71899A] hover:text-[#F0EEE9] hover:bg-[#1A2027] transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            {/* ASK AADIL TRIGGER BUTTON */}
            <button
              id="header-ask-aadil-btn"
              type="button"
              onClick={handleOpenAskAadil}
              className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-mono rounded border border-[#388BFD]/40 bg-[#162332] hover:bg-[#1E3247] text-[#58A6FF] hover:text-[#79B8FF] transition-colors shadow-xs font-semibold cursor-pointer whitespace-nowrap"
              title="Ask Aadil — Grounded Conversational Agent"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>Ask Aadil</span>
            </button>

            {/* RECRUITER QUICK VIEW */}
            <Link
              href="/recruiter"
              className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-mono rounded border transition-colors whitespace-nowrap ${
                pathname === '/recruiter'
                  ? 'border-[#5A9A78] bg-[#1A2E23] text-[#A3E5C2]'
                  : 'border-[#5A9A78]/40 bg-[#15231C] hover:bg-[#1D3227] text-[#78C29A] hover:text-[#97DBB5]'
              }`}
              title="Recruiter Quick View — 30s Executive Summary"
            >
              <Zap className="w-3.5 h-3.5 text-[#5A9A78]" />
              <span>Quick View</span>
            </Link>

            {/* RESUME PDF */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-mono rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#20252B] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[#71899A]" />
              <span>Resume</span>
            </a>
          </div>
        </nav>

        {/* Mobile Header Actions */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenPalette}
            className="p-1.5 text-[#858A90] hover:text-[#F0EEE9] rounded hover:bg-[#1E2228] transition-colors"
            aria-label="Open Search Palette"
          >
            <Search className="w-4 h-4 text-[#78C29A]" />
          </button>
          <button
            type="button"
            onClick={handleOpenAskAadil}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border border-[#388BFD]/40 bg-[#162332] text-[#58A6FF]"
            aria-label="Launch Ask Aadil"
          >
            <Sparkles className="w-3 h-3 text-[#58A6FF]" />
            <span>Ask</span>
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#858A90] hover:text-[#F0EEE9] rounded hover:bg-[#1E2228] transition-colors focus-visible:ring-1 focus-visible:ring-[#5A9A78] outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Grouped Architecture (SPACES, TOOLS, CONNECT) */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="lg:hidden border-b border-[#242930] bg-[#121518]/98 backdrop-blur-xl px-5 py-5 space-y-5 font-mono text-xs max-h-[calc(100vh-60px)] overflow-y-auto"
        >
          {/* Top Quick View Feature Link */}
          <Link
            href="/recruiter"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between py-2 px-3 rounded border font-bold transition-colors ${
              pathname === '/recruiter'
                ? 'border-[#5A9A78] bg-[#1A2E23] text-[#A3E5C2]'
                : 'border-[#5A9A78]/40 bg-[#15231C] text-[#78C29A] hover:bg-[#1D3227]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#5A9A78]" />
              <span>Recruiter Quick View (30s)</span>
            </div>
            <span className="text-[10px] text-[#5A9A78]">Curated Summary →</span>
          </Link>

          {/* Group 1: EXPLORE (Primary Studio Spaces) */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#686E77] font-semibold block px-1">
              EXPLORE
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {mobileDrawerGroups.explore.map((link) => {
                const Icon = link.icon
                const isActive = Boolean(
                  pathname &&
                    (pathname === link.href ||
                      (link.href === '/systems' && pathname.startsWith('/projects')) ||
                      (link.href !== '/' && pathname.startsWith(link.href)))
                )
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded border transition-colors ${
                      isActive
                        ? 'bg-[#1E232A] text-[#F0EEE9] border-[#3E4652] font-semibold'
                        : 'bg-[#15181C] text-[#9EA4AA] border-[#22272E] hover:text-[#F0EEE9] hover:bg-[#191D22]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#5A9A78]" />
                    <span>{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Group 2: TOOLS & BENCHMARKS */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#686E77] font-semibold block px-1">
              TOOLS & BENCHMARKS
            </span>
            <div className="space-y-1">
              {mobileDrawerGroups.tools.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-2 rounded border transition-colors ${
                      isActive
                        ? 'bg-[#1E232A] text-[#F0EEE9] border-[#3E4652] font-semibold'
                        : 'bg-[#15181C] text-[#9EA4AA] border-[#22272E] hover:text-[#F0EEE9] hover:bg-[#191D22]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-[#71899A]" />
                      <span>{link.name}</span>
                    </div>
                    <span className="text-[10px] text-[#686E77]">{link.note}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Group 3: CONNECT & ACTIONS */}
          <div className="space-y-1.5 pt-2 border-t border-[#22272E]">
            <span className="text-[10px] uppercase tracking-wider text-[#686E77] font-semibold block px-1">
              CONNECT & ACTIONS
            </span>
            <div className="flex flex-col gap-1.5">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded border border-[#22272E] bg-[#15181C] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#71899A]" />
                <span>Download Canonical Resume (PDF)</span>
              </a>
              <div className="flex gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded border border-[#22272E] bg-[#15181C] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded border border-[#22272E] bg-[#15181C] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
