import { formatMoney } from '@/lib/commerce';

export default function SellerPayoutsPage() {
  const rows = [['Order settlement', '+149.99'], ['Referral fee', '-12.00'], ['Fulfillment fee', '-5.40'], ['Refund reserve', '-18.99']];
  return (
    <div>
      <p className="page-kicker">Finance</p>
      <h1 className="mt-2">Payout ledger</h1>
      <p className="page-kicker mt-10">Next payout</p>
      <p className="mt-2 font-display text-4xl tabular-nums">{formatMoney(12450.77)}</p>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {rows.map(([a, b]) => (
          <div key={a} className="flex justify-between py-3 text-sm">
            <span>{a}</span>
            <strong className="tabular-nums">{b}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
