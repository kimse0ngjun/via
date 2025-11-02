import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const Title = styled(Typography)({
  fontWeight: 'bold',
  fontStyle: 'italic',
  marginBottom: '24px',
});

export const FormBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '300px',
});

export const FindButton = styled(Button)({
  marginTop: '16px',
  backgroundColor: '#000000', // 검정색 버튼
  color: 'white',
  borderRadius: '8px',
  fontWeight: 'bold',
  padding: '10px',
  '&:hover': {
    backgroundColor: '#333333', // hover 시 약간 밝은 검정색
  },
});
