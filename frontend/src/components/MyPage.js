// src/components/MyPage.js
import React from 'react';
import { Layout } from 'antd';
import SideBar from './SideBar'; // 사이드바 임포트
import { Route, Routes } from 'react-router-dom'; // Router 제거

import MyProfile from './MyProfile'; // 마이페이지
import Certifications from './Certifications'; // 자격증 관리
import EditProfile from './EditProfile'; // 프로필 수정
import NewMyProfile from './NewMyProfile'; 

const { Content } = Layout;

const MyPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/new-profile" element={<NewMyProfile />} /> 
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyPage;
