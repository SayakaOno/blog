import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkSmartypants from 'remark-smartypants';
import remarkGfm from 'remark-gfm';

import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Map post URLs to their last-modified date so the sitemap can tell Google
 * which pages actually changed. Read straight from frontmatter — the content
 * collection API isn't available this early in the config.
 *
 * Only posts and the two language home pages get a date. Tag, category and
 * pagination pages have no meaningful "last modified", and lastmod is optional
 * per URL, so those are left off rather than filled with something invented.
 */
function buildLastmodMap() {
  const dir = './src/content/posts';
  const map = new Map();
  const newest = { en: null, ja: null };

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) {
      continue;
    }
    const fm =
      fs.readFileSync(path.join(dir, file), 'utf8').split('---')[1] ?? '';
    const field = (key) => {
      const m = fm.match(new RegExp(`^${key}:\\s*'?"?([^'"\\n]*)`, 'm'));
      return m ? m[1].trim() : '';
    };
    if (field('draft') === 'true') {
      continue;
    }

    const stamp = field('updatedDate') || field('date');
    if (!stamp) {
      continue;
    }
    const iso = new Date(stamp).toISOString();

    const slug = field('slug') || `/${file.replace(/\.md$/, '')}`;
    map.set(slug.endsWith('/') ? slug : `${slug}/`, iso);

    const lang = field('language') === 'ja' ? 'ja' : 'en';
    if (!newest[lang] || iso > newest[lang]) {
      newest[lang] = iso;
    }
  }

  if (newest.en) {
    map.set('/', newest.en);
  }
  if (newest.ja) {
    map.set('/ja/', newest.ja);
  }
  return map;
}

const lastmods = buildLastmodMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.sayaka-ono.com',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const lastmod = lastmods.get(
          decodeURIComponent(new URL(item.url).pathname),
        );
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    mdx(),
  ],
  vite: {
    build: {
      // Vite 8 (Astro 7) defaults to Lightning CSS, which rewrites
      // `(min-width: 685px)` to the range syntax `(width >= 685px)`.
      // Older browsers drop those media queries entirely, so every
      // breakpoint in the mobile-first stylesheets is lost.
      cssMinify: 'esbuild',
    },
  },
  markdown: {
    syntaxHighlight: 'prism',
    processor: unified({
      remarkPlugins: [remarkGfm, remarkSmartypants],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
      ],
    }),
  },
});
