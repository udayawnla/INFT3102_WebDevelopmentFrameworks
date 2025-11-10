"use client";
import { useEffect, useState } from 'react';
import { PostCard } from '@/components/PostCard';

export default function SearchPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Preload quietly so first keystroke is fast
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => { setPosts(Array.isArray(data) ? data : []); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const filtered = posts.filter((p) => {
    if (!query) return true;
    const hay = `${p.title ?? p.fields?.title ?? ''} ${p.excerpt ?? p.fields?.excerpt ?? ''}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  return (
    <section>
      <h1>Search</h1>
      <p className="post-meta">Search by title or excerpt. Results are fetched from Contentful.</p>
      <input
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: '100%', marginBottom: 16 }}
      />
      {!loaded && <p>Loading posts…</p>}
      {error && <p className="post-meta">{error}</p>}
      <div className="grid blog">
        {filtered.map((p) => (
          <PostCard
            key={(p.slug ?? p.fields?.slug) as string}
            slug={(p.slug ?? p.fields?.slug) as string}
            title={(p.title ?? p.fields?.title) as string}
            date={(p.date ?? p.fields?.date) as string}
            excerpt={(p.excerpt ?? p.fields?.excerpt) as string | undefined}
            tags={(p.tags ?? p.fields?.tags) as string[] | undefined}
          />
        ))}
      </div>
      {loaded && posts.length === 0 && (
        <p className="post-meta" style={{ marginTop: 12 }}>
          No posts available. Ensure Contentful is configured and entries are published, or add markdown files under <code>content/posts</code>.
        </p>
      )}
    </section>
  );
}
