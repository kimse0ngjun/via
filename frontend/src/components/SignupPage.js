/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Input, message, Checkbox } from 'antd'; // Checkbox 추가
import { useNavigate } from 'react-router-dom';
import * as styles from '../styles/SignUpPage.styles';

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false); // 약관 동의 상태 추가
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      message.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!name || !email || !password || !age) {
      message.error('모든 필드를 입력해 주세요.');
      return;
    }

    if (!agreeTerms) {
      message.error('약관에 동의해야 합니다.'); // 약관 동의 체크 추가
      return;
    }

    const signUpData = {
      name,
      email,
      password,
      password_confirm: confirmPassword,
      age,
    };

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('회원가입이 완료되었습니다.');
        navigate('/signupsuccess');
      } else {
        message.error(data.detail || '회원가입 실패');
      }
    } catch (error) {
      console.error(error);
      message.error('서버 오류');
    }
  };

  return (
    <div css={styles.container}>
      <div css={styles.title}>SIGNUP</div>
      <form css={styles.form} onSubmit={handleSignUp}>
        <div css={styles.row}>
          <label css={styles.label}>이름</label>
          <input
            css={styles.input}
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>나이</label>
          <input
            css={styles.input}
            type="number"
            placeholder="나이를 입력하세요"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>이메일</label>
          <input
            css={styles.input}
            type="email"
            placeholder="example@via.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div css={styles.row}>
          <label css={styles.label}>비밀번호</label>
          <Input.Password
            css={styles.input}
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
          <label css={styles.label}>비밀번호 확인</label>
          <Input.Password
            css={styles.input}
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div css={styles.row}>
          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          >
            약관에 동의합니다.
          </Checkbox>
        </div>
        <button css={styles.signUpButton} type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;