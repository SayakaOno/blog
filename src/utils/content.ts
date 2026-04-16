/**
 * Content utility functions — replace all Gatsby GraphQL hooks.
 *
 * These are async and must be called from Astro pages / API routes,
 * NOT from React components directly. Pass the results down as props.
 *
 * Hook → replacement mapping:
 *   useSiteMetadata         → getSiteMetadata()          (sync, import directly)
 *   useTagsList             → getTagsList('en')
 *   useTagsListJa           → getTagsList('ja')
 *   useCategoriesList       → getCategoriesList('en')
 *   useCategoriesListJa     → getCategoriesList('ja')
 *   usePostsTitlesList      → getPostsForSearch()
 *   getTitle                → getPostTitle(slug)
 *   useCategoriesPathList   → not needed (Gatsby allSitePage, no Astro equivalent)
 *   useTagsPathList         → not needed
 *   useUrlsList             → not needed
 */

import { getCollection } from 'astro:content';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Language = 'en' | 'ja';

/** Matches the shape returned by Gatsby's group(field: ...) queries */
export type GroupCount = { fieldValue: string; totalCount: number };

/** Matches the shape of allMarkdownRemark.edges used by usePostsTitlesList */
export type PostEdge = { node: { frontmatter: { slug: string; title: string } } };

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
// Returns the same edge shape the Search component already expects.
// ---------------------------------------------------------------------------

export async function getPostsForSearch(language?: Language): Promise<PostEdge[]> {
  const posts = await getCollection('posts', ({ data }) => {
    if (data.draft) return false;
    if (language && data.language !== language) return false;
    return true;
  });

  return posts.map((post) => ({
    node: {
      frontmatter: {
        slug: post.data.slug ?? '',
        title: post.data.title,
      },
    },
  }));
}

// ---------------------------------------------------------------------------
// Lookup a post title by slug  (replaces exported getTitle from the old hook)
// ---------------------------------------------------------------------------

export async function getPostTitle(slug: string): Promise<string | undefined> {
  const posts = await getCollection('posts');
  return posts.find((p) => p.data.slug === slug)?.data.title;
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
