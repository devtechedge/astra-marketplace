# Test Report

## Current results (2026-08-28)

Automated tests **do run**. This is not a sandbox-without-install snapshot.

- `npm test` — **26 passed / 0 failed** across 5 files: `commerce`, `rbac`, `validation`, `session`, `origin`.
- `tsc --noEmit` (`npm run typecheck`) — pass.
- Playwright `customer-flow`: storefront hero (`home-hero` / `site-header`), add-to-cart, login page copy, admin/seller dashboards via **signed session cookies** (`astra-session` HMAC).
- CI: GitHub Actions (`.github/workflows/ci.yml`) runs unit + typecheck + e2e Chromium with `APP_SECRET` (and `PAYMENT_WEBHOOK_SECRET` dummy CI value).

## Commands

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

## Manual Validation Checklist

- [x] Home page implemented
- [x] Search page implemented
- [x] Product page implemented
- [x] Add-to-cart client workflow implemented
- [x] Cart summary and coupon calculation implemented
- [x] Checkout mock order API implemented
- [x] Orders page implemented
- [x] Seller portal implemented
- [x] Admin portal implemented
- [x] Help/support/returns/membership pages implemented
- [x] Prisma production schema included
- [x] Deployment docs included

## Storefront restyle and catalog (2026-08-28)

- [x] Paper/copper design tokens and Fraunces + IBM Plex Sans
- [x] Merchandising hero (not GMV/SLA pitch); product cards photo/title/price + at most one badge
- [x] 18 SKUs with real JPEGs in `public/products` (p-100–p-117)
- [x] Gift cards page renders ProductCards; header lists Gift cards once via `/gift-cards`
- [x] Overlay scrollbars hidden until overflow + hover/focus
- [x] Playwright testids kept: site-header, home-hero, add-to-cart, shopping-cart, login-page, seller-dashboard, admin-command-center

## Demo security (2026-08-28)

- [x] HMAC login sets `astra-session` only; JSON body is `{ email, role }` (no token)
- [x] bcrypt hashes live in server-only `src/lib/server/demoUsers.ts`
- [x] Missing session is GUEST; `astra-role` ignored/cleared
- [x] Anonymous `POST /api/orders` is 401
- [x] Checkout, account, orders, seller, admin pages require signed session
- [x] Playwright e2e uses signed session cookies (not unsigned `astra-role`)

## Known Gaps for Enterprise Production

- Real payment, tax, shipping label and email/SMS integrations are mocked.
- Persistent cart/order writes require wiring API routes to Prisma repositories. **Prisma is not wired on Vercel** (in-memory `demoData`).
- Advanced search provider is documented but not bundled.
- Auth rate limit is in-memory (not Redis). HMAC/webhook fallbacks exist if env secrets are unset.
- Demo passwords remain public by design. Still not a real store.

## Additional Manual Coverage Added

- [x] Search autocomplete UI and suggestion API
- [x] Rich product page conversion/trust sections
- [x] Expanded account center
- [x] Notifications, wishlist, gift cards, privacy and browsing history pages
- [x] Multi-step return/RMA workflow
- [x] Seller onboarding, product, order, promotion, payout and support workflows
- [x] Admin user, seller, product, promotion, support, refund, audit, CMS, feature flag and analytics workflows
- [x] Health endpoint and production-style service APIs

## Even-Closer Production-Parity Manual Coverage Added

- [x] HMAC-signed session and security middleware added
- [x] Seller 10-step listing wizard added
- [x] Category attribute builder added
- [x] Search merchandising and advertising workflows added
- [x] Payment-intent and webhook APIs added
- [x] Fulfillment shipment/tracking workflow added
- [x] Support conversation workspace added
- [x] Review/Q&A submission APIs added
- [x] Analytics and recommendation event APIs added
- [x] Prisma schema expanded for production domains
