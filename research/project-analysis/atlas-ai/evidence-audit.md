# Forensic Evidence Audit: Atlas AI

- **Repository**: `atlas-ai`
- **Inspected Source Path**: `C:\Users\HP\Documents\atlas-ai`
- **Ownership Classification**: `INDEPENDENT · PERSONAL BUILD`
- **Audit Date**: 2026-09-28

---

## 1. Forensic Evidence Table

| Dimension | Specific Claim / Feature | Evidence Location | Forensic Status |
| :--- | :--- | :--- | :--- |
| **Product Capability** | Conversational financial copilot providing real-time quotes, SEC EDGAR filing insights, company news, watchlists, proactive alerts, and morning briefings. | `backend/app/agents/graph.py`, `backend/app/jobs/alerts.py`, `backend/app/main.py` | **SOURCE_VERIFIED** |
| **Interface** | Telegram bot interface via webhook (`python-telegram-bot`) supporting text messages, voice notes, and chart photo uploads. | `backend/app/api/routes/telegram.py`, `backend/app/services/telegram.py`, `backend/app/services/message_normalizer.py` | **SOURCE_VERIFIED** |
| **Interface** | Web frontend | Inspected root and `backend/` directories; no frontend React/Next web app exists | **NOT IMPLEMENTED / ABSENT** (do not claim web interface) |
| **AI Architecture** | LangGraph `StateGraph(AgentState)` coordinating context loading, intent routing, specialized research nodes, synthesis, and memory extraction. | `backend/app/agents/graph.py`, `backend/app/agents/state.py` | **SOURCE_VERIFIED** |
| **AI Providers** | Google Generative AI (`langchain-google-genai` for Gemini text, Gemini Vision, and Gemini text-embedding-004) with Groq alternative. | `backend/app/providers/llm/`, `backend/app/providers/embeddings/`, `backend/app/providers/vision/` | **SOURCE_VERIFIED** |
| **Audio Transcription** | Voice note transcription via Whisper provider. | `backend/app/providers/transcription/`, `backend/app/services/transcription.py` | **SOURCE_VERIFIED** |
| **Vision Analysis** | Financial chart and image analysis via Gemini Vision provider. | `backend/app/providers/vision/provider.py`, `backend/app/services/vision.py` | **SOURCE_VERIFIED** |
| **Financial Data** | SEC EDGAR API integration fetching company submissions, recent filings (10-K, 10-Q, 8-K), and filing documents via CIK resolution. | `backend/app/providers/sec/edgar.py`, `backend/app/tools/company_research.py` | **SOURCE_VERIFIED** |
| **Financial Data** | Finnhub API integration providing real-time market quotes, company profiles, metric lookups, and company news. | `backend/app/providers/financial/market_data.py`, `backend/app/providers/news/provider.py` | **SOURCE_VERIFIED** |
| **Filing RAG & Vector Search** | Document ingestion, chunking, Gemini embeddings, and vector similarity search via MongoDB Atlas Vector Search / cosine scoring. | `backend/app/repositories/vector_search.py`, `backend/app/tools/filing_rag.py`, `backend/app/services/chunking.py` | **SOURCE_VERIFIED** |
| **Memory & Context** | Durable conversational memory extractor identifying user preferences, investment interests, and watchlists across sessions. | `backend/app/agents/memory.py`, `backend/app/repositories/memories.py`, `backend/app/repositories/watchlists.py` | **SOURCE_VERIFIED** |
| **Background Processing** | Asynchronous `AlertWorker` running in background lifespan, monitoring watchlists for price volatility, new SEC filings, and news, dispatching proactive Telegram notifications. | `backend/app/jobs/alerts.py`, `backend/app/main.py` (lifespan) | **SOURCE_VERIFIED** |
| **Backend & Persistence** | FastAPI with Pydantic v2 settings, Motor/PyMongo async connection to MongoDB with compound indexes on users, messages, and vector embeddings. | `backend/app/main.py`, `backend/app/db/mongodb.py`, `backend/app/db/indexes.py` | **SOURCE_VERIFIED** |
| **Tests & Verification** | Comprehensive pytest test suite with 178 passing automated tests covering graphs, routers, SEC parser, Finnhub provider, embeddings, transcription, vision, and alerts. | `backend/tests/` (178/178 passed in 3.19s) | **SOURCE_VERIFIED** |

---

## 2. Evidence Boundaries & Adjustments

1. **User Interface**:
   - The user interacts exclusively through **Telegram** (voice, text, images) or raw REST webhooks. No React or Next.js web dashboard exists.
   - **Boundary**: Explicitly state that Atlas AI is a Telegram-first conversational copilot powered by FastAPI and LangGraph, rather than implying a web GUI.
2. **Deterministic Fallbacks**:
   - When external LLM or API errors occur, the router and response synthesizer implement heuristic and data-driven fallback summaries without crashing.
   - 178 automated tests confirm provider protocol conformance, error handling (401, 404, 429, 500, timeouts), and state transitions.
