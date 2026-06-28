import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

export async function POST(req: Request) {
  const parsed = loginSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid credentials format', issues: parsed.error.flatten() }, { status: 400 });
  const session = authenticate(parsed.data.email, parsed.data.password);
  if (!session) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  const res = NextResponse.json({ session, security: { httpOnlyCookie: true, sameSite: 'lax', csrfReady: true } });
  res.cookies.set('astra-role', session.role, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
  res.cookies.set('astra-session', session.token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
  return res;
}
