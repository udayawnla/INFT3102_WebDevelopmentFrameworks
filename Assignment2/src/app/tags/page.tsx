import Link from 'next/link';
import { getAllTags } from '@/lib/contentful/client';

export default async function TagsIndexPage() {
  const tags = await getAllTags();
  const hasTags = tags.length > 0;
  return (
    <section>
      <h1>Tags</h1>
      <p className="post-meta">Browse related posts by tag.</p>
      <div>
        {!hasTags && (
          <p>
            No tags yet. If you're setting up for the first time, ensure your Contentful
            environment variables are configured in <code>.env.local</code> and you have
            published entries with tags.
          </p>
        )}
        {tags.map((t) => (
          <Link key={t} href={`/tags/${t}`} className="tag">{t}</Link>
        ))}
      </div>
    </section>
  );
}


