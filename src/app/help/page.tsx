export default function HelpPage() {
  const topics = ['Track a package', 'Cancel an order', 'Start a return', 'Refund timelines', 'Payment security', 'AstraPlus benefits', 'Seller support', 'Report a product'];
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Help</p>
      <h1 className="mt-2">Customer service</h1>
      <p className="page-lead">Self-service first. Tickets when you need a person.</p>
      <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-4">
        {topics.map(t => (
          <a key={t} href="/support" className="bg-surface p-6 text-sm font-medium hover:bg-paper">{t}</a>
        ))}
      </div>
    </div>
  );
}
