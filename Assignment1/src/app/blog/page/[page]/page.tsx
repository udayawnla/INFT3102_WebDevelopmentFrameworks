import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostsSorted } from '@/lib/markdown';
import { PostCard } from '@/components/PostCard';

const PAGE_SIZE = 6;

export default function BlogPaginatedPage({ params }: { params: { page: string } }) {
  const currentPage = Number(params.page);
  if (Number.isNaN(currentPage) || currentPage < 1) return notFound();

  const posts = getAllPostsSorted();
  const totalPages = Math.ceil(posts.length / PAGE_SIZE) || 1;
  if (currentPage > totalPages) return notFound();

  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = posts.slice(start, start + PAGE_SIZE);

  return (
    <section>
      <h1>Blog — Page {currentPage}</h1>
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
      <nav className="pagination" aria-label="Pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link key={i + 1} href={i === 0 ? '/blog' : `/blog/page/${i + 1}`}
            aria-current={i + 1 === currentPage ? 'page' : undefined as any}>
            {i + 1}
          </Link>
        ))}
      </nav>
    </section>
  );
}


