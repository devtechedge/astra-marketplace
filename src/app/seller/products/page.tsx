import { products } from '@/lib/demoData';
import { formatMoney } from '@/lib/commerce';
import Link from 'next/link';

export default function SellerProductsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="page-kicker">Catalog</p>
          <h1 className="mt-2">Product manager</h1>
          <p className="page-lead">Create, edit, bulk import/export and moderate listings.</p>
        </div>
        <Link href="/seller/products/new" className="btn btn-solid">New listing</Link>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn btn-ghost">Import CSV</button>
        <button className="btn btn-ghost">Export CSV</button>
        <button className="btn-quiet text-sm">Variant/SKU editor</button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Listing</th><th>Price</th><th>Stock</th><th>Moderation</th><th>Conversion</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td className="font-medium">{p.title}</td>
                <td className="tabular-nums">{formatMoney(p.price)}</td>
                <td className="tabular-nums">{p.stock}</td>
                <td>Approved</td>
                <td className="tabular-nums">{(p.rating * 1.7).toFixed(1)}%</td>
                <td>
                  <button className="btn-quiet text-sm">Edit</button>
                  <span className="mx-2 text-line">·</span>
                  <button className="btn-quiet text-sm">Promote</button>
                  <span className="mx-2 text-line">·</span>
                  <button className="btn-quiet text-sm">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
