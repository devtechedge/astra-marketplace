export function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span aria-label={`${rating} out of 5 stars`} className="tracking-widest text-ink">
      {'★'.repeat(full)}
      <span className="text-line">{'★'.repeat(5 - full)}</span>
    </span>
  );
}
