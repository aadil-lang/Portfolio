import React from 'react'
import Link from 'next/link'
import { profile } from '../data/profile'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#242930] bg-[#121518] py-10 mt-20 font-mono text-xs">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <p className="font-serif font-bold text-sm text-[#F0EEE9]">{profile.name}</p>
          <p className="text-[#686E77] text-[11px]">
            AI Systems Engineer · Deterministic Boundaries & Systems Engineering
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-[#858A90]">
          <Link href="/experience" className="hover:text-[#F0EEE9] transition-colors">Timeline</Link>
          <Link href="/journal" className="hover:text-[#F0EEE9] transition-colors">Journal</Link>
          <Link href="/systems" className="hover:text-[#F0EEE9] transition-colors">Systems Archive</Link>
          <Link href="/contact" className="hover:text-[#F0EEE9] transition-colors">Contact</Link>
          <Link href="/ask-aadil" className="hover:text-[#58A6FF] transition-colors">Ask Aadil</Link>
        </div>

        <div className="flex items-center gap-3 text-[#686E77]">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:text-[#D8D6D0] hover:bg-[#1A1D22] transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:text-[#D8D6D0] hover:bg-[#1A1D22] transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="p-1 rounded hover:text-[#D8D6D0] hover:bg-[#1A1D22] transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-8 pt-6 border-t border-[#1C1F24] text-center text-[11px] text-[#555A62]">
        SPEC-2026 // ENGINEERING LOGBOOK · © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED.
      </div>
    </footer>
  )
}
