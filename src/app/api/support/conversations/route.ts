import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ conversation: [{ from: 'Customer', body: 'Need help with delivery.' }, { from: 'Agent', body: 'I can help with that order.' }] }); }
export async function POST(req: Request) { return NextResponse.json({ message: { id: `msg-${Date.now()}`, ...(await req.json()) }, event: 'ticket.message.created' }, { status: 201 }); }
