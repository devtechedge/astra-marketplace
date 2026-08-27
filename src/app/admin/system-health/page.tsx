export default function AdminSystemHealthPage() {
  const checks = ['API latency', 'Database connectivity', 'Redis rate limiter', 'Payment webhooks', 'Search index', 'Notification provider', 'Object storage', 'Background jobs'];
  return (
    <div>
      <p className="page-kicker">Ops</p>
      <h1 className="mt-2">System health</h1>
      <p className="page-lead">Readiness checks, provider status and operational monitoring.</p>
      <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-4">
        {checks.map((c, i) => (
          <div key={c} className="bg-surface p-6">
            <h2 className="text-lg">{c}</h2>
            <p className={`mt-2 text-sm ${i === 3 ? 'text-muted' : 'text-success'}`}>{i === 3 ? 'Mock mode' : 'Healthy'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
