# CLAUDE.md

Personal portfolio and blog site for Chris Mitchell (https://chrisbeckermitchell.com).

## Purpose

- Portfolio of past coding projects
- Technical and personal blog
- Art/design gallery
- Contact portal (with resume request form)
- Demonstrate software engineering skills

## Tech Stack

### Frontend
- React 19 + TypeScript (strict mode)
- Vite 5 for bundling
- React Router v7 for client-side routing
- MUI (Material UI) v7 with custom dark theme (`src/theme.ts`)
- Emotion for CSS-in-JS (via MUI)
- MDX for content (blog posts, project write-ups, gallery items)
  - Remark plugins: frontmatter, GFM, TOC, mdx-frontmatter
  - Rehype plugins: slug, Obsidian-style callouts, pretty-code (Shiki, github-dark theme)
  - Fenced ` ```mermaid ` blocks render as `<MermaidDiagram>` components
- Cloudflare Turnstile for bot protection on contact form

### Backend (AWS CDK)
- AWS CDK v2 (TypeScript) — infrastructure-as-code in `infra/`
- AWS HTTP API Gateway — single API, all backend routes
- AWS Lambda (Node.js 22.x) — serverless handlers
- AWS DynamoDB — analytics event storage (90-day TTL, pay-per-request)
- AWS SES — transactional email for contact form
- AWS Secrets Manager — Turnstile API secret
- Zod — runtime schema validation in Lambda handlers

## Commands

```bash
# Frontend (run from project root)
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:5173
npm run build        # tsc -b && vite build → dist/
npm run preview      # preview production build locally
npm run lint         # ESLint

# CDK Infrastructure (run from infra/)
npm run build        # compile TypeScript
npm run synth        # generate CloudFormation template
npm run deploy       # deploy to AWS
npm run diff         # preview pending infra changes
```

## Environment Variables

```
VITE_API_BASE_URL        # Base URL for CDK-deployed API (serves /contact and /analytics)
VITE_TURNSTILE_SITE_KEY  # Cloudflare Turnstile site key (test key in dev)
```

See `.env.example` for reference. CDK context values (sender/recipient email, CORS origins) live in `infra/cdk.json`.

## Project Structure

```
src/
├── pages/           # Route-level page components (one per route)
├── components/
│   ├── blog/        # BlogCard, BlogLayout, Heading, mdxMapping, MermaidDiagram
│   ├── projects/    # ProjectCard, ProjectLayout
│   ├── gallery/     # GalleryCard, GalleryImageList, GalleryImageStack, GalleryLayout
│   └── *.tsx        # Shared: Hero, Navbar, SocialLinks, UnderConstruction
├── lib/             # Content loaders (blog.ts, projects.ts, gallery.ts) + standalone engines
├── hooks/           # useAnalytics, useContentBySlug, useHashScroll, useScrollPhysics
├── types/           # TypeScript types for blog, project, gallery, mdx
└── content/
    ├── blog/        # *.mdx blog posts
    ├── projects/    # *.mdx project write-ups
    └── gallery/     # *.mdx gallery items

infra/
├── bin/infra.ts             # CDK app entry point
├── lib/site-api-stack.ts    # Main CDK stack
└── lambda/
    ├── contact/index.ts     # Contact form handler (Turnstile + SES)
    └── analytics/index.ts   # Pageview/duration event handler (DynamoDB)
```

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero with animated name/subtitle videos |
| `/about` | About | Not yet publicly linked from navbar (in progress) |
| `/blog` | Blog | Post listing |
| `/blog/:slug` | BlogPost | Individual post |
| `/projects` | Projects | Project grid |
| `/projects/:slug` | ProjectPage | Individual project write-up |
| `/gallery` | Gallery | Gallery listing |
| `/gallery/:slug` | GalleryPage | Individual gallery item |
| `/resume` | Resume | Contact form with Turnstile CAPTCHA |
| `*` | — | Redirects to `/` |

## Content Architecture

All three content types (blog, projects, gallery) follow the same pattern:

1. **Types** (`src/types/`): `Frontmatter` → `Meta` (adds `slug`) → full type (adds `Content` component)
2. **Loader** (`src/lib/`): `getAll*()` using eager `import.meta.glob` (for listing pages) + `get*BySlug()` lazy-loaded (for detail pages)
3. **Listing page** (`src/pages/`): Calls `getAll*()`, renders card components in a grid
4. **Detail page** (`src/pages/`): Uses `useParams` + `useContentBySlug` hook, renders in a layout wrapper
5. **Components** (`src/components/<feature>/`): Card for listings, Layout for detail pages

### MDX Frontmatter Fields

**Blog posts** (`src/content/blog/*.mdx`):
```yaml
---
title: "Post Title"
date: "2026-04-15"
excerpt: "One-line summary"
tags: ["tag1", "tag2"]
published: true          # optional, defaults to true
readingTime: "5 min read" # optional
---
```

**Projects** (`src/content/projects/*.mdx`):
```yaml
---
title: "Project Name"
description: "Short description"
image: "/images/project-screenshot.png"
githubUrl: "https://github.com/..."
deploymentUrl: "https://..."  # optional
showDemo: true                # optional
tags: ["React", "TypeScript"] # optional
order: 1                      # optional, controls sort order in listing
---
```

**Gallery** (`src/content/gallery/*.mdx`):
```yaml
---
title: "Gallery Title"
description: "Short description"
previewImages: ["/images/..."]
order: 1  # optional
---
```

## Key Patterns

- **Barrel exports**: Each component directory has an `index.ts` re-exporting its public API
- **MUI imports**: Use deep imports (`import Box from '@mui/material/Box'`), not named imports from the package root (`import { Box } from '@mui/material'`)
- **MDX rendering**: Blog and project layouts share `mdxComponents` from `src/components/blog/mdxMapping.tsx`
- **Responsive design**: Use MUI breakpoints (`xs`, `sm`, `md`) for layout switching

## Coding Conventions

- Functional components with hooks only — no class components
- TypeScript for all new files
- Prefer named exports over default exports
- Follow existing patterns for consistency

## Analytics

`useAnalytics()` is called once in `App.tsx` and tracks:
- **pageview** event on each route change (path, referrer, sessionId, language, viewport, UA)
- **duration** event on unmount via `navigator.sendBeacon()` (path, durationMs, sessionId)
- Bails out when `window.isSecureContext` is false (no tracking over HTTP)
- Session ID generated with `crypto.randomUUID()`, stored in `sessionStorage`

## CDK Infrastructure Details

- **API routes**: `POST /contact` → ContactHandler, `POST /analytics` → AnalyticsHandler
- **Rate limit**: 10 req/s, burst 50
- **DynamoDB key schema**: `pk = DATE#YYYY-MM-DD`, `sk = {TYPE}#{ISO_TIMESTAMP}#{UUID}`
- **CORS**: Restricted to `https://chrisbeckermitchell.com`
- **Turnstile secret**: Stored in Secrets Manager as `personal-site/turnstile-secret-key`

## Deployment

- **Frontend**: Deploys automatically via GitHub Actions on push to `main`
- **CDK**: Deploys automatically when `infra/**` changes on `main`; PRs run `cdk diff`

## Files to Be Aware Of

The following files in `src/lib/` and `src/components/` are **not currently part of the live public site** and may be removed or replaced by imports from a separate project in the future. Avoid treating them as representative patterns or building on top of them:

- `src/lib/ScrollPhysicsElement.ts`
- `src/lib/ScrollPhysicsImage.ts`
- `src/components/ViewportPerspectiveBox.ts`
