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
  function save(next: typeof cart) { setCart(next); localStorage.setItem('astra-cart', JSON.stringify(next)); }
  const summary = useMemo(() => calculateCart(cart, coupon), [cart, coupon]);
  if (!cart.length) return <div className="rounded-3xl bg-white p-10 text-center shadow-card"><h1 className="text-3xl font-black">Your cart is empty</h1><p className="mt-2 text-slate-600">Browse deals and add products to start checkout.</p><Link href="/" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white">Continue shopping</Link></div>;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <section className="rounded-3xl bg-white p-6 shadow-card">
        <h1 className="text-3xl font-black">Shopping Cart</h1>
        <div className="mt-6 divide-y">
          {cart.map(item => {
            const product = products.find(p => p.id === item.productId)!;
            return <div key={item.productId} className="flex gap-4 py-5"><div className="relative size-28 overflow-hidden rounded-2xl bg-slate-100"><Image src={product.image} alt="" fill className="object-cover" unoptimized /></div><div className="flex-1"><Link href={`/product/${product.slug}`} className="font-bold hover:text-brand">{product.title}</Link><p className="text-sm text-emerald-700">In stock · {product.delivery}</p><div className="mt-3 flex items-center gap-3"><select value={item.quantity} onChange={e => save(cart.map(i => i.productId === item.productId ? { ...i, quantity: Number(e.target.value) } : i))} className="rounded border px-3 py-2">{Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n}>{n}</option>)}</select><button onClick={() => save(cart.filter(i => i.productId !== item.productId))} className="text-sm font-bold text-rose-600">Remove</button><button className="text-sm font-bold text-brand">Save for later</button></div></div><strong>{formatMoney(product.price * item.quantity)}</strong></div>;
          })}
        </div>
      </section>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-card">
        <h2 className="text-xl font-black">Order summary</h2>
        <label className="mt-4 block text-sm font-bold">Coupon</label><div className="mt-1 flex gap-2"><input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="WELCOME10" className="w-full rounded-xl border px-3 py-2" /><button className="rounded-xl bg-ink px-4 text-white">Apply</button></div>
        <dl className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(summary.subtotal)}</dd></div><div className="flex justify-between"><dt>Discount</dt><dd>-{formatMoney(summary.discount)}</dd></div><div className="flex justify-between"><dt>Shipping</dt><dd>{summary.shipping === 0 ? 'FREE' : formatMoney(summary.shipping)}</dd></div><div className="flex justify-between"><dt>Tax estimate</dt><dd>{formatMoney(summary.tax)}</dd></div><div className="flex justify-between border-t pt-3 text-lg font-black"><dt>Total</dt><dd>{formatMoney(summary.total)}</dd></div></dl>
        <Link href="/checkout" className="mt-6 block rounded-full bg-coral px-6 py-3 text-center font-bold text-white">Proceed to checkout</Link>
      </aside>
    </div>
  );
}
