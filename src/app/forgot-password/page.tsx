export default function ForgotPasswordPage() {
  return (
    <div className="container-page grid min-h-[65vh] place-items-center py-16">
      <div className="w-full max-w-md">
        <p className="page-kicker">Account</p>
        <h1 className="mt-2">Forgot password</h1>
        <p className="page-lead">Request a reset email using the auth service abstraction.</p>
        <input className="field mt-6" placeholder="Email address" />
        <button className="btn btn-solid mt-4 w-full">Send reset link</button>
      </div>
    </div>
  );
}
