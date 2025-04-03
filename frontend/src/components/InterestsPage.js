import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/InterestsPage.css'; // 스타일 파일 import (새로운 파일)

export const InterestsPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="interests-page"> {/* 클래스 이름 변경 */}
      <Box>
        <Typography variant="h3" component="h1" gutterBottom className="question"> {/* 클래스 이름 유지 */}
          나의 관심 기록
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/interests')} // 관심 기록 페이지로 이동 (경로는 필요에 따라 변경)
          className="view-history-btn" // CSS 적용 (클래스 이름 변경)
        >
          관심 기록 보기
        </Button>
      </Box>
    </Container>
  );
};

export default InterestsPage;