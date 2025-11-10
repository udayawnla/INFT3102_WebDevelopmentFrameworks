import { getClient } from './client';
import type { ContentfulPost } from './client';

export async function searchPosts(query: string): Promise<ContentfulPost[]> {
  const client = getClient();
  if (!query || query.trim().length === 0) return [];
  const res = await client.getEntries({
    content_type: 'blogPost',
    query,
    order: ['-fields.date'],
    limit: 50,
  });
  return res.items as any;
}

