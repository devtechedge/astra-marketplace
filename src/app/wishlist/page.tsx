import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/demoData';

export default function WishlistPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Saved</p>
      <h1 className="mt-2">Wishlists and registries</h1>
      <p className="page-lead">Shareable lists, gift ideas and saved products.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {products.slice(0, 3).map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
