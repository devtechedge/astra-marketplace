import { NextResponse } from 'next/server';
import { searchSuggestions } from '@/lib/expansionData';
export async function GET(req: Request) { const q = new URL(req.url).searchParams.get('q')?.toLowerCase() || ''; return NextResponse.json({ suggestions: searchSuggestions.filter(s => s.includes(q)).slice(0,8) }); }
