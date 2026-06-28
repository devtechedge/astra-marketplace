import { ProductCard } from '@/components/ProductCard';
import { categories } from '@/lib/demoData';
import { searchProducts } from '@/lib/commerce';

export default function SearchPage({ searchParams }: { searchParams: { q?: string; department?: string; sort?: string } }) {
  const list = searchProducts({ q: searchParams.q, department: searchParams.department, sort: searchParams.sort });
  return <div className="container-page py-10"><h1 className="text-4xl font-black">Search results</h1><p className="mt-2 text-slate-600">{list.length} results for {searchParams.q ? `“${searchParams.q}”` : searchParams.department || 'all departments'}</p><div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]"><aside className="h-fit rounded-3xl bg-white p-5 shadow-card"><h2 className="font-black">Filters</h2><div className="mt-4 space-y-2 text-sm">{categories.map(c => <a key={c} className="block rounded-xl px-3 py-2 hover:bg-slate-100" href={`/search?department=${encodeURIComponent(c)}`}>{c}</a>)}</div><h3 className="mt-5 font-black">Sort</h3><div className="mt-2 space-y-2 text-sm"><a href="/search?sort=deals" className="block">Best deals</a><a href="/search?sort=rating" className="block">Top rated</a><a href="/search?sort=price-asc" className="block">Price: low to high</a><a href="/search?sort=price-desc" className="block">Price: high to low</a></div></aside><section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{list.map(p => <ProductCard key={p.id} product={p} />)}</section></div></div>;
}
