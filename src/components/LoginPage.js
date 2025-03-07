// src/components/LoginPage.js
import React from 'react';
import AppHeader from "./AppHeader";  // AppHeader를 import

const LoginPage = () => {
  return (
    <div>
      <AppHeader />  {/* 로그인 페이지에도 헤더를 표시 */}
      <h1>로그인 페이지</h1>
      {/* 로그인 관련 내용 */}
    </div>
  );
};

export default LoginPage;
