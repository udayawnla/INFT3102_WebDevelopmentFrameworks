import Link from 'next/link';
import { format } from 'date-fns';

type Props = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
};

// Small, focused component: just a card for the listing grid
export function PostCard({ slug, title, date, excerpt, tags }: Props) {
  return (
    <article className="card">
      <h3>
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      <div className="post-meta">
        {format(new Date(date), 'PPP')} {tags?.length ? ' • ' : ''}
        {tags?.map((t) => (
          <Link key={t} href={`/tags/${t}`} className="tag">{t}</Link>
        ))}
      </div>
      {excerpt ? <p>{excerpt}</p> : null}
      <div>
        <Link href={`/blog/${slug}`}>Read more →</Link>
      </div>
    </article>
  );
}


