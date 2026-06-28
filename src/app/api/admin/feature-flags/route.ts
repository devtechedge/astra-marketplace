import { NextResponse } from 'next/server';
import { featureFlags } from '@/lib/expansionData';
export async function GET() { return NextResponse.json({ featureFlags }); }
export async function PATCH(req: Request) { return NextResponse.json({ featureFlag: await req.json(), audit: 'FEATURE_FLAG_UPDATED' }); }
