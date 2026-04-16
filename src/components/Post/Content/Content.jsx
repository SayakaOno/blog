import React from 'react';
import Meta from './Meta/Meta';
import styles from './Content.module.scss';

/**
 * body     – raw HTML string (legacy, used when rendering from Gatsby)
 * children – Astro-rendered markdown content passed as React children
 * Either one must be provided.
 */
const Content = ({ body, children, title, language, fields, frontmatter }) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <Meta language={language} fields={fields} frontmatter={frontmatter} />
    <div className={styles['content__body']}>
      {body
        ? <div dangerouslySetInnerHTML={{ __html: body }} />
        : children}
    </div>
  </div>
);

export default Content;
