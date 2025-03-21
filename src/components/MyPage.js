/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, Card, Avatar, Row, Col, Divider, Descriptions } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';  // react-router-dom에서 Link 임포트
import * as styles from '../styles/MyPage.styles';  // 스타일 임포트

const MyPage = () => {
  const user = {
    name: '김성준',
    email: 'seongjun@example.com',
    profilePicture: 'https://www.example.com/profile.jpg', // 기본 프로필 이미지 링크
    recentActivity: [
      '회원가입 완료',
      '프로필 사진 변경',
      '비밀번호 변경',
    ],
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직 추가
    alert('로그아웃되었습니다.');
  };

  return (
    <div css={styles.container}>
      <Row justify="center" gutter={24}>
        <Col span={24} md={12}>
          <Card css={styles.card} bordered={false}>
            <div css={styles.profileContainer}>
              <Avatar src={user.profilePicture} size={120} icon={<UserOutlined />} />
              <h2 css={styles.username}>{user.name}</h2>
              <p css={styles.email}>{user.email}</p>
              <Link to="/edit-profile">
                <Button type="primary" icon={<EditOutlined />} css={styles.editButton}>프로필 수정</Button>
              </Link>
              <Divider />
              <Button type="default" css={styles.logoutButton} onClick={handleLogout}>로그아웃</Button>
            </div>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card title="최근 활동 내역" css={styles.activityCard}>
            <ul css={styles.activityList}>
              {user.recentActivity.map((activity, index) => (
                <li key={index} css={styles.activityItem}>{activity}</li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyPage;
