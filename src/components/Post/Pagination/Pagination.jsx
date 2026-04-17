import React from 'react';
import { formatDate, formatDateMachine } from '../../../utils/format-date';
import styles from './Pagination.module.scss';

const Pagination = ({ language, prev, next }) => {
  const renderPrevLink = prev => {
    if (!prev || !prev.slug) return null;
    return (
      <div className={styles['pagination__prev']}>
        <a className={styles['pagination__prev__link']} href={prev.slug}>
          <div className={styles['pagination__prev__link-date']}>
            {language === 'en' ? formatDate(prev.date, 'en') : formatDateMachine(prev.date)}
          </div>
          <div className={styles['pagination__prev__link-title']}>
            <span>←</span> {prev.title}
          </div>
        </a>
      </div>
    );
  };

  const renderNextLink = next => {
    if (!next || !next.slug) return null;
    return (
      <div className={styles['pagination__next']}>
        <a className={styles['pagination__next__link']} href={next.slug}>
          <div className={styles['pagination__next__link-date']}>
            {language === 'en' ? formatDate(next.date, 'en') : formatDateMachine(next.date)}
          </div>
          <div className={styles['pagination__next__link-title']}>
            {next.title} <span>→</span>
          </div>
        </a>
      </div>
    );
  };

  return (
    <div className={styles['pagination']}>
      {renderPrevLink(prev)}
      {renderNextLink(next)}
    </div>
  );
};

export default Pagination;
