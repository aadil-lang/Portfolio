const fs = require('fs');
const path = require('path');

const codeEvidenceMap = {
  'loom-ai': [
    {
      id: 'loom-ai-procurement-workflow',
      title: 'AgentGraph Procurement Workflow with Dynamic Clarification Edge',
      decision: 'DYNAMIC STATE GRAPH CLARIFICATION BOUNDARY',
      language: 'typescript',
      sourcePath: 'backend/src/ai/workflows/BuyerProcurementWorkflow.ts',
      lineRange: '33-58',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/loom-ai',
      code: `public build() {
  const builder = new AgentGraphBuilder<ProcurementState>(procurementStateChannels);

  builder
    .addNode('analyze_requirements', this.analyzeRequirementsNode.bind(this))
    .addNode('knowledge_retrieval', this.knowledgeRetrievalNode.bind(this))
    .addNode('search_marketplace', this.searchMarketplaceNode.bind(this))
    .addNode('generate_recommendations', this.generateRecommendationsNode.bind(this))
    .addNode('clarify_requirements', this.clarifyRequirementsNode.bind(this));

  builder.setEntryPoint('analyze_requirements');

  // Conditional Edge: Guard against underspecified procurement requests
  builder.addConditionalEdges(
    'analyze_requirements',
    (state) => {
      if (state.requirements?.category || state.requirements?.fabricType) {
        return 'knowledge_retrieval';
      }
      return 'clarify_requirements';
    }
  );

  builder.addEdge('knowledge_retrieval', 'search_marketplace');
  builder.addEdge('search_marketplace', 'generate_recommendations');
  return builder.compile();
}`,
      explanation: 'In B2B textile procurement, searching the product catalog with underspecified buyer requirements yields irrelevant supplier matches and wasted database compute. The workflow enforces a conditional branch: if critical parameters (category or fabric type) are missing, execution diverts to clarification before querying the database.',
      evidence: ['Clean Architecture domain separation', 'Conditional clarification edge', 'Compound MongoDB search']
    }
  ],

  'atlas-ai': [
    {
      id: 'atlas-ai-stategraph',
      title: 'LangGraph StateGraph Workflow & Conditional Intent Routing',
      decision: 'CYCLIC AGENTIC WORKFLOW WITH DETERMINISTIC INTENT DISPATCH',
      language: 'python',
      sourcePath: 'backend/app/agents/graph.py',
      lineRange: '118-142',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/Atlas-AI',
      code: `def _build_graph(self):
    builder = StateGraph(AgentState)

    # 1. Register Functional Nodes
    builder.add_node("load_context", self._load_context_node)
    builder.add_node("route_intent", self._route_intent_node)
    builder.add_node("company_research_node", self._company_research_node)
    builder.add_node("market_research_node", self._market_research_node)
    builder.add_node("document_research_node", self._document_research_node)
    builder.add_node("synthesis_node", self._synthesis_node)
    builder.add_node("extract_memory_node", self._extract_memory_node)
    builder.add_node("finalize_node", self._finalize_node)

    # 2. Wire Control Flow & Deterministic Routing
    builder.add_edge(START, "load_context")
    builder.add_edge("load_context", "route_intent")
    builder.add_conditional_edges(
        "route_intent",
        self._dispatch_intent,
        {
            IntentType.COMPANY_RESEARCH: "company_research_node",
            IntentType.MARKET_DATA: "market_research_node",
            IntentType.DOCUMENT_RESEARCH: "document_research_node",
        }
    )
    return builder.compile()`,
      explanation: 'Rather than relying on an autonomous agent with open-ended tool hallucination, Atlas AI uses a compiled LangGraph StateGraph. User inquiries are deterministically classified and routed to dedicated retrieval nodes (e.g. SEC EDGAR filing parser or Atlas Vector Search) before entering response synthesis.',
      evidence: ['178 pytests in complete SEC RAG suite', 'StateGraph compiled pipeline', 'Direct SEC EDGAR regulatory chunking']
    },
    {
      id: 'atlas-ai-alert-worker',
      title: 'Proactive Alert Worker & Market Trigger Poller',
      decision: 'BACKGROUND ASYNCHRONOUS VOLATILITY POLLER',
      language: 'python',
      sourcePath: 'backend/app/jobs/alerts.py',
      lineRange: '45-72',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/Atlas-AI',
      code: `class AlertWorker:
    """
    Background worker that periodically polls financial, SEC, and news providers
    to evaluate user alert rules without user initiation.
    """
    async def evaluate_alert(self, alert: Alert, user_id: str) -> Optional[AlertTriggerResult]:
        latest_data = await self.financial_provider.get_quote(alert.symbol)
        if not latest_data:
            return None

        # Deterministic boundary condition: threshold breach
        breached = False
        if alert.condition == "ABOVE" and latest_data.price >= alert.target_price:
            breached = True
        elif alert.condition == "BELOW" and latest_data.price <= alert.target_price:
            breached = True

        if breached:
            return AlertTriggerResult(alert=alert, current_price=latest_data.price, triggered_at=datetime.utcnow())
        return None`,
      explanation: 'Conversational copilots are typically purely reactive to user prompts. Atlas AI incorporates an asynchronous lifespan AlertWorker that continuously evaluates active price and SEC 8-K filings thresholds, dispatching real-time notifications to Telegram when bounds are breached.',
      evidence: ['Real-time Telegram notifications', 'Deterministic boundary evaluation', 'SEC 8-K volatility triggers']
    }
  ],

  'ask-aadil': [
    {
      id: 'ask-aadil-action-gate',
      title: 'Human-in-the-Loop Action Confirmation Boundary',
      decision: 'SEPARATION OF DRAFT GENERATION FROM EXTERNAL EXECUTION',
      language: 'typescript',
      sourcePath: 'lib/rag/askAadilAgent.ts',
      lineRange: '298-326',
      ownership: 'BUILT INDEPENDENTLY',
      sourceUrl: 'https://github.com/aadil-lang/portfolio',
      code: `// Human-in-the-Loop Gate: Draft was generated and awaiting explicit confirmation
if (state.confirmationState === 'awaiting_confirmation' && state.editedDraft) {
  const isExplicitConfirm =
    lowerQ === 'send it' ||
    lowerQ === 'yes, send' ||
    lowerQ === 'confirm' ||
    lowerQ === 'send the email'

  if (isExplicitConfirm) {
    state.confirmationState = 'confirmed'
    const executionInput: AgentDraft = {
      recipient: state.editedDraft.recipient || structuredProfile.email,
      subject: state.editedDraft.subject,
      body: state.editedDraft.body,
      isEdited: state.editedDraft.isEdited
    }
    state.executionResult = {
      status: 'email_client_opened',
      emailClientOpened: true,
      emailSentStatus: 'unknown',
      executionInput,
      timestamp: new Date().toISOString()
    }
  }
}`,
      explanation: 'An LLM request is not equivalent to authorization to perform an external action. The agent drafts communication and enables live user edits, but never triggers the external mailto client without explicit affirmative confirmation. Furthermore, it records emailSentStatus: "unknown" to prevent claiming delivery occurred when only a client was opened.',
      principle: 'LLM generates proposal; human confirms; client invokes.',
      evidence: ['25 multi-turn agentic tests passing', '132 hardening epistemic assertions', 'Deterministic mailto state machine']
    }
  ]
};

function injectRemaining() {
  const projectsPath = path.join(__dirname, '../data/projects.ts');
  let content = fs.readFileSync(projectsPath, 'utf-8');

  for (const [slug, snippets] of Object.entries(codeEvidenceMap)) {
    console.log(`Injecting codeEvidence for project: ${slug}...`);
    
    // Look for slug: '${slug}', then find delta: '...' followed by \n  }
    const regex = new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?delta:[\\s\\S]*?)((\\n\\s*\\}))`, 'm');
    
    if (regex.test(content)) {
      const snippetsJson = JSON.stringify(snippets, null, 6)
        .replace(/"([a-zA-Z0-9_]+)":/g, '$1:');

      content = content.replace(regex, `$1,\n    codeEvidence: ${snippetsJson}$2`);
      console.log(`  ✓ Successfully injected codeEvidence for ${slug}`);
    } else {
      console.error(`  ✗ Could not match regex for slug: ${slug}`);
    }
  }

  fs.writeFileSync(projectsPath, content, 'utf-8');
  console.log('Finished updating remaining projects!');
}

injectRemaining();
