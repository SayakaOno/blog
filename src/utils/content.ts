/**
 * Content utility functions — replace all Gatsby GraphQL hooks.
 *
 * These are async and must be called from Astro pages / API routes,
 * NOT from React components directly. Pass the results down as props.
 */

import { getCollection } from 'astro:content';
import kebabCase from 'lodash/kebabCase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Language = 'en' | 'ja';

/** Matches the shape returned by Gatsby's group(field: ...) queries */
export type GroupCount = { fieldValue: string; totalCount: number };

/** Matches the edge shape Feed/BlogList components expect */
export type PostEdge = {
  node: {
    fields: { slug: string; categorySlug: string; tagSlugs?: string[] };
    frontmatter: {
      slug?: string;
      title: string;
      date: string;
      category?: string;
      description?: string;
      tags?: string[];
    };
  };
};

/** Gatsby-compatible post object shape for the Post React component */
export type GatsbyPost = {
  fields: { slug: string; categorySlug: string; tagSlugs: string[] };
  frontmatter: {
    title: string;
    date: string;
    updatedDate?: string;
    category?: string;
    tags?: string[];
    description?: string;
    link?: string;
    related?: Array<{ slug: string; title: string }>;
  };
};

// ---------------------------------------------------------------------------
// Helpers — build Gatsby-compatible data shapes from content collection entries
// ---------------------------------------------------------------------------

/** Derive the URL slug from an entry (uses frontmatter slug, strips leading/trailing slashes) */
export function entrySlug(entry: { data: { slug?: string }; id: string }): string {
  return (entry.data.slug ?? `/${entry.id.replace(/\.md$/, '')}`).replace(/\/$/, '');
}

/** Build the Gatsby-compatible `post` object passed to the Post React component */
export async function makeGatsbyPost(entry: Awaited<ReturnType<typeof getCollection<'posts'>>>[number]): Promise<GatsbyPost> {
  const slug = entrySlug(entry);
  const categorySlug = entry.data.category
    ? `/category/${kebabCase(entry.data.category)}/`
    : '';
  const tagSlugs = (entry.data.tags ?? []).map(t => `/tag/${kebabCase(t)}/`);

  // Resolve related post titles
  let related: Array<{ slug: string; title: string }> | undefined;
  if (entry.data.related && entry.data.related.length > 0) {
    const all = await getCollection('posts');
    related = entry.data.related.map(relSlug => {
      const found = all.find(p => entrySlug(p) === relSlug || p.data.slug === relSlug);
      return { slug: relSlug, title: found?.data.title ?? relSlug };
    });
  }

  return {
    fields: { slug, categorySlug, tagSlugs },
    frontmatter: {
      title: entry.data.title,
      date: entry.data.date,
      updatedDate: entry.data.updatedDate,
      category: entry.data.category,
      tags: entry.data.tags,
      description: entry.data.description,
      link: entry.data.link,
      related,
    },
  };
}

/** Build a Gatsby-compatible edge for Feed / BlogList components */
export function makeEdge(entry: Awaited<ReturnType<typeof getCollection<'posts'>>>[number]): PostEdge {
  const slug = entrySlug(entry);
  const categorySlug = entry.data.category
    ? `/category/${kebabCase(entry.data.category)}/`
    : '';
  return {
    node: {
      fields: { slug, categorySlug },
      frontmatter: {
        title: entry.data.title,
        date: entry.data.date,
        category: entry.data.category,
        description: entry.data.description,
        tags: entry.data.tags,
      },
    },
  };
}

/**
 * Compute the per-page date ranges for PaginationBox.
 * Returns an array where each element is either [startDate, endDate] or [singleDate].
 */
export function computePaginationDates(posts: Array<{ data: { date: string } }>, postsPerPage: number): string[][] {
  const dates: string[][] = [];
  let datesSet: string[] = [];
  posts.forEach((post, index) => {
    if (index % postsPerPage === 0) {
      datesSet.push(post.data.date);
    } else if ((index + 1) % postsPerPage === 0) {
      datesSet.push(post.data.date);
    }
    if (datesSet.length === 2 || index === posts.length - 1) {
      dates.push(datesSet.slice());
      datesSet = [];
    }
  });
  return dates;
}

// ---------------------------------------------------------------------------
// Tags  (replaces useTagsList / useTagsListJa)
// ---------------------------------------------------------------------------

export async function getTagsList(language: Language): Promise<GroupCount[]> {
  const posts = await getCollection('posts', ({ data }) =>
    !data.draft && data.language === language
  );

  const counts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([fieldValue, totalCount]) => ({ fieldValue, totalCount }))
    .sort((a, b) => b.totalCount - a.totalCount);
}

// ---------------------------------------------------------------------------
// Categories  (replaces useCategoriesList / useCategoriesListJa)
// ---------------------------------------------------------------------------

export async function getCategoriesList(language: Language): Promise<GroupCount[]> {
  const posts = await getCollection('posts', ({ data }) =>
    !data.draft && data.language === language && !!data.category
  );

  const counts: Record<string, number> = {};
  for (const post of posts) {
    const cat = post.data.category!;
    counts[cat] = (counts[cat] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([fieldValue, totalCount]) => ({ fieldValue, totalCount }))
    .sort((a, b) => b.totalCount - a.totalCount);
}

// ---------------------------------------------------------------------------
// Posts for search  (replaces usePostsTitlesList)
// ---------------------------------------------------------------------------

export async function getPostsForSearch(language?: Language): Promise<PostEdge[]> {
  const posts = await getCollection('posts', ({ data }) => {
    if (data.draft) return false;
    if (language && data.language !== language) return false;
    return true;
  });

  return posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map(makeEdge);
}

// ---------------------------------------------------------------------------
// All published posts, sorted newest-first  (used by index pages)
// ---------------------------------------------------------------------------

export async function getPublishedPosts(language: Language) {
  const posts = await getCollection('posts', ({ data }) =>
    !data.draft && data.language === language
  );

  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

// ---------------------------------------------------------------------------
// Posts for index page (home: true or undefined, not explicitly false)
// ---------------------------------------------------------------------------

export async function getIndexPosts(language: Language) {
  const posts = await getCollection('posts', ({ data }) =>
    !data.draft && data.language === language && data.home !== false
  );

  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

// ---------------------------------------------------------------------------
// Lookup a post title by slug  (replaces exported getTitle from the old hook)
// ---------------------------------------------------------------------------

export async function getPostTitle(slug: string): Promise<string | undefined> {
  const posts = await getCollection('posts');
  return posts.find((p) => p.data.slug === slug || entrySlug(p) === slug)?.data.title;
}
