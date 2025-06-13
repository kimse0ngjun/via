import React, { useState } from "react";
import { Input, Button, message, Typography, Form, Radio } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const defaultForm = {
  major: "",
  grade: "",
  interests: "",
  introduction: "",
  certifications: "",
  gender: "", // ✅ 추가
};

const NewMyProfile = ({ userId, onSuccess }) => {
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const body = {
      major: formData.major,
      grade: formData.grade ? parseFloat(formData.grade) : null,
      gender: formData.gender || null, // ✅ 추가
      interests: formData.interests
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      introduction: formData.introduction,
      certifications: formData.certifications
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(`http://localhost:8000/mypage/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("저장 실패");

      message.success("추가 정보가 저장되었습니다!");
      if (onSuccess) onSuccess();
      navigate("/mypage");
    } catch (err) {
      console.error(err);
      message.error("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <Title level={3}>추가 정보 입력</Title>
      <Form layout="vertical">
        <Form.Item label="전공">
          <Input name="major" value={formData.major} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="학점">
          <Input
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="숫자만 입력"
            type="number"
            step="0.01"
          />
        </Form.Item>

        {/* ✅ 성별 추가 */}
        <Form.Item label="성별">
          <Radio.Group
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <Radio value="남성">남성</Radio>
            <Radio value="여성">여성</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="흥미 (쉼표로 구분)">
          <Input
            name="interests"
            value={formData.interests}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="자기소개">
          <Input.TextArea
            name="introduction"
            rows={3}
            value={formData.introduction}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="자격증 (쉼표로 구분)">
          <Input
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            저장하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewMyProfile;
