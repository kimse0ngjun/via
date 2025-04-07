import React, { useState } from 'react';
import { Box, Typography, Button, Container, Chip, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/InterestsPage.css';
import AddIcon from '@mui/icons-material/Add';

export const InterestsPage = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState(['여행', '맛집 탐방', '운동']); // 예시 관심사 데이터
  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = () => {
    if (newInterest.trim() !== '') {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleDeleteInterest = (interestToDelete) => () => {
    setInterests((interests) => interests.filter((interest) => interest !== interestToDelete));
  };

  return (
    <Container maxWidth="md" className="interests-page">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className="question">
          나의 관심 기록
        </Typography>

        {/* 현재 관심사 목록 */}
        <Typography variant="h6" gutterBottom>
          현재 관심사
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {interests.map((interest) => (
            <Chip
              key={interest}
              label={interest}
              onDelete={handleDeleteInterest(interest)}
              className="interest-chip"
            />
          ))}
        </Box>

        {/* 새 관심사 추가 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="새로운 관심사 추가"
            variant="outlined"
            size="small"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddInterest();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleAddInterest} color="primary" aria-label="add new interest">
                    <AddIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, mr: 1 }}
          />
        </Box>

        {/* 관심 기록 보기 버튼 */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/interests/history')} // 실제 관심 기록 페이지 경로로 변경
          className="view-history-btn"
        >
          관심 기록 보기
        </Button>
      </Box>
    </Container>
  );
};

export default InterestsPage;