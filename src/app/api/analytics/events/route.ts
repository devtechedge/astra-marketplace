import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function GET() { return NextResponse.json({ dashboard: services.analytics.dashboard() }); }
export async function POST(req: Request) { return NextResponse.json({ event: services.analytics.event(await req.json()) }, { status: 201 }); }
