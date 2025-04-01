/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from 'react';
import { Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import * as styles from '../styles/LoginPage.styles';
import { AuthContext } from '../contexts/AuthContext'; // AuthContext import

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Context에서 login 함수 가져오기

  const handleLogin = () => {
    if (!email || !password) {
      message.error('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 실제 로그인 로직 (예: API 호출)
    console.log('로그인 시도:', { email, password });

    // 임시 성공 처리 (실제로는 API 응답에 따라 처리)
    message.success('로그인 성공!');
    login(); // 로그인 성공 시 Context의 login 함수 호출
    navigate('/'); // 로그인 성공 시 메인 페이지('/')로 이동
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>LOGIN</h2>
      <div css={styles.form}>
        <div css={styles.row}>
          <label css={styles.label}>아이디</label>
          <Input
            placeholder="이메일을 입력하세요."
            css={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>비밀번호</label>
          <Input.Password
            placeholder="비밀번호를 입력하세요."
            css={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
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