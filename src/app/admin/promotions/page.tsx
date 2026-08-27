import { coupons } from '@/lib/demoData';

export default function AdminPromotionsPage() {
  return (
    <div>
      <p className="page-kicker">Merchandising</p>
      <h1 className="mt-2">Promotions</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {coupons.map(c => (
          <div key={c.code} className="flex flex-wrap items-start justify-between gap-3 py-6">
            <div>
              <h2 className="text-lg">{c.code}</h2>
              <p className="mt-1 text-sm text-muted">{c.description}</p>
            </div>
            <button className="btn-quiet text-sm">Edit schedule</button>
          </div>
        ))}
      </div>
    </div>
  );
}
