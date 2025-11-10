# Assignment 2 — Headless CMS Integration (Next.js + Contentful)

This project evolves Assignment 1 (local markdown) into a headless, API‑driven blog using Contentful as the CMS and Next.js (App Router) for the frontend.

Note on scope: The original rubric mentions 11ty + Nunjucks. With instructor approval, this implementation demonstrates the same learning outcomes using Next.js. Where the rubric says "templates (Nunjucks)", we achieve the equivalent with React server components.

## What this demonstrates

- API Interaction: Fetches content from Contentful Delivery API (REST under the hood) via the official SDK.
- Content Modeling: Content type `blogPost` with fields: `title` (Text), `slug` (Text), `content` (Rich Text), `excerpt` (Text, optional), `date` (Date), `tags` (Array<Text>).
- Data Fetching Strategy: Build‑time pre‑rendering with incremental static regeneration (ISR). Dynamic routes export `generateStaticParams()`; pages export `revalidate`.
- Template Design: UI is rendered by reusable React components (e.g., `PostCard`) analogous to Nunjucks templates.
- Pagination & Filtering: `/blog` index with pagination at `/blog/page/[page]`; tag listing at `/tags`; tag detail at `/tags/[tag]`.
- Search: Client‑side search page (`/search`) with a lightweight API endpoint (`/api/posts`).

## Project structure

- `src/lib/contentful/` — client, config, and search helpers
- `src/app/blog/` — blog index, paginated index, and post page
- `src/app/tags/` — tags index and tag filter page
- `src/components/PostCard.tsx` — reusable card component
- `src/app/api/posts/route.ts` — JSON endpoint used by the search page

## Environment variables

Copy `.env.template` to `.env.local` and fill with your values:

```
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...
CONTENTFUL_ENVIRONMENT=master
```

## Contentful setup

1. Create a content type `blogPost` with fields:
   - title: Short text
   - slug: Short text (unique)
   - content: Rich Text
   - excerpt: Short text (optional)
   - date: Date & time
   - tags: Short text, Array enabled (optional)
2. Add a few entries and publish them.
3. Get your Space ID and CDA Access Token from Settings → API keys.

## How to run

1. Install dependencies
2. Start dev server

```
npm install
npm run dev
```

Then open http://localhost:3000

## Routes

- `/` — Home
- `/blog` — Blog index (first page)
- `/blog/page/[page]` — Paginated index
- `/blog/[slug]` — Post detail (Contentful Rich Text supported)
- `/tags` — All tags
- `/tags/[tag]` — Posts filtered by tag
- `/search` — Client‑side search (title/excerpt)

## Data fetching details

- `src/lib/contentful/client.ts`
  - `getAllPosts()` — lists posts ordered by date desc
  - `getPostBySlug(slug)` — single post by slug
  - `getAllSlugs()` — for static param generation
  - `getPostsByTag(tag)` — filter by a tag
  - `getAllTags()` — collects unique tags
- Pages declare `export const revalidate = 60;` for ISR.

## Mapping to rubric (11ty → Next.js)

- API Interaction → Contentful SDK (REST) usage
- Content Modeling → `blogPost` type and fields documented above
- Data Fetching → SSG + ISR via `generateStaticParams` and `revalidate`
- Template Design → React components (`PostCard`, app routes) instead of Nunjucks
- Pagination & Filtering → Implemented under `/blog/page/[page]`, `/tags`, `/tags/[tag]`; search at `/search`

## Maintenance notes

- Content changes in Contentful appear after ISR window or a rebuild.
- To add fields, update the content type in Contentful and adjust `ContentfulPost` typing as needed in `client.ts`.
- Secrets stay in `.env.local` and are not checked in.

## Differences from Assignment 1

- Moves from local Markdown to Contentful (headless CMS)
- Adds tag pages, pagination, and search leveraging CMS content
- Introduces ISR to balance fast loads with fresh content

## Troubleshooting

- Module not found: Ensure you've run `npm install` after updating `package.json`.
- Contentful not configured: Create `.env.local` from `.env.template` and fill in your Space ID and Access Tokens. Rebuild the app.
- Empty pages (no posts/tags): Verify you have published `blogPost` entries in Contentful with required fields, then rebuild or wait for ISR (`revalidate = 60`).
- TypeScript errors on Contentful queries: The code uses array forms for `order` and `select` and avoids strict generics against the SDK; if you modify queries, prefer `order: ['-fields.date']`, `select: ['fields.slug']`.

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
