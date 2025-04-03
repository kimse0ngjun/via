import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import FindPasswordPage from './components/FIndPasswordPage';
import SignupSuccessPage from './components/SignupSuccessPage';
import MyProfile from "./components/MyProfile";
import EditProfile from "./components/EditProfile";
import Certifications from "./components/Certifications";
import 'antd/dist/antd.css';  // 기본 스타일
import { AuthProvider } from './contexts/AuthContext'; // AuthProvider import
import { Chatbot } from './components/Chatbot'
import InterestsPage from './components/InterestsPage';

const App = () => {
  return (
    <AuthProvider> {/* AuthProvider로 감싸줍니다 */}
      <Router> {/* Router는 여기서만 사용 */}
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signupsuccess" element={<SignupSuccessPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/interests" element={<InterestsPage />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;