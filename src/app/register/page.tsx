export default function RegisterPage() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-md">
        <p className="page-kicker">Account</p>
        <h1 className="mt-2">Create your account</h1>
        <p className="page-lead">Registration, email verification placeholder and secure session creation.</p>
        <form className="mt-6 grid gap-4">
          <input className="field" placeholder="Full name" />
          <input className="field" placeholder="Email" />
          <input className="field" placeholder="Password" type="password" />
          <select className="field">
            <option>Customer</option>
            <option>Seller</option>
          </select>
          <button className="btn btn-solid">Create account</button>
        </form>
      </div>
    </div>
  );
}
