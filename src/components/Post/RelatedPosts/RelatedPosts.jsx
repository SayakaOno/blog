import styles from './RelatedPosts.module.scss';

/**
 * posts: Array of { slug: string, title: string }
 *   Titles are resolved server-side in the Astro page.
 */
const RelatedPosts = ({ language, posts }) => (
  <div className={styles['related-posts']}>
    <h3>
      {language === 'en'
        ? `Related ${posts.length === 1 ? 'post' : 'posts'}`
        : '関連ブログ'}
    </h3>
    <ul>
      {posts.map(post => (
        <li key={post.slug}>
          <a href={post.slug}>{post.title || post.slug}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default RelatedPosts;
