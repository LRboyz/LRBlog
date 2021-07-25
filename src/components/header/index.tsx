import "./style.less";
import React, { useState } from "react";
import { Switch, useDarkreader } from "react-darkreader";
import { Button, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import logo from "@/assets/image/common/logo.png";
import logo_light from "@/assets/image/common/logo_light.png";
import LoginModal from "../login/login.component";
import { useHistory } from "react-router-dom";
const Header: React.FC = () => {
  const [useLoginModal, setLoginModal] = useState(false);
  const [isDark, { toggle }] = useDarkreader(false);
  const history = useHistory();
  const { Header } = Layout;
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
        <Menu
          className="nav"
          mode="horizontal"
          defaultSelectedKeys={[history.location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="/blog">
            <Link to="/blog">博客</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">关于我</Link>
          </Menu.Item>
        </Menu>

        <div className="btn-group">
          <Switch checked={isDark} onChange={toggle} styling="github" />
          <Button
            shape="round"
            onClick={() => setLoginModal(true)}
            style={{ marginLeft: 20 }}
          >
            登陆
          </Button>
        </div>
        <LoginModal
          showLogin={useLoginModal}
          closeLogin={() => setLoginModal(false)}
        />
      </Header>
    </div>
  );
};

export default Header;
