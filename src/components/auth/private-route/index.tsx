import React from 'react'
import qs from 'query-string'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import CONFIG from '@/config'
import { RouteConfig } from '@/router/constants'
// import { StoreState } from '@/store/index'


// type Props = IRouteProps & ReturnType<typeof mapStateToProps>

const PrivateRoute: React.FC<any> = function ({
  component: Component,
  childrenRoutes,
  isLogin,
  ...rest
}) {
  const { meta } = rest
  const location = useLocation()
  const querySearch = location.search

  if (meta) {
    if (meta.title) {
      document.title = `${meta.title} - ${CONFIG.title}`
    } else {
      document.title = CONFIG.title
    }
  }

  // 验证权限
  const auth = function () {
    if (meta?.requiresAuth) {
      if (isLogin) {
        return true
      }
      return false
    }
    return true
  }()

  if (meta?.isLoginToRouteConfig && isLogin) {
    const redirectUrl = qs.parse(location.search).redirectUrl as string
    const url = redirectUrl || (RouteConfig.INDEX.path + location.search)
    return <Redirect to={url} />
  }

  return (
    <Route render={props => {
      return (
        auth ? (
          <Component {...props} {...rest}>
            {Array.isArray(childrenRoutes) ? (
              <Switch>
                {childrenRoutes.map((route, idx: number) => (
                  <PrivateRouteComponent {...route} key={idx} />
                ))}
              </Switch>
            ) : null}
          </Component>
        ) : (
          <Redirect to={{
            pathname: '/',
            search: `?redirectUrl=${props.location.pathname}${querySearch}`
          }} />
        )
      )
    }} />
  )
}

// const mapStateToProps = (state: any) => {
//   return {
//     isLogin: state.user.isLogin
//   }
// }

export const PrivateRouteComponent = connect()(PrivateRoute)

export default PrivateRouteComponent
