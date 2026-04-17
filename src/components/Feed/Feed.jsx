import { formatDateShort, formatDateMachine } from '../../utils/format-date';
import styles from './Feed.module.scss';

const Feed = ({ edges, language }) => (
  <div className={styles['feed']}>
    {edges.map(edge => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <div className={styles['feed__item-meta']}>
          <time
            className={styles['feed__item-meta-time']}
            dateTime={formatDateMachine(edge.node.frontmatter.date)}
          >
            {formatDateShort(edge.node.frontmatter.date, language)}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <a
              href={`${edge.node.fields.categorySlug}${language === 'en' ? '' : '/ja'}`}
              className={styles['feed__item-meta-category-link']}
            >
              {edge.node.frontmatter.category}
            </a>
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <a
            className={styles['feed__item-title-link']}
            href={edge.node.fields.slug}
          >
            {edge.node.frontmatter.title}
          </a>
        </h2>
        <p className={styles['feed__item-description']}>
          {edge.node.frontmatter.description}
        </p>
      </div>
    ))}
  </div>
);

export default Feed;
