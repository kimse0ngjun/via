// src/components/SideBar.js
import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, IdcardOutlined, FileDoneOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css'; // CSS 파일 임포트

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
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
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/my-profile">회원 정보</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<IdcardOutlined />}>
          <Link to="/certifications">자격증 관리</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileDoneOutlined />}>
          <Link to="/edit-profile">프로필 수정</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;