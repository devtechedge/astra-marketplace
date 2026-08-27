import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from '@/lib/commerce';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.price < product.listPrice;
  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative mb-3 aspect-[4/5] overflow-hidden border border-line bg-surface">
          <Image src={product.image} alt="" fill className="object-cover" unoptimized />
          {product.badge && (
            <span className="chip chip-sale absolute left-3 top-3 bg-surface">{product.badge}</span>
          )}
        </div>
        <h3 className="font-display text-base leading-snug text-ink">{product.title}</h3>
        <div className="mt-2 flex items-baseline gap-2 text-sm">
          <span className={onSale ? 'price-sale' : 'tabular-nums text-ink'}>{formatMoney(product.price)}</span>
          {onSale && <span className="price-list">{formatMoney(product.listPrice)}</span>}
        </div>
      </Link>
    </article>
  );
}
