import React from 'react';
import { Box, Typography, Button, Container, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/History.css'; // 스타일 파일 import

export const History = () => {
  const navigate = useNavigate();

  // 임시 상담 기록 데이터 (실제로는 API 호출 등을 통해 가져와야 합니다.)
  const counselingHistory = [
    { id: 1, date: '2025-04-01', topic: '진로 상담', summary: 'IT 분야 취업에 대한 전반적인 상담 진행' },
    { id: 2, date: '2025-03-25', topic: '면접 준비', summary: '기술 면접 예상 질문 및 답변 연습' },
    { id: 3, date: '2025-03-15', topic: '관심 분야 탐색', summary: '새로운 관심 분야 발견 및 관련 정보 공유' },
    { id: 4, date: '2025-03-05', topic: '취업 스트레스 관리', summary: '스트레스 해소 방법 및 긍정적 사고 방식 코칭' },
  ];

  return (
    <Container maxWidth="md" className="history-page">
      <Box>
        <Typography variant="h3" component="h1" gutterBottom className="question">
          나의 상담 기록
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/history')} // 상담 기록 페이지로 이동 (경로는 필요에 따라 변경)
          className="view-history-btn"
        >
          상담 기록 보기
        </Button>

        <Typography variant="h6" component="h2" className="history-title" sx={{ mt: 4, mb: 2 }}>
          최근 상담 내역
        </Typography>
        <List>
          {counselingHistory.length > 0 ? (
            counselingHistory.map((record) => (
              <React.Fragment key={record.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={record.topic}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {record.date}
                        </Typography>
                        {` — ${record.summary.substring(0, 50)}...`}
                      </React.Fragment>
                    }
                  />
                  <Button size="small" onClick={() => { /* 상세 보기 기능 구현 */ }}>
                    상세 보기
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              상담 기록이 없습니다.
            </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default History;