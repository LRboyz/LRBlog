import React, { useEffect } from 'react'
import routesMap from './routes'
import { RouteConfig } from './constants'
import About from '@/page/about'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DispatchProp, connect } from 'react-redux'
import CONFIG from '../config'
import PrivateRouteComponent from '@/components/auth/private-route'
// import { PrivateRouteComponent } from '../components/private-route'

// import { validateLocalStatus } from '@/store/actions/user'

const Routes: React.FC<DispatchProp> = function ({ dispatch }) {

  // useEffect(() => {
  //   dispatch(validateLocalStatus())
  // }, [])

  return (
    <Switch>
      {routesMap.map((route, idx) => (
        <PrivateRouteComponent {...route} key={idx} />
      ))}
    </Switch>
  )
}

export default connect()(Routes)
