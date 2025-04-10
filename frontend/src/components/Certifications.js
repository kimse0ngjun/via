// src/components/Certifications.js
import React, { useState } from 'react';
import { Layout, Input, Button, List, DatePicker, Typography, Divider, Row, Col } from 'antd';
import SideBar from './SideBar';
import '../styles/Certifications.styles.css';
import { DeleteOutlined } from '@ant-design/icons';
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
          id: Date.now(),
          name: certificationName,
          date: certificationDate.format('YYYY-MM-DD'),
        },
      ]);
      setCertificationName('');
      setCertificationDate(null);
    }
  };

  const handleDeleteCertification = (id) => {
    setCertifications(certifications.filter((certification) => certification.id !== id));
  };

  return (
    <Layout className="certifications-layout">
      <SideBar />
      <Layout className="certifications-content-layout">
        <Content className="certifications-content">
          <div className="certifications-container">
            <Typography.Title level={2} className="certifications-title">
              자격증 관리
            </Typography.Title>
            <Divider />

            <div className="input-container">
              <Row gutter={16} align="middle">
                <Col xs={24} sm={12}>
                  <Input
                    className="certifications-input"
                    placeholder="자격증 이름"
                    value={certificationName}
                    onChange={(e) => setCertificationName(e.target.value)}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <DatePicker
                    className="certifications-date-picker"
                    onChange={(date) => setCertificationDate(date)}
                    value={certificationDate}
                    placeholder="취득일"
                    format="YYYY-MM-DD"
                  />
                </Col>
              </Row>
              <Button className="add-button" onClick={handleAddCertification} type="primary" style={{ marginTop: 16 }}>
                자격증 추가
              </Button>
            </div>

            <Divider />

            <List
              className="certifications-list"
              bordered
              dataSource={certifications}
              locale={{ emptyText: '등록된 자격증이 없습니다.' }}
              renderItem={(item) => (
                <List.Item
                  className="certification-item"
                  actions={[
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteCertification(item.id)}
                      size="small"
                      danger
                    />,
                  ]}
                >
                  <Typography.Text strong>{item.name}</Typography.Text>
                  <Typography.Text className="certification-date">
                    취득일: {item.date}
                  </Typography.Text>
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