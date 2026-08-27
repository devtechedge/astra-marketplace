export default function SellerSupportPage() {
  const items = ['Policy warnings', 'Listing appeals', 'Payout support', 'Buyer messages', 'Performance coaching', 'Compliance documents'];
  return (
    <div>
      <p className="page-kicker">Support</p>
      <h1 className="mt-2">Compliance and support</h1>
      <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
        {items.map(x => (
          <div key={x} className="bg-surface p-6">
            <h2 className="text-lg">{x}</h2>
            <p className="mt-2 text-sm text-muted">Operational workflow and ticket escalation placeholder.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
