# Task Ledger

| Area | Status | Evidence |
|---|---:|---|
| Original brand/design | Complete | AstraMart brand, no Amazon assets |
| Storefront | Complete | Home/search/product/deals/membership/help pages |
| Cart and checkout | Complete | Local cart, coupons, mock order API |
| Auth foundation | Complete | HMAC-signed `astra-session` + bcrypt server-only demo users (`src/lib/server/demoUsers.ts`) |
| Seller portal | Complete | Seller dashboard, inventory, promotions sections |
| Admin portal | Complete | Metrics, moderation, support and audit sections |
| Data model | Complete | Prisma schema with marketplace domains (local foundation; not live on Vercel) |
| APIs | Complete | Products, auth, orders, coupons, tickets |
| Security docs | Complete | Threat model/checklist in SECURITY.md and SECURITY_REVIEW.md |
| Deployment docs | Complete | Vercel/GitHub/Postgres guide |
| Tests | Complete | Vitest 26 passing (commerce, rbac, validation, session, origin) + Playwright smokes with signed cookies |

## Agentic Loop Evidence

1. Planned customer, seller, admin and platform milestones.
2. Implemented original demo brand and commerce workflows.
3. Added backend API handlers with validation and mock order lifecycle.
4. Added database schema for production migration.
5. Added documentation and hosting instructions.
6. Packaged repo for GitHub/Vercel portfolio use.

## Production Expansion Pass

| Area | Status | Evidence |
|---|---:|---|
| Search autocomplete | Complete | `SearchAutocomplete`, `/api/search/suggestions` |
| Homepage personalization | Complete | Buy again, trending, recently viewed rows |
| Product page enrichment | Complete | Seller offers, review histogram, verified badges, protection plan |
| Account center expansion | Complete | Addresses, wallet, privacy, gift cards, notifications, browsing history |
| Return/RMA workflow | Complete | `ReturnWorkflow`, `/api/returns`, refund queue |
| Seller operations | Complete | Onboarding, products, orders, promotions, payouts, support pages/APIs |
| Admin back office | Complete | Users, sellers, products, promos, support, refunds, audit, CMS, flags, analytics |
| Platform endpoints | Complete | Health, wishlist, notifications, seller/admin APIs |

## Even-Closer Production-Parity Pass

| Area | Status | Evidence |
|---|---:|---|
| Service architecture | Complete | `src/lib/services/platformServices.ts` |
| Demo repository adapter | Complete | `src/lib/repositories/demoRepository.ts` |
| Middleware/security headers | Complete | `middleware.ts`, `src/lib/security/http.ts` |
| Auth expansion | Complete | Register, forgot/reset, logout API, login client |
| Seller listing wizard | Complete | `ProductListingWizard`, `/seller/products/new` |
| Category builder | Complete | `/admin/categories`, API, Prisma model support |
| Search merchandising | Complete | `/admin/search-merchandising`, API |
| Sponsored ads | Complete | Seller/admin ads pages and campaign API |
| Payment abstraction | Complete | Payment intent/webhook APIs |
| Fulfillment/tracking | Complete | `/fulfillment`, `/tracking/[id]`, shipment API |
| Support conversations | Complete | `/support/tickets`, conversation API |
| Reviews/Q&A | Complete | Review page/API, Q&A API |
| Analytics events | Complete | Event APIs, chart component, Prisma model |

## Storefront restyle and catalog pass (2026-08-28) — Complete with PR evidence #2–#5

| Area | Status | Evidence |
|---|---:|---|
| Paper/copper design system | Complete | PR #2 — tokens in `tailwind.config.ts` / `globals.css`; Fraunces + IBM Plex Sans |
| Header and merchandising | Complete | PR #2 — Fraunces wordmark, copper star, Account holds Seller/Admin, merchandising hero |
| Product cards | Complete | PR #2 — photo, title, price, at most one badge; Playwright testids kept |
| Catalog photos | Complete | PR #3 — `public/products/*.jpg` for p-100–p-105 (nova, terra, orbit, aero, book, luma) |
| Catalog fill (18 SKUs) | Complete | PR #4 — p-106–p-117 across Sports, Toys, Grocery, Automotive, Pet Supplies, Gift cards |
| Overlay scrollbars | Complete | PR #4 — hidden until overflow + hover/focus |
| Gift cards merchandising | Complete | PR #5 — `/gift-cards` ProductCards; header lists Gift cards once |

## Demo security hardening pass (2026-08-28) — Complete PR #6

| Area | Status | Evidence |
|---|---:|---|
| HMAC session cookie | Complete | PR #6 — `src/lib/security/session.ts`; httpOnly, SameSite=lax, 8h, Secure on Vercel |
| bcrypt server-only users | Complete | PR #6 — `src/lib/server/demoUsers.ts`; not in client bundle |
| API RBAC | Complete | PR #6 — `requireSession` on private/mutating routes |
| Origin + rate limit | Complete | PR #6 — mutating `/api` origin check; auth 10/10min/IP |
| Webhook secret | Complete | PR #6 — `x-astra-webhook-secret` |
| CSP without unsafe-eval | Complete | PR #6 — still `unsafe-inline` for Next |
| Gated checkout | Complete | PR #6 — `/checkout` (and `/account`, `/orders`) require signed session; anonymous `/api/orders` POST is 401 |
| Tests | Complete | Vitest 26 passing + Playwright signed-cookie smokes; CI has `APP_SECRET` |
