import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST(req: Request) { const event = await req.json(); services.audit.record('stripe-webhook', `PAYMENT_${event.type || 'EVENT'}`, 'PaymentIntent', event.id || 'demo'); return NextResponse.json({ received: true, eventType: event.type || 'demo.payment_succeeded' }); }
