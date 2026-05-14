import { useState, useEffect, useRef } from 'react';
import styles from './Search.module.scss';

const Search = ({ currentPage, language, dates }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [yearOpen, setYearOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const yearRef = useRef(null);
  const monthRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (yearRef.current && !yearRef.current.contains(e.target))
        setYearOpen(false);
      if (monthRef.current && !monthRef.current.contains(e.target))
        setMonthOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchPage = () => {
    if (!year) return undefined;
    let date = null;
    if (!month || month === '00') {
      date = +(year.toString() + '12');
    } else {
      date = +(year.toString() + month.toString());
    }
    if (typeof dates[0] !== 'object') {
      for (let i = 0; i < dates.length; i++) {
        let postedDate = +(dates[i].substr(0, 4) + dates[i].substr(5, 2));
        if (i === 0 && postedDate < date) return 0;
        if (date > postedDate) return i - 1;
        if (i === dates.length - 1) return i;
        if (date === postedDate) return i;
      }
    } else {
      for (let i = 0; i < dates.length; i++) {
        let postedDate = +(dates[i][0].substr(0, 4) + dates[i][0].substr(5, 2));
        if (i === 0 && postedDate < date) return 0;
        if (date > postedDate) return i - 1;
        if (i === dates.length - 1) return i;
        if (
          date <= postedDate &&
          date >= +(dates[i][0].substr(0, 4) + dates[i][1].substr(5, 2))
        ) {
          return i;
        }
      }
    }
  };

  const getLink = () => {
    let page = searchPage();
    if (!page) return language === 'en' ? '/' : '/ja';
    return `/page/${page}${language === 'en' ? '' : '/ja'}`;
  };

  const getYearOptions = () => {
    let start =
      typeof dates[0] === 'object'
        ? +dates[0][0].substr(0, 4)
        : +dates[0].substr(0, 4);
    let last = dates[dates.length - 1];
    let end =
      typeof last === 'object'
        ? +last[last.length - 1].substr(0, 4)
        : +last.substr(0, 4);
    const years = [];
    for (let i = start; i >= end; i--) years.push(i);
    return years;
  };

  const renderYearSelectBox = () => (
    <div ref={yearRef} className={styles['dropdown']}>
      <button
        className={styles['dropdown__trigger']}
        onClick={() => setYearOpen(!yearOpen)}
      >
        {year && year !== '00'
          ? `${year}${language === 'ja' ? '年' : ''}`
          : language === 'en'
            ? 'Year'
            : '年'}
        <span className={styles['dropdown__arrow']}>▾</span>
      </button>
      {yearOpen && (
        <ul className={styles['dropdown__list']}>
          {getYearOptions().map((y) => (
            <li
              key={y}
              aria-selected={String(y) === String(year) || undefined}
              onClick={() => {
                setYear(String(y));
                setYearOpen(false);
              }}
            >
              {y}
              {language === 'ja' ? '年' : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderMonthSelectBox = () => {
    const months =
      language === 'en'
        ? [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]
        : Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
    const placeholder = language === 'en' ? 'Month' : '月';

    return (
      <div ref={monthRef} className={styles['dropdown']}>
        <button
          className={styles['dropdown__trigger']}
          onClick={() => setMonthOpen(!monthOpen)}
        >
          {month && month !== '00' ? months[parseInt(month) - 1] : placeholder}
          <span className={styles['dropdown__arrow']}>▾</span>
        </button>
        {monthOpen && (
          <ul className={styles['dropdown__list']}>
            {months.map((m, i) => {
              const val = String(i + 1).padStart(2, '0');
              return (
                <li
                  key={val}
                  aria-selected={month === val || undefined}
                  onClick={() => {
                    setMonth(val);
                    setMonthOpen(false);
                  }}
                >
                  {m}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  const renderResult = () => {
    const page = searchPage();
    if (year && year !== '00') {
      if (page === currentPage) {
        return (
          <p>
            {language === 'en'
              ? 'You are on the right page :)'
              : 'こちらがお探しのページです！'}
          </p>
        );
      }
      return (
        <a href={getLink()} className={styles['search__select__link']}>
          {language === 'en' ? `Go to page ${page + 1}` : `${page + 1}ページへ`}
        </a>
      );
    }
    if (month && month !== '00') {
      return (
        <p>
          {language === 'en' ? 'Please select year.' : '年をお選びください。'}
        </p>
      );
    }
    return null;
  };

  return (
    <div className={styles['search']}>
      <p>{language === 'en' ? 'Search by year and month?' : 'ブログ検索'}</p>
      <div className={styles['search__select']}>
        {renderYearSelectBox()}
        {renderMonthSelectBox()}
      </div>
      {renderResult()}
    </div>
  );
};

export default Search;
