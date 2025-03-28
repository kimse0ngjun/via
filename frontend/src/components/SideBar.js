// src/components/SideBar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, IdcardOutlined, FileDoneOutlined } from '@ant-design/icons';
// src/components/SideBar.js
import '../styles/SideBar.css';

import { Link } from 'react-router-dom'; // 페이지 전환을 위한 react-router-dom 사용

const { Sider } = Layout;

const SideBar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/my-profile">회원 정보</Link> {/* /my-profile 페이지로 이동 */}
        </Menu.Item>
        <Menu.Item key="2" icon={<IdcardOutlined />}>
          <Link to="/certifications">자격증 관리</Link> {/* /certifications 페이지로 이동 */}
        </Menu.Item>
        <Menu.Item key="3" icon={<FileDoneOutlined />}>
          <Link to="/edit-profile">프로필 수정</Link> {/* /edit-profile 페이지로 이동 */}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
