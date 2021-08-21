import styles from './style.module.less'
import React, { useState } from 'react'
import { Switch, useDarkreader } from 'react-darkreader'
import { Button, Layout, Menu, Popover, Radio, Row, Col, Avatar, Spin, Dropdown, } from 'antd'
import { Link } from 'react-router-dom'
import logo from '@/assets/image/common/logo.png'
import logo_light from '@/assets/image/common/logo_light.png'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { LogoutOutlined, PoweroffOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { HOME } from '@/router/constants'
import LoginModal from '@/components/auth/login/login.component'

const Header: React.FC = () => {
  const { Header } = Layout
  const history = useHistory()
  const [isDark, { toggle }] = useDarkreader(false)
  const [useLoginModal, setLoginModal] = useState<boolean>(false)
  const [avatarVisitility, setAvatarVisitility] = useState<boolean>(false)

  const popoverList = [
    { name: "个人中心", path: HOME.BLOG_DETAIL.path },
    { name: "我点赞的", path: HOME.INDEX.path },
    { name: "我收藏的", path: HOME.ABOUT.path },
  ] as { name: string, path: string }[]



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

  const PopoverContent =
    (
      <div className={styles.popoverContent}>
        {popoverList.map(el => (
          <Link to={el.path} key={el.name} className="link">
            <div>{el.name}</div>
          </Link>
        ))}
        <PoweroffOutlined style={{ fontSize: '14px', marginRight: '5px' }} />
        退出
      </div>
    )


  return (
    <div className={styles.mainHeaderBox}>
      <Header className={styles.header}>
        <Link to="/">
          <div
            className={styles.logo}
            style={{
              backgroundImage: isDark ? `url(${logo})` : `url(${logo_light})`,
            }}
          />
        </Link>
        <div style={{ flex: 1 }}></div>
        <div style={{ marginTop:20 }}>
          {/* 主题面板 */}
          {/* <Popover content={themePanel}>
            <svg style={{ width: 16, height: 16, marginTop: 2 }}>
              <use xlinkHref="#icon-zhuti1" />
            </svg>
          </Popover> */}
          <Switch checked={isDark} onChange={changeTheme} styling="github" />
        </div>
        <Col xs={0} sm={0} md={0} lg={6}>
          <Menu className={styles.nav} mode="horizontal" defaultSelectedKeys={[history.location.pathname]}>
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
        <div className={styles.user}>
          <Spin
            spinning={false}
            size="small">
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item
                    icon={<SettingOutlined />}
                    key="profile"
                  // onClick={redriectToProfileRoute}
                  >
                    系统设置
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    icon={<LogoutOutlined />}
                    // onClick={logout}
                    key="logout"
                    danger
                  >
                    退出登录
                  </Menu.Item>
                </Menu>
              }
            >
              <div className={styles.content}>
                <span>測試名字</span>
                <Avatar
                  shape="square"
                  size="small"
                  icon={<UserOutlined />}
                  className={styles.gravatar}
                // src={admin.data.gravatar}
                />
              </div>
            </Dropdown>
          </Spin>
        </div>
      </Header>
      <LoginModal showLogin={useLoginModal} closeLogin={() => {
        console.log("触发")
        setLoginModal(false)
      }} />
    </div>
  )
}

export default Header
