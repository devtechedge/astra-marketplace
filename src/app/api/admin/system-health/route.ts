import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ status: 'healthy', checks: { api: 'ok', database: 'demo-mode', redis: 'demo-mode', payments: 'mock-mode', search: 'demo-index', storage: 'local-placeholder' } }); }
