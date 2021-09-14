import { RouteConfig } from './constants'
import { IRouteProps } from './types'
import Home from '@/page/home'
import ArticleDetail from '@/components/Archive/article/detail'
import About from '@/page/about'


const routesMap: IRouteProps[] = [
  {
    path: RouteConfig.INDEX.path,
    component: About,
    exact: true,
    meta: {
      // 当前页面是否需要登录状态
      requiresAuth: false,
      // 网页标题
      title: RouteConfig.INDEX.name,
    },
  },
  {
    path: RouteConfig.BLOG.path,
    component: Home,
    meta: {
      // 当前页面是否需要登录状态
      requiresAuth: false,
      // 网页标题
      title: RouteConfig.BLOG_DETAIL.name,
    },
    childrenRouteConfig: [
      {
        path: RouteConfig.BLOG_CATEGORY.path,
        component: Home,
        exact: true,
        meta: {
          title: RouteConfig.BLOG_CATEGORY.name,
        },
      },
      // {
      //   path: RouteConfig.BLOG_DETAIL.path,
      //   component: ArticleDetail,
      //   exact: true,
      //   meta: {
      //     title: RouteConfig.BLOG_DETAIL.name,
      //   },
      // },
    ],
  },
  {
    path: RouteConfig.BLOG_DETAIL.path,
    component: ArticleDetail,
    exact: true,
    meta: {
      // 当前页面是否需要登录状态
      requiresAuth: false,
      // 网页标题
      title: RouteConfig.BLOG_DETAIL.name,
    },
  },
]

// const Base = lazy(() => import('@/views/home/setting/base'))
// const InnerMessage = lazy(() => import('@/views/home/setting/inner-message'))
// const Notification = lazy(() => import('@/views/home/setting/notification'))
// const Account = lazy(() => import('@/views/home/setting/account'))

export default routesMap
