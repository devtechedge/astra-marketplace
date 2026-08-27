import { ShipmentTimeline } from '@/components/fulfillment/ShipmentTimeline';

export default function FulfillmentPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Operations</p>
      <h1 className="mt-2">Fulfillment</h1>
      <p className="page-lead">Warehouse inventory, seller-fulfilled orders, split shipments and carrier exceptions.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ShipmentTimeline />
        <div>
          <h2>Shipment controls</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {['Create shipment', 'Print packing slip', 'Add tracking number', 'Mark shipped', 'Handle lost package', 'Record delivery photo'].map(x => (
              <button key={x} className="btn btn-ghost">{x}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
