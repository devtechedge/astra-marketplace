import { NextResponse } from 'next/server';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ conversation: [{ from: 'Customer', body: 'Need help with delivery.' }, { from: 'Agent', body: 'I can help with that order.' }] });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ message: { id: `msg-${Date.now()}`, ...(await req.json()) }, event: 'ticket.message.created' }, { status: 201 });
}
