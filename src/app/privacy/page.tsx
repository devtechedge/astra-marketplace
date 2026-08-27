export default function PrivacyPage() {
  const items = ['Export my data', 'Delete account request', 'Manage ad personalization', 'Clear browsing history', 'Notification consent', 'Security activity'];
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Legal</p>
      <h1 className="mt-2">Privacy and data controls</h1>
      <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
        {items.map(x => (
          <div key={x} className="bg-surface p-6">
            <h2 className="text-lg">{x}</h2>
            <p className="mt-2 text-sm text-muted">Production-ready placeholder for privacy compliance workflows.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
