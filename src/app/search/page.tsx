import { ProductCard } from '@/components/ProductCard';
import { categories } from '@/lib/demoData';
import { searchProducts } from '@/lib/commerce';

export default function SearchPage({ searchParams }: { searchParams: { q?: string; department?: string; sort?: string } }) {
  const list = searchProducts({ q: searchParams.q, department: searchParams.department, sort: searchParams.sort });
  const queryLabel = searchParams.q ? `“${searchParams.q}”` : searchParams.department || 'all departments';
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Catalog</p>
      <h1 className="mt-2">Search results</h1>
      <p className="page-lead">{list.length} results for {queryLabel}</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[200px_1fr]">
        <aside>
          <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-muted">Department</h2>
          <div className="mt-3 space-y-1 text-sm">
            {categories.map(c => (
              <a key={c} className="block py-1 text-muted hover:text-ink" href={`/search?department=${encodeURIComponent(c)}`}>{c}</a>
            ))}
          </div>
          <h3 className="mt-6 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-muted">Sort</h3>
          <div className="mt-3 space-y-1 text-sm">
            <a href="/search?sort=deals" className="block py-1 text-muted hover:text-ink">Best deals</a>
            <a href="/search?sort=rating" className="block py-1 text-muted hover:text-ink">Top rated</a>
            <a href="/search?sort=price-asc" className="block py-1 text-muted hover:text-ink">Price: low to high</a>
            <a href="/search?sort=price-desc" className="block py-1 text-muted hover:text-ink">Price: high to low</a>
          </div>
        </aside>
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map(p => <ProductCard key={p.id} product={p} />)}
        </section>
      </div>
    </div>
  );
}
