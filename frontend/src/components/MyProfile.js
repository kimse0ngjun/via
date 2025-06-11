import React, { useState, useEffect } from "react";
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
  message,
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
  const { profileData, setProfileData } = useUser();
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/mypage/${email}`);
        if (!res.ok) throw new Error("프로필을 불러오지 못했습니다.");
        const data = await res.json();
        setProfileData(data);
        setEditedData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        message.error("프로필 로딩 실패");
        setLoading(false);
      }
    };

    if (email) fetchProfile();
  }, [email, setProfileData]);

  const handleEditProfile = () => setEditing(true);

  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`http://localhost:8000/mypage/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!res.ok) throw new Error("프로필 저장 실패");

      const updated = await res.json();
      setProfileData(updated);
      setEditing(false);
      message.success("프로필이 저장되었습니다.");
    } catch (err) {
      console.error(err);
      message.error("저장 중 오류 발생");
    }
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading || !profileData?.name) {
    return (
      <Layout className="my-profile-layout">
        <SideBar />
        <Layout className="my-profile-content-layout">
          <Content className="my-profile-content">
            <div className="my-profile-container">
              <Title level={2}>로딩 중...</Title>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }

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
                  <Text type="secondary">
                    {Array.isArray(profileData.interests)
                      ? profileData.interests.join(", ")
                      : ""}
                  </Text>
                </Col>

                <Col xs={24} md={16}>
                  <Title level={4}>기본 정보</Title>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text>
                      <MailOutlined /> {profileData.email}
                    </Text>
                    <Text>
                      <PhoneOutlined /> {profileData.phone_number}
                    </Text>
                    <Text>
                      <CalendarOutlined /> 생년월일: {profileData.birthdate} ({
                        profileData.age
                      }세)
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
                  <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "더보기" }}>
                    {profileData.introduction}
                  </Paragraph>

                  <Title level={5}>보유 자격증</Title>
                  <ul>
                    {Array.isArray(profileData.certifications) ? (
                      profileData.certifications.map((cert, idx) => <li key={idx}>{cert}</li>)
                    ) : (
                      <li>없음</li>
                    )}
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
                          onChange={(e) => handleChange("gender", e.target.value)}
                        >
                          <Radio value="남성">남성</Radio>
                          <Radio value="여성">여성</Radio>
                        </Radio.Group>

                        <Text>학점:</Text>
                        <Input
                          value={editedData.grade}
                          onChange={(e) => handleChange("grade", e.target.value)}
                        />

                        <Text>전공:</Text>
                        <Input
                          value={editedData.major}
                          onChange={(e) => handleChange("major", e.target.value)}
                        />

                        <Text>관심 분야 (쉼표로 구분):</Text>
                        <Input
                          value={editedData.interests?.join(", ") || ""}
                          onChange={(e) =>
                            handleChange(
                              "interests",
                              e.target.value.split(",").map((item) => item.trim())
                            )
                          }
                        />

                        <Text>자격증 (쉼표로 구분):</Text>
                        <Input
                          value={editedData.certifications?.join(", ") || ""}
                          onChange={(e) =>
                            handleChange(
                              "certifications",
                              e.target.value.split(",").map((item) => item.trim())
                            )
                          }
                        />

                        <Text>자기소개:</Text>
                        <Input.TextArea
                          rows={4}
                          value={editedData.introduction}
                          onChange={(e) => handleChange("introduction", e.target.value)}
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
