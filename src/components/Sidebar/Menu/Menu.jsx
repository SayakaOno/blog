import { getIcon } from '../../../utils';
import Icon from '../../Icon';
import styles from './Menu.module.scss';

const Menu = ({ menu, language, pathname }) => {
  const isActive = (itemPath) => {
    const fullPath = `${itemPath}${language === 'en' ? '' : '/ja'}`;
    if (itemPath === '/') {
      return pathname === '/' || pathname === '/ja' || pathname === '/ja/';
    }
    return pathname.startsWith(fullPath);
  };

  return (
    <nav className={styles['menu']}>
      <ul className={styles['menu__list']}>
        {menu.map(item => {
          const href = language === 'en' ? item.path : (item.path === '/' ? '/ja' : `${item.path}/ja`);
          const active = isActive(item.path);
          return (
            <li className={styles['menu__list-item']} key={item.path}>
              <a
                href={href}
                className={`${styles['menu__list-item-link']}${active ? ' ' + styles['menu__list-item-link--active'] : ''}`}
              >
                <Icon icon={getIcon(item.label.en.toLowerCase())} />
                <span>{item.label[language]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
