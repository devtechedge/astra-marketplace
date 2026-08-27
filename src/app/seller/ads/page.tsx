import { SponsoredCampaignCard } from '@/components/ads/SponsoredCampaignCard';

export default function SellerAdsPage() {
  return (
    <div>
      <p className="page-kicker">Retail media</p>
      <h1 className="mt-2">Sponsored campaigns</h1>
      <p className="page-lead">Keyword targeting, budgets, impressions, clicks and spend reporting.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <SponsoredCampaignCard name="Headphones keyword campaign" budget={300} spend={121} status="Live" />
        <SponsoredCampaignCard name="Camera bundle boost" budget={180} spend={44} status="Learning" />
        <SponsoredCampaignCard name="Retarget cart abandoners" budget={250} spend={200} status="Live" />
      </div>
    </div>
  );
}
