'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { calculateCart, formatMoney } from '@/lib/commerce';

const steps = [
  ['1. Identity', 'Signed in as customer@demo.com. Guest checkout can merge cart after login.'],
  ['2. Shipping address', 'Demo Customer, 100 Market Street, San Francisco, CA. Address validation provider hook ready.'],
  ['3. Delivery groups', 'Items grouped by AstraFulfilled and seller-fulfilled shipments with delivery-speed selection.'],
  ['4. Coupons and credit', 'WELCOME10 applied. Gift card and store-credit ledger hooks included.'],
  ['5. Payment', 'Stripe-style mock payment intent using tokenized card ending 4242. Raw card data is never stored.'],
  ['6. Gift options', 'Gift message, gift wrap and invoice hiding are available per item.']
];

export function CheckoutClient() {
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [placed, setPlaced] = useState<string | null>(null);
  const summary = useMemo(() => calculateCart(cart, 'WELCOME10'), [cart]);
  useEffect(() => setCart(JSON.parse(localStorage.getItem('astra-cart') || '[]')), []);
  async function placeOrder() {
    const res = await fetch('/api/orders', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json', 'idempotency-key': `checkout-${Date.now()}` }, body: JSON.stringify({ customerEmail: 'customer@demo.com', items: cart, couponCode: 'WELCOME10', address: { name: 'Demo Customer', line1: '100 Market Street', city: 'San Francisco', region: 'CA', postalCode: '94105', country: 'US' }, paymentMethod: 'mock-card' }) });
    if (res.status === 401) {
      window.location.assign('/login?next=/checkout');
      return;
    }
    const data = await res.json();
    setPlaced(data.order?.id || 'ord-demo');
    localStorage.removeItem('astra-cart');
    window.dispatchEvent(new Event('astra-cart-updated'));
  }
  if (placed) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="page-kicker">Confirmed</p>
        <h1 className="mt-3">Order placed</h1>
        <p className="page-lead mx-auto">Confirmation #{placed}. A mock notification was generated.</p>
        <Link href="/orders" className="btn btn-solid mt-6">View orders</Link>
      </div>
    );
  }
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <section className="space-y-4">
        <h1>Checkout</h1>
        {steps.map(([title, body]) => (
          <div key={title} className="panel p-6">
            <h2>{title}</h2>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </div>
        ))}
      </section>
      <aside className="panel sticky top-24 h-fit p-6">
        <h2>Review order</h2>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{formatMoney(summary.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">WELCOME10</dt><dd className="tabular-nums">-{formatMoney(summary.discount)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="tabular-nums">{summary.shipping === 0 ? 'Free' : formatMoney(summary.shipping)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Tax</dt><dd className="tabular-nums">{formatMoney(summary.tax)}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 font-medium">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(summary.total)}</dd>
          </div>
        </dl>
        <button onClick={placeOrder} disabled={!cart.length} className="btn btn-solid mt-6 w-full">Place your order</button>
      </aside>
    </div>
  );
}
