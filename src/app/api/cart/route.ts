import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  return NextResponse.json({ summary: services.cart.summarize(body.items || [], body.couponCode), inventory: services.cart.validate(body.items || []) });
}

export async function PATCH(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  return NextResponse.json({ merged: services.cart.merge(body.guest || [], body.account || []) });
}
