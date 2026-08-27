import { DashboardCard } from '@/components/DashboardCard';
import { orders, products, sellers, tickets } from '@/lib/demoData';
import { formatMoney } from '@/lib/commerce';

export default function AdminPage() {
  return (
    <div data-testid="admin-command-center">
      <p className="page-kicker">Admin</p>
      <h1 className="mt-2">Command center</h1>
      <p className="mt-1 text-sm text-muted">admin@demo.com / Demo123!</p>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <DashboardCard title="GMV" value="$128.4K" note="+18% month over month" />
        <DashboardCard title="Orders" value={String(orders.length + 4910)} note="Lifecycle monitored" />
        <DashboardCard title="Refund rate" value="2.4%" note="Finance queue healthy" />
        <DashboardCard title="Support SLA" value="96%" note="Tickets within target" />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2>Seller moderation</h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {sellers.map(s => (
              <div key={s.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted">Rating {s.rating} · Payout {formatMoney(s.payoutBalance)}</p>
                </div>
                <span className="chip">{s.status}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2>Product moderation</h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {products.slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-muted">{p.department} · {p.sellerName}</p>
                </div>
                <button className="btn btn-ghost min-h-0 px-3 py-1.5 text-sm">Approve</button>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2>Support tickets</h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {tickets.map(t => (
              <div key={t.id} className="py-4">
                <p className="font-medium">{t.subject}</p>
                <p className="text-sm text-muted">{t.status} · {t.priority} · {t.orderId || 'No order'}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2>Audit and configuration</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>RBAC-protected admin routes designed</li>
            <li>Sensitive admin actions logged in schema</li>
            <li>CMS modules, feature flags and campaigns modeled</li>
            <li>Refund and return queues available</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
