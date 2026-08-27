import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { categories, products } from '@/lib/demoData';
import { RecommendationRow } from '@/components/commerce/RecommendationRow';
import { buyAgainRecommendations, recentlyViewedFallback, trendingProducts } from '@/lib/services/recommendations';

const hero = products[0];
const featured = products.slice(0, 4);
const deals = [...products].sort((a, b) => (b.listPrice - b.price) - (a.listPrice - a.price)).slice(0, 4);

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="container-page grid items-end gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="page-kicker">This week</p>
            <h1 data-testid="home-hero" className="mt-4 max-w-xl">
              Sound, made quieter.
            </h1>
            <p className="mt-6 max-w-md text-muted">
              {hero.title}. Adaptive noise cancellation, forty hours, and a price that will not last.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/product/${hero.slug}`} className="btn btn-solid">Shop {hero.brand}</Link>
              <Link href="/deals" className="btn btn-ghost">Today’s deals</Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] border border-line bg-surface lg:aspect-[5/6]">
            <Image src={hero.image} alt={hero.title} fill className="object-cover" unoptimized priority />
          </div>
        </div>
      </section>

      <nav className="container-page flex flex-wrap gap-x-6 gap-y-2 border-b border-line py-6 text-[13px] text-muted">
        {categories.map(c => (
          <Link key={c} href={`/search?department=${encodeURIComponent(c)}`} className="hover:text-ink">
            {c}
          </Link>
        ))}
      </nav>

      <section className="container-page py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="page-kicker">Featured</p>
            <h2 className="mt-2">In the shop</h2>
          </div>
          <Link href="/search" className="btn-quiet text-sm">View all</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="page-kicker">Marked down</p>
              <h2 className="mt-2">Today’s deals</h2>
            </div>
            <Link href="/deals" className="btn-quiet text-sm">All deals</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <RecommendationRow title="Buy again" subtitle="From previous orders." products={buyAgainRecommendations()} />
      <RecommendationRow title="Trending" subtitle="Ranked by activity, ratings and availability." products={trendingProducts().slice(0, 4)} />
      <RecommendationRow title="Recently viewed" products={recentlyViewedFallback()} />
    </div>
  );
}
