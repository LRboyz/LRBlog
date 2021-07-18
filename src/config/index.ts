const isProduction = import.meta.env.PROD;
const isDevelopment = !isProduction;

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
};

export default CONFIG;
