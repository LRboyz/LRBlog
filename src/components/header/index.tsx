import './style.less'
import React, { useState } from 'react'
import { Switch, useDarkreader } from 'react-darkreader'
import { Button, Layout, Menu, Popover, Radio, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import logo from '@/assets/image/common/logo.png'
import logo_light from '@/assets/image/common/logo_light.png'
import LoginModal from '../login/login.component'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setTheme } from '@/store/systemSlice'

const Header: React.FC = () => {
  const [useLoginModal, setLoginModal] = useState(false)
  const dispatch = useDispatch()
  const [isDark, { toggle }] = useDarkreader(false)
  const history = useHistory()
  const { Header } = Layout
  // const { isDark } = useSelector((state: RootState) => state.system)

  // 修改主题
  const changeTheme = () => {
    toggle()
    // dispatch(setTheme())
  }

  // 主题面板
  const themePanel = () => {
    return (
      // defaultValue = { theme }
      <Radio.Group
        onChange={changeTheme}
        style={{ display: 'flex' }}
        defaultValue={isDark ? 'dark' : 'light'}
      >
        <div
          style={{ padding: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <img
            src="https://6c72-lrblog-0gonx238c9955a8b-1259094485.tcb.qcloud.la/cloudbase-cms/upload/2021-07-26/nxxsvlnnb19ikbjcbev35beri642cajt_.png?sign=81a00b8ee6a90a45b6f2b1a4442f9704&t=1627288759"
            alt=""
            style={{ width: 80, height: 90 }}
          />
          <Radio value={'light'} style={{ marginTop: 20 }}>
            浅色
          </Radio>
        </div>
        <div
          style={{ padding: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <img
            src="https://6c72-lrblog-0gonx238c9955a8b-1259094485.tcb.qcloud.la/cloudbase-cms/upload/2021-07-26/7b1dhi57d7tdzwul9dsuzeqjis1hy7fy_.png?sign=9275edee6c861ffb3e992abce6e7ea37&t=1627288750"
            alt=""
            style={{ width: 80, height: 90 }}
          />
          <Radio value={'dark'} style={{ marginTop: 20 }}>
            深色
          </Radio>
        </div>
      </Radio.Group>
    )
  }

  return (
    <div className="main-header-box">
      <Header className="header">
        <Link to="/">
          <div
            className="logo"
            style={{
              backgroundImage: isDark ? `url(${logo})` : `url(${logo_light})`,
            }}
          />
        </Link>
        <div style={{ flex: 1 }}></div>
        <div className="btn-group">
          {/* 主题面板 */}
          {/* <Popover content={themePanel}>
            <svg style={{ width: 16, height: 16, marginTop: 2 }}>
              <use xlinkHref="#icon-zhuti1" />
            </svg>
          </Popover> */}
          <Switch checked={isDark} onChange={changeTheme} styling="github" />
        </div>
        <Col xs={0} sm={0} md={0} lg={6}>
          <Menu className="nav" mode="horizontal" defaultSelectedKeys={[history.location.pathname]}>
            <Menu.Item key="/">
              <Link to="/">首页</Link>
            </Menu.Item>
            {/* <Menu.Item key="/blog">
              <Link to="/blog">博客</Link>
            </Menu.Item> */}
            <Menu.Item key="/about">
              <Link to="/about">关于我</Link>
            </Menu.Item>
          </Menu>
        </Col>
        {/*<Button*/}
        {/*    shape="round"*/}
        {/*    onClick={() => setLoginModal(true)}*/}
        {/*    style={{ marginLeft: 20 }}*/}
        {/*>*/}
        {/*  登陆*/}
        {/*</Button>*/}
      </Header>
      <LoginModal showLogin={useLoginModal} closeLogin={() => setLoginModal(false)} />
    </div>
  )
}

export default Header
