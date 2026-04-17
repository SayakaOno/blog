import { formatDateShort, formatDateMachine } from '../../../utils/format-date';
import { getIcon } from '../../../utils';
import Icon from '../../Icon';
import styles from './BlogList.module.scss';

const BlogList = ({ edges, filters, language }) => {
  const year = filters ? filters.year : '';
  const month = filters ? filters.month : '';
  const selectedCategory = filters ? filters.selectedCategory : '';
  const selectedTags = filters ? filters.selectedTags : [];

  return (
    <div className={styles['blog-list']}>
      {edges.map(edge => (
        <a
          className={styles['blog-list__item-title-link']}
          key={edge.node.fields.slug}
          href={edge.node.fields.slug}
        >
          <div className={styles['blog-list__item']}>
            <div className={styles['blog-list__item-meta']}>
              <time
                className={styles['blog-list__item-meta-time']}
                dateTime={formatDateMachine(edge.node.frontmatter.date)}
              >
                {formatDateShort(edge.node.frontmatter.date, language)}
              </time>
              <span className={styles['blog-list__item-meta-divider']} />
            </div>
            <h2 className={styles['blog-list__item-title']}>
              {edge.node.frontmatter.title}
            </h2>
            {edge.node.frontmatter.tags ? (
              <div className={styles['blog-list__tags']}>
                <Icon icon={getIcon('tag')} />
                {edge.node.frontmatter.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
};

export default BlogList;
