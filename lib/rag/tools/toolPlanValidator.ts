/**
 * TOOL PLAN VALIDATOR — Phase 5B
 *
 * Deterministically validates proposed LLM tool plans before execution.
 * Enforces strict policy, security boundaries, cycle detection, argument safety,
 * and maximum step limits.
 *
 * Principles:
 * - The LLM proposes plans; the validator deterministically decides if allowed.
 * - Any validation failure rejects the entire plan immediately (no partial execution of invalid plans).
 */

import { toolRegistry } from '@/lib/rag/tools/toolRegistry'
import { ToolPlan, ToolPlanStep } from '@/lib/rag/tools/toolPlanner'
import { validateAuthorization } from '@/lib/rag/tools/authorization'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { projectsMetadata } from '@/data/canonical/projectsMetadata'

export const MAX_PLAN_STEPS = 5

export interface ValidationResult {
  valid: boolean
  errorCode?: string
  errorMessage?: string
  validatedPlan?: ToolPlan
}

const CANONICAL_ROUTES: Record<string, string> = {
  '/': '/',
  '/about': '/about',
  '/projects': '/projects',
  '/systems': '/systems',
  '/timeline': '/timeline',
  '/experience': '/experience',
  '/journal': '/journal',
  '/contact': '/contact',
  '/ai-engineering': '/ai-engineering',
  'home': '/',
  'about': '/about',
  'projects': '/projects',
  'systems': '/systems',
  'timeline': '/timeline',
  'experience': '/experience',
  'journal': '/journal',
  'contact': '/contact',
  'contact page': '/contact',
  'ai-engineering': '/ai-engineering',
  'ai engineering': '/ai-engineering'
}

/**
 * Validates a ToolPlan deterministically
 */
export function validateToolPlan(plan: ToolPlan): ValidationResult {
  if (!plan || !Array.isArray(plan.steps)) {
    return {
      valid: false,
      errorCode: 'INVALID_PLAN_STRUCTURE',
      errorMessage: 'Tool plan must contain a valid steps array.'
    }
  }

  // 1. Step count validation
  if (plan.steps.length === 0) {
    return {
      valid: false,
      errorCode: 'EMPTY_PLAN',
      errorMessage: 'Tool plan contains no steps.'
    }
  }

  if (plan.steps.length > MAX_PLAN_STEPS) {
    return {
      valid: false,
      errorCode: 'PLAN_TOO_LARGE',
      errorMessage: `Tool plan exceeds maximum step limit of ${MAX_PLAN_STEPS} steps (got ${plan.steps.length}).`
    }
  }

  const stepIds = new Set<string>()
  for (const step of plan.steps) {
    if (!step.id || typeof step.id !== 'string') {
      return {
        valid: false,
        errorCode: 'INVALID_STEP_ID',
        errorMessage: 'All plan steps must have a valid string id.'
      }
    }
    if (stepIds.has(step.id)) {
      return {
        valid: false,
        errorCode: 'DUPLICATE_STEP_ID',
        errorMessage: `Duplicate step id detected: ${step.id}`
      }
    }
    stepIds.add(step.id)
  }

  // 2. Tool existence & side-effect policy checks
  for (const step of plan.steps) {
    const toolName = step.toolName
    if (!toolName || typeof toolName !== 'string') {
      return {
        valid: false,
        errorCode: 'TOOL_NOT_FOUND',
        errorMessage: `Step ${step.id} has invalid toolName.`
      }
    }

    // Explicitly reject unsupported side-effect tools
    if (
      toolName === 'calendar.create' ||
      toolName === 'phone.call' ||
      toolName.startsWith('side_effect.') ||
      toolName.startsWith('action.')
    ) {
      return {
        valid: false,
        errorCode: 'SIDE_EFFECT_NOT_ENABLED',
        errorMessage: `Tool "${toolName}" is a mutating side-effect action and is not enabled in Phase 6.`
      }
    }

    const tool = toolRegistry.getTool(toolName)
    if (!tool) {
      return {
        valid: false,
        errorCode: 'TOOL_NOT_FOUND',
        errorMessage: `Tool "${toolName}" is not registered in the Tool Registry.`
      }
    }

    if (tool.risk === 'side_effect') {
      if (toolName !== 'email.send') {
        return {
          valid: false,
          errorCode: 'SIDE_EFFECT_NOT_ENABLED',
          errorMessage: `Tool "${toolName}" has side_effect risk and is disabled in Phase 6.`
        }
      }
    }

    // 3. Argument validation per tool
    const argCheck = validateToolArguments(toolName, step.arguments || {})
    if (!argCheck.valid) {
      return {
        valid: false,
        errorCode: argCheck.errorCode,
        errorMessage: `Step ${step.id} (${toolName}) argument error: ${argCheck.errorMessage}`
      }
    }
  }

  // 4. Dependency checks
  for (const step of plan.steps) {
    if (step.dependsOn && Array.isArray(step.dependsOn)) {
      for (const depId of step.dependsOn) {
        if (depId === step.id) {
          return {
            valid: false,
            errorCode: 'PLAN_CYCLE',
            errorMessage: `Step ${step.id} cannot depend on itself.`
          }
        }
        if (!stepIds.has(depId)) {
          return {
            valid: false,
            errorCode: 'INVALID_DEPENDENCY',
            errorMessage: `Step ${step.id} depends on non-existent step id "${depId}".`
          }
        }
      }
    }
  }

  // 5. Dependency Cycle Detection (Topological / DFS)
  if (hasCycle(plan.steps)) {
    return {
      valid: false,
      errorCode: 'PLAN_CYCLE',
      errorMessage: 'Tool plan contains circular step dependencies.'
    }
  }

  return {
    valid: true,
    validatedPlan: plan
  }
}

/**
 * Validates step arguments against tool constraints
 */
function validateToolArguments(
  toolName: string,
  args: Record<string, any>
): { valid: boolean; errorCode?: string; errorMessage?: string } {
  if (toolName === 'portfolio.open') {
    const raw = (args.entity || args.slug || args.target || '').toLowerCase().trim()
    if (!raw) {
      return { valid: true } // defaults to homepage
    }

    // Security check: reject directory traversal or arbitrary filesystem paths
    if (
      raw.includes('..') ||
      raw.includes('/') && !raw.startsWith('/') ||
      raw.includes('\\') ||
      raw.includes('etc/passwd') ||
      raw.includes('passwd') ||
      raw.includes('c:')
    ) {
      return {
        valid: false,
        errorCode: 'INVALID_PORTFOLIO_ENTITY',
        errorMessage: `Entity "${raw}" is an invalid or prohibited path.`
      }
    }

    // Verify entity resolves to a canonical route or project slug
    const isKnownRoute = Boolean(CANONICAL_ROUTES[raw]) || raw.startsWith('/')
    const isKnownProject = projectsMetadata.some(
      p => p.slug === raw || p.title.toLowerCase().includes(raw)
    )

    if (!isKnownRoute && !isKnownProject && raw !== 'journal' && raw !== 'contact' && raw !== 'home') {
      return {
        valid: false,
        errorCode: 'INVALID_PORTFOLIO_ENTITY',
        errorMessage: `Entity "${raw}" is not a recognized canonical portfolio destination.`
      }
    }
  }

  if (toolName === 'github.open') {
    const target = (args.target || args.url || args.project || args.slug || '').trim()
    if (target.startsWith('http://') || target.startsWith('https://')) {
      if (!target.toLowerCase().startsWith('https://github.com/')) {
        return {
          valid: false,
          errorCode: 'INVALID_URL',
          errorMessage: `URL "${target}" is not an authorized GitHub destination.`
        }
      }
    }
  }

  return { valid: true }
}

/**
 * Cycle detection via Kahn's algorithm or DFS
 */
function hasCycle(steps: ToolPlanStep[]): boolean {
  const inDegree: Record<string, number> = {}
  const graph: Record<string, string[]> = {}

  for (const step of steps) {
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
  for (const id of Object.keys(inDegree)) {
    if (inDegree[id] === 0) {
      queue.push(id)
    }
  }

  let visitedCount = 0
  while (queue.length > 0) {
    const current = queue.shift()!
    visitedCount++

    for (const neighbor of graph[current] || []) {
      inDegree[neighbor]--
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor)
      }
    }
  }

  return visitedCount !== steps.length
}
