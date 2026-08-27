'use client';

import { useEffect, useState } from 'react';

export function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const read = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('astra-cart') || '[]') as { quantity: number }[];
        setCount(cart.reduce((sum, item) => sum + (item.quantity || 0), 0));
      } catch {
        setCount(0);
      }
    };
    read();
    window.addEventListener('storage', read);
    window.addEventListener('astra-cart-updated', read);
    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('astra-cart-updated', read);
    };
  }, []);

  if (!count) return null;
  return <span className="ml-1 tabular-nums text-copper">({count})</span>;
}
