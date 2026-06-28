import { NextResponse } from 'next/server';
import { customers } from '@/lib/expansionData';
export async function GET() { return NextResponse.json({ users: customers }); }
export async function PATCH(req: Request) { return NextResponse.json({ user: await req.json(), audit: 'USER_UPDATED' }); }
