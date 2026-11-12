import React from 'react'
import { ExecutionStep } from '@/data/architecture/types'
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
  ShieldCheck,
  Bot,
  UserCheck
} from 'lucide-react'

interface FlowControllerProps {
  steps: ExecutionStep[]
  currentStepIndex: number
  onStepChange: (index: number) => void
}

export default function FlowController({
  steps,
  currentStepIndex,
  onStepChange
}: FlowControllerProps) {
  if (!steps || steps.length === 0) return null

  const currentStep = steps[currentStepIndex] || steps[0]
  const isFirst = currentStepIndex === 0
  const isLast = currentStepIndex === steps.length - 1

  const getNatureBadge = (nature: ExecutionStep['nature']) => {
    switch (nature) {
      case 'deterministic':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#18231C] text-[#78C29A] border border-[#5A9A78]/40">
            <ShieldCheck className="w-3 h-3 text-[#5A9A78]" />
            DETERMINISTIC STEP
          </span>
        )
      case 'probabilistic':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1E2530] text-[#79B8FF] border border-[#388BFD]/40">
            <Bot className="w-3 h-3 text-[#58A6FF]" />
            MODEL INFERENCE STEP
          </span>
        )
      case 'gate':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#262118] text-[#E3B341] border border-[#D29922]/40">
            <UserCheck className="w-3 h-3 text-[#D29922]" />
            VERIFICATION / HUMAN GATE
          </span>
        )
    }
  }

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-[#14171A] border border-[#262B32] space-y-4 font-mono text-xs text-[#D8D6D0]">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#20252C] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-[#71899A] font-bold">
            Execution Flow Walkthrough
          </span>
          <span className="px-2 py-0.5 rounded bg-[#181C21] text-[#F0EEE9] border border-[#2A2F36] text-[11px] font-bold">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onStepChange(Math.max(0, currentStepIndex - 1))}
            disabled={isFirst}
            className="p-1.5 rounded bg-[#181C21] hover:bg-[#20252B] border border-[#2A2F36] text-[#C8C6BF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous Step"
            aria-label="Previous execution step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onStepChange(Math.min(steps.length - 1, currentStepIndex + 1))}
            disabled={isLast}
            className="p-1.5 rounded bg-[#181C21] hover:bg-[#20252B] border border-[#2A2F36] text-[#C8C6BF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Next Step"
            aria-label="Next execution step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onStepChange(0)}
            className="p-1.5 rounded bg-[#181C21] hover:bg-[#20252B] border border-[#2A2F36] text-[#71899A] hover:text-[#D8D6D0] transition-colors"
            title="Reset to Step 1"
            aria-label="Reset to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Progress Dots */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {steps.map((step, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onStepChange(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentStepIndex
                ? 'w-8 bg-[#5A9A78]'
                : idx < currentStepIndex
                ? 'w-3 bg-[#384A3E]'
                : 'w-2 bg-[#22272E]'
            }`}
            title={`Step ${idx + 1}: ${step.title}`}
            aria-label={`Jump to step ${idx + 1}: ${step.title}`}
          />
        ))}
      </div>

      {/* Active Step Details */}
      <div className="space-y-2 pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="font-serif font-bold text-base text-[#F0EEE9]">
            {currentStep.title}
          </h4>
          {getNatureBadge(currentStep.nature)}
        </div>

        <p className="text-xs text-[#C8C6BF] font-sans leading-relaxed">
          {currentStep.description}
        </p>

        <div className="p-2.5 rounded bg-[#181C21] border border-[#2A2F36] text-[11px] space-y-1">
          <span className="text-[10px] uppercase text-[#71899A] block font-bold">
            Simulated Runtime Payload / State
          </span>
          <span className="text-[#78C29A] block font-mono">
            {currentStep.dataPayloadSummary}
          </span>
        </div>
      </div>
    </div>
  )
}

