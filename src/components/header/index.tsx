import './less/header.less'
import React, { useState } from 'react'
import { Switch, useDarkreader } from 'react-darkreader'
import { Button, Layout } from 'antd'
import LoginModal from '../login/login.component'

const Header: React.FC = () => {
    const [useLoginModal, setLoginModal] = useState(false);
    const [isDark, { toggle }] = useDarkreader(false)
    const { Header } = Layout
    return (
        <Header className="header">
            <div className="logo" />
            <div style={{ flex: 1 }}></div>
            {/* <span className="adage">心之所向,素履以往 生如逆旅,一苇以航</span> */}
            {/* <div className="search">
          <Search placeholder="搜索您喜欢的文章......" style={{ width: 200, marginLeft: 50 }} />
        </div> */}
            <div className="btn-group">
                {/* 主题面板 */}
                {/* <Popover content={themePanel}>
                    <FormatPainterFilled className="themeIcon" />
                </Popover> */}
                {/* 登录按钮 */}
                <Switch checked={isDark} onChange={toggle} styling="github" />
                <Button shape="round" onClick={() => setLoginModal(true)} style={{ marginLeft: 20 }}>
                    登陆
                </Button>
            </div>
            <LoginModal showLogin={useLoginModal} closeLogin={() => setLoginModal(false)} />
        </Header>
    )
}

export default Header
