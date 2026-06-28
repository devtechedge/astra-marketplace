import { NextRequest, NextResponse } from 'next/server';
import { securityHeaders } from './src/lib/security/http';

const protectedPrefixes = [
  { prefix: '/admin', roles: ['ADMIN', 'MODERATOR', 'MARKETING', 'FINANCE', 'SUPPORT'] },
  { prefix: '/seller', roles: ['SELLER', 'ADMIN'] },
  { prefix: '/checkout', roles: ['CUSTOMER', 'MEMBER', 'ADMIN'] }
];

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  Object.entries(securityHeaders).forEach(([key, value]) => res.headers.set(key, value));
  const role = req.cookies.get('astra-role')?.value || 'CUSTOMER';
  const match = protectedPrefixes.find(item => req.nextUrl.pathname.startsWith(item.prefix));
  if (match && !match.roles.includes(role)) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
