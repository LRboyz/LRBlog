import { lazy } from 'react'


import { HOME } from './constants'
// import { IRouteProps } from '@/router/types'
import { IRouteProps } from './types'
import LayoutPage from '@/view/Layout'
import aboutPage from '@/view/about'
import personPage from '@/view/person'
import blogPage from '@/view/blog'


const routesMap: IRouteProps[] = [
  {
    path: HOME.INDEX.path,
    component: LayoutPage,
    meta: {
      // 当前页面是否需要登录状态
      requiresAuth: false,
      // 网页标题
      title: HOME.INDEX.name,
    },
    childrenRoutes: [
      {
        path: HOME.INDEX.path,
        component: personPage,
        exact: true,
        meta: {
          title: HOME.INDEX.name
        }
      },
      {
        path: HOME.ABOUT.path,
        component: aboutPage,
        exact: true,
        meta: {
          title: HOME.ABOUT.name
        }
      },
      {
        path: HOME.BLOG.path,
        component: blogPage,
        exact: true,
        meta: {
          title: HOME.BLOG.name
        }
      }
    ]
  },
]

// const Base = lazy(() => import('@/views/home/setting/base'))
// const InnerMessage = lazy(() => import('@/views/home/setting/inner-message'))
// const Notification = lazy(() => import('@/views/home/setting/notification'))
// const Account = lazy(() => import('@/views/home/setting/account'))


export default routesMap
