import { SellerNav } from '@/components/seller/SellerNav';
import { ProductListingWizard } from '@/components/catalog/ProductListingWizard';
export default function NewProductPage() { return <div className="container-page py-10"><SellerNav /><h1 className="text-4xl font-black">Create product listing</h1><p className="mt-2 text-slate-600">A 10-step seller listing wizard with category attributes, images, variants, inventory, pricing, shipping and compliance.</p><div className="mt-8"><ProductListingWizard /></div></div>; }
