import { NextResponse } from 'next/server';
export async function POST(req: Request) { return NextResponse.json({ review: { id: `rev-${Date.now()}`, status: 'PENDING_MODERATION', verifiedPurchase: true, ...(await req.json()) }, event: 'review.submitted' }, { status: 201 }); }
