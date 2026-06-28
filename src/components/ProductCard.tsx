import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from '@/lib/commerce';
import type { Product } from '@/lib/types';
import { Stars } from './Stars';

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.listPrice - product.price) / product.listPrice) * 100);
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          <Image src={product.image} alt="" fill className="object-cover" unoptimized />
          {product.badge && <span className="absolute left-3 top-3 rounded-full bg-coral px-3 py-1 text-xs font-bold text-white">{product.badge}</span>}
        </div>
        <p className="text-xs font-bold uppercase tracking-wide text-brand">{product.department}</p>
        <h3 className="mt-1 line-clamp-2 min-h-12 font-bold text-ink group-hover:text-brand">{product.title}</h3>
        <div className="mt-2 text-sm"><Stars rating={product.rating} /> <span className="text-slate-500">({product.reviewCount})</span></div>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-2xl font-black">{formatMoney(product.price)}</span>
          <span className="text-sm text-slate-400 line-through">{formatMoney(product.listPrice)}</span>
          <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">-{discount}%</span>
        </div>
        <p className="mt-2 text-sm text-slate-600">{product.delivery}</p>
      </Link>
    </article>
  );
}
