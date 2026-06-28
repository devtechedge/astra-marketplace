import { NextResponse } from 'next/server';
import { services } from '@/lib/services/platformServices';
export async function POST(req: Request) { const body = await req.json(); return NextResponse.json({ summary: services.cart.summarize(body.items || [], body.couponCode), inventory: services.cart.validate(body.items || []) }); }
export async function PATCH(req: Request) { const body = await req.json(); return NextResponse.json({ merged: services.cart.merge(body.guest || [], body.account || []) }); }
