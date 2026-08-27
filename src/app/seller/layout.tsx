import { SellerNav } from '@/components/seller/SellerNav';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-10 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
      <SellerNav />
      <div>{children}</div>
    </div>
  );
}
