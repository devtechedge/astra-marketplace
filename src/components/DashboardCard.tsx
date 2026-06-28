export function DashboardCard({ title, value, note }: { title: string; value: string; note: string }) {
  return <div className="rounded-3xl bg-white p-6 shadow-card"><p className="text-sm font-bold uppercase tracking-wide text-slate-500">{title}</p><p className="mt-2 text-3xl font-black">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>;
}
