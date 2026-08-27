import { NextResponse } from 'next/server';
import type { Role } from '@/lib/types';
import { isAllowedOrigin } from '@/lib/security/http';
import { SESSION_COOKIE, verifySession, type SessionClaims } from '@/lib/security/session';

export const ADMIN_ROLES: Role[] = ['ADMIN', 'MODERATOR', 'MARKETING', 'FINANCE', 'SUPPORT'];
export const SELLER_ROLES: Role[] = ['SELLER', 'ADMIN'];
export const CUSTOMER_ROLES: Role[] = ['CUSTOMER', 'MEMBER', 'ADMIN'];
export const ORDER_READ_ROLES: Role[] = ['CUSTOMER', 'MEMBER', 'ADMIN', 'SUPPORT'];
export const FULFILLMENT_ROLES: Role[] = ['SELLER', 'ADMIN', 'FULFILLMENT'];
export const ADS_ROLES: Role[] = ['ADMIN', 'MARKETING'];

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get('cookie');
  if (!header) return null;
  const parts = header.split(';');
  for (const part of parts) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    if (key !== name) continue;
    try {
      return decodeURIComponent(part.slice(idx + 1).trim());
    } catch {
      return part.slice(idx + 1).trim();
    }
  }
  return null;
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return 'local';
}

export function rateLimit(key: string, opts: { limit?: number; windowMs?: number } = {}): boolean {
  const limit = opts.limit ?? 10;
  const windowMs = opts.windowMs ?? 10 * 60 * 1000;
  const now = Date.now();
  const existing = rateBuckets.get(key);
  if (!existing || now >= existing.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

export function unauthorized(message = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbidden(message = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function tooManyRequests(message = 'Too many requests') {
  return NextResponse.json({ error: message }, { status: 429 });
}

export async function getSession(req: Request): Promise<SessionClaims | null> {
  return verifySession(readCookie(req, SESSION_COOKIE));
}

export function assertSameOrigin(req: Request): NextResponse | null {
  if (isAllowedOrigin(req)) return null;
  return forbidden('Origin not allowed');
}

export async function requireSession(req: Request, roles?: Role[]): Promise<{ session: SessionClaims } | NextResponse> {
  const session = await getSession(req);
  if (!session) return unauthorized();
  if (roles && roles.length > 0 && !roles.includes(session.role)) return forbidden();
  return { session };
}

export function enforcePublicAuthLimits(req: Request, bucket: string): NextResponse | null {
  const originError = assertSameOrigin(req);
  if (originError) return originError;
  if (!rateLimit(`${bucket}:${clientIp(req)}`, { limit: 10, windowMs: 10 * 60 * 1000 })) {
    return tooManyRequests();
  }
  return null;
}
