import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const { profileData: globalUser } = useUser(); // email 전역에서 가져옴
  const email = globalUser?.email; // 반드시 존재한다고 가정

  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    axios
      .get(`/mypage/${email}`)
      .then((res) => {
        setProfileData(res.data);
        setEditedData(res.data);
      })
      .catch((err) => {
        message.error("프로필 정보를 불러오지 못했습니다.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [email]);

  const handleEditProfile = () => setEditing(true);

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put(`/api/mypage/${email}`, editedData);
      setProfileData(res.data);
      setEditing(false);
      message.success("프로필이 성공적으로 저장되었습니다.");
    } catch (error) {
      message.error("프로필 저장에 실패했습니다.");
      console.error(error);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>불러오는 중...</div>;
  if (!profileData) return <div style={{ padding: 24 }}>프로필 없음</div>;

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
                  <Avatar size={140} icon={<UserOutlined />} />
                  <Title level={4} style={{ marginTop: 16 }}>
                    {profileData.name}
                  </Title>
                </Col>

                <Col xs={24} md={16}>
                  <Title level={4}>기본 정보</Title>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text>
                      <MailOutlined /> {email}
                    </Text>
                    <Text>
                      <CalendarOutlined /> 나이: {profileData.age}세
                    </Text>
                    <Text>
                      <ReadOutlined /> 전공: {profileData.major}
                    </Text>
                    <Text>
                      <ToolOutlined /> 성별: {profileData.gender || "-"}
                    </Text>
                    <Text>
                      <StarOutlined /> 학점: {profileData.grade}
                    </Text>
                  </Space>

                  <Divider />

                  <Title level={5}>보유 자격증</Title>
                  <ul>
                    {profileData.certifications?.map((cert, idx) => (
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

                        <Text>자격증 (쉼표로 구분):</Text>
                        <Input
                          value={editedData.certifications?.join(", ") || ""}
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
