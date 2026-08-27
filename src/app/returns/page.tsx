import { ReturnWorkflow } from '@/components/commerce/ReturnWorkflow';
import { returnRequests } from '@/lib/expansionData';
import { formatMoney } from '@/lib/commerce';

export default function ReturnsPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Aftercare</p>
      <h1 className="mt-2">Returns and refunds</h1>
      <p className="page-lead">RMA workflow, refund routing, replacement requests and tracking.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <ReturnWorkflow />
        <aside>
          <h2>Existing returns</h2>
          {returnRequests.map(r => (
            <div key={r.id} className="mt-4 border-b border-line pb-4">
              <p className="font-medium">{r.productTitle}</p>
              <p className="text-sm text-muted">{r.rma} · {r.status} · {formatMoney(r.amount)}</p>
              <p className="text-[12px] text-muted">{r.reason} · {r.refundMethod}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
