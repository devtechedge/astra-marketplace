# Security Review (production backlog)

The public-demo threat model lives in **[SECURITY.md](../SECURITY.md)**. This file is the longer production hardening list — not a claim that the Vercel demo is already a payment-grade marketplace. Aligns with SECURITY.md as of 2026-08-28.

## Threat Model

| Threat | Mitigation |
|---|---|
| Credential stuffing | **Demo:** in-memory auth rate limit 10/10min/IP (resets on cold start). **Production:** Redis rate limit, lockout/MFA hooks |
| Broken access control | Role enum, `requireSession` API guards, **HMAC-signed** `astra-session` (**done for demo**). `astra-role` ignored/cleared. Missing session is GUEST |
| XSS | React escaping, no unsafe HTML, strict validation, CSP without `unsafe-eval` (**done**; `unsafe-inline` still required for Next) |
| SQL injection | Prisma parameterized queries in production mode (Vercel path has no SQL) |
| CSRF | HttpOnly + SameSite=lax HMAC cookie; Origin host must match on mutating `/api` except webhook (**done for demo**) |
| Payment data leakage | Store only provider token references; never raw card data; webhook requires `x-astra-webhook-secret` |
| Admin abuse | AuditLog model for sensitive actions; admin APIs require ADMIN-class signed session |
| PII exposure | Privacy export/delete placeholders, secure error handling, least privilege |
| Inventory race | Transactional inventory reservation required in Prisma adapter (not on Vercel demo) |

## Checklist

- [x] Passwords hashed with bcrypt in server-only `src/lib/server/demoUsers.ts` (not in the client bundle).
- [x] HMAC-signed `astra-session` cookie; `astra-role` is not an authz gate.
- [x] API RBAC via `requireSession` on admin/seller/orders/payments/intents/cart/tickets/wishlist/returns/reviews/qna/notifications/support/ads/fulfillment.
- [x] Origin check on mutating `/api` except the payment webhook.
- [x] Payment webhook shared secret (`x-astra-webhook-secret`).
- [x] Auth rate limit 10/10min/IP (in-memory).
- [x] CSP without `unsafe-eval`.
- [x] Environment secrets kept outside git via `.env`. `.env.example` documents `APP_SECRET` and `PAYMENT_WEBHOOK_SECRET`.
- [x] API requests validated with Zod.
- [x] Protected page prefixes: `/admin*`, `/seller*`, `/checkout*`, `/account*`, `/orders*`.
- [x] Mock payment provider clearly separated.
- [x] Audit, notifications and support models included.
- Accessibility target: WCAG 2.1 AA through semantic HTML, focus styles and contrast-aware colors.

## Production Hardening Tasks

Completed on the demo (PR #6): HMAC session, API RBAC, origin check, webhook secret, bcrypt server-only users, in-memory auth rate limit, CSP without `unsafe-eval`, checkout requires login.

Still remaining before real money/PII:

1. ~~Sign the session (HMAC); stop treating `astra-role` as the only gate.~~ **Done on the demo.**
2. Redis-backed rate limiting (in-memory is demo-only; resets on cold start).
3. ~~Tighten CSP (drop `unsafe-eval`).~~ **Done**; `unsafe-inline` still required for Next.js.
4. Keep Dependabot and production-dependency audit in CI.
5. ~~Enforce server-side permission checks for every mutation.~~ **Done on the demo** via `requireSession`; keep this when wiring Prisma.
6. Add transactional order creation and inventory locks (Prisma adapter).
7. Remove HMAC/webhook **fallback secrets** if env is unset — required for any non-demo deploy.
8. Real IdP (this demo does not ship NextAuth; do not claim it).
9. Stop publishing demo passwords if this ever goes live with real accounts.
