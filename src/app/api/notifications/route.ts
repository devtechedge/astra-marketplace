import { NextResponse } from 'next/server';
import { notifications } from '@/lib/expansionData';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ notifications });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  return NextResponse.json({ notification: { id: `not-${Date.now()}`, read: false, createdAt: new Date().toISOString(), ...body } }, { status: 201 });
}
