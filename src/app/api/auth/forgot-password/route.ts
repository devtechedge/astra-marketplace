import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST(req: Request) { const { email } = await req.json(); return NextResponse.json(services.auth.requestPasswordReset(email)); }
