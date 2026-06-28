import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST(req: Request) { const { token } = await req.json(); return NextResponse.json(services.auth.resetPassword(token)); }
