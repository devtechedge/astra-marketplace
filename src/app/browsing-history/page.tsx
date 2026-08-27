import { ProductCard } from '@/components/ProductCard';
import { recentlyViewedFallback } from '@/lib/services/recommendations';

export default function BrowsingHistoryPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Privacy</p>
      <h1 className="mt-2">Browsing history</h1>
      <p className="page-lead">Recently viewed items. You can clear this anytime.</p>
      <button className="btn btn-ghost mt-6">Clear history</button>
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {recentlyViewedFallback().map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
