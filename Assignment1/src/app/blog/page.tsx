import Link from 'next/link';
import { getAllPostsSorted } from '@/lib/markdown';
import { PostCard } from '@/components/PostCard';

// Tweaking this number changes the feel of the index quickly
const PAGE_SIZE = 6;

export default function BlogIndexPage() {
  const posts = getAllPostsSorted();
  const pagePosts = posts.slice(0, PAGE_SIZE);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <section>
      <h1>Blog</h1>
      <div className="grid blog">
        {pagePosts.map((p) => (
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


