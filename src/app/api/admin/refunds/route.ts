import { NextResponse } from 'next/server';
import { returnRequests } from '@/lib/expansionData';
export async function GET() { return NextResponse.json({ refundQueue: returnRequests }); }
export async function PATCH(req: Request) { return NextResponse.json({ refund: await req.json(), audit: 'REFUND_DECISION_RECORDED' }); }
