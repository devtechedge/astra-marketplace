'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { searchSuggestions } from '@/lib/expansionData';

export function SearchAutocomplete() {
  const [q, setQ] = useState('');
  const suggestions = useMemo(() => {
    const term = q.toLowerCase().trim();
    return searchSuggestions.filter(s => !term || s.includes(term)).slice(0, 6);
  }, [q]);
  return (
    <form action="/search" className="relative hidden flex-1 items-center rounded-full border border-slate-300 bg-slate-50 pl-4 md:flex">
      <Search className="size-5 text-slate-500" aria-hidden />
      <input name="q" value={q} onChange={e => setQ(e.target.value)} placeholder="Search products, brands and categories" className="w-full bg-transparent px-3 py-3 outline-none" autoComplete="off" />
      <button className="rounded-full bg-coral px-6 py-3 font-semibold text-white">Search</button>
      {q && <div className="absolute left-8 right-24 top-14 z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
        <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Suggestions</p>
        {suggestions.map(s => <a key={s} href={`/search?q=${encodeURIComponent(s)}`} className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-100">{s}</a>)}
        <a href={`/search?q=${encodeURIComponent(q)}`} className="block rounded-xl px-3 py-2 text-sm font-bold text-brand hover:bg-indigo-50">Search for “{q}”</a>
      </div>}
    </form>
  );
}
