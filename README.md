# AstraMart — Original End-to-End Marketplace Portfolio

AstraMart is a production-style, Amazon-inspired marketplace implementation with original branding, UI, data and copy. It is designed as a GitHub portfolio repo and can be deployed to Vercel. It includes customer shopping, seller operations, admin back office, APIs, Prisma/PostgreSQL schema, seed data, mock payments, docs and tests.

> Important: this project intentionally does **not** use Amazon trademarks, logos, copyrighted assets, layouts or proprietary text. It implements comparable marketplace workflows under an original brand.

## Feature Coverage

### Customer storefront
- Home page, categories, deals, search, filters and sorting
- Product detail pages with image gallery, variants, specs, delivery, seller info, buy box, add to cart, buy now, wishlist placeholder, Q&A and reviews
- Local cart persistence, coupon application, tax/shipping calculation, checkout and mock order placement
- Account dashboard, orders, tracking, returns/refunds help, support center, membership page

### Seller portal
- Seller KPI dashboard, listing table, inventory status, bulk import/export notes
- Product creation entry point, promotions, compliance/support sections
- Payout balance and performance widgets

### Admin portal
- GMV, orders, refund and SLA metrics
- Seller approval/suspension dashboard
- Product moderation queue
- Support ticket queue, audit/configuration notes

### Backend/API
- `GET /api/products` search endpoint
- `POST /api/auth/login` demo authentication
- `POST /api/auth/register` validation flow
- `GET/POST /api/orders` order lifecycle mock
- `GET /api/coupons`
- `GET/POST /api/tickets`

### Production foundation
- Prisma PostgreSQL schema covering users, roles, sellers, products, inventory, cart, wishlist, orders, shipments, returns, refunds, reviews, Q&A, coupons, promotions, subscriptions, support, notifications, audits, CMS, feature flags and recommendation/search events
- Docker Compose for Postgres/Redis
- Security, architecture, API, deployment and test documentation
- Unit and E2E test templates

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Customer | `customer@demo.com` | `Demo123!` |
| Seller | `seller@demo.com` | `Demo123!` |
| Admin | `admin@demo.com` | `Demo123!` |

The current UI uses demo-mode data so reviewers can browse immediately. API login validates these credentials.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Optional Database Mode

```bash
cp .env.example .env
# edit DATABASE_URL or run local Postgres
npm run db:generate
npm run db:push
npm run db:seed
```

Local infrastructure:

```bash
docker compose up -d
```

## Deploy to Vercel

Yes, this can be hosted on GitHub and Vercel.

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Set environment variables from `.env.example`.
4. For database-backed production mode, add a hosted PostgreSQL database such as Vercel Postgres, Neon, Supabase or Railway and set `DATABASE_URL`.
5. Run `npm run build` as the Vercel build command.

The frontend and demo APIs deploy on Vercel. Persistent production features require a hosted database and object storage provider.

## Validation Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Repository Structure

```text
src/app              Next.js routes and API handlers
src/components       Reusable UI components
src/lib              Demo data, commerce logic, auth, validation
prisma               Database schema and seed script
docs                 Architecture, API, security, deployment and test reports
tests                Unit/E2E test scaffolds
```

## Known Portfolio Scope Notes

This repo is broad and functional for portfolio demonstration. Some enterprise integrations are intentionally mocked or abstracted: real payment capture, real email/SMS delivery, real carrier labels, tax engine, object storage, OpenSearch/Meilisearch and warehouse integrations. The docs explain how to replace mocks with production providers.
