import React from 'react';
import { formatDate } from '../../../utils/format-date';
import styles from './Meta.module.scss';

const Meta = ({ date, updatedDate, language }) => (
  <div className={styles['meta']}>
    <div className={styles['meta__date']}>
      <div>
        {`${language === 'en' ? 'Published: ' : '投稿日: '} `}
        {formatDate(date, language)}
      </div>
      {updatedDate && (
        <div>
          {language === 'en' ? ' Updated: ' : ' 更新日: '}
          {formatDate(updatedDate, language)}
        </div>
      )}
    </div>
  </div>
);

export default Meta;
