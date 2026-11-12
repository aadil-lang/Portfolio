'use client'

import React, { useState } from 'react'
import {
  ocrAxisSummaries,
  ocrTestRuns,
  OcrTestRun,
  OcrAxisSummary
} from '@/data/evidence/ocrEvaluationData'
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Sliders,
  CheckCircle2,
  XCircle,
  FileCheck,
  Layers,
  ArrowRight
} from 'lucide-react'

export default function OcrEvaluationExplorer() {
  const [selectedAxis, setSelectedAxis] = useState<string>('rotation')
  const [selectedRunId, setSelectedRunId] = useState<string>('run-rotation-5')

  const filteredRuns = ocrTestRuns.filter((r) => r.axis === selectedAxis)
  const activeRun: OcrTestRun =
    ocrTestRuns.find((r) => r.id === selectedRunId) || filteredRuns[0] || ocrTestRuns[0]
  const activeSummary: OcrAxisSummary =
    ocrAxisSummaries.find((s) => s.axis.toLowerCase() === selectedAxis.toLowerCase()) ||
    ocrAxisSummaries[0]

  return (
    <div className="rounded-xl border border-[#262B32] bg-[#14171A] p-5 sm:p-6 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#262B32] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78] font-bold">
              VERIFIED EXPERIMENTAL EVIDENCE // 5-AXIS STRESS HARNESS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif mt-1">
            OCR Robustness & Critical-Field Degradation Visualizer
          </h3>
          <p className="text-xs sm:text-sm text-[#9EA4AA] mt-1 max-w-3xl leading-relaxed">
            Interactive telemetry from 20 automated degradation evaluations on legal land title deeds. Inspect why aggregate accuracy metrics mask catastrophic high-severity failures.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px] px-3 py-1.5 rounded-lg bg-[#181C21] border border-[#2A2F36] text-[#71899A]">
          <Activity className="w-3.5 h-3.5 text-[#5A9A78]" />
          <span>Artifact: robustness_results.json</span>
        </div>
      </div>

      {/* Axis Selector Tabs */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#71899A] font-semibold" id="ocr-axis-label">
          Select Stress Degradation Axis:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="tablist" aria-labelledby="ocr-axis-label">
          {ocrAxisSummaries.map((summary) => {
            const isSelected = selectedAxis.toLowerCase() === summary.axis.toLowerCase()
            return (
              <button
                key={summary.axis}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  const newAxis = summary.axis.toLowerCase()
                  setSelectedAxis(newAxis)
                  const firstRunOfAxis = ocrTestRuns.find((r) => r.axis === newAxis)
                  if (firstRunOfAxis) setSelectedRunId(firstRunOfAxis.id)
                }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-[#5A9A78] bg-[#18261F] text-[#F0EEE9] shadow-sm'
                    : 'border-[#262B32] bg-[#181C21] text-[#9EA4AA] hover:border-[#3E4652] hover:text-[#C8C6BF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">{summary.axis}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                      summary.fail > 0
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                        : 'bg-[#14261C] text-[#5A9A78]'
                    }`}
                  >
                    {summary.fail > 0 ? `${summary.fail} FAIL` : '100% PASS'}
                  </span>
                </div>
                <p className="text-[10.5px] mt-1 text-[#858A90] line-clamp-1">
                  Fail: {summary.firstFailureLevel}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Axis Deep-Dive & Run Picker */}
      <div className="p-4 rounded-xl border border-[#262B32] bg-[#181C21] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#242930]">
          <div>
            <h4 className="font-serif font-bold text-base text-[#F0EEE9]">
              {activeSummary.axis} Axis Overview
            </h4>
            <p className="text-xs text-[#9EA4AA] mt-0.5">{activeSummary.description}</p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#858A90]">Max Tolerant: <strong className="text-[#F0EEE9]">{activeSummary.maxAccurateLevel}</strong></span>
            <span className="text-[#858A90]">Failure Threshold: <strong className="text-rose-400">{activeSummary.firstFailureLevel}</strong></span>
          </div>
        </div>

        {/* Individual Run Buttons */}
        <div className="space-y-1.5">
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#71899A]">
            Tested Severity Levels ({filteredRuns.length} Runs):
          </span>
          <div className="flex flex-wrap gap-2">
            {filteredRuns.map((run) => {
              const isRunActive = run.id === activeRun.id
              const isFail = run.status === 'FAIL'
              return (
                <button
                  key={run.id}
                  onClick={() => setSelectedRunId(run.id)}
                  className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-2 ${
                    isRunActive
                      ? 'border-[#5A9A78] bg-[#1A2E24] text-white shadow-xs'
                      : 'border-[#262B32] bg-[#14171A] text-[#9EA4AA] hover:border-[#3E4652]'
                  }`}
                >
                  {isFail ? (
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9A78]" />
                  )}
                  <span>{run.level}</span>
                  <span className="text-[10px] text-[#71899A]">({run.document})</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Selected Run Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Quantitative Metrics */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[#262B32] bg-[#181C21] space-y-3">
            <div className="flex items-center justify-between font-mono text-xs border-b border-[#242930] pb-2">
              <span className="text-[#858A90]">Evaluation Status:</span>
              <span
                className={`px-2.5 py-0.5 rounded font-bold uppercase text-[11px] ${
                  activeRun.status === 'PASS'
                    ? 'bg-[#18261F] text-[#5A9A78] border border-[#234030]'
                    : 'bg-rose-950/70 text-rose-300 border border-rose-800'
                }`}
              >
                {activeRun.status}
              </span>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA4AA]">Character Error Rate (CER)</span>
                  <span className="text-[#F0EEE9] font-bold">{(activeRun.cer * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[#14171A] h-2 rounded-full overflow-hidden border border-[#262B32]">
                  <div
                    className={`h-full ${activeRun.cer === 0 ? 'bg-[#5A9A78]' : 'bg-rose-500'}`}
                    style={{ width: `${Math.min(100, activeRun.cer * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA4AA]">Word Error Rate (WER)</span>
                  <span className="text-[#F0EEE9] font-bold">{(activeRun.wer * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[#14171A] h-2 rounded-full overflow-hidden border border-[#262B32]">
                  <div
                    className={`h-full ${activeRun.wer === 0 ? 'bg-[#5A9A78]' : 'bg-rose-500'}`}
                    style={{ width: `${Math.min(100, activeRun.wer * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA4AA]">Average Confidence</span>
                  <span className="text-[#F0EEE9] font-bold">{activeRun.confidence.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[#14171A] h-2 rounded-full overflow-hidden border border-[#262B32]">
                  <div
                    className="h-full bg-[#388BFD]"
                    style={{ width: `${activeRun.confidence}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA4AA]">Critical Field Accuracy</span>
                  <span className={`font-bold ${activeRun.criticalFieldAccuracy < 1 ? 'text-rose-400' : 'text-[#5A9A78]'}`}>
                    {(activeRun.criticalFieldAccuracy * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-[#14171A] h-2 rounded-full overflow-hidden border border-[#262B32]">
                  <div
                    className={`h-full ${activeRun.criticalFieldAccuracy === 1 ? 'bg-[#5A9A78]' : 'bg-rose-500'}`}
                    style={{ width: `${activeRun.criticalFieldAccuracy * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operational Risk Callout */}
          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
              activeRun.status === 'FAIL'
                ? 'bg-rose-950/30 border-rose-800/40 text-rose-200'
                : 'bg-[#18261F] border-[#234030] text-[#B8DAC8]'
            }`}
          >
            <div className="flex items-center gap-2 font-mono font-bold uppercase text-[11px]">
              {activeRun.status === 'FAIL' ? (
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-[#5A9A78]" />
              )}
              <span>{activeRun.status === 'FAIL' ? 'Risk Gate Escalation' : 'Automated Gate Approved'}</span>
            </div>
            <p>{activeRun.note}</p>
          </div>
        </div>

        {/* Right 2 Columns: Field-Level Ground Truth vs OCR Audit */}
        <div className="lg:col-span-2 p-4 rounded-xl border border-[#262B32] bg-[#181C21] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#F0EEE9]">
                Field-by-Field Ground-Truth Verification
              </h4>
              <p className="text-[11px] text-[#858A90]">
                Target: Legal Land Title Deed, Tehsil Sadar, District Varanasi
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#71899A]">
              Levenshtein Exact Match
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#262B32] text-[#71899A] text-[10.5px]">
                  <th className="py-2 px-2">Field</th>
                  <th className="py-2 px-2">Ground Truth (Expected)</th>
                  <th className="py-2 px-2">OCR Extracted</th>
                  <th className="py-2 px-2 text-right">Conf.</th>
                  <th className="py-2 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22272E]">
                {Object.entries(activeRun.fields).map(([fieldName, res]) => (
                  <tr
                    key={fieldName}
                    className={`${!res.match ? 'bg-rose-950/20' : ''} hover:bg-[#1C2026] transition-colors`}
                  >
                    <td className="py-2.5 px-2 font-medium text-[#C8C6BF] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span>{fieldName}</span>
                        {res.isCritical && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-950/70 text-amber-300 border border-amber-800/40">
                            CRITICAL
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-[#9EA4AA]">{res.expected}</td>
                    <td
                      className={`py-2.5 px-2 font-semibold ${
                        res.match ? 'text-[#F0EEE9]' : 'text-rose-300 underline decoration-rose-500'
                      }`}
                    >
                      {res.actual || <span className="italic text-[#686E77]">&lt;empty&gt;</span>}
                    </td>
                    <td className="py-2.5 px-2 text-right text-[#858A90]">
                      {res.confidence > 0 ? `${res.confidence.toFixed(1)}%` : '—'}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {res.match ? (
                        <span className="text-[#5A9A78] font-bold">MATCH</span>
                      ) : (
                        <span className="text-rose-400 font-bold">FAIL</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-[11px] font-mono text-[#858A90] border-t border-[#242930] flex items-center justify-between">
            <span>
              Critical Field Rule: If Survey Number or Owner Name fails, overall status escalates to FAIL.
            </span>
            <span className="text-[#71899A]">22 Backend Test Suites</span>
          </div>
        </div>
      </div>
    </div>
  )
}

