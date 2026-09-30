'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

interface HomepageAskAadilCtaProps {
  variant?: 'prominent' | 'compact'
  label?: string
}

export function HomepageAskAadilCta({ variant = 'prominent', label }: HomepageAskAadilCtaProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-ask-aadil'))
    }
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded border border-[#262B32] bg-[#14171A] hover:bg-[#1A222D] text-[#858A90] hover:text-[#58A6FF] transition-colors font-mono text-xs cursor-pointer"
        title="Ask Aadil — Grounded Conversational Agent"
      >
        <Sparkles className="w-3 h-3 text-[#58A6FF]" />
        <span>{label || 'Ask Aadil'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#1A2E44] hover:bg-[#233E5D] text-[#58A6FF] hover:text-[#79B8FF] border border-[#388BFD]/50 font-mono text-xs font-bold transition-all shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
      title="Launch Ask Aadil Modal"
    >
      <Sparkles className="w-4 h-4" />
      <span>{label || 'Launch Ask Aadil →'}</span>
    </button>
  )
}
