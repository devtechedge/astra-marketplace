import Link from 'next/link';
import { addresses, paymentMethods } from '@/lib/expansionData';

export default function AccountPage() {
  const sections = [
    ['Login & security', 'Password, MFA-ready settings and active sessions', '/security'],
    ['Addresses', 'Create, edit and set default delivery addresses', '/account'],
    ['Payment methods', 'Tokenized cards, gift cards and store credit', '/gift-cards'],
    ['Orders and returns', 'Tracking, invoices, cancellations and RMA', '/orders'],
    ['Wishlists', 'Saved items, registries and shareable lists', '/wishlist'],
    ['Browsing history', 'Recently viewed and privacy controls', '/browsing-history'],
    ['Notifications', 'Email, SMS and in-app preferences', '/notifications'],
    ['Privacy', 'Export/delete data and personalization controls', '/privacy'],
    ['AstraPlus', 'Membership benefits, renewal and exclusive deals', '/membership']
  ];
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Account</p>
      <h1 className="mt-2">Your account</h1>
      <p className="page-lead">Demo customer: customer@demo.com / Demo123!</p>
      <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
        {sections.map(([s, note, href]) => (
          <Link href={href} key={s} className="bg-surface p-6 hover:bg-paper">
            <h2 className="text-lg">{s}</h2>
            <p className="mt-2 text-sm text-muted">{note}</p>
          </Link>
        ))}
      </div>
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <section>
          <h2>Address book</h2>
          {addresses.map(a => (
            <div key={a.id} className="mt-4 border-b border-line pb-4">
              <p className="font-medium">{a.label} {a.isDefault && <span className="text-muted">· Default</span>}</p>
              <p className="text-sm text-muted">{a.name}, {a.line1}, {a.city}, {a.region} {a.postalCode}</p>
            </div>
          ))}
        </section>
        <section>
          <h2>Payment wallet</h2>
          {paymentMethods.map(pm => (
            <div key={pm.id} className="mt-4 border-b border-line pb-4">
              <p className="font-medium">{pm.brand} ending {pm.last4} {pm.isDefault && <span className="text-muted">· Default</span>}</p>
              <p className="text-sm text-muted">{pm.provider} · Exp {pm.exp}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
