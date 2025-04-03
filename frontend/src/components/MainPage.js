import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css'; // 스타일 파일 import

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="main-page">
      <Box>
        <Typography variant="h3" component="h1" gutterBottom className="question">
          진로에 대해 궁금한 점을 알려주세요
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/chat')}
          className="start-btn" // CSS 적용
        >
          시작하기
        </Button>
      </Box>
    </Container>
  );
};

export default MainPage;
