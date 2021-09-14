import React from 'react'
import { Layout } from "antd"
import AppHeader from './header'
import AppContent from "./content"
import AppFooter from './footer'
import styles from './style.module.less'

export const AppLayout: React.FC = (props) => {
    return (
        <Layout id="app-layout" className={styles.appLayout}>
            <Layout style={{ display: 'block' }}>
                <Layout.Header className={styles.appHeader}>
                    <AppHeader />
                </Layout.Header>
                <Layout.Content className={styles.appContent}>
                    <AppContent>{props.children}</AppContent>
                </Layout.Content>
                <Layout.Footer className={styles.appFooter}>
                    <AppFooter />
                </Layout.Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout
