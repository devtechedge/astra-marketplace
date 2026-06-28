import { NextResponse } from 'next/server';
import { coupons } from '@/lib/demoData';
export async function GET() { return NextResponse.json({ coupons }); }
