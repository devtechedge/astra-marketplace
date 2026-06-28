import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST(req: Request) { return NextResponse.json({ event: services.analytics.event({ type: 'recommendation', ...(await req.json()) }) }, { status: 201 }); }
