// @flow
import React from 'react';
import { getContactHref, getIcon } from '../../../utils';
import Icon from '../../Icon';
import styles from './Contacts.module.scss';

type Props = {
  contacts: {
    [string]: string
  }
};

const Contacts = ({ contacts, language }: Props) => (
  <div className={styles['contacts']}>
    <ul className={styles['contacts__list']}>
      {Object.keys(contacts).map(name =>
        !contacts[name] ? null : (
          <li className={styles['contacts__list-item']} key={name}>
            <span className={styles['contacts__list-item-tooltip']}>
              {name}
            </span>
            <a
              className={styles['contacts__list-item-link']}
              href={getContactHref(name, contacts[name][language])}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon icon={getIcon(name)} />
            </a>
          </li>
        )
      )}
    </ul>
  </div>
);

export default Contacts;
