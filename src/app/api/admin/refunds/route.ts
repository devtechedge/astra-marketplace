import { NextResponse } from 'next/server';
import { returnRequests } from '@/lib/expansionData';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ refundQueue: returnRequests });
}

export async function PATCH(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ refund: await req.json(), audit: 'REFUND_DECISION_RECORDED' });
}
