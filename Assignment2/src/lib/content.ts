import { getAllPosts as getAllPostsCtf, getPostBySlug as getPostBySlugCtf } from '@/lib/contentful/client';
import { getAllPostsSorted as getAllPostsMd, getAllTags as getAllTagsMd, readPostBySlug as readPostMd, convertMarkdownToHtml } from '@/lib/markdown';

export type NormalizedPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
};

export async function getAllPosts(): Promise<NormalizedPost[]> {
  try {
    const ctf = await getAllPostsCtf();
    if (ctf && ctf.length) {
      return ctf.map((p) => ({
        slug: p.fields.slug,
        title: p.fields.title,
        date: p.fields.date,
        excerpt: p.fields.excerpt,
        tags: p.fields.tags || [],
      }));
    }
  } catch {}
  // Fallback to markdown
  return getAllPostsMd().map((p) => ({
    slug: p.slug,
    title: p.frontMatter.title,
    date: p.frontMatter.date,
    excerpt: p.frontMatter.excerpt,
    tags: p.frontMatter.tags || [],
  }));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  if (posts.length) {
    const set = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }
  return getAllTagsMd();
}

export async function getPostDetail(slug: string): Promise<
  | { kind: 'contentful'; title: string; date: string; tags?: string[]; content: any }
  | { kind: 'markdown'; title: string; date: string; tags?: string[]; html: string }
  | null
> {
  try {
    const ctf = await getPostBySlugCtf(slug);
    if (ctf) {
      return {
        kind: 'contentful',
        title: ctf.fields.title,
        date: ctf.fields.date,
        tags: ctf.fields.tags || [],
        content: ctf.fields.content,
      };
    }
  } catch {}
  const md = readPostMd(slug);
  if (!md) return null;
  const html = await convertMarkdownToHtml(md.content);
  return {
    kind: 'markdown',
    title: md.frontMatter.title,
    date: md.frontMatter.date,
    tags: md.frontMatter.tags || [],
    html,
  };
}
