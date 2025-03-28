/** @jsxImportSource @emotion/react */
import React from 'react';
import { Input, Button } from 'antd';
import * as styles from '../styles/FindPasswordPage.styles';

const FindPasswordPage = () => {
  return (
    <div css={styles.container}>
      <h2 css={styles.title}>FindPassword</h2>
      <div css={styles.form}>
        <div css={styles.row}>
          <label css={styles.label}>이름</label>
          <Input placeholder="이름을 입력하세요." css={styles.input} />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>이메일</label>
          <Input placeholder="이메일을 입력하세요." css={styles.input} />
        </div>
        <Button css={styles.findButton}>비밀번호 찾기</Button>
        {/* 비밀번호 찾기 링크 추가 */}
        
      </div>
    </div>
  );
};

export default FindPasswordPage;
