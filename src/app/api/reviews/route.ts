import { NextResponse } from 'next/server';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ review: { id: `rev-${Date.now()}`, status: 'PENDING_MODERATION', verifiedPurchase: true, ...(await req.json()) }, event: 'review.submitted' }, { status: 201 });
}
