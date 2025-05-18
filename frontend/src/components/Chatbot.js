import React, { useState, useEffect } from 'react';
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
  const [conId, setConId] = useState('');

  // 최초 1회만 con_id 생성
  useEffect(() => {
    setConId(Date.now().toString());
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages([...messages, { text: userMessage, isUser: true }]);
      setInput('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            user_message: userMessage,
            con_id: conId, // conId 사용
            email: 'test@example.com'
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.reply) {
          setMessages(prevMessages => [...prevMessages, { text: data.reply, isUser: false }]);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [...prevMessages, {
          text: '⚠️ 서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
          isUser: false
        }]);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: 'calc(100vh - 64px)', py: 2, paddingTop: '80px' }}>
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
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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
