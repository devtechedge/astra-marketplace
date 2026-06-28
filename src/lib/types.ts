export type Role = 'GUEST' | 'CUSTOMER' | 'MEMBER' | 'SELLER' | 'FULFILLMENT' | 'SUPPORT' | 'MODERATOR' | 'MARKETING' | 'FINANCE' | 'ADMIN';

export type Product = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  sellerId: string;
  sellerName: string;
  category: string;
  department: string;
  price: number;
  listPrice: number;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: string;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  variants: { name: string; values: string[] }[];
  delivery: string;
  fulfillment: 'AstraFulfilled' | 'SellerFulfilled';
  questions: { q: string; a: string }[];
  reviews: { user: string; rating: number; title: string; body: string }[];
};

export type CartItem = { productId: string; quantity: number };
export type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'RETURN_REQUESTED' | 'RETURNED' | 'REFUNDED' | 'CANCELLED';

export type Order = {
  id: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  tracking?: string;
};

export type Seller = {
  id: string;
  name: string;
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  rating: number;
  payoutBalance: number;
};

export type Ticket = {
  id: string;
  subject: string;
  status: 'OPEN' | 'PENDING' | 'RESOLVED';
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  orderId?: string;
};
