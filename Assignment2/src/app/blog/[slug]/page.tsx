import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { format } from 'date-fns';
import Link from 'next/link';
import { getPostDetail, getAllPosts } from '@/lib/content';
import { getAllSlugs as getAllSlugsCtf } from '@/lib/contentful/client';
import { getAllPostSlugs } from '@/lib/markdown';

export async function generateStaticParams() {
  // Combine Contentful slugs and markdown slugs to pre-render both sources
  let ctf: string[] = [];
  try { ctf = await getAllSlugsCtf(); } catch {}
  const md = getAllPostSlugs();
  const all = Array.from(new Set([...ctf, ...md]));
  return all.map((slug) => ({ slug }));
}

export const revalidate = 60; // ISR: revalidate every 60s

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const data = await getPostDetail(params.slug);
  if (!data) return notFound();
  const { title, date, tags } = data;
  return (
    <article className="prose">
      <h1>{title}</h1>
      <p className="post-meta">{format(new Date(date), 'PPP')}</p>
      {data.kind === 'contentful' && (
        <div>{documentToReactComponents(data.content as any)}</div>
      )}
      {data.kind === 'markdown' && (
        <div dangerouslySetInnerHTML={{ __html: data.html }} />
      )}
      {tags?.length ? (
        <p>
          Tags:{' '}
          {tags.map((t) => (
            <Link key={t} href={`/tags/${t}`} className="tag">{t}</Link>
          ))}
        </p>
      ) : null}
    </article>
  );
}


