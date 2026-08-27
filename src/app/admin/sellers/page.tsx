import { sellers } from '@/lib/demoData';
import { formatMoney } from '@/lib/commerce';

export default function AdminSellersPage() {
  return (
    <div>
      <p className="page-kicker">Sellers</p>
      <h1 className="mt-2">Approvals and audits</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {sellers.map(s => (
          <article key={s.id} className="py-6">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h2 className="text-lg">{s.name}</h2>
                <p className="text-sm text-muted">Rating {s.rating} · Payout {formatMoney(s.payoutBalance)}</p>
              </div>
              <span className="chip h-fit">{s.status}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="btn btn-solid">Approve</button>
              <button className="btn btn-ghost">Suspend</button>
              <button className="btn-quiet text-sm">Audit store</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
