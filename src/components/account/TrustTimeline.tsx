export function TrustTimeline({ status }: { status: string }) {
  const steps = ['Placed', 'Paid', 'Processing', 'Shipped', 'Delivered'];
  const active = status === 'DELIVERED' ? 4 : status === 'SHIPPED' ? 3 : status === 'PROCESSING' ? 2 : 1;
  return <div className="mt-4 grid grid-cols-5 gap-2">{steps.map((s, i) => <div key={s} className="text-center"><div className={`mx-auto size-8 rounded-full ${i <= active ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'} grid place-items-center text-xs font-black`}>{i + 1}</div><p className="mt-1 text-xs font-semibold">{s}</p></div>)}</div>;
}
