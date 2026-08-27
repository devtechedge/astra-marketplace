import { NextResponse } from 'next/server';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ categories: [{ name: 'Electronics', attributes: ['Battery', 'Connectivity', 'Warranty'] }, { name: 'Fashion', attributes: ['Size', 'Color', 'Fabric'] }] });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ category: { id: `cat-${Date.now()}`, ...(await req.json()) }, audit: 'CATEGORY_CREATED' }, { status: 201 });
}
