import { NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validation';

export async function POST(req: Request) {
  const parsed = registerSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid registration', issues: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json({ user: { email: parsed.data.email, name: parsed.data.name, role: parsed.data.role }, message: 'Demo account accepted. Connect Prisma adapter to persist.' }, { status: 201 });
}
