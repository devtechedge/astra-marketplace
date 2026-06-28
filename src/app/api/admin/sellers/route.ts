import { NextResponse } from 'next/server';
import { sellers } from '@/lib/demoData';
export async function GET() { return NextResponse.json({ sellers }); }
export async function PATCH(req: Request) { return NextResponse.json({ seller: await req.json(), audit: 'SELLER_ACTION_RECORDED' }); }
