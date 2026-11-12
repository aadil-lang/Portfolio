"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThickHardcoverFace } from './JournalCover'
import JournalSpreadView from './JournalSpreadView'
import SpiralBinding from './SpiralBinding'
import { journalSpreads } from '../../data/journalSpreads'

const HASH_ANCHOR_MAP: Record<string, number> = {
  'toc': 0,
  'graveiens': 1,
  'inhaltmart': 1,
  'digipplus': 2,
  'digiplus': 2,
  'goal-pursuit': 2,
  'wayground': 3,
  'voyagemath-v1': 3,
  'figma-visuals': 4,
  'voyagemath-builder': 4,
  'ai-workflow': 5,
  'item-authoring': 5,
  'vm-copy-generator': 6,
  'vm-copy': 6,
  'ai-transition': 6,
  'ai-question-generator': 6,
  'ai-worksheets-poc': 7,
  'ai-worksheets': 7,
  'us-item-bank': 8,
  'math-item-bank': 8,
  'curriculum-transformation-engine': 9,
  'curriculum-etl': 9,
  'loom-ai': 10,
  'atlas-ai': 11,
  'eda-cad': 12,
  'design-automation': 12,
  'ai-reliability': 13,
  'browser-qa': 13,
  'ocr-evaluator': 14,
  'ask-aadil': 15,
  'portfolio': 15,
  'solace-ai': 16,
  'still-building': 17,
  'synthesis': 17,
  'open-spiral': 17,
  'epilogue': 18,
  'systems': 18,
  'catalog': 18
}

export default function JournalBook() {
  const [journalState, setJournalState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed')
  const [initialSpread, setInitialSpread] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  // Viewport, accessibility & URL parameter/hash detection
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024)
    const checkMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }

    const checkUrlParams = () => {
      try {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const spreadParam = params.get('spread')
        const chapterParam = params.get('chapter')
        const hash = window.location.hash.replace('#', '')

        let targetSpread: number | null = null
        if (spreadParam !== null) {
          targetSpread = parseInt(spreadParam, 10)
        } else if (chapterParam !== null) {
          targetSpread = parseInt(chapterParam, 10)
        } else if (hash && HASH_ANCHOR_MAP[hash] !== undefined) {
          targetSpread = HASH_ANCHOR_MAP[hash]
        }

        if (targetSpread !== null && !isNaN(targetSpread) && targetSpread >= 0 && targetSpread < journalSpreads.length) {
          setInitialSpread(targetSpread)
          setJournalState('open')
        }
      } catch (err) {
        // Ignore URL parsing errors
      }
    }

    checkViewport()
    checkMotion()
    checkUrlParams()

    window.addEventListener('resize', checkViewport)
    window.addEventListener('popstate', checkUrlParams)
    window.addEventListener('hashchange', checkUrlParams)
    return () => {
      window.removeEventListener('resize', checkViewport)
      window.removeEventListener('popstate', checkUrlParams)
      window.removeEventListener('hashchange', checkUrlParams)
    }
  }, [])

  const handleOpenJournal = () => {
    if (prefersReducedMotion || isMobile) {
      setJournalState('open')
      return
    }
    setJournalState('opening')
    setTimeout(() => {
      setJournalState('open')
    }, 800)
  }

  const handleCloseJournal = () => {
    if (prefersReducedMotion || isMobile) {
      setJournalState('closed')
      return
    }
    setJournalState('closing')
    setTimeout(() => {
      setJournalState('closed')
    }, 600)
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* State A: Closed Book Cover */}
      {journalState === 'closed' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="w-full max-w-xl flex flex-col items-center cursor-pointer py-4 group"
          onClick={handleOpenJournal}
          aria-label="Open Engineering Journal"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleOpenJournal()
            }
          }}
        >
          <ThickHardcoverFace onOpen={handleOpenJournal} />
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#71899A] group-hover:text-[#F0EEE9] transition-colors">
            <span>Click or press Enter to open the journal →</span>
          </div>
        </motion.div>
      )}

      {/* State B: Opening Animation */}
      {journalState === 'opening' && (
        <div className="w-full max-w-xl py-4 flex flex-col items-center">
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -90 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full"
            style={{ transformOrigin: 'left center', perspective: 1200 }}
          >
            <ThickHardcoverFace isTurning={true} />
          </motion.div>
        </div>
      )}

      {/* State C: Open Two-Page Folio */}
      {journalState === 'open' && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full space-y-4"
        >
          {/* Top Bar Actions */}
          <div className="flex items-center justify-between text-xs font-mono text-[#858A90] border-b border-[#242930] pb-3 max-w-5xl mx-auto px-2">
            <button
              onClick={handleCloseJournal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#16191D] border border-[#2A2F36] hover:text-[#F0EEE9] hover:border-[#536B7A] transition-colors"
            >
              <span>← Close Journal Cover</span>
            </button>

            <span className="text-[11px] text-[#555C62] hidden sm:inline">
              JOURNAL FOLIO VOL. I
            </span>
          </div>

          {/* Folio View */}
          <div className="relative w-full flex justify-center">
            <JournalSpreadView
              initialSpreadIndex={initialSpread}
              onCloseJournal={handleCloseJournal}
            />
          </div>
        </motion.div>
      )}

      {/* State D: Closing Animation */}
      {journalState === 'closing' && (
        <div className="w-full max-w-xl py-4 flex flex-col items-center">
          <motion.div
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full"
            style={{ transformOrigin: 'left center', perspective: 1200 }}
          >
            <ThickHardcoverFace isTurning={true} />
          </motion.div>
        </div>
      )}
    </div>
  )
}
