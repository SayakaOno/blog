// @flow
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import type { Node as ReactNode } from 'react';
import { navigate } from 'gatsby';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: object,
  description?: object
};

const Layout = ({ children, title, description, language }: Props) => {
  useEffect(() => {
    if (!language && !sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
    } else {
      if (!sessionStorage.getItem('visited')) {
        const browserLanguage =
          window.navigator.language || window.navigator.userLanguage;
        sessionStorage.setItem('visited', 'true');
        if (browserLanguage === 'ja') {
          navigate('/ja');
        }
      }
    }
  }, []);

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
