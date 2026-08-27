export default function SecurityPage() {
  const items = ['Change password', 'MFA setup', 'Active sessions', 'Trusted devices', 'Login alerts', 'Recovery email'];
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Account</p>
      <h1 className="mt-2">Login and security</h1>
      <p className="page-lead">Production-style account security controls.</p>
      <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
        {items.map(i => (
          <div key={i} className="bg-surface p-6">
            <h2 className="text-lg">{i}</h2>
            <p className="mt-2 text-sm text-muted">Manage {i.toLowerCase()} with audit logging and session controls.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
