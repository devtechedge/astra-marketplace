import { demoRepository } from '@/lib/repositories/demoRepository';
import { authenticate } from '@/lib/auth';
import { calculateCart, reserveInventory, searchProducts } from '@/lib/commerce';
import type { CartItem, Role } from '@/lib/types';

export class AuthService {
  login(email: string, password: string) { return authenticate(email, password); }
  logout() { return { ok: true, cleared: ['session', 'csrf'] }; }
  requestPasswordReset(email: string) { return { ok: true, email, tokenPreview: `reset-${Date.now()}` }; }
  resetPassword(token: string) { return { ok: true, token, event: 'password.reset' }; }
}

export class CatalogService {
  search(params: any) { return searchProducts(params); }
  createListing(data: any, actor = 'seller@demo.com') {
    const listing = demoRepository.create('products', { moderationStatus: 'PENDING', stock: 0, rating: 0, reviewCount: 0, images: [], reviews: [], questions: [], ...data });
    demoRepository.audit(actor, 'PRODUCT_SUBMITTED_FOR_MODERATION', 'Product', listing.id);
    return listing;
  }
  updateListing(id: string, patch: any, actor = 'seller@demo.com') { const updated = demoRepository.update('products', id, patch); demoRepository.audit(actor, 'PRODUCT_UPDATED', 'Product', id); return updated; }
}

export class SearchService {
  suggestions(q: string) { return searchProducts({ q }).slice(0, 5).map(p => ({ label: p.title, department: p.department, slug: p.slug })); }
  merchandisingRule(data: any) { demoRepository.audit('admin@demo.com', 'SEARCH_MERCHANDISING_RULE_SAVED', 'SearchRule', data.query || 'global'); return { id: `rule-${Date.now()}`, ...data }; }
}

export class CartService {
  summarize(items: CartItem[], coupon?: string) { return calculateCart(items, coupon); }
  validate(items: CartItem[]) { return reserveInventory(items); }
  merge(guest: CartItem[], account: CartItem[]) {
    const map = new Map<string, number>();
    [...guest, ...account].forEach(i => map.set(i.productId, (map.get(i.productId) || 0) + i.quantity));
    return Array.from(map, ([productId, quantity]) => ({ productId, quantity }));
  }
}

export class CheckoutService {
  createPaymentIntent(amount: number, currency = 'usd') { return { id: `pi_${Date.now()}`, amount, currency, status: 'requires_confirmation', clientSecret: `pi_secret_${Date.now()}` }; }
  confirmOrder(items: CartItem[], couponCode?: string) { const totals = calculateCart(items, couponCode); return { orderId: `ord-${Date.now()}`, totals, events: ['payment.confirmed', 'inventory.reserved', 'order.created', 'email.queued'] }; }
}

export class FulfillmentService {
  createShipment(orderId: string, carrier: string) { const shipment = { id: `shp-${Date.now()}`, orderId, carrier, trackingNumber: `ASTRA${Math.floor(Math.random() * 900000 + 100000)}`, status: 'LABEL_CREATED', timeline: ['Label created'] }; demoRepository.audit('seller@demo.com', 'SHIPMENT_CREATED', 'Shipment', shipment.id); return shipment; }
  tracking(id: string) { return { id, carrier: 'Astra Logistics', trackingNumber: id, status: 'IN_TRANSIT', timeline: ['Order placed', 'Payment confirmed', 'Packed', 'Shipped', 'Out for delivery'] }; }
}

export class ReturnService { request(data: any) { const ret = demoRepository.create('returns', { rma: `RMA-${Math.floor(Math.random() * 9000 + 1000)}`, status: 'REQUESTED', ...data }); demoRepository.audit('customer@demo.com', 'RETURN_REQUESTED', 'Return', ret.id); return ret; } }
export class RefundService { approve(id: string, amount: number) { demoRepository.audit('admin@demo.com', 'REFUND_APPROVED', 'Refund', id, { amount, severity: 'HIGH' }); return { id, amount, status: 'APPROVED', providerEvent: 'refund.created' }; } }
export class SellerService { orders() { return demoRepository.list('sellerOrders'); } updateOrder(id: string, patch: any) { demoRepository.audit('seller@demo.com', 'SELLER_ORDER_UPDATED', 'Order', id); return { id, ...patch }; } }
export class AdminService { action(action: string, entity: string, entityId: string, actor = 'admin@demo.com') { return demoRepository.audit(actor, action, entity, entityId); } }
export class NotificationService { send(data: any) { return demoRepository.create('notifications', { read: false, channel: 'in-app', ...data }); } }
export class AnalyticsService { event(data: any) { return { id: `evt-${Date.now()}`, receivedAt: new Date().toISOString(), ...data }; } dashboard() { return { gmv: 128400, conversion: 7.8, cartAbandonment: 68.2, supportSla: 96, refundRate: 2.4, searchConversion: 12.6 }; } }
export class AuditService { list() { return demoRepository.list('audit'); } record(actor: string, action: string, entity: string, entityId: string) { return demoRepository.audit(actor, action, entity, entityId); } }

export const services = {
  auth: new AuthService(), catalog: new CatalogService(), search: new SearchService(), cart: new CartService(), checkout: new CheckoutService(), fulfillment: new FulfillmentService(), returns: new ReturnService(), refunds: new RefundService(), seller: new SellerService(), admin: new AdminService(), notifications: new NotificationService(), analytics: new AnalyticsService(), audit: new AuditService()
};

export function requireRole(current: Role | undefined, allowed: Role[]) { return !!current && allowed.includes(current); }
