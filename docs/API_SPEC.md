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
