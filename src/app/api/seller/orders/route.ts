import { NextResponse } from 'next/server';
import { sellerOrders } from '@/lib/expansionData';
import { SELLER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, SELLER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ orders: sellerOrders });
}

export async function PATCH(req: Request) {
  const auth = await requireSession(req, SELLER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ order: await req.json(), event: 'seller.order.updated' });
}
