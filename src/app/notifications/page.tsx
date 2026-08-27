import { notifications } from '@/lib/expansionData';

export default function NotificationsPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Inbox</p>
      <h1 className="mt-2">Notification center</h1>
      <p className="page-lead">In-app, email and SMS event stream simulator.</p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {notifications.map(n => (
          <article key={n.id} className="py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl">{n.title}</h2>
              <span className="chip">{n.channel}</span>
            </div>
            <p className="mt-2 text-sm">{n.body}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted">{n.event} · {new Date(n.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
