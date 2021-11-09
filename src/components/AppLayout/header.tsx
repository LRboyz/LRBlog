import React from 'react'
import styles from './style.module.less'
import logo from '@/assets/image/common/logo.png'
import { Switch, useDarkreader } from 'react-darkreader'
import { useHistory } from 'react-router-dom'
import logo_light from '@/assets/image/common/logo_light.png'
import SubMenu from 'antd/lib/menu/SubMenu'
import { Menu } from 'antd'
import { BookOutlined, LaptopOutlined, UserOutlined } from '@ant-design/icons'


const AppHeader: React.FC = (props) => {
  const [isDark, { toggle }] = useDarkreader(false)
  const history = useHistory()
  // 修改主题
  const changeTheme = () => {
    toggle()
  }


  return (
    <div className={styles.headerContent}>
      <div
        className={styles.logo}
        onClick={() => history.push('/')}
        style={{
          backgroundImage: isDark ? `url(${logo})` : `url(${logo_light})`,
          cursor: 'pointer'
        }}
      />
      <Menu
        mode="horizontal"
        // defaultSelectedKeys={['about']}
        style={{ height: '100%' }}
      >
        <SubMenu key="blog" icon={<BookOutlined />} title="博客" onTitleClick={() => history.push('/blog')} />
        <SubMenu key="about" icon={<UserOutlined />} title="关于我" onTitleClick={() => history.push('/about')} />
      </Menu>
      <div style={{ flex: 1 }} />
      <Switch checked={isDark} onChange={changeTheme} styling="github" />
    </div>
  )
}

export default AppHeader
