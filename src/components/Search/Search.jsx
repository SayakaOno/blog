import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import styles from './Search.module.scss';

/**
 * categoriesList: Array<{ fieldValue: string, totalCount: number }>
 *   Passed as a prop from the Astro page (replaces useCategoriesList hook).
 */
const Search = ({ edges, totalCount, language, categoriesList }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogsInSelectedCategory, setBlogsInSelectedCategory] = useState([]);
  const [number, setNumber] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    setBlogsAndNumber(edges, totalCount);
  }, []);

  const setBlogsAndNumber = (blogs, number = blogs.length) => {
    setBlogs(blogs);
    setNumber(number);
  };

  const onClickCategory = category => {
    if (category === selectedCategory) {
      clearFilter();
      filterBlogs(year, month, '', '');
    } else {
      setSelectedCategory(category);
      let blogs = filterBlogByCategory(category);
      setTags(getTags(blogs));
      setBlogsInSelectedCategory(blogs);
      setSelectedTags([]);
      filterBlogs(year, month, category, null);
    }
  };

  const getTags = blogs => {
    let tags = [];
    blogs.forEach(blog => {
      if (blog.node.frontmatter.tags) {
        tags.push(...blog.node.frontmatter.tags);
      }
    });
    let tagsSet = new Set(tags);
    tags = Array.from(tagsSet);
    return tags;
  };

  const onClickTag = clickedTag => {
    let tags = [];
    if (!selectedTags.length) {
      tags.push(clickedTag);
    } else if (selectedTags.includes(clickedTag)) {
      tags = selectedTags.filter(tag => tag !== clickedTag);
    } else {
      tags = [...selectedTags, clickedTag];
    }
    setSelectedTags(tags);
    filterBlogs(year, month, selectedCategory, tags);
  };

  const filterBlogByCategory = (category, blogs = edges) => {
    return blogs.filter(edge => edge.node.frontmatter.category === category);
  };

  const filterBlogByTags = (tags, blogs = blogsInSelectedCategory) => {
    return blogs.filter(
      blog =>
        blog.node.frontmatter.tags &&
        includesAllTags(tags, blog.node.frontmatter.tags)
    );
  };

  const includesAllTags = (tags, array) => {
    for (let i = 0; i < tags.length; i++) {
      if (!array.includes(tags[i])) return false;
    }
    return true;
  };

  const clearYear = () => {
    setMonth('00');
    setYear('00');
    filterBlogs('', '', selectedCategory, selectedTags);
  };

  const clearMonth = () => {
    setMonth('00');
    filterBlogs(year, '', selectedCategory, selectedTags);
  };

  const clearTagFilter = () => {
    setSelectedTags([]);
    filterBlogs(year, month, selectedCategory, '');
  };

  const clearCategoryFilter = () => {
    setSelectedCategory('');
    setTags([]);
    setSelectedTags([]);
    setBlogsInSelectedCategory([]);
  };

  const clearFilter = () => {
    setYear('');
    setMonth('');
    clearCategoryFilter();
    setBlogsAndNumber(edges, totalCount);
  };

  const getBlogYears = () => {
    return Array.from(
      new Set(edges.map(edge => edge.node.frontmatter.date.substr(0, 4)))
    );
  };

  const onClickClearCategory = () => {
    clearCategoryFilter();
    setBlogsAndNumber(edges, totalCount);
    filterBlogs(year, month, '', '');
  };

  const onYearSelect = event => {
    let year = event.target.value;
    let targetMonth = month;
    if (year === '00') {
      setMonth('00');
      targetMonth = '';
    }
    setYear(year);
    filterBlogs(event.target.value, targetMonth, selectedCategory, selectedTags);
  };

  const filterBlogs = (year, month, category, tags) => {
    let filteredBlogs = edges.slice();
    if (month && month !== '00') {
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.node.frontmatter.date.substr(0, 7) === `${year}-${month}`
      );
    } else if (year && year !== '00') {
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.node.frontmatter.date.substr(0, 4) === year
      );
    }
    if (tags && tags.length) {
      filteredBlogs = filterBlogByCategory(category, filteredBlogs);
      filteredBlogs = filterBlogByTags(tags, filteredBlogs);
    } else if (category) {
      filteredBlogs = filterBlogByCategory(category, filteredBlogs);
    }
    setBlogsAndNumber(filteredBlogs);
  };

  const onMonthSelect = event => {
    setMonth(event.target.value);
    filterBlogs(year, event.target.value, selectedCategory, selectedTags);
  };

  const renderYearSelect = () => (
    <div className={styles['search__filter__date-year']}>
      <select value={year} onChange={onYearSelect}>
        <option key="00" value="00">{language === 'en' ? 'Year' : '年'}</option>
        {getBlogYears().map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      {year && year !== '00' ? renderClearButton(clearYear) : null}
    </div>
  );

  const renderMonthSelect = () => {
    if (language === 'en') {
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return (
        <div className={styles['search__filter__date-month']}>
          <select value={month} onChange={onMonthSelect}>
            <option key="00" value="00">Month</option>
            {months.map((m, i) => {
              const val = String(i + 1).padStart(2, '0');
              return <option key={val} value={val}>{m}</option>;
            })}
          </select>
          {month && month !== '00' ? renderClearButton(clearMonth) : null}
        </div>
      );
    }
    let options = [];
    for (let i = 1; i <= 12; i++) {
      const val = String(i).padStart(2, '0');
      options.push(<option key={val} value={val}>{i + '月'}</option>);
    }
    return (
      <select value={month} onChange={onMonthSelect}>
        <option key="00" value="00">月</option>
        {options}
      </select>
    );
  };

  const renderCategories = () => (
    <div className={styles['search__filter__categories']}>
      <div className={styles['search__filter__categories-title']}>
        <span>{language === 'en' ? 'Category' : 'カテゴリー'}</span>{' '}
        {selectedCategory ? renderClearButton(onClickClearCategory) : null}
      </div>
      <ul className={styles['search__filter__categories-list']}>
        {categoriesList.map(category => (
          <li
            onClick={() => onClickCategory(category.fieldValue)}
            key={category.fieldValue}
            className={
              selectedCategory && selectedCategory.includes(category.fieldValue)
                ? styles['search__filter__categories-list-item-selected']
                : ''
            }
          >
            {category.fieldValue}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTags = () => (
    <div className={styles['search__filter__tags']}>
      <div className={styles['search__filter__tags-title']}>
        <span>{language === 'en' ? 'Tags' : 'タグ'}</span>{' '}
        {selectedTags.length ? renderClearButton(clearTagFilter) : null}
      </div>
      <ul className={styles['search__filter__tags-list']}>
        {tags.map(tag => (
          <li
            onClick={() => onClickTag(tag)}
            key={tag}
            className={
              selectedTags.includes(tag)
                ? styles['search__filter__tags-list-item-selected']
                : ''
            }
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderClearButton = clearFunction => (
    <span onClick={clearFunction} className={styles['search__filter__clear-specific']}>×</span>
  );

  const renderClearFilterButton = () => (
    <div>
      <span onClick={clearFilter} className={styles['search__filter__clear']}>
        {language === 'en' ? '→ All posts' : '→ 全ブログ'}
      </span>
    </div>
  );

  const renderCount = () => (
    <div className={styles['search__count']}>
      {selectedCategory || (year && year !== '00')
        ? number === 0
          ? language === 'en' ? 'No posts found' : '該当ブログがありません'
          : language === 'en' ? `${number} post${number > 1 ? 's' : ''} found` : `該当ブログ: ${number}件`
        : language === 'en' ? `${number} post${number > 1 ? 's' : ''}` : `全${number}件`}
    </div>
  );

  return (
    <div className={styles['search']}>
      <h1 className={styles['search__title']}>
        {language === 'en' ? 'Search' : '検索'}
      </h1>
      <div className={styles['search__filter']}>
        <div className={styles['search__filter__date']}>
          {renderYearSelect()}
          {year && year !== '00' ? renderMonthSelect() : null}
        </div>
        {renderCategories()}
        {tags.length ? renderTags() : null}
        {(year && year !== '00') || selectedCategory ? renderClearFilterButton() : null}
      </div>
      {renderCount()}
      <BlogList
        edges={blogs}
        language={language}
        filters={
          year || month || selectedCategory
            ? { year, month, selectedCategory, selectedTags }
            : null
        }
      />
    </div>
  );
};

export default Search;
