// src/App.js
import React from "react";
// src/index.js 또는 src/App.js에 추가

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";  // 헤더 컴포넌트
import LoginPage from "./components/LoginPage";  // 로그인 페이지 컴포넌트
import SignupPage from "./components/SignupPage";
import 'antd/dist/antd.css';

const App = () => {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<h1>메인 페이지</h1>} />
        <Route path="/login" element={<LoginPage />} />  {/* 로그인 페이지 라우팅 */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
