# Deployment

## GitHub

```bash
git init
git add .
git commit -m "Initial AstraMart marketplace portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/astra-marketplace.git
git push -u origin main
```

## Vercel

1. Import the GitHub repo in Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Install command: `npm install`.
5. Environment variables: copy `.env.example` values and set real secrets.

## Database

Use Vercel Postgres, Neon, Supabase or Railway.

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Production Services

- Postgres: persistent relational data
- Redis: sessions, rate limit, cart cache
- S3/R2: product images and seller documents
- Stripe or equivalent: payments/refunds
- Resend/SendGrid/Twilio: notifications
- Meilisearch/OpenSearch: advanced search/autocomplete

## Smoke Test

- Visit `/`
- Search for headphones
- Open a product
- Add item to cart
- Checkout and place mock order
- Visit `/seller`
- Visit `/admin`
- Call `/api/products`
