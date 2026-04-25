const siteMetadata = {
  url: 'https://blog.sayaka-ono.com',
  pathPrefix: '/',
  title: 'Blog by Sayaka Ono',
  titleJa: 'ブログ by Sayaka Ono',
  subtitle: 'Blogs about what I learned as a developer.',
  subtitleJa:
    'ディベロッパーとしてバンクーバーで就職して学んだことや日々のこと。',
  copyright: `© ${new Date().getFullYear()} Sayaka Ono`,
  disqusShortname: 'blog-by-sayakaono',
  postsPerPage: 10,
  googleAnalyticsId: 'UA-146464931-1',
  menu: [
    {
      label: { en: 'Home', ja: 'ホーム' },
      path: '/',
    },
    {
      label: { en: 'About', ja: 'について' },
      path: '/pages/about',
    },
    {
      label: { en: 'Search', ja: '検索' },
      path: '/search',
    },
    {
      label: { en: 'Contact', ja: 'コンタクト' },
      path: '/pages/contacts',
    },
  ],
  author: {
    name: { en: 'Sayaka Ono', ja: 'Sayaka Ono' },
    bio: {
      en: 'Developer based in Vancouver.',
      ja: '高知出身・バンクーバー在住ディベロッパー。',
    },
    contacts: {
      portfolio: {
        en: 'https://sayaka-ono.com',
        ja: 'https://sayaka-ono.com',
      },
      linkedin: {
        en: 'https://www.linkedin.com/in/sayakaono/',
        ja: 'https://www.linkedin.com/in/sayakaono/',
      },
      github: {
        en: 'SayakaOno',
        ja: 'SayakaOno',
      },
      rss: { en: '/rss.xml', ja: '/rss.xml' },
    },
  },
};

export default siteMetadata;
