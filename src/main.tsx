import React from "react";
import "antd/dist/antd.compact.min.css";
import ReactDOM from "react-dom";
// import '@/assets/styles/tailwind.css'
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

import Routes from "./router";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import store from "./store";
// import store from '@/store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <Routes />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
