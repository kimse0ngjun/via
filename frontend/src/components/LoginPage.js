import React, { useState, useContext } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '@mui/material';
import {
  Container,
  Title,
  Form,
  StyledTextField,
  PasswordReset,
  PasswordLink,
} from '../styles/LoginPage.styles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (!email || !password) {
      message.error('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    console.log('로그인 시도:', { email, password });
    message.success('로그인 성공!');
    login();
    navigate('/');
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
            backgroundColor: 'black',
            color: 'white',
            mt: 2,
            '&:hover': { backgroundColor: '#333' },
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