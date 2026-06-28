import { LoginClient } from '@/components/auth/LoginClient';

export default function LoginPage() {
  return <div className="container-page grid min-h-[70vh] place-items-center py-10"><div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-card"><h1 className="text-3xl font-black">Sign in to AstraMart</h1><p className="mt-2 text-slate-600">Demo authentication validates against API credentials.</p><LoginClient /><div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm"><p><strong>Customer:</strong> customer@demo.com / Demo123!</p><p><strong>Seller:</strong> seller@demo.com / Demo123!</p><p><strong>Admin:</strong> admin@demo.com / Demo123!</p></div></div></div>;
}
