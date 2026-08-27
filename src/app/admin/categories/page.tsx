const cats = [
  { name: 'Electronics', attrs: ['Battery', 'Connectivity', 'Warranty'] },
  { name: 'Fashion', attrs: ['Size', 'Color', 'Fabric'] },
  { name: 'Books', attrs: ['Author', 'ISBN', 'Publisher'] },
  { name: 'Beauty', attrs: ['Ingredients', 'Skin type', 'Warnings'] }
];

export default function AdminCategoriesPage() {
  return (
    <div>
      <p className="page-kicker">Taxonomy</p>
      <h1 className="mt-2">Category builder</h1>
      <p className="page-lead">Create taxonomy rules that drive seller listing forms and faceted search.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {cats.map(c => (
          <div key={c.name} className="border-t border-line pt-4">
            <h2 className="text-lg">{c.name}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.attrs.map(a => <span key={a} className="chip">{a}</span>)}
            </div>
            <button className="btn-quiet mt-4 text-sm">Edit attributes</button>
          </div>
        ))}
      </div>
    </div>
  );
}
