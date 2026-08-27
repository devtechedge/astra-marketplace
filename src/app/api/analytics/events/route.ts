import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
import { ADMIN_ROLES, assertSameOrigin, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ dashboard: services.analytics.dashboard() });
}

export async function POST(req: Request) {
  const originError = assertSameOrigin(req);
  if (originError) return originError;
  return NextResponse.json({ event: services.analytics.event(await req.json()) }, { status: 201 });
}
