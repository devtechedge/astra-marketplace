'use client';

import { useMemo, useState } from 'react';
import { searchSuggestions } from '@/lib/expansionData';

export function SearchAutocomplete() {
  const [q, setQ] = useState('');
  const suggestions = useMemo(() => {
    const term = q.toLowerCase().trim();
    return searchSuggestions.filter(s => !term || s.includes(term)).slice(0, 6);
  }, [q]);
  return (
    <form action="/search" className="relative flex w-full items-center border border-line bg-paper">
      <label className="sr-only" htmlFor="site-search">Search</label>
      <input
        id="site-search"
        name="q"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search the shop"
        className="w-full bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted"
        autoComplete="off"
      />
      <button type="submit" className="btn-quiet mr-4 text-[13px]">Search</button>
      {q && (
        <div className="absolute left-0 right-0 top-full z-50 border border-t-0 border-line bg-surface py-2">
          <p className="px-4 pb-1 text-[11px] uppercase tracking-[0.14em] text-muted">Suggestions</p>
          {suggestions.map(s => (
            <a key={s} href={`/search?q=${encodeURIComponent(s)}`} className="block px-4 py-2 text-sm hover:bg-paper">
              {s}
            </a>
          ))}
          <a href={`/search?q=${encodeURIComponent(q)}`} className="block px-4 py-2 text-sm text-muted hover:bg-paper hover:text-ink">
            Search for “{q}”
          </a>
        </div>
      )}
    </form>
  );
}
