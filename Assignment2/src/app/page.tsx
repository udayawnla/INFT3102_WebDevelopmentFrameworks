import Link from 'next/link';

export default function HomePage() {
  return (
    <section>
      <h1>Hey — welcome!</h1>
      
      <p>
        This is my course project built with Next.js. I wanted it to feel simple,
        fast, and easy to maintain. The blog runs on markdown files, which makes
        writing new posts as easy as dropping a <code>.md</code> file into a folder.
      </p>
      <p>
        See the <Link href="/blog">blog</Link> for posts, or browse <Link href="/tags">tags</Link>.
      </p>
    </section>
  );
}


