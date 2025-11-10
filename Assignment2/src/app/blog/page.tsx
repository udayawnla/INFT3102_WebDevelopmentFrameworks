import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { PostCard } from '@/components/PostCard';

// Tweaking this number changes the feel of the index quickly
const PAGE_SIZE = 6;

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const pagePosts = posts.slice(0, PAGE_SIZE);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <section>
      <h1>Blog</h1>
      {posts.length === 0 && (
        <p className="post-meta" style={{ marginBottom: 16 }}>
          No posts found. If you're setting up for the first time, add entries to your
          Contentful <strong>blogPost</strong> content type and configure your env vars in
          <code> .env.local</code> (see README). After publishing content, rebuild or wait for ISR.
        </p>
      )}
      <div className="grid blog">
        {pagePosts.map((p) => (
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
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          <Link href={`/blog/page/1`} aria-current="page">1</Link>
          {Array.from({ length: totalPages - 1 }).map((_, i) => (
            <Link key={i + 2} href={`/blog/page/${i + 2}`}>{i + 2}</Link>
          ))}
        </nav>
      )}
    </section>
  );
}


