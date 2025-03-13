/** @jsxImportSource @emotion/react */
import React from 'react';
import { Input, Button } from 'antd';
import * as styles from '../styles/LoginPage.styles';

const LoginPage = () => {
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
        <Button css={styles.loginButton}>LOGIN</Button>
      </div>
    </div>
  );
};

export default LoginPage;
