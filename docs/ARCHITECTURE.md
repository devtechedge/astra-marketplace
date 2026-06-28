# Architecture

## High-Level Design

AstraMart is a modular Next.js marketplace application:

```text
Browser
  ├─ Storefront routes: /, /search, /product/[slug], /cart, /checkout, /orders
  ├─ Seller routes: /seller
  ├─ Admin routes: /admin
  └─ API routes: /api/products, /api/orders, /api/auth/*, /api/tickets

Next.js Application
  ├─ UI components
  ├─ Commerce domain logic
  ├─ Validation schemas
  ├─ Demo data adapter
  └─ Future Prisma repository adapter

Persistence
  ├─ Demo mode: in-memory seed data + browser localStorage cart
  └─ Production mode: PostgreSQL via Prisma, Redis cache/session, S3-compatible assets
```

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

- Identity and access: users, roles, sessions, addresses, payment token references
- Catalog: products, variants, images, categories, brands, moderation
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
| In-memory data | Prisma repositories |
| Local SVG data URIs | S3/R2/Supabase Storage |
| Simple search filter | Meilisearch/OpenSearch |
| Console notifications | Resend, SendGrid, Twilio, SNS |
| Basic dashboard values | Warehouse/BI event pipeline |
