import { NextResponse } from 'next/server';
import { products } from '@/lib/demoData';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ wishlist: products.slice(0,3).map(p => ({ productId: p.id, product: p })) });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  return NextResponse.json({ item: body, message: 'Wishlist item saved in demo adapter' }, { status: 201 });
}
