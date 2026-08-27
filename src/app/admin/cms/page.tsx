import { homepageModules } from '@/lib/expansionData';

export default function AdminCmsPage() {
  return (
    <div>
      <p className="page-kicker">Storefront</p>
      <h1 className="mt-2">Homepage CMS</h1>
      <p className="page-lead">Schedule, reorder and personalize storefront modules.</p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {homepageModules.sort((a, b) => a.position - b.position).map(m => (
          <article key={m.id} className="flex justify-between gap-3 py-4">
            <div>
              <h2 className="text-lg">#{m.position} {m.title}</h2>
              <p className="text-sm text-muted">{m.type} · {m.audience}</p>
            </div>
            <span className={`text-sm ${m.active ? 'text-success' : 'text-muted'}`}>{m.active ? 'Active' : 'Paused'}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
