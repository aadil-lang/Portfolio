"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '../data/profile'
import { Menu, X, FileText, Github, Linkedin, Sparkles } from 'lucide-react'

const navLinks = [
  { name: 'Timeline', href: '/experience', note: 'Chronological Spine' },
  { name: 'Journal', href: '/journal', note: 'Story & Discoveries' },
  { name: 'Systems', href: '/systems', note: 'Technical Archive' },
  { name: 'Contact', href: '/contact', note: 'Get in Touch' }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAskAadilOpen, setIsAskAadilOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-[#121518]/90 backdrop-blur-md border-b border-[#242930] transition-all">
      <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="w-7 h-7 rounded border border-[#3E4652] bg-[#1E2228] flex items-center justify-center text-[#F0EEE9] font-mono font-bold text-xs group-hover:border-[#71899A] transition-colors">
            AK
          </div>
          <span className="font-serif font-bold text-[#F0EEE9] tracking-tight text-base group-hover:text-white transition-colors">
            {profile.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-5 items-center text-xs font-mono">
          {/* Core Architecture: Timeline, Journal, Systems, Contact */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#161A1F] border border-[#2B313A]">
            {navLinks.map((link) => {
              const isActive = Boolean(
                pathname &&
                  (pathname === link.href ||
                    (link.href === '/systems' && pathname.startsWith('/projects')) ||
                    (link.href === '/experience' && pathname.startsWith('/timeline')) ||
                    (link.href !== '/' && pathname.startsWith(link.href)))
              )
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 rounded transition-all text-xs font-semibold ${
                    isActive
                      ? 'bg-[#2A313C] text-[#F0EEE9] shadow-sm border border-[#444E5D]'
                      : 'text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#1E232A]'
                  }`}
                  title={link.note}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2 ml-2 pl-3 border-l border-[#262B32]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#686E77] hover:text-[#D8D6D0] hover:bg-[#1A1D22] transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#686E77] hover:text-[#D8D6D0] hover:bg-[#1A1D22] transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            {/* ASK AADIL TRIGGER BUTTON */}
            <button
              id="header-ask-aadil-btn"
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-ask-aadil'))
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-[#388BFD]/40 bg-[#162332] hover:bg-[#1E3247] text-[#58A6FF] hover:text-[#79B8FF] transition-colors shadow-xs font-semibold cursor-pointer"
              title="Ask Aadil — Grounded Conversational Agent"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>Ask Aadil</span>
            </button>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#20252B] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#71899A]" />
              <span>Resume</span>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAskAadilOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border border-[#388BFD]/40 bg-[#162332] text-[#58A6FF]"
          >
            <Sparkles className="w-3 h-3 text-[#58A6FF]" />
            <span>Ask</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#858A90] hover:text-[#F0EEE9] rounded hover:bg-[#1E2228] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#242930] bg-[#14171A] px-6 py-4 space-y-2.5 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = Boolean(pathname && (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 ${
                  isActive ? 'text-[#F0EEE9] font-bold' : 'text-[#858A90] hover:text-[#D8D6D0]'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-[#22262C] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#686E77] hover:text-[#D8D6D0]"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#686E77] hover:text-[#D8D6D0]"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#2A2F36] bg-[#181B1F] text-[#9EA4AA]"
            >
              <FileText className="w-3.5 h-3.5 text-[#71899A]" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
