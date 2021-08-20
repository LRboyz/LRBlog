import React, { useEffect } from 'react'
import '@/assets/styles/global.less'
import Routes from './router'
import 'antd/dist/antd.compact.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <Routes />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
