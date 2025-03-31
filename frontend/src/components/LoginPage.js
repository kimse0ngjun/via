/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as styles from '../styles/LoginPage.styles';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      onLoginSuccess(); // 부모 컴포넌트에서 상태 업데이트
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail || '로그인 실패');
      } else {
        setErrorMessage('서버와의 연결에 실패했습니다.');
      }
    }
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>LOGIN</h2>
      <div css={styles.form}>
        <div css={styles.row}>
          <label css={styles.label}>아이디</label>
          <Input
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            css={styles.input}
          />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>비밀번호</label>
          <Input.Password
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            css={styles.input}
          />
        </div>
        {errorMessage && <div css={styles.errorMessage}>{errorMessage}</div>}
        <div css={styles.passwordReset}>
          <Link to="/find-password" css={styles.passwordLink}>
            비밀번호 찾기
          </Link>
        </div>
        <button css={styles.loginButton} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
