import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { DashboardCard } from '@/components/DashboardCard';
import { categories, products } from '@/lib/demoData';
import { RecommendationRow } from '@/components/commerce/RecommendationRow';
import { buyAgainRecommendations, recentlyViewedFallback, trendingProducts } from '@/lib/services/recommendations';

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand via-indigo-600 to-ink text-white">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div><p className="font-bold text-amber-300">Original marketplace portfolio repo</p><h1 className="mt-3 text-5xl font-black leading-tight md:text-7xl">Shop, sell, fulfill and support in one complete marketplace.</h1><p className="mt-5 max-w-2xl text-lg text-indigo-100">AstraMart includes storefront, seller portal, admin operations, mock payments, order lifecycle, returns, coupons, reviews, support tickets and production docs.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/search" className="rounded-full bg-coral px-7 py-3 font-bold text-white">Start shopping</Link><Link href="/seller" className="rounded-full bg-white px-7 py-3 font-bold text-brand">Seller demo</Link></div></div>
          <div className="rounded-[2rem] bg-white/10 p-5 backdrop-blur"><div className="grid gap-4 sm:grid-cols-2"><DashboardCard title="GMV Demo" value="$128K" note="Admin analytics sample" /><DashboardCard title="Orders" value="4,912" note="Lifecycle + returns" /><DashboardCard title="Sellers" value="238" note="Onboarding + payouts" /><DashboardCard title="SLA" value="99.9%" note="Health + observability" /></div></div>
        </div>
      </section>
      <section className="container-page -mt-8 grid gap-4 md:grid-cols-5">{categories.slice(0,5).map(c => <Link href={`/search?department=${encodeURIComponent(c)}`} key={c} className="rounded-3xl bg-white p-6 text-center font-black shadow-card hover:text-brand">{c}</Link>)}</section>
      <section className="container-page py-14"><div className="mb-6 flex items-end justify-between"><div><p className="font-bold text-coral">Deals and recommendations</p><h2 className="text-3xl font-black">Featured products</h2></div><Link href="/deals" className="font-bold text-brand">View all deals</Link></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map(p => <ProductCard key={p.id} product={p} />)}</div></section>
      <RecommendationRow title="Buy again" subtitle="Fast shortcuts based on previous orders." products={buyAgainRecommendations()} />
      <RecommendationRow title="Trending near you" subtitle="Ranked by marketplace activity, ratings and availability." products={trendingProducts().slice(0,4)} />
      <RecommendationRow title="Recently viewed" subtitle="Demo personalized browsing row." products={recentlyViewedFallback()} />
      <section className="container-page grid gap-6 md:grid-cols-3"><div className="rounded-3xl bg-white p-7 shadow-card"><h3 className="text-xl font-black">AstraPlus</h3><p className="mt-2 text-slate-600">Member benefits, free shipping flags, exclusive deals and subscription dashboard.</p></div><div className="rounded-3xl bg-white p-7 shadow-card"><h3 className="text-xl font-black">Secure checkout</h3><p className="mt-2 text-slate-600">Mock payment abstraction, inventory checks, coupons, taxes and order confirmation.</p></div><div className="rounded-3xl bg-white p-7 shadow-card"><h3 className="text-xl font-black">Ops-ready</h3><p className="mt-2 text-slate-600">Admin moderation, support tickets, audits, seller analytics and deployment docs.</p></div></section>
    </div>
  );
}
