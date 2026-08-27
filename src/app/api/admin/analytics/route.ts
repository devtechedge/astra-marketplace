import { NextResponse } from 'next/server';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ metrics: { gmv: 128400, conversion: 7.8, aov: 86.42, refundRate: 2.4, searchCtr: 31 } });
}
