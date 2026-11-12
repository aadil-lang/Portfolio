import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { journalSpreads, PageDefinition } from '../../data/journalSpreads'
import { ChevronLeft, ChevronRight, Bookmark, X } from 'lucide-react'
import SpiralBinding, { PunchedHoleStrip } from './SpiralBinding'

interface JournalSpreadViewProps {
  initialSpreadIndex?: number
  onCloseJournal: () => void
}

interface FolioPageProps {
  page: PageDefinition
  side: 'left' | 'right'
  chapterTitle?: string
  onNavigateSpread: (index: number) => void
}

export function FolioPage({ page, side, chapterTitle = '', onNavigateSpread }: FolioPageProps) {
  const isLeft = side === 'left'

  return (
    <div
      className={`p-6 sm:p-7 md:p-8 flex flex-col justify-between relative h-full w-full select-none overflow-hidden ${isLeft
          ? 'pl-12 sm:pl-12 md:pl-12 lg:pl-8 pr-5 sm:pr-7 lg:pr-11 bg-gradient-to-r from-[#F9F7F1] via-[#F7F5EE] to-[#ECE7DC] shadow-[inset_-16px_0_20px_-8px_rgba(40,32,24,0.22)]'
          : 'pl-12 sm:pl-12 md:pl-12 lg:pl-11 pr-5 sm:pr-7 lg:pr-8 bg-gradient-to-r from-[#ECE7DC] via-[#F7F5EE] to-[#F9F7F1] shadow-[inset_16px_0_20px_-8px_rgba(40,32,24,0.22)]'
        }`}
    >
      {/* Punched holes along inner binding margin */}
      <PunchedHoleStrip side={isLeft ? 'right' : 'left'} />

      {/* Folio Running Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#DCD7C9] text-[10px] font-mono text-[#5A6066] uppercase tracking-wider shrink-0">
        {isLeft ? (
          <>
            <span className="text-[#3D5A6E] font-bold">{page.header}</span>
            <span className="px-1.5 py-0.5 rounded bg-[#EAE6DB] border border-[#D5D0C0] text-[#555C62] font-medium">
              {page.marginalLabel}
            </span>
          </>
        ) : (
          <>
            <span className="px-1.5 py-0.5 rounded bg-[#EAE6DB] border border-[#D5D0C0] text-[#555C62] font-medium">
              {page.marginalLabel}
            </span>
            <span className="text-[#3D5A6E] font-bold">{page.header}</span>
          </>
        )}
      </div>

      {/* Folio Body Content - Fixed height scrollable area if content exceeds */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${page.header} folio content`}
        className="py-2.5 sm:py-3 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none focus:outline-none focus:ring-1 focus:ring-[#5A9A78] focus:ring-offset-1 focus:ring-offset-[#F7F5EE] rounded"
      >
        {page.content({ onNavigateSpread })}
      </div>

      {/* Folio Bottom: Page Number on Outer Margin */}
      <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-xs font-mono text-[#484E55] shrink-0">
        {isLeft ? (
          <>
            <span className="font-bold text-[#1E2124]">
              {String(page.pageNumber).padStart(3, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-widest hidden sm:inline text-[#484E55]">
              {chapterTitle}
            </span>
          </>
        ) : (
          <>
            <span className="text-[10px] uppercase tracking-widest hidden sm:inline text-[#484E55]">
              ENGINEERING CHRONICLE
            </span>
            <span className="font-bold text-[#1E2124]">
              {String(page.pageNumber).padStart(3, '0')}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default function JournalSpreadView({
  initialSpreadIndex = 0,
  onCloseJournal
}: JournalSpreadViewProps) {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState<number>(initialSpreadIndex)
  const [flipTargetIndex, setFlipTargetIndex] = useState<number | null>(null)
  const [isFlipping, setIsFlipping] = useState<boolean>(false)
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)
  const [mobilePageSide, setMobilePageSide] = useState<'left' | 'right'>('left')

  const activeSpread = journalSpreads[currentSpreadIndex] || journalSpreads[0]
  const currentSpread = activeSpread
  const targetSpread = flipTargetIndex !== null ? (journalSpreads[flipTargetIndex] || activeSpread) : null
  const totalSpreads = journalSpreads.length

  // Viewport & accessibility detection
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024)
    const checkMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }

    checkViewport()
    checkMotion()

    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  // Page turn navigation
  const handleTurnSpread = (direction: 'forward' | 'backward') => {
    if (isFlipping) return
    setMobilePageSide('left')

    if (direction === 'forward' && currentSpreadIndex < totalSpreads - 1) {
      if (prefersReducedMotion || isMobile) {
        setCurrentSpreadIndex(prev => prev + 1)
        return
      }
      const targetIdx = currentSpreadIndex + 1
      setFlipTargetIndex(targetIdx)
      setFlipDirection('forward')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentSpreadIndex(targetIdx)
        setFlipTargetIndex(null)
        setIsFlipping(false)
      }, 760)
    } else if (direction === 'backward' && currentSpreadIndex > 0) {
      if (prefersReducedMotion || isMobile) {
        setCurrentSpreadIndex(prev => prev - 1)
        return
      }
      const targetIdx = currentSpreadIndex - 1
      setFlipTargetIndex(targetIdx)
      setFlipDirection('backward')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentSpreadIndex(targetIdx)
        setFlipTargetIndex(null)
        setIsFlipping(false)
      }, 760)
    }
  }

  const handleNavigateSpreadDirect = (index: number) => {
    if (index === currentSpreadIndex || isFlipping) return
    setMobilePageSide('left')
    const dir = index > currentSpreadIndex ? 'forward' : 'backward'
    if (prefersReducedMotion || isMobile) {
      setCurrentSpreadIndex(index)
      return
    }
    setFlipTargetIndex(index)
    setFlipDirection(dir)
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentSpreadIndex(index)
      setFlipTargetIndex(null)
      setIsFlipping(false)
    }, 760)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return

      if (e.key === 'ArrowRight' || e.key === ']') {
        e.preventDefault()
        handleTurnSpread('forward')
      } else if (e.key === 'ArrowLeft' || e.key === '[') {
        e.preventDefault()
        handleTurnSpread('backward')
      } else if (e.key === 'Escape') {
        e.preventDefault()
        handleNavigateSpreadDirect(0) // Return to Table of Contents
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSpreadIndex, isFlipping])

  // Labels for margin arrows
  const prevSpread = currentSpreadIndex > 0 ? journalSpreads[currentSpreadIndex - 1] : null
  const nextSpread = currentSpreadIndex < totalSpreads - 1 ? journalSpreads[currentSpreadIndex + 1] : null

  const prevLabel = prevSpread
    ? prevSpread.spreadIndex === 0
      ? 'Table of Contents'
      : `P. 0${prevSpread.leftPage.pageNumber} — 0${prevSpread.rightPage.pageNumber}`
    : null

  const nextLabel = nextSpread
    ? nextSpread.spreadIndex === totalSpreads - 1
      ? 'Epilogue'
      : `P. 0${nextSpread.leftPage.pageNumber} — 0${nextSpread.rightPage.pageNumber}`
    : null

  return (
    <div className="w-full relative py-3 sm:py-6 book-spread-container select-none">
      {/* ========================================================================= */}
      {/* DESK ENVIRONMENT: Minimal Reading Controls & Continuous Journey Ribbon */}
      {/* ========================================================================= */}
      <div className="mb-3.5 p-2 sm:p-2.5 rounded-lg bg-[#16191D] border border-[#2B3037] flex flex-col gap-2 text-xs font-mono shadow-md max-w-5xl mx-auto">
        {/* Top Line: Book Title, Chapter Indicator & Jumpers */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 pl-1">
            <Bookmark className="w-3.5 h-3.5 text-[#536B7A]" />
            <span className="font-serif font-bold text-[#E6E4DF]">The Engineering Evolution</span>
            <span className="text-[#3A404A] hidden sm:inline">•</span>
            <span className="text-[#858A90] truncate hidden sm:inline">
              {currentSpread.chapterNumber ? `[ ${currentSpread.chapterNumber} ]` : ''} {currentSpread.chapterTitle}
            </span>
          </div>

          {/* Minimal Folio Chapter Jumper */}
          <div className="flex items-center gap-1 shrink-0 text-[10.5px]">
            <button
              type="button"
              onClick={() => handleNavigateSpreadDirect(0)}
              className={`min-h-[28px] min-w-[28px] inline-flex items-center justify-center px-2 py-1 rounded transition-colors ${currentSpreadIndex === 0
                  ? 'bg-[#2B323A] text-[#F0EEE9] font-bold border border-[#444D58]'
                  : 'bg-[#191D22] hover:bg-[#20252B] text-[#858A90] border border-[#262B32]'
                }`}
              title="Table of Contents (Pages 001–002)"
            >
              TOC
            </button>

            {[
              { label: '01', spread: 1, title: 'Ch. 01 & 02: Problem Domain & Representation' },
              { label: '06', spread: 6, title: 'Ch. 11 & 12: VM Copy Question Generator' },
              { label: '07', spread: 7, title: 'Ch. 13: AI Worksheets Product POC' },
              { label: 'ETL', spread: 9, title: 'Ch. 15: Curriculum Transformation Engine' },
              { label: '16', spread: 10, title: 'Ch. 16: Loom AI' },
              { label: '17', spread: 11, title: 'Ch. 17: Atlas AI' },
              { label: '18', spread: 12, title: 'Ch. 18: Engineering Design Automation' },
              { label: '19', spread: 13, title: 'Ch. 19: AI Application Reliability & Browser QA' },
              { label: '20', spread: 14, title: 'Ch. 20: OCR Evaluator & Robustness Platform' },
              { label: '21', spread: 15, title: 'Ch. 21: Portfolio & Ask Aadil' },
              { label: '22', spread: 16, title: 'Ch. 22: Solace AI (Safety-First Mobile Companion)' },
              { label: 'Synthesis', spread: 17, title: 'Aug 2026 — Present: Still Building. Still Exploring.' },
              { label: 'Catalog', spread: 18, title: 'Systems Catalog & Full Archive' }
            ].map((btn) => {
              const isActive = currentSpreadIndex === btn.spread
              return (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => handleNavigateSpreadDirect(btn.spread)}
                  className={`min-h-[28px] min-w-[28px] px-1.5 py-1 rounded hidden sm:inline-flex items-center justify-center transition-colors ${isActive
                      ? 'bg-[#2B323A] text-[#F0EEE9] font-bold border border-[#444D58]'
                      : 'bg-[#191D22] hover:bg-[#20252B] text-[#858A90] hover:text-[#9EA4AA] border border-[#262B32]'
                    }`}
                  title={btn.title}
                >
                  {btn.label}
                </button>
              )
            })}

            <button
              type="button"
              id="close-journal-button"
              data-testid="close-journal-button"
              onClick={onCloseJournal}
              className="min-h-[28px] min-w-[28px] px-2 py-1 rounded bg-[#191D22] hover:bg-[#262C35] text-[#858A90] hover:text-[#F0EEE9] border border-[#2B313A] hover:border-[#4B5563] ml-1.5 transition-colors inline-flex items-center justify-center gap-1 font-mono text-[10px]"
              title="Close Book"
              aria-label="Close Book"
            >
              <X className="w-3 h-3 text-[#71899A]" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* Bottom Line: The Accumulated Journey Ribbon */}
        <div className="flex items-center gap-1 overflow-x-auto text-[9.5px] font-mono py-1 px-2 rounded bg-[#111316] border border-[#22252B] text-[#858A90] scrollbar-none">
          <span className="text-[#8E8B82] uppercase tracking-widest text-[8.5px] font-bold mr-1 shrink-0">Journey:</span>
          {[
            { label: 'CONTENT', range: [1] },
            { label: 'SME', range: [1, 2] },
            { label: 'REPRESENTATION', range: [2] },
            { label: 'VISUALS', range: [3, 4] },
            { label: 'TOOLING', range: [4] },
            { label: 'AI', range: [5, 6, 7] },
            { label: 'PIPELINES', range: [8, 9] },
            { label: 'AGENTS', range: [10, 11] },
            { label: 'RELIABILITY & EVAL', range: [12, 13, 14, 15, 16] },
            { label: 'SYNTHESIS', range: [17, 18] }
          ].map((step, idx) => {
            const isStepActive = step.range.includes(currentSpreadIndex)
            return (
              <React.Fragment key={step.label}>
                {idx > 0 && <span className="text-[#2C3138] shrink-0">→</span>}
                <span
                  className={`px-1 py-0.2 rounded shrink-0 transition-colors ${isStepActive
                      ? 'bg-[#3D5A6E] text-[#F7F5EE] font-bold shadow-xs'
                      : 'text-[#8E95A0] hover:text-[#C5CAD1]'
                    }`}
                >
                  {step.label}
                </span>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE PHYSICAL OPEN SPIRAL-BOUND NOTEBOOK ON THE DESK */}
      {/* ========================================================================= */}
      <div
        id="journal-spread-viewport"
        className="relative rounded-2xl p-2 sm:p-2.5 bg-[#21252A] border border-[#363B43] book-desk-shadow mx-auto max-w-5xl flex items-stretch overflow-visible h-[640px] sm:h-[680px] lg:h-[700px]"
        style={{ perspective: 2800 }}
      >
        {/* Tactile Margin Navigation Arrow: Turn Back Spread */}
        {prevLabel && (
          <button
            type="button"
            id="book-prev-spread-arrow"
            data-testid="book-prev-spread-arrow"
            onClick={() => handleTurnSpread('backward')}
            aria-label={`Turn page back to ${prevLabel}`}
            title={`[ Turn page back to ${prevLabel} ]`}
            className="book-margin-arrow absolute left-1.5 sm:left-2 xl:-left-14 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-2.5 md:p-3 rounded-full sm:rounded-lg bg-[#181B1F] hover:bg-[#22272E] border border-[#3E454F] hover:border-[#536B7A] text-[#F0EEE9] shadow-[0_14px_30px_rgba(0,0,0,0.9)] flex flex-col items-center gap-1 group cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#71899A] group-hover:text-[#F0EEE9] group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] font-mono text-[#858A90] group-hover:text-[#D8D6D0] uppercase tracking-wider hidden lg:block">
              PREV
            </span>
          </button>
        )}

        {/* Tactile Margin Navigation Arrow: Turn Next Spread */}
        {nextLabel && (
          <button
            type="button"
            id="book-next-spread-arrow"
            data-testid="book-next-spread-arrow"
            onClick={() => handleTurnSpread('forward')}
            aria-label={`Turn page to ${nextLabel}`}
            title={`[ Turn page to ${nextLabel} ]`}
            className="book-margin-arrow absolute right-1.5 sm:right-2 xl:-right-14 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-2.5 md:p-3 rounded-full sm:rounded-lg bg-[#181B1F] hover:bg-[#22272E] border border-[#3E454F] hover:border-[#536B7A] text-[#F0EEE9] shadow-[0_14px_30px_rgba(0,0,0,0.9)] flex flex-col items-center gap-1 group cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#71899A] group-hover:text-[#F0EEE9] group-hover:translate-x-1 transition-transform" />
            <span className="text-[9px] font-mono text-[#858A90] group-hover:text-[#D8D6D0] uppercase tracking-wider hidden lg:block">
              NEXT
            </span>
          </button>
        )}
        {/* Left Stacked Page Block Edge (Thickness of bound sheets) */}
        <div className="absolute left-1 top-2.5 bottom-2.5 w-2 sm:w-2.5 page-block-edge pointer-events-none z-30 rounded-l-sm" />

        {/* Right Stacked Page Block Edge (Thickness of bound sheets) */}
        <div className="absolute right-1 top-2.5 bottom-2.5 w-2 sm:w-2.5 page-block-edge pointer-events-none z-30 rounded-r-sm" />

        {/* Mobile Edge Spiral Binding (Left edge on single page view) */}
        <div className="lg:hidden absolute left-0 top-1 bottom-1 z-40 w-12 pointer-events-none">
          <SpiralBinding
            variant="edge"
            currentSpreadIndex={currentSpreadIndex}
            className="w-full h-full"
          />
        </div>

        {/* ============================================================== */}
        {/* LAYER 2: CENTER SPIRAL BINDING BACK WIRE (Behind pages at z-20) */}
        {/* ============================================================== */}
        <div className="hidden lg:block absolute left-1/2 top-2.5 bottom-2.5 -translate-x-1/2 z-20 w-14 pointer-events-none">
          <SpiralBinding
            variant="center-back"
            currentSpreadIndex={flipTargetIndex ?? currentSpreadIndex}
            className="w-full h-full"
          />
        </div>

        {/* Warm Technical Archival Paper Spread Body */}
        <div className="flex-1 w-full bg-[#F7F5EE] rounded-lg overflow-hidden relative h-full flex flex-col justify-between shadow-[inset_0_0_12px_rgba(0,0,0,0.06)] border border-[#E5E0D5]">

          {/* Mobile Folio Selector Strip (lg:hidden) */}
          <div className="lg:hidden flex items-center justify-between pl-12 pr-3 sm:pl-12 sm:pr-4 py-1.5 bg-[#EAE6DB] border-b border-[#D5D0C0] text-[11px] font-mono text-[#484E55] shrink-0 z-20 gap-2">
            <span className="text-[10px] text-[#555C62] uppercase font-bold tracking-wider truncate max-w-[100px] sm:max-w-[160px]">
              {activeSpread.chapterNumber === 'OPENING' || activeSpread.chapterNumber === 'EPILOGUE' || activeSpread.chapterNumber === 'SYNTHESIS'
                ? activeSpread.chapterNumber
                : `CH. ${activeSpread.chapterNumber}`}
            </span>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Folio selection">
              <button
                type="button"
                role="tab"
                aria-selected={mobilePageSide === 'left'}
                aria-controls="mobile-folio-panel"
                onClick={() => setMobilePageSide('left')}
                className={`min-h-[32px] inline-flex items-center px-2 py-1 rounded text-[10.5px] font-mono transition-colors ${
                  mobilePageSide === 'left'
                    ? 'bg-[#3D5A6E] text-[#F7F5EE] font-bold shadow-xs'
                    : 'bg-[#DCD7C9] text-[#484E55] hover:text-[#1E2124]'
                }`}
              >
                Page {activeSpread.leftPage.pageNumber} (Verso)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mobilePageSide === 'right'}
                aria-controls="mobile-folio-panel"
                onClick={() => setMobilePageSide('right')}
                className={`min-h-[32px] inline-flex items-center px-2 py-1 rounded text-[10.5px] font-mono transition-colors ${
                  mobilePageSide === 'right'
                    ? 'bg-[#3D5A6E] text-[#F7F5EE] font-bold shadow-xs'
                    : 'bg-[#DCD7C9] text-[#484E55] hover:text-[#1E2124]'
                }`}
              >
                Page {activeSpread.rightPage.pageNumber} (Recto)
              </button>
            </div>
          </div>

          {/* Desktop Dual Folio View (>= 1024px) */}
          <div className="hidden lg:grid lg:grid-cols-2 flex-1 w-full h-full relative z-10">
            {/* Left Folio (Verso Page) */}
            <div className="h-full w-full">
              {isFlipping && flipDirection === 'backward' && targetSpread ? (
                <FolioPage
                  page={targetSpread.leftPage}
                  side="left"
                  chapterTitle={targetSpread.chapterTitle}
                  onNavigateSpread={handleNavigateSpreadDirect}
                />
              ) : (
                <FolioPage
                  page={activeSpread.leftPage}
                  side="left"
                  chapterTitle={activeSpread.chapterTitle}
                  onNavigateSpread={handleNavigateSpreadDirect}
                />
              )}
            </div>

            {/* Right Folio (Recto Page) */}
            <div className="h-full w-full">
              {isFlipping && flipDirection === 'forward' && targetSpread ? (
                <FolioPage
                  page={targetSpread.rightPage}
                  side="right"
                  chapterTitle={targetSpread.chapterTitle}
                  onNavigateSpread={handleNavigateSpreadDirect}
                />
              ) : (
                <FolioPage
                  page={activeSpread.rightPage}
                  side="right"
                  chapterTitle={activeSpread.chapterTitle}
                  onNavigateSpread={handleNavigateSpreadDirect}
                />
              )}
            </div>
          </div>

          {/* Mobile Single Folio View (< 1024px) */}
          <div id="mobile-folio-panel" role="tabpanel" className="lg:hidden flex-1 w-full h-full relative z-10">
            {mobilePageSide === 'left' ? (
              <FolioPage
                page={activeSpread.leftPage}
                side="left"
                chapterTitle={activeSpread.chapterTitle}
                onNavigateSpread={handleNavigateSpreadDirect}
              />
            ) : (
              <FolioPage
                page={activeSpread.rightPage}
                side="right"
                chapterTitle={activeSpread.chapterTitle}
                onNavigateSpread={handleNavigateSpreadDirect}
              />
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3: 3D TURNING PAGE LEAF (At z-35, sandwiched in spiral)  */}
        {/* Unclipped in the desk perspective container                     */}
        {/* ============================================================== */}
        {!isMobile && !prefersReducedMotion && isFlipping && targetSpread && (
          flipDirection === 'forward' ? (
            /* Forward Turn: Current Right Page flips over to become Next Left Page */
            <div
              className="hidden lg:block absolute pointer-events-none overflow-visible"
              style={{
                top: '10px',
                bottom: '10px',
                left: '50%',
                width: 'calc(50% - 10px)',
                zIndex: 35,
                transformStyle: 'preserve-3d'
              }}
            >
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{
                  duration: 0.72,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center'
                }}
                className="relative w-full h-full"
              >
                {/* Front side of flipping leaf: Current Right Page */}
                <div
                  className="absolute inset-0 bg-[#F7F5EE] rounded-r-lg shadow-[-16px_25px_50px_rgba(0,0,0,0.5)] border-y border-r border-[#E5E0D5]"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <FolioPage
                    page={activeSpread.rightPage}
                    side="right"
                    chapterTitle={activeSpread.chapterTitle}
                    onNavigateSpread={handleNavigateSpreadDirect}
                  />
                  {/* Dynamic curl shadow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.25, 0.38] }}
                    transition={{ duration: 0.72 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/12 to-transparent pointer-events-none rounded-r-lg"
                  />
                </div>

                {/* Back side of flipping leaf: Next Left Page */}
                <div
                  className="absolute inset-0 bg-[#F7F5EE] rounded-l-lg shadow-[16px_25px_50px_rgba(0,0,0,0.5)] border-y border-l border-[#E5E0D5]"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <FolioPage
                    page={targetSpread.leftPage}
                    side="left"
                    chapterTitle={targetSpread.chapterTitle}
                    onNavigateSpread={handleNavigateSpreadDirect}
                  />
                  {/* Dynamic landing shadow */}
                  <motion.div
                    initial={{ opacity: 0.38 }}
                    animate={{ opacity: [0.38, 0.16, 0] }}
                    transition={{ duration: 0.72 }}
                    className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/12 to-transparent pointer-events-none rounded-l-lg"
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            /* Backward Turn: Current Left Page flips over to become Previous Right Page */
            <div
              className="hidden lg:block absolute pointer-events-none overflow-visible"
              style={{
                top: '10px',
                bottom: '10px',
                right: '50%',
                width: 'calc(50% - 10px)',
                zIndex: 35,
                transformStyle: 'preserve-3d'
              }}
            >
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{
                  duration: 0.72,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'right center'
                }}
                className="relative w-full h-full"
              >
                {/* Front side of flipping leaf: Current Left Page */}
                <div
                  className="absolute inset-0 bg-[#F7F5EE] rounded-l-lg shadow-[16px_25px_50px_rgba(0,0,0,0.5)] border-y border-l border-[#E5E0D5]"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <FolioPage
                    page={activeSpread.leftPage}
                    side="left"
                    chapterTitle={activeSpread.chapterTitle}
                    onNavigateSpread={handleNavigateSpreadDirect}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.25, 0.38] }}
                    transition={{ duration: 0.76 }}
                    className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/12 to-transparent pointer-events-none rounded-l-lg"
                  />
                </div>

                {/* Back side of flipping leaf: Previous Right Page */}
                <div
                  className="absolute inset-0 bg-[#F7F5EE] rounded-r-lg shadow-[-16px_25px_50px_rgba(0,0,0,0.5)] border-y border-r border-[#E5E0D5]"
                  style={{
                    transform: 'rotateY(-180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <FolioPage
                    page={targetSpread.rightPage}
                    side="right"
                    chapterTitle={targetSpread.chapterTitle}
                    onNavigateSpread={handleNavigateSpreadDirect}
                  />
                  <motion.div
                    initial={{ opacity: 0.38 }}
                    animate={{ opacity: [0.38, 0.16, 0] }}
                    transition={{ duration: 0.76 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/12 to-transparent pointer-events-none rounded-r-lg"
                  />
                </div>
              </motion.div>
            </div>
          )
        )}

        {/* ============================================================== */}
        {/* LAYER 4: CENTER SPIRAL BINDING FRONT WIRE (In front at z-50)   */}
        {/* ============================================================== */}
        <div className="hidden lg:block absolute left-1/2 top-2.5 bottom-2.5 -translate-x-1/2 z-50 w-14 pointer-events-none">
          <SpiralBinding
            variant="center-front"
            currentSpreadIndex={flipTargetIndex ?? currentSpreadIndex}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Bottom Desk Reading Status & Spread Counter */}
      <footer className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#858A90] px-3 max-w-5xl mx-auto">
        <div>
          {prevLabel ? (
            <button
              type="button"
              onClick={() => handleTurnSpread('backward')}
              className="inline-flex items-center gap-1.5 text-[#858A90] hover:text-[#E6E4DF] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>‹ Previous Spread</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCloseJournal}
              className="inline-flex items-center gap-1.5 text-[#858A90] hover:text-[#E6E4DF] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>[ Close Book Cover ]</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#9EA4AA] font-bold">
            SPREAD {String(currentSpreadIndex + 1).padStart(2, '0')} OF {String(totalSpreads).padStart(2, '0')}
          </span>
          <span className="text-[#3A404A]">·</span>
          <span className="hidden sm:inline">
            PAGES {String(currentSpread.leftPage.pageNumber).padStart(3, '0')} — {String(currentSpread.rightPage.pageNumber).padStart(3, '0')}
          </span>
          <span className="sm:hidden font-mono text-[#D8D6D0]">
            PAGE {String(mobilePageSide === 'left' ? currentSpread.leftPage.pageNumber : currentSpread.rightPage.pageNumber).padStart(3, '0')}
          </span>
          <span className="text-[#3A404A] hidden lg:inline">·</span>
          <span className="italic text-[#858A90] hidden lg:inline">
            &ldquo;Every system I build is also a system that teaches me.&rdquo;
          </span>
        </div>

        <div>
          {nextLabel ? (
            <button
              type="button"
              onClick={() => handleTurnSpread('forward')}
              className="inline-flex items-center gap-1.5 text-[#858A90] hover:text-[#E6E4DF] transition-colors"
            >
              <span>Next Spread ›</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[#8E95A0]">[ End of Volume I ]</span>
          )}
        </div>
      </footer>
    </div>
  )
}
