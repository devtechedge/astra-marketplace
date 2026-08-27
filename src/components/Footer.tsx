import Link from 'next/link';

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { href: '/search', label: 'All products' },
      { href: '/deals', label: 'Deals' },
      { href: '/gift-cards', label: 'Gift cards' },
      { href: '/wishlist', label: 'Wishlists' },
      { href: '/membership', label: 'AstraPlus' }
    ]
  },
  {
    title: 'Sell',
    links: [
      { href: '/seller', label: 'Seller portal' },
      { href: '/seller/onboarding', label: 'Become a seller' },
      { href: '/seller/ads', label: 'Advertise' },
      { href: '/fulfillment', label: 'Fulfillment' },
      { href: '/seller/payouts', label: 'Payouts' }
    ]
  },
  {
    title: 'Help',
    links: [
      { href: '/help', label: 'Help center' },
      { href: '/support', label: 'Contact support' },
      { href: '/orders', label: 'Your orders' },
      { href: '/returns', label: 'Returns' },
      { href: '/support/tickets', label: 'Tickets' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/security', label: 'Security' },
      { href: '/login', label: 'Sign in' },
      { href: '/register', label: 'Create account' },
      { href: '/admin', label: 'Admin' }
    ]
  }
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        {columns.map(col => (
          <div key={col.title}>
            <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map(link => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-ink hover:text-muted">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line py-6 text-center text-[12px] text-muted">
        AstraMart is an independent marketplace demo. No third-party trademarks are used.
      </div>
    </footer>
  );
}
