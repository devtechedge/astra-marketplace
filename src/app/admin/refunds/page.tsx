import { returnRequests } from '@/lib/expansionData';
import { formatMoney } from '@/lib/commerce';

export default function AdminRefundsPage() {
  return (
    <div>
      <p className="page-kicker">Finance</p>
      <h1 className="mt-2">Returns and refunds</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {returnRequests.map(r => (
          <article key={r.id} className="py-6">
            <div className="flex justify-between gap-3">
              <div>
                <h2 className="text-lg">{r.rma}</h2>
                <p className="text-sm text-muted">{r.productTitle} · {r.reason}</p>
              </div>
              <strong className="tabular-nums">{formatMoney(r.amount)}</strong>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="btn btn-solid">Approve refund</button>
              <button className="btn btn-ghost">Inspect return</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
