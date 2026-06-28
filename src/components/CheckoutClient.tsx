'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { calculateCart, formatMoney } from '@/lib/commerce';

export function CheckoutClient() {
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [placed, setPlaced] = useState<string | null>(null);
  const summary = useMemo(() => calculateCart(cart, 'WELCOME10'), [cart]);
  useEffect(() => setCart(JSON.parse(localStorage.getItem('astra-cart') || '[]')), []);
  async function placeOrder() {
    const res = await fetch('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': `checkout-${Date.now()}` }, body: JSON.stringify({ customerEmail: 'customer@demo.com', items: cart, couponCode: 'WELCOME10', address: { name: 'Demo Customer', line1: '100 Market Street', city: 'San Francisco', region: 'CA', postalCode: '94105', country: 'US' }, paymentMethod: 'mock-card' }) });
    const data = await res.json();
    setPlaced(data.order?.id || 'ord-demo');
    localStorage.removeItem('astra-cart');
  }
  if (placed) return <div className="rounded-3xl bg-white p-10 text-center shadow-card"><h1 className="text-4xl font-black text-emerald-700">Order placed!</h1><p className="mt-3">Confirmation #{placed}. A mock notification was generated.</p><Link href="/orders" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white">View orders</Link></div>;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        {['1. Sign in / guest identity', '2. Shipping address', '3. Delivery groups', '4. Coupons, gift cards and store credit', '5. Payment method', '6. Gift options'].map((title, idx) => <div key={title} className="rounded-3xl bg-white p-6 shadow-card"><h2 className="text-xl font-black">{title}</h2><p className="mt-2 text-slate-600">{idx === 0 ? 'Signed in as customer@demo.com. Guest checkout can merge cart after login.' : idx === 1 ? 'Demo Customer, 100 Market Street, San Francisco, CA. Address validation provider hook ready.' : idx === 2 ? 'Items grouped by AstraFulfilled and seller-fulfilled shipments with delivery-speed selection.' : idx === 3 ? 'WELCOME10 applied. Gift card and store-credit ledger hooks included.' : idx === 4 ? 'Stripe-style mock payment intent using tokenized card ending 4242. Raw card data is never stored.' : 'Gift message, gift wrap and invoice hiding are available per item.'}</p></div>)}
      </section>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-card"><h2 className="text-xl font-black">Review order</h2><dl className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(summary.subtotal)}</dd></div><div className="flex justify-between"><dt>WELCOME10</dt><dd>-{formatMoney(summary.discount)}</dd></div><div className="flex justify-between"><dt>Shipping</dt><dd>{summary.shipping === 0 ? 'FREE' : formatMoney(summary.shipping)}</dd></div><div className="flex justify-between"><dt>Tax</dt><dd>{formatMoney(summary.tax)}</dd></div><div className="flex justify-between border-t pt-3 text-lg font-black"><dt>Total</dt><dd>{formatMoney(summary.total)}</dd></div></dl><button onClick={placeOrder} disabled={!cart.length} className="mt-6 w-full rounded-full bg-coral px-6 py-3 font-bold text-white disabled:bg-slate-300">Place your order</button></aside>
    </div>
  );
}
