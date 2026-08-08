import { withSlash } from '../../../utils';
import styles from './Tags.module.scss';

const Tags = ({ tags, tagSlugs, language }) => (
  <div className={styles['tags']}>
    {language === 'en' ? (tags.length > 1 ? 'Tags: ' : 'Tag: ') : 'タグ： '}
    <>
      {tagSlugs &&
        tagSlugs.map((slug, i) => (
          <span className={styles['tags__list-item']} key={tags[i]}>
            <a
              href={withSlash(language === 'en' ? slug : slug + '/ja')}
              className={styles['tags__list-item-link']}
            >
              {tags[i]}
            </a>
          </span>
        ))}
    </>
  </div>
);

export default Tags;
