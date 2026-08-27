const steps = ['Business information', 'Tax identity placeholder', 'Bank/payout setup', 'Shipping origin', 'Store profile', 'Policy acceptance', 'Admin approval'];

export default function SellerOnboardingPage() {
  return (
    <div>
      <p className="page-kicker">Get started</p>
      <h1 className="mt-2">Seller onboarding</h1>
      <p className="page-lead">Multi-step production-style onboarding flow.</p>
      <ol className="mt-10 space-y-0 border-t border-line">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-4 border-b border-line py-4">
            <span className="w-8 tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h2 className="text-lg">{s}</h2>
              <p className="mt-1 text-sm text-muted">Collect, validate and submit {s.toLowerCase()} for marketplace review.</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
