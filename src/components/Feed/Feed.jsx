import React from 'react';
import moment from 'moment';
import styles from './Feed.module.scss';

const Feed = ({ edges, language }) => (
  <div className={styles['feed']}>
    {edges.map(edge => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <div className={styles['feed__item-meta']}>
          <time
            className={styles['feed__item-meta-time']}
            dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}
          >
            {moment(edge.node.frontmatter.date).format(
              language === 'en' ? 'MMMM D, YYYY' : 'YYYY/MM/DD'
            )}
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
