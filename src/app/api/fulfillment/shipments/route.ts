import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function GET(req: Request) { const tracking = new URL(req.url).searchParams.get('tracking') || 'ASTRA784512'; return NextResponse.json({ shipment: services.fulfillment.tracking(tracking) }); }
export async function POST(req: Request) { const { orderId, carrier } = await req.json(); return NextResponse.json({ shipment: services.fulfillment.createShipment(orderId, carrier || 'Astra Logistics') }, { status: 201 }); }
