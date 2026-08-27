import { describe, expect, it } from 'vitest';
import { authenticate, authorize } from '@/lib/auth';
import { can } from '@/lib/services/rbac';

describe('auth + RBAC', () => {
  it('authenticates demo customer credentials', async () => {
    const session = await authenticate('customer@demo.com', 'Demo123!');
    expect(session?.role).toBe('CUSTOMER');
    expect(session?.email).toBe('customer@demo.com');
    expect(session).not.toHaveProperty('token');
  });

  it('rejects bad passwords', async () => {
    expect(await authenticate('customer@demo.com', 'wrong')).toBeNull();
  });

  it('ADMIN has wildcard; GUEST cannot moderate', () => {
    expect(can('ADMIN', 'refund:approve')).toBe(true);
    expect(can('GUEST', 'product:moderate')).toBe(false);
    expect(can('CUSTOMER', 'order:create')).toBe(true);
    expect(can('SELLER', 'seller:write')).toBe(true);
  });

  it('authorize checks role membership', () => {
    expect(authorize('ADMIN', ['ADMIN', 'MODERATOR'])).toBe(true);
    expect(authorize('CUSTOMER', ['SELLER', 'ADMIN'])).toBe(false);
  });
});
