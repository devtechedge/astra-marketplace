export function ShipmentTimeline({ steps = ['Order placed', 'Payment confirmed', 'Packed', 'Shipped', 'Out for delivery'] }: { steps?: string[] }) {
  return (
    <div className="panel p-6">
      <h2>Shipment timeline</h2>
      <div className="mt-6 space-y-4">
        {steps.map((s, i) => (
          <div key={s} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center bg-ink text-[11px] text-surface">{i + 1}</span>
            <div>
              <p className="font-medium">{s}</p>
              <p className="text-sm text-muted">{i === steps.length - 1 ? 'Current status' : 'Completed'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
