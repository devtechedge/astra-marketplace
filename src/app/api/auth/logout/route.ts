import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
import { sessionCookieOptions, SESSION_COOKIE } from '@/lib/security/session';

export async function POST() {
  const res = NextResponse.json(services.auth.logout());
  res.cookies.set(SESSION_COOKIE, '', { ...sessionCookieOptions(), maxAge: 0 });
  res.cookies.set('astra-role', '', { ...sessionCookieOptions(), maxAge: 0 });
  return res;
}
