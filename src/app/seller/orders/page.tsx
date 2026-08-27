import { sellerOrders } from '@/lib/expansionData';
import { formatMoney } from '@/lib/commerce';

export default function SellerOrdersPage() {
  return (
    <div>
      <p className="page-kicker">Fulfillment</p>
      <h1 className="mt-2">Order queue</h1>
      <p className="page-lead">Accept, process, ship, cancel or refund seller-fulfilled orders.</p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {sellerOrders.map(o => (
          <article key={o.id} className="py-6">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h2 className="text-lg">{o.orderId}</h2>
                <p className="text-sm text-muted">{o.item} × {o.qty} · {o.buyer}</p>
              </div>
              <div className="text-right">
                <p className="tabular-nums font-medium">{formatMoney(o.value)}</p>
                <p className="text-sm text-danger">{o.sla}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="btn btn-solid">Print packing slip</button>
              <button className="btn btn-ghost">Add tracking</button>
              <button className="btn-quiet text-sm">Message buyer</button>
              <button className="btn-quiet text-sm">Refund</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
