# PHASE 5 — PRIORITIZED REMEDIATION REGISTER
**Consolidated Technical Debt, Vulnerability Register & Action Plan**

- **Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Audit Standard:** `engineering-security-reliability` (Levels 1 & 2)
- **Date:** November 2026
- **Status:** Complete (READ-ONLY Mode — No Code Changes Executed)

---

## 1. Remediation Priority Framework

Findings are prioritized based on the **Context-Aware Activation Matrix** and standard severity guidelines:
- **P0 (Critical):** Immediate blocker. Remote compromise, catastrophic data loss, or hard deployment failure. (0 findings).
- **P1 (High):** Release blocker. Significant security, reliability, or WCAG accessibility flaw. (5 findings).
- **P2 (Medium):** Scheduled fix. Performance bottlenecks, code architecture debt, and secondary defenses. (14 findings).
- **P3 (Low):** Routine backlog. Visual polish, minor typos, loose typings, and script cleanup. (12 findings).
- **P4 (Informational):** Positive verifications, architectural observations, and compliance confirmations. (7 findings).

---

## 2. Master Remediation Register

| Finding ID | Sev | Domain | Module / File:Lines | Short Description | Target Remediation Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-001** | **P1** | Security | `app/api/contact/route.ts:4-24` | In-memory rate limiting bypassed in serverless / multi-instance | **Phase 5.1** |
| **TR-001** | **P1** | Reliability | `app/layout.tsx:1-40` | Missing React error boundaries (`error.tsx`, `global-error.tsx`) | **Phase 5.2** |
| **AD-001** | **P1** | Accessibility | `app/layout.tsx:13-26` | Missing Skip-to-Content bypass link (WCAG 2.4.1) | **Phase 5.3** |
| **AD-002** | **P1** | Accessibility | `components/AskAadil/AskAadilModal.tsx` | Missing WAI-ARIA dialog semantics and live regions (WCAG 4.1.2) | **Phase 5.3** |
| **AD-006** | **P1** | Production | `app/not-found.tsx` | Missing branded 404 and unhandled error page | **Phase 5.2** |
| **SEC-002** | **P2** | Security | `app/api/contact/route.ts:29-37` | Client IP spoofing via raw `x-forwarded-for` header | **Phase 5.1** |
| **SEC-003** | **P2** | Security | `app/api/contact/route.ts:108-119` | HTML injection risk in email body template literal | **Phase 5.1** |
| **SEC-004** | **P2** | Security | `next.config.js:1-9` | Missing Content Security Policy (CSP) and security headers | **Phase 5.1** |
| **SEC-006** | **P2** | AI Safety | `lib/rag-lab/groundedSynthesizer.ts` | Brittle substring regex matching for prompt injection | **Phase 5.1** |
| **CQ-001** | **P2** | Quality | `package.json`, `.eslintrc.json` | Missing `eslint` causing error during production build | **Phase 5.4** |
| **CQ-002** | **P2** | Architecture| `lib/rag/askAadilAgent.ts:1-2550` | God-object architecture (2,550 lines) with high complexity | **Phase 5.4** |
| **CQ-003** | **P2** | Architecture| `components/rag-lab/RagLabDashboard.tsx`| Monolithic 843-line component lacking memoization | **Phase 5.4** |
| **TR-002** | **P2** | Performance | `app/projects/[slug]/page.tsx` | Heavy first load JS (289 kB) lacking dynamic imports | **Phase 5.2** |
| **TR-003** | **P2** | Performance | `components/rag-lab/RagLabDashboard.tsx`| Re-renders all tabs on slider change (no `useMemo`) | **Phase 5.4** |
| **TR-004** | **P2** | Reliability | `package.json` | Build warning: ESLint must be installed | **Phase 5.4** |
| **AD-003** | **P2** | Accessibility | `components/rag-lab/RagLabDashboard.tsx`| Missing WAI-ARIA tablist/tab semantics (WCAG 4.1.2) | **Phase 5.3** |
| **AD-004** | **P2** | Accessibility | `components/Header.tsx:134-183` | Mobile navigation drawer lacks focus trap & aria-expanded | **Phase 5.3** |
| **AD-005** | **P2** | Accessibility | `components/Footer.tsx:12,56` | Color contrast failure on muted text (3.56:1, 2.64:1) | **Phase 5.3** |
| **AD-007** | **P2** | Production | `next.config.js` | Missing HSTS, X-Frame-Options, X-Content-Type-Options | **Phase 5.1** |
| **AD-008** | **P2** | Production | Repository Root | Missing CI/CD workflow pipeline (`.github/workflows/ci.yml`) | **Phase 5.5** |
| **SEC-005** | **P3** | Security | `components/AskAadil/AskAadilModal.tsx` | Unsanitized protocol in suggested action URL | **Phase 5.1** |
| **SEC-007** | **P3** | Dependencies| `package.json:15` | Next.js 13.4.10 upstream security advisories | **Phase 5.4** |
| **CQ-004** | **P3** | Hygiene | `components/Hero.tsx:1-4` | Dead component stub returning null | **Phase 5.4** |
| **CQ-005** | **P3** | Architecture| `components/Header.tsx:18,116` | Divergent event dispatch in mobile nav for Ask Aadil | **Phase 5.4** |
| **CQ-006** | **P3** | Hygiene | `app/page.tsx`, `RagLabDashboard.tsx` | Unused Lucide icon imports | **Phase 5.4** |
| **CQ-007** | **P3** | Quality | `components/rag-lab/RagLabDashboard.tsx`| Multiple `suppressHydrationWarning` on metric displays | **Phase 5.4** |
| **CQ-008** | **P3** | Type Safety | `components/AskAadil/AskAadilVoiceControls` | Loose typing (`as any`) around Web Speech API | **Phase 5.4** |
| **TR-005** | **P3** | Performance | `components/ProjectCard.tsx` | Zero usage of `next/image` optimization | **Phase 5.2** |
| **TR-006** | **P3** | Reliability | `scripts/run_consistency_audit.js` | Stale script failing on missing module import | **Phase 5.2** |
| **TR-007** | **P3** | Reliability | `scripts/smoke_test_all_routes.js` | Flaky test risk from hardcoded arbitrary `setTimeout` | **Phase 5.2** |
| **AD-009** | **P3** | Production | `public/` | Missing `robots.txt`, `sitemap.xml`, `favicon.ico`, `og-image` | **Phase 5.5** |
| **AD-010** | **P3** | Claims | `components/rag-lab/RagLabDashboard.tsx`| Ambiguous "semantic similarity" wording for subword TF-IDF | **Phase 5.4** |
| **SEC-008** | **P4** | Security | `.gitignore`, `.env.example` | Secrets management compliance verified (PASS) | N/A |
| **SEC-009** | **P4** | Architecture| `lib/rag/` vs `lib/rag-lab/` | 0 cross-imports domain isolation verified (PASS) | N/A |
| **SEC-010** | **P4** | Security | Codebase | 0 `dangerouslySetInnerHTML`, 0 `eval()` verified (PASS) | N/A |
| **CQ-009** | **P4** | Architecture| Multiple components | 9 components exceed 300 lines (informational) | N/A |
| **TR-008** | **P4** | Tooling | `scratch/tsconfig.scripts.json` | Script include whitelist restricts automated batch compile | N/A |
| **AD-011** | **P4** | Claims | `quantitativeClaims.ts` vs pages | 100% test count and chronological alignment verified (PASS)| N/A |

---

## 3. Recommended Phased Execution Plan (Do Not Begin Without Approval)

### Phase 5.1: Security & Route Hardening
- **Objective:** Resolve P1/P2 security findings in `/api/contact` and configure production HTTP headers.
- **Remediations:** SEC-001, SEC-002, SEC-003, SEC-004, SEC-005, SEC-006, AD-007.

### Phase 5.2: Reliability, Error Boundaries & Code Splitting
- **Objective:** Protect client React tree from runtime crashes and reduce first load JS bundle on case studies.
- **Remediations:** TR-001, AD-006, TR-002, TR-005, TR-006, TR-007.

### Phase 5.3: WCAG 2.1 AA Accessibility Hardening
- **Objective:** Achieve full WCAG 2.1 Level AA compliance across navigation, modals, tabs, and contrast.
- **Remediations:** AD-001, AD-002, AD-003, AD-004, AD-005.

### Phase 5.4: Architecture, Type Safety & Clean Code Refactoring
- **Objective:** Decompose god objects, add ESLint, eliminate dead stubs, and memoize heavy dashboard views.
- **Remediations:** CQ-001, CQ-002, CQ-003, CQ-004, CQ-005, CQ-006, CQ-007, CQ-008, TR-003, TR-004, AD-010, SEC-007.

### Phase 5.5: CI/CD, Production Assets & Final Release Sign-Off
- **Objective:** Implement automated GitHub Actions CI pipeline and complete production SEO/metadata assets.
- **Remediations:** AD-008, AD-009.

