import { createRef } from 'react';
import { navigate } from 'astro:transitions/client';
import styles from './LanguageSwitcher.module.scss';

/**
 * otherLanguagePath: string | null
 *   - string → the URL to switch to (other language version exists)
 *   - null   → the other language version doesn't exist (button disabled)
 */
const LanguageSwitcher = ({ language, otherLanguagePath }) => {
  const ref = createRef();

  const handleSwitch = (clickedLang) => {
    if (clickedLang === language || !otherLanguagePath) return;
    if (ref.current) {
      ref.current.style.left = clickedLang === 'ja' ? '50%' : '0';
    }
    setTimeout(() => {
      navigate(otherLanguagePath);
    }, 30);
  };

  const pointerClass = (lang) => {
    const canSwitch = lang !== language && !!otherLanguagePath;
    return canSwitch
      ? styles['language-switcher__languages__pointer']
      : styles['language-switcher__languages__unavailable'];
  };

  return (
    <div className={styles['language-switcher']}>
      <div
        ref={ref}
        className={styles['language-switcher__back']}
        style={{ left: language === 'en' ? 0 : '50%' }}
      />
      <div className={styles['language-switcher__languages']}>
        <span
          onClick={() => handleSwitch('en')}
          className={`${language === 'en' ? styles['language-switcher__languages-active'] : ''} ${pointerClass('en')}`}
        >
          A
        </span>
        <span
          onClick={() => handleSwitch('ja')}
          className={`${language === 'ja' ? styles['language-switcher__languages-active'] : ''} ${pointerClass('ja')}`}
        >
          あ
        </span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
