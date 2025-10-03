import Link from 'next/link';
import { getAllTags } from '@/lib/markdown';

export default function TagsIndexPage() {
  const tags = getAllTags();
  return (
    <section>
      <h1>Tags</h1>
      <p className="post-meta">A quick way to browse related posts.</p>
      <div>
        {tags.length === 0 && <p>No tags yet.</p>}
        {tags.map((t) => (
          <Link key={t} href={`/tags/${t}`} className="tag">{t}</Link>
        ))}
      </div>
    </section>
  );
}


