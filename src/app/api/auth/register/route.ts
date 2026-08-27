import { NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validation';
import { enforcePublicAuthLimits } from '@/lib/security/api';

export async function POST(req: Request) {
  const limited = enforcePublicAuthLimits(req, 'register');
  if (limited) return limited;
  const parsed = registerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid registration', issues: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json({
    user: { email: parsed.data.email, name: parsed.data.name, role: 'CUSTOMER' },
    message: 'Demo account accepted. Connect Prisma adapter to persist.'
  }, { status: 201 });
}
