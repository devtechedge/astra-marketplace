import Link from 'next/link';

export function Footer() {
  const cols = [
    ['Shop', 'Deals', 'Gift Cards', 'Registry', 'AstraPlus'],
    ['Sell', 'Seller Portal', 'Advertise', 'Fulfillment', 'Payouts'],
    ['Help', 'Support Center', 'Returns', 'Shipping', 'Safety'],
    ['Company', 'Careers', 'Sustainability', 'Privacy', 'Terms']
  ];
  return (
    <footer className="mt-16 bg-ink text-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        {cols.map(col => <div key={col[0]}><h3 className="mb-3 font-bold">{col[0]}</h3><ul className="space-y-2 text-sm text-slate-300">{col.slice(1).map(i => <li key={i}><Link href="/help">{i}</Link></li>)}</ul></div>)}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-400">AstraMart is an original demo marketplace. No Amazon trademarks or assets are used.</div>
    </footer>
  );
}
