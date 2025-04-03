import { styled } from '@mui/material/styles';
import { Box, Typography, Button, TextField, Link } from '@mui/material';

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  fontStyle: 'italic',
  marginBottom: '30px',
});

export const Form = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '300px',
});

export const StyledTextField = styled(TextField)({
  '& .MuiInput-underline:before': { borderBottomColor: '#a06baf' },
  '& .MuiInput-underline:hover:before': { borderBottomColor: '#a06baf !important' },
  '& .MuiInput-underline:after': { borderBottomColor: '#a06baf' },
});

export const PasswordReset = styled(Box)({
  textAlign: 'center',
  marginTop: '10px',
});

export const PasswordLink = styled(Link)({
  color: 'black',
  textDecoration: 'none',
  '&:hover': { color: '#8809FF80' },
});

export const LoginButton = styled(Button)({
  marginTop: '20px',
  width: '100%',
  backgroundColor: '#8809FF33',
  color: 'black',
  border: '1px solid black',
  borderRadius: '20px',
  fontWeight: 'bold',
  '&:hover': { backgroundColor: '#8809FF80' },
});
