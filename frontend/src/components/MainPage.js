import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css'; // 스타일 파일 import

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 메인 컨텐츠 영역 */}
      <Container maxWidth="md" className="main-page" style={{ paddingTop: '80px' }}>
        <Box className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Typography variant="h3" component="h1" gutterBottom className="question">
            진로에 대해 궁금한 점을
            <br />
            알려주는 챗봇
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/chat')}
            className="start-btn"
            style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px' }}
          >
            시작하기
          </Button>
          <Box style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          </Box>
        </Box>
      </Container>

      {/* 스크롤 시 보이는 설명 영역 */}
      <Box className="description-section" style={{ marginTop: '40px' }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            우리 챗봇은 어떤 걸 도와줄까요?
          </Typography>
          <Typography variant="body1" paragraph>
            이 챗봇은 진로에 대해 고민하는 여러분에게 실질적인 정보를 제공합니다. 관심 있는 직업군, 준비 방법, 필요한 역량 등 다양한 질문에 답할 수 있어요.
          </Typography>
          <Typography variant="body1" paragraph>
            사용자는 간단한 질문만 입력하면 되고, 챗봇은 빠르고 친절하게 답변해줍니다. 진로에 대한 고민이 있다면, 부담 없이 이용해보세요.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default MainPage;
