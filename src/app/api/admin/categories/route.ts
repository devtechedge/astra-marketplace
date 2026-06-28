import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ categories: [{ name: 'Electronics', attributes: ['Battery', 'Connectivity', 'Warranty'] }, { name: 'Fashion', attributes: ['Size', 'Color', 'Fabric'] }] }); }
export async function POST(req: Request) { return NextResponse.json({ category: { id: `cat-${Date.now()}`, ...(await req.json()) }, audit: 'CATEGORY_CREATED' }, { status: 201 }); }
