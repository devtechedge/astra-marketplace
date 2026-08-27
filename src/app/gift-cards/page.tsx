import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/demoData';

export default function GiftCardsPage() {
  const cards = products.filter(p => p.department === 'Gift cards');
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Stored value</p>
      <h1 className="mt-2 max-w-xl">Gift cards and store credit</h1>
      <p className="page-lead">A credit, not a gimmick. Buy a card, spend it at checkout, leftover balance stays on the account.</p>
      <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(p => <ProductCard key={p.id} product={p} />)}
      </section>
      <div className="mt-16 border-t border-line pt-10">
        <p className="page-kicker">Balance</p>
        <p className="mt-2 font-display text-4xl tabular-nums">$42.18</p>
        <p className="mt-2 text-sm text-muted">Available store credit and gift card balance.</p>
      </div>
    </div>
  );
}
