export default function SupportPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Support</p>
      <h1 className="mt-2">Open a support ticket</h1>
      <form className="mt-10 max-w-xl space-y-4">
        <label className="label">Subject
          <input className="field" placeholder="How can we help?" />
        </label>
        <label className="label">Order ID
          <input className="field" placeholder="Optional" />
        </label>
        <label className="label">Details
          <textarea className="field min-h-36" placeholder="Describe the issue" />
        </label>
        <button className="btn btn-solid">Submit ticket</button>
      </form>
    </div>
  );
}
