import type { Metadata } from 'next';
import './globals.css';

// Intent: keep the site chrome simple and uncluttered.
export const metadata: Metadata = {
  title: 'Next.js Markdown Blog',
  description: 'Personal blog built for coursework — markdown, tags, pagination.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Using semantic tags to make things accessible by default
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <a href="/" className="brand">Next Markdown</a>
            <nav aria-label="Main">
              <a href="/blog">Blog</a>
              <a href="/tags">Tags</a>
              <a href="/about">About</a>
            </nav>
          </div>
        </header>
        <main className="container">
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">© {new Date().getFullYear()} — Built for WDF</div>
        </footer>
      </body>
    </html>
  );
}


