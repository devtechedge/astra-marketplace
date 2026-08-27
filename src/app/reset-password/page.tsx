export default function ResetPasswordPage() {
  return (
    <div className="container-page grid min-h-[65vh] place-items-center py-16">
      <div className="w-full max-w-md">
        <p className="page-kicker">Account</p>
        <h1 className="mt-2">Reset password</h1>
        <p className="page-lead">Token validation and password update workflow placeholder.</p>
        <input className="field mt-6" placeholder="Reset token" />
        <input className="field mt-4" placeholder="New password" type="password" />
        <button className="btn btn-solid mt-4 w-full">Reset password</button>
      </div>
    </div>
  );
}
