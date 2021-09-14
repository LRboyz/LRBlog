// 路由常量配置信息

export const RouteConfig = {
  // LOGIN: { name: '登录', path: ['/', '/login'] },

  INDEX: { name: 'LRboy的个人网站', path: '/' },

  ABOUT: { name: '关于我', path: '/about' },

  BLOG: { name: '博客文章', path: '/blog' },

  BLOG_CATEGORY: { name: '分类文章', path: '/blog/:id' },

  BLOG_DETAIL: { name: '文章详情', path: '/blog/detail/:article_id' },

  NO_MATCH: { name: '404 Not Found', path: '*' },
}
