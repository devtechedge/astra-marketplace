import { NextResponse } from 'next/server';
import { sellers } from '@/lib/demoData';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ sellers });
}

export async function PATCH(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ seller: await req.json(), audit: 'SELLER_ACTION_RECORDED' });
}
