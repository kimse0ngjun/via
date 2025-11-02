import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // URL에서 토큰 가져오기
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/auth/reset-password", {
        token,
        new_password: newPassword,
      });

      setMessage("비밀번호가 성공적으로 변경되었습니다.");
    } catch (err) {
      setError(err.response?.data?.detail || "비밀번호 변경 실패");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          비밀번호 재설정
        </Typography>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 2 }}>
          <TextField
            fullWidth
            label="새 비밀번호"
            type="password"
            variant="outlined"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            변경하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
