import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, IdcardOutlined, FileDoneOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import '../styles/SideBar.css'; // CSS 파일 임포트

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    // localStorage에서 collapsed 상태를 불러오거나 기본값(true) 사용
    const storedCollapsed = localStorage.getItem('sidebarCollapsed');
    return storedCollapsed === 'false' ? false : true;
  });
  const location = useLocation();

  useEffect(() => {
    // collapsed 상태가 변경될 때 localStorage에 저장
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
    } else if (path.startsWith('/edit-profile')) {
      return ['3'];
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
        <Menu.Item key="3" icon={<FileDoneOutlined />}>
          <Link to="/edit-profile">프로필 수정</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;