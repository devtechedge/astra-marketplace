import type { Role } from './types';

export type DemoCustomer = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  status: 'ACTIVE' | 'SUSPENDED';
  membership: 'NONE' | 'ASTRAPLUS';
  lifetimeValue: number;
  lastLogin: string;
};

export type Address = { id: string; label: string; name: string; line1: string; city: string; region: string; postalCode: string; country: string; isDefault?: boolean };
export type PaymentMethod = { id: string; brand: string; last4: string; exp: string; provider: string; isDefault?: boolean };
export type NotificationEvent = { id: string; channel: 'in-app' | 'email' | 'sms'; event: string; title: string; body: string; read: boolean; createdAt: string; role?: Role };
export type ReturnRequestDemo = { id: string; orderId: string; productTitle: string; reason: string; method: string; refundMethod: string; status: 'REQUESTED' | 'APPROVED' | 'IN_TRANSIT' | 'RECEIVED' | 'REFUNDED'; rma: string; amount: number };
export type AuditEvent = { id: string; actor: string; action: string; entity: string; entityId: string; severity: 'LOW' | 'NORMAL' | 'HIGH'; createdAt: string };
export type HomepageModule = { id: string; title: string; type: 'hero' | 'product-row' | 'category-grid' | 'deal-countdown' | 'sponsored' | 'recently-viewed'; active: boolean; position: number; audience: string };
export type FeatureFlag = { key: string; enabled: boolean; description: string; owner: string };

export const customers: DemoCustomer[] = [
  { id: 'usr-1', name: 'Demo Customer', email: 'customer@demo.com', roles: ['CUSTOMER'], status: 'ACTIVE', membership: 'ASTRAPLUS', lifetimeValue: 1842.7, lastLogin: '2026-06-27T18:10:00Z' },
  { id: 'usr-2', name: 'Maya Patel', email: 'maya@example.com', roles: ['CUSTOMER', 'MEMBER'], status: 'ACTIVE', membership: 'ASTRAPLUS', lifetimeValue: 6220.45, lastLogin: '2026-06-26T10:20:00Z' },
  { id: 'usr-3', name: 'Suspicious Buyer', email: 'risk@example.com', roles: ['CUSTOMER'], status: 'SUSPENDED', membership: 'NONE', lifetimeValue: 92.1, lastLogin: '2026-06-20T08:44:00Z' }
];

export const addresses: Address[] = [
  { id: 'addr-1', label: 'Home', name: 'Demo Customer', line1: '100 Market Street', city: 'San Francisco', region: 'CA', postalCode: '94105', country: 'US', isDefault: true },
  { id: 'addr-2', label: 'Office', name: 'Demo Customer', line1: '1 Commerce Plaza', city: 'San Jose', region: 'CA', postalCode: '95113', country: 'US' }
];

export const paymentMethods: PaymentMethod[] = [
  { id: 'pay-1', brand: 'Visa', last4: '4242', exp: '12/30', provider: 'Stripe test token', isDefault: true },
  { id: 'pay-2', brand: 'Astra Gift Card', last4: '1188', exp: 'N/A', provider: 'Stored value ledger' }
];

export const notifications: NotificationEvent[] = [
  { id: 'not-1', channel: 'in-app', event: 'order.shipped', title: 'Your package is on the way', body: 'Order ord-9001 shipped with tracking ASTRA784512.', read: false, createdAt: '2026-06-27T09:00:00Z', role: 'CUSTOMER' },
  { id: 'not-2', channel: 'email', event: 'return.approved', title: 'Return approved', body: 'RMA RMA-1024 has been approved. Drop-off instructions are ready.', read: false, createdAt: '2026-06-26T15:10:00Z', role: 'CUSTOMER' },
  { id: 'not-3', channel: 'in-app', event: 'seller.low_stock', title: 'Low stock alert', body: 'Nova X7 has crossed the low-stock threshold.', read: false, createdAt: '2026-06-27T11:45:00Z', role: 'SELLER' },
  { id: 'not-4', channel: 'in-app', event: 'admin.moderation', title: 'Moderation queue updated', body: '3 listings require review before going live.', read: true, createdAt: '2026-06-25T19:30:00Z', role: 'ADMIN' }
];

export const returnRequests: ReturnRequestDemo[] = [
  { id: 'ret-1', orderId: 'ord-9002', productTitle: 'Designing Deep Work Systems', reason: 'Accidental order', method: 'Drop-off', refundMethod: 'Original payment method', status: 'REFUNDED', rma: 'RMA-1024', amount: 18.99 },
  { id: 'ret-2', orderId: 'ord-9001', productTitle: 'Nova X7 Wireless Noise-Canceling Headphones', reason: 'Item arrived late', method: 'Pickup', refundMethod: 'Store credit', status: 'REQUESTED', rma: 'RMA-1188', amount: 149.99 }
];

export const auditEvents: AuditEvent[] = [
  { id: 'aud-1', actor: 'admin@demo.com', action: 'SELLER_APPROVED', entity: 'Seller', entityId: 'sel-3', severity: 'NORMAL', createdAt: '2026-06-27T13:00:00Z' },
  { id: 'aud-2', actor: 'admin@demo.com', action: 'REFUND_APPROVED', entity: 'Refund', entityId: 'ret-1', severity: 'HIGH', createdAt: '2026-06-26T16:00:00Z' },
  { id: 'aud-3', actor: 'seller@demo.com', action: 'PRODUCT_PRICE_UPDATED', entity: 'Product', entityId: 'p-100', severity: 'LOW', createdAt: '2026-06-25T12:30:00Z' }
];

export const homepageModules: HomepageModule[] = [
  { id: 'hm-1', title: 'Summer Tech Event', type: 'hero', active: true, position: 1, audience: 'All shoppers' },
  { id: 'hm-2', title: 'Recommended for you', type: 'product-row', active: true, position: 2, audience: 'Logged-in customers' },
  { id: 'hm-3', title: 'Limited-time deals', type: 'deal-countdown', active: true, position: 3, audience: 'All shoppers' },
  { id: 'hm-4', title: 'Recently viewed', type: 'recently-viewed', active: true, position: 4, audience: 'Returning visitors' }
];

export const featureFlags: FeatureFlag[] = [
  { key: 'stripe_test_checkout', enabled: true, description: 'Use payment-intent style mock for checkout.', owner: 'Payments' },
  { key: 'recommendation_rows', enabled: true, description: 'Show personalized product rows.', owner: 'Growth' },
  { key: 'seller_csv_import', enabled: true, description: 'Expose seller bulk listing import/export.', owner: 'Seller Platform' },
  { key: 'returns_rma_flow', enabled: true, description: 'Enable customer RMA workflow.', owner: 'Post Order' },
  { key: 'admin_cms_modules', enabled: true, description: 'Enable homepage module editor.', owner: 'Marketplace Ops' }
];

export const sellerOrders = [
  { id: 'so-1', orderId: 'ord-9001', buyer: 'customer@demo.com', item: 'Nova X7 Wireless Noise-Canceling Headphones', qty: 1, status: 'Awaiting shipment', sla: 'Ship by today', value: 149.99 },
  { id: 'so-2', orderId: 'ord-9010', buyer: 'maya@example.com', item: 'OrbitCam 4K Waterproof Action Camera Bundle', qty: 2, status: 'Processing', sla: 'Ship tomorrow', value: 179.98 }
];

export const searchSuggestions = ['headphones', 'air fryer', 'running shoes', '4k camera', 'deep work book', 'skincare kit', 'gift cards', 'laptop stand', 'wireless charger'];
