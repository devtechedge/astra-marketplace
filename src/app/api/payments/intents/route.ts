import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST(req: Request) { const { amount, currency } = await req.json(); return NextResponse.json({ paymentIntent: services.checkout.createPaymentIntent(amount, currency) }, { status: 201 }); }
