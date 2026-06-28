import Link from 'next/link';
import { ShoppingCart, MapPin, UserRound, Store, ShieldCheck, Bell } from 'lucide-react';
import { categories } from '@/lib/demoData';
import { SearchAutocomplete } from '@/components/search/SearchAutocomplete';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex items-center gap-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black text-brand">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand text-white">A</span>AstraMart
        </Link>
<SearchAutocomplete />
        <nav className="ml-auto flex items-center gap-3 text-sm font-semibold">
          <Link href="/account" className="hidden items-center gap-1 md:flex"><UserRound className="size-4" /> Account</Link>
          <Link href="/notifications" className="hidden items-center gap-1 md:flex"><Bell className="size-4" /> Alerts</Link>
          <Link href="/orders" className="hidden md:inline">Orders</Link>
          <Link href="/seller" className="hidden items-center gap-1 md:flex"><Store className="size-4" /> Seller</Link>
          <Link href="/admin" className="hidden items-center gap-1 md:flex"><ShieldCheck className="size-4" /> Admin</Link>
          <Link href="/cart" className="flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-white"><ShoppingCart className="size-4" /> Cart</Link>
        </nav>
      </div>
      <div className="border-t border-slate-100 bg-ink text-white">
        <div className="container-page flex gap-5 overflow-x-auto py-2 text-sm">
          <span className="flex items-center gap-1 whitespace-nowrap text-amber-300"><MapPin className="size-4" /> Deliver to 94105</span>
          <Link href="/deals" className="whitespace-nowrap font-bold text-amber-300">Today&apos;s Deals</Link>
          <Link href="/membership" className="whitespace-nowrap">AstraPlus</Link>
          {categories.map(c => <Link key={c} href={`/search?department=${encodeURIComponent(c)}`} className="whitespace-nowrap">{c}</Link>)}
          <Link href="/help" className="whitespace-nowrap">Customer Service</Link>
        </div>
      </div>
    </header>
  );
}
