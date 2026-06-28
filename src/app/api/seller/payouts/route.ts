import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ balance: 12450.77, nextPayoutAt: '2026-07-03', ledger: ['settlement', 'fees', 'reserve'] }); }
