import { styled } from '@mui/material/styles';
import { Button, Box, Typography } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

export const Row = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const WarningText = styled(Typography)`
  font-size: 12px;
  color: red;
  text-align: left;
`;

export const SignUpButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  background-color: black;
  color: white;
  &:hover {
    background-color: #333;
  }
`;
