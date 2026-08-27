'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { calculateCart, formatMoney } from '@/lib/commerce';
import { products } from '@/lib/demoData';

export function CartClient() {
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [coupon, setCoupon] = useState('');
  useEffect(() => setCart(JSON.parse(localStorage.getItem('astra-cart') || '[]')), []);
  function save(next: typeof cart) {
    setCart(next);
    localStorage.setItem('astra-cart', JSON.stringify(next));
    window.dispatchEvent(new Event('astra-cart-updated'));
  }
  const summary = useMemo(() => calculateCart(cart, coupon), [cart, coupon]);
  if (!cart.length) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1>Your cart is empty</h1>
        <p className="page-lead mx-auto">Browse the shop and add something you actually want.</p>
        <Link href="/" className="btn btn-solid mt-6">Continue shopping</Link>
      </div>
    );
  }
  return (
    <div data-testid="shopping-cart" className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <section>
        <h1>Shopping cart</h1>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {cart.map(item => {
            const product = products.find(p => p.id === item.productId)!;
            return (
              <div key={item.productId} className="flex gap-4 py-6">
                <div className="relative size-24 shrink-0 overflow-hidden border border-line bg-surface">
                  <Image src={product.image} alt="" fill className="object-cover" unoptimized />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${product.slug}`} className="font-display text-lg leading-snug hover:text-muted">{product.title}</Link>
                  <p className="mt-1 text-sm text-success">{product.delivery}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <select
                      value={item.quantity}
                      onChange={e => save(cart.map(i => i.productId === item.productId ? { ...i, quantity: Number(e.target.value) } : i))}
                      className="field w-20 py-2"
                      aria-label="Quantity"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n}>{n}</option>)}
                    </select>
                    <button onClick={() => save(cart.filter(i => i.productId !== item.productId))} className="btn-quiet text-sm text-danger">Remove</button>
                    <button className="btn-quiet text-sm">Save for later</button>
                  </div>
                </div>
                <strong className="tabular-nums">{formatMoney(product.price * item.quantity)}</strong>
              </div>
            );
          })}
        </div>
      </section>
      <aside className="panel sticky top-24 h-fit p-6">
        <h2>Order summary</h2>
        <label className="label mt-4">Coupon</label>
        <div className="mt-1 flex gap-2">
          <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="WELCOME10" className="field" />
          <button className="btn btn-ghost px-4">Apply</button>
        </div>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{formatMoney(summary.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd className="tabular-nums">-{formatMoney(summary.discount)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="tabular-nums">{summary.shipping === 0 ? 'Free' : formatMoney(summary.shipping)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Tax estimate</dt><dd className="tabular-nums">{formatMoney(summary.tax)}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 font-medium">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(summary.total)}</dd>
          </div>
        </dl>
        <Link href="/checkout" className="btn btn-solid mt-6 w-full">Proceed to checkout</Link>
      </aside>
    </div>
  );
}
