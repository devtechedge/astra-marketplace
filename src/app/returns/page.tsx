import { ReturnWorkflow } from '@/components/commerce/ReturnWorkflow';
import { returnRequests } from '@/lib/expansionData';
import { formatMoney } from '@/lib/commerce';

export default function ReturnsPage() { return <div className="container-page py-10"><h1 className="text-4xl font-black">Returns and refunds</h1><p className="mt-2 text-slate-600">RMA workflow, refund routing, replacement requests and tracking.</p><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]"><ReturnWorkflow /><aside className="rounded-3xl bg-white p-6 shadow-card"><h2 className="text-2xl font-black">Existing returns</h2>{returnRequests.map(r => <div key={r.id} className="mt-4 rounded-2xl bg-slate-50 p-4"><p className="font-bold">{r.productTitle}</p><p className="text-sm text-slate-600">{r.rma} · {r.status} · {formatMoney(r.amount)}</p><p className="text-xs text-slate-500">{r.reason} · {r.refundMethod}</p></div>)}</aside></div></div>; }
