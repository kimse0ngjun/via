// src/components/MyProfile.js
import React from 'react';
import { Layout } from 'antd';
import SideBar from './SideBar';
import '../styles/MyProfile.css'; // CSS 파일 임포트

const { Content } = Layout;

const MyProfile = () => {
  return (
    <Layout className="my-profile-layout">
      <SideBar />
      <Layout className="my-profile-content-layout">
        <Content className="my-profile-content">
          <div className="my-profile-container">
            <h1>My Profile</h1>
            {/* 프로필 내용 추가 */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyProfile;