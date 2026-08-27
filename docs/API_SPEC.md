# API Spec

Auth values used below:
- **Public** — no session required.
- **Public + origin + rate limit** — mutating auth endpoints: 10 requests / 10 minutes / IP; Origin host must match when present (403 otherwise).
- **Signed session (roles)** — HMAC `astra-session` cookie; 401 if missing/invalid; 403 if role not allowed.
- **Webhook secret** — `x-astra-webhook-secret` header compared to `PAYMENT_WEBHOOK_SECRET`.

Role groups used by `src/lib/security/api.ts`:
- CUSTOMER_ROLES: CUSTOMER, MEMBER, ADMIN
- ORDER_READ_ROLES: CUSTOMER, MEMBER, ADMIN, SUPPORT
- SELLER_ROLES: SELLER, ADMIN
- ADMIN_ROLES: ADMIN, MODERATOR, MARKETING, FINANCE, SUPPORT
- FULFILLMENT_ROLES: SELLER, ADMIN, FULFILLMENT
- ADS_ROLES: ADMIN, MARKETING

Missing/invalid session is GUEST, never CUSTOMER. `astra-role` is ignored.

## Auth

### POST `/api/auth/login`
Auth: Public + origin + rate limit

Request:
```json
{ "email": "customer@demo.com", "password": "Demo123!" }
```

Response `200`:
```json
{ "email": "customer@demo.com", "role": "CUSTOMER" }
```

Sets httpOnly `astra-session` (HMAC-SHA256, SameSite=lax, 8h, Secure on production/Vercel). Clears `astra-role`. The token is **not** in the JSON body.

Errors: `400` invalid format, `401` bad credentials, `403` origin, `429` rate limit.

### POST `/api/auth/register`
Auth: Public + origin + rate limit

Request:
```json
{ "name": "New User", "email": "new@example.com", "password": "Demo123!", "role": "SELLER" }
```

`role` in the body is ignored. The account is always CUSTOMER. Demo does not persist users (no session cookie is set).

Response `201`:
```json
{ "user": { "email": "new@example.com", "name": "New User", "role": "CUSTOMER" }, "message": "Demo account accepted. Connect Prisma adapter to persist." }
```

### POST `/api/auth/logout`
Auth: Public (clears cookies regardless of session)

Response clears `astra-session` and `astra-role`.

### POST `/api/auth/forgot-password`
Auth: Public + origin + rate limit

Always returns `{ "ok": true }`. No token, no user enumeration.

### POST `/api/auth/reset-password`
Auth: Public + origin + rate limit

Always returns `{ "ok": true }`. No token leak.

## Products

### GET `/api/products?q=headphones&department=Electronics&sort=deals`
Auth: Public

Response includes `products` and `count`. Catalog is 18 SKUs with JPEG paths under `/products/*.jpg`.

## Search

### GET `/api/search/suggestions?q=head`
Auth: Public

Returns autocomplete suggestions.

## Health

### GET `/api/health`
Auth: Public

Returns service health, timestamp and demo-mode dependency checks (`database: demo-mode`).

## Coupons

### GET `/api/coupons`
Auth: Public

Returns active coupon definitions.

## Orders

### GET `/api/orders`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN, SUPPORT)

Returns orders filtered to the session email unless the role is ADMIN or SUPPORT (those roles see all demo orders). `401` if anonymous.

### POST `/api/orders`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Uses the **session email**, not `customerEmail` from the body. Anonymous POST is `401`.

Request:
```json
{
  "items": [{ "productId": "p-100", "quantity": 1 }],
  "couponCode": "WELCOME10",
  "address": {
    "name": "Demo Customer",
    "line1": "100 Market Street",
    "city": "San Francisco",
    "region": "CA",
    "postalCode": "94105",
    "country": "US"
  },
  "paymentMethod": "mock-card"
}
```

Response `201` creates a paid mock order plus event list (`payment.intent.created`, `inventory.reserved`, …). `409` if inventory unavailable.

## Cart and payments

### POST `/api/cart`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Calculates cart totals and validates inventory.

Request:
```json
{ "items": [{ "productId": "p-100", "quantity": 1 }], "couponCode": "WELCOME10" }
```

### PATCH `/api/cart`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Merges guest/account carts.

Request:
```json
{ "guest": [{ "productId": "p-100", "quantity": 1 }], "account": [] }
```

### POST `/api/payments/intents`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Creates a payment-intent-style mock. Payments are never captured.

Request:
```json
{ "amount": 12999, "currency": "usd" }
```

### POST `/api/payments/webhook`
Auth: Webhook secret (`x-astra-webhook-secret`)

No session cookie. Origin check is skipped for this path. `401` if the header is missing or does not match `PAYMENT_WEBHOOK_SECRET` (demo fallback exists in code if env is unset).

Request header: `x-astra-webhook-secret: <secret>`

Request:
```json
{ "id": "pi_demo", "type": "payment_intent.succeeded" }
```

Response: `{ "received": true, "eventType": "payment_intent.succeeded" }`

## Tickets

### GET `/api/tickets`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Returns support ticket queue.

### POST `/api/tickets`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Request:
```json
{ "subject": "Need help with delivery", "body": "Please check my package status.", "orderId": "ord-9001" }
```

## Wishlist, returns, notifications

### GET/POST `/api/wishlist`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Returns or saves wishlist items.

### GET/POST `/api/returns`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Returns RMA/refund records or creates a new return request.

### GET/POST `/api/notifications`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

Returns or creates notification events for in-app/email/SMS simulation.

## Fulfillment

### GET `/api/fulfillment/shipments?tracking=ASTRA784512`
Auth: Signed session (SELLER, ADMIN, FULFILLMENT)

### POST `/api/fulfillment/shipments`
Auth: Signed session (SELLER, ADMIN, FULFILLMENT)

Request:
```json
{ "orderId": "ord-9001", "carrier": "Astra Logistics" }
```

## Community and support

### GET/POST `/api/support/conversations`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

### POST `/api/reviews`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

### POST `/api/qna`
Auth: Signed session (CUSTOMER, MEMBER, ADMIN)

## Events and ads

### POST `/api/recommendations/events`
Auth: Origin-checked public (no session)

### GET `/api/analytics/events`
Auth: Signed session (ADMIN, MODERATOR, MARKETING, FINANCE, SUPPORT)

Returns `{ dashboard }` admin metrics.

### POST `/api/analytics/events`
Auth: Origin-checked public (no session)

### GET/POST `/api/ads/campaigns`
Auth: Signed session (ADMIN, MARKETING)

## Admin APIs

All require signed session with ADMIN_ROLES (ADMIN, MODERATOR, MARKETING, FINANCE, SUPPORT). `401` anonymous, `403` wrong role.

- `GET/PATCH /api/admin/users`
- `GET/PATCH /api/admin/sellers`
- `GET/PATCH /api/admin/products`
- `GET/POST /api/admin/promotions`
- `GET/PATCH /api/admin/refunds`
- `GET /api/admin/audit`
- `GET/PATCH /api/admin/feature-flags`
- `GET /api/admin/analytics`
- `GET/POST /api/admin/categories`
- `POST /api/admin/search-merchandising`
- `GET /api/admin/system-health`

These expose demo-mode management workflows and return audit/action markers. Vercel still uses in-memory demo data.

## Seller APIs

All require signed session with SELLER_ROLES (SELLER, ADMIN).

- `GET/POST /api/seller/products`
- `GET/PATCH /api/seller/orders`
- `GET /api/seller/payouts`

These power product management, order processing and payout ledger screens in demo mode.
