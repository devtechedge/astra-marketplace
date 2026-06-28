# API Spec

## Auth

### POST `/api/auth/login`
Request:
```json
{ "email": "customer@demo.com", "password": "Demo123!" }
```
Response:
```json
{ "session": { "email": "customer@demo.com", "role": "CUSTOMER", "token": "..." } }
```

### POST `/api/auth/register`
Request:
```json
{ "name": "New User", "email": "new@example.com", "password": "Demo123!", "role": "CUSTOMER" }
```

## Products

### GET `/api/products?q=headphones&department=Electronics&sort=deals`
Response includes `products` and `count`.

## Orders

### GET `/api/orders`
Returns demo orders.

### POST `/api/orders`
Request:
```json
{
  "customerEmail": "customer@demo.com",
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
Response creates a paid mock order and event list.

## Coupons

### GET `/api/coupons`
Returns active coupon definitions.

## Tickets

### GET `/api/tickets`
Returns support ticket queue.

### POST `/api/tickets`
Request:
```json
{ "subject": "Need help with delivery", "body": "Please check my package status.", "orderId": "ord-9001" }
```

## Production-Expansion APIs

### GET `/api/health`
Returns service health, timestamp and demo-mode dependency checks.

### GET `/api/search/suggestions?q=head`
Returns autocomplete suggestions.

### GET/POST `/api/notifications`
Returns or creates notification events for in-app/email/SMS simulation.

### GET/POST `/api/returns`
Returns RMA/refund records or creates a new return request.

### GET/POST `/api/wishlist`
Returns or saves wishlist items.

### Admin APIs

- `GET/PATCH /api/admin/users`
- `GET/PATCH /api/admin/sellers`
- `GET/PATCH /api/admin/products`
- `GET/POST /api/admin/promotions`
- `GET/PATCH /api/admin/refunds`
- `GET /api/admin/audit`
- `GET/PATCH /api/admin/feature-flags`
- `GET /api/admin/analytics`

These expose demo-mode management workflows and return audit/action markers.

### Seller APIs

- `GET/POST /api/seller/products`
- `GET/PATCH /api/seller/orders`
- `GET /api/seller/payouts`

These power product management, order processing and payout ledger screens in demo mode.

## Even-Closer Production-Parity APIs

### Auth
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Cart and payments
- `POST /api/cart` calculates cart totals and validates inventory.
- `PATCH /api/cart` merges guest/account carts.
- `POST /api/payments/intents` creates a payment-intent-style mock.
- `POST /api/payments/webhook` records provider-style payment events.

### Fulfillment
- `GET /api/fulfillment/shipments?tracking=ASTRA784512`
- `POST /api/fulfillment/shipments`

### Community and support
- `GET/POST /api/support/conversations`
- `POST /api/reviews`
- `POST /api/qna`

### Events and ads
- `POST /api/recommendations/events`
- `GET/POST /api/analytics/events`
- `GET/POST /api/ads/campaigns`

### Admin extensions
- `GET/POST /api/admin/categories`
- `POST /api/admin/search-merchandising`
- `GET /api/admin/system-health`
