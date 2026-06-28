import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Demo123!', 10);
  const customer = await prisma.user.upsert({ where: { email: 'customer@demo.com' }, update: {}, create: { email: 'customer@demo.com', name: 'Demo Customer', passwordHash: hash, roles: { create: [{ role: Role.CUSTOMER }] }, addresses: { create: { name: 'Demo Customer', line1: '100 Market Street', city: 'San Francisco', region: 'CA', postalCode: '94105', country: 'US', isDefault: true } } } });
  await prisma.user.upsert({ where: { email: 'seller@demo.com' }, update: {}, create: { email: 'seller@demo.com', name: 'Demo Seller', passwordHash: hash, roles: { create: [{ role: Role.SELLER }] } } });
  await prisma.user.upsert({ where: { email: 'admin@demo.com' }, update: {}, create: { email: 'admin@demo.com', name: 'Demo Admin', passwordHash: hash, roles: { create: [{ role: Role.ADMIN }] } } });
  const seller = await prisma.seller.upsert({ where: { storeName: 'Northstar Electronics' }, update: {}, create: { storeName: 'Northstar Electronics', status: 'APPROVED', rating: 4.8 } });
  const brand = await prisma.brand.upsert({ where: { name: 'NovaSound' }, update: {}, create: { name: 'NovaSound' } });
  const cat = await prisma.category.upsert({ where: { id: 'cat-electronics' }, update: {}, create: { id: 'cat-electronics', name: 'Electronics' } });
  const product = await prisma.product.upsert({ where: { slug: 'nova-noise-canceling-headphones' }, update: {}, create: { slug: 'nova-noise-canceling-headphones', title: 'Nova X7 Wireless Noise-Canceling Headphones', description: 'Premium wireless headphones with adaptive noise cancellation.', brandId: brand.id, sellerId: seller.id, categoryId: cat.id, price: 149.99, listPrice: 219.99, stock: 42, sku: 'NOVA-X7', fulfillment: 'AstraFulfilled', images: { create: { url: '/demo/nova.svg', alt: 'Nova headphones' } } } });
  await prisma.review.create({ data: { productId: product.id, userId: customer.id, rating: 5, title: 'Excellent sound', body: 'ANC and battery life are fantastic.' } }).catch(() => null);
  await prisma.coupon.upsert({ where: { code: 'WELCOME10' }, update: {}, create: { code: 'WELCOME10', type: 'percent', value: 10, minSubtotal: 30 } });
  await prisma.featureFlag.upsert({ where: { key: 'astra_plus_free_shipping' }, update: { enabled: true }, create: { key: 'astra_plus_free_shipping', enabled: true, config: { minSubtotal: 0 } } });
}
main().finally(() => prisma.$disconnect());
