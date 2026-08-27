import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-10 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
      <AdminNav />
      <div>{children}</div>
    </div>
  );
}
