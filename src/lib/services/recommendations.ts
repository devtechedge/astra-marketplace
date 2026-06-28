import { products } from '../demoData';

export function recentlyViewedFallback() {
  return products.slice(0, 4);
}

export function becauseYouViewed(productId?: string) {
  const base = products.find(p => p.id === productId) || products[0];
  return products.filter(p => p.department === base.department && p.id !== base.id).concat(products.filter(p => p.id !== base.id)).slice(0, 4);
}

export function buyAgainRecommendations() {
  return products.filter(p => ['p-100', 'p-104', 'p-105'].includes(p.id));
}

export function trendingProducts() {
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);
}
