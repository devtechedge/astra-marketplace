import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';

export function RecommendationRow({ title, subtitle, products }: { title: string; subtitle?: string; products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="container-page py-10">
      <div className="mb-6">
        <h2>{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
