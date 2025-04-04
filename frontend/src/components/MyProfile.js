import React, { useState } from "react"; // useState 훅 추가
import { Layout, Card, Avatar, Button, Typography, Row, Col, Space, Divider } from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined, // 예시 필드용 아이콘 추가
  BriefcaseOutlined // 예시 필드용 아이콘 추가
} from "@ant-design/icons";
import SideBar from "./SideBar"; // SideBar 컴포넌트가 필요합니다.
import "../styles/MyProfile.css"; // CSS 파일이 필요합니다.

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography; // Paragraph 추가

const MyProfile = () => {
  // 예시 프로필 데이터를 state로 관리 (추후 API 연동 용이)
  const [profileData, setProfileData] = useState({
    name: "홍길동",
    email: "hong@example.com",
    phone: "+82 10-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
    birthdate: "1990-01-15", // 예시 필드
    occupation: "소프트웨어 개발자", // 예시 필드
    avatarUrl: null, // 프로필 이미지 URL (없으면 기본 아이콘)
    bio: "안녕하세요! 사용자 경험을 개선하는 데 열정을 가진 개발자 홍길동입니다. 새로운 기술 학습과 적용을 즐깁니다." // 예시 자기소개
  });

  // 프로필 수정 버튼 클릭 핸들러 (기능 구현은 별도)
  const handleEditProfile = () => {
    console.log("프로필 수정 버튼 클릭됨");
    // 여기에 프로필 수정 모달을 띄우거나 수정 페이지로 이동하는 로직 추가
  };

  return (
    <Layout className="my-profile-layout">
      <SideBar /> {/* SideBar 컴포넌트는 동일한 위치 또는 경로에 있어야 합니다 */}
      <Layout className="my-profile-content-layout">
        <Content className="my-profile-content">
          <div className="my-profile-container">
            <Title level={2} style={{ marginBottom: '24px' }}>마이 프로필</Title> {/* 제목 스타일 조정 */}

            <Card className="profile-card" bordered={false} style={{ borderRadius: '8px' }}> {/* 카드 스타일링 */}
              <Row gutter={[32, 24]} align="top"> {/* gutter로 간격 조정, align="top" */}

                {/* 아바타 섹션 */}
                <Col xs={24} md={8} style={{ textAlign: 'center' }}> {/* 반응형 및 가운데 정렬 */}
                  <Avatar
                    size={{ xs: 100, sm: 120, md: 140, lg: 160 }} // 반응형 크기
                    icon={!profileData.avatarUrl && <UserOutlined />}
                    src={profileData.avatarUrl}
                    className="profile-avatar-image" // CSS 클래스 추가 (선택적)
                  />
                  <Title level={4} style={{ marginTop: '16px', marginBottom: '4px' }}>{profileData.name}</Title>
                  <Text type="secondary">{profileData.occupation}</Text> {/* 직업 추가 */}
                </Col>

                {/* 프로필 상세 정보 섹션 */}
                <Col xs={24} md={16}>
                  <div className="profile-details-section">
                    <Title level={4} style={{ marginBottom: '16px' }}>기본 정보</Title>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}> {/* 수직 Space 사용 */}
                      <Text><MailOutlined style={{ marginRight: 8 }} /> {profileData.email}</Text>
                      <Text><PhoneOutlined style={{ marginRight: 8 }} /> {profileData.phone || "연락처 미입력"}</Text>
                      <Text><HomeOutlined style={{ marginRight: 8 }} /> {profileData.address || "주소 미입력"}</Text>
                      <Text><CalendarOutlined style={{ marginRight: 8 }} /> {profileData.birthdate ? `생년월일: ${profileData.birthdate}` : "생년월일 미입력"}</Text>
                    </Space>

                    <Divider /> {/* 구분선 추가 */}

                    <Title level={4} style={{ marginTop: '20px', marginBottom: '10px' }}>자기소개</Title>
                    <Paragraph className="profile-bio" ellipsis={{ rows: 3, expandable: true, symbol: '더보기' }}>
                      {profileData.bio || "자기소개가 아직 작성되지 않았습니다."}
                    </Paragraph>

                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      className="edit-profile-btn"
                      style={{ marginTop: '24px' }} // 버튼 위치 조정
                      onClick={handleEditProfile}
                    >
                      프로필 수정
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyProfile;