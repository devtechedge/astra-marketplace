import { orders, products } from '@/lib/demoData';
import { formatMoney } from '@/lib/commerce';
import { TrustTimeline } from '@/components/account/TrustTimeline';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Orders</p>
      <h1 className="mt-2">Your orders</h1>
      <div className="mt-10 space-y-10">
        {orders.map(o => (
          <article key={o.id} className="border-t border-line pt-6">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-medium">Order {o.id}</p>
                <p className="text-sm text-muted">Placed {new Date(o.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="tabular-nums font-medium">{formatMoney(o.total)}</p>
                <p className="text-sm text-muted">{o.status}</p>
              </div>
            </div>
            {o.items.map(i => {
              const p = products.find(x => x.id === i.productId)!;
              return (
                <div key={i.productId} className="mt-4 flex justify-between gap-4 text-sm">
                  <span>{p.title} × {i.quantity}</span>
                  <Link href={`/tracking/${o.tracking}`} className="btn-quiet">{o.tracking}</Link>
                </div>
              );
            })}
            <TrustTimeline status={o.status} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/tracking/${o.tracking}`} className="btn btn-solid">Track package</Link>
              <Link href="/returns" className="btn btn-ghost">Return or replace</Link>
              <button className="btn-quiet text-sm">Download invoice</button>
              <Link href="/support" className="btn-quiet text-sm">Get help</Link>
              <button className="btn-quiet text-sm">Buy again</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
