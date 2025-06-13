import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import FindPasswordPage from "./components/FindPasswordPage";
import SignupSuccessPage from "./components/SignupSuccessPage";
import MyProfile from "./components/MyProfile";
import EditProfile from "./components/EditProfile";
import Certifications from "./components/Certifications";
import InterestsPage from "./components/InterestsPage";
import History from "./components/History";
import ResetPasswordPage from "./components/ResetPasswordPage";
import Chatbot from "./components/Chatbot";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./components/UserContext";
import HistoryeDetail from "./components/HistoryDetail";
import "antd/dist/antd.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signupsuccess" element={<SignupSuccessPage />} />
              <Route path="/find-password" element={<FindPasswordPage />} />
              <Route path="/mypage*/*" element={<MyPage />} />
              <Route path="/mypage" element={<MyProfile />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/interests" element={<InterestsPage />} />
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/history" element={<History />} />
              <Route path="/history/:id" element={<HistoryeDetail />} />
            </Routes>
          </Layout>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
