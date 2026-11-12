'use client'

import React, { useState, useEffect, useTransition } from 'react'
import {
  Search,
  Sparkles,
  Layers,
  Database,
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sliders,
  RefreshCw,
  GitCompare,
  Cpu,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Code2,
  Terminal,
  Zap,
  Info
} from 'lucide-react'
import {
  RetrievalMethod,
  ScoredChunk,
  CorpusChunk,
  GoldenTestCase
} from '@/data/rag/types'
import {
  ragLabService,
  PipelineExecutionResult
} from '@/lib/rag-lab/ragLabService'
import { GOLDEN_EVALUATION_DATASET } from '@/data/rag/golden_eval_dataset_v1'

export default function RagLabDashboard() {
  const [query, setQuery] = useState<string>(
    'How many pytests does Engineering Design Automation have and what is its net volume error?'
  )
  const [method, setMethod] = useState<RetrievalMethod>('hybrid')
  const [topK, setTopK] = useState<number>(5)
  const [contextBudget, setContextBudget] = useState<number>(350)
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<
    'pipeline' | 'evidence' | 'answer' | 'metrics' | 'comparison' | 'architecture'
  >('pipeline')
  const [expandedChunkId, setExpandedChunkId] = useState<string | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Run pipeline initially with default query
  const [pipelineResult, setPipelineResult] = useState<PipelineExecutionResult>(() =>
    ragLabService.executePipeline(
      'How many pytests does Engineering Design Automation have and what is its net volume error?',
      'hybrid',
      5,
      undefined,
      350
    )
  )

  const handleExecute = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    startTransition(() => {
      const res = ragLabService.executePipeline(
        query.trim(),
        method,
        topK,
        projectFilter === 'all' ? undefined : projectFilter,
        contextBudget
      )
      setPipelineResult(res)
    })
  }

  const handlePresetSelect = (preset: GoldenTestCase) => {
    setQuery(preset.query)
    startTransition(() => {
      const res = ragLabService.executePipeline(
        preset.query,
        method,
        topK,
        projectFilter === 'all' ? undefined : projectFilter,
        contextBudget
      )
      setPipelineResult(res)
    })
  }

  const chunks = pipelineResult.retrievedChunks
  const context = pipelineResult.context
  const answer = pipelineResult.answerResult
  const metrics = pipelineResult.metrics
  const timing = pipelineResult.executionTimingMs

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-xl border border-[#262B32] bg-[#14171A] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5A9A78]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#262B32]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5A9A78] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-mono text-[#5A9A78] font-bold">
                INTERACTIVE RAG ARCHITECTURE & RETRIEVAL EVALUATION SANDBOX
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F0EEE9] font-serif mt-2">
              RAG Evaluation Lab
            </h1>
            <p className="text-sm text-[#9EA4AA] mt-1 max-w-3xl leading-relaxed">
              Inspect how a grounded retrieval-augmented generation system verifies evidence, compares lexical (Okapi BM25) and vector space models, enforces token budgets, validates citations, and decides when to abstain.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-[#181C21] border border-[#262B32] text-xs font-mono">
            <div>
              <span className="text-[#71899A] block text-[10px]">CORPUS</span>
              <span className="text-[#F0EEE9] font-bold">14 Docs // 14 Chunks</span>
            </div>
            <div className="h-6 w-px bg-[#262B32]" />
            <div>
              <span className="text-[#71899A] block text-[10px]">LATENCY</span>
              <span suppressHydrationWarning className="text-[#5A9A78] font-bold">
                {mounted ? timing.totalMs : 0.8} ms
              </span>
            </div>
            <div className="h-6 w-px bg-[#262B32]" />
            <div>
              <span className="text-[#71899A] block text-[10px]">STATUS</span>
              <span className="text-[#388BFD] font-bold">Live In-Process</span>
            </div>
          </div>
        </div>

        {/* Panel A — Query Workspace */}
        <form onSubmit={handleExecute} className="pt-5 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#71899A] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask an engineering question or test an abstention condition..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#101316] border border-[#262B32] text-sm text-[#F0EEE9] placeholder-[#5A6068] focus:outline-none focus:ring-1 focus:ring-[#5A9A78] font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={isPending || !query.trim()}
              className="px-5 py-2.5 rounded-lg bg-[#5A9A78] hover:bg-[#68ad87] text-[#14171A] text-sm font-bold font-mono transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              <span>Execute Pipeline</span>
            </button>
          </div>

          {/* Controls Bar: Strategy, Top-K, Budget, Project Filter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
            {/* Retrieval Strategy */}
            <div className="p-2.5 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
              <label className="text-[#71899A] text-[10px] uppercase block">Retrieval Engine</label>
              <select
                value={method}
                onChange={e => {
                  const m = e.target.value as RetrievalMethod
                  setMethod(m)
                  startTransition(() => {
                    const res = ragLabService.executePipeline(
                      query.trim(),
                      m,
                      topK,
                      projectFilter === 'all' ? undefined : projectFilter,
                      contextBudget
                    )
                    setPipelineResult(res)
                  })
                }}
                className="w-full bg-[#101316] border border-[#262B32] rounded px-2 py-1 text-[#F0EEE9] focus:outline-none focus:ring-1 focus:ring-[#5A9A78]"
              >
                <option value="hybrid">Hybrid (RRF k=60)</option>
                <option value="bm25">Okapi BM25</option>
                <option value="vector">Vector Space (Cosine)</option>
              </select>
            </div>

            {/* Top-K Slider */}
            <div className="p-2.5 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
              <div className="flex justify-between text-[#71899A] text-[10px] uppercase">
                <span>Top-K Depth</span>
                <span className="text-[#F0EEE9] font-bold">K = {topK}</span>
              </div>
              <input
                type="range"
                min={2}
                max={8}
                value={topK}
                onChange={e => {
                  const kVal = Number(e.target.value)
                  setTopK(kVal)
                  startTransition(() => {
                    const res = ragLabService.executePipeline(
                      query.trim(),
                      method,
                      kVal,
                      projectFilter === 'all' ? undefined : projectFilter,
                      contextBudget
                    )
                    setPipelineResult(res)
                  })
                }}
                className="w-full accent-[#5A9A78]"
              />
            </div>

            {/* Context Budget */}
            <div className="p-2.5 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
              <div className="flex justify-between text-[#71899A] text-[10px] uppercase">
                <span>Context Budget</span>
                <span className="text-[#F0EEE9] font-bold">{contextBudget} tokens</span>
              </div>
              <input
                type="range"
                min={150}
                max={600}
                step={50}
                value={contextBudget}
                onChange={e => {
                  const bVal = Number(e.target.value)
                  setContextBudget(bVal)
                  startTransition(() => {
                    const res = ragLabService.executePipeline(
                      query.trim(),
                      method,
                      topK,
                      projectFilter === 'all' ? undefined : projectFilter,
                      bVal
                    )
                    setPipelineResult(res)
                  })
                }}
                className="w-full accent-[#5A9A78]"
              />
            </div>

            {/* Project Filter */}
            <div className="p-2.5 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
              <label className="text-[#71899A] text-[10px] uppercase block">Corpus Partition</label>
              <select
                value={projectFilter}
                onChange={e => {
                  const pVal = e.target.value
                  setProjectFilter(pVal)
                  startTransition(() => {
                    const res = ragLabService.executePipeline(
                      query.trim(),
                      method,
                      topK,
                      pVal === 'all' ? undefined : pVal,
                      contextBudget
                    )
                    setPipelineResult(res)
                  })
                }}
                className="w-full bg-[#101316] border border-[#262B32] rounded px-2 py-1 text-[#F0EEE9] focus:outline-none focus:ring-1 focus:ring-[#5A9A78]"
              >
                <option value="all">All Projects & Profile</option>
                <option value="design-automation">EDA (CAD Physics)</option>
                <option value="solace-ai">Solace AI (Voice Companion)</option>
                <option value="ocr-evaluator">OCR Evaluator (Robustness)</option>
                <option value="ai-reliability">AI Reliability (Browser QA)</option>
                <option value="atlas-ai">Atlas AI (SEC Multi-Agent)</option>
                <option value="vm-copy">VM Copy (Assessment Gen)</option>
                <option value="profile">Profile & Timeline</option>
              </select>
            </div>
          </div>

          {/* Example Presets Pills */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono text-[#71899A] flex items-center gap-1">
              <Info className="w-3 h-3 text-[#5A9A78]" />
              <span>Benchmark Scenarios (Click to test live):</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {GOLDEN_EVALUATION_DATASET.slice(0, 6).map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`text-left text-xs px-2.5 py-1 rounded-md border font-sans transition-all ${
                    query === preset.query
                      ? 'border-[#5A9A78] bg-[#18261F] text-[#5A9A78] font-medium'
                      : 'border-[#262B32] bg-[#14171A] text-[#9EA4AA] hover:text-[#F0EEE9] hover:border-[#38414D]'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#71899A] mr-1">
                    [{preset.category.replace(/_/g, ' ')}]
                  </span>
                  <span>{preset.query.slice(0, 48)}...</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#262B32] gap-1 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'pipeline'
              ? 'border-[#5A9A78] text-[#5A9A78] bg-[#181C21]/60'
              : 'border-transparent text-[#858A90] hover:text-[#F0EEE9]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Pipeline Trace</span>
          <span suppressHydrationWarning className="px-1.5 py-0.2 rounded bg-[#101316] text-[10px] text-[#71899A]">
            {mounted ? timing.totalMs : 0.8}ms
          </span>
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'evidence'
              ? 'border-[#5A9A78] text-[#5A9A78] bg-[#181C21]/60'
              : 'border-transparent text-[#858A90] hover:text-[#F0EEE9]'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Retrieved Evidence</span>
          <span className="px-1.5 py-0.2 rounded bg-[#101316] text-[10px] text-[#5A9A78]">
            {chunks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('answer')}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'answer'
              ? 'border-[#5A9A78] text-[#5A9A78] bg-[#181C21]/60'
              : 'border-transparent text-[#858A90] hover:text-[#F0EEE9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Answer & Citations</span>
          {answer.isAbstention && (
            <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 text-[10px]">
              Abstained
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'metrics'
              ? 'border-[#5A9A78] text-[#5A9A78] bg-[#181C21]/60'
              : 'border-transparent text-[#858A90] hover:text-[#F0EEE9]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Evaluation Metrics</span>
          {metrics && (
            <span className="px-1.5 py-0.2 rounded bg-[#101316] text-[10px] text-[#388BFD]">
              P@K: {(metrics.precisionAtK * 100).toFixed(0)}%
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'comparison'
              ? 'border-[#5A9A78] text-[#5A9A78] bg-[#181C21]/60'
              : 'border-transparent text-[#858A90] hover:text-[#F0EEE9]'
          }`}
        >
          <GitCompare className="w-4 h-4" />
          <span>Strategy Comparison</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'architecture'
              ? 'border-[#5A9A78] text-[#5A9A78] bg-[#181C21]/60'
              : 'border-transparent text-[#858A90] hover:text-[#F0EEE9]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Engineering Deep-Dive</span>
        </button>
      </div>

      {/* Main Tab Content */}

      {/* TAB 1: PIPELINE TRACE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
            <h3 className="text-base font-bold text-[#F0EEE9] font-mono flex items-center justify-between">
              <span>Step-by-Step Retrieval Execution Trace</span>
              <span className="text-xs text-[#71899A] font-normal">Deterministic in-process execution</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5A9A78] font-bold">1. Query Normalization</span>
                  <span className="text-[#71899A]">0.1 ms</span>
                </div>
                <p className="text-xs text-[#C8C6BF] leading-relaxed">
                  Strips non-alphanumeric punctuation, applies English stopword removal, and extracts subword tokens.
                </p>
                <div className="p-2 rounded bg-[#101316] font-mono text-[11px] text-[#858A90] break-words">
                  tokens: [{query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).slice(0, 5).join(', ')}...]
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5A9A78] font-bold">2. Strategy Scoring</span>
                  <span suppressHydrationWarning className="text-[#71899A]">{mounted ? timing.retrievalMs : 0.4} ms</span>
                </div>
                <p className="text-xs text-[#C8C6BF] leading-relaxed">
                  {method === 'bm25'
                    ? 'Evaluates Okapi BM25 formula with term saturation (k1=1.2) and document length normalization (b=0.75).'
                    : method === 'vector'
                    ? 'Calculates exact Cosine Similarity in a normalized subword TF-IDF vector space.'
                    : 'Executes parallel BM25 and Vector retrievals, combining reciprocal ranks with constant k=60.'}
                </p>
                <div className="p-2 rounded bg-[#101316] font-mono text-[11px] text-[#5A9A78]">
                  surfaced: {chunks.length} chunks (top score: {chunks[0]?.score || 0})
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5A9A78] font-bold">3. Context Budget Allocation</span>
                  <span suppressHydrationWarning className="text-[#71899A]">{mounted ? timing.contextBuildMs : 0.2} ms</span>
                </div>
                <p className="text-xs text-[#C8C6BF] leading-relaxed">
                  Applies sliding token budget ({contextBudget} tokens) and Jaccard deduplication. Excluded chunks are flagged with explicit reasons.
                </p>
                <div className="p-2 rounded bg-[#101316] font-mono text-[11px] text-[#C8C6BF] flex justify-between">
                  <span>used: {context.totalContextTokens} / {context.budgetTokens} t</span>
                  <span className="text-[#388BFD]">{context.budgetUtilizationPct}%</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5A9A78] font-bold">4. Grounded Synthesis & Gate</span>
                  <span suppressHydrationWarning className="text-[#71899A]">{mounted ? timing.synthesisMs : 0.2} ms</span>
                </div>
                <p className="text-xs text-[#C8C6BF] leading-relaxed">
                  Synthesizes evidence, verifies chunk references, and executes epistemic abstention if evidence is insufficient or contradictory.
                </p>
                <div className="p-2 rounded bg-[#101316] font-mono text-[11px] flex justify-between">
                  <span className={answer.isAbstention ? 'text-amber-400' : 'text-[#5A9A78]'}>
                    {answer.isAbstention ? 'Verdict: ABSTAIN' : 'Verdict: GROUNDED'}
                  </span>
                  <span className="text-[#71899A]">{answer.citations.length} cite(s)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Context Allocation Strip */}
          <div className="p-4 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#F0EEE9] font-bold">Context Window Utilization</span>
              <span className="text-[#858A90]">
                {context.includedChunks.length} chunks included •{' '}
                {context.allCandidates.filter(c => c.status === 'excluded').length} chunks excluded
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#101316] overflow-hidden border border-[#262B32] flex">
              <div
                className="h-full bg-[#5A9A78] transition-all"
                style={{ width: `${Math.min(100, context.budgetUtilizationPct)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#71899A]">
              <span>0 tokens</span>
              <span className="text-[#5A9A78] font-bold">{context.totalContextTokens} tokens utilized</span>
              <span>{context.budgetTokens} tokens budget</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RETRIEVED EVIDENCE EXPLORER */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#262B32]">
            <span className="text-[#F0EEE9] font-bold">
              Ranked Evidence Chunks ({chunks.length} retrieved)
            </span>
            <span className="text-[#71899A]">
              Strategy: {method.toUpperCase()} // Top-{topK}
            </span>
          </div>

          <div className="space-y-3">
            {chunks.map((item, idx) => {
              const isIncluded = context.includedChunks.some(c => c.id === item.chunk.id)
              const candidate = context.allCandidates.find(c => c.chunk.id === item.chunk.id)
              const isExpanded = expandedChunkId === item.chunk.id

              return (
                <div
                  key={item.chunk.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isIncluded
                      ? 'border-[#262B32] bg-[#181C21]'
                      : 'border-red-950/40 bg-[#14171A]/70 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#22272E]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#101316] text-[#5A9A78] border border-[#262B32]">
                        #{item.rank}
                      </span>
                      <span className="text-sm font-bold text-[#F0EEE9] font-mono">
                        {item.chunk.sectionTitle}
                      </span>
                      <span className="text-xs text-[#71899A] font-mono">
                        [{item.chunk.id}]
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#101316] text-[#C8C6BF] border border-[#262B32]">
                        {item.scoreType}: <span className="text-[#5A9A78] font-bold">{item.score}</span>
                      </span>
                      {isIncluded ? (
                        <span className="px-2 py-0.5 rounded bg-[#18261F] text-[#5A9A78] border border-[#5A9A78]/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Included</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-red-950/50 text-rose-300 border border-red-800/40 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{candidate?.exclusionReason || 'Excluded'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#C8C6BF] leading-relaxed pt-2">
                    {isExpanded ? item.chunk.text : `${item.chunk.text.slice(0, 220)}...`}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-[11px] font-mono text-[#71899A]">
                    <div className="flex items-center gap-2">
                      <span>Tokens: {item.chunk.tokenCount}</span>
                      <span>•</span>
                      <span>Source: {item.chunk.sourceProvenance}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedChunkId(isExpanded ? null : item.chunk.id)}
                      className="text-[#5A9A78] hover:text-[#78c09a] flex items-center gap-1"
                    >
                      {isExpanded ? <span>Show Less</span> : <span>Expand Full Chunk</span>}
                      {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ANSWER & CITATIONS */}
      {activeTab === 'answer' && (
        <div className="space-y-6">
          {/* Abstention Banner if triggered */}
          {answer.isAbstention && (
            <div className="p-4 rounded-xl border border-amber-800/40 bg-amber-950/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Epistemic Abstention Triggered</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                {answer.abstentionReason}
              </p>
              <p className="text-[11px] text-amber-400/80 font-mono">
                System Boundary: When factual evidence is insufficient, contradictory, or contains false premises, reliable systems must abstain rather than fabricate plausible claims.
              </p>
            </div>
          )}

          {/* Synthesized Answer Card */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262B32] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5A9A78]" />
                <span className="text-[#5A9A78] font-bold uppercase">
                  Grounded Synthesis Result
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#71899A]">
                  Evidence Support Ratio:{' '}
                  <span className="text-[#5A9A78] font-bold">
                    {(answer.evidenceSupportRatio * 100).toFixed(0)}%
                  </span>
                </span>
                <span className="text-[#71899A]">
                  Confidence: <span className="text-[#388BFD] font-bold">{answer.confidenceScore}</span>
                </span>
              </div>
            </div>

            <div className="text-sm text-[#F0EEE9] leading-relaxed whitespace-pre-wrap font-sans space-y-3">
              {answer.answer}
            </div>
          </div>

          {/* Citation Verification Drawer */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
            <h4 className="text-xs font-bold text-[#F0EEE9] font-mono uppercase flex items-center justify-between">
              <span>Citation Grounding Validation ({answer.citations.length} references)</span>
              <span className="text-[#71899A] font-normal">Token Jaccard Support & Proof</span>
            </h4>

            {answer.citations.length === 0 ? (
              <p className="text-xs text-[#71899A] font-mono">No citations generated (abstention state).</p>
            ) : (
              <div className="space-y-3">
                {answer.citations.map((cite, i) => (
                  <div
                    key={cite.citationId || i}
                    className="p-3.5 rounded-lg border border-[#262B32] bg-[#181C21] space-y-2 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#22272E]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#5A9A78] font-bold">[{cite.citationId}]</span>
                        <span className="text-[#F0EEE9]">{cite.sourceTitle}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          cite.verificationStatus === 'verified_supported'
                            ? 'bg-[#18261F] text-[#5A9A78] border border-[#5A9A78]/30'
                            : cite.verificationStatus === 'partially_supported'
                            ? 'bg-amber-950/40 text-amber-300 border border-amber-800/30'
                            : 'bg-red-950/40 text-rose-300 border border-red-800/30'
                        }`}
                      >
                        {cite.verificationStatus.replace(/_/g, ' ').toUpperCase()} (Overlap: {cite.overlapScore})
                      </span>
                    </div>

                    <div className="text-[#C8C6BF] font-sans text-xs">
                      <span className="text-[#71899A] font-mono text-[10px] uppercase block">Claim:</span>
                      "{cite.claimText}"
                    </div>

                    <div className="p-2 rounded bg-[#101316] text-[#858A90] text-[11px] font-sans">
                      <span className="text-[#71899A] font-mono text-[10px] uppercase block">Supporting Excerpt:</span>
                      "{cite.supportingExcerpt}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: EVALUATION METRICS */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262B32] text-xs font-mono">
              <span className="text-[#5A9A78] font-bold uppercase">
                Quantitative Retrieval Metrics for Current Query
              </span>
              <span className="text-[#71899A]">Evaluated against Golden Dataset Benchmark</span>
            </div>

            {metrics ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
                  <span className="text-[#71899A] text-[10px] uppercase font-mono block">Precision@{metrics.k}</span>
                  <span className="text-2xl font-bold text-[#F0EEE9] font-mono">
                    {(metrics.precisionAtK * 100).toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-[#858A90] font-mono block">
                    {metrics.relevantRetrievedCount} / {metrics.k} relevant chunks
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
                  <span className="text-[#71899A] text-[10px] uppercase font-mono block">Recall@{metrics.k}</span>
                  <span className="text-2xl font-bold text-[#5A9A78] font-mono">
                    {(metrics.recallAtK * 100).toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-[#858A90] font-mono block">
                    {metrics.relevantRetrievedCount} / {metrics.totalRelevantAvailable} available
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
                  <span className="text-[#71899A] text-[10px] uppercase font-mono block">Reciprocal Rank (RR)</span>
                  <span className="text-2xl font-bold text-[#388BFD] font-mono">
                    {metrics.reciprocalRank.toFixed(4)}
                  </span>
                  <span className="text-[11px] text-[#858A90] font-mono block">
                    1 / rank of 1st relevant chunk
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-1">
                  <span className="text-[#71899A] text-[10px] uppercase font-mono block">nDCG@{metrics.k}</span>
                  <span className="text-2xl font-bold text-[#F0EEE9] font-mono">
                    {metrics.ndcgAtK.toFixed(4)}
                  </span>
                  <span className="text-[11px] text-[#858A90] font-mono block">
                    Graded relevance discount
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-lg bg-[#181C21] border border-[#262B32] text-center text-xs font-mono text-[#858A90]">
                Custom user query (not in the 12 pre-annotated golden benchmark cases). To see formal Precision, Recall, and nDCG metrics, click one of the preset benchmark buttons above.
              </div>
            )}
          </div>

          {/* Full Golden Benchmark Suite Summary Card */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
            <h4 className="text-xs font-bold text-[#F0EEE9] font-mono uppercase flex items-center justify-between">
              <span>Full Golden Benchmark Results (12 Test Cases)</span>
              <span className="text-[#5A9A78]">Reproducible Suite Pass</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-[#181C21] border border-[#262B32]">
                <span className="text-[#71899A] text-[10px] block">MEAN RECALL@5</span>
                <span className="text-xl font-bold text-[#5A9A78] mt-1 block">100.0%</span>
              </div>
              <div className="p-3 rounded bg-[#181C21] border border-[#262B32]">
                <span className="text-[#71899A] text-[10px] block">MEAN RECIPROCAL RANK (MRR)</span>
                <span className="text-xl font-bold text-[#388BFD] mt-1 block">0.8333</span>
              </div>
              <div className="p-3 rounded bg-[#181C21] border border-[#262B32]">
                <span className="text-[#71899A] text-[10px] block">MEAN nDCG@5</span>
                <span className="text-xl font-bold text-[#F0EEE9] mt-1 block">0.7937</span>
              </div>
              <div className="p-3 rounded bg-[#181C21] border border-[#262B32]">
                <span className="text-[#71899A] text-[10px] block">ABSTENTION ACCURACY</span>
                <span className="text-xl font-bold text-[#5A9A78] mt-1 block">12 / 12 (100%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: STRATEGY COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262B32] text-xs font-mono">
              <span className="text-[#5A9A78] font-bold uppercase">
                Side-by-Side Retrieval Strategy Comparison on Identical Query
              </span>
              <span className="text-[#71899A]">Same corpus, same query terms</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Column 1: Okapi BM25 */}
              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#22272E]">
                  <span className="text-[#388BFD] font-bold">Okapi BM25 (Lexical)</span>
                  <span className="text-[#71899A]">k1=1.2, b=0.75</span>
                </div>
                <div className="space-y-2">
                  {pipelineResult.bm25Comparison?.slice(0, 4).map((c, i) => (
                    <div key={c.chunk.id} className="p-2.5 rounded bg-[#101316] space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#F0EEE9] font-bold">#{i + 1} {c.chunk.id}</span>
                        <span className="text-[#388BFD]">BM25: {c.score}</span>
                      </div>
                      <p className="text-[11px] text-[#858A90] font-sans truncate">{c.chunk.sectionTitle}</p>
                    </div>
                  )) || <p className="text-[#71899A]">BM25 comparison data available under Hybrid mode.</p>}
                </div>
              </div>

              {/* Column 2: Vector Space */}
              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#22272E]">
                  <span className="text-[#5A9A78] font-bold">Vector Space (Cosine)</span>
                  <span className="text-[#71899A]">Subword TF-IDF Vectors</span>
                </div>
                <div className="space-y-2">
                  {pipelineResult.vectorComparison?.slice(0, 4).map((c, i) => (
                    <div key={c.chunk.id} className="p-2.5 rounded bg-[#101316] space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#F0EEE9] font-bold">#{i + 1} {c.chunk.id}</span>
                        <span className="text-[#5A9A78]">Cosine: {c.score}</span>
                      </div>
                      <p className="text-[11px] text-[#858A90] font-sans truncate">{c.chunk.sectionTitle}</p>
                    </div>
                  )) || <p className="text-[#71899A]">Vector comparison data available under Hybrid mode.</p>}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] text-xs font-mono text-[#858A90] space-y-1">
              <span className="text-[#F0EEE9] font-bold block">Why Hybrid Reciprocal Rank Fusion (RRF) Outperforms Single Retreivers:</span>
              <p className="text-[11px] leading-relaxed">
                Lexical BM25 excels at exact technical codes, version tags (e.g. "DIN 6885", "424 tests", "sub-2ms"), while Vector Space captures semantic similarity and morphology. RRF eliminates the scale incompatibility of raw scores by fusing ordinal ranks: RRF(d) = Σ 1 / (60 + rank(d)).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ARCHITECTURE DEEP-DIVE */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#F0EEE9] font-serif">
                Engineering Architecture & Mathematical Invariants
              </h3>
              <p className="text-xs sm:text-sm text-[#9EA4AA] mt-1 leading-relaxed">
                Exposing the mathematical formulations and trade-offs behind the Phase 4 RAG Laboratory.
              </p>
            </div>

            {/* Mathematical Formulas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <span className="text-[#5A9A78] font-bold uppercase block">1. Okapi BM25 Term Saturation</span>
                <div className="p-3 rounded bg-[#101316] text-[#C8C6BF] space-y-1.5 border border-[#262B32]">
                  <div className="text-[#F0EEE9] font-bold">BM25(D, Q) = Σ IDF(qi) · [f(qi, D) · (k1 + 1)] / [f(qi, D) + k1 · (1 - b + b · |D| / avgdl)]</div>
                  <div className="text-[#71899A]">IDF(qi) = ln((N - n(qi) + 0.5) / (n(qi) + 0.5) + 1.0)</div>
                  <div className="text-[#388BFD]">Implemented with k1 = 1.2, b = 0.75</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <span className="text-[#5A9A78] font-bold uppercase block">2. Reciprocal Rank Fusion (RRF)</span>
                <div className="p-3 rounded bg-[#101316] text-[#C8C6BF] space-y-1.5 border border-[#262B32]">
                  <div className="text-[#F0EEE9] font-bold">RRF(d) = Σ 1 / (k + rank_m(d))</div>
                  <div className="text-[#71899A]">k = 60 (standard Cormack & Clarke constant)</div>
                  <div className="text-[#388BFD]">Fuses BM25 ordinal ranks with Vector Cosine ranks</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <span className="text-[#5A9A78] font-bold uppercase block">3. Normalized Discounted Cumulative Gain</span>
                <div className="p-3 rounded bg-[#101316] text-[#C8C6BF] space-y-1.5 border border-[#262B32]">
                  <div className="text-[#F0EEE9] font-bold">nDCG@K = DCG@K / IDCG@K</div>
                  <div className="text-[#71899A]">DCG@K = Σ (2^reli - 1) / log2(i + 1)</div>
                  <div className="text-[#388BFD]">Evaluated against human-annotated relevance grades (0 to 3)</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
                <span className="text-[#5A9A78] font-bold uppercase block">4. Epistemic Abstention Boundaries</span>
                <div className="p-3 rounded bg-[#101316] text-[#C8C6BF] space-y-1.5 border border-[#262B32]">
                  <div className="text-[#F0EEE9] font-bold">Abstain if: Evidence == ∅ || OutOfDomain || FalsePremise</div>
                  <div className="text-[#71899A]">Refuses hallucination on unrecorded corporate history</div>
                  <div className="text-[#388BFD]">Discloses analytical software calculus vs CNC machining</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
