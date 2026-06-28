import { NextResponse } from 'next/server';
import { notifications } from '@/lib/expansionData';
export async function GET() { return NextResponse.json({ notifications }); }
export async function POST(req: Request) { const body = await req.json(); return NextResponse.json({ notification: { id: `not-${Date.now()}`, read: false, createdAt: new Date().toISOString(), ...body } }, { status: 201 }); }
