import { NextResponse } from 'next/server';
import { calculateCart, reserveInventory } from '@/lib/commerce';
import { orderSchema } from '@/lib/validation';

export async function GET() {
  const { orders } = await import('@/lib/demoData');
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  const parsed = orderSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid order', issues: parsed.error.flatten() }, { status: 400 });
  const inventory = reserveInventory(parsed.data.items);
  if (!inventory.ok) return NextResponse.json({ error: 'Inventory unavailable', details: inventory.errors }, { status: 409 });
  const totals = calculateCart(parsed.data.items, parsed.data.couponCode);
  const order = {
    id: `ord-${Date.now()}`,
    customerEmail: parsed.data.customerEmail,
    items: parsed.data.items,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    tax: totals.tax,
    discount: totals.discount,
    total: totals.total,
    status: 'PAID',
    tracking: `ASTRA${Math.floor(Math.random() * 900000 + 100000)}`,
    createdAt: new Date().toISOString()
  };
  return NextResponse.json({ order, events: ['payment.intent.created', 'payment.authorized', 'inventory.reserved', 'notification.queued', 'audit.created'], idempotencyKey: req.headers.get('idempotency-key') || `idem-${Date.now()}` }, { status: 201 });
}
