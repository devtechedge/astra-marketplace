import { describe, expect, it } from 'vitest';
import { assertSameOrigin, rateLimit } from '@/lib/security/api';
import { isAllowedOrigin } from '@/lib/security/http';
import { NextResponse } from 'next/server';

function makeReq(url: string, headers: Record<string, string>) {
  return new Request(url, { method: 'POST', headers });
}

describe('origin checks', () => {
  it('allows a missing Origin header', () => {
    const req = makeReq('http://localhost:3000/api/auth/login', {});
    expect(isAllowedOrigin(req)).toBe(true);
    expect(assertSameOrigin(req)).toBeNull();
  });

  it('allows Origin whose host matches the request URL host', () => {
    const req = makeReq('http://localhost:3000/api/auth/login', { origin: 'http://localhost:3000' });
    expect(isAllowedOrigin(req)).toBe(true);
    expect(assertSameOrigin(req)).toBeNull();
  });

  it('rejects a cross-site Origin', () => {
    const req = makeReq('http://localhost:3000/api/auth/login', { origin: 'https://evil.example' });
    expect(isAllowedOrigin(req)).toBe(false);
    const denied = assertSameOrigin(req);
    expect(denied).toBeInstanceOf(NextResponse);
    expect(denied?.status).toBe(403);
  });
});

describe('rateLimit', () => {
  it('allows up to the limit then blocks', () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    for (let i = 0; i < 10; i++) expect(rateLimit(key, { limit: 10, windowMs: 60_000 })).toBe(true);
    expect(rateLimit(key, { limit: 10, windowMs: 60_000 })).toBe(false);
  });

  it('resets after the window', () => {
    const key = `test-window-${Date.now()}-${Math.random()}`;
    expect(rateLimit(key, { limit: 1, windowMs: 1 })).toBe(true);
    expect(rateLimit(key, { limit: 1, windowMs: 1 })).toBe(false);
  });
});
