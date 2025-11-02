// components/HistoryDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  const record = history.find((item) => String(item.id) === id);

  if (!record) {
    return (
      <Container>
        <Typography variant="h5">기록을 찾을 수 없습니다.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          상담 상세 내역
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          날짜: {record.date}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {Array.isArray(record.fullConversation) ? (
          record.fullConversation.map((msg, idx) => (
            <Paper
              key={idx}
              sx={{
                p: 2,
                my: 1,
                bgcolor: msg.isUser ? "primary.light" : "grey.100",
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {msg.isUser ? "나" : "GPT"}
              </Typography>
              <Typography>{msg.text}</Typography>
            </Paper>
          ))
        ) : (
          <Typography color="error">상세 대화 내용이 없습니다.</Typography>
        )}

        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
        <Button
          sx={{ mt: 2, ml: 2 }}
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.setItem(
              "resumeChat",
              JSON.stringify(record.fullConversation)
            );
            navigate("/chat");
          }}
        >
          채팅으로 돌아가기
        </Button>
      </Box>
    </Container>
  );
};

export default HistoryDetail;
