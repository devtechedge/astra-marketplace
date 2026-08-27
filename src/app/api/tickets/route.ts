import { NextResponse } from 'next/server';
import { tickets } from '@/lib/demoData';
import { ticketSchema } from '@/lib/validation';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const parsed = ticketSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid ticket', issues: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json({ ticket: { id: `tic-${Date.now()}`, status: 'OPEN', priority: 'NORMAL', ...parsed.data } }, { status: 201 });
}
