import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';

export const Container = styled(Box)`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
`;

export const Title = styled(Typography)`
  margin-bottom: 20px;
`;

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
