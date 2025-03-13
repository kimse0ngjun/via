/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as styles from '../styles/SignUpPage.styles';

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // 회원가입 로직 추가
  };

  return (
    <div css={styles.container}>
      <div css={styles.title}>회원가입</div>
      <form css={styles.form}>
        <div css={styles.row}>
          <label css={styles.label}>이름</label>
          <input css={styles.input} type="text" placeholder="이름을 입력하세요" />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>ID</label>
          <input css={styles.input} type="email" placeholder="example@via.com" />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>PW</label>
          <input 
            css={styles.input} 
            type="password" 
            placeholder="비밀번호를 입력하세요" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div css={styles.warningText}>
          영문/숫자/특수문자 중, 2가지 입력<br />
          8자 이상 32자 이하 입력(공백 제외)<br />
          연속 3자 이상 동일한 문자/숫자 제외
        </div>
        <div css={styles.row}>
          <label css={styles.label}>PW 확인</label>
          <input 
            css={styles.input} 
            type="password" 
            placeholder="비밀번호를 다시 입력하세요" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button css={styles.signUpButton} onClick={handleSignUp}>SIGNUP</button>
      </form>
    </div>
  );
};

export default SignUpPage;
