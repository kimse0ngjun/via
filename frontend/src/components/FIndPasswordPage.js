import React from 'react';
import { TextField } from '@mui/material';
import { Container, Title, FormBox, FindButton } from '../styles/FindPasswordPage.styles';

const FindPasswordPage = () => {
  return (
    <Container>
      <Title variant="h4">Find Password</Title>
      <FormBox>
        <TextField label="이름" variant="standard" fullWidth />
        <TextField label="이메일" variant="standard" fullWidth />
        <FindButton variant="contained" fullWidth>
          비밀번호 찾기
        </FindButton>
      </FormBox>
    </Container>
  );
};

export default FindPasswordPage;
