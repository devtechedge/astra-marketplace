import { NextResponse } from 'next/server';
import { products } from '@/lib/demoData';
export async function GET() { return NextResponse.json({ wishlist: products.slice(0,3).map(p => ({ productId: p.id, product: p })) }); }
export async function POST(req: Request) { const body = await req.json(); return NextResponse.json({ item: body, message: 'Wishlist item saved in demo adapter' }, { status: 201 }); }
