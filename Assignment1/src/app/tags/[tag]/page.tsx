import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostsSorted } from '@/lib/markdown';
import { PostCard } from '@/components/PostCard';

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const posts = getAllPostsSorted().filter((p) => (p.frontMatter.tags || []).includes(tag));
  if (posts.length === 0) return notFound();

  return (
    <section>
      <h1>Tag: {tag}</h1>
      <div className="grid blog">
        {posts.map((p) => (
          <PostCard
            key={p.slug}
            slug={p.slug}
            title={p.frontMatter.title}
            date={p.frontMatter.date}
            excerpt={p.frontMatter.excerpt}
            tags={p.frontMatter.tags}
          />
        ))}
      </div>
      <p style={{ marginTop: 16 }}>
        <Link href="/tags">← All tags</Link>
      </p>
    </section>
  );
}


