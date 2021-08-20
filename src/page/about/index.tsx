import styles from './style.module.less'
import React from 'react'
import avatar from '@/assets/image/common/avatar.png'
import { Image } from 'antd'

const About: React.FC = () => {
    return (
        <div className={styles.personWrapper}>
            <div className={styles.card}>
                <div className={styles.avatarBox}>
                    <Image
                        width={160}
                        height={160}
                        src={avatar}
                        preview={false}
                    />

                </div>
                <h2>LRboy</h2>
                <p>Full Stack Developer & WEB Security Enthusiasts</p>
                <p>😈 &nbsp; TypeScript / React / Python / Vue.js</p>
                <p>🤓️ &nbsp; DongGuan / China</p>
            </div>
        </div>
    )
}

export default About
