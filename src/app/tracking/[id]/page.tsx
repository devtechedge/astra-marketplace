import { ShipmentTimeline } from '@/components/fulfillment/ShipmentTimeline';

export default function TrackingPage({ params }: { params: { id: string } }) {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Fulfillment</p>
      <h1 className="mt-2">Tracking {params.id}</h1>
      <p className="page-lead">Carrier timeline, split-shipment support and delivery exception placeholders.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <ShipmentTimeline />
        <aside className="panel p-6">
          <h2>Delivery details</h2>
          <p className="mt-3 text-sm text-muted">Carrier: Astra Logistics</p>
          <p className="text-sm text-muted">Status: In transit</p>
          <button className="btn btn-ghost mt-6 w-full">Report delivery issue</button>
          <button className="btn-quiet mt-4 block text-sm">Contact support</button>
        </aside>
      </div>
    </div>
  );
}
