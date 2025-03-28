// src/components/Certifications.js
import React from 'react';
import { Layout } from 'antd';
import SideBar from './SideBar';
import '../styles/Certifications.styles.css';

const { Content } = Layout;

function Certifications() {
  return (
    <Layout className="certifications-layout">
      <SideBar />
      <Layout className="certifications-content-layout">
        <Content className="certifications-content">
          <div className="certifications-container">
            <input type="text" className="certifications-input" placeholder="Enter certification" />
            <button className="add-button">Add Certification</button>
            <ul className="certifications-list">
              <li className="certification-item">
                <span className="certification-name">Example Certification</span>
                <span className="certification-date">2023-10-12</span>
              </li>
            </ul>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Certifications;