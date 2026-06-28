import { NextResponse } from 'next/server';
import { returnRequests } from '@/lib/expansionData';
export async function GET() { return NextResponse.json({ returns: returnRequests }); }
export async function POST(req: Request) { const body = await req.json(); return NextResponse.json({ returnRequest: { id: `ret-${Date.now()}`, rma: `RMA-${Math.floor(Math.random()*9000+1000)}`, status: 'REQUESTED', ...body }, events: ['return.requested', 'notification.queued', 'audit.created'] }, { status: 201 }); }
