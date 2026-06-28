export function MiniBarChart({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return <div className="rounded-3xl bg-white p-6 shadow-card"><h2 className="text-2xl font-black">{title}</h2><div className="mt-5 space-y-3">{data.map(d => <div key={d.label}><div className="mb-1 flex justify-between text-sm"><span className="font-bold">{d.label}</span><span>{d.value}</span></div><div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-brand" style={{ width: `${(d.value / max) * 100}%` }} /></div></div>)}</div></div>;
}
