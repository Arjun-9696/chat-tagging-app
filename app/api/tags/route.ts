import { NextResponse } from 'next/server';

const ALL_TAGS = [
  'Arjun',
  'Mallikarjun',
  'Alice',
  'Bob',
  'Charlie',
  'Support',
  'Admin',
  'Dev',
  'Designer',
  'Product',
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();
  if (!q) return NextResponse.json({ data: ALL_TAGS });
  const filtered = ALL_TAGS.filter((t) =>
    t.toLowerCase().startsWith(q.toLowerCase())
  );
  return NextResponse.json({ data: filtered });
}
