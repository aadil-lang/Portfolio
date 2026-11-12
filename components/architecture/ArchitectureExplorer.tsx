"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  systemsArchitecture
} from '@/data/architecture/systemsArchitecture'
import {
  SystemArchitecture,
  ArchitectureNode,
  ArchitectureCategory
} from '@/data/architecture/types'
import ArchitectureCanvas from './ArchitectureCanvas'
import ComponentInspector from './ComponentInspector'
import FlowController from './FlowController'
import FailureBoundariesView from './FailureBoundariesView'
import TextualAlternative from './TextualAlternative'
import {
  Layers,
  Cpu,
  Workflow,
  ShieldAlert,
  FileText,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Eye,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

type ViewMode = 'overview' | 'flow' | 'failure'

export default function ArchitectureExplorer() {
  const [selectedSystemId, setSelectedSystemId] = useState<string>('ask-aadil')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('overview')
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [showAccessibleText, setShowAccessibleText] = useState<boolean>(false)

  // Filtered systems list based on category tab
  const filteredSystems = useMemo(() => {
    if (selectedCategory === 'all') return systemsArchitecture
    return systemsArchitecture.filter((s) => s.category === selectedCategory)
  }, [selectedCategory])

  // Active system object
  const activeSystem: SystemArchitecture = useMemo(() => {
    return (
      systemsArchitecture.find((s) => s.id === selectedSystemId) ||
      systemsArchitecture[0]
    )
  }, [selectedSystemId])

  // Active step in flow mode
  const activeStep = activeSystem.executionFlow[currentStepIndex] || activeSystem.executionFlow[0]

  // Handlers
  const handleSelectSystem = (systemId: string) => {
    setSelectedSystemId(systemId)
    const sys = systemsArchitecture.find((s) => s.id === systemId)
    if (sys && sys.nodes.length > 0) {
      setSelectedNode(sys.nodes[0])
    }
    setCurrentStepIndex(0)
  }

  const handleSelectNode = (node: ArchitectureNode) => {
    setSelectedNode(node)
  }

  const handleStepChange = (index: number) => {
    setCurrentStepIndex(index)
    const targetStep = activeSystem.executionFlow[index]
    if (targetStep) {
      const matchedNode = activeSystem.nodes.find((n) => n.id === targetStep.activeNodeId)
      if (matchedNode) {
        setSelectedNode(matchedNode)
      }
    }
  }

  return (
    <div className="space-y-10 text-[#D8D6D0] font-sans">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER & PATTERN TAXONOMY TABS                             */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="border-b border-[#242930] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231C] border border-[#5A9A78]/40 text-[#78C29A] text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
              <span>INTERACTIVE ARCHITECTURE EXPLORER</span>
              <span className="text-[#6E7681]">//</span>
              <span>11 CASE STUDIES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#F0EEE9]">
              Systems Architecture & Execution Flows
            </h1>
            <p className="text-xs sm:text-sm text-[#9EA4AA] max-w-3xl">
              Trace real-world execution lifecycles, deterministic gates, and model interactions across all 11 case studies. Every node, transition, and invariant maps directly to verified source code.
            </p>
          </div>

          {/* Accessible Alternative Toggle */}
          <button
            type="button"
            onClick={() => setShowAccessibleText(!showAccessibleText)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2B3542] bg-[#161B22] hover:bg-[#1E2530] text-xs font-mono text-[#D8D6D0] transition-colors shrink-0 self-start md:self-auto"
            aria-pressed={showAccessibleText}
          >
            <Eye className="w-3.5 h-3.5 text-[#5A9A78]" />
            <span>{showAccessibleText ? 'Visual Topology Canvas' : 'Accessible Text View (WCAG)'}</span>
          </button>
        </div>

        {/* Pattern Taxonomy Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-[10px] uppercase text-[#71899A] font-bold mr-1">
            Architectural Pattern:
          </span>
          {[
            { id: 'all', label: 'All Patterns (11)' },
            { id: 'agentic-orchestration', label: 'Agentic & Orchestration' },
            { id: 'retrieval-grounding', label: 'Retrieval & RAG' },
            { id: 'reliability-verification', label: 'Reliability & Verification' },
            { id: 'data-transformation', label: 'Data & ETL' },
            { id: 'deterministic-computation', label: 'Deterministic Physics' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-medium ${
                selectedCategory === cat.id
                  ? 'bg-[#2A313C] text-[#F0EEE9] border border-[#5A9A78]'
                  : 'bg-[#14171A] text-[#8C939D] hover:text-[#D8D6D0] border border-[#262B32]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SYSTEM SELECTOR TABS                                       */}
      {/* ------------------------------------------------------------- */}
      <section aria-label="System Selector" className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#71899A]">
          <span>SELECT SYSTEM TO EXPLORE:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredSystems.map((sys) => {
            const isSelected = sys.id === selectedSystemId
            const isLevel1 = sys.explorationLevel === 'level-1-full'

            return (
              <button
                key={sys.id}
                type="button"
                onClick={() => handleSelectSystem(sys.id)}
                className={`px-3.5 py-2 rounded-xl text-left font-mono transition-all border flex flex-col justify-between gap-1 ${
                  isSelected
                    ? 'bg-[#1A251E] border-[#5A9A78] text-[#F0EEE9] shadow-md shadow-[#5A9A78]/10'
                    : 'bg-[#14171A] border-[#262B32] text-[#8C939D] hover:text-[#D8D6D0] hover:border-[#38414D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs">{sys.name}</span>
                  {isLevel1 ? (
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#18231C] text-[#78C29A] border border-[#5A9A78]/40">
                      LEVEL 1: FULL
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#1E232A] text-[#9EA4AA] border border-[#2B3542]">
                      LEVEL 2: FOCUSED
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#6E7681] truncate max-w-[200px]">
                  {sys.tagline}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. ACTIVE SYSTEM OVERVIEW CARD & VIEW CONTROLS                */}
      {/* ------------------------------------------------------------- */}
      <section className="p-6 rounded-xl bg-[#14171A] border border-[#262B32] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#20252C] pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#5A9A78] font-bold uppercase tracking-wider">
                {activeSystem.category}
              </span>
              <span className="text-[#6E7681]">//</span>
              <span className="text-[#9EA4AA]">
                Ownership: {activeSystem.ownership}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#F0EEE9]">
              {activeSystem.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#C8C6BF] max-w-3xl font-sans">
              {activeSystem.distinctiveEngineeringContribution}
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#181C21] border border-[#2B313A] font-mono text-xs shrink-0 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1.5 rounded transition-all font-semibold ${
                viewMode === 'overview'
                  ? 'bg-[#2A313C] text-[#F0EEE9] shadow-sm'
                  : 'text-[#8C939D] hover:text-[#F0EEE9]'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setViewMode('flow')}
              className={`px-3 py-1.5 rounded transition-all font-semibold flex items-center gap-1.5 ${
                viewMode === 'flow'
                  ? 'bg-[#2A313C] text-[#F0EEE9] shadow-sm'
                  : 'text-[#8C939D] hover:text-[#F0EEE9]'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-[#5A9A78]" />
              <span>Execution Flow ({activeSystem.executionFlow.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('failure')}
              className={`px-3 py-1.5 rounded transition-all font-semibold flex items-center gap-1.5 ${
                viewMode === 'failure'
                  ? 'bg-[#2A313C] text-[#F0EEE9] shadow-sm'
                  : 'text-[#8C939D] hover:text-[#F0EEE9]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#D29922]" />
              <span>Failure Gates ({activeSystem.failureBoundaries.length})</span>
            </button>
          </div>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
          <span className="text-[#71899A] text-[10px] uppercase font-bold mr-1">
            Technologies:
          </span>
          {activeSystem.technologies.map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-[#181C21] text-[#9EA4AA] border border-[#262B32]"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. MAIN INTERACTIVE EXPLORER WORKSPACE                        */}
      {/* ------------------------------------------------------------- */}
      {showAccessibleText ? (
        <TextualAlternative system={activeSystem} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Canvas & Controller Area (7-8 columns on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {viewMode === 'flow' && (
              <FlowController
                steps={activeSystem.executionFlow}
                currentStepIndex={currentStepIndex}
                onStepChange={handleStepChange}
              />
            )}

            {viewMode === 'failure' ? (
              <FailureBoundariesView
                boundaries={activeSystem.failureBoundaries}
                systemName={activeSystem.name}
              />
            ) : (
              <ArchitectureCanvas
                nodes={activeSystem.nodes}
                edges={activeSystem.edges}
                selectedNodeId={selectedNode ? selectedNode.id : null}
                activeStepNodeId={viewMode === 'flow' && activeStep ? activeStep.activeNodeId : null}
                activeEdgeIds={viewMode === 'flow' && activeStep ? activeStep.activeEdgeIds : undefined}
                onSelectNode={handleSelectNode}
                isFlowMode={viewMode === 'flow'}
              />
            )}
          </div>

          {/* Right Component Inspector Sidebar (4-5 columns on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 space-y-4">
            <ComponentInspector
              node={selectedNode}
              systemName={activeSystem.name}
            />

            {/* Quick Navigation to Full Case Study & Decision Records */}
            <div className="p-4 rounded-xl bg-[#14171A] border border-[#262B32] space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#71899A] font-bold block">
                Evidence Cross-References
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href={activeSystem.externalRoute}
                  className="inline-flex items-center justify-between p-2 rounded bg-[#181C21] hover:bg-[#20252B] border border-[#2A2F36] text-[#D8D6D0] hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#5A9A78]" />
                    <span>Read Full Case Study Deep Dive</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#71899A]" />
                </Link>

                <Link
                  href="/systems"
                  className="inline-flex items-center justify-between p-2 rounded bg-[#181C21] hover:bg-[#20252B] border border-[#2A2F36] text-[#9EA4AA] hover:text-[#D8D6D0] transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#71899A]" />
                    <span>Systems Archive Overview</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#71899A]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. RAG LAB SPECIALIST REFERENCE BAR                          */}
      {/* ------------------------------------------------------------- */}
      <section className="p-5 rounded-xl bg-[#14171A] border border-[#262B32] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#58A6FF] font-bold block">
            Dedicated Retrieval Evaluation Sandbox
          </span>
          <p className="text-[#C8C6BF] font-sans">
            Looking to experiment live with BM25, subword vector similarity, and Reciprocal Rank Fusion on our verified corpus?
          </p>
        </div>
        <Link
          href="/rag-lab"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#162332] hover:bg-[#1E3247] border border-[#388BFD]/40 text-[#58A6FF] hover:text-[#79B8FF] font-semibold transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch RAG Evaluation Lab →</span>
        </Link>
      </section>
    </div>
  )
}

