import './style.less'
import React from 'react'
import avatar from '@/assets/image/common/avatar.png'
import { Image } from 'antd';

const Person: React.FC = () => {
    return (
        <section className="person-wrapper">
            <div className="card">
                <div className="avatar-box">
                    <Image
                        width={160}
                        height={160}
                        src={avatar}
                        preview={false}
                    />
                    <div className="face"></div>
                </div>
                <h2>LRboy</h2>
                <p>Full Stack Developer & WEB Security Enthusiasts</p>
                <p>😈 &nbsp; TypeScript / React / Python / Vue.js</p>
                <p>🤓️ &nbsp; DongGuan / China</p>
            </div>
        </section>
    )
}

export default Person
