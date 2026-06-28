import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ ok: true, service: 'AstraMart', timestamp: new Date().toISOString(), checks: { api: 'up', database: 'demo-mode', cache: 'demo-mode' } }); }
