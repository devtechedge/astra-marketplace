import { NextResponse } from 'next/server';
import { customers } from '@/lib/expansionData';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ users: customers });
}

export async function PATCH(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ user: await req.json(), audit: 'USER_UPDATED' });
}
