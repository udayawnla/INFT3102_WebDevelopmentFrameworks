import { notFound } from 'next/navigation';
import { convertMarkdownToHtml, readPostBySlug, getAllPostSlugs } from '@/lib/markdown';
import { format } from 'date-fns';
import Link from 'next/link';

export async function generateStaticParams() {
  // Pre-build the known post routes for fast loads
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = readPostBySlug(params.slug);
  if (!post) return notFound();
  const html = await convertMarkdownToHtml(post.content);
  const { title, date, tags } = post.frontMatter;
  return (
    <article className="prose">
      <h1>{title}</h1>
      <p className="post-meta">{format(new Date(date), 'PPP')}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {tags?.length ? (
        <p>
          Tags: {tags.map((t) => (
            <Link key={t} href={`/tags/${t}`} className="tag">{t}</Link>
          ))}
        </p>
      ) : null}
    </article>
  );
}


