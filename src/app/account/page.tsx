import Link from 'next/link';
import { addresses, paymentMethods } from '@/lib/expansionData';

export default function AccountPage() {
  const sections = [
    ['Login & security', 'Password, MFA-ready settings and active sessions', '/login'],
    ['Addresses', 'Create, edit and set default delivery addresses', '/account'],
    ['Payment methods', 'Tokenized cards, gift cards and store credit', '/gift-cards'],
    ['Orders and returns', 'Tracking, invoices, cancellations and RMA', '/orders'],
    ['Wishlists', 'Saved items, registries and shareable lists', '/wishlist'],
    ['Browsing history', 'Recently viewed and privacy controls', '/browsing-history'],
    ['Notifications', 'Email, SMS and in-app preferences', '/notifications'],
    ['Privacy', 'Export/delete data and personalization controls', '/privacy'],
    ['AstraPlus', 'Membership benefits, renewal and exclusive deals', '/membership']
  ];
  return <div className="container-page py-10"><h1 className="text-4xl font-black">Your account</h1><p className="mt-2 text-slate-600">Demo customer: customer@demo.com / Demo123!</p><div className="mt-8 grid gap-5 md:grid-cols-3">{sections.map(([s, note, href]) => <Link href={href} key={s} className="rounded-3xl bg-white p-6 shadow-card hover:-translate-y-1 hover:text-brand"><h2 className="font-black">{s}</h2><p className="mt-2 text-sm text-slate-600">{note}</p></Link>)}</div><div className="mt-10 grid gap-6 lg:grid-cols-2"><section className="rounded-3xl bg-white p-6 shadow-card"><h2 className="text-2xl font-black">Address book</h2>{addresses.map(a => <div key={a.id} className="mt-4 rounded-2xl bg-slate-50 p-4"><p className="font-bold">{a.label} {a.isDefault && <span className="text-emerald-700">· Default</span>}</p><p className="text-sm text-slate-600">{a.name}, {a.line1}, {a.city}, {a.region} {a.postalCode}</p></div>)}</section><section className="rounded-3xl bg-white p-6 shadow-card"><h2 className="text-2xl font-black">Payment wallet</h2>{paymentMethods.map(pm => <div key={pm.id} className="mt-4 rounded-2xl bg-slate-50 p-4"><p className="font-bold">{pm.brand} ending {pm.last4} {pm.isDefault && <span className="text-emerald-700">· Default</span>}</p><p className="text-sm text-slate-600">{pm.provider} · Exp {pm.exp}</p></div>)}</section></div></div>;
}
