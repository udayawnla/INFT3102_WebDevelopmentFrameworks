import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { PostCard } from '@/components/PostCard';

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const posts = (await getAllPosts()).filter((p) => (p.tags || []).includes(tag));
  if (posts.length === 0) return notFound();

  return (
    <section>
      <h1>Tag: {tag}</h1>
      <div className="grid blog">
        {posts.map((p) => (
          <PostCard
            key={p.slug}
            slug={p.slug}
            title={p.title}
            date={p.date}
            excerpt={p.excerpt}
            tags={p.tags}
          />
        ))}
      </div>
      <p style={{ marginTop: 16 }}>
        <Link href="/tags">← All tags</Link>
      </p>
    </section>
  );
}


