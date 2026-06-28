import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ metrics: { gmv: 128400, conversion: 7.8, aov: 86.42, refundRate: 2.4, searchCtr: 31 } }); }
