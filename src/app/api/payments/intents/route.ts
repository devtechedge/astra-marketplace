import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
import { CUSTOMER_ROLES, requireSession } from '@/lib/security/api';

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { amount, currency } = await req.json();
  return NextResponse.json({ paymentIntent: services.checkout.createPaymentIntent(amount, currency) }, { status: 201 });
}
