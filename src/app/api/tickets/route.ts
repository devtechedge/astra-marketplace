import { NextResponse } from 'next/server';
import { tickets } from '@/lib/demoData';
import { ticketSchema } from '@/lib/validation';

export async function GET() { return NextResponse.json({ tickets }); }
export async function POST(req: Request) {
  const parsed = ticketSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid ticket', issues: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json({ ticket: { id: `tic-${Date.now()}`, status: 'OPEN', priority: 'NORMAL', ...parsed.data } }, { status: 201 });
}
