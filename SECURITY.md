# Security Assessment — AstraMart (astra-marketplace)

**Date:** 2026-08-21  
**Scope:** Auth, XSS, injection, CORS, secrets, payments, RBAC  
**Context:** Public deploy is a **demo-mode marketplace** (Vercel). Prisma + PostgreSQL are a **local production foundation**, not the live path.

---

## Executive summary

| Area | Risk | Notes |
|------|------|--------|
| Authentication | **Demo-only (accepted)** | Public demo credentials; session token is unsigned Base64 `email:role` |
| Authorization | **Demo-only (accepted)** | Middleware trusts the `astra-role` cookie. Not a production RBAC boundary. |
| XSS | **Low** | No `dangerouslySetInnerHTML`; React text escaping |
| Injection (SQL) | **N/A on Vercel** | Live path uses in-memory `demoData`. Prisma is parameterized **when** wired locally |
| Payments | **Mock only** | No card PAN storage; `PAYMENT_PROVIDER=mock` |
| Secrets in repo | **Low** | `.env` gitignored; `.env.example` has placeholders only |
| CSRF | **Low (demo)** | HttpOnly + `SameSite=lax` cookies on login |
| CORS | **N/A** | Same-origin Next.js API routes |
| Build config | **OK** | No `ignoreBuildErrors`; `tsc --noEmit` in CI |

**Overall (public Vercel demo):** Low residual risk — seeded data, mock payments, no live database or payment capture.

**Overall (if this were production with real money/PII):** High — unsigned session, cookie-role authz, public demo passwords. Do **not** claim NextAuth or a hardened production auth stack.

---

## 1. Authentication & session

**Findings**
- Live demo logs in against `src/lib/auth.ts` + `demoUsers` (plaintext demo passwords).
- Login sets `astra-role` and `astra-session` (HttpOnly, SameSite=lax, 8h).
- `astra-session` is `Buffer.from(\`${email}:${role}\`).toString('base64')` — **not signed, not hashed, not rotated**.
- Demo credentials are documented in the README on purpose (portfolio DX).

**Verdict:** Auth is a **demo cookie**. Do not claim “secured with NextAuth” or JWT.

**If auth is added later:** sign the session (HMAC/JWT), hash passwords (bcrypt is already used in `prisma/seed.ts`), expire/rotate cookies, lockout/MFA, never publish credentials.

---

## 2. Authorization / RBAC

**Findings**
- `src/lib/services/rbac.ts` is an allow-list helper (`can(role, permission)`).
- `middleware.ts` gates `/admin`, `/seller`, `/checkout` by **cookie role string**, defaulting missing cookies to `CUSTOMER`.
- API routes are thin wrappers around the demo repository; they are **not** a complete server-side permission mesh.

**Accepted for portfolio demo.** Not accepted for a public production marketplace.

---

## 3. XSS

- Code search found **no** `dangerouslySetInnerHTML`.
- Product titles, reviews, tickets render as React text → default escaping.
- CSP is set in middleware (`default-src 'self'` plus Next-friendly `unsafe-inline` / `unsafe-eval` for the App Router). Tightening CSP is a follow-up, not a demo blocker.

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
- `.env.example` documents `DATABASE_URL`, `APP_SECRET`, mock providers — no live secrets.
- Never commit `STRIPE_SECRET_KEY` or database passwords.

---

## 8. HTTP surface (demo)

| Path | Auth | Notes |
|------|------|--------|
| `/` storefront | None | Seeded catalog |
| `/api/auth/login` | Public | Sets demo cookies |
| `/admin/*` | Cookie role | Redirects unless ADMIN-class role |
| `/seller/*` | Cookie role | SELLER or ADMIN |
| `/api/payments/*` | Demo | Mock provider only |
| `/api/health` | None | Liveness |

Hello-world placeholder APIs: none.

---

## 9. Residual risk & acceptance

**Accepted for portfolio demo**
- Public demo passwords.
- Unsigned session token.
- In-memory repository on Vercel.
- Middleware CSP allows `unsafe-eval` for Next.js.

**Not accepted if real payments or PII go live**
- Unsigned `astra-session`.
- Role cookie as the only authorization check.
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
