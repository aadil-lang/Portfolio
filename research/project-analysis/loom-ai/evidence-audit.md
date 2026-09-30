# Forensic Evidence Audit: Loom AI

- **Repository**: `aadil-lang/loom-ai`
- **Inspected Source Path**: `C:\AI-Portfolio-Sources\loom-ai`
- **Ownership Classification**: `INDEPENDENT · PERSONAL BUILD`
- **Audit Date**: 2026-09-28

---

## 1. Forensic Evidence Table

| Dimension | Specific Claim / Feature | Evidence Location | Forensic Status |
| :--- | :--- | :--- | :--- |
| **Product Capability** | B2B textile marketplace connecting buyers and suppliers with catalog, cart, orders, and knowledge articles. | `frontend/src/app/(shop)/marketplace/page.tsx`, `backend/src/models/Product.ts`, `backend/src/routes/v1/buyerRoutes.ts` | **SOURCE_VERIFIED** |
| **Product Capability** | Supplier portal for inventory tracking, order management, and catalog publishing. | `frontend/src/app/(supplier)/supplier/inventory/page.tsx`, `backend/src/controllers/supplier/SupplierController.ts` | **SOURCE_VERIFIED** |
| **Product Capability** | RFQ negotiation / contract generation / automated quotation | Mentioned in `SupervisorGraph.ts` prompts; sub-agent is mocked | **INFERRED / MOCKED** (do not claim as fully implemented) |
| **AI Architecture** | LangGraph agent graph builder with channel reducers and conditional edges. | `backend/src/ai/graphs/AgentGraphBuilder.ts`, `backend/src/ai/workflows/BuyerProcurementWorkflow.ts` | **SOURCE_VERIFIED** |
| **AI Architecture** | Supervisor Agent routing user requests to specialized sub-agents based on user role and intent. | `backend/src/ai/graphs/SupervisorGraph.ts` | **SOURCE_VERIFIED** (Marketplace routing functional; other sub-agents mocked) |
| **AI Architecture** | Buyer procurement workflow analyzing requirements with structured output (`withStructuredOutput(ExtractedRequirementsSchema)`). | `backend/src/ai/workflows/BuyerProcurementWorkflow.ts` | **SOURCE_VERIFIED** |
| **AI Architecture** | In-memory vector store with cosine similarity calculation for semantic search over textile specs. | `backend/src/ai/rag/InMemoryVectorStore.ts`, `backend/src/ai/embeddings/EmbeddingService.ts` | **SOURCE_VERIFIED** |
| **AI Architecture** | AI event bus, orchestrator, and Human-in-the-Loop (HITL) approval queue for AI actions. | `backend/src/ai/orchestration/WorkflowOrchestrator.ts`, `backend/src/ai/orchestration/ApprovalQueue.ts` | **SOURCE_VERIFIED** |
| **AI Providers** | Groq (`llama3-8b-8192`) and HuggingFace (`mistralai/Mistral-7B-Instruct-v0.2`) API provider integrations with model switching. | `backend/src/ai/config/aiConfig.ts`, `backend/src/ai/providers/GroqProvider.ts`, `HuggingFaceProvider.ts` | **SOURCE_VERIFIED** |
| **Frontend** | Next.js 16 (`app` router), React 19, Redux Toolkit, TanStack Query, TailwindCSS v4, Framer Motion, Lucide icons, Zod. | `frontend/package.json`, `frontend/src/app/(buyer)/`, `frontend/src/app/(shop)/`, `frontend/src/app/(supplier)/` | **SOURCE_VERIFIED** |
| **Backend** | Express 5 on Node.js with TypeScript, Clean Architecture (Controllers, Services, Repositories, DTOs, Mongoose models). | `backend/package.json`, `backend/src/server.ts`, `backend/src/controllers/`, `backend/src/services/` | **SOURCE_VERIFIED** |
| **Data & Persistence** | MongoDB via Mongoose with compound & full-text search indexes on product names, description, fabric types, tags, and supplier IDs. | `backend/src/models/Product.ts` (lines 173-195) | **SOURCE_VERIFIED** |
| **Authentication & Security** | JWT access tokens, role-based authorization (`Buyer` vs `Supplier`), password hashing (`bcrypt`), Helmet, rate limiting (`express-rate-limit`). | `backend/src/middleware/auth/authenticate.ts`, `authorize.ts`, `authLimiter.ts` | **SOURCE_VERIFIED** |
| **Tests & Verification** | Playwright E2E test suite covering supplier registration, buyer recommendation link mapping, add-to-cart, checkout confirmation, and checkout failure recovery. | `tests/e2e.spec.ts` | **SOURCE_VERIFIED** |
| **Tests & Verification** | API integration regression test script verifying public endpoints, JWT authentication flows, protected endpoints, and 401 unauthorized checks. | `test_api.js` | **SOURCE_VERIFIED** |
| **Deployment** | Docker Compose multi-service specification and Render blueprint configuration. | `docker-compose.yml`, `render.yaml` | **SOURCE_VERIFIED** |

---

## 2. Evidence Boundaries & Adjustments

1. **Sub-agent Status**:
   - In `SupervisorGraph.ts`, `MarketplaceWorkflow` is wired up.
   - `BuyerProcurementWorkflow` is implemented as an independent LangGraph.
   - Nodes for `Knowledge`, `Buyer`, `Supplier`, `BusinessAdvisor`, and `Negotiation` within the supervisor graph return stubbed messages (`// --- Mocks for Sub-Agents (Phase 2 completion will expand these) ---`).
   - **Boundary**: Present as a modular multi-agent supervisor architecture with structured procurement routing and mock sub-agent channels, not as an autonomous fleet of negotiating agents.
2. **HITL Governance**:
   - `ApprovalQueue.ts` strictly holds proposed AI actions (e.g. `auto_restock`) for explicit user approval before execution. This matches the portfolio's human-governance principle.
