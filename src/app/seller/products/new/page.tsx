import { ProductListingWizard } from '@/components/catalog/ProductListingWizard';

export default function NewProductPage() {
  return (
    <div>
      <p className="page-kicker">Catalog</p>
      <h1 className="mt-2">Create product listing</h1>
      <p className="page-lead">A 10-step seller listing wizard with category attributes, images, variants, inventory, pricing, shipping and compliance.</p>
      <div className="mt-10">
        <ProductListingWizard />
      </div>
    </div>
  );
}
