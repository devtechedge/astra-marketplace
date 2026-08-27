export default function GiftCardsPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Stored value</p>
      <h1 className="mt-2 max-w-xl">Gift cards and store credit</h1>
      <p className="page-lead">A credit, not a gimmick. Redemptions, refunds and promotional balances on one ledger.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        {['$25', '$50', '$100', '$200'].map(a => (
          <button key={a} className="btn btn-ghost">{a}</button>
        ))}
      </div>
      <button className="btn btn-solid mt-6">Buy gift card</button>
      <div className="mt-16 border-t border-line pt-10">
        <p className="page-kicker">Balance</p>
        <p className="mt-2 font-display text-4xl tabular-nums">$42.18</p>
        <p className="mt-2 text-sm text-muted">Available store credit and gift card balance.</p>
      </div>
    </div>
  );
}
