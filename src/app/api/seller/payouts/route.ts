import { NextResponse } from 'next/server';
import { SELLER_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, SELLER_ROLES);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ balance: 12450.77, nextPayoutAt: '2026-07-03', ledger: ['settlement', 'fees', 'reserve'] });
}
