import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";  // 추가
import MyPage from "./components/MyPage";
import FindPasswordPage from './components/FIndPasswordPage';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />  {/* MainPage로 변경 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
