import { HOME } from './constants'
import { IRouteProps } from './types'
import Index from '@/page/index/index'
import About from '@/page/about/index'
import ArticleDetail from '@/components/Archive/article/detail'
import Home from '@/page/home'

const routesMap: IRouteProps[] = [
  {
    path: HOME.INDEX.path,
    component: Index,
    meta: {
      // 当前页面是否需要登录状态
      requiresAuth: false,
      // 网页标题
      title: HOME.INDEX.name,
    },
    childrenRoutes: [
      {
        path: HOME.INDEX.path,
        component: Home,
        exact: true,
        meta: {
          title: HOME.INDEX.name,
        },
      },
      {
        path: HOME.BLOG_CATEGORY.path,
        component: Home,
        exact: true,
        meta: {
          title: HOME.BLOG_CATEGORY.name,
        },
      },
      {
        path: HOME.BLOG_DETAIL.path,
        component: ArticleDetail,
        exact: true,
        meta: {
          title: HOME.BLOG_DETAIL.name,
        },
      },
      {
        path: HOME.ABOUT.path,
        component: About,
        exact: true,
        meta: {
          title: HOME.ABOUT.name,
        },
      },
    ],
  },
]

// const Base = lazy(() => import('@/views/home/setting/base'))
// const InnerMessage = lazy(() => import('@/views/home/setting/inner-message'))
// const Notification = lazy(() => import('@/views/home/setting/notification'))
// const Account = lazy(() => import('@/views/home/setting/account'))

export default routesMap
