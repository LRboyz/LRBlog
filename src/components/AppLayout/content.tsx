import React from 'react'
import styles from './style.module.less'

export const AppContent: React.FC = (props) => {
    return (
        <div className={styles.pageContainer}>
            <div></div>
            <div>
                {/* 中间内容 */}
                {props.children}
            </div>
            <div></div>
        </div>
    )
}

export default AppContent
