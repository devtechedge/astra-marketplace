export function MiniBarChart({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="panel p-6">
      <h2>{title}</h2>
      <div className="mt-6 space-y-3">
        {data.map(d => (
          <div key={d.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{d.label}</span>
              <span className="tabular-nums text-muted">{d.value}</span>
            </div>
            <div className="h-1 bg-line">
              <div className="h-1 bg-ink" style={{ width: `${(d.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
