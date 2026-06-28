import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST(req: Request) { return NextResponse.json({ rule: services.search.merchandisingRule(await req.json()) }, { status: 201 }); }
