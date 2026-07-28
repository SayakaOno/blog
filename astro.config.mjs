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

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.sayaka-ono.com',
  trailingSlash: 'ignore',
  integrations: [react(), sitemap(), mdx()],
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
      remarkPlugins: [
        remarkGfm,
        remarkSmartypants,
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
  },
});