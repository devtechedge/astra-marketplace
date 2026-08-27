import { SponsoredCampaignCard } from '@/components/ads/SponsoredCampaignCard';

export default function AdminAdsPage() {
  return (
    <div>
      <p className="page-kicker">Retail media</p>
      <h1 className="mt-2">Campaign moderation</h1>
      <p className="page-lead">Sponsored products, keyword targeting, budget controls and disclosure review.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <SponsoredCampaignCard name="Nova X7 Launch" budget={1200} spend={460} status="Approved" />
        <SponsoredCampaignCard name="Kitchen Week" budget={900} spend={820} status="Review" />
        <SponsoredCampaignCard name="Skincare Starter" budget={500} spend={120} status="Paused" />
      </div>
    </div>
  );
}
