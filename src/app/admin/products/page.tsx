import { products } from '@/lib/demoData';

export default function AdminProductsPage() {
  return (
    <div>
      <p className="page-kicker">Catalog</p>
      <h1 className="mt-2">Product moderation</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Listing</th><th>Seller</th><th>Category</th><th>Risk</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id}>
                <td className="font-medium">{p.title}</td>
                <td>{p.sellerName}</td>
                <td>{p.department}</td>
                <td>{i % 3 === 0 ? 'Needs review' : 'Low'}</td>
                <td>
                  <button className="btn-quiet text-sm">Approve</button>
                  <span className="mx-2 text-line">·</span>
                  <button className="btn-quiet text-sm">Reject</button>
                  <span className="mx-2 text-line">·</span>
                  <button className="btn-quiet text-sm">Request changes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
