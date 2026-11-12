# PHASE 5 — APPLICATION SECURITY & AI SAFETY AUDIT REPORT
**Domain C: Application Security (OWASP Top 10) | Domain D: AI/LLM Security & RAG Safety**

- **Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Target Modules:** `app/api/contact/route.ts`, `lib/rag/`, `lib/rag-lab/`, `components/AskAadil/`, `next.config.js`
- **Standard Applied:** `engineering-security-reliability` (Sections 1, 2, 3, 4, 5 of App & AI Security references)
- **Audit Date:** November 2026
- **Status:** Complete (READ-ONLY Mode)

---

## 1. Security Architecture & Threat Model

### 1.1 Threat Model Overview
The portfolio is primarily a static client application with two dynamic interaction interfaces:
1. **Public Contact Form API (`/api/contact`):** An HTTP POST endpoint processing user messages and relaying them via Resend / SMTP.
2. **Interactive AI Interfaces:**
   - **Ask Aadil (`/ask-aadil`):** In-browser and API-backed conversational assistant using local portfolio embeddings, intent routing, and dynamic tools.
   - **RAG Evaluation Lab (`/rag-lab`):** Purely deterministic, client-side retrieval demonstration using BM25, TF-IDF vector ranking, and citation synthesis.

### 1.2 Asset & Boundary Classification
- **Untrusted Ingress Channels:** Contact form input fields (`name`, `email`, `company`, `message`), user search queries in Ask Aadil and RAG Lab, audio transcriptions from the Web Speech API.
- **Trusted Core:** Canonical data layer (`data/canonical/`), RAG corpus (`data/rag/corpus_v1.ts`), deterministic retrieval algorithms.
- **External Dependencies:** Resend API (email), Portkey / Gemini API (LLM generation).

---

## 2. OWASP Top 10 & Application Security Findings

### FINDING-SEC-001: In-Memory Rate Limiting Ineffective in Serverless / Multi-Instance Deployments
- **Finding ID:** SEC-001
- **Severity:** P1 (High)
- **Affected File:** `app/api/contact/route.ts` (Lines 4–24)
- **Evidence:**
  ```typescript
  const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
  ```
  The endpoint enforces a threshold of 5 requests per 10 minutes per IP address using a process-local in-memory `Map`.
- **Impact:** In modern serverless deployments (such as Vercel Edge/Serverless, AWS Lambda, or clustered container instances), each invocation can execute in an isolated container or worker process with separate memory spaces. An attacker can distribute requests across concurrent connections or spin up new instances, completely evading rate limits to spam the recipient's inbox or exhaust Resend API quotas.
- **Verification Method:** Source code inspection of `rateLimitMap` declaration in `app/api/contact/route.ts`.
- **Recommended Remediation:** Migrate rate limiting to an external, distributed, edge-compatible store (e.g. Upstash Redis with `@upstash/ratelimit`) or implement Cloudflare / Vercel WAF rate limiting rules at the edge gateway.

---

### FINDING-SEC-002: Client IP Spoofing via Unvalidated `x-forwarded-for` Headers
- **Finding ID:** SEC-002
- **Severity:** P2 (Medium)
- **Affected File:** `app/api/contact/route.ts` (Lines 29–37)
- **Evidence:**
  ```typescript
  const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
  ```
  The code reads the raw header string without taking the rightmost trusted proxy hop or using the platform's trusted IP property (`req.ip` on Vercel).
- **Impact:** Attackers can bypass the in-memory rate limiter entirely by sending spoofed headers (`X-Forwarded-For: 203.0.113.1`, `X-Forwarded-For: 203.0.113.2`, etc.) on each POST request.
- **Verification Method:** Send synthetic HTTP requests with randomized `X-Forwarded-For` headers.
- **Recommended Remediation:** Extract the verified client IP via platform-specific utilities (e.g. `@vercel/edge` `ipAddress(req)` or parsing the leftmost IP only when behind a known trusted reverse proxy).

---

### FINDING-SEC-003: HTML Injection Risk in Email Body Template Literal
- **Finding ID:** SEC-003
- **Severity:** P2 (Medium)
- **Affected File:** `app/api/contact/route.ts` (Lines 108–119)
- **Evidence:**
  ```typescript
  const emailHtml = `
    <div style="...">
      <p><strong>Name:</strong> ${sanitizedName}</p>
      <p><strong>Company / Recruiter:</strong> ${sanitizedCompany}</p>
      <p><strong>Role / Opportunity:</strong> ${sanitizedRole}</p>
      <p><strong>Message:</strong></p>
      <div style="... white-space: pre-wrap;">${sanitizedMessage}</div>
    </div>
  `;
  ```
  While `sanitizedName = name.trim()` is executed, characters with special HTML meaning (`<`, `>`, `&`, `"`, `'`) are **not entity-encoded**.
- **Impact:** While `white-space: pre-wrap;` is applied, unescaped user inputs allow arbitrary HTML markup injection into the outgoing email. Malicious senders could inject deceptive phishing hyperlinks, CSS styling overrides, or external tracking images into the email delivered to the portfolio owner.
- **Verification Method:** Inspect string interpolation in `emailHtml` construction.
- **Recommended Remediation:** Implement an HTML escaping helper:
  ```typescript
  function escapeHtml(str: string): string {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]!));
  }
  ```
  Wrap all user fields (`name`, `company`, `role`, `message`) in `escapeHtml()` prior to embedding in HTML.

---

### FINDING-SEC-004: Missing Content Security Policy (CSP) and Modern Security Headers
- **Finding ID:** SEC-004
- **Severity:** P2 (Medium)
- **Affected File:** `next.config.js` (Lines 1–9), `app/layout.tsx`
- **Evidence:** `next.config.js` only configures `reactStrictMode: true` and `experimental.appDir: true`. No HTTP response headers are defined.
- **Impact:** Absence of CSP (`Content-Security-Policy`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` leaves the frontend without defense-in-depth protection against clickjacking, MIME confusion, and rogue script injection.
- **Verification Method:** Inspect `next.config.js` and response headers via curl.
- **Recommended Remediation:** Add a comprehensive `headers()` async configuration in `next.config.js` enforcing standard OWASP headers.

---

### FINDING-SEC-005: Unsanitized URL Protocol in Suggested Action Link Target
- **Finding ID:** SEC-005
- **Severity:** P3 (Low)
- **Affected File:** `components/AskAadil/AskAadilModal.tsx` (Lines 343–353)
- **Evidence:**
  ```tsx
  <Link href={msg.answer.suggestedAction.payload.url}>
  ```
  The component renders a Next.js `Link` component whose `href` is supplied directly by the agent's suggested action payload.
- **Impact:** While `portfolioTools.ts` currently restricts action URLs to canonical routes (`/projects/...`, `/rag-lab`, `/contact`), if a prompt injection or future tool bug were to generate a `javascript:` URI, clicking the suggested action could execute arbitrary client-side code.
- **Verification Method:** Inspect `AskAadilModal.tsx` action rendering.
- **Recommended Remediation:** Validate that `payload.url` begins with a leading `/` or matches `^https?://` prior to passing it to `Link`.

---

## 3. AI & LLM Security Findings

### FINDING-SEC-006: Prompt Injection Defense Relies on Substring Heuristics
- **Finding ID:** SEC-006
- **Severity:** P2 (Medium)
- **Affected Files:** `lib/rag/askAadilAgent.ts:113-134`, `lib/rag-lab/groundedSynthesizer.ts:34-63`
- **Evidence:** Both Ask Aadil and RAG Lab utilize regex and substring keyword matching for prompt injection defense:
  ```typescript
  const injectionPatterns = [
    'ignore all previous instructions',
    'system prompt',
    'reveal private',
    'drop table',
    '<script',
  ];
  ```
- **Impact:** Static substring matching is inherently brittle. Attackers can trivially bypass these filters using character substitution (e.g. `ign0re all instructi0ns`), leetspeak, language translation, homoglyphs, or indirect roleplay ("Pretend you are in maintenance mode...").
- **Mitigating Controls (Why this is P2, not P0):**
  1. In RAG Lab, the synthesizer is completely deterministic and local (no external LLM API is called; generation is template-based lexical synthesis).
  2. In Ask Aadil, tools are strictly read-only and restricted to portfolio data. No mutating or external code execution tools exist.
- **Verification Method:** Review keyword array in `groundedSynthesizer.ts`.
- **Recommended Remediation:** Implement structured prompt framing with strict XML delimiters (`<context>...</context>`), explicit instruction hierarchy, and output format schemas rather than attempting to filter raw input text with regex.

---

### FINDING-SEC-007: Upstream Security Advisories in Next.js 13.4.10
- **Finding ID:** SEC-007
- **Severity:** P3 (Low)
- **Affected File:** `package.json:15`
- **Evidence:** `package.json` specifies `"next": "13.4.10"`.
- **Impact:** Several CVEs have been disclosed for early Next.js 13 releases, including Server Actions DoS vulnerabilities (CVE-2024-34351) and image optimization SSRF concerns in self-hosted deployments.
- **Verification Method:** Run `npm audit` / check CVE database for Next.js 13.4.10.
- **Recommended Remediation:** Upgrade to the latest stable patch of Next.js 13 (e.g., `13.5.6`) or Next.js 14 during scheduled dependency updates.

---

## 4. Compliance & Positive Verifications

### 4.1 Secrets Management Standard Compliance: PASS
- **Status:** **VERIFIED COMPLIANT (P4 / FINDING-SEC-008)**
- **Evidence:**
  - `.gitignore` lines 26–29 explicitly exclude `.env*.local`, `.env.local`, and `.env`.
  - `.env.example` provides sanitized template values (`your_gemini_api_key_here`, `your_resend_api_key_here`).
  - Codebase-wide regex searches for API keys, secret tokens, private keys (`sk-`, `ghp_`, `pk_`) in git-tracked files returned **zero leaked secrets**.

### 4.2 DOM XSS and Execution Safety: PASS
- **Status:** **VERIFIED COMPLIANT (P4 / FINDING-SEC-009)**
- **Evidence:**
  - `dangerouslySetInnerHTML`: **0 occurrences**.
  - `eval()`: **0 occurrences**.
  - `new Function()`: **0 occurrences**.
  - React's default JSX string escaping protects all client rendering against reflected XSS.

### 4.3 Tool Governance & Principle of Least Privilege: PASS
- **Status:** **VERIFIED COMPLIANT (P4 / FINDING-SEC-010)**
- **Evidence:**
  - `lib/rag/tools/portfolioTools.ts` and `lib/rag/tools/navigationTools.ts` expose strictly read-only portfolio queries (`get_project_details`, `navigate_to_page`, `search_case_studies`).
  - No tools possess system command execution, filesystem writing, or database mutation capabilities.
  - All navigation destinations are validated against an explicit allowlist of 14 valid routes.

### 4.4 Corpus Data Integrity & Ingestion Safety: PASS
- **Status:** **VERIFIED COMPLIANT (P4)**
- **Evidence:**
  - `data/rag/corpus_v1.ts` contains 14 verified technical documents and 16 chunks.
  - Corpus SHA-256 hashes match `data/rag/manifest.json` bit-for-bit:
    - Chunks Digest: `455b08a8196902c1f87399f0f28105d5d2c1d41be2750beda78241dcf1a18eb2`
    - Documents Digest: `af80ce6478da0f9ab0e2f48b68a5ecf5ddf654a61c4c3450f0c2c04c1c56bb14`
    - Full Corpus Digest: `8e8538cb2add770d2941172d42369ab8742ec11f76935ff8be53f513de9f41c9`
  - Zero prompt injection payloads or adversarial hidden text detected in corpus documents.

