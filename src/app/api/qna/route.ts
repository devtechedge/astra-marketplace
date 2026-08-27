import { NextResponse } from 'next/server';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ question: { id: `qa-${Date.now()}`, status: 'OPEN', ...(await req.json()) }, event: 'question.created' }, { status: 201 });
}
