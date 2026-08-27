'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['Dashboard', '/seller'],
  ['Onboarding', '/seller/onboarding'],
  ['Products', '/seller/products'],
  ['New listing', '/seller/products/new'],
  ['Orders', '/seller/orders'],
  ['Promotions', '/seller/promotions'],
  ['Payouts', '/seller/payouts'],
  ['Support', '/seller/support'],
  ['Ads', '/seller/ads']
];

export function SellerNav() {
  const pathname = usePathname();
  return (
    <nav className="ops-nav mb-10 flex gap-4 overflow-x-auto border-b border-line lg:mb-0 lg:block lg:overflow-visible lg:border-b-0 lg:border-r lg:pr-6">
      <p className="page-kicker mb-3 hidden lg:block">Seller</p>
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
