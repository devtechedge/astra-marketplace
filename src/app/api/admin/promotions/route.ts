import { NextResponse } from 'next/server';
import { coupons } from '@/lib/demoData';
export async function GET() { return NextResponse.json({ promotions: coupons }); }
export async function POST(req: Request) { return NextResponse.json({ promotion: { id: `promo-${Date.now()}`, ...(await req.json()) }, audit: 'PROMOTION_CREATED' }, { status: 201 }); }
