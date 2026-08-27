# Changelog

## 1.0.0

- Created original AstraMart marketplace brand.
- Added customer storefront, search, products, cart, checkout and orders.
- Added seller and admin dashboards.
- Added API route handlers for products, auth, orders, coupons and support tickets.
- Added Prisma database schema and seed script.
- Added security, architecture, API, deployment and test documentation.
- Packaged as GitHub/Vercel-ready portfolio repo.

## 1.1.0 Production-Style Expansion

- Added search autocomplete and suggestion API.
- Added personalized homepage recommendation rows.
- Added richer product-page trust, seller-offer and review sections.
- Added expanded account center and customer trust pages.
- Added return/RMA workflow and refund queue.
- Added full seller platform navigation and operational pages.
- Added admin back-office modules for users, sellers, products, promotions, support, refunds, CMS, flags, audit and analytics.
- Added health, wishlist, notifications, returns, seller and admin APIs.

## 1.2.0 Even-Closer Production-Parity Expansion

- Added service/repository architecture for production migration.
- Added middleware security headers and role-aware protected route handling.
- Added auth pages/APIs for register, logout, forgot password and reset password.
- Added seller product listing wizard.
- Added admin category builder, search merchandising, ads and system health pages.
- Added seller sponsored ads dashboard.
- Added cart merge/summary, payment intent and payment webhook APIs.
- Added fulfillment operations, shipment API and tracking page.
- Added support conversation workspace and APIs.
- Added review/Q&A submission APIs.
- Added analytics/recommendation event APIs.
- Extended Prisma schema with warehouse inventory, sponsored campaigns, support macros, search merchandising rules and analytics events.

## 1.3.0 Storefront restyle and catalog (2026-08-28)

PRs #2–#5: design system, real product photos, 12 new SKUs across empty departments, gift-cards merchandising, overlay scrollbars, single Gift cards header link.

- Paper/copper restyle: paper `#F4EFE6`, surface `#FFFCF7`, ink `#1A1612`, muted `#6B645C`, line `#E4DCD0`, copper `#C45C26`, success `#2F6B4F`, danger `#9B2C2C`.
- Fonts: Fraunces (display) + IBM Plex Sans via next/font.
- Header: Fraunces wordmark + 4-point copper star; Account menu holds Seller/Admin; category row on paper.
- Product cards: photo, title, price, at most one badge. Homepage merchandising hero (not GMV/SLA pitch).
- Catalog photos in `public/products/*.jpg` for original SKUs p-100–p-105 (nova, terra, orbit, aero, book, luma).
- Catalog fill to 18 SKUs: p-106 yoga mat, p-107 kettlebell, p-108 wooden railway, p-109 RC buggy, p-110 olive oil, p-111 coffee, p-112 jump starter, p-113 floor mats, p-114 slow-feeder, p-115 cat carrier, p-116 $50 gift card, p-117 $150 gift card.
- Departments: Electronics, Home & Kitchen, Fashion, Books, Beauty, Sports, Toys, Grocery, Automotive, Pet Supplies, Gift cards.
- Gift cards page renders ProductCards for `department === 'Gift cards'`. Header lists Gift cards once via `/gift-cards`.
- Overlay scrollbars: hidden until overflow + hover/focus (`globals.css`).
- Playwright testids kept: site-header, home-hero, add-to-cart, shopping-cart, login-page, seller-dashboard, admin-command-center.

## 1.4.0 Demo security hardening (2026-08-28)

PR #6: HMAC sessions, bcrypt server-only users, API RBAC, origin checks, auth rate limits, webhook secret, CSP without unsafe-eval, checkout requires login.

- HMAC-SHA256 `astra-session` cookie (httpOnly, SameSite=lax, Secure on Vercel/production, 8h). `astra-role` ignored/cleared. Missing session is GUEST.
- bcrypt hashes in `src/lib/server/demoUsers.ts` (not in demoData / client bundle). Demo logins still customer@demo.com, seller@demo.com, admin@demo.com / Demo123!.
- Login JSON is `{ email, role }` only — token stays in cookie. Register always CUSTOMER. Forgot/reset return `{ ok: true }` with no token leak.
- Middleware protects `/admin*`, `/seller*`, `/checkout*`, `/account*`, `/orders*`. Origin check on mutating `/api` except webhook.
- `requireSession` on admin/seller/orders/payments/intents/cart/tickets/etc. Webhook: `x-astra-webhook-secret` header.
- Auth rate limit 10/10min/IP in-memory. CSP without unsafe-eval; still unsafe-inline for Next.
- Checkout requires login. Public: catalog, search, health, coupons GET, browse.
- `APP_SECRET` and `PAYMENT_WEBHOOK_SECRET` in `.env.example`; CI has both.
- Residual: public demo passwords, HMAC/webhook fallbacks if env unset, mock payments, in-memory rate limit, still not a real store.
- Unit tests: 26 passed (rbac, session, origin, commerce, validation). Playwright e2e uses signed session cookies.
