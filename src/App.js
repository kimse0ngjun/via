import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import FindPasswordPage from './components/FIndPasswordPage';
import SignupSuccessPage from './components/SignupSuccessPage';
import 'antd/dist/reset.css';


const App = () => {
  return (
    <Router> {/* Router는 여기서만 사용 */}
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signupsuccess" element={<SignupSuccessPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
