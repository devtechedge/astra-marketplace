import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST() { const res = NextResponse.json(services.auth.logout()); res.cookies.set('astra-role', '', { maxAge: 0 }); return res; }
