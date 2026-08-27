import { tickets } from '@/lib/demoData';

export default function AdminSupportPage() {
  return (
    <div>
      <p className="page-kicker">Support</p>
      <h1 className="mt-2">Ticket console</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {tickets.map(t => (
          <article key={t.id} className="py-6">
            <h2 className="text-lg">{t.subject}</h2>
            <p className="text-sm text-muted">{t.status} · {t.priority} · {t.orderId || 'No order'}</p>
            <div className="mt-4 flex gap-3">
              <button className="btn btn-solid">Assign</button>
              <button className="btn btn-ghost">Resolve</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
