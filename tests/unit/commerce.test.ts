import { describe, expect, it } from 'vitest';
import { calculateCart, reserveInventory, searchProducts } from '@/lib/commerce';

describe('commerce domain', () => {
  it('searches products by term', () => {
    expect(searchProducts({ q: 'headphones' })[0]?.title).toContain('Headphones');
  });

  it('applies percentage coupon', () => {
    const result = calculateCart([{ productId: 'p-100', quantity: 1 }], 'WELCOME10');
    expect(result.discount).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(0);
  });

  it('blocks inventory over-reservation', () => {
    const result = reserveInventory([{ productId: 'p-100', quantity: 999 }]);
    expect(result.ok).toBe(false);
  });
});
