export const securityHeaders: Record<string, string> = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(self)',
  'content-security-policy': "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self';"
};

export function apiError(code: string, message: string, status = 400, details?: unknown) {
  return { error: { code, message, status, details, requestId: `req-${Date.now()}` } };
}

export function requestHost(req: Request): string {
  return req.headers.get('host') || new URL(req.url).host;
}

export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const host = requestHost(req);
  if (originHost === host) return true;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) return false;
  try {
    return originHost === new URL(appUrl).host;
  } catch {
    return false;
  }
}

export function applySecurityHeaders(headers: Headers) {
  Object.entries(securityHeaders).forEach(([key, value]) => headers.set(key, value));
}
