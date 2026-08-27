import { DashboardCard } from '@/components/DashboardCard';

export default function AdminAnalyticsPage() {
  return (
    <div>
      <p className="page-kicker">Insights</p>
      <h1 className="mt-2">Marketplace analytics</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <DashboardCard title="Conversion" value="7.8%" note="Search-to-order funnel" />
        <DashboardCard title="AOV" value="$86.42" note="Average order value" />
        <DashboardCard title="Search CTR" value="31%" note="Suggestion engagement" />
        <DashboardCard title="Return rate" value="2.4%" note="Post-order quality" />
      </div>
      <section className="mt-10">
        <h2>Search trends</h2>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {['headphones', 'air fryer', 'running shoes', 'gift cards', '4k camera'].map((q, i) => (
            <div key={q} className="flex justify-between py-3 text-sm">
              <p>{q}</p>
              <p className="tabular-nums text-muted">{1200 - i * 140} searches</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
