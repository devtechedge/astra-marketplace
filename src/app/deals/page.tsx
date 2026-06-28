import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/demoData';
export default function DealsPage() { return <div className="container-page py-10"><h1 className="text-4xl font-black">Today&apos;s deals</h1><p className="mt-2 text-slate-600">Coupons, lightning-style promotions and member exclusives.</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.sort((a,b)=>(b.listPrice-b.price)-(a.listPrice-a.price)).map(p => <ProductCard key={p.id} product={p} />)}</div></div>; }
