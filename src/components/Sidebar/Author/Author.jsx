import styles from './Author.module.scss';

const Author = ({ author, isIndex, language }) => {
  const home = language === 'en' ? '/' : '/ja';
  return (
    <div className={styles['author']}>
      {isIndex ? (
        <h1 className={styles['author__title']}>
          <a className={styles['author__title-link']} href={home}>
            {author.name[language]}
          </a>
        </h1>
      ) : (
        <h2 className={styles['author__title']}>
          <a className={styles['author__title-link']} href={home}>
            {author.name[language]}
          </a>
        </h2>
      )}
      <p className={styles['author__subtitle']}>{author.bio[language]}</p>
    </div>
  );
};

export default Author;
