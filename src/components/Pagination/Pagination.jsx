import React from 'react';
import classNames from 'classnames/bind';
import { PAGINATION } from '../../constants';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = ({ prevPagePath, nextPagePath, hasNextPage, hasPrevPage }) => {
  const prevClassName = cx({
    'pagination__prev-link': true,
    'pagination__prev-link--disable': !hasPrevPage
  });

  const nextClassName = cx({
    'pagination__next-link': true,
    'pagination__next-link--disable': !hasNextPage
  });

  return (
    <div className={styles['pagination']}>
      <div className={styles['pagination__prev']}>
        <a rel="prev" href={hasPrevPage ? prevPagePath : '/'} className={prevClassName}>
          {PAGINATION.PREV_PAGE}
        </a>
      </div>
      <div className={styles['pagination__next']}>
        <a rel="next" href={hasNextPage ? nextPagePath : '/'} className={nextClassName}>
          {PAGINATION.NEXT_PAGE}
        </a>
      </div>
    </div>
  );
};

export default Pagination;
