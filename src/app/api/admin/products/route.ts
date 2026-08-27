import { NextResponse } from 'next/server';
import { products } from '@/lib/demoData';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ products });
}

export async function PATCH(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ product: await req.json(), audit: 'PRODUCT_MODERATION_RECORDED' });
}
