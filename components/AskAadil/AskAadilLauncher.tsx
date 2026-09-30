'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sparkles, MessageSquare } from 'lucide-react'
import { getAskAadilPageContext } from '@/lib/rag/askAadilPageContext'
import { AskAadilModal } from './AskAadilModal'

export function AskAadilLauncher() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const pageContext = getAskAadilPageContext(pathname || '/')

  useEffect(() => {
    setMounted(true)

    // Listen for custom global event so any CTA/button can open the global Ask Aadil modal
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>
      setIsOpen(true)
    }

    window.addEventListener('open-ask-aadil', handleOpenEvent)
    return () => window.removeEventListener('open-ask-aadil', handleOpenEvent)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* GLOBAL PERSISTENT FLOATING LAUNCHER */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          id="global-ask-aadil-launcher"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Ask Aadil — Portfolio Assistant"
          className="group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#388BFD]/40 bg-[#121518]/95 backdrop-blur-md hover:bg-[#1E2E42] text-[#58A6FF] hover:text-[#79B8FF] shadow-lg hover:shadow-xl transition-all text-xs font-mono font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#58A6FF]/60"
          title="Ask Aadil — Grounded Portfolio Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#58A6FF] group-hover:scale-110 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">✦ Ask Aadil</span>
          <span className="sm:hidden text-xs">Ask Aadil</span>

          {pageContext.projectSlug && (
            <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[9.5px] bg-[#162332] text-[#79B8FF] border border-[#388BFD]/30 max-w-[120px] truncate">
              {pageContext.title?.split(' — ')[0]}
            </span>
          )}
        </button>
      </div>

      {/* SINGLE GLOBAL ASK AADIL MODAL */}
      <AskAadilModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pageContext={pageContext}
      />
    </>
  )
}
