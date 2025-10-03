# Next.js Markdown Blog — Assignment 1

I built this with Next.js because I wanted React layouts and routing, but I still
wanted the simplicity of writing posts in markdown. It keeps the workflow fast
and focused on content.

## What this project demonstrates

- Config file: `next.config.js`
- Reusable layout with the App Router: `src/app/layout.tsx`
- Markdown posts with front matter in `content/posts/*.md` (parsed with `gray-matter`)
- Collections via tags (`/tags`, `/tags/[tag]`)
- Pagination on the blog listing (`/blog`, `/blog/page/[n]`)
- Static assets + global CSS (`src/app/globals.css`)
- Build process with `npm run build` / `npm start`

## Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## How I organized things

```
content/
  posts/                 # Markdown posts with front matter
src/
  app/
    layout.tsx          # Site chrome (header/footer)
    page.tsx            # Home
    about/page.tsx      # About
    blog/
      page.tsx          # Blog index (page 1)
      page/[page]/page.tsx  # Pagination
      [slug]/page.tsx   # Post detail
    tags/
      page.tsx          # All tags
      [tag]/page.tsx    # Posts by tag
  components/
    PostCard.tsx        # Card used on listings
  lib/
    markdown.ts         # Markdown + front matter helpers
```

## Writing a post

Create a file like `content/posts/my-post.md`:

```md
---
title: My Post Title
date: 2025-10-01
excerpt: One or two sentences for the card.
tags: [nextjs, design]
---

Your markdown content here.
```

- `title` and `date` are used in lists and on the post page.
- `draft: true` will hide a post from listings.

## Build & deploy

```bash
npm run build
npm start
```

You can deploy to Vercel or any Node host.

## If you expected Eleventy…

The original lab mentioned 11ty. I chose Next.js instead, but I mirrored the
same ideas: layouts, front matter, collections (via tags), pagination, static
assets, and a build step. Different tool, same outcomes.

## Notes to future-me

- Change the page size in `src/app/blog/page.tsx` and `src/app/blog/page/[page]/page.tsx`.
- Tweak global styles in `src/app/globals.css`.
- Navigation lives in `src/app/layout.tsx`.
- Posts are just files — no extra tooling needed.
