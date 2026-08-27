import { NextResponse } from 'next/server';
import { featureFlags } from '@/lib/expansionData';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ featureFlags });
}

export async function PATCH(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ featureFlag: await req.json(), audit: 'FEATURE_FLAG_UPDATED' });
}
