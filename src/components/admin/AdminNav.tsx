import Link from 'next/link';
const links = [
  ['Overview', '/admin'], ['Users', '/admin/users'], ['Sellers', '/admin/sellers'], ['Products', '/admin/products'], ['Promotions', '/admin/promotions'], ['Support', '/admin/support'], ['Refunds', '/admin/refunds'], ['CMS', '/admin/cms'], ['Flags', '/admin/feature-flags'], ['Audit', '/admin/audit'], ['Analytics', '/admin/analytics'], ['Categories', '/admin/categories'], ['Search Rules', '/admin/search-merchandising'], ['Ads', '/admin/ads'], ['Health', '/admin/system-health']
];
export function AdminNav() { return <nav className="mb-8 flex gap-2 overflow-x-auto rounded-3xl bg-white p-2 shadow-card">{links.map(([label, href]) => <Link key={href} href={href} className="whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold hover:bg-indigo-50 hover:text-brand">{label}</Link>)}</nav>; }
