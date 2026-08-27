import { NextResponse } from 'next/server';
import { products } from '@/lib/demoData';
import { SELLER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, SELLER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, SELLER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ product: { id: `p-${Date.now()}`, moderationStatus: 'PENDING', ...(await req.json()) } }, { status: 201 });
}
