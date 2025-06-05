import React, { useState } from "react";
import {
  Layout,
  Card,
  Avatar,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Divider,
  Radio,
  Input,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  ReadOutlined,
  ToolOutlined,
  StarOutlined,
} from "@ant-design/icons";
import SideBar from "./SideBar";
import "../styles/MyProfile.css";
import { useUser } from "./UserContext";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "박세원",
    email: "swon7150@gmail.com",
    phone: "010-1234-5678",
    address: "부산광역시 연제구 연산동",
    birthdate: "1999-08-17",
    age: 25,
    gender: "남성",
    grade: "3.8",
    major: "ICT공학",
    interest: "백엔드 개발",
    certifications: ["정보처리기사", "SQLD"],
    avatarUrl: "/static/uploads/avatar.png",
    bio: "안녕하세요! 백엔드 개발자로 성장하고 있는 박세원입니다. GPT를 활용한 스마트한 시스템 개발에 관심이 많습니다.",
  });

  const { setProfileData: setGlobalProfile } = useUser();
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...profileData });

  const handleEditProfile = () => setEditing(true);
  const handleSaveProfile = () => {
    setProfileData(editedData);
    setGlobalProfile(editedData); // 전역 상태 저장
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout className="my-profile-layout">
      <SideBar />
      <Layout className="my-profile-content-layout">
        <Content className="my-profile-content">
          <div className="my-profile-container">
            <Title level={2}>마이 프로필</Title>
            <Card className="profile-card" bordered={false}>
              <Row gutter={[32, 24]}>
                <Col xs={24} md={8} style={{ textAlign: "center" }}>
                  <Avatar
                    size={140}
                    icon={!profileData.avatarUrl && <UserOutlined />}
                    src={profileData.avatarUrl}
                  />
                  <Title level={4} style={{ marginTop: 16 }}>
                    {profileData.name}
                  </Title>
                  <Text type="secondary">{profileData.interest}</Text>
                </Col>

                <Col xs={24} md={16}>
                  <Title level={4}>기본 정보</Title>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text>
                      <MailOutlined /> {profileData.email}
                    </Text>
                    <Text>
                      <PhoneOutlined /> {profileData.phone}
                    </Text>
                    <Text>
                      <HomeOutlined /> {profileData.address}
                    </Text>
                    <Text>
                      <CalendarOutlined /> 생년월일: {profileData.birthdate} (
                      {profileData.age}세)
                    </Text>
                    <Text>
                      <ReadOutlined /> 전공: {profileData.major}
                    </Text>
                    <Text>
                      <ToolOutlined /> 성별: {profileData.gender}
                    </Text>
                    <Text>
                      <StarOutlined /> 학점: {profileData.grade}
                    </Text>
                  </Space>

                  <Divider />

                  <Title level={4}>자기소개</Title>
                  <Paragraph
                    ellipsis={{ rows: 3, expandable: true, symbol: "더보기" }}
                  >
                    {profileData.bio}
                  </Paragraph>

                  <Title level={5}>보유 자격증</Title>
                  <ul>
                    {profileData.certifications.map((cert, idx) => (
                      <li key={idx}>{cert}</li>
                    ))}
                  </ul>

                  {!editing ? (
                    <Button icon={<EditOutlined />} onClick={handleEditProfile}>
                      프로필 수정
                    </Button>
                  ) : (
                    <>
                      <Divider />
                      <Title level={4}>정보 수정</Title>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Text>성별:</Text>
                        <Radio.Group
                          value={editedData.gender}
                          onChange={(e) =>
                            handleChange("gender", e.target.value)
                          }
                        >
                          <Radio value="남성">남성</Radio>
                          <Radio value="여성">여성</Radio>
                        </Radio.Group>

                        <Text>학점:</Text>
                        <Input
                          value={editedData.grade}
                          onChange={(e) =>
                            handleChange("grade", e.target.value)
                          }
                        />

                        <Text>전공:</Text>
                        <Input
                          value={editedData.major}
                          onChange={(e) =>
                            handleChange("major", e.target.value)
                          }
                        />

                        <Text>관심 분야:</Text>
                        <Input
                          value={editedData.interest}
                          onChange={(e) =>
                            handleChange("interest", e.target.value)
                          }
                        />

                        <Text>자격증 (쉼표로 구분):</Text>
                        <Input
                          value={editedData.certifications.join(", ")}
                          onChange={(e) =>
                            handleChange(
                              "certifications",
                              e.target.value
                                .split(",")
                                .map((item) => item.trim())
                            )
                          }
                        />

                        <Button type="primary" onClick={handleSaveProfile}>
                          저장
                        </Button>
                      </Space>
                    </>
                  )}
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
