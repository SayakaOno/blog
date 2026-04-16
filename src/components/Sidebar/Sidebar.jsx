import React from 'react';
import Author from './Author';
import LanguageSwitcher from './LanguageSwitcher';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { getLanguage } from '../../utils/languageContext';

/**
 * Props:
 *   siteMetadata    – the full siteMetadata object (from src/data/siteMetadata.js)
 *   pathname        – current URL pathname (Astro.url.pathname)
 *   isIndex         – boolean, show author as <h1> on index pages
 *   otherLanguagePath – string | null, where the language switcher should navigate
 */
const Sidebar = ({ siteMetadata, pathname, isIndex, otherLanguagePath }) => {
  const { author, copyright, menu } = siteMetadata;
  const language = getLanguage(pathname);

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} language={language} />
        <LanguageSwitcher
          language={language}
          otherLanguagePath={otherLanguagePath}
        />
        <Menu menu={menu} language={language} pathname={pathname} />
        <Contacts contacts={author.contacts} language={language} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
