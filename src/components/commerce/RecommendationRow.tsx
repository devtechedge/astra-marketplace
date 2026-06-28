import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';

export function RecommendationRow({ title, subtitle, products }: { title: string; subtitle?: string; products: Product[] }) {
  return <section className="container-page py-8"><div className="mb-5"><h2 className="text-2xl font-black">{title}</h2>{subtitle && <p className="text-slate-600">{subtitle}</p>}</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p => <ProductCard key={p.id} product={p} />)}</div></section>;
}
