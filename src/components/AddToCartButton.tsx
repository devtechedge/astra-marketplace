'use client';

import { useState } from 'react';

export function AddToCartButton({ productId, label = 'Add to cart' }: { productId: string; label?: string }) {
  const [added, setAdded] = useState(false);
  function add() {
    const cart = JSON.parse(localStorage.getItem('astra-cart') || '[]') as { productId: string; quantity: number }[];
    const existing = cart.find(i => i.productId === productId);
    if (existing) existing.quantity += 1; else cart.push({ productId, quantity: 1 });
    localStorage.setItem('astra-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('astra-cart-updated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }
  return <button onClick={add} className="focus-ring rounded-full bg-coral px-6 py-3 font-bold text-white shadow-card hover:bg-orange-600">{added ? 'Added ✓' : label}</button>;
}
