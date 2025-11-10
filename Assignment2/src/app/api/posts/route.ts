import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/content';

export async function GET() {
  try {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Contentful not configured', message: e?.message || 'Missing or invalid env vars' },
      { status: 500 }
    );
  }
}
