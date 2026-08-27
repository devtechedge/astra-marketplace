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
  const isPrimary = label === 'Add to cart';
  return (
    <button
      type="button"
      data-testid={isPrimary ? 'add-to-cart' : undefined}
      onClick={add}
      className={`focus-ring w-full ${isPrimary ? 'btn btn-solid' : 'btn btn-ghost'}`}
    >
      {added ? 'Added' : label}
    </button>
  );
}
