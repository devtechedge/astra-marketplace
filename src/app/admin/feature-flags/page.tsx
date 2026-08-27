import { featureFlags } from '@/lib/expansionData';

export default function AdminFlagsPage() {
  return (
    <div>
      <p className="page-kicker">Configuration</p>
      <h1 className="mt-2">Feature flags</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {featureFlags.map(f => (
          <div key={f.key} className="flex flex-wrap items-start justify-between gap-3 py-4">
            <div>
              <h2 className="text-lg">{f.key}</h2>
              <p className="mt-1 text-sm text-muted">{f.description}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted">Owner: {f.owner}</p>
            </div>
            <span className={f.enabled ? 'text-success text-sm' : 'text-muted text-sm'}>{f.enabled ? 'Enabled' : 'Disabled'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
