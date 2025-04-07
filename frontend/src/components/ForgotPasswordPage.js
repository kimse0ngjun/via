import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/auth/password-reset-request", { email });

      // ✅ 요청 성공 시 리디렉트
      const token = response.data.token; // 백엔드에서 토큰을 반환한다고 가정
      window.location.href = `http://localhost:3000/reset-password?token=${token}`;

    } catch (err) {
      setError(err.response?.data?.detail || "비밀번호 재설정 요청 실패");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" component="h1" gutterBottom>
        비밀번호 재설정 요청
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="이메일"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          비밀번호 재설정 링크 보내기
        </Button>
      </form>
    </Container>
  );
};

export default ForgotPasswordPage;
