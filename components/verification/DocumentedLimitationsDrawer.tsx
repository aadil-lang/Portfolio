"use client"

import React, { useState } from 'react'
import { AlertTriangle, ChevronDown, ChevronUp, ShieldAlert, CheckCircle2 } from 'lucide-react'

interface LimitationItem {
  id: string
  title: string
  system: string
  category: 'NETWORK_DEPENDENCY' | 'EVALUATION_SCOPE' | 'MATHEMATICAL_MODEL' | 'ATTRIBUTION_BOUNDARY'
  description: string
  engineeringReasoning: string
  mitigationAndIntegrityControl: string
}

const limitations: LimitationItem[] = [
  {
    id: 'LIM-01',
    title: 'Deterministic Local Retrieval vs Live LLM Inference in CI',
    system: 'Ask Aadil Conversational Engine',
    category: 'NETWORK_DEPENDENCY',
    description:
      'Continuous Integration test suites (test_retrieval_foundation.ts and test_grounded_conversational_evaluation.ts) evaluate hybrid retrieval, code evidence, and deterministic abstentions using mock synthesized completions rather than hitting live Gemini API endpoints on every test run.',
    engineeringReasoning:
      'Live external LLM API calls in CI introduce rate-limit flakiness, credential leakage risks, and non-deterministic text generation that obscures underlying retrieval regressions.',
    mitigationAndIntegrityControl:
      'Retrieval ranking, intent routing, and hallucination resistance are validated deterministically against canonical knowledge ground truth; live conversational synthesis is validated via periodic out-of-band smoke tests.'
  },
  {
    id: 'LIM-02',
    title: 'Pedagogical Subword Vector Space vs Dense Neural Embeddings',
    system: 'RAG Evaluation Laboratory (/rag-lab)',
    category: 'EVALUATION_SCOPE',
    description:
      'The interactive RAG Lab uses client-side subword character n-gram TF-IDF cosine similarity rather than 1536-dimensional dense neural embeddings (such as OpenAI text-embedding-3 or Gemini text-embedding-004).',
    engineeringReasoning:
      'Running dense neural embedding models requires either massive client-side WebAssembly downloads (~500MB) or external backend API calls requiring API keys, defeating the design goal of a zero-latency, private, client-side educational laboratory.',
    mitigationAndIntegrityControl:
      'Explicitly labeled as a subword character n-gram vector space in all UI labels and documentation; demonstrates mathematical IR concepts (BM25, vector space cosine similarity, RRF, and token budgets) without deceptive claims of running deep neural models.'
  },
  {
    id: 'LIM-03',
    title: 'CAD Boundary Representation Calculus vs Physical CNC Tool Tolerance',
    system: 'Engineering Design Automation (EDA)',
    category: 'MATHEMATICAL_MODEL',
    description:
      'The 0.0000% volume discrepancy is a numerical software calculus comparison between Saint-Venant analytical equations and OpenCascade discrete BRep surface mass integrals (< 10⁻⁶ relative discrepancy). It does NOT assert physical CNC machining manufacturing tolerance.',
    engineeringReasoning:
      'CAD boundary representations calculate mass properties via mathematical surface integrals. Physical machining introduces tool deflection, thermal expansion, spindle vibration, and material anisotropy.',
    mitigationAndIntegrityControl:
      'All public references explicitly qualify this as mathematical calculus verification between analytical theory and CAD kernel geometry; physical machining tolerance is separately documented as ±0.05 mm.'
  },
  {
    id: 'LIM-04',
    title: 'Deterministic Regex Circuit Breaker vs Conversational Nuance',
    system: 'Solace AI',
    category: 'EVALUATION_SCOPE',
    description:
      'The 100% crisis trigger detection rate applies strictly to the 24 explicit critical regex keywords and phrases tested in is_crisis_input. It does NOT claim 100% recall on nuanced, open-ended conversational human distress.',
    engineeringReasoning:
      'Human distress in mental health dialogues can be subtle, metaphorical, or passive. No single regex or AI model can guarantee 100% universal recall on open-ended human conversation.',
    mitigationAndIntegrityControl:
      'The architecture implements a two-tier safety design: the deterministic regex acts as a microsecond Tier-1 circuit breaker (< 2ms) that catches acute crisis triggers immediately, while multi-turn LLMs handle conversational empathy downstream.'
  },
  {
    id: 'LIM-05',
    title: 'Recorded SEC EDGAR Fixtures vs Live Unconstrained Ingestion',
    system: 'Atlas AI',
    category: 'NETWORK_DEPENDENCY',
    description:
      'The 178 automated pytests validating Atlas AI LangGraph loops execute against recorded SEC 10-K/10-Q filing fixtures rather than unconstrained live scraping of the sec.gov website.',
    engineeringReasoning:
      'The SEC EDGAR system enforces strict 10 requests/second rate limits, requires specific corporate User-Agent headers, and changes HTML/XBRL wrappers unpredictably across regulatory updates.',
    mitigationAndIntegrityControl:
      'Recorded fixtures simulate real multi-megabyte 10-K tables, allowing deterministic regression testing of parsing, vector chunking, and LangGraph multi-agent analysis loops.'
  },
  {
    id: 'LIM-06',
    title: 'Wayground Team Architecture vs Individual Engineering Contribution',
    system: 'VoyageMath V1 & US Mathematics Item Bank',
    category: 'ATTRIBUTION_BOUNDARY',
    description:
      'VoyageMath V1 and the US Mathematics Item Bank were developed at Wayground as collaborative engineering efforts by the Wayground Engineering Team, not as solo projects.',
    engineeringReasoning:
      'Accurate attribution is a fundamental ethical standard in engineering. Claiming full ownership of a team-built enterprise pipeline is fraudulent.',
    mitigationAndIntegrityControl:
      'Enforced at the data and conversational retrieval layer (lib/rag/projectResolver.ts): VoyageMath V1 is classified as TEAM_OWNERSHIP, and Item Bank is classified as AADIL_CONTRIBUTION (specifically: mathematical domain router and compiler syntax gates).'
  }
]

export default function DocumentedLimitationsDrawer() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'LIM-01': true,
    'LIM-03': true
  })

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section aria-labelledby="limitations-heading" className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#262B32] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="limitations-heading" className="text-xl font-serif font-bold text-[#F0EEE9] tracking-tight">
              Documented Engineering Limitations & Gaps
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261E14] text-[#F0B84D] border border-[#D99B26]/30">
              FIRST-CLASS DISCLOSURE
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Transparent disclosure of test mocks, synthetic simulation boundaries, and documented engineering trade-offs.
          </p>
        </div>
        <span className="font-mono text-xs text-[#6B7280]">
          {limitations.length} DOCUMENTED BOUNDARIES
        </span>
      </div>

      <div className="space-y-3">
        {limitations.map((item) => {
          const isExpanded = Boolean(expandedItems[item.id])
          return (
            <div
              key={item.id}
              className="bg-[#14171A] border border-[#262B32] rounded-lg overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-[#181C21] transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start md:items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#D99B26] bg-[#261E14] px-2 py-0.5 rounded border border-[#D99B26]/30 shrink-0">
                    {item.id}
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#E5E7EB]">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-[#858A90]">
                      <span>{item.system}</span>
                      <span>•</span>
                      <span className="text-[#9CA3AF]">{item.category}</span>
                    </div>
                  </div>
                </div>
                <div className="text-[#858A90] shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 pt-1 bg-[#121518] border-t border-[#22272E] space-y-3 text-xs">
                  <div>
                    <span className="font-mono text-[10px] text-[#858A90] uppercase tracking-wider block mb-0.5">
                      Audited Limitation Statement:
                    </span>
                    <p className="text-[#D8D6D0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#161A1F] p-3 rounded border border-[#242930]">
                      <span className="font-mono text-[10px] text-[#858A90] uppercase tracking-wider block mb-1">
                        Engineering Rationale:
                      </span>
                      <p className="text-[#9CA3AF] leading-relaxed">
                        {item.engineeringReasoning}
                      </p>
                    </div>

                    <div className="bg-[#16231C]/60 p-3 rounded border border-[#5A9A78]/30">
                      <span className="font-mono text-[10px] text-[#78C29A] uppercase tracking-wider block mb-1 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-[#5A9A78]" />
                        <span>Mitigation & Integrity Control:</span>
                      </span>
                      <p className="text-[#A3E5C2] leading-relaxed">
                        {item.mitigationAndIntegrityControl}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

