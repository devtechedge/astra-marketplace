import type { Order, Product, Seller, Ticket } from './types';

export const categories = [
  'Electronics', 'Home & Kitchen', 'Fashion', 'Books', 'Beauty', 'Sports', 'Toys', 'Grocery', 'Automotive', 'Pet Supplies'
];

export const sellers: Seller[] = [
  { id: 'sel-1', name: 'Northstar Electronics', status: 'APPROVED', rating: 4.8, payoutBalance: 12450.77 },
  { id: 'sel-2', name: 'Urban Nest Goods', status: 'APPROVED', rating: 4.6, payoutBalance: 8120.30 },
  { id: 'sel-3', name: 'PageTurner Press', status: 'PENDING', rating: 4.5, payoutBalance: 2380.0 }
];

const svg = (label: string, color = '3957ff') => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700"><rect width="100%" height="100%" rx="36" fill="#${color}"/><circle cx="720" cy="150" r="130" fill="rgba(255,255,255,.20)"/><circle cx="130" cy="570" r="170" fill="rgba(255,255,255,.14)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="52" font-weight="700" fill="white">${label}</text></svg>`)}`;

export const products: Product[] = [
  {
    id: 'p-100', slug: 'nova-noise-canceling-headphones', title: 'Nova X7 Wireless Noise-Canceling Headphones', brand: 'NovaSound', sellerId: 'sel-1', sellerName: 'Northstar Electronics', category: 'Headphones', department: 'Electronics', price: 149.99, listPrice: 219.99, rating: 4.7, reviewCount: 2438, stock: 42, badge: 'Deal of the Day', image: svg('Nova X7', '3957ff'), images: [svg('Nova X7', '3957ff'), svg('40h Battery', '18b892'), svg('ANC', 'ff6b4a')], description: 'Premium wireless headphones with adaptive noise cancellation, low-latency mode, spatial audio profile and all-day comfort.', specs: { Battery: '40 hours', Connectivity: 'Bluetooth 5.3', Weight: '245g', Warranty: '2 years' }, variants: [{ name: 'Color', values: ['Midnight', 'Pearl', 'Cobalt'] }], delivery: 'Free tomorrow delivery for AstraPlus members', fulfillment: 'AstraFulfilled', questions: [{ q: 'Does it support multipoint?', a: 'Yes, two devices simultaneously.' }], reviews: [{ user: 'Maya', rating: 5, title: 'Excellent sound', body: 'ANC and battery life are fantastic.' }]
  },
  {
    id: 'p-101', slug: 'terra-smart-air-fryer', title: 'TerraChef 8L Smart Air Fryer with Dual Zone Basket', brand: 'TerraChef', sellerId: 'sel-2', sellerName: 'Urban Nest Goods', category: 'Kitchen Appliances', department: 'Home & Kitchen', price: 119.0, listPrice: 169.0, rating: 4.5, reviewCount: 986, stock: 28, badge: 'Kitchen Favorite', image: svg('Air Fryer', '18b892'), images: [svg('Air Fryer', '18b892'), svg('Dual Zone', '3957ff')], description: 'Cook crispy meals faster with synchronized dual-zone baskets, preset programs and dishwasher-safe accessories.', specs: { Capacity: '8L', Power: '1700W', Presets: '12', Material: 'BPA-free' }, variants: [{ name: 'Size', values: ['6L', '8L'] }], delivery: 'Arrives in 2 days', fulfillment: 'AstraFulfilled', questions: [{ q: 'Is the basket dishwasher safe?', a: 'Yes.' }], reviews: [{ user: 'Arjun', rating: 4, title: 'Useful daily', body: 'Great capacity for a family.' }]
  },
  {
    id: 'p-102', slug: 'orbit-4k-action-camera', title: 'OrbitCam 4K Waterproof Action Camera Bundle', brand: 'OrbitCam', sellerId: 'sel-1', sellerName: 'Northstar Electronics', category: 'Cameras', department: 'Electronics', price: 89.99, listPrice: 139.99, rating: 4.3, reviewCount: 721, stock: 67, badge: 'Bundle', image: svg('4K Camera', 'ff6b4a'), images: [svg('4K Camera', 'ff6b4a'), svg('Waterproof', '18b892')], description: 'Waterproof 4K action camera with stabilization, mounts, spare battery and travel case.', specs: { Resolution: '4K/60', Waterproof: '30m', Battery: '2 included', Storage: 'microSD' }, variants: [{ name: 'Bundle', values: ['Standard', 'Travel', 'Creator'] }], delivery: 'Free standard delivery', fulfillment: 'SellerFulfilled', questions: [{ q: 'Does it include a chest mount?', a: 'The Travel bundle does.' }], reviews: [{ user: 'Lena', rating: 4, title: 'Good value', body: 'Great for biking videos.' }]
  },
  {
    id: 'p-103', slug: 'aero-knit-running-shoes', title: 'AeroKnit Lightweight Running Shoes', brand: 'AeroKnit', sellerId: 'sel-2', sellerName: 'Urban Nest Goods', category: 'Shoes', department: 'Fashion', price: 64.5, listPrice: 95.0, rating: 4.4, reviewCount: 1305, stock: 95, badge: 'Top Rated', image: svg('AeroKnit', '101828'), images: [svg('AeroKnit', '101828'), svg('Foam Sole', '3957ff')], description: 'Breathable running shoes with responsive foam, grippy outsole and everyday comfort.', specs: { Upper: 'Engineered knit', Sole: 'EVA foam', Drop: '8mm', Use: 'Road running' }, variants: [{ name: 'Size', values: ['7', '8', '9', '10', '11'] }, { name: 'Color', values: ['Black', 'Blue', 'White'] }], delivery: 'Arrives tomorrow', fulfillment: 'AstraFulfilled', questions: [{ q: 'True to size?', a: 'Most customers say yes.' }], reviews: [{ user: 'Noah', rating: 5, title: 'Comfortable', body: 'Very light for daily runs.' }]
  },
  {
    id: 'p-104', slug: 'deep-work-design-book', title: 'Designing Deep Work Systems', brand: 'PageTurner', sellerId: 'sel-3', sellerName: 'PageTurner Press', category: 'Productivity', department: 'Books', price: 18.99, listPrice: 24.99, rating: 4.8, reviewCount: 412, stock: 120, badge: 'Editor Pick', image: svg('Deep Work', '7c3aed'), images: [svg('Deep Work', '7c3aed')], description: 'A practical guide to focus rituals, team cadences, automation and sustainable productivity.', specs: { Pages: '312', Format: 'Paperback', Language: 'English', ISBN: '978-0-0000-0000-1' }, variants: [{ name: 'Format', values: ['Paperback', 'Kindle-like eBook', 'Hardcover'] }], delivery: 'Instant digital option available', fulfillment: 'AstraFulfilled', questions: [{ q: 'Is there an audiobook?', a: 'Coming soon.' }], reviews: [{ user: 'Isha', rating: 5, title: 'Actionable', body: 'Useful systems without fluff.' }]
  },
  {
    id: 'p-105', slug: 'luma-skincare-starter-kit', title: 'LumaGlow Clean Skincare Starter Kit', brand: 'LumaGlow', sellerId: 'sel-2', sellerName: 'Urban Nest Goods', category: 'Skincare', department: 'Beauty', price: 39.99, listPrice: 59.99, rating: 4.2, reviewCount: 654, stock: 54, badge: 'Coupon Available', image: svg('LumaGlow', 'ec4899'), images: [svg('LumaGlow', 'ec4899'), svg('Clean Kit', '18b892')], description: 'Gentle cleanser, serum and moisturizer set with travel pouch. Fragrance-free and dermatologist tested.', specs: { Includes: '3 items', Skin: 'All skin types', Fragrance: 'Free', Cruelty: 'No animal testing' }, variants: [{ name: 'Pack', values: ['Starter', 'Full Routine'] }], delivery: 'Arrives in 2 days', fulfillment: 'AstraFulfilled', questions: [{ q: 'For sensitive skin?', a: 'Yes, patch test recommended.' }], reviews: [{ user: 'Sara', rating: 4, title: 'Gentle', body: 'Good starter kit.' }]
  }
];

export const coupons = [
  { code: 'WELCOME10', type: 'percent', value: 10, minSubtotal: 30, description: '10% off orders over $30' },
  { code: 'ASTRAPLUS', type: 'shipping', value: 0, minSubtotal: 0, description: 'Free shipping preview' },
  { code: 'DEAL25', type: 'fixed', value: 25, minSubtotal: 150, description: '$25 off orders over $150' }
];

export const orders: Order[] = [
  { id: 'ord-9001', customerEmail: 'customer@demo.com', items: [{ productId: 'p-100', quantity: 1 }], subtotal: 149.99, shipping: 0, tax: 12.37, discount: 15, total: 147.36, status: 'SHIPPED', createdAt: '2026-06-24T10:00:00Z', tracking: 'ASTRA784512' },
  { id: 'ord-9002', customerEmail: 'customer@demo.com', items: [{ productId: 'p-104', quantity: 2 }], subtotal: 37.98, shipping: 4.99, tax: 3.13, discount: 0, total: 46.10, status: 'DELIVERED', createdAt: '2026-06-19T12:30:00Z', tracking: 'ASTRA762200' }
];

export const tickets: Ticket[] = [
  { id: 'tic-101', subject: 'Change delivery address', status: 'OPEN', priority: 'NORMAL', orderId: 'ord-9001' },
  { id: 'tic-102', subject: 'Return request for shoes', status: 'PENDING', priority: 'HIGH' }
];

export const demoUsers = [
  { email: 'customer@demo.com', password: 'Demo123!', role: 'CUSTOMER' },
  { email: 'seller@demo.com', password: 'Demo123!', role: 'SELLER' },
  { email: 'admin@demo.com', password: 'Demo123!', role: 'ADMIN' }
];
