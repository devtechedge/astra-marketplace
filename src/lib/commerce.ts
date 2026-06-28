import { coupons, products } from './demoData';
import type { CartItem } from './types';

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function findProduct(idOrSlug: string) {
  return products.find(p => p.id === idOrSlug || p.slug === idOrSlug);
}

export function searchProducts(params: { q?: string; department?: string; min?: number; max?: number; rating?: number; sort?: string }) {
  let list = [...products];
  const q = params.q?.trim().toLowerCase();
  if (q) list = list.filter(p => [p.title, p.brand, p.category, p.department, p.description].join(' ').toLowerCase().includes(q));
  if (params.department) list = list.filter(p => p.department === params.department);
  if (params.min !== undefined) list = list.filter(p => p.price >= params.min!);
  if (params.max !== undefined) list = list.filter(p => p.price <= params.max!);
  if (params.rating !== undefined) list = list.filter(p => p.rating >= params.rating!);
  if (params.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (params.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (params.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  if (params.sort === 'deals') list.sort((a, b) => (b.listPrice - b.price) - (a.listPrice - a.price));
  return list;
}

export function calculateCart(items: CartItem[], couponCode?: string) {
  const enriched = items.map(item => ({ ...item, product: findProduct(item.productId)! })).filter(i => i.product);
  const subtotal = enriched.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const coupon = couponCode ? coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase()) : undefined;
  let discount = 0;
  let shipping = subtotal > 75 ? 0 : 6.99;
  if (coupon && subtotal >= coupon.minSubtotal) {
    if (coupon.type === 'percent') discount = subtotal * (coupon.value / 100);
    if (coupon.type === 'fixed') discount = coupon.value;
    if (coupon.type === 'shipping') shipping = 0;
  }
  discount = Math.min(discount, subtotal);
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * 0.0825;
  const total = taxable + shipping + tax;
  return { items: enriched, subtotal, discount, shipping, tax, total, coupon };
}

export function reserveInventory(items: CartItem[]) {
  const errors: string[] = [];
  for (const item of items) {
    const product = findProduct(item.productId);
    if (!product) errors.push(`Product ${item.productId} does not exist`);
    else if (item.quantity > product.stock) errors.push(`${product.title} only has ${product.stock} left`);
  }
  return { ok: errors.length === 0, errors };
}
