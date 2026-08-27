import type { Role } from '../types';

export const SESSION_COOKIE = 'astra-session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
const DEFAULT_SECRET = 'astra-demo-hmac-not-for-production';
const VALID_ROLES: Role[] = [
  'GUEST', 'CUSTOMER', 'MEMBER', 'SELLER', 'FULFILLMENT', 'SUPPORT', 'MODERATOR', 'MARKETING', 'FINANCE', 'ADMIN'
];

export type SessionClaims = { email: string; role: Role; exp: number };

function sessionSecret(override?: string) {
  return override || process.env.APP_SECRET || DEFAULT_SECRET;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(value: string): Uint8Array | null {
  try {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

function encodeUtf8(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function decodeUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

function encodeBase64UrlText(text: string): string {
  return bytesToBase64Url(encodeUtf8(text));
}

function decodeBase64UrlText(value: string): string | null {
  const bytes = base64UrlToBytes(value);
  if (!bytes) return null;
  try {
    return decodeUtf8(bytes);
  } catch {
    return null;
  }
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

async function hmacSha256(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    encodeUtf8(secret) as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encodeUtf8(data) as BufferSource);
  return new Uint8Array(sig);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  };
}

export async function signSession(
  input: { email: string; role: Role },
  options?: { expMs?: number; secret?: string }
): Promise<string> {
  const payload: SessionClaims = {
    email: input.email,
    role: input.role,
    exp: options?.expMs ?? Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  };
  const body = encodeBase64UrlText(JSON.stringify(payload));
  const mac = await hmacSha256(sessionSecret(options?.secret), body);
  return `${body}.${bytesToBase64Url(mac)}`;
}

export async function verifySession(token: string | undefined | null, secret?: string): Promise<SessionClaims | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const [body, macPart] = parts;
  const given = base64UrlToBytes(macPart);
  if (!given) return null;
  const expected = await hmacSha256(sessionSecret(secret), body);
  if (!timingSafeEqual(given, expected)) return null;
  const json = decodeBase64UrlText(body);
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as Partial<SessionClaims>;
    if (typeof parsed.email !== 'string' || !parsed.email) return null;
    if (typeof parsed.role !== 'string' || !VALID_ROLES.includes(parsed.role as Role)) return null;
    if (typeof parsed.exp !== 'number' || !Number.isFinite(parsed.exp)) return null;
    if (parsed.exp <= Date.now()) return null;
    return { email: parsed.email, role: parsed.role as Role, exp: parsed.exp };
  } catch {
    return null;
  }
}
