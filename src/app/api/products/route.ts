import { NextResponse } from 'next/server';
import { searchProducts } from '@/lib/commerce';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const products = searchProducts({ q: url.searchParams.get('q') || undefined, department: url.searchParams.get('department') || undefined, sort: url.searchParams.get('sort') || undefined });
  return NextResponse.json({ products, count: products.length });
}
