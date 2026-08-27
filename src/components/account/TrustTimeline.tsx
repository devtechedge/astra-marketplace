export function TrustTimeline({ status }: { status: string }) {
  const steps = ['Placed', 'Paid', 'Processing', 'Shipped', 'Delivered'];
  const active = status === 'DELIVERED' ? 4 : status === 'SHIPPED' ? 3 : status === 'PROCESSING' ? 2 : 1;
  return (
    <div className="mt-4 grid grid-cols-5 gap-2">
      {steps.map((s, i) => (
        <div key={s} className="text-center">
          <div className={`mx-auto grid size-6 place-items-center text-[10px] ${i <= active ? 'bg-ink text-surface' : 'border border-line text-muted'}`}>{i + 1}</div>
          <p className="mt-1 text-[11px] text-muted">{s}</p>
        </div>
      ))}
    </div>
  );
}
