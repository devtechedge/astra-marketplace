import { NextResponse } from 'next/server';
export async function POST(req: Request) { return NextResponse.json({ question: { id: `qa-${Date.now()}`, status: 'OPEN', ...(await req.json()) }, event: 'question.created' }, { status: 201 }); }
