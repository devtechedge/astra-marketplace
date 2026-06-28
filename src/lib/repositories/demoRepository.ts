import { products, orders, sellers, tickets, coupons } from '@/lib/demoData';
import { auditEvents, customers, featureFlags, homepageModules, notifications, returnRequests, sellerOrders } from '@/lib/expansionData';

export type DemoEntity = 'products' | 'orders' | 'sellers' | 'tickets' | 'coupons' | 'customers' | 'audit' | 'flags' | 'cms' | 'notifications' | 'returns' | 'sellerOrders';

const store: Record<DemoEntity, any[]> = {
  products: [...products],
  orders: [...orders],
  sellers: [...sellers],
  tickets: [...tickets],
  coupons: [...coupons],
  customers: [...customers],
  audit: [...auditEvents],
  flags: [...featureFlags],
  cms: [...homepageModules],
  notifications: [...notifications],
  returns: [...returnRequests],
  sellerOrders: [...sellerOrders]
};

export const demoRepository = {
  list<T = any>(entity: DemoEntity): T[] { return store[entity] as T[]; },
  get<T = any>(entity: DemoEntity, id: string): T | undefined { return store[entity].find((item: any) => item.id === id || item.slug === id || item.key === id); },
  create<T = any>(entity: DemoEntity, data: Record<string, any>): T {
    const item = { id: data.id || `${entity}-${Date.now()}`, createdAt: new Date().toISOString(), ...data };
    store[entity].unshift(item);
    return item as T;
  },
  update<T = any>(entity: DemoEntity, id: string, patch: Record<string, any>): T | undefined {
    const index = store[entity].findIndex((item: any) => item.id === id || item.slug === id || item.key === id);
    if (index === -1) return undefined;
    store[entity][index] = { ...store[entity][index], ...patch, updatedAt: new Date().toISOString() };
    return store[entity][index] as T;
  },
  audit(actor: string, action: string, entity: string, entityId: string, metadata: Record<string, any> = {}) {
    return this.create('audit', { actor, action, entity, entityId, severity: metadata.severity || 'NORMAL', metadata });
  }
};
