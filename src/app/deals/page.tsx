import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/demoData';

export default function DealsPage() {
  const list = [...products].sort((a, b) => (b.listPrice - b.price) - (a.listPrice - a.price));
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Limited time</p>
      <h1 className="mt-2">Today’s deals</h1>
      <p className="page-lead">Coupons, timed promotions and member exclusives.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
