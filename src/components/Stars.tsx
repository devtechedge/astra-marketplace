export function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return <span aria-label={`${rating} out of 5 stars`} className="text-amber-500">{'★'.repeat(full)}<span className="text-slate-300">{'★'.repeat(5 - full)}</span></span>;
}
