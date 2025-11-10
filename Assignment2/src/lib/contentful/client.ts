import { createClient, EntryCollection } from 'contentful';
import { isContentfulConfigured } from './config';

// Skeleton type describing the fields for stronger typing with Contentful SDK
export interface BlogPostFields {
  title: string;
  slug: string;
  content: any;
  excerpt?: string;
  date: string;
  tags?: string[];
}

// We will treat returned entries as generic objects; simplifying typing to avoid over-engineering.
export type ContentfulPost = {
  fields: BlogPostFields;
  sys: { id: string };
};

export const getClient = (preview = false) => {
  if (!isContentfulConfigured) {
    throw new Error('Contentful not configured: missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN');
  }
  const params: any = {
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: (preview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN) as string,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  };
  if (preview) params.host = 'preview.contentful.com';
  return createClient(params);
};

export async function getAllPosts(): Promise<ContentfulPost[]> {
  if (!isContentfulConfigured) return [];
  const client = getClient();
  const entries: EntryCollection<any> = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.date'],
  });
  return entries.items as any;
}

export async function getPostBySlug(slug: string): Promise<ContentfulPost | null> {
  if (!isContentfulConfigured) return null;
  const client = getClient();
  const entries: EntryCollection<any> = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  return (entries.items[0] as any) || null;
}

export async function getAllSlugs(): Promise<string[]> {
  if (!isContentfulConfigured) return [];
  const client = getClient();
  const entries: EntryCollection<any> = await client.getEntries({
    content_type: 'blogPost',
    select: ['fields.slug'],
    limit: 1000,
  });
  return entries.items
    .map((it: any) => it.fields?.slug)
    .filter((s: string | undefined): s is string => Boolean(s));
}

export async function getPostsByTag(tag: string): Promise<ContentfulPost[]> {
  if (!isContentfulConfigured) return [];
  const client = getClient();
  // filtering by tag using in operator
  const entries: EntryCollection<any> = await client.getEntries({
    content_type: 'blogPost',
    'fields.tags[in]': [tag] as any,
    order: ['-fields.date'],
  });
  return entries.items as any;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => {
    if (post.fields.tags) {
      post.fields.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}