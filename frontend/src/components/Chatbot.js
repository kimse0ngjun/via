import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Container,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      // TODO: Add bot response logic here
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: 'calc(100vh - 64px)', py: 2 }}>
      <Paper
        elevation={3}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                gap: 1,
              }}
            >
              {!message.isUser && (
                <Avatar sx={{ bgcolor: 'primary.main' }}>B</Avatar>
              )}
              <Paper
                sx={{
                  p: 1,
                  maxWidth: '70%',
                  bgcolor: message.isUser ? 'primary.main' : 'grey.100',
                  color: message.isUser ? 'white' : 'text.primary',
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Paper>
              {message.isUser && (
                <Avatar sx={{ bgcolor: 'secondary.main' }}>U</Avatar>
              )}
            </Box>
          ))}
        </Box>
        <Box sx={{ p: 2, display: 'flex', gap: 1, borderTop: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
}; 

export default Chatbot;