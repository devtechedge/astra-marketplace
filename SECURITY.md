# Security Assessment — AstraMart (astra-marketplace)

**Date:** 2026-08-28  
**Scope:** Auth, XSS, injection, CORS, secrets, payments, RBAC  
**Context:** Public deploy is a **demo-mode marketplace** (Vercel). Prisma + PostgreSQL are a **local production foundation**, not the live path.

---

## Executive summary

The demo NOW has: HMAC-signed session, bcrypt demo passwords on a server-only module, API RBAC, origin check, auth rate limit, webhook secret, CSP without unsafe-eval. Residual: demo credentials are public by design; APP_SECRET fallback is demo-only; payments still mock; in-memory rate limit resets on cold start. Still not a real store.

| Area | Risk | Notes |
|------|------|--------|
| Authentication | **Hardened demo** | HMAC-SHA256 session cookie; bcrypt hashes in a server-only module |
| Authorization | **Hardened demo** | Middleware and APIs verify the signed session; astra-role is ignored |
| XSS | **Low** | No dangerouslySetInnerHTML; React text escaping; CSP without unsafe-eval |
| Injection (SQL) | **N/A on Vercel** | Live path uses in-memory `demoData`. Prisma is parameterized **when** wired locally |
| Payments | **Mock only** | No card PAN storage; mock provider; webhook requires a shared secret header |
| Secrets in repo | **Low** | `.env` gitignored; `.env.example` has placeholders only |
| CSRF | **Low (demo)** | HttpOnly + SameSite=lax HMAC cookie; Origin host must match when present |
| CORS | **N/A** | Same-origin Next.js API routes; mismatched Origin is 403 |
| Build config | **OK** | No `ignoreBuildErrors`; `tsc --noEmit` in CI |

**Overall (public Vercel demo):** Low residual risk — seeded data, mock payments, no live database or payment capture. Residual: public demo credentials, APP_SECRET fallback, mock payments, in-memory rate limit. Still not a real store.

**Overall (if this were production with real money/PII):** Do not claim NextAuth or a real payment processor. Rotate APP_SECRET, persist users, and stop publishing demo passwords.

---

## 1. Authentication & session

**Findings**
- Login uses bcrypt compare against hashes in `src/lib/server/demoUsers.ts` (server-only).
- Login sets HMAC `astra-session` only (HttpOnly, SameSite=lax, 8h). `astra-role` is cleared.
- Token is HMAC-SHA256 over a base64url payload with 8h expiry and timing-safe verify.
- Demo credentials are documented in the README on purpose (portfolio DX).

**Verdict:** Hardened demo session. Still not NextAuth or production IAM.

**Residual:** demo credentials remain on the login page by design.

---

## 2. Authorization / RBAC

**Findings**
- `src/lib/services/rbac.ts` is an allow-list helper (`can(role, permission)`).
- `middleware.ts` gates `/admin`, `/seller`, `/checkout` using the verified HMAC session, treating missing/invalid cookies as GUEST (never CUSTOMER).
- API routes are thin wrappers around the demo repository; private and mutating routes now call requireSession with role allow-lists.

**Accepted for portfolio demo.** Not accepted for a public production marketplace.

---

## 3. XSS

- Code search found **no** `dangerouslySetInnerHTML`.
- Product titles, reviews, tickets render as React text → default escaping.
- CSP is set in middleware (`default-src 'self'` plus Next-friendly `unsafe-inline` for the App Router). `unsafe-eval` has been removed.

---

## 4. Injection

- Vercel path: no SQL. Zod validates login/register/order/ticket payloads (`src/lib/validation.ts`).
- Local Prisma path: use the generated client only (parameterized). Never interpolate `DATABASE_URL` user input into raw SQL.

---

## 5. Payments & PII

- Checkout uses mock payment intents (`PAYMENT_PROVIDER=mock`).
- Do not store PAN/CVV. Stripe keys in `.env.example` are empty placeholders.
- Demo orders/emails are fake seed data.

---

## 6. Dependency / supply chain

**This pass**
- Dropped unused `@testing-library/react` and `@testing-library/jest-dom` (unit tests are pure helpers, not the React tree).
- **Kept** Prisma / `@prisma/client` / `bcryptjs` — they are the local production adapter + seed, not dead shadcn leftovers.
- No NextAuth, z.ai SDK, or unused Radix dump.

```bash
npm audit --omit=dev
```

---

## 7. Secrets & config

- `.gitignore` excludes `.env`, `.env.local`.
- `.env.example` documents `DATABASE_URL`, `APP_SECRET`, `PAYMENT_WEBHOOK_SECRET`, mock providers — no live secrets.
- Never commit `STRIPE_SECRET_KEY` or database passwords.

---

## 8. HTTP surface (demo)

| Path | Auth | Notes |
|------|------|--------|
| `/` storefront | None | Seeded catalog |
| `/api/auth/login` | Public + rate limit + origin | Sets HMAC astra-session only |
| `/admin/*` | Signed session | Redirects unless ADMIN-class role |
| `/seller/*` | Signed session | SELLER or ADMIN |
| `/api/payments/intents` | Signed session | Mock provider only |
| `/api/payments/webhook` | Shared secret header | No session cookie |
| `/api/health` | None | Liveness |

Hello-world placeholder APIs: none.

---

## 9. Residual risk & acceptance

**Accepted for portfolio demo**
- Public demo passwords.
- APP_SECRET fallback is demo-only.
- In-memory rate limit resets on cold start.
- In-memory repository on Vercel.
- Payments still mock.
- CSP still allows unsafe-inline for Next.js.

**Not accepted if real payments or PII go live**
- Demo credentials in the UI.
- Fallback HMAC / webhook secrets in source.
- Prisma/Postgres exposed without migrations, TLS, and least-privilege roles.

---

## 10. How to re-test

```bash
npm install
npm test
npm run typecheck
npm run test:e2e
npm audit --omit=dev
```
