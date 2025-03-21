/** @jsxImportSource @emotion/react */
import React from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import * as styles from '../styles/LoginPage.styles';

const LoginPage = () => {
  const handleLogin = () => {
    console.log("로그인 버튼 클릭됨!");
    // 로그인 로직 추가 가능
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>LOGIN</h2>
      <div css={styles.form}>
        <div css={styles.row}>
          <label css={styles.label}>아이디</label>
          <Input placeholder="이메일을 입력하세요." css={styles.input} />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>비밀번호</label>
          <Input.Password placeholder="비밀번호를 입력하세요." css={styles.input} />
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
