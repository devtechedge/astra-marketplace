import { NextResponse } from 'next/server';
import { sellerOrders } from '@/lib/expansionData';
export async function GET() { return NextResponse.json({ orders: sellerOrders }); }
export async function PATCH(req: Request) { return NextResponse.json({ order: await req.json(), event: 'seller.order.updated' }); }
