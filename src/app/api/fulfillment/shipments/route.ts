import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
import { FULFILLMENT_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, FULFILLMENT_ROLES);
  if (auth instanceof NextResponse) return auth;
  const tracking = new URL(req.url).searchParams.get('tracking') || 'ASTRA784512';
  return NextResponse.json({ shipment: services.fulfillment.tracking(tracking) });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, FULFILLMENT_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { orderId, carrier } = await req.json();
  return NextResponse.json({ shipment: services.fulfillment.createShipment(orderId, carrier || 'Astra Logistics') }, { status: 201 });
}
