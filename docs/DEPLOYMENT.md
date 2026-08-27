# Deployment

The repo already exists at https://github.com/devtechedge/astra-marketplace. Production is live at https://astra-marketplace.vercel.app/ and tracks `main`. This is not a greenfield bootstrap.

## GitHub

Clone or fork `devtechedge/astra-marketplace`. Push to `main` (or open a PR) — Vercel production follows `main`. Do not `git init` a new empty repo unless you are starting a separate fork under a new name.

CI (`.github/workflows/ci.yml`) runs unit tests, `tsc --noEmit`, and Playwright Chromium with `APP_SECRET`. Set `PAYMENT_WEBHOOK_SECRET` in the workflow env if you add webhook e2e (GitHub requires the `workflow` scope to change Actions YAML).

## Vercel

Live: **https://astra-marketplace.vercel.app/**

The public site is **seeded demo data + mock payments**, not Prisma. Prisma + Docker remain the local production foundation.

1. The GitHub repo is already imported in Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Install command: `npm install`.
5. Production branch: `main`.

### Environment variables (Vercel)

Copy from `.env.example` and set real secrets in the Vercel project:

| Variable | Required | Notes |
|----------|----------|-------|
| `APP_SECRET` | Yes for real deploys | Signs `astra-session`. A demo fallback exists in code if unset. |
| `PAYMENT_WEBHOOK_SECRET` | Yes for webhook | Compared to `x-astra-webhook-secret`. Demo fallback exists in code. |
| `NEXT_PUBLIC_APP_URL` | Recommended | Origin allowlist (e.g. `https://astra-marketplace.vercel.app`). |
| `PAYMENT_PROVIDER` | Demo | `mock` |
| `DATABASE_URL` | Local only | Not used by the Vercel demo path. |
| `STRIPE_SECRET_KEY` | Placeholder | Empty; payments stay mock. |

## Database (local production foundation)

Use Vercel Postgres, Neon, Supabase or Railway when wiring Prisma. **Not live on Vercel today.**

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

Optional local Postgres:

```bash
docker compose up -d
```

## Production Services (not on the live demo)

- Postgres: persistent relational data (schema exists; adapter not wired on Vercel)
- Redis: sessions, rate limit, cart cache
- S3/R2: product images currently ship as JPEGs in `public/products/`
- Stripe or equivalent: payments/refunds still mock
- Resend/SendGrid/Twilio: notifications
- Meilisearch/OpenSearch: advanced search/autocomplete

## Smoke Test

- Visit `/` — paper/copper merchandising hero, Fraunces wordmark.
- Search for headphones.
- Open a product with a real JPEG photo.
- Add item to cart.
- Sign in as `customer@demo.com` / `Demo123!`.
- Checkout (login required; anonymous checkout redirects to `/login`).
- `/seller` and `/admin` require seller/admin logins; anonymous visitors are redirected.
- Anonymous `POST /api/orders` is `401`.
- `GET /api/health` is public.
- `GET /api/products` is public (18 SKUs).
