/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import * as styles from '../styles/SignUpPage.styles';

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState(''); // 나이 상태 추가
  const [name, setName] = useState(''); // 이름 상태 추가
  const [email, setEmail] = useState(''); // 이메일 상태 추가
  const [message, setMessage] = useState(''); // 메시지 상태 추가

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSignUp = async (e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    console.log("회원가입 함수 실행됨"); // 함수 실행 확인

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 나이 및 이메일, 비밀번호 확인
    if (!name || !email || !password || !age) {
      setMessage('모든 필드를 입력해 주세요.');
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
        setMessage('회원가입이 완료되었습니다.');
        navigate('/signupsuccess'); // 성공 시 페이지 이동
      } else {
        setMessage(data.detail || '회원가입 실패');
      }
    } catch (error) {
      console.error(error); // 오류 확인을 위한 콘솔 출력
      setMessage('서버 오류');
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

        <button css={styles.signUpButton} type="submit">회원가입</button> {/* type="submit"으로 변경 */}
      </form>
      {message && <p>{message}</p>} {/* 회원가입 결과 메시지 표시 */}
    </div>
  );
};

export default SignUpPage;
///