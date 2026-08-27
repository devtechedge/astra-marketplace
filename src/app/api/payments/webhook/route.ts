import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';

const WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || 'astra-demo-webhook';

export async function POST(req: Request) {
  const provided = req.headers.get('x-astra-webhook-secret');
  if (!provided || provided !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const event = await req.json().catch(() => ({}));
  services.audit.record('stripe-webhook', `PAYMENT_${event.type || 'EVENT'}`, 'PaymentIntent', event.id || 'demo');
  return NextResponse.json({ received: true, eventType: event.type || 'demo.payment_succeeded' });
}
