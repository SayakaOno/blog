import React from 'react';
import moment from 'moment';
import { getIcon } from '../../../../utils';
import Icon from '../../../Icon';
import styles from './Meta.module.scss';

const Meta = ({ language, fields, frontmatter }) => {
  const { tagSlugs, categorySlug } = fields;
  const { tags, date, updatedDate, category } = frontmatter;

  return (
    <div>
      <div className={styles['meta']}>
        <ul className={styles['meta__date']}>
          <li>
            {moment(date).format(language === 'en' ? 'MMMM D, YYYY' : 'YYYY/MM/DD')}
          </li>
          {updatedDate && (
            <li>
              <Icon icon={getIcon('update')} />
              {moment(updatedDate).format(language === 'en' ? 'MMMM D, YYYY' : 'YYYY/MM/DD')}
            </li>
          )}
        </ul>
        <div className={styles['meta__category']}>
          <span className={styles['meta__emoji']}>
            {' '}<Icon icon={getIcon('category')} />
          </span>
          <a
            href={`${categorySlug}${language === 'en' ? '' : '/ja'}`}
            className={styles['meta__category-link']}
          >
            {category}
          </a>
        </div>
        {tags ? (
          <div className={styles['meta__tags']}>
            <span className={styles['meta__emoji']}>
              {' '}<Icon icon={getIcon('tag')} />
            </span>
            {tagSlugs &&
              tagSlugs.map((slug, i) => (
                <span className={styles['meta__tags-item']} key={tags[i]}>
                  <a
                    href={`${slug}${language === 'ja' ? '/ja' : ''}`}
                    className={styles['meta__tags-item-link']}
                  >
                    {tags[i]}
                  </a>
                </span>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Meta;
