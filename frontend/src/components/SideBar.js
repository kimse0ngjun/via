import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  LockOutlined,
  LogoutOutlined,
  BellOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import '../styles/SideBar.css'; // CSS 파일 임포트

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const storedCollapsed = localStorage.getItem('sidebarCollapsed');
    return storedCollapsed === 'false' ? false : true;
  });
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed);
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/my-profile')) {
      return ['1'];
    } else if (path.startsWith('/certifications')) {
      return ['2'];
    } else if (path.startsWith('/change-password')) {
      return ['3'];
    } else if (path.startsWith('/notifications')) {
      return ['4'];
    } else if (path.startsWith('/account-settings')) {
      return ['5'];
    } else if (path.startsWith('/logout')) {
      return ['6'];
    }
    return [];
  };

  return (
    <Sider
      width={200}
      className="side-bar"
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <div className="sidebar-header">
        <Button className="hamburger-btn" type="text" onClick={toggleSidebar}>
          <MenuOutlined />
        </Button>
      </div>
      <Menu
        mode="inline"
        selectedKeys={getSelectedKey()}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/my-profile">회원 정보</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<IdcardOutlined />}>
          <Link to="/certifications">자격증 관리</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<LockOutlined />}>
          <Link to="/change-password">비밀번호 변경</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BellOutlined />}>
          <Link to="/notifications">알림 설정</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          <Link to="/account-settings">계정 설정</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<LogoutOutlined />}>
          <Link to="/logout">로그아웃</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;