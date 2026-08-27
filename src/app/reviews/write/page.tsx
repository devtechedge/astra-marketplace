export default function WriteReviewPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Reviews</p>
      <h1 className="mt-2">Write a review</h1>
      <form className="mt-10 max-w-xl space-y-4">
        <label className="label">Rating
          <select className="field">
            <option>5 stars</option>
            <option>4 stars</option>
            <option>3 stars</option>
          </select>
        </label>
        <label className="label">Title
          <input className="field" />
        </label>
        <label className="label">Review
          <textarea className="field min-h-36" />
        </label>
        <div className="border border-dashed border-line p-6 text-center text-sm text-muted">Upload review images/videos placeholder</div>
        <button className="btn btn-solid">Submit review for moderation</button>
      </form>
    </div>
  );
}
