/**
 * ASK AADIL TOOL REGISTRY — Phase 5A
 *
 * Strongly-typed deterministic tool registry.
 * Decouples LLM query intent classification from executable system tools.
 *
 * Core Principle:
 * "The LLM decides what the user is asking.
 *  Deterministic tools define what the system is actually allowed to do."
 */

import { AskAadilTool, ToolResult, ToolRisk } from '@/types/rag'

export class ToolRegistry {
  private tools: Map<string, AskAadilTool> = new Map()

  /**
   * Register a deterministic tool.
   */
  registerTool(tool: AskAadilTool): void {
    if (!tool.name || typeof tool.execute !== 'function') {
      throw new Error(`Invalid tool registration: missing name or execute function`)
    }
    this.tools.set(tool.name, tool)
  }

  /**
   * Get a registered tool by name.
   */
  getTool(name: string): AskAadilTool | undefined {
    return this.tools.get(name)
  }

  /**
   * List all registered tools with metadata.
   */
  listTools(): AskAadilTool[] {
    return Array.from(this.tools.values())
  }

  /**
   * Safely execute a registered tool by name.
   * If tool is not registered, returns a deterministic error result.
   */
  async executeTool(name: string, input: any): Promise<ToolResult> {
    const tool = this.getTool(name)
    if (!tool) {
      return {
        success: false,
        toolName: name,
        message: `Tool "${name}" is not registered in the Ask Aadil Tool Registry.`,
        errorCode: 'TOOL_NOT_FOUND'
      }
    }

    try {
      return await tool.execute(input)
    } catch (err: any) {
      return {
        success: false,
        toolName: name,
        message: `Tool execution failed: ${err.message || 'Unknown error'}`,
        errorCode: 'TOOL_EXECUTION_ERROR'
      }
    }
  }
}

import { portfolioSearchTool, portfolioOpenTool } from './portfolioTools'
import { githubOpenTool, linkedinOpenTool, contactOpenTool } from './navigationTools'
import { emailDraftTool, emailSendTool } from './emailTools'

export const toolRegistry = new ToolRegistry()

// Register Phase 5A Read-Only and Navigation Tools
toolRegistry.registerTool(portfolioSearchTool)
toolRegistry.registerTool(portfolioOpenTool)
toolRegistry.registerTool(githubOpenTool)
toolRegistry.registerTool(linkedinOpenTool)
toolRegistry.registerTool(contactOpenTool)

// Register Phase 6 Controlled Side-Effect Tools
toolRegistry.registerTool(emailDraftTool)
toolRegistry.registerTool(emailSendTool)

