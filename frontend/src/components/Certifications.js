// src/components/Certifications.js
import React, { useState } from 'react';
import { Layout, Input, Button, List, DatePicker } from 'antd';
import SideBar from './SideBar';
import '../styles/Certifications.styles.css';
import moment from 'moment';

const { Content } = Layout;

function Certifications() {
  const [certificationName, setCertificationName] = useState('');
  const [certificationDate, setCertificationDate] = useState(null);
  const [certifications, setCertifications] = useState([]);

  const handleAddCertification = () => {
    if (certificationName && certificationDate) {
      setCertifications([
        ...certifications,
        {
          name: certificationName,
          date: certificationDate.format('YYYY-MM-DD'),
        },
      ]);
      setCertificationName('');
      setCertificationDate(null);
    }
  };

  return (
    <Layout className="certifications-layout">
      <SideBar />
      <Layout className="certifications-content-layout">
        <Content className="certifications-content">
          <div className="certifications-container">
            <div className="input-container">
              <Input
                className="certifications-input"
                placeholder="Certification Name"
                value={certificationName}
                onChange={(e) => setCertificationName(e.target.value)}
              />
              <DatePicker
                className="certifications-date-picker"
                onChange={(date) => setCertificationDate(date)}
                value={certificationDate}
                placeholder="Certification Date"
              />
            </div>
            <Button className="add-button" onClick={handleAddCertification}>
              Add Certification
            </Button>
            <List
              className="certifications-list"
              bordered
              dataSource={certifications}
              renderItem={(item) => (
                <List.Item className="certification-item">
                  <span className="certification-name">{item.name}</span>
                  <span className="certification-date">{item.date}</span>
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Certifications;