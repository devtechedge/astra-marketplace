import { NextResponse } from 'next/server';
const campaigns = [{ id: 'ad-1', name: 'Nova X7 Launch', budget: 1200, spend: 460, status: 'APPROVED' }];
export async function GET() { return NextResponse.json({ campaigns }); }
export async function POST(req: Request) { return NextResponse.json({ campaign: { id: `ad-${Date.now()}`, status: 'PENDING_REVIEW', ...(await req.json()) } }, { status: 201 }); }
