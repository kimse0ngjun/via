import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, WarningText, SignUpButton } from '../styles/SignUpPage.styles';

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!name || !email || !password || !age) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (!agreeTerms) {
      alert('약관에 동의해야 합니다.');
      return;
    }

    const signUpData = { name, email, password, age };

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        navigate('/signupsuccess');
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error(error);
      alert('서버 오류');
    }
  };

  return (
    <Container style={{ paddingTop: '80px' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>SIGNUP</Typography>
      <Form onSubmit={handleSignUp}>
        <Row>
          <TextField label="이름" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        </Row>
        <Row>
          <TextField label="나이" type="number" variant="outlined" fullWidth value={age} onChange={(e) => setAge(e.target.value)} />
        </Row>
        <Row>
          <TextField label="이메일" type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </Row>
        <Row>
          <TextField label="비밀번호" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        </Row>
        <WarningText>
          영문/숫자/특수문자 중, 2가지 입력<br />
          8자 이상 32자 이하 입력(공백 제외)<br />
          연속 3자 이상 동일한 문자/숫자 제외
        </WarningText>
        <Row>
          <TextField label="비밀번호 확인" type="password" variant="outlined" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Row>
        <Row>
          <FormControlLabel control={<Checkbox checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />} label="약관에 동의합니다." />
        </Row>
        <SignUpButton type="submit" variant="contained">회원가입</SignUpButton>
      </Form>
    </Container>
  );
};

export default SignUpPage;