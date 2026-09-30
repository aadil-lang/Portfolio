"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThickHardcoverFace } from './JournalCover'
import JournalSpreadView, { FolioPage } from './JournalSpreadView'
import SpiralBinding from './SpiralBinding'
import { journalSpreads } from '../../data/journalSpreads'

export default function JournalBook() {
  const [journalState, setJournalState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed')
  const [initialSpread, setInitialSpread] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  // Viewport, accessibility & URL parameter detection
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

        let targetSpread: number | null = null
        if (spreadParam !== null) {
          targetSpread = parseInt(spreadParam, 10)
        } else if (chapterParam !== null) {
          targetSpread = parseInt(chapterParam, 10)
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
    return () => {
      window.removeEventListener('resize', checkViewport)
      window.removeEventListener('popstate', checkUrlParams)
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
    }, 850)
  }

  const handleCloseJournal = () => {
    if (prefersReducedMotion || isMobile) {
      setJournalState('closed')
      return
    }
    setJournalState('closing')
    setTimeout(() => {
      setJournalState('closed')
    }, 850)
  }

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
      if (journalState === 'closed' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        handleOpenJournal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [journalState])

  const isClosedMode = journalState === 'closed' || journalState === 'closing'

  return (
    <div className="w-full relative py-3 sm:py-6 book-spread-container select-none">
      {/* 1. Fully Open Interactive Spread State */}
      {journalState === 'open' ? (
        <JournalSpreadView initialSpreadIndex={initialSpread} onCloseJournal={handleCloseJournal} />
      ) : (
        /* 2. Unified 3D Stage for Closed, Opening, and Closing States */
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={false}
            animate={{
              width: !isMobile && isClosedMode ? '540px' : '100%',
              maxWidth: !isMobile && isClosedMode ? '540px' : '1024px'
            }}
            transition={{
              duration: 0.85,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
            className="relative rounded-2xl p-2 sm:p-2.5 bg-[#21252A] border border-[#363B43] book-desk-shadow mx-auto flex items-stretch overflow-visible h-[640px] sm:h-[680px] lg:h-[700px] w-full"
            style={{ perspective: 2600 }}
          >
            {/* Left Page Block Edge (Visible when open) */}
            <motion.div
              initial={false}
              animate={{ opacity: isClosedMode ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1 top-2.5 bottom-2.5 w-2 sm:w-2.5 page-block-edge pointer-events-none z-30 rounded-l-sm"
            />

            {/* Right Page Block Edge (Always visible on right) */}
            <div className="absolute right-1 top-2.5 bottom-2.5 w-2 sm:w-2.5 page-block-edge pointer-events-none z-30 rounded-r-sm" />

            {/* LAYER 1: BASE PAGES GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 w-full h-full relative z-10 rounded-lg overflow-hidden">
              {/* Left Side: Empty dark desk landing surface until cover lands */}
              <div className="h-full w-full relative rounded-l-lg bg-[#181B20]/60 border-y border-l border-[#2B3037]/40 flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-[0.035] pointer-events-none rounded-l-lg"
                  style={{
                    backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />
              </div>

              {/* Right Side: Page 002 (Table of Contents) revealed underneath as cover lifts */}
              <div className="h-full w-full bg-[#F7F5EE] rounded-r-lg border border-[#E5E0D5] relative overflow-hidden">
                <FolioPage
                  page={journalSpreads[0].rightPage}
                  side="right"
                  chapterTitle={journalSpreads[0].chapterTitle}
                  onNavigateSpread={() => {}}
                />
                {/* Dynamic cast shadow onto right page as cover lifts */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity:
                      journalState === 'closed'
                        ? 0.55
                        : journalState === 'opening'
                        ? [0.55, 0.3, 0.1, 0]
                        : [0, 0.1, 0.3, 0.55]
                  }}
                  transition={{ duration: 0.85 }}
                  className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none rounded-r-lg"
                />
              </div>
            </div>

            {/* LAYER 2: SPIRAL BINDING BACK WIRE (Behind pages at z-20) */}
            <motion.div
              initial={false}
              animate={{
                left: isClosedMode ? '10px' : '50%'
              }}
              transition={{
                duration: 0.85,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              className="hidden lg:block absolute top-2.5 bottom-2.5 -translate-x-1/2 z-20 w-14 pointer-events-none"
            >
              <SpiralBinding
                variant={isClosedMode ? 'edge' : 'center-back'}
                currentSpreadIndex={0}
                className="w-full h-full"
              />
            </motion.div>

            {/* LAYER 3: 3D TURNING THICK HARDCOVER (At z-35) */}
            <motion.div
              initial={false}
              animate={{
                left: isClosedMode ? '10px' : '50%',
                width: isClosedMode ? 'calc(100% - 20px)' : 'calc(50% - 10px)'
              }}
              transition={{
                duration: 0.85,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              className="hidden lg:block absolute pointer-events-none overflow-visible"
              style={{
                top: '10px',
                bottom: '10px',
                zIndex: 35,
                transformStyle: 'preserve-3d'
              }}
            >
              <motion.div
                initial={false}
                animate={{
                  rotateY: journalState === 'closed' ? 0 : journalState === 'opening' ? -180 : 0
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center'
                }}
                className="relative w-full h-full pointer-events-auto"
              >
                {/* Front Side: Thick Hardcover Exterior (Clean slate buckram, no steel casing) */}
                <div
                  className="absolute inset-0 rounded-r-xl border-y border-r border-[#3A404A] bg-[#1E2328]"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    boxShadow: '-18px 28px 55px rgba(0,0,0,0.75)'
                  }}
                >
                  <ThickHardcoverFace
                    onOpen={handleOpenJournal}
                    isTurning={journalState !== 'closed'}
                  />
                  {/* Dynamic specular light sweep across turning cover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity:
                        journalState === 'closed'
                          ? 0
                          : journalState === 'opening'
                          ? [0, 0.22, 0.35]
                          : [0.35, 0.18, 0]
                    }}
                    transition={{ duration: 0.85 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none rounded-r-xl"
                  />
                </div>

                {/* Back Side: Page 001 (Prologue // The Axiomatic Basis) */}
                <div
                  className="absolute inset-0 rounded-l-xl border-y border-l border-[#E5E0D5] bg-[#F7F5EE]"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    boxShadow: '18px 28px 55px rgba(0,0,0,0.75)'
                  }}
                >
                  <FolioPage
                    page={journalSpreads[0].leftPage}
                    side="left"
                    chapterTitle={journalSpreads[0].chapterTitle}
                    onNavigateSpread={() => {}}
                  />
                  {/* Dynamic landing shadow onto left desk */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity:
                        journalState === 'opening'
                          ? [0.35, 0.15, 0]
                          : [0, 0.15, 0.35]
                    }}
                    transition={{ duration: 0.85 }}
                    className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent pointer-events-none rounded-l-xl"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile Cover View (Single Page on Mobile) */}
            {isMobile && journalState === 'closed' && (
              <div className="lg:hidden absolute inset-0 z-40 bg-[#1E2328] rounded-xl p-4">
                <ThickHardcoverFace onOpen={handleOpenJournal} />
              </div>
            )}

            {/* LAYER 4: SPIRAL BINDING FRONT WIRE (At z-50) */}
            <motion.div
              initial={false}
              animate={{
                left: isClosedMode ? '10px' : '50%'
              }}
              transition={{
                duration: 0.85,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              className="hidden lg:block absolute top-2.5 bottom-2.5 -translate-x-1/2 z-50 w-14 pointer-events-none"
            >
              <SpiralBinding
                variant={isClosedMode ? 'edge' : 'center-front'}
                currentSpreadIndex={0}
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* Accessible subtle hint */}
          {journalState === 'closed' && (
            <p className="text-[11px] text-[#686E77] mt-3.5 font-mono text-center tracking-wide">
              [ Press Enter or click OPEN JOURNAL to open logbook ]
            </p>
          )}
        </div>
      )}
    </div>
  )
}
