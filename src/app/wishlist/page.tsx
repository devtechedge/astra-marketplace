import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/demoData';
export default function WishlistPage() { return <div className="container-page py-10"><h1 className="text-4xl font-black">Wishlists and registries</h1><p className="mt-2 text-slate-600">Shareable lists, gift ideas and saved products.</p><div className="mt-6 grid gap-6 md:grid-cols-3">{products.slice(0,3).map(p => <ProductCard key={p.id} product={p} />)}</div></div>; }
