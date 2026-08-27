export default function AdminSearchMerchandisingPage() {
  return (
    <div>
      <p className="page-kicker">Search</p>
      <h1 className="mt-2">Merchandising rules</h1>
      <p className="page-lead">Pin, boost, hide and banner search results by query or campaign.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form>
          <h2>Create rule</h2>
          <input className="field mt-4" placeholder="Query e.g. headphones" />
          <select className="field mt-4">
            <option>Pin product</option>
            <option>Boost brand</option>
            <option>Hide product</option>
            <option>Show search banner</option>
          </select>
          <button className="btn btn-solid mt-4">Save rule</button>
        </form>
        <section>
          <h2>Active rules</h2>
          {['headphones → pin Nova X7', 'beauty → show clean skincare banner', 'gift → boost gift cards'].map(r => (
            <p key={r} className="mt-3 border-b border-line py-3 text-sm">{r}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
