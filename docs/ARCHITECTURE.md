# Architecture

## High-Level Design

AstraMart is a modular Next.js marketplace application. Live production (https://astra-marketplace.vercel.app/) uses the in-memory demo repository, not Prisma.

```text
Browser
  ├─ Storefront routes: /, /search, /product/[slug], /cart, /checkout, /orders,
  │                     /account, /deals, /gift-cards, /wishlist, /membership
  ├─ Seller routes: /seller
  ├─ Admin routes: /admin
  └─ API routes: /api/products, /api/orders, /api/auth/*, /api/tickets, …

Next.js Application
  ├─ UI components (paper/copper tokens, Fraunces + IBM Plex Sans)
  ├─ Commerce domain logic
  ├─ Validation schemas (Zod)
  ├─ HMAC session module (`src/lib/security/session.ts`)
  ├─ API guards (`src/lib/security/api.ts`)
  ├─ Server-only demo users (`src/lib/server/demoUsers.ts`)
  ├─ Demo data adapter
  └─ Future Prisma repository adapter (local foundation, not live on Vercel)

Persistence
  ├─ Demo / Vercel: in-memory seed data + browser localStorage cart
  ├─ Catalog images: JPEG files in `public/products/` (not SVG data URIs)
  └─ Local production mode: PostgreSQL via Prisma, Redis cache/session, S3-compatible assets
```

## Design system

Tokens live in `tailwind.config.ts` and `src/styles/globals.css`:

| Token | Value |
|-------|-------|
| paper | `#F4EFE6` |
| surface | `#FFFCF7` |
| ink | `#1A1612` |
| muted | `#6B645C` |
| line | `#E4DCD0` |
| copper | `#C45C26` |
| success | `#2F6B4F` |
| danger | `#9B2C2C` |

Fonts: Fraunces (display) and IBM Plex Sans via `next/font` in `src/app/layout.tsx`. Overlay scrollbars are hidden until overflow + hover/focus (`globals.css`). Header category strip lists Gift cards once via `/gift-cards` (not also as a department chip).

## Auth and middleware

- Session cookie `astra-session` is HMAC-SHA256 over a base64url payload (`email`, `role`, `exp`), 8h TTL, httpOnly, SameSite=lax, Secure on Vercel/production. Signed in `src/lib/security/session.ts` with `APP_SECRET` (demo fallback if unset).
- `astra-role` is cleared and never used for authorization.
- Missing or invalid session is **GUEST**, never CUSTOMER.
- bcrypt hashes for demo users live only in `src/lib/server/demoUsers.ts` (not in `demoData.ts` / client bundle).
- Middleware (`middleware.ts`) gates `/admin*`, `/seller*`, `/checkout*`, `/account*`, `/orders*` and redirects to `/login`. Origin check on mutating `/api` except `/api/payments/webhook`.
- API routes call `requireSession` with role allow-lists. Auth endpoints rate-limit 10/10min/IP in memory.
- CSP is set without `unsafe-eval`; `unsafe-inline` remains for Next.js.

## Agentic Loop Engineering

Each milestone should follow:

Plan → Act → Observe → Reflect → Verify → Improve

Artifacts maintained:
- Task ledger
- API spec
- Test report
- Security review
- Deployment notes
- Changelog

## Domain Boundaries

- Identity and access: users, roles, signed sessions, addresses, payment token references
- Catalog: 18 SKUs with JPEG images, variants, categories, brands, moderation
- Commerce: carts, coupons, tax/shipping calculation, order totals, inventory reservation
- Fulfillment: shipments, tracking, delivery states
- Post-order: cancellations, returns, refunds, invoices
- Seller operations: listings, inventory, order processing, payouts, compliance
- Admin operations: moderation, support, promotions, audit logs, feature flags
- Engagement: reviews, Q&A, notifications, CMS, search logs, recommendation events

## Production Provider Swaps

| Mock/Local | Production Replacement |
|---|---|
| Mock card | Stripe, Adyen, Braintree |
| In-memory demo data on Vercel | Prisma repositories (schema already in repo; **not wired on Vercel**) |
| Local JPEGs in `public/products/` | S3/R2/Supabase Storage |
| Simple search filter | Meilisearch/OpenSearch |
| Console notifications | Resend, SendGrid, Twilio, SNS |
| In-memory auth rate limit | Redis |
| HMAC demo session | Real IdP (not claimed as shipped) |
| Basic dashboard values | Warehouse/BI event pipeline |
