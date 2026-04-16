import React from 'react';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import Pagination from './Pagination';
import RelatedPosts from './RelatedPosts';
import styles from './Post.module.scss';

const Post = ({ post, language, prev, next, author, siteUrl, disqusShortname, children }) => {
  const { categorySlug, tagSlugs, slug } = post.fields;
  const { category, tags, title, date, updatedDate } = post.frontmatter;
  const home = language === 'en' ? '/' : '/ja';

  return (
    <div className={styles['post']}>
      <div className={styles['post__inner']}>
        <div className={styles['post__content']}>
          <Content
            title={title}
            language={language}
            fields={post.fields}
            frontmatter={post.frontmatter}
          >
            {children}
          </Content>
        </div>

        <div className={styles['post__footer']}>
          <Meta date={date} updatedDate={updatedDate} language={language} />
          <div className={styles['post__footer-category']}>
            {language === 'en' ? 'Category: ' : 'カテゴリー： '}
            <a href={`${categorySlug}${language === 'en' ? '' : '/ja'}`}>
              {category}
            </a>
          </div>
          {tags && tagSlugs && (
            <Tags tags={tags} tagSlugs={tagSlugs} language={language} />
          )}
          {post.frontmatter.related ? (
            <RelatedPosts language={language} posts={post.frontmatter.related} />
          ) : null}
          <a className={styles['post__home-button']} href={home}>
            {language === 'en' ? '← Back' : '← もどる'}
          </a>
          <Pagination language={language} prev={prev} next={next} />
          <Author author={author} language={language} />
        </div>

        <div className={styles['post__comments']}>
          <Comments
            postSlug={slug}
            postTitle={title}
            siteUrl={siteUrl}
            disqusShortname={disqusShortname}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
