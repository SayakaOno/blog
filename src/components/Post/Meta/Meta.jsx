// @flow
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  date: string
};

const Meta = ({ date, updatedDate, language }: Props) => (
  <div className={styles['meta']}>
    <div className={styles['meta__date']}>
      <div>
        {`${language === 'en' ? 'Published: ' : '投稿日: '} `}
        {moment(date).format(
          language === 'en' ? 'MMMM D, YYYY' : 'YYYY年M月D日'
        )}
      </div>
      {updatedDate && (
        <div>
          {language === 'en' ? ' Updated: ' : ' 更新日: '}
          {moment(updatedDate).format(
            language === 'en' ? 'MMMM D, YYYY' : 'YYYY年M月D日'
          )}
        </div>
      )}
    </div>
  </div>
);

export default Meta;
