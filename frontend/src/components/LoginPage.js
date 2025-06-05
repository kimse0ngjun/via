import React, { useState, useContext } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mui/material";
import axios from "axios";
import {
  Container,
  Title,
  Form,
  StyledTextField,
  PasswordReset,
  PasswordLink,
} from "../styles/LoginPage.styles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login", // ✅ 포트 8000으로 수정
        { email, password }
      );

      const { access_token, user_id } = response.data;

      // ✅ 로컬스토리지에 저장
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("userId", user_id); // ✅ Chatbot에서 사용할 userId

      message.success("로그인 성공!");
      login(); // context 사용 시 로그인 상태 갱신
      navigate("/");
    } catch (err) {
      console.error("로그인 실패:", err.response?.data || err.message);
      message.error("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <Container>
      <Title>LOGIN</Title>
      <Form>
        <StyledTextField
          label="아이디"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          label="비밀번호"
          type="password"
          variant="standard"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordReset>
          <PasswordLink href="/find-password">비밀번호 찾기</PasswordLink>
        </PasswordReset>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "black",
            color: "white",
            mt: 2,
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={handleLogin}
        >
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
