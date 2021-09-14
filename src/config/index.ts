export const isProduction = import.meta.env.PROD
export const isDevelopment = !isProduction

const CONFIG = {
  // 路由 basename
  baseURL: "/",
  // 网页标题
  title: "LRBlog",
  http: {
    baseURL: isDevelopment
      ? "https://lrboy.cn/cms/v1.0"
      : "https://localhost:5000/api",
  },
  pageConfig: {
    limit: 5,
  },
  github: {
    clientId: isProduction ? '319b0fbd0d41965eecb9' : '319b0fbd0d41965eecb9',
    // callbackURL 不可随意更改, 否则需要与服务端配置文件一同修改
    callbackURL: `${isProduction ? 'http://localhost:7000' : 'http://localhost:5000/v1/book/auth'}`,
    repositoryUrl: 'https://github.com/LRboyz/LRBlog',
    bug: 'https://github.com/LRboyz/LRBlog/issues'
  }
}

export default CONFIG
