import { NextResponse } from 'next/server';
import { products } from '@/lib/demoData';
export async function GET() { return NextResponse.json({ products }); }
export async function PATCH(req: Request) { return NextResponse.json({ product: await req.json(), audit: 'PRODUCT_MODERATION_RECORDED' }); }
