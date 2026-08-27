import { LoginClient } from '@/components/auth/LoginClient';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div data-testid="login-page" className="container-page grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-md">
        <p className="page-kicker">Account</p>
        <h1 className="mt-2">Sign in</h1>
        <p className="page-lead">Demo authentication validates against API credentials.</p>
        <LoginClient />
        <div className="mt-6 border border-line bg-surface p-4 text-sm">
          <p><strong>Customer:</strong> customer@demo.com / Demo123!</p>
          <p><strong>Seller:</strong> seller@demo.com / Demo123!</p>
          <p><strong>Admin:</strong> admin@demo.com / Demo123!</p>
        </div>
        <p className="mt-4 text-sm text-muted">
          <Link href="/forgot-password" className="btn-quiet">Forgot password</Link>
          <span className="mx-2">·</span>
          <Link href="/register" className="btn-quiet">Create account</Link>
        </p>
      </div>
    </div>
  );
}
