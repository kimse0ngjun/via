// src/components/EditProfile.js
import React from 'react';
import { Layout } from 'antd';
import SideBar from './SideBar';
import '../styles/EditProfile.styles.css';

const { Content } = Layout;

function EditProfile() {
  return (
    <Layout className="edit-profile-layout">
      <SideBar />
      <Layout className="edit-profile-content-layout">
        <Content className="edit-profile-content">
          <div className="edit-profile-container">
            <form className="edit-profile-form">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default EditProfile;

///