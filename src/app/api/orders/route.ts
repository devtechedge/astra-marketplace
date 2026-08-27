import { NextResponse } from 'next/server';
import { calculateCart, reserveInventory } from '@/lib/commerce';
import { orderSchema } from '@/lib/validation';
import { CUSTOMER_ROLES, ORDER_READ_ROLES, requireSession } from '@/lib/security/api';

export async function GET(req: Request) {
  const auth = await requireSession(req, ORDER_READ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { orders } = await import('@/lib/demoData');
  const staff = auth.session.role === 'ADMIN' || auth.session.role === 'SUPPORT';
  const visible = staff ? orders : orders.filter(o => o.customerEmail.toLowerCase() === auth.session.email.toLowerCase());
  return NextResponse.json({ orders: visible });
}

export async function POST(req: Request) {
  const auth = await requireSession(req, CUSTOMER_ROLES);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json().catch(() => ({}));
  const parsed = orderSchema.safeParse({ ...body, customerEmail: auth.session.email });
  if (!parsed.success) return NextResponse.json({ error: 'Invalid order', issues: parsed.error.flatten() }, { status: 400 });
  const inventory = reserveInventory(parsed.data.items);
  if (!inventory.ok) return NextResponse.json({ error: 'Inventory unavailable', details: inventory.errors }, { status: 409 });
  const totals = calculateCart(parsed.data.items, parsed.data.couponCode);
  const order = {
    id: `ord-${Date.now()}`,
    customerEmail: auth.session.email,
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
