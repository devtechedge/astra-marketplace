import type { Role } from '../types';

export const permissions: Record<Role, string[]> = {
  GUEST: ['product:read', 'cart:local'],
  CUSTOMER: ['product:read', 'cart:write', 'order:create', 'return:create', 'review:create', 'wishlist:write'],
  MEMBER: ['product:read', 'cart:write', 'order:create', 'return:create', 'review:create', 'wishlist:write', 'membership:benefit'],
  SELLER: ['seller:read', 'seller:write', 'seller:orders', 'seller:payouts'],
  FULFILLMENT: ['fulfillment:orders', 'shipment:write'],
  SUPPORT: ['support:tickets', 'order:read'],
  MODERATOR: ['product:moderate', 'review:moderate'],
  MARKETING: ['promotion:write', 'cms:write'],
  FINANCE: ['refund:approve', 'payout:read'],
  ADMIN: ['*']
};

export function can(role: Role, permission: string) {
  const allowed = permissions[role] || [];
  return allowed.includes('*') || allowed.includes(permission);
}
