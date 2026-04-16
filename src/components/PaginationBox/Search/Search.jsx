import React, { useState } from 'react';
import styles from './Search.module.scss';

const Search = ({ currentPage, language, dates }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

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
        if (date <= postedDate && date >= +(dates[i][0].substr(0, 4) + dates[i][1].substr(5, 2))) {
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

  const renderYearSelectBox = () => {
    let yearOptions = [];
    let start = typeof dates[0] === 'object' ? +dates[0][0].substr(0, 4) : +dates[0].substr(0, 4);
    let last = dates[dates.length - 1];
    let end = typeof last === 'object' ? +last[last.length - 1].substr(0, 4) : +last.substr(0, 4);
    for (let i = start; i >= end; i--) {
      yearOptions.push(<option key={i} value={i}>{i + '年'}</option>);
    }
    return (
      <select value={year} onChange={e => setYear(e.target.value)}>
        <option key="00" value="00">{language === 'en' ? 'Year' : '年'}</option>
        {yearOptions}
      </select>
    );
  };

  const renderMonthSelectBox = () => {
    if (language === 'en') {
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return (
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option key="00" value="00">Month</option>
          {months.map((m, i) => {
            const val = String(i + 1).padStart(2, '0');
            return <option key={val} value={val}>{m}</option>;
          })}
        </select>
      );
    }
    let options = [];
    for (let i = 1; i <= 12; i++) {
      const val = String(i).padStart(2, '0');
      options.push(<option key={val} value={val}>{i + '月'}</option>);
    }
    return (
      <select value={month} onChange={e => setMonth(e.target.value)}>
        <option key="00" value="00">月</option>
        {options}
      </select>
    );
  };

  const renderResult = () => {
    const page = searchPage();
    if (year && year !== '00') {
      if (page === currentPage) {
        return <p>{language === 'en' ? 'You are on the right page :)' : 'こちらがお探しのページです！'}</p>;
      }
      return (
        <a href={getLink()} className={styles['search__select__link']}>
          {language === 'en' ? `Go to page ${page + 1}` : `${page + 1}ページへ`}
        </a>
      );
    }
    if (month && month !== '00') {
      return <p>{language === 'en' ? 'Please select year.' : '年をお選びください。'}</p>;
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
