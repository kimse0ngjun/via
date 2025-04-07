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
  
    // 🔹 이메일과 이름이 비어있는지 확인
    if (!name.trim() || !email.trim()) {
      setError('이름과 이메일을 입력해주세요.');
      console.log("🚨 입력 오류: 이름 또는 이메일이 비어 있음");
      return;
    }
  
    console.log("🔹 비밀번호 찾기 요청 시작, 입력된 이름:", name, "이메일:", email);
  
    try {
      const response = await fetch('http://localhost:8000/api/auth/password-reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),  // ✅ name과 email 모두 포함
      });
  
      const data = await response.json();
      console.log("🔍 응답 상태 코드:", response.status);
      console.log("🔍 API 응답 데이터:", data);
  
      if (response.ok) {
        setMessage(data.message);
      } else {
        console.log("🚨 백엔드 오류 메시지:", data.detail);
  
        // 🔥 백엔드에서 오는 오류 메시지 처리
        const errorMessage = Array.isArray(data.detail)
          ? data.detail.map(err => `${err.loc?.join('.')}: ${err.msg}`).join(', ')
          : data.detail;
  
        setError(errorMessage || '비밀번호 찾기 요청 실패');
      }
    } catch (err) {
      console.error("🚨 서버 요청 오류:", err);
      setError('서버 요청 중 오류가 발생했습니다.');
    }
  };
  
  
  

  return (
    <Container>
      <Title variant="h4">Find Password</Title>
      <FormBox>
        <TextField 
          label="이름" 
          variant="standard" 
          fullWidth 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <TextField 
          label="이메일" 
          variant="standard" 
          fullWidth 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <FindButton 
          variant="contained" 
          fullWidth 
          onClick={handleFindPassword}
        >
          비밀번호 찾기
        </FindButton>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </FormBox>
    </Container>
  );
};

export default FindPasswordPage;
