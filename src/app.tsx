import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import React from 'react'
import Routes from './router'
import { Provider } from 'react-redux'
import store from './store'
import AppLayout from './components/AppLayout'
import { BrowserRouter } from 'react-router-dom'
import CONFIG from './config'

export const App: React.FC = () => {
    return (
        <div id="app">
            <Provider store={store}>
                <ConfigProvider locale={zh_CN}>
                    <BrowserRouter basename={CONFIG.baseURL}>
                        <AppLayout>
                            <Routes />
                        </AppLayout>
                    </BrowserRouter>
                </ConfigProvider>
            </Provider>
        </div>
    )
}

export default App
