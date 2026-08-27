import { NextResponse } from 'next/server';
import { ADMIN_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ status: 'healthy', checks: { api: 'ok', database: 'demo-mode', redis: 'demo-mode', payments: 'mock-mode', search: 'demo-index', storage: 'local-placeholder' } });
}
