import { describe, expect, it } from 'vitest';
import { calculateCart, findProduct, formatMoney, reserveInventory, searchProducts } from '@/lib/commerce';

describe('commerce domain', () => {
  it('searches products by term', () => {
    expect(searchProducts({ q: 'headphones' })[0]?.title).toContain('Headphones');
  });

  it('filters by department and sorts by price-asc', () => {
    const list = searchProducts({ department: 'Electronics', sort: 'price-asc' });
    expect(list.length).toBeGreaterThan(1);
    expect(list[0].price).toBeLessThanOrEqual(list[1].price);
  });

  it('applies percentage coupon WELCOME10', () => {
    const result = calculateCart([{ productId: 'p-100', quantity: 1 }], 'WELCOME10');
    expect(result.discount).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(0);
    expect(result.coupon?.code).toBe('WELCOME10');
  });

  it('blocks inventory over-reservation', () => {
    const result = reserveInventory([{ productId: 'p-100', quantity: 999 }]);
    expect(result.ok).toBe(false);
    expect(result.errors[0]).toMatch(/only has/);
  });

  it('finds product by slug', () => {
    expect(findProduct('nova-noise-canceling-headphones')?.id).toBe('p-100');
  });

  it('formats money as USD', () => {
    expect(formatMoney(12.5)).toMatch(/\$12\.50/);
  });
});
