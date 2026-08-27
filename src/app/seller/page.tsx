import { DashboardCard } from '@/components/DashboardCard';
import { products, sellers } from '@/lib/demoData';
import { formatMoney } from '@/lib/commerce';
import Link from 'next/link';

export default function SellerPage() {
  const seller = sellers[0];
  const sellerProducts = products.filter(p => p.sellerId === seller.id);
  return (
    <div data-testid="seller-dashboard">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="page-kicker">Seller</p>
          <h1 className="mt-2">{seller.name}</h1>
          <p className="mt-1 text-sm text-muted">seller@demo.com / Demo123!</p>
        </div>
        <Link href="/seller/products/new" className="btn btn-solid">Create listing</Link>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <DashboardCard title="Revenue" value="$42.8K" note="Last 30 days" />
        <DashboardCard title="Orders" value="612" note="47 awaiting shipment" />
        <DashboardCard title="Inventory alerts" value="8" note="Low stock SKUs" />
        <DashboardCard title="Payout balance" value={formatMoney(seller.payoutBalance)} note="Next payout Friday" />
      </div>
      <section className="mt-10">
        <h2>Listings and inventory</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map(p => (
                <tr key={p.id}>
                  <td className="font-medium">{p.title}</td>
                  <td className="text-muted">{p.id}</td>
                  <td className="tabular-nums">{formatMoney(p.price)}</td>
                  <td className="tabular-nums">{p.stock}</td>
                  <td><span className="text-success">Live</span></td>
                  <td><button className="btn-quiet text-sm">Edit</button><span className="mx-2 text-line">·</span><button className="btn-quiet text-sm">Promote</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-10 grid gap-6 border-t border-line pt-10 lg:grid-cols-3">
        <div>
          <h3>Bulk import/export</h3>
          <p className="mt-2 text-sm text-muted">CSV templates for product, variant and inventory upload are documented.</p>
        </div>
        <div>
          <h3>Promotions</h3>
          <p className="mt-2 text-sm text-muted">Create coupons, discounts and deal submissions for moderation.</p>
        </div>
        <div>
          <h3>Support and compliance</h3>
          <p className="mt-2 text-sm text-muted">Policy warnings, moderation status and ticket escalation.</p>
        </div>
      </section>
    </div>
  );
}
