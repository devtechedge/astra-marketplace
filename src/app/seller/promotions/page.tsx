export default function SellerPromotionsPage() {
  const items = ['Percentage discount', 'Coupon clipping', 'Limited-time deal', 'Bundle offer', 'Sponsored placement', 'Member exclusive'];
  return (
    <div>
      <p className="page-kicker">Merchandising</p>
      <h1 className="mt-2">Seller promotions</h1>
      <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
        {items.map(x => (
          <div key={x} className="bg-surface p-6">
            <h2 className="text-lg">{x}</h2>
            <p className="mt-2 text-sm text-muted">Create, schedule, budget and submit for review.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
