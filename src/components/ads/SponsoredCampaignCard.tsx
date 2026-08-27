export function SponsoredCampaignCard({ name, budget, spend, status }: { name: string; budget: number; spend: number; status: string }) {
  return (
    <article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg">{name}</h2>
        <span className="chip">{status}</span>
      </div>
      <p className="mt-3 text-sm text-muted">Budget ${budget.toFixed(2)} · Spend ${spend.toFixed(2)}</p>
      <div className="mt-4 h-1 bg-line">
        <div className="h-1 bg-ink" style={{ width: `${Math.min(100, (spend / budget) * 100)}%` }} />
      </div>
      <div className="mt-6 flex gap-3">
        <button className="btn btn-ghost min-h-0 px-4 py-2 text-sm">Edit</button>
        <button className="btn-quiet text-sm">Pause</button>
      </div>
    </article>
  );
}
