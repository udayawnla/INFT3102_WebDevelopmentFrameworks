import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Content lives here so authors can write without touching code
const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

export type PostFrontMatter = {
  title: string;
  date: string; // ISO or YYYY-MM-DD
  excerpt?: string;
  tags?: string[];
  draft?: boolean;
};

export type Post = {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string; // raw markdown
};

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function readPostBySlug(slug: string): Post | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  // Being forgiving: if fields are missing, we'll let TypeScript nudge us in dev
  const fm = data as PostFrontMatter;
  return { slug, frontMatter: fm, content };
}

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

export function getAllPostsSorted(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => readPostBySlug(slug))
    .filter((p): p is Post => Boolean(p) && !p!.frontMatter.draft);
  // Newest first; if dates tie, keep original order
  return posts.sort((a, b) => (a.frontMatter.date < b.frontMatter.date ? 1 : -1));
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of getAllPostsSorted()) {
    for (const tag of post.frontMatter.tags || []) set.add(tag);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}


