'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { JOURNEY_NODES, JourneyNode } from '../../data/journeyMapData'
import { JourneyMapViewport } from '../../components/timeline/JourneyMapViewport'
import { MilestoneInspector } from '../../components/timeline/MilestoneInspector'
import { CartographicLegend } from '../../components/timeline/CartographicLegend'
import { getProvenanceColor } from '../../components/timeline/CheckpointNodes'
import {
  Compass,
  BookOpen,
  Terminal,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
  Briefcase,
  GitCommit,
  CheckCircle2,
  Tag
} from 'lucide-react'

export default function ExperiencePage() {
  const [selectedNode, setSelectedNode] = useState<JourneyNode | null>(
    JOURNEY_NODES[0]
  )

  return (
    <section className="max-w-6xl mx-auto space-y-10 pb-16 px-4">
      {/* Top Narrative Anchor */}
      <div className="space-y-4 border-b border-[#262B32] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16191D] border border-[#2A2F36] text-[#858A90] text-xs font-mono">
          <Compass className="w-3.5 h-3.5 text-[#536B7A]" />
          <span>LAYER 1 // INTERACTIVE ENGINEERING JOURNEY MAP</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif uppercase">
          Timeline & Engineering Journey Map
        </h1>

        <p className="text-base text-[#A2A8AF] max-w-3xl leading-relaxed font-serif italic">
          &ldquo;What happened → what I learned → how that enabled the next chapter.&rdquo;
        </p>

        {/* Overall Career Progression Banner */}
        <div className="p-4 rounded-xl bg-[#14171A] border border-[#262B32] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#71899A] block font-bold">
            The Continuous Engineering Progression
          </span>
          <div className="text-[11px] sm:text-xs font-mono text-[#C8C6BF] flex flex-wrap items-center gap-1.5 leading-relaxed">
            <span className="text-[#F0EEE9]">Mathematical Content Creation</span>
            <span className="text-[#5A6066]">→</span>
            <span>Mathematical Representation</span>
            <span className="text-[#5A6066]">→</span>
            <span>Quality & Validation</span>
            <span className="text-[#5A6066]">→</span>
            <span>Figma Visual Assets</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI Assistance</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI Applications</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI Evaluation</span>
            <span className="text-[#5A6066]">→</span>
            <span>Multi-System Orchestration</span>
            <span className="text-[#5A6066]">→</span>
            <span>Optimization & Constraints</span>
            <span className="text-[#5A6066]">→</span>
            <span>Distributed AI Pipelines</span>
            <span className="text-[#5A6066]">→</span>
            <span className="text-[#4E8765] font-bold">Reliable AI Systems Engineering</span>
          </div>
        </div>

        {/* Three Distinct Career Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Stage 1 */}
          <div className="p-4 rounded-xl bg-[#14171A] border border-[#262B32] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-[#1C222A] text-[#71899A] font-semibold border border-[#2B3542]">
                STAGE 1 // EMPLOYMENT
              </span>
              <span className="text-[#858A90]">2024 — Jul 2026</span>
            </div>
            <h2 className="font-serif font-bold text-sm text-[#F0EEE9]">
              Professional Engineering Experience
            </h2>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Wayground (Quizizz) tenure concluding July 2026. Built enterprise content automation, TikZ/SVG diagram engines, VM Copy deterministic evaluator, and high-throughput Claude Map-Reduce ETL pipelines.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="p-4 rounded-xl bg-[#171A1E] border border-[#3E4752] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-[#1B261F] text-[#4E8765] font-semibold border border-[#294D36]">
                STAGE 2 // INDEPENDENT BUILDS
              </span>
              <span className="text-[#8CC4FF] font-semibold">Aug 2026 — Present</span>
            </div>
            <h2 className="font-serif font-bold text-sm text-[#F0EEE9]">
              Independent AI Engineering &amp; Research
            </h2>
            <p className="text-xs text-[#C8C6BF] leading-relaxed">
              Building, experimenting and researching intelligent applications, agentic systems and reliable AI engineering solutions. Shipped 7 independent systems across hackathons, engineering tools, and reliability platforms.
            </p>
            <div className="text-[10px] font-mono text-[#71899A] pt-1 border-t border-[#22272E]">
              Not corporate employment • Continuous practical growth
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-4 rounded-xl bg-[#14171A] border border-[#262B32] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-[#201C18] text-[#D48A63] font-semibold border border-[#443328]">
                STAGE 3 // SPECIALIZATIONS
              </span>
              <span className="text-[#858A90]">Architecture</span>
            </div>
            <h2 className="font-serif font-bold text-sm text-[#F0EEE9]">
              Continued Technical Growth
            </h2>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Progression from prompt-based apps to deterministic systems: RAG &amp; retrieval, LangGraph agentic workflows, OpenCascade CAD physics kernels, Fisher uncertainty modeling, mobile AI, and human-in-the-loop governance.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 1. INTERACTIVE ENGINEERING JOURNEY MAP CANVAS                 */}
      {/* ============================================================= */}
      <div className="relative space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#9EA4AA] px-1 pb-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#536B7A]" />
            <span>INTERACTIVE CARTOGRAPHIC LANDSCAPE — PAN & CLICK NODES TO EXPLORE</span>
          </div>
          <div className="hidden sm:block text-[#686E77]">
            TIMELINE = WHERE | JOURNAL = WHY | ARCHIVE = HOW
          </div>
        </div>

        {/* Viewport Canvas */}
        <div className="relative">
          <JourneyMapViewport
            selectedNode={selectedNode}
            onSelectNode={(node) => setSelectedNode(node)}
          />

          {/* Cartographic Legend */}
          <CartographicLegend />
        </div>

        {/* Milestone Inspector Drawer */}
        <MilestoneInspector
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      </div>

      {/* ============================================================= */}
      {/* 2. CHRONOLOGICAL MILESTONE INDEX & DETAILS                    */}
      {/* ============================================================= */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-[#262B32] pb-3 text-xs font-mono text-[#71899A] uppercase tracking-wider font-semibold">
          <Layers className="w-4 h-4 text-[#536B7A]" />
          <span>CHRONOLOGICAL MILESTONE RECORD & ACCESSIBLE INDEX</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JOURNEY_NODES.map((node) => {
            const isSelected = selectedNode?.id === node.id
            const colors = getProvenanceColor(node.provenance)

            return (
              <article
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-5 rounded-xl border transition-all space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#181B1F] border-[#536B7A] shadow-lg ring-1 ring-[#536B7A]'
                    : 'bg-[#14171A] border-[#262B32] hover:border-[#3E4752]'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-[#20242A] pb-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-wider border inline-block"
                        style={{
                          backgroundColor: colors.badgeBg,
                          color: colors.badgeText,
                          borderColor: colors.badgeBorder
                        }}
                      >
                        {node.provenance}
                      </span>
                      {node.category && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider bg-[#1B2228] text-[#8CC4FF] border border-[#2B3B4C] inline-block">
                          {node.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-[#F0EEE9] font-serif text-base leading-tight">
                      {node.title}
                    </h3>
                    {node.organization && (
                      <p className="text-xs font-mono text-[#9EA4AA]">
                        {node.organization}
                      </p>
                    )}
                  </div>

                  <span className="px-2 py-1 rounded bg-[#101215] border border-[#20242A] text-[11px] font-mono text-[#9EA4AA] shrink-0">
                    {node.date}
                  </span>
                </div>

                {/* Significance */}
                <p className="text-xs text-[#C8C6BF] font-sans leading-relaxed">
                  {node.significance}
                </p>

                {/* Transition */}
                <div className="p-2.5 rounded bg-[#101215] border-l-2 border-[#536B7A] text-[11.5px] font-serif italic text-[#9EA4AA] leading-relaxed">
                  &ldquo;{node.transition}&rdquo;
                </div>

                {/* Journal Deep Link */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-[#20242A]">
                  <Link
                    href={`/journal#${node.journalAnchor}`}
                    className="inline-flex items-center gap-1.5 text-[#71899A] hover:text-[#F0EEE9] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#536B7A]" />
                    <span>Read in Journal →</span>
                  </Link>

                  {node.systemSlug && (
                    <Link
                      href={`/projects/${node.systemSlug}`}
                      className="inline-flex items-center gap-1.5 text-[#9EA4AA] hover:text-[#4E8765] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Terminal className="w-3.5 h-3.5 text-[#4E8765]" />
                      <span>Archive →</span>
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
