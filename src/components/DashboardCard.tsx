export function DashboardCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="panel p-4">
      <p className="page-kicker">{title}</p>
      <p className="mt-2 font-display text-2xl tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-muted">{note}</p>
    </div>
  );
}
