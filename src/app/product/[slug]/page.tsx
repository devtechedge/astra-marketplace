import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/AddToCartButton';
import { Stars } from '@/components/Stars';
import { findProduct, formatMoney } from '@/lib/commerce';
import { products, sellers } from '@/lib/demoData';
import { ProductCard } from '@/components/ProductCard';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = findProduct(params.slug);
  if (!product) return notFound();
  const related = products.filter(p => p.department === product.department && p.id !== product.id).slice(0, 3);
  const onSale = product.price < product.listPrice;
  return (
    <div className="container-page py-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr_280px]">
        <section>
          <div className="relative aspect-square overflow-hidden border border-line bg-surface">
            <Image src={product.image} alt={product.title} fill className="object-cover" unoptimized />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden border border-line bg-surface">
                <Image src={img} alt="" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </section>
        <section>
          <p className="page-kicker">{product.brand} · {product.department}</p>
          {product.badge && <span className="chip chip-sale mt-3 inline-block">{product.badge}</span>}
          <h1 className="mt-3">{product.title}</h1>
          <div className="mt-3 text-sm">
            <Stars rating={product.rating} />{' '}
            <Link href="#reviews" className="btn-quiet ml-2 text-sm">{product.reviewCount} ratings</Link>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className={`font-display text-3xl ${onSale ? 'price-sale' : ''}`}>{formatMoney(product.price)}</span>
            {onSale && <span className="price-list text-lg">{formatMoney(product.listPrice)}</span>}
          </div>
          <p className="mt-6 text-muted">{product.description}</p>
          <div className="mt-6 space-y-4">
            {product.variants.map(v => (
              <div key={v.name}>
                <p className="text-sm font-medium">{v.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {v.values.map(value => (
                    <button key={value} className="border border-line px-4 py-2 text-sm hover:border-ink">{value}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <h2>Specifications</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="border-b border-line pb-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <aside className="panel sticky top-24 h-fit p-6">
          <p className={`font-display text-2xl ${onSale ? 'price-sale' : ''}`}>{formatMoney(product.price)}</p>
          <p className="mt-3 text-sm text-success">{product.delivery}</p>
          <p className="mt-2 text-sm text-muted">Ships from {product.fulfillment}. Sold by {product.sellerName}.</p>
          <p className="mt-4 text-sm"><strong className="tabular-nums">{product.stock}</strong> in stock</p>
          <div className="mt-6 grid gap-3">
            <AddToCartButton productId={product.id} />
            <AddToCartButton productId={product.id} label="Buy now" />
            <button className="btn-quiet text-sm">Add to wishlist</button>
          </div>
          <p className="mt-6 text-[12px] text-muted">Protection plan available at checkout. Returns eligible. Gift options on request.</p>
        </aside>
      </div>

      <section className="mt-16 grid gap-10 border-t border-line pt-16 lg:grid-cols-3">
        <div>
          <h2>Compare seller offers</h2>
          {sellers.slice(0, 3).map((s, i) => (
            <div key={s.id} className="mt-4 border-b border-line pb-4">
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-muted">Rating {s.rating} · {i === 0 ? 'Best delivery' : 'Standard delivery'}</p>
              <p className="mt-1 tabular-nums">{formatMoney(product.price + i * 4)}</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Questions & answers</h2>
          <button className="btn-quiet mt-3 text-sm">Ask a question</button>
          {product.questions.map(qa => (
            <div key={qa.q} className="mt-4 border-t border-line pt-4">
              <p className="font-medium">Q: {qa.q}</p>
              <p className="mt-1 text-sm text-muted">A: {qa.a}</p>
            </div>
          ))}
        </div>
        <div id="reviews">
          <h2>Customer reviews</h2>
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((n, i) => (
              <div key={n} className="flex items-center gap-3 text-sm">
                <span className="w-12 text-muted">{n} star</span>
                <div className="h-1 flex-1 bg-line">
                  <div className="h-1 bg-ink" style={{ width: `${70 - i * 13}%` }} />
                </div>
              </div>
            ))}
          </div>
          {product.reviews.map(r => (
            <div key={r.title} className="mt-6 border-t border-line pt-4">
              <Stars rating={r.rating} />
              <strong className="ml-2">{r.title}</strong>
              <span className="chip ml-2">Verified</span>
              <p className="mt-1 text-sm text-muted">By {r.user}</p>
              <p className="mt-2 text-sm">{r.body}</p>
              <button className="btn-quiet mt-2 text-sm">Helpful</button>
            </div>
          ))}
          <Link href="/reviews/write" className="btn-quiet mt-4 inline-block text-sm">Write a review</Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-16">
          <h2 className="mb-6">Related</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
