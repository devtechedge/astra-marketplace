import { NextResponse } from 'next/server';
import { enforcePublicAuthLimits } from '@/lib/security/api';

export async function POST(req: Request) {
  const limited = enforcePublicAuthLimits(req, 'reset');
  if (limited) return limited;
  await req.json().catch(() => null);
  return NextResponse.json({ ok: true });
}
