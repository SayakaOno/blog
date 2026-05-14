import { useState, useEffect, useRef } from 'react';
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
  const [yearOpen, setYearOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const yearRef = useRef(null);
  const monthRef = useRef(null);

  useEffect(() => {
    setBlogsAndNumber(edges, totalCount);
  }, []);

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

  const setBlogsAndNumber = (blogs, number = blogs.length) => {
    setBlogs(blogs);
    setNumber(number);
  };

  const onClickCategory = (category) => {
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

  const getTags = (blogs) => {
    let tags = [];
    blogs.forEach((blog) => {
      if (blog.node.frontmatter.tags) {
        tags.push(...blog.node.frontmatter.tags);
      }
    });
    let tagsSet = new Set(tags);
    tags = Array.from(tagsSet);
    return tags;
  };

  const onClickTag = (clickedTag) => {
    let tags = [];
    if (!selectedTags.length) {
      tags.push(clickedTag);
    } else if (selectedTags.includes(clickedTag)) {
      tags = selectedTags.filter((tag) => tag !== clickedTag);
    } else {
      tags = [...selectedTags, clickedTag];
    }
    setSelectedTags(tags);
    filterBlogs(year, month, selectedCategory, tags);
  };

  const filterBlogByCategory = (category, blogs = edges) => {
    return blogs.filter((edge) => edge.node.frontmatter.category === category);
  };

  const filterBlogByTags = (tags, blogs = blogsInSelectedCategory) => {
    return blogs.filter(
      (blog) =>
        blog.node.frontmatter.tags &&
        includesAllTags(tags, blog.node.frontmatter.tags),
    );
  };

  const includesAllTags = (tags, array) => {
    for (let i = 0; i < tags.length; i++) {
      if (!array.includes(tags[i])) return false;
    }
    return true;
  };

  const clearYear = () => {
    setYear('00');
    filterBlogs('', month, selectedCategory, selectedTags);
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
      new Set(edges.map((edge) => edge.node.frontmatter.date.substr(0, 4))),
    );
  };

  const onClickClearCategory = () => {
    clearCategoryFilter();
    setBlogsAndNumber(edges, totalCount);
    filterBlogs(year, month, '', '');
  };

  const onYearSelect = (value) => {
    let targetMonth = month;
    if (value === '00') {
      setMonth('00');
      targetMonth = '';
    }
    setYear(value);
    filterBlogs(value, targetMonth, selectedCategory, selectedTags);
  };

  const filterBlogs = (year, month, category, tags) => {
    let filteredBlogs = edges.slice();
    if (year && year !== '00' && month && month !== '00') {
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.node.frontmatter.date.substr(0, 7) === `${year}-${month}`,
      );
    } else if (year && year !== '00') {
      filteredBlogs = filteredBlogs.filter(
        (blog) => blog.node.frontmatter.date.substr(0, 4) === year,
      );
    } else if (month && month !== '00') {
      filteredBlogs = filteredBlogs.filter(
        (blog) => blog.node.frontmatter.date.substr(5, 2) === month,
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

  const onMonthSelect = (value) => {
    setMonth(value);
    filterBlogs(year, value, selectedCategory, selectedTags);
  };

  const renderYearSelect = () => (
    <div className={styles['search__filter__date-year']} ref={yearRef}>
      <div className={styles['dropdown']}>
        <button
          className={styles['dropdown__trigger']}
          onClick={() => setYearOpen(!yearOpen)}
        >
          {year && year !== '00' ? year : language === 'en' ? 'Year' : '年'}
          <span className={styles['dropdown__arrow']}>▾</span>
        </button>
        {yearOpen && (
          <ul className={styles['dropdown__list']}>
            {getBlogYears().map((y) => (
              <li
                key={y}
                aria-selected={year === y || undefined}
                onClick={() => {
                  onYearSelect(y);
                  setYearOpen(false);
                }}
              >
                {y}
              </li>
            ))}
          </ul>
        )}
      </div>
      {year && year !== '00' ? renderClearButton(clearYear) : null}
    </div>
  );

  const renderMonthSelect = () => {
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
      <div className={styles['search__filter__date-month']} ref={monthRef}>
        <div className={styles['dropdown']}>
          <button
            className={styles['dropdown__trigger']}
            onClick={() => setMonthOpen(!monthOpen)}
          >
            {month && month !== '00'
              ? months[parseInt(month) - 1]
              : placeholder}
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
                      onMonthSelect(val);
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
        {month && month !== '00' ? renderClearButton(clearMonth) : null}
      </div>
    );
  };

  const renderCategories = () => (
    <div className={styles['search__filter__categories']}>
      <div className={styles['search__filter__categories-title']}>
        <span>{language === 'en' ? 'Category' : 'カテゴリー'}</span>{' '}
        {selectedCategory ? renderClearButton(onClickClearCategory) : null}
      </div>
      <ul className={styles['search__filter__categories-list']}>
        {categoriesList.map((category) => (
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
        {tags.map((tag) => (
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

  const renderClearButton = (clearFunction) => (
    <span
      onClick={clearFunction}
      className={styles['search__filter__clear-specific']}
    >
      ×
    </span>
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
      {selectedCategory || (year && year !== '00') || (month && month !== '00')
        ? number === 0
          ? language === 'en'
            ? 'No posts found'
            : '該当ブログがありません'
          : language === 'en'
            ? `${number} post${number > 1 ? 's' : ''} found`
            : `該当ブログ: ${number}件`
        : language === 'en'
          ? `${number} post${number > 1 ? 's' : ''}`
          : `全${number}件`}
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
          {renderMonthSelect()}
        </div>
        {renderCategories()}
        {tags.length ? renderTags() : null}
        {(year && year !== '00') ||
        (month && month !== '00') ||
        selectedCategory
          ? renderClearFilterButton()
          : null}
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
