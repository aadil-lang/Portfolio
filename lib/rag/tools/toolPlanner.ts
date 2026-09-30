/**
 * TOOL PLANNER — Phase 5B
 *
 * Defines strongly-typed structured data representations for multi-step
 * tool plans, step dependencies, plan lifecycle statuses, and trace telemetry.
 *
 * Principles:
 * - Plans are purely declarative data (no executable code, no functions).
 * - Multi-step plans allow dependency propagation (step-2 dependsOn step-1).
 * - Deterministic validation occurs before any step execution.
 */

import { RequestMode, AskAadilTool, ToolResult } from '@/types/rag'

export type ToolPlanStatus =
  | 'proposed'
  | 'validated'
  | 'executing'
  | 'completed'
  | 'partially_completed'
  | 'rejected'
  | 'awaiting_confirmation'

export interface ToolPlanStep {
  id: string
  toolName: string
  arguments: Record<string, any>
  dependsOn?: string[]
}

export interface ToolPlan {
  planId: string
  goal: string
  steps: ToolPlanStep[]
  requiresConfirmation?: boolean
}

export interface ToolStepResult {
  stepId: string
  toolName: string
  status: 'executed' | 'failed' | 'not_executed' | 'skipped'
  success: boolean
  result?: ToolResult
  errorCode?: string
  durationMs?: number
}

export interface ToolPlanResult {
  planId: string
  status: ToolPlanStatus
  stepResults: ToolStepResult[]
  validationErrorCode?: string
  validationErrorMessage?: string
}

export interface ToolPlanTrace {
  planId: string
  goal: string
  stepCount: number
  status: ToolPlanStatus
  validationDurationMs: number
  executionDurationMs: number
  steps: {
    stepId: string
    toolName: string
    status: string
    durationMs?: number
    errorCode?: string
  }[]
}

/**
 * Creates a single-step ToolPlan (useful for Phase 5A single-tool backward compatibility)
 */
export function createSingleStepPlan(
  toolName: string,
  args: Record<string, any>,
  goal = `Execute ${toolName}`
): ToolPlan {
  const planId = `plan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  return {
    planId,
    goal,
    steps: [
      {
        id: 'step-1',
        toolName,
        arguments: args
      }
    ],
    requiresConfirmation: false
  }
}
