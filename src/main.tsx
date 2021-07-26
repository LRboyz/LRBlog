import React, { useEffect } from "react"
import "./main.less"
import "antd/dist/antd.compact.min.css"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConfigProvider } from "antd"
import Routes from "./router"
import zh_CN from "antd/lib/locale-provider/zh_CN"
import store from "./store"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <div className="app">
          <Routes />
        </div>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
