import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteMetadata from '../data/siteMetadata.js';
import { entrySlug } from '../utils/content';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('posts', ({ data }) =>
    !data.draft && data.language === 'en'
  );
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: siteMetadata.title,
    description: siteMetadata.subtitle,
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: entrySlug(post),
    })),
  });
}
