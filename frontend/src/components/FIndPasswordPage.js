import React, { useState } from 'react';
import { TextField, Alert } from '@mui/material';
import { Container, Title, FormBox, FindButton } from '../styles/FindPasswordPage.styles';

const FindPasswordPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFindPassword = async () => {
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8000/password-reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.detail || '비밀번호 찾기 요청 실패');
      }
    } catch (err) {
      setError('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title variant="h4">Find Password</Title>
      <FormBox>
        <TextField label="이름" variant="standard" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="이메일" variant="standard" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <FindButton variant="contained" fullWidth onClick={handleFindPassword}>
          비밀번호 찾기
        </FindButton>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </FormBox>
    </Container>
  );
};

export default FindPasswordPage;
