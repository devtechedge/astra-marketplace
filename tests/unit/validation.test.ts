import { describe, expect, it } from 'vitest';
import { loginSchema, orderSchema, registerSchema, ticketSchema } from '@/lib/validation';

describe('input allow-lists', () => {
  it('accepts a valid login', () => {
    const parsed = loginSchema.safeParse({ email: 'customer@demo.com', password: 'Demo123!' });
    expect(parsed.success).toBe(true);
  });

  it('rejects a malformed email', () => {
    expect(loginSchema.safeParse({ email: 'not-an-email', password: 'Demo123!' }).success).toBe(false);
  });

  it('rejects short passwords', () => {
    expect(loginSchema.safeParse({ email: 'a@b.co', password: 'x' }).success).toBe(false);
  });

  it('defaults register role to CUSTOMER and forbids ADMIN self-signup', () => {
    const parsed = registerSchema.safeParse({ email: 'new@demo.com', password: 'Demo123!', name: 'Pat' });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.role).toBe('CUSTOMER');
    expect(registerSchema.safeParse({ email: 'a@b.co', password: 'Demo123!', name: 'Pat', role: 'ADMIN' }).success).toBe(false);
  });

  it('rejects empty order carts and unknown payment methods', () => {
    const base = {
      customerEmail: 'customer@demo.com',
      items: [{ productId: 'p-100', quantity: 1 }],
      address: { name: 'Pat', line1: '1 Main', city: 'SF', region: 'CA', postalCode: '94105', country: 'US' },
    };
    expect(orderSchema.safeParse({ ...base, items: [] }).success).toBe(false);
    expect(orderSchema.safeParse({ ...base, paymentMethod: 'bitcoin' }).success).toBe(false);
    expect(orderSchema.safeParse({ ...base, paymentMethod: 'mock-card' }).success).toBe(true);
  });

  it('requires a real ticket subject/body', () => {
    expect(ticketSchema.safeParse({ subject: 'hi', body: 'short' }).success).toBe(false);
    expect(ticketSchema.safeParse({ subject: 'Need a refund', body: 'Order arrived damaged.' }).success).toBe(true);
  });
});
