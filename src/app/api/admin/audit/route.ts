import { NextResponse } from 'next/server';
import { auditEvents } from '@/lib/expansionData';
export async function GET() { return NextResponse.json({ auditEvents }); }
