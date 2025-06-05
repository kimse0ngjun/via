// ✅ components/Chatbot.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "./UserContext";

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conId] = useState(uuidv4());
  const userId = localStorage.getItem("userId");
  const { profileData } = useUser();

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    if (!userId) {
      setMessages((prev) => [
        ...prev,
        {
          text: "❗로그인이 필요합니다. 로그인 후 다시 시도해주세요.",
          isUser: false,
        },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { text: trimmedInput, isUser: true }]);
    setInput("");

    const payload = {
      con_id: conId,
      user_id: userId,
      user_message: trimmedInput,
      created_at: new Date().toISOString(),
      interest: profileData?.interest || "", // 관심 분야 전달
    };

    try {
      const response = await fetch("http://localhost:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { text: data.bot_message || data.reply, isUser: false },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: data?.detail || "❗GPT 응답에 실패했습니다.", isUser: false },
        ]);
      }
    } catch (error) {
      console.error("❌ 서버 통신 오류:", error);
      setMessages((prev) => [
        ...prev,
        { text: "❗서버 오류가 발생했습니다.", isUser: false },
      ]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: "calc(100vh - 64px)", py: 2 }}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.isUser ? "flex-end" : "flex-start",
                gap: 1,
              }}
            >
              {!message.isUser && (
                <Avatar sx={{ bgcolor: "primary.main" }}>B</Avatar>
              )}
              <Paper
                sx={{
                  p: 1,
                  maxWidth: "70%",
                  bgcolor: message.isUser ? "primary.main" : "grey.100",
                  color: message.isUser ? "white" : "text.primary",
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Paper>
              {message.isUser && (
                <Avatar sx={{ bgcolor: "secondary.main" }}>U</Avatar>
              )}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            p: 2,
            display: "flex",
            gap: 1,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
