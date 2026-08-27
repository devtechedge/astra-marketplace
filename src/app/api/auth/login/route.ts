import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';
import { enforcePublicAuthLimits } from '@/lib/security/api';
import { sessionCookieOptions, signSession, SESSION_COOKIE } from '@/lib/security/session';

export async function POST(req: Request) {
  const limited = enforcePublicAuthLimits(req, 'login');
  if (limited) return limited;
  const parsed = loginSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid credentials format', issues: parsed.error.flatten() }, { status: 400 });
  const session = await authenticate(parsed.data.email, parsed.data.password);
  if (!session) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  const token = await signSession({ email: session.email, role: session.role });
  const res = NextResponse.json({ email: session.email, role: session.role });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  res.cookies.set('astra-role', '', { ...sessionCookieOptions(), maxAge: 0 });
  return res;
}
