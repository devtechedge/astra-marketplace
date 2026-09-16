import { describe, expect, it } from 'vitest';
import { signSession, verifySession } from '@/lib/security/session';

describe('HMAC session', () => {
  it('signs then verifies email and role', async () => {
    const token = await signSession({ email: 'customer@demo.com', role: 'CUSTOMER' });
    const claims = await verifySession(token);
    expect(claims?.email).toBe('customer@demo.com');
    expect(claims?.role).toBe('CUSTOMER');
    expect(claims?.exp).toBeGreaterThan(Date.now());
  });

  it('rejects a tampered token', async () => {
    const token = await signSession({ email: 'customer@demo.com', role: 'CUSTOMER' });
    const [body, mac] = token.split('.');
    const tamperedJson = Buffer.from(JSON.stringify({ email: 'admin@demo.com', role: 'ADMIN', exp: Date.now() + 60_000 })).toString('base64url');
    expect(await verifySession(`${tamperedJson}.${mac}`)).toBeNull();
    // Flip the FIRST character, not the last. The trailing base64url character
    // carries padding bits, so mutating it can decode to identical bytes and the
    // "tampered" token still verifies. Every bit of the first character counts.
    const flipped = (mac[0] === 'A' ? 'Q' : 'A') + mac.slice(1);
    expect(await verifySession(`${body}.${flipped}`)).toBeNull();
  });

  it('rejects an expired token', async () => {
    const token = await signSession({ email: 'seller@demo.com', role: 'SELLER' }, { expMs: Date.now() - 1000 });
    expect(await verifySession(token)).toBeNull();
  });

  it('rejects a token signed with a different secret', async () => {
    const token = await signSession({ email: 'admin@demo.com', role: 'ADMIN' }, { secret: 'other-secret-not-the-app-secret' });
    expect(await verifySession(token)).toBeNull();
    expect(await verifySession(token, 'other-secret-not-the-app-secret')).not.toBeNull();
  });

  it('rejects missing or malformed tokens', async () => {
    expect(await verifySession(undefined)).toBeNull();
    expect(await verifySession('')).toBeNull();
    expect(await verifySession('not-a-token')).toBeNull();
  });
});
