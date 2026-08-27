'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['Overview', '/admin'],
  ['Users', '/admin/users'],
  ['Sellers', '/admin/sellers'],
  ['Products', '/admin/products'],
  ['Promotions', '/admin/promotions'],
  ['Support', '/admin/support'],
  ['Refunds', '/admin/refunds'],
  ['CMS', '/admin/cms'],
  ['Flags', '/admin/feature-flags'],
  ['Audit', '/admin/audit'],
  ['Analytics', '/admin/analytics'],
  ['Categories', '/admin/categories'],
  ['Search rules', '/admin/search-merchandising'],
  ['Ads', '/admin/ads'],
  ['Health', '/admin/system-health']
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="ops-nav mb-10 flex gap-4 overflow-x-auto border-b border-line lg:mb-0 lg:block lg:overflow-visible lg:border-b-0 lg:border-r lg:pr-6">
      <p className="page-kicker mb-3 hidden lg:block">Admin</p>
      {links.map(([label, href]) => {
        const current = pathname === href;
        return (
          <Link key={href} href={href} aria-current={current ? 'page' : undefined} className="whitespace-nowrap">
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
