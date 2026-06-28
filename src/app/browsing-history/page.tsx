import { ProductCard } from '@/components/ProductCard';
import { recentlyViewedFallback } from '@/lib/services/recommendations';
export default function BrowsingHistoryPage() { return <div className="container-page py-10"><h1 className="text-4xl font-black">Browsing history</h1><p className="mt-2 text-slate-600">Privacy controls and recently viewed items.</p><button className="mt-5 rounded-full border px-5 py-2 font-bold">Clear history</button><div className="mt-8 grid gap-6 md:grid-cols-4">{recentlyViewedFallback().map(p => <ProductCard key={p.id} product={p} />)}</div></div>; }
