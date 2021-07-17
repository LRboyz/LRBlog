import React, { useEffect } from 'react'
import routesMap from './routes'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { DispatchProp, connect } from 'react-redux'
import CONFIG from '../config'
import { PrivateRouteComponent } from '../components/private-route'

// import { validateLocalStatus } from '@/store/actions/user'

const Routes: React.FC<DispatchProp> = function ({ dispatch }) {

  // useEffect(() => {
  //   dispatch(validateLocalStatus())
  // }, [])

  return (
    <Router basename={CONFIG.baseURL}>
      <Switch>
        {routesMap.map((route, idx) => (
          <PrivateRouteComponent {...route} key={idx} />
        ))}
      </Switch>
    </Router>
  )
}

export default connect()(Routes)
