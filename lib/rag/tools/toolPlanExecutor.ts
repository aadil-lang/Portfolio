/**
 * TOOL PLAN EXECUTOR — Phase 5B
 *
 * Deterministically executes validated ToolPlans in topological step order.
 * Handles step dependencies, failure isolation, context propagation, and
 * detailed step timing telemetry.
 *
 * Failure Semantics:
 * - If a dependency fails, dependent steps receive status: 'not_executed' and errorCode: 'DEPENDENCY_FAILED'.
 * - Independent steps continue execution.
 * - Overall status is 'completed' if all steps pass, or 'partially_completed' if some pass and others fail/skip.
 */

import { toolRegistry } from '@/lib/rag/tools/toolRegistry'
import { validateToolPlan } from '@/lib/rag/tools/toolPlanValidator'
import {
  ToolPlan,
  ToolPlanResult,
  ToolPlanStatus,
  ToolStepResult,
  ToolPlanStep
} from '@/lib/rag/tools/toolPlanner'

export async function executeToolPlan(plan: ToolPlan): Promise<ToolPlanResult> {
  // 1. Validate plan first
  const validation = validateToolPlan(plan)
  if (!validation.valid) {
    return {
      planId: plan?.planId || 'unknown',
      status: 'rejected',
      stepResults: [],
      validationErrorCode: validation.errorCode,
      validationErrorMessage: validation.errorMessage
    }
  }

  const validatedPlan = validation.validatedPlan!
  const stepResults: ToolStepResult[] = []
  const stepStatusMap = new Map<string, ToolStepResult>()

  // Context propagation map (e.g. step-1 resolved project: 'loom-ai')
  const executionContext: Record<string, any> = {}

  // 2. Determine execution order (topological order)
  const executionOrder = getTopologicalOrder(validatedPlan.steps)

  for (const step of executionOrder) {
    // Check if any dependency failed
    let dependencyFailed = false
    if (step.dependsOn && Array.isArray(step.dependsOn)) {
      for (const depId of step.dependsOn) {
        const depRes = stepStatusMap.get(depId)
        if (!depRes || !depRes.success) {
          dependencyFailed = true
          break
        }
      }
    }

    if (dependencyFailed) {
      const stepRes: ToolStepResult = {
        stepId: step.id,
        toolName: step.toolName,
        status: 'not_executed',
        success: false,
        errorCode: 'DEPENDENCY_FAILED',
        durationMs: 0
      }
      stepResults.push(stepRes)
      stepStatusMap.set(step.id, stepRes)
      continue
    }

    // Context Propagation: if arguments rely on contextual project from previous steps
    const finalArgs = { ...step.arguments }

    // Propagate context from earlier steps (project, draftId, authorizationId)
    if (executionContext.resolvedProject) {
      if (!finalArgs.project && !finalArgs.slug && !finalArgs.target && !finalArgs.entity) {
        finalArgs.project = executionContext.resolvedProject
      } else if (
        finalArgs.target === 'resolved project' ||
        finalArgs.project === 'resolved project' ||
        finalArgs.entity === 'resolved project'
      ) {
        finalArgs.project = executionContext.resolvedProject
        finalArgs.target = executionContext.resolvedProject
        finalArgs.entity = executionContext.resolvedProject
      }
    }

    if (executionContext.draftId && !finalArgs.draftId) {
      finalArgs.draftId = executionContext.draftId
    }
    if (executionContext.authorizationId && !finalArgs.authorizationId) {
      finalArgs.authorizationId = executionContext.authorizationId
    }

    // Execute step
    const startTime = Date.now()
    try {
      const result = await toolRegistry.executeTool(step.toolName, finalArgs)
      const durationMs = Date.now() - startTime

      const stepRes: ToolStepResult = {
        stepId: step.id,
        toolName: step.toolName,
        status: result.success ? 'executed' : (result.errorCode === 'ACTION_REQUIRES_CONFIRMATION' ? 'not_executed' : 'failed'),
        success: result.success,
        result,
        errorCode: result.errorCode,
        durationMs
      }

      stepResults.push(stepRes)
      stepStatusMap.set(step.id, stepRes)

      // Propagate context if successful
      if (result.success && result.data) {
        if (result.data.projectSlug) {
          executionContext.resolvedProject = result.data.projectSlug
        } else if (result.data.items && result.data.items.length > 0) {
          const firstEntity = result.data.items[0].entity || result.data.items[0].project
          if (firstEntity) {
            executionContext.resolvedProject = firstEntity
          }
        }

        if (result.data.draftId) {
          executionContext.draftId = result.data.draftId
        }
        if (result.data.authorizationId) {
          executionContext.authorizationId = result.data.authorizationId
        }
      }

      // If step failed due to confirmation required, pause multi-step execution
      if (!result.success && (result.errorCode === 'ACTION_REQUIRES_CONFIRMATION' || result.errorCode === 'AUTHORIZATION_NOT_APPROVED')) {
        break
      }
    } catch (err: any) {
      const durationMs = Date.now() - startTime
      const stepRes: ToolStepResult = {
        stepId: step.id,
        toolName: step.toolName,
        status: 'failed',
        success: false,
        errorCode: 'EXECUTION_EXCEPTION',
        durationMs
      }
      stepResults.push(stepRes)
      stepStatusMap.set(step.id, stepRes)
    }
  }

  // 3. Compute overall status
  const successCount = stepResults.filter(r => r.success).length
  const hasAwaitingConf = stepResults.some(r => r.errorCode === 'ACTION_REQUIRES_CONFIRMATION' || r.errorCode === 'AUTHORIZATION_NOT_APPROVED')

  let overallStatus: ToolPlanStatus = 'completed'

  if (hasAwaitingConf) {
    overallStatus = 'awaiting_confirmation'
  } else if (successCount === 0 && stepResults.length > 0) {
    overallStatus = 'rejected'
  } else if (successCount < stepResults.length) {
    overallStatus = 'partially_completed'
  }

  return {
    planId: validatedPlan.planId,
    status: overallStatus,
    stepResults
  }
}

/**
 * Helper to get topological execution order
 */
function getTopologicalOrder(steps: ToolPlanStep[]): ToolPlanStep[] {
  const stepMap = new Map<string, ToolPlanStep>()
  const inDegree: Record<string, number> = {}
  const graph: Record<string, string[]> = {}

  for (const step of steps) {
    stepMap.set(step.id, step)
    inDegree[step.id] = 0
    graph[step.id] = []
  }

  for (const step of steps) {
    if (step.dependsOn && Array.isArray(step.dependsOn)) {
      for (const parentId of step.dependsOn) {
        if (graph[parentId]) {
          graph[parentId].push(step.id)
          inDegree[step.id] = (inDegree[step.id] || 0) + 1
        }
      }
    }
  }

  const queue: string[] = []
  for (const step of steps) {
    if (inDegree[step.id] === 0) {
      queue.push(step.id)
    }
  }

  const result: ToolPlanStep[] = []
  while (queue.length > 0) {
    const currentId = queue.shift()!
    result.push(stepMap.get(currentId)!)

    for (const neighborId of graph[currentId] || []) {
      inDegree[neighborId]--
      if (inDegree[neighborId] === 0) {
        queue.push(neighborId)
      }
    }
  }

  return result.length === steps.length ? result : steps
}
