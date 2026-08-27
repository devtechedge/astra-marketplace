import { NextRequest, NextResponse } from 'next/server';
import { applySecurityHeaders, isAllowedOrigin, securityHeaders } from './src/lib/security/http';
import { SESSION_COOKIE, verifySession } from './src/lib/security/session';

const protectedPrefixes = [
  { prefix: '/admin', roles: ['ADMIN', 'MODERATOR', 'MARKETING', 'FINANCE', 'SUPPORT'] },
  { prefix: '/seller', roles: ['SELLER', 'ADMIN'] },
  { prefix: '/checkout', roles: ['CUSTOMER', 'MEMBER', 'ADMIN'] },
  { prefix: '/account', roles: ['CUSTOMER', 'MEMBER', 'ADMIN'] },
  { prefix: '/orders', roles: ['CUSTOMER', 'MEMBER', 'ADMIN'] }
];

function withHeaders(res: NextResponse) {
  applySecurityHeaders(res.headers);
  res.cookies.set('astra-role', '', { path: '/', maxAge: 0 });
  return res;
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const method = req.method.toUpperCase();

  if (
    ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) &&
    pathname.startsWith('/api') &&
    !pathname.startsWith('/api/payments/webhook') &&
    !isAllowedOrigin(req)
  ) {
    const denied = NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
    Object.entries(securityHeaders).forEach(([key, value]) => denied.headers.set(key, value));
    return denied;
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;
  const role = session?.role;
  const match = protectedPrefixes.find(item => pathname === item.prefix || pathname.startsWith(`${item.prefix}/`));
  if (match && (!role || !match.roles.includes(role))) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return withHeaders(NextResponse.redirect(url));
  }

  return withHeaders(NextResponse.next());
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
