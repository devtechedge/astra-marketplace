export default function MembershipPage() {
  const benefits = [
    ['Free priority shipping', 'On eligible AstraFulfilled orders.'],
    ['Member-only deals', 'Early access to marked-down inventory.'],
    ['Returns made simpler', 'Prepaid labels on most categories.']
  ];
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">AstraPlus</p>
      <h1 className="mt-2 max-w-xl">Members ship free. That is the offer.</h1>
      <p className="page-lead">$79 a year. Configurable via admin feature flags and promotions.</p>
      <button className="btn btn-solid mt-10">Start demo membership</button>
      <dl className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
        {benefits.map(([t, d]) => (
          <div key={t}>
            <dt className="font-display text-xl">{t}</dt>
            <dd className="mt-2 text-sm text-muted">{d}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
