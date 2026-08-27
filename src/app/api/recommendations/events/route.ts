import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
import { assertSameOrigin } from '@/lib/security/api';

export async function POST(req: Request) {
  const originError = assertSameOrigin(req);
  if (originError) return originError;
  return NextResponse.json({ event: services.analytics.event({ type: 'recommendation', ...(await req.json()) }) }, { status: 201 });
}
