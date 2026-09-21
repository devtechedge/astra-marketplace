import Link from 'next/link';
import { categories } from '@/lib/demoData';
import { SearchAutocomplete } from '@/components/search/SearchAutocomplete';
import { CartCount } from '@/components/CartCount';
import { ThemeToggle } from '@/components/ThemeToggle';

function StarMark() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="shrink-0 text-copper">
      <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  return (
    <header data-testid="site-header" className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="container-page">
        <div className="flex min-w-0 items-center gap-2 py-3 sm:gap-4 md:gap-6 md:py-4">
          <Link href="/" className="flex min-w-0 shrink items-center gap-1.5 font-display text-lg tracking-tight text-ink sm:gap-2 sm:text-xl md:text-2xl">
            <StarMark />
            <span className="truncate">AstraMart</span>
          </Link>
          <div className="hidden min-w-0 flex-1 md:block">
            <SearchAutocomplete />
          </div>
          <nav className="ml-auto flex shrink-0 items-center gap-2 text-[12px] sm:gap-4 sm:text-[13px] md:gap-6">
            <details className="relative">
              <summary className="text-ink">Account</summary>
              <div className="absolute right-0 z-50 mt-2 w-52 border border-line bg-surface py-2 text-[13px]">
                <Link href="/account" className="block px-4 py-2 hover:bg-paper">Your account</Link>
                <Link href="/login" className="block px-4 py-2 hover:bg-paper">Sign in</Link>
                <Link href="/wishlist" className="block px-4 py-2 hover:bg-paper">Wishlist</Link>
                <Link href="/notifications" className="block px-4 py-2 hover:bg-paper">Notifications</Link>
                <Link href="/membership" className="block px-4 py-2 hover:bg-paper">AstraPlus</Link>
                <Link href="/browsing-history" className="block px-4 py-2 hover:bg-paper">Browsing history</Link>
                <div className="my-2 border-t border-line" />
                <Link href="/seller" className="block px-4 py-2 text-muted hover:bg-paper hover:text-ink">Sell on AstraMart</Link>
                <Link href="/admin" className="block px-4 py-2 text-muted hover:bg-paper hover:text-ink">Admin</Link>
              </div>
            </details>
            <Link href="/orders" className="hidden sm:inline">Orders</Link>
            <Link href="/cart" className="inline-flex items-center gap-1">
              Cart
              <CartCount />
            </Link>
            <ThemeToggle />
          </nav>
        </div>
        <div className="pb-3 md:hidden">
          <SearchAutocomplete />
        </div>
      </div>
      <div className="border-t border-line bg-paper">
        <div className="container-page flex min-w-0 gap-4 overflow-x-auto overscroll-x-contain py-2.5 text-[13px] text-muted sm:gap-6 [scrollbar-width:thin]">
          <Link href="/deals" className="shrink-0 whitespace-nowrap hover:text-ink">Deals</Link>
          {categories.filter(c => c !== 'Gift cards').map(c => (
            <Link key={c} href={`/search?department=${encodeURIComponent(c)}`} className="shrink-0 whitespace-nowrap hover:text-ink">
              {c}
            </Link>
          ))}
          <Link href="/gift-cards" className="shrink-0 whitespace-nowrap hover:text-ink">Gift cards</Link>
          <Link href="/help" className="shrink-0 whitespace-nowrap hover:text-ink">Help</Link>
        </div>
      </div>
    </header>
  );
}
