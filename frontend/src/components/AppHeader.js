import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import VIACom from "../assets/via_logo.svg";
import line2 from "../assets/line-2.svg";

import "../styles/AppHeader.css";

const { Header } = Layout;

const AppHeader = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추적
  const navigate = useNavigate();

  // 로그인 상태 체크 (localStorage에서 확인)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/"); // 홈으로 리다이렉트
  };

  // 로그인 성공 시 호출될 함수
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // 로그인 상태 업데이트
  };

  return (
    <Layout>
      <Header className="header">
        <div className="box">
          {/* 로그인 상태에 따라 로그인 버튼 비활성화 및 회원가입 버튼을 로그아웃 버튼으로 변경 */}
          {isLoggedIn ? (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                <div className="overlap-group" style={{ pointerEvents: "none" }}>로그인</div>
              </Link>

              <Link to="/signup" className="signup-btn">
                <div className="overlap-group">
                  <div className="div">회원가입</div>
                </div>
              </Link>
            </>
          )}

          <img className="line" alt="Line" src={line2} />

          <Link to="/">
            <img className="VIA-com" alt="VIA Logo" src={VIACom} />
          </Link>

          <div className="navbar">
            {["진로", "면접", "관심분야", "상담기록"].map((label, index) => (
              <div
                key={index}
                className={`nav-item ${activeIndex === index ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="nav-text">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
