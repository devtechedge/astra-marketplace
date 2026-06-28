import { z } from 'zod';

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
export const registerSchema = loginSchema.extend({ name: z.string().min(2), role: z.enum(['CUSTOMER', 'SELLER']).default('CUSTOMER') });
export const orderSchema = z.object({
  customerEmail: z.string().email(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive().max(99) })).min(1),
  couponCode: z.string().optional(),
  address: z.object({ name: z.string(), line1: z.string(), city: z.string(), region: z.string(), postalCode: z.string(), country: z.string() }),
  paymentMethod: z.enum(['mock-card', 'store-credit', 'gift-card']).default('mock-card')
});
export const ticketSchema = z.object({ subject: z.string().min(5), body: z.string().min(10), orderId: z.string().optional() });
