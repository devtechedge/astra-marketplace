import { NextResponse } from 'next/server';
import { returnRequests } from '@/lib/expansionData';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ returns: returnRequests });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  return NextResponse.json({ returnRequest: { id: `ret-${Date.now()}`, rma: `RMA-${Math.floor(Math.random()*9000+1000)}`, status: 'REQUESTED', ...body }, events: ['return.requested', 'notification.queued', 'audit.created'] }, { status: 201 });
}
