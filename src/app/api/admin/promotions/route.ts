import { NextResponse } from 'next/server';
import { coupons } from '@/lib/demoData';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ promotions: coupons });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ promotion: { id: `promo-${Date.now()}`, ...(await req.json()) }, audit: 'PROMOTION_CREATED' }, { status: 201 });
}
