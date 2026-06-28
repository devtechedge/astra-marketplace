import { NextResponse } from 'next/server';
import { products } from '@/lib/demoData';
export async function GET() { return NextResponse.json({ products }); }
export async function POST(req: Request) { return NextResponse.json({ product: { id: `p-${Date.now()}`, moderationStatus: 'PENDING', ...(await req.json()) } }, { status: 201 }); }
