# AstraMart

Original Amazon-inspired marketplace with customer storefront, seller portal, admin back-office, cart/checkout, returns, recommendations and Prisma schema. Built as a portfolio demo.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://astra-marketplace.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Live Demo

**https://astra-marketplace.vercel.app/**

> **Demo-mode status:** Storefront, seller and admin portals run on seeded demo data with mock payments and APIs. Full Prisma/PostgreSQL schema + Docker Compose are available for local database mode. No real payment capture, carrier labels or object storage.

### Demo credentials

| Role     | Email              | Password  |
|----------|--------------------|-----------|
| Customer | `customer@demo.com` | `Demo123!` |
| Seller   | `seller@demo.com`   | `Demo123!` |
| Admin    | `admin@demo.com`    | `Demo123!` |

## Screenshots

| Storefront | Account |
|------------|---------|
| ![Storefront](docs/screenshots/01-storefront.png) | ![Account](docs/screenshots/02-account.png) |

| Orders | Seller dashboard |
|--------|------------------|
| ![Orders](docs/screenshots/03-orders.png) | ![Seller](docs/screenshots/04-seller-dashboard.png) |

| Admin operations |
|------------------|
| ![Admin](docs/screenshots/05-admin-ops.png) |

## Features

- **Customer storefront** — home, search, deals, product detail, cart, 6-step checkout, orders, tracking, returns, wishlist, gift cards, AstraPlus membership
- **Seller portal** — KPI dashboard, listings/inventory, product listing wizard, promotions, payouts, ads, support
- **Admin command center** — GMV/orders/refund/SLA metrics, seller & product moderation, support tickets, audit, CMS, feature flags, analytics, search merchandising
- **Commerce core** — coupons, tax/shipping calculation, mock payment intents, RMA-style returns, recommendation rows (buy again / trending / recently viewed)
- **Platform services** — RBAC middleware, health API, notifications, review/Q&A endpoints, system-health dashboard
- **Production foundation** — Prisma schema (users, sellers, products, orders, shipments, returns, audits, feature flags…), Docker Compose, CI workflow, architecture/security docs

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide |
| Backend      | Next.js API routes, Zod validation  |
| Data         | Prisma 5 + PostgreSQL schema, demo repository |
| Auth         | Demo cookie sessions + bcrypt       |
| Tooling      | Vitest, Playwright, ESLint, GitHub Actions |
| Deploy       | Vercel-ready                        |

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

Optional local database:

```bash
cp .env.example .env
docker compose up -d
npm run db:generate && npm run db:push && npm run db:seed
```

## Architecture notes

- Service/repository split for auth, catalog, cart, checkout, fulfillment, returns, seller and admin
- Middleware with security headers and route protection
- Demo repository powers the live Vercel deploy; swap to Prisma client for real persistence
- Deeper docs live under `docs/` (ARCHITECTURE, API_SPEC, SECURITY_REVIEW, DEPLOYMENT)

## License

MIT License. See [LICENSE](LICENSE) for details.
