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
      label: { en: 'About', ja: 'About' },
      path: '/pages/about',
    },
    {
      label: { en: 'Life log', ja: 'Life log' },
      path: '/lifelog',
    },
    {
      label: { en: 'Search', ja: 'Search' },
      path: '/search',
    },
  ],
  author: {
    name: { en: 'Sayaka Ono', ja: 'Sayaka Ono' },
    bio: {
      en: 'Software developer based in Vancouver from Kochi 🇯🇵',
      ja: '高知出身・バンクーバー在住ソフトウェアエンジニア',
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
