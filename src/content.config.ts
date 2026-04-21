import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    updatedDate: z.string().optional(),
    template: z.literal('post'),
    language: z.enum(['en', 'ja']),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    home: z.boolean().optional(),
    link: z.string().optional(),
    related: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    template: z.literal('page'),
    description: z.string().optional(),
  }),
});

export const collections = { posts, pages };
